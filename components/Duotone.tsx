// SVG filter that maps an image onto the site palette — shadows navy, mid-tones blue, highlights pale sky —
// so stills with very different colours read as one strip. Use with `filter: url(#fz-duotone)`.
export function Duotone() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden focusable="false">
      <filter id="fz-duotone" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.30 0.59 0.11 0 0  0.30 0.59 0.11 0 0  0.30 0.59 0.11 0 0  0 0 0 1 0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.082 0.29 0.90" />
          <feFuncG type="table" tableValues="0.157 0.62 0.95" />
          <feFuncB type="table" tableValues="0.29 0.90 0.99" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
