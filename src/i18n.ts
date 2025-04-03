// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 这里是一个简单的语言文件，你可以扩展到更多语言
const resources = {
  en: {
    translation: {
      checkout: "Checkout",
      // 其他翻译...
    },
  },
  ja: {
    translation: {
      checkout: "チェックアウト",
      // 其他翻译...
    },
  },    
};

i18n
  .use(initReactI18next) // 绑定到 React
  .init({
    resources,
    lng: 'ja', // 默认语言
    interpolation: {
      escapeValue: false, // React 已经防止 XSS 攻击
    },
  });

export default i18n;
