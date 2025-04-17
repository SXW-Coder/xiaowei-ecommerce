# 🛒 My E-commerce Frontend / フロントエンドECサイト

## 📝 概要 / Overview

このプロジェクトは、Next.js と TypeScript を用いたフロントエンドのECサイトです。  
This project is a frontend e-commerce site built using Next.js and TypeScript.

Zustand による状態管理、SSR/CSR の使い分け、そしてユーザー体験を意識した UI 設計を行っています。  
It features state management with Zustand, hybrid rendering (SSR + CSR), and user-friendly UI components.

---

## 🚀 主な機能 / Features

- ✅ 商品一覧ページ（カテゴリ別）  
  Product listing by category (`apparel`, `shoes`, `backpack`, etc.)

- ✅ 商品詳細ページ  
  Product detail page

- ✅ カート管理（Zustand 使用）  
  Cart system powered by Zustand

- ✅ チェックアウト & 配送先住所管理  
  Checkout flow with address selection and form validation

- ✅ 注文履歴の保存（localStorage）  
  Order history saved to localStorage


---

## 🧩 技術スタック / Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Zustand** - 状態管理
- **Tailwind CSS** - スタイリング
- **Vercel** - デプロイ先
- **PostgreSQL (サーバーからのフェッチは `db()` で抽象化)**

---

## 🖼️ ページ構成 / Page Structure

| ページ | 説明 |
|--------|------|
| `/` | トップページ（商品一覧） |
| `/apparel`, `/shoes`... | カテゴリ別商品ページ |
| `/detail/:id` | 商品詳細ページ |
| `/checkout` | チェックアウト（住所選択 & 注文確認） |
| `/account` | アカウント管理（注文履歴・住所管理） |

---

## 🌐 デプロイ / Deployment

- Vercel: [https://xiaowei-shop.vercel.app](https://xiaowei-shop.vercel.app)

---

## 📦 使用ライブラリ / Packages

- `@radix-ui/react-dialog`, `@shadcn/ui`（UI コンポーネント）
- `lucide-react`（アイコン）
- `zod`, `react-hook-form`（フォームバリデーション）
- `classnames`（クラス名動的制御）

---

## 👤 開発者 / Author

**ソウ ギョウイ**  
GitHub: [https://github.com/SXW-Coder](https://github.com/SXW-Coder)

---

## 📝 補足 / Notes

現在、本プロジェクトはフロントエンドに特化しており、主に以下の機能が実装されています：

・商品一覧ページ、カート機能、チェックアウトページ

・商品のカテゴリ別表示

・ストアとユーザーインターフェイスに関連する基本的なデザイン

---

> ご覧いただきありがとうございます！ポートフォリオ・面接資料としても使用しています。何かご質問やご意見があればお気軽にお知らせください。

