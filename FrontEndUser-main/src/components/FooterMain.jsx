import { Footer } from "antd/es/layout/layout";
import "../index.css";
import "../styles.css";
import helwanLogo from "../images/helwanLogo.png";
import fawryLogo from "../images/fawryLogo.svg";
import mezaLogo from "../images/mezaLogo.svg";
import amanLogo from "../images/amanLogo.png";
import {
  TwitterOutlined,
  FacebookFilled,
  InstagramFilled,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

export function FooterMain() {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <Footer className="p-3   w-full bg-[#000915] text-gray-200   h-[162px] grid grid-rows-3  justify-center items-center space-y-3">
      <div className="sm:h-16 sm:w-16 h-14 w-14 px-1 py-1 justify-self-center  ">
        <img
          src={helwanLogo}
          alt="Helwan University"
          className="h-full w-full"
        />
      </div>
      <div className="grid grid-cols-3   justify-center items-center justify-self-center gap-4">
        <div className="justify-self-center">
          <img
            src={fawryLogo}
            alt="fawryLogo"
            className=" sm:w-16 sm:h-16 w-12 h-12 "
          />
        </div>
        <div className="justify-self-center">
          <img
            src={mezaLogo}
            alt="mezaLogo"
            className=" sm:w-16 sm:h-16 w-12 h-12"
          />
        </div>
        <div className="justify-self-center">
          <img
            src={amanLogo}
            alt="amanLogo"
            className=" sm:w-14 sm:h-7 w-10 h-4 "
          />
        </div>
      </div>
      <div className="text-gray-200 text-center fontTwoLight h-fit">
        {t("footer.copyright")}
      </div>
      <div className="text-gray-200   w-fit h-fit  text-lg flex sm:top-auto gap-3 items-center    sm:absolute sm:right-7 justify-self-center">
        <a href="http://www.facebook.com">
          <FacebookFilled className="hover:text-[#7f6727]" />
        </a>
        <a href="http://www.twitter.com">
          <TwitterOutlined className="hover:text-[#7f6727]" />
        </a>
        <a href="http://www.instagram.com">
          <InstagramFilled className="hover:text-[#7f6727]" />
        </a>
      </div>
    </Footer>
  );
}
