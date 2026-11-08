# Runtime typography

The application loads local Geist Serif Regular 400 from `docs/design-system/agent-kit/assets/fonts/GeistSerif-Regular.woff2` through Vite. Its SIL OFL license remains beside the font. All headings use this weight without synthetic bold. Body and controls use Arial/Helvetica/system sans; they make no remote font requests.

## Retained historical assets

# Timeless Sans Variable

`timeless-sans-variable.woff2` is the free Timeless Sans variable font served by the official
[Timeless Type](https://timeless.co/type) website. The vendor describes the Timeless family as
free for personal and commercial use.

The previous runtime used the Grotesk cut with `STYL` and `ital` pinned to `0`. These are existing implementation assets, not the target for new headings. Follow the accepted [design-system integration guide](../../../docs/design-system/README.md), which supplies local Geist Serif Regular and its license.

## Web-optimized Grotesk

`timeless-grotesk-web-variable.woff2` is generated from the original asset by
pinning `STYL=0` and `ital=0`, matching the existing global theme settings. It keeps
all 417 mapped Unicode characters, glyph coverage and the weight axis (300–800),
while discarding unused stylistic/italic interpolation. The original is retained.

Generate with FontTools `varLib.instancer` using those axis values and WOFF2 output;
preserve timestamps for repeatability. FontTools is asset tooling, not a runtime dependency.
These retained Timeless assets are no longer loaded by the application.

## "Sieć połączeń" fonts (employer candidate screens)

`siec-polaczen/` holds the three typefaces of the DoRoboty.ai design system "Sieć połączeń", loaded only by `src/app/siec-polaczen.css` under `.drai-theme`:

| File                                            | Family                                       | Role                 | Source                                                 |
| ----------------------------------------------- | -------------------------------------------- | -------------------- | ------------------------------------------------------ |
| `archivo-latin(-ext)-wdth-normal.woff2`         | Archivo, variable wght 100–900, wdth 62–125% | headings and UI      | Fontsource `@fontsource-variable/archivo` 5.3.0        |
| `instrument-serif-latin(-ext)-400-italic.woff2` | Instrument Serif Italic 400                  | human voice (quotes) | Fontsource `@fontsource/instrument-serif` 5.3.0        |
| `jetbrains-mono-latin(-ext)-wght-normal.woff2`  | JetBrains Mono, variable wght 100–800        | platform facts       | Fontsource `@fontsource-variable/jetbrains-mono` 5.3.0 |

All three are SIL Open Font License 1.1; the licenses are kept beside the files (`LICENSE-*.txt`). Only the latin and latin-ext subsets are included, which cover Polish diacritics. The files were copied from the npm package tarballs; the packages are not project dependencies and there are no remote font requests.
