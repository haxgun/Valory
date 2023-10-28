const submitButton = document.getElementById('submitButton')
const iframe = document.getElementById('iframe');
const linkbox = document.getElementById('linkbox');
const copyButton = document.getElementById('copyButton');


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

    let nickname;
    let tag;
    [nickname, tag] = name.split("#");

    const response = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${nickname}/${tag}`);
    return response.ok;
}

async function getRegion(name, tag) {
    let response = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`);
    response = await response.json();
    return response.data.region;
}


async function getPreview() {
  // Get Nickname, Tag, Region
  const inputNicknameWithTag = document.getElementById('nickname_with_tag')
  let nicknameWithTag = inputNicknameWithTag.value;
  const [nickname, tag] = nicknameWithTag.split('#');
  const region = await getRegion(nickname, tag);

  // Color Settings
  let bgColor = document.getElementById("backgroundcolor").value.replace("#", "");
  let primaryColor = document.getElementById("primarycolor").value.replace("#", "");
  let textColor = document.getElementById("textcolor").value.replace("#", "");
  let progressRankColor = document.getElementById("progressrankcolor").value.replace("#", "");
  let progressRankBgColor = document.getElementById("progressrankbackgroundcolor").value.replace("#", "");

  // Checks
  let alphaBg = document.getElementById("transparentcheck").checked ? "yes" : "no";
  let alphaGradBg = document.getElementById("transparentgradientcheck").checked ? "yes" : "no";
  let wlStatCheck = document.getElementById("wlstatcheck").checked ? "yes" : "no";
  let progressRankCheck = document.getElementById("progressrankcheck").checked ? "yes" : "no";
  let lastMatchPtsCheck = document.getElementById("lastmatchptscheck").checked ? "yes" : "no";

  linkbox.value =
    window.location.origin +
    "/overlay/?region=" +
    region +
    "&nickname=" +
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

  iframe.src = linkbox.value;
}

submitButton.onclick = async function () {
  await getPreview();
}

copyButton.onclick = function() {
  navigator.clipboard.writeText(linkbox.value);
}
