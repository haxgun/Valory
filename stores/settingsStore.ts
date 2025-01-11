import { defineStore } from 'pinia'

interface SettingsState {
  riotId: string | null;
  apiKey: string | null;
  backgoundSwitch: boolean;
  progressSwitch: boolean;
  statisticsSwitch: boolean;
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  progressColor: string;
  winColor: string;
  loseColor: string;
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    riotId: null,
    apiKey: null,
    backgoundSwitch: false,
    progressSwitch: false,
    statisticsSwitch: false,
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    primaryColor: '#FF5733',
    progressColor: '#4CAF50',
    winColor: '#00FF00',
    loseColor: '#FF0000',
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'settings',
        storage: localStorage,
      },
    ],
  },
})
