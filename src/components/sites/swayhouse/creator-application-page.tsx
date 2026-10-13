"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { SiteShell } from "./site-shell";
import "./creator-application.css";

const recipient = "hello@vyroinfluence.in";

function Field({
  label,
  name,
  required = false,
  children,
}: {
  label: string;
  name?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="sh-application-field">
      <label htmlFor={name}>
        {label} {required ? <span aria-hidden="true">*</span> : <small>(optional)</small>}
      </label>
      {children}
    </div>
  );
}

function ChoiceGroup({
  legend,
  name,
  options,
  required = false,
}: {
  legend: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <fieldset className="sh-application-field sh-application-choice">
      <legend>
        {legend} {required ? <span aria-hidden="true">*</span> : <small>(optional)</small>}
      </legend>
      <div className="sh-choice-grid">
        {options.map((option, index) => (
          <label key={option}>
            <input type="radio" name={name} value={option} required={required && index === 0} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function CreatorApplicationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [emailDraft, setEmailDraft] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const body = [
      "CREATOR APPLICATION · VYRO INFLUENCE",
      "",
      `Email: ${value("email")}`,
      `Full Name: ${value("full_name")}`,
      `Instagram Username: ${value("instagram_username")}`,
      `WhatsApp Number: ${value("whatsapp_number") || "Not provided"}`,
      `Instagram Profile Link: ${value("instagram_profile")}`,
      `Followers: ${value("followers")}`,
      `Content niche: ${value("content_niche")}`,
      `Audience Location: ${value("audience_location")}`,
      `Content language: ${value("content_language")}${value("other_language") ? ` (${value("other_language")})` : ""}`,
      `City: ${value("city")}`,
      `Brand collaborations before: ${value("brand_collaborations")}`,
      `Brands worked with: ${value("brands_worked_with") || "Not provided"}`,
      `Rate per reel in ₹: ${value("rate_per_reel")}`,
      `Collaboration preference: ${value("collaboration_preference")}`,
      `Anything else: ${value("anything_else") || "Not provided"}`,
      "",
      "Consent: I agree to be contacted by Vyro influence about creator collaborations, and that my profile details may be shared with brands for campaigns I'm interested in.",
    ].join("\n");
    const draft = `mailto:${recipient}?subject=${encodeURIComponent(`Creator application from ${value("full_name")}`)}&body=${encodeURIComponent(body)}`;
    setEmailDraft(draft);
    setSubmitted(true);
  }

  return (
    <SiteShell>
      <main id="main" className="sh-creator-application">
        <div className="sh-application-shell">
          <div className="sh-application-intro">
            <p className="sh-eyebrow">For creators · Apply as a creator</p>
            <h1>
              Tell us what you&apos;re <em>building.</em>
            </h1>
            <p>
              Share a few details about your work, audience and collaboration preferences. We&apos;ll review your profile and get back to you about relevant creator opportunities.
            </p>
            <div className="sh-application-note">
              <Mail aria-hidden="true" />
              <span>Your email will be recorded with your response so we can contact you about campaigns.</span>
            </div>
          </div>

          <section className="sh-application-card" aria-labelledby="application-form-heading">
            <div className="sh-application-card-heading">
              <p className="sh-eyebrow">Creator application</p>
              <h2 id="application-form-heading">Your creator profile</h2>
              <p>Fields marked with <span aria-hidden="true">*</span> are required.</p>
            </div>

            {submitted ? (
              <div className="sh-application-success" role="status">
                <span className="sh-success-icon"><Check aria-hidden="true" /></span>
                <h3>Your application is ready.</h3>
                <p>Your email address and answers are included in the response draft.</p>
                <a className="sh-button" href={emailDraft}>
                  Email my application
                  <ArrowRight aria-hidden="true" />
                </a>
                <button type="button" className="sh-secondary" onClick={() => setSubmitted(false)}>
                  Edit responses
                </button>
              </div>
            ) : (
              <form className="sh-application-form" onSubmit={handleSubmit}>
                <div className="sh-application-grid">
                  <Field label="Email" name="email" required>
                    <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
                  </Field>
                  <Field label="Full Name" name="full_name" required>
                    <input id="full_name" name="full_name" type="text" autoComplete="name" required placeholder="Your full name" />
                  </Field>
                  <Field label="Instagram Username" name="instagram_username" required>
                    <input id="instagram_username" name="instagram_username" type="text" required placeholder="@yourusername" />
                  </Field>
                  <Field label="WhatsApp Number" name="whatsapp_number">
                    <input id="whatsapp_number" name="whatsapp_number" type="tel" autoComplete="tel" placeholder="+91 98765 43210" />
                  </Field>
                  <Field label="Instagram Profile Link" name="instagram_profile" required>
                    <input id="instagram_profile" name="instagram_profile" type="url" required placeholder="https://instagram.com/yourusername" />
                  </Field>
                  <Field label="Followers" name="followers" required>
                    <input id="followers" name="followers" type="number" min="0" required placeholder="e.g. 25000" />
                  </Field>
                  <Field label="Content niche" name="content_niche" required>
                    <input id="content_niche" name="content_niche" type="text" required placeholder="Fashion, food, fitness, comedy..." />
                  </Field>
                  <Field label="Audience Location" name="audience_location" required>
                    <select id="audience_location" name="audience_location" required defaultValue="">
                      <option value="" disabled>Select one</option>
                      <option>India</option>
                      <option>US</option>
                      <option>UK</option>
                      <option>Other</option>
                    </select>
                  </Field>
                  <Field label="Content language" name="content_language" required>
                    <select id="content_language" name="content_language" required defaultValue="">
                      <option value="" disabled>Select one</option>
                      <option>Hindi</option>
                      <option>English</option>
                      <option>Other</option>
                    </select>
                  </Field>
                  <Field label="Other language" name="other_language">
                    <input id="other_language" name="other_language" type="text" placeholder="If you selected Other" />
                  </Field>
                  <Field label="City" name="city" required>
                    <input id="city" name="city" type="text" autoComplete="address-level2" required placeholder="Your city" />
                  </Field>
                </div>

                <ChoiceGroup legend="Have you done brand collaborations before?" name="brand_collaborations" options={["Yes", "No"]} required />

                <Field label="Brands you've worked with" name="brands_worked_with">
                  <textarea id="brands_worked_with" name="brands_worked_with" rows={3} placeholder="List any brands, or leave blank if not applicable" />
                </Field>

                <Field label="Rate per reel in ₹" name="rate_per_reel" required>
                  <input id="rate_per_reel" name="rate_per_reel" type="number" min="0" required placeholder="e.g. 5000" />
                </Field>

                <ChoiceGroup legend="Collaboration preference" name="collaboration_preference" options={["Paid", "Barter", "Both"]} required />

                <Field label="Anything else we should know?" name="anything_else">
                  <textarea id="anything_else" name="anything_else" rows={4} placeholder="Tell us anything else that would help us understand your work." />
                </Field>

                <label className="sh-application-consent">
                  <input name="consent" type="checkbox" required />
                  <span>
                    I agree to be contacted by Vyro influence about creator collaborations, and that my profile details may be shared with brands for campaigns I&apos;m interested in. <strong>*</strong>
                  </span>
                </label>

                <button className="sh-button sh-application-submit" type="submit">
                  Submit application
                  <ArrowRight aria-hidden="true" />
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
