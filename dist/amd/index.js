 /*
 * StormStreaming JavaScript Library
 * Copyright © 2021-2024 Web-Anatomy s.c. All rights reserved.
 * contact@stormstreaming.com
 * https://stormstreaming.com
 *
 * Version: 4.2.0
 * Version: 5/9/2024, 11:53:23 AM
 *
 * LEGAL NOTICE:
 * This software is subject to the terms and conditions defined in
 * separate license conditions ('LICENSE.txt')
 *
 */define(['exports'], (function (exports) { 'use strict';

    var RoleType;
    (function (RoleType) {
      RoleType[RoleType["STREAMER"] = 0] = "STREAMER";
      RoleType[RoleType["PLAYER"] = 1] = "PLAYER";
    })(RoleType || (RoleType = {}));

    class StormServerItem {
      constructor(host, application) {
        let port = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 443;
        let isSSL = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        this.host = host;
        this.application = application;
        this.port = port;
        this.isSSL = isSSL;
        this.hasFaild = false;
      }
      getHost() {
        return this.host;
      }
      getApplication() {
        return this.application;
      }
      getPort() {
        return this.port;
      }
      getIfSSL() {
        return this.isSSL;
      }
      getIfFaild() {
        return this.hasFaild;
      }
      setAsFaild(value) {
        this.hasFaild = value;
      }
      getData() {
        return {
          serverURL: this.getHost(),
          application: this.getHost(),
          serverPort: this.getPort(),
          isSSL: this.getIfSSL()
        };
      }
      toString() {
        return "host: " + this.host + " | application: " + this.application + " | port: " + this.port + " | isSSL: " + this.isSSL;
      }
    }

    var SecurityType;
    (function (SecurityType) {
      SecurityType[SecurityType["NONE"] = 0] = "NONE";
      SecurityType[SecurityType["TOKEN"] = 1] = "TOKEN";
    })(SecurityType || (SecurityType = {}));

    class SecurityConfig {
      constructor(config) {
        this.PRINT_ON_STARTUP = true;
        this.securityMethod = SecurityType.NONE;
        this.token = "";
        this.parse(config);
      }
      parse(config) {
        if (config != null) {
          if (config.type !== undefined && config.type !== null) {
            switch (config.type) {
              case "token":
                this.securityMethod = SecurityType.TOKEN;
                break;
              case "none":
                this.securityMethod = SecurityType.NONE;
                break;
              default:
                this.securityMethod = SecurityType.NONE;
            }
          }
          if (config.token !== undefined && config.token !== null) this.token = config.token;
        } else this.securityMethod = SecurityType.NONE;
      }
      setConfig(config) {
        this.parse = config;
      }
      getSecurityMethod() {
        return this.securityMethod;
      }
      setSecurityMethod(newValue) {
        switch (newValue) {
          case "token":
            this.securityMethod = SecurityType.TOKEN;
            break;
          case "none":
            this.securityMethod = SecurityType.NONE;
            break;
          default:
            this.securityMethod = SecurityType.NONE;
        }
      }
      getToken() {
        return this.token;
      }
      setToken(newValue) {
        this.token = newValue;
      }
      print(logger) {
        let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (this.PRINT_ON_STARTUP || force) {
          let securityMethodName = "";
          switch (this.securityMethod) {
            case SecurityType.NONE:
              securityMethodName = "none";
              break;
            case SecurityType.TOKEN:
              securityMethodName = "token";
              break;
          }
          logger.info(this, "Security Method: " + securityMethodName);
        }
      }
    }

    class AbstractSourceItem {
      constructor(type, info) {
        this.type = type;
        this.streamInfo = info;
      }
      getType() {
        return this.type;
      }
      getStreamInfo() {
        return this.streamInfo;
      }
    }

    var ProtocolType;
    (function (ProtocolType) {
      ProtocolType["RTMP"] = "RTMP";
      ProtocolType["RTSP"] = "RTSP";
      ProtocolType["WEBRTC"] = "WebRTC";
      ProtocolType["HLS"] = "HLS";
      ProtocolType["WEB_SOCKETS"] = "WebSockets";
      ProtocolType["MPEG_DASH"] = "MpegDash";
      ProtocolType["STORM"] = "Storm";
    })(ProtocolType || (ProtocolType = {}));

    class StormSourceItem extends AbstractSourceItem {
      constructor(streamKey, streamInfo, defaultSource) {
        super(ProtocolType.STORM, streamInfo);
        this.streamKey = streamKey;
        this.defaultSource = defaultSource;
      }
      getStreamKey() {
        return this.streamKey;
      }
      isDefaultSource() {
        return this.defaultSource;
      }
      toString() {
        return "type: Storm | streamKey: " + this.streamKey + " | streamInfo: " + this.streamInfo.toString();
      }
    }

    class WebRTCSourceItem extends AbstractSourceItem {
      constructor(streamKey, streamInfo, defaultSource) {
        super(ProtocolType.WEBRTC, streamInfo);
        this.streamKey = streamKey;
        this.defaultSource = defaultSource;
      }
      getStreamKey() {
        return this.streamKey;
      }
      isDefaultSource() {
        return this.defaultSource;
      }
      toString() {
        return "type: WebRTC | streamKey: " + this.streamKey;
      }
    }

    class RTMPSourceItem extends AbstractSourceItem {
      constructor(host, application, streamKey, port, streamInfo, defaultSource) {
        super(ProtocolType.RTMP, streamInfo);
        this.host = host;
        this.application = application;
        this.streamKey = streamKey;
        this.port = port;
        this.defaultSource = defaultSource;
      }
      getHost() {
        return this.host;
      }
      getPort() {
        return this.port;
      }
      getApplicationName() {
        return this.application;
      }
      getStreamKey() {
        return this.streamKey;
      }
      isDefaultSource() {
        return this.defaultSource;
      }
      toString() {
        return "type: RTMP | url: " + this.host + " | port: " + this.port;
      }
    }

    var ConfigurationType;
    (function (ConfigurationType) {
      ConfigurationType[ConfigurationType["EMBEDDED"] = 0] = "EMBEDDED";
      ConfigurationType[ConfigurationType["GATEWAY"] = 1] = "GATEWAY";
    })(ConfigurationType || (ConfigurationType = {}));

    class StreamInfo {
      constructor(config) {
        this.bitrate = 0;
        if (config !== undefined && config !== null) {
          this.label = "sd";
          if (config.label !== undefined && config.label !== null) this.label = config.label;
          if (config.width !== undefined && config.width !== null) this.width = config.width;
          if (config.height !== undefined && config.height !== null) this.height = config.height;
          if (config.fps !== undefined && config.fps !== null) this.fps = config.fps;
          if (config.bitrate !== undefined && config.bitrate !== null) this.bitrate = config.bitrate;
        }
      }
      getLabel() {
        return this.label;
      }
      getWidth() {
        return this.width;
      }
      getHeight() {
        return this.height;
      }
      getFPS() {
        return this.fps;
      }
      getBitrate() {
        return this.bitrate;
      }
      toString() {
        return "label: " + this.label + " | width: " + this.width + " | height: " + this.height + " | bitrate: " + this.bitrate;
      }
    }

    class WebRTCStreamItem {
      constructor(streamName, applicationName, host) {
        this.streamName = streamName;
        this.applicationName = applicationName;
        this.host = host;
      }
      getStreamName() {
        return this.streamName;
      }
      getApplicationName() {
        return this.applicationName;
      }
      getHost() {
        return this.host;
      }
      getType() {
        return ProtocolType.WEBRTC;
      }
    }

    class RTSPSourceItem extends AbstractSourceItem {
      constructor(host, application, streamKey, port, streamInfo, defaultSource) {
        super(ProtocolType.RTSP, streamInfo);
        this.host = host;
        this.application = application;
        this.streamKey = streamKey;
        this.port = port;
        this.defaultSource = defaultSource;
      }
      getHost() {
        return this.host;
      }
      getPort() {
        return this.port;
      }
      getApplicationName() {
        return this.application;
      }
      getStreamKey() {
        return this.streamKey;
      }
      isDefaultSource() {
        return this.defaultSource;
      }
      toString() {
        return "type: RTMP | url: " + this.host + " | port: " + this.port;
      }
    }

    class StreamConfig {
      constructor(streamConfig, roleType, configurationType) {
        this.PRINT_ON_STARTUP = true;
        this.DEFAULT_STORM_PORT = 443;
        this.IS_SSL_BY_DEFAULT = true;
        this.serverList = new Array();
        this.sourceList = new Array();
        this.roleType = roleType;
        this.configurationType = configurationType;
        this.parse(streamConfig, roleType);
      }
      parse(streamConfig, roleType) {
        this.streamConfig = streamConfig;
        if (this.streamConfig !== undefined && this.streamConfig !== null) {
          if (this.configurationType == ConfigurationType.EMBEDDED) {
            if (roleType == RoleType.PLAYER) {
              if (this.streamConfig.serverList !== undefined && this.streamConfig.serverList !== null) {
                if (this.streamConfig.serverList.length !== 0) {
                  for (let i = 0; i < this.streamConfig.serverList.length; i++) {
                    let host;
                    let application;
                    let port = this.DEFAULT_STORM_PORT;
                    let isSSL = this.IS_SSL_BY_DEFAULT;
                    if (this.streamConfig.serverList[i].host !== undefined && this.streamConfig.serverList[i].host !== null) host = this.streamConfig.serverList[i].host;else throw new Error("Error while parsing server object (\"host\" filed is missing). Please check player config!");
                    if (this.streamConfig.serverList[i].application !== undefined && this.streamConfig.serverList[i].application !== null) application = this.streamConfig.serverList[i].application;else throw new Error("Error while parsing server object (\"application\" filed is missing). Please check player config!");
                    if (this.streamConfig.serverList[i].port !== undefined && this.streamConfig.serverList[i].port !== null) port = this.streamConfig.serverList[i].port;
                    if (this.streamConfig.serverList[i].ssl !== undefined && this.streamConfig.serverList[i].ssl !== null) isSSL = this.streamConfig.serverList[i].ssl;
                    this.serverList.push(new StormServerItem(host, application, port, isSSL));
                  }
                } else throw new Error("Server list configuration is empty. Please check stream config!");
              } else throw new Error("Server list configuration is missing. Please check stream config!");
              if (this.streamConfig.sourceList !== undefined && this.streamConfig.sourceList !== null) {
                if (this.streamConfig.sourceList.length !== 0) {
                  for (let i = 0; i < this.streamConfig.sourceList.length; i++) {
                    let protocol = "none";
                    let isDefault = false;
                    if (this.streamConfig.sourceList[i].protocol !== undefined && this.streamConfig.sourceList[i].protocol !== null) protocol = this.streamConfig.sourceList[i].protocol;else throw new Error("Error while parsing source object (\"protocol\" filed is missing). Please check player config!");
                    if (this.streamConfig.sourceList[i].default !== undefined && this.streamConfig.sourceList[i].default !== null) isDefault = this.streamConfig.sourceList[i].default;
                    switch (protocol.toLowerCase()) {
                      case "storm":
                        let streamKey = "";
                        let streamInfo = null;
                        if (this.streamConfig.sourceList[i].streamKey !== undefined && this.streamConfig.sourceList[i].streamKey !== null) streamKey = this.streamConfig.sourceList[i].streamKey;else throw new Error("Missing \"streamKey\" parameter in stream source element");
                        if (this.streamConfig.sourceList[i].streamInfo !== undefined && this.streamConfig.sourceList[i].streamInfo !== null) streamInfo = this.streamConfig.sourceList[i].streamInfo;else streamInfo = {
                          label: "",
                          width: 0,
                          height: 0,
                          fps: 0,
                          bitrate: 0
                        };
                        this.sourceList.push(new StormSourceItem(streamKey, new StreamInfo(streamInfo), isDefault));
                        break;
                      case "rtmp":
                        let rtmpHost = "";
                        let rtmpApplication = "";
                        let rtmpStreamKey = "";
                        let rtmpPort = 1935;
                        let rtmpInfo = null;
                        if (this.streamConfig.sourceList[i].host !== undefined && this.streamConfig.sourceList[i].host !== null) rtmpHost = this.streamConfig.sourceList[i].host;else throw new Error("Missing \"host\" parameter in stream source element");
                        if (this.streamConfig.sourceList[i].application !== undefined && this.streamConfig.sourceList[i].application !== null) rtmpApplication = this.streamConfig.sourceList[i].application;else throw new Error("Missing \"application\" parameter in stream source element");
                        if (this.streamConfig.sourceList[i].streamKey !== undefined && this.streamConfig.sourceList[i].streamKey !== null) rtmpStreamKey = this.streamConfig.sourceList[i].streamKey;else throw new Error("Missing \"streamName\" parameter in stream source element");
                        if (this.streamConfig.sourceList[i].port !== undefined && this.streamConfig.sourceList[i].port !== null) rtmpPort = this.streamConfig.sourceList[i].port;
                        if (this.streamConfig.sourceList[i].streamInfo !== undefined && this.streamConfig.sourceList[i].streamInfo !== null) rtmpInfo = this.streamConfig.sourceList[i].streamInfo;else rtmpInfo = {
                          label: "",
                          width: 0,
                          height: 0,
                          fps: 0,
                          bitrate: 0
                        };
                        this.sourceList.push(new RTMPSourceItem(rtmpHost, rtmpApplication, rtmpStreamKey, rtmpPort, new StreamInfo(rtmpInfo), isDefault));
                        break;
                      case "rtsp":
                        let rtspHost = "";
                        let rtspApplication = "";
                        let rtspStreamKey = "";
                        let rtspPort = 1935;
                        let rtspInfo = null;
                        if (this.streamConfig.sourceList[i].host !== undefined && this.streamConfig.sourceList[i].host !== null) rtspHost = this.streamConfig.sourceList[i].host;else throw new Error("Missing \"host\" parameter in stream source element");
                        if (this.streamConfig.sourceList[i].application !== undefined && this.streamConfig.sourceList[i].application !== null) rtspApplication = this.streamConfig.sourceList[i].application;else throw new Error("Missing \"application\" parameter in stream source element");
                        if (this.streamConfig.sourceList[i].streamKey !== undefined && this.streamConfig.sourceList[i].streamKey !== null) rtspStreamKey = this.streamConfig.sourceList[i].streamKey;else throw new Error("Missing \"streamName\" parameter in stream source element");
                        if (this.streamConfig.sourceList[i].port !== undefined && this.streamConfig.sourceList[i].port !== null) rtspPort = this.streamConfig.sourceList[i].port;
                        if (this.streamConfig.sourceList[i].streamInfo !== undefined && this.streamConfig.sourceList[i].streamInfo !== null) rtspInfo = this.streamConfig.sourceList[i].streamInfo;else rtspInfo = {
                          label: "",
                          width: 0,
                          height: 0,
                          fps: 0,
                          bitrate: 0
                        };
                        this.sourceList.push(new RTSPSourceItem(rtspHost, rtspApplication, rtspStreamKey, rtspPort, new StreamInfo(rtspInfo), isDefault));
                        break;
                      case "webrtc":
                        let rtcStreamKey = "";
                        let rtcInfo = null;
                        if (this.streamConfig.sourceList[i].streamKey !== undefined && this.streamConfig.serverList[i].streamKey !== null) rtcStreamKey = this.streamConfig.sourceList[i].streamKey;else throw new Error("Missing \"streamName\" parameter in stream source element");
                        if (this.streamConfig.sourceList[i].streamInfo !== undefined && this.streamConfig.serverList[i].streamInfo !== null) rtcInfo = this.streamConfig.sourceList[i].streamKey;else rtcInfo = {
                          label: "",
                          width: 0,
                          height: 0,
                          fps: 0,
                          bitrate: 0
                        };
                        this.sourceList.push(new WebRTCSourceItem(rtcStreamKey, new StreamInfo(rtcInfo), isDefault));
                        break;
                      default:
                        throw new Error("Error while parsing source object (unknown protocol). Please check player config!");
                    }
                  }
                } else throw new Error("Source list configuration is missing. Please check player config!");
              } else throw new Error("Source list configuration is missing. Please check player config!");
            }
            if (roleType == RoleType.STREAMER) {
              if (this.streamConfig.publishData !== undefined && this.streamConfig.publishData !== null) {
                if (this.streamConfig.publishData.protocol !== undefined && this.streamConfig.publishData.protocol !== null) {
                  switch (this.streamConfig.publishData.protocol.toLowerCase()) {
                    case "webrtc":
                      let streamName;
                      let applicationName;
                      let host;
                      if (this.streamConfig.publishData.streamName !== undefined && this.streamConfig.publishData.streamName !== null) streamName = this.streamConfig.publishData.streamName;else throw new Error("Stream data configuration is missing. Please check streamer config!");
                      if (this.streamConfig.publishData.application !== undefined && this.streamConfig.publishData.application !== null) applicationName = this.streamConfig.publishData.application;else throw new Error("Stream data configuration is missing. Please check streamer config!");
                      if (this.streamConfig.publishData.host !== undefined && this.streamConfig.publishData.host !== null) host = this.streamConfig.publishData.host;else throw new Error("Stream data configuration is missing. Please check streamer config!");
                      this.publishData = new WebRTCStreamItem(streamName, applicationName, host);
                      break;
                    default:
                      throw new Error("Unknown \"protocol\" field in stream data element. Please check player config!");
                  }
                } else throw new Error("Missing \"protocol\" field in stream data element. Please check player config!");
              } else throw new Error("Stream data configuration is missing. Please check player config!");
            }
          } else if (this.configurationType == ConfigurationType.GATEWAY) {
            if (this.streamConfig.serverList !== undefined && this.streamConfig.serverList !== null) {
              if (this.streamConfig.serverList.length !== 0) {
                for (let i = 0; i < this.streamConfig.serverList.length; i++) {
                  let host;
                  let application;
                  let port = this.DEFAULT_STORM_PORT;
                  let isSSL = this.IS_SSL_BY_DEFAULT;
                  if (this.streamConfig.serverList[i].host !== undefined && this.streamConfig.serverList[i].host !== null) host = this.streamConfig.serverList[i].host;else throw new Error("Error while parsing server object (\"host\" filed is missing). Please check player config!");
                  if (this.streamConfig.serverList[i].application !== undefined && this.streamConfig.serverList[i].application !== null) application = this.streamConfig.serverList[i].application;else throw new Error("Error while parsing server object (\"application\" filed is missing). Please check player config!");
                  if (this.streamConfig.serverList[i].port !== undefined && this.streamConfig.serverList[i].port !== null) port = this.streamConfig.serverList[i].port;
                  if (this.streamConfig.serverList[i].ssl !== undefined && this.streamConfig.serverList[i].ssl !== null) isSSL = this.streamConfig.serverList[i].ssl;
                  this.serverList.push(new StormServerItem(host, application, port, isSSL));
                }
              } else throw new Error("Gateway server list configuration is empty. Please check player config!");
            } else throw new Error("Gateway server list configuration is missing. Please check player config!");
            if (this.streamConfig.streamKey !== undefined && this.streamConfig.streamKey !== null) this.streamKey = this.streamConfig.streamKey;else throw new Error("StreamKey for gateway was not defined! Please check stream config!");
          } else throw new Error("Unknown configurationType was defined in stream config!");
          if (this.streamConfig.security !== undefined && this.streamConfig.security !== null) this.securityConfig = new SecurityConfig(this.streamConfig.security);else this.securityConfig = new SecurityConfig(null);
        } else throw new Error("Stream configuration is missing. Please check stream config!");
      }
      getServerList() {
        return this.serverList;
      }
      getSourceList() {
        return this.sourceList;
      }
      getGatewayStreamKey() {
        return this.streamKey;
      }
      getType(source) {
        if (source instanceof StormSourceItem) {
          return "StormSourceItem";
        } else if (source instanceof RTMPSourceItem) {
          return "RTMPSourceItem";
        } else {
          return "Object";
        }
      }
      addSourceStream(source) {
        let newSourceItem;
        switch (this.getType(source)) {
          case "StormSourceItem":
            newSourceItem = source;
            break;
          case "RTMPSourceItem":
            newSourceItem = source;
            break;
          case "Object":
            let sourceObject = source;
            let protocol = "none";
            let isDefault = false;
            if (sourceObject.protocol !== undefined && sourceObject.protocol !== null) protocol = sourceObject.protocol;else throw new Error("Error while parsing source object (\"protocol\" filed is missing). Please check player config!");
            if (sourceObject.default !== undefined && sourceObject.default !== null) isDefault = sourceObject.default;
            switch (protocol.toLowerCase()) {
              case "storm":
                let streamKey = "";
                let streamInfo = null;
                if (sourceObject.streamKey !== undefined && sourceObject.streamKey !== null) streamKey = sourceObject.streamKey;else throw new Error("Missing \"streamKey\" parameter in stream source element");
                if (sourceObject.streamInfo !== undefined && sourceObject.streamInfo !== null) streamInfo = sourceObject.streamInfo;else streamInfo = {
                  label: "",
                  width: 0,
                  height: 0,
                  fps: 0,
                  bitrate: 0
                };
                newSourceItem = new StormSourceItem(streamKey, new StreamInfo(streamInfo), isDefault);
                this.sourceList.push(newSourceItem);
                break;
              case "rtmp":
                let rtmpHost = "";
                let rtmpApplication = "";
                let rtmpStreamKey = "";
                let rtmpPort = 1935;
                let rtmpInfo = null;
                if (sourceObject.host !== undefined && sourceObject.host !== null) rtmpHost = sourceObject.host;else throw new Error("Missing \"host\" parameter in stream source element");
                if (sourceObject.application !== undefined && sourceObject.application !== null) rtmpApplication = sourceObject.application;else throw new Error("Missing \"application\" parameter in stream source element");
                if (sourceObject.streamKey !== undefined && sourceObject.streamKey !== null) rtmpStreamKey = sourceObject.streamKey;else throw new Error("Missing \"streamName\" parameter in stream source element");
                if (sourceObject.port !== undefined && sourceObject.port !== null) rtmpPort = sourceObject.port;
                if (sourceObject.streamInfo !== undefined && sourceObject.streamInfo !== null) rtmpInfo = sourceObject.streamInfo;else rtmpInfo = {
                  label: "",
                  width: 0,
                  height: 0,
                  fps: 0,
                  bitrate: 0
                };
                newSourceItem = new RTMPSourceItem(rtmpHost, rtmpApplication, rtmpStreamKey, rtmpPort, new StreamInfo(rtmpInfo), isDefault);
                this.sourceList.push(newSourceItem);
                break;
              case "webrtc":
                let rtcStreamKey = "";
                let rtcInfo = null;
                if (sourceObject.streamKey !== undefined && sourceObject.streamKey !== null) rtcStreamKey = sourceObject.streamKey;else throw new Error("Missing \"streamName\" parameter in stream source element");
                if (sourceObject.streamInfo !== undefined && sourceObject.streamInfo !== null) rtcInfo = sourceObject.streamKey;else rtcInfo = {
                  label: "",
                  width: 0,
                  height: 0,
                  fps: 0,
                  bitrate: 0
                };
                newSourceItem = new WebRTCSourceItem(rtcStreamKey, new StreamInfo(rtcInfo), isDefault);
                this.sourceList.push(new WebRTCSourceItem(rtcStreamKey, new StreamInfo(rtcInfo), isDefault));
                break;
              default:
                throw new Error("Error while parsing source object (unknown protocol). Please check player config!");
            }
            break;
          default:
            throw new Error("Incompatible type");
        }
        return newSourceItem;
      }
      getSecurityConfig() {
        return this.securityConfig;
      }
      getPublishData() {
        return this.publishData;
      }
      getConfigurationType() {
        return this.configurationType;
      }
      setServerList(serverList) {
        this.serverList = serverList;
      }
      clearSourceList() {
        this.sourceList = new Array();
      }
      setSourceList(sourceList) {
        this.sourceList = sourceList;
      }
      getRole() {
        return this.roleType;
      }
      print(logger) {
        let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (this.PRINT_ON_STARTUP || force) {
          logger.info(this, "Server List:");
          for (let i = 0; i < this.serverList.length; i++) {
            logger.info(this, "=> [" + i + "] " + this.serverList[i].toString());
          }
          logger.info(this, "Stream List:");
          for (let i = 0; i < this.sourceList.length; i++) {
            logger.info(this, "=> [" + i + "] " + this.sourceList[i].toString());
          }
          this.securityConfig.print(logger);
        }
      }
    }

    class BufferConfig {
      constructor(bufferConfig) {
        this.PRINT_ON_STARTUP = true;
        this.minValue = 0.1;
        this.maxValue = 2.0;
        this.startValue = 0.15;
        this.targetValue = 0.1;
        this.parse(bufferConfig);
      }
      parse(bufferConfig) {
        this.bufferConfig = bufferConfig;
        if (this.bufferConfig !== undefined && this.bufferConfig !== null) {
          if (this.bufferConfig.minValue !== undefined && this.bufferConfig.minValue !== null) this.minValue = this.bufferConfig.minValue;
          if (this.bufferConfig.maxValue !== undefined && this.bufferConfig.maxValue !== null) this.maxValue = this.bufferConfig.maxValue;
          if (this.bufferConfig.startValue !== undefined && this.bufferConfig.startValue !== null) this.startValue = this.bufferConfig.startValue;
          if (this.bufferConfig.targetValue !== undefined && this.bufferConfig.targetValue !== null) this.targetValue = this.bufferConfig.targetValue;
        }
      }
      getMinValue() {
        return this.minValue;
      }
      getMaxValue() {
        return this.maxValue;
      }
      getStartValue() {
        return this.startValue;
      }
      getTargetValue() {
        return this.targetValue;
      }
      setMinValue(newValue) {
        this.minValue = newValue;
      }
      setMaxValue(newValue) {
        this.maxValue = newValue;
      }
      setTargetValue(newValue) {
        this.targetValue = newValue;
      }
      setStartValue(newValue) {
        this.startValue = newValue;
      }
      setConfig(config) {
        this.bufferConfig = config;
      }
      print(logger) {
        let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (this.PRINT_ON_STARTUP || force) logger.info(this, "minValue: " + this.minValue + " | maxValue: " + this.maxValue + " | startValue: " + this.startValue + " | targetValue: " + this.targetValue);
      }
    }

    class StorageConfig {
      constructor(storageConfig) {
        this.PRINT_ON_STARTUP = true;
        this.storageEnabled = true;
        this.prefix = "";
        this.parse(storageConfig);
      }
      parse(storageConfig) {
        this.storageConfig = storageConfig;
        if (this.storageConfig !== undefined && this.storageConfig !== null) {
          if (this.storageConfig.enabled !== undefined && this.storageConfig.enabled !== null) this.storageEnabled = this.storageConfig.enabled;
          if (this.storageConfig.prefix !== undefined && this.storageConfig.prefix !== null) this.prefix = this.storageConfig.prefix;
        }
      }
      isStorageEnabled() {
        return this.storageEnabled;
      }
      setStorageEnabled(newValue) {
        this.storageEnabled = newValue;
      }
      getPrefix() {
        return this.prefix;
      }
      setPrefix(newValue) {
        this.prefix = newValue;
      }
      setConfig(config) {
        this.storageConfig = config;
      }
      print(logger) {
        let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (this.PRINT_ON_STARTUP || force) {
          logger.info(this, "StorageConfig:: enabled: " + this.storageEnabled);
          logger.info(this, "StorageConfig:: prefix: \"" + this.prefix + "\"");
        }
      }
    }

    var ScalingType;
    (function (ScalingType) {
      ScalingType[ScalingType["FILL"] = 0] = "FILL";
      ScalingType[ScalingType["LETTER_BOX"] = 1] = "LETTER_BOX";
      ScalingType[ScalingType["CROP"] = 2] = "CROP";
      ScalingType[ScalingType["ORIGINAL"] = 3] = "ORIGINAL";
    })(ScalingType || (ScalingType = {}));

    class VideoConfig {
      constructor(videoConfig) {
        this.scalingMode = ScalingType.LETTER_BOX;
        this.aspectRatio = "none";
        this.videoWidthValue = 100;
        this.isVideoWidthInPixels = false;
        this.wasVideoWidthProvided = false;
        this.videoHeightValue = 100;
        this.isVideoHeightInPixels = false;
        this.wasVideoHeightProvided = false;
        this.parse(videoConfig);
      }
      parse(config) {
        this.videoConfig = config;
        if (this.videoConfig !== undefined && this.videoConfig !== null) {
          if (this.videoConfig.aspectRatio !== undefined && this.videoConfig.aspectRatio !== null) {
            const aspectRatioRegexString = '^[0-9]*\\.?[0-9]+:[0-9]*\\.?[0-9]+$';
            const aspectRatioRegex = new RegExp(aspectRatioRegexString);
            let tempAspectRatio = this.videoConfig.aspectRatio;
            if (aspectRatioRegex.test(tempAspectRatio)) {
              this.aspectRatio = tempAspectRatio;
            } else throw new Error("Parameter \"aspectRatio\" - must match \"number:number\" pattern ");
            this.aspectRatio = this.videoConfig.aspectRatio;
          }
          if (this.videoConfig.scalingMode !== undefined && this.videoConfig.scalingMode !== null) {
            let newScalingMode = this.videoConfig.scalingMode;
            switch (newScalingMode.toLowerCase()) {
              case "fill":
                this.scalingMode = ScalingType.FILL;
                break;
              case "letterbox":
                this.scalingMode = ScalingType.LETTER_BOX;
                break;
              case "crop":
                this.scalingMode = ScalingType.CROP;
                break;
              case "original":
                this.scalingMode = ScalingType.ORIGINAL;
                break;
              default:
                throw new Error("Unknown video scaling mode. Please check player config!");
            }
          }
          if (this.videoConfig.width !== undefined) {
            if (this.videoConfig.width !== null) {
              if (typeof this.videoConfig.width === "number") {
                this.videoWidthValue = this.videoConfig.width;
                this.isVideoWidthInPixels = true;
              } else if (typeof this.videoConfig.width === "string") {
                if (this.videoConfig.width.toLowerCase().endsWith('px')) {
                  this.videoWidthValue = parseInt(this.videoConfig.width);
                  this.isVideoWidthInPixels = true;
                } else if (this.videoConfig.width.toLowerCase().endsWith('%')) {
                  this.videoWidthValue = parseInt(this.videoConfig.width);
                  this.isVideoWidthInPixels = false;
                }
              } else throw new Error("Unknown type for parameter \"width\" - it must be a number or a string! ");
              this.wasVideoWidthProvided = true;
            } else throw new Error("Parameter \"width\" cannot be empty");
          }
          if (this.videoConfig.height !== undefined) {
            if (this.videoConfig.height !== null) {
              if (typeof this.videoConfig.height === "number") {
                this.videoHeightValue = this.videoConfig.height;
                this.isVideoHeightInPixels = true;
              } else if (typeof this.videoConfig.height === "string") {
                if (this.videoConfig.height.toLowerCase().endsWith('px')) {
                  this.videoHeightValue = parseInt(this.videoConfig.height);
                  this.isVideoHeightInPixels = true;
                } else if (this.videoConfig.height.toLowerCase().endsWith('%')) {
                  this.videoHeightValue = parseInt(this.videoConfig.height);
                  this.isVideoHeightInPixels = false;
                }
              } else throw new Error("Unknown type for parameter \"height\" - it must be a number or a string!");
              this.wasVideoHeightProvided = true;
            } else throw new Error("Parameter \"height\" cannot be empty");
          }
          if (this.videoConfig.containerID !== undefined && this.videoConfig.containerID !== null) {
            this.containerID = this.videoConfig.containerID;
            if (document.getElementById(this.containerID) === null) {
              throw new Error("No video object with id \"" + this.containerID + "\" was found for this player. Please check player config!");
            }
          } else throw new Error("No video object name was provided for this player. Please check player config!");
        } else throw new Error("Missing video configuration. Please check player config!");
      }
      getScalingMode() {
        return this.scalingMode;
      }
      setConfig(config) {
        this.videoConfig = config;
      }
      getContainerID() {
        return this.containerID;
      }
      getVideoWidthValue() {
        return this.videoWidthValue;
      }
      getIfVideoWidthInPixels() {
        return this.isVideoWidthInPixels;
      }
      getIfVideoWidthWasProvided() {
        return this.wasVideoWidthProvided;
      }
      getVideoHeightValue() {
        return this.videoHeightValue;
      }
      getIfVideoHeightInPixels() {
        return this.isVideoHeightInPixels;
      }
      getIfVideoHeightWasProvided() {
        return this.wasVideoHeightProvided;
      }
      getAspectRatio() {
        return this.aspectRatio;
      }
      setVideoWidthValue(newWidth) {
        this.videoWidthValue = newWidth;
      }
      setIfVideoWidthInPixels(value) {
        this.isVideoWidthInPixels = value;
      }
      setVideoHeightValue(newHeight) {
        this.videoHeightValue = newHeight;
      }
      setIfVideoHeightInPixels(value) {
        this.isVideoHeightInPixels = value;
      }
      setContainerID(newContainerID) {
        this.containerID = newContainerID;
      }
      setScalingMode(newScalingMode) {
        switch (newScalingMode.toLowerCase()) {
          case "fill":
            this.scalingMode = ScalingType.FILL;
            break;
          case "letterbox":
            this.scalingMode = ScalingType.LETTER_BOX;
            break;
          case "crop":
            this.scalingMode = ScalingType.CROP;
            break;
          case "original":
            this.scalingMode = ScalingType.ORIGINAL;
            break;
          default:
            throw new Error("Unknown video scaling mode. Please check player config!");
        }
      }
      print(logger) {
        let scalingMode = "";
        switch (this.scalingMode) {
          case ScalingType.FILL:
            scalingMode = "fill";
            break;
          case ScalingType.LETTER_BOX:
            scalingMode = "letterbox";
            break;
          case ScalingType.CROP:
            scalingMode = "crop";
            break;
          case ScalingType.ORIGINAL:
            scalingMode = "original";
            break;
        }
        logger.info(this, "VideoConfig :: containerID: " + this.containerID);
        logger.info(this, "VideoConfig :: scalingMode: " + scalingMode);
        logger.info(this, "VideoConfig :: width: " + this.videoWidthValue + (this.isVideoWidthInPixels ? "px" : "%") + (this.wasVideoWidthProvided ? " (provided)" : " (default)"));
        logger.info(this, "VideoConfig :: height: " + this.videoHeightValue + (this.isVideoHeightInPixels ? "px" : "%") + (this.wasVideoHeightProvided ? " (provided)" : " (default)"));
      }
    }

    var LogType;
    (function (LogType) {
      LogType[LogType["TRACE"] = 0] = "TRACE";
      LogType[LogType["INFO"] = 1] = "INFO";
      LogType[LogType["SUCCESS"] = 2] = "SUCCESS";
      LogType[LogType["WARNING"] = 3] = "WARNING";
      LogType[LogType["ERROR"] = 4] = "ERROR";
    })(LogType || (LogType = {}));

    class DebugConfig {
      constructor(debugConfig) {
        this.PRINT_ON_STARTUP = true;
        this.consoleEnabled = false;
        this.consoleLogTypes = [LogType.INFO, LogType.ERROR, LogType.SUCCESS, LogType.TRACE, LogType.WARNING];
        this.consoleMonoColor = false;
        this.containerEnabled = false;
        this.containerLogTypes = [LogType.INFO, LogType.ERROR, LogType.SUCCESS, LogType.TRACE, LogType.WARNING];
        this.containerMonoColor = false;
        this.parse(debugConfig);
      }
      parse(debugConfig) {
        this.debugConfig = debugConfig;
        if (this.debugConfig !== undefined && this.debugConfig !== null) {
          if (this.debugConfig.console !== undefined && this.debugConfig.console != null) {
            let consoleData = this.debugConfig.console;
            if (consoleData.enabled !== undefined && consoleData.enabled !== null) this.consoleEnabled = consoleData.enabled;
            if (consoleData.logTypes !== undefined && consoleData.logTypes !== null) {
              if (consoleData.logTypes.length !== 0) {
                this.consoleLogTypes = new Array();
                for (let i = 0; i < consoleData.logTypes.length; i++) {
                  switch (consoleData.logTypes[i].toLowerCase()) {
                    case "info":
                      this.consoleLogTypes.push(LogType.INFO);
                      break;
                    case "error":
                      this.consoleLogTypes.push(LogType.ERROR);
                      break;
                    case "warning":
                      this.consoleLogTypes.push(LogType.WARNING);
                      break;
                    case "success":
                      this.consoleLogTypes.push(LogType.SUCCESS);
                      break;
                    case "trace":
                      this.consoleLogTypes.push(LogType.TRACE);
                      break;
                  }
                }
              }
            }
            if (consoleData.monoColor !== undefined && consoleData.monoColor !== null) this.consoleMonoColor = consoleData.monoColor;
          }
          if (this.debugConfig.container !== undefined && this.debugConfig.container != null) {
            let containerData = this.debugConfig.container;
            if (containerData.enabled !== undefined && containerData.enabled !== null) this.containerEnabled = containerData.enabled;
            if (containerData.logTypes !== undefined && containerData.logTypes !== null) {
              if (containerData.logTypes.length !== 0) {
                this.containerLogTypes = new Array();
                for (let i = 0; i < containerData.logTypes.length; i++) {
                  switch (containerData.logTypes[i].toLowerCase()) {
                    case "info":
                      this.containerLogTypes.push(LogType.INFO);
                      break;
                    case "error":
                      this.containerLogTypes.push(LogType.ERROR);
                      break;
                    case "warning":
                      this.containerLogTypes.push(LogType.WARNING);
                      break;
                    case "success":
                      this.containerLogTypes.push(LogType.SUCCESS);
                      break;
                    case "trace":
                      this.containerLogTypes.push(LogType.TRACE);
                      break;
                  }
                }
              }
            }
            if (containerData.monoColor !== undefined && containerData.monoColor !== null) this.containerMonoColor = containerData.monoColor;
            if (containerData.containerID !== undefined && containerData.containerID !== null) this.containerID = containerData.containerID;
          }
        }
      }
      isConsoleEnabled() {
        return this.consoleEnabled;
      }
      setConsoleEnabled(newValue) {
        this.consoleEnabled = newValue;
      }
      getConsoleLogTypes() {
        return this.consoleLogTypes;
      }
      setConsoleLogTypes(newValue) {
        this.consoleLogTypes = new Array();
        for (let i = 0; i < newValue.length; i++) {
          switch (newValue[i].toLowerCase()) {
            case "info":
              this.consoleLogTypes.push(LogType.INFO);
              break;
            case "error":
              this.consoleLogTypes.push(LogType.ERROR);
              break;
            case "warning":
              this.consoleLogTypes.push(LogType.WARNING);
              break;
            case "success":
              this.consoleLogTypes.push(LogType.SUCCESS);
              break;
            case "trace":
              this.consoleLogTypes.push(LogType.TRACE);
              break;
          }
        }
      }
      isContainerEnabled() {
        return this.containerEnabled;
      }
      setContainerEnabled(newValue) {
        this.consoleEnabled = newValue;
      }
      isConsoleMonoColor() {
        return this.consoleMonoColor;
      }
      setConsoleMonoColor(newValue) {
        this.consoleMonoColor = newValue;
      }
      getContainerLogTypes() {
        return this.containerLogTypes;
      }
      setContainerLogTypes(newValue) {
        this.containerLogTypes = new Array();
        for (let i = 0; i < newValue.length; i++) {
          switch (newValue[i].toLowerCase()) {
            case "info":
              this.containerLogTypes.push(LogType.INFO);
              break;
            case "error":
              this.containerLogTypes.push(LogType.ERROR);
              break;
            case "warning":
              this.containerLogTypes.push(LogType.WARNING);
              break;
            case "success":
              this.containerLogTypes.push(LogType.SUCCESS);
              break;
            case "trace":
              this.containerLogTypes.push(LogType.TRACE);
              break;
          }
        }
      }
      getContainerID() {
        return this.containerID;
      }
      setContainerID(object) {
        this.containerID = object;
      }
      isContainerMonoColor() {
        return this.containerMonoColor;
      }
      setContainerMonoColor(newValue) {
        this.containerMonoColor = newValue;
      }
      setConfig(config) {
        this.debugConfig = config;
      }
      print(logger) {
        let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (this.PRINT_ON_STARTUP || force) {
          let consoleLogTypes = "";
          for (let i = 0; i < this.consoleLogTypes.length; i++) {
            switch (this.consoleLogTypes[i]) {
              case LogType.TRACE:
                consoleLogTypes += "TRACE, ";
                break;
              case LogType.SUCCESS:
                consoleLogTypes += "SUCCESS, ";
                break;
              case LogType.WARNING:
                consoleLogTypes += "WARNING, ";
                break;
              case LogType.INFO:
                consoleLogTypes += "INFO, ";
                break;
              case LogType.ERROR:
                consoleLogTypes += "ERROR, ";
                break;
            }
          }
          logger.info(this, "Console:: enabled: " + this.consoleEnabled);
          logger.info(this, "Console:: logTypes: " + consoleLogTypes);
          logger.info(this, "Console:: monoColor: " + this.consoleMonoColor);
          let containerLogTypes = "";
          for (let i = 0; i < this.containerLogTypes.length; i++) {
            switch (this.containerLogTypes[i]) {
              case LogType.TRACE:
                containerLogTypes += "TRACE, ";
                break;
              case LogType.SUCCESS:
                containerLogTypes += "SUCCESS, ";
                break;
              case LogType.WARNING:
                containerLogTypes += "WARNING, ";
                break;
              case LogType.INFO:
                containerLogTypes += "INFO, ";
                break;
              case LogType.ERROR:
                containerLogTypes += "ERROR, ";
                break;
            }
          }
          logger.info(this, "Container:: enabled: " + this.containerEnabled);
          logger.info(this, "Container:: logTypes: " + containerLogTypes);
          logger.info(this, "Container:: containerID: " + this.containerID);
          logger.info(this, "Container:: monoColor: " + this.consoleMonoColor);
        }
      }
    }

    class AudioConfig {
      constructor(volumeConfig) {
        this.PRINT_ON_STARTUP = true;
        this.startVolume = 100;
        this.maxVolume = 100;
        this.rememberValue = true;
        this.parse(volumeConfig);
      }
      parse(config) {
        this.volumeConfig = config;
        if (this.volumeConfig !== undefined && this.volumeConfig !== null) {
          if (this.volumeConfig.startVolume !== undefined && this.volumeConfig.startVolume !== null) this.startVolume = this.volumeConfig.startVolume;
          if (this.volumeConfig.maxVolume !== undefined && this.volumeConfig.maxVolume !== null) this.maxVolume = this.volumeConfig.maxVolume;
          if (this.volumeConfig.rememberValue !== undefined && this.volumeConfig.rememberValue !== null) this.rememberValue = this.volumeConfig.rememberValue;
        }
      }
      getStartVolume() {
        return this.startVolume;
      }
      setStartVolume(newValue) {
        this.startVolume = newValue;
      }
      getMaxVolume() {
        return this.maxVolume;
      }
      setMaxVolume(newValue) {
        this.maxVolume = newValue;
      }
      isRememberValue() {
        return this.rememberValue;
      }
      setRememberValue(newValue) {
        this.rememberValue = newValue;
      }
      setConfig(config) {
        this.volumeConfig = config;
      }
      print(logger) {
        let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (this.PRINT_ON_STARTUP || force) {
          logger.info(this, "Audio :: startVolume: " + this.startVolume + " | maxVolume: " + this.maxVolume + " | rememberValue: " + this.rememberValue);
        }
      }
    }

    class SettingsConfig {
      constructor(config) {
        this.PRINT_ON_STARTUP = true;
        this.restartOnError = false;
        this.reconnectTime = 3;
        this.autoStart = false;
        this.autoConnect = true;
        this.startOnDOMReady = false;
        this.iOSOnDomReadyFix = true;
        this.enabledProtocols = new Array(ProtocolType.STORM, ProtocolType.RTMP, ProtocolType.HLS);
        this.restartOnFocus = true;
        this.parse(config);
      }
      parse(config) {
        this.settingsConfig = config;
        if (this.settingsConfig.autoConnect !== undefined && this.settingsConfig.autoConnect !== null) this.autoConnect = this.settingsConfig.autoConnect;
        if (this.settingsConfig.autoStart !== undefined && this.settingsConfig.autoStart !== null) this.autoStart = this.settingsConfig.autoStart;
        if (this.settingsConfig.restartOnFocus !== undefined && this.settingsConfig.restartOnFocus !== null) this.restartOnFocus = this.settingsConfig.restartOnFocus;
        if (this.settingsConfig.restartOnError !== undefined && this.settingsConfig.restartOnError !== null) this.restartOnError = this.settingsConfig.restartOnError;
        if (this.settingsConfig.reconnectTime !== undefined && this.settingsConfig.reconnectTime !== null) this.reconnectTime = this.settingsConfig.reconnectTime;
        if (this.settingsConfig.enabledProtocols !== undefined && this.settingsConfig.enabledProtocols !== null) {
          let tempProtocols = this.settingsConfig.enabledProtocols;
          if (tempProtocols.length !== 0) {
            this.enabledProtocols = new Array();
            for (let i = 0; i < tempProtocols.length; i++) {
              switch (tempProtocols[i].toLowerCase()) {
                case "storm":
                  this.enabledProtocols.push(ProtocolType.STORM);
                  break;
                case "hls":
                  this.enabledProtocols.push(ProtocolType.HLS);
                  break;
                case "webrtc":
                  this.enabledProtocols.push(ProtocolType.WEBRTC);
                  break;
                default:
                  throw new Error("Unknown protocol \"" + tempProtocols[i] + "\". Please check your player config!");
              }
            }
          } else throw new Error("Missing \"enabledProtocols\" field. Please check your player config!");
        }
        if (this.settingsConfig.buffer !== undefined && this.settingsConfig.buffer !== null) this.bufferConfig = new BufferConfig(this.settingsConfig.buffer);else this.bufferConfig = new BufferConfig(null);
        if (this.settingsConfig.storage !== undefined && this.settingsConfig.storage !== null) this.storageConfig = new StorageConfig(this.settingsConfig.storage);else this.storageConfig = new StorageConfig(null);
        if (this.settingsConfig.video !== undefined && this.settingsConfig.video !== null) this.videoConfig = new VideoConfig(this.settingsConfig.video);else this.videoConfig = new VideoConfig(null);
        if (this.settingsConfig.audio !== undefined && this.settingsConfig.audio !== null) this.audioConfig = new AudioConfig(this.settingsConfig.volume);else this.audioConfig = new AudioConfig(null);
        if (this.settingsConfig.debug !== undefined && this.settingsConfig.debug !== null) this.debugConfig = new DebugConfig(this.settingsConfig.debug);else this.debugConfig = new DebugConfig(null);
      }
      getEnabledProtocols() {
        return this.enabledProtocols;
      }
      getIfProtocolEnabled(protocolName) {
        return this.enabledProtocols.indexOf(protocolName) >= 0;
      }
      getBufferConfig() {
        return this.bufferConfig;
      }
      getAudioConfig() {
        return this.audioConfig;
      }
      getVideoConfig() {
        return this.videoConfig;
      }
      getIfRestartOnError() {
        return this.restartOnError;
      }
      getReconnectTime() {
        return this.reconnectTime;
      }
      getIfAutoStart() {
        return this.autoStart;
      }
      setAutoStart(newValue) {
        this.autoStart = newValue;
      }
      getIfAutoConnect() {
        return this.autoConnect;
      }
      getIfRestartOnFocus() {
        return this.restartOnFocus;
      }
      getDebugConfig() {
        return this.debugConfig;
      }
      getStorageConfig() {
        return this.storageConfig;
      }
      setConfig(config) {
        this.settingsConfig = config;
      }
      getIfStartOnDOMReadyEnabled() {
        return this.startOnDOMReady;
      }
      getIfIOSOnDomStartFixEnabled() {
        return this.iOSOnDomReadyFix;
      }
      print(logger) {
        let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (this.PRINT_ON_STARTUP || force) {
          let enabledProtocols = "";
          for (let i = 0; i < this.enabledProtocols.length; i++) {
            switch (this.enabledProtocols[i]) {
              case ProtocolType.WEB_SOCKETS:
                enabledProtocols += "WebSockets, ";
                break;
              case ProtocolType.HLS:
                enabledProtocols += "HLS, ";
                break;
              case ProtocolType.WEBRTC:
                enabledProtocols += "WebRTC, ";
                break;
            }
          }
          logger.info(this, "SettingsConfig :: autoStart: " + this.autoStart);
          logger.info(this, "SettingsConfig :: restartOnError: " + this.restartOnError);
          logger.info(this, "SettingsConfig :: reconnectTime: " + this.reconnectTime);
          logger.info(this, "SettingsConfig :: enabledProtocols: " + enabledProtocols);
          this.bufferConfig.print(logger);
          this.videoConfig.print(logger);
          this.audioConfig.print(logger);
          this.storageConfig.print(logger);
          this.debugConfig.print(logger);
        }
      }
    }

    class ConfigManager {
      constructor(config) {
        this.PRINT_ON_STARTUP = true;
        this.roleType = RoleType.PLAYER;
        this.demoMode = false;
        this.parse(config);
      }
      parse(config) {
        this.config = config;
        if (this.config.role !== undefined && this.config.role !== null) {
          switch (this.config.role.toLowerCase()) {
            case "player":
              this.roleType = RoleType.PLAYER;
              break;
            case "streamer":
              this.roleType = RoleType.STREAMER;
              break;
            default:
              throw new Error("Unknown config role:\"" + this.config.role + "\"");
          }
        }
        if (this.config.configurationType !== undefined && this.config.configurationType !== null) {
          switch (this.config.configurationType.toLowerCase()) {
            case "embedded":
              this.configurationType = ConfigurationType.EMBEDDED;
              break;
            case "gateway":
              this.configurationType = ConfigurationType.GATEWAY;
              break;
            default:
              throw new Error("Unknown config type:\"" + this.configurationType + "\"");
          }
        } else throw new Error("No connectionType field was provided. Please check your player config!");
        if (this.config.stream !== undefined && this.config.stream !== null) this.stream = new StreamConfig(this.config.stream, this.roleType, this.configurationType);else throw new Error("No stream field was provided. Please check your player config!");
        if (this.config.settings !== undefined && this.config.settings !== null) this.settings = new SettingsConfig(this.config.settings);else this.settings = new SettingsConfig(null);
        if (this.config.demoMode !== undefined && this.config.demoMode !== null) this.demoMode = this.config.demoMode;
      }
      getConfigurationType() {
        return this.configurationType;
      }
      getRole() {
        return this.roleType;
      }
      getStream() {
        return this.stream;
      }
      getSettings() {
        return this.settings;
      }
      setConfig(config) {
        this.config = config;
      }
      getIfDemoMode() {
        return this.demoMode;
      }
      print(logger) {
        let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (this.PRINT_ON_STARTUP || force) {
          this.stream.print(logger);
          this.settings.print(logger);
        }
      }
    }

    class EventDispatcher {
      constructor() {
        this.listeners = {};
      }
      addEventListener(eventName, listener) {
        let removable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        if (!this.listeners[eventName]) this.listeners[eventName] = [];
        let elementFound = false;
        if (this.listeners[eventName] != undefined) {
          if (this.listeners[eventName].length > 0) {
            for (let i = 0; i < this.listeners[eventName].length; i++) {
              let element = this.listeners[eventName][i];
              if (element[1] == listener) {
                elementFound = true;
                break;
              }
            }
          }
        }
        this.logger.success(this, "Registering a new event: " + eventName);
        if (!elementFound) {
          this.listeners[eventName].push([eventName, listener, removable]);
          return true;
        } else return false;
      }
      removeEventListener(eventName, listener) {
        let elementFound = false;
        if (this.listeners[eventName] != undefined) {
          if (this.listeners[eventName].length > 0) {
            for (let i = 0; i < this.listeners[eventName].length; i++) {
              let element = this.listeners[eventName][i];
              if (listener) {
                if (element[1] == listener) {
                  if (element[2] == true) {
                    elementFound = true;
                    this.listeners[eventName].splice(i, 1);
                    break;
                  } else break;
                }
              } else {
                elementFound = true;
                if (element[2] == true) this.listeners[eventName].splice(i, 1);
              }
            }
          }
        }
        this.logger.success(this, "Removing listener: " + eventName);
        return elementFound;
      }
      removeAllEventListeners() {
        this.logger.success(this, "Removing all listeners!");
        for (let listener in this.listeners) {
          let eventName = listener;
          let branch = this.listeners[eventName];
          if (branch.length > 0) {
            for (let i = 0; i < branch.length; i++) {
              let element = branch[i];
              if (element[2] == true) branch.splice(i, 1);
            }
          }
        }
      }
      dispatchEvent(eventName, event) {
        if (this.listeners[eventName] != undefined) {
          if (this.listeners[eventName].length > 0) {
            for (let i = 0; i < this.listeners[eventName].length; i++) {
              let element = this.listeners[eventName][i];
              element[1].call(this, event);
            }
          }
        }
      }
    }

    class NumberUtilities {
      static addLeadingZero(number) {
        if (number < 10) {
          return "0" + number;
        } else {
          return String(number);
        }
      }
      static generateUniqueString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
    }

    class Logger {
      constructor(config, stormLibrary) {
        this.colorOrder = ["red", "green", "blue", "orange", "black", "violet"];
        this.logMemory = [];
        this.libraryInstanceID = -1;
        this.playerInstanceID = -1;
        this.debugConfig = config;
        this.stormPlayer = stormLibrary;
        this.libraryInstanceID = this.stormPlayer.getLibraryID();
        let colorID = this.colorOrder.length < stormLibrary.getLibraryID() ? this.colorOrder.length - 1 : stormLibrary.getLibraryID();
        this.monoColor = this.colorOrder[colorID];
      }
      info(objectName, message) {
        let output = this.logData(objectName, message);
        if (this.debugConfig.isConsoleEnabled()) {
          if (this.debugConfig.getConsoleLogTypes().indexOf(LogType.INFO) >= 0) {
            let consoleColor = this.debugConfig.isConsoleMonoColor() ? this.monoColor : Logger.INFO_COLOR;
            console.log('%c ' + output, 'color: ' + consoleColor);
          }
        }
        if (this.debugConfig.isContainerEnabled()) {
          if (this.debugConfig.getContainerLogTypes().indexOf(LogType.INFO) >= 0) {
            let containerColor = this.debugConfig.isContainerMonoColor() ? this.monoColor : Logger.INFO_COLOR;
            this.writeToContainer(output, containerColor);
          }
        }
      }
      warning(objectName, message) {
        let output = this.logData(objectName, message);
        if (this.debugConfig.isConsoleEnabled()) {
          if (this.debugConfig.getConsoleLogTypes().indexOf(LogType.WARNING) >= 0) {
            let consoleColor = this.debugConfig.isConsoleMonoColor() ? this.monoColor : Logger.WARNING_COLOR;
            console.log('%c ' + output, 'color: ' + consoleColor);
          }
        }
        if (this.debugConfig.isContainerEnabled()) {
          if (this.debugConfig.getContainerLogTypes().indexOf(LogType.WARNING) >= 0) {
            let containerColor = this.debugConfig.isContainerMonoColor() ? this.monoColor : Logger.WARNING_COLOR;
            this.writeToContainer(output, containerColor);
          }
        }
      }
      error(objectName, message) {
        let output = this.logData(objectName, message);
        if (this.debugConfig.isConsoleEnabled()) {
          if (this.debugConfig.getConsoleLogTypes().indexOf(LogType.ERROR) >= 0) {
            let consoleColor = this.debugConfig.isConsoleMonoColor() ? this.monoColor : Logger.ERROR_COLOR;
            console.log('%c ' + output, 'color: ' + consoleColor);
          }
        }
        if (this.debugConfig.isContainerEnabled()) {
          if (this.debugConfig.getContainerLogTypes().indexOf(LogType.ERROR) >= 0) {
            let containerColor = this.debugConfig.isContainerMonoColor() ? this.monoColor : Logger.ERROR_COLOR;
            this.writeToContainer(output, containerColor);
          }
        }
      }
      success(objectName, message) {
        let output = this.logData(objectName, message);
        if (this.debugConfig.isConsoleEnabled()) {
          if (this.debugConfig.getConsoleLogTypes().indexOf(LogType.SUCCESS) >= 0) {
            let consoleColor = this.debugConfig.isConsoleMonoColor() ? this.monoColor : Logger.SUCCESS_COLOR;
            console.log('%c ' + output, 'color: ' + consoleColor);
          }
        }
        if (this.debugConfig.isContainerEnabled()) {
          if (this.debugConfig.getContainerLogTypes().indexOf(LogType.SUCCESS) >= 0) {
            let containerColor = this.debugConfig.isContainerMonoColor() ? this.monoColor : Logger.SUCCESS_COLOR;
            this.writeToContainer(output, containerColor);
          }
        }
      }
      trace(objectName, message) {
        let output = this.logData(objectName, message);
        if (this.debugConfig.isConsoleEnabled()) {
          if (this.debugConfig.getConsoleLogTypes().indexOf(LogType.TRACE) >= 0) {
            let consoleColor = this.debugConfig.isConsoleMonoColor() ? this.monoColor : Logger.TRACE_COLOR;
            console.log('%c ' + output, 'color: ' + consoleColor);
          }
        }
        if (this.debugConfig.isContainerEnabled()) {
          if (this.debugConfig.getContainerLogTypes().indexOf(LogType.TRACE) >= 0) {
            let containerColor = this.debugConfig.isContainerMonoColor() ? this.monoColor : Logger.TRACE_COLOR;
            this.writeToContainer(output, containerColor);
          }
        }
      }
      logData(_objectName, message) {
        let date = new Date();
        let hour = NumberUtilities.addLeadingZero(date.getHours());
        let minutes = NumberUtilities.addLeadingZero(date.getMinutes());
        let seconds = NumberUtilities.addLeadingZero(date.getSeconds());
        let label = String(this.libraryInstanceID);
        if (this.playerInstanceID >= 0) label += "|" + this.playerInstanceID;
        let finalString = "(Storm) [ID:" + label + "] [" + hour + ":" + minutes + ":" + seconds + "] :: " + message;
        this.logMemory.push(finalString);
        return finalString;
      }
      writeToContainer(message, color) {
        let containerName = this.debugConfig.getContainerID();
        let container = document.getElementById(containerName);
        let log = document.createElement('span');
        log.innerText = message;
        log.style.color = color;
        container.appendChild(log);
      }
      setPlayerID(playerID) {
        this.playerInstanceID = playerID;
      }
      getAllLogs() {
        return this.logMemory;
      }
    }
    Logger.INFO_COLOR = "blue";
    Logger.WARNING_COLOR = "orange";
    Logger.ERROR_COLOR = "red";
    Logger.SUCCESS_COLOR = "green";
    Logger.TRACE_COLOR = "black";

    class ClientUser {
      constructor() {
        this.bandwidthCapabilities = 0;
      }
      setBandwidthCapabilities(newCapabilities) {
        this.bandwidthCapabilities = newCapabilities;
      }
      getBandwidthCapabilities() {
        return this.bandwidthCapabilities;
      }
    }

    var LibraryState;
    (function (LibraryState) {
      LibraryState["NOT_INITIALIZED"] = "notInitialized";
      LibraryState["INITIALIZED"] = "initialized";
      LibraryState["STARTED"] = "started";
      LibraryState["BUFFERING"] = "buffering";
      LibraryState["PLAYING"] = "playing";
      LibraryState["PAUSED"] = "paused";
      LibraryState["STOPPED"] = "stopped";
      LibraryState["DISCONNECTED"] = "disconnected";
      LibraryState["DESTROYED"] = "destroyed";
    })(LibraryState || (LibraryState = {}));

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /** Used as references for various `Number` constants. */
    var NAN = 0 / 0;

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt = parseInt;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max,
        nativeMin = Math.min;

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = function() {
      return root.Date.now();
    };

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;

        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && objectToString.call(value) == symbolTag);
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    var lodash_debounce = debounce;

    var debounce$1 = /*@__PURE__*/getDefaultExportFromCjs(lodash_debounce);

    class VideoContainer {
      constructor(main) {
        this.LOG_ACTIVITY = true;
        this.videoWidth = 0;
        this.videoHeight = 0;
        this.wasUnmuted = false;
        this.isMuted = false;
        this.currentVolume = 100;
        this.forceMute = false;
        this.isInFullScreenMode = false;
        this.hadPlayed = false;
        this.main = main;
        this.containerID = main.getConfigManager().getSettings().getVideoConfig().getContainerID();
        this.logger = main.getLogger();
        this.initialize();
      }
      initialize() {
        const that = this;
        if (document.getElementById(this.containerID) != null) {
          this.parentContainer = document.getElementById(this.containerID);
          this.videoContainer = document.createElement('div');
          if (this.parentContainer != null) {
            this.parentContainer.appendChild(this.videoContainer);
            this.videoElement = document.createElement('video');
            this.videoContainer.appendChild(this.videoElement);
            this.isInFullScreenMode = false;
            this.videoContainer.setAttribute("id", "stormLibrary_" + this.main.getLibraryID());
            this.videoContainer.style.overflow = "hidden";
            this.videoContainer.style.position = "relative";
            this.videoContainer.classList.add("stormLibrary");
            this.videoElement.style.objectFit = "fill";
            this.resizeObserver = new ResizeObserver(debounce$1(function () {
              that.onResize();
            }, 100));
            this.configureVideoElement();
            this.attachEvents();
            this.resizeVideo();
            this.scaleVideo();
            this.resizeObserver.observe(this.parentContainer);
            this.main.addEventListener("metadataReceived", event => {
              this.videoWidth = event.metadata.getVideoWidth();
              this.videoHeight = event.metadata.getVideoHeight();
              this.scaleVideo();
            });
            document.addEventListener('fullscreenchange', function () {
              that.onFullScreenChange();
            }, false);
            document.addEventListener('webkitfullscreenchange', function () {
              that.onFullScreenChange();
            }, false);
            document.addEventListener('mozfullscreenchange', function () {
              that.onFullScreenChange();
            }, false);
            document.addEventListener('webkitendfullscreen', function () {
              that.onFullScreenChange();
            }, false);
            this.videoElement.addEventListener('webkitendfullscreen', function () {
              that.onFullScreenChange();
            }, false);
          } else throw new Error("No parent element for the storm library was defined!");
        } else throw new Error("No parent element for the storm library was defined!");
      }
      onFullScreenChange() {
        if (document.fullscreenElement == null) {
          this.isInFullScreenMode = false;
          this.logger.info(this, "The library has exited FullScreen mode!");
          this.main.dispatchEvent("fullScreenExit", {
            ref: this.main
          });
        } else {
          this.isInFullScreenMode = true;
          this.logger.info(this, "The library has entered FullScreen mode!");
          this.main.dispatchEvent("fullScreenEnter", {
            ref: this.main
          });
        }
      }
      onResize() {
        var _a, _b;
        if (this.parentContainer != null) {
          this.tempContainerWidth = (_a = this.parentContainer) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width;
          this.tempContainerHeight = (_b = this.parentContainer) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().height;
          const isWidthInPX = this.main.getConfigManager().getSettings().getVideoConfig().getIfVideoWidthInPixels();
          const isHeightInPX = this.main.getConfigManager().getSettings().getVideoConfig().getIfVideoHeightInPixels();
          if (!isWidthInPX || !isHeightInPX) {
            this.resizeVideo();
            this.scaleVideo();
          }
        }
      }
      configureVideoElement() {
        let shouldMute = this.main.getConfigManager().getSettings().getIfAutoStart();
        let startVolume = this.main.getConfigManager().getSettings().getAudioConfig().getStartVolume();
        if (this.main.getStorageManager().getField("playerVolume")) {
          this.currentVolume = Number(this.main.getStorageManager().getField("playerVolume"));
        } else {
          this.currentVolume = startVolume;
        }
        if (shouldMute && !this.wasUnmuted) {
          this.isMuted = true;
          this.forceMute = true;
        }
        this.videoElement.setAttribute('playsinline', 'playsinline');
        this.videoElement.setAttribute('webkit-playsinline', 'webkit-playsinline');
        this.videoElement.muted = this.isMuted;
        this.videoElement.volume = this.currentVolume / 100;
        this.main.dispatchEvent("videoElementCreate", {
          ref: this.main,
          videoElement: this.videoElement
        });
      }
      attachEvents() {
        let self = this;
        this.videoElement.onload = function () {};
        if (LibraryState.PLAYING) ;
        this.videoElement.onerror = function (event) {};
        this.videoElement.onvolumechange = function (event) {
          self.dispatchVolumeEvent();
        };
        this.videoElement.ontimeupdate = function (event) {
          let newWidth = self.videoElement.videoWidth;
          let newHeight = self.videoElement.videoHeight;
          if (newWidth != 0 && newHeight != 0) {
            if (newWidth !== self.videoWidth || newHeight !== self.videoHeight) {
              self.videoWidth = newWidth;
              self.videoHeight = newHeight;
              self.scaleVideo();
            }
          }
        };
        this.videoElement.onended = function (event) {};
      }
      resizeVideo() {
        const isWidthInPX = this.main.getConfigManager().getSettings().getVideoConfig().getIfVideoWidthInPixels();
        const isHeightInPX = this.main.getConfigManager().getSettings().getVideoConfig().getIfVideoHeightInPixels();
        const videoWidthVal = this.main.getConfigManager().getSettings().getVideoConfig().getVideoWidthValue();
        const videoHeightVal = this.main.getConfigManager().getSettings().getVideoConfig().getVideoHeightValue();
        const aspectRatio = this.main.getConfigManager().getSettings().getVideoConfig().getAspectRatio();
        let finalVideoWidth = 0;
        let finalVideoHeight = 0;
        let aspectWRatio = Number(aspectRatio.split(":")[0]);
        let aspectHRatio = Number(aspectRatio.split(":")[1]);
        if (aspectRatio == "none") {
          if (isWidthInPX) {
            finalVideoWidth = videoWidthVal;
          } else {
            if (this.parentContainer != null) finalVideoWidth = this.tempContainerWidth * videoWidthVal / 100;
          }
          if (isHeightInPX) {
            finalVideoHeight = videoHeightVal;
          } else {
            if (this.parentContainer != null) finalVideoHeight = this.tempContainerHeight * videoHeightVal / 100;
          }
        } else {
          if (isWidthInPX) {
            finalVideoWidth = videoWidthVal;
          } else {
            if (this.parentContainer != null) finalVideoWidth = this.tempContainerWidth * videoWidthVal / 100;
          }
          finalVideoHeight = finalVideoWidth * aspectHRatio / aspectWRatio;
        }
        this.containerWidth = finalVideoWidth;
        this.containerHeight = finalVideoHeight;
        if (this.videoContainer !== null) {
          this.videoContainer.style.width = finalVideoWidth + "px";
          this.videoContainer.style.height = finalVideoHeight + "px";
        }
      }
      scaleVideo() {
        this.scalingMode = this.main.getConfigManager().getSettings().getVideoConfig().getScalingMode();
        if (this.videoElement !== null) {
          let videoX = 0;
          let videoY = 0;
          let videoWidth = 0;
          let videoHeight = 0;
          switch (this.scalingMode) {
            case ScalingType.FILL:
              videoWidth = this.containerWidth;
              videoHeight = this.containerHeight;
              break;
            case ScalingType.CROP:
              videoWidth = this.containerWidth;
              videoHeight = this.videoHeight * this.containerWidth / this.videoWidth;
              if (videoHeight >= this.containerHeight) {
                videoX = 0;
                videoY = (videoHeight - this.containerHeight) / 2 * -1;
              } else {
                videoHeight = this.containerHeight;
                videoWidth = this.videoWidth * this.containerHeight / this.videoHeight;
                videoY = 0;
                videoX = (videoWidth - this.containerWidth) / 2 * -1;
              }
              break;
            case ScalingType.LETTER_BOX:
              videoWidth = this.containerWidth;
              videoHeight = this.videoHeight * this.containerWidth / this.videoWidth;
              if (videoHeight <= this.containerHeight) {
                videoX = 0;
                videoY = (videoHeight - this.containerHeight) / 2 * -1;
                if (videoHeight > this.containerHeight) {
                  videoHeight = this.containerHeight;
                  videoWidth = this.videoWidth * this.containerHeight / this.videoHeight;
                  videoY = 0;
                  videoX = (videoWidth - this.containerWidth) / 2 * -1;
                }
              } else {
                videoHeight = this.containerHeight;
                videoWidth = this.videoWidth * this.containerHeight / this.videoHeight;
                videoY = 0;
                videoX = (videoWidth - this.containerWidth) / 2 * -1;
              }
              break;
            case ScalingType.ORIGINAL:
              videoWidth = this.videoWidth;
              videoHeight = this.videoHeight;
              videoX = (this.videoWidth - this.containerWidth) / -2;
              videoY = (this.videoHeight - this.containerHeight) / -2;
              break;
          }
          this.videoElement.style.left = Math.floor(videoX) + "px";
          this.videoElement.style.top = Math.floor(videoY) + "px";
          this.videoElement.style.width = Math.ceil(videoWidth) + "px";
          this.videoElement.style.height = Math.ceil(videoHeight) + "px";
          this.videoElement.style.position = "absolute";
        }
      }
      dispatchVolumeEvent() {
        let action = !this.forceMute ? "user" : "browser";
        let eventObj = {
          volume: this.videoElement.volume * 100,
          isMuted: this.videoElement.muted,
          type: action
        };
        if (this.LOG_ACTIVITY) this.logger.info(this, "VideoContainer :: Event: onVolumeChange: " + JSON.stringify(eventObj));
        this.main.dispatchEvent("volumeChange", {
          ref: this.main,
          mode: "mse",
          volume: this.videoElement.volume * 100,
          muted: this.videoElement.muted,
          invokedBy: action
        });
      }
      play() {
        let self = this;
        this.videoElement.play().then(r => function () {}).catch(function (e) {
          switch (e.name) {
            case "NotAllowedError":
              self.videoElement.muted = true;
              self.forceMute = true;
              self.videoElement.setAttribute('playsinline', 'playsinline');
              self.videoElement.setAttribute('webkit-playsinline', 'webkit-playsinline');
              self.wasUnmuted = false;
              self.isMuted = true;
              self.dispatchVolumeEvent();
              if (self.player) {
                self.player.restart();
              }
              break;
          }
        });
      }
      mute() {
        this.isMuted = true;
        if (this.videoElement !== null) this.videoElement.muted = this.isMuted;
      }
      unmute() {
        this.wasUnmuted = true;
        this.isMuted = false;
        this.forceMute = false;
        if (this.videoElement !== null) {
          let wasPaused = this.videoElement.paused;
          this.videoElement.muted = false;
          if (wasPaused != this.videoElement.paused) {
            this.main.dispatchEvent("interactionRequired", {
              ref: this.main,
              mode: "mse"
            });
          } else this.main.dispatchEvent("videoUnmuted", {
            ref: this.main
          });
        }
      }
      setVolume(newVolume) {
        this.isMuted = false;
        this.wasUnmuted = true;
        this.forceMute = false;
        this.currentVolume = newVolume;
        if (this.videoElement !== null) this.videoElement.volume = newVolume / 100;
        this.main.getStorageManager().saveField("playerVolume", String(newVolume));
      }
      getVolume() {
        if (this.videoElement !== null) return this.videoElement.volume * 100;else return 100;
      }
      getVideoObject() {
        return this.videoElement;
      }
      destroy() {
        if (this.LOG_ACTIVITY) this.logger.info(this, "VideoContainer :: src nulling...");
        try {
          this.videoElement.remove();
          this.videoContainer.remove();
        } catch (error) {}
      }
      setScalingMode(newMode) {
        switch (newMode.toLowerCase()) {
          case "fill":
            this.scalingMode = ScalingType.FILL;
            break;
          case "crop":
            this.scalingMode = ScalingType.CROP;
            break;
          case "letterbox":
            this.scalingMode = ScalingType.LETTER_BOX;
            break;
          case "original":
            this.scalingMode = ScalingType.ORIGINAL;
            break;
        }
        this.scaleVideo();
      }
      getScalingMode() {
        let scalingName = "";
        switch (this.scalingMode) {
          case ScalingType.FILL:
            scalingName = "fill";
            break;
          case ScalingType.CROP:
            scalingName = "crop";
            break;
          case ScalingType.LETTER_BOX:
            scalingName = "letterbox";
            break;
          case ScalingType.ORIGINAL:
            scalingName = "original";
            break;
        }
        return scalingName;
      }
      makeScreenshot() {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        let data = "";
        canvas.width = this.videoWidth;
        canvas.height = this.videoHeight;
        if (context !== null) {
          context.drawImage(this.videoElement, 0, 0, this.videoWidth, this.videoHeight);
          data = canvas.toDataURL('image/png');
        }
        return data;
      }
      setSize(width, height) {
        if (typeof width === "number") {
          this.main.getConfigManager().getSettings().getVideoConfig().setVideoWidthValue(width);
          this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoWidthInPixels(true);
        } else if (typeof width === "string") {
          if (width.toLowerCase().endsWith('px')) {
            this.main.getConfigManager().getSettings().getVideoConfig().setVideoWidthValue(parseInt(width));
            this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoWidthInPixels(true);
          } else if (width.toLowerCase().endsWith('%')) {
            this.main.getConfigManager().getSettings().getVideoConfig().setVideoWidthValue(parseInt(width));
            this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoWidthInPixels(false);
          }
        } else throw new Error("Unknown value for parameter \"width\" - it must be a number or a string! ");
        if (typeof height === "number") {
          this.main.getConfigManager().getSettings().getVideoConfig().setVideoHeightValue(height);
          this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoHeightInPixels(true);
        } else if (typeof height === "string") {
          if (height.toLowerCase().endsWith('px')) {
            this.main.getConfigManager().getSettings().getVideoConfig().setVideoHeightValue(parseInt(height));
            this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoHeightInPixels(true);
          } else if (height.toLowerCase().endsWith('%')) {
            this.main.getConfigManager().getSettings().getVideoConfig().setVideoHeightValue(parseInt(height));
            this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoHeightInPixels(false);
          }
        } else throw new Error("Unknown value for parameter \"width\" - it must be a number or a string! ");
        this.resizeVideo();
        this.scaleVideo();
      }
      setWidth(width) {
        if (typeof width === "number") {
          this.main.getConfigManager().getSettings().getVideoConfig().setVideoWidthValue(width);
          this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoWidthInPixels(true);
        } else if (typeof width === "string") {
          if (width.toLowerCase().endsWith('px')) {
            this.main.getConfigManager().getSettings().getVideoConfig().setVideoWidthValue(parseInt(width));
            this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoWidthInPixels(true);
          } else if (width.toLowerCase().endsWith('%')) {
            this.main.getConfigManager().getSettings().getVideoConfig().setVideoWidthValue(parseInt(width));
            this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoWidthInPixels(false);
          }
        } else throw new Error("Unknown value for parameter \"width\" - it must be a number or a string! ");
        this.resizeVideo();
        this.scaleVideo();
      }
      setHeight(height) {
        if (typeof height === "number") {
          this.main.getConfigManager().getSettings().getVideoConfig().setVideoHeightValue(height);
          this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoHeightInPixels(true);
        } else if (typeof height === "string") {
          if (height.toLowerCase().endsWith('px')) {
            this.main.getConfigManager().getSettings().getVideoConfig().setVideoHeightValue(parseInt(height));
            this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoHeightInPixels(true);
          } else if (height.toLowerCase().endsWith('%')) {
            this.main.getConfigManager().getSettings().getVideoConfig().setVideoHeightValue(parseInt(height));
            this.main.getConfigManager().getSettings().getVideoConfig().setIfVideoHeightInPixels(false);
          }
        } else throw new Error("Unknown value for parameter \"width\" - it must be a number or a string! ");
        this.resizeVideo();
        this.scaleVideo();
      }
      enterFullScreen() {
        if (this.videoElement.webkitEnterFullScreen) {
          this.videoElement.webkitEnterFullScreen();
        } else {
          this.videoElement.requestFullscreen();
        }
      }
      exitFullScreen() {
        if (this.videoElement.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
      isFullScreenMode() {
        return this.isInFullScreenMode;
      }
      getWidth() {
        return this.containerWidth;
      }
      getHeight() {
        return this.containerHeight;
      }
    }

    class CookieManager {
      setCookie(name, value, daysToExpire) {
        let date = new Date();
        date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
        let expires = "; expires=" + date.toUTCString();
        try {
          document.cookie = name + "=" + (value || "") + expires + "; path=/";
          return true;
        } catch (error) {
          this.onCookieError(error);
        }
        return false;
      }
      getCookie(name) {
        let nameEQ = name + "=";
        try {
          let ca = document.cookie.split(';');
          for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
          }
          return null;
        } catch (error) {
          this.onCookieError(error);
        }
      }
      deleteCookie(name) {
        try {
          document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          return true;
        } catch (error) {
          this.onCookieError(error);
        }
        return false;
      }
      onCookieError(error) {}
    }

    class StorageManager extends CookieManager {
      constructor(main) {
        super();
        this.LOG_ACTIVITY = false;
        this.DAYS_TILL_EXPIRE = 30;
        this.prefix = "";
        this.isEnabled = true;
        this.logger = main.getLogger();
        this.prefix = main.getConfigManager().getSettings().getStorageConfig().getPrefix();
        this.isEnabled = main.getConfigManager().getSettings().getStorageConfig().isStorageEnabled();
        if (this.LOG_ACTIVITY) this.logger.info(this, "Creating new StorageManager");
      }
      saveField(name, value) {
        if (this.isEnabled == true) {
          if (this.LOG_ACTIVITY) this.logger.info(this, "Saving data: " + name + " | " + value);
          this.setCookie(this.prefix + name, value, this.DAYS_TILL_EXPIRE);
        }
      }
      getField(name) {
        if (this.isEnabled == true) {
          let value = this.getCookie(this.prefix + name);
          if (this.LOG_ACTIVITY) this.logger.info(this, "Grabbing data: " + name + " | " + value);
          return value;
        } else return null;
      }
      deleteField(name) {
        if (this.isEnabled == true) {
          if (this.LOG_ACTIVITY) this.logger.info(this, "Deleting field: " + name);
          this.deleteCookie(this.prefix + name);
        }
      }
      onCookieError(error) {
        if (this.LOG_ACTIVITY) this.logger.error(this, "Error on cookie: " + error);
      }
    }

    class UserCapabilities {
      static hasWebSocketsSupport() {
        return window.WebSocket != null;
      }
      static isMobile() {
        const mobileCheckString = "Mobile|mini|Fennec|Android|iP(ad|od|hone)";
        const mobileCheckRegExp = new RegExp(mobileCheckString);
        return mobileCheckRegExp.test(navigator.userAgent);
      }
      static isCookieEnabled() {
        let cookieEnabled = navigator.cookieEnabled ? true : false;
        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
          document.cookie = 'testcookie';
          cookieEnabled = document.cookie.indexOf('testcookie') != -1 ? true : false;
        }
        return cookieEnabled;
      }
      static getOSVersion() {
        let osVersion = "Unknown version";
        let os = UserCapabilities.getOS();
        if (os != null) {
          const windowsCheckString = "Windows";
          const windowsCheckRegExp = new RegExp(windowsCheckString);
          if (windowsCheckRegExp.test(os)) {
            const windowsExecString = "Windows (.*)";
            const windowsExecRegExp = new RegExp(windowsExecString);
            osVersion = windowsExecRegExp.exec(os)[1] != null ? windowsExecRegExp.exec(os)[1] : osVersion;
            os = 'Windows';
          }
          switch (os) {
            case 'Mac OS':
            case 'Mac OS X':
            case 'Android':
              const versionExecString = "(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\\.\\_\\d]+)";
              const versionExecRegExp = new RegExp(versionExecString);
              osVersion = versionExecRegExp.exec(navigator.userAgent)[1];
              break;
            case 'iOS':
              const iOSExecString = "OS (\\d+)_(\\d+)_?(\\d+)?";
              const iOSExecRegExp = new RegExp(iOSExecString);
              osVersion = iOSExecRegExp.exec(navigator.userAgent);
              osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
              break;
          }
        }
        return osVersion;
      }
      static getBrowserName() {
        return UserCapabilities.getFullBrowser().name;
      }
      static getBrowserVersion() {
        return UserCapabilities.getFullBrowser().version;
      }
      static getFullBrowser() {
        let nAgt = navigator.userAgent;
        let browser = navigator.appName;
        let version = '' + parseFloat(navigator.appVersion);
        let majorVersion = parseInt(navigator.appVersion, 10);
        let nameOffset, verOffset, ix;
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
          browser = 'Opera';
          version = nAgt.substring(verOffset + 6);
          if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
          }
        } else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
          browser = 'Microsoft Internet Explorer';
          version = nAgt.substring(verOffset + 5);
        } else if (browser == 'Netscape' && nAgt.indexOf('Trident/') != -1) {
          browser = 'Microsoft Internet Explorer';
          version = nAgt.substring(verOffset + 5);
          if ((verOffset = nAgt.indexOf('rv:')) != -1) {
            version = nAgt.substring(verOffset + 3);
          }
        } else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
          browser = 'Chrome';
          if (nAgt.indexOf("FBAV") > -1 || nAgt.indexOf("FBAN") > -1) browser = 'Facebook';
          if (nAgt.indexOf("OPR") > -1) browser = 'Opera';
          if (nAgt.indexOf("SamsungBrowser") > -1) browser = 'Samsung';
          version = nAgt.substring(verOffset + 7);
        } else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
          browser = 'Safari';
          version = nAgt.substring(verOffset + 7);
          if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
          }
          if (nAgt.indexOf('CriOS') != -1) {
            browser = 'Chrome';
          }
          if (nAgt.indexOf('FxiOS') != -1) {
            browser = "Firefox";
          }
        } else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
          browser = 'Firefox';
          version = nAgt.substring(verOffset + 8);
        } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
          browser = nAgt.substring(nameOffset, verOffset);
          version = nAgt.substring(verOffset + 1);
          if (browser.toLowerCase() == browser.toUpperCase()) {
            browser = navigator.appName;
          }
        }
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);
        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
          version = '' + parseFloat(navigator.appVersion);
          majorVersion = parseInt(navigator.appVersion, 10);
        }
        return {
          "name": browser,
          "fullVersion": version,
          "version": majorVersion
        };
      }
      static getOS() {
        let os = "Unknown OS";
        let oscodes = [{
          "os": 'Windows 10',
          "code": "(Windows 10.0|Windows NT 10.0)"
        }, {
          "os": 'Windows 8.1',
          "code": "(Windows 8.1|Windows NT 6.3)"
        }, {
          "os": 'Windows 8',
          "code": "(Windows 8|Windows NT 6.2)"
        }, {
          "os": 'Windows 7',
          "code": "(Windows 7|Windows NT 6.1)"
        }, {
          "os": 'Windows Vista',
          "code": "Windows NT 6.0"
        }, {
          "os": 'Windows Server 2003',
          "code": "Windows NT 5.2"
        }, {
          "os": 'Windows XP',
          "code": "(Windows NT 5.1|Windows XP)"
        }, {
          "os": 'Windows 2000',
          "code": "(Windows NT 5.0|Windows 2000)"
        }, {
          "os": 'Windows ME',
          "code": "(Win 9x 4.90|Windows ME)"
        }, {
          "os": 'Windows 98',
          "code": "(Windows 98|Win98)"
        }, {
          "os": 'Windows 95',
          "code": "(Windows 95|Win95|Windows_95)"
        }, {
          "os": 'Windows NT 4.0',
          "code": "(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)"
        }, {
          "os": 'Windows CE',
          "code": "Windows CE"
        }, {
          "os": 'Windows 3.11',
          "code": "Win16"
        }, {
          "os": 'Android',
          "code": "Android"
        }, {
          "os": 'Open BSD',
          "code": "OpenBSD"
        }, {
          "os": 'Sun OS',
          "code": "SunOS"
        }, {
          "os": 'Chrome OS',
          "code": "CrOS"
        }, {
          "os": 'Linux',
          "code": "(Linux|X11(?!.*CrOS))"
        }, {
          "os": 'iOS',
          "code": "(iPhone|iPad|iPod)"
        }, {
          "os": 'Mac OS X',
          "code": "Mac OS X"
        }, {
          "os": 'Mac OS',
          "code": "(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)"
        }, {
          "os": 'QNX',
          "code": "QNX"
        }, {
          "os": 'UNIX',
          "code": "UNIX"
        }, {
          "os": 'BeOS',
          "code": "BeOS"
        }, {
          "os": 'OS/2',
          "code": "OS\\/2"
        }, {
          "os": 'Search Bot',
          "code": "(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\\/Teoma|ia_archiver)"
        }];
        for (var id in oscodes) {
          var cs = oscodes[id];
          var re = new RegExp(cs.code);
          if (re.test(navigator.userAgent)) {
            os = cs.os;
            break;
          }
        }
        return os;
      }
      static hasWebRTCSupport() {
        let isSupported = false;
        try {
          let webrtc = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.RTCPeerConnection;
          isSupported = true;
        } catch (error) {
          isSupported = false;
        }
        return isSupported;
      }
      static hasHLSSupport(videoObject) {
        if (videoObject !== null) {
          return Boolean(videoObject.canPlayType('application/vnd.apple.mpegURL') || videoObject.canPlayType('audio/mpegurl'));
        } else return false;
      }
      static hasMSESupport() {
        const mediaSource = window.MediaSource = window.MediaSource || window.WebKitMediaSource;
        window.SourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer;
        return mediaSource && typeof mediaSource.isTypeSupported === 'function';
      }
      static hasMMSSupport() {
        return window.ManagedMediaSource;
      }
      static isSSL() {
        if (location.protocol === 'https:') return true;else return false;
      }
    }

    var ConnectionState;
    (function (ConnectionState) {
      ConnectionState[ConnectionState["NOT_INITIALIZED"] = 0] = "NOT_INITIALIZED";
      ConnectionState[ConnectionState["STARTED"] = 1] = "STARTED";
      ConnectionState[ConnectionState["CONNECTING"] = 2] = "CONNECTING";
      ConnectionState[ConnectionState["CONNECTED"] = 3] = "CONNECTED";
      ConnectionState[ConnectionState["CLOSED"] = 4] = "CLOSED";
      ConnectionState[ConnectionState["FAILED"] = 5] = "FAILED";
    })(ConnectionState || (ConnectionState = {}));

    class AbstractSocket {
      constructor() {
        this.CONNECTION_TIMEOUT = 5;
        this.isBinary = true;
        this.connectionState = ConnectionState.NOT_INITIALIZED;
        this.messageCount = 0;
        this.disconnectedByUser = false;
        this.isConnected = false;
      }
      startConnection() {
        this.disconnectedByUser = false;
        this.connectionState = ConnectionState.CONNECTING;
        this.socket = new WebSocket(this.socketURL);
        if (this.isBinary) this.socket.binaryType = "arraybuffer";
        this.socket.onopen = event => {
          clearTimeout(this.connectionTimeout);
          this.connectionState = ConnectionState.CONNECTED;
          this.onSocketOpen(event);
        };
        this.socket.onmessage = event => {
          this.messageCount++;
          this.onSocketMessage(event);
        };
        this.socket.onclose = event => {
          clearTimeout(this.connectionTimeout);
          if (this.connectionState == ConnectionState.CONNECTED) {
            this.connectionState = ConnectionState.CLOSED;
            this.onSocketClose(event);
          } else {
            this.connectionState = ConnectionState.FAILED;
          }
        };
        this.socket.onerror = event => {
          clearTimeout(this.connectionTimeout);
          if (this.connectionState == ConnectionState.CONNECTING) this.onSocketError(event);
          if (this.connectionState == ConnectionState.CONNECTED) {
            try {
              this.socket.close();
            } catch (error) {}
          }
        };
        this.connectionTimeout = setTimeout(() => {
          try {
            this.socket.close();
          } catch (error) {}
          if (this.connectionState == ConnectionState.CONNECTING) {
            this.connectionState = ConnectionState.FAILED;
            this.onSocketError(new ErrorEvent("connectionTimeout"));
          }
        }, this.CONNECTION_TIMEOUT * 1000);
      }
      onSocketOpen(event) {}
      onSocketClose(event) {}
      onSocketMessage(event) {}
      onSocketError(event) {}
      onError(error) {}
      sendData(data) {
        if (this.connectionState == ConnectionState.CONNECTED) {
          if (this.socket !== null) {
            if (data !== undefined && data !== null) {
              this.socket.send(data);
              return;
            } else this.onError("no data to send");
          }
        }
        this.onError("socket not connected");
      }
      getConnectionState() {
        return this.connectionState;
      }
      disconnect() {
        this.isConnected = false;
        this.logger.warning(this, "Disconnected by user");
        this.disconnectedByUser = true;
        if (this.socket != null) {
          this.socket.onopen = null;
          this.socket.onmessage = null;
          this.socket.onclose = null;
          this.socket.onerror = null;
          this.socket.close();
        }
      }
      destroy() {
        if (this.socket !== undefined && this.socket !== null) {
          this.socket.onopen = null;
          this.socket.onmessage = null;
          this.socket.onclose = null;
          this.socket.onerror = null;
          this.socket.close();
        }
        this.connectionState = ConnectionState.CLOSED;
      }
      getSocketURL() {
        return this.socketURL;
      }
    }

    class ServerInfo {
      constructor(name, groupName, protocolVer, serverInitTime, version) {
        this.name = name;
        this.groupName = groupName;
        this.protocolVer = protocolVer;
        this.serverInitTime = serverInitTime;
        this.version = version;
      }
      getName() {
        return this.name;
      }
      getGroup() {
        return this.groupName;
      }
      getProtocolVersion() {
        return this.protocolVer;
      }
      getServerInitTime() {
        return this.serverInitTime;
      }
      getVersion() {
        return this.version;
      }
    }

    class ApplicationInfo {
      constructor(name, dvrEnabled, type) {
        this.name = name;
        this.type = type;
        this.dvrEnabled = dvrEnabled;
      }
      getName() {
        return this.name;
      }
      getType() {
        return this.type;
      }
      getIfDVREnabled() {
        return this.dvrEnabled;
      }
    }

    class StormMetaDataItem {
      constructor() {
        this.videoWidth = 0;
        this.videoHeight = 0;
        this.videoTimeScale = 0;
        this.constantFrameRate = false;
        this.videoDataRate = 0;
        this.frameRate = 0;
        this.encoder = "Unknown";
        this.audioCodec = "Unknown";
        this.videoCodec = "Unknown";
        this.audioChannels = 0;
        this.audioSampleRate = 0;
        this.audioSampleSize = 0;
        this.audioDataRate = 0;
      }
      MetaDataItem() {}
      setVideoWidth(width) {
        this.videoWidth = width;
      }
      setVideoHeight(height) {
        this.videoHeight = height;
      }
      setIfConstantFrameRate(constantFrameRate) {
        this.constantFrameRate = constantFrameRate;
      }
      setEncoder(encoder) {
        this.encoder = encoder;
      }
      setAudioCodec(audioCodec) {
        this.audioCodec = audioCodec;
      }
      setVideoDataRate(videoDataRate) {
        this.videoDataRate = videoDataRate;
      }
      setAudioCodecID(audioCodecID) {
        switch (audioCodecID) {
          case 10:
            this.audioCodec = "ACC";
            break;
          default:
            this.audioCodec = "Unknown";
        }
      }
      setVideoCodec(videoCodec) {
        this.videoCodec = videoCodec;
      }
      setVideoCodecID(videoCodecID) {
        switch (videoCodecID) {
          case 7:
            this.videoCodec = "H.264";
            break;
          default:
            this.videoCodec = "Unknown";
        }
      }
      setAudioChannels(audioChannels) {
        this.audioChannels = audioChannels;
      }
      setAudioSampleRate(audioSampleRate) {
        this.audioSampleRate = audioSampleRate;
      }
      setAudioSampleSize(audioSampleSize) {
        this.audioSampleSize = audioSampleSize;
      }
      setAudioDataRate(audioDataRate) {
        this.audioDataRate = audioDataRate;
      }
      setVideoTimeScale(videoTimeScale) {
        this.videoTimeScale = videoTimeScale;
      }
      setFrameRate(fps) {
        this.frameRate = fps;
      }
      getVideoWidth() {
        return this.videoWidth;
      }
      getVideoHeight() {
        return this.videoHeight;
      }
      isVariableFPS() {
        return this.constantFrameRate;
      }
      getNominalFPS() {
        return this.frameRate;
      }
      getEncoder() {
        return this.encoder;
      }
      getAudioCodec() {
        return this.audioCodec;
      }
      getVideoCodec() {
        return this.videoCodec;
      }
      getAudioChannels() {
        return this.audioChannels;
      }
      getAudioSampleRate() {
        return this.audioSampleRate;
      }
      getAudioSampleSize() {
        return this.audioSampleSize;
      }
      getAudioDataRate() {
        return this.audioDataRate;
      }
      getVideoTimeScale() {
        return this.videoTimeScale;
      }
      toString() {
        let output = "";
        output += "videoWidth: " + this.videoWidth;
        output += " | videoHeight: " + this.videoHeight;
        output += " | videoTimeScale: " + this.videoTimeScale;
        output += " | variableFPS: " + this.constantFrameRate;
        output += " | nominalFPS: " + this.frameRate;
        output += " | encoder: " + this.encoder;
        output += " | audioCodec: " + this.audioCodec;
        output += " | videoCodec: " + this.videoCodec;
        output += " | audioChannels: " + this.audioChannels;
        output += " | audioSampleRate: " + this.audioSampleRate;
        output += " | audioSampleSize: " + this.audioSampleSize;
        output += " | audioDataRate: " + this.audioDataRate;
        return output;
      }
    }

    var PlayerType;
    (function (PlayerType) {
      PlayerType["MSE"] = "mse";
      PlayerType["HLS"] = "hls";
      PlayerType["WEB_RTC"] = "webrtc";
      PlayerType["ABSTRACT"] = "abstract";
      PlayerType["UNKNOWN"] = "unknown";
    })(PlayerType || (PlayerType = {}));

    var PlaybackState;
    (function (PlaybackState) {
      PlaybackState["NOT_INITIALIZED"] = "NOT_INITIALIZED";
      PlaybackState["INITIALIZED"] = "INITIALIZED";
      PlaybackState["PLAYING"] = "PLAYING";
      PlaybackState["BUFFERING"] = "BUFFERING";
      PlaybackState["PAUSED"] = "PAUSED";
      PlaybackState["STOPPED"] = "STOPPED";
      PlaybackState["NOT_FOUND"] = "NOT_FOUND";
      PlaybackState["AWAITING"] = "AWAITING";
      PlaybackState["NOT_PUBLISHED"] = "NOT_PUBLISHED";
      PlaybackState["UNKNOWN"] = "UNKNOWN";
      PlaybackState["UNPUBLISHED"] = "UNPUBLISHED";
      PlaybackState["PUBLISHED"] = "PUBLISHED";
      PlaybackState["CLOSED"] = "CLOSED";
    })(PlaybackState || (PlaybackState = {}));

    class StormConnection extends AbstractSocket {
      constructor(main) {
        super();
        this.isAuthorized = false;
        this.coreReadyDispatched = false;
        this.wasPlaybackStopped = false;
        this.lastState = "";
        this.logger = main.getLogger();
        this.main = main;
        this.type = this.main.getConfigManager().getConfigurationType();
      }
      initialize() {
        this.logger.info(this, "Starting new connection with a storm server");
        this.pickServerFromList(this.main.getConfigManager().getStream().getServerList());
        if (this.currServer != null) {
          this.socketURL = this.createURL(this.currServer);
          this.logger.info(this, `Starting WebSocket connection with: ${this.socketURL}`);
          this.main.dispatchEvent("serverConnectionInitiate", {
            ref: this.main,
            serverURL: this.socketURL
          });
          if (this.main.getConfigManager().getIfDemoMode()) {
            this.logger.warning(this, "Player is in demo mode, and will not connect with a server!");
            this.main.dispatchEvent("authorizationComplete", {
              ref: this.main
            });
            return;
          }
          this.startConnection();
        } else this.logger.error(this, "Connection with the server could not be initialized!");
      }
      onSocketOpen(event) {
        this.logger.success(this, `Connection with the server has been established!`);
        this.main.dispatchEvent("serverConnect", {
          ref: this.main,
          serverURL: this.socketURL
        });
        this.isConnected = true;
      }
      onSocketError(event) {
        this.isConnected = false;
        if (!this.disconnectedByUser) {
          this.logger.error(this, `Connection with the server failed`);
          this.main.dispatchEvent("serverConnectionError", {
            ref: this.main,
            serverURL: this.socketURL,
            restart: this.main.getConfigManager().getSettings().getIfRestartOnError()
          });
          if (this.isConnected == false) {
            this.currServer.setAsFaild(true);
            this.initiateReconnect();
          }
        }
      }
      onSocketClose(event) {
        this.isConnected = false;
        if (!this.disconnectedByUser) {
          this.logger.error(this, `Connection with the server has been closed`);
          this.main.dispatchEvent("serverDisconnect", {
            ref: this.main,
            serverURL: this.socketURL,
            restart: this.main.getConfigManager().getSettings().getIfRestartOnError()
          });
          this.initiateReconnect();
        } else this.logger.warning(this, `Force disconnect from server!`);
      }
      onSocketMessage(event) {
        var _a, _b, _c, _d, _e;
        if (typeof event.data == "string") {
          const jsonObj = JSON.parse(event.data);
          const packetID = jsonObj.packetID;
          switch (packetID) {
            case "serverHandshake":
              {
                const packet = jsonObj.data;
                this.serverInfo = new ServerInfo(packet.name, packet.group, packet.protocolVer, packet.serverTime, packet.version);
                if (packet.license == "invalid") {
                  this.logger.info(this, "Storm server license is not valid (probably expired or incorrect serial key was provided)!");
                  this.main.dispatchEvent("invalidLicense", {
                    ref: this.main
                  });
                }
                if (packet.protocolVer != this.main.getPlayerProtocolVersion()) {
                  this.logger.error(this, `Incompatible protocol version - player is ${this.main.getPlayerProtocolVersion()}, but server is ${packet.protocolVer}`);
                  this.main.dispatchEvent("incompatibleProtocol", {
                    ref: this.main,
                    clientProtocolVer: this.main.getPlayerProtocolVersion(),
                    serverProtocolVersion: packet.protocolVer
                  });
                }
              }
              break;
            case "appData":
              {
                const packet = jsonObj.data;
                this.appData = new ApplicationInfo(packet.name, packet.dvrEnabled, packet.type);
                let packetData = null;
                if (packet.tokenRequired) {
                  if (this.main.getConfigManager().getStream().getSecurityConfig().getSecurityMethod() == SecurityType.TOKEN) {
                    const token = this.main.getConfigManager().getStream().getSecurityConfig().getToken();
                    packetData = {
                      userAgent: navigator.userAgent,
                      token: token,
                      command: "authorize",
                      uniq: NumberUtilities.generateUniqueString(8) + "_" + Date.now().toString().slice(-5)
                    };
                  } else {
                    this.logger.error(this, `Application ${packet.name} requires token for authentication! Disconnecting!`);
                    this.main.dispatchEvent("authorizationError", {
                      ref: this.main
                    });
                    this.disconnect();
                  }
                } else {
                  packetData = {
                    userAgent: navigator.userAgent,
                    token: "",
                    command: "authorize"
                  };
                }
                this.sendData(JSON.stringify({
                  packetID: "appAuthPacket",
                  data: packetData
                }));
              }
              break;
            case "authResultPacket":
              {
                const packet = jsonObj.data;
                if (packet.answer == "success") {
                  this.isAuthorized = true;
                  this.logger.info(this, `Authorization with the sever is complete!`);
                  this.main.dispatchEvent("authorizationComplete", {
                    ref: this.main
                  });
                  if (this.main.getConfigManager().getStream().getConfigurationType() == ConfigurationType.GATEWAY) {
                    this.subscribeToStream();
                  }
                } else {
                  this.logger.error(this, `Authorization with the sever failed! Disconnecting!`);
                  this.main.dispatchEvent("authorizationError", {
                    ref: this.main
                  });
                  this.disconnect();
                }
                if (this.coreReadyDispatched == false) {
                  this.main.dispatchEvent("playerCoreReady", {
                    ref: this.main
                  });
                  this.coreReadyDispatched = true;
                }
              }
              break;
            case "subscriptionResultPacket":
              {
                const packet = jsonObj.data;
                if (packet.status == "success") {
                  if (packet.optParameters != null) {
                    this.logger.info(this, "Optional Stream Data: " + packet.optParameters);
                    this.main.dispatchEvent("optionalStreamData", {
                      ref: this.main,
                      optData: packet.optParameters
                    });
                  }
                  this.main.dispatchEvent("subscriptionComplete", {
                    ref: this.main,
                    sourceList: this.main.getSourceList()
                  });
                  this.onStreamStatus(packet);
                } else {
                  switch (packet.reason) {
                    case "NOT_FOUND":
                      this.logger.error(this, "Stream not found");
                      this.main.dispatchEvent("streamNotFound", {
                        ref: this.main,
                        streamKey: packet.streamKey
                      });
                      break;
                    case "INCORRECT_STREAM_KEY":
                      this.logger.error(this, "Stream not found (incorrect streamKey)");
                      this.main.dispatchEvent("streamNotFound", {
                        ref: this.main,
                        streamKey: packet.streamKey
                      });
                      break;
                    case "NOT_AUTHORIZED":
                      {
                        this.logger.error(this, "Not authorized for play");
                      }
                      break;
                    default:
                      {
                        this.logger.error(this, "Could get data from the server: " + packet.reason);
                      }
                  }
                }
              }
              break;
            case "playResultPacket":
              {
                const packet = jsonObj.data;
                if (packet.status == "success") {
                  switch (packet.streamState) {
                    case "PUBLISHED":
                      this.logger.success(this, `Playback initialized!`);
                      this.main.dispatchEvent("playbackInitiate", {
                        ref: this.main,
                        streamKey: packet.streamKey
                      });
                      break;
                    case "AWAITING":
                      this.main.getPlaybackController().setPlaybackState(PlaybackState.STOPPED);
                      this.main.dispatchEvent("streamStateChange", {
                        ref: this.main,
                        streamKey: packet.streamKey,
                        state: "AWAITING"
                      });
                      this.logger.info(this, "Stream is not ready yet (state: AWAITING)");
                      break;
                    case "NOT_PUBLISHED":
                      this.main.getPlaybackController().setPlaybackState(PlaybackState.STOPPED);
                      this.main.dispatchEvent("streamStateChange", {
                        ref: this.main,
                        streamKey: packet.streamKey,
                        state: "NOT_PUBLISHED"
                      });
                      this.logger.info(this, "Stream has ended (state: NOT_PUBLISHED)");
                      break;
                    case "NOT_PUBLISHED":
                      this.main.getPlaybackController().setPlaybackState(PlaybackState.STOPPED);
                      this.main.dispatchEvent("streamStateChange", {
                        ref: this.main,
                        streamKey: packet.streamKey,
                        state: "UNPUBLISHED"
                      });
                      this.logger.info(this, "Stream is not ready yet (state: UNPUBLISHED");
                      break;
                    case "INITIALIZED":
                      this.main.getPlaybackController().setPlaybackState(PlaybackState.STOPPED);
                      this.main.dispatchEvent("streamStateChange", {
                        ref: this.main,
                        streamKey: packet.streamKey,
                        state: "UNPUBLISHED"
                      });
                      this.logger.info(this, "Stream is not ready yet (state: INITIALIZED/UNPUBLISHED");
                      break;
                  }
                } else {
                  switch (packet.reason) {
                    case "NOT_FOUND":
                      this.logger.info(this, "Stream not found");
                      this.main.dispatchEvent("streamNotFound", {
                        ref: this.main,
                        streamKey: packet.streamKey
                      });
                      break;
                    case "INCORRECT_STREAMKEY":
                      this.logger.info(this, "Stream not found (incorrect streamKey)");
                      this.main.dispatchEvent("streamNotFound", {
                        ref: this.main,
                        streamKey: packet.streamKey
                      });
                      break;
                    case "NOT_AUTHORIZED":
                      this.logger.info(this, "Not authorized for play");
                      break;
                  }
                }
              }
              break;
            case "playbackMetadata":
              {
                const packet = jsonObj.data;
                let metaData = new StormMetaDataItem();
                metaData.setVideoCodecID(packet.videoCodecID);
                metaData.setVideoWidth(packet.videoWidth);
                metaData.setVideoHeight(packet.videoHeight);
                metaData.setVideoDataRate(packet.videoDataRate);
                if (packet.constFrameRate) {
                  metaData.setIfConstantFrameRate(true);
                  metaData.setFrameRate(packet.frameRate);
                } else metaData.setIfConstantFrameRate(false);
                metaData.setAudioCodecID(packet.audioCodecID);
                metaData.setAudioDataRate(packet.audioDataRate);
                metaData.setAudioSampleSize(packet.audioSampleSize);
                metaData.setAudioSampleRate(packet.audioSampleRate);
                metaData.setAudioChannels(packet.audioChannels);
                this.logger.success(this, `MetaData has arrived!`);
                this.main.dispatchEvent("metadataReceived", {
                  ref: this.main,
                  metadata: metaData
                });
                this.player.onMetaData(metaData);
              }
              break;
            case "playbackStopPacket":
              {
                const packet = jsonObj.data;
                packet.newState;
                this.logger.success(this, `Stream Stop`);
                this.main.dispatchEvent("streamStop", {
                  ref: this.main,
                  streamKey: this.source.getStreamKey()
                });
                (_a = this.player) === null || _a === void 0 ? void 0 : _a.stop();
              }
              break;
            case "playbackLinkingPacket":
              {
                const packet = jsonObj.data;
                let filePath = ((_b = this.currServer) === null || _b === void 0 ? void 0 : _b.getIfSSL()) ? "https://" : "http://";
                filePath += ((_c = this.currServer) === null || _c === void 0 ? void 0 : _c.getHost()) + ":" + ((_d = this.currServer) === null || _d === void 0 ? void 0 : _d.getPort()) + "/";
                filePath += packet.path;
                (_e = this.player) === null || _e === void 0 ? void 0 : _e.setURL(filePath);
              }
              break;
            case "playbackProgress":
              {
                const packet = jsonObj.data;
                this.main.dispatchEvent("playbackProgress", {
                  ref: this.main,
                  streamKey: this.source.getStreamKey(),
                  streamStartTime: packet.streamStartTime,
                  streamDuration: packet.streamDuration,
                  playbackStartTime: packet.playbackStartTime,
                  playbackDuration: packet.playbackDuration,
                  dvrCacheSize: packet.dvrCacheSize
                });
              }
              break;
            case "subscriptionUpdatePacket":
              {
                const packet = jsonObj.data;
                this.onStreamStatus(packet);
              }
              break;
            default:
              this.logger.error(this, `Unknown packet: ` + packetID);
          }
        } else {
          if (this.player.getPlayerType() == PlayerType.MSE) {
            let msePlayer = this.player;
            msePlayer.pushData(event.data);
          }
        }
      }
      onStreamStatus(packet) {
        var _a, _b, _c;
        let sourceList = new Array();
        if (packet.streamList != null) {
          for (let i = 0; i < packet.streamList.length; i++) {
            let streamInfo = new StreamInfo(packet.streamList[i].streamInfo);
            let sourceItem = new StormSourceItem(packet.streamList[i].streamKey, streamInfo, false);
            sourceList.push(sourceItem);
          }
          this.main.getConfigManager().getStream().setSourceList(sourceList);
          this.main.dispatchEvent("sourceListUpdate", {
            ref: this.main,
            sourceList: sourceList
          });
        }
        const streamKey = (_c = (_a = packet.streamKey) !== null && _a !== void 0 ? _a : (_b = this.source) === null || _b === void 0 ? void 0 : _b.getStreamKey()) !== null && _c !== void 0 ? _c : "none";
        if (this.lastState == packet.streamState) return;
        this.lastState = packet.streamState;
        switch (packet.streamState) {
          case "AWAITING":
            this.logger.success(this, "Stream is awaiting start (AWAITING)");
            this.main.dispatchEvent("streamStateChange", {
              ref: this.main,
              streamKey: streamKey,
              state: "AWAITING"
            });
            break;
          case "NOT_PUBLISHED":
            this.logger.success(this, "Stream is awaiting start (NOT_PUBLISHED)");
            this.main.dispatchEvent("streamStateChange", {
              ref: this.main,
              streamKey: streamKey,
              state: "NOT_PUBLISHED"
            });
            break;
          case "UNPUBLISHED":
            this.logger.success(this, "Stream has been unpublished (UNPUBLISHED)");
            this.main.dispatchEvent("streamStateChange", {
              ref: this.main,
              streamKey: streamKey,
              state: "UNPUBLISHED"
            });
            break;
          case "PUBLISHED":
            this.logger.success(this, "Stream is published (PUBLISHED)");
            this.main.dispatchEvent("streamStateChange", {
              ref: this.main,
              streamKey: streamKey,
              state: "PUBLISHED"
            });
            break;
          default:
            this.logger.success(this, "Incorrect state: " + packet.streamState);
        }
      }
      sendPauseRequest() {
        this.wasPlaybackStopped = true;
        this.sendData(JSON.stringify({
          packetID: "pauseRequestPacket"
        }));
      }
      sendPlayRequest() {
        var _a, _b, _c;
        this.wasPlaybackStopped = false;
        let packetData = null;
        switch (this.source.getType()) {
          case ProtocolType.STORM:
            {
              const stormSource = this.source;
              packetData = {
                protocol: "storm",
                streamKey: stormSource.getStreamKey(),
                packetizer: (_a = this.player) === null || _a === void 0 ? void 0 : _a.getPlayerType(),
                startTime: 0
              };
            }
            break;
          case ProtocolType.RTMP:
            {
              const rtmpSource = this.source;
              packetData = {
                protocol: "rtmp",
                streamKey: rtmpSource.getStreamKey(),
                extHost: rtmpSource.getHost(),
                extApplication: rtmpSource.getApplicationName(),
                extPort: rtmpSource.getPort(),
                packetizer: (_b = this.player) === null || _b === void 0 ? void 0 : _b.getPlayerType(),
                startTime: 0
              };
            }
            break;
          case ProtocolType.RTSP:
            {
              const rtspSource = this.source;
              packetData = {
                protocol: "rtsp",
                streamKey: rtspSource.getStreamKey(),
                extHost: rtspSource.getHost(),
                extApplication: rtspSource.getApplicationName(),
                extPort: rtspSource.getPort(),
                packetizer: (_c = this.player) === null || _c === void 0 ? void 0 : _c.getPlayerType(),
                startTime: 0
              };
            }
            break;
        }
        this.sendData(JSON.stringify({
          packetID: "playRequestPacket",
          data: packetData
        }));
      }
      createURL(serverItem) {
        let url = "";
        url += serverItem.getIfSSL() ? "wss://" : "ws://";
        url += serverItem.getHost();
        url += ":" + serverItem.getPort();
        url += "/" + StormConnection.STORM_WEBSOCKET_HARNESS;
        url += "/" + serverItem.getApplication();
        return url;
      }
      initiateReconnect() {
        const shouldReconnect = this.main.getConfigManager().getSettings().getIfRestartOnError();
        const reconnectTime = this.main.getConfigManager().getSettings().getReconnectTime();
        if (this.disconnectedByUser) {
          return;
        }
        if (shouldReconnect) {
          if (this.reconnectTimer != null) clearTimeout(this.reconnectTimer);
          this.reconnectTimer = setTimeout(() => {
            this.pickServerFromList(this.main.getConfigManager().getStream().getServerList());
            if (this.currServer != null) {
              this.logger.info(this, `Will reconnect to the server in ${reconnectTime} seconds...`);
              this.socketURL = this.createURL(this.currServer);
              this.logger.info(this, `Starting WebSocket connection with: ${this.socketURL}`);
              this.main.dispatchEvent("serverConnectionInitiate", {
                ref: this.main,
                serverURL: this.socketURL
              });
              this.startConnection();
            }
          }, reconnectTime * 1000);
        }
      }
      subscribeToStream() {
        if (this.isConnected && this.isAuthorized) {
          let packetData = null;
          packetData = {
            streamKey: this.main.getConfigManager().getStream().getGatewayStreamKey()
          };
          this.sendData(JSON.stringify({
            packetID: "subscriptionRequestPacket",
            data: packetData
          }));
        }
      }
      reportLatency(latency) {
        if (latency == 0) return;
        latency = Number(latency.toFixed(4));
        if (this.isConnected && this.isAuthorized) {
          let packetData = null;
          packetData = {
            streamKey: this.main.getConfigManager().getStream().getGatewayStreamKey(),
            latency: latency
          };
          this.sendData(JSON.stringify({
            packetID: "latencyReportPacket",
            data: packetData
          }));
        }
      }
      pickServerFromList(serverList) {
        let server = null;
        for (let i = 0; i < serverList.length; i++) {
          if (!serverList[i].getIfFaild()) {
            server = serverList[i];
            break;
          }
        }
        if (server == null) {
          this.logger.error(this, "All connections failed!");
          this.main.dispatchEvent("allConnectionsFailed", {
            ref: this.main,
            mode: "none"
          });
          if (this.coreReadyDispatched == false) {
            this.main.dispatchEvent("playerCoreReady", {
              ref: this.main
            });
            this.coreReadyDispatched = true;
          }
          this.currServer = null;
          return;
        } else {
          this.currServer = server;
        }
      }
      attachPlayer(player) {
        if (this.player != null) this.player.destroy();
        this.player = player;
      }
      requestPlayback(source) {
        if (this.isConnected) {
          if (this.isAuthorized) {
            this.source = source;
            this.sendPlayRequest();
          } else this.logger.error(this, `Error on "playSource" - the connection was not authorized!`);
        } else throw new Error("StormLibrary has not established a connection with a server");
      }
      newSubscription(streamKey) {
        if (this.isConnected) {
          if (this.isAuthorized) {
            let packetData = null;
            packetData = {
              streamKey: streamKey
            };
            this.sendData(JSON.stringify({
              packetID: "subscriptionRequestPacket",
              data: packetData
            }));
          } else this.logger.error(this, `Error on "playSource" - the connection was not authorized!`);
        } else throw new Error("StormLibrary has not established a connection with a server");
      }
      reinitialize() {
        if (!this.isConnectionActive()) {
          this.main.dispatchEvent("serverConnectionInitiate", {
            ref: this.main,
            serverURL: this.socketURL
          });
          this.startConnection();
        }
      }
      getIfAuthorized() {
        return this.isAuthorized;
      }
      getSourceItem() {
        return this.source;
      }
      isConnectionActive() {
        return this.isConnected;
      }
      destroy() {
        super.destroy();
        if (this.reconnectTimer != null) clearTimeout(this.reconnectTimer);
      }
    }
    StormConnection.STORM_WEBSOCKET_HARNESS = "storm/v2";

    class AbstractPlayer {
      constructor() {
        this.stoppedByBrowser = false;
      }
      getPlayerType() {
        return this.playerType;
      }
      getMetaData() {
        return this.metaData;
      }
      onMetaData(metadata) {
        this.metaData = metadata;
      }
      getIfStoppedByBrowser() {
        return this.stoppedByBrowser;
      }
    }

    class MSEPlayer extends AbstractPlayer {
      constructor(main, playbackController) {
        super();
        this.segmentsQueue = [];
        this.acceptNewSegments = false;
        this.playbackActive = false;
        this.shouldFlushData = false;
        this.bufferStartTime = 0;
        this.bufferEndTime = 0;
        this.addingSegments = false;
        this.latencyReportTimeCycle = 0;
        this.main = main;
        this.playbackController = playbackController;
        this.logger = main.getLogger();
        this.playerType = PlayerType.MSE;
        this.videoObject = main.getVideoContainer().getVideoObject();
        this.mediaSource = new MediaSource();
        this.logger.info(this, "MSEPlayer :: Initializing MSE Player");
        this.main.addEventListener("streamStateChange", event => {
          const streamState = PlaybackState[event.state];
          if (streamState == PlaybackState.PUBLISHED && this.stoppedByBrowser && this.videoObject != null) {
            this.stoppedByBrowser = false;
            this.playbackController.play();
          }
        });
      }
      start() {
        if (this.videoObject != null) {
          this.acceptNewSegments = true;
          this.mediaSource = new MediaSource();
          this.videoObject.src = URL.createObjectURL(this.mediaSource);
          this.mediaSource.addEventListener('sourceopen', () => {
            this.onMediaSourceOpen();
          }, false);
          setInterval(() => {
            this.timerEvent();
          }, 1000);
          this.videoObject.onplay = () => {
            this.onVideoPlay();
          };
          this.videoObject.onpause = event => {
            this.onVideoPause();
          };
          this.videoObject.onstalled = () => {
            this.logger.info(this, `VideoElement has stalled`);
            this.playbackController.setPlaybackState(PlaybackState.BUFFERING);
          };
          this.videoObject.onerror = function (error) {
            console.log("error", error);
          };
          this.videoObject.onwaiting = () => {};
        }
      }
      onMetaData(metadata) {
        if (this.videoObject != null) {
          if (this.mediaSource != null) {
            if (this.sourceBuffer != null) {
              this.sourceBuffer.onupdateend = null;
              this.sourceBuffer = null;
            }
            this.mediaSource = new MediaSource();
            this.videoObject.src = URL.createObjectURL(this.mediaSource);
            this.mediaSource.addEventListener('sourceopen', () => {
              this.onMediaSourceOpen();
            }, false);
          }
          this.acceptNewSegments = true;
          this.logger.info(this, `MetaData set`);
          this.playbackController.setPlaybackState(PlaybackState.BUFFERING);
          this.metaData = metadata;
        }
      }
      onMediaSourceOpen() {
        if (this.mediaSource != null) this.mediaSource.duration = 0;
        if (this.sourceBuffer == null) {
          this.sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
          this.sourceBuffer.mode = "segments";
          this.bufferStartTime = new Date().getTime();
          this.addingSegments = false;
          this.sourceBuffer.onupdateend = () => {
            this.appendSourceBuffer();
          };
        }
      }
      appendSourceBuffer() {
        if (this.sourceBuffer != null) {
          if (!this.sourceBuffer.updating) {
            if (this.shouldFlushData) {
              this.flushVideoCache();
              return;
            }
            if (this.segmentsQueue.length > 0) {
              this.sourceBuffer.appendBuffer(this.segmentsQueue.shift());
              this.checkVideoBuffer();
            } else {
              this.addingSegments = false;
            }
          }
        }
      }
      checkVideoBuffer() {
        if (this.videoObject != null) {
          let bufferSize = this.videoObject.buffered.length > 0 ? this.videoObject.buffered.end(this.videoObject.buffered.length - 1) : 0;
          if (this.playbackController.getPlaybackState() == PlaybackState.BUFFERING) {
            if (bufferSize > this.main.getConfigManager().getSettings().getBufferConfig().getStartValue()) {
              this.bufferEndTime = new Date().getTime();
              let bufferingTime = this.bufferEndTime - this.bufferStartTime;
              this.logger.success(this, `Buffer is full (completed in: ${bufferingTime}ms )`);
              this.playbackController.setPlaybackState(PlaybackState.UNKNOWN);
              this.main.dispatchEvent("bufferingComplete", {
                ref: this.main,
                mode: this.getPlayerType()
              });
              this.videoObject.play().then(() => {}).catch(error => {
                this.logger.error(this, `Error on playback: ` + error);
                this.playbackController.setPlaybackState(PlaybackState.PAUSED);
                this.main.dispatchEvent("interactionRequired", {
                  ref: this.main,
                  mode: "mse"
                });
              });
            }
          }
          if (this.playbackController.getPlaybackState() == PlaybackState.PLAYING) {
            if (bufferSize < this.main.getConfigManager().getSettings().getBufferConfig().getMinValue()) {
              this.logger.info(this, `VideoElement is waiting for data`);
              this.playbackController.setPlaybackState(PlaybackState.BUFFERING);
              this.videoObject.pause();
            }
          }
        }
      }
      timerEvent() {
        var _a, _b;
        if (this.videoObject != null) {
          if (this.videoObject.duration > 30) {
            this.shouldFlushData = true;
          }
        }
        if (this.playbackController.getPlaybackState() == PlaybackState.PLAYING) {
          this.latencyReportTimeCycle++;
          if (this.latencyReportTimeCycle > 5) {
            this.latencyReportTimeCycle = 0;
            (_b = (_a = this.playbackController) === null || _a === void 0 ? void 0 : _a.getConnection()) === null || _b === void 0 ? void 0 : _b.reportLatency(this.getVideoBufferSize());
          }
        }
      }
      getVideoBufferSize() {
        if (this.videoObject != null) {
          if (this.videoObject.buffered.length > 0) {
            return this.videoObject.buffered.end(this.videoObject.buffered.length - 1) - this.videoObject.currentTime;
          } else {
            return 0;
          }
        }
        return 0;
      }
      pushData(data) {
        if (this.acceptNewSegments) {
          this.segmentsQueue.push(data);
          if (this.addingSegments == false) {
            this.addingSegments = true;
            this.appendSourceBuffer();
          }
        }
      }
      play() {}
      pause() {
        var _a;
        this.logger.info(this, "Pause clicked | State: " + this.playbackController.getPlaybackState());
        switch (this.playbackController.getPlaybackState()) {
          case PlaybackState.UNKNOWN:
          case PlaybackState.BUFFERING:
          case PlaybackState.PAUSED:
          case PlaybackState.PLAYING:
            {
              this.acceptNewSegments = false;
              (_a = this.videoObject) === null || _a === void 0 ? void 0 : _a.pause();
              this.segmentsQueue = [];
            }
            break;
          default:
            {
              this.logger.info(this, "Pause clicked | Nothing to do");
            }
        }
      }
      stop() {
        if (this.videoObject != null) {
          this.videoObject.onpause = null;
          this.videoObject.onstalled = null;
          this.videoObject.onplay = null;
        }
        switch (this.playbackController.getPlaybackState()) {
          case PlaybackState.BUFFERING:
          case PlaybackState.PLAYING:
            {
              this.acceptNewSegments = false;
              if (this.sourceBuffer != null) {
                this.sourceBuffer.onupdateend = null;
                this.sourceBuffer = null;
              }
              this.mediaSource = new MediaSource();
              this.videoObject.src = URL.createObjectURL(this.mediaSource);
              this.videoObject.load();
              this.segmentsQueue = [];
            }
            break;
          default:
            {
              this.logger.info(this, "Pause clicked | Nothing to do");
            }
        }
        this.playbackController.setPlaybackState(PlaybackState.STOPPED);
      }
      getAbsoluteTime() {
        return 0;
      }
      getTime() {
        return 0;
      }
      isPlaying() {
        return this.playbackActive;
      }
      onVideoPause() {
        if (this.playbackController.getPlaybackState() == PlaybackState.PLAYING) {
          this.logger.info(this, `Playback paused!`);
          this.stoppedByBrowser = true;
          this.playbackActive = false;
          this.playbackController.setPlaybackState(PlaybackState.PAUSED);
          return;
        }
      }
      onVideoPlay() {
        if (!this.stoppedByBrowser) {
          this.logger.info(this, `Playback started!`);
          this.playbackActive = true;
          this.playbackController.setPlaybackState(PlaybackState.PLAYING);
        } else {
          this.logger.warning(this, `Playback was previously stopped by the browser!`);
          this.stoppedByBrowser = false;
          this.videoObject.pause();
          this.playbackController.play();
        }
      }
      onVideoStop() {}
      restart() {}
      seek(time) {
        return false;
      }
      setURL(url) {}
      flushVideoCache() {
        if (this.mediaSource != null) {
          if (this.sourceBuffer != null) {
            if (!this.sourceBuffer.updating) {
              let duration = this.videoObject.duration;
              if (duration > 6) this.sourceBuffer.remove(0, duration - 5);
              this.shouldFlushData = false;
            }
          }
        }
      }
      destroy() {
        var _a;
        this.acceptNewSegments = false;
        (_a = this.videoObject) === null || _a === void 0 ? void 0 : _a.pause();
        if (this.mediaSource != null) {
          this.sourceBuffer = null;
        }
        this.segmentsQueue = [];
        this.videoObject = null;
      }
    }

    class HLSPlayer extends AbstractPlayer {
      constructor(main, playbackController) {
        super();
        this.playbackActive = false;
        this.main = main;
        this.playbackController = playbackController;
        this.logger = main.getLogger();
        this.playerType = PlayerType.HLS;
        this.videoObject = main.getVideoContainer().getVideoObject();
        this.logger.info(this, "HLSPlayer :: Initializing HLS Player");
        this.main.addEventListener("streamStateChange", event => {
          const streamState = PlaybackState[event.state];
          if (streamState == PlaybackState.PUBLISHED && this.stoppedByBrowser && this.videoObject != null) {
            this.stoppedByBrowser = false;
            this.playbackController.play();
          }
        });
      }
      start() {
        if (this.videoObject != null) {
          setInterval(() => {
            this.timerEvent();
          }, 1000);
          this.videoObject.onplay = () => {
            this.onVideoPlay();
          };
          this.videoObject.onpause = () => {
            this.onVideoPause();
          };
          this.videoObject.onstalled = () => {
            this.logger.info(this, `VideoElement has stalled`);
          };
          this.videoObject.onerror = function (error) {
            console.log("error", error);
          };
          this.videoObject.onwaiting = () => {};
        }
      }
      onMetaData(metadata) {
        if (this.videoObject != null) {
          this.logger.info(this, `MetaData set`);
          this.metaData = metadata;
        }
      }
      checkVideoBuffer() {
        if (this.videoObject != null) {
          let bufferSize = this.videoObject.buffered.length > 0 ? this.videoObject.buffered.end(this.videoObject.buffered.length - 1) : 0;
          if (this.playbackController.getPlaybackState() == PlaybackState.BUFFERING) {
            if (bufferSize > this.main.getConfigManager().getSettings().getBufferConfig().getStartValue()) {
              this.logger.success(this, `Buffer is full`);
              this.playbackController.setPlaybackState(PlaybackState.UNKNOWN);
              this.videoObject.play().then(() => {}).catch(error => {
                this.logger.success(this, `Error on playback` + error);
              });
            }
          }
          if (this.playbackController.getPlaybackState() == PlaybackState.PLAYING) {
            if (bufferSize < this.main.getConfigManager().getSettings().getBufferConfig().getMinValue()) {
              this.logger.info(this, `VideoElement is waiting for data`);
              this.playbackController.setPlaybackState(PlaybackState.BUFFERING);
              this.videoObject.pause();
            }
          }
        }
      }
      timerEvent() {}
      getVideoBufferSize() {
        if (this.videoObject != null) {
          if (this.videoObject.buffered.length > 0) {
            return this.videoObject.buffered.end(this.videoObject.buffered.length - 1) - this.videoObject.currentTime;
          } else {
            return 0;
          }
        }
        return 0;
      }
      play() {}
      pause() {
        var _a;
        this.logger.info(this, "Pause clicked | State: " + this.playbackController.getPlaybackState());
        switch (this.playbackController.getPlaybackState()) {
          case PlaybackState.UNKNOWN:
          case PlaybackState.BUFFERING:
          case PlaybackState.PAUSED:
          case PlaybackState.PLAYING:
            {
              (_a = this.videoObject) === null || _a === void 0 ? void 0 : _a.pause();
            }
            break;
          default:
            {
              this.logger.info(this, "Pause clicked | Nothing to do");
            }
        }
      }
      stop() {
        switch (this.playbackController.getPlaybackState()) {
          case PlaybackState.BUFFERING:
          case PlaybackState.PLAYING:
            {
              this.videoObject.load();
            }
            break;
          default:
            {
              this.logger.info(this, "Pause clicked | Nothing to do");
            }
        }
        this.playbackController.setPlaybackState(PlaybackState.STOPPED);
      }
      setURL(url) {
        var _a;
        this.mediaURL = url;
        this.playbackController.setPlaybackState(PlaybackState.BUFFERING);
        this.videoObject.src = this.mediaURL;
        (_a = this.videoObject) === null || _a === void 0 ? void 0 : _a.play();
      }
      getAbsoluteTime() {
        return 0;
      }
      getTime() {
        return 0;
      }
      isPlaying() {
        return this.playbackActive;
      }
      onVideoPause() {
        if (this.playbackController.getPlaybackState() == PlaybackState.PLAYING) {
          this.logger.info(this, `Playback paused!`);
          if (this.playbackController.isTabHidden()) {
            this.stoppedByBrowser = true;
          }
          this.playbackActive = false;
          this.playbackController.setPlaybackState(PlaybackState.PAUSED);
          return;
        }
      }
      onVideoPlay() {
        if (!this.stoppedByBrowser) {
          this.main.dispatchEvent("bufferingComplete", {
            ref: this.main,
            mode: this.getPlayerType()
          });
          this.logger.info(this, `Playback started!`);
          this.playbackActive = true;
          this.playbackController.setPlaybackState(PlaybackState.PLAYING);
        } else {
          this.logger.warning(this, `Playback was previously stopped by the browser!`);
          this.stoppedByBrowser = false;
          this.videoObject.pause();
          this.playbackController.play();
        }
      }
      onVideoStop() {}
      restart() {}
      seek(time) {
        return false;
      }
      destroy() {
        var _a;
        (_a = this.videoObject) === null || _a === void 0 ? void 0 : _a.pause();
        this.videoObject = null;
      }
    }

    class MMSPlayer extends AbstractPlayer {
      constructor(main, playbackController) {
        super();
        this.segmentsQueue = [];
        this.acceptNewSegments = false;
        this.playbackActive = false;
        this.shouldFlushData = false;
        this.bufferStartTime = 0;
        this.bufferEndTime = 0;
        this.addingSegments = false;
        this.latencyReportTimeCycle = 0;
        this.main = main;
        this.playbackController = playbackController;
        this.logger = main.getLogger();
        this.playerType = PlayerType.MSE;
        this.videoObject = main.getVideoContainer().getVideoObject();
        this.mediaSource = new ManagedMediaSource();
        this.logger.info(this, "MMSPlayer :: Initializing MMS Player");
        this.main.addEventListener("streamStateChange", event => {
          const streamState = PlaybackState[event.state];
          if (streamState == PlaybackState.PUBLISHED && this.stoppedByBrowser && this.videoObject != null) {
            this.playbackController.play();
          }
        });
      }
      start() {
        if (this.videoObject != null) {
          this.acceptNewSegments = true;
          this.mediaSource = new ManagedMediaSource();
          this.videoObject.disableRemotePlayback = true;
          this.videoObject.controls = false;
          this.videoObject.src = URL.createObjectURL(this.mediaSource);
          this.mediaSource.addEventListener('sourceopen', () => {
            this.onMediaSourceOpen();
          }, false);
          setInterval(() => {
            this.timerEvent();
          }, 1000);
          this.videoObject.onplay = () => {
            this.onVideoPlay();
          };
          this.videoObject.onpause = event => {
            this.onVideoPause();
          };
          this.videoObject.onstalled = () => {
            this.logger.info(this, `VideoElement has stalled`);
            this.playbackController.setPlaybackState(PlaybackState.BUFFERING);
          };
          this.videoObject.onerror = function (error) {
            console.log("error", error);
          };
          this.videoObject.onwaiting = () => {};
        }
      }
      onMetaData(metadata) {
        if (this.videoObject != null) {
          if (this.mediaSource != null) {
            if (this.sourceBuffer != null) {
              this.sourceBuffer.onupdateend = null;
              this.sourceBuffer = null;
            }
            this.mediaSource = new ManagedMediaSource();
            this.videoObject.disableRemotePlayback = true;
            this.videoObject.controls = false;
            this.videoObject.src = URL.createObjectURL(this.mediaSource);
            this.mediaSource.addEventListener('sourceopen', () => {
              this.onMediaSourceOpen();
            }, false);
          }
          this.acceptNewSegments = true;
          this.logger.info(this, `MetaData set`);
          this.playbackController.setPlaybackState(PlaybackState.BUFFERING);
          this.metaData = metadata;
        }
      }
      onMediaSourceOpen() {
        if (this.mediaSource != null) this.mediaSource.duration = 0;
        if (this.sourceBuffer == null) {
          this.sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
          if (this.sourceBuffer != null) {
            this.sourceBuffer.mode = "segments";
            this.bufferStartTime = new Date().getTime();
            this.addingSegments = false;
            this.sourceBuffer.onupdateend = () => {
              this.appendSourceBuffer();
            };
          }
        }
      }
      appendSourceBuffer() {
        if (this.sourceBuffer != null) {
          if (!this.sourceBuffer.updating) {
            if (this.shouldFlushData) {
              this.flushVideoCache();
              return;
            }
            if (this.segmentsQueue.length > 0) {
              this.sourceBuffer.appendBuffer(this.segmentsQueue.shift());
              this.checkVideoBuffer();
            } else {
              this.addingSegments = false;
            }
          }
        }
      }
      checkVideoBuffer() {
        if (this.videoObject != null) {
          let bufferSize = this.videoObject.buffered.length > 0 ? this.videoObject.buffered.end(this.videoObject.buffered.length - 1) : 0;
          if (this.playbackController.getPlaybackState() == PlaybackState.BUFFERING) {
            if (bufferSize > this.main.getConfigManager().getSettings().getBufferConfig().getStartValue()) {
              this.bufferEndTime = new Date().getTime();
              let bufferingTime = this.bufferEndTime - this.bufferStartTime;
              this.logger.success(this, `Buffer is full (completed in: ${bufferingTime}ms )`);
              this.playbackController.setPlaybackState(PlaybackState.UNKNOWN);
              this.main.dispatchEvent("bufferingComplete", {
                ref: this.main,
                mode: this.getPlayerType()
              });
              this.videoObject.play().then(() => {}).catch(error => {
                this.logger.error(this, `Error on playback: ` + error);
                this.playbackController.setPlaybackState(PlaybackState.PAUSED);
                this.main.dispatchEvent("interactionRequired", {
                  ref: this.main,
                  mode: "mse"
                });
              });
            }
          }
          if (this.playbackController.getPlaybackState() == PlaybackState.PLAYING) {
            if (bufferSize < this.main.getConfigManager().getSettings().getBufferConfig().getMinValue()) {
              this.logger.info(this, `VideoElement is waiting for data`);
              this.playbackController.setPlaybackState(PlaybackState.BUFFERING);
              this.videoObject.pause();
            }
          }
        }
      }
      timerEvent() {
        var _a, _b;
        if (this.videoObject != null) {
          if (this.videoObject.duration > 30) {
            this.shouldFlushData = true;
          }
        }
        if (this.playbackController.getPlaybackState() == PlaybackState.PLAYING) {
          this.latencyReportTimeCycle++;
          if (this.latencyReportTimeCycle > 5) {
            this.latencyReportTimeCycle = 0;
            (_b = (_a = this.playbackController) === null || _a === void 0 ? void 0 : _a.getConnection()) === null || _b === void 0 ? void 0 : _b.reportLatency(this.getVideoBufferSize());
          }
        }
      }
      getVideoBufferSize() {
        if (this.videoObject != null) {
          if (this.videoObject.buffered.length > 0) {
            return this.videoObject.buffered.end(this.videoObject.buffered.length - 1) - this.videoObject.currentTime;
          } else {
            return 0;
          }
        }
        return 0;
      }
      pushData(data) {
        if (this.acceptNewSegments) {
          this.segmentsQueue.push(data);
          if (this.addingSegments == false) {
            this.addingSegments = true;
            this.appendSourceBuffer();
          }
        }
      }
      play() {}
      pause() {
        var _a;
        this.logger.info(this, "Pause clicked | State: " + this.playbackController.getPlaybackState());
        switch (this.playbackController.getPlaybackState()) {
          case PlaybackState.UNKNOWN:
          case PlaybackState.BUFFERING:
          case PlaybackState.PAUSED:
          case PlaybackState.PLAYING:
            {
              this.acceptNewSegments = false;
              (_a = this.videoObject) === null || _a === void 0 ? void 0 : _a.pause();
              this.segmentsQueue = [];
            }
            break;
          default:
            {
              this.logger.info(this, "Pause clicked | Nothing to do");
            }
        }
      }
      stop() {
        if (this.videoObject != null) {
          this.videoObject.onpause = null;
          this.videoObject.onstalled = null;
          this.videoObject.onplay = null;
        }
        switch (this.playbackController.getPlaybackState()) {
          case PlaybackState.BUFFERING:
          case PlaybackState.PLAYING:
            {
              this.acceptNewSegments = false;
              if (this.sourceBuffer != null) {
                this.sourceBuffer.onupdateend = null;
                this.sourceBuffer = null;
              }
              this.mediaSource = new ManagedMediaSource();
              this.videoObject.src = URL.createObjectURL(this.mediaSource);
              this.videoObject.load();
              this.segmentsQueue = [];
            }
            break;
          default:
            {
              this.logger.info(this, "Pause clicked | Nothing to do");
            }
        }
        this.playbackController.setPlaybackState(PlaybackState.STOPPED);
      }
      getAbsoluteTime() {
        return 0;
      }
      getTime() {
        return 0;
      }
      isPlaying() {
        return this.playbackActive;
      }
      onVideoPause() {
        if (this.playbackController.getPlaybackState() == PlaybackState.PLAYING) {
          this.logger.info(this, `Playback paused!`);
          this.stoppedByBrowser = true;
          this.playbackActive = false;
          this.playbackController.setPlaybackState(PlaybackState.PAUSED);
          return;
        }
      }
      onVideoPlay() {
        if (!this.stoppedByBrowser) {
          this.logger.info(this, `Playback started!`);
          this.playbackActive = true;
          this.playbackController.setPlaybackState(PlaybackState.PLAYING);
        } else {
          this.logger.warning(this, `Playback was previously stopped by the browser!`);
          this.stoppedByBrowser = false;
          this.videoObject.pause();
          this.playbackController.play();
        }
      }
      onVideoStop() {}
      restart() {}
      seek(time) {
        return false;
      }
      setURL(url) {}
      flushVideoCache() {
        if (this.mediaSource != null) {
          if (this.sourceBuffer != null) {
            if (!this.sourceBuffer.updating) {
              let duration = this.videoObject.duration;
              if (duration > 6) this.sourceBuffer.remove(0, duration - 5);
              this.shouldFlushData = false;
            }
          }
        }
      }
      destroy() {
        var _a;
        this.acceptNewSegments = false;
        (_a = this.videoObject) === null || _a === void 0 ? void 0 : _a.pause();
        if (this.mediaSource != null) {
          this.sourceBuffer = null;
        }
        this.segmentsQueue = [];
        this.videoObject = null;
      }
    }

    class PlaybackController {
      constructor(main) {
        this.MSE_ENABLED = true;
        this.HLS_ENABLED = true;
        this.playbackState = PlaybackState.NOT_INITIALIZED;
        this.previousPlaybackState = PlaybackState.NOT_INITIALIZED;
        this.streamState = PlaybackState.NOT_INITIALIZED;
        this.tabHidden = false;
        this.wasPausedByUser = false;
        this.wasFreezed = false;
        this.wasPlayingBeforeFreeze = false;
        this.lastSelectedBitrate = null;
        this.command = "none";
        this.absoluteStreamTime = 0;
        this.main = main;
        this.logger = main.getLogger();
        this.connection = new StormConnection(this.main);
        this.connection.initialize();
        this.command = this.main.getConfigManager().getSettings().getIfAutoStart() ? "play" : "pause";
        this.main.addEventListener("authorizationComplete", () => {
          this.logger.info(this, "Library is ready for interaction!");
          this.playbackState = PlaybackState.INITIALIZED;
          if (this.main.getConfigManager().getConfigurationType() == ConfigurationType.EMBEDDED) {
            if (this.main.getConfigManager().getSettings().getIfAutoStart()) {
              this.start();
            }
          }
        });
        this.main.addEventListener("streamStateChange", event => {
          this.streamState = PlaybackState[event.state];
          if (this.streamState == PlaybackState.PUBLISHED) {
            if (this.command == "play") {
              this.logger.info(this, "Stream is published, autostart!");
              this.wasPlayingBeforeFreeze = false;
              switch (this.playbackState) {
                case PlaybackState.BUFFERING:
                case PlaybackState.PLAYING:
                  this.logger.info(this, "Switching video!");
                  this.pause();
                  this.start();
                  break;
                case PlaybackState.INITIALIZED:
                case PlaybackState.STOPPED:
                  this.logger.info(this, "Switching video!");
                  this.start();
                  break;
                case PlaybackState.PAUSED:
                  this.logger.info(this, "Playback was paused, omitting...");
                  break;
                default:
                  this.logger.error(this, "Unsupported state on autostart: " + this.playbackState);
              }
            } else this.logger.info(this, "Standby mode - no autostart " + this.command);
          }
          if (this.streamState == PlaybackState.AWAITING || this.streamState == PlaybackState.UNPUBLISHED || this.streamState == PlaybackState.CLOSED) {
            if (this.playbackState == PlaybackState.PAUSED || this.playbackState == PlaybackState.PLAYING) {
              this.setPlaybackState(PlaybackState.STOPPED);
            }
          }
        });
        document.addEventListener("visibilitychange", event => {
          if (document.visibilityState == "visible") {
            if (UserCapabilities.isMobile()) {
              this.logger.info(this, "Document is visible again, restoring player...");
              this.tabHidden = false;
              if (this.wasFreezed) {
                this.wasFreezed = false;
                if (this.command == "play") {
                  this.play();
                }
              }
            }
          } else {
            if (UserCapabilities.isMobile()) {
              this.logger.info(this, "Document is not visible, stopping player...");
              this.tabHidden = true;
              this.wasFreezed = true;
              this.stop();
            }
          }
        });
        this.main.addEventListener("streamConfigChange", () => {
          var _a;
          this.logger.info(this, "Stream configuration has been updated - reloading...");
          this.connection.disconnect();
          this.connection.destroy();
          (_a = this.player) === null || _a === void 0 ? void 0 : _a.destroy();
          this.playbackState = PlaybackState.STOPPED;
          this.connection = new StormConnection(this.main);
          this.connection.initialize();
        });
        this.main.addEventListener("playbackProgress", event => {
          this.absoluteStreamTime = event.streamStartTime + event.streamDuration;
        });
      }
      start() {
        let isSuccessful = false;
        if (this.connection.getConnectionState() == ConnectionState.CONNECTED && this.connection.getIfAuthorized()) {
          this.selectedSource = this.selectSource();
          if (this.selectedSource != null) {
            this.player = this.selectPlayer(this.selectedSource);
            if (this.player != null) {
              this.player.start();
              this.connection.attachPlayer(this.player);
              this.connection.requestPlayback(this.selectedSource);
              this.playbackState = PlaybackState.INITIALIZED;
              this.wasPlayingBeforeFreeze = true;
              isSuccessful = true;
            } else this.playbackState = PlaybackState.STOPPED;
          } else this.playbackState = PlaybackState.STOPPED;
        } else {
          this.logger.error(this, "Connection with the server is not working or not authorized!");
          this.playbackState = PlaybackState.STOPPED;
        }
        return isSuccessful;
      }
      playCommand() {
        this.command = "play";
        return this.play();
      }
      play() {
        let isSuccessful = false;
        this.wasPausedByUser = false;
        this.wasPlayingBeforeFreeze = true;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            this.logger.info(this, "Play enforced, current playbackState: " + this.playbackState);
            switch (this.playbackState) {
              case PlaybackState.INITIALIZED:
                this.start();
                break;
              case PlaybackState.STOPPED:
                this.connection.reinitialize();
                break;
              case PlaybackState.NOT_INITIALIZED:
                this.start();
                isSuccessful = true;
                break;
              case PlaybackState.BUFFERING:
              case PlaybackState.PAUSED:
                this.connection.sendPlayRequest();
                isSuccessful = true;
                break;
              case PlaybackState.UNPUBLISHED:
                this.start();
                isSuccessful = true;
                break;
              case PlaybackState.UNKNOWN:
                this.restart();
                isSuccessful = true;
              default:
                this.logger.warning(this, " Play() clicked, but current playbackState is: " + this.playbackState);
            }
          } else {
            this.logger.error(this, "Could not play, since it's not working in player-mode!");
            isSuccessful = false;
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
          isSuccessful = false;
        }
        return isSuccessful;
      }
      pauseCommand() {
        this.command = "pause";
        return this.pause();
      }
      pause() {
        var _a, _b;
        let isSuccessful = false;
        this.wasPlayingBeforeFreeze = false;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            this.wasPausedByUser = true;
            switch (this.playbackState) {
              case PlaybackState.BUFFERING:
                this.setPlaybackState(PlaybackState.PAUSED);
                (_a = this.player) === null || _a === void 0 ? void 0 : _a.pause();
                this.connection.sendPauseRequest();
                break;
              case PlaybackState.UNKNOWN:
              case PlaybackState.PLAYING:
                this.setPlaybackState(PlaybackState.PAUSED);
                (_b = this.player) === null || _b === void 0 ? void 0 : _b.pause();
                this.connection.sendPauseRequest();
                break;
              default:
                this.logger.warning(this, " Pause() clicked, but current playbackState is: " + this.playbackState);
            }
          } else {
            this.logger.error(this, "Could not pause, since it's not working in player-mode!");
            isSuccessful = false;
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
          isSuccessful = false;
        }
        return isSuccessful;
      }
      togglePlay() {
        let isSuccessful = false;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            switch (this.playbackState) {
              case PlaybackState.UNKNOWN:
              case PlaybackState.PLAYING:
              case PlaybackState.BUFFERING:
                this.command = "pause";
                this.pause();
                break;
              case PlaybackState.INITIALIZED:
              case PlaybackState.STOPPED:
              case PlaybackState.NOT_INITIALIZED:
              case PlaybackState.PAUSED:
                this.play();
                this.command = "play";
                break;
            }
          } else {
            this.logger.error(this, "Could not toggle, since it's not working in player-mode!");
            isSuccessful = false;
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
          isSuccessful = false;
        }
        return isSuccessful;
      }
      isPlaying() {
        return this.playbackState == PlaybackState.PLAYING || this.playbackState == PlaybackState.BUFFERING;
      }
      stopCommand() {
        this.command = "pause";
        return this.stop();
      }
      stop() {
        let isSuccessful = false;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            this.connection.disconnect();
            if (this.player != null) {
              this.player.stop();
            } else this.setPlaybackState(PlaybackState.STOPPED);
          } else {
            this.logger.error(this, "Could not play, since it's not working in player-mode!");
            isSuccessful = false;
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
          isSuccessful = false;
        }
        return isSuccessful;
      }
      mute() {
        let isSuccessful = false;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            this.main.getVideoContainer().mute();
          } else {
            this.logger.error(this, "Could not pause, since it's not working in player-mode!");
            isSuccessful = false;
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
          isSuccessful = false;
        }
        return isSuccessful;
      }
      unmute() {
        let isSuccessful = false;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            this.main.getVideoContainer().unmute();
          } else {
            this.logger.error(this, "Could not pause, since it's not working in player-mode!");
            isSuccessful = false;
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
          isSuccessful = false;
        }
        return isSuccessful;
      }
      toggleMute() {
        let isSuccessful = false;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            if (this.main.getVideoContainer().getVideoObject().muted) this.unmute();else this.mute();
            isSuccessful = true;
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
        }
        return isSuccessful;
      }
      setVolume(value) {
        let isSuccessful = false;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            this.main.getVideoContainer().setVolume(value);
            isSuccessful = true;
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
        }
        return isSuccessful;
      }
      getVolume() {
        let value = 0;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            value = this.main.getVideoContainer().getVolume();
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
        }
        return value;
      }
      selectPlayer(source) {
        let player = null;
        if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
          switch (source.getType()) {
            case ProtocolType.WEBRTC:
              {
                this.logger.error(this, "No WebRTC Player implementation!");
              }
              break;
            case ProtocolType.STORM:
            case ProtocolType.RTMP:
              {
                if (player == null && UserCapabilities.hasMMSSupport() && this.main.getConfigManager().getSettings().getIfProtocolEnabled(ProtocolType.STORM) && this.MSE_ENABLED) {
                  this.logger.info(this, "MMS Player was picked for this source!");
                  player = new MMSPlayer(this.main, this);
                }
                if (player == null && UserCapabilities.hasMSESupport() && this.main.getConfigManager().getSettings().getIfProtocolEnabled(ProtocolType.STORM) && this.MSE_ENABLED) {
                  this.logger.info(this, "MSE Player was picked for this source!");
                  player = new MSEPlayer(this.main, this);
                }
                if (player == null && !UserCapabilities.hasMSESupport() && this.main.getConfigManager().getSettings().getIfProtocolEnabled(ProtocolType.STORM) && this.HLS_ENABLED) {
                  this.logger.info(this, "HLS Player was picked for this source!");
                  player = new HLSPlayer(this.main, this);
                }
              }
              break;
            default:
              {
                this.logger.error(this, "This device does not support any available media protocol!");
                this.main.dispatchEvent("compatibilityError", {
                  ref: this.main,
                  message: "This device does not support any available media protocol!"
                });
              }
          }
          if (player == null) {
            this.main.dispatchEvent("compatibilityError", {
              ref: this.main,
              message: "This device does not support any available media protocol!"
            });
          }
        }
        return player;
      }
      isMute() {
        let isMuted = false;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            return this.main.getVideoContainer().getVideoObject().muted;
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
          isMuted = false;
        }
        return isMuted;
      }
      restart() {
        var _a;
        let isSuccessful = false;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            this.connection.disconnect();
            (_a = this.player) === null || _a === void 0 ? void 0 : _a.stop();
            this.setPlaybackState(PlaybackState.NOT_INITIALIZED);
            this.connection.startConnection();
          } else {
            this.logger.error(this, "Could not play, since it's not working in player-mode!");
            isSuccessful = false;
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
          isSuccessful = false;
        }
        return isSuccessful;
      }
      reinitialize() {}
      selectSource() {
        const sourceList = this.main.getConfigManager().getStream().getSourceList();
        if (sourceList.length === 0) return null;
        let selectedSource;
        if (this.lastSelectedBitrate === null) {
          if (UserCapabilities.isMobile()) {
            const sortedSources = sourceList.sort((a, b) => a.getStreamInfo().getBitrate() - b.getStreamInfo().getBitrate());
            selectedSource = sortedSources[Math.floor(sortedSources.length / 2)];
          } else {
            selectedSource = sourceList.reduce((max, curr) => max.getStreamInfo().getBitrate() < curr.getStreamInfo().getBitrate() ? curr : max);
          }
        } else {
          selectedSource = sourceList.reduce((closest, curr) => {
            return Math.abs(curr.getStreamInfo().getBitrate() - this.lastSelectedBitrate) < Math.abs(closest.getStreamInfo().getBitrate() - this.lastSelectedBitrate) ? curr : closest;
          }, sourceList[0]);
        }
        this.lastSelectedBitrate = selectedSource.getStreamInfo().getBitrate();
        return selectedSource;
      }
      getPlaybackState() {
        return this.playbackState;
      }
      getStreamState() {
        return this.streamState;
      }
      setPlaybackState(newState) {
        var _a, _b, _c, _d;
        this.previousPlaybackState = this.playbackState;
        switch (newState) {
          case PlaybackState.PLAYING:
            this.main.dispatchEvent("playbackStart", {
              ref: this.main,
              mode: this.player.getPlayerType(),
              streamKey: this.connection.getSourceItem().getStreamKey()
            });
            if (((_a = this.main.getVideoElement()) === null || _a === void 0 ? void 0 : _a.muted) == false) this.main.dispatchEvent("videoUnmuted", {
              ref: this.main
            });
            break;
          case PlaybackState.PAUSED:
            this.logger.info(this, "Playback Pause Event!");
            this.main.dispatchEvent("playbackPause", {
              ref: this.main,
              mode: this.player.getPlayerType(),
              streamKey: this.connection.getSourceItem().getStreamKey()
            });
            this.previousPlaybackState = PlaybackState.PAUSED;
            break;
          case PlaybackState.BUFFERING:
            this.logger.info(this, "Playback Buffering Event!");
            this.main.dispatchEvent("bufferingStart", {
              ref: this.main,
              mode: this.player.getPlayerType()
            });
            break;
          case PlaybackState.STOPPED:
            if (this.player != null) {
              this.logger.info(this, "Playback Stop Event!");
              this.main.dispatchEvent("playbackStop", {
                ref: this.main,
                mode: this.player.getPlayerType(),
                streamKey: (_d = (_c = (_b = this.connection) === null || _b === void 0 ? void 0 : _b.getSourceItem()) === null || _c === void 0 ? void 0 : _c.getStreamKey()) !== null && _d !== void 0 ? _d : "Unknown"
              });
            }
            break;
        }
        this.playbackState = newState;
      }
      getIfPausedbyUser() {
        return this.wasPausedByUser;
      }
      getConnection() {
        return this.connection;
      }
      switchSource(sourceLabel) {
        let sourceFound = false;
        this.setPlaybackState(PlaybackState.STOPPED);
        this.connection.sendPauseRequest();
        const sourceList = this.main.getConfigManager().getStream().getSourceList();
        for (let i = 0; i < sourceList.length; i++) {
          let source = sourceList[i];
          if (source.getStreamInfo().getLabel() == sourceLabel) {
            this.lastSelectedBitrate = source.getStreamInfo().getBitrate();
            this.connection.requestPlayback(source);
            sourceFound = true;
            break;
          }
        }
        return sourceFound;
      }
      getAbsoluteStreamTime() {
        let streamTime = 0;
        if (this.main.isInitialized()) {
          if (this.main.getConfigManager().getRole() == RoleType.PLAYER) {
            return this.absoluteStreamTime;
          }
        } else {
          this.logger.error(this, "Library has not been initialized yet!");
        }
        return streamTime;
      }
      setCurrentSource(source) {
        this.lastSelectedBitrate = source.getStreamInfo() != null ? source.getStreamInfo().getBitrate() : 0;
        this.selectedSource = source;
      }
      setCommand(newCommand) {
        this.command = newCommand;
      }
      isTabHidden() {
        return this.tabHidden;
      }
      destroy() {
        if (this.connection != null) this.connection.destroy();
        if (this.player != null) this.player.destroy();
      }
    }

    class StormLibrary extends EventDispatcher {
      constructor(streamConfig) {
        super();
        this.LIBRARY_VERSION = "4.2.0";
        this.COMPILE_DATE = "5/9/2024, 11:53:22 AM";
        this.LIBRARY_BRANCH = "Main";
        this.PLAYER_PROTOCOL_VERSION = 1;
        this.initialized = false;
        this.wasUnmuted = false;
        this.libraryID = StormLibrary.NEXT_LIBRARY_ID++;
        if (typeof window === 'undefined' || !window.document || !window.document.createElement) return;
        if (streamConfig != null) this.setStreamConfig(streamConfig);
      }
      initialize() {
        const self = this;
        if (this.streamConfig == null) throw Error("Stream Config was not provided for this library! A properly configured object must be provided through the constructor or via the setConfig method before using the initialize() method.");
        if (this.config.getSettings().getIfStartOnDOMReadyEnabled() || this.config.getSettings().getIfIOSOnDomStartFixEnabled() && UserCapabilities.getOS() == "iOS") {
          if (document.readyState !== "complete") {
            document.onreadystatechange = function () {
              if (document.readyState === 'complete') {
                self.initialize();
              }
            };
            return;
          }
        }
        this.videoContainer = new VideoContainer(this);
        this.playbackController = new PlaybackController(this);
        this.initialized = true;
        this.addEventListener("videoUnmuted", () => {
          this.wasUnmuted = true;
        });
      }
      setStreamConfig(streamConfig) {
        let copiedStreamConfig = JSON.parse(JSON.stringify(streamConfig));
        if (this.streamConfig == null) {
          this.streamConfig = streamConfig;
          this.config = new ConfigManager(copiedStreamConfig);
          this.logger = new Logger(this.config.getSettings().getDebugConfig(), this);
          this.logger.info(this, "LibraryID: " + this.libraryID);
          this.logger.info(this, "Version: " + this.LIBRARY_VERSION + " | Compile Date: " + this.COMPILE_DATE + " | Branch: " + this.LIBRARY_BRANCH);
          this.logger.info(this, "UserCapabilities :: Browser: " + UserCapabilities.getBrowserName() + " " + UserCapabilities.getBrowserVersion());
          this.logger.info(this, "UserCapabilities :: Operating System: " + UserCapabilities.getOS() + " " + UserCapabilities.getOSVersion());
          this.logger.info(this, "UserCapabilities :: isMobile: " + UserCapabilities.isMobile());
          this.logger.info(this, "UserCapabilities :: hasMSESupport: " + UserCapabilities.hasMSESupport());
          this.logger.info(this, "UserCapabilities :: hasWebSocketSupport: " + UserCapabilities.hasWebSocketsSupport());
          this.logger.info(this, "UserCapabilities :: hasWebRTCSupport: " + UserCapabilities.hasWebRTCSupport());
          this.logger.info(this, "UserCapabilities :: isCookieEnabled: " + UserCapabilities.isCookieEnabled());
          this.config.print(this.logger);
          this.clientUser = new ClientUser();
          this.storageManager = new StorageManager(this);
        } else {
          this.logger.info(this, "StreamConfig has been overwritten, dispatching streamConfigChanged!");
          this.streamConfig = streamConfig;
          this.config = new ConfigManager(copiedStreamConfig);
          this.config.print(this.logger);
          this.dispatchEvent("streamConfigChange", {
            ref: this,
            newConfig: this.streamConfig
          });
        }
      }
      play() {
        return this.playbackController.playCommand();
      }
      pause() {
        return this.playbackController.pauseCommand();
      }
      stop() {
        return this.playbackController.stopCommand();
      }
      restart() {
        return this.playbackController.restart();
      }
      togglePlay() {
        return this.playbackController.togglePlay();
      }
      seek(newPoint) {
        return false;
      }
      isPlaying() {
        return this.playbackController.isPlaying();
      }
      getPlaybackState() {
        return this.playbackController.getPlaybackState();
      }
      getStreamState() {
        return this.playbackController.getStreamState();
      }
      mute() {
        return this.playbackController.mute();
      }
      unmute() {
        return this.playbackController.unmute();
      }
      isMute() {
        return this.playbackController.isMute();
      }
      toggleMute() {
        return this.playbackController.toggleMute();
      }
      setVolume(newVolume) {
        return this.playbackController.setVolume(newVolume);
      }
      getVolume() {
        return this.playbackController.getVolume();
      }
      getPlaybackController() {
        return this.playbackController;
      }
      getSourceList() {
        if (this.initialized) {
          return this.config.getStream().getSourceList();
        } else throw new Error("StormLibrary has not been initialized yet");
      }
      removeAllSources() {
        if (this.initialized) {
          this.config.getStream().clearSourceList();
        } else throw new Error("StormLibrary has not been initialized yet");
      }
      getCurrentSourceItem() {
        if (this.initialized) {
          if (this.playbackController.getConnection() != null) {
            return this.playbackController.getConnection().getSourceItem();
          } else return null;
        } else throw new Error("StormLibrary has not been initialized yet");
      }
      addSourceItem(sourceItem, addAndPlay) {
        if (this.initialized) {
          let newItem = this.config.getStream().addSourceStream(sourceItem);
          if (addAndPlay && newItem != null) this.playSource(newItem);
        } else throw new Error("StormLibrary has not been initialized yet");
      }
      playSource(sourceItem) {
        if (this.initialized) {
          if (this.getPlaybackController().getConnection() != null) {
            this.getPlaybackController().setCurrentSource(sourceItem);
            this.getPlaybackController().getConnection().requestPlayback(sourceItem);
          } else throw new Error("StormLibrary has not established a connection with a server");
        } else throw new Error("StormLibrary has not been initialized yet");
      }
      subscribe(streamKey, andPlay) {
        if (this.initialized) {
          if (this.getPlaybackController().getConnection() != null) {
            this.getPlaybackController().pause();
            if (andPlay) this.getPlaybackController().setCommand("play");
            this.getPlaybackController().getConnection().newSubscription(streamKey);
          } else throw new Error("StormLibrary has not established a connection with a server");
        } else throw new Error("StormLibrary has not been initialized yet");
      }
      getAbsoluteStreamTime() {
        return this.playbackController.getAbsoluteStreamTime();
      }
      setSize(width, height) {
        if (this.initialized) {
          if (this.videoContainer !== null) this.videoContainer.setSize(width, height);
        } else throw new Error("StormLibrary has not been initialized yet");
      }
      setWidth(width) {
        if (this.initialized) {
          if (this.videoContainer !== null) this.videoContainer.setWidth(width);
        } else throw new Error("StormLibrary has not been initialized yet");
      }
      setHeight(height) {
        if (this.initialized) {
          if (this.videoContainer !== null) this.videoContainer.setHeight(height);
        } else throw new Error("StormLibrary has not been initialized yet");
      }
      getWidth() {
        return this.videoContainer.getWidth();
      }
      getHeight() {
        return this.videoContainer.getHeight();
      }
      setScalingMode(newMode) {
        if (this.initialized) {
          if (this.videoContainer !== null) this.videoContainer.setScalingMode(newMode);
        } else throw new Error("StormLibrary has not been initialized yet");
      }
      getScalingMode() {
        if (this.initialized) {
          if (this.videoContainer !== null) return this.videoContainer.getScalingMode();
        } else throw new Error("StormLibrary has not been initialized yet");
        return "none";
      }
      enterFullScreen() {
        if (this.videoContainer != null) this.videoContainer.enterFullScreen();
      }
      exitFullScreen() {
        if (this.videoContainer != null) this.videoContainer.exitFullScreen();
      }
      isFullScreenMode() {
        return this.videoContainer.isFullScreenMode();
      }
      getLibraryID() {
        return this.libraryID;
      }
      getStreamConfig() {
        return this.streamConfig;
      }
      getConfigManager() {
        return this.config;
      }
      getLogger() {
        return this.logger;
      }
      getSettingsAsJSON() {
        return JSON.stringify(this.streamConfig);
      }
      getSettings() {
        return this.streamConfig;
      }
      getPlayerProtocolVersion() {
        return this.PLAYER_PROTOCOL_VERSION;
      }
      isInitialized() {
        return this.initialized;
      }
      isConnected() {
        if (this.playbackController != null) {
          if (this.playbackController.getConnection() != null) {
            return this.playbackController.getConnection().isConnectionActive();
          } else return false;
        } else return false;
      }
      isAuthorized() {
        if (this.playbackController != null) {
          if (this.playbackController.getConnection() != null) {
            return this.playbackController.getConnection().getIfAuthorized();
          } else return false;
        } else return false;
      }
      getRole() {
        return "player";
      }
      getVersion() {
        return this.LIBRARY_VERSION;
      }
      getBranch() {
        return this.LIBRARY_BRANCH;
      }
      getStorageManager() {
        return this.storageManager;
      }
      getVideoElement() {
        var _a;
        return (_a = this.videoContainer) === null || _a === void 0 ? void 0 : _a.getVideoObject();
      }
      getVideoContainer() {
        return this.videoContainer;
      }
      getIfUnmuted() {
        return this.wasUnmuted;
      }
      dispatchEvent(eventName, event) {
        super.dispatchEvent(eventName, event);
      }
      destroy() {
        if (this.playbackController != null) this.playbackController.destroy();
        if (this.videoContainer != null) this.videoContainer.destroy();
        this.removeAllEventListeners();
      }
    }
    StormLibrary.NEXT_LIBRARY_ID = 0;

    function create(config) {
      return new StormLibrary(config);
    }

    exports.EventDispatcher = EventDispatcher;
    exports.StormLibrary = StormLibrary;
    exports.create = create;

}));
