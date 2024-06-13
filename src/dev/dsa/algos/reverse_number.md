- https://www.codechef.com/LRNDSA01/submit/FLOW007

```c++
#include <bits/stdc++.h>
using namespace std;

int main() {
	int l;
	int t;

	cin >> t;


	while (t--){
		int last_digit;
		int reversed_number=0;
		int sum_of_last_digits = 0;

		cin >> l;	

		for(int d=1; l>0 ; d=d*10){
			last_digit = l%10;
			sum_of_last_digits += sum_of_last_digits+last_digit;
			l = l/10;

			if(sum_of_last_digits){
				cout << last_digit;
			}
		}

		cout << endl;
	}

	return 0;
}
``
