import { ContactForm } from "./contact-form";
import { Instagram, MessageCircle, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact — Closetdrop™️",
};

export default function ContactPage() {
  return (
    <div className="container py-16">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Closetdrop™️
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Get in Touch
        </h1>
        <p className="text-muted-foreground mt-3">
          Questions about a piece, sizing, or a drop you missed? Reach out — we
          reply fast.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">WhatsApp</h3>
              <p className="text-sm text-muted-foreground">
                Fastest way to reach us for orders
              </p>
              <a
                href="https://wa.me/923039424415"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium underline underline-offset-4"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Instagram className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Instagram</h3>
              <p className="text-sm text-muted-foreground">
                Follow for new drops
              </p>
              <a
                href="https://www.instagram.com/closetdrop_pk?igsh=YXFrM3V2eXJydzg4&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium underline underline-offset-4"
              >
                @closetdrop
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Based in Pakistan</h3>
              <p className="text-sm text-muted-foreground">
                Local meetups &amp; nationwide shipping available on request
              </p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
