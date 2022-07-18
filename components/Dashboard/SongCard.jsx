import { m } from "framer-motion";
import { BsHeadphones } from "react-icons/bs";

function SongCard({
  artist,
  songUrl,
  title,
  index,
  filter,
  hasChangedSongs,
  prefersReducedMotion
}) {
  return (
    <m.a
      key={prefersReducedMotion ? index : title}
      initial={{
        opacity: 0,
        translateY: "50%"
      }}
      animate={
        hasChangedSongs && {
          opacity: 1,
          translateY: "0%",
          transition: {
            duration: 0.15,
            ease: "easeInOut"
          }
        }
      }
      exit={
        hasChangedSongs && {
          opacity: 0,
          translateY: "50%"
        }
      }
      whileInView={
        !hasChangedSongs && {
          opacity: 1,
          translateY: "0%",
          transition: {
            duration: 0.3
          }
        }
      }
      viewport={{ once: true }}
      whileHover={!prefersReducedMotion && { y: -2 }}
      href={songUrl}
      target="_blank"
      rel="noreferrer"
      className={
        "min-w-[21rem] w-[90%] md:w-full flex flex-row items-baseline pt-3 pl-3 rounded-md bg-light dark:bg-dark border border-gray-700 dark:border-gray-300 drop-shadow-lg"
      }
    >
      <p className="text-sm dark:text-[rgba(255,255,245,0.6)] text-[rgba(28,29,37,0.6)]">
        {index}
      </p>
      <div className="flex flex-col pl-3 w-full">
        <h1 className="text-dark truncate dark:text-light w-[90%] md:w-full text-[1rem] font-[600]">
          {filter.clean(title)}
        </h1>
        <p className="mb-4 opacity-60 truncate w-[90%] md:w-full text-sm">
          {artist}
        </p>
      </div>
      <BsHeadphones className={"absolute right-0 top-0 m-2.5"} />
    </m.a>
  );
}

export default SongCard;
