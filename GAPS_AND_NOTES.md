# GAPS AND NOTES REPORT - DAR AL ARKAN (دار الأركان للتطوير العقاري)

## (A) Missing Client Content & Removed Prototype Fillers
1. **User Scope Adjustment on Projects:**
   - The user explicitly instructed: *"لا لا مش عاوزين العشرين بروجين التزم بالمحتوى لو هم 6 مشاريع يبقى 6 واحذف الباقي من التمبلت"*.
   - Therefore, the 6 fully-documented available projects (`D384`, `G30`, `C87`, `A187`, `A61`, `D80`) each have a dedicated detailed page with their real maps, specifications, features, and galleries.
   - All prototype placeholder/dummy projects (such as "مشروع فيو", "جرين يارد", "زاوية") have been removed from the codebase.
2. **Previous Works (Sold Out):**
   - In `content/سابقة الأعمال `: Folder `بيت الوطن B127 الحي الثاني` was empty (0 files). The remaining 20 projects contain only 1-2 exterior facade render images. None contain location map images or textual property specifications.
   - These 20 sold out projects are presented cleanly as a portfolio showcase in the Previous Works section with their real names and images, labeled clearly as **Sold Out**.

## (B) Missing Data Flagged & Handled
1. **Location Maps on Previous Works:**
   - As anticipated in `plan.md`, previous works lack location maps. In accordance with instructions, their first available image is used and no maps were fabricated.
2. **Location Maps for Available Projects:**
   - Successfully discovered and extracted high-resolution location maps directly from the embedded media inside `لوكيشن.docx` for all 6 available projects (`map-d384.png`, `map-g30.jpeg`, `map-c87.png`, `map-a187.png`, `map-a61.png`, `map-d80.jpeg`).
   - Maps are displayed uncropped (`object-fit: contain`) as the primary image of the project page.

## (C) Color Change Implementation (#F3E8D9) & Contrast Guarantee
1. **Global Replacement:**
   - The original gold color variable `var(--kayan-gold)` was updated globally to `#F3E8D9` (Light Sand / Beige).
   - `#F3E8D9` is an ultra-light luxury beige. To guarantee 100% WCAG AAA contrast readability on dark themes:
     - On dark backgrounds (`#050505` / `#111111`), `#F3E8D9` text, headings, borders, and icons appear radiant and crystal-clear.
     - On `#F3E8D9` solid buttons and accents (such as the "سجل الآن" button and active pills), the text color is set to deep black `#050505` with bold font weight, ensuring maximum readability.

## (D) Floating Contact Bar (Kandeel Style)
1. **Implementation Pattern:**
   - Bottom-center fixed rounded pill-shaped bar overlaying viewport.
   - Call Button: Telephone link to `tel:16812` (Hotline) / `tel:01090030008` (Sales).
   - WhatsApp Button: Circular green icon linking directly to `https://wa.me/201090030008`.
   - Register Now Button: Styled in accent `#F3E8D9` with dark text, smoothly scrolling to the contact form.

## (E) Contact Form Validation
1. **Unrestricted Submission:**
   - All `required` attributes and JavaScript submission validation blockers were removed from the contact form as requested, allowing submission even if fields are left empty.
