# Change Log

## 2.2.3

- Improved memory management for video object (small RAM usage for long streaming sessions),

## 2.2.2

- Small fix removing liveupdate component from the library (reduced size),

## 2.2.1

- Incorrect config types were fixed,
- Missing streamInfo type was added,
- Missing restartOnFocus parameter type was added,

## 2.2.0

- New optional parameter for Settings section called "restartOnFocus" was added,
- Pause/Play mechanism has been alerted slightly for DVR functionality,

## 2.1.4

- Improved event reporting for VolumeChange and Mute on/off,
- Improved seek mechanism (DVR),
- Timeout for all connections has been added,

## 2.1.3

- Improved documentation and samples,

## 2.1.2

- Small improvements in resizing module,

## 2.1.1

- PlayerState bug on quality change was fixed,

## 2.1.0

- All end-point config options received setters,

## 2.0.1

- Bug with isInitialized() method returning false after the event was fixed,

## 2.0.0

- Dedicated bundles for UMD, AMD, CJS, ESM, IIFE are now available,
- Improved typings for TypeScript,
- Expanded Readme.md,
- Sample configurations are now included,

Please keep in mind that this build is not compatible with previous releases. While API/Events are the same, creating
a library instance is different depending on the used module type.

## 1.2.1

- Bug with HLS connection timeout was fixed,


## 1.2.0

- Improved support for Facebook/Messenger browser,
- "play" method received a parameter allowing for "force" start,
- A small bug in "destroy" method was fixed (not all connections were terminated)


## 1.1.0

- Improved latency management for iOS,
- Support for NVENC was added,
- WebRTC Streamer (beta) was added to the player

## 1.0.0

- Small improvements to license error-handling,


## 0.9.4

- Minor changes to the package.json,

## 0.9.3

- TypeScript types were added to the project,

## 0.9.2

- Minor changes to the project structure,

## 0.9.1

- Minor fixes to the video-scaling system,
- Stream label can be acquired before "start" command,

## 0.9.0

The first public version of the library. This is a beta version,

