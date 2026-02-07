import { PageLayout } from "@/components/PageLayout";

export const metadata = {
  title: "Terms of Use",
  description:
    "Terms and conditions for using Notaxia's website and mobile apps. Acceptable use, subscriptions, and liability.",
  openGraph: {
    title: "Terms of Use | Notaxia",
    description: "Terms and conditions for using Notaxia.",
    url: "https://notaxia.com/terms",
  },
};

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms of Use"
      subtitle="Last updated: February 2025"
    >
      <article className="prose prose-lg max-w-none text-[var(--foreground)]">
        <p className="text-[var(--muted)] lead">
          Welcome to Notaxia. These Terms of Use (&quot;Terms&quot;) are a binding agreement between you and Notaxia (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) governing your access to and use of our website at notaxia.com, our mobile applications for iOS and Android, and any related services (collectively, the &quot;Services&quot;). By creating an account, downloading our apps, or otherwise using the Services, you agree to these Terms. If you do not agree, you may not use the Services.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">1. Eligibility and Account</h2>
          <p className="text-[var(--muted)] mb-4">
            You must be at least 13 years of age (or the minimum age in your jurisdiction to consent to use the Services) and have the legal capacity to enter into these Terms. If you are using the Services on behalf of an organization, you represent that you have authority to bind that organization. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify us promptly at hey@notaxia.com of any unauthorized use or breach of security.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">2. Description of the Services</h2>
          <p className="text-[var(--muted)] mb-4">
            Notaxia provides thought-capture and personal knowledge tools, including: quick capture via widget, voice notes with optional transcription, photo and document upload with optional OCR, AI-powered summarization and insights, semantic search and recall, reminders, and optional end-to-end encryption (Private Mode). We offer a free tier with usage limits and a paid subscription (Notaxia Pro) with expanded limits and features. We may add, change, or discontinue features or plans with reasonable notice where appropriate.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">3. Acceptable Use</h2>
          <p className="text-[var(--muted)] mb-4">
            You agree to use the Services only for lawful purposes and in accordance with these Terms. You must not:
          </p>
          <ul className="list-disc pl-6 text-[var(--muted)] space-y-2 mb-4">
            <li>Violate any applicable law, regulation, or third-party rights.</li>
            <li>Use the Services to harass, abuse, defame, or harm others, or to distribute illegal, harmful, or offensive content.</li>
            <li>Attempt to gain unauthorized access to our systems, other users&apos; accounts, or any non-public part of the Services.</li>
            <li>Reverse engineer, decompile, or attempt to extract source code from the Services (except where expressly permitted by law).</li>
            <li>Use automated means (e.g., bots, scrapers) to access or use the Services in a way that burdens our infrastructure or violates our policies.</li>
            <li>Resell, sublicense, or commercially exploit the Services in a way that is not expressly permitted by us.</li>
          </ul>
          <p className="text-[var(--muted)] mb-4">
            We may suspend or terminate your access if we reasonably believe you have violated these Terms or applicable law, or if required to protect the Services or other users.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">4. Your Content and Licenses</h2>
          <p className="text-[var(--muted)] mb-4">
            You retain ownership of the content you create, upload, or store using the Services (&quot;Your Content&quot;). By using the Services, you grant us a limited, worldwide, non-exclusive, royalty-free license to use, store, process, display, and transmit Your Content as necessary to provide, improve, and secure the Services (e.g., hosting, sync, AI processing, backup). For content in Private Mode, we do not have the ability to read or use the substance of that content; we only handle encrypted data as needed to operate the Services. We do not use Your Content for advertising or to train AI models in a way that identifies you or your content, except as described in our Privacy Policy.
          </p>
          <p className="text-[var(--muted)] mb-4">
            You are solely responsible for Your Content. You represent that you have all rights necessary to provide it and that it does not infringe any third-party rights or violate any law. We may remove or refuse to display content that we believe violates these Terms or our policies, or that could expose us or others to legal or safety risk.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">5. Subscriptions, Payments, and Refunds</h2>
          <p className="text-[var(--muted)] mb-4">
            Notaxia Pro is a paid subscription that may be offered on a monthly or annual basis. Payment is processed by Apple (App Store) or Google (Play Store) according to their respective payment terms. Your subscription will renew automatically unless you cancel before the end of the current period. Cancellation will take effect at the end of the billing period; no refunds are provided for partial periods. Refund requests for subscriptions must be directed to Apple or Google, as applicable; we do not process refunds directly. We may change subscription fees with advance notice; continued use after the change constitutes acceptance. Free trials, if offered, are subject to the terms presented at sign-up. For in-app purchases on the App Store, the standard Licensed Application End User License Agreement (EULA) applies: <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] underline hover:no-underline">Apple Terms of Use (EULA)</a>.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
          <p className="text-[var(--muted)] mb-4">
            Notaxia and its logos, design, and materials are owned by us or our licensors and are protected by copyright, trademark, and other laws. These Terms do not grant you any right to use our trademarks or branding except as necessary to use the Services as intended. You may not remove or alter any proprietary notices on the Services.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">7. Disclaimers</h2>
          <p className="text-[var(--muted)] mb-4">
            THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. AI-generated summaries and insights are for convenience only and may be inaccurate or incomplete; you should not rely on them as the sole basis for important decisions. USE OF THE SERVICES IS AT YOUR OWN RISK.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
          <p className="text-[var(--muted)] mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NOTAXIA AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF DATA, PROFITS, OR GOODWILL) ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM (OR ONE HUNDRED U.S. DOLLARS IF YOU HAVE NOT PAID US). SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES; IN SUCH CASES, THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
          <p className="text-[var(--muted)] mb-4">
            You agree to indemnify, defend, and hold harmless Notaxia and its affiliates, officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or related to: (a) your use of the Services; (b) Your Content; (c) your violation of these Terms or any law; or (d) your violation of any third-party rights.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
          <p className="text-[var(--muted)] mb-4">
            You may stop using the Services and delete your account at any time through the app or by contacting us at hey@notaxia.com. We may suspend or terminate your access to the Services at any time, with or without cause or notice, including for violation of these Terms. Upon termination, your right to use the Services ceases immediately. We may retain and use your information as described in our Privacy Policy. Sections that by their nature should survive (including disclaimers, limitation of liability, indemnification, and governing law) will survive termination.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">11. Dispute Resolution and Governing Law</h2>
          <p className="text-[var(--muted)] mb-4">
            These Terms are governed by the laws of the United States and the State of Delaware, without regard to conflict of law principles. Any dispute arising out of or relating to these Terms or the Services shall be resolved exclusively in the state or federal courts located in Delaware, and you consent to the personal jurisdiction of such courts. You waive any right to participate in a class action or representative proceeding. If you are in the European Union or another jurisdiction with mandatory consumer protection laws, your statutory rights may apply and certain limitations in these Terms may not apply to you.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">12. Changes to the Terms</h2>
          <p className="text-[var(--muted)] mb-4">
            We may modify these Terms from time to time. We will post the updated Terms on this page and update the &quot;Last updated&quot; date. For material changes, we may notify you by email or through the app. Your continued use of the Services after the effective date of the new Terms constitutes acceptance. If you do not agree, you must stop using the Services and may delete your account.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">13. General</h2>
          <p className="text-[var(--muted)] mb-4">
            These Terms, together with our Privacy Policy and any additional terms presented in the app (e.g., for specific features), constitute the entire agreement between you and Notaxia regarding the Services. If any provision is found unenforceable, the remaining provisions remain in effect. Our failure to enforce any right or provision does not waive that right or provision. You may not assign these Terms without our consent; we may assign them in connection with a merger, acquisition, or sale of assets. Nothing in these Terms creates a partnership, joint venture, or employment relationship between you and Notaxia.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">14. Contact Us</h2>
          <p className="text-[var(--muted)] mb-4">
            For questions about these Terms or the Services, contact us at:
          </p>
          <p className="text-[var(--foreground)] font-medium">
            Email:{" "}
            <a href="mailto:hey@notaxia.com" className="text-[var(--primary)] hover:underline">
              hey@notaxia.com
            </a>
          </p>
        </section>
      </article>
    </PageLayout>
  );
}
