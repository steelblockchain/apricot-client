import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import WebClientProvider from "./providers/WebClientProvider.tsx";
import AppStateProvider from "./providers/AppStateProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <WebClientProvider
        ip={import.meta.env.VITE_WEBSOCKET_IP ?? "ws://localhost:5050/ws-api"}
    >
        <AppStateProvider>
            <App />
        </AppStateProvider>
    </WebClientProvider>
);
