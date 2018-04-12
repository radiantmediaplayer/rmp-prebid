/* do not wrap this in a self-executing or deferred function - it messes with prebid.js */

/* our app variables */
window.pbApp = {};
window.pbApp.playerSetup = false;
window.pbApp.prebidTempTag = false;
/* in case pre-bidding takes too long or fails we provide a playerSetupTimeout and fallbackAdTagUrl to insure player setup happens */
window.pbApp.playerSetupTimeout = 5000;
window.pbApp.fallbackAdTagUrl = 'https://www.radiantmediaplayer.com/vast/tags/inline-linear.xml';


/* invokeVideoPlayer may not be defined when bidsBackHandler runs */
/* we pre-defined it here so as to capture the returned adTagUrl to be passed to the player */ 
window.pbApp.invokeVideoPlayer = function (adTagUrl) {
  window.pbApp.prebidTempTag = adTagUrl;
};

/* prebid.js variables */
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];


/* Prebid video ad unit */
/* This is a working example but you must use your own settings/bidders for production */
/* More docs at http://prebid.org/dev-docs/show-video-with-a-dfp-video-tag.html */
var videoAdUnit = {
  code: 'video1',
  sizes: [640, 480],
  mediaTypes: {
    video: {
      context: 'instream'
    }
  },
  bids: [
    {
      bidder: 'appnexusAst',
      params: {
        placementId: '9333431',
        video: {
          skippable: true,
          playback_method: ['auto_play_sound_off']
        }
      }
    }
  ]
};

pbjs.que.push(function () {
  pbjs.addAdUnits(videoAdUnit);

  pbjs.setConfig({
    usePrebidCache: true
  });

  pbjs.requestBids({
    bidsBackHandler: function (bids) {
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
          val: function (bidResponse) {
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