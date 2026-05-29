# AntD Vibecoding Starter

A Next.js starter for UI work with React, TypeScript, Tailwind CSS, shadcn/ui-style primitives, Ant Design 5, and ProComponents.

## Quick Start

```bash
npm install
npm run verify
npm run dev
```

Open `http://localhost:3000`.

## What Is Included

- Ant Design configured through `@ant-design/nextjs-registry`
- ProComponents configured through `ProConfigProvider`
- Ant Design `ConfigProvider` with Chinese locale and starter theme tokens
- Tailwind CSS setup
- shadcn/ui-compatible `components.json`
- Local `Button` and `Card` primitives
- A B-side sample page using Ant Design `Form`, `Table`, `Tag`, and `Statistic`
- Four standard examples under `app/examples/*`
- AI entry rules in `AGENTS.md`
- Reusable AI profile in `VIBECODING_PROFILE.md`
- Install guide in `INSTALL.md`
- Vibecoding rules in `docs/vibecoding-rules.md`
- Official reference links in `docs/official-links.md`
- Kit discovery rules in `docs/kit-discovery.md`

## Trigger Phrases

Use these short triggers in Codex-like tools after the kit is installed:

```text
接入 AntD 规范
审计 AntD 规范
新建 AntD 规范项目
```

The backend should resolve the zip through `ANTD_VIBECODING_KIT`, `.antdvibe/config.json`, or `~/.codex/kits`.

## Example Pages

- `http://localhost:3000/examples/list`
- `http://localhost:3000/examples/form`
- `http://localhost:3000/examples/detail`
- `http://localhost:3000/examples/dashboard`

## Existing Project Migration

Use these when adopting the standard in an existing project:

```bash
npm run audit
npm run migration:check
```

Read [MIGRATION.md](MIGRATION.md) and [docs/migration-map.md](docs/migration-map.md) before changing application code.

## Kit Discovery

Install the share zip once:

```bash
mkdir -p "$HOME/.codex/kits"
cp ant-design-vibecoding-foundation-kit-20260529.zip "$HOME/.codex/kits/ant-design-vibecoding-foundation-kit.zip"
```

Resolve the installed kit:

```bash
npm run kit:resolve
```

## Local Ant Design AI Resources

Local machines can optionally install Ant Design CLI/MCP/LLM resources:

- CLI: `$HOME/.npm-global/bin/antd`
- LLM docs: `$HOME/.npm-global/share/ant-design/llms`
- Codex MCP config: `$HOME/.codex/config.toml`
