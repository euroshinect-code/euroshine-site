import { useState, useEffect, useRef } from "react";
import exteriorImg from "./assets/exterior.jpg";
import interiorImg from "./assets/interior.jpg";
import fullImg from "./assets/full.jpg";
import engineImg from "./assets/engine.jpg";
// ============================================================
// EUROSHINE MOBILE DETAILING — SERVICES PAGE
// Brand: Deep navy / royal blue + metallic gold + white text
// ============================================================

// ── GOLD GRADIENT STYLE (reused throughout) ──────────────────
const goldGrad = "linear-gradient(135deg, #c9a84c 0%, #f5d98b 40%, #e8b84b 70%, #a07820 100%)";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy-deep:   #080e1f;
    --navy-mid:    #0d1630;
    --navy-light:  #152040;
    --navy-card:   #0f1a35;
    --gold-dark:   #a07820;
    --gold-mid:    #c9a84c;
    --gold-light:  #f5d98b;
    --gold-shine:  #ffe9a0;
    --white:       #ffffff;
    --off-white:   #e8e8ee;
    --muted:       #8a9bbd;
    --font-display: 'Cormorant Garamond', serif;
    --font-body:    'Montserrat', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--navy-deep);
    color: var(--white);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* ── GOLD TEXT ── */
  .gold-text {
    background: ${goldGrad};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── GOLD BORDER LINE ── */
  .gold-line {
    height: 2px;
    background: ${goldGrad};
    border-radius: 2px;
  }

  /* ── SECTION WRAPPER ── */
  .section-wrap {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(8,14,31,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(201,168,76,0.2);
    padding: 14px 32px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }
  .nav-phone {
    font-size: 0.82rem;
    color: var(--gold-light);
    font-weight: 500;
    letter-spacing: 0.06em;
    text-decoration: none;
  }
  .nav-phone:hover { color: var(--gold-shine); }

  /* ── HERO ── */
  #hero {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 60% 80% at 10% 50%, rgba(21,32,64,0.9) 0%, transparent 60%),
      linear-gradient(160deg, #080e1f 0%, #0d1630 50%, #0a1228 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 140px 24px 100px;
    position: relative;
    overflow: hidden;
  }
  #hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 20% 80%, rgba(201,168,76,0.05) 0%, transparent 40%),
      radial-gradient(circle at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 40%);
    pointer-events: none;
  }
  /* Subtle grid texture */
  #hero::after {
    content: '';
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(201,168,76,0.35);
    border-radius: 999px;
    padding: 6px 18px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold-light);
    margin-bottom: 28px;
    background: rgba(201,168,76,0.06);
  }
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin-bottom: 22px;
  }
  .hero-sub {
    font-size: clamp(0.95rem, 2vw, 1.15rem);
    color: var(--off-white);
    font-weight: 300;
    max-width: 580px;
    margin: 0 auto 42px;
    line-height: 1.75;
  }
  .hero-btns {
    display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 34px;
    border-radius: 4px;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.88rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    border: none;
    background: ${goldGrad};
    color: #080e1f;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(201,168,76,0.35);
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(201,168,76,0.5);
  }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 34px;
    border-radius: 4px;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.88rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    color: var(--gold-light);
    border: 1.5px solid rgba(201,168,76,0.5);
    transition: transform 0.2s, border-color 0.2s, background 0.2s;
  }
  .btn-secondary:hover {
    transform: translateY(-2px);
    border-color: var(--gold-mid);
    background: rgba(201,168,76,0.07);
  }

  /* ── DIVIDER ── */
  .ornament-divider {
    display: flex; align-items: center; gap: 16px;
    margin: 0 auto 60px;
    max-width: 320px;
  }
  .ornament-divider .gold-line { flex: 1; }
  .ornament-star {
    font-size: 1rem;
    background: ${goldGrad};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── SECTION TITLE BLOCK ── */
  .section-title-block {
    text-align: center;
    margin-bottom: 60px;
  }
  .section-eyebrow {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold-mid);
    margin-bottom: 14px;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 16px;
  }
  .section-desc {
    color: var(--muted);
    font-size: 0.95rem;
    max-width: 560px;
    margin: 0 auto;
    line-height: 1.75;
  }

  /* ── INTRO / OVERVIEW ── */
  #overview {
    padding: 110px 0 90px;
    background: linear-gradient(180deg, #080e1f 0%, #0d1630 100%);
    position: relative;
  }
  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 24px;
    margin-top: 56px;
  }
  .overview-card {
    background: var(--navy-card);
    border: 1px solid rgba(201,168,76,0.15);
    border-radius: 8px;
    padding: 32px 26px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
  }
  .overview-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: ${goldGrad};
    opacity: 0;
    transition: opacity 0.3s;
  }
  .overview-card:hover { border-color: rgba(201,168,76,0.35); transform: translateY(-4px); }
  .overview-card:hover::before { opacity: 1; }
  .overview-icon {
    font-size: 2rem;
    margin-bottom: 14px;
  }
  .overview-card-title {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--gold-light);
  }
  .overview-card-desc {
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.7;
  }

  /* ── PACKAGES SECTION ── */
  #packages {
    padding: 100px 0;
    background:
      linear-gradient(180deg, #0d1630 0%, #080e1f 100%);
  }

  /* Package tier label */
  .tier-label {
    display: inline-flex; align-items: center; gap: 12px;
    margin-bottom: 36px;
  }
  .tier-badge {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 0.03em;
  }
  .tier-sub {
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 4px 12px;
    border: 1px solid rgba(138,155,189,0.3);
    border-radius: 999px;
  }

  /* Package card row */
  .pkg-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    gap: 20px;
    margin-bottom: 70px;
  }
  .pkg-card {
  background: linear-gradient(180deg, rgba(20,33,68,0.98) 0%, rgba(13,22,48,0.98) 100%);
  border: 1px solid rgba(201,168,76,0.22);
  border-radius: 14px;
  padding: 30px 28px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 12px 32px rgba(0,0,0,0.28);
}
  .pkg-card:hover {
    border-color: rgba(201,168,76,0.4);
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.12);
  }
  .pkg-card.featured {
    border-color: rgba(201,168,76,0.4);
    background: linear-gradient(150deg, #111e3a 0%, #0d1630 100%);
  }
  .badge-popular {
  position: absolute;
  top: 14px;
  right: 14px;
  background: linear-gradient(135deg, #c9a84c 0%, #f5d98b 100%);
  color: #080e1f;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  letter-spacing: 0.08em;
}
  /* Accent stripe top */
  .pkg-card-stripe {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
  }
  .pkg-card-type {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold-mid);
    margin-bottom: 10px;
  }
  .pkg-card-title {
    font-family: var(--font-display);
    font-size: 1.55rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .pkg-card-desc {
    font-size: 0.86rem;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 24px;
  }
  .pkg-price-block { display: flex; align-items: baseline; gap: 8px; margin-bottom: 6px; }
  .pkg-price {
    font-family: var(--font-display);
    font-size: 2.4rem;
    font-weight: 700;
    background: ${goldGrad};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .pkg-price-from {
    font-size: 0.78rem;
    color: var(--muted);
    font-weight: 500;
    letter-spacing: 0.04em;
  }
  .pkg-was {
    font-size: 0.82rem;
    color: var(--muted);
    text-decoration: line-through;
    margin-bottom: 4px;
  }
  .pkg-save {
    display: inline-flex; align-items: center; gap: 5px;
    background: rgba(201,168,76,0.12);
    border: 1px solid rgba(201,168,76,0.3);
    color: var(--gold-light);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 3px 10px;
    border-radius: 999px;
    margin-top: 6px;
  }
  .pkg-includes-title {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 22px 0 10px;
  }
  .pkg-includes {
    list-style: none;
    display: flex; flex-direction: column; gap: 7px;
  }
  .pkg-includes li {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 0.85rem;
    color: var(--off-white);
    line-height: 1.5;
  }
  .pkg-check {
    flex-shrink: 0;
    margin-top: 2px;
    width: 16px; height: 16px;
    background: ${goldGrad};
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.6rem;
    color: #080e1f;
    font-weight: 900;
  }

  /* Tier separator */
  .tier-separator {
    display: flex; align-items: center; gap: 20px;
    margin: 10px 0 52px;
  }
  .tier-separator .gold-line { flex: 1; }
  .tier-separator-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
    white-space: nowrap;
  }

  /* ── PRICING DISCLAIMER ── */
  #disclaimer {
    padding: 60px 0;
    background: rgba(8,14,31,0.8);
    border-top: 1px solid rgba(201,168,76,0.1);
    border-bottom: 1px solid rgba(201,168,76,0.1);
  }
  .disclaimer-box {
    background: rgba(201,168,76,0.05);
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 10px;
    padding: 36px 40px;
    display: flex; gap: 28px; align-items: flex-start;
    max-width: 860px; margin: 0 auto;
  }
  .disclaimer-icon {
    font-size: 2rem;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .disclaimer-title {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--gold-light);
    margin-bottom: 10px;
  }
  .disclaimer-text {
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.8;
  }
  .disclaimer-text strong { color: var(--off-white); font-weight: 600; }

  /* ── ADD-ONS ── */
  #addons {
    padding: 100px 0;
    background: linear-gradient(180deg, #080e1f 0%, #0d1630 100%);
  }
  .addon-card {
    max-width: 480px; margin: 0 auto;
    background: var(--navy-card);
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 12px;
    padding: 38px 40px;
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    position: relative;
    overflow: hidden;
  }
  .addon-card::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at top left, rgba(201,168,76,0.06) 0%, transparent 60%);
    pointer-events: none;
  }
  .addon-card-stripe { position: absolute; top:0; left:0; right:0; height: 2px; background: ${goldGrad}; }
  .addon-icon { font-size: 2.4rem; }
  .addon-info { flex: 1; }
  .addon-name {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .addon-desc {
    font-size: 0.86rem;
    color: var(--muted);
    line-height: 1.6;
  }
  .addon-price {
    font-family: var(--font-display);
    font-size: 2.2rem;
    font-weight: 700;
    background: ${goldGrad};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ── WHY EUROSHINE ── */
  #about {
    padding: 110px 0;
    background:
      radial-gradient(ellipse 100% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%),
      linear-gradient(180deg, #0d1630 0%, #080e1f 100%);
  }
  .about-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .about-quote-mark {
    font-family: var(--font-display);
    font-size: 8rem;
    line-height: 0.7;
    background: ${goldGrad};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    display: block;
  }
  .about-quote {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.6;
    color: var(--off-white);
    margin-bottom: 24px;
    font-style: italic;
  }
  .about-attribution {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold-mid);
  }
  .about-pillars {
    display: flex; flex-direction: column; gap: 20px;
  }
  .pillar {
    display: flex; gap: 18px; align-items: flex-start;
    background: rgba(15,26,53,0.6);
    border: 1px solid rgba(201,168,76,0.12);
    border-radius: 8px;
    padding: 20px 22px;
    transition: border-color 0.3s, transform 0.3s;
  }
  .pillar:hover { border-color: rgba(201,168,76,0.3); transform: translateX(4px); }
  .pillar-icon {
    font-size: 1.6rem; flex-shrink: 0;
  }
  .pillar-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--gold-light);
    margin-bottom: 4px;
  }
  .pillar-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.65; }

  /* ── FINAL CTA ── */
  #cta {
    padding: 120px 0;
    background:
      radial-gradient(ellipse 80% 100% at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 70%),
      linear-gradient(180deg, #080e1f 0%, #0a1228 100%);
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  #cta::before {
    content: '';
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .cta-title {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 18px;
  }
  .cta-sub {
    color: var(--muted);
    font-size: 1rem;
    max-width: 480px;
    margin: 0 auto 52px;
    line-height: 1.75;
  }
  .cta-cards {
    display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;
  }
  .cta-contact-card {
    background: var(--navy-card);
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 12px;
    padding: 36px 42px;
    min-width: 240px;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    text-decoration: none;
  }
  .cta-contact-card:hover {
    border-color: rgba(201,168,76,0.45);
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.35);
  }
  .cta-contact-icon { font-size: 2.2rem; margin-bottom: 14px; }
  .cta-contact-method {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold-mid);
    margin-bottom: 10px;
  }
  .cta-contact-value {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--white);
  }
  .cta-contact-note {
    font-size: 0.8rem;
    color: var(--muted);
    margin-top: 6px;
  }

  /* ── FOOTER ── */
  footer {
    background: #060c1a;
    border-top: 1px solid rgba(201,168,76,0.12);
    padding: 32px 24px;
    text-align: center;
  }
  .footer-brand {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .footer-note {
    font-size: 0.78rem;
    color: var(--muted);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .about-inner { grid-template-columns: 1fr; gap: 48px; }
    .about-quote-mark { font-size: 5rem; }
    .disclaimer-box { flex-direction: column; gap: 16px; padding: 28px 24px; }
    .addon-card { flex-direction: column; text-align: center; }
    .cta-cards { flex-direction: column; align-items: center; }
    .cta-contact-card { width: 100%; max-width: 320px; }
    .pkg-row { grid-template-columns: 1fr; }
    nav { padding: 14px 16px; }
    .overview-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 480px) {
    .overview-grid { grid-template-columns: 1fr; }
    .hero-btns { flex-direction: column; align-items: center; }
  }

  /* ── FADE-IN ANIMATION ── */
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
  .price-note {
  margin: 20px auto 0;
  max-width: 500px;
  padding: 14px 18px;
  border-radius: 8px;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.25);
  color: var(--off-white);
  font-size: 0.9rem;
  line-height: 1.6;
  text-align: center;
}

