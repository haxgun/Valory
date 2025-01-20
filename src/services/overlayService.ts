import apiClient from "@/services/apiClient";
import { useSettingsStore } from "@/stores/settingsStore";

const settingsStore = useSettingsStore()

export interface PlayerInformation {
  lastMatchId: number;
  mmr: {
    tier: {
      id: number;
      name: string
    };
    rr: number;
    lastChange: number;
    elo: number;
    leaderboard_placement: number
  }
}

interface Match {
  data: any[] | null;
}

export const getInformation = async (): Promise<PlayerInformation | null> => {
  const lastMatchResponse = await getLastMatch()

  if (!lastMatchResponse.data) {
    settingsStore.userDataLoaded = false
    return null
  }

  const lastMatchId = lastMatchResponse.data[0].metadata.match_id

  const playerMMRResponse = await getPlayerMMR()

  if (!playerMMRResponse.data) {
    settingsStore.userDataLoaded = false
    return null
  }

  settingsStore.userDataLoaded = true

  return {
    lastMatchId,
    mmr: {
      tier: {
        id: playerMMRResponse.data.current.tier.id,
        name: playerMMRResponse.data.current.tier.name,
      },
      rr: playerMMRResponse.data.current.rr,
      lastChange: playerMMRResponse.data.current.last_change,
      elo: playerMMRResponse.data.current.elo,
      leaderboard_placement: playerMMRResponse.data.current.leaderboard_placement,
    },
  }
}

const getLastMatch = async (): Promise<Match> => {
  try {
    const response: AxiosResponse = await apiClient.get<Match>(
      `/v4/by-puuid/matches/${settingsStore.region}/pc/${settingsStore.puuid}?mode=competitive&size=1`,
    )
    if (response.status === 200) {
      const { data } = response
      return data
    } else return { data: null }
  } catch (error: any) {
    console.error("Error fetching matches:", error.message);
    return { data: null}
  }
}

const getPlayerMMR = async () => {
  try {
    const response: AxiosResponse = await apiClient.get(`/v3/by-puuid/mmr/${settingsStore.region}/pc/${settingsStore.puuid}`)
    if (response.status === 200) {
      const { data } = response
      return data
    } else return { data: null }
  }
  catch (error: any) {
    console.error("Error fetching matches:", error.message);
    return { data: null}
  }
}