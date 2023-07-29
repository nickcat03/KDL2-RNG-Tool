
// Program made by Nippo, with the help of まどら (WaddleDX) and their KDL2 RNG documentation.
// This file's primary purpose is to simulate KDL2 RNG functions / calculations.

// This function is for calculating RNG and is basically the heart of the entire program
function advanceRNG (rng, advances) {
    for (let i = 0; i < advances; i++) {
        //Converting numbers for RNG calculation
        hexString = rng.toString(); //in case the input number is an integer, convert it to string

        //Splice numbers for calculation. For some reason the hex being input need to be flipped.
        num1String = hexString.charAt(0) + hexString.charAt(1);
        num2String = hexString.charAt(2) + hexString.charAt(3);

        //Convert the number to decimal from the hexadecimal string
        rng = parseInt(num2String + num1String, 16);

        //RNG calculation
        rng = rng * 0x5 + 0x3711 % 0x10000;

        //Convert to back to hexadecimal
        hexString = rng.toString(16);
        var len = hexString.length;

        //the purpose of len here is if the length of the calculation is greater than 4. This only uses the last four digits.
        num2String = hexString.charAt(len - 4) + hexString.charAt(len - 3); //first digit + second digit
        num1String = hexString.charAt(len - 2) + hexString.charAt(len - 1); //third digit + fourth digit

        rng = num1String + num2String; //Add the two strings together for final output
    }
    return rng;
}

// Function for calculating landing star direction
function hexToStarDirection(x) {
    const decimalValue = hexToDecimal(x);
    const ranges = [
        [0, 31],
        [32, 63],
        [64, 95],
        [96, 127],
        [128, 159],
        [160, 191],
        [192, 223],
        [224, 255]
    ];

    for (let i = 0; i < ranges.length; i++) {
        const [start, end] = ranges[i];
        if (isBetween(decimalValue, start, end)) {
        return i + 1;
        }
    }

    return 0;
}

//Determine which animal friend comes out of the bag (out of the three main animal friends)
function determineSimpleBag (hex) {
    const decimalValue = hexToDecimal(hex.slice(2));
    console.log(decimalValue);
    if (isBetween(decimalValue, 0, 113)) {
        return 0; //Rick
    } else if (isBetween(decimalValue, 171, 255)) {
        return 1; //Coo
    } else if (isBetween(decimalValue, 114, 170)) {
        return 2; //Kine
    } else {
        return -1; //Error
    }
}