export const sectionSchemas = {

  // ==========================================================
  // HERO
  // ==========================================================

  hero: {
    label: "Hero",
    description: "Manage the main hero section displayed at the top of your website.",

    groups: [
      {
        id: "hero-content",
        title: "Hero Content",
        description: "Set the main message visitors see when they arrive.",
        fields: [
          {
            name: "badge",
            type: "text",
            label: "Top Badge Text",
            placeholder: "Professional Shoe & Laundry Care",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Main Heading",
            placeholder: "Premium Care For Your Favorite Shoes",
          },
          {
            name: "headingHighlight",
            type: "text",
            label: "Highlighted Word(s) in Heading",
            placeholder: "Favorite Shoes",
          },
          {
            name: "subheading",
            type: "textarea",
            label: "Subheading Paragraph",
            placeholder: "Give your shoes the professional care they deserve.",
          },
        ],
      },

      {
        id: "hero-info",
        title: "Information Badges",
        description: "Add quick information such as location, rating, or opening hours.",
        fields: [
          {
            name: "infoTags",
            type: "repeater",
            label: "Info Badges",
            itemLabel: "Badge",
            addLabel: "Add Information Badge",
            fields: [
              {
                name: "icon",
                type: "emoji",
                label: "Icon Type",
              },
              {
                name: "text",
                type: "text",
                label: "Badge Text",
                placeholder: "Colombo, Sri Lanka",
              },
            ],
          },
        ],
      },

      {
        id: "hero-buttons",
        title: "Call-to-Action Buttons",
        description: "Configure the buttons visitors can use to take action.",
        fields: [
          {
            name: "buttons",
            type: "repeater",
            label: "CTA Buttons",
            itemLabel: "Button",
            addLabel: "Add CTA Button",
            fields: [
              {
                name: "icon",
                type: "emoji",
                label: "Icon",
                placeholder: "👟",
              },
              {
                name: "label",
                type: "text",
                label: "Button Label",
                placeholder: "Book Now",
              },
              {
                name: "href",
                type: "text",
                label: "Link (# or URL)",
                placeholder: "#booking",
              },
              {
                name: "style",
                type: "select",
                label: "Button Style",
                options: [
                  "primary",
                  "whatsapp",
                  "outline",
                ],
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // STATS STRIP
  // ==========================================================
"stats-strip": {
  label: "Stats Strip",
  description: "Manage the key statistics displayed on your website.",
  groups: [
    {
      id: "stats-content",
      title: "Statistics",
      description: "Add and manage the key numbers shown to your visitors.",
      fields: [
        {
          name: "stats",
          type: "repeater",
          label: "Statistics",
          itemLabel: "Statistic",
          addLabel: "Add Statistic",
          fields: [
            {
              name: "prefix",
              type: "text",
              label: "Prefix",
              placeholder: "$",
              description: "Optional symbol before the number (e.g., $, ~)",
            },
            {
              name: "value",
              type: "number",
              label: "Value",
              placeholder: "10000",
              required: true,
            },
            {
              name: "suffix",
              type: "text",
              label: "Suffix",
              placeholder: "+",
              description: "Optional symbol after the number (e.g., +, %)",
            },
            {
              name: "label",
              type: "text",
              label: "Label",
              placeholder: "Garments Processed",
              required: true,
            },
            {
              name: "animated",
              type: "boolean",
              label: "Animate Number?",
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
},


  // ==========================================================
  // VALUES BANNER
  // ==========================================================

  "values-banner": {
    label: "Values Banner",
    description: "Manage the scrolling or highlighted values banner.",

    groups: [
      {
        id: "banner-items",
        title: "Banner Items",
        description: "Add short messages or values displayed in the banner.",
        fields: [
          {
            name: "items",
            type: "repeater",
            label: "Banner Items",
            itemLabel: "Item",
            addLabel: "Add Banner Item",
            fields: [
              {
                name: "text",
                type: "text",
                label: "Text",
                placeholder: "Professional Care ✨",
              },  
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // TRUST
  // ==========================================================

  trust: {
    label: "Trust",
    description: "Manage the trust and credibility section.",

    groups: [
      {
        id: "trust-content",
        title: "Section Content",
        description: "Configure the main title and supporting message.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
            placeholder: "WHY CHOOSE US",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
            placeholder: "Trusted by customers who care about quality",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
            placeholder: "Professional care delivered with attention to detail.",
          },
        ],
      },

      {
        id: "trust-cards",
        title: "Trust Cards",
        description: "Manage the statistics or trust indicators displayed in this section.",
        fields: [
          {
            name: "items",
            type: "repeater",
            label: "Trust Cards",
            itemLabel: "Card",
            addLabel: "Add Trust Card",
            fields: [
              {
                name: "icon",
                type: "text",
                label: "Icon",
                placeholder: "⭐",
              },
              {
                name: "value",
                type: "text",
                label: "Value",
                placeholder: "10+",
              },
              {
                name: "label",
                type: "text",
                label: "Label",
                placeholder: "Years Experience",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // SERVICES
  // ==========================================================

  services: {
    label: "Services",
    description: "Manage the services displayed on your website.",

    groups: [
      {
        id: "services-content",
        title: "Section Content",
        description: "Configure the title and introduction for your services.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
            placeholder: "OUR SERVICES",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
            placeholder: "Professional care for every item",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
            placeholder: "Explore our range of professional cleaning services.",
          },
        ],
      },

      {
        id: "services-items",
        title: "Service Cards",
        description: "Add and manage individual services.",
        fields: [
          {
            name: "items",
            type: "repeater",
            label: "Service Cards",
            itemLabel: "Service",
            addLabel: "Add Service",
            fields: [
              {
                name: "icon",
                type: "text",
                label: "Icon",
                placeholder: "👟",
              },
              {
                name: "name",
                type: "text",
                label: "Service Name",
                placeholder: "Premium Shoe Cleaning",
              },
              {
                name: "desc",
                type: "textarea",
                label: "Description",
                placeholder: "Deep cleaning and professional restoration.",
              },
              {
                name: "badge",
                type: "text",
                label: "Badge Text",
                placeholder: "Popular",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // SIGNATURE CARE
  // ==========================================================

  signature: {
    label: "Signature Care",
    description: "Manage your premium or signature care services.",

    groups: [
      {
        id: "signature-content",
        title: "Section Content",
        description: "Configure the main content and highlighted heading.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
            placeholder: "SIGNATURE CARE",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
            placeholder: "Premium care for your most valuable items",
          },
          {
            name: "headingHighlight",
            type: "text",
            label: "Highlighted Line",
            placeholder: "Made with precision",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
            placeholder: "Our signature services are designed for exceptional results.",
          },
        ],
      },

      {
        id: "signature-items",
        title: "Signature Care Cards",
        description: "Manage the premium services displayed in this section.",
        fields: [
          {
            name: "items",
            type: "repeater",
            label: "Signature Cards",
            itemLabel: "Card",
            addLabel: "Add Signature Service",
            fields: [
              {
                name: "icon",
                type: "text",
                label: "Icon",
                placeholder: "✨",
              },
              {
                name: "name",
                type: "text",
                label: "Name",
                placeholder: "Luxury Shoe Care",
              },
              {
                name: "desc",
                type: "textarea",
                label: "Description",
                placeholder: "Specialized care for premium footwear.",
              },
              {
                name: "tag",
                type: "text",
                label: "Tag",
                placeholder: "Premium",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // WHY CHOOSE US
  // ==========================================================

  why: {
    label: "Why Choose Us",
    description: "Explain why customers should choose your business.",

    groups: [
      {
        id: "why-content",
        title: "Section Content",
        description: "Configure the main section messaging.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
            placeholder: "WHY US",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
            placeholder: "Professional care you can trust",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
            placeholder: "We combine expertise, technology, and attention to detail.",
          },
        ],
      },

      {
        id: "why-image",
        title: "Center Branding",
        description: "Upload the logo displayed in the center of this section.",
        fields: [
          {
            name: "logoImage",
            type: "image",
            label: "Center Logo",
          },
        ],
      },

      {
        id: "why-items",
        title: "Reasons to Choose Us",
        description: "Add the key reasons customers should choose your business.",
        fields: [
          {
            name: "items",
            type: "repeater",
            label: "Reason List",
            itemLabel: "Reason",
            addLabel: "Add Reason",
            fields: [
              {
                name: "title",
                type: "text",
                label: "Title",
                placeholder: "Professional Expertise",
              },
              {
                name: "desc",
                type: "textarea",
                label: "Description",
                placeholder: "Our team uses professional techniques and equipment.",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // COMMERCIAL
  // ==========================================================

  commercial: {
    label: "Commercial",
    description: "Manage commercial and business service content.",

    groups: [
      {
        id: "commercial-content",
        title: "Section Content",
        description: "Configure the main commercial section content.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },

      {
        id: "commercial-businesses",
        title: "Business Types",
        description: "Add the types of businesses you serve.",
        fields: [
          {
            name: "businesses",
            type: "repeater",
            label: "Business Types",
            itemLabel: "Business",
            addLabel: "Add Business Type",
            fields: [
              {
                name: "icon",
                type: "text",
                label: "Icon",
              },
              {
                name: "title",
                type: "text",
                label: "Title",
              },
              {
                name: "desc",
                type: "textarea",
                label: "Description",
              },
            ],
          },
        ],
      },

      {
        id: "commercial-features",
        title: "Key Features",
        description: "Highlight the main benefits of your commercial service.",
        fields: [
          {
            name: "features",
            type: "repeater",
            label: "Key Features",
            itemLabel: "Feature",
            addLabel: "Add Feature",
            fields: [
              {
                name: "icon",
                type: "text",
                label: "Icon",
              },
              {
                name: "title",
                type: "text",
                label: "Title",
              },
              {
                name: "desc",
                type: "text",
                label: "Description",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // BOOKING
  // ==========================================================

  booking: {
    label: "Booking",
    description: "Manage booking section content and customer contact details.",

    groups: [
      {
        id: "booking-content",
        title: "Booking Content",
        description: "Configure the main booking section.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },

      {
        id: "booking-contact",
        title: "Booking Contact Details",
        description: "Set the contact details customers use for bookings.",
        fields: [
          {
            name: "whatsappNumber",
            type: "text",
            label: "WhatsApp Number",
            placeholder: "+947XXXXXXXX",
          },
          {
            name: "email",
            type: "text",
            label: "Booking Email",
            placeholder: "booking@example.com",
          },
        ],
      },

      {
        id: "booking-services",
        title: "Service Options",
        description: "Manage the services available in the booking dropdown.",
        fields: [
          {
            name: "serviceOptions",
            type: "repeater",
            label: "Service Dropdown Options",
            itemLabel: "Option",
            addLabel: "Add Service Option",
            fields: [
              {
                name: "text",
                type: "text",
                label: "Option Text",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // TECHNOLOGY
  // ==========================================================

  tech: {
    label: "Technology",
    description: "Manage equipment and technology information.",

    groups: [
      {
        id: "tech-content",
        title: "Section Content",
        description: "Configure the main technology section.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },

      {
        id: "tech-items",
        title: "Equipment Cards",
        description: "Manage the equipment and technology displayed.",
        fields: [
          {
            name: "items",
            type: "repeater",
            label: "Equipment Cards",
            itemLabel: "Item",
            addLabel: "Add Equipment",
            fields: [
              {
                name: "icon",
                type: "text",
                label: "Icon",
              },
              {
                name: "title",
                type: "text",
                label: "Title",
              },
              {
                name: "desc",
                type: "textarea",
                label: "Description",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // FOUNDER
  // ==========================================================

  founder: {
    label: "Founder",
    description: "Manage founder and leadership information.",

    groups: [
      {
        id: "founder-profile",
        title: "Founder Profile",
        description: "Manage the founder's photo and basic information.",
        fields: [
          {
            name: "photo",
            type: "image",
            label: "Founder Photo",
          },
          {
            name: "name",
            type: "text",
            label: "Founder Name",
          },
          {
            name: "role",
            type: "text",
            label: "Role / Title",
          },
          {
            name: "bio",
            type: "textarea",
            label: "Biography",
          },
        ],
      },

      {
        id: "founder-credentials",
        title: "Founder Credentials",
        description: "Add qualifications, achievements, or professional credentials.",
        fields: [
          {
            name: "credentials",
            type: "repeater",
            label: "Credentials",
            itemLabel: "Credential",
            addLabel: "Add Credential",
            fields: [
              {
                name: "text",
                type: "text",
                label: "Text",
              },
            ],
          },
        ],
      },

      {
        id: "founder-vision",
        title: "Company Vision",
        description: "Configure the founder's vision statement.",
        fields: [
          {
            name: "visionQuote",
            type: "textarea",
            label: "Company Vision Quote",
          },
        ],
      },

      {
        id: "co-director",
        title: "Co-Director",
        description: "Manage the co-director profile information.",
        fields: [
          {
            name: "coDirectorPhoto",
            type: "image",
            label: "Co-Director Photo",
          },
          {
            name: "coDirectorName",
            type: "text",
            label: "Co-Director Name",
          },
          {
            name: "coDirectorBio",
            type: "textarea",
            label: "Co-Director Bio",
          },
        ],
      },
    ],
  },


  // ==========================================================
  // GALLERY
  // ==========================================================

  gallery: {
    label: "Gallery",
    description: "Manage before and after transformation images.",

    groups: [
      {
        id: "gallery-content",
        title: "Section Content",
        description: "Configure the gallery section introduction.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },

      {
        id: "gallery-items",
        title: "Before & After Gallery",
        description: "Add transformation cards with before and after images.",
        fields: [
          {
            name: "items",
            type: "repeater",
            label: "Before/After Cards",
            itemLabel: "Card",
            addLabel: "Add Gallery Card",
            fields: [
              {
                name: "beforeImage",
                type: "image",
                label: "Before Image",
              },
              {
                name: "afterImage",
                type: "image",
                label: "After Image",
              },
              {
                name: "title",
                type: "text",
                label: "Title",
              },
              {
                name: "sub",
                type: "text",
                label: "Subtitle",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // CORE VALUES
  // ==========================================================

  values: {
    label: "Core Values",
    description: "Manage your company's core values.",

    groups: [
      {
        id: "values-content",
        title: "Section Content",
        description: "Configure the main values section.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },

      {
        id: "values-items",
        title: "Value Cards",
        description: "Add and manage your company's core values.",
        fields: [
          {
            name: "items",
            type: "repeater",
            label: "Value Cards",
            itemLabel: "Value",
            addLabel: "Add Core Value",
            fields: [
              {
                name: "icon",
                type: "text",
                label: "Icon",
              },
              {
                name: "title",
                type: "text",
                label: "Title",
              },
              {
                name: "desc",
                type: "textarea",
                label: "Description",
              },
              {
                name: "tag",
                type: "text",
                label: "Tag",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // REVIEWS
  // ==========================================================

  reviews: {
    label: "Reviews",
    description: "Manage customer reviews and featured testimonials.",

    groups: [
      {
        id: "reviews-content",
        title: "Section Content",
        description: "Configure the main review section.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "text",
            label: "Heading",
          },
          {
            name: "quote",
            type: "textarea",
            label: "Featured Quote",
          },
        ],
      },

      {
        id: "reviews-items",
        title: "Customer Reviews",
        description: "Add and manage customer testimonials.",
        fields: [
          {
            name: "reviews",
            type: "repeater",
            label: "Customer Reviews",
            itemLabel: "Review",
            addLabel: "Add Customer Review",
            fields: [
              {
                name: "text",
                type: "textarea",
                label: "Review Text",
              },
              {
                name: "author",
                type: "text",
                label: "Author",
              },
              {
                name: "date",
                type: "text",
                label: "Date",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // LOCATIONS
  // ==========================================================

  locations: {
    label: "Locations",
    description: "Manage your business branches and location details.",

    groups: [
      {
        id: "locations-content",
        title: "Section Content",
        description: "Configure the locations section introduction.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },

      {
        id: "locations-branches",
        title: "Business Locations",
        description: "Add and manage your branches.",
        fields: [
          {
            name: "branches",
            type: "repeater",
            label: "Branches",
            itemLabel: "Branch",
            addLabel: "Add Branch",
            fields: [
              {
                name: "city",
                type: "text",
                label: "City",
              },
              {
                name: "address",
                type: "text",
                label: "Address Line 1",
              },
              {
                name: "province",
                type: "text",
                label: "Address Line 2",
              },
              {
                name: "phone",
                type: "text",
                label: "Phone",
              },
              {
                name: "mapUrl",
                type: "text",
                label: "Google Maps Link",
              },
              {
                name: "embedUrl",
                type: "text",
                label: "Google Maps Embed URL",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // VISION
  // ==========================================================

  vision: {
    label: "Vision",
    description: "Manage your company's vision and expansion roadmap.",

    groups: [
      {
        id: "vision-content",
        title: "Vision Content",
        description: "Configure your company's vision statement.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
          },
          {
            name: "statement",
            type: "textarea",
            label: "Vision Statement",
          },
        ],
      },

      {
        id: "vision-roadmap",
        title: "Expansion Roadmap",
        description: "Manage your future locations and expansion status.",
        fields: [
          {
            name: "roadmap",
            type: "repeater",
            label: "Expansion Roadmap",
            itemLabel: "City",
            addLabel: "Add Roadmap Location",
            fields: [
              {
                name: "city",
                type: "text",
                label: "City",
              },
              {
                name: "status",
                type: "text",
                label: "Status",
              },
              {
                name: "active",
                type: "select",
                label: "Active?",
                options: [
                  "true",
                  "false",
                ],
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // SEO PAGES
  // ==========================================================

  "seo-pages": {
    label: "SEO Pages",
    description: "Manage SEO-focused content and internal navigation links.",

    groups: [
      {
        id: "seo-content",
        title: "SEO Section Content",
        description: "Configure the SEO section title and description.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },

      {
        id: "seo-links",
        title: "SEO Link Cards",
        description: "Manage internal links displayed for SEO and navigation.",
        fields: [
          {
            name: "links",
            type: "repeater",
            label: "SEO Link Cards",
            itemLabel: "Card",
            addLabel: "Add SEO Link",
            fields: [
              {
                name: "icon",
                type: "text",
                label: "Icon",
              },
              {
                name: "title",
                type: "text",
                label: "Title",
              },
              {
                name: "desc",
                type: "text",
                label: "Description",
              },
              {
                name: "href",
                type: "text",
                label: "Link (#section)",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // DELIVERY
  // ==========================================================

  delivery: {
    label: "Delivery",
    description: "Manage delivery information and service areas.",

    groups: [
      {
        id: "delivery-content",
        title: "Delivery Content",
        description: "Configure the main delivery section.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },

      {
        id: "delivery-whatsapp",
        title: "WhatsApp Settings",
        description: "Configure the message used when customers contact you.",
        fields: [
          {
            name: "whatsappMessage",
            type: "text",
            label: "Pre-filled WhatsApp Message",
          },
        ],
      },

      {
        id: "delivery-areas",
        title: "Service Areas",
        description: "Add areas where your delivery service is available.",
        fields: [
          {
            name: "areas",
            type: "repeater",
            label: "Service Area Tags",
            itemLabel: "Tag",
            addLabel: "Add Service Area",
            fields: [
              {
                name: "text",
                type: "text",
                label: "Area",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // FAQ
  // ==========================================================

  faq: {
    label: "FAQ",
    description: "Manage frequently asked questions and answers.",

    groups: [
      {
        id: "faq-content",
        title: "FAQ Introduction",
        description: "Configure the FAQ section heading.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "text",
            label: "Heading",
          },
        ],
      },

      {
        id: "faq-items",
        title: "Questions & Answers",
        description: "Add and manage frequently asked questions.",
        fields: [
          {
            name: "items",
            type: "repeater",
            label: "Questions",
            itemLabel: "Question",
            addLabel: "Add Question",
            fields: [
              {
                name: "q",
                type: "text",
                label: "Question",
              },
              {
                name: "a",
                type: "textarea",
                label: "Answer",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // SOCIAL
  // ==========================================================

  social: {
    label: "Social",
    description: "Manage your social media links and profiles.",

    groups: [
      {
        id: "social-content",
        title: "Social Section Content",
        description: "Configure the social media section.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "text",
            label: "Heading",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },

      {
        id: "social-links",
        title: "Social Media Links",
        description: "Add and manage your social media profiles.",
        fields: [
          {
            name: "links",
            type: "repeater",
            label: "Social Links",
            itemLabel: "Platform",
            addLabel: "Add Social Link",
            fields: [
              {
                name: "icon",
                type: "text",
                label: "Icon",
              },
              {
                name: "name",
                type: "text",
                label: "Platform Name",
              },
              {
                name: "handle",
                type: "text",
                label: "Handle / Label",
              },
              {
                name: "href",
                type: "text",
                label: "URL",
              },
            ],
          },
        ],
      },
    ],
  },


  // ==========================================================
  // CONTACT
  // ==========================================================

  contact: {
    label: "Contact",
    description: "Manage contact information and WhatsApp communication.",

    groups: [
      {
        id: "contact-content",
        title: "Contact Content",
        description: "Configure the main contact section.",
        fields: [
          {
            name: "label",
            type: "text",
            label: "Section Label",
          },
          {
            name: "heading",
            type: "textarea",
            label: "Heading",
          },
          {
            name: "description",
            type: "textarea",
            label: "Description",
          },
        ],
      },

      {
        id: "contact-details",
        title: "Contact Details",
        description: "Set the phone number and WhatsApp message.",
        fields: [
          {
            name: "phone",
            type: "text",
            label: "Phone Number",
          },
          {
            name: "whatsappMessage",
            type: "text",
            label: "Pre-filled WhatsApp Message",
          },
        ],
      },
    ],
  },


  // ==========================================================
  // FOOTER
  // ==========================================================

  footer: {
    label: "Footer",
    description: "Manage your website footer content and contact information.",

    groups: [
      {
        id: "footer-branding",
        title: "Footer Branding",
        description: "Manage the footer logo and company description.",
        fields: [
          {
            name: "logo",
            type: "image",
            label: "Footer Logo",
          },
          {
            name: "description",
            type: "textarea",
            label: "Company Description",
          },
        ],
      },

      {
        id: "footer-contact",
        title: "Footer Contact Information",
        description: "Manage the contact details shown in the footer.",
        fields: [
          {
            name: "phone",
            type: "text",
            label: "Phone Number",
          },
          {
            name: "hours",
            type: "text",
            label: "Operating Hours",
          },
          {
            name: "whatsappLink",
            type: "text",
            label: "WhatsApp Link",
          },
        ],
      },

      {
        id: "footer-copyright",
        title: "Copyright",
        description: "Configure the copyright text displayed at the bottom of the website.",
        fields: [
          {
            name: "copyrightText",
            type: "text",
            label: "Copyright Line",
            placeholder: "© 2026 Your Company. All rights reserved.",
          },
        ],
      },
    ],
  },

};


// ============================================================
// ADD SCHEMA KEY
// ============================================================

export const sectionSchemasWithKeys = Object.fromEntries(

  Object.entries(sectionSchemas).map(([key, section]) => [

    key,

    {
      key,
      ...section,
    },

  ])

);


// ============================================================
// GET SECTION SCHEMA
// ============================================================

export function getSectionSchema(slug) {

  return sectionSchemasWithKeys[slug] || null;

}