// Field-level config for every editable section.
// Supported field types: text, textarea, image, select, color, number, repeater
// repeater.fields only supports one level of nesting (text/textarea/select/image/number)


export const sectionSchemas = {
  hero: {
    label: "Hero",
    fields: [
      { name: "badge", type: "text", label: "Top Badge Text" },
      { name: "heading", type: "textarea", label: "Main Heading" },
      { name: "headingHighlight", type: "text", label: "Highlighted Word(s) in Heading" },
      { name: "subheading", type: "textarea", label: "Subheading Paragraph" },
      {
        name: "infoTags",
        type: "repeater",
        label: "Info Badges (location, rating, hours)",
        itemLabel: "Badge",
        fields: [{ name: "text", type: "text", label: "Text" }],
      },
      {
        name: "buttons",
        type: "repeater",
        label: "CTA Buttons",
        itemLabel: "Button",
        fields: [
          { name: "label", type: "text", label: "Button Label" },
          { name: "href", type: "text", label: "Link (# or URL)" },
          {
            name: "style",
            type: "select",
            label: "Style",
            options: ["primary", "whatsapp", "outline"],
          },
        ],
      },
    ],
  },

  "stats-strip": {
    label: "Stats Strip",
    fields: [
      {
        name: "stats",
        type: "repeater",
        label: "Animated Stats",
        itemLabel: "Stat",
        fields: [
          { name: "target", type: "number", label: "Target Number" },
          { name: "suffix", type: "text", label: "Suffix (+, %, etc.)" },
          { name: "label", type: "text", label: "Label" },
        ],
      },
    ],
  },

  "values-banner": {
    label: "Values Banner",
    fields: [
      {
        name: "items",
        type: "repeater",
        label: "Banner Items",
        itemLabel: "Item",
        fields: [{ name: "text", type: "text", label: "Text (with emoji)" }],
      },
    ],
  },

  trust: {
    label: "Trust",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "items",
        type: "repeater",
        label: "Trust Cards",
        itemLabel: "Card",
        fields: [
          { name: "icon", type: "text", label: "Icon (emoji)" },
          { name: "value", type: "text", label: "Value" },
          { name: "label", type: "text", label: "Label" },
        ],
      },
    ],
  },

  services: {
    label: "Services",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "items",
        type: "repeater",
        label: "Service Cards",
        itemLabel: "Service",
        fields: [
          { name: "icon", type: "text", label: "Icon (emoji)" },
          { name: "name", type: "text", label: "Service Name" },
          { name: "desc", type: "textarea", label: "Description" },
          { name: "badge", type: "text", label: "Badge Text" },
        ],
      },
    ],
  },

  signature: {
    label: "Signature Care",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "headingHighlight", type: "text", label: "Highlighted Line" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "items",
        type: "repeater",
        label: "Signature Cards",
        itemLabel: "Card",
        fields: [
          { name: "icon", type: "text", label: "Icon (emoji)" },
          { name: "name", type: "text", label: "Name" },
          { name: "desc", type: "textarea", label: "Description" },
          { name: "tag", type: "text", label: "Tag" },
        ],
      },
    ],
  },

  why: {
    label: "Why Choose Us",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "logoImage", type: "image", label: "Center Logo" },
      {
        name: "items",
        type: "repeater",
        label: "Reason List",
        itemLabel: "Reason",
        fields: [
          { name: "title", type: "text", label: "Title" },
          { name: "desc", type: "textarea", label: "Description" },
        ],
      },
    ],
  },

  commercial: {
    label: "Commercial",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "businesses",
        type: "repeater",
        label: "Business Types",
        itemLabel: "Business",
        fields: [
          { name: "icon", type: "text", label: "Icon" },
          { name: "title", type: "text", label: "Title" },
          { name: "desc", type: "textarea", label: "Description" },
        ],
      },
      {
        name: "features",
        type: "repeater",
        label: "Key Features",
        itemLabel: "Feature",
        fields: [
          { name: "icon", type: "text", label: "Icon" },
          { name: "title", type: "text", label: "Title" },
          { name: "desc", type: "text", label: "Description" },
        ],
      },
    ],
  },

  booking: {
    label: "Booking",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "whatsappNumber", type: "text", label: "WhatsApp Number (with country code)" },
      { name: "email", type: "text", label: "Booking Email" },
      {
        name: "serviceOptions",
        type: "repeater",
        label: "Service Dropdown Options",
        itemLabel: "Option",
        fields: [{ name: "text", type: "text", label: "Option Text" }],
      },
    ],
  },

  tech: {
    label: "Technology",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "items",
        type: "repeater",
        label: "Equipment Cards",
        itemLabel: "Item",
        fields: [
          { name: "icon", type: "text", label: "Icon" },
          { name: "title", type: "text", label: "Title" },
          { name: "desc", type: "textarea", label: "Description" },
        ],
      },
    ],
  },

  founder: {
    label: "Founder",
    fields: [
      { name: "photo", type: "image", label: "Founder Photo" },
      { name: "name", type: "text", label: "Founder Name" },
      { name: "role", type: "text", label: "Role / Title" },
      { name: "bio", type: "textarea", label: "Biography" },
      {
        name: "credentials",
        type: "repeater",
        label: "Credentials",
        itemLabel: "Credential",
        fields: [{ name: "text", type: "text", label: "Text" }],
      },
      { name: "visionQuote", type: "textarea", label: "Company Vision Quote" },
      { name: "coDirectorPhoto", type: "image", label: "Co-Director Photo" },
      { name: "coDirectorName", type: "text", label: "Co-Director Name" },
      { name: "coDirectorBio", type: "textarea", label: "Co-Director Bio" },
    ],
  },

  gallery: {
    label: "Gallery",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "items",
        type: "repeater",
        label: "Before/After Cards",
        itemLabel: "Card",
        fields: [
          { name: "beforeImage", type: "image", label: "Before Image" },
          { name: "afterImage", type: "image", label: "After Image" },
          { name: "title", type: "text", label: "Title" },
          { name: "sub", type: "text", label: "Subtitle" },
        ],
      },
    ],
  },

  values: {
    label: "Core Values",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "items",
        type: "repeater",
        label: "Value Cards",
        itemLabel: "Value",
        fields: [
          { name: "icon", type: "text", label: "Icon" },
          { name: "title", type: "text", label: "Title" },
          { name: "desc", type: "textarea", label: "Description" },
          { name: "tag", type: "text", label: "Tag" },
        ],
      },
    ],
  },

  reviews: {
    label: "Reviews",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "text", label: "Heading" },
      { name: "quote", type: "textarea", label: "Featured Quote" },
      {
        name: "reviews",
        type: "repeater",
        label: "Customer Reviews",
        itemLabel: "Review",
        fields: [
          { name: "text", type: "textarea", label: "Review Text" },
          { name: "author", type: "text", label: "Author" },
          { name: "date", type: "text", label: "Date" },
        ],
      },
    ],
  },

  locations: {
    label: "Locations",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "branches",
        type: "repeater",
        label: "Branches",
        itemLabel: "Branch",
        fields: [
          { name: "city", type: "text", label: "City" },
          { name: "address", type: "text", label: "Address Line 1" },
          { name: "province", type: "text", label: "Address Line 2" },
          { name: "phone", type: "text", label: "Phone" },
          { name: "mapUrl", type: "text", label: "Google Maps Link" },
          { name: "embedUrl", type: "text", label: "Google Maps Embed URL" },
        ],
      },
    ],
  },

  vision: {
    label: "Vision",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "statement", type: "textarea", label: "Vision Statement" },
      {
        name: "roadmap",
        type: "repeater",
        label: "Expansion Roadmap",
        itemLabel: "City",
        fields: [
          { name: "city", type: "text", label: "City" },
          { name: "status", type: "text", label: "Status" },
          { name: "active", type: "select", label: "Active?", options: ["true", "false"] },
        ],
      },
    ],
  },

  "seo-pages": {
    label: "SEO Pages",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "links",
        type: "repeater",
        label: "SEO Link Cards",
        itemLabel: "Card",
        fields: [
          { name: "icon", type: "text", label: "Icon" },
          { name: "title", type: "text", label: "Title" },
          { name: "desc", type: "text", label: "Description" },
          { name: "href", type: "text", label: "Link (#section)" },
        ],
      },
    ],
  },

  delivery: {
    label: "Delivery",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "whatsappMessage", type: "text", label: "Pre-filled WhatsApp Message" },
      {
        name: "areas",
        type: "repeater",
        label: "Service Area Tags",
        itemLabel: "Tag",
        fields: [{ name: "text", type: "text", label: "Text" }],
      },
    ],
  },

  faq: {
    label: "FAQ",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "text", label: "Heading" },
      {
        name: "items",
        type: "repeater",
        label: "Questions",
        itemLabel: "Question",
        fields: [
          { name: "q", type: "text", label: "Question" },
          { name: "a", type: "textarea", label: "Answer" },
        ],
      },
    ],
  },

  social: {
    label: "Social",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "text", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "links",
        type: "repeater",
        label: "Social Links",
        itemLabel: "Platform",
        fields: [
          { name: "icon", type: "text", label: "Icon" },
          { name: "name", type: "text", label: "Platform Name" },
          { name: "handle", type: "text", label: "Handle / Label" },
          { name: "href", type: "text", label: "URL" },
        ],
      },
    ],
  },

  contact: {
    label: "Contact",
    fields: [
      { name: "label", type: "text", label: "Section Label" },
      { name: "heading", type: "textarea", label: "Heading" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "phone", type: "text", label: "Phone Number" },
      { name: "whatsappMessage", type: "text", label: "Pre-filled WhatsApp Message" },
    ],
  },

  footer: {
    label: "Footer",
    fields: [
      { name: "logo", type: "image", label: "Footer Logo" },
      { name: "description", type: "textarea", label: "Company Description" },
      { name: "phone", type: "text", label: "Phone Number" },
      { name: "hours", type: "text", label: "Operating Hours" },
      { name: "whatsappLink", type: "text", label: "WhatsApp Link" },
      { name: "copyrightText", type: "text", label: "Copyright Line" },
    ],
  },
};

export const sectionSchemasWithKeys = Object.fromEntries(

  Object.entries(sectionSchemas).map(([key, section]) => [

    key,

    {
      key: key,
      ...section,
    }

  ])

);


// Get schema with key included

export function getSectionSchema(slug) {

  return sectionSchemasWithKeys[slug] || null;

};