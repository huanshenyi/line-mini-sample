import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import liff from "@line/liff";

type Liff = typeof liff;

export default function App({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    console.log("start liff.init()...");
    liff
      .init({ liffId: process.env.LIFF_ID || "" })
      .then(() => {
        console.log("liff.init() done");
        setLiffObject(liff); // Update the type of liffObject to match the type of liff
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.liffId) {
          console.info(
            "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
          );
        }
        setLiffError(error.toString());
      });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}
