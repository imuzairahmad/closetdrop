import { createClient } from "contentful";

// Content model expected in Contentful (create these in your Space):
//
// Content Type: "product"
//   - title            Short text        e.g. "Nike Epic React Flyknit 2"
//   - slug              Short text (unique)
//   - brandTag          Short text        e.g. "Closetdrop™️"
//   - category           Short text (one of: "women" | "men")
//   - subCategory        Short text (one of: "shoes" | "jeans" | "shirts" | "jewelry")
//   - condition          Short text       e.g. "Lush Condition 🫦"
//   - sizeNote           Short text       e.g. "Confirm your size with US"
//   - authenticity       Short text       e.g. "UPC Verified 100% Authentic"
//   - description        Long text (rich text or plain)
//   - price              Number
//   - originalPrice      Number (optional, for strikethrough)
//   - priceLabel         Short text       e.g. "Final Fixed ⚠️"
//   - images             Media, many files
//   - featured           Boolean (optional, show on homepage)
//   - sold               Boolean (optional, show SOLD OUT badge)
//
// Content Type: "siteSettings" (singleton, optional)
//   - instagramUrl, whatsappNumber, announcementText

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";

export const contentfulClient =
  spaceId && accessToken
    ? createClient({
        space: spaceId,
        accessToken: accessToken,
        environment,
      })
    : null;

export const isContentfulConfigured = Boolean(spaceId && accessToken);
