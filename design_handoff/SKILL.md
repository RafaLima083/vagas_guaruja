---
name: vagas-guaruja-design
description: Use this skill to generate well-branded interfaces and assets for Vagas Guarujá, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a local job-board product (PT-BR, green primary, Gupy-like modern direct tone).
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- **Brand:** Vagas Guarujá — local job board (Guarujá, SP, Brazil)
- **Language:** Brazilian Portuguese (PT-BR), always
- **Tone:** Modern, direct, warm — Gupy/Revelo vibe, addresses user as "você"
- **Primary color:** `#00A86B` (green-500), with `#0A4D3C` deep + `#FF6B35` coral accent (sparingly)
- **Typography:** Bricolage Grotesque (display) + Plus Jakarta Sans (body) + JetBrains Mono (data)
- **Radii:** 12px default, 16px hero, 999px pill
- **Shadows:** subtle, warm-tinted; cards have `--vg-shadow-sm`
- **Icons:** Lucide, stroke 1.75px, 20px default
- **No emoji** in UI. Aceitable in push notifications only (rarely).

## Files

- `README.md` — full guidelines (Content Fundamentals, Visual Foundations, Iconography, Index)
- `colors_and_type.css` — drop into any HTML; provides `--vg-*` tokens + `.vg-h1`, `.vg-body`, etc.
- `assets/logo.svg`, `assets/logo-mark.svg`, `assets/logo-mark-dark.svg` — brand marks
- `ui_kits/company_web/` — empresa (web admin)
- `ui_kits/candidate_app/` — candidato (mobile)
- `ui_kits/landing/` — marketing site
- `preview/*.html` — design-token cards (good to lift styles from)
