import { defineStore } from 'pinia'

interface SettingsState {
  riotId: string | null;
  apiKey: string | null;
  backgroundSwitch: boolean;
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
    backgroundSwitch: false,
    progressSwitch: false,
    statisticsSwitch: false,
    backgroundColor: '#07090e99',
    textColor: '#FFFFFF',
    primaryColor: '#bebebf',
    progressColor: '#00ffe3e6',
    winColor: '#00ffe3',
    loseColor: '#ff7986',
  }),
  actions: {
    resetConfiguration() {
      this.backgroundSwitch = false;
      this.progressSwitch = false;
      this.statisticsSwitch = false;
      this.backgroundColor = '#07090e99';
      this.textColor = '#FFFFFF';
      this.primaryColor = '#bebebf';
      this.progressColor = '#00ffe3e6';
      this.winColor = '#00ffe3';
      this.loseColor = '#ff7986';
    },
  },
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
