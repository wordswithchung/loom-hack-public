import { oembed } from "@loomhq/loom-embed";
import { FC, useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Video } from "@prisma/client";
import { PageWrapper } from "../../../components/PageWrapper/PageWrapper";
import styles from "./TeamId.module.css";
import Link from "next/link";
import UserContext from "../../../context/UserContext";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  const res = await fetch(
    `http://localhost:3000/api/video?teamId=${params?.teamId}`
  );
  const videos = await res.json();
  const shareUrls = videos.map((video: Video) => {
    return video.shareUrl;
  });
  return {
    props: { videos: shareUrls.reverse() },
  };
};

interface TeamPageProps {
  videos: string[];
}

const TeamPage: FC<TeamPageProps> = ({ videos }) => {
  const { team } = useContext(UserContext);
  const [videoHTMLs, setVideoHTML] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  useEffect(() => {
    async function getLooms() {
      const allVideoHtml = [];
      for (const video of videos) {
        const { html } = await oembed(video, { width: 1000 });
        allVideoHtml.push(html);
      }
      setVideoHTML(allVideoHtml);
    }

    getLooms();
  }, [videos]);

  const handleNavClick = (isPrev: boolean) => {
    if (
      (isPrev && currentIdx === 0) ||
      (!isPrev && currentIdx === videoHTMLs.length - 1)
    ) {
      return;
    }
    if (isPrev) {
      setCurrentIdx(currentIdx - 1);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  };

  return (
    <PageWrapper>
      <section className={styles.pageContent}>
        <h1>Watch videos from your team</h1>
        <div className={styles.nav}>
          <span
            className={styles.activeNav}
            role="button"
            onClick={() => handleNavClick(true)}
          >
            {currentIdx > 0 ? `<< Previous video` : ""}
          </span>{" "}
          <span
            className={styles.activeNav}
            role="button"
            onClick={() => handleNavClick(false)}
          >
            {currentIdx < videoHTMLs.length - 1 ? `Next video >>` : ""}
          </span>
        </div>
        {!!videos.length ? (
          <div
            dangerouslySetInnerHTML={{ __html: videoHTMLs[currentIdx] }}
          ></div>
        ) : (
          <div>
            Looks like there are no videos at this time; care to{" "}
            <Link href={`/team/${team?.id}/record`}>record one</Link>?
          </div>
        )}
      </section>
    </PageWrapper>
  );
};

export default TeamPage;
