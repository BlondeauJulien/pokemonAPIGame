let ui = new UI();
let pokemon = new Pokemon();

let dragged; 
let speedSettingElements = document.querySelector('.speed-setting').children;


document.querySelector('.start').addEventListener('click', ui.start);
document.querySelector('.change').addEventListener('click', ui.change);
document.querySelector('.fight-button').addEventListener('click', ui.startFight);

for(let i =0; i<speedSettingElements.length; i++) {
    speedSettingElements[i].addEventListener('click', ui.speedSetting);
}







