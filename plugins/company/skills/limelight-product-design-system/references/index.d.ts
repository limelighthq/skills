import type * as React from 'react';
/** Agents that have a portrait. Ivy and Elliot are the two agents live in D. */
export type Agent = 'ivy' | 'elliot' | 'cooper' | 'lana';
/** lucide (ISC) glyph names bundled with the system. D's own 38 icons are copied byte for byte from D's bundle (lucide-react 0.468.0). */
export type IconName = 'arrow-left' | 'arrow-right' | 'chart-no-axes-combined' | 'check' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'circle-help' | 'clock' | 'credit-card' | 'ellipsis-vertical' | 'external-link' | 'eye-off' | 'grip-horizontal' | 'heart' | 'inbox' | 'key-round' | 'lightbulb' | 'megaphone' | 'menu' | 'message-circle' | 'message-square' | 'minus' | 'notebook-pen' | 'panel-left' | 'pencil' | 'pin' | 'play' | 'plus' | 'search' | 'send' | 'settings' | 'sparkles' | 'target' | 'thumbs-up' | 'trash-2' | 'x' | 'arrow-up-right' | 'circle-check' | 'circle-alert' | 'info' | 'triangle-alert' | 'circle-x' | 'users' | 'user-plus' | 'mail' | 'calendar' | 'upload' | 'link' | 'copy' | 'eye' | 'filter' | 'undo-2' | 'history' | 'loader-circle' | 'image' | 'at-sign' | 'file-text' | 'refresh-cw' | 'arrow-up-down' | 'square-pen' | 'list' | 'kanban' | 'layout-grid' | 'log-out' | 'chevrons-up-down' | 'dollar-sign' | 'wallet' | 'bell' | 'zap' | 'bot' | 'circle' | 'circle-dot' | 'grip-vertical' | 'maximize-2' | 'panel-right' | 'rotate-ccw' | 'ellipsis' | 'send-horizontal' | 'linkedin' | 'youtube' | 'instagram' | 'twitter' | 'message-square-text' | 'mail-check' | 'square-check' | 'arrow-up' | 'dot' | 'corner-down-right';

/** One lucide glyph in the 24px house box. `size="action"` = 20px glyph (standalone icon buttons); default = 16px indicator glyph. Pass `label` only for a meaningful icon with no visible text. */
export declare function Icon(props: { name: IconName; size?: 'action' | 'indicator'; label?: string; strokeWidth?: number; className?: string; style?: React.CSSProperties }): React.ReactElement | null;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = D's #1E1C22 fill; secondary = outlined; ghost = muted text link-button (New campaign); danger = outlined with danger-ink label. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** md = 36px / 14px label (default); toolbar = 36px / 12px (filter bar); panel = 32px / 12px (panel cards); sm = 30px / 12px (header, bulk bar). */
  size?: 'md' | 'toolbar' | 'panel' | 'sm';
  icon?: IconName; iconRight?: IconName;
  /** Renders a CountBadge after the label ("Approvals 6"). */
  count?: React.ReactNode;
  block?: boolean; href?: string;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  /** Accessible name. Name the object: "Accept Eli Garrison". D shows no tooltips. */
  label: string;
  /** outline = white fill + control-border (row actions); solid = primary fill (Send). */
  variant?: 'outline' | 'solid';
  /** md = 36px rail tool, 20px glyph (default); toolbar = 26x36 panel toolbar; sm = 28px row action. Compact sizes use the 16px glyph. */
  size?: 'md' | 'toolbar' | 'sm';
  /** Hover tint of a row action: accept (green) or reject (red). */
  tone?: 'accept' | 'reject';
  /** Sets aria-pressed for toggle icon buttons. */
  pressed?: boolean;
}
export declare function IconButton(props: IconButtonProps): React.ReactElement;

/** Small status or tag label. Pass the text in D's case ("Running", "NEW", "Draft"). */
export declare function Badge(props: { tone?: 'neutral' | 'positive' | 'warning'; block?: boolean; children?: React.ReactNode; className?: string }): React.ReactElement;
/** Relevancy score chip (94). Announced as "Relevancy 94" (or `label`). */
export declare function ScoreChip(props: { value: React.ReactNode; max?: number; label?: string; className?: string }): React.ReactElement;
/** Count chip inside a button or beside a heading ("Approvals 6"). */
export declare function CountBadge(props: { tone?: 'positive' | 'neutral'; children?: React.ReactNode; className?: string }): React.ReactElement;
/** The "{ Ivy }" glass pill under the panel portrait. */
export declare function AgentLabel(props: { name?: React.ReactNode; children?: React.ReactNode; className?: string }): React.ReactElement;
/** Creator initials. `variant` 1-3 cycles D's three tints by row; `size` row = 26px (default), card = 32px. */
export declare function Avatar(props: { initials: string; variant?: 1 | 2 | 3; size?: 'row' | 'card'; label?: string; className?: string }): React.ReactElement;
/** Round agent portrait. Ivy and Elliot use D's own crops of the Agent-references images; other agents pass `src`. */
export declare function AgentFace(props: { agent?: Agent; size?: number; src?: string; name?: string; className?: string; style?: React.CSSProperties }): React.ReactElement;

// ===== A-shell =====

export interface AppShellProps {
  /** `AgentRail`. */
  rail?: React.ReactNode;
  /** `Sidebar` (the nav column). Omit, or set `navHidden`, to drop the column. */
  sidebar?: React.ReactNode;
  /** `PageHeader`. It sticks to the top of the scrolling main column. */
  header?: React.ReactNode;
  /** `AgentPanel`. Omit, or set `panelHidden`, to drop the column. */
  panel?: React.ReactNode;
  /** Page content. Padded 24px at 1440 (28px 30px above 1500px). */
  children?: React.ReactNode;
  /** Rail 'Hide navigation' state: grid becomes 56 | main | panel. Not persisted in D. */
  navHidden?: boolean;
  /** 'Hide assistant' state: grid becomes 56 | 186 | main. Session-only (decision 5): an agent switch or reload shows the panel again. */
  panelHidden?: boolean;
  /** Live panel width in px (D --chat-width, default 300, range 260 to 440). The shell min-width adds it, so the panel never clips. */
  chatWidth?: number | string;
  /** Default true. On hide, focus moves to the `ReopenAssistant` pill; on reopen, into the panel. Only when focus was lost with the control that disappeared. */
  manageFocus?: boolean;
  /** Current agent id, mirrored to `data-agent`. */
  agent?: Agent;
  mainId?: string;
  style?: React.CSSProperties;
  className?: string;
}
/** The four-column app frame: rail 56 | nav 186 | main minmax(620px,1fr) | panel var(--chat-width, 300px). */
export declare function AppShell(props: AppShellProps): React.ReactElement;

export interface RailAgent {
  id: string;
  /** Accessible name of the portrait button. D uses the name only ("Ivy"). */
  name: string;
  /** Portrait source. Ivy and Elliot use D's crops; Cooper and Lana default to their marketing portraits. */
  src?: string;
  agent?: Agent;
  /** Kept for compatibility. D shows no role on the rail. */
  role?: string;
}
export interface AgentRailProps {
  /** In D's order: Ivy, Elliot (then Cooper, Lana). Default: Ivy, Elliot. */
  agents?: RailAgent[];
  /** Selected agent id: gets the gradient ring and aria-pressed="true". */
  value?: string;
  onChange?: (id: string) => void;
  /** "Add agent" (+). Pass false to hide it. */
  onAdd?: (() => void) | false;
  addLabel?: string;
  /** Swaps the menu button's label between "Hide navigation" and "Show navigation" (D). */
  navHidden?: boolean;
  onToggleNav?: () => void;
  onSettings?: () => void;
  onHelp?: () => void;
  /** Replaces the default Hide navigation / Settings / Help buttons. */
  tools?: React.ReactNode;
  /** Workspace button content. Default: D's CSS mark (corner brackets and dot, 20x20, rail-mark on primary-workspace). A string swaps in an image. Pass false to hide the button. */
  logo?: string | false;
  workspaceLabel?: string;
  onWorkspace?: () => void;
  /** Items for the workspace account menu (YOUR TEAMS, Account, Team settings, ...). Rendered with `DropdownMenu`, opening to the right of the rail, bottom-aligned with the button (D). */
  workspaceMenu?: any[];
  /** Landmark label. Default "Workspace" (D). */
  label?: string;
  className?: string;
}
/** The 56px left rail: agent portraits, Add agent, the Hide navigation / Settings / Help tools and the workspace button. */
export declare function AgentRail(props: AgentRailProps): React.ReactElement;

export interface NavItem {
  id?: string;
  label: React.ReactNode;
  /** Right-aligned figure in `muted`: Inbox 12, Payments 3, Approvals 6, member fidelity 91. */
  count?: React.ReactNode;
  current?: boolean;
  href?: string;
  /** Leading 16px lucide glyph ("plus" for "Add profile"). */
  icon?: IconName;
  /** Initials for a 32px `Avatar` (team members, "L" for Limelight). */
  avatar?: string;
  avatarVariant?: 1 | 2 | 3;
  /** Renders a non-interactive italic muted line ("Onboarding in progress"). */
  note?: boolean;
  /** Children make the row expandable. Top level: a group toggle that only toggles (Campaigns, Team). Second level: a row that navigates and toggles (a team member). */
  children?: NavItem[];
  /** Initial (or, with `onToggle`, controlled) expansion. Default: open for top-level groups, closed below. */
  expanded?: boolean;
  /** How children render. indent = 12px-inset 12px rows (Campaigns, default at top level); flat = rows like the top level (Team members); tree = 1px rule, 11px centred rows (a member's pages, default below top level). */
  nest?: 'indent' | 'flat' | 'tree';
  /** Icon buttons on a top-level group header row (Team: Search team, Add member). */
  actions?: { icon: IconName; label: string; onClick?: () => void }[];
}
export interface SidebarProps {
  /** Identity block: name ("Ivy") and role line ("Creator outreach", "Employee advocacy"). */
  agent?: { name: React.ReactNode; role?: React.ReactNode };
  /** Sections under UPPERCASE labels: WORKSPACE, TEAM OPERATIONS, SETUP. */
  sections: { label?: string; items: NavItem[] }[];
  /** Fires for every row click, group toggles included. */
  onNavigate?: (item: NavItem, e: React.MouseEvent) => void;
  /** Fires when a row expands or collapses. With it, an item's `expanded` becomes controlled. */
  onToggle?: (item: NavItem, expanded: boolean) => void;
  /** Landmark label. Default "Main navigation" (D). */
  label?: string;
  className?: string;
}
/** The 186px nav column: agent identity, UPPERCASE section labels, 36px rows with counts, collapsible groups and a third-level tree. */
export declare function Sidebar(props: SidebarProps): React.ReactElement;

export interface PageHeaderProps {
  /** The destination. "/" renders as " · " ("Inbox/Sequences" reads "Inbox · Sequences"). */
  title: React.ReactNode;
  /** Heading element. Default h3 (D). */
  titleAs?: 'h1' | 'h2' | 'h3';
  /** Extra controls, placed before "Approvals". */
  actions?: React.ReactNode;
  /** Live pending count: renders the outlined "Approvals [n]" button (sm, 30px). */
  approvals?: React.ReactNode;
  onApprovals?: () => void;
  /** While true, the "Chat with {agent}" pill follows the Approvals button. */
  panelHidden?: boolean;
  agent?: Agent;
  /** Name on the pill. Default: `agent` capitalised. */
  agentName?: string;
  onShowAssistant?: () => void;
  className?: string;
}
/** The 64px sticky bar above the page: destination crumb on the left, "Approvals [n]" and the reopen pill on the right. */
export declare function PageHeader(props: PageHeaderProps): React.ReactElement;

export interface ReopenAssistantProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  agent?: Agent;
  /** Name in the label ("Chat with Elliot"). Default: `agent` capitalised, else "Ivy". */
  agentName?: string;
  /** Accessible name. Default "Chat with {agent}, show assistant" (EXCEPTION: D's "Show assistant" omits the visible text). */
  label?: string;
}
/** The mint "Chat with {agent}" pill: the only way to show a hidden agent panel. */
export declare function ReopenAssistant(props: ReopenAssistantProps): React.ReactElement;

