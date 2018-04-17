(function () {

  'use strict';

  /* our app where we run player */
  /* redefines invokeVideoPlayer */
  window.pbApp.invokeVideoPlayer = function (adTagUrl) {
    if (window.pbApp.playerSetup) {
      return;
    }
    window.pbApp.playerSetup = true;
    if (window.pbApp.debug) {
      window.console.log('invokeVideoPlayer with Prebid VAST url = ' + adTagUrl);
    }
    var bitrates = {
      mp4: [
        'https://www.rmp-streaming.com/media/bbb-360p.mp4'
      ]
    };
    var settings = {
      licenseKey: 'your-license-key',
      bitrates: bitrates,
      width: 640,
      height: 360,
      // we enabled ads for our player 
      // note that we requested a winning bid for skippable auto_play_sound_off so player starts muted autoplay
      ads: true,
      autoplay: true,
      muted: true,
      // we use Google IMA in this demo, but you can use rmp-vast as well depending on your requirements
      adParser: 'ima',
      // since we requested a skippable ads we set adDisableCustomPlaybackForIOS10Plus: true to allow rendering of skippable ads on iOS
      adDisableCustomPlaybackForIOS10Plus: true,
      // here is our winner VAST adTagUrl
      adTagUrl: adTagUrl,
      poster: 'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg'
    };
    var elementID = 'rmpPlayer';
    var rmp = new RadiantMP(elementID);
    rmp.init(settings);

  };

  /* in case we already have a winning bid let's use the returned adTagUrl to run player */
  if (window.pbApp.prebidTempTag) {
    window.pbApp.invokeVideoPlayer(window.pbApp.prebidTempTag);
    window.pbApp.prebidTempTag = false;
  }

  /* in case something went wrong (latency, network errors, bid issues ...) and we have no winning bid we still need to run the player  */
  /* this is done after window.pbApp.playerSetupTimeout ms and we use fallbackAdTagUrl as adTagUrl to pass to the player */
  setTimeout(function () {
    if (window.pbApp.playerSetup) {
      return;
    }
    window.pbApp.invokeVideoPlayer(window.pbApp.fallbackAdTagUrl);
  }, window.pbApp.playerSetupTimeout);

})();

