export function formatDate(dateStr: string, lang: string) {
  const date = new Date(dateStr);
  let format = lang == "id" ? "id-ID" : "en-EN"
  return date.toLocaleDateString(format, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function timeAgo(timestamp: string | number | Date, t?: (key: string) => string): string {
  const timeAgo = new Date(timestamp).getTime();
  const currentTime = Date.now();
  const timeDifference = currentTime - timeAgo;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);
  const months = Math.floor(seconds / 2629440);
  const years = Math.floor(seconds / 31553280);

  // helper translate fallback
  const trans = (key: string) =>
    t ? t(key) : {
      just_now: "just now",
      minute_ago: "minute ago",
      minutes_ago: "minutes ago",
      hour_ago: "hour ago",
      hours_ago: "hours ago",
      day_ago: "day ago",
      days_ago: "days ago",
      month_ago: "month ago",
      months_ago: "months ago",
      year_ago: "year ago",
      years_ago: "years ago"
    }[key] || key;

  if (seconds <= 60) {
    return trans("just_now");
  } else if (minutes <= 60) {
    return minutes === 1
      ? `1 ${trans("minute_ago")}`
      : `${minutes} ${trans("minutes_ago")}`;
  } else if (hours <= 24) {
    return hours === 1
      ? `1 ${trans("hour_ago")}`
      : `${hours} ${trans("hours_ago")}`;
  } else if (days <= 30) {
    return days === 1
      ? `1 ${trans("day_ago")}`
      : `${days} ${trans("days_ago")}`;
  } else if (months <= 12) {
    return months === 1
      ? `1 ${trans("month_ago")}`
      : `${months} ${trans("months_ago")}`;
  } else {
    return years === 1
      ? `1 ${trans("year_ago")}`
      : `${years} ${trans("years_ago")}`;
  }
}
