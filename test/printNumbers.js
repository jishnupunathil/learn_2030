const a=[1,2,3,4,5]

const printNumber=(a)=>{

    for(let i=0;i<=a.length-1;i++){

        console.log(a[i])

    }
}

printNumber(a)


const sumOfNumber=()=>{

  let sum=0
  const a=[20,6,234,78,3,1]

  for (let i=0;i<=a.length-1;i++){
    sum=sum+a[i]
  }
  
  console.log(sum)
}


sumOfNumber()

const findLarg=()=>{
  let b=[4,45,34,678,2124124]
  let larger=0
  for(let i=0;i<b.length;i++){
    if(b[i]>larger) larger=b[i]
  }

  console.log(larger)
}

findLarg()

const evenNum=()=>{

    let b=[4,45,34,67,21,36]
    let evenCount=0
    let oddCount=0

    for(i=0;i<b.length;i++){
      if(b[i] % 2 === 0) evenCount=evenCount+1
      else oddCount=oddCount+1
    }
     console.log('evenCount:'+evenCount)
     console.log('oddCount:'+oddCount)

}
 evenNum()


 const revArr=()=>{
  
    const b=[4,45,34,67,21,36]
    const array=[]

    for(let i=b.length-1;i>=0;i--){
       array.push(b[i])
    }

    console.log(array)
 }

 revArr()


 const checkIfnumExist=(num)=>{
  const b=[4,45,34,67,21,36]

  for(let i=0;i<b.length;i++){
    if (b[i]===num) return true
    
  }
  return false
 }

 console.log(checkIfnumExist(324))