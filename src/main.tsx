import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter} from "react-router";
import {AuthProvider} from "@/contexts/AuthProvider.tsx";
import { SpeedInsights } from "@vercel/speed-insights/next"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
                <SpeedInsights/>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);