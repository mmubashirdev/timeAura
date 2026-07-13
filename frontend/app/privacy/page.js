import Link from "next/link";
import LegalLayout from "@/components/features/legal/LegalLayout";
import LegalSection from "@/components/features/legal/LegalSection";

export const metadata = {
  title: "Privacy Policy — Time Aura",
  description:
    "How Time Aura collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="2026-01-01">
      <p>
        At <strong>Time Aura</strong>, we respect your privacy and are committed
        to protecting your personal information. This Privacy Policy explains
        what data we collect, how we use it, and the rights you have.
      </p>

      <LegalSection number="1" title="Information We Collect">
        <p>We collect the following categories of information:</p>
        <ul>
          <li>
            <strong>Account information:</strong> name, email address, and
            password (stored securely as a hash).
          </li>
          <li>
            <strong>Order information:</strong> shipping address, phone number,
            and payment method.
          </li>
          <li>
            <strong>Usage data:</strong> pages viewed, products browsed, and
            interaction with our Service.
          </li>
          <li>
            <strong>Google account data:</strong> if you sign in with Google, we
            receive your name, email, and Google ID — nothing else.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="2" title="How We Use Your Information">
        <p>We use your information to:</p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Process and fulfil your orders.</li>
          <li>Send you verification codes and transactional emails.</li>
          <li>Improve our products, services, and customer experience.</li>
          <li>Detect and prevent fraud or abuse of the Service.</li>
        </ul>
      </LegalSection>

      <LegalSection number="3" title="Legal Basis for Processing">
        <p>
          We process your personal data on the basis of contract performance (to
          fulfil your orders), legitimate interest (to improve our Service), and
          your consent (for marketing communications, where applicable).
        </p>
      </LegalSection>

      <LegalSection number="4" title="Sharing Your Information">
        <p>
          Time Aura <strong>does not sell</strong> your personal information. We
          share limited data only with:
        </p>
        <ul>
          <li>Courier partners, to deliver your orders.</li>
          <li>
            Payment processors (JazzCash, EasyPaisa, card networks) to complete
            transactions.
          </li>
          <li>
            Email delivery providers to send verification and transactional
            messages.
          </li>
          <li>Authorities, where required by law.</li>
        </ul>
      </LegalSection>

      <LegalSection number="5" title="Data Security">
        <p>
          Passwords are hashed using industry-standard bcrypt. Verification
          codes are stored as SHA-256 hashes and expire after a short time.
          Refresh tokens are stored in secure, HTTP-only cookies. We use HTTPS
          across the Service.
        </p>
        <p>
          Despite these measures, no online service can guarantee absolute
          security. You are responsible for keeping your account password
          confidential.
        </p>
      </LegalSection>

      <LegalSection number="6" title="Data Retention">
        <p>
          We retain your account and order data for as long as your account is
          active or as required by applicable law and tax regulations. You may
          request deletion of your account at any time.
        </p>
      </LegalSection>

      <LegalSection number="7" title="Cookies">
        <p>
          We use essential cookies to keep you signed in and to remember your
          preferences. We do not use third-party advertising cookies. You can
          disable cookies in your browser settings, but some parts of the
          Service may not function correctly without them.
        </p>
      </LegalSection>

      <LegalSection number="8" title="Your Rights">
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your account and associated data.</li>
          <li>Withdraw consent for marketing communications at any time.</li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <a href="mailto:timeaura.online@gmail.com">
            timeaura.online@gmail.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="9" title="Children's Privacy">
        <p>
          Time Aura is not directed at individuals under 18. We do not knowingly
          collect personal information from children. If you believe we have
          inadvertently done so, please contact us and we will delete the
          information.
        </p>
      </LegalSection>

      <LegalSection number="10" title="International Transfers">
        <p>
          Your information may be processed on servers located outside Pakistan.
          Where this occurs, we take steps to ensure your data receives an
          equivalent level of protection.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Material changes
          will be communicated via email or a prominent notice on the Service.
        </p>
      </LegalSection>

      <LegalSection number="12" title="Contact">
        <p>
          For any privacy-related questions, please email us at{" "}
          <a href="mailto:timeaura.online@gmail.com">
            timeaura.online@gmail.com
          </a>
          . See also our <Link href="/terms">Terms of Service</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
