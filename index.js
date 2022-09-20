const inputRange = document.getElementById("length");
const charLength = document.getElementById("charLength");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const input = document.querySelectorAll('input[type="checkbox"]');
const button = document.querySelector("button");
const passwordDiv = document.getElementById("password");
const strengthBlock = document.getElementsByClassName("strength-block");
const copyButton = document.getElementById("copy");

const strengthSpan = document.getElementById("strength-span");

console.log(strengthBlock);
let strength = 0;
const uAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lAlpha = "abcdefghijklmnopqrstuvwxyz";
const nums = "1234567890";
const sym = "!@#$%^&()_+~`|}{[]:;?><,./-=";

let passwordArray;

charLength.textContent = inputRange.value;

function handleClick() {
  let password = "";
  for (let i = inputRange.value; i > 0; i--) {
    if (!passwordArray.length) {
      password = passwordDiv.textContent;
      break;
    }
    password += passwordArray[Math.floor(Math.random() * passwordArray.length)];
  }
  passwordDiv.textContent = password;

  return;
}

function changeLength() {
  charLength.textContent = inputRange.value;
}

function strengthSpanSet() {
  switch (strength) {
    case 0:
      strengthSpan.textContent = "WEAK";
      break;
    case 1:
      strengthSpan.textContent = "WEAK";
      break;
    case 2:
      strengthSpan.textContent = "MEDIUM";
      break;
    case 3:
      strengthSpan.textContent = "MEDIUM";
      break;
    case 4:
      strengthSpan.textContent = "STRONG";
      break;
    default:
      strengthSpan.textContent = "WEAK";
  }
}

function fillColor() {
  let bgColor;

  for (let i = 0; i < 4; i++) {
    strengthBlock[0].children[i].style.backgroundColor = "transparent";
  }

  switch (strength) {
    case 1:
      bgColor = "hsl(127, 100%, 82%)";
      break;
    case 2:
      bgColor = "hsl(42, 91%, 68%)";
      break;
    case 3:
      bgColor = "hsl(13, 95%, 66%)";
      break;
    case 4:
      bgColor = "hsl(0, 91%, 63%)";
      break;
    default:
      bgColor = "";
  }
  console.log(bgColor);
  for (let i = 0; i < strength; i++) {
    strengthBlock[0].children[i].style.backgroundColor = bgColor;
  }
}

function strengthCalc() {
  passwordArray = "";
  if (uppercase.checked) passwordArray += uAlpha;
  if (lowercase.checked) passwordArray += lAlpha;
  if (numbers.checked) passwordArray += nums;
  if (symbols.checked) passwordArray += sym;
  if (!passwordArray.length) strength = 0;
  if (passwordArray.length == uAlpha.length + lAlpha.length) strength = 2;
  if (passwordArray.length == uAlpha.length) strength = 1;

  if (numbers.checked) strength = 3;
  if (symbols.checked) strength = 3;
  if (
    (numbers.checked && symbols.checked) ||
    passwordArray.length > uAlpha.length * 2
  )
    strength = 4;

  fillColor();
  strengthSpanSet();
}

async function copytoClipboard() {
  await navigator.clipboard.writeText(passwordDiv.textContent);
}

inputRange.addEventListener("mousemove", changeLength);
inputRange.addEventListener("change", changeLength);

button.addEventListener("click", handleClick);

for (let i of input) {
  i.addEventListener("click", strengthCalc);
}

copyButton.addEventListener("click", copytoClipboard);
