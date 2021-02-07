var time;
var score;
var level;
var iteration;
var pipeDistance;
var pipesCounter;
var birdYPosition;
var randomGapPosition;
var backgroundXPosition;
var pipeIntervalReturn;
var gravityIntervalReturn;
var backgroundIntervalReturn;
var timeIntervalReturn;
function jetBird() {
    pipeDistance = -30;
    backgroundXPosition = 0;
    birdYPosition = 0;
    pipesCounter = 0;
    iteration = 0;
    time = 0;
    level = 0;
    score = 0;
    timeIntervalReturn = timeCounter();
    pipeIntervalReturn = movePipe(0);
    gravityIntervalReturn = gravity();
    backgroundIntervalReturn = moveBg();
    document.getElementsByClassName('menuLogo')[0].style.display = 'none';
    document.getElementsByClassName('menuContainer')[0].style.display = 'none';
    document.getElementsByClassName('message')[0].style.display = 'none';
    window.ontouchstart = function () {
        clearInterval(gravityIntervalReturn);
        changeBirdYPosition();
    };
    window.ontouchend = function () {
        gravityIntervalReturn = gravity();
    };
    window.onkeydown = function () {
        clearInterval(gravityIntervalReturn);
        changeBirdYPosition();
    };
    window.onkeyup = function () {
        gravityIntervalReturn = gravity();
    };
}
function gameOver() {
    document.getElementsByClassName('message')[0].style.display = 'block';
    killGame();
    document.getElementsByClassName('bird')[0].style.animation = 'shake 0.5s 6';
}
function levelHandler(pipeNum) {
    if (pipesCounter % 3 == 0) {
        level += 1;
        printToScreen('level', "" + level);
    }
    if (level != 1) {
        score += 400;
    }
    changeGapPosition(pipeNum);
}
function validate() {
    return (birdYPosition < randomGapPosition - 3 || birdYPosition > randomGapPosition + 25) ? false : true;
}
function killGame() {
    window.onclick = function () { };
    window.onkeydown = function () { };
    window.onkeyup = function () { };
    clearInterval(backgroundIntervalReturn);
    clearInterval(pipeIntervalReturn);
    clearInterval(timeIntervalReturn);
    clearInterval(gravityIntervalReturn);
    gravityIntervalReturn = gravity();
    printToScreen('menuLevel', "" + level);
    printToScreen('menuScore', "" + score);
    document.getElementsByClassName('pipe')[0].removeAttribute('style');
    document.getElementsByClassName('pipe')[0].children[0].removeAttribute('style');
    document.getElementsByClassName('pipe')[0].children[1].removeAttribute('style');
    document.getElementsByClassName('pipe')[0].children[2].removeAttribute('style');
    document.getElementsByClassName('bg')[0].removeAttribute('style');
    setTimeout(function () {
        clearInterval(gravityIntervalReturn);
        document.getElementsByClassName('bird')[0].removeAttribute('style');
        document.getElementsByClassName('menuContainer')[0].style.display = 'flex';
    }, 5000);
}
function movePipe(pipeNum) {
    var acceleration = level > 1 ? 100 - (10 * level) : level;
    return setInterval(function () {
        switch (pipeDistance) {
            case 100: {
                pipeDistance = -11;
                break;
            }
            case -10: {
                levelHandler(pipeNum);
                break;
            }
            default: {
                if (pipeDistance >= 65 && pipeDistance < 85) {
                    if (!validate()) {
                        gameOver();
                    }
                }
                break;
            }
        }
        document.getElementsByClassName('pipe')[pipeNum].style.right = pipeDistance++ + "%";
    }, 50);
}
function moveBg() {
    return setInterval(function () {
        backgroundXPosition -= backgroundXPosition == -200 ? -200 : 1;
        document.getElementsByClassName('bg')[0].style.left = backgroundXPosition + "%";
    }, 50);
}
function changeGapPosition(pipeNum) {
    randomGapPosition = Math.floor(Math.random() * 70);
    document.getElementsByClassName('pipe')[pipeNum].children[0].style.height = randomGapPosition + "%";
    document.getElementsByClassName('pipe')[pipeNum].children[1].style.height = 30 + "%";
    document.getElementsByClassName('pipe')[pipeNum].children[2].style.height = 70 - randomGapPosition + "%";
    pipesCounter++;
}
function gravity() {
    return setInterval(function () {
        if (birdYPosition <= 91) {
            birdYPosition == 91 ? clearInterval(gravityIntervalReturn) : document.getElementsByClassName('bird')[0].style.top = ++birdYPosition + "%";
            console.log('in gravity: ', birdYPosition);
        }
    }, 20);
}
function changeBirdYPosition() {
    document.getElementsByClassName('bird')[0].style.top = birdYPosition > 0 ? birdYPosition-- + "%" : '0' + "%";
}
function printToScreen(elementClass, text) {
    document.getElementsByClassName(elementClass)[0].innerHTML = text;
}
function nextLevel() {
    window.onkeydown = function () { };
    window.onkeyup = function () { };
    clearInterval(backgroundIntervalReturn);
    clearInterval(pipeIntervalReturn);
    clearInterval(timeIntervalReturn);
    clearInterval(gravityIntervalReturn);
    document.getElementsByClassName('bird')[0].style.animation = 'finishLevel 1s 1 ease-in';
    printToScreen('menuLevel', "" + level);
    printToScreen('menuScore', "" + score);
    setTimeout(function () {
        document.getElementsByClassName('menuContainer')[0].style.display = 'flex';
    }, 3000);
}
function timeCounter() {
    return setInterval(function () {
        iteration++;
        if (iteration % 10 == 0) {
            time++;
            if (time == 120) {
                nextLevel();
            }
        }
        score += 10;
        printToScreen('score', "" + score);
        printToScreen('time', "" + time);
    }, 100);
}
