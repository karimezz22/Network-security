import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";

export function ErrorPage() {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <div>
      <div className="h-screen w-full flex flex-col justify-center items-center bg-[#000915]">
        <h1 className="text-9xl font-extrabold text-gray-200 tracking-widest">
          404
        </h1>
        <div className="bg-[#7f6727] px-2 text-sm rounded rotate-12 absolute">
          {t("error.error404")}
        </div>
        <Link to="/" className="mt-5">
          <div className="relative inline-block text-sm font-medium text-[#7f6727] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#7f6727] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#000915] border border-current">
              {t("error.Go_Home")}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
