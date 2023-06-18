import { Route, Routes } from "react-router-dom";
import NavBar from "./components/base/NavBar";
import Home from "./components/views/HomeView";
import Books from "./components/views/BooksView";
import Authors from "./components/views/AuthorsView";
import Orders from "./components/views/OrdersView";
import Payments from "./components/views/PaymentsView";
import Users from "./components/views/UsersView";
import NotFound from "./components/views/NotFoundView";
import AuthorForm from "./components/views/forms/AuthorForm";
import BookForm from "./components/views/forms/BookForm";
import LoginForm from "./components/views/forms/LoginForm";
import { UserProvider } from "./context/userContext";
import Logout from "./components/Logout";
import AdminProtectedRoute from "./components/routes/AdminProtectedRoute";
import LoginProtectedRoute from "./components/routes/LoginProtectedRoute";
import RegisterForm from "./components/views/forms/RegisterForm";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route element={<AdminProtectedRoute redirectPath="/books" />}>
            <Route path="/books/:id" element={<BookForm />} />
          </Route>
          <Route element={<AdminProtectedRoute redirectPath="/authors" />}>
            <Route path="/authors/:id" element={<AuthorForm />} />
          </Route>
          <Route element={<AdminProtectedRoute redirectPath="/authors" />}>
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
