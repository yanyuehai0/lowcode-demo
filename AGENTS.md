# Repository Guidelines

## Project Structure & Module Organization
`src/` contains the application code. Entry points are `src/main.tsx` and `src/App.tsx`. Routes live in `src/router/`, page-level views in `src/view/`, and shared runtime assets for the low-code editor are vendored under `src/lib/`. Static files such as icons are in `public/`. Reference material for the Ali Low-Code engine is kept in `docs/`.

Use the `@` alias for imports from `src` where it improves readability, for example `@/view/lowcode`.

## Build, Test, and Development Commands
This repo uses `pnpm` because `pnpm-lock.yaml` is committed.

- `pnpm install`: install dependencies.
- `pnpm dev`: start the Vite dev server with host exposure for local network access.
- `pnpm build`: run TypeScript project builds, then create the production bundle in `dist/`.
- `pnpm lint`: run ESLint across the repo.
- `pnpm preview`: serve the built app locally for a final smoke check.

## Coding Style & Naming Conventions
Prettier is the baseline formatter: 4-space indentation, single quotes, and `printWidth: 120`. ESLint enforces import ordering, no duplicate imports, React Hooks rules, and limited empty lines. Run `pnpm lint` before opening a PR.

Use `PascalCase` for React components and plugin classes such as `TopBar.tsx` and `TopBarPlugin.tsx`. Use `camelCase` for utilities and state modules such as `loadLowcodeAssets.ts` and `portalStore.ts`. Keep route folders lowercase, matching the existing `src/view/home` and `src/view/lowcode` pattern.

## Testing Guidelines
There is currently no automated test runner or `pnpm test` script configured. Until one is added, treat `pnpm lint` and `pnpm build` as required pre-merge checks. For UI-heavy changes, include a manual verification note covering the affected route and editor behavior.

## Commit & Pull Request Guidelines
Recent history uses short `type:summary` commits, for example `docs:新增阿里低代码文档` and `init:初始化项目`. Follow that format with a concise scope, in Chinese or English, and keep each commit focused.

Pull requests should include a brief description, linked issue or task when available, commands run for verification, and screenshots or recordings for UI changes in `src/view/` or the low-code editor.
