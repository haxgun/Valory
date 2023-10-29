// Urls and Alpine Data
let url = new URL(window.location.href);
let urlParams = url.searchParams;

// User Params
const { nickname, tag, region } = {
  nickname: urlParams.get("nickname"),
  tag: urlParams.get("tag"),
  region: urlParams.get("region")
};

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

document.querySelector('#overlay').innerHTML = `
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

// Player Info
let returnStatus, checkifnull, playerElo, playerMmr, playerMmrText, playerTier, playerLastGamePts, playerName, leaderboardRank;
let win = 0, lose = 0, tied, matchId1, jsonDataWL, puuid;


function reqGet(url) {
  const request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function leaderboard() {
  const regionLow = region.toLowerCase();
  const rawData = reqGet(
    `https://api.henrikdev.xyz/valorant/v1/leaderboard/${regionLow}?name=${nickname}&tag=${tag}`
  );
  const data = JSON.parse(rawData);
  leaderboardRank =
    data.status === 404 ? " " : data.data[0].leaderboardRank;
}

function main() {
  const rawData = reqGet(`https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${nickname}/${tag}`);
  const data = JSON.parse(rawData);
  returnStatus = data.status;
  checkifnull = data.data.currenttier;
  playerElo = data.data.currenttierpatched;
  playerMmr = data.data.ranking_in_tier;
  playerMmrText = data.data.ranking_in_tier;
  playerTier = data.data.currenttier;
  playerLastGamePts = data.data.mmr_change_to_last_game;
  playerName = data.data.name;
}

function updatePlayerCard() {
  if (playerMmr > 100) {
    playerMmr = "0";
  }

  imgRank.src = `/img/ranks/${playerTier}.png`;
  let actualProcent = `${playerMmr}%`;

  if (playerLastGamePts === "nRanked") {
    playerRank.innerHTML = playerElo;
  } else if (playerTier === 27) {
    leaderboard();
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

  // Colors
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
}

rankBlock.style.backgroundColor = alphabg === "yes" ? "transparent" : `#${bgColor}40`;
gradbg.style.backgroundImage = alphagradbg === "yes" ? "none" : "linear-gradient(rgb(255 0 0 / 0%), rgb(0 0 0 / 57%))";
wlStat.style.display = wlStatCheck === "yes" ? "none" : "";
progressRank.style.display = progressRankCheck === "yes" ? "none" : "";
lastMatchPts.style.display = lastMatchPtsCheck === "yes" ? "none" : "";

function thinking() {
  if (imgRank.src === `/img/load.png`) {
    location.reload();
  }
}

setTimeout(thinking, 10000);
main();
updatePlayerCard();

function checkData() {
  if (returnStatus === 200 && checkifnull !== null) {
    updatePlayerCard();
  }
}

setInterval(main, 15000);
setInterval(checkData, 15000);

function setPuuid() {
  const req = reqGet(
    `https://api.henrikdev.xyz/valorant/v1/account/${nickname}/${tag}`
  );
  const data = JSON.parse(req);
  puuid = data.data.puuid;
}

function get() {
  const wl_data = reqGet(`https://api.henrikdev.xyz/valorant/v3/matches/${region}/${nickname}/${tag}?filter=competitive&size=1`);
  jsonDataWL = JSON.parse(wl_data);
}

function getMatchId() {
  get();
  matchId1 = jsonDataWL.data[0].metadata.matchid;
  return matchId1;
}

function playerTeam() {
  const playerTeam = jsonDataWL.data[0].players.all_players.find(
    (player) => player.puuid === puuid
  );
  const time = playerTeam.team;
  return time.toLowerCase();
}

function won() {
  if (
    jsonDataWL.data[0].teams.red.has_won === false &&
    jsonDataWL.data[0].teams.blue.has_won === false
  ) {
    tied = "Y";
  } else {
    tied = "N";
  }
  return jsonDataWL.data[0].teams[playerTeam()].has_won;
}

function WinLoseVisual() {
  winValue.innerHTML = `${win}`;
  loseValue.innerHTML = `${lose}`;
  const totalGames = win + lose;
  const winPercentage = (win / totalGames) * 100;
  if (win + lose !== 0) {
    wlProccent.innerHTML = `(${winPercentage}%)`;
  }
}

function winlose() {
  get();
  won();
  const matchId2 = jsonDataWL.data[0].metadata.matchid;
  if (matchId2 !== matchId1) {
    if (timeWon === true) {
      win += 1;
      matchId1 = jsonDataWL.data[0].metadata.matchid;
      WinLoseVisual();
    } else if (timeWon === false && tied === "N") {
      lose += 1;
      matchId1 = jsonDataWL.data[0].metadata.matchid;
    }
  }
  WinLoseVisual();
}

setPuuid();
getMatchId();
setInterval(winlose, 30000);
WinLoseVisual();
