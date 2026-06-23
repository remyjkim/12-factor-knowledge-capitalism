import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "12 Factors of Knowledge Capitalism",
  EMAIL: "contact@example.com",
  NUM_POSTS_ON_HOMEPAGE: 6,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "A framework for understanding how knowledge creates, compounds, and captures value in networked systems.",
};

export const BLOG: Metadata = {
  TITLE: "The 12 Factors",
  DESCRIPTION: "Twelve foundational principles describing the architecture of an economy where knowledge itself becomes the primary form of capital.",
};

export const SOCIALS: Socials = [
  {
    NAME: "twitter-x",
    HREF: "https://twitter.com/example",
  },
  {
    NAME: "github",
    HREF: "https://github.com/example"
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/example",
  }
];
