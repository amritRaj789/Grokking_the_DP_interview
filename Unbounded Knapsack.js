/*Given the weights and profits of āNā items, 
we are asked to put these items in a knapsack that has a capacity āCā. 
The goal is to get the maximum profit from the items in the knapsack. 
The only difference between the 0/1 Knapsack problem and this problem is 
that we are allowed to use an unlimited quantity of an item.*/

/*now at every item at i, we earlier had 2 options: include or exclude
now we can
1) include the item and stay there
2) include the item and move forward
3) exclude the item and move forward
*/
// basic recursion
let solveKnapsack = function(profits, weights, capacity) {
    function recursive(weight, i){
    	count++;
    	if(weight <= 0 || i === profits.length)
    		return 0;
    	let profit = weight >= weights[i] ? profits[i] : 0;
    	return Math.max(recursive(weight, i+1), recursive(weight-weights[i], i+1)+profit, recursive(weight-weights[i], i)+profit);
    }
    return recursive(capacity, 0);
};
// this may look short, but it is too costly.

//other way
let solveKnapsack = function(profits, weights, capacity) {
    function recursive(weight, i){
    	if(weight === 0 || i === profits.length)
    		return 0;
    	let profit1 = 0;
    	if(weight >= weights[i]){
    		profit1 = recursive(weight-weights[i], i) + profits[i];
    	}
    	let profit2 = recursive(weight, i+1);
    	return Math.max(profit1, profit2);
    }
    return recursive(capacity, 0);
};

// top down with memoization
let solveKnapsack = function(profits, weights, capacity) {
    let memo = [];
    let count = 0;
    function recursive(weight, i){
    	count++;
    	if(weight === 0 || i === profits.length)
    		return 0;
    	if(memo[i] !== undefined && memo[i][weight] !== undefined)
    		return memo[i][weight];
    	let profit1 = 0;
    	if(weight >= weights[i]){
    		profit1 = recursive(weight-weights[i], i) + profits[i];
    	}
    	let profit2 = recursive(weight, i+1);
    	memo[i] = memo[i] || [];
    	memo[i][weight] = Math.max(profit1, profit2);
    	return memo[i][weight];
    }
    let answer = recursive(capacity, 0);
    console.log("the function ran for : ", count);
    return answer;
};
var profits = [15, 50, 60, 90];
var weights = [1, 3, 4, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 8)}`);

//bottom up DP
let solveKnapsack = function (profits, weights, capacity){
	let dp = Array(profits.length).fill(null).map(() => Array(capacity+1).fill(0));
	for(let s = 1; s <= capacity; s++){
		if(s >= weights[0])
			dp[0][s] = profits[0]+dp[0][s-weights[0]];
	}
	for(let i = 1; i < profits.length; i++){
		for(let s = 1; s <= capacity; s++){
			dp[i][s] = dp[i-1][s];
			if(weights[i] <= s){
				dp[i][s] = Math.max(dp[i-1][s], dp[i][s-weights[i]]+profits[i]);
			}
		}
	}
	return dp[profits.length-1][capacity];
}
// O(N*C)











// ROD CUTTING

/*Given a rod of length ānā, we are asked to cut the rod and sell the pieces in a way that will maximize the profit. 
We are also given the price of every piece of length āiā where ā1 <= i <= nā.*/

// simple recursive
const solveRodCutting = function (lengths, prices, n){
	let max = 0;
	function recursive(length, profit){
		if(length === 0){
			max = Math.max(max, profit);
			return
		}
		let temp = 1;
		while(temp <= length){
			recursive(length-temp, profit+prices[temp-1]);
			temp++;
		}
	}
	recursive(n, 0);
	return max;
}
// bottom top DP
const solveRodCutting = function (lengths, prices, n){
	let dp = Array(n).fill(null).map(() => Array(n+1).fill(0));
	for(let i = 1; i <= n; i++){
		dp[0][i] = i*prices[0];
	}
	for(let i = 1; i < n; i++){
		for(let length = 1; length <= n; length++){
			if(length >= i+1){
				dp[i][length] = Math.max(dp[i][length-i-1]+prices[i], dp[i-1][length]);
			}
			else
				dp[i][length] = dp[i-1][length];
		}
	}
	return dp[n-1][n];
}

// even more concise dp with O(n) space complexity
const solveRodCutting = function (lengths, prices, n){
	let dp = Array(n+1).fill(0);
	for(let i = 0; i < n; i++){
		for(let length = 1; length <= n; length++){
			if(length >= i+1)
				dp[length] = Math.max(dp[length-i-1]+prices[i], dp[length])
		}
	}
	return dp[n];
}

// Coin Change
/*Given an infinite supply of ānā coin denominations and a total money amount, 
we are asked to find the total number of distinct ways to make up that amount.
*/
// simple recursive
let countChange = function (denominations, total){
	let count = 0;
	function recursive(i, total){
		count++;
		if(total === 0)
			return 1
		if(i === denominations.length)
			return 0;
		return recursive(i+1, total) + (total >= denominations[i] ? recursive(i, total-denominations[i]) : 0);
	}
	let answer = recursive(0, total);
	console.log("the function ran for : ", count);
	return answer;
}
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);


// top down with memoization
let countChange = function (denominations, total){
	let count = 0;
	let memo = [];
	function recursive(i, total){
		count++;
		if(total === 0)
			return 1
		if(i === denominations.length)
			return 0;
		if(memo[i] !== undefined && memo[i][total] !== undefined)
			return memo[i][total];
		memo[i] = memo[i] || [];
		memo[i][total] = recursive(i+1, total) + (total >= denominations[i] ? recursive(i, total-denominations[i]) : 0);
		return memo[i][total];
	}
	let answer = recursive(0, total);
	console.log("the function ran for : ", count);
	return answer;
}
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);


// bottom up DP
// I have directly written the most optimized one because I am so damn confident
let countChange = function (denominations, total){
	let dp = Array(total+1).fill(0);
	dp[0] = 1;
	for(let i = 0; i < denominations.length; i++){
		for(let s = 1; s <= total; s++){
			if(denominations[i] <= s)
				dp[s] += dp[s-denominations[i]];
		}
	}
	return dp[total];
}
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);













// Minimum Coin Change
/*Given an infinite supply of ānā coin denominations and a total money amount, we are asked 
to find the minimum number of coins needed to make up that amount.*/




// simple recursive, It is both mine and Educative also does the same
let countChange = function (denominations, total){
	let count = 0;
	function recursive (i, total, length){
		count++;
		if(total === 0)
			return length;
		if(i === denominations.length)
			return +Infinity;
		if(total >= denominations[i])
			return Math.min(recursive(i, total-denominations[i], length+1), recursive(i+1, total, length));
		else
			return recursive(i+1, total, length);
	}
	let answer = recursive(0, total, 0);
	console.log("the function ran for : ", count);
	if(answer === +Infinity)
		return -1
	return answer;
}
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`); //41 times
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 11)}`); //197 times
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 7)}`);  //77 times
console.log(`Number of ways to make change: ---> ${countChange([3, 5], 7)}`);   // 11 times




