import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../../Hooks/ItemsContext";
import style from "./Stock.module.css";
import { Link, useLocation, useParams } from "react-router-dom";

export default function ShowItem() {
  const location = useLocation()
  const { stock, setItemState, setIndentifyer, setStock } = useContext(ItemContext);
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
                  <button className={style.whiteBtn} onClick={() => editItem(selectedItem.id)}>Editar</button>
                </Link>
                <button className={style.redBtn} onClick={() => deleteItem(selectedItem.id)}>Excluir</button>
              </div>
            </div>
            <div className={style.infoItem}>
              <div className={style.infoBlock}>Categoria: {selectedItem.category}</div>
              <div className={style.infoBlock}>Quantidade em estoque: {selectedItem.quantity}</div>
              <div className={style.infoBlock}>Preço: R${selectedItem.price}</div>
            </div>
            <p>{selectedItem.description}</p>
            <p>criado em {selectedItem.creationDate}</p> 
            {selectedItem.editDate ? <p>atualizado em {selectedItem.editDate}</p> : <p></p> }
            
          </div>
        ) : deleted ? (
          <div>
            <p>O item foi excluído com sucesso!</p>
            <Link to={"../items"}>
              <button className={style.blueBtn}>Voltar</button>
            </Link>
          </div>
        ) : (
          <div>
            <h4>Item não encontrado</h4>
            <Link to={"../items"}>
              <button className={style.blueBtn}>Voltar</button>
            </Link>
          </div>
        )
      }
    </>
  );
}