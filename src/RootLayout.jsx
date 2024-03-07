import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import { ItemContextProvider } from "./Hooks/ItemsContext";
import Footer from "./Components/Footer/Footer";

export default function () {
  return (
    <>
      <ItemContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </ItemContextProvider >
    </>
  )
}