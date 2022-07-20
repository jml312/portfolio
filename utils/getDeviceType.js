const getDeviceType = () => {
  const screenWidth = window.screen.width;
  if (screenWidth < 576) {
    return "Mobile";
  } else if (screenWidth > 576 && screenWidth < 992) {
    return "Tablet";
  } else if (screenWidth > 992 && screenWidth < 1440) {
    return "Laptop";
  }
  return "Desktop";
};

export default getDeviceType;
