import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./RootLayout"
import Dashboard from "./Screens/Dashboard/Dashboard"
import Stock from "./Screens/Stock/Stock"
import ItemList from "./Components/StockScreen/ItemList"
import ItemScreen from "./Components/StockScreen/ItemScreen"

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
          element: <ItemScreen edit={true}/>
        }
      ]
    }
  ]
}])

export default router