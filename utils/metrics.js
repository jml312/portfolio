import fetch from "node-fetch";

const getAccessToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
    }).toString()
  });
  const { access_token } = await response.json();
  return access_token;
};

const getSongs = async ({ accessToken, time_range }) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  const { items } = await response.json();
  return items.slice(0, 10).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name
  }));
};

export const getTopTracks = async () => {
  const accessToken = await getAccessToken();

  return {
    shortTermTracks: await getSongs({
      accessToken,
      time_range: "short_term"
    }),
    longTermTracks: await getSongs({
      accessToken,
      time_range: "long_term"
    })
  };
};

const getTopLanguages = (languages) => {
  return [
    ...new Set(
      languages
        ?.sort((a, b) => b.total_seconds - a.total_seconds)
        ?.map(({ name }) => name)
    )
  ]
    .slice(0, 2)
    .join(", ");
};

const getTopProject = (projects) => {
  if (!projects) return "-";
  projects = projects.filter((p) => p?.name !== "Desktop");
  const maxTimeOnProject = Math.max(
    ...projects.map((p) => p?.total_seconds ?? 0)
  );
  return (
    projects.find((p) => p?.total_seconds === maxTimeOnProject)?.name || "-"
  );
};

export const getWakaTimeStats = async () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
    .toISOString()
    .split("T")[0];
  const end = now.toISOString().split("T")[0];
  const data = await fetch(
    `https://wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.WAKATIME_API_KEY
        ).toString("base64")}`
      }
    }
  );
  const json = await data.json();
  const topProject = getTopProject(
    json["data"].map((el) => el.projects).flat()
  );

  return {
    codingTime: json["cumulative_total"]?.seconds
      ? Math.round(json["cumulative_total"].seconds / 3600)
      : "-",
    languages:
      getTopLanguages(
        json["data"]
          .map((el) => el.languages)
          .flat()
          .filter((el) => el?.name !== "Other" && el?.name !== "Text")
      ) || "-",
    project: topProject || "-"
  };
};
