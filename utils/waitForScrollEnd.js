const waitForScrollEnd = () => {
  let last_changed_frame = 0;
  let last_x = window.scrollX;
  let last_y = window.scrollY;
  return new Promise((resolve) => {
    function tick(frames) {
      if (frames >= 500 || frames - last_changed_frame > 20) {
        resolve();
      } else {
        if (window.scrollX != last_x || window.scrollY != last_y) {
          last_changed_frame = frames;
          last_x = window.scrollX;
          last_y = window.scrollY;
        }
        requestAnimationFrame(tick.bind(null, frames + 1));
      }
    }
    tick(0);
  });
};

export default waitForScrollEnd;
