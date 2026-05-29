#!/bin/sh
set -eu

print_if_file() {
  if [ -n "${1:-}" ] && [ -f "$1" ]; then
    printf '%s\n' "$1"
    exit 0
  fi
}

first_match() {
  for pattern in "$@"; do
    set -- $pattern
    for file in "$@"; do
      if [ -f "$file" ]; then
        printf '%s\n' "$file"
        exit 0
      fi
    done
  done
}

print_if_file "${ANTD_VIBECODING_KIT:-}"

if [ -f .antdvibe/config.json ]; then
  config_path="$(node -e "const fs=require('fs');const p='.antdvibe/config.json';try{const c=JSON.parse(fs.readFileSync(p,'utf8'));console.log(c.kitPath||'')}catch(e){console.log('')}" 2>/dev/null)"
  print_if_file "$config_path"
fi

first_match \
  "./ant-design-vibecoding-foundation-kit*.zip" \
  "$HOME/Downloads/ant-design-vibecoding-foundation-kit*.zip" \
  "$HOME/Desktop/ant-design-vibecoding-foundation-kit*.zip" \
  "$HOME/.codex/kits/ant-design-vibecoding-foundation-kit*.zip"

printf '%s\n' "Ant Design vibecoding kit was not found." >&2
printf '%s\n' "Set ANTD_VIBECODING_KIT or install the zip to ~/.codex/kits/." >&2
exit 1
