import '../scss/overlay.scss'
import { setIntervalAsync } from 'set-interval-async';

// Urls and Alpine Data
const url = new URL(window.location.href);
const urlParams = url.searchParams;
const apiUrl = 'https://api.henrikdev.xyz/valorant'

// Color Settings
const { textColor, primaryColor, bgColor, progressRankColor, progressRankBgColor } = {
  textColor: urlParams.get("textColor").replace("#", ""),
  primaryColor: urlParams.get("primaryColor").replace("#", ""),
  bgColor: urlParams.get("bgColor").replace("#", ""),
  progressRankColor: urlParams.get("progressRankColor").replace("#", ""),
  progressRankBgColor: urlParams.get("progressRankBgColor").replace("#", "")
};

// Checks
const alphabg = urlParams.get("alphaBg") === "yes" ? "yes" : "no";
const alphagradbg = urlParams.get("alphaGradBg") === "yes" ? "yes" : "no";
const wlStatCheck = urlParams.get("wlstat") === "yes" ? "yes" : "no";
const progressRankCheck = urlParams.get("progressrank") === "yes" ? "yes" : "no";
const lastMatchPtsCheck = urlParams.get("lastMatchPts") === "yes" ? "yes" : "no";


const { NICKNAME, TAG} = {
  NICKNAME: urlParams.get("nickname"),
  TAG: urlParams.get("tag")
};

let lastMatchId = '';
let win = 0;
let lose = 0;

const loading = document.querySelector("#loading");
const overlay = document.querySelector("#overlay");

overlay.innerHTML = `
  <div id="elements">
    <div id="rankBlock">
      <img alt="rank" src="#" id="imgRank" height="80" width="80" />
    </div>
    <div id="playerInfo">
      <h2 style="text-transform: uppercase" id="mainText">
        Rating
      </h2>
      <h1 style="text-transform: uppercase" id="playerRank"></h1>
      <div id="wlstat">
        <h2 id="WLvalue">Win: <span id="winValue"></span> Lose: <span id="loseValue"></span> <span id="wlProccent"></span></h2>
      </div>
      <div id="progressrank"></div>
      <div class="lastmatchpts">
        <span id="lastmatchpts">Last Match:</span>
        <span id="lastmatchptsvalue"></span>
        <img src="#" id="imgPTS" height="16" width="16"/>
      </div>
    </div>
  </div>
`
overlay.style.display = "none";

// Elements
const imgRank = document.getElementById("imgRank");
const imgPTS = document.getElementById("imgPTS");
const playerRank = document.getElementById("playerRank");
const progressRank = document.getElementById("progressrank");
const rankBlock = document.getElementById("rankBlock");
const gradbg = document.getElementById("elements");
const wlStat = document.getElementById("wlstat");
const lastMatchPts = document.getElementById("lastmatchpts");
const lastMatchPtsValue = document.getElementById("lastmatchptsvalue");
const cssStyle = document.querySelector(":root").style;

const wlValue = document.getElementById("WLvalue");
const winValue = document.getElementById("winValue");
const loseValue = document.getElementById("loseValue");
const wlProccent = document.getElementById("wlProccent");

async function main(nickname, tag) {
  const [puuid, region] = await getPuuidWithRegion(nickname, tag);
  lastMatchId = await getFirstMatchId(region, puuid);

  await decorateCard()
  await checkData(region, puuid)
  loading.remove()
  overlay.style.display = "block";
  setIntervalAsync(checkData, 30000, region, puuid);
}

async function getPuuidWithRegion(nickname, tag) {
  const response = await fetch(
    `${apiUrl}/v1/account/${nickname}/${tag}`
  );
  const data = await response.json();
  return [data.data.puuid, data.data.region];
}

async function getPlayerInformation(region, puuid) {
  const response = await fetch(`${apiUrl}/v1/by-puuid/mmr/${region}/${puuid}`);
  const data = await response.json();
  const playerElo = data.data.currenttierpatched;
  const playerMmr = data.data.ranking_in_tier;
  const playerMmrText = data.data.ranking_in_tier;
  const playerTier = data.data.currenttier;
  const playerLastGamePts = data.data.mmr_change_to_last_game;

  return [playerElo, playerMmr, playerMmrText, playerTier, playerLastGamePts];
}

async function getLeaderboard(region, puuid) {
  const response = await fetch(`${apiUrl}/v1/leaderboard/${region}?puuid=${puuid}`);
  const data = await response.json()
  return data.status === 404 ? " " : data.data[0].leaderboardRank;
}

async function decorateCard() {
  document.getElementById("mainText").style.color = `#${textColor}`;
  wlValue.style.color = `#${textColor}`;
  playerRank.style.color = `#${primaryColor}`;
  winValue.style.color = `#${primaryColor}`;
  loseValue.style.color = `#${primaryColor}`;
  wlProccent.style.color = `#${primaryColor}`;
  lastMatchPts.style.color = `#${textColor}`;
  lastMatchPtsValue.style.color = `#${primaryColor}`;

  const progressBarColor = document.querySelector('#progressrank').style;
  progressBarColor.setProperty('--progressrank-after-color', `#${progressRankColor}`);
  progressBarColor.setProperty('--progressrank-color', `#${progressRankBgColor}45`);

  rankBlock.style.backgroundColor = alphabg === "yes" ? "transparent" : `#${bgColor}40`;
  gradbg.style.backgroundImage = alphagradbg === "yes" ? "none" : "linear-gradient(rgb(255 0 0 / 0%), rgb(0 0 0 / 57%))";
  wlStat.style.display = wlStatCheck === "yes" ? "none" : "";
  progressRank.style.display = progressRankCheck === "yes" ? "none" : "";
  lastMatchPts.style.display = lastMatchPtsCheck === "yes" ? "none" : "";
}

