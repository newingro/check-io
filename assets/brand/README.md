# Asset del brand CHECK-iO

- `logo-original.jpg` — logo originale fornito (raster su fondo nero).
- Le varianti in `public/brand/` sono estratte dal file originale con
  `scripts/brand/extract-logo.py`, **senza modificare le geometrie**:
  - `logo-full.png` / `logo-wordmark.png`: colori originali su trasparenza (per fondi chiari);
  - `logo-full-white.png` / `logo-wordmark-white.png`: wordmark bianco + simbolo turchese (per fondi scuri);
  - `symbol.png`: simbolo "iO" usato per favicon e icone.

## Sostituzione con gli SVG ufficiali

Quando saranno disponibili i file vettoriali ufficiali:

1. copiarli in `public/brand/` (es. `logo-full.svg`, `logo-wordmark.svg`, versioni `-white`);
2. aggiornare `src/components/layout/Logo.tsx` (estensione e dimensioni intrinseche);
3. rigenerare `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/favicon.ico` dal simbolo vettoriale.
