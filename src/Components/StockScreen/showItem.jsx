import { useContext } from "react";
import { ItemContext } from "../../Hooks/ItemsContext";
import style from "./Stock.module.css";
import { useParams } from "react-router-dom";

export default function ShowItem() {
  const { stock } = useContext(ItemContext);
  const { itemId } = useParams();
  const selectedItem = stock.find((item) => item.id === itemId);

  return (
    <>
    {
      selectedItem ? (
        <div id={style.ShowItem} >
          <h4>{selectedItem.name}</h4>
          <p>preço R${selectedItem.price},00</p>
        </div>
      ) : (
        <h4>Item não encontrado</h4>
      )
    }
    </>
  );
}