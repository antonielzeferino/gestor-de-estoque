import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import { ItemContextProvider } from "./Hooks/ItemsContext";

export default function () {
  return (
    <>
      <Header />
      <ItemContextProvider>
        <Outlet />
      </ItemContextProvider >
    </>
  )
}