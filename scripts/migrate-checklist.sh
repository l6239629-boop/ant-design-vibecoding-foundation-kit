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

contains() {
  if [ -e "$1" ]; then
    rg -q "$2" "$1"
  else
    return 1
  fi
}

project_roots() {
  for dir in app pages src components; do
    if [ -e "$dir" ]; then
      printf '%s ' "$dir"
    fi
  done
}

contains_project() {
  roots="$(project_roots)"
  if [ -z "$roots" ]; then
    return 1
  fi

  if command -v rg >/dev/null 2>&1; then
    rg -q --glob '!node_modules/**' --glob '!.next/**' --glob '!components/antd/data-table.tsx' "$1" $roots
  else
    grep -R -q "$1" $roots
  fi
}

show_project_matches() {
  roots="$(project_roots)"
  if [ -z "$roots" ]; then
    return 0
  fi

  if command -v rg >/dev/null 2>&1; then
    rg -n --glob '!node_modules/**' --glob '!.next/**' --glob '!components/antd/data-table.tsx' "$1" $roots || true
  else
    grep -R -n "$1" $roots || true
  fi
}

if [ -f package.json ]; then
  ok "package.json"
else
  missing "package.json"
  exit "$status"
fi

antd_version="$(pkg_version antd)"
pro_version="$(pkg_version @ant-design/pro-components)"

case "$antd_version" in
  5.*|^5.*|~5.*)
    ok "Ant Design 5 runtime: $antd_version"
    ;;
  "")
    missing "Ant Design dependency"
    ;;
  *)
    missing "Ant Design 5 runtime expected, found $antd_version"
    ;;
esac

if [ -n "$pro_version" ]; then
  ok "ProComponents dependency: $pro_version"
else
  missing "ProComponents dependency"
fi

for file in AGENTS.md VIBECODING_PROFILE.md INSTALL.md MIGRATION.md docs/vibecoding-rules.md docs/official-links.md docs/migration-map.md docs/kit-discovery.md lib/theme.ts components/providers/app-providers.tsx scripts/verify.sh scripts/resolve-kit.sh; do
  if [ -f "$file" ]; then
    ok "$file"
  else
    missing "$file"
  fi
done

for script in typecheck lint build verify kit:resolve; do
  if script_exists "$script"; then
    ok "npm script: $script"
  else
    missing "npm script: $script"
  fi
done

if contains . "ProTable"; then
  ok "ProTable usage found"
else
  warn "No ProTable usage found yet"
fi

if contains . "ProForm"; then
  ok "ProForm usage found"
else
  warn "No ProForm usage found yet"
fi

if contains . "ProDescriptions"; then
  ok "ProDescriptions usage found"
else
  warn "No ProDescriptions usage found yet"
fi

if contains AGENTS.md "ProComponents"; then
  ok "AGENTS.md references ProComponents"
else
  warn "AGENTS.md should reference ProComponents"
fi

legacy_found=0

if contains_project "<Pagination"; then
  warn "Manual Pagination usage found; query-table pages should usually migrate to ProTable"
  show_project_matches "<Pagination"
  legacy_found=1
fi

if contains_project "Form\\.Item"; then
  warn "Form.Item usage found; business forms should usually migrate to ProForm fields"
  show_project_matches "Form\\.Item"
  legacy_found=1
fi

if contains_project "<Table[ >]"; then
  warn "Direct Table usage found; query-table workflows should usually migrate to ProTable"
  show_project_matches "<Table[ >]"
  legacy_found=1
fi

if [ "$legacy_found" -eq 0 ]; then
  ok "No obvious hand-rolled AntD table/form workflow found"
fi

exit "$status"
