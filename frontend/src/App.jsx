import { Routes, Route } from "react-router"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"

const App = () => {
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