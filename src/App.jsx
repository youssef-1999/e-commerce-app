import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Regsiter/Register";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import PageNotFound from "./Components/Error/PageNotFound";
import CounterContextProvider from "./Context/CounterContext";
import AuthContextProvider from "./Context/AuthContext";
import Home from "./Components/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartContextProvider from "./Context/CartContext";
import WishListProvider from "./Context/WishListContext";
import WishList from "./Components/WishList/WishList";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import PopUpBrands from "./Components/Brands/PopUpBrands";
import Address from "./Components/Address/Address";
import Orders from "./Components/Orders/Orders";
import SubCategoryDetaiils from "./Components/Categories/SubCategoryDetaiils";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";

function App() {
  let queryClient=new QueryClient()
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "address/:cartId",
          element: (
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          ),
        },
        {
          path: "PopupBrands/:brandId",
          element: (
            <ProtectedRoute>
              <PopUpBrands />
            </ProtectedRoute>
          ),
        },
        
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id/:categoryId",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "subCategoryDetails/:subId",
          element: (
            <ProtectedRoute>
              <SubCategoryDetaiils />
            </ProtectedRoute>
          ),
        },
      
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: (
            <ProtectedRoute>
              <PageNotFound />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>

        <AuthContextProvider>
          <CounterContextProvider>
            <CartContextProvider>
            <WishListProvider>

            <RouterProvider router={router}></RouterProvider>
            <ToastContainer />
            </WishListProvider>
            </CartContextProvider>
          </CounterContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools position="bottom-right"/>
    </QueryClientProvider>
    </Provider>
    </>
  );
}

export default App;