// It got me thinking, if we are finding the minimum then why not just start from the end of denominations
// since the denominations array is in descending order, the higher denominations would be more towards the end
// in this way, we don't have to compare minimum between two values
// but rather the first non null (acceptable) value that the function returns will automatically be the minimum
// this drastically reduces the function calls. It is so insane that it might be better than dp solutions
console.time("timer");
let countChange = function (denominations, total){
	let count = 0;
	function recursive (i, total, length){
		count++;
		if(total === 0)
			return length;
		if(i === -1)
			return null;
		if(total >= denominations[i]){
			let value1 = recursive(i, total-denominations[i], length+1);
			if(value1 !== null)
				return value1
		}
		return recursive(i-1, total, length);
	}
	let answer = recursive(denominations.length-1, total, 0);
	console.log("the function ran for: ", count);
	if(answer === null)
		return -1
	return answer;
}
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`); //4 times
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 11)}`); //6 times
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 7)}`); //6 times
console.log(`Number of ways to make change: ---> ${countChange([3, 5], 7)}`); // 10 times
console.timeEnd("timer");

// bottom up DP
let countChange = function (denominations, total){
	let dp = Array(denominations.length).fill(null).map(() => Array(total+1).fill(+Infinity));
	for(let i = 0; i < denominations.length; i++)
		dp[i][0] = 0;
    for(let s = 1; s <= total; s++){
        if(denominations[0] <= s)
            dp[0][s] = dp[0][s-denominations[0]] + 1;
    }
	for(let i = 1; i < denominations.length; i++){
		for(let s = 1; s <= total; s++){
			if(s >= denominations[i]){
				dp[i][s] = Math.min(dp[i][s-denominations[i]] + 1, dp[i-1][s]);
			}
            else
                dp[i][s] = dp[i-1][s];
		}
	}
	let answer = dp[denominations.length-1][total];
	if(answer === Infinity)
		return -1;
	return answer;
}

// Even more space optimized DP. I am really getting good at this
console.time("timer");
let countChange = function (denominations, total){
	//let count = 0;
	let dp = Array(total+1).fill(+Infinity);
	dp[0] = 0;
	for(let i = 0; i < denominations.length; i++){
		for(let s = 1; s <= total; s++){
			//count++;
			if(s >= denominations[i])
				dp[s] = Math.min(dp[s-denominations[i]] + 1, dp[s]);
		}
	}
	let answer = dp[total];
	//console.log("the function ran for : ", count);
	if(answer === Infinity)
		return -1;
	return answer;
}
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 11)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 7)}`);
console.log(`Number of ways to make change: ---> ${countChange([3, 5], 7)}`);
console.timeEnd("timer");









/// Maximum Ribbon Cut


/*We are given a ribbon of length ānā and a set of possible ribbon lengths. We need to cut the ribbon into the maximum number of pieces that comply with the above-mentioned possible lengths. 
Write a method that will return the count of pieces.*/


//simple recursive
// just like in minimum coin change, here we need to find maximum
// so starting from the start, the first non null return value we get will automatically 
// be the maximum value
let countRibbonPieces = function(ribbonLengths, total) {
  function recursive(i, total, length){
  	if(total === 0)
  		return length;
  	if(i === ribbonLengths.length)
  		return null
  	if(total >= ribbonLengths[i]){
  		let value1 = recursive(i, total-ribbonLengths[i], length+1);
  		if(value1)
  			return value1;
  	}
  	return recursive(i+1, total, length);
  }
  let answer = recursive(0, total, 0);
  if(answer == null)
  	return -1;
  return answer;
};
// note: this won't work if ribbonlengths is not sorted in ascending order


// bottom up Dynamic Programming
// I straight away did the more space optimized dp one, because I am a pro! jk jk
let countRibbonPieces = function(ribbonLengths, total){
	let dp = Array(total+1).fill(-Infinity);
	dp[0] = 0;
	for(let i = 0; i < ribbonLengths.length; i++){
		for(let s = 1; s <= total; s++){
			if(s >= ribbonLengths[i])
				dp[s] = Math.max(dp[s], dp[s-ribbonLengths[i]] + 1)
		}
	}
	if(dp[total] === -Infinity)
		return -1
	return dp[total];
}