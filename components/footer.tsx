import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-black tracking-tight mb-2">
            CLOSETDROP<span className="text-primary">™️</span>
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Thrifted fashion, verified authentic. Showcasing one-of-one pieces
            for men &amp; women — shoes, jeans, shirts, and jewelry for men.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">
            Shop
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/women"
                className="hover:text-foreground transition-colors"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/men"
                className="hover:text-foreground transition-colors"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3">
            Get in touch
          </h4>
          <p className="text-sm text-muted-foreground">
            DM us on Instagram or WhatsApp to grab a piece before it&apos;s
            gone.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/closetdrop_pk?igsh=YXFrM3V2eXJydzg4&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={25} />
            </a>
            <a
              href="https://wa.me/923039424415"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={25} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6">
        <p className="container text-xs text-muted-foreground">
          © {new Date().getFullYear()} Closetdrop™️. All rights reserved.
          Showcase only — no online checkout.
        </p>
      </div>
    </footer>
  );
}
