import Head from "next/head";
import ProjectGrid from "@/components/grid/ProjectGrid";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Marcus · Portfolio</title>
        <meta name="description" content="Marcus — Software engineer portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProjectGrid />
    </>
  );
}
