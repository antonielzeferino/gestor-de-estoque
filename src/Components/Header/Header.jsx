import "./style.module.css"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header>
      <h1>REACT STOCK</h1>
      <nav>
        <Link style={{textDecoration: "none"}} to={""}>Início</Link>
        <Link style={{textDecoration: "none"}} to={"stock/items"}>Items</Link>
      </nav>
    </header>
  )
}