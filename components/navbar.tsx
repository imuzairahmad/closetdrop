"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import Logo from "./logo";

const links = [
  { href: "/women", label: "Women" },
  { href: "/men", label: "Men" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        {/* CLOSETDROP<span className="text-primary">™️</span> */}
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
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

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-border transition-all duration-300",
          open ? "max-h-64" : "max-h-0",
        )}
      >
        <nav className="container flex flex-col gap-4 py-4 text-sm font-semibold uppercase tracking-wide">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
