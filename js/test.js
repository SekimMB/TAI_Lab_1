let numbers=Array.from(new Array(10),(val, index)=>index+1);
let result='';
for(let i of numbers) {
    for(let j of numbers) {
        result+=i*j+'\t'
    }
    result+='\n'
}
console.log(result);