import { createContext } from "react";

export type WebClientContextType = WebSocket | undefined;
export type Sender = (data: Record<string, any>) => void;

export const WebClientContext = createContext<WebClientContextType>(undefined);
