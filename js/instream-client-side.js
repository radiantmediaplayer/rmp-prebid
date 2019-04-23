/* our app where we run player */
/* redefines invokeVideoPlayer */
/* our app variables */
var pbApp = {};
pbApp.playerSetup = false;
pbApp.prebidTempTag = false;
pbApp.debug = true;
/* in case pre-bidding takes too long or fails we provide a playerSetupTimeout and fallbackAdTagUrl to insure player setup happens */
pbApp.playerSetupTimeout = 5000;
pbApp.fallbackAdTagUrl = 'https://www.radiantmediaplayer.com/vast/tags/inline-linear.xml';
/* no console - no logs */
if (typeof window.console === 'undefined' || typeof window.console.log === 'undefined' || typeof window.console.dir === 'undefined') {
  pbApp.debug = false;
}

/* invokeVideoPlayer may not be defined when bidsBackHandler runs */
/* we pre-defined it here so as to capture the returned adTagUrl to be passed to the player */
pbApp.invokeVideoPlayer = function (adTagUrl) {
  pbApp.prebidTempTag = adTagUrl;
};

/* prebid.js variables */
var pbjs;
pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

/* Prebid video ad unit */
/* This is a working example but you must use your own settings/bidders for production */
/* More docs at https://prebid.org/prebid-video/video-overview.html */
var videoAdUnit = {
  code: 'video1',
  mediaTypes: {
    video: {
      playerSize: [640, 480],
      context: 'instream'
    }
  },
  bids: [{
    bidder: 'appnexus',
    params: {
      placementId: 13232361,
      video: {
        skippable: true,
        playback_method: ['auto_play_sound_off']
      }
    }
  }]
};

pbjs.que.push(function () {
  pbjs.addAdUnits(videoAdUnit);

  pbjs.setConfig({
    debug: true,
    cache: {
      url: 'https://prebid.adnxs.com/pbc/v1/cache'
    }
  });

  pbjs.requestBids({
    bidsBackHandler: function (bids) {
      if (pbApp.debug) {
        window.console.dir(bids);
      }
      var videoUrl = pbjs.adServers.dfp.buildVideoUrl({
        adUnit: videoAdUnit,
        params: {
          iu: '/19968336/prebid_cache_video_adunit',
          cust_params: {
            section: 'blog',
            anotherKey: 'anotherValue'
          },
          output: 'vast'
        }
      });
      pbApp.invokeVideoPlayer(videoUrl);
    }
  });
});

pbApp.invokeVideoPlayer = function (adTagUrl) {
  if (pbApp.playerSetup) {
    return;
  }
  pbApp.playerSetup = true;
  if (pbApp.debug) {
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
    // since we may request a skippable ads we set adDisableCustomPlaybackForIOS10Plus: true to allow rendering of skippable ads on iOS
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
if (pbApp.prebidTempTag) {
  pbApp.invokeVideoPlayer(pbApp.prebidTempTag);
  pbApp.prebidTempTag = false;
}

/* in case something went wrong (latency, network errors, bid issues ...) and we have no winning bid we still need to run the player  */
/* this is done after pbApp.playerSetupTimeout ms and we use fallbackAdTagUrl as adTagUrl to pass to the player */
setTimeout(function () {
  if (pbApp.playerSetup) {
    return;
  }
  pbApp.invokeVideoPlayer(pbApp.fallbackAdTagUrl);
}, pbApp.playerSetupTimeout);