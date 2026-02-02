import { PageLayout } from "@/components/PageLayout";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Notaxia collects, uses, and protects your data. End-to-end encryption, AI processing, and your rights.",
  openGraph: {
    title: "Privacy Policy | Notaxia",
    description: "How Notaxia handles your data and protects your privacy.",
    url: "https://notaxia.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="Last updated: February 2025"
    >
      <article className="prose prose-lg max-w-none text-[var(--foreground)]">
        <p className="text-[var(--muted)] lead">
          Notaxia (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and disclose information when you use our website at notaxia.com, our mobile applications for iOS and Android, and any related services (collectively, the &quot;Services&quot;). By using the Services, you agree to the practices described in this policy. If you do not agree, please do not use our Services.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p className="text-[var(--muted)] mb-4">
            We collect information in several ways, depending on how you use our Services and what choices you make (for example, whether you use Private Mode or standard processing).
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">1.1 Account and profile information</h3>
          <p className="text-[var(--muted)] mb-4">
            When you create an account, we collect your email address, name (if you provide it), and authentication credentials (for example, if you sign in with Google or Apple). We use this to create and secure your account, communicate with you, and provide support.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">1.2 Content you create</h3>
          <p className="text-[var(--muted)] mb-4">
            When you use Notaxia, you may create thoughts, notes, voice recordings, photos, and uploaded documents. How we handle this content depends on your settings:
          </p>
          <ul className="list-disc pl-6 text-[var(--muted)] space-y-2 mb-4">
            <li><strong className="text-[var(--foreground)]">Standard (Smart) mode:</strong> Text and metadata (for example, mood, tags) may be processed on our servers so we can provide AI summarization, semantic search, and insights. Voice and document content may be sent to our systems for transcription and OCR when you use those features.</li>
            <li><strong className="text-[var(--foreground)]">Private mode:</strong> Content you mark as private is encrypted on your device before it is sent to our servers. We do not have the keys to decrypt it and cannot read, process, or use the substance of that content for AI or analytics. We may still store encrypted blobs and metadata necessary to sync and display the content on your devices.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-2">1.3 Usage and device information</h3>
          <p className="text-[var(--muted)] mb-4">
            We collect information about how you use our Services, such as feature usage, session duration, and device type (e.g., iOS or Android), app version, and general location (e.g., country or region) when relevant for providing or improving the Services. We may use cookies and similar technologies on our website to remember preferences and analyze site usage.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">1.4 Payment and subscription information</h3>
          <p className="text-[var(--muted)] mb-4">
            If you subscribe to Notaxia Pro, payment is processed by Apple or Google (depending on your platform). We do not store your full payment card details. We may receive and store subscription status, plan type, and transaction identifiers so we can manage your access and support billing inquiries.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
          <p className="text-[var(--muted)] mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-[var(--muted)] space-y-2 mb-4">
            <li>Provide, maintain, and improve the Services (including AI summarization, search, reminders, and sync).</li>
            <li>Authenticate you and keep your account secure.</li>
            <li>Process voice recordings and documents (e.g., transcription, OCR) when you use those features and have not opted into Private Mode for that content.</li>
            <li>Send you service-related communications (e.g., account or security notices, subscription updates) and, if you have opted in, marketing or product updates.</li>
            <li>Respond to your requests and provide support (e.g., when you contact us at hey@notaxia.com).</li>
            <li>Analyze usage in an aggregated, non-personally-identifying way to improve our product and performance.</li>
            <li>Comply with applicable law and enforce our terms and policies.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">3. End-to-End Encryption and Private Mode</h2>
          <p className="text-[var(--muted)] mb-4">
            When you enable Private Mode (or mark specific content as private), that content is encrypted on your device using keys that we do not possess. We cannot decrypt, read, or use the substance of that content. We do not use private content for AI training, analytics, or advertising. Encrypted content may still be stored and synced so you can access it from your other devices; only you can decrypt it with your passphrase or device key.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">4. Sharing and Disclosure</h2>
          <p className="text-[var(--muted)] mb-4">
            We do not sell your personal information. We may share information in these limited circumstances:
          </p>
          <ul className="list-disc pl-6 text-[var(--muted)] space-y-2 mb-4">
            <li><strong className="text-[var(--foreground)]">Service providers:</strong> We work with providers that help us host, analyze, and operate the Services (e.g., cloud infrastructure, AI and transcription services). These providers are contractually required to use your information only to provide services to us and in line with this policy.</li>
            <li><strong className="text-[var(--foreground)]">Legal and safety:</strong> We may disclose information if required by law, court order, or government request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
            <li><strong className="text-[var(--foreground)]">Business transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction, subject to the same privacy commitments.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
          <p className="text-[var(--muted)] mb-4">
            We retain your account and content for as long as your account is active. If you delete your account, we will delete or anonymize your personal information and content in accordance with our data retention practices and applicable law. Some data may remain in backups for a limited period before being overwritten. You may request deletion or export of your data by contacting us at hey@notaxia.com.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">6. Your Rights and Choices</h2>
          <p className="text-[var(--muted)] mb-4">
            Depending on where you live, you may have the right to:
          </p>
          <ul className="list-disc pl-6 text-[var(--muted)] space-y-2 mb-4">
            <li>Access the personal information we hold about you.</li>
            <li>Correct or update that information.</li>
            <li>Request deletion of your personal information and, where applicable, your account.</li>
            <li>Export your data (e.g., thoughts and notes) in a portable format.</li>
            <li>Object to or restrict certain processing.</li>
            <li>Withdraw consent where processing is based on consent.</li>
            <li>Lodge a complaint with a supervisory authority.</li>
          </ul>
          <p className="text-[var(--muted)] mb-4">
            You can manage many choices in the app (e.g., Private Mode, notification preferences). For other requests, contact us at hey@notaxia.com. We will respond in accordance with applicable law.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">7. Security</h2>
          <p className="text-[var(--muted)] mb-4">
            We use technical and organizational measures to protect your information, including encryption in transit and at rest where applicable. No method of transmission or storage is 100% secure; we cannot guarantee absolute security. You are responsible for keeping your account credentials and, if you use Private Mode, your encryption passphrase safe.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">8. International Transfers</h2>
          <p className="text-[var(--muted)] mb-4">
            Your information may be processed in countries other than your own. We ensure appropriate safeguards (such as standard contractual clauses or other approved mechanisms) are in place when required by law for such transfers.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">9. Children</h2>
          <p className="text-[var(--muted)] mb-4">
            Our Services are not directed at children under 13 (or higher age where required). We do not knowingly collect personal information from children. If you believe we have collected such information, please contact us at hey@notaxia.com and we will take steps to delete it.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
          <p className="text-[var(--muted)] mb-4">
            We may update this Privacy Policy from time to time. We will post the updated version on this page and update the &quot;Last updated&quot; date. For material changes, we may notify you by email or through the app. Your continued use of the Services after the effective date constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
          <p className="text-[var(--muted)] mb-4">
            For privacy-related questions, requests, or complaints, contact us at:
          </p>
          <p className="text-[var(--foreground)] font-medium">
            Email:{" "}
            <a href="mailto:hey@notaxia.com" className="text-[var(--primary)] hover:underline">
              hey@notaxia.com
            </a>
          </p>
          <p className="text-[var(--muted)] mt-4">
            We will respond as required by applicable law.
          </p>
        </section>
      </article>
    </PageLayout>
  );
}
