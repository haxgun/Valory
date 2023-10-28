const submitButton = document.getElementById("submitButton")
const iframe = document.getElementById("iframe");
const linkbox = document.getElementById("linkbox");
const copyButton = document.getElementById("copyButton");

function getPreview() {
  // Nickname with a region
  const inputNicknameWithTag = document.getElementById("nickname_with_tag")
  let nicknameWithTag = inputNicknameWithTag.value;
  let region;
  let nickname;
  let tag;

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

  // Other
  // const regex = /[A-Za-z0-9 ]{1,10}#[A-Za-z0-9]{1,4}/;

  if (nicknameWithTag.length === 0) {
    alert("Please fill all fields");
    return;
  }

  nicknameWithTag = nicknameWithTag.split("#");
  nickname = nicknameWithTag[0];
  tag = nicknameWithTag[1];
  // if (regex.test(nicknameWithTag)) {
  //
  // } else {
  //   alert("Enter the correct nickname#tag");
  //   return;
  // }

  fetch(`https://api.henrikdev.xyz/valorant/v1/account/${nickname}/${tag}`)
    .then((response) => response.json())
    .then((data) => {
      region = data.data.region;

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
    })
    .catch((error) => {
      console.error("An error occurred while loading the data:", error);
      alert("An error occurred while loading the data:.");
    });
}

submitButton.onclick = function () {
  getPreview();
  if (linkbox.value.length === 0) {
    alert("Please fill all fields");
    return;
  }

  iframe.src = linkbox.value;
}

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(linkbox.value);
});
