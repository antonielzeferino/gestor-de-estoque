import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./RootLayout"
import Dashboard from "./Screens/Dashboard/Dashboard"
import Stock from "./Screens/Stock/Stock"
import ItemList from "./Components/StockScreen/ItemList"
import AddItemScreen from "./Components/StockScreen/AddItemScreen"

const router = createBrowserRouter([{
  path: "/",
  element: <RootLayout />,
  children: [
    {
      path: "home",
      element: <Dashboard />,
      index: true,
    },
    {
      path: "stock",
      element: <Stock />,
      children:[
        {
          path: "items",
          element: <ItemList/>,
          index: true,
        }, { 
          path: "add",
          element: <AddItemScreen editMode={false}/>
        }, {
          path: "edit",
          element: <AddItemScreen editMode={true}/>
        }
      ]
    }
  ]
}])

export default router