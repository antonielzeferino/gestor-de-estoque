import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./RootLayout"
import Dashboard from "./Screens/Dashboard/Dashboard"
import Stock from "./Screens/Stock/Stock"
import ItemList from "./Components/StockScreen/ItemList"
import AddItemScreen from "./Components/StockScreen/AddItemScreen"
import ShowItem from "./Components/StockScreen/showItem"

const router = createBrowserRouter([{
  path: "/",
  element: <RootLayout />,
  children: [
    {
      path: "",
      element: <Dashboard />,
      index: true,
    },
    {
      path: "stock",
      element: <Stock />,
      children: [
        {
          path: "items",
          element: <ItemList />,
          index: true,
        }, {
          path: "items/:itemId",
          element: <ShowItem/>
        }, {
          path: "add",
          element: <AddItemScreen editMode={false} />
        }, {
          path: "edit",
          element: <AddItemScreen editMode={true} />
        }
      ]
    }
  ]
}])

export default router

/* 
path: "products/:productId",
element: <Product />,
loader: loadProduct,
*/