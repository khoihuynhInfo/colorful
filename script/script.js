const coatPurpleElement = document.getElementById("coat-purple");
const hatImgElement = document.getElementById("hat");
const relatedElements = document.querySelectorAll(".related");
const coatMainElement = document.getElementById("coat-main");
const coatYellowImgElement = document.getElementById("coat-yellow");

function fillBannerColor(color1) {
  const foreground = document.querySelector(".foreground");
  foreground.style.backgroundColor = color1.hex;
}

colorPicker1.addEventListener("input", function () {
  const selectedColor = event.target.value;
  fetch("./combinations.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const newColors = data.combinations[0].relatedCombinations[0].colors.map(
        (color, index) => {
          if (index === 0) {
            return { hex: selectedColor };
          } else {
            return { hex: color };
          }
        }
      );

      displayColors(newColors);

      fillColor(hexToRGB(selectedColor), coatYellowImgElement, 0.2);
    });
});

colorPicker2.addEventListener("input", function () {
  const selectedColor = event.target.value;

  fetch("./combinations.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const newColors = data.combinations[0].relatedCombinations[0].colors.map(
        (color, index) => {
          if (index === 1) {
            return { hex: selectedColor };
          } else {
            return { hex: color };
          }
        }
      );
      fillBannerColor(newColors[1]);

      displayColors(newColors);

      fillColor(hexToRGB(selectedColor), hatImgElement, 0.2);
    });
});

colorPicker3.addEventListener("input", function () {
  const selectedColor = event.target.value;

  fetch("./combinations.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const newColors = data.combinations[0].relatedCombinations[0].colors.map(
        (color, index) => {
          if (index === 2) {
            return { hex: selectedColor };
          } else {
            return { hex: color };
          }
        }
      );

      displayColors(newColors);

      fillColor(hexToRGB(selectedColor), coatMainElement, 0.2);
    });
});

colorPicker4.addEventListener("input", function () {
  const selectedColor = event.target.value;

  fetch("./combinations.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const newColors = data.combinations[0].relatedCombinations[0].colors.map(
        (color, index) => {
          if (index === 3) {
            return { hex: selectedColor };
          } else {
            return { hex: color };
          }
        }
      );

      displayColors(newColors);

      fillColor(hexToRGB(selectedColor), coatPurpleElement, 0.2);
    });
});

function hexToRGB(hex) {
  hex = hex.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

function combinationsComponent(data) {
  const releatedElements = document.querySelectorAll(".related");
  releatedElements.forEach(function (element, index) {
    const divsInsideRelated = element.querySelectorAll("div");
    divsInsideRelated.forEach(function (div, idx) {
      div.style.backgroundColor =
        data.combinations[0].relatedCombinations[index]?.colors[idx];
      div.style.width = 52 + "px";
      div.style.height = 30 + "px";
    });
  });
}

function displayColors(colors) {
  const colorElements = document.querySelectorAll(".color");
  colorElements.forEach(function (element, index) {
    element.style.backgroundColor = colors[index].hex;
  });

  const colorHexNames = document.querySelectorAll(".color-hex");
  colorHexNames.forEach(function (element, index) {
    element.textContent = colors[index].hex;
  });
}

function displayColorNames(colors) {
  const colorNames = document.querySelectorAll(".color-name");
  colorNames.forEach(function (element, index) {
    element.textContent = colors[index].name;
  });
}

fillColor = (newColor, imgElement, opacity = 0.1) => {
  let canvas = document.createElement("canvas");

  let imgWidth, imgHeight;

  imgWidth = imgElement.width;
  imgHeight = imgElement.height;
  canvas.width = imgWidth;
  canvas.height = imgHeight;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(imgElement, 0, 0, imgWidth, imgHeight);

  var imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
  var pixels = imageData.data;

  var colors = [];

  for (var i = 0; i < pixels.length; i += 4) {
    var r = pixels[i];
    var g = pixels[i + 1];
    var b = pixels[i + 2];

    var currentColor = { r: r, g: g, b: b };

    pixels[i] = newColor.r;
    pixels[i + 1] = newColor.g;
    pixels[i + 2] = newColor.b;
  }

  ctx.putImageData(imageData, 0, 0);
  ctx.globalAlpha = opacity;

  ctx.drawImage(imgElement, 0, 0, imgWidth, imgHeight);

  imgElement.src = canvas.toDataURL();
};

function loadCombinationsJson() {
  fetch("./combinations.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayColors(data.combinations[0].combination.colors);

      displayColorNames(data.combinations[0].combination.colors);

      fillBannerColor(data.combinations[0].combination.colors[1]);

      combinationsComponent(data);
      this.datajson = data;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadCombinationsJson();
});

relatedElements.forEach(function (relatedElement, index) {
  relatedElement.addEventListener("click", function () {
    fetch("./combinations.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const newColors = data.combinations[0].relatedCombinations[
          index
        ].colors.map((color) => {
          return { hex: color };
        });

        displayColors(newColors);

        fillBannerColor(newColors[1]);

        fillColor(
          hexToRGB(data.combinations[0].relatedCombinations[index].colors[0]),
          coatPurpleElement,
          0.2
        );
        fillColor(
          hexToRGB(data.combinations[0].relatedCombinations[index].colors[1]),
          coatMainElement,
          0.2
        );
        fillColor(
          hexToRGB(data.combinations[0].relatedCombinations[index].colors[2]),
          coatYellowImgElement,
          0.2
        );
        fillColor(
          hexToRGB(data.combinations[0].relatedCombinations[index].colors[3]),
          hatImgElement,
          0.2
        );
      });
  });
});
