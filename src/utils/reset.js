function resetFontSize() {
  var e = (Math.min(document.documentElement.clientWidth, 750) / 750) * 100;
  e = Math.min(e, 70);
  var n = e / parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  1 !== n && (document.documentElement.style.fontSize = e + 'px');
}

window.onresize = resetFontSize;
window.onload = resetFontSize;
