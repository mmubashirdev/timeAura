import Link from "next/link";
import LegalLayout from "@/components/features/legal/LegalLayout";
import LegalSection from "@/components/features/legal/LegalSection";

export const metadata = {
  title: "Terms of Service — Time Aura",
  description:
    "The terms and conditions for using Time Aura's luxury watches, wallets, and perfumes platform.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="2026-01-01">
      <p>
        Welcome to <strong>Time Aura</strong>. By accessing or using our
        website, mobile application, and services (collectively, the
        &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service.
        Please read them carefully.
      </p>

      <LegalSection number="1" title="Acceptance of Terms">
        <p>
          By creating an account or placing an order with Time Aura, you confirm
          that you are at least 18 years of age and that you accept these Terms
          of Service and our <Link href="/privacy">Privacy Policy</Link>. If you
          do not agree, you must not use the Service.
        </p>
      </LegalSection>

      <LegalSection number="2" title="Your Account">
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activity that occurs under your
          account. You agree to:
        </p>
        <ul>
          <li>
            Provide accurate, current, and complete information at registration.
          </li>
          <li>Verify your email address using the code we send you.</li>
          <li>
            Notify us immediately of any unauthorized access to your account.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="3" title="Products & Orders">
        <p>
          Time Aura offers premium watches, wallets, and perfumes. All product
          descriptions, prices, and availability are subject to change without
          notice. We reserve the right to refuse or cancel an order at our
          discretion, including cases of pricing errors or suspected fraud.
        </p>
        <p>
          Prices are displayed in Pakistani Rupees (PKR) and are inclusive of
          applicable taxes unless stated otherwise.
        </p>
      </LegalSection>

      <LegalSection number="4" title="Payment">
        <p>
          We accept Cash on Delivery, JazzCash, EasyPaisa, and card payments
          where available. By placing an order, you confirm that the payment
          details you provide are valid and correct.
        </p>
      </LegalSection>

      <LegalSection number="5" title="Shipping & Delivery">
        <p>
          Delivery times are estimates only. Time Aura is not liable for delays
          caused by couriers or events outside our reasonable control. Risk of
          loss transfers to you upon delivery.
        </p>
      </LegalSection>

      <LegalSection number="6" title="Returns & Refunds">
        <p>
          Products may be returned within <strong>7 days</strong> of delivery,
          provided they are unused, in original packaging, and accompanied by
          proof of purchase. Perfumes and personal-use items are non-returnable
          once opened for hygiene reasons.
        </p>
      </LegalSection>

      <LegalSection number="7" title="Intellectual Property">
        <p>
          All content on the Service — including logos, product photography,
          text, and designs — is the property of Time Aura or its licensors and
          is protected by intellectual-property laws. You may not reproduce or
          use this content without prior written consent.
        </p>
      </LegalSection>

      <LegalSection number="8" title="Prohibited Conduct">
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service for any unlawful or fraudulent purpose.</li>
          <li>
            Attempt to gain unauthorized access to any part of the Service.
          </li>
          <li>
            Interfere with or disrupt the Service or its underlying
            infrastructure.
          </li>
          <li>
            Resell products purchased from Time Aura without authorization.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="9" title="Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Time Aura shall not be liable
          for any indirect, incidental, or consequential damages arising from
          your use of the Service. Our total liability for any claim shall not
          exceed the amount paid by you for the product giving rise to the
          claim.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Changes to These Terms">
        <p>
          We may update these Terms of Service from time to time. Continued use
          of the Service after any changes constitutes your acceptance of the
          updated terms.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Governing Law">
        <p>
          These Terms are governed by the laws of the Islamic Republic of
          Pakistan. Any disputes shall be resolved in the courts of Lahore,
          Pakistan.
        </p>
      </LegalSection>

      <LegalSection number="12" title="Contact">
        <p>
          For any questions about these Terms, please email us at{" "}
          <a href="mailto:timeaura.online@gmail.com">
            timeaura.online@gmail.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
