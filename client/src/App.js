import { BrowserRouter } from "react-router-dom"

// styles
import './App.css';

// components
import { RoutesContainer } from "./components"
// import { AppContainer } from "./components"

function App() {

  return (
    <BrowserRouter>
        {/* <AppContainer>  */}
        <RoutesContainer />
        {/* </AppContainer> */}
    </BrowserRouter>
  );
}

export default App;
