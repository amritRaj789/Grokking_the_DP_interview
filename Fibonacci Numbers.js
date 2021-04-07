// Pattern 3: Fibonacci Sequence

// Fibonacci

//simple recursive
const calculateFibonacci = function (n){
	if(n < 2)
		return n
	return calculateFibonacci(n-1) + calculateFibonacci(n-2);
}

//top-down Dynamic Programming with memoization
const calculateFibonacci = function (n){
	const memo = [];
	memo[0] = 0;
	memo[1] = 1;
	function help(n){
		if(memo[n])
			return memo[n];
		else{
			memo[n] = help(n-1) + help(n-2);
			return memo[n];
		}
	}
	return help(n);
}

// Bottom up Dynamic Programming
const calculateFibonacci = function (n){
	let dp = new Array(n+1);
	dp[0] = 0;
	dp[1] = 1;
	for(let i = 2; i <= n; i++){
		dp[i] = dp[i-1] + dp[i-2];
	}
	return dp[n];
}
// This is the most efficient has time complexity of O(n);
// We can optimize the memory even further as we don't need all numbers

const calculateFibonacci = function (n){
	if(n < 2)
		return n;
	let dp = [0, 1];
	for(let i = 2; i <= n; i++){
		temp = dp[0] + dp[1];
		dp[0] = dp[1];
		dp[1] = temp;
	}
	return dp[1];
}
// this now has constant space complexity.










// Staircase
/*Given a stair with ‘n’ steps, implement a method to count how many possible ways are there 
to reach the top of the staircase, given that, at every step you can either take 1 step, 2 steps, or 3 steps.
*/

// Recursive
const CountWays = function (n){
	if(n === 0)
		return 1
	if(n <= 2)
		return n
	return CountWays(n-1) + CountWays(n-2) + CountWays(n-3);
}

// time complexity: O(3^n)
// space complexity : O(n)


// top down DP with memoization
const CountWays = function (n){
	const memoized = [1,1,2];
	function count (n){
		if(memoized[n])
			return memoized[n]
		memoized[n] = count(n-1) + count(n-2) + count(n-3);
		return memoized[n];
	}
	return count(n);
}
// O(n) and O(n)

// bottom up Dp
const CountWays = function (n){
	let dp = new Array(n+1).fill(0);
	dp[0] = 1;
	dp[1] = 1;
	dp[2] = 2;
	for(let i = 3; i <= n; i++){
		dp[i] = dp[i-1] + dp[i-2] + dp[i-3];
	}
	return dp[n];
}

// bottom up DP with memory optimization
const CountWays = function(n){
	if(n < 2)
		return 1
	if(n == 2)
		return 2
	let d0 = 1;
	let d1 = 1;
	let d2 = 2;
	for(let i = 3; i <= n; i++){
		temp = d0 + d1 + d2;
		d0 = d1;
		d1 = d2;
		d2 = temp;
	}
	return d2;
}
// O(n) + O(1)









// NUMBER FACTORS

/*Given a number ‘n’, implement a method to count how many possible ways there are to express 
‘n’ as the sum of 1, 3, or 4.*/


/*dp[n] = dp[n-1] + dp[n-3] + dp[n-4]
upto dp[3]
dp[0] = 1
dp[1] = 1
dp[2] = 1
dp[3] = 2
*/

// recursive

const CountWays = function (n){
	if(n <= 2)
		return 1;
	if(n === 3)
		return 2;
	return CountWays(n-1) + CountWays(n-3) + CountWays(n-4);
}

// top down DP with Memoization

const CountWays = function (n){
	const memo = [1,1,1,2];
	function help(n){
		if(memo[n])
			return memo[n];
		memo[n] = help(n-1) + help(n-3) + help(n-4);
		return memo[n];
	}
	return help(n);
}

// bottom up Dynamic Programming
const CountWays = function (n){
	let dp = new Array(n+1)
	dp[0] = 1;
	dp[1] = 1;
	dp[2] = 1;
	dp[3] = 2;
	for(let i = 4; i <= n; i++){
		dp[i] = dp[i-1] + dp[i-3] + dp[i-4];
	}
	return dp[n];
}

// bottom up Dynamic Programming with memory optimization
const CountWays = function (n){
	if(n <= 2)
		return 1
	if(n === 3)
		return 2
	let dp0 = 1;
	let dp1 = 1;
	let dp2 = 1;
	let dp3 = 2;
	for(let i = 4; i <= n; i++){
		temp = dp0 + dp1 + dp3;
		dp0 = dp1;
		dp1 = dp2;
		dp2 = dp3;
		dp3 = temp;
	}
	return dp3;
}




// MINIMUM JUMPS TO REACH THE END

/*Given an array of positive numbers, where each element represents the 
max number of jumps that can be made forward from that element, write a program to find the minimum number of jumps 
needed to reach the end of the array (starting from the first element). If an element is 0, then we cannot move through that element.*/

// recursive

const countMinJumps = function (jumps){
	function recursive (i){
		if(jumps[i] === 0)
			return null;
		if(jumps[i] + i >= jumps.length-1)
			return 1
		else{
			let min = +Infinity;
			let max = jumps[i];
			while(max > 0){
				let value = recursive(i+max);
				if(value){
					min = Math.min(min, value);
				}
				max--;
			}
			return min+1;
		}
	}
	return recursive(0);
}

// top down DP with memoization
const countMinJumps = function (jumps){
	let dp = new Array(jumps.length);
	dp[jumps.length-1] = 0;
	function help(i){
		if(dp[i])
			return dp[i];
		if(jumps[i] === 0){
			dp[i] = null;
			return dp[i];
		}
		if(jumps[i] + i >= jumps.length-1){
			dp[i] = 1;
			return dp[i];
		}
		else{
			let max = jumps[i];
			let min = +Infinity;
			while(max > 0){
				let value = help(i+max);
				if(value)
					min = Math.min(value, min);
				max++;
			}
			dp[i] = min+1;
			return dp[i];
		}
	}
	return help(0);
}

// Bottom-up Dynamic Programming
const countMinJumps = function (jumps){
	const dp = new Array(jumps.length);
	let start = 0;
	let end = jumps[0];
	let steps = 1;
	while(start < jumps.length){
		let currentMax = 0;
		for(let i = start+1; i <= end && i < jumps.length; i++){
			currentMax = Math.max(currentMax, jumps[i]+i);
			dp[i] = steps;
		}
		steps++;
		start = end;
		end = currentMax;
	}
	return dp[jumps.length-1];
}
// O(n) time and space complexity