import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head></Head>
        <body
          className={
            "text-dark bg-[url('/assets/light.png')] dark:bg-[url('/assets/dark.png')] dark:text-light bg-light dark:bg-dark overflow-x-hidden scroll-smooth"
          }
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
