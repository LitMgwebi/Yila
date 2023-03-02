import Home from "./pages/Home/Home";

import BackgroundIndex from "./pages/Background/BackgroundIndex";
import FineArtIndex from "./pages/FineArt/FineArtIndex";

import ConceptRecord from "./pages/Concept/ConceptRecord";
import ConceptAdd from "./pages/Concept/ConceptAdd";
import ConceptIndex from "./pages/Concept/ConceptIndex";

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

          <Route path="/concept" element={<ConceptIndex/>}/>
          <Route path="/concept/:id" element={<ConceptRecord />}/>  
          <Route path="/concept/add" element={<ConceptAdd/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
