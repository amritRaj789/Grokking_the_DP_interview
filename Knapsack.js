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







// Equal Subset Sum partition



/*Given a set of positive numbers, find if we can partition it into two subsets 
such that the sum of elements in both the subsets is equal
*/
console.time("time");
let canPartition = function (num){
	const total = num.reduce((a, b)=> a + b);
	if(total%2)
		return false
	function recursive (i, sum){
		if(sum > total/2 || i >= num.length)
			return false
		if(sum === total/2)
			return true
		else{
			return (recursive(i+1, sum+num[i]) || recursive(i+1, sum));
		}
	}
	let answer = recursive(0,0);
	return answer;
}
// this solution can be optimized
console.log(`Can partitioning be done: ---> ${canPartition([1, 1, 3, 4, 7])}`);
console.timeEnd("time");



// Educative's method of simple recursion which is a tad more efficient than my recursive solution. Argghh!
let canPartition = function(num) {
  let sum = 0;
  for (let i = 0; i < num.length; i++) sum += num[i];

  // if 'sum' is a an odd number, we can't have two subsets with equal sum
  if (sum % 2 !== 0) return false;

  return canPartitionRecursive(num, sum / 2, 0);
};

function canPartitionRecursive(num, sum, currentIndex) {
  // base check
  if (sum === 0) return true;

  if (num.length === 0 || currentIndex >= num.length) return false;

  // recursive call after choosing the number at the currentIndex
  // if the number at currentIndex exceeds the sum, we shouldn't process this
  if (num[currentIndex] <= sum) {
    if (canPartitionRecursive(num, sum - num[currentIndex], currentIndex + 1)) return true;
  }

  // recursive call after excluding the number at the currentIndex
  return canPartitionRecursive(num, sum, currentIndex + 1);
}



//top-down Dynamic Programming with memoization
let canPartition = function (num){
	let total = num.reduce((a, b) => a+b);
	if(total%2)
		return false
	const memo = [];
	function recursive (i, sum){
		if(sum === 0)
			return true;
		if(i >= num.length)
			return false
		if(memo[i] !== undefined && memo[i][sum] !== undefined)
			return memo[i][sum];
		if(memo[i] === undefined){
			memo[i] = [];
		}
		if(num[i] <= sum){
			if(recursive(sum-num[i], i+1))
				memo[i][sum] = true;
		}
		else
			memo[i][sum] = recursive(sum, i+1);
		return memo[i][sum];
	}
	return recursive(total/2, 0);
}
console.log(canPartition([1, 1, 3, 4, 7]));
// time and space complexity of O(N*S) where S is the total sum of all the numbers;


//educative's solution is a bit sketchy. No as it turned out my solution is actually a bit sketchy
let canPartition = function(num) {
  const n = num.length;
  // find the total sum
  let sum = 0;
  for (let i = 0; i < n; i++) sum += num[i];

  // if 'sum' is a an odd number, we can't have two subsets with same total
  if (sum % 2 != 0) return false;

  // we are trying to find a subset of given numbers that has a total sum of ‘sum/2’.
  sum /= 2;

  const dp = Array(n)
    .fill(false)
    .map(() => Array(sum + 1).fill(false));

  // populate the sum=0 column, as we can always have '0' sum without including any element
  for (let i = 0; i < n; i++) dp[i][0] = true;

  // with only one number, we can form a subset only when the required sum is equal to its value
  for (let s = 1; s <= sum; s++) {
    dp[0][s] = num[0] == s;
  }
  let count = 0;
  // process all subsets for all sums
  for (let i = 1; i < n; i++) {
    for (let s = 1; s <= sum; s++) {
    	count++;
      // if we can get the sum 's' without the number at index 'i'
      if (dp[i - 1][s]) {
        dp[i][s] = dp[i - 1][s];
      } else if (s >= num[i]) {
        // else if we can find a subset to get the remaining sum
        dp[i][s] = dp[i - 1][s - num[i]];
      }
    }
  }
  console.log("the for lap ran for : ", count);
  // the bottom-right corner will have our answer.
  return dp[n - 1][sum];
};

console.log(`Can partitioning be done: ---> ${canPartition([1, 2, 3, 4])}`);
console.log(`Can partitioning be done: ---> ${canPartition([1, 1, 3, 4, 7])}`);





// SUBSET SUM


// Given a set of positive nunbers, determine if there exists a subset whose sum 
//is equal to a given number "S"


// since this problem is quite similar to equal sum subset lets jump to bottom-up

