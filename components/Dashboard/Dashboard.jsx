import MetricCard from "./MetricCard";
import SongCard from "./SongCard";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Filter from "bad-words";
import { BASE_URL } from "constants";

function Dashboard({
  dashboardRef,
  shortTermTracks,
  longTermTracks,
  languages,
  codingTime,
  project,
  totalViews,
  useTransition,
  prefersReducedMotion
}) {
  const [tracks, setTracks] = useState(shortTermTracks);
  const [isShortTerm, setIsShortTerm] = useState(true);
  const [hasChangedSongs, setHasChangedSongs] = useState(false);
  const filter = new Filter();
  const capitalize = (word) =>
    word[0].toUpperCase() + word.slice(1).toLowerCase();

  const metrics = [
    {
      header: "Hours Coding",
      metric: codingTime ? Math.round(codingTime / 3600) : "-",
      link: "https://wakatime.com/@jlev111",
      isDisabled: !codingTime
    },
    {
      header: `Top Language${languages?.length > 1 ? "s" : ""}`,
      metric: languages?.length
        ? languages.map(({ name }) => name).join(", ")
        : "-",
      link: "https://wakatime.com/@jlev111",
      isDisabled: !languages?.length
    },
    {
      header: "Current Project",
      metric: project?.name ? capitalize(project?.name) : "-",
      link: `https://github.com/jml312/${project?.name}`,
      isDisabled: !project?.name
    },
    {
      header: "All-Time Views",
      metric: totalViews ?? "-",
      link: `${BASE_URL}/blog`,
      isDisabled: totalViews === null
    }
  ];

  return (
    <section
      ref={dashboardRef}
      className={
        "flex flex-col items-center lg:items-start justify-center max-w-3xl mx-auto mb-16 pt-5"
      }
    >
      <m.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.3 }
        }}
        viewport={{ once: true }}
        className={"min-w-[21rem] w-[90%] md:w-full text-left"}
      >
        <h1 className="mb-0.5 text-4xl md:text-5xl font-[700] tracking-tight text-dark dark:text-light">
          Dashboard
        </h1>
        <p className="mb-2.5 dark:text-[rgba(255,255,245,0.75)] text-[rgba(28,29,37,0.75)] text-[1.1rem] md:text-[1.2rem]">
          This is my personal dashboard, which tracks my coding stats and views
          of my blog articles. Check back to see what I'm up to!
        </p>
      </m.div>

      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 place-items-center w-full sm:w-[90%] md:w-full gap-4 md:gap-6"
        }
      >
        {metrics.map(({ header, metric, link, isDisabled }) => (
          <MetricCard
            key={header}
            header={header}
            metric={metric}
            link={link}
            isDisabled={isDisabled}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
      <m.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.3 }
        }}
        viewport={{ once: true }}
        className={"min-w-[21rem] w-[90%] md:w-full text-left"}
      >
        <h2 className="mt-10 -mb-1 text-[1.75rem] md:text-[2rem] font-[700] tracking-tight text-black dark:text-white">
          Top Tracks
        </h2>
        <p className="gap-1 mb-1.5 dark:text-[rgba(255,255,245,0.75)] text-[rgba(28,29,37,0.75)] text-[1.1rem] md:text-[1.2rem]">
          My {isShortTerm ? "recent" : "all-time"} favorite Spotify jams
        </p>
        <div className={"flex justify-start items-center w-full mb-3.5"}>
          <button
            className={`rounded-l-md bg-dark dark:bg-light text-light dark:text-dark px-3 py-2 ${
              isShortTerm
                ? "opacity-[.55] cursor-auto hover:bg-dark dark:hover:bg-light transition-none pointer-events-none"
                : "cursor-pointer opacity-100 active:scale-95 dark:hover:bg-[rgba(255,255,245,0.8)] hover:bg-[rgba(28,29,37,0.8)]"
            } ${
              useTransition &&
              !isShortTerm &&
              "transition-all duration-[250ms] ease-in-out"
            }`}
            disabled={isShortTerm}
            onClick={() => {
              setHasChangedSongs(true);
              setIsShortTerm(true);
              setTracks(shortTermTracks);
            }}
          >
            Recent
          </button>
          <button
            className={`rounded-r-md bg-dark dark:bg-light text-light dark:text-dark px-3 py-2 ${
              !isShortTerm
                ? "opacity-[.55] cursor-auto hover:bg-dark dark:hover:bg-light transition-none pointer-events-none"
                : "cursor-pointer opacity-100 active:scale-95 dark:hover:bg-[rgba(255,255,245,0.8)] hover:bg-[rgba(28,29,37,0.8)]"
            } ${
              useTransition &&
              isShortTerm &&
              "transition-all duration-[250ms] ease-in-out"
            }`}
            disabled={!isShortTerm}
            onClick={() => {
              setHasChangedSongs(true);
              setIsShortTerm(false);
              setTracks(longTermTracks);
            }}
          >
            All-Time
          </button>
        </div>
      </m.div>
      <div className={"flex flex-col gap-4 justify-center items-center w-full"}>
        <AnimatePresence>
          {tracks.map(({ artist, songUrl, title }, i) => (
            <SongCard
              key={i + 1}
              artist={artist}
              songUrl={songUrl}
              title={title}
              index={i + 1}
              filter={filter}
              hasChangedSongs={hasChangedSongs}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Dashboard;