export interface SectionHeadingProps {
  title: React.ReactNode;
  /** detail = campaign detail h1 (22px) with one action and a tabs row; page = page title (26px) with optional eyebrow and subtitle. Default: page when `eyebrow` or `description` is set, else detail. */
  variant?: 'detail' | 'page';
  /** UPPERCASE line above a page title, in D's data case ("Ivy / Inbox"). */
  eyebrow?: React.ReactNode;
  /** agent = D .ws-eyebrow (ink); team = D .ops-kicker ("LIMELIGHT / YOUR TEAM", 500, heading-kicker). */
  eyebrowTone?: 'agent' | 'team';
  /** 14px muted subtitle under a page title. */
  description?: React.ReactNode;
  /** Right-side control(s). `action` is the pre-change name. */
  action?: React.ReactNode;
  actions?: React.ReactNode;
  /** A full-width row under the title (the campaign Tabs). */
  children?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
}
/** The title block of a view: the campaign detail heading with its action and tabs, or a page title with eyebrow and subtitle. */
export declare function SectionHeading(props: SectionHeadingProps): React.ReactElement;

export interface TabItem { id: string; label: React.ReactNode; content?: React.ReactNode; count?: React.ReactNode; }
export interface TabsProps {
  tabs: TabItem[];
  value?: string; defaultValue?: string; onChange?: (id: string) => void;
  /** underline = campaign detail tabs (Creators / Brief / Calendar / Performance); pill = D's page tab lists (Inbox, Payments, Approvals, Knowledge, Analytics). */
  variant?: 'underline' | 'pill';
  /** Accessible name of the tablist. Default "Sections". */
  label?: string;
  className?: string;
}
/** Tabs that switch the sections of a view, as an underlined row or D's grey pill track. */
export declare function Tabs(props: TabsProps): React.ReactElement;

export type SegOption = string | { value: string; label: React.ReactNode };
export interface SegmentedControlProps {
  options: SegOption[];
  value?: string; defaultValue?: string; onChange?: (v: string) => void;
  /** sm = 34px track, 25px items, 12px (filter bar List / Kanban); md = 36px track, 28px items, 14px (Kanban / List, Month / Week / List). */
  size?: 'sm' | 'md';
  /** Accessible name of the tablist. Default "View". */
  label?: string;
  className?: string;
}
/** A grey track of 2-4 options that switches how the same data is shown (List / Kanban). */
export declare function SegmentedControl(props: SegmentedControlProps): React.ReactElement;

// ===== B-panel =====

/** One entry of a DropdownMenu. Pass an item, `{separator: true}` or `{section: "QUICK ACTIONS"}`. */
export type DropdownMenuEntry =
  | {
      id?: string;
      /** Item title in D's case ("Create campaign brief", "Team settings"). */
      label: React.ReactNode;
      /** Second line in menu-desc ("Draft with Ivy, review in the campaign panel"). Makes the title bold (600). Also linked with aria-describedby. */
      description?: React.ReactNode;
      /** Short text beside the title on the same line ("Owner" in the account menu). */
      meta?: React.ReactNode;
      /** 16px lucide glyph before the text, in the tone's accent (Ivy #397965 by default, Elliot #4674B6). */
      icon?: IconName;
      /** Per-item accent. Defaults to the menu's `tone`. */
      tone?: 'ivy' | 'elliot';
      /** Shows a check after the title and announces "(current)". The account menu's current team. */
      selected?: boolean;
      /** Destructive item: danger-ink title and icon ("Delete thread"). */
      danger?: boolean;
      /** Skipped by arrow keys and not selectable. Say why in `description`: it stays at full opacity (ENG-3773). */
      disabled?: boolean;
      /** Called after the menu closes and focus returns to the trigger. */
      onSelect?: (item: DropdownMenuEntry) => void;
    }
  | { separator: true }
  | { section: React.ReactNode };

