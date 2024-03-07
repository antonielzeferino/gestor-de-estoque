import { useContext, useEffect, useState } from "react"
import { ItemContext } from "../../Hooks/ItemsContext"

import style from "./Stock.module.css"
import { useLocation } from "react-router-dom"
import getDate from "../../Hooks/getCreationDate";

export default function AddItemScreen({ editMode }) {
  const location = useLocation();
  const {
    itemState, setItemState,
    stock, setStock,
    getId, itemId,
    indentifyer, setIndentifyer,
    idiom

  } = useContext(ItemContext)
  
  const [saveBtn, setSaveBtn] = useState(idiom ? "Salvar" : "Save");

  const handleChange = (el) => {
    setSaveBtn( idiom ? "Salvar" : "Save" )
    setItemState({
      ...itemState,
      [el.name]: el.value
    })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    setSaveBtn(idiom ? "Salvo" : "Saved")
    if (editMode) {
      const editItem = stock.find((item) => item.id === indentifyer)
      editItem.name = itemState.name
      editItem.price = itemState.price
      editItem.description = itemState.description
      editItem.category = itemState.category
      editItem.quantity = itemState.quantity
      editItem.editDate = getDate()
      setIndentifyer("")
      setItemState({
        name: '',
        quantity: 0,
        description: '',
        category: "",
        price: 0,
        id: '',
      })
    } else {
      getId()
      const id = itemId
      const item = {
        ...itemState,
        id: id,
        creationDate: getDate(),
      }
      if (id !== '') {
        setStock([...stock, item])
      } else {
        handleSubmit(ev)
      }
      setItemState({
        name: '',
        quantity: 0,
        description: '',
        category: "",
        price: 0,
        id: '',
      })
    }
  }

  useEffect(() => {
    if (!editMode) {
      setItemState({
        name: '',
        quantity: 0,
        description: '',
        category: "",
        price: 0,
        id: '',
      })
    }
    setSaveBtn(idiom ? "Salvar" : "Save")
    localStorage.setItem("stock", JSON.stringify(stock))
  }, [stock, location]);

  document.addEventListener("keydown", (key) => key === "Enter", handleSubmit)

  return (
    <div id={style.addItemScreen}>
      <form onSubmit={(ev) => handleSubmit(ev)}>
        <div id={style.upValues}>
          <div>
            <label htmlFor="itemName">{idiom ? "Nome" : "Name"}: </label><br />
            <input type="text" id="itemName" name="name" required
              value={itemState.name}
              onChange={(el) => handleChange(el.target)}
            />
          </div>
          <div>
            <label htmlFor="itemQnt">{idiom ? "Quantidade" : "Quantity"}: </label><br />
            <input type="number" id="itemQnt" min={0} name="quantity"
              value={itemState.quantity}
              onChange={(el) => handleChange(el.target)}
            />
          </div>
          <div>
            <label htmlFor="itemPrice">{idiom ? "Preço" : "Price"}: </label><br />
            <input type="number" id="itemPrice" min={0} name="price"
              value={itemState.price}
              onChange={(el) => handleChange(el.target)}
            />
          </div>
          <div>
            <label htmlFor="itemCategory">{idiom ? "Categoria" : "Category"}: </label><br />
            <select id="itemCategory" name="category" required
              value={itemState.category}
              onChange={(el) => handleChange(el.target)}
            >
              <option value="" >{idiom ? "Selecione uma categoria" : "Select a category"}</option>
              <option value={idiom ? "Jogos" : "Games"}>
                {idiom ? "Jogo" : "Game"}
              </option>
              <option value={idiom ? "Livros" : "Books"}>
                {idiom ? "Livro" : "Book"}
              </option>
              <option value={idiom ? "Eletrônicos" : "Eletronics"}>
                {idiom ? "Eletrônico" : "Eletronic"}
              </option>
              <option value="Perfumes">Perfume</option>
              <option value={idiom ? "Domésticos" : "Domestics"}>
                {idiom ? "Doméstico" : "Domestic"}
              </option>
            </select>
          </div>
        </div>
        <div id={style.downValues}>
          <label htmlFor="itemDesc">{idiom ? "Descrição" : "Description"}: </label>
          <textarea id="itemDesc" cols="30" rows="10" name="description"
            value={itemState.description}
            onChange={(el) => handleChange(el.target)}
          ></textarea>
        </div>
        <button className={style.blueBtn}>{saveBtn}</button>
      </form>
    </div>
  )
}