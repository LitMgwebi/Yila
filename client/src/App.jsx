import Home from "./pages/Home/Home";

import BackgroundIndex from "./pages/Background/BackgroundIndex";
import FineArtIndex from "./pages/FineArt/FineArtIndex";

import ConceptRecord from "./pages/Concept/ConceptRecord";
import ConceptAdd from "./pages/Concept/ConceptAdd";
import ConceptIndex from "./pages/Concept/ConceptIndex";

import CharacterDesignIndex from "./pages/CharacterDesign/CharacterDesignIndex";
import CharacterDesignAdd from "./pages/CharacterDesign/CharacterDesignAdd";
import CharacterDesignRecord from "./pages/CharacterDesign/CharacterDesignRecord";

import AnimationIndex from "./pages/Animation/AnimationIndex";
import AnimationAdd from "./pages/Animation/AnimationAdd";
import AnimationRecord from "./pages/Animation/AnimationRecord";

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

          <Route path="/character-design" element={<CharacterDesignIndex/>}/>
          <Route path="/character-design/add" element={<CharacterDesignAdd/>}/> 
          <Route path="/character-design/:id" element={<CharacterDesignRecord/>}/>

          <Route path="/animation" element={<AnimationIndex/>}/>
          <Route path="/animation/add" element={<AnimationAdd/>}/>
          <Route path="/animation/:id" element={<AnimationRecord/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
