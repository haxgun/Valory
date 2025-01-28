import "modern-normalize/modern-normalize.css";
import "@/scss/overlay.scss";
import { overlayHTML } from "@/js/components/overlay.js";
import { setIntervalAsync } from "set-interval-async";

const apiUrl = "https://api.henrikdev.xyz/valorant";
const urlParams = new URLSearchParams(window.location.search);

const config = {
  hdevApiKey: urlParams.get("hdevApiKey"),
  textColor: `#${urlParams.get("textColor").replace("#", "")}`,
  primaryColor: `#${urlParams.get("primaryColor").replace("#", "")}`,
  bgColor: `#${urlParams.get("bgColor").replace("#", "")}`,
  progressRankColor: `#${urlParams.get("progressRankColor").replace("#", "")}`,
  progressRankBgColor: `#${urlParams.get("progressRankBgColor").replace("#", "")}`,
  alphaBg: urlParams.get("alphaBg") === "yes",
  alphaGradBg: urlParams.get("alphaGradBg") === "yes",
  wlStat: urlParams.get("wlstat") === "yes",
  progressRank: urlParams.get("progressrank") === "yes",
  lastMatchPts: urlParams.get("lastMatchPts") === "yes",
  nickname: urlParams.get("nickname"),
  tag: urlParams.get("tag"),
};

const overlay = document.querySelector("#overlay");
overlay.innerHTML = overlayHTML;

const elements = {
  imgRank: document.getElementById("imgRank"),
  imgPTS: document.getElementById("imgPTS"),
  playerRank: document.getElementById("playerRank"),
  progressRank: document.getElementById("progressrank"),
  rankBlock: document.getElementById("rankBlock"),
  gradbg: document.getElementById("elements"),
  wlStat: document.getElementById("wlstat"),
  lastMatchPts: document.getElementById("lastmatchpts"),
  lastMatchPtsValue: document.getElementById("lastmatchptsvalue"),
  cssStyle: document.querySelector(":root").style,
  wlValue: document.getElementById("WLvalue"),
  winValue: document.getElementById("winValue"),
  loseValue: document.getElementById("loseValue"),
  wlPercent: document.getElementById("wlProccent"),
};

let lastMatchId = "";
let winCount = 0;
let loseCount = 0;

async function main() {
  try {
    const [puuid, region] = await getPlayerDetails(config.nickname, config.tag);
    lastMatchId = await getLastMatchId(region, puuid);
    await setupOverlayStyles();
    await fetchAndUpdateData(region, puuid);
    setIntervalAsync(fetchAndUpdateData, 30000, region, puuid);
  } catch (error) {
    console.error("Error initializing application:", error);
  }
}

async function getPlayerDetails(nickname, tag) {
  const response = await fetch(`${apiUrl}/v1/account/${nickname}/${tag}?api_key=${config.hdevApiKey}`);
  const data = await response.json();
  return [data.data.puuid, data.data.region];
}

async function getLastMatchId(region, puuid) {
  const matches = await getMatches(region, puuid);
  return matches.data[0].metadata.matchid;
}

async function getMatches(region, puuid) {
  const response = await fetch(`${apiUrl}/v3/by-puuid/matches/${region}/${puuid}?filter=competitive&size=1&api_key=${config.hdevApiKey}`);
  return await response.json();
}

async function fetchAndUpdateData(region, puuid) {
  try {
    const [playerInfo, leaderboardRank] = await Promise.all([
      getPlayerInformation(region, puuid),
      getLeaderboardRank(region, puuid),
    ]);

    updatePlayerCard(playerInfo, leaderboardRank);
    await updateWinLoseStats(region, puuid);
  } catch (error) {
    console.error("Error fetching or updating data:", error);
  }
}

async function getPlayerInformation(region, puuid) {
  const response = await fetch(`${apiUrl}/v1/by-puuid/mmr/${region}/${puuid}?api_key=${config.hdevApiKey}`);
  return await response.json();
}

