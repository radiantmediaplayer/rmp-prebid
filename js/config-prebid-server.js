/* do not wrap this in a self-executing or deferred function - it messes with prebid.js */

/* essentially this is the same logic as with config-client-side-adapter.js but the config changes to enable Prebid server */

/* our app variables */
window.pbApp = {};
window.pbApp.playerSetup = false;
window.pbApp.prebidTempTag = false;
window.pbApp.debug = false;
/* in case pre-bidding takes too long or fails we provide a playerSetupTimeout and fallbackAdTagUrl to insure player setup happens */
window.pbApp.playerSetupTimeout = 5000;
window.pbApp.fallbackAdTagUrl = 'https://www.radiantmediaplayer.com/vast/tags/inline-linear.xml';
/* no console - no logs */
if (typeof window.console === 'undefined' || typeof window.console.log === 'undefined') {
  window.pbApp.debug = false;
}


/* invokeVideoPlayer may not be defined when bidsBackHandler runs */
/* we pre-defined it here so as to capture the returned adTagUrl to be passed to the player */
window.pbApp.invokeVideoPlayer = function (adTagUrl) {
  window.pbApp.prebidTempTag = adTagUrl;
};

/* prebid.js variables */
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];


/* Prebid video ad unit */
/* The accountId below is not active - you will need to use your own config to make it work */
/* More docs at http://prebid.org/dev-docs/show-video-with-a-dfp-video-tag.html */
var videoAdUnit = {
  code: 'video1',
  sizes: [640, 480],
  mediaTypes: {
    video: {
      context: 'instream',
      mimes: ['video/mp4'],
      protocols: [1, 2, 3, 4, 5, 6],
      playbackmethod: [2]
    }
  },
  bids: [
    {
      bidder: 'appnexus',
      params: {
        placementId: '9333431', // Add your own placement id here.
        video: {
          skippable: true,
          playback_method: ['auto_play_sound_off']
        }
      }
    }
  ]
};

pbjs.que.push(function () {

  // configure prebid to use prebid cache and prebid server
  // make sure to add your own accountId to your s2sConfig object
  pbjs.setConfig({
    cache: {
      url: 'https://prebid.adnxs.com/pbc/v1/cache'
    },
    debug: true,
    s2sConfig: {
      endpoint: 'http://prebid.adnxs.com/pbs/v1/auction',
      accountId: 'c9d412ee-3cc6-4b66-9326-9f49d528f13e', // replace this with your account id
      enabled: true,
      bidders: ['appnexus'],
      timeout: 1000,
      secure: 0
    }
  });

  pbjs.addAdUnits(videoAdUnit); // add your ad units to the bid request

  pbjs.requestBids({
    bidsBackHandler: function (bids) {
      if (window.pbApp.debug) {
        window.console.log(bids);
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
      window.pbApp.invokeVideoPlayer(videoUrl);
    }
  });
});

pbjs.bidderSettings =
  {
    standard: {
      adserverTargeting: [
        {
          key: 'hb_bidder',
          val: function (bidResponse) {
            return bidResponse.bidderCode;
          }
        }, {
          key: 'hb_adid',
          val: function (bidResponse) {
            return bidResponse.adId;
          }
        }, {
          key: 'hb_pb',
          val: function () {
            return '10.00';
          }
        }, {
          key: 'hb_size',
          val: function (bidResponse) {
            return bidResponse.size;
          }
        }
      ]
    }
  };