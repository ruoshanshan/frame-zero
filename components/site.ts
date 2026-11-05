// Media and outside links. Copy lives in app/[lang]/dictionaries; entries here are keyed by the ids used there.

export type Shot = { src: string; width: number; height: number };

const img = (f: string, width: number, height: number): Shot => ({ src: `/img/${f}.jpg`, width, height });

export const ART = {
  // AI-generated artwork from the FRAME ZERO deck (labelled as such on the page)
  poster: img('poster', 1086, 1448),
  studio: img('studio', 1200, 800),
};

export const SHOWREEL = { src: '/video/showreel.mp4', poster: '/video/showreel-poster.jpg', width: 1280, height: 720 };

// keyed by `stops.items[].id`
export const STOP_PHOTOS: Record<string, Shot> = {
  whu: img('whu-group', 2000, 1333),
  sdut: img('sdut-group', 1600, 1200),
  xiamen: img('xiamen', 1152, 720),
};

// keyed by `works.groups[].items[].id`; works missing from the showreel have no still or clip
export const WORK_MEDIA: Record<string, { still: Shot; clip: string }> = Object.fromEntries(
  ['whu-flug', 'whu-tape', 'whu-jacket', 'whu-narcissus', 'whu-drift', 'whu-sakura', 'sdut-today', 'sdut-stone', 'sdut-blur'].map((id) => [
    id,
    { still: { src: `/works/work-${id}.jpg`, width: 960, height: 600 }, clip: `/works/clip-${id}.mp4` },
  ]),
);

// in display order; captions keyed by the same ids in `scene.captions`
export const SCENE_PHOTOS: { id: string; shot: Shot }[] = [
  { id: 'whu-room', shot: img('whu-room', 1600, 1067) },
  { id: 'whu-mentor', shot: img('whu-mentor', 1400, 933) },
  { id: 'whu-teams', shot: img('whu-teams', 1600, 1067) },
  { id: 'whu-edit', shot: img('whu-edit', 1400, 933) },
  { id: 'whu-host', shot: img('whu-host', 1600, 1066) },
  { id: 'whu-group', shot: img('whu-group', 2000, 1333) },
  { id: 'whu-break', shot: img('whu-break', 1600, 1066) },
  { id: 'whu-third', shot: img('whu-third', 1600, 1066) },
  { id: 'sdut-award', shot: img('sdut-award', 1600, 1200) },
  { id: 'sdut-group', shot: img('sdut-group', 1600, 1200) },
];

export const ARTICLES = {
  recruit: 'https://mp.weixin.qq.com/s/t0BXGcGquEw-oSFN-eLymg',
  whu: 'https://mp.weixin.qq.com/s/f8YP2nOPlm2J2Xehpsw1yQ',
  sdut: 'https://mp.weixin.qq.com/s/VQ1VLc0tO5OpRwJyqbKl0w',
  xiamen: 'https://mp.weixin.qq.com/s/gcFCqv1JmzVl27APwRF-Pg',
} as const;

// recap / call-for-entries article per stop
export const STOP_LINKS: Record<string, string> = { whu: ARTICLES.whu, sdut: ARTICLES.sdut, xiamen: ARTICLES.xiamen };

// the inbox address stays server-side (app/[lang]/contactAction.ts); visitors write through the form
export const CONTACT = {
  wechat: 'Eduathon',
};
