# GO prototype · Design (resumo aprovado)

**Aprovado por Ana em 2026-11-07** ("Sim, pode seguir"). A fonte completa é o `CLAUDE.md`.

## Intenção
Protótipo clicável, de alta fidelidade, do app GO redesenhado, para testes moderados de usabilidade (12, 13 e 16 Nov 2026) que comparam o app atual com este protótipo.

## Objetivos
- Fluxos T1 a T4 funcionando de ponta a ponta até 10 Nov (piloto 11 Nov).
- Visual fiel ao Figma (tokens, componentes), acessível (WCAG 2.1 AA).
- Resetável em um clique para cada participante começar da tela Welcome.

## Não-objetivos / anti-objetivos
- Nenhuma API de voz real. Nenhum dado real de pessoas.
- Nada publicado sem perguntar à Ana.
- Não alterar o Figma.

## Abordagem (decidida no CLAUDE.md)
Vite + React + TypeScript, CSS simples com variáveis, navegação por estado/rotas (HashRouter, funciona em hospedagem estática). Estado em memória (sem localStorage entre sessões). Textos em `src/data/content.ts`, números falsos em `src/data/fake.ts`.
Alternativas descartadas: biblioteca de UI pronta (foge do design system do Figma); Figma Make (menos controle e menos portátil).

## Escolhas minhas (a confirmar com Ana)
- **Node 22 portátil** em `.tools/` (o Homebrew do Mac não instala; o Node 14 do sistema é antigo demais). Scripts `npm` usam esse caminho.
- Testes automáticos (Vitest) só para a lógica do fluxo (estado/navegação); o visual é verificado no navegador.
