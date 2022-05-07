import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import NotesPage from "./pages/NotesPage";
import Note from "./pages/Note";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
        <Header />
        <Route component={Note} path="/note/:id" />
        <Route component={NotesPage} path="/" exact />
        </div>
        
      </div>
    </Router>
  );
}

export default App;
