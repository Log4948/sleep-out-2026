/* =====================================================================
   SLEEP OUT 2026 — ACCENTURE × COVENANT HOUSE
   Rendering + interaction

   Content lives in assets/js/content.js (CAMPAIGN). This file only
   decides how it is presented. Every renderer checks that its mount
   point exists, so index.html and share.html can share this script.
   ===================================================================== */

(function () {
  'use strict';

  const C = window.CAMPAIGN || CAMPAIGN;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     Helpers
     --------------------------------------------------------------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const byId = (id) => document.getElementById(id);

  const esc = (s) =>
    String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  /* `*word*` in content becomes an editorial-serif emphasis. */
  const fmt = (s, cls) =>
    esc(s).replace(/\*([^*]+)\*/g, `<em class="${cls || 'accent'}">$1</em>`);

  /* A link may be a key from CAMPAIGN.links, a URL, or a local page. */
  const url = (ref) => (C.links && C.links[ref]) || ref || '#';

  const money = (n) => '$' + Number(n).toLocaleString('en-US');

  const setText = (id, value) => {
    const el = byId(id);
    if (el) el.textContent = value;
  };
  const setHTML = (id, value) => {
    const el = byId(id);
    if (el) el.innerHTML = value;
  };

  const maskedLines = (lines, accentClass) =>
    lines
      .map(
        (line, i) =>
          `<span class="line-mask"><span style="--line-delay:${i * 110}ms">${fmt(
            line,
            accentClass
          )}</span></span>`
      )
      .join('');

  const citeLink = (href, label, onNight) =>
    href
      ? `<a class="cite${onNight ? ' cite--on-night' : ''}" href="${esc(
          href
        )}" target="_blank" rel="noopener">${esc(label || 'Source')} ↗</a>`
      : '';

  function wireLinks(root) {
    $$('[data-link]', root).forEach((a) => {
      const href = url(a.getAttribute('data-link'));
      a.setAttribute('href', href);
      if (/^https?:/i.test(href)) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      }
    });
  }

  /* ---------------------------------------------------------------
     HERO
     --------------------------------------------------------------- */
  function renderHero() {
    if (!byId('heroHeadline')) return;

    setHTML('heroHeadline', maskedLines(C.hero.headline, 'accent'));
    setText('heroLede', C.hero.lede);
    setText('heroCta1', C.hero.primaryCta.label);
    setText('heroCta2', C.hero.secondaryCta.label);
    setText('heroScroll', C.hero.scrollCue);
    setText('heroGoalLabel', C.hero.goalLabel);

    const goal = byId('heroGoal');
    if (goal) {
      goal.setAttribute('data-countup', C.hero.goalValue);
      goal.textContent = money(C.hero.goalValue);
    }

    // The goal detail lives here rather than in a section of its own:
    // the first milestone always, plus the live total once one exists.
    // Nothing is shown for a total that has not been verified.
    const f = C.fundraising || {};
    const notes = [];
    if (typeof f.raisedToDate === 'number' && f.raisedToDate >= 0) {
      const pct = Math.round((f.raisedToDate / f.goal) * 100);
      notes.push(
        `<strong>${money(f.raisedToDate)} raised so far</strong>, ${pct}% of goal${
          f.raisedAsOf ? ' as of ' + esc(f.raisedAsOf) : ''
        }`
      );
    }
    if (C.hero.goalMilestone) {
      notes.push('First milestone: ' + esc(C.hero.goalMilestone));
    }
    setHTML('heroGoalNote', notes.join('<br>'));

    // Venue block — the flagship site gets display treatment, marked
    // with the four stars of the Chicago flag.
    const v = C.hero.venue;
    if (v) {
      setHTML(
        'venue',
        `${v.label ? `<span class="venue__label">${esc(v.label)}</span>` : ''}
         <span class="venue__name">
           <span class="venue__stars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
           <span class="venue__place">${esc(v.place)}</span>
           <span class="venue__stars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
         </span>
         ${v.tagline ? `<span class="venue__tagline">${esc(v.tagline)}</span>` : ''}
         <span class="venue__meta">
           <span class="venue__date">${esc(v.date)}</span>
           ${v.note ? `<span class="venue__sep" aria-hidden="true"></span>
                       <span class="venue__note">${esc(v.note)}</span>` : ''}
         </span>`
      );
    }

    // Optional approved photograph behind the generated night treatment.
    if (C.hero.image) {
      const img = document.createElement('img');
      img.className = 'hero__photo';
      img.src = C.hero.image;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      const hero = $('.hero');
      if (hero) hero.prepend(img);
    }

    requestAnimationFrame(() => {
      $$('#heroHeadline .line-mask').forEach((m) => m.classList.add('is-in'));
    });

    if (goal) setTimeout(() => countUp(goal), 600);
  }

  /* ---------------------------------------------------------------
     ORIENTATION
     --------------------------------------------------------------- */
  function renderOrientation() {
    if (!byId('orientGrid')) return;
    setHTML(
      'orientGrid',
      C.orientation
        .map(
          (o, i) => `
        <div class="orient__item" data-reveal style="--reveal-delay:${i * 90}ms">
          <div class="orient__label">${esc(o.label)}</div>
          <p class="orient__text">${esc(o.text)}</p>
        </div>`
        )
        .join('')
    );
  }

  /* ---------------------------------------------------------------
     WHY WE SLEEP OUT
     --------------------------------------------------------------- */
  function renderWhy() {
    if (!byId('whyStatement')) return;
    const w = C.why;

    setText('whyLabel', w.sectionLabel);
    setHTML('whyStatement', maskedLines(w.statement, 'soft'));
    setText('whyBody', w.body);
    setText('whyCta', w.cta.label);

    const ctaSpan = byId('whyCta');
    if (ctaSpan && ctaSpan.closest('a')) {
      ctaSpan.closest('a').setAttribute('data-link', w.cta.href);
    }

    setHTML(
      'pillars',
      w.pillars
        .map(
          (p, i) => `
        <div class="pillar" data-reveal style="--reveal-delay:${i * 110}ms">
          <div class="pillar__num">${esc(p.number)}</div>
          <h3 class="pillar__title">${esc(p.title)}</h3>
          <p class="pillar__text">${esc(p.text)}</p>
        </div>`
        )
        .join('')
    );
  }

  /* ---------------------------------------------------------------
     THREE WAYS TO HELP
     --------------------------------------------------------------- */
  function renderPathways() {
    if (!byId('paths')) return;
    const p = C.pathways;

    setText('pathLabel', p.sectionLabel);
    setHTML(
      'paths',
      p.items
        .map(
          (it, i) => `
        <article class="path" data-reveal style="--reveal-delay:${i * 100}ms">
          <div class="path__num">${esc(it.number)}</div>
          <div>
            <h3 class="path__title">${esc(it.title)}</h3>
            <div class="path__commit">${esc(it.commitment)}</div>
          </div>
          <div class="path__body">
            <p class="path__text">${esc(it.text)}</p>
            ${it.requirement
              ? `<p class="path__req">${esc(it.requirement)}</p>`
              : ''}
          </div>
          <div class="path__cta">
            <a class="btn" data-link="${esc(it.cta.href)}" href="#">
              <span>${esc(it.cta.label)}</span>
              <span class="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </article>`
        )
        .join('')
    );
  }

  /* ---------------------------------------------------------------
     WHAT TO EXPECT
     --------------------------------------------------------------- */
  function renderExpect() {
    if (!byId('timeline')) return;
    const e = C.expect;

    setText('expectLabel', e.sectionLabel);
    setHTML('expectHeading', fmt(e.heading));
    setText('expectLede', e.lede);
    setText('expectNote', e.note);

    setHTML(
      'timeline',
      e.timeline
        .map(
          (t) => `
        <div class="timeline__item">
          <div class="timeline__time">${esc(t.time)}</div>
          <div>
            <h3 class="timeline__title">${esc(t.title)}</h3>
            <p class="timeline__text">${esc(t.text)}</p>
          </div>
        </div>`
        )
        .join('')
    );
  }

  /* ---------------------------------------------------------------
     FAQ
     --------------------------------------------------------------- */
  function renderFaq() {
    if (!byId('faqList')) return;

    setText('faqLabel', C.faq.sectionLabel);
    setHTML('faqHeading', fmt(C.faq.heading));

    setHTML(
      'faqList',
      C.faq.items
        .map(
          (item, i) => `
        <div class="faq__item">
          <h3 style="margin:0">
            <button class="faq__q" type="button" id="faq-q-${i}"
                    aria-expanded="false" aria-controls="faq-a-${i}">
              <span>${esc(item.q)}</span>
              <span class="faq__icon" aria-hidden="true"></span>
            </button>
          </h3>
          <div class="faq__a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
            <div class="faq__a-inner"><p>${esc(item.a)}</p></div>
          </div>
        </div>`
        )
        .join('')
    );

    $$('.faq__q').forEach((btn) => {
      btn.addEventListener('click', () => {
        const panel = byId(btn.getAttribute('aria-controls'));
        const open = btn.getAttribute('aria-expanded') === 'true';

        // One open at a time keeps the section calm.
        $$('.faq__q').forEach((other) => {
          if (other === btn) return;
          other.setAttribute('aria-expanded', 'false');
          const p = byId(other.getAttribute('aria-controls'));
          if (p) p.style.height = '0px';
        });

        btn.setAttribute('aria-expanded', String(!open));
        panel.style.height = open ? '0px' : panel.scrollHeight + 'px';
      });
    });

    window.addEventListener('resize', () => {
      $$('.faq__q[aria-expanded="true"]').forEach((btn) => {
        const p = byId(btn.getAttribute('aria-controls'));
        if (p) p.style.height = p.scrollHeight + 'px';
      });
    });
  }

  /* ---------------------------------------------------------------
     FOOTER (both pages)
     --------------------------------------------------------------- */
  function renderFooter() {
    if (!byId('footerLinks')) return;
    setHTML(
      'footerLinks',
      C.footer.quickLinks
        .map((l) => {
          const href = url(l.href);
          const external = /^https?:/i.test(href);
          return `<li><a data-link="${esc(l.href)}" href="#">${esc(l.label)}${
            external ? ' ↗' : ''
          }</a></li>`;
        })
        .join('')
    );
    setText('footerSources', C.footer.sourcesNote);
    setText('footerDisclaimer', C.footer.disclaimer);
    setText('footerMetaLeft', C.meta.eyebrow + ' · ' + C.meta.campaignName);
    setText('footerMetaRight', 'Content reviewed ' + C.meta.contentReviewed);
  }

  /* ---------------------------------------------------------------
     FUNDRAISING TOOLKIT (share.html)
     --------------------------------------------------------------- */
  const PLACEHOLDERS = { '{{NAME}}': '[Name]', '{{YOU}}': '[Your name]' };

  function resolveTemplate(body) {
    const input = byId('linkInput');
    const link = (input && input.value.trim()) || url('ACCENTURE_SLEEPOUT');
    let out = body.replace(/\{\{LINK\}\}/g, link);
    Object.keys(PLACEHOLDERS).forEach((k) => {
      out = out.split(k).join(PLACEHOLDERS[k]);
    });
    return out;
  }

  function renderTemplateBodies() {
    $$('.template').forEach((el) => {
      const resolved = resolveTemplate(el.getAttribute('data-body'));
      // Highlight the parts the sender still has to fill in.
      $('.template__body', el).innerHTML = esc(resolved).replace(
        /\[(Name|Your name)\]/g,
        '<span class="token">[$1]</span>'
      );
    });
  }

  function renderToolkit() {
    if (!byId('templates')) return;
    const t = C.toolkit;

    setText('toolkitLabel', t.sectionLabel);
    setHTML('toolkitHeading', fmt(t.heading));
    setText('toolkitLede', t.lede);

    const input = byId('linkInput');
    if (input) input.placeholder = t.linkPlaceholder;

    setHTML(
      'templates',
      t.templates
        .map(
          (tpl) => `
        <div class="template" data-body="${esc(tpl.body)}">
          <div class="template__head">
            <span class="template__channel">${esc(tpl.channel)}</span>
          </div>
          ${tpl.subject ? `<p class="template__subject">${esc(tpl.subject)}</p>` : ''}
          <p class="template__body"></p>
          <button class="copy-btn" type="button"><span>Copy message</span></button>
        </div>`
        )
        .join('')
    );

    setHTML(
      'tips',
      t.tips
        .map(
          (tip, i) => `
        <div class="tip">
          <span class="tip__num">${String(i + 1).padStart(2, '0')}</span>
          <span>${esc(tip)}</span>
        </div>`
        )
        .join('')
    );

    renderTemplateBodies();
    if (input) input.addEventListener('input', renderTemplateBodies);

    $$('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const text = resolveTemplate(btn.closest('.template').getAttribute('data-body'));
        const label = $('span', btn);
        const done = () => {
          label.textContent = 'Copied';
          btn.classList.add('is-copied');
          setTimeout(() => {
            label.textContent = 'Copy message';
            btn.classList.remove('is-copied');
          }, 2000);
        };

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
        } else {
          fallbackCopy(text, done);
        }
      });
    });
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      done();
    } catch (e) {
      /* Copy unavailable — the text stays selectable on the page. */
    }
    document.body.removeChild(ta);
  }

  /* ---------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------- */
  function initReveal() {
    const targets = $$('[data-reveal]');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-in'));
      $$('.line-mask').forEach((m) => m.classList.add('is-in'));
      const why = $('.why');
      if (why) why.classList.add('is-in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          $$('.line-mask', entry.target).forEach((m) => m.classList.add('is-in'));
          countUp(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((t) => io.observe(t));

    // Sections with their own entrance behaviour.
    const sectionIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          $$('.line-mask', e.target).forEach((m) => m.classList.add('is-in'));
          sectionIO.unobserve(e.target);
        });
      },
      { threshold: 0.2 }
    );
    [$('.why')].forEach((el) => el && sectionIO.observe(el));
  }

  /* ---------------------------------------------------------------
     Number count-up
     --------------------------------------------------------------- */
  function countUp(scope) {
    const els =
      scope.hasAttribute && scope.hasAttribute('data-countup')
        ? [scope]
        : $$('[data-countup]', scope);

    els.forEach((el) => {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';

      const target = Number(el.getAttribute('data-countup'));
      if (!isFinite(target) || reduceMotion) return;

      const display = el.getAttribute('data-display');
      const prefix = el.getAttribute('data-prefix') || '';
      const final = el.textContent;
      const duration = 1500;
      const start = performance.now();

      const frame = (now) => {
        // Clamped at both ends: a frame timestamp predating `start`
        // would otherwise drive the eased value negative.
        const p = Math.min(1, Math.max(0, (now - start) / duration));
        const eased = 1 - Math.pow(1 - p, 4);
        if (p < 1) {
          const current = Math.round(target * eased);
          el.textContent = display
            ? formatLike(display, current)
            : prefix + current.toLocaleString('en-US');
          requestAnimationFrame(frame);
        } else {
          el.textContent = final;
        }
      };
      requestAnimationFrame(frame);
    });
  }

  /* Counts "4.2 million" / "1.5 million+" / "57,000" in their own format. */
  function formatLike(display, current) {
    if (/million/i.test(display)) {
      const suffix = display.replace(/[\d.,]+\s*/, '');
      return (current / 1e6).toFixed(1) + ' ' + suffix;
    }
    const trailing = display.replace(/[\d.,]+/, '');
    return current.toLocaleString('en-US') + trailing;
  }

  /* ---------------------------------------------------------------
     Navigation: stuck state, scroll progress, action bar
     --------------------------------------------------------------- */
  function initChrome() {
    const nav = byId('nav');
    const progress = byId('navProgress');
    const bar = byId('actionbar');
    const hero = $('.hero');
    const closing = $('.closing');

    if (!nav) return;

    // Sub-pages have no hero, so the nav starts in its solid state.
    if (!hero) nav.classList.add('is-stuck');

    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const heroBottom = hero ? hero.offsetHeight - 80 : 0;

      if (hero) nav.classList.toggle('is-stuck', y > heroBottom);

      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.setProperty('--progress', max > 0 ? y / max : 0);
      }

      // Show the action bar after the hero, hide it over the closing CTA
      // so the two calls to action never compete.
      if (bar) {
        const closingTop = closing ? closing.getBoundingClientRect().top : Infinity;
        bar.classList.toggle(
          'is-visible',
          y > heroBottom && closingTop > window.innerHeight * 0.75
        );
      }

      if (!reduceMotion && hero && y < window.innerHeight) {
        const stars = byId('stars');
        if (stars) stars.style.transform = `translateY(${y * 0.18}px)`;
      }

      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  /* ---------------------------------------------------------------
     Hero starfield
     Generated rather than an image, so the hero carries no asset
     weight and no licensing question. Skipped if a photo is supplied.
     --------------------------------------------------------------- */
  function initStars() {
    const canvas = byId('stars');
    if (!canvas) return;
    if (C.hero.image) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    let stars = [];
    let raf = null;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((w * h) / 11000);
      stars = Array.from({ length: Math.min(count, 200) }, () => ({
        x: Math.random() * w,
        // Kept to the upper sky so stars sit above the skyline.
        y: Math.random() * h * 0.62,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.55 + 0.25,
        // A slow, uneven twinkle — never a uniform blink.
        speed: Math.random() * 0.0011 + 0.0003,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const draw = (t) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        const alpha = reduceMotion
          ? s.a
          : s.a * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase));
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    build();
    draw(0);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (reduceMotion) draw(0);
      }, 200);
    });

    // Stop animating while the hero is off screen.
    if ('IntersectionObserver' in window && !reduceMotion) {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              if (!raf) raf = requestAnimationFrame(draw);
            } else if (raf) {
              cancelAnimationFrame(raf);
              raf = null;
            }
          });
        },
        { threshold: 0 }
      ).observe(canvas);
    }
  }

  /* ---------------------------------------------------------------
     Boot — each renderer no-ops if its section isn't on this page.
     --------------------------------------------------------------- */
  function init() {
    document.title = C.meta.pageTitle && byId('heroHeadline')
      ? C.meta.pageTitle
      : document.title;

    renderHero();
    renderOrientation();
    renderWhy();
    renderPathways();
    renderExpect();
    renderFaq();
    renderToolkit();
    renderFooter();

    wireLinks(document);
    initReveal();
    initChrome();
    initStars();

    document.documentElement.classList.add('is-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
