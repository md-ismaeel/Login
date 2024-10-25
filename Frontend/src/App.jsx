import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import NotFound from "./Page/NotFound/NotFound";
import { useSelector } from "react-redux";
import { Home } from "./Page/Home/Home";
import ResetPassword from "./Page/ResetPassword/ResetPassword";
import NewPassword from "./Page/ResetPassword/NewPassword";
import ConfirmEmail from "./Page/EmailConformation/ConfirmEmail";

function App() {
  const { isLogin, user } = useSelector((state) => state.userSlice);
  // console.log(isLogin);
  // console.log(user);

  const loginRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
  ]);

  const logoutRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <NotFound />,
    },
    {
      path: "/confirm-email/:token",
      element: <ConfirmEmail />,
      errorElement: <NotFound />,
    },
    {
      path: "/resetPassword",
      element: <ResetPassword />,
      errorElement: <NotFound />,
    },
    {
      path: "/resetPassword/:token",
      element: <NewPassword />,
      errorElement: <NotFound />,
    },
  ]);

  return (
    <RouterProvider
      router={isLogin ? loginRoutes : logoutRoutes}
    ></RouterProvider>
  );
}

export default App;
