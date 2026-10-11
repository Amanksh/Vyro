"use client";

import { useEffect, useId, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { hrefFor, opensNewTab } from "./links";
import "./swayhouse.css";
import "./pages.css";

const ASSET = "/sites/swayhouse";

const brandServices = [
  { href: "/influencer-marketing", label: "Influencer marketing" },
  { href: "/creator-discovery", label: "Creator discovery" },
  { href: "/influencer-campaign-management", label: "Campaign management" },
  { href: "/campaign-brief", label: "Build a brief" },
];

const creatorLinks = [
  { href: "/creator-management#programmes", label: "Management programmes" },
  { href: "/plans", label: "Compare programmes" },
  { href: "/applyforms", label: "Apply as a creator" },
];

const moreLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Vyro influence" },
  { href: "/resources", label: "Resources" },
  { href: "/plans", label: "Creator programmes" },
  { href: "/applyforms", label: "Apply as a creator" },
  { href: "/creator-portal/login", label: "Creator Portal" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/145204656/", icon: `${ASSET}/icons/linkedin.svg` },
  { label: "Instagram", href: "https://instagram.com/swayhousehq", icon: `${ASSET}/icons/instagram.svg` },
  { label: "Facebook", href: "https://www.facebook.com/people/SwayHouse/61593356641687/", icon: `${ASSET}/icons/facebook.svg` },
  { label: "X", href: "https://x.com/swayhousemedia", icon: `${ASSET}/icons/x.svg` },
  { label: "Reddit", href: "https://www.reddit.com/user/Swayhouse-partners/", icon: `${ASSET}/icons/reddit.svg` },
];

const contacts = [
  { label: "Brand enquiries", value: "collab@vyroinfluence.in", href: "mailto:collab@vyroinfluence.in" },
  { label: "Creators & general", value: "hello@vyroinfluence.in", href: "mailto:hello@vyroinfluence.in" },
  { label: "Programmes & plans", value: "plans@vyroinfluence.in", href: "mailto:plans@vyroinfluence.in" },
  { label: "Creator support", value: "support@vyroinfluence.in", href: "mailto:support@vyroinfluence.in" },
  { label: "Billing", value: "billing@vyroinfluence.in", href: "mailto:billing@vyroinfluence.in" },
  { label: "Legal", value: "legal@vyroinfluence.in", href: "mailto:legal@vyroinfluence.in" },
];

export function SiteLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const resolved = hrefFor(href);
  const external = opensNewTab(resolved);
  return (
    <a
      href={resolved}
      className={className}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function Wordmark() {
  return (
    <SiteLink href="/" className="sh-wordmark" ariaLabel="Vyro influence home">
      <svg className="sh-mark" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 50 11.13 L 13.26 47.86 V 80.07 C 22.5 87.8 38.2 89.2 52.1 82.3 C 65.4 75.7 76.5 76.8 86.74 86.74 V 47.86 L 50 11.13 Z M 50 23.71 L 77.68 51.38 V 69.5 C 70.2 65.1 60.1 63.8 50.3 70.7 C 38.4 78.9 28.6 77.3 22.32 75.54 V 51.38 L 50 23.71 Z"
          fill="currentColor"
        />
      </svg>
      <span>Vyro influence</span>
    </SiteLink>
  );
}

function NavGroup({
  label,
  href,
  triggerLabel,
  items,
}: {
  label: string;
  href: string;
  triggerLabel: string;
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="sh-audience"
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setOpen(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setOpen(false);
      }}
    >
      <SiteLink href={href}>{label}</SiteLink>
      <button
        type="button"
        className="sh-caret"
        aria-expanded={open}
        aria-label={triggerLabel}
        onClick={() => setOpen((current) => !current)}
      >
        <ChevronDown aria-hidden="true" />
      </button>
      <div className="sh-submenu" hidden={!open}>
        {items.map((item) => (
          <SiteLink key={item.href} href={item.href}>
            {item.label}
            <ArrowRight aria-hidden="true" />
          </SiteLink>
        ))}
      </div>
    </div>
  );
}

function RockyMark() {
  const shellId = `rocky-shell-${useId().replaceAll(":", "")}`;
  const ballId = `rocky-ball-${useId().replaceAll(":", "")}`;
  return (
    <span aria-hidden="true" style={{ width: 42, height: 48, display: "grid", placeItems: "center" }}>
      <svg viewBox="0 0 104 153" width="42" height="48">
        <defs>
          <radialGradient id={shellId} cx="34%" cy="24%" r="80%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="58%" stopColor="#eef5f2" />
            <stop offset="100%" stopColor="#e4eeea" />
          </radialGradient>
          <radialGradient id={ballId} cx="32%" cy="26%" r="76%">
            <stop offset="0%" stopColor="#5dcebb" />
            <stop offset="52%" stopColor="#14967c" />
            <stop offset="100%" stopColor="#0c6b58" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="38.5" r="30" fill={`url(#${shellId})`} />
        <circle cx="50" cy="103.4" r="40.5" fill={`url(#${shellId})`} />
        <circle cx="42.9" cy="51.3" r="2.8" fill="#1a1a1a" />
        <circle cx="57.1" cy="51.3" r="2.8" fill="#1a1a1a" />
        <circle cx="87.5" cy="90.2" r="12.6" fill={`url(#${ballId})`} />
      </svg>
    </span>
  );
}

export function SiteShell({
  children,
  chrome = "full",
}: {
  children: React.ReactNode;
  chrome?: "full" | "header" | "none";
}) {
  const menuId = useId();
  const cookieId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookiesOpen, setCookiesOpen] = useState(false);
  const [rockyOpen, setRockyOpen] = useState(false);

  useEffect(() => {
    const menu = document.getElementById(menuId);
    const cookies = document.getElementById(cookieId);
    if (!(menu instanceof HTMLDialogElement) || !(cookies instanceof HTMLDialogElement)) return;
    if (menuOpen && !menu.open) menu.showModal();
    if (!menuOpen && menu.open) menu.close();
    if (cookiesOpen && !cookies.open) cookies.showModal();
    if (!cookiesOpen && cookies.open) cookies.close();
  }, [cookieId, cookiesOpen, menuId, menuOpen]);

  if (chrome === "none") {
    return <div className="sh sh-bare">{children}</div>;
  }

  return (
    <div className="sh">
      <a className="sh-skip" href="#main">
        Skip to main content
      </a>
      <header className="sh-header">
        <div className="sh-header-inner">
          <Wordmark />
          <nav className="sh-nav" aria-label="Primary">
            <NavGroup label="For brands" href="/brands" triggerLabel="Show brand services" items={brandServices} />
            <NavGroup label="For creators" href="/creator-management" triggerLabel="Show creator options" items={creatorLinks} />
            <SiteLink href="/contact" className="sh-contact">
              Contact
            </SiteLink>
          </nav>
          <button type="button" className="sh-menu-btn" aria-label="Open navigation" onClick={() => setMenuOpen(true)}>
            <Menu aria-hidden="true" />
            <span className="sh-menu-label">Menu</span>
          </button>
        </div>
      </header>

      <dialog className="sh-dialog" id={menuId} aria-label="Vyro influence navigation" onClose={() => setMenuOpen(false)}>
        <div className="sh-dialog-top">
          <strong>Vyro influence</strong>
          <button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}>
            <X aria-hidden="true" />
          </button>
        </div>
        <nav
          className="sh-mobile-nav"
          aria-label="Mobile primary"
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a")) setMenuOpen(false);
          }}
        >
          <NavGroup label="For brands" href="/brands" triggerLabel="Show brand services" items={brandServices} />
          <NavGroup label="For creators" href="/creator-management" triggerLabel="Show creator options" items={creatorLinks} />
          <div className="sh-audience">
            <SiteLink href="/contact">Contact</SiteLink>
          </div>
        </nav>
        <nav
          className="sh-mobile-more"
          aria-label="More from Vyro influence"
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a")) setMenuOpen(false);
          }}
        >
          {moreLinks.map((item) => (
            <SiteLink key={item.label} href={item.href}>
              {item.label}
              <ArrowRight aria-hidden="true" width={14} height={14} />
            </SiteLink>
          ))}
        </nav>
      </dialog>

      {children}

      {chrome === "full" ? (
        <footer className="sh-footer">
          <div className="sh-shell">
            <div className="sh-footer-top">
              <Wordmark />
              <nav className="sh-social" aria-label="Vyro influence social media">
                {socials.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.label} (opens in a new tab)`}>
                    <img src={item.icon} alt="" />
                  </a>
                ))}
              </nav>
            </div>
            <nav className="sh-footer-nav" aria-label="Footer primary">
              <SiteLink href="/brands">For brands</SiteLink>
              <SiteLink href="/creator-management">For creators</SiteLink>
              <SiteLink href="/contact">Contact</SiteLink>
            </nav>
            <nav className="sh-footer-nav" aria-label="More from Vyro influence">
              {moreLinks.map((item) => (
                <SiteLink key={item.label} href={item.href}>
                  {item.label}
                </SiteLink>
              ))}
            </nav>
            <dl className="sh-contacts">
              {contacts.map((item) => (
                <div key={item.href}>
                  <dt>
                    <Mail aria-hidden="true" />
                    {item.label}
                  </dt>
                  <dd>
                    <a href={item.href}>{item.value}</a>
                  </dd>
                </div>
              ))}
              <div>
                <dt>
                  <Phone aria-hidden="true" />
                  Phone
                </dt>
                <dd>
                  <a href="tel:+919821819622">+91 98218 19622</a>
                </dd>
              </div>
            </dl>
            <p className="sh-legal">
              <SiteLink href="/privacy">Privacy Policy</SiteLink>
              <SiteLink href="/terms">Terms & Conditions</SiteLink>
              <SiteLink href="/cookies">Cookie Policy</SiteLink>
              <SiteLink href="/refunds">Refund & Cancellation</SiteLink>
              <button type="button" onClick={() => setCookiesOpen(true)}>
                Cookie settings
              </button>
            </p>
            <p className="sh-legal">© 2026 Vyro influence</p>
          </div>
        </footer>
      ) : null}

      <dialog className="sh-dialog" id={cookieId} aria-label="Cookie settings" onClose={() => setCookiesOpen(false)}>
        <div className="sh-dialog-top">
          <strong>Cookie settings</strong>
          <button type="button" aria-label="Close cookie settings" onClick={() => setCookiesOpen(false)}>
            <X aria-hidden="true" />
          </button>
        </div>
        <p className="sh-lede" style={{ marginTop: 16 }}>
          Vyro influence describes how cookies are used in the Cookie Policy. This local copy does not set tracking cookies.
        </p>
        <div className="sh-actions" style={{ justifyContent: "flex-start" }}>
          <SiteLink href="/cookies" className="sh-button">
            View cookie policy
          </SiteLink>
          <button type="button" className="sh-secondary" onClick={() => setCookiesOpen(false)}>
            Close
          </button>
        </div>
      </dialog>

      <div className="sh-rocky">
        {rockyOpen ? (
          <div className="sh-rocky-panel" role="dialog" aria-label="Ask Rocky, Vyro influence guide">
            <strong>Ask Rocky</strong>
            <p>
              Rocky is Vyro influence’s on-site guide. This copy keeps the launcher and routes. The live assistant answers on vyroinfluence.in.
            </p>
            <SiteLink href="/brands">
              For brands <ArrowRight aria-hidden="true" width={14} height={14} />
            </SiteLink>
            <SiteLink href="/creator-management">
              For creators <ArrowRight aria-hidden="true" width={14} height={14} />
            </SiteLink>
            <SiteLink href="/contact">
              Contact <ArrowRight aria-hidden="true" width={14} height={14} />
            </SiteLink>
            <SiteLink href="https://www.swayhouse.in/rocky">
              Open the live guide <ArrowRight aria-hidden="true" width={14} height={14} />
            </SiteLink>
          </div>
        ) : null}
        <button
          type="button"
          className="sh-rocky-btn"
          aria-label="Ask Rocky, Vyro influence guide"
          aria-expanded={rockyOpen}
          onClick={() => setRockyOpen((open) => !open)}
        >
          <RockyMark />
          <span>Ask Rocky</span>
        </button>
      </div>
    </div>
  );
}
