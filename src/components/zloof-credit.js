// zloof-credit.js — "Built by Zloof Systems & Solutions" badge
const ZLOOF_LOGO = `<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="1" y="1" width="22" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7.5 8h9l-9 8h9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

class ZloofCredit extends HTMLElement {
  static get observedAttributes() { return ['variant', 'client']; }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    const client = this.getAttribute('client') || location.hostname;
    const url = `https://zloofsystems.com/?utm_source=${encodeURIComponent(client)}&utm_medium=footer_credit&utm_campaign=client_sites`;
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host { display:block; text-align:var(--zloof-align,center); padding:var(--zloof-padding,14px 0 10px); font:inherit; color:var(--zloof-color,inherit); }
        a { display:inline-flex; align-items:center; gap:.45em; font-size:var(--zloof-size,11px); color:currentColor; text-decoration:none;
            opacity:var(--zloof-opacity,.55); transition:opacity .25s, background .25s; white-space:nowrap; }
        a:hover, a:focus-visible { opacity:1; }
        :host(:not([variant="text"])) a { padding:.4em .95em .4em .7em; border-radius:999px;
            background:color-mix(in srgb,currentColor 7%,transparent);
            border:1px solid color-mix(in srgb,currentColor 14%,transparent);
            backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); }
        :host(:not([variant="text"])) a:hover { background:color-mix(in srgb,currentColor 12%,transparent); }
        svg { flex:none; display:block; }
        strong { font-weight:500; }
      </style>
      <a part="link" href="${url}" target="_blank" rel="noopener nofollow" aria-label="Website built by Zloof Systems & Solutions">
        ${ZLOOF_LOGO}<span>Built by <strong>Zloof Systems &amp; Solutions</strong></span><span aria-hidden="true">↗</span>
      </a>`;
  }
}
if (!customElements.get('zloof-credit')) customElements.define('zloof-credit', ZloofCredit);
