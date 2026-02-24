const settingButton = document.getElementById("settingButton");
const backMain = document.getElementsByClassName("backMain");
const chatroomButton = document.getElementById("chatroomButton");

settingButton.addEventListener("click", function () {
    document.getElementById("mainPage").style.display = "none"
    document.getElementById("settingPage").style.display = "block"
    document.body.style.backgroundColor = "white"
});

chatroomButton.addEventListener("click", function () {
    document.getElementById("mainPage").style.display = "none"
    document.getElementById("chatroomPage").style.display = "block"
    document.body.style.backgroundColor = "#F0F0F3"
});

for (var i = 0; i < backMain.length; i++) {
    backMain[i].addEventListener("click", function () {
        document.getElementById("mainPage").style.display = "block"
        document.getElementById("settingPage").style.display = "none"
        document.getElementById("chatroomPage").style.display = "none"
        document.body.style.backgroundColor = "white"
    });
}

document.getElementById("saveButton").addEventListener("click", function () {
    backMain[0].click();
});