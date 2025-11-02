import { Routes, Route } from "react-router"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import { useEffect } from "react";
import useAuthStore from "./store/authstore"

const App = () => {

const initializeAuth = useAuthStore((state) => state.initializeAuth);

useEffect(()=>{
initializeAuth()
},[initializeAuth])

    return (
        <div>
            <Routes>
                <Route path="/Register"  element={ <Register />}/>
                <Route path="/Login"  element={<Login/> } />

            </Routes>

        </div>
    )
}

export default App