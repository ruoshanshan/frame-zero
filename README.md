# FRAME ZERO 第零帧 · 活动网站

第零帧 AI 视频黑客松的独立网站（Next.js 16，`/zh-CN` 与 `/en` 两种语言）。

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 推送前跑一次 lint + build
```

## 改哪里

| 内容 | 位置 |
| --- | --- |
| 全部文案（中英两份，键名一致） | `app/[lang]/dictionaries/zh-CN.json`、`en.json` |
| 图片、视频、外链、联系方式 | `components/site.ts` |
| 页面结构 / 样式 | `app/[lang]/page.tsx`、`page.module.css` |
| 作品播放弹窗 | `components/WorkGrid.tsx` |

- 新增一站：在两份字典的 `stops.items` 加一项，在 `site.ts` 的 `STOP_PHOTOS` / `STOP_LINKS` 加同 id 的照片和文章链接。「已举办 / 即将举行」按日期在浏览器里自动判断。
- 新增作品：在 `works.groups` 加条目；有片段的话把 `work-<id>.jpg`（960×600）和 `clip-<id>.mp4` 放进 `public/works/`，再把 id 加进 `WORK_MEDIA`。
- 联系表单：`app/[lang]/contactAction.ts`，通过飞书邮箱 SMTP 发到 contact@tianlang.ai（页面上不显示邮箱地址）。需要在 Vercel 项目里设置环境变量：
  - `SMTP_USER`：发信邮箱，例如 contact@tianlang.ai
  - `SMTP_PASS`：该邮箱的「第三方客户端登录」专用密码（飞书邮箱 → 设置 → 第三方客户端登录），不是登录密码
  - 可选：`CONTACT_TO`（收件地址，默认 contact@tianlang.ai）、`SMTP_HOST` / `SMTP_PORT`（默认 smtp.feishu.cn:465）
  - 本地测试时写进 `.env.local`（已被 git 忽略）
- 字体全部随站点打包（MiSans、Inter Tight、Silkscreen），不要引入境外 CDN。
- 像素插画和作品画面为 AI 生成，页面上已标注；不要裁掉插画上的「AI 生成」水印。
