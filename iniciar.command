#!/bin/zsh
# Duplo clique neste arquivo para abrir o protótipo no navegador.
cd "$(dirname "$0")"
export PATH="$PWD/.tools/node-v22.23.4-darwin-x64/bin:$PATH"
[ -d node_modules ] || npm install
npm run dev -- --open
