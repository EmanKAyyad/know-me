const addVisibleUploaderEventListener = () => {
  const uploaderButton = document.getElementById("uploader-button");
  const actualUploader = document.getElementById("actual-uploader");

  uploaderButton?.addEventListener("click", () => {
    actualUploader?.click();
  });
};

const renderImageOnLoad = (file: File) => {
  const ImgUrl = URL.createObjectURL(file);
  const imageViewer = document.getElementById("preview-img");
  if(imageViewer) {
    imageViewer.style.backgroundImage = `url("${ImgUrl}")`;
  } else {
    throw new Error("Image cannot be rendered")
  }
};

const attachImageUploaderEventListener = () => {
  const uploader = document.getElementById("actual-uploader");
  uploader?.addEventListener("change", ((elem) => {
    const file = (elem?.target as HTMLInputElement)?.files?.[0];
    if (!file) {
      throw new Error("No Image is provded");
    }
    renderImageOnLoad(file);
  }) as EventListener);
};

window.onload = function () {
  addVisibleUploaderEventListener();
  attachImageUploaderEventListener();
};
