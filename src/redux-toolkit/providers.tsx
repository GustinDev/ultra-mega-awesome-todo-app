"use client";
//Redux Provider
import { store } from "../app/store";
import { Provider } from "react-redux";
//Theme Provider
import { ThemeProvider } from "next-themes";
//Persist
import { PersistGate } from "redux-persist/integration/react"; //  Persist
import { persistor } from "../app/store";

interface Props {
  children: React.ReactNode;
}

// Define the Providers component that wraps the app with Redux Provider and PersistGate
export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider enableSystem={true} attribute="class">
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
