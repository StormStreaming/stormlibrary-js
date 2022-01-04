# [Storm JavaScript Library](http://stormstreaming.com/)

Storm Library is a core web video player for embedding live-video streams on a website. It is a part of **Storm Streaming 
Suite** and requires **Storm Streaming Server** instance or **Cloud** subscription to work. This library contains only core network and media
functionality and comes with no GUI (user interface), except for video element. 

If you need a full-fledged video player with progress bars, buttons etc. please check [Storm Player](https://github.com/StormStreaming/stormplayer-js), which is a GUI wrapper for this project.

The library comes in **IIFE**, **ESM**, **AMD**, **UMD**, and **CJS** versions (if you don't know these, grab IIFE, and it will be OK). Typings are now also included.

If you wish to test the library, check its API, look code snippets please visit our demo page: https://www.stormstreaming.com/demo

To get started check our examples and documentation at https://www.stormstreaming.com/docs/javascript-getting-started

# Installation

1. Using NPM:

> `npm install --save @stormstreaming/stormlibrary`

2. Using Yarn:

> `yarn install --dev @stormstreaming/stormlibrary`

3. Manually - if you are clueless about NPM/Yarn or simply want to test it out, just grab`/dist/iife/index.js` file and embed it on your website.

## Sample setup

1. IIFE (Immediately-Invoked Function Expression).

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <script src="../dist/iife/index.js"></script>
    </head>
    <body>
        <div id="container"></div>
    </body>
    <script>
    
        const config = {
            role : "player",
            connectionType:"direct",
            stream: {
                serverList: [
                    { host: "localhost", port: 80, ssl: false}  // host and port to your Storm Streaming Server
                ],
                sourceList: [
                    { protocol: "storm", streamName: "test", application: "live"},
                ]
            },
            settings: {
                autoStart: true,
                restartOnError: true,
                reconnectTime: 1.0,
                enabledProtocols: ["MSE","HLS"],
                video: {
                    scalingMode: "fill",
                    containerID: "container",
                    width: 640,
                    height: 360,
                },
                debug: {
                    console: {
                        enabled: true,
                        logTypes: ["INFO", "ERROR", "TRACE", "WARNING", "SUCCESS"]
                    },
                }
            }
        };
          
        const storm = stormLibrary(config);
        
        storm.addEventListener("playerReady", function(event){
            console.log("playerReady is now ready");
        });
        
        storm.initialize();
          
    </script>
</html>    
```

2. UMD (Universal Module Definition).

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <script src="../dist/umd/index.js"></script>
    </head>
    <body>
        <div id="container"></div>
    </body>
    <script>
    
        const config = {
            role : "player",
            connectionType:"direct",
            stream: {
                serverList: [
                    { host: "localhost", port: 80, ssl: false}  // host and port to your Storm Streaming Server
                ],
                sourceList: [
                    { protocol: "storm", streamName: "test", application: "live"},
                ]
            },
            settings: {
                autoStart: true,
                restartOnError: true,
                reconnectTime: 1.0,
                enabledProtocols: ["MSE","HLS"],
                video: {
                    scalingMode: "fill",
                    containerID: "container",
                    width: 640,
                    height: 360,
                },
                debug: {
                    console: {
                        enabled: true,
                        logTypes: ["INFO", "ERROR", "TRACE", "WARNING", "SUCCESS"]
                    }
                }
            }
        };
          
        const storm = stormLibrary.create(config);
        
        storm.addEventListener("playerReady", function(event){
            console.log("playerReady is now ready");
        });
        
        storm.initialize();
          
    </script>
</html>    
```

3. ESM (Universal Module Definition).

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <div id="container"></div>
    </body>
    <script>
    
        const config = {
            role : "player",
            connectionType:"direct",
            stream: {
                serverList: [
                    { host: "localhost", port: 80, ssl: false}  // host and port to your Storm Streaming Server
                ],
                sourceList: [
                    { protocol: "storm", streamName: "test", application: "live"},
                ]
            },
            settings: {
                autoStart: true,
                restartOnError: true,
                reconnectTime: 1.0,
                enabledProtocols: ["MSE","HLS"],
                video: {
                    scalingMode: "fill",
                    containerID: "container",
                    width: 640,
                    height: 360,
                },
                debug: {
                    console: {
                        enabled: true,
                        logTypes: ["INFO", "ERROR", "TRACE", "WARNING", "SUCCESS"]
                    },
                }
            }
        };
          
        import {StormLibrary} from "../dist/esm/index.js";

        const storm = new StormLibrary(config)
        
        storm.addEventListener("playerReady", function(event){
            console.log("playerReady is now ready");
        });
        
        storm.initialize();
          
    </script>
</html>    
```

4. AMD (Asynchronous Module Definition).

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
    </head>
    <body>
        <div id="container"></div>
    </body>
    <script>
    
        const config = {
            role : "player",
            connectionType:"direct",
            stream: {
                serverList: [
                    { host: "localhost", port: 80, ssl: false}  // host and port to your Storm Streaming Server
                ],
                sourceList: [
                    { protocol: "storm", streamName: "test", application: "live"},
                ]
            },
            settings: {
                autoStart: true,
                restartOnError: true,
                reconnectTime: 1.0,
                enabledProtocols: ["MSE","HLS"],
                video: {
                    scalingMode: "fill",
                    containerID: "container",
                    width: 640,
                    height: 360,
                },
                debug: {
                    console: {
                        enabled: true,
                        logTypes: ["INFO", "ERROR", "TRACE", "WARNING", "SUCCESS"]
                    },
                }
            },
        };
          
        requirejs(['../dist/amd/index'], function (storm) {
        
             const stormInstance = new storm.create(config);   
             
             stormInstance.addEventListener("playerReady", function(event){
                console.log("playerReady is now ready");
             });
        
            stormInstance.initialize();
                
        });  

    </script>
</html>    
```


# Browser compatibility
* Edge 12+
* Chrome 31+
* Firefox 42+
* Safari 13+
* Opera 15+

For legacy browsers, HLS mode is used instead.

# Resources

- [Documentation](https://www.stormstreaming.com/docs)
- [Live demo page](https://www.stormstreaming.com/demo)
- [StormPlayer Project](https://github.com/StormStreaming/stormplayer-js)
- [Changelog](CHANGELOG.md)


# License

- [License](LICENSE.txt)