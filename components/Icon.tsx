import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "search" | "cart" | "user" | "chevron" | "arrow" | "menu" | "close"
  | "truck" | "award" | "handshake" | "basket" | "box" | "store" | "shield"
  | "layers" | "clipboard" | "package" | "phone" | "mail" | "pin"
  | "check" | "minus" | "plus" | "trash" | "copy" | "filter" | "sparkle"
  | "instagram" | "facebook" | "clock" | "file" | "building";

const icons: Record<IconName, ReactNode> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  cart: <><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M2 3h2l2.5 12.5a2 2 0 0 0 2 1.5h11a2 2 0 0 0 2-1.6L23 7H5"/></>,
  user: <><circle cx="12" cy="7.5" r="3.5"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  close: <><path d="M5 5l14 14M19 5 5 19"/></>,
  truck: <><path d="M2 5h12v12H2zM14 9h4l4 4v4h-8"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  award: <><circle cx="12" cy="9" r="6"/><path d="m8 14-2 8 6-3 6 3-2-8"/></>,
  handshake: <><path d="m2 8 5-4 5 2 4-2 6 4-4 8-6 5-4-3-2 1-4-6z"/><path d="m7 10 4-3 5 4m-7 4 4 3m0-7 5 5"/></>,
  basket: <><path d="m3 9 3 11h12l3-11H3ZM8 9l4-6 4 6M7 13v4m5-4v4m5-4v4"/></>,
  box: <><path d="m12 2 9 5v10l-9 5-9-5V7l9-5ZM3 7l9 5 9-5M12 12v10"/></>,
  store: <><path d="M3 10V21h18V10M3 10l2-7h14l2 7M3 10c0 4 5 4 5 0 0 4 4 4 4 0 0 4 4 4 4 0 0 4 5 4 5 0M9 21v-7h6v7"/></>,
  shield: <><path d="M12 2 21 6v6c0 6-4.2 9.1-9 10-4.8-.9-9-4-9-10V6l9-4z"/><path d="m8 12 2.5 2.5L16 9"/></>,
  layers: <><path d="m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5"/></>,
  clipboard: <><rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 11h6M9 15h6"/></>,
  package: <><path d="M3 7 12 2l9 5v10l-9 5-9-5V7zm0 0 9 5 9-5M12 12v10M8 4l9 5"/></>,
  phone: <path d="M6 3h4l2 5-2.5 2.5a16 16 0 0 0 4 4L16 12l5 2v4c0 2-2 3-4 2-7-3-11-7-14-14-1-2 0-4 3-3z"/>,
  mail: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/></>,
  check: <path d="m4 12 5 5L20 6"/>,
  minus: <path d="M5 12h14"/>,
  plus: <path d="M5 12h14M12 5v14"/>,
  trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6m4-6v6"/></>,
  copy: <><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>,
  filter: <><path d="M3 5h18M6 12h12M9 19h6"/></>,
  sparkle: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z"/></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
  facebook: <path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2c-1-.2-2-.3-3-.3-3 0-5 2-5 5V9H7v4h3v8"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v7l4 2"/></>,
  file: <><path d="M6 2h8l5 5v15H6zM14 2v6h5M9 13h7M9 17h7"/></>,
  building: <><path d="M3 22V8l9-5 9 5v14M9 22v-6h6v6M7 10h2m6 0h2M7 13h2m6 0h2"/></>,
};

export function Icon({ name, size = 22, className = "", ...props }: { name: IconName; size?: number; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      {icons[name]}
    </svg>
  );
}
