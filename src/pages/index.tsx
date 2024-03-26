import Head from "next/head";
import Image from "next/image";
import { Roboto } from "next/font/google";
import Display from "@/components/Display";

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin']
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Convite Digital | Buffet Zureta</title>
        <meta name="description" content="Editor visual do convite digital do Buffet Zureta" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={roboto.className}>
        <Display />
      </main>
    </>
  );
}
