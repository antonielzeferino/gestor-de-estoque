import { useContext } from "react"
import style from "./style.module.css"
import { ItemContext } from "../../Hooks/ItemsContext"

export default function Dashboard() {
  const { stock } = useContext(ItemContext)

  const uniqueCategories = stock.reduce((iCateg, item) => {
    /* 
        <h3>Dashboard</h3>
          <div>diversidade de items: </div>
          <div>inventario total: </div> */

    if (!iCateg[item.category]) {
      iCateg[item.category] = true;
    }

    return iCateg;
  }, {});
  const totalItems = stock.reduce((total, item) => (total + Number(item.quantity)), 0);

  return (
    <div id={style.Dashboard}>
      <h3>Dashboard</h3>
      <div className={style.infoBlocks}>
        <div className={style.stockInfo}>
          <p>diversidade de items</p>
          <div>
            <span>{Object.keys(uniqueCategories).length}</span>
          </div>
        </div>

        <div className={style.stockInfo}>
          <p>inventario total</p>
          <div>
            <span>{totalItems}</span>
          </div>
        </div>

        <div className={style.stockInfo}>
          <p>items recentes</p>
          <div>
          <span>37</span>
          </div>
        </div>

        <div className={style.stockInfo}>
          <p>items acabando</p>
          <div>
            <span>3</span>
          </div>
        </div>
      </div>
    </div>
  )
}