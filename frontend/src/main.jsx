
import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import {Provider} from "mobx-react";
import investmentsStore from "@/stores/InvestmentsStore.jsx";

const stores = {
    investmentsStore
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
            <Provider {...stores}>
                <App />
            </Provider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
