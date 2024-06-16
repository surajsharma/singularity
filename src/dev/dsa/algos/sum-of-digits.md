- https://www.codechef.com/viewsolution/54974686

```c++

#include <iostream>
using namespace std;

int main() {
	// your code goes here
	
	int t;
	cin >> t;
	while(t--){
	int n;
	cin >> n;
	
	int sum_of_digits=0;
	
	while(n){
	    int last_digit = n % 10;
	    sum_of_digits += last_digit;
	    n = n/10;
	}
	
	cout << sum_of_digits << endl;
	}
		return 0;

}

```
