import Head from "next/head";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with R3F
const ProjectGrid = dynamic(() => import("@/components/grid/ProjectGrid"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Marcus · Portfolio</title>
        <meta name="description" content="Software engineer portfolio — exploring projects through an interactive 3D grid" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProjectGrid />
    </>
  );
}
