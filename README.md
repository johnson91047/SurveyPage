# SurveyPage
Survey for research

# Structure  

```
sample  
+-- index.html ( base html template )  
+-- css  
+-- fonts  
+-- images  
+-- js  
    +-- action.js ( for construct the whole page, use Stamp to utilize html template )
    +-- init.js
    +-- materialize.js ( for style )
    +-- materialize.min.js ( for style )
    +-- questions.js ( for setting questions for each page, each page is a object contain different question types and actions i.e. PrePage, PostPage )
    +-- stamp.js ( html template plugin )
    +-- storeData.js ( for storing data that will be upload to database )
    +-- timer.js ( for creating a countdown timer )
```

# Plugin  
[jcgregorio/stamp](https://github.com/jcgregorio/stamp) for html template
