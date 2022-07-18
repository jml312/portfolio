import fetch from "node-fetch";
import { WakaTimeClient, RANGE } from "wakatime-client";

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

export const getWakaTimeStats = async () => {
  const client = new WakaTimeClient(process.env.WAKATIME_API_KEY);
  const {
    data: { languages, projects, total_seconds }
  } = await client.getMyStats({
    range: RANGE.LAST_7_DAYS,
    useWritesOnly: true
  });
  return {
    languages: languages.slice(0, 2),
    project: projects[0],
    total_seconds
  };
};
