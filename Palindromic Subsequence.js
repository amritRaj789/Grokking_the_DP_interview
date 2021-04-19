// Longest Palindromic Subsequence

/*Given a sequence, find the length of its Longest Palindromic Subsequence (LPS). In a palindromic subsequence, 
elements read the same backward and forward.
A subsequence is a sequence that can be derived from another sequence by deleting some or no elements 
without changing the order of the remaining elements.*/

// my recursive solution; educative also does something similar
let findLPSLength = function (st){
	function recursive(left, right){
		if(left > right)
			return 0
		if(st[left] === st[right]){
			return recursive(left+1, right-1) + (left < right ? 2 : 1);
		}
		else{
			return Math.max(recursive(left+1, right), recursive(left, right-1));
		}
	}
	return recursive(0, st.length-1);
}

console.log(findLPSLength("bdsgjbdb"))

//top down with memoization
let findLPSLength = function (st){
	let memo = [];
	function recursive(left, right){
		if(memo[left] !== undefined && memo[left][right] !== undefined)
			return memo[left][right];
		if(left > right)
			return 0
		if(left === right)
			return 1
		memo[left] = memo[left] || [];
		if(st[left] === st[right])
			memo[left][right] = recursive(left+1, right-1) + 2;
		else
			memo[left][right] = Math.max(recursive(left+1, right), recursive(left, right-1));
		return memo[left][right];
	}
	return recursive(0, st.length-1);
}


// bottom up dynamic programming..
let findLPSLength = function (st){
	let dp = Array(st.length).fill(null).map(() => Array(st.length).fill(0));
	for(let i = 0; i < st.length; i++)
		dp[i][i] = 1;
	for(let start = st.length-1; start >= 0; start--){
		for(let end = start+1; end < st.length; end++){
			if(st[start] === st[end]){
				dp[start][end] = dp[start+1][end-1] + 2;
			}
			else
				dp[start][end] = Math.max(dp[start+1][end], dp[start][end-1]);
		}
	}
	return dp[0][st.length-1];
}
// O(n^2)




// Longest Palindromic Substring

/*Given a string, find the length of its Longest Palindromic Substring (LPS). 
In a palindromic string, elements read the same backward and forward.*/

// simple recursive
let findLPSLength = function(st){
	function recursive(left, right){
		if(left > right){
			return 0
		}
		if(left === right){
			return 1
		}
		if(st[left] === st[right]){
			let remaining = right - left - 1;
			if(remaining === recursive(left+1, right-1))
				return remaining+2;
		}
		return Math.max(recursive(left+1, right), recursive(left, right-1));
	}
	return recursive(0, st.length-1);
}

// top down





// bottom up DP
let findLPSLength = function (st){
	let max = 1;
	let dp = Array(st.length).fill(null).map(() => Array(st.length).fill(0));
	for(let i = 0; i < st.length; i++)
		dp[i][i] = 1;
	for(let start = st.length-1; start >= 0; start--){
		for(let end = start+1; end < st.length; end++){
			if(st[start] === st[end]){
				dp[start][end] = dp[start+1][end-1] + 2;
				max = Math.max(max, dp[start][end]);
			}
			else
				dp[start][end] = -Infinity;
		}
	}
	return max;
}

//this uses O(N^2)

// my leetcode solution is a bit better may be


// THERE IS AN ASTONISHINGLY MORE EFFICIENT LINEAR TIME ALGORITHM : MANACHER'S ALGO
// read more on it later
// imma go grab a diet coke first







// COUNT OF PALINDROMIC SUBSTRINGS

/*Given a string, find the total number of palindromic substrings in it. 
Please note we need to find the total number of substrings and not subsequences.*/

// Idk why educative has no recursive solution for this
// this is their bottom up DP solution
let findCPS = function (st){
	let count = 0;
	let dp = Array(st.length).fill(null).map(() => Array(st.length).fill(false));
	for(let i = 0; i < st.length; i++){
		dp[i][i] = true;
		count++;
	}
	for(let start = st.length-1; start >= 0; start--){
		for(let end = start+1; end < st.length; end++){
			if(st[end] === st[start]){
				if(end - start === 1 || dp[start+1][end-1]){
					dp[start][end] = true;
					count++;
				}
			}
		}
	}
	return count;
}
console.log('Length of LPS: ---> ' + findCPS('pqr'));
// O(n^2)