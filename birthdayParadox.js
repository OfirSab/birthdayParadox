/* 

For run the file write "npm codeTask.js"
The answers will log to the console.
In the bottom can change the parameters.

*/
const birthDayChanceByRuns = (noPeople,runs)=>{
    let total = 0;
    let success = 0;
    let percents = 0;
    let isNotUnique = 0;
    let people = [];
    const getRandom365 = () => Math.floor(Math.random() * (365)) + 1; //Random number from 1 to 365
    while(runs!=0){
        people = [...Array(noPeople)].map(() => getRandom365()); // Random array of number as a number of people
        isNotUnique = people.some((it, i, arr) => ~arr.indexOf(it, i + 1)); // True if at least two people with the same birthday
        success = success + isNotUnique;
        total++;
    
        percents = (success / total).toFixed(3);
        runs--;
    }
    console.log(`Given ${noPeople} people, the chance of a shared birthday is ${percents}.`);
}
const birthDayChanceByAccuracy = (noPeople,accuracy)=>{
    let total = 0;
    let success = 0;
    let percents = 0;
    let isNotUnique = 0;
    let people = [];
    const getRandom365 = () => Math.floor(Math.random() * (365)) + 1; //Random number from 1 to 365
    let fix = Math.log10(1/(accuracy%1)) // Turn the accurancy to an integer number accordance the n.o zero
    let formula = birthDayChanceFormula(noPeople)
    while(!(percents >= formula-accuracy && percents <= formula+accuracy)){ // Check the percents to the accurancy ~
        people = [...Array(noPeople)].map(() => getRandom365()); // Random array of number as a number of people
        isNotUnique = people.some((it, i, arr) => ~arr.indexOf(it, i + 1)); // True if at least two people with the same birthday
        success = success + isNotUnique;
        total++;
        percents = (success / total);
    }
    console.log(`Given ${noPeople} people, the chance of a shared birthday is ${percents.toFixed(fix)}.`);
}

const birthDayChanceFormula = (people) => {
    notSharing = 1
    for (let i=1 ; i < people ; i++){
        notSharing *= ( 1 - (i / 365))
        result = (1 - notSharing)
    }
    return result
}


birthDayChanceByRuns(23,500)
birthDayChanceByAccuracy(23,0.001)
