var removeElement = function(nums, val) {

    let k=0;

    for(let i=0;i<nums.length;i++){
        if(nums[i] !== val) {
            nums[k]=nums[i]
            k++
    }
    }
    return k
    
};

//////////////////////////////////////////////////

var longestCommonPrefix = function(strs) {

    if(strs.length==="") return ""
    let prefix=""
    for(let i=0;i<strs[0].length;i++){
        let currentChar=strs[0][i]
        for(let j=1;j<strs.length;j++){
            if(i>=strs[j].length || strs[j][i] !== currentChar) return prefix
        }
            prefix=prefix+currentChar
    }

    return prefix
    
};

/////////////////////////////////////////