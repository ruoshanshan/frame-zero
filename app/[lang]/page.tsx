import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { hasLocale } from '@/i18n-config';
import { SiteHeader } from '@/components/SiteHeader';
import { StopStatus } from '@/components/StopStatus';
import { WorkGrid } from '@/components/WorkGrid';
import { ContactForm } from '@/components/ContactForm';
import { Wordmark } from '@/components/Wordmark';
import { ARTICLES, ART, CONTACT, SCENE_PHOTOS, SHOWREEL, STOP_LINKS, STOP_PHOTOS } from '@/components/site';
import { getDictionary } from './dictionaries';
import s from './page.module.css';

const SECTIONS = ['concept', 'format', 'stops', 'works', 'scene', 'host'] as const;

function SectionHead({ num, label, heading, sub, tone = 'blue' }: { num: string; label: string; heading: ReactNode; sub?: string; tone?: 'blue' | 'pink' }) {
  return (
    <header className={s.head}>
      <p className={s.label}>
        <span className={`${s.num} ${tone === 'pink' ? s.numPink : ''}`}>{num}</span>
        {label}
      </p>
      <h2 className={s.heading}>{heading}</h2>
      {sub && <p className={s.sub}>{sub}</p>}
    </header>
  );
}

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} langLabel={t.nav.langLabel} nav={SECTIONS.map((id) => ({ id, label: t.nav[id] }))} />

      <main>
        {/* hero */}
        <section className={s.hero}>
          <Image src={ART.heroCity.src} alt="" fill priority sizes="100vw" className={s.heroBg} />
          <div className={s.heroShade} aria-hidden />
          <div className={s.heroInner}>
            <p className={s.kicker}>
              <span className={s.kickerPixels} aria-hidden>
                <i />
                <i />
                <i />
              </span>
              {t.hero.kicker}
            </p>
            <h1 className={s.heroTitle}>
              <span className={s.heroName}>{t.hero.title}</span>
              <span className={s.heroSub}>{t.hero.titleSub}</span>
            </h1>
            <p className={s.heroLead}>{t.hero.lead}</p>
            <ul className={s.chips}>
              {t.hero.chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
            <div className={s.ctas}>
              <a href="#works" className={s.ctaPrimary}>
                <span className={s.ctaPlay} aria-hidden />
                {t.hero.ctaWorks}
              </a>
              <a href="#host" className={s.ctaGhost}>
                {t.hero.ctaHost} <span aria-hidden>→</span>
              </a>
            </div>
          </div>
          <span className={s.aiNote}>{t.hero.aiNote}</span>
        </section>

        {/* numbers */}
        <section className={s.stats} aria-label={t.stops.label}>
          <ul className={s.wrap}>
            {t.stats.map((stat, i) => (
              <li key={stat.label}>
                <p className={`${s.statValue} ${s[`stat${i}`]}`}>
                  {stat.value}
                  {stat.unit && <small>{stat.unit}</small>}
                </p>
                <p className={s.statLabel}>{stat.label}</p>
                <p className={s.statDetail}>{stat.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 01 concept */}
        <section id="concept" className={s.section}>
          <div className={`${s.wrap} ${s.concept}`}>
            <div>
              <SectionHead num="01" label={t.concept.label} heading={t.concept.heading} />
              <div className={s.prose}>
                {t.concept.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className={s.named}>
                  {t.concept.named} <mark>{t.concept.namedWord}</mark>
                </p>
              </div>
              <div className={s.callout}>
                <strong>{t.concept.calloutTitle}</strong>
                <p>{t.concept.calloutBody}</p>
              </div>
              <ul className={s.points}>
                {t.concept.points.map((point) => (
                  <li key={point.strong}>
                    <strong>{point.strong}</strong>
                    {point.text}
                  </li>
                ))}
              </ul>
            </div>
            <figure className={s.poster}>
              <Image src={ART.poster.src} alt={t.concept.posterAlt} width={ART.poster.width} height={ART.poster.height} sizes="(max-width: 900px) 90vw, 420px" />
            </figure>
          </div>
        </section>

        {/* 02 format */}
        <section id="format" className={`${s.section} ${s.tinted}`}>
          <div className={s.wrap}>
            <SectionHead num="02" label={t.format.label} heading={t.format.heading} sub={t.format.sub} />

            <ol className={s.rules}>
              {t.format.rules.map((rule, i) => (
                <li key={rule.title}>
                  <span className={s.ruleNum}>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{rule.title}</h3>
                  <p>{rule.body}</p>
                </li>
              ))}
            </ol>

            <h3 className={s.subhead}>{t.format.scheduleHeading}</h3>
            <ol className={s.schedule}>
              {t.format.schedule.map((item) => (
                <li key={item.time}>
                  <span className={s.time}>{item.time}</span>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ol>

            <div className={s.judging}>
              <figure className={s.studio}>
                <Image src={ART.studio.src} alt={t.format.studioAlt} width={ART.studio.width} height={ART.studio.height} sizes="(max-width: 900px) 100vw, 560px" />
              </figure>
              <div className={s.judgeCards}>
                <article className={s.darkCard}>
                  <h3>{t.format.judgingHeading}</h3>
                  <p>{t.format.judgingBody}</p>
                  <ul className={s.questions}>
                    {t.format.questions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                  <p className={s.dimensions}>
                    <span>{t.format.dimensionsLabel}</span>
                    {t.format.dimensions.map((d) => (
                      <em key={d}>{d}</em>
                    ))}
                  </p>
                </article>
                <article className={s.card}>
                  <h3>{t.format.awardsHeading}</h3>
                  <ul className={s.ticks}>
                    {t.format.awards.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* 03 stops */}
        <section id="stops" className={s.section}>
          <div className={s.wrap}>
            <SectionHead num="03" label={t.stops.label} heading={t.stops.heading} sub={t.stops.sub} />
            <ol className={s.stops}>
              {t.stops.items.map((stop) => {
                const photo = STOP_PHOTOS[stop.id];
                return (
                  <li key={stop.id} className={s.stop}>
                    <div className={s.stopDot} aria-hidden />
                    <p className={s.stopDate}>{stop.date}</p>
                    <article className={s.stopCard}>
                      <div className={s.stopPhoto}>
                        <Image src={photo.src} alt={stop.name} width={photo.width} height={photo.height} sizes="(max-width: 900px) 100vw, 400px" />
                        <StopStatus date={stop.date} done={t.stops.done} upcoming={t.stops.upcoming} className={s.status} />
                      </div>
                      <div className={s.stopText}>
                        <span className={s.stopTag}>{stop.tag}</span>
                        <h3>{stop.name}</h3>
                        <dl className={s.figures}>
                          {stop.figures.map((f) => (
                            <div key={f.label}>
                              <dt>{f.value}</dt>
                              <dd>{f.label}</dd>
                            </div>
                          ))}
                        </dl>
                        <p>{stop.body}</p>
                        <a href={STOP_LINKS[stop.id]} target="_blank" rel="noopener noreferrer" className={s.textLink}>
                          {stop.link} <span aria-hidden>↗</span>
                        </a>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* 04 works */}
        <section id="works" className={`${s.section} ${s.tinted}`}>
          <div className={s.wrap}>
            <SectionHead num="04" label={t.works.label} heading={t.works.heading} sub={t.works.sub} tone="pink" />
            <figure className={s.showreel}>
              <div className={s.screen}>
                <video src={SHOWREEL.src} poster={SHOWREEL.poster} width={SHOWREEL.width} height={SHOWREEL.height} controls playsInline preload="none" aria-label={t.works.showreelCaption} />
              </div>
              <figcaption>{t.works.showreelCaption}</figcaption>
            </figure>
            <WorkGrid
              groups={t.works.groups}
              labels={{ play: t.works.play, noClip: t.works.noClip, duration: t.works.duration, team: t.works.team, close: t.works.close, clipNote: t.works.clipNote }}
            />
            <p className={s.pending}>{t.works.pending}</p>
          </div>
        </section>

        {/* 05 scene */}
        <section id="scene" className={s.section}>
          <div className={s.wrap}>
            <SectionHead num="05" label={t.scene.label} heading={t.scene.heading} sub={t.scene.sub} />
            <ul className={s.mosaic}>
              {SCENE_PHOTOS.map(({ id, shot }) => {
                const caption = t.scene.captions[id as keyof typeof t.scene.captions];
                return (
                  <li key={id} className={id === 'whu-room' || id === 'whu-group' ? s.big : undefined}>
                    <figure>
                      <Image src={shot.src} alt={caption} width={shot.width} height={shot.height} sizes="(max-width: 700px) 50vw, 33vw" />
                      <figcaption>{caption}</figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 06 host */}
        <section id="host" className={`${s.section} ${s.tinted}`}>
          <div className={s.wrap}>
            <SectionHead num="06" label={t.host.label} heading={t.host.heading} sub={t.host.sub} tone="pink" />
            <div className={s.host}>
              <dl className={s.terms}>
                {t.host.terms.map((term) => (
                  <div key={term.label}>
                    <dt>{term.label}</dt>
                    <dd>{term.value}</dd>
                  </div>
                ))}
              </dl>
              <div className={s.provide}>
                <h3>{t.host.provideHeading}</h3>
                <ol className={s.steps}>
                  {t.host.steps.map((step, i) => (
                    <li key={step.title}>
                      <span className={s.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h4>{step.title}</h4>
                        <p>{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className={s.hostNote}>{t.host.note}</p>
              </div>
            </div>

            <div id="contact" className={s.contact}>
              <div className={s.contactIntro}>
                <h3>{t.host.contactHeading}</h3>
                <p>{t.host.contactBody}</p>
                <dl>
                  <dt>{t.host.contactWechat}</dt>
                  <dd>{CONTACT.wechat}</dd>
                </dl>
              </div>
              <ContactForm copy={t.host.form} />
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.wrap}>
          <p className={s.footTagline}>{t.footer.tagline}</p>
          <div className={s.footGrid}>
            <div>
              <Wordmark lang={lang} inverse />
              <p className={s.footMotto}>MAKE IDEAS REAL</p>
            </div>
            <nav aria-label={t.footer.articles}>
              <h3>{t.footer.articles}</h3>
              <ul>
                {(Object.keys(ARTICLES) as (keyof typeof ARTICLES)[]).map((key) => (
                  <li key={key}>
                    <a href={ARTICLES[key]} target="_blank" rel="noopener noreferrer">
                      {t.footer.articleLinks[key]} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={s.footBottom}>
            <span>© 2026 {t.footer.rights}</span>
            <span>{t.footer.aiNote}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
