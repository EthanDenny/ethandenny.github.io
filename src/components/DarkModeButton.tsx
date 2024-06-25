import { useState } from "preact/hooks";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") ?? "light",
  );

  const handleClick = () => {
    const toggledTheme = theme === "light" ? "dark" : "light";

    if (toggledTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", toggledTheme);

    setTheme(toggledTheme);
  };

  return (
    <button className="dark-mode-btn" onClick={handleClick}>
      <i
        className={theme === "light" ? "fa-regular fa-moon" : "fa-solid fa-sun"}
      ></i>
    </button>
  );
}
