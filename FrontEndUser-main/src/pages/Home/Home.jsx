import { useTranslation } from "react-i18next";
import bg from "../../images/bg.png";
import "../../index.css";
import "./home.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { UpSquareOutlined } from "@ant-design/icons";
import { Card } from "antd";
import ScrollToTop from "react-scroll-to-top";
const { Meta } = Card;

function Home() {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");
  const all_products = useLoaderData();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <div>
      <ScrollToTop
        smooth
        top={400}
        style={{
          bottom: "16px",
          backgroundColor: "#000915",
          width: "21px",
          height: "21px",
        }}
        component={
          <UpSquareOutlined className=" text-gray-200 text-2xl  hover:text-[#7f6727]" />
        }
      />
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="bg-cover bg-center h-[92vh] grid md:grid-cols-2 grid-cols-1 "
      >
        <div>
          <div className=" ltr:bg-gradient-to-r rtl:bg-gradient-to-l backdrop-blur-[2px] h-[92vh]  from-[#000915ad] to-transparent  md:pt-[20%] pt-[10%]  ltr:pl-[5%] rtl:pr-[5%]">
            <h4 className="fontTwoLight text-[#B38F00] text-2xl">
              {t("Home.mYE")}
            </h4>
            <h1 className="font-bold text-gray-200 text-[48px] mt-2  sm:mb-11 mb-0">
              {t("Home.Helwan_Printing")}
            </h1>
            <h4 className="fontTwoLight text-[#B38F00] text-2xl">
              {t("Home.iIP")}
            </h4>
            <h2 className="fontOneLight text-gray-200 text-3xl mt-2 mb-5">
              {t("Home.content")}
            </h2>
            <Link to="/About">
              <button className="relative px-8 sm:mt-10 mt-0 text-lg py-3 font-bold rounded-md bg-[#7f6727] isolation-auto z-10 border-2 border-[#000915] before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-gray-200 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 fontBold">
                {t("Home.Know_More")}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className=" text-gray-200 ">
        <h2 className="fontBold text-2xl  m-10 mb-15">
          {t("Home.all_products")}
        </h2>
        <div className=" flex justify-evenly  flex-wrap mr-5 ml-5 gap-10 ">
          {all_products.data.map((product) => (
            <Card
              key={product._id}
              hoverable
              style={{
                width: 215,
                height: 280,
                padding: 3,
              }}
              className=" bg-transparent  border-0 "
              cover={
                <Link to={`/Product/${product._id}`}>
                  <img
                    className="rounded-full w-[210px] h-[200px]"
                    style={{ borderRadius: 100 }}
                    alt={`${product.name}`}
                    src={`${product.image}`}
                  />
                </Link>
              }
            >
              <Meta
                className=" text-center "
                title={
                  <Link
                    to={`/Product/${product._id}`}
                    className=" text-gray-200 hover:text-[#7f6727] text-lg"
                  >
                    {product.name}
                  </Link>
                }
              />
            </Card>
          ))}{" "}
        </div>
      </div>
    </div>
  );
}

const loader = async ({ request: { signal } }) => {
  const all_products = await fetch(
    "https://printing-sys-fojo.vercel.app/products",
    {
      signal,
    }
  );
  return all_products;
};

export const HomeFunc = { element: <Home />, loader };
