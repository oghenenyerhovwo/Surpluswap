import { Routes, Route } from "react-router-dom"

// screens
import HeaderRoutes from "../../screens/HeaderRoutes"
import Dashboard from "../../screens/Dashboard"

// components
import AppContainer from "../AppContainer"

const RoutesContainer = () => {
    return (
        <AppContainer> 
            <>
                <Routes>
                    <Route path="/dashboard/*" element={<Dashboard />} exact></Route>
                    <Route path="*" element={<HeaderRoutes />} exact></Route>
                </Routes>
            </>
        </AppContainer>
    )
}

export default RoutesContainer