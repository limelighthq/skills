/* @ds-bundle: {"format":4,"namespace":"LimelightApp","components":[{"name":"Icon"},{"name":"Button"},{"name":"IconButton"},{"name":"Badge"},{"name":"ScoreChip"},{"name":"CountBadge"},{"name":"AgentLabel"},{"name":"Avatar"},{"name":"AgentFace"},{"name":"AppShell"},{"name":"AgentRail"},{"name":"Sidebar"},{"name":"PageHeader"},{"name":"ReopenAssistant"},{"name":"SectionHeading"},{"name":"Tabs"},{"name":"SegmentedControl"},{"name":"DropdownMenu"},{"name":"AgentPanel"},{"name":"AgentSignature"},{"name":"StatGrid"},{"name":"InsightCard"},{"name":"AgentSelector"},{"name":"ChatComposer"},{"name":"PanelNote"},{"name":"PanelGreeting"},{"name":"TaskCard"},{"name":"ChatMessage"},{"name":"StatusBubble"},{"name":"FlowStepCard"},{"name":"RunCard"},{"name":"BusyBar"},{"name":"ConversationHistory"},{"name":"FullViewDialog"},{"name":"Dialog"},{"name":"AlertDialog"},{"name":"Drawer"},{"name":"Sheet"},{"name":"KebabMenu"},{"name":"Snackbar"},{"name":"Notice"},{"name":"EmptyState"},{"name":"ProgressBar"},{"name":"ChecklistPopover"},{"name":"TextInput"},{"name":"NumberInput"},{"name":"DateInput"},{"name":"Textarea"},{"name":"SearchInput"},{"name":"Select"},{"name":"Toggle"},{"name":"Checkbox"},{"name":"RadioCard"},{"name":"RadioCardGroup"},{"name":"Chip"},{"name":"FilterChip"},{"name":"FileDropzone"},{"name":"FilterBar"},{"name":"ResultCount"},{"name":"BulkBar"},{"name":"DataTable"},{"name":"CreatorCell"},{"name":"PlatformIcons"},{"name":"RowActions"},{"name":"CampaignCard"},{"name":"CampaignGrid"},{"name":"KanbanBoard"},{"name":"KanbanCard"},{"name":"ListRow"},{"name":"SettingsSection"},{"name":"SettingsHeader"},{"name":"Disclosure"},{"name":"SelectableTile"},{"name":"PortalShell"},{"name":"CountHeader"},{"name":"ApprovalRow"},{"name":"ApprovalReviewDrawer"},{"name":"ActivityItem"},{"name":"PendingActionCard"},{"name":"RitualCard"},{"name":"SkillCard"},{"name":"ThreadListItem"},{"name":"ThreadHeader"},{"name":"MessageBubble"},{"name":"ReadCard"},{"name":"InlinePaymentCard"},{"name":"MonthGrid"},{"name":"CalendarEvent"},{"name":"PartyFilterTile"},{"name":"Stepper"},{"name":"ReadinessList"},{"name":"MetricCard"},{"name":"Funnel"},{"name":"Gauge"},{"name":"PostCard"},{"name":"StepCard"},{"name":"StepRail"},{"name":"CadencePill"},{"name":"TokenChip"},{"name":"EmailPreview"}]} */
/* Icons: lucide (ISC License, (c) Lucide Contributors). D's own icons are copied from D's bundle (lucide-react 0.468.0). */
(function(){
  var ICONS={"arrow-left":"<path d=\"m12 19-7-7 7-7\"/><path d=\"M19 12H5\"/>","arrow-right":"<path d=\"M5 12h14\"/><path d=\"m12 5 7 7-7 7\"/>","chart-no-axes-combined":"<path d=\"M12 16v5\"/><path d=\"M16 14v7\"/><path d=\"M20 10v11\"/><path d=\"m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15\"/><path d=\"M4 18v3\"/><path d=\"M8 14v7\"/>","check":"<path d=\"M20 6 9 17l-5-5\"/>","chevron-down":"<path d=\"m6 9 6 6 6-6\"/>","chevron-left":"<path d=\"m15 18-6-6 6-6\"/>","chevron-right":"<path d=\"m9 18 6-6-6-6\"/>","chevron-up":"<path d=\"m18 15-6-6-6 6\"/>","circle-help":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"/><path d=\"M12 17h.01\"/>","clock":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/>","credit-card":"<rect width=\"20\" height=\"14\" x=\"2\" y=\"5\" rx=\"2\"/><line x1=\"2\" x2=\"22\" y1=\"10\" y2=\"10\"/>","ellipsis-vertical":"<circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"5\" r=\"1\"/><circle cx=\"12\" cy=\"19\" r=\"1\"/>","external-link":"<path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/>","eye-off":"<path d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\"/><path d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\"/><path d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\"/><path d=\"m2 2 20 20\"/>","grip-horizontal":"<circle cx=\"12\" cy=\"9\" r=\"1\"/><circle cx=\"19\" cy=\"9\" r=\"1\"/><circle cx=\"5\" cy=\"9\" r=\"1\"/><circle cx=\"12\" cy=\"15\" r=\"1\"/><circle cx=\"19\" cy=\"15\" r=\"1\"/><circle cx=\"5\" cy=\"15\" r=\"1\"/>","heart":"<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/>","inbox":"<polyline points=\"22 12 16 12 14 15 10 15 8 12 2 12\"/><path d=\"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"/>","key-round":"<path d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\"/><circle cx=\"16.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/>","lightbulb":"<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\"/><path d=\"M9 18h6\"/><path d=\"M10 22h4\"/>","megaphone":"<path d=\"m3 11 18-5v12L3 14v-3z\"/><path d=\"M11.6 16.8a3 3 0 1 1-5.8-1.6\"/>","menu":"<line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\"/><line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\"/><line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\"/>","message-circle":"<path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\"/>","message-square":"<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/>","minus":"<path d=\"M5 12h14\"/>","notebook-pen":"<path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4\"/><path d=\"M2 6h4\"/><path d=\"M2 10h4\"/><path d=\"M2 14h4\"/><path d=\"M2 18h4\"/><path d=\"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\"/>","panel-left":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M9 3v18\"/>","pencil":"<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\"/><path d=\"m15 5 4 4\"/>","pin":"<path d=\"M12 17v5\"/><path d=\"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z\"/>","play":"<polygon points=\"6 3 20 12 6 21 6 3\"/>","plus":"<path d=\"M5 12h14\"/><path d=\"M12 5v14\"/>","search":"<circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/>","send":"<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\"/><path d=\"m21.854 2.147-10.94 10.939\"/>","settings":"<path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","sparkles":"<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/><path d=\"M20 3v4\"/><path d=\"M22 5h-4\"/><path d=\"M4 17v2\"/><path d=\"M5 18H3\"/>","target":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/>","thumbs-up":"<path d=\"M7 10v12\"/><path d=\"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z\"/>","trash-2":"<path d=\"M3 6h18\"/><path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\"/><path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\"/><line x1=\"10\" x2=\"10\" y1=\"11\" y2=\"17\"/><line x1=\"14\" x2=\"14\" y1=\"11\" y2=\"17\"/>","x":"<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>","arrow-up-right":"<path d=\"M7 7h10v10\"/><path d=\"M7 17 17 7\"/>","circle-check":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m9 12 2 2 4-4\"/>","circle-alert":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\"/><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\"/>","info":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/>","triangle-alert":"<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>","circle-x":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9-6 6\"/><path d=\"m9 9 6 6\"/>","users":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/>","user-plus":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><line x1=\"19\" x2=\"19\" y1=\"8\" y2=\"14\"/><line x1=\"22\" x2=\"16\" y1=\"11\" y2=\"11\"/>","mail":"<rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\"/><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\"/>","calendar":"<path d=\"M8 2v4\"/><path d=\"M16 2v4\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M3 10h18\"/>","upload":"<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"17 8 12 3 7 8\"/><line x1=\"12\" x2=\"12\" y1=\"3\" y2=\"15\"/>","link":"<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/>","copy":"<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\"/><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"/>","eye":"<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","filter":"<polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"/>","undo-2":"<path d=\"M9 14 4 9l5-5\"/><path d=\"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11\"/>","history":"<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/><path d=\"M12 7v5l4 2\"/>","loader-circle":"<path d=\"M21 12a9 9 0 1 1-6.219-8.56\"/>","image":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\"/><circle cx=\"9\" cy=\"9\" r=\"2\"/><path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\"/>","at-sign":"<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8\"/>","file-text":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"M10 9H8\"/><path d=\"M16 13H8\"/><path d=\"M16 17H8\"/>","refresh-cw":"<path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\"/><path d=\"M21 3v5h-5\"/><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\"/><path d=\"M8 16H3v5\"/>","arrow-up-down":"<path d=\"m21 16-4 4-4-4\"/><path d=\"M17 20V4\"/><path d=\"m3 8 4-4 4 4\"/><path d=\"M7 4v16\"/>","square-pen":"<path d=\"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"/><path d=\"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z\"/>","list":"<path d=\"M3 12h.01\"/><path d=\"M3 18h.01\"/><path d=\"M3 6h.01\"/><path d=\"M8 12h13\"/><path d=\"M8 18h13\"/><path d=\"M8 6h13\"/>","kanban":"<path d=\"M6 5v11\"/><path d=\"M12 5v6\"/><path d=\"M18 5v14\"/>","layout-grid":"<rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"/>","log-out":"<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><polyline points=\"16 17 21 12 16 7\"/><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\"/>","chevrons-up-down":"<path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/>","dollar-sign":"<line x1=\"12\" x2=\"12\" y1=\"2\" y2=\"22\"/><path d=\"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"/>","wallet":"<path d=\"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1\"/><path d=\"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4\"/>","bell":"<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\"/><path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\"/>","zap":"<path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\"/>","bot":"<path d=\"M12 8V4H8\"/><rect width=\"16\" height=\"12\" x=\"4\" y=\"8\" rx=\"2\"/><path d=\"M2 14h2\"/><path d=\"M20 14h2\"/><path d=\"M15 13v2\"/><path d=\"M9 13v2\"/>","circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"/>","circle-dot":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>","grip-vertical":"<circle cx=\"9\" cy=\"12\" r=\"1\"/><circle cx=\"9\" cy=\"5\" r=\"1\"/><circle cx=\"9\" cy=\"19\" r=\"1\"/><circle cx=\"15\" cy=\"12\" r=\"1\"/><circle cx=\"15\" cy=\"5\" r=\"1\"/><circle cx=\"15\" cy=\"19\" r=\"1\"/>","maximize-2":"<polyline points=\"15 3 21 3 21 9\"/><polyline points=\"9 21 3 21 3 15\"/><line x1=\"21\" x2=\"14\" y1=\"3\" y2=\"10\"/><line x1=\"3\" x2=\"10\" y1=\"21\" y2=\"14\"/>","panel-right":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M15 3v18\"/>","rotate-ccw":"<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/>","ellipsis":"<circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"19\" cy=\"12\" r=\"1\"/><circle cx=\"5\" cy=\"12\" r=\"1\"/>","send-horizontal":"<path d=\"M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z\"/><path d=\"M6 12h16\"/>","linkedin":"<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"/><rect width=\"4\" height=\"12\" x=\"2\" y=\"9\"/><circle cx=\"4\" cy=\"4\" r=\"2\"/>","youtube":"<path d=\"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17\"/><path d=\"m10 15 5-3-5-3z\"/>","instagram":"<rect width=\"20\" height=\"20\" x=\"2\" y=\"2\" rx=\"5\" ry=\"5\"/><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"/><line x1=\"17.5\" x2=\"17.51\" y1=\"6.5\" y2=\"6.5\"/>","twitter":"<path d=\"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z\"/>","message-square-text":"<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/><path d=\"M13 8H7\"/><path d=\"M17 12H7\"/>","mail-check":"<path d=\"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8\"/><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\"/><path d=\"m16 19 2 2 4-4\"/>","square-check":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"m9 12 2 2 4-4\"/>","arrow-up":"<path d=\"m5 12 7-7 7 7\"/><path d=\"M12 19V5\"/>","dot":"<circle cx=\"12.1\" cy=\"12.1\" r=\"1\"/>","corner-down-right":"<polyline points=\"15 10 20 15 15 20\"/><path d=\"M4 4v7a4 4 0 0 0 4 4h12\"/>"};
  /* ===== Scaffold: shared helpers and core primitives (Icon, Button, IconButton, Badge, ScoreChip, CountBadge, AgentLabel, Avatar, AgentFace) ===== */
  var React=window.React,h=React.createElement,Fragment=React.Fragment,useState=React.useState,useRef=React.useRef,useEffect=React.useEffect,useLayoutEffect=React.useLayoutEffect||React.useEffect,useMemo=React.useMemo,useCallback=React.useCallback;
  var _uid=0;var useId=React.useId||function(){var r=useRef(null);if(r.current==null)r.current="lla-"+(++_uid);return r.current;};
  var EXPORTS={};function EXPORT(name,fn){EXPORTS[name]=fn;return fn;}
  function cx(){return Array.prototype.filter.call(arguments,Boolean).join(" ");}
  function omit(p,keys){var o={};for(var k in p){if(keys.indexOf(k)<0)o[k]=p[k];}return o;}
  function useControlled(value,def,onChange){
    var s=useState(def);var isC=value!==undefined;
    return [isC?value:s[0],function(v){if(!isC)s[1](v);if(onChange)onChange(v);}];
  }
  /* Close on Escape and on a pointer down outside `ref`. */
  function useDismiss(ref,open,onClose,opts){
    useEffect(function(){
      if(!open)return;
      function key(e){if(e.key==="Escape"){e.stopPropagation();onClose&&onClose(e);}}
      function down(e){if(opts&&opts.outside===false)return;if(ref.current&&!ref.current.contains(e.target))onClose&&onClose(e);}
      document.addEventListener("keydown",key,true);document.addEventListener("mousedown",down);
      return function(){document.removeEventListener("keydown",key,true);document.removeEventListener("mousedown",down);};
    },[open]);
  }
  var FOCUSABLE='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),summary';
  /* Trap Tab inside `ref` while active; focus the first focusable (or `initial`) on open; return focus to the opener on close. */
  function useFocusTrap(ref,active,initial){
    useEffect(function(){
      if(!active)return;
      var opener=document.activeElement;var el=ref.current;if(!el)return;
      var first=initial&&initial.current?initial.current:el.querySelector(FOCUSABLE);(first||el).focus();
      function key(e){if(e.key!=="Tab")return;var f=[].slice.call(el.querySelectorAll(FOCUSABLE)).filter(function(n){return n.offsetParent!==null;});if(!f.length){e.preventDefault();return;}
        var a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}}
      el.addEventListener("keydown",key);
      return function(){el.removeEventListener("keydown",key);if(opener&&opener.focus)opener.focus();};
    },[active]);
  }

  /* ---------- Icon: lucide (ISC) in the house 24px box ---------- */
  function Icon(p){
    var d=ICONS[p.name];if(!d)return null;
    var tier=p.size==="action"?"action":"indicator";
    var svg=h("svg",{className:"lla-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:p.strokeWidth||2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false",dangerouslySetInnerHTML:{__html:d}});
    return h("span",{className:cx("lla-ibox",tier,p.className),role:p.label?"img":null,"aria-label":p.label||null,"aria-hidden":p.label?null:"true",style:p.style},svg);
  }

  /* ---------- Button ---------- */
  var Button=React.forwardRef(function Button(p,ref){
    var v=p.variant||"primary";
    var rest=omit(p,["variant","size","icon","iconRight","count","block","className","children","href"]);
    var kids=[p.icon?h(Icon,{key:"i",name:p.icon,className:"lead"}):null,p.children!=null?h("span",{key:"t",className:"lla-btn-label"},p.children):null,p.count!=null?h(CountBadge,{key:"c"},p.count):null,p.iconRight?h(Icon,{key:"r",name:p.iconRight,className:"trail"}):null];
    var cls=cx("lla lla-btn",v,p.size&&p.size!=="md"&&p.size,p.block&&"block",p.className);
    if(p.href)return h("a",Object.assign({ref:ref,className:cls,href:p.href},rest),kids);
    return h("button",Object.assign({ref:ref,type:"button",className:cls},rest),kids);
  });
  var IconButton=React.forwardRef(function IconButton(p,ref){
    var rest=omit(p,["icon","label","variant","size","className","pressed","tone"]);
    var s=p.size||"md";
    return h("button",Object.assign({ref:ref,type:"button",className:cx("lla lla-ibtn",p.variant,s,p.tone,p.className),"aria-label":p.label,"aria-pressed":p.pressed!=null?(p.pressed?"true":"false"):null},rest),h(Icon,{name:p.icon,size:s==="md"?"action":"indicator"}));
  });

  /* ---------- Badges ---------- */
  function Badge(p){
    var t=p.tone||"neutral";
    return h("span",{className:cx("lla lla-badge",t,p.block&&"block",p.className)},p.children);
  }
  function ScoreChip(p){
    return h("span",{className:cx("lla lla-chip",p.className),role:"img","aria-label":(p.label||"Relevancy")+" "+p.value+(p.max?" of "+p.max:"")},h("span",{"aria-hidden":"true"},p.value));
  }
  function CountBadge(p){
    return h("span",{className:cx("lla lla-chip count",p.tone&&p.tone!=="positive"&&p.tone,p.className)},p.children);
  }
  function AgentLabel(p){return h("span",{className:cx("lla lla-agent-label",p.className)},"{ "+(p.name||p.children)+" }");}

  /* ---------- Avatars and portraits ---------- */
  function Avatar(p){
    var v=p.variant||1;
    return h("span",{className:cx("lla lla-avatar","v"+v,p.size&&p.size!=="row"&&p.size,p.className),"aria-hidden":p.label?null:"true",role:p.label?"img":null,"aria-label":p.label||null},p.initials);
  }
  /* D crops each agent portrait out of one reference image (background-size / background-position from D's CSS). */
  var PORTRAIT={
    ivy:{src:"images/Agent-references/ivy-reference.png",size:"563.333%",pos:"49.64% 82.07%"},
    elliot:{src:"images/Agent-references/elliot-reference.webp",size:"645.5%",pos:"46% 78.14%"}
  };
  function AgentFace(p){
    var s=p.size||34,c=PORTRAIT[p.agent];
    var st={width:s,height:s};
    if(p.src||!c){st.backgroundImage="url("+(p.src||"")+")";st.backgroundSize="cover";st.backgroundPosition="50% 12%";}
    else{st.backgroundImage="url("+c.src+")";st.backgroundSize=c.size;st.backgroundPosition=c.pos;}
    return h("span",{className:cx("lla lla-face",p.className),"data-agent":p.agent,role:p.name?"img":null,"aria-label":p.name||null,"aria-hidden":p.name?null:"true",style:Object.assign(st,p.style)});
  }
  EXPORT("Icon",Icon);EXPORT("Button",Button);EXPORT("IconButton",IconButton);EXPORT("Badge",Badge);EXPORT("ScoreChip",ScoreChip);EXPORT("CountBadge",CountBadge);EXPORT("AgentLabel",AgentLabel);EXPORT("Avatar",Avatar);EXPORT("AgentFace",AgentFace);

  /* ===== A-shell ===== */
  /* ---------- A-shell: AppShell, AgentRail, Sidebar, PageHeader, ReopenAssistant, SectionHeading, Tabs, SegmentedControl ---------- */
  /* Cooper and Lana are D-silent: they use the marketing portraits. Ivy and Elliot use AgentFace's D crops. */
  var A_PORTRAIT_SRC={cooper:"images/Agent-portraits/cooper-portrait.png",lana:"images/Agent-portraits/lana-portrait.png"};
  var A_DEFAULT_AGENTS=[{id:"ivy",name:"Ivy"},{id:"elliot",name:"Elliot"}];
  var A_PANEL_FOCUS='[data-lla-panel-focus],textarea:not([disabled]),input:not([disabled]):not([type="hidden"]):not([type="checkbox"]):not([type="radio"])';
  function A_norm(o){return typeof o==="string"?{value:o,label:o}:o;}
  function A_cap(s){return s?String(s).charAt(0).toUpperCase()+String(s).slice(1):s;}

  /* ---------- AppShell: rail | nav | main | panel (DOM order rail, nav, panel, main as in D) ---------- */
  function AppShell(p){
    var navHidden=!!p.navHidden||!p.sidebar;
    var panelHidden=!!p.panelHidden||!p.panel;
    var rootRef=useRef(null),panelRef=useRef(null),prev=useRef(panelHidden);
    /* Decision 5 + a11y fix: the control the user pressed disappears, so move focus to its counterpart.
       Only when focus was lost (fell to BODY); a rail agent switch that re-shows the panel keeps focus on the rail. */
    useLayoutEffect(function(){
      var was=prev.current;prev.current=panelHidden;
      if(was===panelHidden||p.manageFocus===false)return;
      var ae=document.activeElement,lost=!ae||ae===document.body||!document.body.contains(ae);
      if(!lost||!rootRef.current)return;
      if(panelHidden){var pill=rootRef.current.querySelector("[data-lla-reopen]");if(pill)pill.focus();}
      else{var el=panelRef.current;if(!el)return;
        var t=el.querySelector(A_PANEL_FOCUS)||[].filter.call(el.querySelectorAll(FOCUSABLE),function(n){return n.getAttribute("role")!=="separator";})[0];
        if(t)t.focus();}
    },[panelHidden]);
    var st=Object.assign({},p.style);
    if(p.chatWidth!=null)st["--chat-width"]=(typeof p.chatWidth==="number"?p.chatWidth+"px":p.chatWidth);
    return h("div",{ref:rootRef,className:cx("lla lla-shell",navHidden&&"nav-hidden",panelHidden&&"panel-hidden",p.className),style:st,"data-agent":p.agent||null},
      p.rail,
      navHidden?null:p.sidebar,
      panelHidden?null:h("div",{className:"lla-shell-panel",ref:panelRef},p.panel),
      h("main",{className:"lla-shell-main",id:p.mainId},p.header,h("div",{className:"lla-shell-content"},p.children)));
  }

  /* ---------- AgentRail ---------- */
  function AgentRail(p){
    var agents=p.agents||A_DEFAULT_AGENTS;
    var navHidden=!!p.navHidden;
    var tools=p.tools!==undefined?p.tools:[
      h(IconButton,{key:"n",icon:"menu",label:navHidden?"Show navigation":"Hide navigation",onClick:p.onToggleNav}),
      h(IconButton,{key:"s",icon:"settings",label:"Settings",onClick:p.onSettings}),
      h(IconButton,{key:"q",icon:"circle-help",label:"Help",onClick:p.onHelp})];
    var wsLabel=p.workspaceLabel||"Limelight workspace";
    /* D's own CSS mark (.brand-mark): two 8x8 corner brackets in 3px strokes and a 6px dot, 20x20. `logo` swaps in an image. */
    var wsImg=typeof p.logo==="string"?h("img",{src:p.logo,alt:"",width:20}):h("span",{className:"lla-rail-mark","aria-hidden":"true"},h("i"));
    var ws=null;
    if(p.logo!==false){
      if(p.workspaceMenu&&typeof DropdownMenu==="function"){
        ws=h(DropdownMenu,{label:wsLabel,items:p.workspaceMenu,align:"end",side:"right",offset:10,trigger:function(tp){return h("button",Object.assign({type:"button",className:"lla-rail-ws","aria-label":wsLabel},tp),wsImg);}});
      }else ws=h("button",{type:"button",className:"lla-rail-ws","aria-label":wsLabel,onClick:p.onWorkspace},wsImg);
    }
    return h("aside",{className:cx("lla lla-rail",p.className),"aria-label":p.label||"Workspace"},
      h("div",{className:"lla-rail-top"},
        agents.map(function(a){
          var on=a.id===p.value,ag=a.agent||a.id;
          return h("button",{key:a.id,type:"button",className:"lla-rail-agent","data-agent":ag,"aria-pressed":on?"true":"false","aria-label":a.name,onClick:function(){if(p.onChange)p.onChange(a.id);}},
            h(AgentFace,{agent:ag,src:a.src||A_PORTRAIT_SRC[ag],size:34,name:a.name}));
        }),
        p.onAdd!==false?h(IconButton,{icon:"plus",label:p.addLabel||"Add agent",onClick:p.onAdd||null,className:"lla-rail-add"}):null),
      h("div",{className:"lla-rail-bottom"},tools,ws));
  }

  /* ---------- Sidebar (nav column) ---------- */
  function A_count(it){
    if(it.count==null||it.count==="")return null;
    return h("span",{className:"lla-nav-count"},it.count);
  }
  function Sidebar(p){
    var st=useState({}),open=st[0],setOpen=st[1];
    var uid=useId();
    function keyOf(it,path){return it.id!=null?String(it.id):path;}
    function isOpen(it,k,lvl){
      if(p.onToggle&&it.expanded!==undefined)return !!it.expanded;
      if(Object.prototype.hasOwnProperty.call(open,k))return open[k];
      return it.expanded!==undefined?!!it.expanded:lvl===0;
    }
    function toggle(it,k,lvl){var n=!isOpen(it,k,lvl);var o=Object.assign({},open);o[k]=n;setOpen(o);if(p.onToggle)p.onToggle(it,n);}
    function nav(it,e){if(p.onNavigate)p.onNavigate(it,e);}
    /* One interactive row. kind: top | child (indented, 12px) | tree (third level, 11px, centred). */
    function row(it,k,kind,extra){
      var tag=it.href?"a":"button";
      var props=Object.assign({key:k,className:cx("lla-nav",kind!=="top"&&kind,extra&&extra.cls),"aria-current":it.current?"page":null,onClick:function(e){if(extra&&extra.onClick)extra.onClick(e);else nav(it,e);}},extra&&extra.attrs);
      if(tag==="a")props.href=it.href;else props.type="button";
      return h(tag,props,
        it.avatar?h(Avatar,{initials:it.avatar,size:"card",variant:it.avatarVariant||1}):null,
        it.icon?h(Icon,{name:it.icon}):null,
        h("span",{className:"lla-nav-label"},it.label),
        extra&&extra.trail?extra.trail:A_count(it));
    }
    /* Render a list of items into the flat nav column (D's DOM: rows are direct children of the column). */
    function items(list,lvl,kind,path){
      var out=[];
      (list||[]).forEach(function(it,i){
        var k=keyOf(it,path+"-"+i);
        if(it.note){out.push(h("p",{key:k,className:"lla-nav-note"},it.label));return;}
        var kids=it.children&&it.children.length;
        if(!kids){out.push(row(it,k,kind));return;}
        var o=isOpen(it,k,lvl),listId=uid+"-g-"+k.replace(/[^a-z0-9-]/gi,""),btnId=listId+"-t";
        var nest=it.nest||(lvl===0?"indent":"tree");
        var ctl=o&&nest==="indent"?listId:null; /* D: aria-controls only on the Campaigns toggle */
        var chev=h(Icon,{name:o?"chevron-up":"chevron-down",className:"lla-nav-chev"});
        var head;
        if(lvl===0&&it.actions&&it.actions.length){
          /* Group header with actions (Elliot's Team): label + chevron inline, icon buttons on the right. */
          head=h("div",{key:k,className:"lla-nav-split"},
            [h("button",{key:"t",type:"button",id:btnId,className:"lla-nav inline","aria-expanded":o?"true":"false","aria-controls":ctl,onClick:function(e){toggle(it,k,lvl);nav(it,e);}},h("span",{className:"lla-nav-label"},it.label),chev)].concat(
            it.actions.map(function(a,j){return h("button",{key:"a"+j,type:"button",className:"lla-nav-act","aria-label":a.label,onClick:a.onClick},h(Icon,{name:a.icon}));})));
        }else if(lvl===0){
          /* Collapsible group toggle (Ivy's Campaigns): full width, chevron right. Toggles only. */
          head=row(it,k,kind,{cls:"toggle",attrs:{id:btnId,"aria-expanded":o?"true":"false","aria-controls":ctl},trail:chev,onClick:function(e){toggle(it,k,lvl);nav(it,e);}});
        }else{
          /* Expandable row (a team member): navigates and toggles its children. */
          head=row(it,k,kind,{attrs:{id:btnId,"aria-expanded":o?"true":"false","aria-controls":ctl},onClick:function(e){toggle(it,k,lvl);nav(it,e);}});
        }
        var body=null;
        if(o){
          var childKind=nest==="indent"?"child":(nest==="tree"?"tree":kind);
          var rows=items(it.children,lvl+1,childKind,k);
          if(nest==="flat")body=rows;
          else body=h("div",{key:k+"-list",id:nest==="indent"?listId:null,className:nest==="indent"?"lla-nav-indent":"lla-nav-tree"},rows);
        }
        if(nest==="indent")out.push(h("div",{key:k+"-grp",className:"lla-nav-group"},head,body));
        else{out.push(head);if(body)out.push.apply(out,[].concat(body));}
      });
      return out;
    }
    var kids=[];
    if(p.agent)kids.push(h("div",{key:"id",className:"lla-side-id"},h("h2",{className:"lla-side-name"},p.agent.name),p.agent.role?h("p",{className:"lla-side-role"},p.agent.role):null));
    (p.sections||[]).forEach(function(s,i){
      if(s.label)kids.push(h("div",{key:"l"+i,className:"lla-side-label"},s.label));
      kids.push.apply(kids,items(s.items,0,"top","s"+i));
    });
    return h("nav",{className:cx("lla lla-side",p.className),"aria-label":p.label||"Main navigation"},kids);
  }

  /* ---------- ReopenAssistant: the 'Chat with {agent}' pill ---------- */
  function ReopenAssistant(p){
    var name=p.agentName||A_cap(p.agent)||"Ivy";
    var text="Chat with "+name;
    var rest=omit(p,["agent","agentName","label","className","children"]);
    return h("button",Object.assign({type:"button",className:cx("lla lla-reopen",p.className),"aria-label":p.label||(text+", show assistant"),"data-lla-reopen":""},rest),
      h(Icon,{name:"panel-right"}),h("span",null,text));
  }

  /* ---------- PageHeader ---------- */
  function PageHeader(p){
    var title=typeof p.title==="string"?p.title.replace(/\//g," · "):p.title;
    var approvals=p.approvals!=null&&p.approvals!==false?h(Button,{key:"ap",variant:"secondary",size:"sm",count:p.approvals,onClick:p.onApprovals,className:"lla-header-approvals"},"Approvals"):null;
    var pill=p.panelHidden?h(ReopenAssistant,{key:"re",agent:p.agent,agentName:p.agentName,onClick:p.onShowAssistant}):null;
    return h("header",{className:cx("lla lla-header",p.className)},
      h(p.titleAs||"h3",{className:"lla-header-title"},title),
      h("div",{className:"lla-header-actions"},p.actions,approvals,pill));
  }

  /* ---------- SectionHeading ---------- */
  function SectionHeading(p){
    var v=p.variant||(p.eyebrow||p.description?"page":"detail");
    var act=p.actions!==undefined?p.actions:p.action;
    var title=h(p.as||"h1",{className:"lla-heading-title",id:p.id},p.title);
    if(v==="detail")
      return h("div",{className:cx("lla lla-heading detail",p.className)},title,act||null,p.children?h("div",{className:"lla-heading-row"},p.children):null);
    return h("div",{className:cx("lla lla-heading page",p.eyebrowTone==="team"&&"team",p.className)},
      h("div",{className:"lla-heading-text"},
        p.eyebrow?h("span",{className:"lla-heading-eyebrow"},p.eyebrow):null,
        title,
        p.description?h("p",{className:"lla-heading-desc"},p.description):null),
      act?h("div",{className:"lla-heading-actions"},act):null,
      p.children?h("div",{className:"lla-heading-row"},p.children):null);
  }

  /* ---------- Tabs ---------- */
  function Tabs(p){
    var tabs=p.tabs||[];var id=useId();var v=p.variant||"underline";
    var st=useControlled(p.value,p.defaultValue!==undefined?p.defaultValue:(tabs[0]&&tabs[0].id),p.onChange);
    var refs=useRef([]);
    function key(e,i){var n=null;
      if(e.key==="ArrowRight")n=(i+1)%tabs.length;if(e.key==="ArrowLeft")n=(i-1+tabs.length)%tabs.length;
      if(e.key==="Home")n=0;if(e.key==="End")n=tabs.length-1;
      if(n!=null){e.preventDefault();st[1](tabs[n].id);if(refs.current[n])refs.current[n].focus();}}
    var cur=tabs.filter(function(t){return t.id===st[0];})[0];
    var hasPanel=cur&&cur.content!=null;
    return h(Fragment,null,
      h("div",{className:cx("lla lla-tabs",v,p.className),role:"tablist","aria-label":p.label||"Sections"},
        tabs.map(function(t,i){var on=t.id===st[0];
          return h("button",{key:t.id,ref:function(el){refs.current[i]=el;},type:"button",role:"tab",id:id+"-t"+i,"aria-selected":on?"true":"false","aria-controls":on&&hasPanel?id+"-p":null,tabIndex:on?0:-1,className:"lla-tab",onClick:function(){st[1](t.id);},onKeyDown:function(e){key(e,i);}},
            h("span",null,t.label),t.count!=null?h("span",{className:"lla-tab-count"},t.count):null);})),
      hasPanel?h("div",{role:"tabpanel",id:id+"-p","aria-labelledby":id+"-t"+tabs.indexOf(cur),tabIndex:0,className:"lla lla-tabpanel"},cur.content):null);
  }

  /* ---------- SegmentedControl ---------- */
  function SegmentedControl(p){
    var opts=(p.options||[]).map(A_norm);var size=p.size||"sm";
    var st=useControlled(p.value,p.defaultValue!==undefined?p.defaultValue:(opts[0]&&opts[0].value),p.onChange);
    var refs=useRef([]);
    function key(e,i){var n=null;
      if(e.key==="ArrowRight"||e.key==="ArrowDown")n=(i+1)%opts.length;
      if(e.key==="ArrowLeft"||e.key==="ArrowUp")n=(i-1+opts.length)%opts.length;
      if(e.key==="Home")n=0;if(e.key==="End")n=opts.length-1;
      if(n!=null){e.preventDefault();st[1](opts[n].value);if(refs.current[n])refs.current[n].focus();}}
    return h("div",{className:cx("lla lla-seg",size,p.className),role:"tablist","aria-label":p.label||"View"},
      opts.map(function(x,i){var on=x.value===st[0];
        return h("button",{key:x.value,ref:function(el){refs.current[i]=el;},type:"button",role:"tab","aria-selected":on?"true":"false",tabIndex:on?0:-1,className:"lla-seg-item",onClick:function(){st[1](x.value);},onKeyDown:function(e){key(e,i);}},x.label);}));
  }

  EXPORT("AppShell",AppShell);EXPORT("AgentRail",AgentRail);EXPORT("Sidebar",Sidebar);EXPORT("PageHeader",PageHeader);EXPORT("ReopenAssistant",ReopenAssistant);
  EXPORT("SectionHeading",SectionHeading);EXPORT("Tabs",Tabs);EXPORT("SegmentedControl",SegmentedControl);

  /* ===== B-panel ===== */
  /* ===== B-panel: DropdownMenu, AgentPanel, AgentSignature, InsightCard, StatGrid, AgentSelector, ChatComposer, PanelNote, PanelGreeting, TaskCard ===== */

  /* ---------- DropdownMenu (shared contract; D's Radix build-menu) ----------
     Rendered inline (not portaled) with position:fixed, so it escapes scroll clipping but stays inside the
     opener's DOM (a dialog's outside-click and focus trap still see it as inside). */
  function B_isItem(it){return it&&!it.separator&&it.section==null;}
  function DropdownMenu(p){
    var items=p.items||[];
    var st=useControlled(p.open,!!p.defaultOpen,p.onOpenChange),open=st[0],setOpen=st[1];
    var as=useState(-1),active=as[0],setActive=as[1];
    var wrapRef=useRef(null),menuRef=useRef(null),trigRef=useRef(null),focusTo=useRef("menu"),wasOpen=useRef(false),ta=useRef({s:"",t:0});
    var id=useId(),menuId=id+"-menu",trigId=id+"-trigger";
    var nav=[];items.forEach(function(it,i){if(B_isItem(it)&&!it.disabled)nav.push(i);});
    function trig(){return trigRef.current||(wrapRef.current&&wrapRef.current.querySelector('[aria-haspopup]'));}
    function itemEl(i){return menuRef.current&&menuRef.current.querySelector('[data-idx="'+i+'"]');}
    function focusItem(i){setActive(i);var el=itemEl(i);if(el)el.focus({preventScroll:false});}
    function openWith(target){focusTo.current=target;setOpen(true);}
    function close(refocus){setOpen(false);setActive(-1);if(refocus){var t=trig();if(t)t.focus();}}
    function select(i){var it=items[i];if(!it||it.disabled)return;close(true);if(it.onSelect)it.onSelect(it);if(p.onSelect)p.onSelect(it);}
    // focus on open
    useEffect(function(){
      if(open&&!wasOpen.current){var m=menuRef.current;
        if(focusTo.current==="first"&&nav.length)focusItem(nav[0]);
        else if(m)m.focus();}
      wasOpen.current=open;
    },[open]);
    // place the menu next to its trigger: side + align, `offset` px away (D: Build menus 8, account menu 10), flip when it would not fit
    useLayoutEffect(function(){
      if(!open)return;
      function place(){
        var m=menuRef.current,t=trig();if(!m||!t)return;
        var vw=document.documentElement.clientWidth,vh=window.innerHeight,g=8,off=p.offset!=null?p.offset:8;
        m.style.maxHeight=(vh-2*g)+"px";m.style.left="0px";m.style.top="0px";
        var o=m.getBoundingClientRect(),r=t.getBoundingClientRect(),mw=o.width,mh=o.height;
        var side=p.side||"bottom",align=p.align||"start",x,y;
        if(side==="top"||side==="bottom"){
          if(side==="top"&&r.top-off-mh<g&&vh-r.bottom>r.top)side="bottom";
          else if(side==="bottom"&&r.bottom+off+mh>vh-g&&r.top>vh-r.bottom)side="top";
          y=side==="top"?r.top-off-mh:r.bottom+off;x=align==="end"?r.right-mw:align==="center"?r.left+(r.width-mw)/2:r.left;
        }else{
          if(side==="right"&&r.right+off+mw>vw-g&&r.left>vw-r.right)side="left";
          else if(side==="left"&&r.left-off-mw<g&&vw-r.right>r.left)side="right";
          x=side==="left"?r.left-off-mw:r.right+off;y=align==="end"?r.bottom-mh:align==="center"?r.top+(r.height-mh)/2:r.top;
        }
        x=Math.max(g,Math.min(x,vw-mw-g));y=Math.max(g,Math.min(y,vh-mh-g));
        // o.left/o.top = where (0,0) landed: non-zero inside a transformed ancestor (a centered dialog)
        m.style.left=(x-o.left)+"px";m.style.top=(y-o.top)+"px";m.setAttribute("data-side",side);m.setAttribute("data-align",align);
      }
      place();
      window.addEventListener("resize",place);window.addEventListener("scroll",place,true);
      return function(){window.removeEventListener("resize",place);window.removeEventListener("scroll",place,true);};
    },[open,p.side,p.align,p.offset,items.length]);
    // Escape (window capture: runs before a dialog's document listener, so only the menu closes) and outside press
    useEffect(function(){
      if(!open)return;
      function key(e){if(e.key==="Escape"){e.stopPropagation();e.preventDefault();close(true);}}
      // D's Radix menu is modal: a press outside only closes the menu; the click does not reach the page
      function down(e){if(!wrapRef.current||wrapRef.current.contains(e.target))return;close(false);
        function swallow(ev){ev.stopPropagation();ev.preventDefault();}
        document.addEventListener("click",swallow,true);setTimeout(function(){document.removeEventListener("click",swallow,true);},600);
        document.addEventListener("mouseup",function once(){document.removeEventListener("mouseup",once,true);setTimeout(function(){document.removeEventListener("click",swallow,true);},0);},true);}
      window.addEventListener("keydown",key,true);document.addEventListener("mousedown",down,true);
      return function(){window.removeEventListener("keydown",key,true);document.removeEventListener("mousedown",down,true);};
    },[open]);
    function onTrigKey(e){
      var k=e.key;
      if(k==="Enter"||k===" "||k==="ArrowDown"){e.preventDefault();if(open&&k!=="ArrowDown")close(false);else openWith("first");}
    }
    function onTrigClick(e){if(open)close(false);else openWith("menu");}
    function move(dir){
      if(!nav.length)return;var pos=nav.indexOf(active);
      if(pos<0)pos=dir>0?0:nav.length-1;else pos=Math.max(0,Math.min(nav.length-1,pos+dir));
      focusItem(nav[pos]);
    }
    function onMenuKey(e){
      var k=e.key;
      if(k==="ArrowDown"){e.preventDefault();move(1);}
      else if(k==="ArrowUp"){e.preventDefault();move(-1);}
      else if(k==="Home"){e.preventDefault();if(nav.length)focusItem(nav[0]);}
      else if(k==="End"){e.preventDefault();if(nav.length)focusItem(nav[nav.length-1]);}
      else if((k==="Enter"||k===" ")&&active>=0){e.preventDefault();select(active);}
      else if(k==="Tab"){e.preventDefault();}
      else if(k.length===1&&/\S/.test(k)&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
        var now=Date.now(),s=(now-ta.current.t<700?ta.current.s:"")+k.toLowerCase();ta.current={s:s,t:now};
        var cur=nav.indexOf(active),from=cur<0?0:(s.length===1?cur+1:cur),order=nav.slice(from).concat(nav.slice(0,from));
        for(var j=0;j<order.length;j++){var lb=String(items[order[j]].label||"").toLowerCase();if(lb.indexOf(s)===0){focusItem(order[j]);break;}}
      }
    }
    var trigProps={ref:trigRef,id:trigId,"aria-haspopup":"menu","aria-expanded":open?"true":"false","aria-controls":open?menuId:undefined,onClick:onTrigClick,onKeyDown:onTrigKey};
    var trigger=typeof p.trigger==="function"?p.trigger(trigProps):p.trigger;
    function renderItem(it,i){
      var tone=it.tone||p.tone,rich=!!(it.icon||it.description||it.meta||it.selected),tid=menuId+"-t"+i,did=menuId+"-d"+i;
      var title=h(rich?"strong":"span",{className:"lla-dd-title",id:tid},it.label,it.selected?h(Icon,{name:"check"}):null,it.selected?h("span",{className:"lla-sr"}," (current)"):null);
      return h("div",{key:it.id||("i"+i),role:"menuitem",tabIndex:-1,"data-idx":i,
          className:cx("lla-dd-item",tone&&("tone-"+tone),it.danger&&"danger",it.disabled&&"disabled"),
          "data-highlighted":active===i?"":null,"aria-disabled":it.disabled?"true":null,
          "aria-labelledby":tid,"aria-describedby":it.description?did:null,
          onClick:function(){select(i);},
          onMouseMove:function(){if(!it.disabled&&active!==i)focusItem(i);}},
        it.icon?h(Icon,{name:it.icon}):null,
        it.description?h("div",{className:"lla-dd-text"},title,h("span",{className:"lla-dd-desc",id:did},it.description)):title,
        !it.description&&it.meta?h("span",{className:"lla-dd-desc"},it.meta):null);
    }
    // group items that follow a section label so screen readers hear "Quick actions, group"
    var out=[],grp=null;
    items.forEach(function(it,i){
      if(!it)return;
      if(it.separator){grp=null;out.push(h("div",{key:"s"+i,role:"separator",className:"lla-dd-sep"}));return;}
      if(it.section!=null){var lid=menuId+"-l"+i;grp={key:"g"+i,lid:lid,kids:[h("div",{key:"l",id:lid,className:"lla-dd-label",role:"presentation"},it.section)]};out.push(grp);return;}
      if(grp)grp.kids.push(renderItem(it,i));else out.push(renderItem(it,i));
    });
    out=out.map(function(o){return o&&o.kids?h("div",{key:o.key,role:"group","aria-labelledby":o.lid},o.kids):o;});
    return h("span",{ref:wrapRef,className:cx("lla-dd",p.className)},
      trigger,
      open?h("div",{ref:menuRef,id:menuId,role:"menu","aria-labelledby":p.label?null:trigId,"aria-label":p.label||null,"aria-orientation":"vertical",tabIndex:-1,
        className:cx("lla lla-dd-menu",p.tone&&("tone-"+p.tone),p.menuClassName),"data-agent":p.tone||null,
        style:p.width?{width:p.width,minWidth:0,maxWidth:"none"}:null,
        onKeyDown:onMenuKey,onMouseLeave:function(){if(active>=0){setActive(-1);if(menuRef.current)menuRef.current.focus();}}},out):null);
  }
  EXPORT("DropdownMenu",DropdownMenu);

  /* ---------- Agent panel ---------- */
  var B_NAME={ivy:"Ivy",elliot:"Elliot",cooper:"Cooper",lana:"Lana"};
  var B_ROLE={ivy:"Creator partnerships",elliot:"Employee advocacy"};
  function B_face(agent,src){return (agent==="ivy"||agent==="elliot")?undefined:src;}
  /* The "Agent opens views" switch: group E's Toggle when it is in the bundle, else the same Radix-style switch inline. */
  function B_Switch(p){
    if(typeof Toggle!=="undefined")return h(Toggle,{ariaLabel:p.label,checked:p.checked,onChange:p.onChange});
    return h("button",{type:"button",role:"switch","aria-checked":p.checked?"true":"false","aria-label":p.label,className:cx("lla-b-switch",p.checked&&"on"),onClick:function(){p.onChange&&p.onChange(!p.checked);}},h("span",{className:"lla-b-switch-thumb"}));
  }
  function AgentPanel(p){
    var agent=p.agent||"ivy",name=p.agentName||B_NAME[agent]||"Agent";
    var t=useControlled(p.opensViews,p.defaultOpensViews!==undefined?p.defaultOpensViews:true,p.onOpensViewsChange);
    var min=p.minWidth||260,def=p.defaultWidth||300;
    var ws=useControlled(p.width,def,p.onWidthChange),width=ws[0],setWidth=ws[1];
    var vs=useState(typeof window!=="undefined"?window.innerWidth:1440),vw=vs[0],setVw=vs[1];
    var ref=useRef(null),drag=useRef(null),wasOpen=useRef(p.open!==false);
    var max=p.maxWidth||Math.min(440,Math.max(min,vw-862));
    function clamp(v){return Math.max(min,Math.min(max,v));}
    useEffect(function(){function r(){setVw(window.innerWidth);}window.addEventListener("resize",r);return function(){window.removeEventListener("resize",r);};},[]);
    // decision 5: moving from hidden to shown puts focus in the panel
    // reopen focus target: an element marked data-lla-panel-focus, else the composer input, else the aside
    function focusIn(){var a=ref.current;if(!a)return;var t=a.querySelector("[data-lla-panel-focus]")||a.querySelector(".lla-composer-input")||a;t.focus();}
    useEffect(function(){var o=p.open!==false;if(o&&!wasOpen.current)focusIn();wasOpen.current=o;},[p.open]);
    useEffect(function(){if(p.autoFocus)focusIn();},[]);
    if(p.open===false)return null;
    function key(e){
      if(p.onResizeKey)p.onResizeKey(e);if(e.defaultPrevented)return;
      var k=e.key,step=20;
      if(k==="ArrowLeft")setWidth(clamp(width+step));else if(k==="ArrowRight")setWidth(clamp(width-step));
      else if(k==="Home")setWidth(min);else if(k==="End")setWidth(max);else return;
      e.preventDefault();
    }
    function down(e){if(e.button!==0)return;e.currentTarget.setPointerCapture&&e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,w:width};}
    function move(e){if(!drag.current)return;setWidth(clamp(drag.current.w+drag.current.x-e.clientX));}
    function up(e){drag.current=null;}
    var bar=p.actions||[
      h(IconButton,{key:"n",size:"toolbar",icon:"plus",label:"New conversation",onClick:p.onNew}),
      h(IconButton,{key:"h",size:"toolbar",icon:"clock",label:"History",onClick:p.onHistory}),
      h(IconButton,{key:"f",size:"toolbar",icon:"panel-left",label:"Open full view",onClick:p.onExpand}),
      h(IconButton,{key:"x",size:"toolbar",icon:"chevron-right",label:"Hide assistant",onClick:p.onHide})];
    return h("aside",{ref:ref,tabIndex:-1,className:cx("lla lla-panel",p.className),"data-agent":agent,"aria-label":p.label||(name+" assistant"),style:Object.assign({width:width},p.style)},
      p.resizable!==false?h("div",{className:"lla-panel-resize",role:"separator","aria-label":"Resize assistant","aria-orientation":"vertical","aria-valuemin":min,"aria-valuemax":max,"aria-valuenow":width,tabIndex:0,
        onKeyDown:key,onDoubleClick:function(){setWidth(clamp(def));},onPointerDown:down,onPointerMove:move,onPointerUp:up,onPointerCancel:up},h("span",{className:"lla-panel-grip"})):null,
      h("header",{className:"lla-panel-bar"},
        h(B_Switch,{label:"Agent opens views",checked:t[0],onChange:t[1]}),
        h("span",{className:"lla-panel-bar-label"},"Agent opens views"),
        bar),
      h("div",{className:"lla-panel-body"},p.children),
      p.composer?h("div",{className:"lla-panel-foot"},p.composer):null);
  }
  function AgentSignature(p){
    var agent=p.agent||"ivy",name=p.name||B_NAME[agent]||"";
    var role=p.role!==undefined?p.role:B_ROLE[agent];
    return h("div",{className:cx("lla lla-sig",p.className)},
      h(AgentFace,{agent:agent,src:B_face(agent,p.src),size:p.size||96,name:p.alt!=null?p.alt:name,className:"lla-sig-face"}),
      h(AgentLabel,{name:name}),
      role?h("span",{className:"lla-sig-role"},role):null);
  }
  function StatGrid(p){
    return h("div",{className:cx("lla lla-statgrid",p.className)},(p.items||[]).map(function(s,i){return h("div",{key:i,className:"lla-statgrid-cell"},h("span",{className:"lla-statgrid-label"},s.label),h("strong",{className:"lla-statgrid-value"},s.value));}));
  }
  function InsightCard(p){
    var Hd=p.as||"h3",layout=p.actionLayout||"row",acts=p.actions||[],tags=p.tags||[];
    var head=null;
    if(p.badge!=null)head=h("div",{className:"lla-insight-head"},h("small",{className:"lla-insight-eyebrow"},p.eyebrow),h(Badge,null,p.badge));
    else if(p.eyebrow!=null)head=h("small",{className:"lla-insight-eyebrow muted"},p.eyebrow);
    function btn(a,i){
      var v=a.variant||(layout==="stack"&&i===0?"primary":"secondary");
      return h(Button,{key:a.id||i,variant:v,size:layout==="stack"?"panel":undefined,block:layout==="stack",icon:a.icon,onClick:a.onClick},a.label);
    }
    var stack=layout==="stack"&&(tags.length||acts.length)?h("div",{className:"lla-insight-stack"},tags.map(function(t,i){return h(Badge,{key:"t"+i,block:true},t);}),acts.map(btn)):null;
    var rowTags=layout!=="stack"&&tags.length?h("div",{className:"lla-insight-stack"},tags.map(function(t,i){return h(Badge,{key:"t"+i,block:true},t);})):null;
    return h("section",{className:cx("lla lla-insight",p.className),"aria-label":p.label||null},
      head,
      p.title!=null?h(Hd,{className:"lla-insight-title"},p.title):null,
      p.body!=null?h("p",{className:"lla-insight-body"},p.body):null,
      p.stats?h(StatGrid,{items:p.stats}):null,
      p.children,
      rowTags,stack,
      layout!=="stack"&&acts.length?h("div",{className:"lla-insight-actions"},acts.map(btn)):null);
  }
  function AgentSelector(p){
    var agent=p.agent||"ivy",name=p.name||B_NAME[agent]||"";
    function button(tp){
      tp=tp||{};
      return h("button",Object.assign({type:"button",className:cx("lla lla-agentsel",p.className),"aria-haspopup":"menu","aria-expanded":p.open?"true":"false",onClick:p.onClick},tp),
        h(AgentFace,{agent:agent,src:B_face(agent,p.src),size:18}),
        h("span",{className:"lla-agentsel-label"},p.children||("Build with "+name)),
        h(Icon,{name:"chevron-down"}));
    }
    if(p.items)return h(DropdownMenu,{items:p.items,tone:agent==="elliot"?"elliot":"ivy",side:p.side||"top",align:p.align||"end",width:p.menuWidth,
      className:"lla-agentsel-dd",trigger:button,onSelect:p.onSelect,open:p.menuOpen,defaultOpen:p.defaultMenuOpen,onOpenChange:p.onMenuOpenChange});
    return button();
  }
  function ChatComposer(p){
    var s=useControlled(p.value,p.defaultValue||"",p.onValueChange),v=s[0],set=s[1];
    return h("div",{className:cx("lla lla-composer",p.className)},
      p.selectors?h("div",{className:"lla-composer-row"},p.selectors):null,
      h("form",{className:"lla-composer-form",onSubmit:function(e){e.preventDefault();if(!String(v).trim())return;p.onSend&&p.onSend(v);set("");}},
        h("input",{className:"lla-composer-input",type:"text","aria-label":p.label||"Ask your team",placeholder:p.placeholder||"Ask your team anything…",value:v,onChange:function(e){set(e.target.value);}}),
        h(IconButton,{type:"submit",variant:"solid",icon:"send",label:p.sendLabel||"Send message"})));
  }
  function PanelNote(p){
    return h("section",{className:cx("lla lla-note",p.className),"aria-label":p.ariaLabel||null},
      h("small",{className:"lla-note-label"},p.label||"FROM THE PANEL"),
      h("p",{className:cx("lla-note-text",p.inset&&"inset"),role:p.live===false?null:"status"},p.children));
  }
  function PanelGreeting(p){
    var agent=p.agent||"elliot",name=p.agentName||B_NAME[agent]||"Elliot";
    var sub=p.subtitle!=null?p.subtitle:(p.destination?"Quick starts for "+p.destination+". Or ask "+name+" anything.":null);
    return h("div",{className:cx("lla lla-greeting",p.className)},
      h(p.as||"h2",{className:"lla-greeting-title"},p.title||"What should we work on today?"),
      sub!=null?h("p",{className:"lla-greeting-sub"},sub):null);
  }
  function TaskCard(p){
    var agent=p.agentName||B_NAME[p.agent]||p.agent;
    var Hd=p.as||"h3";
    return h("section",{className:cx("lla lla-task",p.className),"aria-label":p.label||null},
      h("div",{className:"lla-task-row"},
        p.icon?h(Icon,{name:p.icon,size:"action"}):null,
        h("div",{className:"lla-task-text"},
          h(Hd,{className:"lla-task-title"},p.title),
          p.description!=null?h("p",{className:"lla-task-desc"},p.description):null,
          h("button",{type:"button",className:"lla-task-link",onClick:p.onAction},h("span",null,p.actionLabel||agent),h(Icon,{name:"arrow-right"})))));
  }
  EXPORT("AgentPanel",AgentPanel);EXPORT("AgentSignature",AgentSignature);EXPORT("StatGrid",StatGrid);EXPORT("InsightCard",InsightCard);
  EXPORT("AgentSelector",AgentSelector);EXPORT("ChatComposer",ChatComposer);EXPORT("PanelNote",PanelNote);EXPORT("PanelGreeting",PanelGreeting);EXPORT("TaskCard",TaskCard);

  /* ===== C-chat ===== */
  /* ===== C-chat: chat thread messages, scripted flow cards, run cards, busy bar, history and the full view ===== */
  var C_NAMES={ivy:"Ivy",elliot:"Elliot",cooper:"Cooper",lana:"Lana"};
  function C_list(v){return v==null?[]:(Array.isArray(v)?v:[v]);}

  /* ---------- ChatMessage: one message in the shared "Your team" thread ---------- */
  function ChatMessage(p){
    var user=p.role==="user"||(!p.agent&&p.role!=="agent");
    var name=p.author||(user?"You":(C_NAMES[p.agent]||p.agent||"Agent"));
    var rest=omit(p,["role","agent","author","text","children","className"]);
    return h("section",Object.assign({className:cx("lla lla-chatmsg",user?"user":"agent",p.className),"data-agent":user?null:(p.agent||null)},rest),
      h("small",{className:"lla-chatmsg-author"},name),
      p.text!=null?h("p",{className:"lla-chatmsg-text"},p.text):null,
      p.children!=null?h("div",{className:"lla-chatmsg-rich"},p.children):null);
  }

  /* ---------- StatusBubble: the status answer ("Q2 SaaS Growth · as of today") ---------- */
  function StatusBubble(p){
    return h(ChatMessage,{agent:p.agent,author:p.author,className:cx("lla-status",p.className)},
      h("strong",{className:"lla-status-title"},p.title),
      h("div",{className:"lla-status-stats"},C_list(p.stats).map(function(s,i){
        return h("div",{key:i,className:"lla-status-stat"},h("strong",{className:"lla-status-value"},s.value),h("span",{className:"lla-status-label"},s.label));})),
      p.links&&p.links.length?h("div",{className:"lla-status-links"},p.links.map(function(l,i){
        return h(Button,{key:i,variant:"secondary",iconRight:l.icon===null?null:(l.icon||"arrow-right"),onClick:l.onClick},l.label);})):null);
  }

  /* ---------- FlowStepCard: one step of a scripted flow (Ivy discovery and brief, Elliot draft) ---------- */
  function C_Answer(p){
    var a=p.answer,s=useState("");var v=s[0];
    function send(){if(a.onSubmit)a.onSubmit(v);s[1]("");}
    return h("div",{className:"lla-flow-answer"},
      a.key?h("span",{className:"lla-flow-letter","aria-hidden":"true"},a.key):h(Icon,{name:"pencil",className:"lla-flow-letter-icon"}),
      h("input",{className:"lla-flow-input",type:"text",placeholder:a.placeholder||"Or type your own answer…","aria-label":a.label||null,"aria-describedby":p.desc,value:v,onChange:function(e){s[1](e.target.value);},onKeyDown:function(e){if(e.key==="Enter"){e.preventDefault();send();}}}),
      h("button",{type:"button",className:"lla-flow-send","aria-label":a.sendLabel||"Send answer","aria-describedby":p.desc,onClick:send},h(Icon,{name:"arrow-up"})));
  }
  function C_actions(list,layout,desc){
    if(!list||!list.length)return null;
    return h("div",{className:layout==="inline"?"lla-flow-inline":"lla-flow-stack"},list.map(function(a,i){
      return h(Button,{key:a.id||i,variant:a.primary||a.variant==="primary"?"primary":"secondary",icon:a.icon,onClick:a.onClick,disabled:a.disabled,"aria-describedby":desc},a.label);}));
  }
  function FlowStepCard(p){
    var bare=p.frame==="none";var uid=useId();var why=uid+"-why";var dis=!!p.disabled;var desc=dis?why:null;
    var nameId=p.lead!=null?uid+"-lead":p.title!=null?uid+"-title":null;
    var title=p.title!=null?h("h3",{key:"t",id:uid+"-title",className:"lla-flow-title"},p.title):null;
    var kids=[
      p.eyebrow?h("small",{key:"e",className:"lla-flow-eyebrow"},p.eyebrow):null,
      title&&p.aside!=null?h("div",{key:"th",className:"lla-flow-head"},title,p.aside):title,
      p.lead!=null?h("div",{key:"l",id:uid+"-lead",className:"lla-flow-lead"},p.lead):null,
      p.picker?h("select",{key:"pk",className:"lla-flow-picker","aria-label":p.picker.label,"aria-describedby":desc,value:p.picker.value,defaultValue:p.picker.value===undefined?p.picker.defaultValue:undefined,onChange:function(e){p.picker.onChange&&p.picker.onChange(e.target.value);}},
        p.picker.options.map(function(o){return h("option",{key:o.value,value:o.value},o.label);})):null
    ];
    C_list(p.description).forEach(function(d,i){kids.push(h("p",{key:"d"+i,className:"lla-flow-desc"},d));});
    if(p.fields&&p.fields.length)kids.push(h("dl",{key:"f",className:"lla-flow-fields"},p.fields.map(function(f,i){
      return h(Fragment,{key:i},h("dt",null,f.label),h("dd",null,f.value));})));
    if(p.prompt!=null)kids.push(h("div",{key:"pr",className:"lla-flow-prompt"},p.prompt));
    if((p.options&&p.options.length)||p.answer)kids.push(h("div",{key:"o",className:"lla-flow-options"},
      C_list(p.options).map(function(o,i){return h("button",{key:o.key||i,type:"button",className:"lla-flow-option","aria-describedby":desc,onClick:o.onClick},
        h("span",{className:"lla-flow-letter"},o.key),h("span",null,o.label));}),
      p.answer?h(C_Answer,{key:"a",answer:p.answer,desc:desc}):null));
    if(p.chips&&p.chips.length)kids.push(h("div",{key:"c",className:"lla-flow-chips"},p.chips.map(function(c,i){
      return h("button",{key:i,type:"button",className:"lla-flow-chip","aria-describedby":desc,onClick:c.onClick},c.icon?h(Icon,{name:c.icon}):null,h("span",null,c.label));})));
    if(p.children!=null)kids.push(h(Fragment,{key:"k"},p.children));
    if(p.note!=null)kids.push(h("small",{key:"n",className:"lla-flow-note"},p.note));
    if(p.choices&&p.choices.length)kids.push(h("div",{key:"ch",className:"lla-flow-stack"},p.choices.map(function(c,i){
      return h(Button,{key:c.id||i,variant:"secondary",className:cx("lla-flow-choice",c.description!=null&&"two"),onClick:c.onClick,"aria-describedby":desc,"aria-pressed":c.selected!=null?(c.selected?"true":"false"):null},
        c.label,c.description!=null?h("span",{className:"lla-flow-choice-desc"},c.description):null);})));
    kids.push(h(Fragment,{key:"ac"},C_actions(p.actions,p.actionsLayout,desc)));
    if(dis)kids.push(h("p",{key:"w",id:why,className:"lla-flow-why"},p.disabledReason||"You answered this step. Continue below."));
    return h("div",{className:cx("lla lla-flowcard",bare&&"bare",p.className),"data-agent":p.agent||null},
      h("fieldset",{className:"lla-flow-fs",disabled:dis,"aria-labelledby":dis?nameId:null,"aria-describedby":desc},kids));
  }

  /* ---------- RunCard: an agent run (mirror, live steps, confirm), its offer button, and the ready card ---------- */
  function RunCard(p){
    var kind=p.kind||(p.steps?"run":p.offer?"offer":"ready");
    var steps=C_list(p.steps);
    var s=useState(p.animate?0:steps.length);var auto=s[0];
    useEffect(function(){
      if(!p.animate)return;s[1](0);
      var t=setInterval(function(){s[1](function(y){return Math.min(y+1,steps.length);});},p.interval||620);
      return function(){clearInterval(t);};
    },[p.animate,p.runId]);
    if(kind==="offer")return h(Button,{variant:"secondary",block:true,className:cx("lla-run-offer",p.className),onClick:p.onOffer||(p.offer&&p.offer.onClick)},(p.offer&&p.offer.label)||("Open "+p.dest));
    if(kind==="ready")return h(FlowStepCard,{className:cx("lla-run-ready",p.className),description:p.text||"Your draft is ready. Open Content to edit and schedule it.",
      actions:[{label:p.actionLabel||"Open composer",primary:true,onClick:p.onAction}],actionsLayout:"inline"});
    var done=p.progress!=null?p.progress:auto;
    var finished=done>=steps.length;
    return h("div",{className:cx("lla lla-flowcard lla-run",p.className),"data-agent":p.agent||null,"aria-busy":finished?null:"true"},
      p.mirror!=null?h("p",{className:"lla-run-mirror"},p.mirror):null,
      h("ol",{className:"lla-run-steps","aria-label":p.stepsLabel||"Progress"},steps.map(function(t,i){
        var st=i<done?"done":i===done?"now":"next";
        return h("li",{key:i,className:cx("lla-run-step",st)},h(Icon,{name:st==="done"?"check":"dot"}),
          h("span",{className:"lla-sr"},st==="done"?"Done: ":st==="now"?"Working: ":"Next: "),h("span",null,t));})),
      finished&&p.question?h(Fragment,null,
        h("strong",{className:"lla-run-question"},p.question),
        C_actions([{label:p.confirmLabel||"Looks right",primary:true,onClick:function(){p.onAnswer&&p.onAnswer(true);}},
          {label:p.fixLabel||"A few things to fix",onClick:function(){p.onAnswer&&p.onAnswer(false);}}],"stack")):null);
  }

  /* ---------- BusyBar: "Adding creators … Start over" above the composer while a flow runs ---------- */
  function BusyBar(p){
    return h("div",{className:cx("lla lla-busy",p.className)},
      h("span",{className:"lla-busy-label",role:"status"},p.label),
      h(Button,{variant:"secondary",className:"lla-busy-btn",onClick:p.onStartOver},p.actionLabel||"Start over"));
  }

  /* ---------- ConversationHistory: new chat, search (titles only), rows with pin toggles ---------- */
  function ConversationHistory(p){
    var col=p.layout==="column";
    var q=useControlled(p.query,p.defaultQuery||"",p.onQueryChange);
    var needle=(q[0]||"").toLowerCase();
    var rows=C_list(p.chats).filter(function(c){return String(c.title||"").toLowerCase().indexOf(needle)>=0;});
    rows=rows.map(function(c,i){return {c:c,i:i};}).sort(function(a,b){return (+!!b.c.pinned)-(+!!a.c.pinned)||a.i-b.i;}).map(function(x){return x.c;});
    return h("div",{className:cx("lla lla-chathist",col&&"column",p.className)},
      h("div",{className:"lla-chathist-top"},
        h(Button,{variant:"secondary",icon:"plus",className:"lla-chathist-new",onClick:p.onNewChat},p.newChatLabel||"New chat"),
        !col&&p.onOpenFull!==null?h(Button,{variant:"secondary",className:"lla-chathist-full","aria-label":p.openFullLabel||"Open full view",onClick:p.onOpenFull},h(Icon,{name:"panel-left",size:"action"})):null),
      h("input",{className:"lla-chathist-search",type:"search",placeholder:p.searchPlaceholder||"Search chats…","aria-label":p.searchLabel||"Search chats",value:q[0],onChange:function(e){q[1](e.target.value);}}),
      rows.map(function(c){
        var cur=c.id===p.currentId;
        return h("div",{key:c.id,className:"lla-chathist-row"},
          h(Button,{variant:"secondary",className:"lla-chathist-open","aria-current":cur?"page":null,onClick:function(){if(!cur&&p.onSelect)p.onSelect(c.id,c);}},
            c.title,cur?h("small",{className:"lla-chathist-meta"},p.currentLabel||"Current conversation"):null),
          h(Button,{variant:"secondary",className:cx("lla-chathist-pin",c.pinned&&"pinned"),"aria-label":(c.pinned?"Unpin ":"Pin ")+c.title,onClick:function(){p.onTogglePin&&p.onTogglePin(c.id,!c.pinned);}},h(Icon,{name:"pin"})));
      }),
      rows.length?null:h("p",{className:"lla-chathist-empty",role:"status"},p.emptyLabel||"No chats match."));
  }

  /* ---------- FullViewDialog: "Your team · Conversations" ---------- */
  function C_SendForm(p){
    var s=useState("");var v=s[0];
    return h("form",{className:"lla-chatfull-form",onSubmit:function(e){e.preventDefault();if(!v.trim())return;p.onSend&&p.onSend(v);s[1]("");}},
      h("input",{className:"lla-chatfull-input",type:"text",placeholder:p.placeholder||"Ask your team anything…","aria-label":p.label||"Ask your team",value:v,onChange:function(e){s[1](e.target.value);}}),
      h(Button,{variant:"primary",type:"submit",className:"lla-chatfull-send","aria-label":p.sendLabel||"Send message"},h(Icon,{name:"send"})));
  }
  function FullViewDialog(p){
    var body=h("div",{className:"lla lla-chatfull"},
      h(ConversationHistory,{layout:"column",chats:p.chats,currentId:p.currentId,onSelect:p.onSelect,onTogglePin:p.onTogglePin,onNewChat:p.onNewChat,query:p.query,defaultQuery:p.defaultQuery,onQueryChange:p.onQueryChange}),
      h("div",{className:"lla-chatfull-main"},
        h("div",{className:"lla-chatfull-thread","aria-live":"polite"},p.children),
        p.flow||null,
        h(Button,{variant:"secondary",block:true,className:"lla-chatfull-back",onClick:p.onBack||p.onClose},p.backLabel||"Back to workspace"),
        p.composer!==undefined?p.composer:h(C_SendForm,{onSend:p.onSend,placeholder:p.placeholder,sendLabel:p.sendLabel})));
    var Dlg=typeof Dialog==="function"?Dialog:null;
    if(!Dlg)return h("div",{className:"lla-chat-missing",role:"note"},"FullViewDialog needs Dialog (group D).");
    return h(Dlg,{open:p.open,onClose:p.onClose,title:p.title||"Your team · Conversations",subtitle:p.subtitle,size:"full",label:p.label,initialFocus:p.initialFocus},body);
  }

  EXPORT("ChatMessage",ChatMessage);EXPORT("StatusBubble",StatusBubble);EXPORT("FlowStepCard",FlowStepCard);EXPORT("RunCard",RunCard);
  EXPORT("BusyBar",BusyBar);EXPORT("ConversationHistory",ConversationHistory);EXPORT("FullViewDialog",FullViewDialog);

  /* ===== D-overlays ===== */
  /* ===== D-overlays: Dialog, Drawer, AlertDialog, Sheet, KebabMenu, Snackbar, Notice, ChecklistPopover, ProgressBar, EmptyState ===== */

  /* ---------- Shared overlay plumbing ---------- */
  /* D portals every dialog and drawer to <body> (outside its .brand scope). The DS does the same, so fixed
     positioning is never trapped by a transformed ancestor. Falls back to inline rendering without ReactDOM. */
  function D_portal(node){var RD=window.ReactDOM;return RD&&RD.createPortal&&typeof document!=="undefined"&&document.body?RD.createPortal(node,document.body):node;}
  /* Open modal layers, top last. Only the top layer reacts to Escape, so a discard confirm inside a sheet,
     or an alert opened from a drawer, closes on its own. The first layer locks page scroll. */
  var D_layers=[],D_prevOverflow="";
  function D_useLayer(open,onClose,lock){
    var cb=useRef(onClose);cb.current=onClose;
    useEffect(function(){
      if(!open)return;
      var t={};D_layers.push(t);
      var body=document.body;
      if(lock!==false&&D_layers.length===1){D_prevOverflow=body.style.overflow;body.style.overflow="hidden";}
      function key(e){if(e.key!=="Escape"||e.defaultPrevented)return;if(D_layers[D_layers.length-1]!==t)return;e.preventDefault();if(cb.current)cb.current(e);}
      document.addEventListener("keydown",key);
      return function(){document.removeEventListener("keydown",key);var i=D_layers.indexOf(t);if(i>=0)D_layers.splice(i,1);if(!D_layers.length)body.style.overflow=D_prevOverflow||"";};
    },[open]);
  }
  /* Close control: D draws a 16px X at 70% opacity. The DS keeps the glyph and raises the hit box to 24px. */
  function D_Close(p){
    return h("button",{type:"button",className:cx("lla-overlay-close",p.className),"aria-label":p.label||"Close",onClick:p.onClick},h(Icon,{name:"x"}));
  }
  function D_scrim(cls,onClose){
    return h("div",{className:cx("lla-scrim",cls),"aria-hidden":"true",onMouseDown:function(e){if(e.target!==e.currentTarget)return;e.preventDefault();if(onClose)onClose(e);}});
  }
  var D_SUB="Limelight · Local prototype";

  /* ---------- Dialog: shadcn centered dialog (512px) or the full view (min(1100px,95vw) x 90dvh) ---------- */
  function Dialog(p){
    var open=!!p.open,ref=useRef(null),id=useId();
    D_useLayer(open,p.onClose);
    useFocusTrap(ref,open,p.initialFocus);
    if(!open)return null;
    var full=p.size==="full",sub=p.subtitle===undefined?D_SUB:p.subtitle;
    var st=!full&&p.width?{maxWidth:typeof p.width==="number"?p.width+"px":p.width}:null;
    return D_portal(h(Fragment,null,
      D_scrim(null,p.onClose),
      h("div",{ref:ref,role:p.role||"dialog","aria-modal":"true",tabIndex:-1,
          "aria-labelledby":p.title?id+"-t":null,"aria-label":p.title?null:(p.label||null),"aria-describedby":p.describedBy||(sub?id+"-s":null),
          className:cx("lla lla-overlay lla-dialog",full&&"full",p.className),style:st},
        p.title?h("h2",{id:id+"-t",className:"lla-overlay-title"},p.title):null,
        sub?h("p",{id:id+"-s",className:"lla-overlay-sub"},sub):null,
        h("div",{className:"lla-dialog-body"},p.children),
        p.footer?h("div",{className:"lla-dialog-footer"},p.footer):null,
        h(D_Close,{onClick:p.onClose}))));
  }

  /* ---------- AlertDialog: D's "Delete thread from Limelight?" confirm ---------- */
  function AlertDialog(p){
    var cancel=useRef(null),id=useId();
    var desc=p.description!=null?(Array.isArray(p.description)?p.description:[p.description]):[];
    /* The dialog is described by its warning text (the consequence), not by the prototype subtitle. */
    var body=h("div",{className:"lla-alert-flow"},
      desc.length?h("div",{id:id+"-d",className:"lla-alert-desc"},desc.map(function(d,i){return h("p",{key:i},d);})):null,
      p.children,
      h("div",{className:"lla-alert-actions"},
        h("button",{ref:cancel,type:"button",className:"lla lla-btn secondary",onClick:p.onCancel},p.cancelLabel||"Cancel"),
        h(Button,{variant:"primary",className:p.danger?"lla-alert-danger":null,onClick:p.onConfirm},p.confirmLabel||"Confirm")));
    return h(Dialog,{open:p.open,onClose:p.onCancel,title:p.title,subtitle:p.subtitle,label:p.label,role:"alertdialog",initialFocus:cancel,describedBy:desc.length?id+"-d":null,className:cx("lla-alert",p.className)},body);
  }

  /* ---------- Drawer: right-side sheet. review = D's 600px creator review (Arial palette, fixed header and
     footer, scrolling body); default = D's 640px side dialog (system face, the whole panel scrolls). ---------- */
  function D_eyebrow(e){
    var parts=Array.isArray(e)?e:[e];
    return h("div",{className:"lla-drawer-eyebrow"},parts.map(function(x,i){return h("span",{key:i},x);}));
  }
  function Drawer(p){
    var open=!!p.open,ref=useRef(null),id=useId();
    var review=p.variant?p.variant==="review":(p.eyebrow!=null||p.width===600);
    var w=p.width||(review?600:640);
    D_useLayer(open,p.onClose);
    useFocusTrap(ref,open,p.initialFocus);
    if(!open)return null;
    var sub=review?p.subtitle:(p.subtitle===undefined?D_SUB:p.subtitle);
    var common={ref:ref,role:"dialog","aria-modal":"true",tabIndex:-1,"aria-labelledby":p.title?id+"-t":null,"aria-label":p.title?null:(p.label||null),"aria-describedby":sub?id+"-s":null,style:{width:"min("+w+"px, "+(review?"100vw":"94vw")+")"}};
    var content;
    if(review){
      var foot=p.footer!=null||p.notice!=null?h("footer",{className:"lla-drawer-foot"},
        p.notice||null,
        p.footer!=null?h("div",{className:"lla-drawer-actions"},Array.isArray(p.footer)?p.footer.map(function(g,i){return h("div",{key:i,className:"lla-drawer-group"},g);}):p.footer):null):null;
      content=h("div",Object.assign({className:cx("lla lla-overlay lla-drawer review",p.className)},common),
        h("header",{className:cx("lla-drawer-head",p.header==null&&"bare")},
          p.eyebrow!=null?D_eyebrow(p.eyebrow):null,
          h("div",{className:"lla-drawer-identity"},
            p.media!=null?p.media:(p.initials?h("span",{className:"lla-drawer-avatar","aria-hidden":"true"},p.initials):null),
            h("div",{className:"lla-drawer-name"},
              p.title?h("h2",{id:id+"-t",className:"lla-drawer-title"},p.title):null,
              sub?h("p",{id:id+"-s",className:"lla-drawer-sub"},sub):null)),
          p.header||null),
        h("div",{className:"lla-drawer-scroll"},p.children),
        foot,
        h(D_Close,{onClick:p.onClose}));
    }else{
      content=h("div",Object.assign({className:cx("lla lla-overlay lla-drawer",p.className)},common),
        p.title?h("h2",{id:id+"-t",className:"lla-overlay-title"},p.title):null,
        sub?h("p",{id:id+"-s",className:"lla-overlay-sub"},sub):null,
        h("div",{className:"lla-drawer-body"},p.children),
        p.footer?h("div",{className:"lla-drawer-footer"},p.footer):null,
        h(D_Close,{onClick:p.onClose}));
    }
    return D_portal(h(Fragment,null,D_scrim(null,p.onClose),content));
  }

  /* ---------- Sheet: the sequence builder's near-full-screen sheet with its discard confirm ---------- */
  function Sheet(p){
    var open=!!p.open,ref=useRef(null),cref=useRef(null),keep=useRef(null),id=useId();
    var cs=useState(false),confirming=cs[0],setConfirming=cs[1];
    useEffect(function(){if(!open)setConfirming(false);},[open]);
    function requestClose(){if(p.dirty&&p.confirm!==false)setConfirming(true);else if(p.onClose)p.onClose();}
    D_useLayer(open,requestClose);
    D_useLayer(open&&confirming,function(){setConfirming(false);},false);
    useFocusTrap(ref,open,p.initialFocus);
    useFocusTrap(cref,open&&confirming,keep);
    if(!open)return null;
    var c=p.confirm||{};
    var st=p.width?{maxWidth:typeof p.width==="number"?p.width+"px":p.width}:null;
    return D_portal(h(Fragment,null,
      /* D: the scrim and the confirm backdrop ignore clicks; only Escape, the X and the buttons act. */
      D_scrim("sheet",null),
      h("div",{ref:ref,role:"dialog","aria-modal":"true",tabIndex:-1,"aria-labelledby":p.title?id+"-t":null,"aria-label":p.title?null:(p.label||null),
          className:cx("lla lla-sheet",p.className),style:st},
        h("div",{className:"lla-sheet-head"},
          p.title?h("h2",{id:id+"-t",className:"lla-sheet-title"},p.title):null,
          h("span",{className:"lla-sheet-spacer"}),
          p.actions||null,
          h(D_Close,{className:"lla-sheet-x",onClick:requestClose})),
        h("div",{className:"lla-sheet-body"},p.children),
        p.footer?h("div",{className:"lla-sheet-foot"},p.footer):null),
      confirming?h("div",{className:"lla lla-sheet-confirm"},
        h("div",{ref:cref,role:"alertdialog","aria-modal":"true","aria-labelledby":id+"-ct","aria-describedby":id+"-cb",className:"lla-sheet-confirm-card"},
          h("h2",{id:id+"-ct",className:"lla-sheet-confirm-title"},c.title||"Discard this sequence?"),
          h("p",{id:id+"-cb",className:"lla-sheet-confirm-body"},c.description||"You're in the middle of creating a sequence. If you close now, your changes won't be saved."),
          h("div",{className:"lla-sheet-confirm-foot"},
            h("button",{ref:keep,type:"button",className:"lla lla-btn secondary",onClick:function(){setConfirming(false);}},c.cancelLabel||"Keep editing"),
            h(Button,{variant:"primary",className:"lla-sheet-discard",onClick:function(){setConfirming(false);if(p.onClose)p.onClose();}},c.confirmLabel||"Discard changes")))):null));
  }

  /* ---------- KebabMenu: 32x32 "Thread actions" trigger on group B's DropdownMenu, restyled to D's kebab menu ---------- */
  function KebabMenu(p){
    var label=p.label||"Thread actions";
    /* DropdownMenu places the menu 8px below the element holding `ref`. D's kebab menu sits 6px below the 32px
       trigger, so `ref` goes on a 30px anchor that forwards focus to the button (the menu returns focus there). */
    function trigger(tp){
      var btn=h("button",Object.assign({type:"button",className:cx("lla lla-kebab",p.triggerClassName),"aria-label":label},omit(tp,["ref"])),h(Icon,{name:p.icon||"ellipsis-vertical"}));
      return h("span",{ref:tp.ref,className:"lla-kebab-anchor",tabIndex:-1,onFocus:function(e){var b=e.currentTarget.firstChild;if(e.target===e.currentTarget&&b)b.focus();}},btn);
    }
    if(typeof DropdownMenu!=="function")return trigger({});
    return h(DropdownMenu,{trigger:trigger,items:p.items||[],label:p.menuLabel||label,align:p.align||"end",side:p.side||"bottom",width:p.width||190,
      menuClassName:"lla-kebab-menu",className:p.className,open:p.open,defaultOpen:p.defaultOpen,onOpenChange:p.onOpenChange});
  }

  /* ---------- Snackbar: fixed dark bar with visible actions (the Inbox payment snackbar), or the sequence builder toast ---------- */
  function Snackbar(p){
    var toast=p.variant==="toast";
    var dur=p.duration!==undefined?p.duration:(toast?4200:0);
    var cb=useRef(p.onClose);cb.current=p.onClose;
    useEffect(function(){
      if(!p.open||!dur)return;
      var t=setTimeout(function(){if(cb.current)cb.current();},dur);
      return function(){clearTimeout(t);};
    },[p.open,dur]);
    if(!p.open)return null;
    var acts=(p.actions||[]).map(function(a,i){
      return h("button",{key:i,type:"button",className:"lla lla-btn secondary","aria-label":a.ariaLabel||null,onClick:a.onClick},a.label);
    });
    if(p.onClose&&p.dismissLabel!==false)acts.push(h("button",{key:"x",type:"button",className:"lla lla-btn secondary","aria-label":p.closeLabel||null,onClick:p.onClose},typeof p.dismissLabel==="string"?p.dismissLabel:"Dismiss"));
    return D_portal(h("div",{className:cx("lla lla-snackbar",toast&&"toast",p.className),role:"status"},
      h("div",{className:"lla-snackbar-text"},
        p.title?h("strong",{className:"lla-snackbar-title"},p.title):null,
        p.message!=null?h("div",{className:"lla-snackbar-msg"},p.message):null),
      acts.length?h("div",{className:"lla-snackbar-actions"},acts):null));
  }

  /* ---------- Notice: D's inline confirmations ---------- */
  var D_NOTICE_ICON={success:"circle-check",info:"info",warning:"triangle-alert",danger:"circle-alert"};
  function Notice(p){
    var v=p.variant||"banner",t=p.tone||"success";
    var act=p.action;
    if(act&&!React.isValidElement(act)&&act.label){
      act=v==="drawer"?h("button",{type:"button",className:"lla-notice-link",onClick:act.onClick,"aria-label":act.ariaLabel||null},act.label)
        :h(Button,{variant:"secondary",onClick:act.onClick,"aria-label":act.ariaLabel||null},act.label);
    }
    return h("div",{className:cx("lla lla-notice",v,v==="banner"&&t,p.className),role:t==="danger"?"alert":"status"},
      h("span",{className:"lla-notice-text"},p.icon&&D_NOTICE_ICON[t]?h(Icon,{name:D_NOTICE_ICON[t]}):null,p.children),
      act||null);
  }

  /* ---------- EmptyState: D's empty and gated states ---------- */
  function EmptyState(p){
    var v=p.variant||"center";
    var tag=p.as||(v==="card"?"h2":(v==="drawer"?"strong":"h3"));
    return h("div",{className:cx("lla lla-empty",v,p.className),role:p.role||null},
      p.icon?h("span",{className:"lla-empty-icon","aria-hidden":"true"},h(Icon,{name:p.icon,size:"action"})):null,
      p.title!=null?h(tag,{className:"lla-empty-title"},p.title):null,
      p.children!=null?h("p",{className:"lla-empty-body",id:p.bodyId||null},p.children):null,
      p.action||null);
  }

  /* ---------- ProgressBar: the checklist bar (4px gradient) or D's shadcn Progress (8px, primary) ---------- */
  function ProgressBar(p){
    var v=Math.max(0,Math.min(100,Math.round(p.value||0)));
    return h("div",{className:cx("lla lla-progress",p.variant==="primary"?"primary":"checklist",p.className),role:"progressbar",
        "aria-valuenow":v,"aria-valuemin":0,"aria-valuemax":100,"aria-valuetext":p.valueText||(v+"%"),"aria-label":p.label||"Progress",style:p.style},
      h("i",{style:{width:v+"%"}}));
  }

  /* ---------- ChecklistPopover: the floating "Getting started" card ---------- */
  var D_RAIL=56,D_EDGE=8,D_STEP=20;
  function D_clamp(pos,el){
    if(typeof window==="undefined")return pos;
    var w=el?el.offsetWidth:280,hh=el?el.offsetHeight:335;
    var maxX=Math.max(D_EDGE,window.innerWidth-w-D_EDGE),maxY=Math.max(D_EDGE,window.innerHeight-hh-D_EDGE);
    return {x:Math.round(Math.min(Math.max(pos.x,D_EDGE),maxX)),y:Math.round(Math.min(Math.max(pos.y,D_EDGE),maxY))};
  }
  function ChecklistPopover(p){
    var steps=p.steps||[],id=useId(),ref=useRef(null),drag=useRef(null);
    var mm=useControlled(p.minimized,!!p.defaultMinimized,p.onMinimizedChange),min=mm[0],setMin=mm[1];
    var def=p.defaultPosition||(typeof window!=="undefined"?{x:D_RAIL+12,y:window.innerHeight-420}:{x:68,y:480});
    var pp=useControlled(p.position,def,p.onPositionChange),pos=pp[0],setPos=pp[1];
    var done=steps.filter(function(s){return s.state==="done";}).length;
    var pct=p.percent!=null?p.percent:(steps.length?Math.round(done/steps.length*100):0);
    var cur=-1;steps.forEach(function(s,i){if(s.state==="current")cur=i;});
    if(cur<0)for(var i=0;i<steps.length;i++){if(steps[i].state!=="done"){cur=i;break;}}
    var floating=!!p.floating;
    // keep the card inside the viewport: on mount, on expand and on window resize (as D does)
    useLayoutEffect(function(){
      if(!floating)return;
      function fit(){var c=D_clamp(pos,ref.current);if(c.x!==pos.x||c.y!==pos.y)setPos(c);}
      fit();window.addEventListener("resize",fit);
      return function(){window.removeEventListener("resize",fit);};
    },[floating,min,pos.x,pos.y]);
    function move(dx,dy){setPos(D_clamp({x:pos.x+dx,y:pos.y+dy},ref.current));if(p.onMove)p.onMove({x:dx,y:dy});}
    function onKey(e){
      var k=e.key,d={ArrowLeft:[-D_STEP,0],ArrowRight:[D_STEP,0],ArrowUp:[0,-D_STEP],ArrowDown:[0,D_STEP]}[k];
      if(!d||!floating)return;e.preventDefault();move(d[0],d[1]);
    }
    function onDown(e){
      if(!floating||e.button!==0||(e.target.closest&&e.target.closest("button")))return;
      drag.current={sx:e.clientX,sy:e.clientY,x:pos.x,y:pos.y};
      if(e.currentTarget.setPointerCapture)e.currentTarget.setPointerCapture(e.pointerId);
    }
    function onMoveP(e){var d=drag.current;if(!d)return;setPos(D_clamp({x:d.x+e.clientX-d.sx,y:d.y+e.clientY-d.sy},ref.current));}
    function onUp(){drag.current=null;}
    function toggleMin(){var n=!min;setMin(n);if(p.onMinimize)p.onMinimize(n);}
    var style=floating?{left:pos.x,top:pos.y}:null;
    var allDone=steps.length>0&&done===steps.length;
    return h("section",{ref:ref,className:cx("lla lla-checklist",floating&&"floating",min&&"min",p.className),role:"region","aria-label":p.label||"Getting started checklist",style:style},
      h("header",{className:"lla-checklist-head"},
        h("div",{className:"lla-checklist-drag",role:floating?"button":null,tabIndex:floating?0:null,
            "aria-label":floating?"Move Getting started panel":null,title:floating?"Drag to move. Use arrow keys when focused.":null,
            onKeyDown:onKey,onPointerDown:onDown,onPointerMove:onMoveP,onPointerUp:onUp,onPointerCancel:onUp},
          h("small",{className:"lla-checklist-meta"},pct+"% completed"),
          h("h2",{className:"lla-checklist-title",id:id+"-t"},p.title||"Getting started"),
          floating?h(Icon,{name:"grip-horizontal",className:"lla-checklist-grip"}):null),
        h("div",{className:"lla-checklist-tools"},
          h("button",{type:"button",className:"lla-checklist-tool","aria-label":min?"Expand checklist":"Minimise checklist","aria-expanded":min?"false":"true",onClick:toggleMin},h(Icon,{name:min?"chevron-up":"chevron-down"})),
          p.onClose?h("button",{type:"button",className:"lla-checklist-tool","aria-label":"Dismiss checklist",onClick:p.onClose},h(Icon,{name:"x"})):null)),
      h(ProgressBar,{value:pct,label:"Setup progress",className:"lla-checklist-bar"}),
      min?null:h("div",{className:"lla-steps"},
        steps.map(function(s,i){
          var st=s.state==="done"?"done":(i===cur?"current":"todo"),hint=s.hint||s.description;
          return h(Fragment,{key:i},
            h("button",{type:"button",className:cx("lla-step",st),"aria-current":st==="current"?"step":null,onClick:function(){if(p.onStep)p.onStep(i);}},
              h("span",{className:"lla-step-mark","aria-hidden":"true"},st==="done"?h("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",dangerouslySetInnerHTML:{__html:ICONS.check}}):null),
              h("span",{className:"lla-step-label"},s.label,h("span",{className:"lla-sr"},st==="done"?" (done)":st==="current"?" (current step)":" (to do)")),
              st==="current"?h(Icon,{name:"chevron-right",className:"lla-step-go"}):null),
            st==="current"&&hint?h("p",{className:"lla-step-hint"},hint):null);
        }),
        allDone?h("p",{className:"lla-step-hint"},p.completeText||"All set. You can revisit any step."):null));
  }

  EXPORT("Dialog",Dialog);EXPORT("AlertDialog",AlertDialog);EXPORT("Drawer",Drawer);EXPORT("Sheet",Sheet);
  EXPORT("KebabMenu",KebabMenu);EXPORT("Snackbar",Snackbar);EXPORT("Notice",Notice);EXPORT("EmptyState",EmptyState);
  EXPORT("ProgressBar",ProgressBar);EXPORT("ChecklistPopover",ChecklistPopover);

  /* ===== E-forms ===== */
  /* ---------- E-forms: fields, select, switch, checkbox, radio cards, chips, filter bar ---------- */
  /* Private helpers are prefixed E_. Values are D's rendered values (see each README). */
  function E_text(n){if(n==null||typeof n==="boolean")return "";if(typeof n==="string"||typeof n==="number")return String(n);if(Array.isArray(n))return n.map(E_text).join("");if(n.props)return E_text(n.props.children);return "";}
  function E_norm(o){return typeof o==="string"||typeof o==="number"?{value:String(o),label:String(o)}:o;}
  /* ids that describe a control: hint, disabled reason, error, counter, plus any caller-supplied id. */
  function E_describedBy(id,p,extra){
    var a=[];if(p.hint)a.push(id+"-hint");if(p.disabled&&p.disabledReason)a.push(id+"-why");if(p.error)a.push(id+"-err");
    if(extra)a.push(extra);if(p["aria-describedby"])a.push(p["aria-describedby"]);return a.length?a.join(" "):null;
  }
  /* Field frame: label above, control, then hint, disabled reason (ENG-3773) and error, each tied to the control. */
  function E_Field(p){
    var v=p.variant||"default";
    return h("div",{className:cx("lla lla-field",v!=="default"&&v,p.disabled&&"disabled",p.className),style:p.style},
      p.label!=null?h("label",{className:cx("lla-field-label",p.hideLabel&&"lla-sr"),htmlFor:p.id,id:p.id+"-label"},p.label):null,
      p.children,
      p.hint?h("p",{className:"lla-field-hint",id:p.id+"-hint"},p.hint):null,
      p.disabled&&p.disabledReason?h("p",{className:"lla-field-hint why",id:p.id+"-why"},p.disabledReason):null,
      p.error?h("p",{className:"lla-field-error",id:p.id+"-err",role:"alert"},p.error):null);
  }
  var E_FIELD_KEYS=["label","hideLabel","hint","error","className","id","variant","disabledReason","style","inputClassName"];

  /* ---------- TextInput ---------- */
  function TextInput(p){
    var auto=useId();var id=p.id||auto;var v=p.variant||"default";
    var rest=omit(p,E_FIELD_KEYS);
    return h(E_Field,{id:id,label:p.label,hideLabel:p.hideLabel,hint:p.hint,error:p.error,disabled:p.disabled,disabledReason:p.disabledReason,variant:v,className:p.className,style:p.style},
      h("input",Object.assign({type:"text"},rest,{id:id,className:cx("lla-input",p.inputClassName),"aria-invalid":p.error?"true":null,"aria-describedby":E_describedBy(id,p)})));
  }

  /* ---------- NumberInput: a TextInput with type=number and tabular figures ---------- */
  function NumberInput(p){
    return h(TextInput,Object.assign({},p,{type:"number",inputMode:p.inputMode||(p.step&&String(p.step).indexOf(".")<0&&p.step!=="any"?"numeric":"decimal"),inputClassName:cx("num",p.inputClassName)}));
  }

  /* ---------- DateInput: D's native date field (Record external payment), one line box tall ---------- */
  function DateInput(p){
    return h(TextInput,Object.assign({},p,{type:p.type==="datetime-local"?"datetime-local":"date"}));
  }

  /* ---------- Textarea ---------- */
  function Textarea(p){
    var auto=useId();var id=p.id||auto;var v=p.variant||"default";
    var s=useState(String(p.defaultValue||"").length),n=s[0],setN=s[1];
    var count=p.value!=null?String(p.value).length:n;
    var showCount=p.showCount&&p.maxLength;
    var rest=omit(p,E_FIELD_KEYS.concat(["showCount","counterLabel"]));
    var field=h(E_Field,{id:id,label:p.label,hideLabel:p.hideLabel,hint:p.hint,error:p.error,disabled:p.disabled,disabledReason:p.disabledReason,variant:v,className:p.className,style:p.style},
      h("textarea",Object.assign({rows:4},rest,{id:id,className:cx("lla-textarea",p.inputClassName),"aria-invalid":p.error?"true":null,"aria-describedby":E_describedBy(id,p,showCount?id+"-count":null),
        onChange:function(e){if(p.value==null)setN(e.target.value.length);if(p.onChange)p.onChange(e);}})),
      showCount?h("small",{className:"lla-field-count",id:id+"-count"},count+"/"+p.maxLength+" "+(p.counterLabel||"characters")):null);
    return field;
  }

  /* ---------- SearchInput: 16px search glyph inside the field, 10px from the left ---------- */
  function SearchInput(p){
    var rest=omit(p,["label","className","style","size"]);
    return h("div",{className:cx("lla lla-search",p.className),role:"search",style:p.style},
      h(Icon,{name:"search",className:"lla-search-icon"}),
      h("input",Object.assign({type:"text","aria-label":p.label||"Search"},rest,{className:"lla-input toolbar"})));
  }

  /* ---------- Select: shadcn trigger + portaled listbox ---------- */
  function Select(p){
    var opts=(p.options||[]).map(E_norm);
    var st=useControlled(p.value,p.defaultValue!==undefined?p.defaultValue:(p.placeholder?undefined:(opts[0]&&opts[0].value)),p.onChange);
    var val=st[0],set=st[1];
    var o=useState(!!p.defaultOpen),open=o[0],setOpen=o[1];
    var a=useState(0),act=a[0],setAct=a[1];
    var ps=useState(null),pos=ps[0],setPos=ps[1];
    var auto=useId();var id=p.id||auto;var trig=useRef(null),list=useRef(null),typed=useRef({s:"",t:0});
    var curIdx=-1;for(var i=0;i<opts.length;i++){if(opts[i].value===val){curIdx=i;break;}}
    var cur=curIdx>=0?opts[curIdx]:null;
    var size=p.size||"toolbar";
    function place(){
      var t=trig.current;if(!t)return;var r=t.getBoundingClientRect();var vh=window.innerHeight||800;
      var est=Math.min(opts.length*32+10,320);var below=vh-r.bottom-4;var up=below<est&&r.top>below;
      setPos({left:r.left,top:up?null:r.bottom+4,bottom:up?vh-r.top+4:null,minWidth:Math.max(128,r.width+2),maxHeight:Math.max(120,(up?r.top:below)-8)});
    }
    useLayoutEffect(function(){
      if(!open)return;place();
      function f(){place();}
      window.addEventListener("resize",f);window.addEventListener("scroll",f,true);
      return function(){window.removeEventListener("resize",f);window.removeEventListener("scroll",f,true);};
    },[open]);
    /* Window capture runs before any Dialog's document listeners, so Escape and clicks in the portaled listbox close only the listbox. */
    useEffect(function(){
      if(!open)return;
      function kd(e){if(e.key==="Escape"){e.preventDefault();e.stopPropagation();close(true);}}
      function md(e){
        if(list.current&&list.current.contains(e.target)){e.preventDefault();e.stopPropagation();return;}
        if(trig.current&&trig.current.contains(e.target))return;setOpen(false);
      }
      window.addEventListener("keydown",kd,true);window.addEventListener("mousedown",md,true);
      return function(){window.removeEventListener("keydown",kd,true);window.removeEventListener("mousedown",md,true);};
    },[open]);
    useEffect(function(){
      if(!open||!list.current)return;var el=list.current.querySelector('[data-active="true"]');if(el&&el.scrollIntoView)el.scrollIntoView({block:"nearest"});
    },[open,act]);
    function next(from,dir){var j=from;for(var k=0;k<opts.length;k++){j=Math.max(0,Math.min(opts.length-1,j+dir));if(!opts[j].disabled)return j;}return from;}
    function show(){setAct(curIdx>=0?curIdx:next(-1,1));setOpen(true);}
    function close(focus){setOpen(false);if(focus&&trig.current)trig.current.focus();}
    function pick(i){if(!opts[i]||opts[i].disabled)return;set(opts[i].value);close(true);}
    function type(ch){
      var now=Date.now();var t=typed.current;t.s=(now-t.t<700?t.s:"")+ch.toLowerCase();t.t=now;
      for(var k=0;k<opts.length;k++){if(!opts[k].disabled&&String(opts[k].label).toLowerCase().indexOf(t.s)===0){if(open)setAct(k);else set(opts[k].value);return;}}
    }
    function key(e){
      var k=e.key;
      if(!open){
        if(k==="ArrowDown"||k==="ArrowUp"||k==="Enter"||k===" "){e.preventDefault();show();}
        else if(k.length===1&&/\S/.test(k)){type(k);}
        return;
      }
      if(k==="ArrowDown"){e.preventDefault();setAct(next(act,1));}
      else if(k==="ArrowUp"){e.preventDefault();setAct(next(act,-1));}
      else if(k==="Home"){e.preventDefault();setAct(next(-1,1));}
      else if(k==="End"){e.preventDefault();setAct(next(opts.length,-1));}
      else if(k==="Enter"||k===" "){e.preventDefault();pick(act);}
      else if(k==="Tab"){setOpen(false);}
      else if(k.length===1&&/\S/.test(k)){type(k);}
    }
    var labelled=p.inlineLabel?id+"-l":(p.showLabel&&p.label?id+"-label":null);
    var trigger=h("button",{type:"button",ref:trig,id:id,className:cx("lla-select-trigger",size!=="toolbar"&&size),role:"combobox","aria-haspopup":"listbox","aria-expanded":open?"true":"false","aria-controls":open?id+"-m":null,
        "aria-activedescendant":open?id+"-o"+act:null,"aria-labelledby":labelled,"aria-label":labelled?null:(p.label||null),"aria-describedby":E_describedBy(id,p),"aria-invalid":p.error?"true":null,
        disabled:p.disabled,style:p.width!=null?{width:p.width}:null,onClick:function(){open?close(false):show();},onKeyDown:key},
      h("span",{className:cx("lla-select-value",!cur&&"placeholder"),id:id+"-v"},cur?cur.label:(p.placeholder||"")),
      h(Icon,{name:"chevron-down",className:"lla-select-chevron"}));
    var RD=window.ReactDOM;
    var box=open&&pos?h("div",{ref:list,className:"lla lla-listbox",role:"listbox",id:id+"-m","aria-labelledby":p.inlineLabel?id+"-l":(p.showLabel&&p.label?id+"-label":null),"aria-label":p.inlineLabel||(p.showLabel&&p.label)?null:(p.label||null),
        style:{left:pos.left,top:pos.top!=null?pos.top:"auto",bottom:pos.bottom!=null?pos.bottom:"auto",minWidth:pos.minWidth,maxHeight:pos.maxHeight}},
      opts.map(function(x,i){var on=x.value===val;return h("div",{key:x.value,id:id+"-o"+i,role:"option","aria-selected":on?"true":"false","aria-disabled":x.disabled?"true":null,"data-active":i===act?"true":"false",className:"lla-option",
        onMouseMove:function(){if(!x.disabled&&i!==act)setAct(i);},onMouseDown:function(e){e.preventDefault();},onClick:function(){pick(i);}},
        h("span",{className:"lla-option-label"},x.label),on?h(Icon,{name:"check",className:"lla-option-check"}):null);})):null;
    var portal=box?(RD&&RD.createPortal&&typeof document!=="undefined"?RD.createPortal(box,document.body):box):null;
    var control=h("div",{className:cx("lla lla-select",size!=="toolbar"&&size,p.block&&"block",!(p.showLabel||p.hint||p.error||p.disabledReason)&&p.className),style:!(p.showLabel||p.hint||p.error||p.disabledReason)?p.style:null},
      p.inlineLabel?h("span",{className:"lla-select-inline",id:id+"-l"},p.inlineLabel):null,trigger,portal);
    if(p.showLabel||p.hint||p.error||(p.disabled&&p.disabledReason))
      return h(E_Field,{id:id,label:p.showLabel?p.label:null,hint:p.hint,error:p.error,disabled:p.disabled,disabledReason:p.disabledReason,variant:p.variant,className:p.className,style:p.style},control);
    return control;
  }

  /* ---------- Toggle: shadcn Switch 36x20 ---------- */
  function Toggle(p){
    var st=useControlled(p.checked,!!p.defaultChecked,p.onChange);var auto=useId();var id=p.id||auto;
    var why=p.disabled&&p.disabledReason?id+"-why":null;
    return h("span",{className:cx("lla lla-toggle",p.disabled&&"disabled",p.className),style:p.style},
      h("span",{className:"lla-toggle-row"},
        h("button",{type:"button",role:"switch",id:id,className:"lla-switch","aria-checked":st[0]?"true":"false","aria-labelledby":p.label!=null?id+"-l":null,"aria-label":p.label!=null?null:(p.ariaLabel||null),"aria-describedby":why,disabled:p.disabled,
          onClick:function(){st[1](!st[0]);}},h("span",{className:"lla-switch-thumb","aria-hidden":"true"})),
        p.label!=null?h("label",{id:id+"-l",htmlFor:id,className:"lla-toggle-label"},p.label):null),
      why?h("span",{className:"lla-toggle-why",id:why},p.disabledReason):null);
  }

  /* ---------- Checkbox: D's native 13px checkbox, drawn so every browser matches D's Chrome rendering ---------- */
  function E_CheckMark(p){
    return h("svg",{className:"lla-check-mark",viewBox:"0 0 11 11",fill:"none",stroke:"currentColor",strokeWidth:1.9,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",focusable:"false"},
      p.indeterminate?h("path",{d:"M2.6 5.5h5.8"}):h("path",{d:"M2.3 5.7 4.5 7.9 8.8 3.3"}));
  }
  function Checkbox(p){
    var ref=useRef(null);var auto=useId();var id=p.id||auto;
    useEffect(function(){if(ref.current)ref.current.indeterminate=!!p.indeterminate;},[p.indeterminate]);
    var rest=omit(p,["label","indeterminate","className","hideLabel","disabledReason","description","style","variant","id"]);
    var ids=[];if(p.description)ids.push(id+"-desc");if(p.disabled&&p.disabledReason)ids.push(id+"-why");if(p["aria-describedby"])ids.push(p["aria-describedby"]);
    return h("span",{className:cx("lla lla-check",p.variant&&p.variant!=="default"&&p.variant,p.disabled&&"disabled",p.className),style:p.style},
      h("label",{className:"lla-check-row",htmlFor:id},
        h("input",Object.assign({type:"checkbox"},rest,{ref:ref,id:id,className:"lla-check-input","aria-describedby":ids.length?ids.join(" "):null})),
        h("span",{className:"lla-check-box","aria-hidden":"true"},h(E_CheckMark,{indeterminate:p.indeterminate})),
        p.label!=null?h("span",{className:cx("lla-check-label",p.hideLabel&&"lla-sr")},p.label):null),
      p.description?h("span",{className:"lla-check-desc",id:id+"-desc"},p.description):null,
      p.disabled&&p.disabledReason?h("span",{className:"lla-check-desc why",id:id+"-why"},p.disabledReason):null);
  }

  /* ---------- RadioCard: D's .settings-choice (native radio + bold title + description) ---------- */
  function RadioCard(p){
    var auto=useId();var id=p.id||auto;
    var rest=omit(p,["title","description","className","style","id","disabledReason"]);
    var why=p.disabled&&p.disabledReason?id+"-why":null;
    var ids=[];if(p.description)ids.push(id+"-desc");if(why)ids.push(why);if(p["aria-describedby"])ids.push(p["aria-describedby"]);
    return h("label",{className:cx("lla lla-radiocard",p.disabled&&"disabled",p.className),htmlFor:id,style:p.style},
      h("input",Object.assign({type:"radio"},rest,{id:id,className:"lla-radio-input","aria-describedby":ids.length?ids.join(" "):null})),
      h("span",{className:"lla-radio-dot","aria-hidden":"true"}),
      h("span",{className:"lla-radiocard-body"},
        h("strong",{className:"lla-radiocard-title"},p.title),
        p.description?h("span",{className:"lla-radiocard-desc",id:id+"-desc"},p.description):null,
        why?h("span",{className:"lla-radiocard-why",id:why},p.disabledReason):null));
  }
  function RadioCardGroup(p){
    var auto=useId();var name=p.name||auto;
    var opts=(p.options||[]).map(E_norm);
    var st=useControlled(p.value,p.defaultValue!==undefined?p.defaultValue:(opts[0]&&opts[0].value),p.onChange);
    var why=p.disabled&&p.disabledReason?name+"-why":null;
    return h("fieldset",{className:cx("lla lla-radiogroup",p.disabled&&"disabled",p.className),style:p.style,disabled:p.disabled,"aria-describedby":why},
      p.label!=null?h("legend",{className:cx("lla-field-label",p.hideLabel&&"lla-sr")},p.label):null,
      h("div",{className:"lla-radiogroup-cards"},opts.map(function(x){
        return h(RadioCard,{key:x.value,name:name,value:x.value,title:x.title||x.label||x.value,description:x.description,checked:st[0]===x.value,disabled:p.disabled||x.disabled,onChange:function(){st[1](x.value);}});})),
      why?h("p",{className:"lla-field-hint why",id:why},p.disabledReason):null);
  }

  /* ---------- Chip: D's removable chip is a whole outlined button ("😂 ×", "× Waiting on the creator") ---------- */
  function Chip(p){
    if(!p.onRemove)return h("span",{className:cx("lla lla-rchip static",p.className),style:p.style},p.children);
    var start=p.iconPosition==="start";
    return h(Button,{variant:"secondary",size:p.size,className:cx("lla-rchip",p.className),style:p.style,icon:start?"x":null,iconRight:start?null:"x",
      "aria-label":p.removeLabel||("Remove "+E_text(p.children)),onClick:p.onRemove},p.children);
  }

  /* ---------- FilterChip: Inbox campaign chip with a count pill ---------- */
  function FilterChip(p){
    var n=p.count;var name=p.ariaLabel||(p.unit&&n!=null?E_text(p.label)+", "+n+" "+p.unit+(Number(n)===1?"":"s"):null);
    return h("button",{type:"button",className:cx("lla lla-filterchip",p.className),style:p.style,"aria-pressed":p.selected?"true":"false","aria-label":name,onClick:p.onClick},
      h("span",{className:"lla-filterchip-label"},p.label),
      n!=null?h("span",{className:"lla-filterchip-count","aria-hidden":name?"true":null},n):null);
  }

  /* ---------- FileDropzone: D's "Add a source" upload box ---------- */
  function FileDropzone(p){
    var auto=useId();var id=p.id||auto;
    var title=p.label!=null?p.label:"Drop a file here, or browse";
    function take(f){if(p.onChange)p.onChange(f||null);}
    return h("div",{className:cx("lla lla-dropzone-field",p.disabled&&"disabled",p.className),style:p.style},
      /* D defect fixed: D accepts a drop only on the input itself although the box says "Drop a file here". */
      h("label",{className:"lla-dropzone",htmlFor:id,
          onDragOver:function(e){if(!p.disabled)e.preventDefault();},
          onDrop:function(e){if(p.disabled)return;e.preventDefault();var f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];if(f)take(f);}},
        h("span",{className:"lla-dropzone-title"},title),
        h("input",{type:"file",id:id,className:"lla-dropzone-input",accept:p.accept,name:p.name,disabled:p.disabled,"aria-label":p.ariaLabel||E_text(title),
          "aria-invalid":p.error?"true":null,"aria-describedby":E_describedBy(id,p),onChange:function(e){take(e.target.files&&e.target.files[0]);}}),
        p.hint?h("small",{className:"lla-dropzone-hint",id:id+"-hint"},p.hint):null),
      p.disabled&&p.disabledReason?h("p",{className:"lla-field-hint why",id:id+"-why"},p.disabledReason):null,
      p.error?h("p",{className:"lla-field-error",id:id+"-err",role:"alert"},p.error):null);
  }

  /* ---------- Toolbar pieces ---------- */
  function FilterBar(p){return h("div",{className:cx("lla lla-filterbar",p.className),role:"group","aria-label":p.label||"Filters",style:p.style},p.children);}
  function ResultCount(p){return h("span",{className:cx("lla lla-result-count",p.className),role:"status"},p.shown," of ",p.total);}
  function BulkBar(p){
    var active=!!p.reviewActive;
    return h("div",{className:cx("lla lla-bulkbar",p.className),style:p.style},
      p.reviewCount!=null?h(Button,{variant:active?"primary":"secondary",size:"sm",onClick:p.onReview,"aria-pressed":active?"true":"false"},p.reviewCount+" need review"):null,
      h("span",{className:"lla-bulkbar-count",role:"status"},(p.selectedCount||0)+" selected for outreach"),
      p.children,
      p.sortOptions?h(Select,{size:"sm",label:p.sortLabel||"Sort creators",options:p.sortOptions,value:p.sort,defaultValue:p.defaultSort,onChange:p.onSortChange,width:150,className:"lla-bulkbar-sort"}):null);
  }

  EXPORT("TextInput",TextInput);EXPORT("NumberInput",NumberInput);EXPORT("DateInput",DateInput);EXPORT("Textarea",Textarea);EXPORT("SearchInput",SearchInput);
  EXPORT("Select",Select);EXPORT("Toggle",Toggle);EXPORT("Checkbox",Checkbox);EXPORT("RadioCard",RadioCard);EXPORT("RadioCardGroup",RadioCardGroup);
  EXPORT("Chip",Chip);EXPORT("FilterChip",FilterChip);EXPORT("FileDropzone",FileDropzone);EXPORT("FilterBar",FilterBar);EXPORT("ResultCount",ResultCount);EXPORT("BulkBar",BulkBar);

  /* ===== F-tables ===== */
  /* ===== F: tables, cards, kanban, settings rows, disclosure, selectable tile, creator portal ===== */

  /* D's Badge picks its tone from the text (pretty.js L32066): NEW, Running, ACCEPTED, CONTACTED are positive; digits are scores; everything else is neutral. */
  function F_tone(text,tone){
    if(tone)return tone==="success"?"positive":tone;
    var s=String(text==null?"":text);
    if(/^(NEW|Running|ACCEPTED|CONTACTED)$/i.test(s))return "positive";
    if(/blocked|No numbers/.test(s))return "warning";
    return "neutral";
  }
  function F_initials(name){
    return String(name||"").split(" ").filter(Boolean).map(function(w){return w[0];}).slice(0,2).join("").toUpperCase();
  }

  /* ---------- DataTable ---------- */
  function DataTable(p){
    var cols=p.columns||[],rows=p.rows||[],dens=p.density==="compact"?"compact":"creator";
    var sel=p.selected||[];
    return h("div",{className:cx("lla lla-table-wrap",p.className)},
      h("table",{className:cx("lla-table",dens,p.sticky&&"sticky")},
        p.caption?h("caption",{className:"lla-sr"},p.caption):null,
        h("thead",null,h("tr",null,cols.map(function(c){
          return h("th",{key:c.key,scope:"col",style:c.width!=null?{width:c.width}:null,className:c.align==="right"?"right":null,"aria-sort":c.sort||null},c.header);
        }))),
        h("tbody",null,rows.map(function(r,i){
          var k=r[p.rowKey||"id"];if(k==null)k=i;
          return h("tr",{key:k,"aria-selected":sel.indexOf(k)>=0?"true":null},cols.map(function(c){
            var v=c.render?c.render(r,i):r[c.key];
            return h("td",{key:c.key,className:cx(c.align==="right"&&"right")},c.numeric?h("span",{className:"lla-table-num"},v):v);
          }));
        }))),
      rows.length?null:h("p",{className:"lla-table-empty",role:"status"},p.empty!=null?p.empty:"No rows match these filters."));
  }

  /* ---------- CreatorCell ---------- */
  function CreatorCell(p){
    var bid=useId();
    var short=p.shortName||p.name;
    var badgeText=p.badge!=null?p.badge:(p.status?String(p.status).toUpperCase():null);
    return h("div",{className:cx("lla lla-person",p.className)},
      h(Avatar,{initials:p.initials||F_initials(short),variant:p.variant||1}),
      h("div",{className:"lla-person-text"},
        h("button",{type:"button",className:"lla-person-name",title:p.name,"aria-label":"Review "+short,"aria-describedby":badgeText!=null?bid:null,onClick:p.onOpen},
          p.name,badgeText!=null?" ":null,badgeText!=null?h("span",{id:bid,className:"lla-person-badge"},h(Badge,{tone:F_tone(badgeText,p.badgeTone)},badgeText)):null),
        p.role?h("div",{className:"lla-person-role"},p.role):null,
        p.added?h("small",{className:"lla-person-date"},p.added):null));
  }

  /* ---------- PlatformIcons: D's text marks, not logos ---------- */
  var F_PLATFORM={linkedin:["in","LinkedIn",1],x:["\ud835\udd4f","X",1],youtube:["\u25b6","YouTube",1],instagram:["Instagram","Instagram",0],tiktok:["TikTok","TikTok",0]};
  function PlatformIcons(p){
    var list=(p.platforms||[]).filter(function(k){return F_PLATFORM[k];});
    var names=list.map(function(k){return F_PLATFORM[k][1];}).join(", ");
    var kids=[];
    list.forEach(function(k,i){
      if(i)kids.push(" ");
      kids.push(h("span",{key:k,className:F_PLATFORM[k][2]?"lla-platform-mark":"lla-platform-word","aria-hidden":"true"},F_PLATFORM[k][0]));
    });
    return h("span",{className:cx("lla lla-platforms",p.tone==="inline"&&"inline",p.className),role:"img","aria-label":names||"No platforms",title:names||null},kids);
  }

  /* ---------- RowActions ---------- */
  function RowActions(p){
    var n=p.name||"creator",s=String(p.state||"pending").toLowerCase();
    var box=function(kids){return h("div",{className:cx("lla lla-ractions",p.className)},kids);};
    if(s==="pending"||s==="new")return box([
      h(IconButton,{key:"a",variant:"outline",size:"sm",tone:"accept",icon:"check",label:"Accept "+n,onClick:p.onAccept}),
      h(IconButton,{key:"r",variant:"outline",size:"sm",tone:"reject",icon:"x",label:"Reject "+n,onClick:p.onReject})]);
    if(s==="rejected")return box(h(Badge,{tone:"neutral"},"Rejected"));
    if(s==="proposal")return box(h(Badge,{tone:"neutral"},"Review with Ivy"));
    if(s==="added")return box(h(Badge,{tone:"neutral"},"Added"));
    /* D quirk kept on purpose: a lone Message button matches both :first-child:hover and :last-child:hover, so it hovers in the reject tones. */
    return box(h(IconButton,{variant:"outline",size:"sm",tone:"reject",icon:"message-circle",label:"Message "+n,onClick:p.onMessage}));
  }

  /* ---------- CampaignCard + CampaignGrid ---------- */
  function CampaignCard(p){
    return h("div",{className:cx("lla lla-ccard",p.selected&&"selected",p.className)},
      h("div",{className:"lla-ccard-head"},
        h("button",{type:"button",className:"lla-ccard-title","aria-current":p.selected?"true":null,onClick:p.onSelect},p.name),
        p.status?h(Badge,{tone:F_tone(p.status,p.statusTone)},p.status):null),
      p.subline?h("p",{className:"lla-ccard-sub"},p.subline):null,
      p.stats&&p.stats.length?h("div",{className:"lla-ccard-stats"},p.stats.map(function(s,i){
        return h("div",{key:i,className:"lla-ccard-stat"},h("strong",null,s.value),h("small",null,s.label));})):null);
  }
  function CampaignGrid(p){
    return h("section",{className:cx("lla lla-cgrid",p.className),"aria-label":p.label||"Campaigns"},
      p.children,
      p.onNew?h("div",{className:"lla-cgrid-new"},h(Button,{variant:"ghost",size:"toolbar",icon:"plus",onClick:p.onNew},p.newLabel||"New campaign")):null);
  }

  /* ---------- Kanban ---------- */
  function KanbanCard(p){
    var short=p.shortName||p.name;
    var line=[];
    if(p.platforms&&p.platforms.length)line.push(h(PlatformIcons,{key:"p",platforms:p.platforms,tone:"inline"}));
    if(p.meta!=null)line.push(h(Fragment,{key:"m"},line.length?" \u00b7 ":null,p.meta));
    return h("div",{className:cx("lla lla-kcard",p.className)},
      h("button",{type:"button",className:"lla-kcard-open","aria-label":p.label||("Review "+short+" in pipeline"),onClick:p.onOpen},
        h("span",{className:"lla-kcard-person"},h(Avatar,{initials:p.initials||F_initials(short),size:"card",variant:p.variant||1}),h("strong",null,p.name)),
        line.length?h("span",{className:"lla-kcard-meta"},line):null,
        (p.detail!=null||p.score!=null)?h("span",{className:"lla-kcard-foot"},h("small",null,p.detail),p.score!=null?h(ScoreChip,{value:p.score}):null):null));
  }
  function KanbanBoard(p){
    var baseId=useId();
    var render=p.renderCard||function(c){return h(KanbanCard,c);};
    var lanes=p.variant==="lanes";
    return h(Fragment,null,
      p.summary!=null?h("p",{className:cx("lla lla-kanban-summary",lanes&&"lanes")},p.summary):null,
      h("div",{className:cx("lla lla-kanban",lanes&&"lanes",p.className),role:"region","aria-label":p.label||"Pipeline",tabIndex:0,style:p.columnWidth?{"--lla-kanban-col":typeof p.columnWidth==="number"?p.columnWidth+"px":p.columnWidth}:null},
        (p.columns||[]).map(function(c,i){
          var cards=c.cards||[],id=baseId+"-c"+i,n=c.count!=null?c.count:cards.length;
          return h("section",{key:c.id||i,className:"lla-kcol","aria-labelledby":id},
            h("div",{className:"lla-kcol-head"},
              h("h3",{className:"lla-kcol-title",id:id},c.title),
              h(CountBadge,null,h("span",{className:"lla-sr"},"Count "),n)),
            cards.length?h("ul",{className:"lla-kcol-list"},cards.map(function(k,j){return h("li",{key:k.id||j},render(k,c));}))
              :h("p",{className:"lla-kcol-empty"},c.empty!=null?c.empty:(p.emptyText||"Empty")));
        })));
  }

  /* ---------- ListRow ---------- */
  function ListRow(p){
    var Tag=p.as||"div";
    if(p.label!=null){
      var val=p.onValueClick?h("button",{type:"button",className:"lla-lrow-link",onClick:p.onValueClick},p.value):p.value;
      return h(Tag,{className:cx("lla lla-lrow pair",p.density==="compact"&&"compact",p.className)},h("span",{className:"lla-lrow-label"},p.label),h("strong",{className:"lla-lrow-value"},val),p.actions||null);
    }
    return h(Tag,{className:cx("lla lla-lrow",p.density==="compact"&&"compact",p.className)},
      p.leading||null,
      h("div",{className:"lla-lrow-grow"},
        p.title!=null?h("strong",{className:"lla-lrow-title"},p.title):null,
        p.description!=null?h("p",{className:"lla-lrow-desc",id:p.descriptionId||null},p.description):null,
        p.children||null),
      p.meta!=null?h("div",{className:"lla-lrow-meta"},p.meta):null,
      p.actions?h("div",{className:"lla-lrow-actions"},p.actions):null);
  }

  /* ---------- SettingsSection + SettingsHeader ---------- */
  function SettingsSection(p){
    var Hd="h"+(p.headingLevel||2);var hid=useId();
    var head=h(Hd,{className:"lla-ssection-title",id:hid},p.title);
    return h("section",{className:cx("lla lla-ssection",p.className),"aria-labelledby":hid,id:p.id||null},
      (p.meta!=null||p.actions)?h("div",{className:"lla-ssection-head"},head,p.meta!=null?h("small",{className:"lla-ssection-meta"},p.meta):null,p.actions||null):head,
      p.description!=null?h("p",{className:"lla-ssection-desc"},p.description):null,
      p.card===false?p.children:h("div",{className:"lla-ssection-card"},p.children),
      typeof p.footer==="string"?h("p",{className:"lla-ssection-desc"},p.footer):(p.footer||null));
  }
  function SettingsHeader(p){
    return h("header",{className:cx("lla lla-sheader",p.className)},
      p.eyebrow!=null?h("small",{className:"lla-sheader-eyebrow"},p.eyebrow):null,
      h("h1",{className:"lla-sheader-title"},p.mark!=null?h("span",{className:"lla-sheader-mark","aria-hidden":"true"},p.mark):null,p.title),
      p.code!=null?h("div",{className:"lla-sheader-id"},h("code",{className:"lla-code-chip"},p.code),p.codeLabel!=null?h("small",null," ",p.codeLabel):null):null,
      p.children?h("div",{className:"lla-sheader-actions"},p.children):null);
  }

  /* ---------- Disclosure: native details/summary ---------- */
  function Disclosure(p){
    var inline=p.variant==="inline";
    var st=useState(p.open!=null?p.open:!!p.defaultOpen);var open=p.open!=null?p.open:st[0];
    function toggle(e){var o=e.currentTarget.open;if(p.open==null)st[1](o);if(p.onToggle&&o!==open)p.onToggle(o);}
    var body=[];
    if(p.items&&p.items.length)body.push(h("dl",{key:"dl",className:"lla-disclosure-dl"},p.items.map(function(it,i){return h("div",{key:i},h("dt",null,it.label),h("dd",null,it.value));})));
    if(p.children!=null)body.push(h(Fragment,{key:"c"},p.children));
    if(p.note!=null)body.push(h("p",{key:"n",className:"lla-disclosure-note"},p.note));
    var details=h("details",{className:"lla-disclosure-details",open:open,onToggle:toggle},
      h("summary",{className:"lla-disclosure-summary"},
        inline?null:h(Icon,{name:"chevron-right",className:"lla-disclosure-chev"}),
        h("span",{className:"lla-disclosure-label"},p.summary),
        !inline&&p.status!=null?h("span",{className:"lla-disclosure-status"},p.status):null,
        inline?h(Icon,{name:"chevron-down",className:"lla-disclosure-chev"}):null),
      h("div",{className:"lla-disclosure-body"},body));
    return inline?h("div",{className:cx("lla lla-disclosure inline",p.className)},details):h("section",{className:cx("lla lla-disclosure card",p.className),"aria-label":p.label||null},details);
  }

  /* ---------- SelectableTile ---------- */
  function SelectableTile(p){
    var rid=useId();
    var why=p.disabled&&p.disabledReason?h("p",{id:rid,className:"lla-tile-why"},p.disabledReason):null;
    /* The radio variant is group E's RadioCard (D .settings-choice): one implementation for the role cards. */
    if(p.variant==="radio")return h(RadioCard,{name:p.name,value:p.value,checked:!!p.selected,disabled:p.disabled,disabledReason:p.disabledReason,title:p.title,description:p.description,className:p.className,onChange:function(){if(p.onSelect)p.onSelect(p.value);}});
    return h(Fragment,null,h("button",{type:"button",className:cx("lla lla-tile",p.selected&&"selected",p.className),"aria-pressed":p.selected?"true":"false",disabled:p.disabled,"aria-describedby":why?rid:null,onClick:function(){if(p.onSelect)p.onSelect(p.value);}},
      h("strong",null,p.title),p.description!=null?h("span",{className:"lla-tile-desc"},p.description):null),why);
  }

  /* ---------- PortalShell: the public creator page (Arial, green) ---------- */
  function F_PortalButton(b,i){
    return h("button",{key:b.id||i,type:"button",className:cx("lla-portal-btn",b.primary&&"primary"),disabled:b.disabled,"aria-describedby":b.describedBy||null,onClick:b.onClick},b.label);
  }
  function PortalShell(p){
    var tid=useId();
    return h("main",{className:cx("lla lla-portal",p.className),"aria-labelledby":p.title!=null?tid:null},h("div",{className:"lla-portal-page"},
      h("header",{className:"lla-portal-top"},h("span",{className:"lla-portal-brand"},p.brand||"limelight"),p.context!=null?h("span",null,p.context):null),
      p.banner!=null?h("div",{className:"lla-portal-banner"},p.banner):null,
      p.heading!==false?h("div",{className:"lla-portal-heading"},
        p.eyebrow!=null?h("small",null,p.eyebrow):null,
        h("h1",{id:tid},p.title),
        p.lead!=null?h("p",null,p.lead):null):null,
      h("div",{className:"lla-portal-layout"},
        h("article",{className:"lla-portal-article"},
          p.glance&&p.glance.length?h("div",{className:"lla-portal-glance"},p.glance.map(function(g,i){return h("div",{key:i},h("small",null,g.label),h("strong",null,g.value));})):null,
          (p.sections||[]).map(function(s,i){
            return h("section",{key:s.title||i,className:"lla-portal-section"},h("h2",null,s.title),
              (s.fields||[]).map(function(f,j){
                return h("div",{key:j,className:"lla-portal-field"},h("h3",null,f.label),
                  f.href?h("a",{href:f.href,target:"_blank",rel:"noopener noreferrer"},f.value!=null?f.value:f.href,h(Icon,{name:"arrow-up-right",className:"lla-portal-ext",label:"opens in a new tab"})):h("p",null,f.value));
              }));
          }),
          p.children||null),
        (p.asideTitle!=null||p.actions||p.aside)?h("aside",{className:"lla-portal-aside","aria-label":p.asideLabel||"Your response"},
          p.asideTitle!=null?h("h2",null,p.asideTitle):null,
          p.asideIntro!=null?h("p",null,p.asideIntro):null,
          p.aside||null,
          p.actions&&p.actions.length?h("div",{className:"lla-portal-actions"},p.actions.map(F_PortalButton)):null):null)));
  }

  EXPORT("DataTable",DataTable);EXPORT("CreatorCell",CreatorCell);EXPORT("PlatformIcons",PlatformIcons);EXPORT("RowActions",RowActions);
  EXPORT("CampaignCard",CampaignCard);EXPORT("CampaignGrid",CampaignGrid);EXPORT("KanbanBoard",KanbanBoard);EXPORT("KanbanCard",KanbanCard);
  EXPORT("ListRow",ListRow);EXPORT("SettingsSection",SettingsSection);EXPORT("SettingsHeader",SettingsHeader);EXPORT("Disclosure",Disclosure);
  EXPORT("SelectableTile",SelectableTile);EXPORT("PortalShell",PortalShell);

  /* ===== G-teamops-inbox ===== */
  /* ===== Team operations (Approvals, Activity, Rituals & Skills) and Ivy Inbox ===== */
  /* Other groups' components, resolved at render time. A missing one renders its children plainly so a preview never crashes. */
  function G_ext(){
    return {
      Drawer:typeof Drawer==="function"?Drawer:null,
      Dialog:typeof Dialog==="function"?Dialog:null,
      KebabMenu:typeof KebabMenu==="function"?KebabMenu:null,
      Snackbar:typeof Snackbar==="function"?Snackbar:null,
      TextInput:typeof TextInput==="function"?TextInput:null,
      Select:typeof Select==="function"?Select:null,
      DateInput:typeof DateInput==="function"?DateInput:null,
      Checkbox:typeof Checkbox==="function"?Checkbox:null
    };
  }
  function G_v(e){return e&&e.target?(e.target.type==="checkbox"?e.target.checked:e.target.value):e;}
  function G_overlay(Comp,props,body){
    if(Comp)return h(Comp,props,body);
    return props.open?h("div",{className:"lla lla-g-missing",role:"dialog","aria-label":props.title||props.label},body):null;
  }
  /* D's drawer field: a <label> holding its text and an inline 212px textarea, so the text sits beside the field's bottom edge. */
  function G_area(label,aria,props){
    return h("label",{className:"lla-opov-field"},label,h("textarea",Object.assign({className:"lla-opov-textarea","aria-label":aria},props)));
  }
  function G_heading(level,def){var n=level||def;return "h"+(n<1?1:n>6?6:n);}

  /* ---------- CountHeader: kicker, page title, subtitle, big count, toolbar row ---------- */
  function CountHeader(p){
    var kicker=p.kicker===undefined?"LIMELIGHT / YOUR TEAM":p.kicker;
    return h("div",{className:cx("lla lla-ops-head",p.className)},
      h("div",{className:"lla-ops-head-row"},
        h("div",{className:"lla-ops-head-text"},
          kicker?h("p",{className:"lla-ops-kicker"},kicker):null,
          h(G_heading(p.level,1),{className:"lla-ops-title"},p.title),
          p.description?h("p",{className:"lla-ops-desc"},p.description):null),
        p.count!=null?h("p",{className:"lla-ops-count"},h("span",{className:"lla-ops-count-n"},p.count)," ",h("small",null,p.countLabel||"need your decision")):null),
      p.toolbar?h("div",{className:"lla-ops-toolbar"},p.toolbar):null);
  }

  /* ---------- ApprovalRow: one decision card in the Approvals list ---------- */
  function ApprovalRow(p){
    var tid=useId();
    var status=p.status||"Pending";
    var badge=p.badge!==undefined?p.badge:(p.kind==="Rate negotiation"?"Always review":status);
    var pending=status==="Pending";
    return h("article",{className:cx("lla lla-appr",p.className),"aria-labelledby":tid},
      h("div",{className:"lla-appr-in"},
        h("div",{className:"lla-appr-top"},
          h("span",{className:"lla-ops-agent"},p.agent," ",h("span",{className:"lla-ops-kind"},"/ ",p.kind)),
          badge?h(Badge,null,badge):null),
        h(G_heading(p.level,2),{id:tid,className:"lla-appr-title"},p.title),
        p.context?h("p",{className:"lla-appr-context"},p.context):null,
        p.body?h("blockquote",{className:"lla-appr-body"},p.body):null,
        h("div",{className:"lla-appr-actions"},
          h(Button,{variant:"secondary",onClick:p.onReview,"aria-describedby":tid,"aria-haspopup":"dialog"},p.reviewLabel||"Review details"),
          pending?h(Button,{variant:"primary",onClick:p.onApprove,"aria-describedby":tid},"Approve"):null,
          pending?h(Button,{variant:"secondary",onClick:p.onReject,"aria-describedby":tid},"Reject"):null)));
  }

  /* ---------- ApprovalReviewDrawer: the 640px review drawer (also the read-only activity record) ---------- */
  function ApprovalReviewDrawer(p){
    var X=G_ext(),it=p.item||{};
    var isRecord=it.kind==="Activity record";
    var pending=!isRecord&&(it.status||"Pending")==="Pending";
    var st=useControlled(p.value,it.body||"",p.onChange),text=st[0],setText=st[1];
    var last=useRef(it.id);
    useEffect(function(){if(p.value===undefined&&last.current!==it.id){last.current=it.id;setText(it.body||"");}},[it.id]);
    var rid=useId();
    var blank=!String(text||"").trim();
    var label=p.fieldLabel||(isRecord?"Recorded outcome":"Proposed action");
    var body=h("div",{className:"lla-opov-stack"},
      h("span",{className:"lla-opov-badge"},it.agent," · ",it.kind),
      it.context?h("p",null,it.context):null,
      G_area(label,"Proposed action",{rows:8,value:text,readOnly:!pending,onChange:function(e){setText(G_v(e));}}),
      it.kind==="Rate negotiation"?h("p",null,"Rate and budget changes always require your approval."):null,
      h("p",{className:"lla-opov-muted"},p.disclaimer||"This prototype records the decision. It does not send messages or publish content."),
      pending?h("div",{className:"lla-opov-actions"},
        h(Button,{variant:"primary",disabled:blank,"aria-describedby":blank?rid:null,onClick:function(){if(p.onApprove)p.onApprove(text,it);}},p.approveLabel||"Approve & next"),
        h(Button,{variant:"secondary",onClick:function(){if(p.onReject)p.onReject(text,it);}},p.rejectLabel||"Reject")):null,
      pending&&blank?h("p",{id:rid,className:"lla-opov-reason"},"Write the proposed action to approve it. Reject stays available."):null);
    return G_overlay(X.Drawer,{open:!!p.open,onClose:p.onClose,title:it.title,subtitle:p.subtitle||"Limelight · Local prototype",width:640,label:it.title},body);
  }

  /* ---------- ActivityItem: one record on the Activity timeline ---------- */
  function ActivityItem(p){
    var tid=useId();
    var time=p.time?(p.dateTime?h("time",{dateTime:p.dateTime},p.time):p.time):null;
    return h("article",{className:cx("lla lla-act",p.className),"aria-labelledby":tid},
      h("span",{className:"lla-act-dot"}),
      h("div",{className:"lla-act-main"},
        h("p",{className:"lla-act-meta"},p.agent,p.example?" · Example":null,time?" · ":null,time),
        h(G_heading(p.level,3),{id:tid,className:"lla-act-title"},p.title),
        p.detail?h("p",{className:"lla-act-detail"},p.detail):null,
        p.onView!==null?h(Button,{variant:"secondary",onClick:p.onView,"aria-describedby":tid,"aria-haspopup":"dialog"},p.viewLabel||"View record"):null));
  }

  /* ---------- PendingActionCard: a delayed ritual action that waits one minute before it runs ---------- */
  function PendingActionCard(p){
    var tid=useId();
    return h("section",{className:cx("lla lla-pend",p.className),"aria-labelledby":tid},
      h("div",{className:"lla-pend-badge"},h(Badge,null,p.badge||"Awaiting execution")),
      h(G_heading(p.level,3),{id:tid,className:"lla-pend-title"},p.title),
      h("p",{className:"lla-pend-text"},p.description||"Runs after a one-minute review window. Cancel to veto."),
      h(Button,{variant:"secondary",onClick:p.onCancel,"aria-describedby":tid},p.cancelLabel||"Cancel action"));
  }

  /* ---------- RitualCard: a recurring ritual with its schedule, control and run actions (+ the Edit ritual dialog) ---------- */
  var G_MODES=["Manual approval","Delayed with veto","Automatic"];
  var G_MODE_HELP={"Manual approval":"Every suggested action waits in Approvals.","Delayed with veto":"A one-minute preview window lets you cancel from Activity.","Automatic":"Ritual actions complete in the simulation. Rate and budget decisions still require approval."};
  function RitualCard(p){
    var X=G_ext(),tid=useId(),rid=useId(),sid=useId();
    var active=p.active!==false;
    var eo=useControlled(p.editOpen,false,p.onEditOpenChange),editOpen=eo[0],setEditOpen=eo[1];
    var dr=useState(null),draft=dr[0],setDraft=dr[1];
    var cur=draft||{schedule:p.schedule||"",next:p.next||"",mode:p.mode||G_MODES[0]};
    function openEdit(pre){setDraft({schedule:p.schedule||"",next:p.next||"",mode:(pre&&pre.mode)||p.mode||G_MODES[0]});setEditOpen(true);if(p.onEdit)p.onEdit(pre||null);}
    useEffect(function(){if(editOpen&&!draft)setDraft({schedule:p.schedule||"",next:p.next||"",mode:p.editMode||p.mode||G_MODES[0]});if(!editOpen&&draft)setDraft(null);},[editOpen]);
    function upd(k,v){var n=Object.assign({},cur);n[k]=v;setDraft(n);}
    var runReason=p.runDisabledReason||(!active?"Paused. Resume the ritual to run it now.":null);
    var runOff=!active||!!p.runDisabled;
    var invalid=!String(cur.schedule||"").trim()||!cur.next;
    var suggest=p.approvals>=3&&(p.mode||G_MODES[0])==="Manual approval";
    var edit=h("div",{className:"lla-opov-stack"},
      h("h3",null,p.name),
      X.TextInput?h(X.TextInput,{label:"Schedule",value:cur.schedule,onChange:function(e){upd("schedule",G_v(e));}}):null,
      (X.DateInput||X.TextInput)?h(X.DateInput||X.TextInput,{label:"Next run",type:"datetime-local",value:String(cur.next||"").replace(" ","T"),onChange:function(e){upd("next",String(G_v(e)||"").replace("T"," "));}}):null,
      X.Select?h(X.Select,{label:"Approval mode",showLabel:true,size:"md",block:true,options:G_MODES,value:cur.mode,onChange:function(v){upd("mode",G_v(v));}}):null,
      h("p",null,G_MODE_HELP[cur.mode]||""),
      h("small",{className:"lla-opov-small"},"Autonomy concept for review. No live actions run."),
      h(Button,{variant:"primary",block:true,disabled:invalid,"aria-describedby":invalid?sid:null,onClick:function(){if(p.onSave)p.onSave({schedule:cur.schedule,next:cur.next,mode:cur.mode});setEditOpen(false);}},"Save ritual"),
      invalid?h("p",{id:sid,className:"lla-opov-reason"},"Add a schedule and a next run to save the ritual."):null);
    return h(Fragment,null,
      h("section",{className:cx("lla lla-rit",p.className),"aria-labelledby":tid},
        h("div",{className:"lla-rit-top"},h("span",{className:"lla-ops-agent"},p.agent),h(Badge,null,active?"Active":"Paused")),
        h(G_heading(p.level,2),{id:tid,className:"lla-rit-name"},p.name),
        p.description?h("p",{className:"lla-rit-desc"},p.description):null,
        h("dl",{className:"lla-rit-meta"},
          h("div",null,h("dt",null,"Schedule"),h("dd",null,p.schedule)),
          h("div",null,h("dt",null,"Control"),h("dd",null,p.mode||G_MODES[0])),
          h("div",null,h("dt",null,"Next run"),h("dd",null,active?p.next:"Paused"))),
        p.lastRun?h("p",{className:"lla-rit-last"},"Last simulated run: ",p.lastRun):null,
        suggest?h("div",{className:"lla-rit-suggest"},
          h("strong",null,"You approved this ritual ",p.approvals," times."),
          h("p",null,"Would a review window work better? You can still cancel each action before it runs."),
          h(Button,{variant:"secondary","aria-haspopup":"dialog",onClick:function(){openEdit({mode:"Delayed with veto"});}},"Review automation option"),
          h("small",null,"Nothing changes until you save.")):null,
        h("div",{className:"lla-rit-actions"},
          h(Button,{variant:"secondary",onClick:p.onToggle,"aria-describedby":tid},active?"Pause":"Resume"),
          h(Button,{variant:"secondary","aria-haspopup":"dialog","aria-describedby":tid,onClick:function(){openEdit(null);}},"Edit ritual"),
          h(Button,{variant:"primary",disabled:runOff,"aria-describedby":runOff&&runReason?rid:tid,onClick:p.onRunNow},"Run now")),
        runOff&&runReason?h("p",{id:rid,className:"lla-rit-reason"},runReason):null),
      G_overlay(X.Dialog,{open:!!editOpen,onClose:function(){setEditOpen(false);},title:"Edit ritual",subtitle:"Limelight · Local prototype",size:"centered",label:"Edit ritual"},edit));
  }

  /* ---------- SkillCard: a skill template card (+ the Configure workflow drawer) ---------- */
  function SkillCard(p){
    var X=G_ext(),tid=useId(),rid=useId();
    var co=useControlled(p.configureOpen,!!p.defaultOpen,p.onConfigureOpenChange),open=co[0],setOpen=co[1];
    var tx=useState(p.draft!=null?p.draft:p.description||""),text=tx[0],setText=tx[1];
    var sv=useState(false),saved=sv[0],setSaved=sv[1];
    useEffect(function(){if(open){setText(p.draft!=null?p.draft:p.description||"");setSaved(!!p.saved);}},[open]);
    var blank=!String(text||"").trim();
    var cfg=h("div",{className:"lla-opov-stack"},
      h("h2",{className:"lla-skill-cfg-name"},p.name),
      G_area("Instructions","Workflow instructions",{rows:6,value:text,onChange:function(e){setText(G_v(e));setSaved(false);}}),
      h("p",null,"Review and customize this starting point. Execution still requires your approval."),
      h(Button,{variant:"primary",block:true,disabled:blank,"aria-describedby":blank?rid:null,onClick:function(){if(p.onSaveDraft)p.onSaveDraft(text);setSaved(true);}},"Save workflow draft"),
      blank?h("p",{id:rid,className:"lla-opov-reason"},"Write the instructions to save a draft."):null,
      h("p",{role:"status",className:"lla-opov-muted"},saved?"Workflow draft saved. Nothing has run.":""));
    return h(Fragment,null,
      h("section",{className:cx("lla lla-skill",p.className),"aria-labelledby":tid},
        h(G_heading(p.level,3),{id:tid,className:"lla-skill-name"},p.name),
        p.description?h("p",{className:"lla-skill-desc"},p.description):null,
        h(Button,{variant:"secondary","aria-haspopup":"dialog","aria-describedby":tid,onClick:function(){setOpen(true);if(p.onUse)p.onUse();}},p.useLabel||"Use template")),
      G_overlay(X.Drawer,{open:!!open,onClose:function(){setOpen(false);},title:"Configure workflow",subtitle:"Limelight · Local prototype",width:640,label:"Configure workflow"},cfg));
  }

  /* ---------- ThreadListItem: one conversation in the Inbox thread list ---------- */
  function ThreadListItem(p){
    return h("button",{type:"button",className:cx("lla lla-thread",p.className),"aria-current":p.selected?"true":null,onClick:p.onSelect},
      h("span",{className:"lla-thread-person"},h(Avatar,{initials:p.initials,variant:p.avatarVariant||1,size:"card"}),h("span",{className:"lla-thread-name"},p.name)),
      h("span",{className:"lla-thread-meta"},[p.campaign,p.time].filter(Boolean).join(" · ")),
      p.status?h(Badge,{className:"lla-thread-badge"},p.status):null,
      p.preview?h("span",{className:"lla-thread-preview"},p.preview):null,
      p.unread?h("small",{className:"lla-thread-unread"},"Unread"):null);
  }

  /* ---------- ThreadHeader: creator, role and campaign above a conversation, with the Thread actions menu ---------- */
  function ThreadHeader(p){
    var X=G_ext();
    return h("div",{className:cx("lla lla-thdr",p.className)},
      h("button",{type:"button",className:"lla-thdr-link","aria-haspopup":"dialog","aria-label":"View creator context for "+(typeof p.name==="string"?p.name:""),onClick:p.onViewCreator},
        h("span",{className:"lla-thread-person"},h(Avatar,{initials:p.initials,variant:p.avatarVariant||1,size:"card"}),h("span",{className:"lla-thread-name"},p.name)),
        h("span",{className:"lla-thdr-view"},p.viewLabel||"View creator",h(Icon,{name:"arrow-up-right"}))),
      p.role?h("span",{className:"lla-thdr-role"},p.role):null,
      p.campaign?h("span",{className:"lla-thdr-campaign"},p.campaign):null,
      p.menuItems&&X.KebabMenu?h("div",{className:"lla-thdr-menu"},h(X.KebabMenu,{label:p.menuLabel||"Thread actions",items:p.menuItems})):null);
  }

  /* ---------- MessageBubble: one message in a conversation ---------- */
  function MessageBubble(p){
    var dir=p.direction==="out"?"out":p.direction==="internal"?"internal":"in";
    var meta=[p.author].concat(p.meta?[p.meta]:[]).filter(Boolean).join(" · ");
    return h("div",{className:cx("lla lla-msg",dir,p.draft&&"draft",p.className)},
      h("p",{className:"lla-msg-meta"},meta),
      h("p",{className:"lla-msg-body"},p.children),
      p.draft&&p.onReviewDraft?h(Button,{variant:"secondary",onClick:p.onReviewDraft},p.reviewLabel||"Review draft"):null);
  }

  /* ---------- ReadCard: Ivy's recommendation for a thread ---------- */
  function ReadCard(p){
    var tid=useId();
    var pills=p.pills||[],facts=p.facts||[],acts=p.actions||[];
    return h("section",{className:cx("lla lla-read",p.className),"aria-labelledby":tid},
      h("div",{className:"lla-read-top"},h("span",{className:"lla-read-eyebrow"},p.eyebrow||"IVY’S READ"),p.status?h(Badge,null,p.status):null),
      h(G_heading(p.level,2),{id:tid,className:"lla-read-headline"},p.headline),
      p.children?h("p",{className:"lla-read-text"},p.children):null,
      pills.length?h("div",{className:"lla-read-pills"},pills.map(function(x,i){return h(Badge,{key:i},x);})):null,
      facts.length?h("dl",{className:"lla-read-facts"},facts.map(function(f,i){return h("div",{key:i},h("dt",null,f.label),h("dd",null,f.value));})):null,
      acts.length?h("div",{className:"lla-read-actions"},acts.map(function(a,i){
        var prim=a.primary!==undefined?a.primary:i===0;
        return h(Button,{key:i,variant:prim?"primary":"secondary",onClick:a.onClick,disabled:a.disabled,"aria-haspopup":a.haspopup||null},a.label);})):null);
  }

  /* ---------- InlinePaymentCard: 'Review & pay' in the conversation, the payment record, and the completion snackbar ---------- */
  function InlinePaymentCard(p){
    var X=G_ext(),tid=useId(),rid=useId();
    var providers=p.providers||["Stripe","Lumanu"];
    var pv=useControlled(p.provider,providers[0],p.onProviderChange),prov=pv[0],setProv=pv[1];
    var ap=useControlled(p.approved,false,p.onApprovedChange),ok=ap[0],setOk=ap[1];
    var record=p.mode==="record";
    var failed=record&&p.status==="Failed";
    var money=p.amount+" "+(p.currency||"USD");
    var kids=[
      h("p",{key:"e",className:"lla-pay-eyebrow"},p.eyebrow||"IVY · PAYMENT REVIEW"),
      h("h3",{key:"t",id:tid,className:"lla-pay-title"},record?"Payment record":(p.title||"Review & pay")),
      h("p",{key:"w"},[p.creator,p.campaign].filter(Boolean).join(" · ")),
      h("strong",{key:"a",className:"lla-pay-amount"},money)];
    if(record){
      kids.push(h("p",{key:"s",role:"status",className:failed?"lla-pay-failed":null},(p.status||"Paid")+" · "+prov));
      if(p.reference)kids.push(h("p",{key:"r"},"Reference: "+p.reference));
      kids.push(h("p",{key:"n"},failed?"The simulated provider declined this payment. No completed payment was recorded. Review funding and retry.":(p.recordNote||"Recorded in Payments. You can continue this conversation.")));
      kids.push(h(Button,{key:"c",variant:"secondary",onClick:p.onClose},"Close payment details"));
    }else{
      if(p.lastAttempt==="Failed")kids.push(h("p",{key:"f",role:"status",className:"lla-pay-failed"},"The simulated provider declined this payment. No completed payment was recorded. Review funding and retry."));
      kids.push(h("p",{key:"d"},[p.deliverable,p.terms||"Organic publication only. Confirm delivery dates in the conversation; paid usage and exclusivity need separate agreement."].filter(Boolean).join(" · ")));
      kids.push(h("label",{key:"pl",className:"lla-pay-field"},"Payment provider",
        h("select",{className:"lla-pay-select",value:prov,onChange:function(e){setProv(G_v(e));}},providers.map(function(o){return h("option",{key:o,value:o},o);}))));
      kids.push(h("p",{key:"rd"},p.readiness||"Demo readiness: business verified, creator payout account ready, funds available. Fees: $0 in this simulation."));
      kids.push(X.Checkbox?h("div",{key:"cb",className:"lla-pay-check"},h(X.Checkbox,{variant:"flow",label:"I approve the proposal scope and "+p.amount+" payment via "+prov+".",checked:!!ok,onChange:function(e){setOk(!!G_v(e));}})):null);
      kids.push(h("p",{key:"sim"},"Interactive simulation. No real money moves."));
      kids.push(h("div",{key:"ac",className:"lla-pay-actions"},
        h(Button,{variant:"secondary",onClick:p.onCancel},"Cancel"),
        h(Button,{variant:"primary",disabled:!ok,"aria-describedby":!ok?rid:null,onClick:function(){if(p.onConfirm)p.onConfirm({provider:prov});}},p.confirmLabel||"Confirm simulated payment")));
      if(!ok)kids.push(h("p",{key:"why",id:rid,className:"lla-pay-reason"},"Tick the approval box to confirm the payment."));
    }
    var c=p.confirmation;
    return h(Fragment,null,
      h("section",{className:cx("lla lla-pay",p.className),"aria-label":p.label||"Payment review in conversation"},kids),
      c&&X.Snackbar?h(X.Snackbar,{open:c.open!==false,title:c.title,message:c.detail,actions:c.actions||[],onClose:c.onDismiss,closeLabel:c.dismissLabel||"Dismiss payment confirmation"}):null);
  }

  EXPORT("CountHeader",CountHeader);EXPORT("ApprovalRow",ApprovalRow);EXPORT("ApprovalReviewDrawer",ApprovalReviewDrawer);
  EXPORT("ActivityItem",ActivityItem);EXPORT("PendingActionCard",PendingActionCard);EXPORT("RitualCard",RitualCard);EXPORT("SkillCard",SkillCard);
  EXPORT("ThreadListItem",ThreadListItem);EXPORT("ThreadHeader",ThreadHeader);EXPORT("MessageBubble",MessageBubble);EXPORT("ReadCard",ReadCard);EXPORT("InlinePaymentCard",InlinePaymentCard);

  /* ===== H-cal-metrics-elliot-seq ===== */
  /* ===== H: calendars, booking stepper, readiness, metrics, Elliot content, sequence builder ===== */
  var H_MON=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var H_DAY=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var H_WD=["SUN","MON","TUE","WED","THU","FRI","SAT"];
  function H_pad(n){return (n<10?"0":"")+n;}
  function H_iso(d){return d.getFullYear()+"-"+H_pad(d.getMonth()+1)+"-"+H_pad(d.getDate());}
  function H_parse(s){var a=String(s).split("-");return new Date(+a[0],+a[1]-1,+(a[2]||1));}

  /* D's trend chart (Lr): viewBox 320x88, stretched to the box. Line 1.6, end dot r2.2, 12% area under a single series. */
  function H_points(y){
    var hi=Math.max.apply(null,y)*1.1,lo=Math.min.apply(null,y)*0.9;
    return y.map(function(w,i){return (2+(i/(y.length-1))*316)+","+(85-((w-lo)/((hi-lo)||1))*80);}).join(" ");
  }
  function H_series(vals,cls,area){
    var pts=H_points(vals),last=pts.split(" ").pop().split(",");
    return [area?h("polygon",{key:cls+"a",className:"lla-spark-area",points:"2,86 "+pts+" 318,86"}):null,
      h("polyline",{key:cls+"l",className:"lla-spark-line "+cls,points:pts}),
      h("circle",{key:cls+"d",className:"lla-spark-dot "+cls,cx:last[0],cy:last[1],r:"2.2"})];
  }
  function H_Spark(p){
    var parts=[];
    if(p.previous)parts=parts.concat(H_series(p.previous,"prev",false));
    if(p.bars){var n=p.bars.length,mx=(Math.max.apply(null,p.bars)*1.2)||1;
      p.bars.forEach(function(b,i){var w=320/n,ht=(b/mx)*70;parts.push(h("rect",{key:"b"+i,className:"lla-spark-bar",x:i*w+w*0.28,y:84-ht,width:w*0.44,height:ht,rx:"2.5"}));});}
    parts=parts.concat(H_series(p.values||[0,0],p.bars?"s2":"s1",p.area!==false&&!p.bars));
    return h("svg",{className:"lla-spark",viewBox:"0 0 320 88",preserveAspectRatio:"none",role:"img","aria-label":p.label||"Trend"},parts);
  }

  /* ---------- CalendarEvent: booking chip (Ivy campaign calendar) or post card (Elliot content calendar) ---------- */
  var H_STAGE={contracting:"Contracting",brief:"Brief sent",progress:"In progress",revisions:"In revisions",scheduled:"Scheduled",live:"Live"};
  var H_STATUS={published:"Published",scheduled:"Scheduled",pending:"Pending approval",approved:"Approved",draft:"Draft",rejected:"Rejected"};
  function CalendarEvent(p){
    var rest=omit(p,["variant","stage","stageLabel","name","count","campaign","status","statusLabel","time","title","label","owner","steps","block","className"]);
    if((p.variant||"booking")==="booking"){
      var st=p.stage||"live",sl=p.stageLabel||H_STAGE[st]||st;
      var an=p.name+" · "+sl+(p.count>1?" · booked "+p.count+" times":"");
      return h("button",Object.assign({type:"button",className:cx("lla lla-cal-event",st,p.className),"aria-label":an,title:p.campaign?p.name+" · "+p.campaign+" · "+sl:null},rest),
        h("span",{className:"lla-cal-event-name"},p.name),
        p.count>1?h(Badge,{key:"c"},"×"+p.count):null);
    }
    var s=p.status||"scheduled",sw=p.statusLabel||H_STATUS[s]||s;
    return h("button",Object.assign({type:"button",className:cx("lla lla-post-event",s,p.block&&"block",p.className)},rest),
      h("span",{className:"lla-sr"},sw+". "),
      h("small",{className:"lla-post-event-meta"},p.time||"Draft"),
      h("strong",{className:"lla-post-event-title"},p.title),
      h(Badge,null,p.label||sw),
      h("small",{className:"lla-post-event-meta"},"in · "+p.owner+(p.steps?" · "+p.steps+" steps":"")));
  }

  /* ---------- MonthGrid: one grid for both calendars ---------- */
  function MonthGrid(p){
    var v=p.variant||"campaign",view=v==="content"?(p.view||"month"):"month";
    var y=p.year,m=p.month,ws=p.weekStart!=null?p.weekStart:(v==="campaign"?1:0);
    var first=new Date(y,m,1),dim=new Date(y,m+1,0).getDate(),lead=(first.getDay()-ws+7)%7;
    var label=p.label||(H_MON[m]+" "+y);
    function ev(e,i,block){
      var ep=omit(e,["date","id"]);ep.key=e.id||i;ep.variant=v==="campaign"?"booking":"post";if(block)ep.block=true;
      if(!ep.onClick&&p.onOpen)ep.onClick=function(){p.onOpen(e);};
      return h(CalendarEvent,ep);
    }
    if(view==="list"){
      var mk=y+"-"+H_pad(m+1);
      var list=(p.events||[]).filter(function(e){return String(e.date).indexOf(mk)===0;}).sort(function(a,b){return String(a.date).localeCompare(String(b.date));});
      if(!list.length)return h("p",{className:cx("lla lla-mgrid-empty",p.className)},p.emptyText||"No posts match this month and these filters.");
      return h("ul",{className:cx("lla lla-mgrid-list",p.className),"aria-label":label},list.map(function(e,i){
        return h("li",{key:e.id||i,className:"lla-mgrid-list-card"},h("small",{className:"lla-mgrid-list-date"},e.date+" · "+(e.status||"")),ev(e,i,true));
      }));
    }
    var start,n;
    if(view==="week"){var wd=p.weekOf?H_parse(p.weekOf):first;start=new Date(wd.getFullYear(),wd.getMonth(),wd.getDate()-((wd.getDay()-ws+7)%7));n=7;}
    else{start=new Date(y,m,1-lead);n=p.weeks?p.weeks*7:(v==="campaign"?Math.ceil((lead+dim)/7)*7:42);}
    var byDate={};(p.events||[]).forEach(function(e){(byDate[e.date]=byDate[e.date]||[]).push(e);});
    var wds=[];for(var i=0;i<7;i++)wds.push(H_WD[(i+ws)%7]);
    var cells=[];
    for(var k=0;k<n;k++){
      var d=new Date(start.getFullYear(),start.getMonth(),start.getDate()+k),iso=H_iso(d),inM=d.getMonth()===m;
      var dl=H_DAY[d.getDay()]+" "+d.getDate()+" "+H_MON[d.getMonth()];
      var evs=byDate[iso]||[];
      if(v==="campaign"){
        cells.push(h("div",{key:iso,className:cx("lla-mgrid-day",!inM&&"outside"),role:inM?"group":null,"aria-label":inM?dl:null,"aria-hidden":inM?null:"true"},
          inM?h("span",{className:"lla-mgrid-num","aria-hidden":"true"},d.getDate()):null,
          inM?evs.map(function(e,j){return ev(e,j);}):null));
      }else{
        cells.push(h("div",{key:iso,className:cx("lla-mgrid-day",!inM&&"outside",p.today===iso&&"today"),role:"group","aria-label":dl+(p.today===iso?", today":"")},
          h("span",{className:"lla-mgrid-num","aria-hidden":"true"},d.getDate()),
          evs.map(function(e,j){return ev(e,j);}),
          p.onCreate===false?null:h(Button,{key:"new",variant:"secondary",icon:"plus",className:"lla-mgrid-create","aria-label":"Create new post on "+iso,onClick:(function(x){return function(){if(p.onCreate)p.onCreate(x);};})(iso)},"Create new post")));
      }
    }
    return h("div",{className:cx("lla lla-mgrid",v,view==="week"&&"week",p.className),role:"group","aria-label":label},
      wds.map(function(w){return h("div",{key:w,className:"lla-mgrid-wd","aria-hidden":"true"},w);}),cells);
  }

  /* ---------- PartyFilterTile: a WAITING ON filter (toggle button) ---------- */
  function PartyFilterTile(p){
    var id=useId();
    var rest=omit(p,["label","count","reasons","pressed","className","emptyText"]);
    var reason=p.reasons&&p.reasons.length?(p.reasons.join?p.reasons.join(" · "):p.reasons):(p.emptyText||"nothing waiting");
    return h("button",Object.assign({type:"button",className:cx("lla lla-party",p.className),"aria-pressed":p.pressed?"true":"false","aria-describedby":id},rest),
      h("span",{className:"lla-party-label"},p.label),
      h("strong",{className:"lla-party-count"},p.count),
      h("small",{id:id,className:"lla-party-reason"},reason));
  }
  PartyFilterTile.Group=function(p){
    return h("div",{className:cx("lla lla-party-group",p.className),role:"group","aria-label":p.label||"Filter by who is holding work"},p.children);
  };

  /* ---------- Stepper: booking stages, or the three handoff tiles ---------- */
  function Stepper(p){
    if(p.variant==="handoff"){
      return h("div",{className:cx("lla lla-handoff",p.className),role:"list","aria-label":p.label||"Handoffs"},(p.steps||[]).map(function(s,i){
        var st=s.label+": "+(s.done?"Yes":"Not yet");
        return h("div",{key:i,role:"listitem",className:"lla-handoff-tile"},
          h("div",{className:"lla-handoff-head"},h(Icon,{name:s.done?"check":"minus",label:st,className:cx("lla-handoff-flag",s.done&&"done")}),h("strong",null,s.label)),
          h("small",null,(s.done?"":"Not yet · ")+(s.detail||"")));
      }));
    }
    var steps=p.steps||[],cur=p.current==null?-1:p.current;
    return h("ol",{className:cx("lla lla-stepper",p.className),"aria-label":p.label||"Booking stage",style:{gridTemplateColumns:"repeat("+steps.length+", minmax(0, 1fr))"}},steps.map(function(s,i){
      var done=i<=cur;
      return h("li",{key:i,className:done?"done":null,"aria-current":i===cur?"step":null},
        h("i",{className:"lla-stepper-dot","aria-hidden":"true"}),s,
        i===cur?null:h("span",{className:"lla-sr"},done?", done":", not reached"));
    }));
  }

  /* ---------- ReadinessList: payment readiness checks, or the brief readiness box ---------- */
  function ReadinessList(p){
    if(p.variant==="brief"){
      var errs=p.items||[];
      return h("div",{className:cx("lla lla-readiness-brief",p.className),role:"status"},
        h("strong",null,p.title||(errs.length?"Needs review":"Content complete")),
        h("ul",null,(errs.length?errs:[p.completeText||"All required fields and date order checked. Team approval still required."]).map(function(t,i){return h("li",{key:i},t);})));
    }
    return h("div",{className:cx("lla lla-readiness",p.className)},
      h("ul",{className:"lla-readiness-list","aria-label":p.label||"Payment readiness"},(p.items||[]).map(function(it,i){
        return h("li",{key:i,className:it.ok?"ok":"blocked"},h(Icon,{name:it.ok?"check":"triangle-alert",label:it.ok?"Ready":"Blocker"}),h("span",null,it.label));
      })),
      p.blocked?h("div",{id:p.noticeId,role:"status",className:"lla-readiness-notice"},
        h("strong",null,p.blocked.title||"Payment is blocked"),
        [].concat(p.blocked.body||[]).map(function(t,i){return h("p",{key:i},t);})):null);
  }

  /* ---------- MetricCard: wallet card, stat card with sparkline, or chart card ---------- */
  function H_Legend(items){
    return h("small",{className:"lla-metric-legend"},items.map(function(it,i){return h("span",{key:i},h("i",{className:"lla-swatch "+(it.series||"s1"),"aria-hidden":"true"}),it.label);}));
  }
  function MetricCard(p){
    var v=p.variant||"stat";
    if(v==="wallet"){
      return h("div",{className:cx("lla lla-metric wallet",p.className)},
        h("span",{className:"lla-metric-label"},p.label),
        h("div",{className:"lla-metric-value"},p.value,p.unit?h("small",{className:"lla-metric-unit"},p.unit):null),
        p.action||null,
        p.note?h("p",{className:"lla-metric-note"},p.note):null);
    }
    if(v==="chart"){
      return h("section",{className:cx("lla lla-metric chart",p.className),"aria-label":p.ariaLabel||null},
        h("div",{className:"lla-metric-head"},h("h3",{className:"lla-metric-title"},p.title),p.legend?H_Legend(p.legend):(p.aside?h("small",{className:"lla-metric-aside"},p.aside):null)),
        p.headline?h("p",{className:cx("lla-metric-headline",p.headlineTone==="down"&&"down")},p.headline):null,
        p.value!=null?h("div",{className:"lla-metric-big"},p.value):null,
        p.caption?h("p",{className:"lla-metric-caption"},p.caption):null,
        p.spark?h(H_Spark,Object.assign({label:p.spark.label||p.title},p.spark)):null,
        p.children,
        p.note?h("p",{className:"lla-metric-note"},p.note):null);
    }
    return h("div",{className:cx("lla lla-metric stat",p.size==="lg"&&"lg",p.className)},
      h("span",{className:"lla-metric-label"},p.label),
      h("strong",{className:"lla-metric-value"},p.value),
      p.delta?h("small",{className:cx("lla-metric-delta",p.deltaTone==="down"&&"down")},p.delta):null,
      p.spark?h(H_Spark,Object.assign({label:p.label+" trend"},p.spark)):null);
  }

  /* ---------- Funnel: the UTM conversion funnel card ---------- */
  function Funnel(p){
    var stages=p.stages||[];
    return h("section",{className:cx("lla lla-funnel",p.className)},
      h("h3",{className:"lla-metric-title"},p.title||"CONVERSION FUNNEL"),
      p.subtitle!==false?h("p",{className:"lla-metric-note"},p.subtitle||"posts → pipeline, via your UTMs"):null,
      h("ol",{className:"lla-funnel-grid","aria-label":p.label||"Conversion funnel"},stages.map(function(s,i){
        return h("li",{key:i},
          h("strong",{className:"lla-funnel-value"},s.value),
          h("p",{className:"lla-funnel-label"},s.label),
          s.ofPrevious?h("small",{className:"lla-funnel-meta"},s.ofPrevious+" of previous"):null,
          h("div",{className:"lla-funnel-bar","aria-hidden":"true",style:{height:48*Math.max(1-i*0.26,0.12)}}));
      })),
      p.note?h("p",{className:"lla-metric-note"},p.note):null);
  }

  /* ---------- Gauge: the posting-cadence scale ---------- */
  function Gauge(p){
    return h("div",{className:cx("lla lla-gauge",p.className)},
      h("div",{className:"lla-gauge-track",role:"img","aria-label":p.label||("Current "+(p.value!=null?p.value:"")+". "+(p.usualLabel||""))},
        p.usual!=null?h("span",{className:"lla-gauge-usual",style:{left:p.usual+"%"}}):null,
        h("span",{className:"lla-gauge-current",style:{left:(p.current||0)+"%"}})),
      h("div",{className:"lla-gauge-ends"},h("small",null,p.lowLabel||"Low activity"),h("small",null,p.highLabel||"High activity")),
      p.groups?h("div",{className:"lla-gauge-groups"},p.groups.map(function(g,i){
        return h(Fragment,{key:i},h("small",null,g.label),(g.items||[]).map(function(it,j){return h(Badge,{key:j},it);}));
      })):null);
  }

  /* ---------- PostCard: Elliot content card (Kanban) or list-row cell ---------- */
  function PostCard(p){
    if(p.variant==="row"){
      return h("button",{type:"button",className:cx("lla lla-post-row",p.className),onClick:p.onOpen},
        h("strong",null,p.title||p.body),h("span",null,p.meta||("in · "+(p.label||"Post")+(p.steps?" · "+p.steps+"-step sequence":""))));
    }
    return h("div",{className:cx("lla lla-post",p.className)},
      h("button",{type:"button",className:cx("lla-post-open",p.image&&"has-image"),onClick:p.onOpen},
        h("div",{className:"lla-post-head"},
          h("div",{className:"lla-post-person"},h(Avatar,{initials:p.initials,variant:p.avatarVariant||1,size:"card"}),h("strong",{className:"lla-post-name"},p.name)),
          p.score!=null?h(ScoreChip,{value:p.score,label:"Fidelity"}):h(Badge,null,"new")),
        h("p",{className:"lla-post-date"},p.date+" · in "+(p.channel||"LinkedIn")),
        h("p",{className:"lla-post-body"},p.body),
        p.image?h("div",{className:"lla-post-image"},h(Icon,{name:"image",size:"action",label:"Image placeholder"})):null),
      p.action?h(Button,{className:"lla-post-cta",onClick:p.action.onClick},p.action.label):null);
  }

  /* ---------- StepCard: one step of an Elliot engagement sequence ---------- */
  function H_seg(opts,value,onChange,label){
    if(typeof SegmentedControl==="function")return h(SegmentedControl,{options:opts,value:value,onChange:onChange,label:label,size:"md"});
    return h("div",{className:"lla-h-missing",role:"group","aria-label":label},opts.join(" / "));
  }
  function H_select(opts,value,onChange,label,width){
    if(typeof Select==="function")return h(Select,{options:opts,value:value,onChange:onChange,label:label,size:"md",width:width});
    return h("span",{className:"lla-h-missing",style:{width:width}},value);
  }
  function StepCard(p){
    var n=(p.index||0)+1,type=p.type||"Reply";
    var delay=typeof TextInput==="function"
      ?h(TextInput,{type:"number",min:"0",value:p.delay,onChange:p.onDelayChange,label:"Step "+n+" delay",hideLabel:true,className:"lla-stepcard-delay"})
      :h("input",{type:"number",min:"0",className:"lla-h-missing lla-stepcard-delay","aria-label":"Step "+n+" delay",value:p.delay,onChange:p.onDelayChange});
    return h("div",{className:cx("lla lla-stepcard",p.className),role:"group","aria-label":"Engagement step "+n},
      h("div",{className:"lla-stepcard-head"},
        H_seg(["Reply","Reaction","Repost"],type,p.onTypeChange,"Step "+n+" type"),
        h(Badge,null,p.approval||(p.account==="Limelight"?"auto":"needs approval")),
        h(Button,{variant:"secondary",icon:"x","aria-label":"Remove step "+n,className:"lla-stepcard-remove",onClick:p.onRemove})),
      h("div",{className:"lla-stepcard-row"},
        H_select(p.accounts||[p.account],p.account,p.onAccountChange,"Step "+n+" account",200),
        delay,
        H_select(["min","hr","day"],p.unit||"min",p.onUnitChange,"Step "+n+" delay unit",200),
        h("span",{className:"lla-stepcard-after"},"after posting")),
      type==="Reaction"
        ?H_seg(["Like","Celebrate","Support","Insightful"],p.reaction||"Like",p.onReactionChange,"Step "+n+" reaction")
        :h("textarea",{className:"lla-stepcard-text","aria-label":"Step "+n+" text",value:p.text,onChange:p.onTextChange,readOnly:!p.onTextChange&&p.text!=null?true:null}));
  }
  StepCard.Sequence=function(p){
    return h("div",{className:cx("lla lla-stepcard-seq",p.className),role:"list","aria-label":p.label||"Engagement sequence"},
      React.Children.map(p.children,function(c){return c?h("div",{role:"listitem"},c):c;}));
  };

  /* ---------- CadencePill: start / wait between sequence steps ---------- */
  function CadencePill(p){
    var v=p.variant||"wait";
    if(v==="mini")return h("div",{className:cx("lla lla-cadpill-mini",p.className)},h(Icon,{name:"corner-down-right"}),h("span",null,p.children||("wait "+p.amount+" "+p.unit)));
    if(v==="start")return h("div",{className:cx("lla lla-cadpill",p.className)},"Start",h("b",null,p.children||"immediately"));
    var units=p.units||["days","business days","weeks","months"];
    return h("div",{className:cx("lla lla-cadpill wait",p.className),role:"group","aria-label":p.label||"Wait before this step"},
      "Wait",
      h("input",{className:"num",type:"number",min:"0",value:p.amount,onChange:p.onAmountChange,"aria-label":"Wait amount",readOnly:p.onAmountChange?null:true}),
      h("select",{value:p.unit,onChange:p.onUnitChange,"aria-label":"Wait unit"},units.map(function(u){return h("option",{key:u,value:u},u);})),
      "· Send @",
      h("input",{className:"time",value:p.time,onChange:p.onTimeChange,"aria-label":"Send time",readOnly:p.onTimeChange?null:true}));
  }

  /* ---------- TokenChip: insertable merge token or the AI Command toggle ---------- */
  function TokenChip(p){
    var cmd=p.variant==="command",snip=p.variant==="snippets";
    var rest=omit(p,["variant","pressed","className","children","icon"]);
    return h("button",Object.assign({type:"button",className:cx("lla lla-token",cmd&&"command",snip&&"snippets",p.className),"aria-pressed":cmd?(p.pressed?"true":"false"):null},rest),
      cmd||p.icon?h(Icon,{name:p.icon||"sparkles"}):null,p.children);
  }

  /* ---------- StepRail: the sequence builder's step list ---------- */
  function StepRail(p){
    var sid=useId(),steps=p.steps||[];
    var stop=typeof Toggle==="function"
      ?h(Toggle,{ariaLabel:"Stop on reply",checked:!!p.stopOnReply,onChange:p.onStopOnReplyChange})
      :h("span",{className:"lla-h-missing"},"toggle");
    return h("div",{className:cx("lla lla-steprail",p.className),role:"region","aria-label":p.label||"Sequence steps"},
      p.note!==false?h("p",{className:"lla-steprail-note"},p.note||"We recommend at least 3 steps in your sequence."):null,
      p.stopOnReply!=null?h("div",{className:"lla-steprail-stop"},stop,h("div",{id:sid},h("b",null,"Stop on reply.")," The sequence halts automatically for a creator as soon as they respond on any channel.")):null,
      h("ol",{className:"lla-steprail-list"},steps.map(function(s,i){
        var cur=i===p.active;
        return h("li",{key:i},
          i>0&&s.wait?h(CadencePill,{variant:"mini"},s.wait):null,
          h("button",{type:"button",className:"lla-steprail-step","aria-current":cur?"step":null,onClick:function(){if(p.onSelect)p.onSelect(i);}},
            h(Icon,{name:"grip-vertical",className:"lla-steprail-grip"}),
            h("span",{className:"lla-steprail-tag"},s.title),
            h("span",{className:"lla-steprail-meta"},h(Icon,{name:"mail"}),s.from+(s.thread?" · "+s.thread:"")),
            h("span",{className:"lla-steprail-meta"},h(Icon,{name:"clock"}),s.when),
            s.needs?h("span",{className:"lla-steprail-needs"},h(Icon,{name:"triangle-alert"}),s.needs):null));
      })),
      p.onAdd!==false?h("button",{type:"button",className:"lla-steprail-add",onClick:p.onAdd},h(Icon,{name:"plus"}),"Add step"):null);
  }

  /* ---------- EmailPreview: rendered step with recipient picker and "Send test" ---------- */
  function H_render(tpl,vals){
    var out=[],re=/\{\{\s*([^}]+?)\s*\}\}/g,last=0,m,k=0;tpl=String(tpl||"");
    while((m=re.exec(tpl))){if(m.index>last)out.push(tpl.slice(last,m.index));var v=vals&&vals[m[1]];out.push(v!=null&&v!==""?h("span",{key:"t"+(k++),className:"lla-emailpv-mark"},v):"");last=re.lastIndex;}
    if(last<tpl.length)out.push(tpl.slice(last));return out;
  }
  function EmailPreview(p){
    var tid=useId(),rec=p.recipients||[],cur=p.recipient!=null?p.recipient:(rec[0]&&rec[0].value);
    var vals=p.values||{};
    return h("section",{className:cx("lla lla-emailpv",p.className),"aria-labelledby":tid},
      h("div",{className:"lla-emailpv-head"},h("h3",{id:tid},p.title||"Email preview"),p.onClose?h(IconButton,{icon:"x",label:"Close preview",className:"lla-emailpv-close",onClick:p.onClose}):null),
      h("dl",{className:"lla-emailpv-meta"},
        h("div",null,h("dt",null,"From:"),h("dd",null,p.from)),
        h("div",null,h("dt",null,h("label",{htmlFor:tid+"-to"},"To:")),h("dd",null,h("select",{id:tid+"-to",className:"lla-emailpv-to",value:cur,onChange:function(e){if(p.onRecipientChange)p.onRecipientChange(e.target.value);}},rec.map(function(r){return h("option",{key:r.value,value:r.value},r.label);})))),
        h("div",null,h("dt",null,"Subject:"),h("dd",null,p.subject?H_render(p.subject,vals):(p.threadSubject||"(thread subject)")))),
      h("div",{className:"lla-emailpv-render"},H_render(p.body,vals)),
      p.onSendTest!==false?h("div",{className:"lla-emailpv-foot"},
        h("div",{className:"lla-emailpv-lbl"},h("b",null,"Send yourself a test"),h("span",{id:tid+"-hint"},"Test emails have \"Test\" in the subject line")),
        h("input",{className:"lla-emailpv-email",type:"email",placeholder:"Enter email address","aria-label":"Test email address","aria-describedby":tid+"-hint",value:p.testEmail,onChange:p.onTestEmailChange,readOnly:p.onTestEmailChange?null:(p.testEmail!=null?true:null)}),
        h("button",{type:"button",className:"lla-emailpv-send",onClick:p.onSendTest},"Send test",h(Icon,{name:"send-horizontal"}))):null);
  }

  EXPORT("MonthGrid",MonthGrid);EXPORT("CalendarEvent",CalendarEvent);EXPORT("PartyFilterTile",PartyFilterTile);EXPORT("Stepper",Stepper);
  EXPORT("ReadinessList",ReadinessList);EXPORT("MetricCard",MetricCard);EXPORT("Funnel",Funnel);EXPORT("Gauge",Gauge);
  EXPORT("PostCard",PostCard);EXPORT("StepCard",StepCard);EXPORT("StepRail",StepRail);EXPORT("CadencePill",CadencePill);
  EXPORT("TokenChip",TokenChip);EXPORT("EmailPreview",EmailPreview);

  var W=window;W.LimelightApp=W.LimelightApp||{};for(var k in EXPORTS)W.LimelightApp[k]=EXPORTS[k];
})();
