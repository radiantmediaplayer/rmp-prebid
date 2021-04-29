/* fallback VAST tag in case prebid does not return a winning bid - this is optional */
const fallbackVastTagUrl = 'https://www.radiantmediaplayer.com/vast/tags/inline-linear-1.xml';
let playerHasBeenSetup = false;
/* timeout before we consider a bid invalid and resume player set up with fallbackVastTagUrl */
const timeoutForBidToResolve = 5000;
let bidTimeout = null;

/* function to be called when player needs to be displayed */
const invokeVideoPlayer = function (adTagUrl) {
  clearTimeout(bidTimeout);
  playerHasBeenSetup = true;
  window.console.log('invokeVideoPlayer with Prebid VAST url = ' + adTagUrl);
  const src = {
    mp4: [
      'https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4'
    ]
  };
  const settings = {
    licenseKey: 'Kl8lZ292K3N6Mm9pZz9yb201ZGFzaXMzMGRiMEElXyo=',
    src: src,
    width: 640,
    height: 360,
    // we enabled ads for our player 
    // note that we requested a winning bid for skippable auto_play_sound_off so player starts muted autoplay
    ads: true,
    autoplay: true,
    muted: true,
    // we use Google IMA in this demo, but you can use rmp-vast as well depending on your requirements
    adParser: 'ima',
    // here is our winner VAST adTagUrl
    adTagUrl: adTagUrl,
    contentMetadata: {
      poster: [
        'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg'
      ]
    }
  };
  const elementID = 'rmpPlayer';
  const rmp = new RadiantMP(elementID);
  rmp.init(settings);
};

if (window.pbjs) {
  /* if we reach timeoutForBidToResolve then we setup player with fallbackVastTagUrl */
  bidTimeout = setTimeout(() => {
    invokeVideoPlayer(fallbackVastTagUrl);
  }, timeoutForBidToResolve);
  pbjs.que = pbjs.que || [];
  /* Prebid video ad unit */
  const videoAdUnit = {
    code: 'video1',
    mediaTypes: {
      video: {
        playerSize: [640, 480],
        context: 'instream',
        mimes: ['video/mp4'],
        protocols: [1, 2, 3, 4, 5, 6, 7, 8],
        playbackmethod: [2]
      }
    },
    bids: [{
      bidder: 'appnexus',
      params: {
        placementId: 13232361, // Add your own placement id here.
        video: {
          skippable: true,
          playback_method: ['auto_play_sound_off']
        }
      }
    }]
  };

  pbjs.que.push(() => {
    // configure prebid to use prebid cache and prebid server
    // make sure to add your own accountId to your s2sConfig object
    pbjs.setConfig({
      cache: {
        url: 'https://prebid.adnxs.com/pbc/v1/cache'
      },
      //debug: true,
      enableSendAllBids: true,
      s2sConfig: {
        endpoint: 'https://prebid.adnxs.com/pbs/v1/openrtb2/auction',
        enabled: true,
        accountId: 'c9d412ee-3cc6-4b66-9326-9f49d528f13e',
        bidders: ['appnexus']
      }
    });
    pbjs.addAdUnits(videoAdUnit); // add your ad units to the bid request
    pbjs.requestBids({
      bidsBackHandler: (bids) => {
        window.console.log('winning bid follows');
        window.console.log(bids);
        const videoUrl = pbjs.adServers.dfp.buildVideoUrl({
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
        if (!playerHasBeenSetup) {
          invokeVideoPlayer(videoUrl);
        }
      }
    });
  });
} else {
  // fallback in case pbjs is not defined
  invokeVideoPlayer(fallbackVastTagUrl);
}
