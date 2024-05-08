## 1.1 Android: An Overview  
### 1.1.1 Android System Architecture
![overview of arch](../../../attachments/android-overview.png)
### 1.3.4 Analyzing Your First Android Project  
![file structure](../../../attachments/android-fs.png)
![app structure](../../../attachments/android-app.png)
## AndroidManifest.xml 
![manifest](../../../attachments/android-manifest.png)
### 1.3.5 Resources in a Project  
### 1.3.6 File of build.gradle

Unlike Eclipse, Android Studio uses Gradle to build the project. Gradle is an advanced tool to build the project which uses a DSL (Domain Specific Language) based on Groovy to configure the project and avoids the complicated configuration with XML-based tools like Ant and Maven.

From Sect. 1.3.4, we can see that there are two build.gradle files in HelloWorld project. One is at the outer layer and another one is under the app directory. These two files are instrumental to build the Android Studio projects and let us take a deep dive into these two files.

#### First look at the build.gradle file at the outer layer as shown below:


```
/* outer layer build.gradle */

buildscript {
    ext.kotlin_version = '1.3.61'
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.2'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$
        kotlin_version"
    }
}
    allprojects {
        repositories {
            google()
            jcenter()
        }
}
```


First, the two repository closures all use google() and jcenter() methods. These two methods are used to specify the code repository that this project is going to use.

The google repo is Google’s Maven repo and jcenter is the repo mainly for thirdparty open sources libs. With these two methods, we can easily use any libs in the google and jcenter repo.

Next, in the dependencies closure, classpath specifies Gradle plugin and Kotlin plugin. Why need to specify Gradle plugin? This is because Gradle wasn’t specifically created for building Android projects but for other types of projects written in Java, C++, etc. If we want to use it to build the Android project, we need to specify in Gradle to use com.android.tools.build:gradle:3.5.2 plugin. The series number at the end is the plugin version number and should be the same as the current Android Studio version number. The Kotlin plugin just means that the current project is written with Kotlin. If you use Java to develop Android project, then there is no need to use this plugin. When I wrote this book the latest version of Kotlin plugin was 1.3.61.

#### Next, let us look at the build.gradle under the app directory, code should be the same as follows:


```
apply plugin: 'com.android.application'

/*  
The first line applies a plugin which has two values to choose from: com.android.application means this is an application module; com.android.library means this is a lib module. application module can run independently while lib module will need to be loaded in other apps so that it can run
*/

apply plugin: 'kotlin-android'
// If you want to use Kotlin to develop Android app, then you must add this

apply plugin: 'kotlin-android-extensions'
//  some useful extensions of Kotlin which you will
find out in later chapters.


android {
    compileSdkVersion 29
    buildToolsVersion "29.0.2"

    defaultConfig {
        applicationId "com.example.helloworld"
        minSdkVersion 21
        targetSdkVersion 29
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.
        AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-androidoptimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
/* There are three types of dependency: local binary dependency, local library module dependency, and remote binary dependency. Local binary dependency can add dependency to local jars or directories; local library dependency can be used to add dependency to local lib modules; remote dependency can be used to add dependency to the open-source projects in jcenter.    
*/

    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$
    kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.1.0'
    implementation 'androidx.constraintlayout:
    constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espressocore:3.2.0'
}

```

### 1.4.1 Using Android Log Tool  

The log class in Android is Log(android.util.Log) which provides the following 5 methods to print logs in the console. Here the verbosity is in descending order for these methods.

- `Log.v()`: used for the least meaningful information with the highest level of verbosity.

- `Log.d()`: used for the debugging information which should help you debug the app and investigate issues.

- `Log.i()`: used for important information like data that can help analyze the user behavior.

- `Log.w()`: used to print some warnings which means there is potential risks and need some attention to investigate into the issue.

- `Log.e()`: used to print error information such as the error info in the catch statement. When there are error info logs, it usually means your app has some serious issue that needs to get fixed immediately. This should have the least verbosity.

