import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ItemContext } from "../../Hooks/ItemsContext"
import style from "./Stock.module.css"

export default function ItemList() {
  const { stock, setStock, setItemState, setIndentifyer, idiom } = useContext(ItemContext)

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
            <th>{idiom ? "Nome" : "Name"}</th>
            <th>{idiom ? "Em estoque" : "Stock"}</th>
            <th>{idiom ? "Categoria" : "Category"}</th>
            <th>{idiom ? "Ações" : "Actions"}</th>
          </tr>
        </thead>
        <tbody>
          {stock.length > 0 ? stock.map((item) => (
            <tr key={item.id} id={style.ItemList}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
              <td className={style.itemBtn}>
                <Link to={`${item.id}`}>
                  <button className={style.blueBtn}>
                  {idiom ? "Ver" : "View"}
                  </button>
                </Link>

                <Link to={"../edit"}>
                  <button className={style.whiteBtn} onClick={() => editItem(item.id)}>
                  {idiom ? "Editar" : "Edit"}
                  </button>
                </Link>
                <button className={style.redBtn} onClick={() => deleteItem(item.id)}>excluir</button>
              </td>

              <td>
                <Link to={`${item.id}`}>
                  <div className={style.menuBtn}> {/*botões ocultos para mobile*/}
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Link>
              </td>
            </tr>
          )) : (
            <tr>
              <td>{idiom ? "nenhum item disponível" : "no items avaliable"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div >
  )
}