import React from "react";

const Section = ({ title, children }) => (
  <div className="border p-4 rounded-lg bg-white shadow-sm mb-6">
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <strong>{label}: </strong>
    {children ?? "—"}
  </div>
);

const List = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) return <>—</>;
  return (
    <ul className="list-disc ml-6">
      {items.map((v, i) => (
        <li key={i}>{String(v)}</li>
      ))}
    </ul>
  );
};

const Signature = ({ src }) => {
  if (!src || typeof src !== "string") return <>—</>;
  // handle base64 or normal URL safely
  return (
    <img
      src={src}
      alt="Signature"
      className="w-48 mt-2 border rounded max-w-full h-auto"
    />
  );
};

const isPlainObject = (val) =>
  val !== null && typeof val === "object" && !Array.isArray(val);

const GenericRenderer = ({ data }) => {
  if (!isPlainObject(data) || Object.keys(data).length === 0) {
    return <div className="text-gray-500">No form data available</div>;
  }

  return (
    <Section title="Form Data">
      {Object.entries(data).map(([key, value]) => (
        <Field key={key} label={key}>
          {isPlainObject(value) ? (
            <pre className="bg-gray-50 p-2 rounded border whitespace-pre-wrap">
              {JSON.stringify(value, null, 2)}
            </pre>
          ) : Array.isArray(value) ? (
            <List items={value} />
          ) : typeof value === "string" && value.startsWith("data:image") ? (
            <Signature src={value} />
          ) : (
            String(value)
          )}
        </Field>
      ))}
    </Section>
  );
};

const FormViewRenderer = ({ form }) => {
  // Hard safety: if form or form.formData is not an object, bail gracefully
  if (!form || !isPlainObject(form)) {
    return <div className="text-gray-500">No form data available</div>;
  }

  const formData = isPlainObject(form.formData) ? form.formData : {};

  const hasPageStructure =
    isPlainObject(formData.page1) ||
    isPlainObject(formData.page2) ||
    isPlainObject(formData.page3);

  // If this form doesn't have page1/page2/page3 (e.g., other forms),
  // fall back to a generic renderer that just prints everything.
  if (!hasPageStructure) {
    return (
      <div className="space-y-8 text-black overflow-y-auto max-h-[80vh] p-2">
        <GenericRenderer data={formData} />
      </div>
    );
  }

  // Lash Extension-style structure
  const page1 = isPlainObject(formData.page1) ? formData.page1 : {};
  const page2 = isPlainObject(formData.page2) ? formData.page2 : {};
  const page3 = isPlainObject(formData.page3) ? formData.page3 : {};

  return (
    <div className="space-y-8 text-black overflow-y-auto max-h-[80vh] p-2">
      {/* ---------- PAGE 1 ---------- */}
      <Section title="Page 1 — Personal Information + Service History">
        <Field label="First Name">{page1.firstName}</Field>
        <Field label="Last Name">{page1.lastName}</Field>
        <Field label="Date of Birth">{page1.dateOfBirth}</Field>
        <Field label="Gender">{page1.gender}</Field>

        {page1.address || page1.city || page1.state || page1.zipCode ? (
          <Field label="Address">
            {page1.address}
            {(page1.city || page1.state || page1.zipCode) &&
              `, ${[page1.city, page1.state, page1.zipCode]
                .filter(Boolean)
                .join(", ")}`}
          </Field>
        ) : null}

        <Field label="Email">{page1.email}</Field>
        <Field label="Phone">{page1.phone}</Field>
        <Field label="How did you hear about us?">{page1.heard}</Field>
        <Field label="Photo Consent">{page1.photoConsent}</Field>

        <Field label="Had service before?">{page1.serviceBefore}</Field>

        {page1.serviceBefore === "Yes" && (
          <Field label="Where Applied">{page1.whereApplied}</Field>
        )}

        {page1.products && (
          <Field label="Products Used">
            {page1.products === "Other"
              ? page1.otherProduct || "Other"
              : page1.products}
          </Field>
        )}
      </Section>

      {/* ---------- PAGE 2 ---------- */}
      <Section title="Page 2 — Medical History">
        {Array.isArray(page2.conditions) && page2.conditions.length > 0 && (
          <Field label="Medical Conditions">
            <List items={page2.conditions} />
          </Field>
        )}

        <Field label="Allergic to acrylic or latex?">
          {page2.latexAllergy}
        </Field>

        <Field label="Any other allergies?">{page2.moreAllergies}</Field>

        {page2.moreAllergies === "Yes" && (
          <Field label="Other Allergies">{page2.otherAllergies}</Field>
        )}

        <Field label="Pregnant?">{page2.pregnant}</Field>
        <Field label="Wear glasses?">{page2.glasses}</Field>
        <Field label="Wear lenses?">{page2.lenses}</Field>

        <Field label="Eye illness or injury?">{page2.eyeIllness}</Field>

        <Field label="Watery / irritated eyes?">{page2.wateryEyes}</Field>

        <Field label="Medications / Supplements">{page2.medications}</Field>
      </Section>

      {/* ---------- PAGE 3 ---------- */}
      <Section title="Page 3 — Consent + Liability">
        {Array.isArray(page3.consents) && page3.consents.length > 0 && (
          <Field label="Consents">
            <List items={page3.consents} />
          </Field>
        )}

        {"agree" in page3 && (
          <Field label="Agreed to Terms">{page3.agree ? "Yes" : "No"}</Field>
        )}

        <Field label="Initials">{page3.initials}</Field>
        <Field label="Submission Date">{page3.submissionDate}</Field>

        <Field label="Signature">
          {page3.signature ? <Signature src={page3.signature} /> : "—"}
        </Field>
      </Section>
    </div>
  );
};

export default FormViewRenderer;
