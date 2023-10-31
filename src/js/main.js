import '../scss/main.scss'
import Alpine from 'alpinejs'

async function checkNickname(name) {
    const regex = /^[a-zA-Zа-яА-Я0-9\s]{1,16}#[a-zA-Zа-яА-Я0-9]{1,5}$/

    if (name.length === 0) {
      alert('Please enter a nickname');
      return false;
    }

    if (!regex.test(name)) {
        alert('Incorrect nickname format.');
        return false;
    }

    let [nickname, tag] = name.split('#');

    const response = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${nickname}/${tag}`);
    return response.ok;
}

document.querySelector('#app').innerHTML = `
   <div
        class="start"
        x-data="
        {
          nickname: 'MAGICX#1337',
          editorContinue: false,
          search: false,
          configutarion: false,
          backgroundColor: '#ffffff',
          primaryColor: '#ffffff',
          textColor: '#f0f0f0',
          transparentCheck: false,
          transparentGradientCheck: false,
          progressRankColor: '#61baa4',
          progressRankBackgroundColor: '#ffffff',
          wlStat: false,
          progressRank: false,
          lastMarchPts: false
        }"
    >
      <div class="sidepanel">
        <div class="main">
          <div class="logos">
            <p class="pretitle">STREAM OVERLAY <span>NEW</span></p>
            <h1 class="title">VALORY</h1>
            <h2 class="description">
              Catch your audience's attention with real-time Valorant stats!
            </h2>
          </div>
          <div class="content" x-show="!editorContinue">
            <div class="profile">
              <h2 class="title__title">Profile</h2>
              <p>
                Find your profile in Valorant to link it to your stream overlay.
              </p>
              <div class="nickname_input">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      stroke="white"
                      d="m2.2 4 .1.1c.2.3 11.8 14.8 12.8 16v.1a.1.1 0 0 1-.1.1H8.8a.52.52 0 0 1-.4-.2c-.2-.2-4.4-5.4-6.3-7.9A.31.31 0 0 0 2 12V4.1a.349.349 0 0 1 .2-.1Zm19.8.2c0-.1-.1-.1-.1-.2h-.1l-.2.2c-.9 1.1-8.1 10.1-8.3 10.3l-.1.1c0 .1 0 .1.1.1h6.2c.1 0 .2-.1.3-.2l.2-.2c.5-.7 1.7-2.2 1.8-2.3 0-.1 0-.1.1-.2v-.1c.1-2.4.1-4.9.1-7.5Z"
                    ></path>
                  </svg>
                </span>
                <input
                  @keyup.enter="if (await checkNickname(nickname)) { getPreview(); search = true }"
                  x-model="nickname"
                  class="nickname"
                  id="nickname_with_tag"
                  placeholder="NICKNAME#TAG"
                  autocomplete="off"
                />
                <button @click="if (await checkNickname(nickname)) { getPreview(); search = true }" style="padding: 5px">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div
              x-transition
              x-show="search"
              class="configuration"
            >
              <div @click="configutarion = true" class="title">
                <h2 class="title__title">Configuration</h2>
                <div class="title__right">
                  <button
                    x-cloak
                    x-transition
                    x-show="configutarion"
                    @click.stop="
                      backgroundColor = '#ffffff';
                      primaryColor = '#ffffff';
                      textColor = '#ffffff';
                      transparentCheck = false;
                      transparentGradientCheck = false;
                      progressRankColor = '#61baa4';
                      progressRankBackgroundColor ='#ffffff';
                      wlStat = false;
                      progressRank = false;
                      lastMarchPts = false;
                    "
                    style="padding: 6px 8px; font-size: 12px"
                    class="button_2 red"
                  >
                    Reset
                  </button>
                  <button @click.stop="configutarion = !configutarion" style="padding: 5px">
                    <svg x-show="!configutarion" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg x-cloak x-show="configutarion" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 15L12 9L6 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <p>
                Adjust available options of the chosen variant to reflect your
                brand.
              </p>
              <div x-cloak x-show="configutarion" x-transition class="settings">
                <div>
                  <h3 class="label">Background Color</h3>
                  <div class="settings_input">
                    <span>
                      <input
                        x-model="backgroundColor"
                        type="color"
                        id="backgroundcolor"
                        class="colorpicker"
                        value="#ffffff"
                      />
                    </span>
                    <input
                      class="settings"
                      x-model="backgroundColor"
                      type="text"
                      readonly
                    />
                  </div>
                </div>
                <div class="checkboxs">
                  <div class="checkbox-wrapper-2">
                    <input
                      x-model="transparentCheck"
                      id="transparentcheck"
                      type="checkbox"
                      class="sc-gJwTLC ikxBAC"
                    />
                  </div>
                  <label for="transparentcheck"> Disable background</label>
                </div>
                <div class="checkboxs">
                  <div class="checkbox-wrapper-2">
                    <input
                      x-model="transparentGradientCheck"
                      id="transparentgradientcheck"
                      type="checkbox"
                      class="sc-gJwTLC ikxBAC"
                    />
                  </div>
                  <label for="transparentgradientcheck">
                    Disable background gradient</label
                  >
                </div>
                <div>
                  <h3 class="label">Primary Color</h3>
                  <div class="settings_input">
                    <span>
                      <input
                        x-model="primaryColor"
                        type="color"
                        id="primarycolor"
                        class="colorpicker"
                        value="#282b30"
                      />
                    </span>
                    <input
                      class="settings"
                      x-model="primaryColor"
                      type="text"
                      readonly
                    />
                  </div>
                </div>
                <div>
                  <h3 class="label">Text Color</h3>
                  <div class="settings_input">
                    <span>
                      <input
                        x-model="textColor"
                        type="color"
                        id="textcolor"
                        class="colorpicker"
                        value="#282b30"
                      />
                    </span>
                    <input
                      class="settings"
                      x-model="textColor"
                      type="text"
                      readonly
                    />
                  </div>
                </div>
                <div>
                  <h3 class="label">Progress Rank Color</h3>
                  <div class="settings_input">
                    <span>
                      <input
                        x-model="progressRankColor"
                        type="color"
                        id="progressrankcolor"
                        class="colorpicker"
                        value="#61baa4"
                      />
                    </span>
                    <input
                      class="settings"
                      x-model="progressRankColor"
                      type="text"
                      readonly
                    />
                  </div>
                </div>
                <div>
                  <h3 class="label">Progress Rank Background Color</h3>
                  <div class="settings_input">
                    <span>
                      <input
                        x-model="progressRankBackgroundColor"
                        type="color"
                        id="progressrankbackgroundcolor"
                        class="colorpicker"
                        value="#ffffff"
                      />
                    </span>
                    <input
                      class="settings"
                      x-model="progressRankBackgroundColor"
                      type="text"
                      readonly
                    />
                  </div>
                </div>
                <div class="checkboxs">
                  <div class="checkbox-wrapper-2">
                    <input
                      x-model="wlStat"
                      id="wlstatcheck"
                      type="checkbox"
                      class="sc-gJwTLC ikxBAC"
                    />
                  </div>
                  <label for="wlstatcheck"> Disable Win/Lose stat</label>
                </div>
                <div class="checkboxs">
                  <div class="checkbox-wrapper-2">
                    <input
                      x-model="progressRank"
                      id="progressrankcheck"
                      type="checkbox"
                      class="sc-gJwTLC ikxBAC"
                    />
                  </div>
                  <label for="progressrankcheck"> Disable Progress Rank</label>
                </div>
                <div class="checkboxs">
                  <div class="checkbox-wrapper-2">
                    <input
                      x-model="lastMarchPts"
                      id="lastmatchptscheck"
                      type="checkbox"
                      class="sc-gJwTLC ikxBAC"
                    />
                  </div>
                  <label for="transparentcheck"> Disable Last match pts</label>
                </div>
                <button
                  style="width: 100%; margin-top: 5px;"
                  @click="getPreview()"
                  class="button"
                >
                  Update
                </button>
              </div>
            </div>
            <button
              style="width: 100%"
              x-transition
              x-show="search"
              @click="editorContinue=true"
              id="submitButton"
              class="button"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div class="generate" x-show="editorContinue" x-cloak x-transition>
            <div class="generate__link">
              <h2 class="title__title">Overlay URL: Streaming Software</h2>
              <p>
                Copy the URL below and paste it into your streaming software as
                "Browser".
              </p>
              <div class="link_to_board">
                <input
                  name="link"
                  id="linkbox"
                  disabled="disabled"
                  cols="30"
                  rows="6"
                  placeholder="Your link goes here"
                  readonly
                />
                <button class="button" id="copyButton">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <button
              style="width: 100%"
              @click="editorContinue=false"
              class="button"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Back
            </button>
          </div>
                    <footer>
            <span>Made with ❤️ © 2023 Valory</span>
            <ul class="socials">
              <li>
                <a target="__blank" href="https://www.twitch.tv/magicxcmd">
                  <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0015 0L3.43005 8.57143V39.4286H13.7158V48L22.2872 39.4286H29.1443L44.5729 24V0H12.0015ZM41.1443 22.2857L34.2872 29.1429H27.4301L21.4301 35.1429V29.1429H13.7158V3.42857H41.1443V22.2857Z"/>
                    <path d="M36.0014 9.42859H32.5729V19.7143H36.0014V9.42859Z"/>
                    <path d="M26.5727 9.42859H23.1442V19.7143H26.5727V9.42859Z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a target="__blank"  href="https://github.com/haxgun/valory">
                  <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_910_44)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0199 0C10.7375 0 0 10.8167 0 24.1983C0 34.895 6.87988 43.9495 16.4241 47.1542C17.6174 47.3951 18.0545 46.6335 18.0545 45.9929C18.0545 45.4319 18.0151 43.509 18.0151 41.5055C11.3334 42.948 9.94198 38.6209 9.94198 38.6209C8.86818 35.8164 7.27715 35.0956 7.27715 35.0956C5.09022 33.6132 7.43645 33.6132 7.43645 33.6132C9.86233 33.7735 11.1353 36.0971 11.1353 36.0971C13.2824 39.7827 16.7422 38.7413 18.1341 38.1002C18.3328 36.5377 18.9695 35.456 19.6455 34.8552C14.3163 34.2942 8.70937 32.211 8.70937 22.9161C8.70937 20.2719 9.66321 18.1086 11.1746 16.4261C10.9361 15.8253 10.1008 13.3409 11.4135 10.0157C11.4135 10.0157 13.4417 9.3746 18.0146 12.4996C19.9725 11.9699 21.9916 11.7005 24.0199 11.6982C26.048 11.6982 28.1154 11.979 30.0246 12.4996C34.5981 9.3746 36.6262 10.0157 36.6262 10.0157C37.9389 13.3409 37.1031 15.8253 36.8646 16.4261C38.4158 18.1086 39.3303 20.2719 39.3303 22.9161C39.3303 32.211 33.7234 34.2539 28.3544 34.8552C29.2296 35.6163 29.9848 37.0583 29.9848 39.3421C29.9848 42.5871 29.9454 45.1915 29.9454 45.9924C29.9454 46.6335 30.383 47.3951 31.5758 47.1547C41.12 43.9491 47.9999 34.895 47.9999 24.1983C48.0392 10.8167 37.2624 0 24.0199 0Z"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_910_44">
                        <rect width="48" height="48"/>
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </li>
              <li>
                <a target="__blank"  href="https://www.donationalerts.com/r/haxgun">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5455 9.92543C15.9195 9.26103 16.2313 8.66151 16.4236 8.20521C17.3573 5.98947 16.434 3.44077 14.1769 2.40112C11.9199 1.36148 9.65341 2.4395 8.65871 4.52093C6.75657 3.2157 4.21918 3.40739 2.81989 5.44424C1.42059 7.48108 1.85975 10.142 3.77629 11.594C4.6461 12.253 6.36636 13.2242 7.98596 14.0884M16.2972 11.7499C15.8751 9.482 13.9454 7.82334 11.5156 8.27415C9.08592 8.72497 7.51488 10.9171 7.84335 13.299C8.10725 15.2127 9.56392 19.7027 10.1264 21.394C10.2032 21.6248 10.2415 21.7402 10.3175 21.8206C10.3837 21.8907 10.4717 21.9416 10.5655 21.9638C10.6732 21.9894 10.7923 21.9649 11.0306 21.916C12.7765 21.5575 17.3933 20.574 19.1826 19.8457C21.4096 18.9392 22.5589 16.4841 21.6981 14.153C20.8372 11.8219 18.4723 10.9815 16.2972 11.7499Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </div>
      <div class="preview">
        <div id="divframe">
          <h1 x-show="!search" class="no_iframe">Your preview will be located here. Please enter your profile to see it.</h1>
          <iframe x-transition x-show="search" title="" id="iframe"></iframe>
        </div>
      </div>
    </div>
