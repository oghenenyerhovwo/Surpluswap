import { Routes, Route } from "react-router-dom"

// screens
import HeaderRoutes from "../../screens/HeaderRoutes"
import Dashboard from "../../screens/Dashboard"
import AdminDashboard from "../../screens/AdminDashboard"


import PrivateRoute from "../PrivateRoute"

// components
import AppContainer from "../AppContainer"

const RoutesContainer = () => {
    return (
        <AppContainer> 
            <>
                <Routes>
                    <Route path="/dashboard/*" element={
                        <PrivateRoute.User>
                            <PrivateRoute.Client>
                                <Dashboard />
                            </PrivateRoute.Client>
                        </PrivateRoute.User>
                    } exact></Route>
                    <Route path="/admin/dashboard/*" element={
                        <PrivateRoute.User>
                            <PrivateRoute.Admin>
                                <AdminDashboard />
                            </PrivateRoute.Admin>
                        </PrivateRoute.User>
                    } exact></Route>
                    <Route path="*" element={<HeaderRoutes />} exact></Route>
                </Routes>
            </>
        </AppContainer>
    )
}

export default RoutesContainer