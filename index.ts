let time: number;
let score: number;
let level: number;
let iteration: number;
let pipeDistance: number;
let pipesCounter: number;
let birdYPosition: number;
let randomGapPosition: number;
let backgroundXPosition: number;
let pipeIntervalReturn: number;
let gravityIntervalReturn: number;
let backgroundIntervalReturn: number;
let timeIntervalReturn: number;
function jetBird(): void {
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
    (<HTMLElement>document.getElementsByClassName('menuLogo')[0]).style.display = 'none';
    (<HTMLElement>document.getElementsByClassName('menuContainer')[0]).style.display = 'none';
    (<HTMLElement>document.getElementsByClassName('message')[0]).style.display = 'none';
    window.onkeydown = () => {
        clearInterval(gravityIntervalReturn);
        changeBirdYPosition();
    }
    window.onkeyup = () => {
        gravityIntervalReturn = gravity();
    }
}
function gameOver(): void {
    (<HTMLElement>document.getElementsByClassName('message')[0]).style.display = 'block';
    killGame();
    (<HTMLElement>document.getElementsByClassName('bird')[0]).style.animation = 'shake 0.5s 6';
}
function levelHandler(pipeNum: number) {
    if (pipesCounter % 3 == 0) {
        level += 1;
        printToScreen('level', `${level}`);
    }
    if (level != 1) {
        score += 400;
    }
    changeGapPosition(pipeNum);
}
function validate(): boolean {
    return (birdYPosition < randomGapPosition - 3 || birdYPosition > randomGapPosition + 15) ? false : true;
}
function killGame(): void {
    window.onkeydown = () => { };
    window.onkeyup = () => { };
    clearInterval(backgroundIntervalReturn);
    clearInterval(pipeIntervalReturn);
    clearInterval(timeIntervalReturn);
    clearInterval(gravityIntervalReturn);
    gravityIntervalReturn = gravity();
    printToScreen('menuLevel', `${level}`);
    printToScreen('menuScore', `${score}`);
    setTimeout(() => {
        clearInterval(gravityIntervalReturn);
        (<HTMLElement>document.getElementsByClassName('menuContainer')[0]).style.display = 'flex';
    }, 5000);
}
function movePipe(pipeNum: number): number {
    let acceleration = level > 1 ? 100 - (10 * level) : level;
    return setInterval(() => {
        switch (pipeDistance) {
            case 100: {
                pipeDistance = -11;
                break;
            } case -10: {
                levelHandler(pipeNum);
                break;
            } default: {
                if (pipeDistance >= 65 && pipeDistance < 85) {
                    if (!validate()) {
                        gameOver();
                    }
                }
                break;
            }
        }
        (<HTMLElement>document.getElementsByClassName('pipe')[pipeNum]).style.right = `${pipeDistance++}%`;
    }, 100)
}
function moveBg(): number {
    return setInterval(() => {
        backgroundXPosition -= backgroundXPosition == -200 ? -200 : 1;
        (<HTMLElement>document.getElementsByClassName('bg')[0]).style.left = `${backgroundXPosition}%`;
    }, 100)
}
function changeGapPosition(pipeNum: number): void {
    randomGapPosition = Math.floor(Math.random() * 80);
    (<HTMLElement>document.getElementsByClassName('pipe')[pipeNum].children[0]).style.height = `${randomGapPosition}%`;
    (<HTMLElement>document.getElementsByClassName('pipe')[pipeNum].children[1]).style.height = `${20}%`;
    (<HTMLElement>document.getElementsByClassName('pipe')[pipeNum].children[2]).style.height = `${80 - randomGapPosition}%`;
    pipesCounter++;
}
function gravity(): number {
    return setInterval(() => {
        if (birdYPosition <= 91) {
            birdYPosition == 91 ? clearInterval(gravityIntervalReturn) : (<HTMLElement>document.getElementsByClassName('bird')[0]).style.top = `${birdYPosition++}%`;
        }
    }, 20)
}
function changeBirdYPosition(): void {
    (<HTMLElement>document.getElementsByClassName('bird')[0]).style.top = birdYPosition > 0 ? `${birdYPosition--}%` : `${birdYPosition}%`;
}
function printToScreen(elementClass: string, text: string): void {
    document.getElementsByClassName(elementClass)[0].innerHTML = text;
}
function nextLevel(): void {
    window.onkeydown = () => { };
    window.onkeyup = () => { };
    clearInterval(backgroundIntervalReturn);
    clearInterval(pipeIntervalReturn);
    clearInterval(timeIntervalReturn);
    clearInterval(gravityIntervalReturn);
    (<HTMLElement>document.getElementsByClassName('bird')[0]).style.animation = 'finishLevel 1s 1 ease-in';
    document.getElementsByClassName('menuLevel')[0].innerHTML = `${level}`;
    document.getElementsByClassName('menuScore')[0].innerHTML = `${score}`;
    setTimeout(() => {
        (<HTMLElement>document.getElementsByClassName('menuContainer')[0]).style.display = 'flex';
    }, 3000);
}
function timeCounter(): number {
    return setInterval(() => {
        iteration++;
        if (iteration % 10 == 0) {
            time++;
            if (time == 120) {
                nextLevel();
            }
        }
        score += 10;
        printToScreen('score', `${score}`);
        printToScreen('time', `${time}`);
    }, 100);
}