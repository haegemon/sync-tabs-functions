# Sync

Small library that allows synchronizing code execution at different tabs.

# Implementation:

 The Sync object saves the data at `localStorage`, which is necessary for understanding if a new action should be done or data from `localStorage` should be loaded. `localStorage`  is always synchronized between tabs. That allow synchronizing implementation of a special function at different tabs.

For this purpose, the object creates a unique identifier for every tab. The first open tab saves the data about itself at `localStorage`, and every next tab reads data from `localStorage`. If the first tab is closed, the next open tab starts to generate requests and other tabs read data from `localStorage`, etc.

# Basic usage:

Simple synchronize activity between two pages.Creation two function: one for active job and second for passive job.

```

SynchObject.init('example'); // Manual init object

//declare function for active page
function active() {
    console.log(‘I am active’)   ;
}

//declare function for passive page
function passiv() {
   console.log(‘I am passive)   ;
}

// set timer at every page
// timer check is page active and run depence function
setInterval(function () {
   SynchObject.act(
           {
               jobName: 'example',
               activeFunction: active,
               passiveFunction: passiv
           }
   )
}, 500);
```

Example : Synchronize video playing. Open example/video-player/common.html. Starting playing one video stop other one.

# Advance usage:

At every task we can set priority of current action through others. That might be help at situation there actions not equilibrium ( For example different pages or active and blur pages).

If job with max priority is active script not change active job. If job with max priority is passive script not set any job active. Changes might be from job with lower priority to higher.

```

SyncObject.init({
   name: 'video_example',
   priority: $('#priority-input').val()
});// init video object with set initial priority. By default priority is 1


//declare function for active page
function active() {
    console.log(‘I am active’)   ;
}

//declare function for passive page
function passiv() {
   console.log(‘I am passive)   ;
}

setInterval(function () {
   SyncObject.act(
           {
               jobName: 'video_example',
               activeFunction: active,
               passiveFunction: passiv,
               priority: $('#priority-input').val()
           }
   )
}, 500); // at any task set priority of work

```

Example: Open /examples/video-player-single-tab/common.html. If all video have equal priority this example equivalently to previous one. If video with max priority stopped no one new video will be start. If video with max priority playing no one new video stop it.
