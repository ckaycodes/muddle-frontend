import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatPostDate(dateString) {
  const date = dayjs(dateString);
  const diffInDays = dayjs().diff(date, "day");

  if (!dateString) { 
    return "Old post! OG Muddler";
  }

  if (diffInDays < 7) {
    return date.fromNow(); // "3 days ago"
  } else {
    return date.format("MMM D, YYYY"); // "Aug 7, 2025"
  }
}
