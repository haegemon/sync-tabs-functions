# Sync
Small library that allow synchronize code execution at different tabs.

# Implementation:
 
`localStorage` are always synchronize between tabs. Object save at local storage data need understand should one do new action or load data from local data. That allow synchronise implimentation special function at different tabs. 
 
For that it creates unique identity for every tabs. Save at localStorage data about first open tab and every next tab should read data from localStorage. If the first tab is closed next open tab start generates request and other tab load data from local storage and etc.

# Examples

1. Synchronize video playing. Run play video at one tab stop playing at all other open tabs. Based on video-js.