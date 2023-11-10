import "../scss/overlay.scss";
import "../scss/main.scss";
import Alpine from "alpinejs";

import { overlayHTML } from "./components/overlay.js";

const apiUrl = "https://api.henrikdev.xyz/valorant";
let playerData;

async function checkNickname(name) {
  const regex = /^[a-zA-Zа-яА-Я0-9\s]{1,16}#[a-zA-Zа-яА-Я0-9]{1,5}$/;

  if (name.length === 0) {
    alertText.innerHTML = "Please enter a nickname";
    return false;
  }

  if (!regex.test(name)) {
    alertText.innerHTML = "Incorrect nickname format.";
    return false;
  }

  const [nickname, tag] = name.split("#");

  try {
    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v1/account/${nickname}/${tag}`,
    );
    if (response.status === 404) {
      alertText.innerHTML = `${name} not found.`;
      return false;
    } else if (response.status === 429) {
      alertText.innerHTML = "Too many request! Try again later";
      return false;
    }
    return response.ok;
  } catch (error) {
    alertText.innerHTML = "An error occurred. Please try again later.";
    return false;
  }
}

document.querySelector("#app").innerHTML = `
   <div
        class="start"
        x-data="
        {
          modal: false,
          alert: false,
          nickname: '',
          infoContainer: true,
          contentContainer: false,
          generateContainer: false,
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
          <div class="info" x-show="infoContainer" x-transition:enter.duration.250ms.opacity.0>
            <div class="info__content">
              <div class="info__subcontent">
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10V3.6C20 3.03995 20 2.75992 19.891 2.54601C19.7951 2.35785 19.6422 2.20487 19.454 2.10899C19.2401 2 18.9601 2 18.4 2H5.6C5.03995 2 4.75992 2 4.54601 2.10899C4.35785 2.20487 4.20487 2.35785 4.10899 2.54601C4 2.75992 4 3.03995 4 3.6V10M20 10H4M20 10V10.2C20 11.8802 20 12.7202 19.673 13.362C19.3854 13.9265 18.9265 14.3854 18.362 14.673C17.7202 15 16.8802 15 15.2 15H8.8C7.11984 15 6.27976 15 5.63803 14.673C5.07354 14.3854 4.6146 13.9265 4.32698 13.362C4 12.7202 4 11.8802 4 10.2V10M14.5 15V19.5C14.5 20.8807 13.3807 22 12 22C10.6193 22 9.5 20.8807 9.5 19.5V15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span>Customize your overlay according to your stream.</span>
              </div>
              <div class="info__subcontent">
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5455 9.92543C15.9195 9.26103 16.2313 8.66151 16.4236 8.20521C17.3573 5.98947 16.434 3.44077 14.1769 2.40112C11.9199 1.36148 9.65341 2.4395 8.65871 4.52093C6.75657 3.2157 4.21918 3.40739 2.81989 5.44424C1.42059 7.48108 1.85975 10.142 3.77629 11.594C4.6461 12.253 6.36636 13.2242 7.98596 14.0884M16.2972 11.7499C15.8751 9.482 13.9454 7.82334 11.5156 8.27415C9.08592 8.72497 7.51488 10.9171 7.84335 13.299C8.10725 15.2127 9.56392 19.7027 10.1264 21.394C10.2032 21.6248 10.2415 21.7402 10.3175 21.8206C10.3837 21.8907 10.4717 21.9416 10.5655 21.9638C10.6732 21.9894 10.7923 21.9649 11.0306 21.916C12.7765 21.5575 17.3933 20.574 19.1826 19.8457C21.4096 18.9392 22.5589 16.4841 21.6981 14.153C20.8372 11.8219 18.4723 10.9815 16.2972 11.7499Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span>It's absolutely free! There is support for many popular streaming programs like OBS and others.</span>
              </div>
              <div class="info__subcontent">
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8V5L19 2L20 4L22 5L19 8H16ZM16 8L12 11.9999M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span>Setup once and everything will always work!</span>
              </div>
            </div>
            <div class="info__buttons">
              <button @click="modal = true">How it work</button>
              <button @click="infoContainer = false; contentContainer = true" class="fill">Create your Overlay</button>
            </div>
          </div>
          <div class="content" x-show="contentContainer" x-cloak x-transition:enter.duration.250ms.opacity.0>
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
                  @keyup.enter="if (await checkNickname(nickname)) { getPreview(); search = true; main();} else { alert = true; setTimeout(() => alert = false, 5000)}"
                  x-model="nickname"
                  class="nickname"
                  id="nickname_with_tag"
                  placeholder="NICKNAME#TAG"
                  autocomplete="off"
                />
                <button class="icons" @click="if (await checkNickname(nickname)) { getPreview(); search = true; main();} else { alert = true; setTimeout(() => alert = false, 5000)}">
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
              </div>
            </div>
            <button
              style="width: 100%"
              x-transition
              x-show="search"
              @click="contentContainer = false; generateContainer = true"
              id="submitButton"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div class="generate" x-show="generateContainer" x-cloak x-transition:enter.duration.250ms.opacity.0>
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
                <button style="padding: 14px" id="copyButton">
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
              @click="contentContainer = true; generateContainer = false"
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
      <div x-data="
      {
        currentSlide: 2,
        slides: [
          '/img/previews/ascent.webp',
          '/img/previews/bind.webp',
          '/img/previews/breeze.webp',
          '/img/previews/fracture.webp',
          '/img/previews/haven.webp',
          '/img/previews/icebox.webp',
          '/img/previews/lotus.webp',
          '/img/previews/pearl.webp',
          '/img/previews/split.webp',
          '/img/previews/sunset.webp'
        ],
        thumbnails: [
          '/img/previews/thumbnails/ascent.webp',
          '/img/previews/thumbnails/bind.webp',
          '/img/previews/thumbnails/breeze.webp',
          '/img/previews/thumbnails/fracture.webp',
          '/img/previews/thumbnails/haven.webp',
          '/img/previews/thumbnails/icebox.webp',
          '/img/previews/thumbnails/lotus.webp',
          '/img/previews/thumbnails/pearl.webp',
          '/img/previews/thumbnails/split.webp',
          '/img/previews/thumbnails/sunset.webp'
        ]
      }"
       class="preview">
        <div id="divframe">
          <h1 x-show="!search" class="no_iframe">Your preview will be located here. Please enter your profile to see it.</h1>
          <div x-transition x-show="search" title="" id="iframe"></div>
        </div>
        <div class="preview__background">
          <template x-for="(slide, index) in slides" :key="index">
            <div class="preview__background__image" :style="index === currentSlide ? 'opacity: 1': 'opacity: 0'">
              <img :src="slide" alt="Слайд"/>
            </div>
          </template>
        </div>
        <div class="preview__thumbnails">
          <template x-for="(slide, index) in thumbnails" :key="index">
            <div @click="currentSlide = index" class="thumbnail" :class="{ 'active': index === currentSlide }">
              <img :src="slide" alt="Миниатюра" />
            </div>
          </template>
        </div>
      </div>
      <div x-cloak x-show="alert" class="alert" x-transition>
        <span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9998 8.99999V13M11.9998 17H12.0098M10.6151 3.89171L2.39019 18.0983C1.93398 18.8863 1.70588 19.2803 1.73959 19.6037C1.769 19.8857 1.91677 20.142 2.14613 20.3088C2.40908 20.5 2.86435 20.5 3.77487 20.5H20.2246C21.1352 20.5 21.5904 20.5 21.8534 20.3088C22.0827 20.142 22.2305 19.8857 22.2599 19.6037C22.2936 19.2803 22.0655 18.8863 21.6093 18.0983L13.3844 3.89171C12.9299 3.10654 12.7026 2.71396 12.4061 2.58211C12.1474 2.4671 11.8521 2.4671 11.5935 2.58211C11.2969 2.71396 11.0696 3.10655 10.6151 3.89171Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <div class="alert__rightside">
          <h1 class="alert__title">Something went wrong!</h1>
          <p id="alert__description" class="alert__description"></p>
        </div>
        <span @click="alert=false" class="alert__close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7L7 17M7 7L17 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
      <div x-cloak x-transition:enter.duration.250ms.opacity.0 x-transition:leave.duration.250ms.opacity.0  x-show="modal" class="modal">
        <div x-transition x-show="modal" @click.outside="modal = false" class="modal__content">
          <div class="modal__leftside">
            <img src="/img/steps/1.webp" alt="">
          </div>
          <div class="modal__rightside">
            <div class="modal__title">Follow a few simple steps!</div>
            <div class="modal__steps">
              <div class="modal__step">
                <span class="number">1.</span>
                <span>Open our overlay editor, insert your nickname and you can do some customization if you want.</span>
              </div>
              <div class="modal__step">
                <span class="number">2.</span>
                <span>Save the changes and copy the link. Paste the link into any streaming program in the "Browser Source" plugin.</span>
              </div>
              <div class="modal__step">
                <span class="number">3.</span>
                <span>Place the widget on your stream anywhere you want.</span>
              </div>
            </div>
            <button @click="modal = false" class="fill">Continue</button>
          </div>
        </div>
      </div>
    </div>
`;

async function getPreview() {
  // Get Nickname, Tag, Region
  const inputNicknameWithTag = document.getElementById("nickname_with_tag");
  const nicknameWithTag = inputNicknameWithTag.value;
  const [nickname, tag] = nicknameWithTag.split("#");

  // Color Settings
  const bgColor = document
    .getElementById("backgroundcolor")
    .value.replace("#", "");
  const primaryColor = document
    .getElementById("primarycolor")
    .value.replace("#", "");
  const textColor = document.getElementById("textcolor").value.replace("#", "");
  const progressRankColor = document
    .getElementById("progressrankcolor")
    .value.replace("#", "");
  const progressRankBgColor = document
    .getElementById("progressrankbackgroundcolor")
    .value.replace("#", "");

  // Checks
  const alphaBg = document.getElementById("transparentcheck").checked
    ? "yes"
    : "no";
  const alphaGradBg = document.getElementById("transparentgradientcheck")
    .checked
    ? "yes"
    : "no";
  const wlStatCheck = document.getElementById("wlstatcheck").checked
    ? "yes"
    : "no";
  const progressRankCheck = document.getElementById("progressrankcheck").checked
    ? "yes"
    : "no";
  const lastMatchPtsCheck = document.getElementById("lastmatchptscheck").checked
    ? "yes"
    : "no";

  await generateLink(
    nickname,
    tag,
    textColor,
    primaryColor,
    bgColor,
    progressRankColor,
    progressRankBgColor,
    alphaBg,
    alphaGradBg,
    wlStatCheck,
    progressRankCheck,
    lastMatchPtsCheck,
  );
}

async function generateLink(
  nickname,
  tag,
  textColor,
  primaryColor,
  bgColor,
  progressRankColor,
  progressRankBgColor,
  alphaBg,
  alphaGradBg,
  wlStatCheck,
  progressRankCheck,
  lastMatchPtsCheck,
) {
  linkbox.value =
    window.location.origin +
    "/overlay/?nickname=" +
    nickname +
    "&tag=" +
    tag +
    "&textColor=" +
    textColor +
    "&primaryColor=" +
    primaryColor +
    "&bgColor=" +
    bgColor +
    "&progressRankColor=" +
    progressRankColor +
    "&progressRankBgColor=" +
    progressRankBgColor +
    "&alphaBg=" +
    alphaBg +
    "&alphaGradBg=" +
    alphaGradBg +
    "&wlstat=" +
    wlStatCheck +
    "&progressrank=" +
    progressRankCheck +
    "&lastMatchPts=" +
    lastMatchPtsCheck;
}

const alertText = document.getElementById("alert__description");
const submitButton = document.getElementById("submitButton");
const iframe = document.getElementById("iframe");
const linkbox = document.getElementById("linkbox");
const copyButton = document.getElementById("copyButton");

iframe.innerHTML = overlayHTML;

// Elements
const imgRank = document.getElementById("imgRank");
const imgPTS = document.getElementById("imgPTS");
const playerRank = document.getElementById("playerRank");
const lastMatchPtsValue = document.getElementById("lastmatchptsvalue");
const cssStyle = document.querySelector(":root").style;
const winValue = document.getElementById("winValue");
const loseValue = document.getElementById("loseValue");

winValue.innerHTML = "0";
loseValue.innerHTML = "0";

submitButton.onclick = async function () {
  await getPreview();
};

copyButton.onclick = function () {
  navigator.clipboard.writeText(linkbox.value);
};

async function main() {
  const inputNicknameWithTag = document.getElementById("nickname_with_tag");
  const nicknameWithTag = inputNicknameWithTag.value;
  const [nickname, tag] = nicknameWithTag.split("#");

  const check = await checkData(nickname, tag);

  if (check) {
    await insertinData();
  }
}

async function checkData(nickname, tag) {
  try {
    const response = await fetch(`${apiUrl}/v1/account/${nickname}/${tag}`);
    const data = await response.json();
    const returnStatus = data.status;

    const newPlayerData = await formationUserData(nickname, tag);

    if (returnStatus === 200) {
      if (playerData === undefined) {
        playerData = newPlayerData;
      } else if (
        playerData.nickname !== newPlayerData.nickname &&
        playerData.tag !== newPlayerData.tag
      ) {
        playerData = newPlayerData;
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function insertinData() {
  const playerCurrentTier = playerData.currenttierpatched;
  let playerMmr = playerData.ranking_in_tier;
  const playerMmrText = playerData.ranking_in_tier;
  const playerTier = playerData.currenttier;
  const playerLastGamePts = playerData.mmr_change_to_last_game;
  const playerLeaderboard = playerData.leaderboard;

  if (playerMmr > 100) {
    playerMmr = "0";
  }

  imgRank.src = `/img/ranks/${playerTier}.webp`;
  let actualProcent = `${playerMmr}%`;

  if (playerLastGamePts === "nRanked") {
    playerRank.innerHTML = playerCurrentTier;
  } else if (playerTier === 27) {
    if (playerLeaderboard !== " ") {
      playerRank.innerHTML = `${playerCurrentTier} #${playerLeaderboard}`;
    }
  } else {
    playerRank.innerHTML = `${playerCurrentTier} - ${playerMmrText}RR`;
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
      imgPTS.src = `/img/icons/up.webp`;
    } else if (playerLastGamePts <= 20) {
      imgPTS.src = `/img/icons/up_plus.webp`;
    } else {
      imgPTS.src = `/img/icons/up_plusplus.webp`;
    }
  } else if (playerLastGamePts < 0) {
    if (playerLastGamePts > -10) {
      imgPTS.src = `/img/icons/down.webp`;
    } else if (playerLastGamePts > -20) {
      imgPTS.src = `/img/icons/down_plus.webp`;
    } else {
      imgPTS.src = `/img/icons/down_plusplus.webp`;
    }
  }
}

