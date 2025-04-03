// // src/hooks/useTranslation.ts

// import { useEffect, useState } from "react";
// import i18n from "@/i18n";

// const useTranslation = () => {
//   // 设置初始语言
//   const [currentLanguage, setCurrentLanguage] = useState<string>(
//     i18n.language || "ja"
//   );

//   // 翻译函数
//   const t = (key: string) => {
//     return i18n.t(key);
//   };

//   // 监听语言变化
//   useEffect(() => {
//     const handleLanguageChange = (lng: string) => {
//       setCurrentLanguage(lng); // 更新语言状态
//     };
//     i18n.on("languageChanged", handleLanguageChange);

//     return () => {
//       i18n.off("languageChanged", handleLanguageChange); // 清除监听
//     };
//   }, []);

//   return { t, currentLanguage };
// };

// export default useTranslation;
import { useEffect, useState } from "react";
import i18n from "@/i18n";

const useTranslation = () => {
  // 确保 i18n 初始语言正确
  const defaultLanguage = i18n.language || "ja";
  const [currentLanguage, setCurrentLanguage] = useState<string>(defaultLanguage);

  // 翻译函数
  const t = (key: string) => {
    return i18n.t(key);
  };

  // 语言切换函数
  const changeLanguage = (lng: "en" | "ja") => {
    i18n.changeLanguage(lng);  // 更改 i18n 语言
    setCurrentLanguage(lng);   // 更新状态
  };

  // 监听 i18n 语言变化
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return { t, currentLanguage, changeLanguage };
};

export default useTranslation;
