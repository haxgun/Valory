import apiClient from './apiClient'

interface Player {
  name: string;
  tag: string;
  leaderboard_rank: number;
  tier: number;
  rr: number;
  wins: number;
  updated_at: string;
}

export const getTopLeaderboard = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await apiClient.get('/v3/leaderboard/eu/pc')

    if (response.data.status === 200) {
      const players = response.data.data.players.slice(0, 10)
      return players.map((player: Player[] ) => `${player.name}#${player.tag}`)
    } else {
      return []
    }
  } catch (error) {
    console.error('Error fetching leaderboard data:', error)
    return []
  }
}
