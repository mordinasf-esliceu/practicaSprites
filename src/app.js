'use strict'

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.font = "12px serif";

let playerImg = null;

const direction = {
    Up: 'Up',
    Down: 'Down',
    Left: 'Left',
    Right: 'Right',
    None: 'Idle'
}

function getKeys() {
    let keys = {}
    window.onkeydown = function (e) {
        keys[e.key] = true
    }

    window.onkeyup = function (e) {
        keys[e.key] = false
    }
    return keys
}

let keys = getKeys();

let player = {
    x: 219,
    y: 190,
    w: 31,
    h: 60,
    direction: direction.None,
    cont: 0
}

function loadImage(url) {
    let img = new Image()
    img.src = url
    return new Promise(function (resolve, reject) {
        resolve(img)
    })
}


const Framerate = 16;
let startTime = null;

function update() {

    player.direction = direction.None;
    if (keys['ArrowLeft']) {
        player.direction = direction.Left;
    }
    if (keys['ArrowRight']) {
        player.direction = direction.Right;
    }
    if (keys['ArrowUp']) {
        player.direction = direction.Up;

    }
    if (keys['ArrowDown']) {
        player.direction = direction.Down;
    }
}

function draw() {
    if (player.cont >= 0 && player.cont < 9) {
        if (player.direction === direction.None) {
            ctx.drawImage(
                playerImg,
                304, 45,
                31, 60,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Right) {
            ctx.drawImage(
                playerImg,
                703, 597,
                22, 62,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Left) {
            ctx.drawImage(
                playerImg,
                318, 600,
                23, 62,
                219, 190,
                32, 60 
            )
        } else if (player.direction === direction.Up) {
            ctx.drawImage(
                playerImg,
                686, 450,
                31, 59,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Down) {
            ctx.drawImage(
                playerImg,
                307, 458,
                31, 60,
                219, 190,
                31, 60 
            )
        }
    } else if (player.cont >= 9 && player.cont < 18) {
        if (player.direction === direction.None) {
            ctx.drawImage(
                playerImg,
                394, 45,
                31, 60,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Right) {
            ctx.drawImage(
                playerImg,
                793, 594,
                23, 62,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Left) {
            ctx.drawImage(
                playerImg,
                408, 597,
                23, 62,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Up) {
            ctx.drawImage(
                playerImg,
                776, 447,
                31, 59,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Down) {
            ctx.drawImage(
                playerImg,
                397, 455,
                31, 60,
                219, 190,
                31, 60 
            )
        }
    } else if (player.cont >= 18 && player.cont < 27) {
        if (player.direction === direction.None) {
            ctx.drawImage(
                playerImg,
                485, 45,
                31, 60,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Right) {
            ctx.drawImage(
                playerImg,
                884, 597,
                22, 62,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Left) {
            ctx.drawImage(
                playerImg,
                499, 600,
                23, 62,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Up) {
            ctx.drawImage(
                playerImg,
                867, 450,
                31, 59,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Down) {
            ctx.drawImage(
                playerImg,
                488, 458,
                31, 60,
                219, 190,
                31, 60 
            )
        }
    } else if (player.cont >= 27 && player.cont < 36) {
        if (player.direction === direction.None) {
            ctx.drawImage(
                playerImg,
                575, 45,
                31, 60,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Right) {
            ctx.drawImage(
                playerImg,
                974, 594,
                23, 62,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Left) {
            ctx.drawImage(
                playerImg,
                589, 597,
                23, 62,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Up) {
            ctx.drawImage(
                playerImg,
                957, 447,
                31, 59,
                219, 190,
                31, 60 
            )
        } else if (player.direction === direction.Down) {
            ctx.drawImage(
                playerImg,
                578, 455,
                31, 60,
                219, 190,
                31, 60 
            )
        }
    } else if (player.cont >= 36) {
        player.cont = 0;
    }
    player.cont++;
}

let lag = 0;
function mainLoop(timestamp) {
    if (timestamp === undefined) {
        requestAnimationFrame(mainLoop);
        return;
    }
    if (startTime == null) {
        startTime = timestamp;
    }
    let delta = timestamp - startTime;
    startTime = timestamp;
    lag += delta;
        while (lag > Framerate) {
        update();
        lag -= Framerate;
    } 
    update();
    ctx.save()
    draw();
    ctx.restore();
    requestAnimationFrame(mainLoop);
}

async function main() {
    playerImg = await loadImage('./sprites.png');
    mainLoop();
}

main();