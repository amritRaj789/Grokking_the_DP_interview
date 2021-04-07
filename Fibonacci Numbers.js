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
