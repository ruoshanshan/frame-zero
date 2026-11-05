'use server';

import nodemailer from 'nodemailer';

// Sends the contact form to the team inbox through the mailbox's own SMTP server (tianlang.ai mail is
// hosted on Feishu, whose SPF is the only one the domain allows). Configure in the Vercel project:
//   SMTP_USER  sending mailbox, e.g. contact@tianlang.ai
//   SMTP_PASS  that mailbox's client password (飞书邮箱 → 设置 → 第三方客户端登录, not the login password)
//   CONTACT_TO optional, defaults to contact@tianlang.ai
//   SMTP_HOST / SMTP_PORT optional, default smtp.feishu.cn:465
// The address is never shown on the page.

export type Field = 'name' | 'org' | 'reply' | 'message';
// `values` lets the form refill what the visitor typed when sending fails
export type ContactState = { status: 'idle' | 'sent' | 'invalid' | 'error'; invalid?: Field[]; values?: Record<Field, string> };

const LIMITS: Record<Field, [number, number]> = { name: [1, 60], org: [1, 120], reply: [3, 120], message: [10, 5000] };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// submissions faster than this after the form appeared are treated as bots
const MIN_FILL_MS = 3000;

const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // honeypot and timing checks: pretend success so bots don't retry
  const shownAt = Number(form.get('t'));
  if (form.get('website') || !shownAt || Date.now() - shownAt < MIN_FILL_MS) return { status: 'sent' };

  const values = Object.fromEntries(
    (Object.keys(LIMITS) as Field[]).map((key) => [key, String(form.get(key) ?? '').trim()]),
  ) as Record<Field, string>;
  const invalid = (Object.keys(LIMITS) as Field[]).filter((key) => {
    const [min, max] = LIMITS[key];
    return values[key].length < min || values[key].length > max;
  });
  if (invalid.length) return { status: 'invalid', invalid, values };

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error('contact form: SMTP_USER / SMTP_PASS not set');
    return { status: 'error', values };
  }

  const name = oneLine(values.name);
  const org = oneLine(values.org);
  const reply = oneLine(values.reply);
  const port = Number(process.env.SMTP_PORT ?? 465);

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.feishu.cn',
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    await transport.sendMail({
      from: { name: '第零帧网站留言', address: user },
      to: process.env.CONTACT_TO ?? 'contact@tianlang.ai',
      replyTo: EMAIL.test(reply) ? { name, address: reply } : undefined,
      subject: `[第零帧合作] ${org} · ${name}`,
      text: [`称呼：${name}`, `单位：${org}`, `联系方式：${reply}`, '', values.message, '', '—— 来自第零帧网站联系表单'].join('\n'),
    });
    return { status: 'sent' };
  } catch (error) {
    console.error('contact form: send failed', error);
    return { status: 'error', values };
  }
}
