#!/bin/sh
set -eu

root_list() {
  for dir in app pages src components styles; do
    if [ -e "$dir" ]; then
      printf '%s ' "$dir"
    fi
  done
}

roots="$(root_list)"

info() {
  printf '[info] %s\n' "$1"
}

ok() {
  printf '[ok] %s\n' "$1"
}

warn() {
  printf '[warn] %s\n' "$1"
}

matches() {
  pattern="$1"
  if [ -z "$roots" ]; then
    return 1
  fi

  if command -v rg >/dev/null 2>&1; then
    rg -n --glob '!node_modules/**' --glob '!.next/**' --glob '!dist/**' --glob '!build/**' "$pattern" $roots || true
  else
    grep -R -n "$pattern" $roots || true
  fi
}

has_matches() {
  pattern="$1"
  if [ -z "$roots" ]; then
    return 1
  fi

  if command -v rg >/dev/null 2>&1; then
    rg -q --glob '!node_modules/**' --glob '!.next/**' --glob '!dist/**' --glob '!build/**' "$pattern" $roots
  else
    grep -R -q "$pattern" $roots
  fi
}

section() {
  printf '\n[%s]\n' "$1"
}

risk=0

info "AntD Light visual audit is read-only."

if [ -z "$roots" ]; then
  warn "No app/pages/src/components/styles directory found"
  exit 0
fi

section "global-dark-theme"
if has_matches 'darkMode|data-theme=["'"'"']dark["'"'"']|className=["'"'"'][^"'"'"']*dark|class=["'"'"'][^"'"'"']*dark'; then
  warn "Dark theme activation found"
  matches 'darkMode|data-theme=["'"'"']dark["'"'"']|className=["'"'"'][^"'"'"']*dark|class=["'"'"'][^"'"'"']*dark'
  risk=1
else
  ok "No obvious dark theme activation found"
fi

section "tailwind-dark-classes"
if has_matches 'bg-(black|neutral-950|zinc-950|slate-950)|text-(zinc-100|neutral-100|slate-100)|border-(zinc-800|neutral-800|slate-800)|dark:'; then
  warn "Tailwind dark visual classes found"
  matches 'bg-(black|neutral-950|zinc-950|slate-950)|text-(zinc-100|neutral-100|slate-100)|border-(zinc-800|neutral-800|slate-800)|dark:'
  risk=1
else
  ok "No obvious Tailwind dark visual classes found"
fi

section "hardcoded-colors"
if has_matches 'background(-color)?:[[:space:]]*(#000|#000000|black|#0f172a|#111827|#18181b)|--background:|--foreground:'; then
  warn "Hard-coded visual colors or CSS variables found"
  matches 'background(-color)?:[[:space:]]*(#000|#000000|black|#0f172a|#111827|#18181b)|--background:|--foreground:'
  risk=1
else
  ok "No obvious hard-coded dark colors found"
fi

section "custom-shell"
if has_matches '<main|<aside|<nav|<header|className=["'"'"'][^"'"'"']*(sidebar|topbar|navbar|layout|shell)'; then
  warn "Custom shell markup found; review whether it should use Ant Design Layout/PageContainer"
  matches '<main|<aside|<nav|<header|className=["'"'"'][^"'"'"']*(sidebar|topbar|navbar|layout|shell)'
else
  ok "No obvious custom shell markers found"
fi

section "antd-provider-status"
if has_matches 'ConfigProvider|AppProviders|theme.defaultAlgorithm'; then
  ok "Ant Design provider/theme markers found"
else
  warn "Ant Design provider/theme markers not found"
fi

section "recommended-next-step"
if [ "$risk" -eq 1 ]; then
  warn "Conservative adoption may be complete, but the project still keeps dark or custom visual style."
  info "Ask the user whether to continue with AntD Light visual standardization."
  info "Trigger phrase: 统一 AntD 视觉"
else
  ok "No strong dark visual risk found. Continue normal AntD migration checks."
fi

exit 0
