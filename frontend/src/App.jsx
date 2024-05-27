import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "./redux/userSlice.js";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import HomePage from "./pages/HomePage.jsx";

const HomePoint = () => {
  const user = useSelector(selectUser);

  return user ? <HomePage/> : <LoginPage/>;
}

const router = createBrowserRouter([
  {
    path:'/',
    element: <HomePoint/>,
    children: [
      {
        path:'login',
        element: <LoginPage/>
      },
      {
        path:'register',
        element: <RegisterPage/>
      },
      {
        path: 'quiz/:id',
        element: <QuizPage/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
