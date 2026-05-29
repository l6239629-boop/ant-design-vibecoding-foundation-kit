#!/bin/sh
set -eu

status=0

ok() {
  printf '[ok] %s\n' "$1"
}

warn() {
  printf '[warn] %s\n' "$1"
}

missing() {
  printf '[missing] %s\n' "$1"
  status=1
}

pkg_version() {
  node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));const d={...p.dependencies,...p.devDependencies};console.log(d['$1']||'')" 2>/dev/null
}

script_exists() {
  node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));process.exit(p.scripts&&p.scripts['$1']?0:1)" 2>/dev/null
}

if [ -f package.json ]; then
  ok "package.json"
else
  missing "package.json"
  exit "$status"
fi

for pkg in next react typescript tailwindcss antd @ant-design/pro-components @ant-design/nextjs-registry lucide-react; do
  version="$(pkg_version "$pkg")"
  if [ -n "$version" ]; then
    ok "$pkg $version"
  else
    warn "$pkg is not declared"
  fi
done

antd_version="$(pkg_version antd)"
case "$antd_version" in
  5.*|^5.*|~5.*)
    ok "Ant Design 5-compatible runtime"
    ;;
  6.*|^6.*|~6.*)
    warn "Ant Design 6 detected; ProComponents 2.8.10 expects Ant Design 4/5"
    ;;
  4.*|^4.*|~4.*)
    warn "Ant Design 4 detected; migrate to Ant Design 5 for this standard"
    ;;
  "")
    warn "Ant Design not detected"
    ;;
  *)
    warn "Ant Design version should be checked: $antd_version"
    ;;
esac

for file in AGENTS.md VIBECODING_PROFILE.md INSTALL.md MIGRATION.md docs/vibecoding-rules.md docs/official-links.md docs/migration-map.md docs/kit-discovery.md lib/theme.ts components/providers/app-providers.tsx scripts/verify.sh scripts/resolve-kit.sh; do
  if [ -f "$file" ]; then
    ok "$file"
  else
    warn "$file is missing"
  fi
done

for script in typecheck lint build verify kit:resolve; do
  if script_exists "$script"; then
    ok "npm script: $script"
  else
    warn "npm script missing: $script"
  fi
done

if [ -f components.json ]; then
  ok "components.json"
else
  warn "components.json is missing"
fi

exit "$status"
