/* =====================================================================
   CAMPAIGN CONTENT & CONFIGURATION
   ---------------------------------------------------------------------
   Single source of truth for every campaign detail on the site.
   Edit the text between the quotes. Don't remove commas or brackets.

   Two rules baked in:
   1. Every published statistic carries a `source` so it can be checked.
   2. `fundraising.raisedToDate` stays null until a real total exists —
      the site then shows an honest "not yet published" state instead of
      inventing a progress figure.
   ===================================================================== */

const CAMPAIGN = {

  /* --------------------------------------------------------------- */
  meta: {
    eyebrow: 'Accenture × Covenant House',
    campaignName: 'Sleep Out 2026',
    pageTitle: 'Sleep Out 2026 · Accenture × Covenant House',
    description:
      'November 19 at Soldier Field. Accenture colleagues are giving up their beds for one night to support Covenant House and young people facing homelessness.',
    contentReviewed: 'September 2026'
  },

  /* ---------------------------------------------------------------
     HERO
     --------------------------------------------------------------- */
  hero: {
    // Wrap words in *asterisks* for the editorial serif italic.
    headline: ['One night outside.', 'A *lasting* impact.'],
    lede:
      'Accenture colleagues are sleeping out for one night to support Covenant House and the young people it serves.',
    // The flagship venue — the campaign's strongest draw, so it gets
    // display treatment in the hero rather than a caption.
    venue: {
      label: 'This year we sleep out at',
      place: 'Soldier Field',
      tagline: 'Home of the Chicago Bears',
      date: 'Thursday, November 19, 2026',
      note: 'and Accenture sites nationwide'
    },
    goalValue: 300000,
    goalLabel: 'Accenture team goal',
    // First checkpoint, shown as a small line under the goal.
    goalMilestone: '$100,000 by end of October',
    // Drop in an approved photograph to replace the generated night
    // treatment, e.g. 'assets/img/hero.jpg'. Leave null to keep it.
    image: null,
    primaryCta: { label: 'Join the Sleep Out', href: 'REGISTRATION' },
    secondaryCta: { label: 'Donate', href: 'DONATE' },
    scrollCue: 'Learn why we sleep out'
  },

  /* ---------------------------------------------------------------
     THE TEN-SECOND ORIENTATION
     --------------------------------------------------------------- */
  orientation: [
    {
      label: 'Who',
      text: 'Covenant House gives young people facing homelessness a safe place to sleep, and a path to what comes next.'
    },
    {
      label: 'What',
      text: 'One night outside at Soldier Field, home of the Bears, raising the funds that keep those doors open.'
    },
    {
      label: 'When',
      text: 'Thursday, November 19 into Friday, November 20. One night.'
    },
    {
      label: 'Your move',
      text: 'Sleep out, donate, or share a colleague’s page. All three move the total.'
    }
  ],

  /* ---------------------------------------------------------------
     FUNDRAISING
     There is no longer a goal section on the page: the $300,000 goal,
     its first milestone and the live total all render in the hero, and
     the $250 requirement sits on the Sleep Out pathway. The detail on
     matching and the $50 gift lives in the FAQ.
     --------------------------------------------------------------- */
  fundraising: {
    goal: 300000,

    /* LIVE TOTAL — set to a number and update `raisedAsOf` when a
       verified figure exists. Never enter an estimate. A system can
       supply it at runtime via window.CAMPAIGN_LIVE (see README). */
    raisedToDate: null,
    raisedAsOf: null,

    /* The amount Covenant House asks each in-person participant to
       raise. Shown as a requirement on the Sleep Out pathway.
       NOTE: sleepout.org/chicago publishes a $500 minimum for that
       site. Confirm which figure applies before wide distribution. */
    participantMinimum: '$250'
  },

  /* ---------------------------------------------------------------
     WHY WE SLEEP OUT
     Solidarity and action — never comparison.
     --------------------------------------------------------------- */
  why: {
    sectionLabel: 'Why we sleep out',
    statement: [
      'One night can’t replicate homelessness.',
      '*It can help change what comes next.*'
    ],
    body:
      'We are not pretending to understand. We are choosing to pay attention, and to put real money behind it. For one night we trade a bed for a sleeping bag and a hard surface, and we spend the hours before dawn learning from the people who do this work.',
    pillars: [],
    cta: { label: 'Why Sleep Out matters', href: 'COVENANT_HOUSE_SLEEPOUT' }
  },

  /* ---------------------------------------------------------------
     THREE WAYS TO HELP
     --------------------------------------------------------------- */
  pathways: {
    sectionLabel: 'Three ways to help',
    items: [
      {
        number: '01',
        title: 'Sleep Out',
        commitment: 'One night · November 19',
        text: 'Register on myGiving, get your personal fundraising page, and join us on the field at Soldier Field, or at an Accenture site near you.',
        // Rendered as a marked requirement line, not body copy.
        requirement: 'You must raise $250 to take part in the Sleep Out.',
        cta: { label: 'Join the Sleep Out', href: 'REGISTRATION' }
      },
      {
        number: '02',
        title: 'Donate',
        commitment: 'Two minutes',
        text: 'Give to a colleague’s page or the Accenture team total. Every gift moves the national number and unlocks matching.',
        cta: { label: 'Donate now', href: 'DONATE' }
      },
      {
        number: '03',
        title: 'Help fundraise',
        commitment: 'A few shares',
        text: 'You don’t have to sleep outside to move the total. We’ve written the emails and posts for you. Copy, paste, send.',
        cta: { label: 'Open the toolkit', href: 'share.html' }
      }
    ]
  },

  /* ---------------------------------------------------------------
     WHAT TO EXPECT
     --------------------------------------------------------------- */
  expect: {
    sectionLabel: 'What to expect',
    heading: 'How it goes.',
    lede: 'Your Sleep Out site sends exact arrival times, location details and what to bring once you register.',
    timeline: [
      {
        time: 'Evening',
        title: 'Arrive and check in',
        text: 'Meet the Accenture group, find your spot on the field, settle in.'
      },
      {
        time: 'Before lights out',
        title: 'Hear from the people doing the work',
        text: 'Leaders from Covenant House, Accenture and other companies speak. This is the part participants remember.'
      },
      {
        time: 'Overnight',
        title: 'Sleep out',
        text: 'Outside, in a sleeping bag, on a hard surface, alongside your colleagues.'
      },
      {
        time: 'The next day',
        title: 'Carry it into your day',
        text: 'An early finish, then work and everything else on very little sleep. It is the smallest glimpse of what some young people carry every day, and it puts what Covenant House provides into perspective.'
      }
    ],
    note: 'Sites operate in all weather and are staffed through the night. If you have an access need or health consideration, tell your site organizer early. They will work with you.'
  },

  /* ---------------------------------------------------------------
     FAQ
     --------------------------------------------------------------- */
  faq: {
    sectionLabel: 'Questions',
    heading: 'Before you commit.',
    items: [
      {
        q: 'Do I have to raise money to take part?',
        a: 'Yes. Covenant House asks each person sleeping out in person to raise $250. The fundraising is the point. The night itself is what makes the ask meaningful. Minimums can vary by city, so check your local Sleep Out page when you register.'
      },
      {
        q: 'What if I can’t hit my goal?',
        a: 'Almost everyone gets there, and you are not doing it alone. You get a personal fundraising page, a fundraising coach through Covenant House, and ready-made messages on this site. Reach $50 by October 10 and you receive a special gift as well.'
      },
      {
        q: 'Does Accenture match donations?',
        a: 'Funds raised through myGiving are matched dollar-for-dollar once 10 Accenture donations are received, up to a $1,000 cap.'
      },
      {
        q: 'I can’t sleep outside. Can I still help?',
        a: 'Absolutely, and it matters just as much. Donate to a colleague’s page, share their link with your network, or register to participate virtually.'
      },
      {
        q: 'Is it safe?',
        a: 'Yes. Sleep Out sites are organized, supervised and staffed throughout the night by Covenant House. If you have an access need or health consideration, tell your site organizer early.'
      },
      {
        q: 'What happens to the money?',
        a: 'It funds Covenant House’s work: shelter, meals, healthcare, counseling, education, job training, street outreach and long-term support for young people facing homelessness.'
      },
      {
        q: 'Isn’t sleeping outside for one night a bit performative?',
        a: 'One night outside cannot replicate homelessness, and we don’t claim otherwise. What it does is concentrate attention and raise money, and the funding is what keeps doors open long after the participants have gone home.'
      }
    ]
  },

  /* ---------------------------------------------------------------
     SHARE / FUNDRAISING TOOLKIT  (its own page: share.html)
     {{LINK}} is replaced with the link pasted on that page.
     --------------------------------------------------------------- */
  toolkit: {
    sectionLabel: 'Fundraising toolkit',
    heading: 'The ask, already written.',
    lede: 'Most people give because someone they know asked them directly. Paste your fundraising link and take any of these.',
    linkPlaceholder: 'Paste your fundraising page link',
    templates: [
      {
        channel: 'Email to your network',
        subject: 'I’m sleeping outside on November 19',
        body:
          'Hi {{NAME}},\n\nOn November 19 I’m sleeping outside at Soldier Field with colleagues from Accenture to support Covenant House, which gives young people facing homelessness a safe place to sleep and the support to build what comes next.\n\nOne night outside doesn’t replicate homelessness. What it does is raise money that keeps beds open, meals served and programs running all year.\n\nIf you’re able to give, my page is here: {{LINK}}\n\nThank you,\n{{YOU}}'
      },
      {
        channel: 'LinkedIn',
        subject: null,
        body:
          'On November 19 I’ll be sleeping outside at Soldier Field with colleagues from Accenture, in support of Covenant House.\n\nSince 1972, Covenant House has opened its doors to more than 1.5 million young people facing homelessness, offering shelter, healthcare, counseling, education and job training.\n\nOne night outside can’t replicate homelessness. It can help change what comes next. If this matters to you too: {{LINK}}'
      },
      {
        channel: 'Short message for Teams or chat',
        subject: null,
        body:
          'I’m sleeping outside at Soldier Field on Nov 19 with the Accenture team to raise money for Covenant House, which provides shelter and support for young people facing homelessness. Any amount helps: {{LINK}}'
      },
      {
        channel: 'Asking a client or senior contact',
        subject: 'A cause our team is backing this November',
        body:
          'Hi {{NAME}},\n\nOutside of our work together, I wanted to share something our team is putting real effort behind. On November 19, Accenture colleagues are sleeping out at Soldier Field and at sites across the country to support Covenant House, an organization that has welcomed more than 1.5 million young people facing homelessness since 1972, and works across 34 cities in five countries.\n\nOur national team goal is $300,000. If you’d like to support it, my page is here: {{LINK}}\n\nEither way, thank you for reading.\n\n{{YOU}}'
      }
    ],
    tips: [
      'Ask ten people directly rather than posting once broadly. Direct asks convert many times better.',
      'Say what the money does: beds, meals, counseling, job training. Not just that you are sleeping outside.',
      'Follow up once. Most people miss the first message and are glad to be reminded.',
      'Tell your network when you hit a milestone. Progress is its own reason to give.'
    ]
  },

  /* ---------------------------------------------------------------
     LINKS — referenced elsewhere by name, e.g. 'REGISTRATION'
     --------------------------------------------------------------- */
  links: {
    REGISTRATION:
      'https://mygivingaccenture.yourcause.com/home#/newvolunteer/event/1448907',
    DONATE:
      'https://mygivingaccenture.yourcause.com/public#/fundraising/35997',
    ACCENTURE_SLEEPOUT: 'https://www.sleepout.org/accenture',
    COVENANT_HOUSE_SLEEPOUT: 'https://www.sleepout.org/chicago',
    COVENANT_HOUSE: 'https://www.covenanthouse.org/about-us'
  },

  /* --------------------------------------------------------------- */
  footer: {
    quickLinks: [
      { label: 'Register to Sleep Out', href: 'REGISTRATION' },
      { label: 'Donate', href: 'DONATE' },
      { label: 'Fundraising toolkit', href: 'share.html' },
      { label: 'More about Covenant House', href: 'COVENANT_HOUSE' },
      { label: 'Accenture Sleep Out page', href: 'ACCENTURE_SLEEPOUT' },
      { label: 'Covenant House Chicago', href: 'COVENANT_HOUSE_SLEEPOUT' }
    ],
    sourcesNote:
      'Statistics are published by Covenant House and cited where they appear. Campaign figures, dates and requirements follow Accenture and Covenant House campaign materials. No figures on this page are estimated.',
    disclaimer:
      'An internal Accenture campaign page supporting Covenant House. Covenant House is an independent organization; its name and materials are used in support of this fundraising effort.'
  }
};

/* Optional runtime override — see README.
   window.CAMPAIGN_LIVE = { raisedToDate: 128400, raisedAsOf: 'October 14, 2026' }; */
if (typeof window !== 'undefined' && window.CAMPAIGN_LIVE) {
  Object.assign(CAMPAIGN.fundraising, window.CAMPAIGN_LIVE);
}
