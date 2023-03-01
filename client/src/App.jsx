import Home from "./pages/Home/Home";

import BackgroundIndex from "./pages/Background/BackgroundIndex";
import FineArtIndex from "./pages/FineArt/FineArtIndex";

// import useLocalStorage from "use-local-storage";
import {
  BrowserRouter,
  Routes,
  Route,
  // Navigate
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/background" element={<BackgroundIndex/>}/>
          <Route path="/fineArt" element={<FineArtIndex />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
