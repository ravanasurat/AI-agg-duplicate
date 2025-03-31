// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
// import Header from "./components/Header";
// import Home from "./pages/Home";
// import ToolPage from "./components/ToolPage";
// import SubmitAdvertise from "./components/submit_advertise";
// import Ranking from "./components/Ranking";
// import SocialListen from "./components/SocialListening";
// import AllModels from "./components/Allmodels"; 
// import TooForm from "./components/features/TooForm"; 
// import Domyself from "./components/features/DoMyself";
// import ToolDetailPage from "./components/ToolDetail";
// import CategoryPage from "./components/CategoryPage";
// import FavoritesPage from "./components/FavoritesPage";
// import { FavoritesProvider } from "./components/FavoritesContext"; 
// import MostSaved from "./components/MostSaved";
// import RecentlyAdded from "./components/RecentlyAdded";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";

// function App() {
//   return (
//     <FavoritesProvider> 
//       <Router>
//         <Header />
//         <div className="pt-20">
//           <Routes> 
//             <Route path="/" element={<Home />} />
//             <Route path="/tool/:id" element={<ToolPage />} />
//             <Route path="/submit_advertise" element={<SubmitAdvertise />} />
//             <Route path="/Ranking" element={<Ranking />} /> 
//             <Route path="/SocialListening" element={<SocialListen />} />
//             <Route path="/Allmodels" element={<AllModels />} /> 
//             <Route path="/TooForm" element={<TooForm />} /> 
//             <Route path="/DoMyself" element={<Domyself />} />
//             <Route path="/tools/:id" element={<ToolDetailPage />} />
//             <Route path="/CategoryPage" element={<CategoryPage />} />
//             <Route path="/FavoritesPage" element={<FavoritesPage />} />
//             <Route path="/MostSaved" element={<MostSaved />} />
//             <Route path="/RecentlyAdded" element={<RecentlyAdded />} />
//             <Route path="/SignUp" element={<SignUp />} />
//             <Route path="/Login" element={<Login/>} />
//           </Routes>
//         </div>
//       </Router>
//     </FavoritesProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Header from "./components/Header";
import { NavigationProvider } from "./components/NavigationContext"; 
import Home from "./pages/Home";
import ToolPage from "./components/ToolPage";
import SubmitAdvertise from "./components/submit_advertise";
import Ranking from "./components/Ranking";
import SocialListen from "./components/SocialListening";
import AllModels from "./components/Allmodels"; 
import TooForm from "./components/features/TooForm"; 
import Domyself from "./components/features/DoMyself";
import ToolDetailPage from "./components/ToolDetail";
import CategoryPage from "./components/CategoryPage";
import FavoritesPage from "./components/FavoritesPage";
import { FavoritesProvider } from "./components/FavoritesContext"; 
import MostSaved from "./components/MostSaved";
import RecentlyAdded from "./components/RecentlyAdded";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AIApps from "./components/AIApps";

function App() {
  return (
    <FavoritesProvider>
      <NavigationProvider>
        <Router>
          <Header />
          <div className="pt-20">
            <Routes> 
              <Route path="/" element={<Home />} />
              <Route path="/tool/:id" element={<ToolPage />} />
              <Route path="/submit_advertise" element={<SubmitAdvertise />} />
              <Route path="/Ranking" element={<Ranking />} /> 
              <Route path="/Rankings" element={<Ranking />} />
              <Route path="/SocialListening" element={<SocialListen />} />
              <Route path="/Allmodels" element={<AllModels />} /> 
              <Route path="/TooForm" element={<TooForm />} /> 
              <Route path="/DoMyself" element={<Domyself />} />
              <Route path="/tools/:id" element={<ToolDetailPage />} />
              <Route path="/CategoryPage" element={<CategoryPage />} />
              <Route path="/FavoritesPage" element={<FavoritesPage />} />
              <Route path="/MostSaved" element={<MostSaved />} />
              <Route path="/RecentlyAdded" element={<RecentlyAdded />} />
              <Route path="/most-used-ais" element={<RecentlyAdded />} />
              <Route path="/ai-apps" element={<AIApps />} />
              <Route path="/discord-of-ai" element={<RecentlyAdded />} />
              <Route path="/ai-chrome-extensions" element={<RecentlyAdded />} />
              <Route path="/gpts" element={<RecentlyAdded />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Login" element={<Login/>} />
            </Routes>
          </div>
        </Router>
      </NavigationProvider>
    </FavoritesProvider>
  );
}

export default App;