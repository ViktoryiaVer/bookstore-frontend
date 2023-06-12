import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Books from "./components/Books";
import Authors from "./components/Authors";
import Orders from "./components/Orders";
import Payments from "./components/Payments";
import Users from "./components/Users";
import NotFound from "./components/NotFound";
import AuthorForm from "./components/AuthorForm";
import BookForm from "./components/BookForm";
import LoginForm from "./components/LoginForm";
import { UserProvider } from "./context/userContext";
import Logout from "./components/Logout";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import LoginProtectedRoute from "./components/LoginProtectedRoute";
import RegisterForm from "./components/RegisterForm";

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
