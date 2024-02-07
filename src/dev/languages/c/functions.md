---
layout: c
---


{% raw %}
#include <stdio.h>

int display(nums) // no implicit declarations
int *nums;        // parameter types
                  // here an array thus pointer notation but nums[10] works
{
    int i;
    for (i = 0; i < 10; i++)
        printf("%d\n", nums[i]);

    return 0;
}

int main()
{
    int nums[10], i; // cannot have simple dynamic array
    for (i = 0; i < 10; i++)
        nums[i] = i;
    display(nums);
    return 0;
}
{% endraw %}
