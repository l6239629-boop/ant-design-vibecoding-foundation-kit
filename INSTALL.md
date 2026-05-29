# Install Guide

This guide installs the Ant Design vibecoding foundation kit in a fresh copy.

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- A shell that can run npm scripts

Check:

```bash
node --version
npm --version
```

## Project Dependencies

Install runtime dependencies:

```bash
npm install
```

Verify:

```bash
npm run verify
```

Audit this project or a copied project:

```bash
npm run audit
npm run migration:check
```

Resolve a locally installed kit zip:

```bash
npm run kit:resolve
```

Start local development:

```bash
npm run dev -- --port 3000
```

Open:

```text
http://localhost:3000
http://localhost:3000/examples/list
http://localhost:3000/examples/form
http://localhost:3000/examples/detail
http://localhost:3000/examples/dashboard
```

## Ant Design AI Resources

Install the Ant Design CLI globally in a user-writable npm prefix:

```bash
npm config set prefix "$HOME/.npm-global"
npm install -g @ant-design/cli
```

Make sure the binary path is available in your shell:

```bash
export PATH="$HOME/.npm-global/bin:$PATH"
```

Verify:

```bash
antd --cli-version
antd info Table --version 5.29.3 --lang zh
```

## MCP

For Codex, add an MCP server entry similar to this:

```toml
[mcp_servers.antd]
command = "/Users/YOUR_USER/.npm-global/bin/antd"
args = ["mcp"]
startup_timeout_sec = 60
```

Use the absolute path for your own machine.

## LLM Docs

Recommended local folder:

```text
$HOME/.npm-global/share/ant-design/llms
```

Download:

```bash
mkdir -p "$HOME/.npm-global/share/ant-design/llms"
curl -L https://ant.design/llms.txt -o "$HOME/.npm-global/share/ant-design/llms/llms.txt"
curl -L https://ant.design/llms-full-cn.txt -o "$HOME/.npm-global/share/ant-design/llms/llms-full-cn.txt"
curl -L https://ant.design/llms-semantic-cn.md -o "$HOME/.npm-global/share/ant-design/llms/llms-semantic-cn.md"
```

## Notes

- Runtime UI uses Ant Design 5 because `@ant-design/pro-components` supports Ant Design 4/5.
- The Ant Design CLI version can be newer than the runtime Ant Design version.
- Do not use `npm audit fix --force` unless you are intentionally changing dependency versions and can re-run full validation.

## Share Zip Installation

Recommended shared location:

```bash
mkdir -p "$HOME/.codex/kits"
cp ant-design-vibecoding-foundation-kit-20260529.zip "$HOME/.codex/kits/ant-design-vibecoding-foundation-kit.zip"
```

Custom path:

```bash
export ANTD_VIBECODING_KIT="/path/to/ant-design-vibecoding-foundation-kit-20260529.zip"
```

Project-local config:

```json
{
  "kitPath": "/path/to/ant-design-vibecoding-foundation-kit-20260529.zip"
}
```

Save it as:

```text
.antdvibe/config.json
```

Resolution order:

```text
ANTD_VIBECODING_KIT
.antdvibe/config.json
current project directory
~/Downloads
~/Desktop
~/.codex/kits
```
