import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreateQuizPage from "./pages/CreateQuizPage.jsx";
import QuizLearnPage from "./pages/QuizLearnPage.jsx";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const HomePoint = () => {
  const token = getCookie('jwt'); // Get the jwt cookie
  return token ? <HomePage /> : <LoginPage />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
    element: <QuizPage />
  },
  {
    path: '/quiz/:id/learn',
    element: <QuizLearnPage />
  },
  {
    path: '/quiz/edit',
    element: <CreateQuizPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
