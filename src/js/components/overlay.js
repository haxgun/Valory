export const overlayHTML = `
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

