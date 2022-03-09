export const PRODUCTION_DOMAIN = `haloapi.dev`;

export const PREVIEW_DOMAIN = `haloapi.vercel.app`;

export const APP_NAME = `Halo API`;

export const APP_DESCRIPTION = `GraphQL API for Halo Infinite.`;

export const DEFAULT_MAX_AGE = 5 * 60; // 5 minutes

export const RATE_LIMIT_WINDOW = `1m`;

export const RATE_LIMIT_MAX = 10;

export const DEFAULT_QUERY = `# Welcome to the Halo GraphQL API.
# ------------------------------------------------
#
# Below are two examples queries that show how to
# get a player's service record and recent matches.
#
# Readme: https://github.com/TimMikeladze/haloapi.dev
# ------------------------------------------------
#
# New to GraphQL?
# Get started: https://www.howtographql.com/
# Level up: https://www.apollographql.com/docs/
# ------------------------------------------------

query MultiplayerOverview {
  multiplayerServiceRecord(
    gamertag: "Tim the BusStop"
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

  matches(gamertag: "Tim the BusStop", limit: { offset: 0, count: 2 }) {
    data {
      id
      played_at
      player {
        rank
        outcome
      }
      details {
        map {
          name
        }
      }
    }
  }
}`;
