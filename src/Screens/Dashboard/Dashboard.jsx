import { useContext } from "react"
import style from "./style.module.css"
import { ItemContext } from "../../Hooks/ItemsContext"

export default function Dashboard() {
  const {itemState} = useContext(ItemContext)
  return (
    <div id={style.Dashboard}>
      <h3>Dashboard</h3>
      <p>nome do item: {itemState.name}</p>
    </div>
  ) 
}