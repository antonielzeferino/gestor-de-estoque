import { createContext, useEffect, useState } from "react";

const ItemContext = createContext();

const ItemContextProvider = ({ children }) => {
  const stockItems = localStorage.getItem('stock')
  const [stock, setStock] = useState(stockItems ? JSON.parse(stockItems) : [])
  const [itemId, setItemId] = useState("")
  const [indentifyer, setIndentifyer] = useState("")
  const [idiom, setIdiom] = useState(false)

  const [itemState, setItemState] = useState({
    name: '',
    quantity: 0,
    description: '',
    category: '',
    price: 0,
    id: '',
  })

  const generateId = (idSize) => {
    const characters = "1234567890qwertyuiopasdfghjklçzxcvbnm"
    let newId = ""
    for (let i = 0; i < idSize; i++) {
      const position = Math.floor(Math.random() * characters.length)
      newId += characters[position]
    }
    return newId
  }
  const getId = () => {
    setItemId(`${generateId(8)}-${generateId(4)}-${generateId(12)}`)
  }

  return (
    <ItemContext.Provider value={{
      itemState, setItemState,
      stock, setStock,
      getId, itemId,
      stockItems,
      indentifyer, setIndentifyer,
      idiom, setIdiom
    }}>
      {children}
    </ItemContext.Provider>
  )
}

export { ItemContext, ItemContextProvider }