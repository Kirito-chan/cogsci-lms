import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  console.log(useLocation());

  useEffect(() => {
    if (!hash) {
      console.log(hash);
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
