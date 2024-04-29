import React from "react";
import "./styles.css";
import ReactDOM from "react-dom/client";
import global_en from "./translation/en/global.json";
import global_ar from "./translation/ar/global.json";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
i18next.init({
  interpolation: { escapeValue: false },
  lng: "ar",
  failbackLng: "ar",
  resources: {
    en: {
      global: global_en,
    },
    ar: {
      global: global_ar,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <I18nextProvider i18n={i18next}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </React.StrictMode>
);
