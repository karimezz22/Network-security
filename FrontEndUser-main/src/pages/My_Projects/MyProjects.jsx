import { useTranslation } from "react-i18next";
import ModalMyPro from "../../components/ModalMyPro";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";
export function MyProjects() {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <div>
      {" "}
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-gray-200">
            {t("ModalMyPro.My_Projects")}
          </h2>
          <div className="hidden lg:grid grid-cols-2 py-6">
            <div className="font-normal text-xl leading-8 text-gray-200">
              {t("ModalMyPro.Product")}
            </div>
            <p className="font-normal text-xl leading-8 text-gray-200 justify-evenly flex items-center  ">
              <span className="w-full max-w-[176px] text-center">
                {t("ModalMyPro.Details")}
              </span>
              <span className="w-full max-w-[176px] text-center">
                {t("ModalMyPro.Status")}
              </span>
            </p>
          </div>

          <ModalMyPro num={1} />
          <ModalMyPro num={2} />
        </div>
      </section>
    </div>
  );
}
