# Kit Discovery

Use this when a user types a short trigger such as:

```text
接入 AntD 规范
审计 AntD 规范
新建 AntD 规范项目
```

The backend should resolve the kit zip without asking the user for an absolute path every time.

## Resolution Order

1. `ANTD_VIBECODING_KIT`
2. `.antdvibe/config.json`
3. Current project directory
4. `~/Downloads`
5. `~/Desktop`
6. `~/.codex/kits`

Supported file pattern:

```text
ant-design-vibecoding-foundation-kit*.zip
```

## Recommended Install Location

Install once:

```bash
mkdir -p "$HOME/.codex/kits"
cp ant-design-vibecoding-foundation-kit-20260529.zip "$HOME/.codex/kits/ant-design-vibecoding-foundation-kit.zip"
```

Then users can simply trigger:

```text
接入 AntD 规范
```

## Environment Variable

For custom paths:

```bash
export ANTD_VIBECODING_KIT="/path/to/ant-design-vibecoding-foundation-kit-20260529.zip"
```

## Project Config

For project-local pinning, create:

```text
.antdvibe/config.json
```

Example:

```json
{
  "kitPath": "/path/to/ant-design-vibecoding-foundation-kit-20260529.zip"
}
```

## Resolver Script

Run:

```bash
sh scripts/resolve-kit.sh
```

It prints the resolved zip path or exits with a non-zero status if no kit is found.
