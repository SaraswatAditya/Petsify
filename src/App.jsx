import "./App.css";
import PetDetails from "./Components/PetDetails";
import PetList from "./Components/PetList";
import SearchForm from "./Components/SearchForm";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/pets" element={<PetList />} />
        <Route path="/search" element={<SearchForm />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
