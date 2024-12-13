import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./App.css"
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Create from "./components/Create";
import BlogDetail from "./components/BlogDetail";
import NotFound from "./components/NotFound";

export default function App() {
  

  return (
    <Router>
      <div className='App'>
      <Navbar />
     <div className="content">
<Routes>
  <Route path="/"  element={<Home />}>
  </Route>
  <Route path="/create"  element={<Create />}>
  </Route>
  <Route path="/blog/:id"  element={<BlogDetail />}>
  </Route>
  <Route path="*"  element={<NotFound />}>
  </Route>
</Routes>
     </div>
       </div>
       </Router>
  )
}

