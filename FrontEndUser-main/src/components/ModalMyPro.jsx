import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Steps } from "antd";
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../hooks/useLocalStorage";
export default function ModalMyPro({ num }) {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useLocalStorage("lang", "ar");

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const showModal = (key) => {
    return key === "Details" ? setIsModalOpen(true) : setIsStatusOpen(true);
  };
  const handleOk = (key) => {
    return key === "Details" ? setIsModalOpen(false) : setIsStatusOpen(false);
  };
  const handleCancel = (key) => {
    return key === "Details" ? setIsModalOpen(false) : setIsStatusOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-7 border-t border-[#7f6727] py-6">
        <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
          <div className="img-box">
            <img
              src="https://pagedone.io/asset/uploads/1701162850.png"
              alt="perfume bottle image"
              className="xl:w-[140px]"
            />
          </div>
          <div className="pro-data w-full max-w-sm ">
            <h5 className="font-semibold text-xl leading-8 text-gray-200 max-[550px]:text-center">
              Latest N-5 Perfuam
            </h5>
          </div>
        </div>
        <div className="flex items-center justify-evenly flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
          <h6 className="font-manrope font-bold text-2xl  leading-9 text-gray-200 w-full max-w-[176px] text-center">
            <button
              onClick={() => showModal("Details")}
              className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-gray-200"
            >
              <span className="font-bold text-[#000915] text-xl relative z-10 group-hover:text-gray-200 duration-500">
                {t("ModalMyPro.Details")}
              </span>
              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 group-hover:-translate-x-full h-full"></span>
              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 group-hover:translate-x-full h-full"></span>

              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
              <span className="absolute delay-300 top-0 left-0 w-full bg-gray-200 duration-500 group-hover:translate-y-full h-full"></span>
            </button>
          </h6>
          <Modal
            title={t("ModalMyPro.Details")}
            open={isModalOpen}
            onOk={() => handleOk("Details")}
            key="Details"
            footer={null}
            onCancel={() => handleCancel("Details")}
          >
            <div className="flex flex-wrap gap-5 mt-8  items-center">
              <div className=" w-full flex flex-wrap gap-2 items-center ">
                {" "}
                <h1 className="text-2xl font-medium text-[#ad8d36]">
                  {t("ModalMyPro.Name")} :
                </h1>{" "}
                <h1 className=" text-xl text-gray-200">Perfume Bottle</h1>
              </div>
              <div className=" w-full flex flex-wrap gap-2 items-center">
                {" "}
                <h1 className="text-2xl font-medium text-[#ad8d36]">
                  {t("ModalMyPro.Quantity")} :
                </h1>{" "}
                <h1 className=" text-xl text-gray-200">7</h1>
              </div>

              <div className=" w-full flex flex-wrap gap-2 items-center ">
                {" "}
                <h1 className="text-2xl font-medium text-[#ad8d36]">
                  {t("ModalMyPro.File_Name")} :
                </h1>{" "}
                <h1 className=" text-xl text-gray-200">
                  fdssssssssssssssssDFDSffffffffdsaaaa
                </h1>
              </div>
            </div>
          </Modal>

          <h6 className="text-gray-200 font-manrope  font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
            <button
              onClick={() => showModal("Status")}
              className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-gray-200"
            >
              <span className="font-bold text-[#000915] text-xl relative z-10 group-hover:text-gray-200 duration-500">
                {t("ModalMyPro.Status")}
              </span>
              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 group-hover:-translate-x-full h-full"></span>
              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 group-hover:translate-x-full h-full"></span>

              <span className="absolute top-0 left-0 w-full bg-gray-200 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
              <span className="absolute delay-300 top-0 left-0 w-full bg-gray-200 duration-500 group-hover:translate-y-full h-full"></span>
            </button>
          </h6>
          <h6 className="text-gray-200 disabled font-manrope   font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
            <button className=" bg-[#7f6727]  border-2 px-5 py-2 cursor-auto  text-nowrap border-[#7f6727]">
              <span className="font-bold text-gray-200 text-xl mx-2 ">
                {t("ModalMyPro.Received")}
              </span>
              <CheckCircleFilled className=" text-lg" />
            </button>
          </h6>
          <Modal
            title={t("ModalMyPro.Status")}
            open={isStatusOpen}
            onOk={() => handleOk("Status")}
            key="status"
            footer={null}
            onCancel={() => handleCancel("Status")}
          >
            <h1 className=" mt-9 text-2xl font-bold items-center text-nowrap gap-2">
              <span className=" text-[#b99638]">
                {" "}
                {t("ModalMyPro.StatusOfAccept")} :
              </span>{" "}
              <span className="  sm:inline-flex  flex flex-wrap  items-center gap-2">
                <h2> {t("ModalMyPro.Waiting")} </h2>
                <ClockCircleFilled className=" text-lg text-[#b99638]" />
              </span>
            </h1>
            <h1 className=" mt-9 text-2xl font-bold items-center text-nowrap gap-2">
              <span className=" text-[#b99638]">
                {" "}
                {t("ModalMyPro.StatusOfAccept")} :
              </span>{" "}
              <span className="  sm:inline-flex  flex flex-wrap  items-center gap-2">
                <h2> {t("ModalMyPro.Deny")} </h2>
                <CloseCircleFilled className=" text-lg text-red-500" />
              </span>
            </h1>
            <h1 className=" mt-9 text-2xl font-bold items-center text-nowrap gap-2">
              <span className=" text-[#b99638]">
                {" "}
                {t("ModalMyPro.StatusOfAccept")} :
              </span>{" "}
              <span className="  sm:inline-flex  flex flex-wrap  items-center gap-2">
                <h2> {t("ModalMyPro.Accept")} </h2>
                <CheckCircleFilled className=" text-lg text-green-500" />
              </span>
            </h1>
            <Steps
              className=" mt-10 "
              current={2}
              direction="vertical"
              size="large"
              items={[
                {
                  title: t("ModalMyPro.stat1"),
                },
                {
                  title: t("ModalMyPro.stat2"),
                },
                {
                  title: t("ModalMyPro.stat3"),
                },
                {
                  title: t("ModalMyPro.stat4"),
                },
              ]}
            />
          </Modal>
          <></>
        </div>
      </div>
    </>
  );
}