/** Props handed to the `trigger` render function. Spread all of them, `ref` included, on the trigger (a DOM button or the DS `Button`, which forwards refs). */
export interface DropdownMenuTriggerProps {
  ref: React.Ref<HTMLElement>;
  id: string;
  'aria-haspopup': 'menu';
  'aria-expanded': 'true' | 'false';
  'aria-controls'?: string;
  onClick: (e: React.MouseEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export interface DropdownMenuProps {
  /** Render function for the opener: `(props) => h('button', props, 'Build with Ivy')`. A plain element is accepted but then gets no wiring. */
  trigger: ((props: DropdownMenuTriggerProps) => React.ReactElement) | React.ReactElement;
  items: DropdownMenuEntry[];
  /** Accessible name of the menu. Defaults to the trigger's text (aria-labelledby). */
  label?: string;
  /** Edge of the trigger the menu aligns to. D's Build menus: "end". */
  align?: 'start' | 'center' | 'end';
  /** Side the menu opens on; it flips when it does not fit. D's Build menus: "top"; the rail account menu: "right". */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Gap between trigger and menu in px. Default 8 (D's Build menus). D's rail account menu uses 10, the kebab menu 6. */
  offset?: number;
  /** Fixed width in px. Default: content width between 270 and 340 (D min-width / max-width). */
  width?: number;
  /** Menu accent: icon colour and highlighted ground. Build with Ivy = "ivy", Build with Elliot = "elliot"; omit for neutral menus. */
  tone?: 'ivy' | 'elliot';
  /** Called with the chosen item after its own `onSelect`. */
  onSelect?: (item: DropdownMenuEntry) => void;
  open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void;
  /** Class on the wrapper (display: contents) and on the menu surface. */
  className?: string; menuClassName?: string;
}
/** D's Radix dropdown ("build-menu"): white surface, 1px line-menu, radius 10, shadow-menu, 6px padding, z-menu. Items are 12x14 padded rows (icon + title + description, or a single label). Keyboard (Radix): Enter / Space / ArrowDown open on the first item; ArrowUp / ArrowDown / Home / End move without wrapping; Enter / Space choose; typing jumps to a label; Tab stays in the menu; Escape closes and returns focus to the trigger. A press outside only closes the menu (modal, as in D). */
export declare function DropdownMenu(props: DropdownMenuProps): React.ReactElement;

export interface AgentPanelProps {
  /** The RAIL agent: the panel identity on every page, shared pages included (decision 6). */
  agent?: Agent;
  /** Name used in the landmark label; defaults from `agent`. */
  agentName?: string;
  /** Landmark name. Default "{Name} assistant" (D). */
  label?: string;
  /** "Agent opens views" switch. On by default (D). */
  opensViews?: boolean; defaultOpensViews?: boolean; onOpensViewsChange?: (v: boolean) => void;
  /** Toolbar: New conversation (plus), History (clock), Open full view (panel-left), Hide assistant (chevron-right). */
  onNew?: () => void; onHistory?: () => void; onExpand?: () => void; onHide?: () => void;
  /** Replaces the four default toolbar icon buttons. */
  actions?: React.ReactNode;
  /** The composer footer, usually a `ChatComposer`. */
  composer?: React.ReactNode;
  /** Body content: the thread, or on an empty thread `AgentSignature` + the destination's card(s). */
  children?: React.ReactNode;
  /** Shows the 10px resize separator on the left edge. Default true. */
  resizable?: boolean;
  /** Panel width in px (controlled). Feed it to AppShell's `chatWidth` and persist it ('limelight-chat-width'). */
  width?: number;
  /** Uncontrolled start width and the double-click reset value. Default 300 (--chat-width). */
  defaultWidth?: number;
  onWidthChange?: (width: number) => void;
  /** Default 260. */
  minWidth?: number;
  /** Default min(440, viewport - 862), recomputed on resize. */
  maxWidth?: number;
  /** Extra key handler on the separator; call preventDefault to take over. */
  onResizeKey?: (e: React.KeyboardEvent) => void;
  /** false renders nothing (hidden, session-only). Going from false to true moves focus into the panel (decision 5): to the element marked `data-lla-panel-focus`, else the composer input, else the aside. */
  open?: boolean;
  /** Focus the panel's focus target on mount (use when the consumer mounts it on reopen). */
  autoFocus?: boolean;
  className?: string; style?: React.CSSProperties;
}
/** The right-hand assistant aside: 64px toolbar, scrolling body on the shared panel ground, composer footer, and a keyboard-operable resize separator. */
export declare function AgentPanel(props: AgentPanelProps): React.ReactElement | null;

/** The agent's identity at the top of the panel body: 96px portrait in a 140px white ring, the "{ Ivy }" pill and the role line. */
export declare function AgentSignature(props: {
  agent?: Agent;
  /** Display name inside the pill; defaults from `agent`. */
  name?: string;
  /** Role line. Defaults: Ivy "Creator partnerships", Elliot "Employee advocacy". */
  role?: React.ReactNode;
  /** Portrait image for agents without a D crop (Cooper, Lana). Ignored for Ivy and Elliot. */
  src?: string;
  size?: number;
  /** Portrait accessible name. Defaults to `name`. */
  alt?: string;
  className?: string;
}): React.ReactElement;

export interface StatItem { label: React.ReactNode; value: React.ReactNode; }
/** Two-column grid of labelled numbers inside a panel card (Shortlisted 67 / Contacted 27 ...). */
export declare function StatGrid(props: { items: StatItem[]; className?: string }): React.ReactElement;

export interface InsightAction { id?: string; label: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; icon?: IconName; }
export interface InsightCardProps {
  /** Card heading: one sentence that states the finding. */
  title: React.ReactNode;
  body?: React.ReactNode;
  /** Small caps line above the title, in the data's own case. Muted when alone ("IVY · INBOX"); ink-strong when paired with `badge` ("IVY’S READ ON THE WALLET"). */
  eyebrow?: React.ReactNode;
  /** Neutral badge at the right of the eyebrow row ("Payment review", "2 need your nod"). */
  badge?: React.ReactNode;
  /** Renders a StatGrid after the body. */
  stats?: StatItem[];
  /** Neutral full-width tags ("Q2 is the backlog"). */
  tags?: React.ReactNode[];
  /** Card buttons. Up to 3 in D. */
  actions?: InsightAction[];
  /** row (default) = 36px outlined buttons that wrap, 8px gap, 14px above (Payments, Analytics, Elliot cards). stack = tags and 32px full-width buttons in a 10px-gap column, first one primary (Ivy Campaigns / Creators card). */
  actionLayout?: 'row' | 'stack';
  /** Extra content after the stats (e.g. an inline `Badge` "Review required"). */
  children?: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4';
  label?: string; className?: string;
}
/** The destination's card in the assistant panel on an empty thread: optional eyebrow and badge, the finding, a reason, stats, tags and up to three actions. */
export declare function InsightCard(props: InsightCardProps): React.ReactElement;

/** "Build with Ivy" / "Build with Elliot": the 30px selector in the composer row. With `items` it opens its own DropdownMenu (top, end). */
export declare function AgentSelector(props: {
  agent?: Agent; name?: string;
  /** Portrait for agents without a D crop. Ignored for Ivy and Elliot. */
  src?: string;
  /** Menu entries. Omit to render a bare trigger and handle `onClick` yourself. */
  items?: DropdownMenuEntry[];
  onSelect?: (item: DropdownMenuEntry) => void;
  side?: 'top' | 'bottom'; align?: 'start' | 'end'; menuWidth?: number;
  menuOpen?: boolean; defaultMenuOpen?: boolean; onMenuOpenChange?: (open: boolean) => void;
  /** Bare-trigger mode only: sets aria-expanded. */
  open?: boolean; onClick?: () => void;
  children?: React.ReactNode; className?: string;
}): React.ReactElement;

/** The panel footer: the two Build-with selectors, then the "Ask your team anything…" input and the Send button. Enter sends; the input clears after send. */
export declare function ChatComposer(props: {
  selectors?: React.ReactNode;
  onSend?: (text: string) => void;
  value?: string; defaultValue?: string; onValueChange?: (v: string) => void;
  /** Default "Ask your team anything…". */
  placeholder?: string;
  /** Input accessible name. Default "Ask your team". */
  label?: string;
  /** Default "Send message". */
  sendLabel?: string;
  className?: string;
}): React.ReactElement;

/** The "FROM THE PANEL" card that reports what the panel just did ("I opened the Brief tab."). The text is a live status region. */
export declare function PanelNote(props: {
  children: React.ReactNode;
  /** Default "FROM THE PANEL". */
  label?: React.ReactNode;
  /** D's fallback note: the text sits in a surface-note inset with 12px padding. */
  inset?: boolean;
  /** false drops role="status". */
  live?: boolean;
  ariaLabel?: string; className?: string;
}): React.ReactElement;

/** Elliot's header above his card: "What should we work on today?" and "Quick starts for {destination}. Or ask Elliot anything." Not shown on Analytics, Knowledge or Getting started. */
export declare function PanelGreeting(props: {
  /** Fills the subline: "Quick starts for Content. Or ask Elliot anything." */
  destination?: string;
  agent?: Agent; agentName?: string;
  /** Default "What should we work on today?". */
  title?: React.ReactNode;
  /** Replaces the generated subline. */
  subtitle?: React.ReactNode;
  as?: 'h2' | 'h3';
  className?: string;
}): React.ReactElement;

/** A suggested task in the panel (Ivy Campaigns / Performance): a 20px glyph, the task, one line of why, and a small "{Agent} →" link with a surface-hover ground on hover. Stack them with a 10px gap. */
export declare function TaskCard(props: {
  /** lucide glyph: sparkles (discovery), message-circle (negotiations), notebook-pen (draft), lightbulb (inspiration). */
  icon?: IconName;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Agent that runs the task; its name is the link label. */
  agent?: Agent; agentName?: string;
  /** Overrides the link label. */
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  as?: 'h2' | 'h3' | 'h4';
  label?: string; className?: string;
}): React.ReactElement;

// ===== C-chat =====

export interface ChatMessageProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** 'user' renders the "You" bubble, indented 26px on the left. Omit `agent` for a user message too. */
  role?: 'user' | 'agent';
  /** The agent that wrote the message. Sets the author label ("Ivy", "Elliot"). One thread spans both agents, so set it per message. */
  agent?: Agent;
  /** Override the author label ("You", "Ivy"). */
  author?: React.ReactNode;
  /** Plain message text: 12px muted-panel, pre-wrap (D's `p`). */
  text?: React.ReactNode;
  /** Rich content: 14px ink (D's in-message flow HTML, status bubble, flow steps with `frame="none"`). Renders after `text`. */
  children?: React.ReactNode;
}
/** One message in the shared "Your team" thread: white card, 1px line-insight, shadow-card, radius 10, the author on top. */
export declare function ChatMessage(props: ChatMessageProps): React.ReactElement;

export interface StatusStat { value: React.ReactNode; label: React.ReactNode; }
export interface StatusLink { label: React.ReactNode; onClick?: () => void; /** Trailing icon. Default 'arrow-right' (D's "→"). Pass null for none. */ icon?: IconName | null; }
export interface StatusBubbleProps {
  agent: Agent;
  author?: React.ReactNode;
  /** "Q2 SaaS Growth · as of today" / "This week · employee advocacy". */
  title: React.ReactNode;
  /** Four figures in a 2x2 grid: 42 In pipeline, 21 Replied, 9 Signed, $11.4K Committed. */
  stats: StatusStat[];
  /** Full-width outlined links: "4 replies need you", "3 payments due". */
  links?: StatusLink[];
  className?: string;
}
/** The agent's status answer to "How are we doing today?": a message with a title, a 2x2 stat grid and outlined links. */
export declare function StatusBubble(props: StatusBubbleProps): React.ReactElement;

export interface FlowAction { id?: string; label: React.ReactNode; primary?: boolean; variant?: 'primary' | 'secondary'; icon?: IconName; onClick?: () => void; disabled?: boolean; }
export interface FlowChoice { id?: string; label: React.ReactNode; /** Muted second line ("42 creators in pipeline", "VP Marketing"). */ description?: React.ReactNode; selected?: boolean; onClick?: () => void; }
export interface FlowOption { /** Letter shown on the left: "A", "B", "C". */ key: string; label: React.ReactNode; onClick?: () => void; }
export interface FlowAnswer { /** Letter ("C"). Omit for the pencil mark D uses after five options. */ key?: string; placeholder?: string; label?: string; sendLabel?: string; onSubmit?: (text: string) => void; }
export interface FlowChip { label: React.ReactNode; icon?: IconName; onClick?: () => void; }
export interface FlowStepCardProps {
  /** card = the panel card (1px line, radius 10, 16px padding); none = no frame, for a step inside an agent ChatMessage (Elliot's draft steps). */
  frame?: 'card' | 'none';
  agent?: Agent;
  /** "STEP 1 OF 3". Pass it in D's upper case. */
  eyebrow?: React.ReactNode;
  /** h3: "Which campaign?", "Confirm the ICP", "Priya Nair". */
  title?: React.ReactNode;
  /** Right of the title, usually a ScoreChip (96). */
  aside?: React.ReactNode;
  /** 14px ink lead line for in-message steps: "Drafting as <b>Sarah</b>." */
  lead?: React.ReactNode;
  /** Native select under the lead (Elliot's "Post author" / "Interviewee"). */
  picker?: { label: string; options: { value: string; label: string }[]; value?: string; defaultValue?: string; onChange?: (value: string) => void };
  /** Muted paragraph(s): "This is the ICP I will search against for Q2 SaaS Growth. Right?" */
  description?: React.ReactNode | React.ReactNode[];
  /** Label / value pairs: WHO, BUDGET, PLATFORMS; AUDIENCE OVERLAP, WHY THIS CAMPAIGN, TRACK RECORD. */
  fields?: { label: React.ReactNode; value: React.ReactNode }[];
  /** 14px question above lettered options: "Do you already have a specific topic or story in mind…" */
  prompt?: React.ReactNode;
  options?: FlowOption[];
  /** Free-text answer row under the options, with an arrow-up send button. */
  answer?: FlowAnswer;
  /** Auto-width response chips: "Generate now" (sparkles), "Different question", "Send to Approvals". */
  chips?: FlowChip[];
  /** Small muted line: "Creator 1 of 5 · 0 selected"; in-message: "David publishes with one tap…". */
  note?: React.ReactNode;
  /** Stacked full-width outlined choices (campaigns, team members). */
  choices?: FlowChoice[];
  actions?: FlowAction[];
  /** stack = full-width, 8px gap (Looks right / Change the ICP); inline = auto-width buttons that wrap (Open campaign brief / Close brief assistant). */
  actionsLayout?: 'stack' | 'inline';
  /** An answered in-message step: controls dim and the opaque reason line shows (ENG-3773). */
  disabled?: boolean;
  /** Default "You answered this step. Continue below." */
  disabledReason?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
/** One step of a scripted chat flow (Ivy discovery and brief, Elliot draft): eyebrow, title, fields, choices and actions in slots. */
export declare function FlowStepCard(props: FlowStepCardProps): React.ReactElement;

export interface RunCardProps {
  /** run = mirror + live steps + confirm; offer = the "Open {dest}" button shown when Agent opens views is off; ready = "Your draft is ready…" card with "Open composer". Inferred from the props when omitted. */
  kind?: 'run' | 'offer' | 'ready';
  agent?: Agent;
  /** "You want the week ahead. I'm counting anything scheduled or approved…" */
  mirror?: React.ReactNode;
  steps?: React.ReactNode[];
  /** Steps finished (controlled). Omit and set `animate` to tick one step every `interval` ms like D (620). */
  progress?: number;
  animate?: boolean;
  interval?: number;
  /** Change it to restart the animation. */
  runId?: string | number;
  stepsLabel?: string;
  /** "Fill the two empty days from the ideas backlog?" Shows when every step is done. */
  question?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  fixLabel?: React.ReactNode;
  /** true = "Looks right", false = "A few things to fix". */
  onAnswer?: (confirmed: boolean) => void;
  /** offer: destination name ("Calendar" gives "Open Calendar"), or `offer.label`. */
  dest?: string;
  offer?: { label?: React.ReactNode; onClick?: () => void };
  onOffer?: () => void;
  /** ready: card text and button. */
  text?: React.ReactNode;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  className?: string;
}
/** An agent run in the chat: what it heard, the steps it works through, and the confirm question; plus its offer button and ready card. */
export declare function RunCard(props: RunCardProps): React.ReactElement;

export interface BusyBarProps {
  /** "Adding creators" (Ivy discovery) / "Working with Elliot" (Elliot draft flows). */
  label: React.ReactNode;
  actionLabel?: React.ReactNode;
  /** "Start over": cancels the flow and keeps the user's message. */
  onStartOver?: () => void;
  className?: string;
}
/** The line above the composer while a scripted flow runs: what the agent is doing, and "Start over". */
export declare function BusyBar(props: BusyBarProps): React.ReactElement;

export interface ChatSummary { id: string; title: string; pinned?: boolean; }
export interface ConversationHistoryProps {
  chats: ChatSummary[];
  /** The open thread: grey row with "Current conversation"; clicking it does nothing. */
  currentId?: string;
  onSelect?: (id: string, chat: ChatSummary) => void;
  onTogglePin?: (id: string, pinned: boolean) => void;
  onNewChat?: () => void;
  /** The "Open full view" icon button (dialog layout only). Pass null to hide it. */
  onOpenFull?: (() => void) | null;
  /** dialog = inside the "Conversation history" Dialog; column = the full view's left column (divider, own scroll, no full-view button). */
  layout?: 'dialog' | 'column';
  /** Search text (titles only). Controlled with onQueryChange, or uncontrolled with defaultQuery. */
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (q: string) => void;
  newChatLabel?: string; openFullLabel?: string; searchLabel?: string; searchPlaceholder?: string; currentLabel?: string; emptyLabel?: string;
  className?: string;
}
/** The conversation list: New chat, Open full view, a title search and pinnable rows. Renders inside Dialog or as the full view's column. */
export declare function ConversationHistory(props: ConversationHistoryProps): React.ReactElement;

export interface FullViewDialogProps {
  open: boolean;
  onClose: () => void;
  /** Default "Your team · Conversations". */
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  label?: string;
  initialFocus?: React.RefObject<HTMLElement>;
  /** History column (see ConversationHistory). */
  chats: ChatSummary[];
  currentId?: string;
  onSelect?: (id: string, chat: ChatSummary) => void;
  onTogglePin?: (id: string, pinned: boolean) => void;
  onNewChat?: () => void;
  query?: string; defaultQuery?: string; onQueryChange?: (q: string) => void;
  /** The thread: ChatMessage / StatusBubble elements (12px gap, aria-live polite). */
  children?: React.ReactNode;
  /** Flow cards, run cards and the BusyBar under the thread. */
  flow?: React.ReactNode;
  /** "Back to workspace" closes the dialog and keeps the thread in the panel. Defaults to onClose. */
  onBack?: () => void;
  backLabel?: React.ReactNode;
  /** Replace the built-in input + Send form. The full view has no Build menus. */
  composer?: React.ReactNode;
  onSend?: (text: string) => void;
  placeholder?: string;
  sendLabel?: string;
}
/** The "Your team · Conversations" full dialog: history column, the thread, "Back to workspace" and a composer without Build menus. */
export declare function FullViewDialog(props: FullViewDialogProps): React.ReactElement;

// ===== D-overlays =====

/* ---------- Overlays (portaled to <body>; the root carries the .lla-overlay scope: system face, black ink, shadcn buttons) ---------- */

export interface DialogProps {
  open: boolean;
  /** Called on Escape, a scrim click and the X. Focus returns to the element that opened the dialog. */
  onClose?: () => void;
  /** 18px/18px 600 system title ("Add agent", "Conversation history"). */
  title?: React.ReactNode;
  /** Muted line under the title. D shows "Limelight · Local prototype" on every dialog (the default). Pass null to hide it. */
  subtitle?: React.ReactNode | null;
  /** Body. Laid out as a 16px-gap column; plain paragraphs render at 16px/24px. */
  children?: React.ReactNode;
  /** Action row under the body (8px gap, start-aligned, as D's .ws-actions). */
  footer?: React.ReactNode;
  /** centered = 512px (default); full = min(1100px, 95vw) x 90dvh ('Your team · Conversations'). */
  size?: 'centered' | 'full';
  /** Width override for a centered dialog (px number or CSS length). */
  width?: number | string;
  /** Accessible name when there is no visible title. */
  label?: string;
  /** Element to focus on open. Default: the first focusable element in the body (D's Radix behaviour). */
  initialFocus?: React.RefObject<HTMLElement>;
  /** dialog (default) or alertdialog. */
  role?: 'dialog' | 'alertdialog';
  /** id(s) of the element that describes the dialog. Default: the subtitle. AlertDialog passes its warning text. */
  describedBy?: string;
  className?: string;
}
/** shadcn Dialog as D renders it: scrim (black 80%), 1px frame, radius 8, shadow-lg, 24px padding, 16px gap. No open or close animation. */
export declare function Dialog(props: DialogProps): React.ReactElement | null;

export interface AlertDialogProps {
  open: boolean;
  title: React.ReactNode;
  /** One paragraph, or an array of paragraphs (D's delete confirm has two). 14px/21.7px flow-muted. */
  description?: React.ReactNode | React.ReactNode[];
  /** Extra content after the description. */
  children?: React.ReactNode;
  /** D's copy: "Delete from Limelight". Rendered as the dark overlay primary. */
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  onConfirm?: () => void;
  /** Also called on Escape, the scrim and the X. */
  onCancel?: () => void;
  /** Marks a destructive confirm. D keeps the dark primary fill for it; focus always starts on Cancel. */
  danger?: boolean;
  subtitle?: React.ReactNode | null;
  label?: string;
  className?: string;
}
/** Confirmation dialog (role alertdialog, described by its warning text): D's "Delete thread from Limelight?". Cancel is outlined, the confirm is the #18181B primary. */
export declare function AlertDialog(props: AlertDialogProps): React.ReactElement | null;

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  /** default variant: the muted line (defaults to "Limelight · Local prototype"). review variant: the role line ("VP Marketing · series-B SaaS"). */
  subtitle?: React.ReactNode | null;
  /** review variant: uppercase eyebrow ("CREATOR REVIEW"). An array renders a second item after a 1px rule. */
  eyebrow?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode;
  /** default variant: action row at the end of the content. review variant: the sticky footer; pass an array of groups (decisions, pager) to spread them to both ends. */
  footer?: React.ReactNode | React.ReactNode[];
  /** review variant: content above the footer actions, usually a Notice variant="drawer" ("Yuki Hayashi: marked not a fit." + Undo). */
  notice?: React.ReactNode;
  /** 600 = creator review; 640 = booking, approvals, post detail, configure workflow. Defaults by variant. */
  width?: 600 | 640 | number;
  /** review = D's creator review frame (Arial, fixed header and footer, scrolling body); default = D's 640px side dialog (the whole panel scrolls). Inferred from `eyebrow` or width 600 when omitted. */
  variant?: 'default' | 'review';
  /** review variant: initials for the 44px header avatar ("EG"). */
  initials?: string;
  /** review variant: custom media in place of the avatar. */
  media?: React.ReactNode;
  /** review variant: extra header content under the identity (status chip and social links row, metrics). */
  header?: React.ReactNode;
  label?: string;
  initialFocus?: React.RefObject<HTMLElement>;
  className?: string;
}
/** Right-side, full-height drawer over the black 80% scrim. Escape, the scrim and the X close it; focus is trapped and returns to the opener. */
export declare function Drawer(props: DrawerProps): React.ReactElement | null;

export interface SheetConfirmCopy { title?: React.ReactNode; description?: React.ReactNode; confirmLabel?: React.ReactNode; cancelLabel?: React.ReactNode; }
export interface SheetProps {
  open: boolean;
  /** Called when the sheet really closes: directly, or after "Discard changes" when `dirty`. */
  onClose?: () => void;
  /** Inter 18px/27px 550 title in the gradient header ("Create sequence"). */
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Header controls before the X, e.g. a primary Button "Save". Buttons inside the sheet take D's .seq-btn look. */
  actions?: React.ReactNode;
  /** Optional bottom bar (right-aligned, 1px seq-line top rule). D's builder has none. */
  footer?: React.ReactNode;
  /** When true, Escape and the X open the discard confirm instead of closing. The scrim ignores clicks (D). */
  dirty?: boolean;
  /** Discard confirm copy. Defaults are D's: "Discard this sequence?", "Keep editing", "Discard changes". Pass false to close without asking. */
  confirm?: SheetConfirmCopy | false;
  /** Centered width instead of D's full inset (24px from every edge). */
  width?: number | string;
  label?: string;
  initialFocus?: React.RefObject<HTMLElement>;
  className?: string;
}
/** The sequence builder's near-full-screen sheet (Inter, radius 14, gradient header) with its discard confirm. */
export declare function Sheet(props: SheetProps): React.ReactElement | null;

export interface KebabMenuProps {
  /** Accessible name of the 32x32 trigger. Default "Thread actions". */
  label?: string;
  /** Same entries as DropdownMenu: `{id, label, icon?, danger?, disabled?, onSelect?}`, `{separator: true}` or `{section}`. D: Hide thread (eye-off) / separator / Delete thread (trash-2, danger). */
  items: DropdownMenuEntry[];
  /** Accessible name of the menu. Defaults to `label`. */
  menuLabel?: string;
  /** Trigger glyph. Default ellipsis-vertical. */
  icon?: IconName;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom';
  /** Menu width. D: 190. */
  width?: number;
  open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void;
  className?: string; triggerClassName?: string;
}
/** "⋮" actions menu built on group B's DropdownMenu, restyled to D's thread menu (190px, radius 10, 14px system items, kebab-hover). */
export declare function KebabMenu(props: KebabMenuProps): React.ReactElement;

export interface SnackbarAction { label: React.ReactNode; onClick?: () => void; /** Accessible name when the label needs context ("Dismiss payment confirmation"). */ ariaLabel?: string; }
export interface SnackbarProps {
  open: boolean;
  /** Bold first line ("Payment complete · $2,800 to Alex Rivera"). */
  title?: React.ReactNode;
  /** Message line, or any node. */
  message?: React.ReactNode;
  /** Outlined buttons with visible ink labels ("View payments", "View approvals"). */
  actions?: SnackbarAction[];
  /** Adds a trailing "Dismiss" button and is called by it (and by the toast timer). */
  onClose?: () => void;
  /** Label of the added dismiss button, or false to omit it. */
  dismissLabel?: string | false;
  /** Accessible name of the dismiss button, e.g. "Dismiss payment confirmation". */
  closeLabel?: string;
  /** snackbar = D's Inbox payment bar (540px, snackbar-fill); toast = the sequence builder toast (Inter, seq-toast-fill, auto-hides). */
  variant?: 'snackbar' | 'toast';
  /** Auto-dismiss delay in ms. Toast default 4200 (D); snackbar default 0 (stays). */
  duration?: number;
  className?: string;
}
/** Fixed bottom-centre status bar on a dark ground (role status, z-snackbar). */
export declare function Snackbar(props: SnackbarProps): React.ReactElement | null;

/* ---------- Feedback ---------- */

export interface NoticeProps {
  /** banner = D .ws-notice (green fill, 13px, action at the right); inline = D .inbox-notice (no fill, 14px, action after the text); drawer = D .cr-undo (lavender, Arial 11px, underlined text action). */
  variant?: 'banner' | 'inline' | 'drawer';
  /** Banner fill. D only shows success; info / warning / danger reuse D's note, warning and reject fills. danger is announced as an alert. */
  tone?: 'success' | 'info' | 'warning' | 'danger';
  /** Show a 16px tone icon before the text. D shows none (default false). */
  icon?: boolean;
  /** A Button ("Undo", "Undo delete", "Dismiss"), or `{label, onClick}` (a text link in the drawer variant). */
  action?: React.ReactNode | { label: React.ReactNode; onClick?: () => void; ariaLabel?: string };
  children?: React.ReactNode;
  className?: string;
}
/** One-sentence confirmation after an action, with an optional Undo. A live region (status). */
export declare function Notice(props: NoticeProps): React.ReactElement;

export interface EmptyStateProps {
  /** center = D .empty (tables, calendar, performance; muted, centred, 40px padding); card = D .ops-empty (dashed card, 19px title); inline = D .inbox-empty (thread list); column = Kanban "Empty"; flow = gated flow copy; text = a plain line in an overlay; drawer = D .cr-empty. */
  variant?: 'center' | 'card' | 'inline' | 'column' | 'flow' | 'text' | 'drawer';
  title?: React.ReactNode;
  /** Body sentence. */
  children?: React.ReactNode;
  /** One action (Button). */
  action?: React.ReactNode;
  /** Optional lucide glyph above the title. D shows none. */
  icon?: IconName;
  /** Heading element. Defaults: h2 (card), strong (drawer), h3 (others). */
  as?: 'h2' | 'h3' | 'h4' | 'strong' | 'p';
  /** id for the body, so a disabled control can point at it with aria-describedby. */
  bodyId?: string;
  role?: string;
  className?: string;
}
/** What a view shows when it has nothing to list, in D's words ("No matching conversations", "You’re caught up."). */
export declare function EmptyState(props: EmptyStateProps): React.ReactElement;

export interface ProgressBarProps {
  /** 0-100. */
  value: number;
  /** Accessible name ("Setup progress"). */
  label?: string;
  /** Spoken value. Default "{value}%". */
  valueText?: string;
  /** checklist = 4px, radius 6, gradient-progress on checklist-track (default); primary = D's shadcn Progress: 8px, full radius, primary on progress-track-primary (Waiting on, Getting started page). */
  variant?: 'checklist' | 'primary';
  className?: string; style?: React.CSSProperties;
}
export declare function ProgressBar(props: ProgressBarProps): React.ReactElement;

export interface ChecklistStep {
  label: React.ReactNode;
  /** done / current / todo. Without a current step, the first step that is not done is current. */
  state?: 'done' | 'current' | 'todo';
  /** Hint under the current step ("Run discovery against a campaign brief, then save the ones worth approaching."). `description` is accepted as an alias. */
  hint?: React.ReactNode;
  description?: React.ReactNode;
}
export interface ChecklistPopoverProps {
  steps: ChecklistStep[];
  title?: React.ReactNode;
  /** Region name. Default "Getting started checklist". */
  label?: string;
  /** Overrides the percent computed from done steps. */
  percent?: number;
  /** Line shown when every step is done. Default "All set. You can revisit any step." */
  completeText?: React.ReactNode;
  onStep?: (index: number) => void;
  /** Shows the Dismiss (X) button and is called by it. */
  onClose?: () => void;
  /** Called with the new minimised state. */
  onMinimize?: (minimized: boolean) => void;
  minimized?: boolean; defaultMinimized?: boolean; onMinimizedChange?: (minimized: boolean) => void;
  /** Fixed floating card at z-floating (below every overlay), draggable by its header and movable 20px per arrow key. */
  floating?: boolean;
  /** Position of the floating card. Default x = rail width + 12 (clear of the rail tools), y = viewport height - 420 (D). Clamped 8px inside the viewport. */
  position?: { x: number; y: number }; defaultPosition?: { x: number; y: number }; onPositionChange?: (pos: { x: number; y: number }) => void;
  /** Called with the delta after a keyboard move. */
  onMove?: (delta: { x: number; y: number }) => void;
  className?: string;
}
/** The floating "Getting started" checklist: percent, Georgia title, gradient progress bar, five steps. */
export declare function ChecklistPopover(props: ChecklistPopoverProps): React.ReactElement;

// ===== E-forms =====

/** Field look, one per D form:
 * default = shadcn form dialogs (Invite teammate, Edit Ivy) and page fields: 12px label, 8px gap, 36px field, 14px text.
 * toolbar = filter-bar field, 12px text, label usually hidden.
 * settings = Team settings: UPPERCASE 10px label, 13px text.
 * plain = unstyled dialog forms (Edit ritual, Add a source): 16px/24 label, no gap, 12.8px hint.
 * targeting = Internal campaign targeting: 14px/500 label, 8px gap, 36px field with shadow-sm, radius 7, values at 500.
 * flow = Record external payment: 14px/500 label, 6px gap, 43.7px field, no shadow, radius 7, values at 500.
 * portal = creator portal pricing form: Arial, line-height 22.4px, 44.4px field, values at 500. */
export type FieldVariant = 'default' | 'toolbar' | 'settings' | 'plain' | 'targeting' | 'flow' | 'portal';

export interface FormFieldProps {
  /** Visible label above the control. Never rely on the placeholder alone. */
  label?: React.ReactNode;
  /** Keep the label for assistive tech only (toolbar fields). */
  hideLabel?: boolean;
  /** Muted helper line under the control, tied with aria-describedby. */
  hint?: React.ReactNode;
  /** Error line under the control (D's plain text, role="alert"). Sets aria-invalid. Reuse D's strings, e.g. "Enter a positive post rate or bundled price, using at most two decimal places." */
  error?: React.ReactNode;
  /** Why the control is off (ENG-3773). Rendered in opaque muted text while `disabled` and tied with aria-describedby. */
  disabledReason?: React.ReactNode;
  variant?: FieldVariant;
  /** Extra class on the <input>/<textarea>. */
  inputClassName?: string;
}

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, FormFieldProps {}
/** Labelled single-line field (36px, radius 6, shadow-sm, control-border). */
export declare function TextInput(props: TextInputProps): React.ReactElement;

export interface NumberInputProps extends TextInputProps { min?: number | string; max?: number | string; step?: number | string; }
/** Number field with tabular figures and the browser's native stepper, as in D (Budget ($), Relevancy floor (%), Sponsored post rate). Put the unit in the label. */
export declare function NumberInput(props: NumberInputProps): React.ReactElement;

export interface DateInputProps extends TextInputProps {
  /** ISO date (yyyy-mm-dd). D: Record external payment max = today. Compare the value yourself and give the disabled submit button a disabledReason (ENG-3773). */
  max?: string; min?: string;
  /** 'date' (default) or 'datetime-local' (Edit ritual "Next run"). */
  type?: 'date' | 'datetime-local';
}
/** D's native date field, sized like a text field. */
export declare function DateInput(props: DateInputProps): React.ReactElement;

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, Omit<FormFieldProps, 'variant'> {
  /** default = Inbox reply composer; voice = Tone of Voice (padding 14, min 120, ink-strong); targeting / flow = Internal campaign targeting (radius 7, min 130); portal = creator portal Notes (4 rows, 22.4px lines); plain / settings / toolbar as the field variants. */
  variant?: FieldVariant | 'voice';
  /** With maxLength, shows D's counter "592/3000 characters" under the field. */
  showCount?: boolean;
  /** Counter noun (default "characters"). */
  counterLabel?: string;
}
/** Multi-line field: Inbox reply composer (default), Tone of Voice (voice), Internal campaign targeting (targeting), creator portal (portal). */
export declare function Textarea(props: TextareaProps): React.ReactElement;

/** Filter-bar search: 12px text with a 16px search glyph 10px from the left. `label` is the accessible name ("Search creators"). D's 14px Inbox "Search conversations…" has no glyph: use TextInput there. */
export declare function SearchInput(props: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & { label?: string }): React.ReactElement;

export type SelectOption = string | { value: string; label: React.ReactNode; disabled?: boolean };
export interface SelectProps {
  options: SelectOption[];
  value?: string; defaultValue?: string; onChange?: (value: string) => void;
  /** Inline UPPERCASE label before the trigger ("Status" renders STATUS, 9px muted). */
  inlineLabel?: string;
  /** Accessible name of the trigger ("Sort creators"). Hidden unless `showLabel`. */
  label?: string;
  /** Show `label` as a field label above the trigger (Edit Ivy "Autonomy", Edit ritual "Approval mode"). */
  showLabel?: boolean;
  placeholder?: string;
  /** toolbar = 36px / 12px (filter bar, default); sm = 30px / 12px (Sort in the BulkBar); md = 36px / 14px (Inbox filter card, dialogs). */
  size?: 'toolbar' | 'sm' | 'md';
  /** Trigger width in px or CSS length: 100 in the filter bar, 150 for Sort. */
  width?: number | string;
  /** Fill the container width (Inbox filter card, dialog fields). */
  block?: boolean;
  hint?: React.ReactNode; error?: React.ReactNode;
  disabled?: boolean; disabledReason?: React.ReactNode;
  variant?: FieldVariant;
  /** Open on mount (previews). */
  defaultOpen?: boolean;
  id?: string; className?: string; style?: React.CSSProperties;
}
/** shadcn Select: a combobox trigger and a portaled listbox (system face, 32px options, check at the right). */
export declare function Select(props: SelectProps): React.ReactElement;

/** shadcn Switch (36x20) with an 11px label ("Agent opens views"). The change applies at once. */
export declare function Toggle(props: { label?: React.ReactNode; ariaLabel?: string; checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void; disabled?: boolean; disabledReason?: React.ReactNode; id?: string; className?: string; style?: React.CSSProperties }): React.ReactElement;

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode; hideLabel?: boolean;
  /** Parent "some selected" state. */
  indeterminate?: boolean;
  /** Muted line under the label ("Every agent can draw on it, not just Elliot writing in this voice."). */
  description?: React.ReactNode;
  disabledReason?: React.ReactNode;
  /** default = page (Getting started, Tone of Voice: 14px/21, text colour from context); flow = Ivy flow dialogs (10px gap, 14px/21.7 flow-ink); plain = unstyled dialogs (Add a source: 16px/24, description as a plain line). */
  variant?: 'default' | 'flow' | 'plain';
}
/** D's native 13px checkbox (Chrome rendering: #767676 border, #0075FF fill) with a 14px label. */
export declare function Checkbox(props: CheckboxProps): React.ReactElement;

export interface RadioCardProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'title'> {
  /** Bold 12px title ("Member"). */
  title: React.ReactNode;
  /** 12px line under the title ("Can use agents and run campaigns."). */
  description?: React.ReactNode;
}
/** One bordered radio choice (D .settings-choice). Use it inside RadioCardGroup. */
export declare function RadioCard(props: RadioCardProps): React.ReactElement;

export interface RadioCardGroupProps {
  /** Legend above the cards. */
  label?: React.ReactNode; hideLabel?: boolean;
  options: (string | { value: string; title?: React.ReactNode; label?: React.ReactNode; description?: React.ReactNode; disabled?: boolean })[];
  value?: string; defaultValue?: string; onChange?: (value: string) => void;
  name?: string; disabled?: boolean; disabledReason?: React.ReactNode;
  className?: string; style?: React.CSSProperties;
}
/** Fieldset of RadioCards (Invite teammate: Member / Admin). Arrow keys move the choice (native radios). */
export declare function RadioCardGroup(props: RadioCardGroupProps): React.ReactElement;

/** Removable chip: the whole outlined 36px button removes the value ("😂 ×", "× Waiting on the creator"). Without onRemove it renders a static chip. */
export declare function Chip(props: { children?: React.ReactNode; onRemove?: () => void; removeLabel?: string; iconPosition?: 'end' | 'start'; size?: 'md' | 'sm'; className?: string; style?: React.CSSProperties }): React.ReactElement;

/** Toggle chip with a count pill (Inbox "All campaigns 5"). Counts show 0 too. */
export declare function FilterChip(props: {
  label: React.ReactNode; count?: number;
  selected?: boolean; onClick?: () => void;
  /** Singular noun for D's accessible name: unit "conversation" gives "Q2 SaaS Growth, 4 conversations". */
  unit?: string; ariaLabel?: string;
  className?: string; style?: React.CSSProperties;
}): React.ReactElement;

/** D's "Add a source" upload box: title, native file input and a format line. Drop a file anywhere on the box. */
export declare function FileDropzone(props: {
  /** Box title (default "Drop a file here, or browse"). */
  label?: React.ReactNode;
  /** Format line ("MP3, MP4, DOCX, PDF, Markdown and more · up to 2GB"). */
  hint?: React.ReactNode;
  accept?: string; name?: string; ariaLabel?: string;
  onChange?: (file: File | null) => void;
  /** "Choose a file to add." / "Choose a file smaller than 2GB." */
  error?: React.ReactNode;
  disabled?: boolean; disabledReason?: React.ReactNode;
  id?: string; className?: string; style?: React.CSSProperties;
}): React.ReactElement;

/** Filter row above a table: SearchInput · Select (inlineLabel) · SegmentedControl · ResultCount · primary Button. */
export declare function FilterBar(props: { label?: string; children?: React.ReactNode; className?: string; style?: React.CSSProperties }): React.ReactElement;
/** The "20 of 20" count, a polite live status. */
export declare function ResultCount(props: { shown: number; total: number; className?: string }): React.ReactElement;

export interface BulkBarProps {
  /** "20 need review" toggle button. */
  reviewCount?: number; onReview?: () => void;
  /** The need-review filter is on: primary fill and aria-pressed. */
  reviewActive?: boolean;
  selectedCount?: number;
  /** D: Relevancy, Newest added, Oldest added. */
  sortOptions?: SelectOption[]; sort?: string; defaultSort?: string; onSortChange?: (value: string) => void;
  /** Accessible name of the sort select (default "Sort creators"). */
  sortLabel?: string;
  children?: React.ReactNode; className?: string; style?: React.CSSProperties;
}
/** The bar between the filters and the table: review toggle, selection count, sort select. */
export declare function BulkBar(props: BulkBarProps): React.ReactElement;

// ===== F-tables =====

/** Platform keys. linkedin, x and youtube render D's text marks "in", "𝕏", "▶"; instagram and tiktok render the words. */
export type Platform = 'linkedin' | 'x' | 'youtube' | 'instagram' | 'tiktok';

export interface Column<R = any> {
  key: string;
  /** Header text. The creator density upper-cases it with CSS; the compact density shows it as given (D: "Sent By", "Created At"). */
  header: React.ReactNode;
  /** Column width, e.g. "40%" (D's creator table: 40 / 10 / 12 / 10 / 13 / 15%). */
  width?: string | number;
  /** Figures: SFMono 12px -0.04em tabular in the creator density; tabular only in the compact density. */
  numeric?: boolean;
  align?: 'right';
  sort?: 'ascending' | 'descending';
  render?: (row: R, index: number) => React.ReactNode;
}
export interface DataTableProps<R = any> {
  columns: Column<R>[];
  rows: R[];
  /** Row field used as the React key (default "id"). */
  rowKey?: string;
  /** Screen-reader caption ("Creators in Q2 SaaS Growth"). */
  caption?: string;
  /** creator (default) = 38px UPPERCASE header on surface-nav, 16px 6px cells, ~89px rows; compact = 40px Title Case header, 8px cells, ~59px rows (Payments). */
  density?: 'creator' | 'compact';
  /** Row keys shown as selected (surface-subtle ground, aria-selected). D uses none. */
  selected?: any[];
  /** Sticky header. D's tables do not stick; off by default. */
  sticky?: boolean;
  /** Text under the header when there are no rows. D: "No creators match these filters." */
  empty?: React.ReactNode;
  className?: string;
}
export declare function DataTable<R = any>(props: DataTableProps<R>): React.ReactElement;

export interface CreatorCellProps {
  /** Display name on the button (D's long display names wrap). */
  name: string;
  /** Short name for the accessible name "Review {shortName}" (D: "Review Eli Garrison"). Defaults to name. */
  shortName?: string;
  /** Initials; derived from shortName when omitted. */
  initials?: string;
  /** Row status in D's words: New, Accepted, Rejected, Contacted, Proposal, Added. Shown UPPERCASE inside the name button. */
  status?: string;
  /** Badge text as given (overrides status). */
  badge?: React.ReactNode;
  /** Badge tone; derived from the text like D when omitted (NEW / ACCEPTED / CONTACTED positive, others neutral). */
  badgeTone?: 'neutral' | 'positive' | 'warning' | 'success';
  /** Role line ("VP Marketing · series-B SaaS"). */
  role?: React.ReactNode;
  /** Added line ("Added 14 Sept"). */
  added?: React.ReactNode;
  /** Initials tint 1-3. Inside a DataTable the row number sets it (1, 2, 3 repeating) like D. */
  variant?: 1 | 2 | 3;
  /** Opens the creator review drawer. */
  onOpen?: () => void;
  className?: string;
}
export declare function CreatorCell(props: CreatorCellProps): React.ReactElement;

export interface PlatformIconsProps {
  platforms: Platform[];
  /** table (default) = 16px bold marks in primary ink; inline = marks at 16px inside a running text line (KanbanCard). */
  tone?: 'table' | 'inline';
  className?: string;
}
/** Platform text marks. The group is one image named "LinkedIn, X". */
export declare function PlatformIcons(props: PlatformIconsProps): React.ReactElement;

export interface RowActionsProps {
  /** Short creator name used in every button name ("Accept Eli Garrison"). */
  name?: string;
  /** pending/new = Accept + Reject; accepted/contacted = Message; rejected = "Rejected" badge; proposal = "Review with Ivy" badge; added = "Added" badge. */
  state?: 'pending' | 'new' | 'accepted' | 'contacted' | 'rejected' | 'proposal' | 'added';
  onAccept?: () => void;
  onReject?: () => void;
  onMessage?: () => void;
  /** Kept for compatibility. D puts Undo in the "Creator review saved." notice above the table, not in the row. A lone Message button hovers in the reject tones, as in D. */
  onUndo?: () => void;
  className?: string;
}
export declare function RowActions(props: RowActionsProps): React.ReactElement;

export interface CampaignCardProps {
  /** Campaign name; the only button on the card. */
  name: React.ReactNode;
  /** Status badge text ("Running", "Draft"). Tone follows D: Running positive, others neutral. */
  status?: React.ReactNode;
  statusTone?: 'neutral' | 'positive' | 'warning' | 'success';
  /** "42 creators in pipeline". */
  subline?: React.ReactNode;
  /** Three stats: Contacted / Replied / Signed. */
  stats?: { value: React.ReactNode; label: React.ReactNode }[];
  /** Selected card: gradient-selected, selected-border, shadow-selected; the title gets aria-current. */
  selected?: boolean;
  /** Title click. Switch the campaign and keep the current tab. */
  onSelect?: () => void;
  className?: string;
}
export declare function CampaignCard(props: CampaignCardProps): React.ReactElement;

export interface CampaignGridProps {
  /** Region name (default "Campaigns"). */
  label?: string;
  /** CampaignCard elements; three per row. */
  children?: React.ReactNode;
  /** Shows the "+ New campaign" ghost button under the cards. */
  onNew?: () => void;
  newLabel?: React.ReactNode;
  className?: string;
}
/** The campaign card row: 3 columns, 12 x 14px gaps, 20px bottom padding, 1px line, 28px margin. */
export declare function CampaignGrid(props: CampaignGridProps): React.ReactElement;

export interface KanbanCardProps {
  id?: string;
  name: React.ReactNode;
  /** Short name for "Review {shortName} in pipeline". */
  shortName?: string;
  initials?: string;
  variant?: 1 | 2 | 3;
  platforms?: Platform[];
  /** "48.2K followers" (joined to the marks with " · "). */
  meta?: React.ReactNode;
  /** Role or rate line ("B2B Growth Strategist · ex-Loom", "$1,800"). */
  detail?: React.ReactNode;
  score?: number;
  /** Opens the creator review drawer. */
  onOpen?: () => void;
  /** Accessible name override. */
  label?: string;
  className?: string;
}
export declare function KanbanCard(props: KanbanCardProps): React.ReactElement;

export interface KanbanColumn<C = any> {
  id?: string;
  /** Column title as D writes it ("Discovered", "DRAFT"). */
  title: React.ReactNode;
  /** Count badge; defaults to cards.length. */
  count?: number;
  cards?: C[];
  /** Empty-column text; default "Empty" (D). */
  empty?: React.ReactNode;
}
export interface KanbanBoardProps<C = any> {
  columns: KanbanColumn<C>[];
  /** Card renderer; defaults to KanbanCard with the card object as props. Elliot passes PostCard. */
  renderCard?: (card: C, column: KanbanColumn<C>) => React.ReactNode;
  /** pipeline (default) = open 210px columns (Creators); lanes = 205px columns on kanban-lane-fill (Elliot content). */
  variant?: 'pipeline' | 'lanes';
  /** Muted line above the board ("26 creators · moved by Ivy as each stage clears"). */
  summary?: React.ReactNode;
  /** Region name (default "Pipeline"). */
  label?: string;
  /** Minimum column width override. */
  columnWidth?: number | string;
  emptyText?: React.ReactNode;
  className?: string;
}
export declare function KanbanBoard<C = any>(props: KanbanBoardProps<C>): React.ReactElement;

export interface ListRowProps {
  /** Row title (12px, ink-strong, weight 400: "Slack", "Leave this organization"). */
  title?: React.ReactNode;
  /** Muted line under the title. */
  description?: React.ReactNode;
  /** id for the description, so a disabled action can point at it with aria-describedby. */
  descriptionId?: string;
  /** Right-side status (Badge "Owner"). */
  meta?: React.ReactNode;
  /** Right-side buttons ("Connect", "Leave organization"). */
  actions?: React.ReactNode;
  /** Leading avatar or portrait. */
  leading?: React.ReactNode;
  /** Pair row: muted label + value ("Autonomy  Recommended", "Current plan  Full access · complimentary"). */
  label?: React.ReactNode;
  value?: React.ReactNode;
  /** Renders the value as an underlined settings-link button ("29 attributes"). */
  onValueClick?: () => void;
  /** default = 14px padding with a settings-divider; compact = 5px padding, no divider (agent card facts). */
  density?: 'default' | 'compact';
  as?: string;
  children?: React.ReactNode;
  className?: string;
}
export declare function ListRow(props: ListRowProps): React.ReactElement;

export interface SettingsSectionProps {
  /** UPPERCASE heading ("Organization details"). */
  title: React.ReactNode;
  /** Muted line between the heading and the card ("Keys for programmatic access..."). */
  description?: React.ReactNode;
  /** Small right-aligned meta beside the heading ("1 member"). */
  meta?: React.ReactNode;
  /** Right-aligned heading action (Button "Create API key"). */
  actions?: React.ReactNode;
  /** Card content (ListRows, fields, a muted empty line). */
  children?: React.ReactNode;
  /** Something after the card: a Button ("Invite teammate") or a string note (rendered muted). */
  footer?: React.ReactNode;
  /** false = children render without the white card (Agents grid). Default true. */
  card?: boolean;
  headingLevel?: 2 | 3;
  id?: string;
  className?: string;
}
export declare function SettingsSection(props: SettingsSectionProps): React.ReactElement;

export interface SettingsHeaderProps {
  /** Small line above the title ("TEAM"). */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /** Initial in the 30px square before the title ("A"). */
  mark?: React.ReactNode;
  /** Code chip text ("team_demo_limelight"). */
  code?: React.ReactNode;
  /** Label after the chip ("Permanent team identifier"). */
  codeLabel?: React.ReactNode;
  /** Header buttons ("Reset prototype"). */
  children?: React.ReactNode;
  className?: string;
}
export declare function SettingsHeader(props: SettingsHeaderProps): React.ReactElement;

export interface DisclosureProps {
  /** Summary text ("Sharing settings", "View fit details"). */
  summary: React.ReactNode;
  /** card variant only: muted status after the summary ("Available after publishing"). */
  status?: React.ReactNode;
  children?: React.ReactNode;
  /** Key/value rows rendered as a dl (inline variant: Topics, Engagement window, Rate). */
  items?: { label: React.ReactNode; value: React.ReactNode }[];
  /** Small note at the end ("Prototype only: ...", "Confirm audience fit ..."). */
  note?: React.ReactNode;
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onToggle?: (open: boolean) => void;
  /** card (default) = framed section under the brief editor; inline = rule + 11px summary with a chevron (review drawer, Arial). */
  variant?: 'card' | 'inline';
  /** Region name for the card variant. */
  label?: string;
  className?: string;
}
export declare function Disclosure(props: DisclosureProps): React.ReactElement;

export interface SelectableTileProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
  /** Called with `value` when the tile is chosen. */
  onSelect?: (value?: string) => void;
  value?: string;
  /** tile (default) = pressed-state button (pay modal provider); radio = renders group E's RadioCard (Invite teammate role). Prefer RadioCardGroup for a whole set. */
  variant?: 'tile' | 'radio';
  /** Radio group name (radio variant). */
  name?: string;
  disabled?: boolean;
  /** Why the tile is off. Rendered as opaque muted text and tied with aria-describedby (ENG-3773). */
  disabledReason?: React.ReactNode;
  className?: string;
}
/** One choice in a single-choice set. Lay tiles out in a `.lla-tiles` row (flex, 12px gap). */
export declare function SelectableTile(props: SelectableTileProps): React.ReactElement;

