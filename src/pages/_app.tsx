import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="h-screen flex flex-col justify-between">
        <div>
          <Navbar />

          <div className="md:px-20">
            <Component {...pageProps} />
          </div>
          <Toaster />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}
