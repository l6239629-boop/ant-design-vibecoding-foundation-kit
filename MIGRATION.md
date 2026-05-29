# Migration Guide

Use this guide when an existing project should adopt this Ant Design vibecoding standard.

The migration goal is not to rewrite the app. Add the AI rules and runtime foundation first, then migrate pages gradually.

## Target Standard

- Ant Design 5
- `@ant-design/pro-components`
- `PageContainer` for business pages
- `ProTable` for query-table workflows
- `ProForm` for business forms
- `ProDescriptions` for detail pages
- Theme tokens in `lib/theme.ts`
- Optional AntD Light visual standardization after user confirmation
- AI entry rules in `AGENTS.md`
- Verification through `npm run verify`

## Step 1: Audit

Run this from the target project root:

```bash
sh scripts/audit-project.sh
```

The audit is read-only. It reports installed dependencies, missing rule files, missing providers, and missing scripts.

## Step 2: Install Rules

Copy or merge these files:

```text
AGENTS.md
VIBECODING_PROFILE.md
INSTALL.md
docs/vibecoding-rules.md
docs/official-links.md
docs/migration-map.md
docs/kit-discovery.md
```

If the target project already has AI rule files, merge the Ant Design vibecoding section instead of overwriting existing project rules.

## Step 3: Align Dependencies

Install the compatible runtime:

```bash
npm install antd@5.29.3 @ant-design/pro-components@2.8.10 @ant-design/nextjs-registry@1.3.0 lucide-react@1.17.0
```

Rules:

- If no Ant Design is installed, install Ant Design 5.
- If Ant Design 4 is installed, migrate to Ant Design 5.
- If Ant Design 5 is installed, keep it if it is `>=5.11.2`, or pin to `5.29.3`.
- If Ant Design 6 is installed, downgrade to Ant Design 5 because ProComponents `2.8.10` does not support Ant Design 6.
- Do not use `npm install --force`.
- Do not use `npm audit fix --force` as part of migration.

## Step 4: Add Providers

Add or merge:

```text
components/providers/app-providers.tsx
lib/theme.ts
```

Provider order for Next.js App Router:

```tsx
<AntdRegistry>
  <AppProviders>{children}</AppProviders>
</AntdRegistry>
```

If the project already has providers, keep them and insert Ant Design providers at the UI layer.

## Step 5: Add Theme Tokens

Merge CSS variables from `app/globals.css` and keep Ant Design runtime theme in `lib/theme.ts`.

Rules:

- Add brand and state colors to `lib/theme.ts` first.
- Use CSS variables in local UI primitives.
- Use Tailwind for layout, spacing, and responsive composition.
- Avoid scattered hard-coded brand colors.

## Step 6: Add Component Adapters

Copy or merge:

```text
components/antd/status-tag.tsx
components/antd/metric-card.tsx
components/antd/data-table.tsx
components/antd/page-header.tsx
components/antd/filter-actions.tsx
components/antd/form-actions.tsx
components/ui/button.tsx
components/ui/card.tsx
lib/utils.ts
```

Use these adapters for shared primitives. Use ProComponents for full business workflows.

## Step 7: Migrate Pages Gradually

Use `docs/migration-map.md` to replace patterns one page at a time.

Recommended priority:

- New pages
- High-maintenance pages
- CRUD pages that AI will continue editing
- Pages with hand-rolled table, filter, and pagination logic

Run validation after each migrated page.

## Step 8: Verify

Add:

```text
scripts/verify.sh
scripts/resolve-kit.sh
```

Add `verify` to `package.json`:

```json
{
  "scripts": {
    "verify": "sh scripts/verify.sh"
  }
}
```

Then run:

```bash
npm run verify
```

## Step 9: Check Migration Status

Run:

```bash
sh scripts/migrate-checklist.sh
```

The checklist is read-only. It reports whether the expected files, dependencies, scripts, and ProComponents usage are present.

## Step 10: Prompt For Visual Standardization

After conservative adoption, run:

```bash
npm run visual:audit
```

If the audit reports dark theme, black backgrounds, custom brand-heavy CSS, or non-AntD shells, do not replace visuals immediately. Ask:

```text
已完成保守接入。当前项目仍保留原视觉风格。
检测到暗色/自定义视觉风险。
是否继续统一为 AntD 白色视觉规范？
```

Only continue after the user confirms with a phrase such as:

```text
统一 AntD 视觉
执行 AntD 视觉规范化
替换为 AntD 白色规范
```

Use `docs/visual-standard.md` and `docs/visual-migration-map.md` for the replacement rules. Then run:

```bash
npm run visual:check
npm run migration:check
npm run verify
```

## Done Criteria

- `AGENTS.md` exists and references the Ant Design vibecoding standard.
- `VIBECODING_PROFILE.md` exists.
- `docs/vibecoding-rules.md` exists.
- Runtime uses Ant Design 5 and ProComponents.
- `AppProviders` and `lib/theme.ts` exist.
- `npm run verify` passes.
- New or migrated list pages use `ProTable`.
- New or migrated form pages use `ProForm`.
- New or migrated detail pages use `ProDescriptions`.
- Conservative adoption reports whether visual style remains unchanged.
- Visual standardization is only performed after explicit user confirmation.
