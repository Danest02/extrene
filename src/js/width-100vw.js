const getScrollBarWidth = () => innerWidth - document.documentElement.clientWidth;
document.documentElement.style.setProperty("--scroll-bar", getScrollBarWidth());

// Obtener valores de variables
// getComputedStyle(document.documentElement).getPropertyValue('--varible')
// getComputedStyle(document.getElementById("nieto")).getPropertyValue('--borde');
// let sakura = getComputedStyle(document.querySelector(".my-slider")).getPropertyValue('--sakura');
