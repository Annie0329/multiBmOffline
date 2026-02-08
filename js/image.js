const imageUpload = document.getElementById("imageUpload");
const imageUploadBtn = document.getElementById("imageUploadBtn");
const previewImage = document.getElementById("previewImage");

imageUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        previewImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
});
imageUploadBtn.addEventListener("click", function () {
    imageUpload.click();
});
