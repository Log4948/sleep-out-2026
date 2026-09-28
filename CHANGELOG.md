# Changelog

## 2026-09-27 (later)

- Removed the three pillars (Solidarity, Awareness, Funding) from the "Why we sleep out" section in `assets/js/content.js` — they were restating the body copy rather than adding new information
- Removed the closing sentence "The discomfort ends at sunrise. The funding does not." from the same body paragraph — the point is made without it
- Fixed a JS syntax error introduced by the previous edit: a curly left-quote (U+2018) was left as the closing delimiter of the `body` string in `assets/js/content.js`, causing the parser to treat the rest of the file as string content and silently break all dynamic rendering

## 2026-09-27

- Removed the closing "Give up one night. Change what comes next." section entirely — it duplicated the hero and the pathway CTAs without adding anything
- Removed the standalone "The goal" section from the page body — the $300,000 figure, live total (when available) and first milestone now render in the hero under the goal value, where they sit alongside the primary CTA rather than repeating it further down
- Rewrote the "What to expect" timeline to reflect the actual event: arrive and check in on the field, hear leaders from Covenant House and Accenture speak, sleep out overnight in a sleeping bag on a hard surface, then carry the fatigue into the next work day as a small glimpse of perspective
- Added a marked requirement line to the Sleep Out pathway — "You must raise $250 to take part in the Sleep Out." — styled with a left border so it reads as a condition rather than body copy
- Stripped `fundraising` back to the four keys that are actually used: `goal`, `raisedToDate`, `raisedAsOf`, `participantMinimum` — removed the $100K milestone block, $50 gift, matching note and "More about Covenant House" button from the section content
- Removed `renderGoal()` and `renderClosing()` from `assets/js/app.js` and their calls in `init()` — the functions no longer exist and their mount points are gone from the HTML
- Removed all CSS for the goal block (`.goal__top`, `.goal__figure`, `.rail`, `.marker`, `.ask`, `.goal__match`) and the closing section (`.closing` and its children) from `assets/css/styles.css`
- Added `.hero__goal-note` CSS rule to show the milestone and live total as a small line under the goal figure in the hero; added `.path__req` rule for the left-bordered requirement line on the Sleep Out pathway

## 2026-09-25 (copy pass)

- Removed every em dash from the rendered copy across both pages, rewriting the sentences rather than swapping in commas, so the punctuation change does not leave clauses reading awkwardly
- Recast the affected lines as full stops or colons where a comma would have stacked a third clause, e.g. `Say what the money does: beds, meals, counseling, job training. Not just that you are sleeping outside.`
- Renamed two toolkit channel labels that had used a dash as a separator: `Email to your network` and `Short message for Teams or chat`
- Changed the browser titles and the live-total line to use a middot or comma in place of a dash
- Left the decorative hairlines in the hero eyebrow and section labels in place; they are rules in the design system rather than punctuation

## 2026-09-25 (later)

- Removed the Covenant House explainer paragraph and the four impact statistics, replaced by a single "More about Covenant House" button linking to their own site — the page no longer duplicates background a visitor can get first-hand
- Kept the fundraising block (the $300,000 figure, progress rail, milestones, $250/$50 asks and matching note), since none of that exists on the Covenant House page and it is the actual ask
- Renamed the `cause` content key to `fundraising` now that the section is only about the goal; `window.CAMPAIGN_LIVE` assigns to `CAMPAIGN.fundraising`
- Promoted Soldier Field from a caption to a hero display element — "SOLDIER FIELD" at headline scale flanked by the four stars of the Chicago flag, with "Home of the Chicago Bears" beneath in serif italic, over a field-marking rule of evenly spaced yard ticks
- Worked the venue into the intro strip, the Sleep Out pathway and the closing line, so the Bears stadium reads as the draw rather than a detail
- Removed the rule above the hero body — the venue block already divided the hero, so the two rules stacked
- Tightened the glow behind the venue name from 38px to 22px; at the wider radius it read as a rectangular smudge rather than stadium light
- Left the `.stat` styles in the stylesheet unused, so figures can be reinstated without rebuilding them

## 2026-09-25

