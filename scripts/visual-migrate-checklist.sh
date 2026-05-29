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

script_exists() {
  node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));process.exit(p.scripts&&p.scripts['$1']?0:1)" 2>/dev/null
}

contains_file() {
  file="$1"
  pattern="$2"
  if [ -f "$file" ]; then
    rg -q "$pattern" "$file" 2>/dev/null || grep -q "$pattern" "$file"
  else
    return 1
  fi
}

for file in docs/visual-standard.md docs/visual-migration-map.md scripts/visual-audit.sh scripts/visual-migrate-checklist.sh; do
  if [ -f "$file" ]; then
    ok "$file"
  else
    missing "$file"
  fi
done

for file in AGENTS.md VIBECODING_PROFILE.md MIGRATION.md README.md; do
  if contains_file "$file" "统一 AntD 视觉"; then
    ok "$file references visual standardization trigger"
  else
    warn "$file should reference visual standardization trigger"
  fi
done

for script in visual:audit visual:check; do
  if script_exists "$script"; then
    ok "npm script: $script"
  else
    missing "npm script: $script"
  fi
done

if [ -f lib/theme.ts ] && contains_file lib/theme.ts "colorBgLayout"; then
  ok "lib/theme.ts exports AntD theme token source"
else
  warn "Review lib/theme.ts for AntD Light token alignment"
fi

if [ -f components/providers/app-providers.tsx ] && contains_file components/providers/app-providers.tsx "theme.defaultAlgorithm"; then
  ok "AppProviders uses AntD default light algorithm"
else
  warn "AppProviders should use AntD default light algorithm by default"
fi

exit "$status"