`

async function getPreview() {
  // Get Nickname, Tag, Region
  const inputNicknameWithTag = document.getElementById('nickname_with_tag')
  let nicknameWithTag = inputNicknameWithTag.value;
  const [nickname, tag] = nicknameWithTag.split('#');

  // Color Settings
  let bgColor = document.getElementById('backgroundcolor').value.replace('#', '');
  let primaryColor = document.getElementById('primarycolor').value.replace('#', '');
  let textColor = document.getElementById('textcolor').value.replace('#', '');
  let progressRankColor = document.getElementById('progressrankcolor').value.replace('#', '');
  let progressRankBgColor = document.getElementById('progressrankbackgroundcolor').value.replace('#', '');

  // Checks
  let alphaBg = document.getElementById('transparentcheck').checked ? 'yes' : 'no';
  let alphaGradBg = document.getElementById('transparentgradientcheck').checked ? 'yes' : 'no';
  let wlStatCheck = document.getElementById('wlstatcheck').checked ? 'yes' : 'no';
  let progressRankCheck = document.getElementById('progressrankcheck').checked ? 'yes' : 'no';
  let lastMatchPtsCheck = document.getElementById('lastmatchptscheck').checked ? 'yes' : 'no';

  linkbox.value =
    window.location.origin +
    '/overlay/?nickname=' +
    nickname +
    '&tag=' +
    tag +
    '&textColor=' +
    textColor +
    '&primaryColor=' +
    primaryColor +
    '&bgColor=' +
    bgColor +
    '&progressRankColor=' +
    progressRankColor +
    '&progressRankBgColor=' +
    progressRankBgColor +
    '&alphaBg=' +
    alphaBg +
    '&alphaGradBg=' +
    alphaGradBg +
    '&wlstat=' +
    wlStatCheck +
    '&progressrank=' +
    progressRankCheck +
    '&lastMatchPts=' +
    lastMatchPtsCheck;

  iframe.src = linkbox.value;
}

const submitButton = document.getElementById('submitButton')
const iframe = document.getElementById('iframe');
const linkbox = document.getElementById('linkbox');
const copyButton = document.getElementById('copyButton');

submitButton.onclick = async function () {
  await getPreview();
}

copyButton.onclick = function() {
  navigator.clipboard.writeText(linkbox.value);
}

window.checkNickname = checkNickname
window.getPreview = getPreview
window.Alpine = Alpine

Alpine.start()