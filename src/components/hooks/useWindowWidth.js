import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== `undefined` ? window.innerWidth : "500"
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return width;
}

export default useWindowWidth;