async function formationUserData(nickname, tag) {
  const [puuid, region] = await getPuuidWithRegion(nickname, tag);
  const [
    currenttier,
    currenttierpatched,
    ranking_in_tier,
    mmr_change_to_last_game,
    elo,
  ] = await getPlayerInformation(region, puuid);
  const leaderboard = await getLeaderboard(region, puuid);

  return {
    nickname: nickname,
    tag: tag,
    puuid: puuid,
    region: region,
    currenttier: currenttier,
    currenttierpatched: currenttierpatched,
    ranking_in_tier: ranking_in_tier,
    mmr_change_to_last_game: mmr_change_to_last_game,
    elo: elo,
    leaderboard: leaderboard,
  };
}

async function getPuuidWithRegion(nickname, tag) {
  const response = await fetch(`${apiUrl}/v1/account/${nickname}/${tag}`);
  const data = await response.json();
  return [data.data.puuid, data.data.region];
}

async function getLeaderboard(region, puuid) {
  const response = await fetch(
    `${apiUrl}/v1/leaderboard/${region}?puuid=${puuid}`,
  );
  const data = await response.json();
  return data.status === 404 ? " " : data.data[0].leaderboardRank;
}

async function getPlayerInformation(region, puuid) {
  const response = await fetch(`${apiUrl}/v1/by-puuid/mmr/${region}/${puuid}`);
  const data = await response.json();
  return [
    data.data.currenttier,
    data.data.currenttierpatched,
    data.data.ranking_in_tier,
    data.data.mmr_change_to_last_game,
    data.data.elo,
  ];
}

window.checkNickname = checkNickname;
window.getPreview = getPreview;
window.main = main;
window.Alpine = Alpine;

Alpine.start();
