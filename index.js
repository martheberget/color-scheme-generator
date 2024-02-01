const dropdownSelect = document.querySelector("#dropdown-btn");
const colorPicker = document.querySelector("#color-picker");
const getColorsBtn = document.querySelector("#color-btn");
const baseURL = "https://www.thecolorapi.com/";
const count = 5;

getColorsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let hexCode = colorPicker.value.slice(1, colorPicker.value.length);
  let mode = dropdownSelect.value;
  getColors(hexCode, mode, count).then((data) => {
    console.log(data);
    updateHexCodes(data);
    updateColors(data);
  });
});

async function getColors(hexCode, mode, count) {
  let response = await fetch(`${baseURL}scheme?hex=${hexCode}&mode=${mode}&count=${count}`);
  let data = await response.json();
  return data;
}

function updateHexCodes(colorsArray) {
  const codes = document.querySelector(".codes");
  const hexCodes = codes.getElementsByTagName("p");

  for (let i = 0; i < hexCodes.length; i++) {
    hexCodes[i].textContent = colorsArray.colors[i].hex.value;
  }
}

function updateColors(colorsArray) {
  const colors = document.querySelector(".colors");
  const rectangles = colors.getElementsByTagName("div");

  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].style.backgroundColor = colorsArray.colors[i].rgb.value;
  }
}

function copyToClipboard(id) {
  let text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
}
