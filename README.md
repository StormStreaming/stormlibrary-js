# [Storm JavaScript Library](http://stormstreaming.com/)

Storm Library is a core web video player for embedding live-video streams on a website. It is a part of **Storm Streaming 
Suite** and requires **Storm Streaming Server** instance or **Cloud** subscription to work. This library contains only core network and media
functionality and comes with no GUI (user interface), except for a video element. For a full-fledged video player with progress bars, buttons etc.
please check [Storm Player](https://github.com/StormStreaming/stormplayer-js), which is a GUI wrapper for this project. It can be used as a sample
code or ready-to-use component for a website.

This library comes in **IIFE**, **ESM**, **AMD**, **UMD**, and **CJS** versions (if you don't know these, grab IIFE, and it will be OK). Typings are now also included.

If you wish to test the library, check its API, look code snippets please visit our demo page: https://www.stormstreaming.com/demo

To get started check our examples and documentation at https://www.stormstreaming.com/docs/javascript-getting-started

# Installation

1. Using NPM:

> `npm install --save @stormstreaming/stormlibrary`

2. Using Yarn:

> `yarn add @stormstreaming/stormlibrary`

3. Manually - if you are clueless about NPM/Yarn or simply want to test it out, just grab`/dist/iife/index.js` file and embed it on your website.

## Sample setup

1. **IIFE** (Immediately-Invoked Function Expression).

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Storm JavaScript Library - IIFE Sample page</title>
    <meta charset="UTF-8">
    <script src="../dist/iife/index.js"></script>
</head>
<body>
    <div id="container"></div>
    <script>
        /**
         * Standard configuration object
         */
        const config = {
            connectionType: "direct",                        // "direct" or "gateway", please check doc for more info
            stream: {
                serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                    {
                        host: "localhost",                   // host or ip to the streaming server
                        port: 80,                            // server port
                        ssl: false                           // whenever SSL connection should be used or not
                    }
                ],
                sourceList: [
                    {
                        protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                        streamName: "test",                  // name of the stream
                        application: "live"                  // application name (can be configured in storm server settings)
                    },
                ]
            },
            settings: {
                autoStart: true,                              // if true, video will start playing automatically, but will be muted too
                restartOnError: true,                         // if something bad happens, player will try to restart
                reconnectTime: 1.0,                           // if a connection with a server fails, player will restart in given time
                enabledProtocols: ["MSE", "HLS"],             // "MSE" for desktop, android browsers and iPad OS, "HLS" for iPhone iOS
                video: {
                    scalingMode: "fill",                      // possible values "fill", "letterbox", "crop" and "letterbox"
                    containerID: "container",                 // name of the HTML container
                    width: 640,                               // initial player width
                    height: 360                               // initial player height
                },
                debug: {
                    console: {                                // console output
                        enabled: true                         // if console output is activated
                    }
                }
            }
        };
    
        /**
         * Creating an instance of the storm library
         */
        const storm = stormLibrary(config);
    
        /**
         * This event is triggered when the player is ready to receive API calls. No method should be called upon the player
         * before this event is registered.
         */
        storm.addEventListener("playerReady", function (event) {
            console.log("playerReady");
        });
        
        /**
         * The event is triggered whenever the player starts requesting a video stream. It's the first event in the sequence
         * for a successful playback.
         */
        storm.addEventListener("videoConnecting", function(event){
            console.log("videoConnecting");
        });
        
        /**
         * This event is called whenever a stream with a specific name was not found (was not published or is not ready yet). 
         * This event will be triggered after videoConnecting only and will stop a playback sequence.
         */
        storm.addEventListener("videoNotFound", function (event) {
            console.log("videoNotFound");
        });
        
        /**
         * Event is triggered when the player could not connect to the storm server (server is not running, or there are 
         * some network issues). If there are more servers on the config list, the player will try to connect to a different server instead.
         */
        storm.addEventListener("playerConnectionFailed", function (event) {
            console.log("playerConnectionFailed");
        });
    
        /**
         * This event tells us that a video content is being prepared for playback. It’s not playing yet, but it will start
         * very soon. It's the second event in the sequence for a successful playback.
         */
        storm.addEventListener("videoBuffering", function(event){
            console.log("videoBuffering");
        });
    
        /**
         * This event contains all data related to the video (like resolutions, codecs). It's the third event in the
         * sequence for a successful playback.
         */
        storm.addEventListener("videoMetadata", function(event){
            console.log("videoMetadata");
        });
    
        /**
         * The event is fired whenever the playback starts. It's the fourth and final event in the sequence for
         * a successful playback.
         */
        storm.addEventListener("videoPlay", function(event){
            console.log("videoPlay");
        });
        
        /**
         * Event informs on video progress, viewer's sessions/source duration & start time along current DVR cache size.
         * DVR cache size must be configured in server configuration file (by default is off)
         */
        storm.addEventListener("videoProgress", function(event){
            console.log("videoPlay");
            console.log("- stream duration", event.streamDuration);      // how long does this stream sessions last
            console.log("- source duration", event.sourceDuration);      // how long is the source broadcasting
            console.log("- source start time", event.sourceStartTime);   // when the source was started
            console.log("- stream start Time", event.streamStartTime);   // when this stream session was started
            console.log("- dvr cache size", event.dvrCacheSize);          // dvr cashe size in ms 
        });
    
        /**
         * Since all events were added, we can tell the script to start
         */
        storm.initialize();
    
    </script>
</body>
</html>
```

2. **UMD** (Universal Module Definition).

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Storm JavaScript Player - UMD Sample page</title>
    <meta charset="UTF-8">
    <script src="../dist/umd/index.js"></script>
</head>
<body>
    <div id="container"></div>
    <script>
        /**
         * Standard configuration object
         */
        const config = {
            connectionType: "direct",                        // "direct" or "gateway", please check doc for more info
            stream: {
                serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                    {
                        host: "localhost",                   // host or ip to the streaming server
                        port: 80,                            // server port
                        ssl: false                           // whenever SSL connection should be used or not
                    }
                ],
                sourceList: [
                    {
                        protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                        streamName: "test",                  // name of the stream
                        application: "live"                  // application name (can be configured in storm server settings)
                    },
                ]
            },
            settings: {
                autoStart: true,                              // if true, video will start playing automatically, but will be muted too
                restartOnError: true,                         // if something bad happens, player will try to restart
                reconnectTime: 1.0,                           // if a connection with a server fails, player will restart in given time
                enabledProtocols: ["MSE", "HLS"],             // "MSE" for desktop, android browsers and iPad OS, "HLS" for iPhone iOS
                video: {
                    scalingMode: "fill",                      // possible values "fill", "letterbox", "crop" and "letterbox"
                    containerID: "container",                 // name of the HTML container
                    width: 640,                               // initial player width
                    height: 360                               // initial player height
                },
                debug: {
                    console: {                                // console output
                        enabled: true                         // if console output is activated
                    }
                }
            }
        };
    
        /**
         * Creating an instance of the storm library
         */
        const storm = stormLibrary.create(config);
    
        /**
         * This event is triggered when the player is ready to receive API calls. No method should be called upon the player
         * before this event is registered.
         */
        storm.addEventListener("playerReady", function (event) {
            console.log("playerReady is now ready");
        });
    
        /**
         * The event is triggered whenever the player starts requesting a video stream. It's the first event in the sequence
         * for a successful playback.
         */
        storm.addEventListener("videoConnecting", function(event){
            console.log("videoConnecting");
        });
        
        /**
         * This event is called whenever a stream with a specific name was not found (was not published or is not ready yet). 
         * This event will be triggered after videoConnecting only and will stop a playback sequence.
         */
        storm.addEventListener("videoNotFound", function (event) {
            console.log("videoNotFound");
        });
        
        /**
         * Event is triggered when the player could not connect to the storm server (server is not running, or there are 
         * some network issues). If there are more servers on the config list, the player will try to connect to a different server instead.
         */
        storm.addEventListener("playerConnectionFailed", function (event) {
            console.log("playerConnectionFailed");
        });
    
        /**
         * This event tells us that a video content is being prepared for playback. It’s not playing yet, but it will start
         * very soon. It's the second event in the sequence for a successful playback.
         */
        storm.addEventListener("videoBuffering", function(event){
            console.log("videoBuffering");
        });
    
        /**
         * This event contains all data related to the video (like resolutions, codecs). It's the third event in the
         * sequence for a successful playback.
         */
        storm.addEventListener("videoMetadata", function(event){
            console.log("videoMetadata");
        });
    
        /**
         * The event is fired whenever the playback starts. It's the fourth and final event in the sequence for
         * a successful playback.
         */
        storm.addEventListener("videoPlay", function(event){
          console.log("videoPlay");
        });
        
        /**
         * Event informs on video progress, viewer's sessions/source duration & start time along current DVR cache size.
         * DVR cache size must be configured in server configuration file (by default is off)
         */
        storm.addEventListener("videoProgress", function(event){
            console.log("videoPlay");
            console.log("- stream duration", event.streamDuration);      // how long does this stream sessions last
            console.log("- source duration", event.sourceDuration);      // how long is the source broadcasting
            console.log("- source start time", event.sourceStartTime);   // when the source was started
            console.log("- stream start Time", event.streamStartTime);   // when this stream session was started
            console.log("- dvr cache size", event.dvrCacheSize);          // dvr cashe size in ms 
        });
    
        /**
         * Since all events were added, we can tell the script to start
         */
        storm.initialize();
    
    </script>
</body>
</html>
```

3. **ESM** (Universal Module Definition).

``` javascript
import {StormLibrary} from "../dist/esm/index.js";

/**
 * Standard configuration object
 */
const config = {
    connectionType: "direct",                        // "direct" or "gateway", please check doc for more info
    stream: {
        serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
            {
                host: "localhost",                   // host or ip to the streaming server
                port: 80,                            // server port
                ssl: false                           // whenever SSL connection should be used or not
            }
        ],
        sourceList: [
            {
                protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                streamName: "test",                  // name of the stream
                application: "live"                  // application name (can be configured in storm server settings)
            },
        ]
    },
    settings: {
        autoStart: true,                              // if true, video will start playing automatically, but will be muted too
        restartOnError: true,                         // if something bad happens, player will try to restart
        reconnectTime: 1.0,                           // if a connection with a server fails, player will restart in given time
        enabledProtocols: ["MSE", "HLS"],             // "MSE" for desktop, android browsers and iPad OS, "HLS" for iPhone iOS
        video: {
            scalingMode: "fill",                      // possible values "fill", "letterbox", "crop" and "letterbox"
            containerID: "container",                 // name of the HTML container
            width: 640,                               // initial player width
            height: 360                               // initial player height
        },
        debug: {
            console: {                                // console output
                enabled: true                         // if console output is activated
            }
        }
    }
};


/**
 * Creating an instance of the storm library
 */
const storm = new StormLibrary(config)

/**
 * This event is triggered when the player is ready to receive API calls. No method should be called upon the player
 * before this event is registered.
 */
storm.addEventListener("playerReady", function (event) {
    console.log("playerReady is now ready");
});

/**
 * The event is triggered whenever the player starts requesting a video stream. It's the first event in the sequence
 * for a successful playback.
 */
storm.addEventListener("videoConnecting", function(event){
    console.log("videoConnecting");
});

/**
 * This event is called whenever a stream with a specific name was not found (was not published or is not ready yet). 
 * This event will be triggered after videoConnecting only and will stop a playback sequence.
 */
storm.addEventListener("videoNotFound", function (event) {
    console.log("videoNotFound");
});

/**
 * Event is triggered when the player could not connect to the storm server (server is not running, or there are 
 * some network issues). If there are more servers on the config list, the player will try to connect to a different server instead.
 */
storm.addEventListener("playerConnectionFailed", function (event) {
    console.log("playerConnectionFailed");
});

/**
 * This event tells us that a video content is being prepared for playback. It’s not playing yet, but it will start
 * very soon. It's the second event in the sequence for a successful playback.
 */
storm.addEventListener("videoBuffering", function(event){
    console.log("videoBuffering");
})

/**
 * This event contains all data related to the video (like resolutions, codecs). It's the third event in the
 * sequence for a successful playback.
 */
storm.addEventListener("videoMetadata", function(event){
    console.log("videoMetadata");
})

/**
 * The event is fired whenever the playback starts. It's the fourth and final event in the sequence for
 * a successful playback.
 */
storm.addEventListener("videoPlay", function(event){
  console.log("videoPlay");
});

/**
 * Event informs on video progress, viewer's sessions/source duration & start time along current DVR cache size.
 * DVR cache size must be configured in server configuration file (by default is off)
 */
storm.addEventListener("videoProgress", function(event){
    console.log("videoPlay");
    console.log("- stream duration", event.streamDuration);      // how long does this stream sessions last
    console.log("- source duration", event.sourceDuration);      // how long is the source broadcasting
    console.log("- source start time", event.sourceStartTime);   // when the source was started
    console.log("- stream start Time", event.streamStartTime);   // when this stream session was started
    console.log("- dvr cache size", event.dvrCacheSize);          // dvr cashe size in ms 
});

/**
 * Since all events were added, we can tell the script to start
 */
storm.initialize();
```

4. **AMD** (Asynchronous Module Definition).

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Storm JavaScript Player - AMD Sample page</title>
    <meta charset="UTF-8">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
</head>
<body>
    <div id="container"></div>
    <script>
    
        /**
         * Standard configuration object
         */
        const config = {
            connectionType: "direct",                        // "direct" or "gateway", please check doc for more info
            stream: {
                serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                    {
                        host: "localhost",                   // host or ip to the streaming server
                        port: 80,                            // server port
                        ssl: false                           // whenever SSL connection should be used or not
                    }
                ],
                sourceList: [
                    {
                        protocol: "storm",                   // either "storm" (stream was published to the server), or "rtmp". RTMP (external source)
                        streamName: "test",                  // name of the stream
                        application: "live"                  // application name (can be configured in storm server settings)
                    },
                ]
            },
            settings: {
                autoStart: true,                              // if true, video will start playing automatically, but will be muted too
                restartOnError: true,                         // if something bad happens, player will try to restart
                reconnectTime: 1.0,                           // if a connection with a server fails, player will restart in given time
                enabledProtocols: ["MSE", "HLS"],             // "MSE" for desktop, android browsers and iPad OS, "HLS" for iPhone iOS
                video: {
                    scalingMode: "fill",                      // possible values "fill", "letterbox", "crop" and "letterbox"
                    containerID: "container",                 // name of the HTML container
                    width: 640,                               // initial player width
                    height: 360                               // initial player height
                },
                debug: {
                    console: {                                // console output
                        enabled: true                         // if console output is activated
                    }
                }
            }
        };
          
        /**  
         * Path to the AMD module
         */
        requirejs(['../dist/amd/index'], function (storm) {
        
            /**
             * Library instance
             */
             const player = new storm.create(config);   
             
            /**
             * This event is triggered when the player is ready to receive API calls. No method should be called upon the player
             * before this event is registered.
             */
            player.addEventListener("playerReady", function (event) {
                console.log("playerReady is now ready");
            });
            
            /**
             * The event is triggered whenever the player starts requesting a video stream. It's the first event in the sequence
             * for a successful playback.
             */
            player.addEventListener("videoConnecting", function(event){
                console.log("videoConnecting");
            })
            
            /**
             * This event is called whenever a stream with a specific name was not found (was not published or is not ready yet). 
             * This event will be triggered after videoConnecting only and will stop a playback sequence.
             */
            player.addEventListener("videoNotFound", function (event) {
                console.log("videoNotFound");
            });
            
            /**
             * Event is triggered when the player could not connect to the storm server (server is not running, or there are 
             * some network issues). If there are more servers on the config list, the player will try to connect to a different server instead.
             */
            player.addEventListener("playerConnectionFailed", function (event) {
                console.log("playerConnectionFailed");
            });
            
            /**
             * This event tells us that a video content is being prepared for playback. It’s not playing yet, but it will start
             * very soon. It's the second event in the sequence for a successful playback.
             */
            player.addEventListener("videoBuffering", function(event){
                console.log("videoBuffering");
            });
            
            /**
             * This event contains all data related to the video (like resolutions, codecs). It's the third event in the
             * sequence for a successful playback.
             */
            player.addEventListener("videoMetadata", function(event){
                console.log("videoMetadata");
            });
            
            /**
             * The event is fired whenever the playback starts. It's the fourth and final event in the sequence for
             * a successful playback.
             */
            player.addEventListener("videoPlay", function(event){
              console.log("videoPlay");
            });
            
            /**
             * Event informs on video progress, viewer's sessions/source duration & start time along current DVR cache size.
             * DVR cache size must be configured in server configuration file (by default is off)
             */
            player.addEventListener("videoProgress", function(event){
                console.log("videoPlay");
                console.log("- stream duration", event.streamDuration);      // how long does this stream sessions last
                console.log("- source duration", event.sourceDuration);      // how long is the source broadcasting
                console.log("- source start time", event.sourceStartTime);   // when the source was started
                console.log("- stream start Time", event.streamStartTime);   // when this stream session was started
                console.log("- dvr cache size", event.dvrCacheSize);          // dvr cashe size in ms 
            });
            
            /**
             * Since all events were added, we can tell the script to start
             */
            player.initialize();
                
        });  
    
    </script>
