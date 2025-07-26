export const navigationItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Skills",
    path: "/skills",
  },
  {
    label: "Blogs",
    path: "/blogs",
  },
  {
    label: "Resume",
    path: "/assets/resume.pdf",
  },
  {
    label: "Contact",
    path: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`,
  },
];
