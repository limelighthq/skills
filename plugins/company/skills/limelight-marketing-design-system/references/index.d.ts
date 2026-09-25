import type * as React from 'react';
export type Agent = 'limelight' | 'ivy' | 'cooper' | 'lana' | 'elliot';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = black CTA ("Get started"); secondary = white + hairline; tertiary = off-white ("Sign in"); link = underlined text link with arrow. */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  href?: string;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface AgentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ring gradient and bracket-corner color. limelight = company level ("Learn more", "Meet AI employees"). */
  agent?: Agent;
  href?: string;
  children?: React.ReactNode;
}
export declare function AgentButton(props: AgentButtonProps): React.ReactElement;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon URL, e.g. the icon-caret-double-left/right assets. */
  icon: string;
  /** Accessible name, e.g. "Previous". */
  label: string;
}
export declare function IconButton(props: IconButtonProps): React.ReactElement;

/** Bracketed uppercase eyebrow: { YOUR NEW HIRES }. */
export declare function SectionTag(props: { children?: React.ReactNode; className?: string }): React.ReactElement;

export interface SectionHeadingProps {
  /** Eyebrow text (renders a SectionTag). */
  tag?: React.ReactNode;
  /** Ink part of the title (text-600). */
  lead?: React.ReactNode;
  /** Muted part (text-400), on its own line unless breakRest=false. */
  rest?: React.ReactNode;
  breakRest?: boolean;
  /** Short paragraph set right of the title (left align) or under it (center). */
  description?: React.ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}
export declare function SectionHeading(props: SectionHeadingProps): React.ReactElement;

export interface HeroHeadingProps {
  /** Muted lead-in (text-400). */
  lead: React.ReactNode;
  /** The phrase in the dashed pill (text-600). */
  highlight: React.ReactNode;
  className?: string;
}
export declare function HeroHeading(props: HeroHeadingProps): React.ReactElement;

export interface AgentTagProps { mono?: boolean; live?: boolean; className?: string; children?: React.ReactNode; }
export declare function AgentTag(props: AgentTagProps): React.ReactElement;

export interface AgentAvatarProps { src: string; name?: string; agent?: Agent; size?: number; mono?: boolean; live?: boolean; alt?: string; className?: string; }
export declare function AgentAvatar(props: AgentAvatarProps): React.ReactElement;

export interface StatProps {
  /** The figure, e.g. "44% vs 13%". */
  value: React.ReactNode;
  /** Ink words that start the caption. */
  lead?: React.ReactNode;
  /** Rest of the caption (text-500). */
  children?: React.ReactNode;
  /** Dotted orbit behind the figure. Default true. */
  orbit?: boolean;
  className?: string;
}
export declare function Stat(props: StatProps): React.ReactElement;

export interface FeatureCardProps {
  /** Brand icon URL (glyph on pedestal), e.g. icon-heart.svg. */
  icon?: string;
  title?: React.ReactNode;
  /** Ink words that start the body. */
  lead?: React.ReactNode;
  children?: React.ReactNode;
  /** boxed = bordered card for edge-to-edge rows; default = dashed left rule. */
  boxed?: boolean;
  className?: string;
}
export declare function FeatureCard(props: FeatureCardProps): React.ReactElement;

export interface NavItem { label: string; href?: string; icon?: string; description?: string; }
export interface NavbarProps {
  /** Logo URL (limelight-logo-black.svg). */
  logo: string;
  homeHref?: string;
  /** A link, or a dropdown when `items` is set (Agents, Resources). */
  links?: { label: string; href?: string; menu?: boolean; items?: NavItem[] }[];
  /** Right-side actions, usually a tertiary and a primary Button. */
  children?: React.ReactNode;
  /** Full-width buttons at the bottom of the mobile menu (below 991px). */
  mobileActions?: React.ReactNode;
  /** Index of a dropdown to show open (previews and docs). */
  defaultOpen?: number;
  defaultMobileOpen?: boolean;
  className?: string;
}
export declare function Navbar(props: NavbarProps): React.ReactElement;

export interface BillingToggleProps { value?: 'monthly' | 'yearly'; defaultValue?: 'monthly' | 'yearly'; onChange?: (v: 'monthly' | 'yearly') => void; save?: string; className?: string; }
export declare function BillingToggle(props: BillingToggleProps): React.ReactElement;

export interface PricingCardProps {
  /** Gradient frame: ivy, cooper or elliot. Omit for the neutral package card. */
  agent?: 'ivy' | 'cooper' | 'elliot';
  name: React.ReactNode;
  avatar?: string;
  role?: React.ReactNode;
  price?: React.ReactNode;
  per?: React.ReactNode;
  summary?: React.ReactNode;
  /** A Button, placed under the price. */
  action?: React.ReactNode;
  featuresTitle?: React.ReactNode;
  features?: (string | { text: React.ReactNode; icon?: string })[];
  /** Ribbon above the card ("What each agent does"). */
  ribbon?: React.ReactNode;
  /** Extra block after a divider, e.g. "Supercharged by Lana". */
  children?: React.ReactNode;
  className?: string;
}
export declare function PricingCard(props: PricingCardProps): React.ReactElement;

export interface NewsletterFormProps { title?: React.ReactNode; placeholder?: string; cta?: React.ReactNode; onSubmit?: (email: string) => void; className?: string; }
export declare function NewsletterForm(props: NewsletterFormProps): React.ReactElement;

export interface FooterProps {
  columns?: { title: React.ReactNode; links: { label: React.ReactNode; href?: string }[] }[];
  /** Right card content, usually a NewsletterForm. */
  aside?: React.ReactNode;
  /** Large logo URL. */
  logo?: string;
  legal?: { label: React.ReactNode; href?: string }[];
  className?: string;
}
export declare function Footer(props: FooterProps): React.ReactElement;

