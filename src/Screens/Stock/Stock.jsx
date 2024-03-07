import { Link, Outlet, useLocation } from "react-router-dom"
import style from "./style.module.css"
import { useContext } from "react";
import { ItemContext } from "../../Hooks/ItemsContext";

export default function Stock() {
  const { idiom } = useContext(ItemContext)
  const location = useLocation();

  return (
    <div id={style.Stock}>
      <h3>Stock Items</h3>
      <div id={style.StockHeader}>
        <nav>
          <p className={location.pathname === "/stock/items" ? style.activeLink : ""}>
            <Link to="items"
              style={{ textDecoration: "none" }}
            >{idiom ? "Todos os itens" : "All items"}</Link>
          </p>
          <p className={location.pathname === "/stock/add" ? style.activeLink : ""}>
            <Link to="add"  
              style={{ textDecoration: "none" }}
            >{idiom ? "Novo item" : "Add item"} </Link>
          </p>
        </nav>
        <hr style={{ border: "1px solid gray" }} />
      </div>
      <div style={{paddingTop: "1rem"}}>
        <Outlet />
      </div>
    </div>
  )
}