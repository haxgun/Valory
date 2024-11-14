export const overlayHTML = `
  <div class="overlay__body">
    <div id="elements" :style="!transparentGradientCheck ? 'background-image: ' + 'linear-gradient(rgba(255, 0, 0, 0), rgba(0, 0, 0, 0.57))' : ''">
      <div id="rankBlock" :style="!transparentCheck ? 'background-color: ' + backgroundColor + '40' : ''">
        <img alt="rank" src="#" id="imgRank" height="80" width="80" />
      </div>
      <div id="playerInfo">
        <h2 style="text-transform: uppercase;" :style="{ color: textColor }" id="mainText">
          Rating
        </h2>
        <h1 style="text-transform: uppercase;" :style="{ color: primaryColor }" id="playerRank"></h1>
        <div id="wlstat" :style="wlStat ? 'display: none' : ''" >
          <h2 id="WLvalue" :style="{ color: textColor }">Win: <span id="winValue" :style="{ color: primaryColor }"></span> Lose: <span id="loseValue" :style="{ color: primaryColor }"></span> <span id="wlProccent" :style="{ color: primaryColor }"></span></h2>
        </div>
        <div id="progressrank" :style="progressRank ? 'display: none' : '--progressrank-after-color:' + progressRankColor + ';' + '--progressrank-color:' +  progressRankBackgroundColor + '45';"></div>
        <div id="lastmatchpts" class="lastmatchpts" :style="lastMarchPts ? 'display: none' : 'color:' + textColor">
          <span>Last Match:</span>
          <span id="lastmatchptsvalue" :style="{ color: primaryColor }"></span>
          <img src="#" id="imgPTS" height="16" width="16"/>
        </div>
      </div>
    </div>
  </div>
`
