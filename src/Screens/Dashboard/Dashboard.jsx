import { useContext } from "react"
import style from "./style.module.css"
import { ItemContext } from "../../Hooks/ItemsContext"
import { Link, useParams } from "react-router-dom";

export default function Dashboard() {
  const { stock } = useContext(ItemContext)
  const { } = useParams();

  const uniqueCategories = stock.reduce((iCateg, item) => {
    if (!iCateg[item.category]) {
      iCateg[item.category] = true;
    }
    return iCateg;
  }, {});
  const totalItems = stock.reduce((total, item) => (total + Number(item.quantity)), 0);
  const runningOut = stock.filter((item) => item.quantity <= 10 && item.quantity !== 0 )
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
          <p>diversidade de itens </p>
          <div>
            <span>53{/* {Object.keys(uniqueCategories).length} */}</span>
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
            <span>{recentItems.length}</span>
          </div>
        </div>

        <div className={style.stockInfo}>
          <p>items acabando</p>
          <div>
            <span>{runningOut.length}</span>
          </div>
        </div>
      </div>
      <div id={style.itemsList}>
        <table id={style.runningOutItems}>
          <thead>
            <tr>
              <th>items recentes</th>
              <th>quantidade</th>
              <th>Ação</th>
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
                    <button> Ver </button>
                  </Link>
                </td>
              </tr>
            )) : (
              <tr>
                <td>nenhum item recente</td>
              </tr>
            )}
          </tbody>
        </table>

        <table id={style.lastItems}>
          <thead>
            <tr>
              <th>items acabando</th>
              <th>quantidade</th>
              <th>Ação</th>
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
                    <button> Ver </button>
                  </Link>
                </td>
              </tr>
            )) : (
              <tr>
                <td>nenhum item recente</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}