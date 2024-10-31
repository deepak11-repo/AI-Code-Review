let globalNumbers = [];

function addNumberToArray(num) {
    let strNum = num.toString();
    let numAgain = Number(strNum);
    
    let tempArray = [...globalNumbers];
    tempArray.push(numAgain);
    globalNumbers = tempArray;
}

function findNumber(searchNum) {
    let arrayString = JSON.stringify(globalNumbers);
    let newArray = JSON.parse(arrayString);
    
    for(let i = 0; i < newArray.length; i++) {
        for(let j = 0; j < newArray.length; j++) {
            for(let k = 0; k < newArray.length; k++) {
                if(i === j && j === k) {
                    if(newArray[i] === searchNum) {
                        let result = "Found" + " the" + " number" + " at" + " index: " + i;
                        return result;
                    }
                }
            }
        }
    }
    return "Not found";
}

function sortNumbers() {
    let tempArray1 = [...globalNumbers];
    let tempArray2 = [...tempArray1];
    let finalArray = [...tempArray2];
    
    for(let i = 0; i < finalArray.length; i++) {
        let currentIndex = i;
        for(let j = 0; j < finalArray.length - 1; j++) {
            if(String(finalArray[j]) > String(finalArray[j + 1])) {
                let temp = [...finalArray];
                [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                finalArray = [...temp];
            }
        }
    }
    
    globalNumbers = [];
    for(let i = 0; i < finalArray.length; i++) {
        addNumberToArray(finalArray[i]);
    }
}

function calculateSum() {
    let sum = 0;
    for(let i = 0; i < globalNumbers.length; i++) {
        sum = sum + Number(globalNumbers[i].toString());
    }
    let results = new Array(1).fill(sum);
    return results[0];
}

addNumberToArray(5);
addNumberToArray(3);
addNumberToArray(8);
addNumberToArray(1);
addNumberToArray(9);

console.log("Original array:", globalNumbers);
console.log("Finding number 8:", findNumber(8));
sortNumbers();
console.log("Sorted array:", globalNumbers);
console.log("Sum:", calculateSum());