export interface PortalAction {
  id?: string;
  label: React.ReactNode;
  /** The one green primary action ("Interested — share pricing"). */
  primary?: boolean;
  disabled?: boolean;
  /** id of the opaque text that says why the button is off. */
  describedBy?: string;
  onClick?: () => void;
}
export interface PortalShellProps {
  /** Wordmark (default "limelight"). */
  brand?: React.ReactNode;
  /** Top-bar context ("Limelight demo brand / Creator opportunity"). */
  context?: React.ReactNode;
  /** Demo banner ("Sample creator experience · works without a published campaign · responses stay in this demo"). */
  banner?: React.ReactNode;
  /** UPPERCASE eyebrow ("Q2 SaaS Growth · Published v1"). */
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  /** false hides the heading block (success screens). */
  heading?: boolean;
  /** At-a-glance facts (Deliverables, Compensation, Respond by). */
  glance?: { label: React.ReactNode; value: React.ReactNode }[];
  /** Brief sections with reading fields; a field with `href` renders a link with an arrow-up-right icon. */
  sections?: { title: React.ReactNode; fields?: { label: React.ReactNode; value?: React.ReactNode; href?: string }[] }[];
  /** Extra article content after the sections. */
  children?: React.ReactNode;
  /** Response aside title ("Interested in the opportunity?"). */
  asideTitle?: React.ReactNode;
  /** Aside intro ("No Limelight account needed. A response is not an agreement."). */
  asideIntro?: React.ReactNode;
  /** Stacked portal buttons in the aside. */
  actions?: PortalAction[];
  /** Custom aside content (a response form, the reason text for a disabled action). Renders before `actions`. */
  aside?: React.ReactNode;
  asideLabel?: string;
  className?: string;
}
/** The public creator page: top bar, demo banner, heading, at-a-glance, brief sections and the sticky response aside. One column at 850px and below. */
export declare function PortalShell(props: PortalShellProps): React.ReactElement;

