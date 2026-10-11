"use client";

import { useEffect, useRef } from "react";
import { SiteShell } from "./site-shell";

type Chrome = "full" | "header" | "none";

type Brief = {
  step: number;
  max: number;
  brand: string;
  product: string;
  category: string;
  objective: string;
  url: string;
  market: string;
  audience: string;
  languages: string;
  categories: string;
  platforms: string[];
  deliverables: string[];
  quantity: string;
  budget: string;
  launch: string;
  usage: string[];
  notes: string;
  briefText: string;
};

const emptyBrief = (): Brief => ({
  step: 1,
  max: 0,
  brand: "",
  product: "",
  category: "To confirm",
  objective: "",
  url: "",
  market: "To confirm",
  audience: "",
  languages: "",
  categories: "",
  platforms: [],
  deliverables: [],
  quantity: "",
  budget: "Budget to discuss",
  launch: "",
  usage: [],
  notes: "",
  briefText: "",
});

function checkedValues(form: HTMLFormElement, name: string) {
  return [...form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function field(label: string, control: string) {
  return `<div class="rv-field"><label>${label}</label>${control}</div>`;
}

function choiceList(legend: string, name: string, options: string[], hint = "") {
  const items = options
    .map(
      (option) =>
        `<label><input type="checkbox" name="${name}" value="${option}"><span>${option}</span></label>`,
    )
    .join("");
  return `<fieldset class="rv-choice-field"><legend>${legend}</legend>${hint}<div class="rv-choice-list">${items}</div></fieldset>`;
}

function briefCopy(brief: Brief) {
  const list = (values: string[], fallback: string) => (values.length ? values.join(", ") : fallback);
  return [
    "CAMPAIGN BRIEF · VYRO INFLUENCE",
    "",
    "CAMPAIGN",
    `Brand / company: ${brief.brand || "To confirm"}`,
    `Product / service: ${brief.product || "To confirm"}`,
    `Category: ${brief.category || "To confirm"}`,
    `Objective: ${brief.objective || "To confirm"}`,
    brief.url ? `URL: ${brief.url}` : "",
    "",
    "AUDIENCE",
    `Market: ${brief.market || "To confirm"}`,
    `Audience: ${brief.audience || "To confirm"}`,
    `Languages: ${brief.languages || "To confirm"}`,
    `Creator categories: ${brief.categories || "Open to recommendations"}`,
    "",
    "REQUESTED SCOPE",
    `Platforms: ${list(brief.platforms, "Open to recommendations")}`,
    `Deliverables: ${list(brief.deliverables, "Open to recommendations")}`,
    `Requested quantity: ${brief.quantity || "To confirm"}`,
    `Budget (INR): ${brief.budget || "Budget to discuss"}`,
    `Launch window: ${brief.launch || "To confirm"}`,
    `Content usage to agree: ${list(brief.usage, "To discuss")}`,
    brief.notes ? `Notes: ${brief.notes}` : "",
    "",
    "This is a discussion brief. Availability, final scope, commercial terms, usage and timelines remain to be agreed.",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function escapeText(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderBrief(brief: Brief) {
  const back = `<button type="button" class="rv-text-link" data-brief-back>Back</button>`;
  const next = (label: string) =>
    `<button class="rv-button rv-button-ink" type="submit">${label} <span aria-hidden="true">→</span></button>`;
  if (brief.step === 2) {
    return `<div class="rv-form-heading"><p class="rv-eyebrow">Step 2 of 4 / Audience</p><h3 tabindex="-1">Who do you want to reach?</h3><p>Leave anything undecided open for discussion.</p></div>
      <form id="main-brief" novalidate>
        <div class="rv-fields">
          ${field(
            "Geography / market",
            `<select name="market">
              <option>To confirm</option><option>India-wide</option><option>Selected regions / cities</option><option>Another market</option>
            </select>`,
          )}
          ${field("Audience description <span>Optional</span>", `<input name="audience" placeholder="Interests, needs or age range if relevant" value="${escapeText(brief.audience)}">`)}
          ${field("Language preferences <span>Optional</span>", `<input name="languages" placeholder="Languages you’d like to explore" value="${escapeText(brief.languages)}">`)}
          ${field("Desired creator categories <span>Optional</span>", `<input name="categories" placeholder="A category, or open to recommendations" value="${escapeText(brief.categories)}">`)}
        </div>
        <div class="rv-form-bottom">${back}${next("Continue")}</div>
      </form>`;
  }
  if (brief.step === 3) {
    return `<div class="rv-form-heading"><p class="rv-eyebrow">Step 3 of 4 / Scope</p><h3 tabindex="-1">What should the campaign include?</h3><p>Leave anything undecided open for discussion.</p></div>
      <form id="main-brief" novalidate>
        <div class="rv-fields">
          ${choiceList("Platforms", "platforms", ["Instagram", "YouTube", "Facebook", "Other", "Open to recommendations"])}
          ${choiceList("Deliverable types", "deliverables", ["Reels", "Stories", "Short video", "Long-form video", "Other", "Open to recommendations"])}
          <div class="rv-fields-two">
            ${field("Requested quantity <span>Optional</span>", `<input name="quantity" type="number" value="${escapeText(brief.quantity)}"><p class="rv-field-hint">Requested scope, to be agreed.</p>`)}
            ${field(
              "Budget range (INR)",
              `<select name="budget"><option>Budget to discuss</option><option>Custom range</option></select>`,
            )}
          </div>
          ${field("Approximate launch window <span>Optional</span>", `<input name="launch" placeholder="A month, a week, or to confirm" value="${escapeText(brief.launch)}">`)}
          ${choiceList("Intended content usage", "usage", ["Creator posting", "Brand reuse", "Paid usage", "To discuss"], `<p class="rv-field-hint">Usage rights need to be agreed in the final scope.</p>`)}
          ${field("Notes and requirements <span>Optional</span>", `<textarea name="notes" rows="4">${escapeText(brief.notes)}</textarea>`)}
        </div>
        <div class="rv-form-bottom">${back}${next("Review your brief")}</div>
      </form>`;
  }
  const text = escapeText(brief.briefText || briefCopy(brief));
  return `<div class="rv-form-heading"><p class="rv-eyebrow">Step 4 of 4 / Review</p><h3 tabindex="-1">A starting point. In your own words.</h3><p>Make it yours. Send it straight to the team.</p></div>
    <form id="main-brief" novalidate>
      <div class="rv-fields">
        <div class="rv-choice-list">
          <button type="button" class="rv-text-link" data-brief-edit="1">Edit campaign</button>
          <button type="button" class="rv-text-link" data-brief-edit="2">Edit audience</button>
          <button type="button" class="rv-text-link" data-brief-edit="3">Edit scope</button>
        </div>
        ${field("Your editable brief", `<textarea name="briefText" rows="14">${text}</textarea>`)}
        <h4>Send it to Vyro influence.</h4>
        ${field("Your name", `<input name="name" required autocomplete="name">`)}
        ${field("Reply email", `<input name="email" type="email" required autocomplete="email">`)}
        <label class="rv-consent"><input type="checkbox" name="consent" required> I agree to Vyro influence using these details to respond to my enquiry. <a href="/privacy">Privacy Policy</a></label>
        <p class="rv-field-hint">This preview keeps the brief on your device. WhatsApp and email open a draft for you to send. It is not stored on vyroinfluence.in.</p>
      </div>
      <div class="rv-form-bottom">
        ${back}
        <button class="rv-button rv-button-ink" type="submit">Send campaign brief</button>
        <a class="rv-text-link" data-brief-whatsapp href="https://wa.me/919821819622">Open WhatsApp draft</a>
        <a class="rv-text-link" data-brief-email href="mailto:collab@vyroinfluence.in">Open email draft</a>
        <button type="button" class="rv-text-link" data-brief-copy>Copy brief</button>
        <button type="button" class="rv-text-link" data-brief-download>Download brief</button>
      </div>
    </form>`;
}

function showNote(form: HTMLFormElement, message: string) {
  const existing = form.parentElement?.querySelector(".sh-form-note");
  existing?.remove();
  const note = document.createElement("div");
  note.className = "sh-form-note";
  note.setAttribute("role", "status");
  note.innerHTML = message;
  form.insertAdjacentElement("afterend", note);
  form.hidden = true;
}

export function HtmlPage({ html, chrome }: { html: string; chrome: Chrome }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const brief = emptyBrief();
    const panel = root.querySelector<HTMLElement>(".rv-form-panel");
    const originalPanel = panel?.innerHTML ?? "";

    const cookieStatus = [...root.querySelectorAll<HTMLElement>("[aria-live='polite']")].find((node) =>
      /Checking this browser|analytics/i.test(node.textContent ?? ""),
    );
    const storedAnalytics = localStorage.getItem("swayhouse-analytics");
    if (cookieStatus) {
      cookieStatus.textContent = storedAnalytics
        ? `Analytics are ${storedAnalytics}.`
        : "No analytics choice is saved in this browser.";
    }
    root.querySelectorAll("button").forEach((button) => {
      if (/Turn analytics|Clear saved choice/.test(button.textContent ?? "")) button.disabled = false;
    });

    const payButton = [...root.querySelectorAll("button")].find((button) => /Pay ₹/.test(button.textContent ?? ""));
    const syncPay = () => {
      if (!payButton) return;
      const filled = ["full_name", "email", "phone", "social_handle"].every((name) => {
        const field = root.querySelector<HTMLInputElement>(`[name="${name}"]`);
        return Boolean(field?.value.trim());
      });
      const consent = root.querySelector<HTMLInputElement>("input[name='apply-consent'], input[type='checkbox']");
      payButton.disabled = !(filled && consent?.checked);
    };
    syncPay();

    const params = new URLSearchParams(window.location.search);
    const audience = params.get("audience")?.toLowerCase();
    if (audience) {
      const value = audience === "brand" ? "Brand" : audience === "creator" ? "Creator" : "Other";
      const input = root.querySelector<HTMLInputElement>(`input[name="audience"][value="${value}"]`);
      if (input) input.checked = true;
    }

    const paintBrief = (step: number) => {
      if (!panel) return;
      brief.step = step;
      brief.max = Math.max(brief.max, step - 1);
      if (step === 1) {
        panel.innerHTML = originalPanel;
      } else {
        if (step === 4) brief.briefText = briefCopy(brief);
        panel.innerHTML = renderBrief(brief);
        panel.querySelector("h3")?.focus();
      }
      const buttons = [...root.querySelectorAll<HTMLButtonElement>(".rv-step-list button")];
      buttons.forEach((button, index) => {
        button.disabled = index > brief.max;
        if (index + 1 === step) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
    };

    const readBrief = (form: HTMLFormElement) => {
      const value = (name: string) =>
        (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)?.value ?? "";
      if (brief.step === 1) {
        brief.brand = value("brand").trim();
        brief.product = value("product").trim();
        brief.category = value("category") || "To confirm";
        brief.objective = value("objective");
        brief.url = value("url").trim();
      } else if (brief.step === 2) {
        brief.market = value("market") || "To confirm";
        brief.audience = value("audience").trim();
        brief.languages = value("languages").trim();
        brief.categories = value("categories").trim();
      } else if (brief.step === 3) {
        brief.platforms = checkedValues(form, "platforms");
        brief.deliverables = checkedValues(form, "deliverables");
        brief.quantity = value("quantity").trim();
        brief.budget = value("budget") || "Budget to discuss";
        brief.launch = value("launch").trim();
        brief.usage = checkedValues(form, "usage");
        brief.notes = value("notes").trim();
      } else {
        brief.briefText = value("briefText");
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const play = target.closest<HTMLButtonElement>(".rv-feature-play, .rv-play");
      if (play) {
        const scope = play.closest("section, .rv-feature, .rv-video-card, .rv-feature-stage") ?? play.parentElement;
        const video = scope?.querySelector("video");
        if (video) {
          video.controls = true;
          void video.play();
          play.hidden = true;
        }
      }

      const faq = target.closest<HTMLButtonElement>("button[aria-expanded]");
      const answer = faq?.nextElementSibling;
      if (faq && answer?.classList.contains("sh-faq-answer")) {
        const open = faq.getAttribute("aria-expanded") === "true";
        faq.setAttribute("aria-expanded", String(!open));
        answer.toggleAttribute("hidden", open);
      }

      const programme = target.closest<HTMLButtonElement>('[role="radio"]');
      if (programme && root.querySelector("form")) {
        const group = programme.parentElement?.querySelectorAll<HTMLButtonElement>('[role="radio"]') ?? [];
        group.forEach((button) => {
          const selected = button === programme;
          button.setAttribute("aria-checked", String(selected));
          button.classList.toggle("border-coral", selected);
          button.classList.toggle("bg-coral/5", selected);
          button.classList.toggle("ring-2", selected);
          button.classList.toggle("ring-coral/20", selected);
          button.classList.toggle("shadow-md", selected);
        });
        const pay = [...root.querySelectorAll("button")].find((button) => /Pay ₹/.test(button.textContent ?? ""));
        if (pay) {
          const studio = /Studio/i.test(programme.textContent ?? "");
          pay.textContent = studio ? "Pay ₹11,999 securely" : "Pay ₹7,999 securely";
        }
      }

      const choice = target.closest<HTMLButtonElement>("button");
      const choiceLabel = choice?.textContent?.replace(/\s+/g, " ").trim() ?? "";
      const cityValue: Record<string, string> = {
        Mumbai: "Mumbai, Maharashtra",
        "Delhi NCR": "Delhi NCR",
        Bengaluru: "Bengaluru, Karnataka",
        Hyderabad: "Hyderabad, Telangana",
        Pune: "Pune, Maharashtra",
        Goa: "Goa",
        "Dubai / UAE": "Dubai, UAE",
        International: "International",
      };
      if (
        choice &&
        (choice.hasAttribute("aria-pressed") || choiceLabel in cityValue || /^(WhatsApp|Email|Instagram DM)$/.test(choiceLabel))
      ) {
        const siblings = choice.parentElement?.querySelectorAll("button") ?? [];
        siblings.forEach((button) => button.setAttribute("aria-pressed", String(button === choice)));
        if (choiceLabel in cityValue) {
          const location = root.querySelector<HTMLInputElement>("[name='location']");
          if (location) location.value = cityValue[choiceLabel];
        }
      }

      if (window.location.pathname === "/book" && choice && /^(Continue|Submit application|Back)$/.test(choiceLabel)) {
        event.preventDefault();
        const card = root.querySelector<HTMLElement>(".bg-white.rounded-2xl");
        const progress = root.querySelector<HTMLElement>("[role='progressbar']");
        const caption = progress?.parentElement?.querySelector("p");
        const value = (name: string) => root.querySelector<HTMLInputElement>(`[name='${name}']`)?.value.trim() ?? "";
        const showBook = (step: number, markup: string) => {
          if (!card || !progress) return;
          progress.setAttribute("aria-valuenow", String(step));
          progress.setAttribute("aria-label", `Step ${step} of 3`);
          const fill = progress.querySelector<HTMLElement>("div");
          if (fill) fill.style.width = `${(step / 3) * 100}%`;
          if (caption) caption.textContent = `Step ${step} of 3`;
          card.innerHTML = markup;
        };
        const optionButtons = (options: string[]) =>
          `<div class="flex flex-wrap gap-2">${options
            .map(
              (option) =>
                `<button type="button" class="min-h-11 rounded-full border border-near-black/15 px-4 py-2 text-sm" aria-pressed="false">${option}</button>`,
            )
            .join("")}</div>`;
        if (choiceLabel === "Back") {
          window.location.reload();
          return;
        }
        const stepNow = Number(progress?.getAttribute("aria-valuenow") ?? "1");
        if (stepNow === 1) {
          const reach = [...root.querySelectorAll<HTMLButtonElement>("button[aria-pressed='true']")].some((button) =>
            /WhatsApp|Email|Instagram DM/.test(button.textContent ?? ""),
          );
          if (!value("full_name") || !value("email") || !value("mobile") || !value("location") || !reach) {
            choice.insertAdjacentHTML(
              "beforebegin",
              `<p class="sh-form-note" role="status">Add your name, email, mobile, a way to reach you, and your city.</p>`,
            );
            return;
          }
          showBook(
            2,
            `<div class="flex flex-col gap-7">
              <div><p class="mb-2 text-sm font-medium">Which describes you best?</p>${optionButtons([
                "Creator wanting to work with us",
                "Outreach partner / Talent Scout",
                "Deal booster / Referral partner",
                "Talent manager or agency",
                "Brand or marketing team",
                "Founder or operator",
                "Other",
              ])}</div>
              <div><label class="mb-2 block text-sm font-medium" for="book-background">Tell us about your background or creator journey</label>
              <textarea id="book-background" name="background" rows="5" class="w-full rounded-xl border border-near-black/15 p-3" placeholder="Your social handles, background, experience, or what you are currently building."></textarea></div>
              <div><p class="mb-2 text-sm font-medium">What are you applying for?</p>${optionButtons([
                "I want to work with Vyro influence (Creator / Team)",
                "I want to run outreach for Vyro influence",
                "I want to boost deal flow & refer creators/brands",
                "Sway Growth (₹7,999/mo - Representation)",
                "Sway Studio (₹11,999/mo - Full Representation)",
              ])}</div>
              <div class="flex flex-wrap gap-3"><button type="button" class="rv-text-link">Back</button><button type="button" class="min-h-12 rounded-full bg-coral px-6 text-sm font-bold">Continue</button></div>
            </div>`,
          );
          return;
        }
        if (stepNow === 2) {
          const background = root.querySelector<HTMLTextAreaElement>("[name='background']")?.value.trim() ?? "";
          const roleChosen = [...root.querySelectorAll("button[aria-pressed='true']")].length >= 2;
          if (!background || !roleChosen) {
            choice.insertAdjacentHTML(
              "beforebegin",
              `<p class="sh-form-note" role="status">Choose who you are, what you are applying for, and tell us a little about your work.</p>`,
            );
            return;
          }
          showBook(
            3,
            `<div class="flex flex-col gap-7">
              <div><label class="mb-2 block text-sm font-medium" for="book-notes">Anything else we should know? <span class="text-neutral-500">Optional</span></label>
              <textarea id="book-notes" name="notes" rows="5" class="w-full rounded-xl border border-near-black/15 p-3"></textarea></div>
              <div class="flex flex-wrap gap-3"><button type="button" class="rv-text-link">Back</button><button type="button" class="min-h-12 rounded-full bg-coral px-6 text-sm font-bold">Submit application</button></div>
            </div>`,
          );
          return;
        }
        if (card) {
          card.innerHTML = `<div class="sh-form-note" role="status">This preview keeps the application on your device. <a href="https://www.swayhouse.in/book" target="_blank" rel="noreferrer">Submit it on vyroinfluence.in</a> or email <a href="mailto:hello@vyroinfluence.in">hello@vyroinfluence.in</a>.</div>`;
        }
      }

      if (choice && /Pay ₹/.test(choice.textContent ?? "")) {
        event.preventDefault();
        const form = choice.closest("form");
        if (form) {
          showNote(
            form,
            `This preview does not take payment. <a href="https://www.swayhouse.in/applyforms" target="_blank" rel="noreferrer">Continue the application on vyroinfluence.in</a>.`,
          );
        }
      }

      if (target.closest("[data-brief-back]")) {
        event.preventDefault();
        paintBrief(Math.max(1, brief.step - 1));
      }
      const edit = target.closest<HTMLElement>("[data-brief-edit]");
      if (edit) {
        event.preventDefault();
        paintBrief(Number(edit.dataset.briefEdit));
      }
      const stepButton = target.closest<HTMLButtonElement>(".rv-step-list button");
      if (stepButton && panel) {
        const buttons = [...root.querySelectorAll(".rv-step-list button")];
        const index = buttons.indexOf(stepButton);
        if (index >= 0 && index <= brief.max) paintBrief(index + 1);
      }
      if (target.closest("[data-brief-reset], .rv-reset")) {
        Object.assign(brief, emptyBrief());
        paintBrief(1);
      }
      const whatsapp = target.closest<HTMLAnchorElement>("[data-brief-whatsapp]");
      const emailDraft = target.closest<HTMLAnchorElement>("[data-brief-email]");
      if (whatsapp || emailDraft) {
        const text = root.querySelector<HTMLTextAreaElement>("[name='briefText']")?.value ?? briefCopy(brief);
        if (whatsapp) whatsapp.href = `https://wa.me/919821819622?text=${encodeURIComponent(text)}`;
        if (emailDraft) {
          emailDraft.href = `mailto:collab@vyroinfluence.in?subject=${encodeURIComponent("Campaign brief")}&body=${encodeURIComponent(text)}`;
        }
      }
      if (target.closest("[data-brief-copy]")) {
        const text = root.querySelector<HTMLTextAreaElement>("[name='briefText']")?.value ?? briefCopy(brief);
        void navigator.clipboard?.writeText(text);
      }
      if (target.closest("[data-brief-download]")) {
        const text = root.querySelector<HTMLTextAreaElement>("[name='briefText']")?.value ?? briefCopy(brief);
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "vyro-influence-campaign-brief.txt";
        link.click();
        URL.revokeObjectURL(url);
      }

      const analytics = target.closest("button");
      const label = analytics?.textContent?.trim();
      if (label === "Turn analytics on" || label === "Turn analytics off" || label === "Clear saved choice") {
        const key = "swayhouse-analytics";
        if (label === "Clear saved choice") localStorage.removeItem(key);
        else localStorage.setItem(key, label === "Turn analytics on" ? "on" : "off");
        const status = root.querySelector("#cookie-choice, [data-cookie-choice]");
        const stored = localStorage.getItem(key);
        const sentence = stored ? `Analytics are ${stored}.` : "No analytics choice is saved in this browser.";
        if (status) status.textContent = sentence;
      }
    };

    const onSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (form.id === "main-brief" || form.dataset.analyticsForm === "main-brief") {
        readBrief(form);
        if (brief.step === 1 && (!brief.brand || !brief.product || !brief.objective || brief.objective === "Choose an objective")) {
          const status = panel?.querySelector(".rv-action-status");
          if (status) status.textContent = "Brand, product and objective are required before the next step.";
          return;
        }
        if (brief.step < 4) {
          paintBrief(brief.step + 1);
          return;
        }
        const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
        const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
        const text = (form.elements.namedItem("briefText") as HTMLTextAreaElement).value;
        const mailto = `mailto:collab@vyroinfluence.in?subject=${encodeURIComponent(`Campaign brief from ${name}`)}&body=${encodeURIComponent(`${text}\n\n${name}\n${email}`)}`;
        showNote(
          form,
          `The brief is ready for ${escapeText(name)}. <a href="${mailto}">Email it to collab@vyroinfluence.in</a>, or <a href="https://www.swayhouse.in/campaign-brief" target="_blank" rel="noreferrer">send it on vyroinfluence.in</a>.`,
        );
        return;
      }

      if (form.closest(".creator-portal-auth-card") || window.location.pathname.includes("creator-portal")) {
        window.location.href = "https://www.swayhouse.in/creator-portal/login";
        return;
      }

      if (/Pay ₹/.test(form.querySelector("button[type='submit']")?.textContent ?? "")) {
        showNote(
          form,
          `This preview does not take payment. <a href="https://www.swayhouse.in/applyforms" target="_blank" rel="noreferrer">Continue the application on vyroinfluence.in</a>.`,
        );
        return;
      }

      const page = window.location.pathname;
      if (page === "/contact" || page === "/book" || page === "/applyforms") {
        showNote(
          form,
          "Received on this device. This preview does not send the form to Vyro influence. Email <a href=\"mailto:hello@vyroinfluence.in\">hello@vyroinfluence.in</a> or use the form on <a href=\"https://www.swayhouse.in" +
            page +
            "\" target=\"_blank\" rel=\"noreferrer\">vyroinfluence.in</a>.",
        );
        return;
      }

      if (page === "/rocky") {
        showNote(
          form,
          `The live assistant answers on <a href="https://www.swayhouse.in${page}" target="_blank" rel="noreferrer">vyroinfluence.in${page}</a>. This copy keeps the workspace and the routes around it.`,
        );
      }
    };

    const onInput = () => syncPay();
    root.addEventListener("click", onClick);
    root.addEventListener("submit", onSubmit);
    root.addEventListener("input", onInput);
    root.addEventListener("change", onInput);
    return () => {
      root.removeEventListener("click", onClick);
      root.removeEventListener("submit", onSubmit);
      root.removeEventListener("input", onInput);
      root.removeEventListener("change", onInput);
    };
  }, [html]);

  return (
    <SiteShell chrome={chrome}>
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
    </SiteShell>
  );
}
