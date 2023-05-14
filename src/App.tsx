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
import { UserProvider } from "./context/userContext";
import Logout from "./components/logout";
import AdminProtectedRoute from "./components/adminProtectedRoute";
import LoginProtectedRoute from "./components/loginProtectedRoute";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route element={<AdminProtectedRoute />}>
            <Route path="/books/:id" element={<BookForm />} />
            <Route path="/authors/:id" element={<AuthorForm />} />
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/payments" element={<Payments />}></Route>
            <Route path="/users" element={<Users />}></Route>
          </Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/signup" element={<RegisterForm />} />
          <Route element={<LoginProtectedRoute />}>
            <Route path="/books" element={<Books />}></Route>
            <Route path="/authors" element={<Authors />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
