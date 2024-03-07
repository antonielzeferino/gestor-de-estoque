import { useContext } from "react"
import { ItemContext } from "../../Hooks/ItemsContext"

export default function Footer () {
  const { idiom , setIdiom } = useContext(ItemContext)

  return(
  <footer>
    <p>{idiom ? "Feito com React e React Router" : "Made with React and React Router"}</p>
    <button onClick={() => { idiom ? setIdiom(false) : setIdiom(true)}}>
      {idiom ? 'Translate to english ' : 'Traduzir para português'}
    </button>
  </footer>
  )
}