"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clapperboard,
  Compass,
  Handshake,
  Megaphone,
  Phone,
  Users,
} from "lucide-react";
import { brandDiagram, creatorDiagram } from "./diagrams";
import { SiteLink, SiteShell } from "./site-shell";

const ASSET = "/sites/swayhouse";

const partners = [
  {
    name: "Movals",
    role: "Parent company",
    src: `${ASSET}/logos/movals.png`,
    href: "https://movalslogistics.com",
  },
  {
    name: "Reliance Gulf",
    role: "Parent company",
    src: `${ASSET}/logos/reliance-gulf.png`,
    href: "https://reliancegulfengg.com",
  },
  {
    name: "PSN",
    role: "Partner",
    src: `${ASSET}/logos/psn.png`,
    href: "https://psnengineering.com",
  },
  {
    name: "Razorpay",
    role: "Payments partner",
    src: `${ASSET}/logos/razorpay.svg`,
    href: "https://razorpay.com",
  },
  {
    name: "Zuptek",
    role: "Media & advertising partner",
    src: `${ASSET}/logos/zuptek.png`,
    href: "https://zuptek.com",
  },
];

function useCount(target: number, playKey: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    if (reduce) {
      frame = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frame);
    }
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playKey, target]);

  return value;
}

function Stat({
  label,
  target,
  playKey,
  onReplay,
}: {
  label: string;
  target: number;
  playKey: number;
  onReplay: () => void;
}) {
  const value = useCount(target, playKey);
  return (
    <div>
      <dt>{label}</dt>
      <dd>
        <button type="button" aria-label={`Replay company figures: ${target}+ ${label}`} onClick={onReplay}>
          <span aria-hidden="true">
            {value}
            <span>+</span>
          </span>
          <span className="sh-sr">
            {target}+
          </span>
        </button>
      </dd>
    </div>
  );
}

function Diagram({ markup }: { markup: string }) {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}