export interface AgentTabsProps {
  tabs: { label: React.ReactNode; icon?: string; content: React.ReactNode }[];
  defaultIndex?: number;
  /** Milliseconds per tab; turns on auto-advance and the 1px progress bar. */
  autoAdvance?: number;
  label?: string;
  id?: string;
  className?: string;
}
export declare function AgentTabs(props: AgentTabsProps): React.ReactElement;

export interface StepCardProps {
  number: React.ReactNode;
  title: React.ReactNode;
  /** Body text (body-l). */
  children?: React.ReactNode;
  /** Product visual on the right (8 of 12 columns). */
  visual?: React.ReactNode;
  className?: string;
}
export declare function StepCard(props: StepCardProps): React.ReactElement;

export interface LogoStripProps {
  logos: { src: string; alt?: string }[];
  label?: React.ReactNode;
  /** Scrolling marquee (default true; stops for reduced motion). */
  moving?: boolean;
  className?: string;
}
export declare function LogoStrip(props: LogoStripProps): React.ReactElement;

export interface ProofCardProps {
  /** Floating tag above the card, e.g. "Ivy recommendation". */
  tag?: React.ReactNode;
  image?: string;
  title: React.ReactNode;
  /** Small inline mark after the title, e.g. a LinkedIn icon or a score. */
  badge?: React.ReactNode;
  meta?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}
export declare function ProofCard(props: ProofCardProps): React.ReactElement;

export interface AgentCardProps { name: React.ReactNode; role?: React.ReactNode; live?: boolean; children?: React.ReactNode; action?: React.ReactNode; className?: string; }
export declare function AgentCard(props: AgentCardProps): React.ReactElement;

export interface CTASectionProps { title: React.ReactNode; children?: React.ReactNode; action?: React.ReactNode; className?: string; }
export declare function CTASection(props: CTASectionProps): React.ReactElement;

export interface FilterTabsProps { items: string[]; value?: string; defaultValue?: string; onChange?: (v: string) => void; label?: string; className?: string; }
export declare function FilterTabs(props: FilterTabsProps): React.ReactElement;

/** Small outlined label for a category or a duration ("Market Research", "33 Min"). */
export declare function Chip(props: { children?: React.ReactNode; className?: string }): React.ReactElement;

export interface ContentCardProps {
  href?: string;
  image?: string;
  imageAlt?: string;
  /** CSS aspect ratio of the image, default "16/9" (blog). Podcast covers use "1/1". */
  ratio?: string;
  date?: React.ReactNode;
  /** Category or duration, shown as a Chip. */
  tag?: React.ReactNode;
  title: React.ReactNode;
  className?: string;
}
export declare function ContentCard(props: ContentCardProps): React.ReactElement;

export interface ArticleHeaderProps {
  /** Renders a "{ BACK }" tag link. */
  backHref?: string;
  backLabel?: string;
  /** Eyebrow when there is no back link ("Resources"). */
  tag?: React.ReactNode;
  date?: React.ReactNode;
  chip?: React.ReactNode;
  title: React.ReactNode;
  /** Buttons, e.g. primary "Play" + secondary "View more". */
  actions?: React.ReactNode;
  className?: string;
}
export declare function ArticleHeader(props: ArticleHeaderProps): React.ReactElement;

/** Long-form body. Pass CMS HTML as `html`, or JSX children. */
export declare function RichText(props: { html?: string; children?: React.ReactNode; className?: string }): React.ReactElement;

export interface TableOfContentsProps { title?: React.ReactNode; items: { label: React.ReactNode; href?: string; level?: 2 | 3; current?: boolean }[]; label?: string; className?: string; }
export declare function TableOfContents(props: TableOfContentsProps): React.ReactElement;

export declare function CheckList(props: { items: React.ReactNode[]; className?: string }): React.ReactElement;

export interface LeadField { name: string; label: React.ReactNode; type?: 'text' | 'email' | 'url' | 'tel'; required?: boolean; half?: boolean; placeholder?: string; autoComplete?: string; /** Makes the field a select. */ options?: string[]; }
export interface LeadFormProps { fields: LeadField[]; cta?: React.ReactNode; onSubmit?: (data: Record<string, string>) => void; id?: string; className?: string; }
export declare function LeadForm(props: LeadFormProps): React.ReactElement;

declare global { interface Window { Limelight: {
  Button: typeof Button; AgentButton: typeof AgentButton; IconButton: typeof IconButton; SectionTag: typeof SectionTag;
  SectionHeading: typeof SectionHeading; HeroHeading: typeof HeroHeading; AgentTag: typeof AgentTag; AgentAvatar: typeof AgentAvatar;
  Stat: typeof Stat; FeatureCard: typeof FeatureCard; Navbar: typeof Navbar; BillingToggle: typeof BillingToggle;
  PricingCard: typeof PricingCard; NewsletterForm: typeof NewsletterForm; Footer: typeof Footer;
  AgentTabs: typeof AgentTabs; StepCard: typeof StepCard; LogoStrip: typeof LogoStrip; ProofCard: typeof ProofCard; AgentCard: typeof AgentCard; CTASection: typeof CTASection;
  FilterTabs: typeof FilterTabs; Chip: typeof Chip; ContentCard: typeof ContentCard; ArticleHeader: typeof ArticleHeader; RichText: typeof RichText; TableOfContents: typeof TableOfContents; CheckList: typeof CheckList; LeadForm: typeof LeadForm;
} } }
