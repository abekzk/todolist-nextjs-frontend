# todolist-nextjs-frontend

![GitHub release (latest by date)](https://img.shields.io/github/v/release/kzuabe/todolist-nextjs-frontend)
[![GitHub license](https://img.shields.io/github/license/kzuabe/todolist-nextjs-frontend)](https://github.com/kzuabe/todolist-nextjs-frontend)
[![CI](https://github.com/kzuabe/todolist-nextjs-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/kzuabe/todolist-nextjs-frontend/actions/workflows/ci.yml)

Todo リストアプリ WebFE Next.js 実装

主な利用 OSS

- [Next.js by Vercel - The React Framework](https://nextjs.org/)
- [MUI: The React component library you always wanted](https://mui.com/)
- [Axios](https://axios-http.com/)
- [React Hooks for Data Fetching – SWR](https://swr.vercel.app/)
- [firebase/firebase-js-sdk: Firebase Javascript SDK](https://github.com/firebase/firebase-js-sdk)
- [Home | React Hook Form - Simple React forms validation](https://react-hook-form.com/)

## 使い方

```bash
$ npm ci

$ echo 'NEXT_PUBLIC_API_URL="<url>"' > .env.local

$ npm run dev
```

## ディレクトリ構成

```
.
├── __tests__
├── package-lock.json
├── package.json
├── public
├── src # アプリケーションの実装
│   ├── components
│   ├── configs
│   ├── models
│   ├── pages
│   ├── providers
│   ├── services
│   │   ├── api
│   │   └── firebase
│   └── styles # スタイルシート
└── tsconfig.json
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
