# [Storm JavaScript Library](http://stormstreaming.com/)

Storm Library is a core web video player for embedding live-video streams on a website. It is a part of **Storm Streaming
Suite** and requires **Storm Streaming Server** instance or **Cloud** subscription to work. This library contains only core network and media
functionality and comes with no GUI (user interface), except for a video element. For a full-fledged video player with progress bars, buttons etc.
please check [Storm Player](https://github.com/StormStreaming/stormplayer-js), which is a GUI wrapper for this project. It can be used as a sample
code or ready-to-use component for a website.

This library comes in **IIFE**, **ESM**, **AMD**, **UMD**, and **CJS** versions (if you don't know these, grab IIFE, and it will be OK). Typings are now also included.

If you wish to test the library, check its API, look code snippets please visit our demo page: https://www.stormstreaming.com/demo/index.html

To get started check our examples and documentation at https://www.stormstreaming.com/docs/v2

# Installation

1. Using NPM:

> `npm install @stormstreaming/stormlibrary`

2. Using Yarn:

> `yarn add @stormstreaming/stormlibrary`

3. Manually - if you are clueless about NPM/Yarn or simply want to test it out, just grab`/dist/iife/index.js` file and embed it on your website.

## Sample setup

1. **IIFE** (Immediately-Invoked Function Expression).

```html
<!doctype html>
<html lang="en">
<head>
    <title>Storm JavaScript Library - IIFE Sample page</title>
    <meta charset="UTF-8"/>
    <script src="dist/iife/index.js"></script>
</head>
<body>
<div id="videoHolder"></div>
<script>
    /**
     * Standard configuration object
     */
    const streamConfig = {
        configurationType: "gateway",                    // "embedded" or "gateway", please check doc for more info
        stream: {
            serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                {
                    host: "localhost",                   // host or ip to a storm streaming server instance
                    application: "live",                 // application name (can be configured in storm server settings)
                    port: 80,                            // server port, usually 80 (non-ssl) or 443 (ssl)
                    ssl: false                           // whenever SSL connection should be used or not
                }
            ],
            streamKey: "test"                             // streamkey
        },
        settings: {
            autoStart: true,                              // if set to true, video will start playing automatically, but will be muted too
            video: {
                containerID: "videoHolder",               // name of the HTML container
                aspectRatio: "16:9",                      // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
                width: "100%",                            // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container,
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
    const storm = stormLibrary(streamConfig);

    /**
     * Prior to initialization some event-listeners can be added
     */
    storm.initialize();

</script>
</body>
</html>
```

2. **UMD** (Universal Module Definition).

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Storm JavaScript Player - UMD Sample page</title>
    <meta charset="UTF-8" />
    <script src="../dist/umd/index.js"></script>
  </head>
  <body>
    <div id="videoHolder"></div>
    <script>
      /**
       * Basic configuration object
       */
      const streamConfig = {
          configurationMode: "gateway",                    // "embedded" or "gateway", please check doc for more info
          stream: {
              serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                  {
                      host: "localhost",                   // host or ip to a storm streaming server instance
                      application: "live",                 // application name (can be configured in storm server settings)
                      port: 8080,                          // server port, usually 80 (non-ssl) or 443 (ssl)
                      ssl: false                           // whenever SSL connection should be used or not
                  }
              ],
              streamKey: "test"                            // streamkey
          },
          settings: {
              autoStart: true,                             // if true, video will start playing automatically, but will be muted too
              video: {
                  containerID: "videoHolder",              // name of the HTML container
                  aspectRatio: "16:9",                     // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
                  width: "100%",                           // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container,
              },
              debug: {
                  console: {                               // console output
                      enabled: true                        // if console output is activated
                  }
              }
          }
      };

      /**
       * Creating an instance of the storm library
       */
      const storm = stormLibrary.create(streamConfig);

      /**
       * Prior to initialization some event-listeners can be added
       */
      storm.initialize();
      
    </script>
  </body>
</html>
```

3. **ESM** (Universal Module Definition).

```javascript
import { StormLibrary } from "../dist/esm/index.js";

/**
 * Basic configuration object
 */
const streamConfig = {
        configurationMode: "embedded",                   // "embedded" or "gateway", please check doc for more info
        stream: {
            serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                {
                    host: "localhost",                   // host or ip to a storm streaming server instance
                    application: "live",                 // application name (can be configured in storm server settings)
                    port: 8080,                          // server port, usually 80 (non-ssl) or 443 (ssl)
                    ssl: false                           // whenever SSL connection should be used or not
                }
            ],
            streamKey: "test"                             // streamkey
        },
        settings: {
            autoStart: true,                              // if true, video will start playing automatically, but will be muted too
            video: {
                containerID: "videoHolder",               // name of the HTML container
                aspectRatio: "16:9",                      // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
                width: "100%",                            // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container, 
            },
            debug: {
                console: {                                // console output
                    enabled: true                         // if console output is activated
                }
            }
        }
    }
};


