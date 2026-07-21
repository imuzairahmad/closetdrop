import Link from "next/link";

export const metadata = {
  title: "Refund & Return Policy | Closetdrop",
  description: "Closetdrop's refund, return, and order cancellation policy.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
        Refund & Return Policy
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last Updated: July 21, 2026
      </p>

      <div className="space-y-8 text-sm leading-relaxed">
        <p>
          Thank you for shopping with Closetdrop. As we specialize in carefully
          selected thrifted and one-of-a-kind items, all sales are final. Due to
          the unique nature of our products, we do not accept returns or
          exchanges for reasons such as:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Change of mind</li>
          <li>Incorrect size selection</li>
          <li>Personal preference</li>
          <li>Minor signs of wear consistent with thrifted/pre-owned items</li>
        </ul>
        <p>
          We encourage all customers to carefully review the product
          description, measurements, condition, and photos before placing an
          order.
        </p>

        <section>
          <h2 className="text-lg font-bold tracking-tight mb-3">
            Damaged, Incorrect, or Missing Items
          </h2>
          <p className="mb-3">If you receive:</p>
          <ul className="list-disc pl-6 space-y-1 mb-3">
            <li>The wrong item,</li>
            <li>
              An item that is significantly different from its description, or
            </li>
            <li>An item that was damaged during shipping,</li>
          </ul>
          <p className="mb-3">
            please contact us within 48 hours of receiving your order.
          </p>
          <p className="mb-2">To help us resolve the issue quickly, include:</p>
          <ul className="list-disc pl-6 space-y-1 mb-3">
            <li>Your order number</li>
            <li>Clear photos of the item and packaging</li>
            <li>A brief description of the issue</li>
          </ul>
          <p>
            After reviewing your claim, we may offer a full or partial refund,
            or a replacement (if available), at our discretion.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold tracking-tight mb-3">
            Order Cancellation
          </h2>
          <p>
            Orders may only be cancelled before they have been packed or
            shipped. Once an order has been dispatched, it cannot be cancelled.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold tracking-tight mb-3">Contact Us</h2>
          <p>
            If you have any questions regarding your order or this policy,
            please contact our customer support team through our website or
            WhatsApp.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="text-sm font-semibold underline underline-offset-4"
            >
              Contact Us
            </Link>

            <a
              href="https://wa.me/923039424415"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold underline underline-offset-4"
            >
              Message on WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
