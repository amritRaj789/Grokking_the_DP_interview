Tabulation or Bottom Up
Memoization or Top Down

There are some key differences between Tabulation and Memoization

				Tabulation					Memoization

State		State transition is difficult		easier to think
			to think

Code		Code gets complicated when lot 		easy and less complicated
			of conditions are required

Speed		Faster as we directly access		slow due to lot of recursive calls
			previous states from the table		and return statements

Subproblem 	If all subproblems must be solved	If some probolems need not be solved
solving		at least once, then this usually	at all, then this has advantage of
			outperforms a top-down memoized		solving only those that are required
			algorithm by a constant factor

Table 		In tabulated version, starting from		All entries of the look up table are not
entries		the first entry, all entries are 		necessarily filled in memoized version. The
			filled one by one 						table is filled on demand


List of Dynamic Programming Problems
https://www.geeksforgeeks.org/fundamentals-of-algorithms/#DynamicProgramming