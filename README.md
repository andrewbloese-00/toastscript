#  UI Toast

A simple javascript library for creating popup notifications in vanilla javascript. 

## Usage 
1. Installation
> With npm
```npm install  uitoast-js```



2. Setup 

In a js file...
```
import {Toaster} from " uitoast-js"
//*initialize 
const toaster = new Toaster()


//* send a success message
toaster.success("enter a success message here")

//* send an error message
toaster.error("enter an error message here")

// * using the loading notification

//1 create some asynchronous function
async function fetchStuff(){
    ...
}

//2 call the toaster loading function
toaster.loading(
    fetchStuff,
    "message to display while loading",
    "message to display when loading success" , "message to display when loading error"
)


//* custom notification
toaster.custom(
    "🙂",
    "message to display",
    { 
        fontFamily: "sans-serif",
        color: "red,
    }
    )
```