- Cut the page back to flyer level — it was reading as an overbuilt microsite rather than a short intro to the event that can be shared company-wide
- Removed the "Accenture teams are sleeping out across the country" locations list, the "This isn't a one-night relationship" Dove Learning Center section, and the bring/leave-at-home packing lists — operational detail that belongs in the registration follow-up, not a shareable intro
- Merged "A door that opens, every hour of every day" and "What we are raising, and by when" into one section under two plain subheads, "Who we're raising for." and "What we're raising." — two separate sections were saying one thing twice
- Moved the fundraising toolkit to its own page, `share.html`, reached by an "Open the toolkit" button — it was the longest block on the page and only matters to people who have already signed up
- Removed the "Pick the one that fits your November" heading, leaving the three pathways under a plain "Three ways to help" label
- Added a Soldier Field / Chicago treatment to the hero: a CSS skyline silhouette, stadium floodlight beams, a cool horizon glow, and a venue band reading "Soldier Field · Chicago · November 19, 2026" marked with the four six-pointed stars of the Chicago flag — the venue is the campaign's strongest draw
- Confirmed Soldier Field and the November 19–20 dates against sleepout.org/chicago before featuring them
- Scoped the Chicago light blue to the venue band and horizon glow only, so the local cue never competes with the Accenture accent
- Added a bottom scrim and more hero padding so the headline, CTAs and goal figure clear the skyline silhouette
- Trimmed the hero lede, orientation strip and Covenant House description to roughly half their previous length, and changed the orientation strip's third item from "Why us" to "When" so the date lands in the first ten seconds
- Made every renderer in `assets/js/app.js` no-op when its mount point is absent, so `index.html` and `share.html` share one script; the nav starts in its solid state on pages without a hero
- Removed the message-template token background fill — it was padding the highlight away from adjacent punctuation, rendering "Hi [Name] ," instead of "Hi [Name],"
- Deleted the now-orphaned CSS for the removed sections and their mobile overrides

## 2026-09-24

- Built the Accenture × Covenant House Sleep Out 2026 campaign microsite as a dependency-free static site — `index.html`, `assets/css/styles.css`, `assets/js/app.js`, `assets/js/content.js` — so it runs from a file share, SharePoint or any static host with no build step
- Separated all campaign content into `assets/js/content.js` — figures, dates, copy, links and message templates live in one file so non-developers can update the campaign without touching layout code
- Verified every Covenant House statistic against published sources before including it, and attached a `source` URL to each figure that renders as a visible citation — the page is meant to be forwarded to clients and senior leaders, where an uncited number invites doubt
- Used "since 1972" instead of the supplied "more than 53 years" — it matches what Covenant House publishes and does not drift out of date
- Architected the fundraising display to render an honest "live total coming soon" state while `fundraising.raisedToDate` is `null`, with a `window.CAMPAIGN_LIVE` hook for later integration — no placeholder or estimated total is ever shown
- Flagged a conflict between the supplied $250 individual requirement and the $500 minimum published on sleepout.org/chicago — the site shows $250 with a visible "minimums vary by city" note, and `README.md` records the discrepancy for confirmation before wide distribution
- Omitted any participant roster or leaderboard — the referenced `FY27 Sleep out fundraisers.xlsx` was not present in the folder, so no participant data appears anywhere
- Added a fundraising toolkit with four editable message templates that rewrite themselves around a pasted fundraising link, plus copy-to-clipboard with a fallback for `file://` contexts where the clipboard API is blocked
- Fixed a count-up animation that rendered negative values (`$-386,809`) — the elapsed-time fraction was clamped at the upper bound only, so a frame timestamp predating the start drove the eased value below zero (`assets/js/app.js`)
- Fixed headline descenders being clipped by the line-reveal masks — headlines run a line-height below 1, so glyphs overflow their line box; the masks now carry compensating padding and negative margin (`assets/css/styles.css`)
- Removed a decorative horizon rule from the "Why we sleep out" section — it was positioned at 50% height and struck through the body copy like a strikethrough
- Replaced the tinted panel behind the matching note with a hairline rule, and swapped `filter: brightness()` on the accent for a defined `--purple-on-night` token — both were pushing Accenture purple toward magenta and reading as a lilac wash
- Moved small accent text on light backgrounds to `--purple-deep` — the bright accent falls below AA contrast at those sizes
- Converted British spellings to US throughout the copy (organization, counseling, organizer) to match the US campaign audience
- Added `README.md` documenting the content model, the live-total hook, the verified-statistics table with sources, and the $250/$500 discrepancy
