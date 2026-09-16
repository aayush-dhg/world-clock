const CITIES = [
  { city: "New York", zone: "America/New_York" },
  { city: "Los Angeles", zone: "America/Los_Angeles" },
  { city: "Mexico City", zone: "America/Mexico_City" },
  { city: "São Paulo", zone: "America/Sao_Paulo" },
  { city: "London", zone: "Europe/London" },
  { city: "Paris", zone: "Europe/Paris" },
  { city: "Dubai", zone: "Asia/Dubai" },
  { city: "Mumbai", zone: "Asia/Kolkata" },
  { city: "Singapore", zone: "Asia/Singapore" },
  { city: "Tokyo", zone: "Asia/Tokyo" },
  { city: "Sydney", zone: "Australia/Sydney" },
  { city: "Auckland", zone: "Pacific/Auckland" },
];

const grid = document.getElementById("clock-grid");
const localSummary = document.getElementById("local-summary");

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function getHour(date, timeZone) {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone,
    }).format(date)
  );
}

function getOffsetLabel(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
}

function render() {
  const now = new Date();
  const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  localSummary.textContent = `Your local time is ${timeFormatter.format(now)} (${localZone}).`;

  grid.innerHTML = CITIES.map(({ city, zone }) => {
    const hour = getHour(now, zone);
    const isDay = hour >= 6 && hour < 18;
    const time = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: zone,
    }).format(now);
    const date = new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: zone,
    }).format(now);

    return `
      <article class="clock-card ${isDay ? "is-day" : "is-night"}">
        <p class="city">${city}</p>
        <p class="zone">${zone.replace("_", " ")}</p>
        <p class="time">${time}</p>
        <p class="date">${date}</p>
        <p class="offset">${getOffsetLabel(now, zone)}</p>
      </article>
    `;
  }).join("");
}

render();
setInterval(render, 1000);
