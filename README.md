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
- AntD Light visual standardization rules in `docs/visual-standard.md`
- Visual migration mapping in `docs/visual-migration-map.md`

## Trigger Phrases

Use these short triggers in Codex-like tools after the kit is installed:

```text
接入 AntD 规范
审计 AntD 规范
新建 AntD 规范项目
统一 AntD 视觉
```

The backend should resolve the zip through `ANTD_VIBECODING_KIT`, `.antdvibe/config.json`, or `~/.codex/kits`.

If a tool does not recognize a short trigger, use this stronger prompt:

```text
请读取当前项目的 AGENTS.md 和 .antdvibe/triggers.json，并按「接入 AntD 规范」工作流执行。
```

## Prompt Workflows

### 接入 AntD 规范

Purpose:
给已有项目接入 Ant Design vibecoding 基础规范。

Effect:
项目会获得 AI 规则、AntD/ProComponents 基础依赖、Provider/theme、组件 wrapper、审计与验证能力；原视觉默认保留，不会强制替换为 AntD 白色风格。

User prompt:

```text
接入 AntD 规范
```

### 审计 AntD 规范

Purpose:
只检查当前项目是否符合 AntD vibecoding 规范。

Effect:
输出依赖、AI 规则、Provider/theme、组件模式、ProComponents 使用情况和视觉风险的问题清单；不修改任何文件。

User prompt:

```text
审计 AntD 规范
```

### 新建 AntD 规范项目

Purpose:
从 0 创建一个默认符合 AntD vibecoding 规范的新项目。

Effect:
生成 Next.js + React + TypeScript + Tailwind CSS + AntD 5 + ProComponents 项目，并默认使用 AntD Light 白色视觉。

User prompt:

```text
新建 AntD 规范项目
```

### 统一 AntD 视觉

Purpose:
在保守接入后，将项目视觉统一到 AntD Light 白色规范。

Effect:
识别并替换暗色/黑色/自定义强视觉样式，让页面结构和视觉逐步靠近 PageContainer、Card、ProTable、ProForm、ProDescriptions 与 AntD token。

User prompt:

```text
统一 AntD 视觉
```

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
npm run visual:audit
```

Read [MIGRATION.md](MIGRATION.md) and [docs/migration-map.md](docs/migration-map.md) before changing application code.

After conservative adoption, run visual audit before changing the original visual style. If the user confirms `统一 AntD 视觉`, use [docs/visual-standard.md](docs/visual-standard.md) and [docs/visual-migration-map.md](docs/visual-migration-map.md), then run:

```bash
npm run visual:check
npm run verify
```

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
