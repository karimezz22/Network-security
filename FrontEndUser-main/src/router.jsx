import { createBrowserRouter } from "react-router-dom";
import { HomeFunc } from "./pages/Home/Home";
import { LayoutMain } from "./layouts/LayoutMain";
import { LayoutError } from "./layouts/LayoutError";

import { MyProjects } from "./pages/My_Projects/MyProjects";
import { About } from "./pages/About/About";
import { ProductFunc } from "./pages/Product/Product";
import Registeration from './pages/Registeration/Registeration';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import { LogIn } from "./pages/Log_in/LogIn";
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import UserDetails from './pages/UserDetails/UserDetails';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    errorElement: <LayoutError />,
    children: [
      {
        index: true,
        ...HomeFunc,
      },

      { path: "/MyProjects", element: <MyProjects /> },
      { path: "/LogIn", element: <LogIn /> },
      { path: "/Registeration", element: <Registeration /> },
      { path: "/VerifyEmail", element: <VerifyEmail /> },
      { path: "/ForgetPassword", element: <ForgetPassword /> },
      { path: "/ResetPassword", element: <ResetPassword /> },
      { path: "/UserDetails/:id", element: <UserDetails /> },
      { path: "/About", element: <About /> },
      {
        path: "/Product/:product_id",
        ...ProductFunc,
      },
    ],
  },
]);
