import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { ItemContext } from "../../Hooks/ItemsContext"
import style from "./Stock.module.css"

export default function ItemList() {
  const { stock, setStock, setItemState, setIndentifyer } = useContext(ItemContext)

  const deleteItem = (id) => {
    const newStock = stock.filter((item) => item.id !== id)
    setStock(newStock)
  }

  const editItem = (TargetItemId) => {
    const currentItem = stock.find((item) => item.id === TargetItemId)
    setItemState({
      name: currentItem.name,
      description: currentItem.description,
      category: currentItem.category,
      price: currentItem.price,
      quantity: currentItem.quantity,
      id: currentItem.id,
    })
    setIndentifyer(currentItem.id)
  }

  useEffect(() => {
    localStorage.setItem("stock", JSON.stringify(stock))
  }, [stock]);

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
                <Link to={`${item.id}`}>
                  <button className={style.blueBtn}>
                    ver
                  </button>
                </Link>

                <Link to={"../edit"}>
                  <button className={style.whiteBtn} onClick={() => editItem(item.id)}>
                    editar
                  </button>
                </Link>
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
    </div >
  )
}