</body>
</html>
```

## Attaching and detaching events

``` JavaScript

/**
 * An event can be registered using addEventListener method (preferably before initialize() method is called)
 */
storm.addEventListener("playerReady", onPlayerReady);

/**
 * Inline functions are fine too...
 */
storm.addEventListener("playerReady", function(event){
    console.log("playerReady");
});

/**
 * An event can also be removed...
 */
storm.removeEventListener("playerReady", onPlayerReady);

/**
 * All event listeners of that type can be removed like this
 */
storm.removeEventListener("playerReady");
```

## Event list

| Event name | Additional data | Description | Can be fired more than once | 
| :---: | :---: | :---: | :---: | 
| videoConnecting | no | The event is triggered whenever the player starts requesting a video stream. It's the first event in the sequence for a successful playback. | yes (once per video) |
| videoBuffering | no | This event tells us that a video content is being prepared for playback. It’s not playing yet, but it will start very soon. It's the second event in the sequence for a successful playback. | yes (once per video) |
| videoMetadata | yes | This event contains all data related to the video (like resolutions, codecs). It's the third event in the sequence for a successful playback. | yes (once per video) |
| videoPlay | no | The event is fired whenever the playback starts. It's the fourth and final event in the sequence for a successful playback. | yes |
| videoPause | no | The event is triggered when the playback is paused (though user interaction) | yes |
| videoNotFound | no | This event is called whenever a stream with a specific name was not found (was not published or is not ready yet). This event will be triggered after videoConnecting only and will stop a playback sequence. | yes (once per video) |
| volumeChange | newVolume | This event tells us that video volume was changed (either by the system or by a user). | yes |
| videoStop | no | Event will be called when the stream is closed on the server side (usually it means that the broadcaster has stopped streaming). | yes (once per video) |
| videoError | no | Event indicates that there was a problem with playback (it usually means that the browser was not able to play it). | yes (once per video) |
| videoProgress | yes | Event informs on video progress, source stream time, source stream start time and current viewer time. | yes (each second) |
| playerReady | no | This event is triggered when the player is ready to receive API calls. No method should be called upon the player before this event is registered. | no |
| newStreamSourceAdded | no | This event is triggered whenever a new video source is added to the player. | yes |
| interactionRequired | no | Some browsers and devices do not allow for a player (media) to start on its own and require direct user interaction (e.g. a mouse click). This event indicates that such a “push” is needed. | no |
| compatibilityError | no | If a browser or device does not support the provided sources, this event will be triggered. Please keep in mind that the player will do whatever it can (switch between multiple modes) to provide the best compatibility with a given device. Still, at some point, it might simply be impossible to start a video. | yes |
| playerDisconnected | no | The event is triggered when the player is disconnected from the storm server (it might happen because of viewer connection or other network issues). | no |
| playerConnectionFailed | no | Event is triggered when the player could not connect to the storm server (server is not running, or there are some network issues). If there are more servers on the config list, the player will try to connect to a different server instead. | yes |
| onAllServersFailed | no | This event is related to "playerConnectionFailed". If the player fails to connect to all provided servers on a config list, this event means that nothing more can be done. | yes |
| noSLLError | no | If SSL layer is required for specific sources and the browser does not provide it – this error will be show. | no |
| videoObjectCreation | no | Event is triggered whenever a video object within the library is re-created. | yes |

## API

| Method | Returns | Return type | Description | 
| :---: | :---: | :---: | :---: | 
| getPlayerID() | Player ID (first player starts with 0, next one gets 1, etc.) | number | The method returns the player id. | 
| getConfig() | A config object provided as a first parameter | Object | The method returns the main config object that was provided to the player. |
| getRole() | "player" or "streamer" | string | The method returns whether the player is working in the “player” or “streamer” mode (the streamer function has not been implemented yet). | 
| getVersion() | Player version | string | The method returns player version. | 
| initialize() | - | void | Activates all scripts within the player. All event-listeners should be already attached to the player. | 
| play() | - | void | This method will force the player to play the specific content (if it was paused previously). | 
| pause() | - | void | This method pauses current playback. | 
| stop() | - | void | This method will stop the current playback and cease all operations. |
| restart() | - | void | The player is restarted to the default state (a combination of stop() and start() methods). |
| togglePlay() | - | void | This method will work as a pause/play switch depending on the current player state. | 
| isPlaying() | *true* if player is playing some content, *false* otherwise. | void | Returns true/false depending on current player state. | 
| getPlaybackStatus() | *"initialized", "started", "playing", "paused", "buffering", "stopped"* | string | Returns current player state. |
| seek(time:number) | - | void | Seeks stream to a given time (stream source timestamp) | 
| mute() | - | void | Mutes the player’s video object. It’s not the same as setVolume(0), as both methods can be applied together. | 
| unmute() | - | void | The method unmutes the player’s video object. | 
| toggleMute() | - | void | Switches mute on/off. | 
| isMute() | *true* if player is muted, or *false* if it’s not | boolean | This method can be used to check whether the player is muted. | 
| setVolume(newVolume:int) | - | void | Sets new volume for the player (0-100). Once the method is performed "volumeChange" event will be triggered. | 
| getVolume() | Current volume level | number | Returns player volume (0-100). | 
| setSize(width:int, height:int) | - | void | Forces the player to resize to specific dimensions. | 
| setWidth(width:int) | - | void | Sets a new width for the player. | 
| getWidth() | Player width | number | Returns player width. | 
| setHeight(height:int) | - | void | Sets a new height for the player. | 
| getHeight() | Player height | number | Returns player height. | 
| setScalingMode(newMode:string) | - | void | Changes player scaling mode. For reference, please check scaling mode in the player config. |
| getScalingMode() | Current scaling mode | string | Current player scaling mode. For reference, please check scaling mode in the player config. |
| destroy() | - | void | Destroys the player and removes it from the container. |
| addEventListener(eventName:string, callback:function, thisRef:object, priority:number, logMessage:string = "") | - | void | Registers an event with the player object. Whenever a registered event occurs, player will call a predefined function provided |
| removeEventListener(eventName:string, callback:function = null) | - | void | Removes event listener from the player. If callback is not provided all events of that type will be removed |
| getAllSources() | - | Object | Returns all stream sources added to the player. |
| getAvailableQualities() | Object containing available qualities (their labels) | Object | Returns list of all available stream qualities. Qualities are derived from streamInfo.label sources parameter. |
| setQuality(quality:string) | - | Object | Forces player to start the playback matching this quality (streamInfo.label source parameter must be present). |
| getCurrentQuality() | Label for current stream quality | string | Returns current stream quality. If streamInfo.label parameter was not defined - "none" will be returned. |
| addStreamSource(sourceItem:Object, addAndPlay:boolean) | - | string | Add new stream object to the player. It can also start playing it automatically. |
| getAbsoluteStreamTime() | Unixtime | number | Returns stream time. |


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