export function HomePage() {
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    const nodes = document.querySelectorAll(".sh-diagram");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.setAttribute("data-visible", "true");
        }
      },
      { threshold: 0.35 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <SiteShell>
      <main className="sh-page" id="main">
        <section className="sh-hero">
          <div className="sh-shell">
            <div className="sh-hero-copy">
              <p className="sh-eyebrow">
                <BriefcaseBusiness aria-hidden="true" />
                Creator management & brand campaigns
              </p>
              <h1 className="sh-sr">Creator stories. Brand impact.</h1>
              <div className="sh-hero-scene" aria-label="How Vyro influence connects creators and brands">
                <div className="sh-scene-header">
                  <span>THE WORK BEHIND THE WORK</span>
                  <span aria-hidden="true">00:01 — 00:30</span>
                </div>
                <div className="sh-scene-track">
                  <div className="sh-scene-card sh-scene-card-creator">
                    <span className="sh-scene-index">01</span>
                    <span className="sh-scene-icon"><Users aria-hidden="true" /></span>
                    <strong>Creator story</strong>
                    <small>Your voice. Your audience.</small>
                  </div>
                  <div className="sh-scene-bridge" aria-hidden="true">
                    <span className="sh-scene-bridge-line"><i /></span>
                    <strong>one team</strong>
                    <small>finds the fit</small>
                  </div>
                  <div className="sh-scene-card sh-scene-card-brand">
                    <span className="sh-scene-index">02</span>
                    <span className="sh-scene-icon"><Megaphone aria-hidden="true" /></span>
                    <strong>Brand impact</strong>
                    <small>Ideas people remember.</small>
                  </div>
                </div>
                <p className="sh-scene-footer">From a first brief to a campaign worth talking about.</p>
                <span className="sh-scene-scan" aria-hidden="true" />
              </div>
              <p className="sh-lede">
                We handle the business around your content.
                <br />
                Creator careers. Brand campaigns. One team.
              </p>
              <div className="sh-actions">
                <SiteLink href="/brands" className="sh-button">
                  <Handshake aria-hidden="true" />
                  For brands
                  <ArrowRight aria-hidden="true" />
                </SiteLink>
                <SiteLink href="/creator-management" className="sh-button">
                  <Users aria-hidden="true" />
                  For creators
                  <ArrowRight aria-hidden="true" />
                </SiteLink>
              </div>
            </div>
            <div className="sh-stats-wrap">
              <dl className="sh-stats" aria-label="Company experience">
                <Stat label="Creator Network" target={500} playKey={playKey} onReplay={() => setPlayKey((key) => key + 1)} />
                <Stat label="Brand Collaborations" target={300} playKey={playKey} onReplay={() => setPlayKey((key) => key + 1)} />
                <Stat label="Campaigns Delivered" target={50} playKey={playKey} onReplay={() => setPlayKey((key) => key + 1)} />
              </dl>
              <p className="sh-figure">
                <SiteLink href="/work">Explore our experience</SiteLink>
              </p>
            </div>
          </div>
        </section>

        <section className="sh-partners" aria-label="Company relationships">
          <div className="sh-shell">
            <p className="sh-eyebrow">Connected by good company</p>
          </div>
          <div className="sh-window">
            <div className="sh-track">
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1}>
                  {partners.map((partner) => (
                    <li key={`${partner.name}-${copy}`}>
                      <a className="sh-partner" href={partner.href} target="_blank" rel="noreferrer">
                        <img src={partner.src} alt="" />
                        <strong>{partner.name}</strong>
                        <span>{partner.role}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section className="sh-section">
          <div className="sh-shell">
            <p className="sh-eyebrow">Find your path</p>
            <h2 className="sh-heading">
              Your next step, <em className="sh-accent">with us.</em>
            </h2>
            <div className="sh-paths">
              <article className="sh-card">
                <div className="sh-card-copy">
                  <p className="sh-eyebrow">Campaigns, coordinated</p>
                  <h3>For brands</h3>
                  <p>Creator campaigns with a clear brief and one point of contact.</p>
                  <Diagram markup={brandDiagram} />
                  <p className="sh-caption">Creator fit. Clear scope. Coordinated delivery.</p>
                  <SiteLink href="/brands" className="sh-textlink">
                    Learn more for brands
                    <ArrowRight aria-hidden="true" />
                  </SiteLink>
                </div>
              </article>
              <article className="sh-card">
                <div className="sh-card-copy">
                  <p className="sh-eyebrow">Your work, supported</p>
                  <h3>For creators</h3>
                  <p>Management and commercial support, shaped to your programme.</p>
                  <Diagram markup={creatorDiagram} />
                  <p className="sh-caption">Opportunities. Agreed terms. Programme support.</p>
                  <SiteLink href="/creator-management" className="sh-textlink">
                    Learn more for creators
                    <ArrowRight aria-hidden="true" />
                  </SiteLink>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="sh-section">
          <div className="sh-shell">
            <div className="sh-section-top">
              <div>
                <p className="sh-eyebrow">What we do</p>
                <h2 className="sh-heading">
                  Choose your <em className="sh-accent">starting point.</em>
                </h2>
              </div>
              <SiteLink href="/services" className="sh-textlink">
                Explore all services
                <ArrowRight aria-hidden="true" />
              </SiteLink>
            </div>
            <div className="sh-services">
              <section className="sh-service" id="for-brands" aria-labelledby="brand-service-heading">
                <p className="sh-eyebrow">For brands</p>
                <h3 id="brand-service-heading">Choose the campaign support you need.</h3>
                <article>
                  <Megaphone className="sh-icon" aria-hidden="true" />
                  <h4>Influencer marketing</h4>
                  <p>Plan a creator campaign around your product, audience and objective.</p>
                  <SiteLink href="/influencer-marketing" className="sh-textlink">
                    View service
                    <ArrowRight aria-hidden="true" />
                    <span className="sh-sr">: Influencer marketing</span>
                  </SiteLink>
                </article>
                <article>
                  <Users className="sh-icon" aria-hidden="true" />
                  <h4>Creator discovery</h4>
                  <p>Find creators whose content and audience fit your brief.</p>
                  <SiteLink href="/creator-discovery" className="sh-textlink">
                    View service
                    <ArrowRight aria-hidden="true" />
                    <span className="sh-sr">: Creator discovery</span>
                  </SiteLink>
                </article>
                <article>
                  <Clapperboard className="sh-icon" aria-hidden="true" />
                  <h4>Campaign management</h4>
                  <p>Coordinate the moving parts from agreed scope to delivery.</p>
                  <SiteLink href="/influencer-campaign-management" className="sh-textlink">
                    View service
                    <ArrowRight aria-hidden="true" />
                    <span className="sh-sr">: Campaign management</span>
                  </SiteLink>
                </article>
              </section>
              <section className="sh-service sh-service-creator" aria-labelledby="creator-service-heading">
                <p className="sh-eyebrow">For creators</p>
                <h3 id="creator-service-heading">Choose support for your creator business.</h3>
                <article>
                  <Compass className="sh-icon" aria-hidden="true" />
                  <h4>Creator management</h4>
                  <p>Get support for the business around your content.</p>
                  <p className="sh-scope">
                    Compare the scope and fees of the existing programmes, then choose the support that fits.
                  </p>
                  <SiteLink href="/creator-management" className="sh-textlink">
                    View service
                    <ArrowRight aria-hidden="true" />
                    <span className="sh-sr">: Creator management</span>
                  </SiteLink>
                </article>
                <div className="sh-choices">
                  <SiteLink href="/creator-management#programmes">
                    Explore management programmes
                    <ArrowRight aria-hidden="true" />
                  </SiteLink>
                  <SiteLink href="/plans">
                    Compare programmes & fees
                    <ArrowRight aria-hidden="true" />
                  </SiteLink>
                  <SiteLink href="/applyforms">
                    Apply as a creator
                    <ArrowRight aria-hidden="true" />
                  </SiteLink>
                </div>
                <p className="sh-scope">
                  Responsibilities and commercial support follow your programme and agreement.
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="sh-section">
          <div className="sh-shell">
            <div className="sh-ending">
              <div>
                <p className="sh-eyebrow">For brands</p>
                <h2 className="sh-heading">
                  Bring your next <em className="sh-accent">campaign.</em>
                </h2>
                <p className="sh-lede">
                  Share your objective, audience and starting context. We’ll help agree the scope.
                </p>
                <div className="sh-actions">
                  <SiteLink href="/campaign-brief" className="sh-button">
                    Build a brief
                    <ArrowRight aria-hidden="true" />
                  </SiteLink>
                  <SiteLink href="/contact?audience=brand" className="sh-secondary">
                    Talk about a campaign
                  </SiteLink>
                </div>
                <SiteLink href="mailto:collab@vyroinfluence.in" className="sh-textlink">
                  Brand enquiries · collab@vyroinfluence.in
                </SiteLink>
              </div>
              <div>
                <p className="sh-eyebrow">For creators</p>
                <h2 className="sh-heading">
                  Build your creator <em className="sh-accent">business.</em>
                </h2>
                <p className="sh-lede">
                  Explore the real programmes, responsibilities and fees, or tell us what you’re creating.
                </p>
                <div className="sh-actions">
                  <SiteLink href="/creator-management" className="sh-button">
                    Explore management
                    <ArrowRight aria-hidden="true" />
                  </SiteLink>
                  <SiteLink href="/applyforms" className="sh-secondary">
                    Apply as a creator
                  </SiteLink>
                </div>
                <SiteLink href="mailto:hello@vyroinfluence.in" className="sh-textlink">
                  Creator enquiries · hello@vyroinfluence.in
                </SiteLink>
              </div>
              <div className="sh-direct">
                <p>We usually respond within one working day.</p>
                <a
                  className="sh-textlink"
                  href="https://wa.me/919821819622"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp Vyro influence (opens in a new tab)"
                >
                  <Phone aria-hidden="true" />
                  WhatsApp +91 98218 19622
                </a>
                <SiteLink href="/contact?audience=creator" className="sh-textlink">
                  Ask about creator support
                  <ArrowRight aria-hidden="true" />
                </SiteLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
