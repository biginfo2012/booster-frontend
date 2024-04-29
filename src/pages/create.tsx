import type { NextPage } from "next";
import Head from "next/head";
import { CreateView } from "../views";

const Create: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Booster Solana</title>
        <meta name="description" content="Create solana fungible token" />
      </Head>
      <CreateView />
    </div>
  );
};

export default Create;
