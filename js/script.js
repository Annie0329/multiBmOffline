const settingButton = document.getElementById("settingButton");

settingButton.addEventListener("click", function () {
    document.getElementById("mainPage").style.display = "none"
    document.getElementById("settingPage").style.display = "block"
});
const backMain = document.getElementById("backMain");

backMain.addEventListener("click", function () {
    document.getElementById("mainPage").style.display = "block"
    document.getElementById("settingPage").style.display = "none"
});