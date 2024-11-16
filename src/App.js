import "./App.css";
import News from "./components/new";
import Header from "./components/header";
import Footer from "./components/footer";
import About from "./components/about";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Contact from "./components/contact";
import Error from "./components/Error";
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <News />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "category/:category",
        element: <News />,
      },
    ],
    errorElement: <Error />,
  },
]);
export default App;
