'use client'
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { MenuList, Title } from "@/lib/constants"
import { Fragment } from "react"
import { useCartStore } from "@/store"
import { Button } from "./ui/button"
import useTranslation from "@/hooks/useTranslation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Globe } from "lucide-react"
import i18n from "@/i18n"

export default function Header() {
    const { cartList } = useCartStore()
    const { t, currentLanguage,changeLanguage  } = useTranslation();

    // 语言切换处理函数
    const handleLanguageSwitch = (lang: "ja" | "en") => {
        i18n.changeLanguage(lang);  // 使用 changeLanguage 切换语言
      };

    return (
        <div className="h-16 px-10 border-b bg-white">
            <div className="container flex items-center justify-between h-full">
                <h1 className="text-2xl">
                    <Link href="/">{Title}</Link>
                </h1>
                <div className="flex items-center justify-end space-x-4 text-sm h-full">
                    {MenuList.map((item, i) => (
                        <Fragment key={item.text}>
                            {i !== 0 && <Separator orientation="vertical" />}
                            <Link href={item.href}>{item.text}</Link>
                        </Fragment>
                    ))}
                    {cartList.length ? `(${cartList.length})` : ''}

                    {/* 语言切换按钮 - 使用 Popover 组件 */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Globe className="h-5 w-5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-24 p-2 text-center">
                            {/* 按钮动态设置字体加粗，根据当前语言 */}
                            <button 
                                className={`block w-full py-1 ${currentLanguage === "en" ? "font-bold" : ""}`}
                                onClick={() => changeLanguage("en")}
                            >
                                🇬🇧 EN
                            </button>
                            <button 
                                className={`block w-full py-1 ${currentLanguage === "ja" ? "font-bold" : ""}`}
                                onClick={() => changeLanguage("ja")}
                            >
                                🇯🇵 JA
                            </button>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}
