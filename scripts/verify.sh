#!/bin/sh
set -eu

npm run typecheck
npm run lint
npm run build
