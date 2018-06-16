//total amount of melons
let melons = 0;

//melons per second
let mps = 0;

//melons per click
let mpc = 1;

//winning amount of melons
let win = 100;

//types of upgrades
let UPGRADES = {
    CLICK: 0,
    RATE: 1
}

//set progress bar to match melon amount
const setBar = () => {
    document.getElementById("melon-bar").style.width = Math.min((melons / win) * 100, 100) + "%";
    document.getElementById("melon-bar").innerHTML = Math.min(Math.floor((melons / win) * 100), 100) + "%";
    document.getElementById("num-melons").innerHTML = Math.floor(melons);
}

//add new upgrade
const addUpgrade = (type, img, name, desc, amt, cost) => {
//    <div class = "item click-upgrade">
//                <img src = "img/worker.png">
//                <div class = "desc">
//                    <b>Worker</b>
//                    <p>Gather melons faster (+1 melons/click)</p>
//                </div>
//            </div>
    let className = "item"
    if(type === UPGRADES.CLICK){
        className += " click-upgrade";
    }else if(type === UPGRADES.RATE){
        className += " rate-upgrade";
    }
    document.getElementById("store").innerHTML += `<div class = "${className}" id = "upgrade-${name}"><img src = "${img}"><div class = "desc"><b>${name}</b><p>${desc}<br><b>Cost:</b> ${cost}</p></div></div>`;
    setTimeout(() => {
        document.getElementById(`upgrade-${name}`).addEventListener("click", () => {
            if(melons >= cost){
                melons -= cost;
                if(type === UPGRADES.CLICK){
                    mpc += amt;
                }else if(type === UPGRADES.RATE){
                    mps += amt;
                }
            }
        });
    }, 0)
    
}

addUpgrade(UPGRADES.CLICK, "img/worker.png", "Worker", "Gather melons faster (+1 melons/click)", 1, 10);
addUpgrade(UPGRADES.RATE, "img/plant.png", "Watermelon plant", "Grow some watermelon (+0.1 melons/second)", 0.1, 3);
addUpgrade(UPGRADES.RATE, "img/fertilizer.png", "Fertilizer", "Increase plant growth (+3 melons/second)", 3, 100);
addUpgrade(UPGRADES.RATE, "img/farm.png", "Watermelon Farm", "Start a watermelon plantation (+20 melons/second)", 20, 500);
addUpgrade(UPGRADES.RATE, "img/portal.png", "Portal", "Get melons from another dimension (+100 melons/second)", 100, 2000);

//game loop
setInterval(() => {
    melons += mps / 30;
    setBar();
    if(melons >= win){
        document.getElementById("win").style.display = "block";
    }
}, 1000 / 30)

//make melon pulse on click
document.getElementById("melon").addEventListener("click", (e) => {
    document.querySelector("#melon img").style.height = "55vh";
    setTimeout(() => {
        document.querySelector("#melon img").style.height = "50vh";
    }, 250);
    melons += mpc;
});