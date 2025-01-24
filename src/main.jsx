// Importing Packages
import { React } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Configuring redux-store
import store from "./features/store";
import { Provider } from "react-redux";

// Importing componenets
import App from "./components/App";
import ErrorPage from "./components/ErrorPage";
import CreateTemplate from "./components/CreateTemplate";

// Importing styles
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
