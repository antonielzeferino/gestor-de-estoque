import { useContext, useEffect } from "react"
import style from "./style.module.css"
import { ItemContext } from "../../Hooks/ItemsContext"
import { Link, useParams } from "react-router-dom";

export default function Dashboard() {
  const { stock , idiom} = useContext(ItemContext)

  const uniqueCategories = stock.reduce((iCateg, item) => {
    if (!iCateg[item.category]) {
      iCateg[item.category] = true;
    }
    return iCateg;
  }, {});
  const totalItems = stock.reduce((total, item) => (total + Number(item.quantity)), 0);
  const runningOut = stock.filter((item) => item.quantity <= 10 && item.quantity !== 0)
  const recentItems = stock.filter(item => {
    const creationDate = new Date(Date.parse(item.creationDate))
    const today = new Date();
    const differenceInDays = Math.floor((creationDate.getDate() - today.getDate()) / (24 * 60 * 60 * 1000))
    return differenceInDays <= 10
  });
  //86400000 numero referente ao dia em milissegundos 

  return (
    <div id={style.Dashboard}>
      <h3>Dashboard</h3>
      <div className={style.infoBlocks}>
        <div className={style.stockInfo}>
          <p>
            {idiom ? "diversidade de itens" : "diversity of items"}
          </p>
          <div>
            <span>{Object.keys(uniqueCategories).length}</span>
          </div>
        </div>

        <div className={style.stockInfo}>
          <p>{idiom ? "inventario total" : "total inventory"}</p>
          <div>
            <span>{totalItems}</span>
          </div>
        </div>

        <div className={style.stockInfo}>
          <p>{idiom ? "itens recentes" : "recent items"}</p>
          <div>
            <span>{recentItems.length}</span>
          </div>
        </div>

        <div className={style.stockInfo}>
          <p>{idiom ? "itens acabando" : "running out items"}</p>
          <div>
            <span>{runningOut.length}</span>
          </div>
        </div>
      </div>
      <div id={style.itemsList}>
        <table id={style.runningOutItems}>
          <thead>
            <tr>
              <th>{idiom ? "itens recentes" : "recent items"}</th>
              <th>{idiom ? "quantidade" : "quantity"}</th>
              <th>{idiom ? "ação" : "action"}</th>
            </tr>
          </thead>
          <tbody>
            {recentItems.length > 0 ? recentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <Link
                    to={`../Stock/items/${item.id}`}
                  >
                    <button> {idiom ? "ver" : "view"} </button>
                  </Link>
                </td>
              </tr>
            )) : (
              <tr>
                <td>{idiom ? "nenhum item recente" : "no recent item, try to edd one!"}</td>
              </tr>
            )}
          </tbody>
        </table>

        <table id={style.lastItems}>
          <thead>
            <tr>
              <th>{idiom ? "itens acabando" : "runnin out items"}</th>
              <th>{idiom ? "quantidade" : "quantity"}</th>
              <th>{idiom ? "ação" : "action"}</th>
            </tr>
          </thead>
          <tbody>
            {runningOut.length > 0 ? runningOut.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <Link
                    to={`../Stock/items/${item.id}`}
                  >
                    <button> {idiom ? "ver" : "view"} </button>
                  </Link>
                </td>
              </tr>
            )) : (
              <tr>
                <td>{idiom ? "nenhum item recente" : "no recent item"}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}