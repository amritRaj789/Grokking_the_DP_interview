// LONGEST COMMON SUBSTRING

// recursive brute-force
let findLCSLength = function (s1, s2){
	function recursive(index1, index2, count){
		if(index1 === s1.length || index2 === s2.length)
			return count;
		if(s1[index1] === s2[index2])
			count = recursive(index1+1, index2+1, count+1);
		return Math.max(count, recursive(index1+1, index2, 0), recursive(index1, index2+1, 0));
	}
	return recursive(0, 0, 0);
}
// O(3^(m+n)) t, O(M+N) s


// recursion with memoization
let findLCSLength = function (s1, s2){
	let hash = {};
	function recursive(index1, index2, count){
		if(index1 === s1.length || index2 === s2.length)
			return 0;
		let key = index1 + "|" + index2 + "|" + count;
		if(!(key in hash)){
			if(s1[index1] === s2[index2]){
				count = recursive(index1+1, index2+1, count+1);
			}
			hash[key] = Math.max(count, recursive(index1+1, index2, 0), recursive(index1, index2+1, 0));
		}
		return hash[key]
	}
	return recursive(0,0,0);
}

// bottom up DP
let findLCSLength = function(s1, s2){
	let dp = Array(s1.length+1).fill(null).map(() => Array(s2.length+1).fill(0));
	let max = 0;
	for(let i = 1; i <= s1.length; i++){
		for(let j = 1; j <= s2.length; j++){
			if(s1[i-1] === s2[j-1]){
				dp[i][j] = 1 + dp[i-1][j-1];
				max = Math.max(max, dp[i][j]);
			}
		}
	}
	return max;
}
// O(m*n) time and space solution
// fuck yeah!! my solution is exactly similar to educative's


// bottom up with space optimized to O(n)
const findLCSLength = function(s1, s2) {
  const dp = Array(2)
    .fill(0)
    .map(() => Array(s2.length + 1).fill(0));

  let maxLength = 0;
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      dp[i % 2][j] = 0;
      if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
        dp[i % 2][j] = 1 + dp[(i - 1) % 2][j - 1];
        maxLength = Math.max(maxLength, dp[i % 2][j]);
      }
    }
  }
  return maxLength;
};


// LONGEST COMMON SUBSEQUENCE



// basic brute-force, recursive
let findLCSLength = function (s1, s2){
	function recursive(index1, index2){
		if(index1 === s1.length || index2 === s2.length)
			return 0
		if(s1[index1] === s2[index2])
			return 1 + recursive(index1+ 1, index2+1);
		else
			return Math.max(recursive(index1+1, index2), recursive(index1, index2+1));
	}
	return recursive(0, 0);
}

// top down with memoization
let findLCSLength = function (s1, s2){
	let memo = [];
	function recursive(index1, index2){
		if(index1 === s1.length || index2 === s2.length)
			return 0
		memo[index1] = memo[index1] || [];
		if(memo[index1][index2] === undefined){
			if(s1[index1] === s2[index2])
				memo[index1][index2] = 1 + recursive(index1+1, index2+1);
			else
				memo[index1][index2] = Math.max(recursive(index1+1, index2), recursive(index1, index2+1));
		}
		return memo[index1][index2];
	}
	return recursive(0, 0);
}

// bottom up DP
let findLCSLength = function (s1, s2){
	let dp = Array(s1.length+1).fill(null).map(() => Array(s2.length+1).fill(0));
	for(let i = 1; i <= s1.length; i++){
		for(let j = 1; j <= s2.length; j++){
			if(s2[j-1] === s1[i-1])
				dp[i][j] = 1 + dp[i-1][j-1];
			else
				dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
		}
	}
	return dp[s1.length][s2.length];
}

// bottom up DP with space optimization
let findLCSLength = function (s1, s2){
	let dp = Array(2).fill(null).map(() => Array(s2.length+1).fill(0));
	for(let i = 1; i <= s1.length; i++){
		for(let j = 1; j <= s2.length; j++){
			if(s2[j-1] === s1[i-1])
				dp[i%2][j] = 1 + dp[(i+1)%2][j-1];
			else
				dp[i%2][j] = Math.max(dp[(i+1)%2][j], dp[i%2][j-1]);
		}
	}
	return dp[s1.length%2][s2.length];
}






// Minimum insertions and deletions to transform a string to another


// Given strings s1 and s2, we need to transform s1 into s2 by deleting and inserting characters. 
// Write a function to calculate the count of the minimum number of deletion and insertion operations.



// This is similar to Longest Common Subsequence. We find LCS length and use it calculate deletion and insertion count

// bottom up DP
let findMDI = function (s1, s2){
	let dp = Array(2).fill(null).map(() => Array(s2.length+1).fill(0));
	for(let i = 1; i <= s1.length; i++){
		for(let j = 1; j <= s2.length; j++){
			if(s1[i-1] === s2[j-1])
				dp[i%2][j] = 1 + dp[(i+1)%2][j-1];
			else
				dp[i%2][j] = Math.max(dp[(i+1)%2][j], dp[i%2][j-1]);
		}
	}
	let length = dp[s1.length%2][s2.length];
	let deletions = s1.length >= s2.length ? s1.length-length : s2.length-length;
	let insertions = s1.length >= s2.length ? s2.length-length : s1.length-length;
	console.log(`Minimum deletions needed : ${deletions}`);
	console.log(`Minimum insertions needed : ${insertions}`);
}


// Longest Increasing Subsequence

/*Given a number sequence, find the length of its Longest Increasing Subsequence (LIS). 
In an increasing subsequence, all the elements are in increasing order (from lowest to highest).*/



// recursive brute-force
const findLISLength = function(nums){
	function recursive(currentIndex, previousIndex){
		if(currentIndex === nums.length)
			return 1;
		if(nums[currentIndex] > nums[previousIndex])
			return 1 + recursive(currentIndex+1, currentIndex)
		else
			return Math.max(recursive(currentIndex+1, currentIndex), recursive(currentIndex+1, previousIndex))
	}
	return recursive(1, 0);
}

// top down with memoization
const findLISLength = function (nums){
	let memo = [];
	function recursive(currentIndex, previousIndex){
		if(currentIndex === nums.length)
			return 1;
		memo[currentIndex] = memo[currentIndex] || [];
		if(memo[currentIndex][previousIndex] === undefined){
			if(nums[currentIndex] > nums[previousIndex])
				memo[currentIndex][previousIndex] = 1 + recursive(currentIndex+1, currentIndex);
			else
				memo[currentIndex][previousIndex] = Math.max(recursive(currentIndex+1, currentIndex), recursive(currentIndex+1, previousIndex));
		}
		return memo[currentIndex][previousIndex];
	}
	return recursive(1, 0);
}
// bottom up DP
const findLISLength = function (nums){
	let dp = Array(nums.length).fill(1);
	let maxLength = 1;
	for(let i = 1; i < nums.length; i++){
		for(let j = 0; j < i; j++){
			if(nums[i] > nums[j])
				dp[i] = Math.max(dp[i], 1+dp[j])
		}
		maxLength = Math.max(maxLength, dp[i]);
	}
	return maxLength;
}
