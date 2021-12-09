# TabTop Hackathon Project

## Links

- Hackathon submission on DevPost https://devpost.com/software/tabtop
- Walkthrough video https://www.loom.com/share/54ac2b0bf3bf45799643f37e8d37a3f9?sharedAppSource=personal_library

Any questions? Email `chung.nguyen` at `gmail.com`.

### Prisma + sqlite

Instructions from [Remix.run](https://remix.run/docs/en/v1/tutorials/jokes#set-up-prisma)

1. Install Prisma and additional dependency (because seed file will be written in TypeScript):

```
npm install --save-dev prisma
npm install @prisma/client
npm install --save-dev esbuild-register
```

2. To initialize with sqlite

```
npx prisma init --datasource-provider sqlite
```

3. Create the schema and then `npx prisma db push`

4. Then run `node --require esbuild-register prisma/seed.ts` (or `npm run prisma:seed`)
