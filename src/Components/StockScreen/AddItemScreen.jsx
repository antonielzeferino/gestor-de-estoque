import { useContext, useEffect} from "react"
import { ItemContext } from "../../Hooks/ItemsContext"

import style from "./Stock.module.css"

export default function AddItemScreen({editMode}) {
  const { itemState, setItemState, stock, setStock, getId, itemId} = useContext(ItemContext)

  if (editMode) {
    alert('oi')
  }

  const handleChange = (el) => {
    getId()
    setItemState({
      ...itemState,
      [el.name]: el.value
    })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    getId()
    const id = itemId
    const item = {
      ...itemState,
      id: id,
    }
    id !== "" ? setStock([...stock, item]) : alert("algo deu errado")
    setItemState({
      name: '',
      quantity: 0,
      description: '',
      category: '',
      price: 0,
      id: '',
    })
  }

  useEffect(() => {
    localStorage.setItem("stock", JSON.stringify(stock))
  }, [stock]);

  return (
    <div id={style.addItemScreen}>
      <form onSubmit={(ev) => handleSubmit(ev)}>
        <div id={style.upValues}>
          <div>
            <label htmlFor="itemName">Nome: </label><br />
            <input type="text" id="itemName" name="name"
              value={itemState.name}
              onChange={(el) => handleChange(el.target)}
            />
          </div>
          <div>
            <label htmlFor="itemQnt">Quantidade: </label><br />
            <input type="number" id="itemQnt" min={0} name="quantity"
              value={itemState.quantity}
              onChange={(el) => handleChange(el.target)}
            />
          </div>
          <div>
            <label htmlFor="itemPrice">Preço: </label><br />
            <input type="number" id="itemPrice" min={0} name="price"
              value={itemState.price}
              onChange={(el) => handleChange(el.target)}
            />
          </div>
          <div>
            <label htmlFor="itemCategory">Categoria: </label><br />
            <select id="itemCategory" name="category"
              value={itemState.category || ''}
              onChange={(el) => handleChange(el.target)}
            >
              <option value="Jogos">Jogo</option>
              <option value="Livros">Livro</option>
              <option value="Eletronicos">Eletrônico</option>
              <option value="" disabled>Selecione uma categoria</option>
            </select>
          </div>
        </div>
        <div id={style.downValues}>
          <label htmlFor="itemDesc">Descrição: </label>
          <textarea id="itemDesc" cols="30" rows="10" name="description"
            value={itemState.description}
            onChange={(el) => handleChange(el.target)}
          ></textarea>
        </div>
        <button className={style.blueBtn}>Salvar</button>
      </form>
    </div>
  )
}