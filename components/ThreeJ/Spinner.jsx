function Spinner({ isHomeScreen }) {
  return (
    <div
      className={`flex items-center justify-center ${
        isHomeScreen ? "w-full h-full" : "h-auto mx-28"
      }`}
    >
      <span
        className={
          "w-[4.5rem] h-[4.5rem] border-2 border-r rounded-full border-r-transparent dark:border-r-transparent animate-spin border-dark dark:border-light"
        }
      ></span>
    </div>
  );
}

export default Spinner;
