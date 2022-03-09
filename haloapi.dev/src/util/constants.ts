export const PRODUCTION_DOMAIN = `haloapi.dev`;

export const PREVIEW_DOMAIN = `haloapi.vercel.app`;

export const DEFAULT_MAX_AGE = 5 * 60; // 5 minutes

export const DEFAULT_QUERY = `{
  multiplayerServiceRecord(
    gamertag: "<gamertag goes here>"
    filter: matchmade_ranked
  ) {
    data {
      matches_played
      win_rate
      time_played {
        human
      }
      core {
        kda
        kdr
      }
    }
  }
}`;
