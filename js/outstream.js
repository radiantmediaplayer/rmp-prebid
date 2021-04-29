/* fallback VAST tag in case prebid does not return a winning bid - this is optional */
const fallbackVastTagUrl = 'https://www.radiantmediaplayer.com/vast/tags/inline-linear-1.xml';
let playerHasBeenSetup = false;
/* timeout before we consider a bid invalid and resume player set up with fallbackVastTagUrl */
const timeoutForBidToResolve = 5000;
let bidTimeout = null;

/* function to be called when player needs to be displayed */
const invokeVideoPlayer = function (adTagUrl, xml) {
  clearTimeout(bidTimeout);
  playerHasBeenSetup = true;
  window.console.log('invokeVideoPlayer with Prebid VAST url');
  window.console.log(adTagUrl);
  const settings = {
    licenseKey: 'Kl8lZ292K3N6Mm9pZz9yb201ZGFzaXMzMGRiMEElXyo=',
    width: 640,
    height: 360,
    autoplay: true,
    adOutStreamMutedAutoplay: true,
    ads: true,
    adOutStream: true,
    skin: 'outstream'
  };
  if (xml) {
    settings.adsResponse = adTagUrl;
  } else {
    settings.adTagUrl = adTagUrl;
  }
  const elementID = 'rmpPlayer';
  const rmp = new RadiantMP(elementID);
  rmp.init(settings);
};

if (window.pbjs) {
  const videoId = 'video1';
  /* if we reach timeoutForBidToResolve then we setup player with fallbackVastTagUrl */
  bidTimeout = setTimeout(() => {
    invokeVideoPlayer(fallbackVastTagUrl, false);
  }, timeoutForBidToResolve);
  pbjs.que = pbjs.que || [];
  /* Prebid video ad unit */
  const adUnits = [{
    code: videoId,
    mediaTypes: {
      video: {
        playerSize: [640, 480],
        context: 'outstream'
      }
    },
    bids: [{
      bidder: 'appnexus',
      params: {
        placementId: 13232385,
        video: {
          skippable: true,
          playback_method: ['auto_play_sound_off']
        }
      }
    }]
  }];
  pbjs.que.push(function () {
    pbjs.addAdUnits(adUnits);
    pbjs.requestBids({
      timeout: 1000,
      bidsBackHandler: function (bids) {
        window.console.log('winning bid follows');
        window.console.log(bids);
        // we get the VAST XML from bids adResponse and pass it to our outstream player
        if (bids && bids[videoId] && bids[videoId].bids && bids[videoId].bids[0] && bids[videoId].bids[0].adResponse) {
          const adResponse = bids[videoId].bids[0].adResponse;
          if (adResponse.ad && adResponse.ad.video && typeof adResponse.ad.video.content === 'string') {
            const vastXml = bids[videoId].bids[0].adResponse.ad.video.content;
            if (vastXml !== '') {
              if (!playerHasBeenSetup) {
                invokeVideoPlayer(vastXml, true);
              }
            } else {
              invokeVideoPlayer(fallbackVastTagUrl, false);
            }
          }
        }
      }
    });
  });
} else {
  // fallback in case pbjs is not defined
  invokeVideoPlayer(fallbackVastTagUrl, false);
}
