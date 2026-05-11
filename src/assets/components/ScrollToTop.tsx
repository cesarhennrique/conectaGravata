import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Aguarda o DOM renderizar antes de scrollar
      const id = hash.replace("#", "");
      const attempt = (tries: number) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (tries > 0) {
          setTimeout(() => attempt(tries - 1), 80);
        }
      };
      setTimeout(() => attempt(10), 80);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
