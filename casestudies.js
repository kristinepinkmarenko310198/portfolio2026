// Shared case-study data + tiny interaction helpers for the portfolio.
// Exposed on window so every .dc.html page can read the same source of truth.
(function () {
  const STUDIES = [
    {
      slug: "cgm-opt",
      num: "01",
      name: "Operational Theater",
      client: "CGM CompuGroup Medical",
      clientMeta: "Enterprise healthcare · surgical scheduling & documentation",
      role: "Lead UI/UX Designer",
      year: "2026",
      color: "#0FB5A5",
      colorSoft: "#E4F6F3",
      tags: ["Enterprise UX", "Complex Flows", "Research"],
      kicker: "Validated directly with surgeons & nurses",
      summary:
        "CGM's Operational Theater module - the most complex scheduling and documentation surface in the hospital information system, designed from the ground up.",
      overview:
        "The Operational Theater (OPT) module coordinates operating rooms, surgery schedules, and clinical documentation. It is among the densest, highest-stakes surfaces in the entire hospital information system. I owned the design of its most complex flows - Surgery Calendar, OP Configuration, and OP Documentation - working directly with the surgeons, nurses and OP managers who use these screens as part of their daily work.",
      personas: [
        { name: "Dr. Lea Weber", role: "OP Manager", avatar: "personas/lea-weber.png", goals: "Plan theater capacity across the week, see conflicts early, reshuffle rooms when emergencies land.", frustrations: "Switching between three systems to answer one question about Monday's schedule." },
        { name: "Nurse Maya Bauer", role: "Theater coordinator", avatar: "personas/maya-bauer.png", goals: "Create and reschedule OP orders fast; keep real-time surgery status visible to the whole team.", frustrations: "A single OP order takes 14 clicks and loses state the moment anything changes." },
      ],
      challenge:
        "OP Managers needed a centralized view of operating-room hours, surgery schedules, and resource allocation without switching systems. Coordinators wanted faster OP-order creation with fewer manual steps. Clinical staff relied on real-time surgery statuses to coordinate their day. Each group had a different mental model, and all of them were operating under real time pressure.",
      goals: [
        "Give OP Managers one place to see and plan theater capacity.",
        "Cut the manual steps in creating and editing OP orders.",
        "Surface real-time surgery status the whole team could trust.",
      ],
      approach: [
        { title: "Owned the hardest flows", body: "Led the design of Surgery Calendar, OP Configuration, and OP Documentation - the flows with the most edge cases and the least room for error." },
        { title: "Ran a cross-functional Design Sprint", body: "Based on research findings, initiated and facilitated a sprint with PMs, POs, designers, and developers to align on user needs, technical constraints, and priorities." },
        { title: "Prototyped with AI", body: "Accelerated prototyping and developer collaboration using Storybook and AI-assisted workflows (Devin, Windsurf) - and built a clickable AI-assisted prototype that aligned stakeholders before a line of production code." },
        { title: "Validated with clinicians", body: "Tested concepts directly with surgeons, nurses, and product stakeholders, folding their feedback back into the flows." },
      ],
      process:
        "The turning point was the Design Sprint. Getting product, engineering, and clinical stakeholders in one room - and leaving with a working AI-assisted prototype - collapsed weeks of back-and-forth into days and gave everyone a shared, testable artifact to react to.",
      impact: [
        { stat: "55K+", label: "medical staff reached across Austria" },
        { stat: "3", label: "complex flows owned end-to-end: Surgery Calendar, OP Configuration, OP Documentation" },
        { stat: "4", label: "user roles aligned around one shared design (OP Managers, coordinators, surgeons, nurses)" },
      ],
      quote: {
        text: "She took full ownership and conducted user research with clinicians entirely on her own initiative.",
        author: "Marie Stelzhammer",
        role: "VP PM UX & Design · CGM",
      },
      gallery: ["Surgery Calendar", "OP Configuration", "OP Documentation", "Sprint prototype"],
      prototype: "opt/prototype.html",
      prototypeModes: ["desktop"],
      prototypeUrl: "Surgery Calendar",
      cover: "opt/cover.jpg",
      prototypePoster: "opt/poster.jpg",
      prototypeVideo: "opt/preview.mp4",
      prototypeVideoPoster: "opt/preview.jpg",
      prototypeNote: "An interactive walk through the full planning flow, rebuilt on Meta's open-source Astryx design system from the screens handed off to development. Create an OP order with all its details, book it into a free slot, find it in the Surgery Calendar (hover an appointment for details), then start, adjust and authorize the day's OP program. OP Configuration covers seasons and sessions, rooms, OP types, users and roles. All patient data is fictional.",
    },
    {
      slug: "tiktaac",
      num: "02",
      name: "TikTaac Event Platform",
      client: "Designify Studio",
      clientMeta: "Nightlife events platform for the Italian market · team of 7",
      role: "Art Director",
      year: "2024",
      color: "#FFFFFF",
      colorSoft: "#1F1F23",
      tags: ["Event platform", "Business analytics", "Two-sided product"],
      kicker: "From selling tickets to understanding business performance",
      summary:
        "An event discovery and ticketing platform that gives venue owners a clear view of how their events are actually performing.",
      overview:
        "TikTaac is an event discovery and ticketing platform connecting event-goers with venues while giving venue owners the tools to manage events and track their business performance. The project focused on improving two connected experiences: making event discovery and ticket purchasing straightforward for customers, and giving venue owners something they previously lacked — a clear understanding of how their events were performing financially.",
      personas: [
        { name: "Rosalva, 26", role: "Event-goer · Modena", avatar: "personas/rosalva.png", goals: "Find a party for tonight, understand what she's paying for, pay from her phone.", frustrations: "Fragmented listings; unclear ticket releases; checkout that asks for too much up front." },
        { name: "Marco, 38", role: "Venue owner · Rome", avatar: "personas/marco.png", goals: "Know what's working — revenue per event, ticket releases sold, best-performing nights.", frustrations: "Selling tickets on three platforms with no single view of the business behind them." },
      ],
      challenge:
        "Selling tickets was only part of the problem. Venue owners could organise events and sell tickets, but they lacked a proper overview of what was happening behind the scenes — limited visibility into ticket sales, revenue, attendance, and how individual events performed. As a result, basic business questions were hard to answer: how much revenue did an event actually generate, which events performed best, how did sales evolve over time, was it financially worthwhile to run this event again? The customer-facing experience also needed to make discovering events and purchasing tickets simple and engaging.",
      goals: [
        "Give venue owners a structured view of revenue, ticket sales and event performance.",
        "Make event discovery and ticket purchasing fast and clear for customers.",
        "Serve both sides with one connected data model and one visual language.",
      ],
      process:
        "The design opportunity was bigger than the interface. It was about making event management transparent and actionable. We structured scattered event information into a dashboard that helps venue owners understand their business at a glance — total revenue, ticket sales, event performance and sales trends — paired with sorting and filtering so they can investigate specific periods or events. On the customer side, we kept the decision path short: clear event presentation, visible dates and venues, ticket categories, availability and pricing, with ticket-release information given explicit visual priority so people understand their options and buy with confidence.",
      impact: [
        { stat: "4", label: "owner KPIs turned into a single dashboard view" },
        { stat: "2", label: "very different audiences served by one connected product" },
        { stat: "0→1", label: "business visibility for venue owners who had none before" },
      ],
      gallery: ["Guest and owner screens"],
      cover: "tiktaac/cover.jpg",
      prototype: "tiktaac/prototype.html",
      prototypeModes: ["mobile", "desktop"],
      prototypeUrl: "tiktaac.com",
      prototypeNote: "Click through the real flows: find an event, pick a ticket release, pay, open your QR ticket and wallet. Then switch to the venue owner side to see sales analytics and scan a guest in.",
    },
    {
      slug: "checkin-botlens",
      cover: "botlens/cover.jpg",
      prototype: "botlens/prototype.html",
      prototypeModes: ["desktop"],
      prototypeUrl: "Applications",
      prototypePoster: "botlens/preview.jpg",
      prototypeVideo: "botlens/preview.mp4",
      prototypeNote: "A light reconstruction of the Botlens review screen, based on the shipped design. Filter the applications, open Mary Smith, ask why a check failed, compare the signatures, then approve or reject the session (with undo). Logs show the bot-like timing that triggered the verdict. All applicants and data are fictional.",
      num: "03",
      name: "Botlens - Human vs Bot",
      client: "Checkin.com",
      clientMeta: "Swedish B2B SaaS · identity verification, KYC/AML",
      role: "Senior Product Designer",
      year: "2024",
      color: "#4D5DFB",
      colorSoft: "#E9EBFE",
      tags: ["Enterprise Dashboard", "Fraud", "Explainability"],
      kicker: "Faster fraud investigations at 5M+ user scale",
      summary:
        "An enterprise dashboard that turns complex fraud investigations into clear, explainable decisions analysts can trust.",
      overview:
        "Checkin.com verifies identity for clients including Ryanair, Entain, and Ooredoo - at a scale of millions of users. Botlens is the surface where fraud analysts investigate suspicious sessions and decide, quickly, whether they're looking at a human or a bot. I designed the dashboard that makes those decisions fast, confident, and defensible.",
      personas: [
        { name: "Mary, 34", role: "Fraud analyst", avatar: "personas/mary.png", goals: "Clear the review queue without approving a bot or rejecting a real user; defend every call to compliance.", frustrations: "Black-box risk scores she can't explain back to her team or to the customer who got blocked." },
        { name: "Jonas, 41", role: "Head of risk · regulated client", avatar: "personas/jonas.png", goals: "Trust the platform's verdicts enough to ship them into production flows across KYC and AML.", frustrations: "Dashboards that flag sessions without showing the evidence behind the flag." },
      ],
      challenge:
        "Decisions had to be made in milliseconds of machine time but reviewed by humans under high false-positive risk. Analysts couldn't rely on a black box - every automated verdict needed an explanation they could read, trust, and defend. The core tension: distinguish humans from bots quickly, with evidence.",
      goals: [
        "Turn a dense stream of signals into a clear, scannable verdict.",
        "Make every automated decision explainable, not black-box.",
        "Lower the cognitive load of reviewing suspicious sessions.",
      ],
      approach: [
        { title: "Led with the verdict", body: "Put the automation score and reasoning at the top of the review, with the raw evidence (signatures, device, timing) one glance below — so analysts read the call first, then check the proof." },
        { title: "Designed for decision speed", body: "Built investigation workflows that accelerate analyst decision-making without cutting corners on rigor." },
        { title: "Made the AI explainable", body: "Improved transparency through explainable behavioral analysis, so analysts understood why a session was flagged." },
      ],
      process:
        "The design centered on a hierarchy of evidence: the verdict first, then the behavioral signals that produced it, then the raw detail on demand. Analysts could trust the top-line call because the reasoning was always one glance away.",
      impact: [
        { stat: "5M+", label: "users completing KYC verification on the platform" },
        { stat: "4", label: "behavioural checks combined into one explainable verdict" },
        { stat: "1 click", label: "from flagged session to the reason it was flagged" },
      ],
      quote: {
        text: "Her ability to turn complex problems into elegant design solutions had a direct impact on the success of our product.",
        author: "Christian Karlsson",
        role: "Former CEO/CCO · Checkin.com",
      },
      gallery: ["Verdict view", "Behavioral signals", "Session timeline", "Evidence detail"],
    },
    {
      slug: "helloagain-campaigns",
      cover: "campaign/cover.jpg",
      prototype: "campaign/prototype.html",
      prototypeModes: ["desktop"],
      prototypeUrl: "Messaging / Campaigns",
      prototypePoster: "campaign/preview.jpg",
      prototypeVideo: "campaign/preview.mp4",
      prototypeNote: "A light reconstruction of the AI campaign flow. Pick one of the AI suggestions or start from scratch, press Regenerate for a new draft, switch between push, SMS, e-mail and in-app to see the live preview change, choose the audience and schedule the campaign. Nimbus is a demo brand and all numbers are fictional.",
      num: "04",
      name: "Customer Dashboard - AI Campaign Suggestions",
      client: "hello again",
      clientMeta: "White-label loyalty platform · 1,000+ companies · 28 countries",
      role: "Head of Design",
      year: "2025",
      color: "#E8A33D",
      colorSoft: "#FBF1DE",
      tags: ["AI Product", "Marketing Tools", "0→1"],
      kicker: "23% in-app sales lift across 40+ live client apps",
      summary:
        "An AI campaign assistant that lets non-marketers draft, edit and ship multi-channel campaigns in minutes — on their own words, not the AI's.",
      overview:
        "hello again powers loyalty for over a thousand companies across 28 countries. Most of the people running campaigns there aren't marketers — they're shop owners and operators running the business. I designed an AI campaign assistant that fits how they actually work: start from an audience-triggered suggestion or write your own idea in a sentence, pick the channel (push, SMS, email, in-app), and let AI shape the copy, subject line and matching visual around what the user already typed. Every suggestion is editable, every change previewed live, and the same campaign can be reshaped for a different channel in one click.",
      personas: [
        { name: "Sabine, 42", role: "Bakery owner · Austria", avatar: "personas/sabine.png", goals: "Keep regulars coming back with timely offers; run several campaigns a month without hiring a marketer.", frustrations: "Stares at a blank message editor, isn't sure what to write, ends up sending nothing." },
        { name: "David, 29", role: "Marketing manager · retail chain", avatar: "personas/david.png", goals: "Ship on-brand campaigns across channels fast, test variants, keep editorial control.", frustrations: "AI tools that invent copy he has to rewrite from scratch — it's faster to just write it himself." },
      ],
      challenge:
        "Two different users, one product. Non-marketers needed a starting point so they'd actually hit send. Experienced marketers needed AI that amplifies their own text instead of replacing it — improve the subject line, tighten the body, generate three on-brand variants, adapt one campaign for SMS, push and email without rewriting it each time.",
      goals: [
        "Let any user ship a multi-channel campaign in minutes, from suggestion or from their own sentence.",
        "Give experienced users AI that improves their copy instead of replacing it.",
        "Make the same campaign re-usable across push, SMS, email and in-app with one click.",
      ],
      process:
        "AI output only builds confidence when the user keeps control of the idea. Two input modes anchor the flow: pick an audience-triggered suggestion (Nimbus members who haven't visited in 60 days → 'your next coffee is on us'), or type one line yourself and let AI shape the tone, headline and matching visual around what you wrote. Every suggestion is editable inline, previewed live per channel, and Regenerate keeps the same intent while giving three variants to choose from. The channel picker reshapes the same campaign for push, SMS, email or in-app without starting over — so one idea becomes four sends, not four separate projects.",
      impact: [
        { stat: "+23%", label: "in-app sales lift in the quarter after launch" },
        { stat: "4", label: "channels (push, SMS, email, in-app) from one campaign idea" },
        { stat: "40+", label: "client apps the feature rolled out to" },
      ],
      gallery: ["Assistant entry", "Generated draft", "Live preview", "Send & schedule"],
    },
    {
      slug: "helloagain-onboarding",
      cover: "onboarding/cover.jpg",
      num: "05",
      name: "Customer Loyalty App",
      client: "hello again",
      clientMeta: "White-label loyalty platform · 40+ client apps · biggest customer: Müller",
      role: "Head of Design",
      year: "2025",
      color: "#16B364",
      colorSoft: "#E3F6EC",
      tags: ["Onboarding", "White-label", "Growth"],
      kicker: "Gamified sign-up, live in 40+ white-label apps",
      summary:
        "A gamified first-run experience that reframes registration from a cost into a reward — shipped across 40+ white-label client apps.",
      overview:
        "hello again runs white-label loyalty apps for retail and food brands — its biggest customer is Müller. As Head of Design I owned the first thing every end user sees: the sign-up flow that gates the whole loyalty experience. I introduced gamification into the registration journey so users feel they are earning something before they've done the work, not filling in a form before they get anything. The flow was built once and themed across 40+ distinct client brands, with no per-brand fork for the design team or engineering to maintain.",
      personas: [
        { name: "Anna, 31", role: "First-time app user", avatar: "personas/anna.png", goals: "Get some value out of the app quickly; not feel like registering is work.", frustrations: "Long sign-up forms that ask for everything before giving anything back." },
        { name: "Thomas, 48", role: "Brand product owner at a hello again client", avatar: "personas/thomas.png", goals: "Make his app's sign-up feel on-brand and convert more visitors into members.", frustrations: "Can't fork the flow per brand — needs the shared experience to feel bespoke." },
      ],
      challenge:
        "Sign-up had to feel rewarding from the first screen — not a form the user pays to access the product, but a short journey with a visible payoff. And whatever we shipped had to work across 40+ different client brands and configurations without fragmenting into 40+ different flows to maintain.",
      goals: [
        "Give end users a reason to finish sign-up in the first screen, not the last.",
        "Introduce gamification as a reusable pattern across the loyalty journey.",
        "Ship one flow that themes cleanly across 40+ brands.",
      ],
      process:
        "The design turned registration into a game with a visible prize at stake, not a long form at the end of a dark tunnel. Progress is shown explicitly. Each step asks one thing only. A reward moment lands up front so users commit to the flow before they've committed to the form. The architecture lets each client brand retheme type, colour and imagery while the structure, interaction and reward moments stay identical — one design system, many apps, one maintained flow.",
      impact: [
        { stat: "40+", label: "white-label client apps live, including Müller" },
        { stat: "1", label: "themed flow serving every brand, zero per-brand forks" },
        { stat: "7", label: "sign-up steps, each asking one question — down from a single long form" },
      ],
      gallery: ["Welcome bonus", "Registration step", "Brand theming", "Completion"],
      prototype: "onboarding/prototype.html",
      prototypeBefore: "onboarding/prototype.html?v=old",
      prototypeModes: ["mobile"],
      prototypeUrl: "Resch & Frisch",
      prototypeNote: "Left: the previous registration, where everything sat on one long form. Right: the new step-by-step registration as designed for the Resch & Frisch bakery app, one of the white-label brands. Swipe through the intro, sign up with e-mail or phone, pick a password, add your details one question at a time, check everything on the summary screen and collect the 100-point welcome bonus. Try a typo like gmial.com in the e-mail field. All data you enter stays in your browser.",
    },
  ];

  // Each case study has its own page, so links work everywhere (the editor drops ?id= from links).
  const PAGES = {
    "cgm-opt": "cgm-opt.html",
    "checkin-botlens": "checkin-botlens.html",
    "helloagain-campaigns": "helloagain-campaigns.html",
    "helloagain-onboarding": "helloagain-onboarding.html",
    "tiktaac": "tiktaac.html",
  };
  // Preview image for each project, used in lists and as the case study cover.
  const THUMBS = {
    "cgm-opt": "opt/cover.jpg",
    "tiktaac": "tiktaac/cover.jpg",
    "checkin-botlens": "botlens/cover.jpg",
    "helloagain-campaigns": "campaign/cover.jpg",
    "helloagain-onboarding": "onboarding/cover.jpg",
  };
  STUDIES.forEach((s) => { s.page = PAGES[s.slug] || ("case-study.html?id=" + s.slug); s.thumb = s.thumb || THUMBS[s.slug] || s.cover || ""; });

  window.CASE_STUDIES = STUDIES;
  window.CASE_STUDY_BY_SLUG = Object.fromEntries(STUDIES.map((s) => [s.slug, s]));
})();
