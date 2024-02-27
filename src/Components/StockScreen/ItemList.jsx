import { useContext } from "react"
import { Link } from "react-router-dom"
import { ItemContext } from "../../Hooks/ItemsContext"
import style from "./Stock.module.css"

export default function ItemList() {
  const { stock, setStock } = useContext(ItemContext)

  const deleteItem = (id) => {
    const newStock = stock.filter((item) => item.id !== id)
    setStock(newStock)
  }

  return (
    <div id={style.List}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Em estoque</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {stock.length > 0 ? stock.map((item) => (
            <tr key={item.id} id={style.ItemList}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
              <td>
                <button className={style.blueBtn}>
                  <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to={""}
                  >
                    ver
                  </Link>
                </button>
                <button className={style.whiteBtn}>
                  <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to={""}
                  >
                    editar
                  </Link>
                </button>
                <button className={style.redBtn} onClick={() => deleteItem(item.id)}>excluir</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td>nenhum item disponivel</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}