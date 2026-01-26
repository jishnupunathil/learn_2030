const expenses = [
  { title: "Burger", amount: 215, category: "Food" },
  { title: "Bus Ticket", amount: 223, category: "Travel" },
  { title: "Groceries", amount: 202, category: "Food" }
];


const showExpenses = (arr) => {
  for (let i = 0; i < arr.length; i++) {
  console.log(
      `${arr[i].title} - €${arr[i].amount} (${arr[i].category})`
    );
}
};

showExpenses(expenses)


const calcTotal=(arr)=>{
    let total=0
    for(let i=0;i<arr.length;i++){
        total=total+arr[i].amount
    }

    console.log(total)
}

calcTotal(expenses)

const highExp=(arr)=>{

    let highExpe=0

    for(let i=0;i<arr.length;i++){

        if(arr[i].amount>highExpe) highExpe=arr[i].amount
        
    }

    console.log(highExpe)
}

highExp(expenses)

const FiterExp=(arr,catogory)=>{

    let result=[]

    for(let i=0;i<arr.length;i++){

        if(arr[i].category ===  catogory) result.push(arr[i])
        
    }

    console.log(result)
}

FiterExp(expenses,'Travel')

