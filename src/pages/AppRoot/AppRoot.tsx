import { Outlet } from "react-router-dom";
import Header from "../../components/sections/Header/Header";
import Footer from "../../components/sections/Footer/Footer";

const AppRoot = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppRoot;
