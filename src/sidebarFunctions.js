import "animate.css";

const animateCSS = (element, animation, prefix = "animate__") =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

function closeSidebar() {
      document.getElementById("About").style.opacity = 1;
      document.getElementById("Experience").style.opacity = 1;
      document.getElementById("Projects").style.opacity = 1;
      document.getElementById("Skills").style.opacity = 1;
      document.getElementById("Goals").style.opacity = 1;
      document.getElementById("Contact").style.opacity = 1;
  let windowWidth = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  if (windowWidth < 640) {
    animateCSS("#wrapper", "fadeOutLeft").then(() => {
      document.getElementById("wrapper").classList.add("invisible");
      document.getElementById("top-bar").classList.remove("invisible");
    });
  }
}

function openSidebar() {
  animateCSS("#top-bar", "backOutLeft").then(() => {
    document.getElementById("top-bar").classList.add("invisible");
    document.getElementById("wrapper").classList.remove("invisible");
  });
  document.getElementById("wrapper").classList.add("invisible");
  document.getElementById("top-bar").classList.remove("invisible");
  document.getElementById("About").style.opacity = 0.65;
  document.getElementById("Experience").style.opacity = 0.65;
  document.getElementById("Projects").style.opacity = 0.65;
  document.getElementById("Skills").style.opacity = 0.65;
  document.getElementById("Goals").style.opacity = 0.65;
  document.getElementById("Contact").style.opacity = 0.65;
}

export { closeSidebar, openSidebar };
