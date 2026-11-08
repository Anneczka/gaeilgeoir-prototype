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
- Pronto: T1 (Welcome → Log in → Nível → Dialeto → Home) e T2 (conversa por voz simulada, correção, saída, ajustes de voz, etapa concluída). Barra de baixo (Home, Courses, Practice, Profile).
- Pronto: T3 (Practice → 1000 Word Way → lição de palavras → fim da lição) e T4 (barra de baixo e botões de voltar/X em todas as telas).
- Pronto também: Courses (com pop-up de trocar nível), detalhe do curso, Profile e Settings (com o botão **Reset prototype** no fim, para começar um novo participante).
- Pronto também: Leaderboard (ranking, estado de participante novo, aba All time, pop-up "How XP works", interruptor nos Settings).
- Próximo: as demais telas (Songs, Quizzes, My words, Podcast com erro, Free trial...). Por enquanto elas aparecem como "Coming soon", sempre com um jeito de voltar.

## Antes de publicar
Nada é publicado sem perguntar a você.
