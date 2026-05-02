# Your Personal Website — How It Works

A multi-page personal website with a minimalist, artistic design.

## Design

- **Color palette**: Space Cadet · UCLA Blue · Pink Lavender · Cyan Azure · Air Superiority Blue
- **Typography**: Fraunces (display serif) + Manrope (body) + Noto Serif TC (Chinese)
- **Aesthetic**: Minimalist with artistic touches — soft pink-lavender blobs, color-block sections, generous whitespace

## Files

| File | What it is |
|------|------------|
| `index.html` | **Home** — featured artworks, services, booking |
| `about.html` | **About** — bio + full CV |
| `artworks.html` | **Artworks** — exhibitions and awards |
| `workshops.html` | **Workshops** — offerings + past sessions |
| `psychology.html` | **Psychology** — clinical philosophy + approaches |
| `contact.html` | **Contact** — email, form, booking |
| `styles.css` | **Shared styles** — controls everything |

## Upload to GitHub

1. Go to `github.com/stephy56/stephy56.github.io`
2. **Delete the old files** (the old `index.html`, etc.)
3. Click **Add file → Upload files**
4. **Drag all 7 files** (HTML + CSS + README) into the upload area
5. Scroll down → **Commit changes**
6. Wait 1–2 minutes, then visit `https://stephy56.github.io`

## Customize colors

All colors live in `styles.css` at the top. Change these and they update everywhere:

```css
--space-cadet: #102B53;   /* Deep navy text */
--ucla: #50698D;          /* Medium blue */
--lavender: #CEB5D4;      /* Pink lavender accent */
--cyan-azure: #4E7AB1;    /* Saturated mid blue */
--air-blue: #7D9FC0;      /* Soft sky blue */
```

## Adding artwork images

Create an `images/` folder in your repo, upload artwork JPGs, and replace placeholder cards with `<img>` tags. I can walk you through this when you're ready.
