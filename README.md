# FormBuilder

#### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Prisma

```bash
# sync prisma schema to your db
npx prisma db push

# update your @prisma/client (run this everytime you update your prisma schema)
npx prisma generate

# run prisma studio on http://localhost:5000
npx prisma studio
```

Playwright

```bash
yarn playwright test
# runs the end-to-end tests.

yarn playwright test --ui
# starts the interactive UI mode.

yarn playwright test --project=chromium
# runs the tests only on Desktop Chrome.

yarn playwright test example
# runs the tests in a specific file.

yarn playwright test --debug
# runs the tests in debug mode.

yarn playwright codegen
# auto generate tests with Codegen.
```
