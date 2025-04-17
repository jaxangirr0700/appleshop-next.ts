import { store } from "@/store/store";
import { Html, Head, Main, NextScript } from "next/document";
import { Provider } from "react-redux";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Provider store={store}>
          <div className="container m-auto">
            <Main />
            <NextScript />
          </div>
        </Provider>
      </body>
    </Html>
  );
}
