import { BrowserRouter, Routes, Route } from "react-router-dom"

// components
import { AppContainer } from "./components"

// screens
import HomeScreen from "./screens/HomeScreen"

// styles
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <AppContainer> 
          <Routes>
            <Route path="/" element={<><HomeScreen /> </> } exact></Route>
          </Routes>
        </AppContainer>
    </BrowserRouter>
  );
}

export default App;
