import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../../Hooks/ItemsContext";
import style from "./Stock.module.css";
import { Link, useLocation, useParams } from "react-router-dom";

export default function ShowItem() {
  const location = useLocation()
  const { stock, setItemState, setIndentifyer, setStock, idiom } = useContext(ItemContext);
  const { itemId } = useParams();
  const [deleted, setDeleted] = useState(false);
  const selectedItem = stock.find((item) => item.id === itemId);

  const deleteItem = (id) => {
    const newStock = stock.filter((item) => item.id !== id)
    setDeleted(true)
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
  }, [stock, location]);


  return (
    <>
      {
        selectedItem ? (
          <div>
            <div id={style.showItemName} >
              <p className={style.itemName} >{selectedItem.name}</p>
              <div>
                <Link to={"../edit"}>
                  <button className={style.whiteBtn} onClick={() => editItem(selectedItem.id)}>
                    {idiom ? "Editar" : "Edit"}
                  </button>
                </Link>
                <button className={style.redBtn} onClick={() => deleteItem(selectedItem.id)}>
                  {idiom ? "Excluir" : "Delete"}
                </button>
              </div>
            </div>
            <div className={style.infoItem}>
              <div className={style.infoBlock}>{idiom ? "Categoria" : "Category"}: {selectedItem.category}</div>
              <div className={style.infoBlock}>{idiom ? "Quantidade em estoque" : "Stock quantity"}: {selectedItem.quantity}</div>
              <div className={style.infoBlock}>{idiom ? "Preço: R$" : "Price: $"}{selectedItem.price}</div>
            </div>
            <p>{selectedItem.description}</p>
            <p>{idiom ? "Criado em " : "Created in "} {selectedItem.creationDate}</p>
            {selectedItem.editDate ? <p>{idiom ? "Atualizado em " : "Last update "}{selectedItem.editDate}</p> : <p></p>}

          </div>
        ) : deleted ? (
          <div>
            <p>{idiom ? "O item foi excluido com sucesso!" : "The item was successfully deleted!"}</p>
            <Link to={"../items"}>
              <button className={style.blueBtn}>
                {idiom ? "Voltar" : "Back"}
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <h4>{idiom ? "Itemd não encontrado" : "Item not found"}</h4>
            <Link to={"../items"}>
              <button className={style.blueBtn}>{idiom ? "Voltar" : "Back"}</button>
            </Link>
          </div>
        )
      }
    </>
  );
}