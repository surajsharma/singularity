## 2.1 Introduction to Kotlin

- [2.1 Introduction to Kotlin](#21-introduction-to-kotlin)
  - [2.3.1 Variables](#231-variables)
  - [2.3.2 Functions](#232-functions)
- [2.4 Flow Control](#24-flow-control)
  - [2.4.1 if Statement](#241-if-statement)
  - [2.4.2 when Statement](#242-when-statement)
  - [2.4.3 Loop Statement](#243-loop-statement)
- [2.5 Object-Oriented Programming](#25-object-oriented-programming)
  - [2.5.1 Class and Object](#251-class-and-object)
  - [2.5.2 Inheritance and Constructor Function](#252-inheritance-and-constructor-function)

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

- notice that in Kotlin we can use `==` to determine if two strings or objects are equal 

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

- Kotlin uses for-in loop
- Before that we need to introduce the concept of range which doesn’t exist in Java.
- `val range = 0..10`  0 and 10 are all included in this range
  
``` 
fun main() {
    for (i in 0..10) {
    println(i)
    }
}
```

- `val range = 0 until 10` //0-9
  
```
fun main() {
    for (i in 0 until 10 step 2) {
        //equivalent to i=i+2 in for-i loop
    println(i)
    }
}
```    

- `downTo` for counting down to

```
fun main() {
    for (i in 10 downTo 1) {
    println(i)
    }
}
```

## 2.5 Object-Oriented Programming  
### 2.5.1 Class and Object  

```
class Person {
    var name = ""
    var age = 0
    fun eat() {
        println("" + age + " years old " + name + " is eating")
    }
}

fun main() {
    val p = Person()
    p.age = 2222
    p.name = "suraj"
    p.eat()
}
```

- Kotlin doesn’t need to use new keyword to instantiate the
class and the reason is because when you call the constructor function of a class, the only possible reason is because you want to instantiate the class thus without keyword new, it still clearly shows your intention

### 2.5.2 Inheritance and Constructor Function  

```
class Student {
    var sno = ""
    var grade = 0
}
```

- any non-abstract class is not inheritable by default which is equivalent as adding final keyword in Java  any non-abstract class is not inheritable by default
- The idea is the same as val keyword, if a class is inheritable by default, then it would be difficult to avoid the risk of random inheritance implementation 
- all non-abstract classes are not inheritable
- We just need to add the `open` keyword before the Person class to make it inheritable

```
open class Person {
    var name = ""
    var age = 0
    fun eat() {
        println("" + age + " years old " + name + " is eating")
    }
}

class Student: Person() {
    var sno = ""
    var grade = 0
}
```
- Notice that there are parentheses after the Person
- this has something to do with more advanced concepts like *primary constructor*, *secondary constructor*, etc
- Kotlin has two kinds of constructors: primary constructor and the secondary constructor.
- primary constructor is the constructor you use the most
- each class will have a __*parameterless constructor*__, and of course you can also explicitly define the parameters there. 
- The primary constructor has no function body and is defined right after the class name like the code below:


```
class Student(val sno: String, val grade: Int) Person() {
}

//then call primary constructor like so:

val student = Student("a123", 5)
```


-  if we want to add some code in the primary constructor, what can I do?
- Kotlin actually provides an __*init block*__ in which we can add the logic as shown below:

```
class Student(val sno: String, val grade: Int) : Person() {
    init {
        println("sno is " + sno)
        println("grade is " + grade)
    }
}
```

- __*sub class’s primary constructor will call the parent’s constructors by using parentheses*__. And now you should understand the code below:

```

```



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
