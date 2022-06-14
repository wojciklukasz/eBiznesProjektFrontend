import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Layout} from "./components/Layout";
import {MainPage} from "./components/MainPage";
import {LoginSuccessful} from "./components/LoginSuccessful";
import {LoginContextProvider} from "./contexts/LoginContext";
import {LoginPage} from "./components/LoginPage";
import {LogoutPage} from "./components/LogoutPage";
import {ShopContextProvider} from "./contexts/ShopContext";
import {Products} from "./components/Products";
import {Basket} from "./components/Basket";

function App() {
  return (
      <LoginContextProvider>
          <ShopContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Layout/>}>
                      <Route index element={<MainPage/>}/>
                      <Route path='login' element={<LoginPage/>}/>
                      <Route path='logout' element={<LogoutPage/>}/>
                      <Route path='products' element={<Products/>}/>
                      <Route path='basket' element={<Basket/>}/>
                      <Route path='login/google/:token&:email' element={<LoginSuccessful/>}/>
                      <Route path='login/github/:token&:email' element={<LoginSuccessful/>}/>
                  </Route>
                </Routes>
              </BrowserRouter>
          </ShopContextProvider>
      </LoginContextProvider>
  )
}

export default App;
