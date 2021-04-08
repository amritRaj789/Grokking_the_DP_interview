// KNAPSACK PROBLEM

/*Given two integer arrays to represent weights and profits of ‘N’ items, we need to find a subset 
of these items which will give us maximum profit such that their cumulative weight is not more 
than a given number ‘C’. Each item can only be selected once, which means either we put an item 
in the knapsack or skip it.
*/
// simple recursive
let solveKnapsack = function(profits, weights, capacity) {

	function recursive (i, capacity){
		if(i >= profits.length || capacity <= 0)
			return 0
		else{
			let profit = 0;
			if(capacity-weights[i] >= 0)
				profit = profits[i];
			return Math.max(recursive(i+1, capacity-weights[i]) + profit, recursive(i+1, capacity));
		}
	}
	return recursive(0, capacity);
};

// top down DP with memoization
let solveKnapsack = function (profits, weights, capacity){
	let memo = [];
	function recursive (i, capacity){
		if(memo[i] !== undefined && memo[i][capacity] !== undefined)
			return memo[i][capacity]
		if(i >= profits.length || capacity <= 0){
			if(memo[i] === undefined)
				memo[i] = [];
			memo[i][capacity] = 0;
		}
		else{
			let profit = 0;
			if(capacity-weights[i] >= 0)
				profit = profits[i]
			if(memo[i] === undefined)
				memo[i] = [];
			memo[i][capacity] = Math.max(recursive(i+1, capacity-weights[i]) + profit, recursive(i+1, capacity));
		}
		return memo[i][capacity];
	}
	return recursive(0, capacity);
}
// we will not have more than N*C sub-problems, so time complexity is O(N*C)
// we will use O(N*C) space for the memoization array. And O(N) space for the recursion stack
// So the total space complexity will be equal to O(N*C)


// Bottom Up with DP
const solveKnapsack = function (profits, weights, capacity){
	let dp = new Array(profits.length);
	for(let i = 0; i < profits.length; i++){
		dp[i] = new Array(capacity+1).fill(0);
	}
	for(let c = 1; c <= capacity; c++){
		if(c >= weights[0])
			dp[0][c] = profits[0];
	}
	for(let i = 1; i < profits.length; i++){
		for(let c = 1; c <= capacity; c++){
			if(c >= weights[i]){
				dp[i][c] = Math.max(profits[i]+dp[i-1][c-weights[i]], dp[i-1][c])
			}
			else
				dp[i][c] = dp[i-1][c];
		}
	}
	return dp[profits.length-1][capacity];
}
// time and space complexity of O(N*C)

// Finding the selected items
// Incomplete. I am too bored right now to do this one. I have understood the logic behind it though.


const solveKnapsack = function (profits, weights, capacity){
	let dp = new Array(2);
	for(let i = 0; i < 2; i++){
		dp[i] = new Array(capacity+1).fill(0);
	}
	for(let c = 1; c <= capacity; c++){
		if(c >= weights[0])
			dp[0][c] = profits[0];
	}
	for(let i = 1; i < profits.length; i++){
		for(let c = 1; c <= capacity; c++){
			if(c >= weights[i]){
				dp[1][c] = Math.max(profits[i]+dp[0][c-weights[i]], dp[0][c])
			}
			else
				dp[1][c] = dp[0][c];
		}
		// Copying dp1 to dp0
		for(let c = 1; c <= capacity; c++)
			dp[0][c] = dp[1][c];
	}
	return dp[1][capacity];
}
// the space complexity is now O(2C)



// We can even optimize this further by eliminating copying of array but instead storing alternatively
// e.g, calculating dp1, use dp0, calculating dp2, use dp1 and store it in dp0, calculating dp3 use dp0, calculating dp4 use dp1 and so on ....


const solveKnapsack = function (profits, weights, capacity){
	let dp = new Array(2);
	for(let i = 0; i < 2; i++)
		dp[i] = new Array(capacity+1).fill(0);
	for(let c = 1; c <= capacity; c++){
		if(c >= weights[0])
			dp[0][c] = profits[0];
	}
	for(let i = 1; i < profits.length; i++){
		for(let c = 1; c <= capacity; c++){
			if(c >= weights[i]){
				dp[i%2][c] = Math.max(profits[i]+dp[(i-1)%2][c-weights[i]], dp[(i-1)%2][c])
			}
			else
				dp[i%2][c] = dp[(i-1)%2][c];
		}
	}
	return dp[(profits.length-1)%2][capacity];
}



// There is an even more optimized version of this

let solveKnapsack = function(profits, weights, capacity) {
  const n = profits.length;
  if (capacity <= 0 || n == 0 || weights.length != n) return 0;

  const dp = Array(capacity + 1).fill(0);

  // if we have only one weight, we will take it if it is not more than the capacity
  for (let c = 0; c <= capacity; c++) {
    if (weights[0] <= c) dp[c] = profits[0];
  }

  // process all sub-arrays for all the capacities
  for (let i = 1; i < n; i++) {
    for (let c = capacity; c >= 0; c--) {
      let profit1 = 0,
        profit2 = 0;
      // include the item, if it is not more than the capacity
      if (weights[i] <= c) profit1 = profits[i] + dp[c - weights[i]];
      // exclude the item
      profit2 = dp[c];
      // take maximum
      dp[c] = Math.max(profit1, profit2);
    }
  }

  // maximum profit will be at the bottom-right corner.
  return dp[capacity];
};