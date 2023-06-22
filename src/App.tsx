import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
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
          <Route path={ROUTES.HOME} element={<Home />}></Route>
          <Route element={<AdminProtectedRoute redirectPath={ROUTES.BOOKS} />}>
            <Route path={ROUTES.BOOKS_EDIT} element={<BookForm />} />
          </Route>
          <Route
            element={<AdminProtectedRoute redirectPath={ROUTES.AUTHORS} />}
          >
            <Route path={ROUTES.AUTHORS_EDIT} element={<AuthorForm />} />
          </Route>
          <Route element={<AdminProtectedRoute />}>
            <Route path={ROUTES.ORDERS} element={<Orders />}></Route>
            <Route path={ROUTES.PAYMENTS} element={<Payments />}></Route>
            <Route path={ROUTES.USERS} element={<Users />}></Route>
          </Route>
          <Route path={ROUTES.LOGIN} element={<LoginForm />}></Route>
          <Route path={ROUTES.SIGNUP} element={<RegisterForm />} />
          <Route element={<LoginProtectedRoute />}>
            <Route path={ROUTES.BOOKS} element={<Books />}></Route>
            <Route path={ROUTES.AUTHORS} element={<Authors />}></Route>
            <Route path={ROUTES.LOGOUT} element={<Logout />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