.price-note strong {
  color: var(--gold-light);
  font-weight: 600;
}

  .social-card {
    min-width: 220px;
    padding: 22px 28px;
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(20,33,68,0.96) 0%, rgba(13,22,48,0.96) 100%);
    border: 1px solid rgba(201,168,76,0.18);
    text-decoration: none;
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 10px 25px rgba(0,0,0,0.22);
  }

  .social-card:hover {
    transform: translateY(-4px);
    border-color: rgba(201,168,76,0.38);
    box-shadow: 0 16px 35px rgba(0,0,0,0.3);
  }

  .social-name {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--gold-light);
    margin-bottom: 6px;
  }

  .social-handle {
    font-size: 0.92rem;
    color: #d9dfef;
  }
`;

// ── DATA ───────────────────────────────────────────────────────
// Express package items — edit descriptions and prices here
const expressPackages = [
  {
    type: "Exterior",
    title: "Basic Wash",
    desc: "A straightforward maintenance wash for a clean exterior finish.",
    price: "$150",
    includes: [
      "Hand wash exterior",
      "Wheels & tires cleaning",
      "Vacuum interior",
      "Streak-free windows",
    ],
  },
  {
    type: "Exterior",
    title: "Express Exterior",
    desc: "A simple exterior refresh for regular maintenance.",
    price: "$125",
    includes: [
      "Static dust removal",
      "Hand wash",
      "Rinse & wax",
      "Basic wheel cleaning",
      "Door jamb rinse",
      "Exterior windows wiping",
    ],
  },
  {
    type: "Interior",
    title: "Express Interior",
    desc: "Basic interior cleaning to refresh the cabin.",
    price: "$150",
    includes: [
      "Basic vacuum",
      "Mat cleaning",
      "All surface wiping",
      "Dashboard cleaning",
      "Screen streak-free finish",
      "Interior windows wiping",
    ],
  },
  {
    type: "Full Detail",
    title: "Express Full Detail",
    desc: "Exterior and interior Express service together. Best for a clean reset without deep extraction.",
    price: "$200",
    featured: true,
    includes: [
      "Exterior:",
      "Static dust removal",
      "Hand wash",
      "Rinse & wax",
      "Basic wheel cleaning",
      "Door jamb rinse",
      "Windows wiping",
      "Interior:",
      "Basic vacuum + mat cleaning",
      "All surface wiping",
      "Dashboard & screen streak-free finish",
    ],
  },
];

// Deluxe package items — edit descriptions and prices here
const deluxePackages = [
  {
    type: "Exterior",
    title: "Deluxe Exterior",
    desc: "Premium exterior detail using top European professional chemicals.",
    price: "$175",
    includes: [
      "Everything from Express Exterior",
      "Top European professional chemicals",
      "Exterior iron removal",
      "Deep wheel cleaning, including calipers",
      "Pink ceramic effect shampoo",
    ],
  },
  {
    type: "Interior",
    title: "Deluxe Interior",
    desc: "Deeper interior cleaning for seats, carpets, steering wheel, and high-touch areas.",
    price: "$200",
    includes: [
      "Everything from Express Interior",
      "Seat light wet cleaning",
      "Carpet light wet cleaning",
      "Deep steering wheel cleaning",
      "Deeper cleaning of high-touch areas",
      "Interior refresh finish",
      "Deep black mat coating",
    ],
  },
  {
    type: "Full Detail",
    title: "Deluxe Full Detail",
    desc: "Full premium interior and exterior detail. Best option for a deeper clean and stronger finish.",
    price: "$300",
    featured: true,
    includes: [
      "Exterior:",
      "Everything from Express Exterior",
      "Top European professional chemicals",
      "Exterior iron removal",
      "Deep wheel cleaning, including calipers",
      "Pink ceramic effect shampoo",
      "Deep black mat coating",
      "Interior:",
      "Everything from Express Interior",
      "Seat & carpet light wet cleaning",
      "Deep steering wheel cleaning",
      "Deep cleaning of high-touch areas",
    ],
  },
];


// ── COMPONENTS ────────────────────────────────────────────────
function GoldStripe() {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 3,
      background: goldGrad
    }} />
  );
}

function CheckIcon() {
  return (
    <span className="pkg-check">✓</span>
  );
}

function PackageCard({ pkg }) {
  return (
    <div className={`pkg-card ${pkg.featured ? "featured" : ""}`}>
      {pkg.featured && (
  <div style={{
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "linear-gradient(135deg, #c9a84c 0%, #f5d98b 100%)",
    color: "#080e1f",
    fontSize: "11px",
    fontWeight: "700",
    padding: "5px 10px",
    borderRadius: "6px"
  }}>
    MOST POPULAR
  </div>
)}
      <GoldStripe />
      <div className="pkg-card-type">{pkg.type}</div>
      <div className="pkg-card-title">{pkg.title}</div>
      <p className="pkg-card-desc">{pkg.desc}</p>

      {pkg.was && <div className="pkg-was">Regular: {pkg.was}</div>}
      <div className="pkg-price-block">
        <span className="pkg-price">{pkg.price}</span>
        <span className="pkg-price-from">starting price</span>
      </div>
      {pkg.save && <div className="pkg-save">★ {pkg.save}</div>}

      <div className="pkg-includes-title">What's Included</div>
      <ul className="pkg-includes">
        {pkg.includes.map((item, i) => {
  const isSectionTitle = item === "Exterior:" || item === "Interior:";

  return (
    <li
      key={i}
      className={isSectionTitle ? "text-[#d4af37] font-extrabold uppercase tracking-[0.2em] mt-3" : ""}
    >
      {!isSectionTitle && <CheckIcon />}
      {item}
    </li>
  );
})}
      </ul>
    </div>
  );
}
const basePricing = {
  basicWash: 150,
  expressExterior: 125,
  expressInterior: 150,
  deluxeExterior: 175,
  deluxeInterior: 200,
};

const vehicleUpcharges = {
  sedan: {
    basicWash: 0,
    expressExterior: 0,
    expressInterior: 0,
    deluxeExterior: 0,
    deluxeInterior: 0,
  },
  suv: {
    basicWash: 25,
    expressExterior: 25,
    expressInterior: 25,
    deluxeExterior: 25,
    deluxeInterior: 25,
  },
  van: {
    basicWash: 50,
    expressExterior: 50,
    expressInterior: 50,
    deluxeExterior: 50,
    deluxeInterior: 50,
  },
};

const comboDiscountRate = 0;

const addOnPricing = {
  engineBay: 60,
  petHair: {
    none: 0,
    light: 30,
    medium: 40,
    heavy: 50,
  },
};
const fullDetailPricing = {
  sedan: {
    express: 200,
    deluxe: 300,
  },
  suv: {
    express: 250,
    deluxe: 350,
  },
  van: {
    express: 325,
    deluxe: 425,
  },
};

// ── MAIN PAGE COMPONENT ───────────────────────────────────────
export default function EuroShineServices() {
  const observerRef = useRef(null);
    const [vehicleType, setVehicleType] = useState("sedan");
  const [exteriorPackage, setExteriorPackage] = useState("expressExterior");
  const [interiorPackage, setInteriorPackage] = useState("expressInterior");
  const [engineBay, setEngineBay] = useState(false);
  const [petHairLevel, setPetHairLevel] = useState("none");
  

  const exteriorBase = basePricing[exteriorPackage];
const interiorBase = basePricing[interiorPackage];

const exteriorUpcharge = vehicleUpcharges[vehicleType][exteriorPackage];
const interiorUpcharge = vehicleUpcharges[vehicleType][interiorPackage];

const engineBayPrice = engineBay ? addOnPricing.engineBay : 0;
const petHairPrice = addOnPricing.petHair[petHairLevel] || 0;

const exteriorTotal = exteriorBase + exteriorUpcharge;
const interiorTotal = interiorBase + interiorUpcharge;

const packageSubtotal = exteriorTotal + interiorTotal;

const isFullExpress =
  exteriorPackage === "expressExterior" &&
  interiorPackage === "expressInterior";

const isFullDeluxe =
  exteriorPackage === "deluxeExterior" &&
  interiorPackage === "deluxeInterior";

const isComboPackage =
  (exteriorPackage === "expressExterior" && interiorPackage === "deluxeInterior") ||
  (exteriorPackage === "deluxeExterior" && interiorPackage === "expressInterior");

let discountedPackageTotal = packageSubtotal;
let discountAmount = 0;
let discountLabel = "";

if (isFullExpress) {
  discountedPackageTotal = fullDetailPricing[vehicleType].express;
  discountAmount = packageSubtotal - discountedPackageTotal;
  discountLabel = "Full Detail Discount";
} else if (isFullDeluxe) {
  discountedPackageTotal = fullDetailPricing[vehicleType].deluxe;
  discountAmount = packageSubtotal - discountedPackageTotal;
  discountLabel = "Full Detail Discount";
} else if (isComboPackage) {
  discountAmount = Math.round(packageSubtotal * comboDiscountRate);
  discountedPackageTotal = packageSubtotal - discountAmount;
  discountLabel = "Combo Discount";
}

const totalPrice = discountedPackageTotal + engineBayPrice + petHairPrice;

  const formatLabel = (value) => {
    const labels = {
      sedan: "Sedan",
      suv: "SUV / Jeep",
      van: "Van",
      basicWash: "Basic Wash",
      expressExterior: "Express Exterior",
      deluxeExterior: "Deluxe Exterior",
      expressInterior: "Express Interior",
      deluxeInterior: "Deluxe Interior",
      none: "None",
      light: "Light",
      medium: "Medium",
      heavy: "Heavy",
    };
    return labels[value] || value;
  };
  useEffect(() => {
    // Intersection Observer for fade-in animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in").forEach((el) =>
      observerRef.current.observe(el)
    );
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* ── NAV ── */}
      <nav>
        <span className="nav-logo">
          <span className="gold-text">Euro</span>Shine
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: "var(--muted)", marginLeft: 8, fontFamily: "var(--font-body)", fontWeight: 400 }}>
            MOBILE DETAILING
          </span>
        </span>
        {/* Replace href with tel: link for click-to-call */}
        <div className="flex items-center gap-4">
  <button
    onClick={() =>
      document
        .getElementById("booking-calculator")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    className="hidden md:inline-flex items-center rounded-full bg-[#d4af37] text-[#07111f] font-semibold px-5 py-2.5 border border-[#d4af37] shadow-[0_8px_24px_rgba(212,175,55,0.25)] hover:bg-[#e7c65a] hover:shadow-[0_10px_28px_rgba(212,175,55,0.35)] transition"
  >
    Book Now
  </button>

  <a
    href="tel:4753755339"
    className="text-[#d4af37] font-semibold hover:text-white transition"
  >
    475-375-5339
  </a>
</div>
      </nav>

      {/* ══════════════════════════════════════════ */}
      {/* 1. HERO                                   */}
      {/* ══════════════════════════════════════════ */}
      <section id="hero">
        <div className="hero-badge">
          <span>★</span> Connecticut's Premium Mobile Detailing <span>★</span>
        </div>
        {/* HEADLINE — edit here */}
        <h1 className="gold-text">
         Premium Mobile Detailing<br />
         <span className="gold-text">in Connecticut</span>
        </h1>
        {/* SUBHEADING — edit here */}
        <p className="hero-sub">
          Interior, exterior, and full detailing services brought directly to your location.
           Professional results, premium products, and honest starting prices.
       </p>
        <div className="hero-btns">
          {/* CTA 1 — replace href with booking link or tel: */}
          <a href="tel:4753755339" className="btn-primary">
             Call to Book
            </a>

            <a href="mailto:euroshine.ct@gmail.com" className="btn-secondary">
            Email Us
             </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* 2. SERVICES OVERVIEW                      */}
      {/* ══════════════════════════════════════════ */}
      <section id="overview">
        <div className="section-wrap">
          <div className="section-title-block fade-in">
            <div className="section-eyebrow">What We Offer</div>
            {/* Section title — edit here */}
            <h2 className="gold-text">
              Detailing Services Tailored<br />
              <span className="gold-text">to Your Vehicle</span>
            </h2>
           <div className="price-note">
  <strong>Starting Prices:</strong> Based on sedan-sized vehicles.  
  Final pricing depends on vehicle size and condition.
</div>
          </div>

          {/* Overview cards — edit icon, title, description here */}
          <div className="overview-grid">
  {[
    {
      image: exteriorImg,
      title: "Exterior Detailing",
      desc: "Paint-safe hand wash, wheel care, iron decontamination, and protective treatments for a lasting shine."
    },
    {
      image: interiorImg,
      title: "Interior Detailing",
      desc: "Deep vacuum, steam clean, leather conditioning, stain removal, and surface protection throughout the cabin."
    },
    {
      image: fullImg,
      title: "Full Detail Packages",
      desc: "Our bundled Express and Deluxe packages cover both exterior and interior in one comprehensive appointment — and offer real savings."
    },
    {
      image: engineImg,
      title: "Engine Bay Cleaning",
      desc: "A careful, professional engine bay clean to remove grime and buildup, leaving under the hood looking pristine."
    }
  ].map((card, i) => (
    <div
      className="overview-card fade-in"
      key={i}
      style={{ transitionDelay: `${i * 0.1}s` }}
    >
      <img
        src={card.image}
        alt={card.title}
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "16px",
          display: "block",
          boxShadow: "0 10px 25px rgba(0,0,0,0.28)"
        }}
      />

      <div className="overview-card-title">{card.title}</div>
      <p className="overview-card-desc">{card.desc}</p>
    </div>
  ))}
</div>
  </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* 3. PACKAGES                               */}
      {/* ══════════════════════════════════════════ */}
      <section id="packages">
        <div className="section-wrap">
          <div className="section-title-block fade-in">
            <div className="section-eyebrow">Service Packages</div>
            <h2 className="gold-text">
              Choose Your Level of<br />
              <span className="gold-text">EuroShine Care</span>
            </h2>
            <p className="section-desc">
              All prices are starting rates based on sedan pricing.
              Final price depends on vehicle size and condition — we'll confirm before every appointment.
            </p>
          </div>

          {/* ── EXPRESS TIER ── */}
          <div className="fade-in">
            <div className="tier-label">
              {/* Tier name — edit here */}
              <span className="tier-badge gold-text">Express</span>
              <span className="tier-sub">Maintenance & Refresh</span>
            </div>
            <div className="tier-separator">
              <div className="gold-line" />
              <span className="tier-separator-label">Express Services</span>
              <div className="gold-line" />
            </div>
            <div className="pkg-row">
              {expressPackages.map((pkg, i) => (
                <PackageCard pkg={pkg} key={i} />
              ))}
            </div>
          </div>

          {/* ── DELUXE TIER ── */}
          <div className="fade-in">
            <div className="tier-label">
              {/* Tier name — edit here */}
              <span className="tier-badge gold-text">Deluxe</span>
              <span className="tier-sub">Complete Premium Detail</span>
            </div>
            <div className="tier-separator">
              <div className="gold-line" />
              <span className="tier-separator-label">Deluxe Services</span>
              <div className="gold-line" />
            </div>
            <div className="pkg-row">
              {deluxePackages.map((pkg, i) => (
                <PackageCard pkg={pkg} key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

            {/* ══════════════════════════════════════════ */}
      {/* BOOKING CALCULATOR */}
      {/* ══════════════════════════════════════════ */}
      <section id="booking-calculator" className="py-20">
  <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-10">
    <div className="mx-auto max-w-4xl text-center mb-14 fade-in">
      <p className="text-[#d4af37] uppercase tracking-[0.25em] text-sm font-semibold mb-3">
        Booking Calculator
      </p>

      <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#d4af37]">
        Build Your Detail
      </h2>

      <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mt-4">
        Select your vehicle, choose your interior and exterior package, add extras,
        and see your estimated total before booking.
      </p>
    </div>

    <div className="grid gap-8 xl:gap-10 lg:grid-cols-[minmax(0,1fr)_430px] items-start">
      <div className="space-y-8">
        <div className="bg-[#0c1830] border border-white/10 rounded-3xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-white mb-5">1. Select Vehicle Type</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: "sedan", label: "Sedan" },
              { key: "suv", label: "SUV / Jeep" },
              { key: "van", label: "Van" },
            ].map((item) => {
              const active = vehicleType === item.key

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setVehicleType(item.key)}
                  className={`rounded-2xl p-5 border text-left transition-all duration-200 ${
                    active
                      ? "bg-[#d4af37] text-[#07111f] border-[#d4af37] shadow-[0_0_0_1px_rgba(212,175,55,0.35),0_12px_30px_rgba(212,175,55,0.15)]"
                      : "bg-[#0c1830] text-white border-white/10 hover:border-[#d4af37] hover:bg-[#10203d]"
                  }`}
                >
                  <div className="text-xl font-bold">{item.label}</div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-[#0c1830] border border-white/10 rounded-3xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-white mb-5">2. Choose Exterior Package</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                key: "basicWash",
                title: "Basic Wash",
                desc: "Sedan base: $150",
                plus:
                  vehicleType === "sedan"
                    ? "No extra charge"
                    : `+ $${vehicleUpcharges[vehicleType].basicWash}`,
              },
              {
                key: "expressExterior",
                title: "Express Exterior",
                desc: "Sedan base: $125",
                plus:
                  vehicleType === "sedan"
                    ? "No extra charge"
                    : `+ $${vehicleUpcharges[vehicleType].expressExterior}`,
              },
              {
                key: "deluxeExterior",
                title: "Deluxe Exterior",
                desc: "Sedan base: $175",
                plus:
                  vehicleType === "sedan"
                    ? "No extra charge"
                    : `+ $${vehicleUpcharges[vehicleType].deluxeExterior}`,
              },
            ].map((item) => {
              const active = exteriorPackage === item.key

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setExteriorPackage(item.key)}
                  className={`rounded-2xl p-5 border text-left transition-all duration-200 ${
                    active
                      ? "bg-[#d4af37] text-[#07111f] border-[#d4af37] shadow-[0_0_0_1px_rgba(212,175,55,0.35),0_12px_30px_rgba(212,175,55,0.15)]"
                      : "bg-[#0c1830] text-white border-white/10 hover:border-[#d4af37] hover:bg-[#10203d]"
                  }`}
                >
                  <div className="text-xl font-bold">{item.title}</div>
                  <div className="text-base mt-1 opacity-80">{item.desc}</div>
                  <div className="text-xl mt-2 font-semibold">{item.plus}</div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-[#0c1830] border border-white/10 rounded-3xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-white mb-5">3. Choose Interior Package</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                key: "expressInterior",
                title: "Express Interior",
                desc: "Sedan base: $150",
                plus:
                  vehicleType === "sedan"
                    ? "No extra charge"
                    : `+ $${vehicleUpcharges[vehicleType].expressInterior}`,
              },
              {
                key: "deluxeInterior",
                title: "Deluxe Interior",
                desc: "Sedan base: $200",
                plus:
                  vehicleType === "sedan"
                    ? "No extra charge"
                    : `+ $${vehicleUpcharges[vehicleType].deluxeInterior}`,
              },
            ].map((item) => {
              const active = interiorPackage === item.key

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setInteriorPackage(item.key)}
                  className={`rounded-2xl p-5 border text-left transition-all duration-200 ${
                    active
                      ? "bg-[#d4af37] text-[#07111f] border-[#d4af37] shadow-[0_0_0_1px_rgba(212,175,55,0.35),0_12px_30px_rgba(212,175,55,0.15)]"
                      : "bg-[#0c1830] text-white border-white/10 hover:border-[#d4af37] hover:bg-[#10203d]"
                  }`}
                >
                  <div className="text-xl font-bold">{item.title}</div>
                  <div className="text-base mt-1 opacity-80">{item.desc}</div>
                  <div className="text-xl mt-2 font-semibold">{item.plus}</div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-[#0c1830] border border-white/10 rounded-3xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-white mb-5">4. Add Extras</h3>

          <div className="rounded-2xl border border-white/10 bg-[#10203d] p-5 flex items-center justify-between gap-4">
            <div>
              <div className="text-xl font-bold text-white">Engine Bay Cleaning</div>
              <div className="text-gray-300 mt-1">+ $60</div>
            </div>

            <input
              type="checkbox"
              checked={engineBay}
              onChange={(e) => setEngineBay(e.target.checked)}
              className="w-5 h-5 accent-[#d4af37]"
            />
          </div>

          <div className="mt-6">
            <div className="text-xl font-bold text-white mb-4">Pet Hair Removal</div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: "none", label: "None", price: 0 },
                { key: "light", label: "Light", price: 30 },
                { key: "medium", label: "Medium", price: 40 },
                { key: "heavy", label: "Heavy", price: 50 },
              ].map((item) => {
                const active = petHairLevel === item.key

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPetHairLevel(item.key)}
                    className={`rounded-2xl p-4 border text-left transition-all duration-200 ${
                      active
                        ? "bg-[#d4af37] text-[#07111f] border-[#d4af37] shadow-[0_0_0_1px_rgba(212,175,55,0.35),0_12px_30px_rgba(212,175,55,0.15)]"
                        : "bg-[#0c1830] text-white border-white/10 hover:border-[#d4af37] hover:bg-[#10203d]"
                    }`}
                  >
                    <div className="text-lg font-bold">{item.label}</div>
                    <div className="text-base mt-1">
                      {item.price === 0 ? "No extra charge" : `+ $${item.price}`}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="w-full rounded-[28px] bg-[#d4af37] text-[#07111f] p-7 md:p-8 shadow-2xl">
          <p className="pl-1 mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#07111f]/80">
            Booking Summary
          </p>

          <h3 className="text-4xl font-extrabold mb-6 leading-none">
            Your Estimated Total
          </h3>

          <div className="space-y-4 border-b border-black/15 pb-6 mb-6 text-sm md:text-base">
            <div className="flex justify-between gap-4">
              <span className="font-medium">Vehicle</span>
              <span className="font-semibold text-right">{formatLabel(vehicleType)}</span>
              {discountAmount > 0 && (
             <div className="flex justify-between gap-4">
             <span className="font-medium">{discountLabel}</span>
            <span className="font-semibold text-right text-green-900">
               - ${discountAmount}
            </span>
         </div>
             )}
            </div>

            <div className="flex justify-between gap-4">
              <span className="font-medium">Exterior</span>
              <span className="font-semibold text-right">
                {formatLabel(exteriorPackage)}
                <br />
                <span className="text-black/70">
                  ${exteriorBase} {exteriorUpcharge > 0 ? ` + $${exteriorUpcharge}` : ""}
                </span>
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="font-medium">Interior</span>
              <span className="font-semibold text-right">
                {formatLabel(interiorPackage)}
                <br />
                <span className="text-black/70">
                  ${interiorBase} {interiorUpcharge > 0 ? ` + $${interiorUpcharge}` : ""}
                </span>
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="font-medium">Engine Bay</span>
              <span className="font-semibold text-right">
                {engineBay ? `+ $${engineBayPrice}` : "No"}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="font-medium">Pet Hair</span>
              <span className="font-semibold text-right">
                {petHairLevel === "none" ? "None" : `${formatLabel(petHairLevel)} + $${petHairPrice}`}
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 mb-5">
            <span className="text-2xl font-bold">Estimated Total</span>
            <span className="text-5xl font-extrabold">${totalPrice}</span>
          </div>

          <p className="text-black/75 leading-relaxed mb-6">
            Starting package prices are based on sedan vehicles. Larger vehicles and add-ons are calculated above.
          </p>

          <div className="space-y-3">
            <a
              href="#contact"
              className="block w-full rounded-full bg-[#07111f] text-white text-center font-semibold py-3 px-5 hover:opacity-90 transition"
            >
              Continue to Booking
            </a>

            <a
              href="mailto:euroshine.ct@gmail.com?subject=EuroShine%20Booking%20Request"
              className="block w-full rounded-full border border-black/20 text-center font-semibold py-3 px-5 hover:bg-black/5 transition"
            >
              Email This Request
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ══════════════════════════════════════════ */}
      {/* 4. PRICING DISCLAIMER                     */}
      {/* ══════════════════════════════════════════ */}
      <section id="disclaimer">
        <div className="section-wrap">
          <div className="disclaimer-box fade-in">
            <div className="disclaimer-icon">ℹ️</div>
            <div>
              {/* Disclaimer title — edit here */}
              <div className="disclaimer-title">Pricing Information</div>
              {/* Disclaimer text — edit here */}
              <p className="disclaimer-text">
                All prices listed are <strong>starting prices based on standard sedan sizing.</strong>{" "}
                Larger vehicles (SUVs, trucks, vans, 3-row vehicles) and vehicles in heavier
                condition may be quoted at a higher rate. We always confirm the final price with you
                before beginning any work — <strong>no surprises, ever.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* 5. ADD-ONS                                */}
      {/* ══════════════════════════════════════════ */}
      <section id="addons">
        <div className="section-wrap">
          <div className="section-title-block fade-in">
            <div className="section-eyebrow">Add-On Services</div>
            <h2 className="gold-text">
              Enhance Your<br />
              <span className="gold-text">Detail</span>
            </h2>
            <p className="section-desc">
              Pair any package with our add-on service for a more complete clean.
            </p>
          </div>

          {/* Add-on card — edit name, desc, price here */}
          <div className="fade-in">
            <div className="addon-card">
              <div className="addon-card-stripe" />
              <div className="addon-icon">🔧</div>
              <div className="addon-info">
                <div className="addon-name">Engine Bay Cleaning</div>
                <p className="addon-desc">
                  A careful, detail-focused engine bay clean — degreased, rinsed, and dressed.
                  Remove built-up grime for a fresh, showroom-ready look under the hood.
                </p>
              </div>
              <div className="addon-price">$60</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* 6. WHY EUROSHINE / ABOUT                  */}
      {/* ══════════════════════════════════════════ */}
      <section id="about">
        <div className="section-wrap">
          <div className="about-inner">
            {/* Left — quote block */}
            <div className="fade-in">
              <span className="about-quote-mark">"</span>
              {/* Quote / about message — edit here */}
              <p className="about-quote">
                European precision. American dedication. Every detail, every time.
              </p>
              <div className="about-attribution">— EuroShine Mobile Detailing, Connecticut</div>
            </div>

            {/* Right — pillars */}
            <div className="about-pillars fade-in">
              <div className="section-eyebrow" style={{ marginBottom: 24, textAlign: "left" }}>
                Why Choose EuroShine
              </div>
              {/* Edit pillar titles and descriptions here */}
              {[
                { icon: "🏅", title: "Experienced Team", desc: "We bring years of hands-on detailing expertise to every appointment, with a professional standard you can see and feel." },
                { icon: "🧴", title: "Premium European Chemicals", desc: "We exclusively use professional-grade European products — trusted by detailers across Europe for their performance and safety." },
                { icon: "🛠️", title: "European Detailing Equipment", desc: "From our pressure systems to our polishing machines, every piece of equipment is sourced for precision and reliability." },
                { icon: "📍", title: "Fully Mobile in Connecticut", desc: "We come to you — driveway, office, or anywhere convenient. No shop, no wait, no hassle." },
              ].map((p, i) => (
                <div className="pillar" key={i}>
                  <div className="pillar-icon">{p.icon}</div>
                  <div>
                    <div className="pillar-title">{p.title}</div>
                    <p className="pillar-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* 7. FINAL CTA                              */}
      {/* ══════════════════════════════════════════ */}
      <section id="cta">
        <div className="section-wrap">
          <div className="fade-in">
            <div className="section-eyebrow">Ready to Book?</div>
            {/* CTA headline — edit here */}
            <h2 className="gold-text">
              Let's Make Your Car<br />
              <span className="gold-text">Shine Like New.</span>
            </h2>
            {/* CTA subtext — edit here */}
            <p className="cta-sub">
              Call or text to schedule your appointment, or email us with any questions.
              We're proud to serve Connecticut — and we'd love to serve you.
            </p>

            <div className="cta-cards">
              {/* Phone card — replace href with tel: */}
              <a href="tel:4753755339" className="cta-contact-card">
                <div className="cta-contact-icon">📞</div>
                <div className="cta-contact-method">Call or Text</div>
                {/* Phone number — edit here */}
                <div className="cta-contact-value gold-text">475-375-5339</div>
                <div className="cta-contact-note">Book your appointment today</div>
              </a>

              {/* Email card — replace href with mailto: */}
              <a href="mailto:euroshine.ct@gmail.com" className="cta-contact-card">
                <div className="cta-contact-icon">✉️</div>
                <div className="cta-contact-method">Email Us</div>
                {/* Email — edit here */}
                <div className="cta-contact-value gold-text" style={{ fontSize: "1.15rem" }}>
                  euroshine.ct@gmail.com
                </div>
                <div className="cta-contact-note">We'll respond promptly</div>
              </a>
            </div>
          </div>
        </div>
      </section>
<section id="socials" style={{
  padding: "80px 0",
  background: "linear-gradient(180deg, #0a1228 0%, #080e1f 100%)",
  textAlign: "center"
}}>
  <div className="section-wrap">
    <div className="section-title-block fade-in">
      <div className="section-eyebrow">Follow EuroShine</div>
      <h2 className="gold-text">
        See Our Work on<br />
        <span className="gold-text">Social Media</span>
      </h2>
      <p className="section-desc">
        Follow us for detailing content, recent work, and updates from EuroShine Mobile Detailing.
      </p>
    </div>

    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      flexWrap: "wrap",
      marginTop: "30px"
    }}>
      <a
        href="https://www.facebook.com/share/1GcxdmPFek/?mibextid=wwXIfr"
        target="_blank"
        rel="noopener noreferrer"
        className="social-card"
      >
        <div className="social-name">Facebook</div>
        <div className="social-handle">EuroShine</div>
      </a>

      <a
        href="https://www.instagram.com/euroshine.ct?igsh=MWIyY2MzajBoMjZvNA=="
        target="_blank"
        rel="noopener noreferrer"
        className="social-card"
      >
        <div className="social-name">Instagram</div>
        <div className="social-handle">@euroshine.ct</div>
      </a>

      <a
        href="https://www.tiktok.com/@euroshine.ct?_r=1&_t=ZS-95cWjCUSeZu"
        target="_blank"
        rel="noopener noreferrer"
        className="social-card"
      >
        <div className="social-name">TikTok</div>
        <div className="social-handle">@euroshine.ct</div>
      </a>
    </div>
  </div>
</section>
      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-brand">
          <span className="gold-text">Euro</span>Shine Mobile Detailing
        </div>
        {/* Footer note — edit here */}
        <p className="footer-note">
          Serving Connecticut · Premium European Detailing Standards · Mobile Service
        </p>
      </footer>
    </>
  );
}