/**
 * Creating an instance of the storm library
 */
const storm = new StormLibrary(streamConfig);

/**
 * Prior to initialization some event-listeners can be added
 */
storm.initialize();
```

4. **AMD** (Asynchronous Module Definition).

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Storm JavaScript Player - AMD Sample page</title>
    <meta charset="UTF-8" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
  </head>
  <body>
    <div id="videoHolder"></div>
    <script>

      /**
       * Basic configuration object
       */
      const streamConfig = {
          configurationMode: "embedded",                   // "embedded" or "gateway", please check doc for more info
          stream: {
              serverList: [                                // list of streaming server, 2nd, 3rd etc. will be used as backup
                  {
                      host: "localhost",                   // host or ip to a storm streaming server instance
                      application: "live",                 // application name (can be configured in storm server settings)
                      port: 8080,                          // server port, usually 80 (non-ssl) or 443 (ssl)
                      ssl: false                           // whenever SSL connection should be used or not
                  }
              ],
              streamKey: "test"                             // streamkey
          },
          settings: {
              autoStart: true,                              // if true, video will start playing automatically, but will be muted too
              video: {
                  containerID: "videoHolder",               // name of the HTML container
                  aspectRatio: "16:9",                      // <video> element will scale to provided aspect-ratio. This parameter is optional and will overwrite "height" parameter as "width" will only be used for calculations
                  width: "100%",                            // <video> element width, can be either "px" or "%" (string), as (number) will always be "px" value. For % it'll auto-scale to parent container,
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
           const player = new storm.create(streamConfig);
          
          /**
           * Prior to initialization some event-listeners can be added
           */
          player.initialize();

      });
    </script>
  </body>
</html>
```

## Attaching and detaching events

```JavaScript

/**
 * An event can be registered using addEventListener method (preferably before initialize() method is called)
 */
storm.addEventListener("playerCoreReady", onLibraryReady);

/**
 * Inline functions are fine too...
 */
storm.addEventListener("playerCoreReady", function(event){
    console.log("playerReady");
});

/**
 * An event can also be removed...
 */
storm.removeEventListener("playerCoreReady", onLibraryReady);

/**
 * All event listeners of that type can be removed like this
 */
storm.removeEventListener("playerCoreReady");
```

## Sample event listeners

```JavaScript
storm.addEventListener("playerCoreReady", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} is ready for interaction!`);
})

storm.addEventListener("serverConnectionInitiate", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Connection to: ${event.serverURL} has been initialized`);
})

storm.addEventListener("serverConnect", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Successfully connected to: ${event.serverURL}`);
})

storm.addEventListener("serverDisconnect", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Disconnected from: ${event.serverURL}`);
})

storm.addEventListener("serverConnectionError", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Could not connect to server: ${event.serverURL}`);
})

storm.addEventListener("allConnectionsFailed", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - All connections from server list failed`);
})

storm.addEventListener("streamStateChange", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Stream: ${event.streamKey} state has changed to: ${event.state}.`);
})

storm.addEventListener("streamNotFound", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - No stream for streamKey: ${event.streamKey}`);
})

storm.addEventListener("interactionRequired", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - User interaction is required!`);
})

storm.addEventListener("playbackInitiate", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Playback initiated for streamKey: ${event.streamKey}`);
})

storm.addEventListener("playbackStart", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Playback started for streamKey: ${event.streamKey}`);
})

