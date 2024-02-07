---
layout : c
---

{% raw %}

// gcc -Wall match.c -o .out/match && .out/.match
#include <stdio.h>

char *match(c, s)
char c, *s;
{
    int count;
    count = 0;
    while (c != s[count] && s[count] != '\0')
        count++;
    return (&s[count]);
}

char *match(); /* declare match'* type */
int main()
{
    char s[80], *p;
    gets(s);
    char ch = getchar();
    p = match(ch, s);
    if (*p) /* there is a match */
        printf("%s", p);
    else
        printf("no match found ");
}
{% endraw %}
