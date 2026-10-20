"use client";

import { useEffect, useState } from "react";

export default function ReadingTime() {
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    const article = document.getElementById("article");
    if (article) {
      const text = article.innerText;
      const wpm = 300;
      const words = text.trim().split(/\s+/).length;
      const minutes = Math.ceil(words / wpm);
      setTime(minutes);
    }
  }, []);

  return (
    <span id="time">
      {time !== null ? time : "..."}
    </span>
  );
}
