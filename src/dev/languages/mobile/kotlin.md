## 2.1 Introduction to Kotlin

- no semi-colon

### 2.3.1 Variables    
- type inference doesn’t always work in Kotlin. For instance, if we late initiate a variable, Kotlin cannot automatically infer the type of the variable, and we need to declare the 
- `val a: Int = 10`
- in Kotlin the first letter of Int is upper case while in Java it is lower case. This change is actually quite significant 
- `val` is used to declare an `immutable` variable, and var is used to declare a mutable variable
  
### 2.3.2 Functions    

```
fun methodName(param1: Int, param2: Int): Int {
    return 0
}

import kotlin.math.max

fun largerNumber(num1: Int, num2: Int): Int {
    return max(num1, num2)
}
```

- When there is only one line of code in a function, Kotlin allows to omit the braces by using an equal sign. 

```

fun largerNumber(num1: Int, num2: Int): Int = max(num1, num2)

```


- Kotlin will infer that `largerNumber()` will also return an Int type. Thus, there is no need to explicitly define the type of the return data, and code can be further simplified to the following

```

fun largerNumber(num1: Int, num2: Int) = max(num1, num2)

```

## 2.4 Flow Control
### 2.4.1 if Statement

```
fun largerNumber(num1: Int, num2: Int): Int {
    var value = 0

    if (num1 > num2) {
        value = num1
    } else {
        value = num2
    }
    
    return value
}
```

- In Kotlin if has one extra function compared with Java. It can return value of the if statement. Thus, the above code can be simplified as below:

```
    val value = if (num1 > num2) {
        num1
    } else {
        num2
    }
```

-  when there is only one line of code, we can omit the braces

```
fun largerNumber(num1: Int, num2: Int) = if (num1 > num2) {
        num1
    } else {
        num2
}
```

- you can make it even simpler by compressing it into truly one line:

```
fun largerNumber(num1: Int, num2: Int) = if (num1 > num2) num1 else num2

```


### 2.4.2 when Statement 

-  like the switch statement in Java but way more powerful


```
fun getScore(name: String) = when (name) {
    "Tom" -> 86
    "Jim" -> 77
    "Jack" -> 95
    "Lily" -> 100
    else -> 0
}
```


```
fun checkNumber(num: Number) { 
    when (num) {
        is Int -> println("number is Int")
        is Double -> println("number is Double")
        else -> println("number not support")
    }
}
```

-  There is another way of using when statement that is not used very often but can be extensible in certain scenarios

- notice that in Kotlin we can use == to determine if two strings or objects are equal instead of using equals() as Java does

```
fun getScore(name: String) = when {
    name.startsWith("Tom") -> 86
    name == "Jim" -> 77
    name == "Jack" -> 95
    name == "Lily" -> 100
    else -> 0
}

```

### 2.4.3 Loop Statement  





2.5 Object-Oriented Programming  
2.5.1 Class and Object  
2.5.2 Inheritance and Constructor Function  
2.5.3 Interface    
2.5.4 Data Class and Singleton  
2.6 Lambda Expression
2.6.1 Creation and Iteration of Collection  
2.6.2 Functional APIs of Collections  
2.6.3 Java Functional API  
2.7 Null Safety    
2.7.1 Nullable Type  
2.7.2 Nullability Check Tools  
2.8 Kotlin Tricks    
2.8.1 String Interpolation
2.8.2 Function Default Arguments  
2.9 Summary    
