# Sync

Small library that allows synchronizing code execution at different tabs.

# Implementation:

 The Sync object saves the data at `localStorage`, which is necessary for understanding if a new action should be done or data from `localStorage` should be loaded. `localStorage`  is always synchronized between tabs. This allows synchronizing implementation of a special function at different tabs.

For this purpose, the object creates a unique identifier for every tab. The first open tab saves the data about itself at `localStorage`, and every next tab reads data from `localStorage`. If the first tab is closed, the next open tab starts to generate requests and other tabs read data from `localStorage`, etc.

# Basic usage:

Simple synchronizing activity between two tabs. Creation of two function: one for active job and the other for passive job.

```

SynchObject.init('example'); // Manual init object

//Declare function for active page
function active() {
    console.log(‘I am active’)   ;
}

//Declare function for passive page
function passive() {
   console.log(‘I am passive)   ;
}

// Set timer at every page
// Timer check is page active and run depence function
setInterval(function () {
   SynchObject.act(
           {
               jobName: 'example',
               activeFunction: active,
               passiveFunction: passive
           }
   )
}, 500);
```

Example : Synchronize video playing. Open example/video-player/common.html.  Starting playing one video stops the other one.

# Advance usage:

It is possible to prioritise the current action before others. This might be useful in situations, when actions are not equal (for example, different pages or active and background pages).

If job with max priority is active, script does not change active job. If job with max priority is passive, script does not set any job active. Only jobs with lower priority are changed to jobs with higher priority

```

// Init video object with set initial priority. By default priority is 1
SyncObject.init({
   name: 'video_example',
   priority: $('#priority-input').val()
});

//Declare function for active page
function active() {
    console.log(‘I am active’)   ;
}

//Declare function for passive page
function passive() {
   console.log(‘I am passive)   ;
}

// At any task set priority of job
setInterval(function () {
   SyncObject.act(
           {
               jobName: 'video_example',
               activeFunction: active,
               passiveFunction: passive,
               priority: $('#priority-input').val()
           }
   )
}, 500); 

```

Example: Open /examples/video-player-single-tab/common.html. If all videos have equal priority, this example is equivalent to the previous one. If video with max priority is stopped, no new video will start. If video with max priority is playing, no new video stops it.