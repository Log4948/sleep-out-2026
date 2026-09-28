# Sleep Out 2026 — Accenture × Covenant House

Campaign page for Accenture's 2026 Covenant House Sleep Out, built to be
shared company-wide: a short intro to the event with just enough data to
answer the obvious questions.

Open `index.html` in any browser. No build step, no dependencies.

---

## Files

| File | What it is |
| --- | --- |
| `index.html` | The main page |
| `share.html` | Fundraising toolkit (linked from the page, not inline) |
| `assets/js/content.js` | **All campaign content, figures, dates, links** |
| `assets/js/app.js` | Rendering and interaction (shared by both pages) |
| `assets/css/styles.css` | Design system and layout |

**To update the campaign you only need `content.js`.** Change the text between
the quotes, save, refresh.

---

## Page structure

1. **Hero** — Soldier Field, home of the Chicago Bears, the date, the
   $300,000 goal, two CTAs
2. **In brief** — who / what / when / your move, in four lines
3. **The goal** — $300,000, the progress rail, milestones, the $250 / $50
   asks, matching, and a link out to Covenant House for background
4. **Why we sleep out** — the solidarity statement
5. **Three ways to help** — Sleep Out / Donate / Help fundraise
6. **What to expect** — how the night goes
7. **Before you commit** — FAQ
8. **Closing CTA**

The page deliberately carries no explainer about Covenant House and no
impact statistics — the "More about Covenant House" button sends anyone who
wants that to Covenant House's own site, which keeps this page short enough
to share cold.

The fundraising toolkit lives on `share.html` so it doesn't clutter the main
page. "Open the toolkit" in section 5 and the footer link both go there.

---

## The things you'll most likely change

### Publish the live fundraising total

The site shows no running total until a real one exists. In `content.js`,
under `fundraising`:

```js
raisedToDate: null,        // → 128400
raisedAsOf: null,          // → 'October 14, 2026'
```

Set both and the progress rail fills, the percentage appears and the number
counts up. Leave `raisedToDate` as `null` and the site shows an honest
"live total coming soon" state. **Never enter an estimate here.**

To feed it from a system instead of by hand, define this before
`content.js` loads:

```html
<script>window.CAMPAIGN_LIVE = { raisedToDate: 128400, raisedAsOf: 'October 14, 2026' };</script>
```

### Change a link

All URLs live in `content.js` → `links`. Everything refers to them by name
(`REGISTRATION`, `DONATE`, …), so changing a URL once updates every button.

### Add photography

The hero is generated in CSS — a night sky, stadium floodlights, a Chicago
skyline silhouette and the four stars of the city flag. No image weight, no
licensing question. To use an approved photograph of Soldier Field instead:

```js
hero: { image: 'assets/img/hero.jpg', ... }
```

Drop the file in `assets/img/`. The generated sky and starfield switch off
automatically and the photo sits behind the same dark scrim, so the headline
stays legible.

### Emphasise a phrase in a headline

Wrap it in asterisks: `'A *lasting* impact.'` renders "lasting" in the
editorial serif italic. Once per headline at most.

---

## Decisions worth knowing about

**Every published claim is cited.** Anything factual on the page carries a
`source` URL that renders as a small link. The page gets forwarded to clients
and senior leaders, and a figure with a visible source survives scrutiny. If
you add a statistic, add its source — the rendering supports it.

**Claims verified before publication** (September 2026):

| Claim | Source |
| --- | --- |
| Soldier Field, Chicago; Nov 19–20 2026 | [sleepout.org/chicago](https://www.sleepout.org/chicago) |
| Dollar-for-dollar matching after 10 donations, $1,000 cap | [sleepout.org/accenture](https://www.sleepout.org/accenture) |
| 1.5 million young people since 1972 *(used in the toolkit messages)* | [covenanthouse.org/about-us](https://www.covenanthouse.org/about-us) |
| 34 cities, five countries *(used in the toolkit messages)* | [covenanthouse.org/locations](https://www.covenanthouse.org/locations) |

The Covenant House impact statistics were removed from the page itself — the
"More about Covenant House" link covers that ground. They remain in two of the
`share.html` message templates, where a sender needs something concrete to
put in front of a donor. All of them were verified against the sources above.

**⚠️ One figure needs your confirmation.** The brief specifies a **$250**
individual fundraising requirement, and that is what the site shows. However
[sleepout.org/chicago](https://www.sleepout.org/chicago) publishes a **$500**
minimum for that location. Minimums appear to vary by city. Confirm which
applies before this goes wide, and update `fundraising.individual[0].amount`
and the matching FAQ answer if needed. The site currently carries a visible note that
minimums vary by city.

**No participant data is used.** The referenced `FY27 Sleep out fundraisers.xlsx`
was not present in this folder, so no names, totals or leaderboard appear.

**Tone.** Section 4 states plainly that one night outside cannot replicate
homelessness. The framing is solidarity and funding, never equivalence — also
addressed head-on in the last FAQ answer, which is the question a sceptical
reader is actually thinking.

---

## Accessibility & robustness

- Keyboard navigable throughout; visible focus rings; skip link.
- `prefers-reduced-motion` disables all animation, count-ups and parallax.
- FAQ uses proper `aria-expanded` / `aria-controls`.
- Progress rail exposes its meaning to screen readers via `aria-label`.
- Prints cleanly (dark sections invert, URLs expand, FAQ opens).
- Responsive from 320px up; layout reflows rather than shrinking.

---

## Hosting

Any static host works. Upload the whole folder so the `assets/` paths and
`share.html` resolve. If you share the folder directly, recipients open
`index.html`.

One caveat when opening straight from the file system: browsers block the
clipboard API on `file://`, so the toolkit's "Copy message" button falls back
to an older copy method. It works, but served over `https://` it is cleaner.