1.4.2 Log Vs Println()
1.5 Summary

--- 

# 2. [[kotlin]] reference


3 Start with the Visible: Explore Activity  
3.1 What Is Activity?    
3.2 Activity Fundamentals   .
3.2.1 Manually Creating Activity  
3.2.2 Creating and Mounting the Layout  
3.2.3 Registering in AndroidManifest File  
3.2.4 Using Toast in Activity  
3.2.5 Using Menu in Activity  
3.2.6 Destroying an Activity  
3.3 Using Intent to Communicate Between Activities  
3.3.1 Explicit Intent  
3.3.2 Implicit Intent  
3.3.3 More on Implicit Intent  
3.3.4 Passing Data to the Next Activity  
3.3.5 Return Data to the Last Activity  
3.4 Activity Lifecycle    
3.4.1 Back Stack  
3.4.2 Activity States  
3.4.3 Activity Lifecycle  

![](../../../attachments/android-activity-lc.png)

3.4.4 Explore the Lifecycle of Activity  
3.4.5 Recycling Activity  
3.5 Launch Mode of Activity
3.5.1 Standard    
3.5.2 singleTop    
3.5.3 singleTask
3.5.4 singleInstance  
3.6 Activity Best Practices
3.6.1 Identifying the Current Activity  
3.6.2 Exiting the App from Anywhere 135
3.6.3 Best Practice to Start Activity 137
3.7 Kotlin Class: Standard Functions and Static Methods 138
3.7.1 Standard Functions: with, run, and apply 139
3.7.2 Define Static Methods 142

---

4 Everything About UI Development . . . . . . . . . . . . . . . . . . . . . . . . . 147
4.1 How to Create UI? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 147
4.2 Common UI Widgets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 148
4.2.1 TextView . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 148
4.2.2 Button . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 151
4.2.3 EditText . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 153
4.2.4 ImageView . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 158
4.2.5 ProgressBar . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 160
4.2.6 AlertDialog . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 164
4.3 Three Basic Layouts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 166
4.3.1 LinearLayout . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 166
4.3.2 RelativeLayout . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 172
4.3.3 FrameLayout . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 176
4.4 Customize the Widgets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 178
4.4.1 Include Layout . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 180
4.4.2 Create Customized Widgets . . . . . . . . . . . . . . . . . . . 182
4.5 ListView . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 185
4.5.1 Simple Demonstration of ListView . . . . . . . . . . . . . . 185
4.5.2 Customize ListView UI . . . . . . . . . . . . . . . . . . . . . . 186
4.5.3 Optimize the Efficiency of ListView . . . . . . . . . . . . . 189
4.5.4 Click Event in ListView . . . . . . . . . . . . . . . . . . . . . . 192
4.6 RecyclerView . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 194
4.6.1 Basics About RecyclerView . . . . . . . . . . . . . . . . . . . 194
4.6.2 Scroll Horizontally and Waterfall Flow Layout . . . . . . 197
4.6.3 RecyclerView Click Event . . . . . . . . . . . . . . . . . . . . 202
4.7 Best Practice to Build UI . . . . . . . . . . . . . . . . . . . . . . . . . . . . 203
4.7.1 Create 9-Patch Image . . . . . . . . . . . . . . . . . . . . . . . . 204
4.7.2 Build Beautiful Chat User Interface . . . . . . . . . . . . . . 208
4.8 Kotlin Class: Lateinit and Sealed Cass . . . . . . . . . . . . . . . . . . 213
4.8.1 Lateinit Variables . . . . . . . . . . . . . . . . . . . . . . . . . . . 214
4.8.2 Optimization with Sealed Class . . . . . . . . . . . . . . . . . 216
4.9 Summary and Comment . . . . . . . . . . . . . . . . . . . . . . . . . . . . 218

---




[//begin]: # "Autogenerated link references for markdown compatibility"
[kotlin]: kotlin "kotlin"
[//end]: # "Autogenerated link references"