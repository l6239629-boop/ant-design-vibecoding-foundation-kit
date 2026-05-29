# Ant Design Vibecoding Profile

Use this profile when copying the kit into another project or giving it to a Codex-like AI coding tool.

## Product Intent

Generate consistent Ant Design business UI with minimal drift. The default output should look like a coherent B-side product, not a generic landing page or a hand-rolled table/form collection.

## Default Component Choices

| Need | Use |
| --- | --- |
| Page container | `PageContainer` |
| Query + table + pagination | `ProTable` |
| Business form | `ProForm` |
| Detail fields | `ProDescriptions` |
| Simple table | `components/antd/data-table.tsx` or Ant Design `Table` |
| Status label | `components/antd/status-tag.tsx` |
| Metric card | `components/antd/metric-card.tsx` |
| Message and notification | Ant Design `App`, `message`, `notification` |
| Shell layout | `components/layout/*` with Tailwind |
| Lightweight primitive | `components/ui/*` |

## Page Patterns

- List: `PageContainer` + `ProTable` + `request` + `toolBarRender`.
- Form: `PageContainer` + `ProForm` + semantic ProForm field components.
- Detail: `PageContainer` + `ProDescriptions` + tabs only for high-complexity content.
- Dashboard: `PageContainer` + metrics first, charts or progress panels second, details last.

## Theme Rules

- Ant Design theme lives in `lib/theme.ts`.
- Shared CSS variables live in `app/globals.css`.
- Local primitives should use semantic CSS variables.
- New brand or state colors must be added to `lib/theme.ts` first.

## Install Expectations

A fresh copy should support:

```bash
npm install
npm run verify
```

Ant Design AI resources are optional but recommended:

- `@ant-design/cli`
- `antd mcp`
- Ant Design LLM docs

See `INSTALL.md`.

## Done Criteria

- Uses the expected Ant Design or ProComponents pattern.
- Reuses existing wrappers where practical.
- Keeps changes scoped to the requested UI.
- Passes `npm run verify`.

## Existing Project Migration

- Start with `npm run audit`.
- Copy or merge the rule files before changing business pages.
- Align dependencies to Ant Design 5 and ProComponents.
- Add providers and theme tokens.
- Migrate pages gradually using `docs/migration-map.md`.
- Finish with `npm run migration:check` and `npm run verify`.

## Short Triggers

- `接入 AntD 规范`: resolve the kit, audit the current project, merge the standard, run checks, and report.
- `审计 AntD 规范`: resolve the kit and audit only. Do not modify files.
- `新建 AntD 规范项目`: resolve the kit, create a new project from it, install dependencies, and verify.

Resolve the kit with:

```bash
npm run kit:resolve
```