const canPartition = function (num, sum){
	let dp = new Array (num.length);
	for(let i = 0; i < num.length; i++){
		dp[i] = new Array(sum+1).fill(false);
	}
	dp[0][num[0]] = true;
	for(let i = 0; i < num.length; i++){
		dp[i][0] = true;
	}
	for(let i = 1; i < num.length; i++){
		if(dp[i-1][sum] === true || dp[i-1][sum-num[i]] === true)
			return true;
		for(let s = 1; s <= sum; s++){
			if(s >= num[i])
				dp[i][s] = dp[i-1][s-num[i]]
			else
				dp[i][s] = dp[i-1][s];
		}
	}
	return dp[num.length-1][sum];
}

// We can further optimize the space complexity by doing this
const canPartition = function (num, sum) {
  const n = num.length;
  const dp = Array(sum + 1).fill(false);

  // handle sum=0, as we can always have '0' sum with an empty set
  dp[0] = true;

  // with only one number, we can have a subset only when the required sum is equal to its value
  for (let s = 1; s <= sum; s++) {
    dp[s] = num[0] == s;
  }

  // process all subsets for all sums
  for (let i = 1; i < n; i++) {
    for (let s = sum; s >= 0; s--) {
      // if dp[s]==true, this means we can get the sum 's' without num[i], hence we can move on to
      // the next number else we can include num[i] and see if we can find a subset to get the
      // remaining sum
      if (!dp[s] && s >= num[i]) {
        dp[s] = dp[s - num[i]];
      }
    }
  }
  return dp[sum];
};

// DP with O(S) space complexity, S = sum
const canPartition = function (num, sum){
	let dp = Array(sum+1).fill(false);
	dp[0] = true;
	if(num[0] <= sum)
		dp[num[0]] = true;
	for(let i = 1; i < num.length; i++){
		for(let s = sum; s >= 1; s--){
			if(!dp[s]){
				if(s >= num[i]){
					dp[s] = dp[s-num[i]];
				}
			}
		}
	}
	return dp[sum];
}






// MINIMUM SUBSET SUM DIFFERENCE
// Given a set of positive numbers, 
//partition the set into two subsets with a minimum difference between their subset sums


// simple recursive
let canPartition = function (num){
	let total = num.reduce((a, b) => a+b);
	let minimum = +Infinity;
	function recursive (i, sum){
		if(i === num.length)
			return;
		let difference = Math.abs((total - sum) - sum);
		minimum = Math.min(minimum, difference);
		recursive(i+1, sum+num[i]);
		recursive(i+1, sum);
	}
	recursive(0, 0);
	return minimum;
}
// this is my solution
// and while it may look like there is no problem, when we do memoization to it it might be a problem
// another recursive method
let canPartition = function (num){
	function recursive(i, sum1, sum2){
		if(i === num.length)
			return Math.abs(sum1 - sum2);
		const diff1 = recursive(i+1, sum1+num[i], sum2)
		const diff2 = recursive(i+1, sum1, sum2+num[i]);
		return Math.min(diff1, diff2);
	}
	return recursive(0, 0, 0);
}



// top down DP with memo
let canPartition = function (num){
	let memo = new Array(num.length);
	for(let i = 0; i < num.length; i++)
		memo[i] = [];
	function recursive (i, sum1, sum2){
		if(i === num.length)
			return Math.abs(sum1 - sum2);
		if(memo[i] !== undefined && memo[i][sum1] !== undefined)
			return memo[i][sum1];
		const diff1 = recursive(i+1, sum1+num[i], sum2)
		const diff2 = recursive(i+1, sum1, sum2+num[i]);
		if(memo[i] === undefined)
			memo[i] = [];
		memo[i][sum1] = Math.min(diff1, diff2);
		return memo[i][sum1]
	}
	return recursive(0, 0, 0);
}


// bottom up Dynamic Programming
let canPartition = function (num){
	let total = num.reduce((a, b) => a+b);
	let sum = Math.floor(total/2);
	let dp = new Array(num.length);
	for(let i = 0; i < num.length; i++){
		dp[i] = new Array(sum+1).fill(false);
	}
	if(num[0] <= sum)
		dp[0][num[0]] = true;
	for(let i = 0; i < num.length; i++)
		dp[i][0] = true;
	for(let i = 1; i < num.length; i++){
		for(let s = 1; s <= sum; s++){
			if(dp[i-1][s])
				dp[i][s] = true;
			else if(s >= num[i])
				dp[i][s] = dp[i-1][s-num[i]]
		}
	}
	for(let s = sum; s >= 0; s--){
		if(dp[num.length-1][s])
			return (total-2*s)
	}
}

// time and space complexity of O(N*S), where S is half of the total sum of all the numbers





// COUNT OF SUBSET SUM

//Given a set of positive numbers, find the total number of subsets whose sum is equal to a given number 'S'

const countSubsets = function (num, sum){
	function recursive (i, s){
		if(s === 0)
			return 1
		if(i === num.length || s < 0)
			return 0
		return recursive(i+1, s) + recursive(i+1, s-num[i]);
	}
	return recursive(0, sum);
}


