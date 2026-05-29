# Ant Design Vibecoding Rules

Use this project as a bounded UI generation base. Keep changes small and aligned with the existing component roles.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- Ant Design 5
- `@ant-design/pro-components`

## Component Roles

- Use ProComponents for standard B-side business UI: `PageContainer`, `ProTable`, `ProForm`, `ProDescriptions`.
- Use Ant Design for common controls: `Select`, `DatePicker`, `Upload`, `Tree`, `Tabs`, `Steps`, `Statistic`, `Pagination`, `App`, `message`, `notification`.
- Use local `components/ui/*` for lightweight shell controls: compact buttons, cards, empty layout primitives.
- Use local `components/antd/*` for shared business primitives that are thinner than ProComponents.
- Use Tailwind for layout, spacing, responsive grids, and simple visual adjustments.
- Use lucide-react icons in buttons and navigation.

## Official Reference Flow

Before adding a new page type, check `docs/official-links.md`.

- Engineering issue: read the Next.js and CSS compatibility links.
- Component choice: read Components Overview and Layout.
- Page structure: read the matching page template spec.
- Complex CRUD: use ProComponents before building local abstractions.

## Component Decision Table

| Need | Default |
| --- | --- |
| Page container | ProComponents `PageContainer` |
| Business table, pagination, filters | ProComponents `ProTable` |
| Validated form | ProComponents `ProForm` |
| Detail fields | ProComponents `ProDescriptions` |
| Date, upload, tree, cascader, transfer | Ant Design |
| Modal or drawer with form | Ant Design `Modal` / `Drawer`; consider `ModalForm` / `DrawerForm` |
| Page shell, sidebar, topbar | Local `components/layout/*` with Tailwind |
| Small visual primitive | Local `components/ui/*` |
| Icons | `lucide-react` |
| Message, notification, confirm | Ant Design `App`, `message`, `notification`, `Modal.confirm` |

## Page Template Defaults

- List page: `PageContainer` + `ProTable`, with `request`, `search`, and `toolBarRender`.
- Form page: `PageContainer` + `ProForm`, with semantic ProForm field components.
- Detail page: `PageContainer` + `ProDescriptions`; use tabs only for high complexity.
- Visualization page: `PageContainer`, metrics first, filters/charts next, detailed table last.

## ProComponents Adoption

This starter uses Ant Design 5 because `@ant-design/pro-components@2.8.10` declares peer support for Ant Design 4/5. Do not upgrade runtime `antd` to 6 until ProComponents officially supports it.

Use ProComponents by default when a page needs at least one of these:

- Server-side table request lifecycle
- Query form coupled to a table
- Column state, density, or toolbar conventions
- Editable table rows
- Modal, drawer, or step forms
- Shared column definitions between table and descriptions

Stay with plain `antd` when the page is simple, static, or one-off.

## Standard Templates

- List page: `app/examples/list/page.tsx`
- Form page: `app/examples/form/page.tsx`
- Detail page: `app/examples/detail/page.tsx`
- Dashboard page: `app/examples/dashboard/page.tsx`

## Rules

- Do not mix ProComponents, Ant Design, and shadcn-style versions of the same complex pattern on one page.
- Prefer `ProForm` for validated business workflows.
- Prefer `ProTable` for sortable, filterable, paginated business lists.
- Keep B-side pages dense, scannable, and quiet.
- Avoid landing-page hero sections inside admin/productivity tools.
- Keep page-level sections unframed; use cards only for repeated items or bounded tools.
- Use `AppProviders` for Ant Design theme, locale, and app context.
- Keep new reusable components under the closest matching folder: `components/antd`, `components/ui`, or `components/layout`.

## Verification

Run these before considering a UI change complete:

```bash
npm run typecheck
npm run lint
npm run build
```

Or run all checks:

```bash
npm run verify
```

During active design work:

```bash
npm run dev
```
