const greaterThan=()=>{
let numbers = [2, 7, 4, 9, 1];
 let count = 0;
  for (let i = 0; i < numbers.length; i++) {
     if( numbers[i] >5) count=count+1
     } 

     console.log(count);
    }



    const largest=()=>{
        let numbers = [3, 9, 1, 6];
        let max = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if(numbers[i]>max) max=numbers[i]
}

return max
    }


    const smallest = () => {
  let numbers = [5, 3, 8, 2];
  let min = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if(numbers[i]<min) min=numbers[i]
  }

  return min;
};

console.log(smallest());


const countEv=()=>{
  let numbers = [2, 5, 6, 9, 10];
  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
    if(numbers[i] % 2 === 0) count++
  }

  return count;
};

console.log(countEv());


const countGreaterThan = (numbers, x) => {
  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
    if(numbers[i]>x) count++
  }

  return count;
};

console.log(countGreaterThan([1, 6, 3, 8, 2], 4));

const sumGreaterThan = (numbers, x) => {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    if(numbers[i]>x) sum=sum+numbers[i]
  }

  return sum;
};

console.log(sumGreaterThan([1, 6, 3, 8, 2], 4));