
// Program made by Nippo.
// These functions are for comparing numbers and performing other calculations to them.
// Anything here isn't a direct conversion from a game calculation.

//Converts Hex numbers into Decimal numbers, self explanatory.
//It can get a bit cluttered constantly writing parseInt() so this function makes it easier to understand what's happening in the code

const startRNG = "0000";
const maxCount = 65536;


function hexToDecimal(hex) {
    return parseInt(hex, 16);
}

function isBetween(x, low, high) {
    return low <= x && x <= high;
}

function allAreTrue(arr) {
    const all =! arr.includes(false);
    return all;
}

function stringToBool(value) {
    return (value + '').toLowerCase() === 'true';
}

function toHexString(number) {
    var str = Number(number).toString(16);
    return str.length == 1 ? "0" + str : str;
}

function hexToCount(hexTarget) {
    //hexTarget = hexTarget.toUpperCase();
    count = 0;
    testHex = startRNG;
    while ((!(testHex == hexTarget)) && (count < maxCount)){
        count++;
        testHex = advanceRNG(testHex, 1);
    }
    if (count < maxCount)
        return count;
    else
        return -1;
}


function NumpadToStarDirection(num) {
    const directionMap = {
        1: 6,
        2: 5,
        3: 4,
        4: 7,
        6: 3,
        7: 8,
        8: 1,
        9: 2
    };

    return directionMap[num] || 0;
}

function StarDirectionToArrow(num) {
    const arrowMap = {
        1: "↑",
        2: "↗",
        3: "→",
        4: "↘",
        5: "↓",
        6: "↙",
        7: "←",
        8: "↖"
    };

    return arrowMap[num] || "";
}

function NumpadToArrow(num) {
    const arrowMap = {
        8: "↑",
        9: "↗",
        6: "→",
        3: "↘",
        2: "↓",
        1: "↙",
        4: "←",
        7: "↖"
    };

    return arrowMap[num] || "";
}


function countToHex(count) {
    var output = startRNG;
    for (var i = 0; i < count; i++) {
        output = advanceRNG(output, 1);
    }
    return output;
}

function countToDecimal(count) {
    return twoHexToDecimal(countToHex(count));
}


//Compares six numbers...
//"funct" is the function that is going to be used when comparing the numbers
//Typically "hexToStarDirection" is used here, but the option is there to allow for flexibility
//Multiplier will depend on the function that is being done. This is mainly for KSS calculations as KDL2 only does single RNG advances.
function compareSixNumbers(num1, num2, num3, num4, num5, num6, hex, startCount, endCount, funct, multiplier) {

    //Make sure that the numbers input do not go outside the min and max rng counts
    if (startCount < 0)
        startCount = 0;
    
    if (endCount > 65536)
        endCount = 65536;

    let num = [num6, num5, num4, num3, num2, num1];
    let countList = [];
    let hexList = [];
    let amount = 6;
    var count = startCount;
    hits = 0;
    let rngWindow = Array(6 * multiplier).fill(0);
    let checkNum = Array(6).fill(false);
    let tempHexList = Array(6 * multiplier).fill(0);
    let hasValues = false;

    //Check every number to see if there is a value assigned to it
    //If there is not a value assigned, checkNum[i] will be set to true so that it is always true when numbers are checked for allTrue.
    for (var i = 0; i < 6; i++) {
        if (num[i].length != 0) {
            checkNum[i] = true;
        }
    }

    for (var i = 0; i < 6; i++) {
        if (checkNum[i] == true){
            hasValues = true;
            break;
        } else {
            amount = (6 - (i + 1));
        }
    }

    // If there are no numbers put into the calculator, return
    if (!hasValues)
        return;
    
    while (count < endCount) {
        count++;
        let doMatch = Array(6).fill(false);
        
        hex = advanceRNG(hex, 1);
        tempHexList.unshift(hex);
        tempHexList.pop();

        var num1 = hex.slice(2); //note that this slice is NOT the same as the KSS one, do not get this confused with the KSS program. KSS does slice(0, 2).

        rngWindow.unshift(funct(num1));
        rngWindow.pop();

        for (var i = 0; i < 6; i++) {
            if ((checkNum[i] == false) || (rngWindow[i * multiplier] == num[i])) {
                doMatch[i] = true;
            }
        }

        if (allAreTrue(doMatch) && (count > (6 - amount))) {
            countList.push(count - ((6 - amount) * multiplier));
            hexList.push(tempHexList[((6 - amount) * multiplier)]);
            hits++;
        }
    }
    return [hexList, countList, amount];
}


function findCooBag(hex) {
    hex = advanceRNG(hex, 2); //advance 1 cuz we need to be ahead one for the check, advance another for corpse kill
    var jumps = -1;
    var animalFriend = -1;
    while (animalFriend != 1) {
        animalFriend = determineSimpleBag(hex);
        console.log(animalFriend);
        hex = advanceRNG(hex, 1);
        jumps++;
    }
    return jumps;
}