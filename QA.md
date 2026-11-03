# Portfolio QA

## Palette refinement — 1 November 2026

The post-hero sections now use navy, blue, and white. The portrait hero, header, project content, layouts, and motion were preserved.

- `npm run build` passed (TypeScript and Vite production build).
- Browser screenshots were captured before and after at 1440×900, 768×1024, and 390×844. No horizontal overflow was measured.
- All 52 hero/header elements retain their computed colors, backgrounds, fonts, borders, widths, and heights at all three sizes (0.01px tolerance for SVG bounds).
- Computed text contrast passes for the portfolio outside the individual illustrative project UIs: secondary text is 10.83:1 on navy and 6.40:1 on white; light blue links are 10.08:1 on navy; pale text is 5.41:1 on cobalt.
- TravelBit project details and Trident archive details open and close correctly.
- Impeccable's detector returned no findings for the changed UI files. The new theme stylesheet also passes Taste's source checks. Existing decorative conventions in the original source remain outside this color-only refinement.
- Screenshots and measurement reports are saved in `outputs/palette-qa/`.

The earlier full-site review below describes the original implementation.

Checked 29 October 2026 against the supplied portfolio brief and resume. The reviewed application was the production build served at `http://127.0.0.1:4173`.

## Results

`npm run build` passed its TypeScript check and Vite production build. The final Taste browser inspection exited **0**, with **0 FAIL findings** and two explained style warnings. Evidence is saved in `.taste-skill/final-inspect/report.json`, `inspection-output.txt`, and the viewport screenshots/contact sheets.

| Check               | Evidence and result                                                                                                                                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Desktop             | Browser inspection and visual review at 1440×900; two-line hero, loaded sculpture, readable project chapters, no horizontal overflow.                                                                                               |
| Tablet              | Browser inspection and visual review at 768×1024; alternating project composition remains within the viewport.                                                                                                                      |
| Mobile              | Browser inspection at 390×844 and separate interactive browser checks at 360×800; heading fits, body copy is 16px, no horizontal overflow. The inspector's unsupported 360px height default was not used as mobile-layout evidence. |
| Navigation          | View projects reaches `#work`. At 360px, Menu opens, Escape closes it and restores focus to `#menu-toggle`, and Let’s talk reaches `#contact` while closing the menu.                                                               |
| Project disclosures | TravelBit summary opens with Enter and closes with Space. Trident details open and show purpose, contribution, technologies, and the project-specific up-to-10x result.                                                             |
| Contact             | Rendered `mailto:` and `tel:` values match the supplied resume.                                                                                                                                                                     |
| Resume              | HTTP 200, `application/pdf`, 8,097 bytes. The served production PDF SHA-256 matches the supplied PDF.                                                                                                                               |
| Missing images      | The currently absent screenshots display explicitly labeled illustrative fallbacks. Browser inspection reports no remaining broken-image elements.                                                                                  |
| Reduced motion      | Automated comparison passes the reduced-hidden check. Source disables GSAP reveals/crossover and selects the static sculpture when reduced motion is requested.                                                                     |
| Text and geometry   | No final contrast, small-text, covered-text, headline-lines, or overflow findings at 1440, 768, or 390px. The mobile decorative name spacing was visually rechecked after correction.                                               |
| Browser errors      | No JavaScript console errors reported at the three automated viewports.                                                                                                                                                             |
| Scene lifecycle     | Source reviewed for separate lazy import, DPR cap of 1.5, offscreen/hidden-tab pause, disposal, static fallback, and ambient movement settling within 4.5 seconds.                                                                  |

Additional interactive checks passed at 768px: all eight project disclosures opened with Enter, exposed all eight purpose sections, and closed with Space, without horizontal overflow. A temporary 400 × 1200px WebP fixture was served in the production output at 360px: both its green top and red bottom remained fully visible with object-fit containment. The fixture was removed, the project rebuilt, and the labeled fallback restored. Incoming project hashes were also checked after reload, and mobile copy spacing was corrected.

No physical-device touch test, screen-reader session, or field performance measurement was performed. The large Three.js dependency ships in its own lazy chunk (about 132kB gzip), separate from the main text/navigation bundle.

## Design direction and exceptions

Taste direction seed **140477700** is retained in `.taste-skill/direction.json`. Its pinned-series idea informs the compact desktop project index and changing editorial chapters. The user's specific brief takes precedence over the seed's photographic hero and large pinned-title treatment: the implementation uses Inter, charcoal/off-white/cobalt, an unobstructed headline, an architectural Three.js sculpture, numbered projects, and labeled preview placeholders.

The inspection allows `hairline`, `numbering`, and `outlined-box` for the requested subtle borders, chapter numbers, and interface panels; `gradient` and `shadow` for sculptural materials/depth; and `few-pictures`, `no-real-pictures`, and `no-footage` because real project screenshots will be supplied later. Palette detections span separate illustrative previews rather than the page's pinned cobalt identity. The eyebrow/card exceptions cover informational project labels and horizontal capability rows, including a detector match in collapsed archive content. Actual overflow, contrast, small-text, broken-image, headline, and reduced-motion checks remain enabled.

Two non-blocking style warnings remain:

- **Size-count:** the inspector counts 19 computed font sizes across fluid display lettering, headings, body text, and compact metadata. The visible hierarchy is deliberate and the actual reading copy remains 16–18px.
- **Grey-body:** secondary body ink is measured at **5.3:1**, above the 4.5:1 AA text threshold. The tool prefers 7:1; the selected contrast preserves the requested restrained hierarchy.

## Visual assessment

**7.5/10 for this first version.** The typography, asymmetric project sequence, restrained sculpture, and cobalt contact close form a coherent portfolio. The large illustrative previews make the project types easy to distinguish, but they cannot provide the evidence or specificity of real screenshots. Supplying those images is the most valuable next improvement. This score is a design judgment, not a performance or accessibility certification.