async function updatePlayerCard(region, puuid) {
  let [
    playerElo,
    playerMmr,
    playerMmrText,
    playerTier,
    playerLastGamePts
  ] = await getPlayerInformation(region, puuid);

  if (playerMmr > 100) {
    playerMmr = "0";
  }

  imgRank.src = `/img/ranks/${playerTier}.png`;
  let actualProcent = `${playerMmr}%`;

  if (playerLastGamePts === "nRanked") {
    playerRank.innerHTML = playerElo;
  } else if (playerTier === 27) {
    const leaderboardRank = await getLeaderboard(region, puuid);
    if (leaderboardRank !== " ") {
      playerRank.innerHTML = `${playerElo} #${leaderboardRank}`;
    }
  } else {
    playerRank.innerHTML = `${playerElo} - ${playerMmrText}RR`;
  }

  cssStyle.setProperty("--progresspontinho", actualProcent);

  if (playerLastGamePts === "nRanked") {
    lastMatchPtsValue.innerHTML = `Unranked`;
  } else if (playerTier >= 24 && playerLastGamePts === 0) {
    lastMatchPtsValue.innerHTML = `${playerLastGamePts}pts`;
  } else if (playerTier >= 24) {
    if (playerLastGamePts >= 1) {
      lastMatchPtsValue.innerHTML = `+${playerLastGamePts}pts`;
      actualProcent = "100%";
      cssStyle.setProperty("--progresspontinho", actualProcent);
    } else if (playerLastGamePts <= -1) {
      lastMatchPtsValue.innerHTML = `${playerLastGamePts}pts`;
      actualProcent = "0%";
      cssStyle.setProperty("--progresspontinho", actualProcent);
    }
  } else {
    lastMatchPtsValue.innerHTML = `${playerLastGamePts}pts`;
  }

  if (playerLastGamePts > 0) {
    if (playerLastGamePts <= 10) {
      imgPTS.src = `/img/icons/up.png`;
    } else if (playerLastGamePts <= 20) {
      imgPTS.src = `/img/icons/up_plus.png`;
    } else {
      imgPTS.src = `/img/icons/up_plusplus.png`;
    }
  } else if (playerLastGamePts < 0) {
    if (playerLastGamePts > -10) {
      imgPTS.src = `/img/icons/down.png`;
    } else if (playerLastGamePts > -20) {
      imgPTS.src = `/img/icons/down_plus.png`;
    } else {
      imgPTS.src = `/img/icons/down_plusplus.png`;
    }
  }
}

async function checkData(region, puuid) {
  const response = await fetch(`${apiUrl}/v1/by-puuid/mmr/${region}/${puuid}`)
  const data = await response.json();
  const returnStatus = data.status;
  const checkifnull = data.data.currenttier;

  if (returnStatus === 200 && checkifnull !== null) {
    await updatePlayerCard(region, puuid);
  }
  await winlose(region, puuid)
}

async function winlose(region, puuid) {
  const dataMatches = await getMatches(region, puuid);
  const [won, tied] = await getWonInfo(puuid, dataMatches);
  const currentMatchId = dataMatches.data[0].metadata.matchid;

  if (currentMatchId !== lastMatchId) {
    if (won === true) {
      win += 1;
      lastMatchId = dataMatches.data[0].metadata.matchid;
    } else if (won === false && tied === "N") {
      lose += 1;
      lastMatchId = dataMatches.data[0].metadata.matchid;
    }
  }
  await WinLoseVisual(win, lose);
}

async function getFirstMatchId(region, puuid) {
  const data = await getMatches(region, puuid);
  return data.data[0].metadata.matchid;
}

async function getWonInfo(puuid, dataMatches) {
  const playerTeam_ = await playerTeam(puuid, dataMatches)
  let tied;

  const red_won = dataMatches.data[0].teams.red.has_won;
  const blue_won = dataMatches.data[0].teams.blue.has_won;
  const playerTeamWon = dataMatches.data[0].teams[playerTeam_].has_won

  if (red_won === false && blue_won === false) {
    tied = "Y";
  } else {
    tied = "N";
  }
  return [playerTeamWon, tied];
}

async function getMatches(region, puuid) {
  const response = await fetch(`${apiUrl}/v3/by-puuid/matches/${region}/${puuid}?filter=competitive&size=1`);
  return await response.json()
}

async function playerTeam(puuid, dataMatches) {
  const playerTeam = dataMatches.data[0].players.all_players.find(
    (player) => player.puuid === puuid
  );
  const team = playerTeam.team;
  return team.toLowerCase();
}

async function WinLoseVisual(winVal, loseVal) {
  winValue.innerHTML = `${winVal}`;
  loseValue.innerHTML = `${loseVal}`;
  const totalGames = winVal + loseVal;
  const winPercentage = (winVal / totalGames) * 100;
  if (winVal + loseVal !== 0) {
    wlProccent.innerHTML = `(${winPercentage.toFixed()}%)`;
  }
}

await main(NICKNAME, TAG)
