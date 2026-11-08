/**
 * "Sieć połączeń" signature graphic: the hiring path as nodes and dotted lines.
 * Decorative (aria-hidden); the same path is stated in text next to it.
 * Exactly one active node (accent tint + brick stroke).
 */
export function NetworkGraphic() {
  const node = "#fffcfb";
  const stroke = "#d8cdd0";
  return (
    <svg className="drai-net" viewBox="0 0 420 320" aria-hidden="true" fill="none">
      <g stroke="#c9b9bc" strokeWidth="1" strokeDasharray="2 5" strokeLinecap="round">
        <path d="M70 80 C150 40 200 110 250 70" />
        <path d="M250 70 C330 40 370 120 360 170" />
        <path d="M70 80 C90 170 140 210 200 230" />
        <path d="M200 230 C260 250 320 230 360 170" />
        <path d="M200 230 C210 280 260 300 320 290" />
      </g>
      <g
        fontFamily="JetBrains Mono, ui-monospace, Menlo, monospace"
        fontSize="10"
        letterSpacing=".6"
        fill="#736b79"
      >
        <circle cx="70" cy="80" r="17" fill={node} stroke={stroke} />
        <text x="66" y="84" fill="#17161d">
          K
        </text>
        <text x="34" y="50">
          KANDYDAT
        </text>
        <circle cx="250" cy="70" r="17" fill={node} stroke={stroke} />
        <text x="241" y="74" fill="#17161d">
          {"{ }"}
        </text>
        <text x="224" y="40">
          PROJEKT
        </text>
        <circle cx="360" cy="170" r="17" fill={node} stroke={stroke} />
        <text x="356" y="174" fill="#17161d">
          F
        </text>
        <text x="342" y="208">
          FIRMA
        </text>
        <circle cx="200" cy="230" r="17" fill="#f3dcd4" stroke="#b5533c" />
        <text x="196" y="234" fill="#17161d">
          W
        </text>
        <text x="138" y="268">
          WŁASNY WKŁAD
        </text>
        <circle cx="320" cy="290" r="17" fill={node} stroke={stroke} />
        <text x="316" y="294" fill="#17161d">
          R
        </text>
        <text x="252" y="296">
          ROZMOWA
        </text>
      </g>
    </svg>
  );
}
