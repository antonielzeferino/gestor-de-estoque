import AddItemScreen from "./AddItemScreen"
import style from "./Stock.module.css"

export default function ItemScreen({edit}) {
  return (
    <div id={style.itemScreen}>
      <AddItemScreen editMode={edit}/>
    </div>
  )
}