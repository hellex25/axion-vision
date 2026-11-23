# Pliant Project Axion — fișier pentru tipografie

**Fișier de trimis:** `pliant-project-axion-tipar.pdf`

| Specificație | Valoare |
|---|---|
| Format final (deschis) | A4 — 297 × 210 mm |
| Format cu bleed | 303 × 216 mm (3 mm bleed pe fiecare latură, fără semne de tăiere) |
| Pagini | 2 — pagina 1 = exterior, pagina 2 = interior (față-verso, întoarcere pe latura lungă) |
| Fălțuire | 2 biguri, tip „scrisoare” (roll fold) → format pliat 100 × 210 mm (DL) |
| Poziții big (de la marginea stângă a formatului final) | Exterior: 97 mm și 197 mm · Interior: 100 mm și 200 mm |
| Canate | 100 / 100 / 97 mm (canatul care intră în interior are 97 mm) |
| Culoare | RGB — tipografia face conversia în CMYK (cyanul neon se va tipări mai stins) |
| Fonturi | Geist / Geist Mono, încorporate în PDF |
| Hârtie recomandată | Carton lucios sau mat 170 g/m², cu bigiure (fundalul închis poate crăpa la pliere fără big) |

Previzualizări (fără bleed, liniile roz punctate = pliuri, nu se tipăresc):
`previzualizare-exterior.png`, `previzualizare-interior.png`.

## Regenerare
Editează `pliant.html`, apoi rulează `node print/pliant/build.mjs` (necesită Playwright cu Chromium).