// ===== G-teamops-inbox =====

/** Agent name as D writes it on team operations rows. */
export type OpsAgent = 'Ivy' | 'Elliot' | string;
/** The five approval kinds D creates. */
export type ApprovalKind = 'Creator reply' | 'Rate negotiation' | 'Payment approval' | 'Content approval' | 'Routine review' | 'Activity record' | string;
export type DecisionStatus = 'Pending' | 'Approved' | 'Rejected';

export interface CountHeaderProps {
  /** Kicker above the title. Default "LIMELIGHT / YOUR TEAM". Pass null to hide it. */
  kicker?: React.ReactNode | null;
  /** Page title ("Approvals", "Activity"). */
  title: React.ReactNode;
  /** Muted line under the title ("The decisions your agents need from you."). */
  description?: React.ReactNode;
  /** Big right-aligned count (34px). Omit it on Activity, which has no count. */
  count?: React.ReactNode;
  /** Caption under the count. Default "need your decision". */
  countLabel?: React.ReactNode;
  /** Filter row under the heading: search TextInput, Select filters, Pending / Approved / Rejected Tabs. Wraps on narrow widths. */
  toolbar?: React.ReactNode;
  /** Heading level of the title. Default 1. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}
/** Team operations page header: kicker, title, subtitle, the big pending count and the filter row. */
export declare function CountHeader(props: CountHeaderProps): React.ReactElement;

export interface ApprovalRowProps {
  agent: OpsAgent;
  kind: ApprovalKind;
  /** Pending shows Approve and Reject. Approved and Rejected show only Review details. Default "Pending". */
  status?: DecisionStatus;
  /** Badge text. Default: "Always review" for Rate negotiation (at every status), otherwise the status. Pass null for none. */
  badge?: React.ReactNode | null;
  /** h2 title ("Reply to Maya Chen", "Approve Michael’s post", "Payment to Alex Rivera"). */
  title: React.ReactNode;
  /** Muted context line: campaign or schedule ("Q2 SaaS Growth", "Every weekday at 10:00"). */
  context?: React.ReactNode;
  /** Proposed body, clamped to one line. */
  body?: React.ReactNode;
  /** Opens the ApprovalReviewDrawer for this item. */
  onReview?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  /** Default "Review details". */
  reviewLabel?: React.ReactNode;
  /** Title heading level. Default 2. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}
/** One decision card in the Approvals list. Action buttons are described by the title for screen readers. */
export declare function ApprovalRow(props: ApprovalRowProps): React.ReactElement;

export interface ApprovalItem {
  id?: string | number;
  agent: OpsAgent;
  kind: ApprovalKind;
  title: string;
  /** Campaign line, or "{Agent} · {date, time}" for an activity record. */
  context?: React.ReactNode;
  body?: string;
  /** Pending makes the text editable and shows the actions. Default "Pending". Activity records are always read-only. */
  status?: DecisionStatus | 'Recorded';
}
export interface ApprovalReviewDrawerProps {
  open: boolean;
  onClose: () => void;
  item: ApprovalItem | null;
  /** Controlled text of the proposed action. Uncontrolled: starts from item.body and resets when item.id changes. */
  value?: string;
  onChange?: (value: string) => void;
  /** Approve & next: approves with the (edited) text. The consumer then passes the next item, or closes after the last. Disabled while the text is blank. */
  onApprove?: (text: string, item: ApprovalItem) => void;
  /** Reject: rejects and, like Approve & next, advances to the next item. */
  onReject?: (text: string, item: ApprovalItem) => void;
  /** Default "Proposed action", or "Recorded outcome" for kind "Activity record". */
  fieldLabel?: string;
  /** Default "Approve & next". */
  approveLabel?: React.ReactNode;
  rejectLabel?: React.ReactNode;
  /** Default "Limelight · Local prototype". */
  subtitle?: React.ReactNode;
  /** Default "This prototype records the decision. It does not send messages or publish content." */
  disclaimer?: React.ReactNode;
}
/** The 640px right Drawer that reviews one approval (editable proposed action, Approve & next, Reject) or shows a read-only activity record. */
export declare function ApprovalReviewDrawer(props: ApprovalReviewDrawerProps): React.ReactElement | null;

export interface ActivityItemProps {
  agent: OpsAgent;
  /** Adds " · Example" to the meta line (D's seeded records). */
  example?: boolean;
  /** Display time ("06:57 PM"). */
  time?: React.ReactNode;
  /** Machine-readable time for the <time> element. */
  dateTime?: string;
  title: React.ReactNode;
  detail?: React.ReactNode;
  /** Opens the record in ApprovalReviewDrawer (kind "Activity record"). Pass null to hide the button. */
  onView?: (() => void) | null;
  /** Default "View record". */
  viewLabel?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}
/** One record on the Activity timeline, newest first: dot, meta line, title, detail and View record. */
export declare function ActivityItem(props: ActivityItemProps): React.ReactElement;

export interface PendingActionCardProps {
  /** Ritual name. */
  title: React.ReactNode;
  /** Default "Awaiting execution". */
  badge?: React.ReactNode;
  /** Default "Runs after a one-minute review window. Cancel to veto." */
  description?: React.ReactNode;
  onCancel?: () => void;
  /** Default "Cancel action". */
  cancelLabel?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}
/** A delayed ritual action waiting out its one-minute review window, with Cancel action. Sits above the Activity list. */
export declare function PendingActionCard(props: PendingActionCardProps): React.ReactElement;

export type RitualMode = 'Manual approval' | 'Delayed with veto' | 'Automatic';
export interface RitualCardProps {
  agent: OpsAgent;
  name: React.ReactNode;
  description?: React.ReactNode;
  /** Free text ("Every Monday at 09:00"). */
  schedule: string;
  /** Control. Default "Manual approval". */
  mode?: RitualMode;
  /** "2026-09-21 09:00". Shows "Paused" while paused. */
  next: string;
  /** Default true. false shows the Paused badge, "Resume", and disables Run now with its reason. */
  active?: boolean;
  /** "9/23/2026, 7:53:42 PM" adds "Last simulated run: …". */
  lastRun?: React.ReactNode;
  /** Approvals of this ritual. 3 or more on Manual approval shows the autonomy suggestion. */
  approvals?: number;
  /** Pause / Resume. */
  onToggle?: () => void;
  onRunNow?: () => void;
  /** Disable Run now (a review is pending in Approvals, or an action is waiting in Activity). Always pass runDisabledReason with it. */
  runDisabled?: boolean;
  /** Opaque muted text tied to Run now with aria-describedby (ENG-3773). */
  runDisabledReason?: React.ReactNode;
  /** Controlled open state of the built-in Edit ritual Dialog. */
  editOpen?: boolean;
  onEditOpenChange?: (open: boolean) => void;
  /** Mode the dialog opens with when editOpen is controlled (the suggestion opens it on "Delayed with veto"). */
  editMode?: RitualMode;
  /** Called when the dialog opens (null from Edit ritual, {mode} from Review automation option). */
  onEdit?: (preset: { mode: RitualMode } | null) => void;
  /** Save ritual. The dialog closes after it. */
  onSave?: (values: { schedule: string; next: string; mode: RitualMode }) => void;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}
/** A recurring ritual card: agent, Active/Paused, name, Schedule / Control / Next run, Pause or Resume, Edit ritual (opens a Dialog) and Run now. */
export declare function RitualCard(props: RitualCardProps): React.ReactElement;

export interface SkillCardProps {
  name: React.ReactNode;
  description?: string;
  /** Default "Use template". */
  useLabel?: React.ReactNode;
  /** Called when the card opens its Configure workflow Drawer. */
  onUse?: () => void;
  /** Saved draft text. The drawer prefills it, otherwise the description. */
  draft?: string;
  /** Save workflow draft. Shows "Workflow draft saved. Nothing has run." */
  onSaveDraft?: (text: string) => void;
  /** Controlled open state of the Configure workflow Drawer. */
  configureOpen?: boolean;
  /** Open the drawer on mount (previews). */
  defaultOpen?: boolean;
  onConfigureOpenChange?: (open: boolean) => void;
  /** Show the saved status line when the drawer opens (controlled previews). */
  saved?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}
/** A static skill template card with Use template, which opens the 640px Configure workflow Drawer. */
export declare function SkillCard(props: SkillCardProps): React.ReactElement;

export interface ThreadListItemProps {
  initials: string;
  /** Avatar tint 1-3. D uses 1 for every thread. */
  avatarVariant?: 1 | 2 | 3;
  name: React.ReactNode;
  campaign?: string;
  /** Relative time ("2h ago", "1 day"). */
  time?: string;
  /** Neutral badge ("Counter-offer", "Draft ready", "Awaiting reply", "Stalled", "Paid"). */
  status?: React.ReactNode;
  /** Last message, prefixed "Draft: " or "You: " by the consumer. */
  preview?: React.ReactNode;
  /** Adds the "Unread" mark. */
  unread?: boolean;
  /** Selected thread: 1px inbox-thread-selected frame (square corners), aria-current. */
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}
/** One flat conversation row in the Inbox thread list. Wrap rows in `<div class="lla lla-thread-list">` for D's 260px column (205px at 1150px and below, stacked at 750px and below). */
export declare function ThreadListItem(props: ThreadListItemProps): React.ReactElement;

export interface ThreadHeaderProps {
  initials: string;
  avatarVariant?: 1 | 2 | 3;
  name: React.ReactNode;
  /** "Engineering leader · ex-Datadog". */
  role?: React.ReactNode;
  /** Campaign in green ("Q2 SaaS Growth"). */
  campaign?: React.ReactNode;
  /** Opens the creator review drawer. */
  onViewCreator?: () => void;
  /** Default "View creator". An arrow-up-right glyph follows it. */
  viewLabel?: React.ReactNode;
  /** KebabMenu items: [{id:'hide', label:'Hide thread', icon:'eye-off'}, {separator:true}, {id:'delete', label:'Delete thread', icon:'trash-2', danger:true}]. */
  menuItems?: Array<Record<string, unknown>>;
  /** Default "Thread actions". */
  menuLabel?: string;
  className?: string;
}
/** The conversation header: creator, View creator link, role, campaign and the 32px Thread actions KebabMenu. */
export declare function ThreadHeader(props: ThreadHeaderProps): React.ReactElement;

export interface MessageBubbleProps {
  /** out = sent by you or Ivy (green-tint bubble, right). in = the creator (plain text, left). internal = Ivy's internal payment log (plain text, left, like in). Default "in". */
  direction?: 'in' | 'out' | 'internal';
  /** "Ivy", "Alex Rivera", "You". */
  author: React.ReactNode;
  /** Rest of the meta line, joined with " · " ("sent for you · Mon 09:14", "draft, not sent · now · Draft", "Internal payment log · Now"). */
  meta?: React.ReactNode;
  /** A draft: dashed frame, draft fill and a Review draft button. */
  draft?: boolean;
  onReviewDraft?: () => void;
  /** Default "Review draft". */
  reviewLabel?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
/** One message in a conversation. Stack bubbles in `<div class="lla lla-msg-list">` (flex column, 20px gap) so outbound ones align right. */
export declare function MessageBubble(props: MessageBubbleProps): React.ReactElement;

export interface ReadCardAction {
  label: React.ReactNode;
  onClick?: () => void;
  /** Default: the first action is primary, the rest secondary. */
  primary?: boolean;
  disabled?: boolean;
  /** Set "dialog" when the action opens an overlay. */
  haspopup?: 'dialog' | 'menu';
}
export interface ReadCardProps {
  /** Default "IVY’S READ", D's text. */
  eyebrow?: React.ReactNode;
  /** Thread status badge ("Counter-offer", "Paid"). */
  status?: React.ReactNode;
  /** 17px headline ("Accept. Alex is worth $2,800."). */
  headline: React.ReactNode;
  /** Explanation paragraph. */
  children?: React.ReactNode;
  /** Grey evidence pills ("1,240 comparable deals", "ICP 94"). */
  pills?: React.ReactNode[];
  /** Up to 4 facts in a 4-column grid ({label:"Your offer", value:"$2,500"}). */
  facts?: Array<{ label: React.ReactNode; value: React.ReactNode }>;
  /** Per-status actions: "Accept $2,800" / "Counter" / "Decline", "Review & pay" / "Edit draft" / "Skip", "View payment". */
  actions?: ReadCardAction[];
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}
/** Ivy's recommendation for the open thread: status, headline, reasoning, pills, facts and the next actions. */
export declare function ReadCard(props: ReadCardProps): React.ReactElement;

export interface InlinePaymentCardProps {
  /** review = the Review & pay form (default). record = the payment record after confirming. */
  mode?: 'review' | 'record';
  creator: string;
  campaign?: string;
  /** "$2,800". Rendered "$2,800 USD". */
  amount: string;
  currency?: string;
  /** "One native LinkedIn post". */
  deliverable?: string;
  /** Scope terms after the deliverable. Default D's organic-only sentence. */
  terms?: string;
  /** Default ["Stripe", "Lumanu"]. */
  providers?: string[];
  provider?: string;
  onProviderChange?: (provider: string) => void;
  /** Checkbox state. Confirm stays disabled until it is ticked. */
  approved?: boolean;
  onApprovedChange?: (approved: boolean) => void;
  /** Default D's demo readiness line. */
  readiness?: string;
  /** "Failed" shows D's failure sentence above the retry form, so a retry never hides it. */
  lastAttempt?: 'Failed';
  onCancel?: () => void;
  onConfirm?: (values: { provider: string }) => void;
  confirmLabel?: React.ReactNode;
  /** Record mode: "Paid", "Processing", "Recorded externally" or "Failed". */
  status?: string;
  reference?: string;
  recordNote?: string;
  /** Close payment details. */
  onClose?: () => void;
  /** Completion Snackbar (group D): {title:"Payment complete · $2,800 to Alex Rivera", detail:"Payments and Approvals updated. Simulation only.", actions:[{label:"View payments"},{label:"View approvals"}], onDismiss}. */
  confirmation?: { open?: boolean; title: React.ReactNode; detail?: React.ReactNode; actions?: Array<{ label: string; onClick?: () => void }>; onDismiss?: () => void };
  /** Region name. Default "Payment review in conversation". */
  label?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
}
/** The inline "Review & pay" card in a conversation, its Payment record, and the dark completion Snackbar. */
export declare function InlinePaymentCard(props: InlinePaymentCardProps): React.ReactElement;

// ===== H-cal-metrics-elliot-seq =====
/** Trend series drawn the way D draws them (viewBox 320x88, stretched to the box). */
export interface SparkData {
  /** Main series (8 points in D). Drawn in chart-1, or chart-2 when `bars` is set. */
  values: number[];
  /** Comparison series drawn first in chart-previous ("previous"). */
  previous?: number[];
  /** Bars drawn under the line in chart-bar ("posts"). */
  bars?: number[];
  /** Fill the 12% area under a single series. Default true. */
  area?: boolean;
  /** Accessible name of the chart image. Default "{label} trend". */
  label?: string;
}

// ---------- Calendars ----------
export type BookingStage = 'contracting' | 'brief' | 'progress' | 'revisions' | 'scheduled' | 'live';
export type PostStatus = 'published' | 'scheduled' | 'pending' | 'approved' | 'draft' | 'rejected';

export interface CalendarEventProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** booking = Ivy campaign chip (29px, stage colour); post = Elliot content card (status mark). Default booking. */
  variant?: 'booking' | 'post';
  /** booking: the booking stage. Picks fill, name colour and the 2px left mark. */
  stage?: BookingStage;
  /** booking: stage word in D's case ("Live", "In revisions"). Defaults from `stage`. Goes into the accessible name. */
  stageLabel?: string;
  /** booking: creator name ("Alex Rivera"). Truncates with an ellipsis. */
  name?: string;
  /** booking: bookings of this creator across campaigns. Shows "×2" when above 1. */
  count?: number;
  /** booking: campaign name for the tooltip ("Alex Rivera · Q2 SaaS Growth · Live"). */
  campaign?: string;
  /** post: status. Picks the 3px left mark. rejected uses the scheduled colour, as D does. */
  status?: PostStatus;
  /** post: status word announced before the title ("Published"). Defaults from `status`. */
  statusLabel?: string;
  /** post: "9:00 AM", or "Draft" when unscheduled. */
  time?: string;
  /** post: title (two lines at most). */
  title?: React.ReactNode;
  /** post: label badge ("Tips", "Feature Launch"). Falls back to the status word. */
  label?: string;
  /** post: author ("David Walsh"). Renders "in · David Walsh". */
  owner?: string;
  /** post: number of engagement steps. Adds " · 2 steps". */
  steps?: number;
  /** post: list-view size (14px context, ink text, full width). */
  block?: boolean;
}
/** One event on a calendar day: a stage-coloured booking chip or an Elliot post card. */
export declare function CalendarEvent(props: CalendarEventProps): React.ReactElement;

export interface MonthGridEvent extends CalendarEventProps { id?: string; /** ISO date "2026-05-06". */ date: string; }
export interface MonthGridProps {
  /** campaign = Ivy (Mon-first ruled grid, booking chips); content = Elliot (Sun-first day cards, post events, create button). */
  variant?: 'campaign' | 'content';
  /** content only. Default month. */
  view?: 'month' | 'week' | 'list';
  year: number;
  /** 0-based month (4 = May). */
  month: number;
  /** 0 = Sunday, 1 = Monday. Defaults: campaign 1, content 0. */
  weekStart?: 0 | 1;
  /** Rows to draw. Defaults: campaign = just enough weeks (May 2026: 5), content = 6. */
  weeks?: number;
  /** week view: any date inside the week to show. */
  weekOf?: string;
  /** content: ISO date drawn in bold ("2026-07-15"). */
  today?: string;
  events?: MonthGridEvent[];
  /** Called when an event without its own onClick is pressed (opens the booking or post drawer). */
  onOpen?: (event: MonthGridEvent) => void;
  /** content: "Create new post" on a day. Pass false to hide the buttons. */
  onCreate?: ((isoDate: string) => void) | false;
  /** Accessible name. Default "May 2026". */
  label?: string;
  /** content list view: empty text. Default "No posts match this month and these filters." */
  emptyText?: string;
  className?: string;
}
/** A month (or week, or list) of calendar days carrying booking chips or post events. */
export declare function MonthGrid(props: MonthGridProps): React.ReactElement;

export interface PartyFilterTileProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** "The creator", "Finance", "Procurement". */
  label: React.ReactNode;
  /** Deliverables this party is holding. */
  count: React.ReactNode;
  /** What it is holding: ["awaiting impressions", "in revisions"] joins with " · ". */
  reasons?: string[] | string;
  /** Text when nothing is held. Default "nothing waiting". */
  emptyText?: string;
  /** The filter is on (aria-pressed). */
  pressed?: boolean;
  /** Set when count is 0. The reason line stays opaque and describes the button. */
  disabled?: boolean;
}
/** A WAITING ON party filter: a toggle button with the party, its count and the reasons. */
export declare function PartyFilterTile(props: PartyFilterTileProps): React.ReactElement;
export declare namespace PartyFilterTile {
  /** The ruled 3-up row that holds the tiles (radius 8, 1px line dividers). */
  function Group(props: { label?: string; children?: React.ReactNode; className?: string }): React.ReactElement;
}

export interface HandoffStep { label: string; done?: boolean; /** "Omnia · procurement". "Not yet · " is prefixed when not done. */ detail?: string; }
export interface StepperProps {
  /** stage = the booking stage track; handoff = the three handoff tiles. Default stage. */
  variant?: 'stage' | 'handoff';
  /** stage: labels in order ("Contracting" … "Live"). handoff: HandoffStep[]. */
  steps: string[] | HandoffStep[];
  /** stage: index of the current stage. Every stage up to it counts as done. */
  current?: number;
  label?: string;
  className?: string;
}
/** The booking drawer's stage track, or its Contracted / Paid / Analytics submitted tiles. */
export declare function Stepper(props: StepperProps): React.ReactElement;

// ---------- Readiness ----------
export interface ReadinessListProps {
  /** payment = Pay modal checks (+ blocked notice); brief = the brief editor's readiness box. Default payment. */
  variant?: 'payment' | 'brief';
  /** payment: checks. brief: the missing things, as strings ("Time zone is missing"). Empty = "Content complete". */
  items?: { label: React.ReactNode; ok?: boolean }[] | string[];
  /** payment: the blocked notice. Omit when nothing blocks. */
  blocked?: { title?: string; body?: string | string[] };
  /** payment: id of the notice. Point the disabled "Review payment" button at it with aria-describedby. */
  noticeId?: string;
  /** brief: title override. Default "Needs review" / "Content complete". */
  title?: string;
  /** brief: text when nothing is missing. */
  completeText?: string;
  label?: string;
  className?: string;
}
/** A readiness checklist: the Pay modal's three checks with the blocked notice, or the brief's readiness box. */
export declare function ReadinessList(props: ReadinessListProps): React.ReactElement;

// ---------- Metrics ----------
export interface MetricCardProps {
  /** wallet = Payments "Your Wallet" card; stat = Analytics / Performance card with delta and sparkline; chart = titled chart card. Default stat. */
  variant?: 'wallet' | 'stat' | 'chart';
  /** stat: lg = campaign Performance tab (30px values, 38px sparkline). */
  size?: 'md' | 'lg';
  /** wallet / stat: "Balance", "Posts". */
  label?: React.ReactNode;
  /** "$12,400.00", "232K", or the chart's big number "11,140". */
  value?: React.ReactNode;
  /** wallet: "USD". */
  unit?: React.ReactNode;
  /** wallet: the action under the value (Button "Add funds"). */
  action?: React.ReactNode;
  /** wallet: note under the value ("Lifetime deposits to your wallet"). chart: muted paragraph at the end. */
  note?: React.ReactNode;
  /** stat: "+2 vs last month". */
  delta?: React.ReactNode;
  /** stat: up = metric-up green (default), down = metric-down. */
  deltaTone?: 'up' | 'down';
  /** stat / chart: the trend. */
  spark?: SparkData;
  /** chart: title in D's caps ("POSTING CADENCE"). */
  title?: React.ReactNode;
  /** chart: right-hand note ("vs 3.8 usual"). */
  aside?: React.ReactNode;
  /** chart: legend swatches instead of `aside`. series s1 = chart-1, s2 = chart-2, prev = chart-previous. */
  legend?: { label: string; series?: 's1' | 's2' | 'prev' }[];
  /** chart: coloured line under the title ("Posting 21% less than usual"). */
  headline?: React.ReactNode;
  headlineTone?: 'up' | 'down';
  /** chart: line under the big number ("engagements · +1,120 vs previous month"). */
  caption?: React.ReactNode;
  /** chart: custom body (a Gauge). */
  children?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}
/** A metric card: wallet figure, stat with delta and sparkline, or a titled chart card. */
export declare function MetricCard(props: MetricCardProps): React.ReactElement;

export interface FunnelStage { value: React.ReactNode; label: React.ReactNode; /** "4.8%" renders "4.8% of previous". */ ofPrevious?: string; }
/** The UTM conversion funnel card: four stages with values, step rates and shrinking bars. */
export declare function Funnel(props: { title?: React.ReactNode; subtitle?: React.ReactNode | false; stages: FunnelStage[]; note?: React.ReactNode; label?: string; className?: string }): React.ReactElement;

export interface GaugeProps {
  /** Position of the current marker, 0-100 (D pos 40). */
  current: number;
  /** Position of the usual tick, 0-100 (D usual 62). */
  usual?: number;
  /** Used in the default accessible name. */
  value?: React.ReactNode;
  usualLabel?: string;
  /** Accessible name. D: "Current cadence 3.0. vs 3.8 usual". */
  label?: string;
  lowLabel?: string;
  highLabel?: string;
  /** Pace groups under the scale: [{label:"BELOW PACE", items:["Jessica 0.9","Ryan 1.2"]}]. */
  groups?: { label: React.ReactNode; items?: React.ReactNode[] }[];
  className?: string;
}
/** The posting-cadence scale: a low-to-high track with the usual tick and the current marker. */
export declare function Gauge(props: GaugeProps): React.ReactElement;

// ---------- Elliot content ----------
export interface PostCardProps {
  /** card = Kanban card; row = the POST cell of the content list table. Default card. */
  variant?: 'card' | 'row';
  initials?: string;
  name?: string;
  avatarVariant?: 1 | 2 | 3;
  /** Voice fidelity score chip. Omit to show the "new" badge. */
  score?: number;
  /** "2026-09-03". */
  date?: string;
  /** Default "LinkedIn". */
  channel?: string;
  /** Post text, three lines at most. */
  body?: React.ReactNode;
  /** Shows the image placeholder. */
  image?: boolean;
  /** Draft card CTA: { label: "Send to Jordan for approval", onClick }. */
  action?: { label: React.ReactNode; onClick?: () => void };
  /** Opens the post (composer or detail drawer). */
  onOpen?: () => void;
  /** row: title. */
  title?: React.ReactNode;
  /** row: label ("Tips") for "in · Tips". */
  label?: string;
  /** row: sequence steps ("in · Tips · 2-step sequence"). */
  steps?: number;
  /** row: override the meta line. */
  meta?: React.ReactNode;
  className?: string;
}
/** An Elliot post: the Content Kanban card, or the post cell of the List view. */
export declare function PostCard(props: PostCardProps): React.ReactElement;

export interface StepCardProps {
  /** 0-based position. Names the controls "Step 1 …". */
  index?: number;
  type?: 'Reply' | 'Reaction' | 'Repost';
  onTypeChange?: (t: string) => void;
  /** Badge text. Default "auto" for the Limelight account, else "needs approval". */
  approval?: string;
  account?: string;
  accounts?: string[];
  onAccountChange?: (a: string) => void;
  delay?: string | number;
  onDelayChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: 'min' | 'hr' | 'day';
  onUnitChange?: (u: string) => void;
  /** Reply / Repost text. */
  text?: string;
  onTextChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  reaction?: 'Like' | 'Celebrate' | 'Support' | 'Insightful';
  onReactionChange?: (r: string) => void;
  onRemove?: () => void;
  className?: string;
}
/** One step of an Elliot engagement sequence: type, account, delay and the reply text or reaction. */
export declare function StepCard(props: StepCardProps): React.ReactElement;
export declare namespace StepCard {
  /** The 2px left rail that stacks the steps under the post (gap 18). */
  function Sequence(props: { label?: string; children?: React.ReactNode; className?: string }): React.ReactElement;
}

// ---------- Sequence builder ----------
export interface StepRailStep {
  /** "Step 1: Email". */
  title: string;
  /** Sender address. */
  from: string;
  /** "Reply in same thread". */
  thread?: string;
  /** "Start immediately", "Jun 10, 9:00 AM (-03)". */
  when: string;
  /** Wait shown above this step ("wait 2 business days"). */
  wait?: string;
  /** Amber warning ("Needs a subject"). */
  needs?: string;
}
export interface StepRailProps {
  steps: StepRailStep[];
  /** Index of the step open in the editor (aria-current="step"). */
  active?: number;
  onSelect?: (index: number) => void;
  /** "Add step". Pass false to hide it. */
  onAdd?: (() => void) | false;
  /** Recommendation note. Pass false to hide it. */
  note?: React.ReactNode | false;
  /** Shows the "Stop on reply" switch when set. */
  stopOnReply?: boolean;
  onStopOnReplyChange?: (on: boolean) => void;
  label?: string;
  className?: string;
}
/** The sequence builder's left rail: recommendation, Stop on reply, the step list with waits, and Add step. */
export declare function StepRail(props: StepRailProps): React.ReactElement;

export interface CadencePillProps {
  /** start = "Start immediately"; wait = editable wait + send time; mini = rail line "↳ wait 2 business days". Default wait. */
  variant?: 'start' | 'wait' | 'mini';
  amount?: string | number;
  onAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
  onUnitChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Default days, business days, weeks, months. */
  units?: string[];
  /** "9:00AM". */
  time?: string;
  onTimeChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  /** start: the bold word (default "immediately"); mini: the whole line. */
  children?: React.ReactNode;
  className?: string;
}
/** The wait between sequence steps: the start pill, the editable wait pill, or the rail's mini line. */
export declare function CadencePill(props: CadencePillProps): React.ReactElement;

export interface TokenChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** token = merge token ("Creator First Name"); command = the "AI Command" toggle with sparkles; snippets = D's neutral command chip "Snippets". */
  variant?: 'token' | 'command' | 'snippets';
  /** command: on (aria-pressed). */
  pressed?: boolean;
  icon?: IconName;
}
/** A merge token you insert into a step ("Creator First Name"), or the AI Command toggle. */
export declare function TokenChip(props: TokenChipProps): React.ReactElement;

export interface EmailPreviewProps {
  title?: string;
  /** "Ivy (David Walsh) <david@limelighthq.com>". */
  from: string;
  recipients: { value: string; label: string }[];
  recipient?: string;
  onRecipientChange?: (value: string) => void;
  /** Subject with {{Token}} placeholders. Omit on reply steps to show `threadSubject`. */
  subject?: string;
  threadSubject?: string;
  /** Body with {{Token}} placeholders. */
  body: string;
  /** Token values for the chosen recipient: { "Creator First Name": "Maya" }. */
  values?: Record<string, string>;
  testEmail?: string;
  onTestEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** "Send test". Pass false to hide the footer. */
  onSendTest?: (() => void) | false;
  onClose?: () => void;
  className?: string;
}
/** A sequence step rendered for one creator, with the recipient picker and "Send test". */
export declare function EmailPreview(props: EmailPreviewProps): React.ReactElement;