storm.addEventListener("playbackPause", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Playback paused for streamKey: ${event.streamKey}`);
})

storm.addEventListener("streamStop", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Stream has stopped`);
})

storm.addEventListener("volumeChange", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Volumed changed, new value: ${event.volume}`);
    console.log(`-->: is muted: ${event.muted}`);
    console.log(`-->: invoked by: ${event.invokedBy}`);
})

storm.addEventListener("playbackProgress", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Progress event`);
    console.log(`-->: playback duration: ${event.playbackDuration}`);
    console.log(`-->: playback start time: ${event.playbackStartTime}`);
    console.log(`-->: stream total duration: ${event.streamDuration}`);
    console.log(`-->: stream start time: ${event.streamStartTime}`);
    console.log(`-->: dvr cache size: ${event.dvrCacheSize}`);
})

storm.addEventListener("metadataReceived", function(event){
    console.log(`Library ID: ${event.ref.getLibraryID()} - Metadata arrived`);
    console.log(`-->: video-codec: ${event.metadata.getVideoCodec()}`);
    console.log(`-->: audio-codec: ${event.metadata.getAudioCodec()}`);
    console.log(`-->: video width: ${event.metadata.getVideoWidth()}`);
    console.log(`-->: video height: ${event.metadata.getVideoHeight()}`);
    console.log(`-->: fps: ${event.metadata.getNominalFPS()}`);
    console.log(`-->: encoder: ${event.metadata.getEncoder()}`);
})
```

## Library Event List

|        Event name        |  Additional data   |                                                                                                                                                                   Description                                                                                                                                                                    | Can be fired more than once |
|:------------------------:|:------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------:|
| serverConnectionInitiate |  serverURL:string  |                                                                                                                 This event is fired when a library instance initiates a connection with a Storm Streaming Server/Cloud instance.                                                                                                                 |  yes (once per connection)  |
|      serverConnect       |  serverURL:string  |                                                                                                       This event is triggered when a library instance successfully establishes a connection with a Storm Streaming Server/Cloud instance.                                                                                                        |  yes (once per connection)  |
|     serverDisconnect     |  serverURL:string  |                                                  This event is called when a library instance is disconnected from the Storm Streaming Server/Cloud (after a connection was previously established), which may occur due to viewer networking issues or Storm Streaming Server/Cloud problems.                                                   |  yes (once per connection)  |
|  serverConnectionError   |  serverURL:string  | This event is triggered when a library instance fails to establish a connection with a Storm Streaming Server/Cloud instance, possibly due to networking issues. If there are additional servers on the configuration list and the "restartOnError" parameter is set to true, the library will attempt to connect to a different server instead. |  yes (once per connection)  |
|   allConnectionsFailed   |         no         |                                                              This event is associated with _serverConnectionError_. If a library instance is unable to connect to any of the servers provided in the configuration list, this event indicates that no further action can be taken.                                                               |             no              |
|     playerCoreReady      |         no         |                                                                      This event is called when a library instance is prepared to accept API calls (using different methods). No playback-related methods should be invoked on the library before this event is registered.                                                                       |             no              |
|    compatibilityError    |         no         |      This event is triggered if a browser or device does not support any of the provided sources. Please note that the library will attempt all possible measures (switching between various modes) to ensure maximum compatibility with a given device. However, there may be instances where it is simply impossible to initiate a video.      |             yes             |
|   interactionRequired    |         no         |                                                          Certain browsers and devices do not permit a video element to initiate on its own and necessitate direct user interaction, such as a mouse click or a touch gesture. This event signifies that such an engagement is required.                                                          |             no              |
|         SSLError         |         no         |                                                                                                               If an SSL layer is required for specific sources and the browser does not provide it, this event will be triggered.                                                                                                                |             no              |
|    videoElementCreate    | yes (videoObject)  |                                                                                                                    This event is triggered whenever a video element within a library instance is either created or recreated.                                                                                                                    |             no              |
|     streamSourceAdd      |    ISourceItem     |                                                                                                              This event is activated whenever a new video source is added to the library (check addSourceItem in the API section).                                                                                                               |             yes             |
|    authorizationError    |         no         |                                                                                             This event is fired when a library instance fails to authorize with a server application on Storm Streaming Server/Cloud instance (e.g. incorrect token)                                                                                             |             yes             |
|  authorizationComplete   |         no         |                                                                                                     This event is called when a library instance successfully authorizes with a server application on Storm Streaming Server/Cloud instance.                                                                                                     |             yes             |
|      invalidLicense      |         no         |                                                                                                                        Whenever a Storm Streaming Server/Cloud license expires, a library instance will fire this event.                                                                                                                         |             no              |
|    streamConfigChange    | StormStreamConfig  |                                                                                                                                      This event notifies that basic stream configuration has been updated.                                                                                                                                       |             yes             |


## Playback Event List

|     Event name      |                                                   Additional data                                                    |                                                                           Description                                                                           | Can be fired more than once |
|:-------------------:|:--------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------:|
|  playbackInitiate   |                                                          no                                                          |               This event is fired whenever a playback of a stream is initiated (e.g. either due to autoStart set to _true_ or user interaction).                |    yes (once per video)     |
|    playbackStart    |                                                          no                                                          |                                           This event notifies that video playback has started (video is now playing)                                            |             yes             |
|    playbackPause    |                                                          no                                                          |                                 This event notifies that video playback has been paused (due to end-user or system interaction)                                 |             yes             |
|  playbackProgress   | playbackStarTime:number, playbackDuration:number, streamStartTime:number, streamDuration:number, dvrCacheSize:number |                           Event informs on video progress, stream/playback start-time, stream/playback duration and nDVR cache size.                            |             yes             |
|  streamStateChange  |               state: "AWAITING" / "NOT_PUBLISHED" / "UNPUBLISHED" / "PUBLISHED" / "CLOSED" / "UNKNOWN"               |                                                       This event notifies that stream state has changed.                                                        |             yes             |
|     streamStop      |                                                          no                                                          |   Event will be called when the stream is closed on the server side (usually it means that the broadcaster has stopped streaming, or stream was unpublished).   |             yes             |
|   streamNotFound    |                                                          no                                                          |           This event is called whenever a stream with a specific name was not found on the server (this includes hibernated streams or sub-streams).            |    yes (once per video)     |
|  metadataReceived   |                                                  StormMetaDataItem                                                   |            This event informs of metadata arrival for current video. MetaData contains information about stream codecs, width, height, bitrate etc.             |             yes             |
|   bufferingStart    |                                                          no                                                          |                 This event indicates a video content is being readied for playback. The video buffer must fill in order for the video to start.                 |             yes             |
|  bufferingComplete  |                                                          no                                                          |                                          This event indicates that the buffer is full and playback is ready to start.                                           |             yes             |
|    volumeChange     |                                volume:number, muted:boolean, invokedBy: user/browser                                 |                         This event notifies that video volume was changed (either its value was changed, or video was muted/un-muted).                          |             yes             |
|    playbackError    |                                                          no                                                          | Event indicates that there was a problem with the playback (it usually means that the browser was not able to play a source material due to malformed bitcode). |    yes (once per video)     |
|   fullScreenEnter   |                                                          no                                                          |                         This event is fired whenever a library instance enters browser fullscreen mode (either native or overlay type)                          |             yes             |
|   fullScreenExit    |                                                          no                                                          |                              This event is fired whenever a library instance exits fullscreen mode (either native or overlay type)                              |             yes             |


## API

|                                     Method                                      |                                          Returns                                           |     Return type      |                                                                                                                                                        Description                                                                                                                                                        |
|:-------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------:|:--------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                                  initialize()                                   |                                             -                                              |         void         |                                                                                                      Activates all scripts within a library instance. All event-listeners should be already attached to the library.                                                                                                      |
|                                 isInitialized()                                 |                  _true_ if this library instance was already initialized                   |       boolean        |                                                                                                                            Returns true if this library instance has already been initialized.                                                                                                                            |
|                                  isConnected()                                  |                  _true_ if this library instance is connected to a server                  |       boolean        |                                                                                                                              Returns true if this library instance is connected to a server.                                                                                                                              |
|                                 isAuthorized()                                  |                _true_ if this library instance is authorized with a server                 |       boolean        |                                                                                                                            Returns true if this library instance is authorized with a server.                                                                                                                             |
|                                 getLibraryID()                                  |              Library ID (first instance starts with 0, next one gets 1, etc.)              |        number        |                                                                                                                                             This method returns library's ID.                                                                                                                                             |
|                                    getRole()                                    |                                   _player_ or _streamer_                                   |        string        |                                                                                        This method returns whether the library is working in the _player_ or _streamer_ mode (the streamer function has not been implemented yet).                                                                                        |
|                                  getVersion()                                   |                             Library version in xx.xx.xx format                             |        string        |                                                                                                                                           This method returns library version.                                                                                                                                            |
|                                     play()                                      |                                             -                                              |         void         |                                                                                      This method will initiate playback of a video stream. If a video was paused or stopped previously, you can use this method to resume playback.                                                                                       |
|                                     pause()                                     |                                             -                                              |         void         |                                                                                                                                           This method pauses current playback.                                                                                                                                            |
|                                     stop()                                      |                                             -                                              |         void         |                                                                                                     This method will stop the current playback and cease all operations. It'll also disconnect library from a server.                                                                                                     |
|                                    restart()                                    |                                             -                                              |         void         |                                                                                                             The library is restarted to the default state (a combination of _stop()_ and _start()_ methods).                                                                                                              |
|                                  togglePlay()                                   |                                             -                                              |         void         |                                                                                                                   This method will work as a _pause/play_ switch depending on the current object state.                                                                                                                   |
|                                   isPlaying()                                   |                               _true_ if playback is active.                                |       boolean        |                                                                                                Returns _true/false_ depending on current library state.  Please check _getPlaybackState()_ for more detailed information.                                                                                                 |
|                               getPlaybackState()                                | _"NOT_INITIALIZED", "INITIALIZED", "PLAYING", "PAUSED", "BUFFERING", "STOPPED", "UNKNOWN"_ |        string        |                                                                                                                                          Returns current library playback state.                                                                                                                                          |
|                                getStreamState()                                 |       _"AWAITING", "NOT_PUBLISHED", "UNPUBLISHED", "PUBLISHED", "CLOSED", "UNKNOWN"_       |        string        |                                                                                                                                               Returns current stream state.                                                                                                                                               |
|                                seek(time:number)                                |                                             -                                              |         void         |                                                                                                                                  Seeks stream to a given time (stream source timestamp).                                                                                                                                  |
|                                     mute()                                      |                                             -                                              |         void         |                                                                                                       Mutes the library’s video object. It’s not the same as setVolume(0), as both methods can be applied together.                                                                                                       |
|                                    unmute()                                     |                                             -                                              |         void         |                                                                                                                                      The method unmutes the library’s video object.                                                                                                                                       |
|                                  toggleMute()                                   |                                             -                                              |         void         |                                                                                                                                                   Switches mute on/off.                                                                                                                                                   |
|                                    isMute()                                     |                               _true_ if the library is muted                               |       boolean        |                                                                                                                              This method can be used to check whether the library is muted.                                                                                                                               |
|                           setVolume(newVolume:number)                           |                                             -                                              |         void         |                                                                                                       Sets new volume for the library (0-100). Once the method is performed _volumeChange_ event will be triggered.                                                                                                       |
|                                   getVolume()                                   |                                 Current volume level 0-100                                 |        number        |                                                                                                                                              Returns library volume (0-100).                                                                                                                                              |
|               setSize(width:number/string, height:number/string)                |                                             -                                              |         void         | The method sets a new width and height for the video element. The values can be given as a number (in which case they are treated as the number of pixels), or as a string ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value. |
|                          setWidth(width:number/string)                          |                                             -                                              |         void         |        The method sets a new width for the video element. The value can be given as a number (in which case it is treated as the number of pixels), or as a string ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value.         |
|                                   getWidth()                                    |                                     Video object width                                     |        number        |                                                                                                                                        Returns main Video Object width in pixels.                                                                                                                                         |
|                         setHeight(height:number/string)                         |                                             -                                              |         void         |        The method sets a new height for the video element. The value can be given as a number (in which case it is treated as the number of pixels), or as a string ending with "px" (this will also be the number of pixels) or "%", where the number is treated as a percentage of the parent container's value.        |
|                                   getHeight()                                   |                                    Video object height                                     |        number        |                                                                                                                                        Returns main Video Object height in pixels.                                                                                                                                        |
|                         setScalingMode(newMode:string)                          |                                             -                                              |         void         |                                                                                                               Changes library scaling mode. For reference, please check scaling mode in the library config.                                                                                                               |
|                                getScalingMode()                                 |                                    Current scaling mode                                    |        string        |                                                                                                           Returns current library scaling mode. For reference, please check scaling mode in the library config.                                                                                                           |
|                    setStreamConfig(config:StormStreamConfig)                    |                                             -                                              |         void         |                                                                                                                            Sets stream config for the library (or overwrites an existing one)                                                                                                                             |
|                                getStreamConfig()                                |                            Storm Streaming Configuration object                            | StormStreamingConfig |                                                                                                                                          Returns current config for the library                                                                                                                                           |
|                                    destroy()                                    |                                             -                                              |         void         |                                                                                                                             Destroys the library instance and removes it from the container.                                                                                                                              |
| addEventListener(eventName:string, callback:function, removable:boolean = true) |                                             -                                              |         void         |                                                                                                Registers an event with a library instance. Whenever a registered event occurs, the library will call a provided function.                                                                                                 |
|            removeEventListener(eventName:string, callback:function)             |                                             -                                              |         void         |                                                                                                       Removes event listener from the library. If callback is not provided all events of that type will be removed.                                                                                                       |
|                            removeAllEventListeners()                            |                                             -                                              |         void         |                                                                                                                                  Removes all removable event listener from the library.                                                                                                                                   |
|                                 getSourceList()                                 |                             Array containing available sources                             |    ISourceItem[]     |                                                                                                                                      Returns an array of all available source items.                                                                                                                                      |
|                               removeAllSources()                                |                                             -                                              |         void         |                                                                                                           Removes all SourceItems from a library instance. This method however will not stop current playback.                                                                                                            |
|                  subscribe(streamKey:string, andPlay:boolean)                   |                                             -                                              |         void         |                                                            This method will create a new request to a Storm Streaming Server/Cloud instance and pull all related SourceItems into the library. Second parameter decides if playback will start automatically.                                                             |
|                       playSource(sourceItem:ISourceItem)                        |                                             -                                              |         void         |                                                                                                                            This method will start a playback of a provided Stream Source Item.                                                                                                                            |
|                             getCurrentSourceItem()                              |                                 ISourceItem object or null                                 |  ISourceItem / null  |                                                                                                                Returns current source item. If no source was selected yet, null might be returned instead.                                                                                                                |
|            addSourceItem(sourceItem:SourceItem, addAndPlay:boolean)             |                                             -                                              |         void         |                                                                                                                     Add new stream object to the library. It can also start playing it automatically.                                                                                                                     | 
|                                enterFullScreen()                                |                                             -                                              |         void         |                                                                                                                                                Enters the FullScreen mode.                                                                                                                                                |
|                                exitFullScreen()                                 |                                             -                                              |         void         |                                                                                                                                                Exits the FullScreen mode.                                                                                                                                                 |
|                               isFullScreenMode()                                |                        _true_ if the library is in FullScreen mode                         |         void         |                                                                                                                        Returns _true/false_ whenever a library instance is in the FullScreen mode.                                                                                                                        |
|                             getAbsoluteStreamTime()                             |                                          Unixtime                                          |        number        |                                                                                                                                              Returns current playback time.                                                                                                                                               |
|                                getVideoElement()                                |                            Reference to the main Video Element                             |   HTMLVideoElement   |                                                                                                                                   Returns Video Element used by this library instance.                                                                                                                                    |


# Browser compatibility

- Edge 12+
- Chrome 31+
- Firefox 42+
- Safari 13+
- Opera 15+

For legacy browsers, HLS mode is used instead.

# Resources

- [Documentation](https://www.stormstreaming.com/docs/v2)
- [Live demo page](https://www.stormstreaming.com/demo/index.html)
- [StormPlayer Project](https://github.com/StormStreaming/stormplayer-js)
- [Changelog](CHANGELOG.md)

# License

- [License](LICENSE.txt)
