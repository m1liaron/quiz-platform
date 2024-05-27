import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const HomePoint = () => {
  const token = localStorage.getItem("token");

  return token ? <HomePage/> : <LoginPage/>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePoint />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/quiz/:id',
    element: <QuizPage />,
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
