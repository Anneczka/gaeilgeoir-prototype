# Gaeilgeoir Prototype · como usar (para a Ana)

Esta pasta é o protótipo clicável do app GO. O `CLAUDE.md` é o briefing que o Claude Code lê sozinho.

## Abrir o protótipo
- **Mais fácil:** dê duplo clique em `iniciar.command`. Ele abre o protótipo no navegador (se o Mac perguntar, confirme que quer abrir).
- Ou peça ao Claude Code: **"rode o protótipo"**.
- Para parar: feche a janela do Terminal que abriu.

## Por que existe a pasta `.tools`
O Node.js do seu Mac (versão 14) é antigo demais. Por isso o projeto traz uma cópia moderna (Node 22) dentro de `.tools`. Não apague essa pasta.

## Onde mexer
- Textos: `src/data/content.ts`  ·  Números e nomes fictícios: `src/data/fake.ts`
- Cores, fontes, espaços (tokens do Figma): `src/styles/tokens.css`
- Plano e decisões: `docs/superpowers/`

## Estado atual
- Pronto: Welcome → Log in → Nível → Dialeto → Home, e a barra de baixo (Home, Courses, Practice, Profile).
- Próximo: T2 conversa por voz, T3 palavras novas, T4 voltar para casa.

## Antes de publicar
Nada é publicado sem perguntar a você.
