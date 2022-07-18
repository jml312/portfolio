import { useState } from "react";
import { m, useAnimation } from "framer-motion";

function J() {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();
  const enterAnimation = async () => {
    if (!isAnimating) {
      setIsAnimating(true);
      controls.set({
        pathLength: 0,
        fillOpacity: 0
      });
      await controls.start({
        pathLength: 1,
        transition: {
          duration: 1.25,
          delay: 0.1,
          ease: "easeInOut",
          type: "tween"
        }
      });
      await controls.start({
        fillOpacity: 1,
        transition: {
          duration: 0.75,
          ease: "easeInOut",
          type: "tween"
        }
      });
      setIsAnimating(false);
    }
  };

  const manualAnimation = async () => {
    if (!isAnimating) {
      setIsAnimating(true);
      controls.set({
        pathLength: 0,
        fillOpacity: 0
      });
      await controls.start({
        pathLength: 1,
        transition: {
          duration: 1.25,
          delay: 0.1,
          ease: "easeInOut",
          type: "tween"
        }
      });
      await controls.start({
        fillOpacity: 1,
        transition: {
          duration: 0.75,
          ease: "easeInOut",
          type: "tween"
        }
      });
      setIsAnimating(false);
    }
  };

  return (
    <m.svg
      onViewportEnter={enterAnimation}
      onHoverStart={manualAnimation}
      onTap={manualAnimation}
      viewport={{ once: true }}
      xmlns="http://www.w3.org/2000/svg"
      width={"55"}
      height={"80"}
      viewBox="0 0 40 65"
      preserveAspectRatio="xMidYMax meet"
    >
      <m.path
        d="M32.5192 1H32.0192V1.5V44.9939C32.0192 48.127 31.6832 50.7291 31.0254 52.813H31.0253L31.0219 52.8245C30.4188 54.9087 29.4953 56.5531 28.267 57.7818L28.2669 57.7817L28.2593 57.7898C27.0806 59.0224 25.6035 59.9123 23.8142 60.4546L23.8101 60.4559C22.0618 61.0025 19.9954 61.281 17.6029 61.281C12.9392 61.281 9.49969 60.0881 7.19497 57.7838C4.89103 55.424 3.69504 51.8422 3.69504 46.9439V43.2982V42.7982H3.19504H1.5H1V43.2982V46.9439C1 49.3575 1.28725 51.6074 1.86575 53.6908L1.86799 53.6989L1.87051 53.7069C2.51184 55.7482 3.50587 57.5349 4.85453 59.06C6.21135 60.5944 7.9453 61.7671 10.0426 62.5839C12.1521 63.4621 14.6772 63.8919 17.6029 63.8919C20.6935 63.8919 23.3299 63.4634 25.4957 62.5865C27.7083 61.7698 29.5047 60.5666 30.8659 58.9682C32.2158 57.3829 33.1802 55.5086 33.7631 53.3544C34.3992 51.2115 34.7143 48.8472 34.7143 46.2656V1.5V1H34.2143H32.5192Z"
        className={"fill-light dark:fill-dark stroke-light dark:stroke-dark"}
        animate={controls}
        initial={{ pathLength: 0, fillOpacity: 0 }}
        strokeWidth="0.75"
      />
      <m.path
        d="M19 1H19.5V1.5V48.5V49H19H17H16.5V48.5V1.5V1H17H19Z"
        className={"fill-light dark:fill-dark stroke-light dark:stroke-dark"}
        animate={controls}
        initial={{ pathLength: 0, fillOpacity: 0 }}
        strokeWidth="0.75"
      />
    </m.svg>
  );
}

export default J;
