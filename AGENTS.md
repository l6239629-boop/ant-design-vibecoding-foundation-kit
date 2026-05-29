# AGENTS.md

This project is an Ant Design vibecoding foundation kit. Treat it as a reusable base for B-side, admin, CRUD, dashboard, and operational UI work.

## Required Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Ant Design 5
- `@ant-design/pro-components`
- shadcn-style local primitives in `components/ui/*`

## Generation Rules

- Use `PageContainer` for standard business pages.
- Use `ProTable` for list, query, pagination, toolbar, and CRUD table pages.
- Use `ProForm` and ProForm field components for validated business forms.
- Use `ProDescriptions` for detail pages.
- Use plain Ant Design components for common controls and feedback.
- Use local `components/antd/*` wrappers for shared business primitives such as status tags, metric cards, and lightweight tables.
- Use local `components/ui/*` only for shell-level primitives such as compact buttons and cards.
- Use Tailwind for layout, spacing, and responsive composition.
- Use `lib/theme.ts` and CSS variables for theme values. Do not scatter new hard-coded brand colors.
- After conservative adoption, run visual audit and report whether the project still keeps its original visual style.
- If dark theme, black backgrounds, custom brand-heavy CSS, or non-AntD shells are detected, ask whether to continue with AntD Light visual standardization.
- Do not force visual replacement unless the user explicitly confirms.

## Avoid

- Do not hand-roll complex tables, pagination, filter forms, or validation flows when ProComponents covers the need.
- Do not mix two competing implementations of the same complex pattern on one page.
- Do not add speculative abstractions or broad design-system layers before repeated need appears.
- Do not use `--force` to bypass Ant Design peer dependency conflicts.

## Reference Order

Before generating a new page or component, check:

1. `docs/vibecoding-rules.md`
2. `docs/official-links.md`
3. Existing examples under `app/examples/*`
4. Existing wrappers under `components/antd/*`

For existing-project migrations, check:

1. `MIGRATION.md`
2. `docs/migration-map.md`
3. `docs/visual-standard.md`
4. `docs/visual-migration-map.md`
5. `scripts/audit-project.sh`
6. `scripts/migrate-checklist.sh`
7. `scripts/visual-audit.sh`
8. `scripts/visual-migrate-checklist.sh`

For short trigger installation and lookup, check:

1. `docs/kit-discovery.md`
2. `scripts/resolve-kit.sh`

Supported trigger phrases:

- `接入 AntD 规范`
- `审计 AntD 规范`
- `新建 AntD 规范项目`
- `统一 AntD 视觉`
- `执行 AntD 视觉规范化`
- `替换为 AntD 白色规范`

## Verification

Before considering UI work complete, run:

```bash
npm run verify
```

If a single check is needed:

```bash
npm run typecheck
npm run lint
npm run build
```

For migration work:

```bash
npm run audit
npm run migration:check
npm run visual:audit
npm run visual:check
```

For kit lookup:

```bash
npm run kit:resolve
```
