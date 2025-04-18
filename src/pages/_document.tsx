import { store } from "@/store/store";
import { Html, Head, Main, NextScript } from "next/document";
import { Provider } from "react-redux";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>AppleShop</title>
        <meta content="Raxmatullayev Jaxongir" name="description" />
        <link
          rel="icon"
          href="https://e7.pngegg.com/pngimages/912/682/png-clipart-apple-logo-brand-apple-company-trademark-thumbnail.png"
        />
      </Head>

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
