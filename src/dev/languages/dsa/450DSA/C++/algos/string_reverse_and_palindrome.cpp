#include <bits/stdc++.h>
using namespace std;


int main() {

	int i;
	cin >> i;
	cin.ignore();

	while(i--)
	{
		string s;
		getline(cin, s);

		int len = s.size();
		string str_rev;

		for (int i = len-1; i >=0 ; --i)
		{
			/* code */
			str_rev.push_back(s[i]);
		}
		cout << str_rev << endl;

		if(str_rev == s){
			cout << "YES" << endl;
		} else {
			cout << "NO" << endl;
		}
	}
}