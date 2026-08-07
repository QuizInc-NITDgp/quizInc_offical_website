export function formatEventDateTime(iso: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso; // fallback if it's not a parseable date

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatEventDateRange(fromIso: string, toIso: string) {
  if (!fromIso) return "";

  const from = new Date(fromIso);
  const to = toIso ? new Date(toIso) : null;

  if (isNaN(from.getTime())) return fromIso;

  const sameDay =
    to &&
    !isNaN(to.getTime()) &&
    from.toDateString() === to.toDateString();

  const dateOpts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const timeOpts: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const fromDateStr = from.toLocaleString("en-IN", dateOpts);
  const fromTimeStr = from.toLocaleString("en-IN", timeOpts);

  if (!to || isNaN(to.getTime())) {
    return `${fromDateStr}, ${fromTimeStr}`;
  }

  if (sameDay) {
    const toTimeStr = to.toLocaleString("en-IN", timeOpts);
    return `${fromDateStr}, ${fromTimeStr} – ${toTimeStr}`;
  }

  const toDateStr = to.toLocaleString("en-IN", dateOpts);
  const toTimeStr = to.toLocaleString("en-IN", timeOpts);
  return `${fromDateStr}, ${fromTimeStr} – ${toDateStr}, ${toTimeStr}`;
}