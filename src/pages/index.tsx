import Head from "next/head";
import packageJson from "../../package.json";
import { Inter } from "next/font/google";
import liff, { Liff } from "@line/liff";

import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type ChildComponentProps = {
  liff: Liff;
  liffError: string;
};

export default function Home({ liff }: ChildComponentProps) {
  /** You can access to liff and liffError object through the props.
   *  const { liff, liffError } = props;
   *  console.log(liff.getVersion());
   *
   *  Learn more about LIFF API documentation (https://developers.line.biz/en/reference/liff)
   **/
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  useEffect(() => {
    if (liff && liff.isLoggedIn()) {
      const idToken = liff.getDecodedIDToken();
      setUserName(`こんにちは！${idToken?.name}さん！`);
      setUserImg(idToken?.picture || "");
    } else {
      setUserName("ログインしてください");
    }
  }, []);

  const login = () => {
    liff.login();
    console.log("idToken:", liff.getDecodedIDToken());
    if (liff && liff.isLoggedIn()) {
      const idToken = liff.getDecodedIDToken();
      setUserName(`こんにちは！${idToken?.name}さん！`);
      setUserImg(idToken?.picture || "");
    } else {
      setUserName("ログインしてください");
    }
  };
  const logout = () => {
    liff.logout();
  };

  const shareTargetPicler = () => {
    if (liff.isLoggedIn()) {
      liff.shareTargetPicker([
        {
          type: "text",
          text: "Hello, World!",
        },
      ]);
    } else {
      alert("shareTargetPickerの利用にはログインが必要です。");
    }
  };
  const liffScan = () => {
    if (liff.isLoggedIn()) {
      liff
        .scanCodeV2()
        .then((result) => {
          alert(result.value);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      alert("scanCodeV2の利用にはログインが必要です。");
    }
  };

  const serviceMessage = () => {
    alert("現在Service Messageの利用には審査承認が必要です。");
  };
  const customAction = () => {
    if (liff.isLoggedIn()) {
      liff.shareTargetPicker([
        {
          type: "text",
          text: "Hello, World!",
        },
      ]);
    } else {
      alert("Custom Actionの利用にはログインが必要です。");
    }
  };
  return (
    <div>
      <Head>
        <title>LIFF Starter</title>
      </Head>
      <div className="home">
        <h1 className="home__title">
          Welcome to <br />
          <a
            className="home__title__link"
            href="https://developers.line.biz/en/docs/liff/overview/"
          >
            LIFF Starter!
          </a>
        </h1>
        <div className="home__badges">
          <span className="home__badges__badge badge--primary">
            LIFF Starter
          </span>
          <span className="home__badges__badge badge--secondary">nextjs</span>
          <span className="home__badges__badge badge--primary">
            {packageJson.version}
          </span>
          <a
            href="https://github.com/line/line-liff-v2-starter"
            target="_blank"
            rel="noreferrer"
            className="home__badges__badge badge--secondary"
          >
            GitHub
          </a>
        </div>
        <div className="home__buttons">
          <a
            href="https://developers.line.biz/en/docs/liff/developing-liff-apps/"
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--primary"
          >
            LIFF Documentation
          </a>
          <a
            href="https://liff-playground.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--tertiary"
          >
            LIFF Playground
          </a>
          <a
            href="https://developers.line.biz/console/"
            target="_blank"
            rel="noreferrer"
            className="home__buttons__button button--secondary"
          >
            LINE Developers Console
          </a>
          <hr className="w-full" />
          <div>
            <img id="profile_img" width="100px" src={userImg} />
            <h2 id="profile_string" />
          </div>
          {userName}
          <hr className="w-full" />
          <a
            id="login"
            className="home__buttons__button button--primary"
            onClick={() => {
              login();
            }}
          >
            Login with LINE
          </a>
          <a
            id="logout"
            className="home__buttons__button button--tertiary"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </a>
          <a
            id="stp"
            className="home__buttons__button button--secondary"
            onClick={() => {
              shareTargetPicler();
            }}
          >
            Share Target Picker
          </a>
          <a
            id="scan"
            className="home__buttons__button button--secondary"
            onClick={() => {
              liffScan();
            }}
          >
            Scan Code
          </a>
          <a
            id="service_message"
            className="home__buttons__button button--secondary"
            onClick={() => {
              serviceMessage();
            }}
          >
            Service Message
          </a>
          <a
            id="custom_action"
            className="home__buttons__button button--secondary"
            onClick={() => {
              customAction();
            }}
          >
            Custom Action
          </a>
        </div>
      </div>
    </div>
  );
}
