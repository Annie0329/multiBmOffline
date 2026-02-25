const settingButton = document.getElementById("settingButton");
const backMain = document.getElementsByClassName("backMain");
const chatroomButton = document.getElementById("chatroomButton");
const partiButton = document.getElementById("partiButton")
//叫出設定
settingButton.addEventListener("click", function () {
    document.getElementById("mainPage").style.display = "none"
    document.getElementById("settingPage").style.display = "block"
    document.body.style.backgroundColor = "white"
});

//叫出聊天室
chatroomButton.addEventListener("click", function () {
    document.getElementById("mainPage").style.display = "none"
    document.getElementById("chatroomPage").style.display = "flex"
    document.body.style.backgroundColor = "#F0F0F3"
});

//叫出使用者設定
partiButton.addEventListener("click", function () {
    document.getElementById("mainPage").style.display = "none"
    document.getElementById("partiSettingPage").style.display = "block"
    document.body.style.backgroundColor = "white"
});

//給我回去
for (var i = 0; i < backMain.length; i++) {
    backMain[i].addEventListener("click", function () {
        document.getElementById("mainPage").style.display = "block"
        document.getElementById("settingPage").style.display = "none"
        document.getElementById("chatroomPage").style.display = "none"
        document.getElementById("partiSettingPage").style.display = "none"
        document.body.style.backgroundColor = "white"
    });
}

//儲存設定
document.getElementById("saveButton").addEventListener("click", function () {
    backMain[0].click();
});
// 增加attr
document.getElementById("addAttr").addEventListener("click", function () {
    const attr = document.getElementById("attrNew")
    const newOption = new Option(attr.value, attr.value);
    document.getElementById("attrOpts").add(newOption);
    attr.value = ""
});