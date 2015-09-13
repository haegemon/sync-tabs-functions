# Sync

Small library that allows synchronizing code execution at different tabs.

# Implementation:

 The Sync object saves the data at `localStorage`, which is necessary for understanding if a new action should be done or data from `localStorage` should be loaded. `localStorage`  is always synchronized between tabs. That allow synchronizing implementation of a special function at different tabs.

For this purpose, the object creates a unique identifier for every tab. The first open tab saves the data about itself at `localStorage`, and every next tab reads data from `localStorage`. If the first tab is closed, the next open tab starts to generate requests and other tabs read data from `localStorage`, etc.


# Examples

 Synchronize video playing. Open two tabs. Video playing at one tab stops video playing at second open tab. Based on video-js.