async function getLeaderboardRank(region, puuid) {
  try {
    const response = await fetch(`${apiUrl}/v1/leaderboard/${region}?puuid=${puuid}&api_key=${config.hdevApiKey}`);

    if (!response.ok) {
      return "";
    }

    const data = await response.json();
    return data?.data?.[0]?.leaderboardRank || "";
  } catch {
    return "";
  }
}


function updatePlayerCard(playerInfo, leaderboardRank) {
  const { playerRank, imgRank, progressRank, lastMatchPtsValue } = elements;
  const { currenttierpatched: rank, ranking_in_tier: mmr, mmr_change_to_last_game: lastPts, currenttier: tier } = playerInfo.data;

  imgRank.src = `/img/ranks/${tier}.webp`;
  progressRank.style.setProperty("--progresspontinho", `${Math.min(mmr, 100)}%`);

  if (tier >= 24 && leaderboardRank <= 500) {
    playerRank.innerHTML = `${rank} #${leaderboardRank}`;
  } else {
    playerRank.innerHTML = `${rank} - ${mmr}RR`;
  }

  lastMatchPtsValue.innerHTML = lastPts === "nRanked" ? "Unranked" : `${lastPts >= 0 ? "+" : ""}${lastPts} pts`;

  if (lastPts > 0) {
    if (lastPts <= 10) {
      elements.imgPTS.src = '/img/icons/up.webp';
    } else if (lastPts <= 20) {
      elements.imgPTS.src = '/img/icons/up_plus.webp';
    } else {
      elements.imgPTS.src = '/img/icons/up_plusplus.webp';
    }
  } else if (lastPts < 0) {
    if (lastPts > -10) {
      elements.imgPTS.src = '/img/icons/down.webp';
    } else if (lastPts > -20) {
      elements.imgPTS.src = '/img/icons/down_plus.webp';
    } else {
      elements.imgPTS.src = '/img/icons/down_plusplus.webp';
    }
    }
  }

async function updateWinLoseStats(region, puuid) {
  const matches = await getMatches(region, puuid);
  const currentMatchId = matches.data[0].metadata.matchid;

  if (currentMatchId !== lastMatchId) {
    const isWin = await didPlayerWin(puuid, matches);
    winCount += isWin ? 1 : 0;
    loseCount += isWin ? 0 : 1;
    lastMatchId = currentMatchId;
  }

  updateWinLoseVisual(winCount, loseCount);
}

async function didPlayerWin(puuid, matches) {
  const playerTeam = matches.data[0].players.all_players.find((p) => p.puuid === puuid).team.toLowerCase();
  return matches.data[0].teams[playerTeam].has_won;
}

function updateWinLoseVisual(win, lose) {
  const totalGames = win + lose;
  const winPercent = totalGames ? ((win / totalGames) * 100).toFixed() : 0;

  elements.winValue.innerHTML = win;
  elements.loseValue.innerHTML = lose;
  if (totalGames !== 0) {
    elements.wlPercent.innerHTML = `(${winPercent}%)`;
  }
}

function setupOverlayStyles() {
  elements.cssStyle.setProperty("--progressrank-after-color", config.progressRankColor);
  elements.cssStyle.setProperty("--progressrank-color", `${config.progressRankBgColor}45`);

  elements.rankBlock.style.backgroundColor = config.alphaBg ? "transparent" : `${config.bgColor}40`;
  elements.gradbg.style.backgroundImage = config.alphaGradBg ? "none" : "linear-gradient(rgb(255 0 0 / 0%), rgb(0 0 0 / 57%))";

  elements.wlStat.style.display = config.wlStat ? "none" : "";
  elements.progressRank.style.display = config.progressRank ? "none" : "";
  elements.lastMatchPts.style.display = config.lastMatchPts ? "none" : "";

  document.getElementById("mainText").style.color = config.textColor
  elements.wlValue.style.color = config.textColor
  elements.playerRank.style.color = config.primaryColor
  elements.winValue.style.color = config.primaryColor
  elements.loseValue.style.color = config.primaryColor
  elements.wlPercent.style.color = config.primaryColor
  elements.lastMatchPts.style.color = config.textColor
  elements.lastMatchPtsValue.style.color = config.primaryColor
}

await main();