// Top down DP with memoization

const countSubsets = function (num, sum){
	let memo = new Array(num.length);
	for(let i = 0; i < num.length; i++){
		memo[i] = new Array(sum+1);
	}
	function recursive(i, s){
		if(memo[i] !== undefined && memo[i][s] !== undefined)
			return memo[i][s];
		memo[i] = memo[i] || [];
		if(s === 0)
			memo[i][s] = 1;
		else if(s < 0 || i >= num.length)
			memo[i][s] = 0;
		else
			memo[i][s] = recursive(i+1, s) + recursive(i+1, s-num[i]);
		return memo[i][s];
	}
	return recursive(0, sum);
}


// Bottom up Dynamic Programming
const countSubsets = function (num, sum){
	if(sum === 0)
		return 0;
	let dp = new Array(num.length);
	for(let i = 0; i < num.length; i++){
		dp[i] = new Array(sum+1).fill(0);
		dp[i][0] = 1;
	}
	if(num[0] <= sum)
		dp[0][num[0]] = 1;
	for(let i = 1; i < num.length; i++){
		for(let s = 1; s <= sum; s++){
			dp[i][s] = dp[i-1][s];
			if(s >= num[i]){
				dp[i][s] += dp[i-1][s-num[i]];
			}
		}
	}
	return dp[num.length-1][sum];
}

// I got it bang on! My logic was flawless hehe


// we can make the space complexity even better to constant space
const countSubsets = function(num, sum) {
  const n = num.length;
  const dp = Array(sum + 1).fill(0);
  dp[0] = 1;

  // with only one number, we can form a subset only when the required sum is equal to its value
  for (let s = 1; s <= sum; s++) {
    dp[s] = num[0] == s ? 1 : 0;
  }

  // process all subsets for all sums
  for (let i = 1; i < num.length; i++) {
    for (let s = sum; s >= 0; s--) {
      if (s >= num[i]) {
        dp[s] += dp[s - num[i]];
      }
    }
  }

  return dp[sum];
};




// TARGET SUM
/*Given a set of positive numbers (non zero) and a target sum ‘S’. Each number should be
 assigned either a ‘+’ or ‘-’ sign. We need to find out total ways to assign symbols to 
 make the sum of numbers equal to target ‘S*/

 const findTargetSubsets = function (num, s){
 	function recursive(i, s){
 		if(i === num.length && s === 0)
 			return 1
 		if(i === num.length && s !== 0)
 			return 0
 		return recursive(i+1, s-num[i]) + recursive(i+1, s+num[i]);
 	}
 	return recursive(0, s);
 }

// or we could also do it like find subset sum difference equal to 0
// or we could also do it as find subset sum equal to total/2



/*This problem follows the 0/1 Knapsack pattern and can be converted into Count of Subset Sum. Let’s dig into this.
We are asked to find two subsets of the given numbers whose difference is equal to the given target ‘S’. Take the first example above. As we saw, one solution is {+1-1-2+3}. So, the two subsets we are asked to find are {1, 3} & {1, 2} because,
    (1 + 3) - (1 + 2 ) = 1
Now, let’s say ‘Sum(s1)’ denotes the total sum of set ‘s1’, and ‘Sum(s2)’ denotes the total sum of set ‘s2’. So the required equation is:
    Sum(s1) - Sum(s2) = S
This equation can be reduced to the subset sum problem. Let’s assume that ‘Sum(num)’ denotes the total sum of all the numbers, therefore:
    Sum(s1) + Sum(s2) = Sum(num)
Let’s add the above two equations:
    => Sum(s1) - Sum(s2) + Sum(s1) + Sum(s2) = S + Sum(num)
    => 2 * Sum(s1) =  S + Sum(num)
    => Sum(s1) = (S + Sum(num)) / 2
This essentially converts our problem to: “Find count of subsets of the given numbers whose sum is equal to”,
    => (S + Sum(num)) / 2
*/
// bottom up DP solution
const findTargetSubsets = function (num, s){
	let total = num.reduce((a, b) => a + b)
	if((total+s) % 2)
		return false;
	const sum = (total+s)/2;
	let dp = new Array(num.length);
	for(let i = 0; i < num.length; i++){
		dp[i] = new Array(sum+1).fill(0)
		dp[i][0] = 1;
	}
	dp[0][num[0]] = 1;
	for(let i = 1; i < num.length; i++){
		for(let s = 1; s <= sum; s++){
			dp[i][s] = dp[i-1][s];
			if(s >= num[i])
				dp[i][s] += dp[i-1][s-num[i]];
		}
	}
	return dp[num.length-1][sum];
}