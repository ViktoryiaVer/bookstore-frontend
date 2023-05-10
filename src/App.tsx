import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import Home from "./components/home";
import Books from "./components/books";
import Authors from "./components/authors";
import Orders from "./components/orders";
import Payments from "./components/payments";
import Users from "./components/users";
import NotFound from "./components/notFound";
import AuthorForm from "./components/authorForm";
import BookForm from "./components/bookForm";
import LoginForm from "./components/loginForm";
import { getCurrentUser } from "./services/authenticationService";

function App() {
  console.log(getCurrentUser());
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/books/:id" element={<BookForm />} />
        <Route path="/authors" element={<Authors />}></Route>
        <Route path="/authors/:id" element={<AuthorForm />} />
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/payments" element={<Payments />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
