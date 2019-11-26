/* our app where we run player
   our app variables */
var pbjs;
pbjs = pbjs || {};
pbjs.que = pbjs.que || [];
var debug = false;
if (typeof window.console === 'undefined' || typeof window.console.log === 'undefined' || typeof window.console.dir === 'undefined') {
  debug = false;
}
var videoId = 'video1';

/* Prebid video ad unit
   This is a working example but you must use your own settings/bidders for production
   More docs at https://prebid.org/prebid-video/video-overview.html */
var adUnits = [{
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
      if (debug) {
        window.console.dir(bids);
      }
      // we get the VAST XML from bids adResponse and pass it to our outstream player
      if (bids && bids[videoId] && bids[videoId].bids && bids[videoId].bids[0] && bids[videoId].bids[0].adResponse) {
        var adResponse = bids[videoId].bids[0].adResponse;
        if (adResponse.ad && adResponse.ad.video && typeof adResponse.ad.video.content === 'string') {
          var vastXml = bids[videoId].bids[0].adResponse.ad.video.content;
          if (vastXml !== '') {
            if (debug) {
              window.console.log(vastXml);
            }
            var settings = {
              licenseKey: 'your-license-key',
              width: 640,
              height: 360,
              autoplay: true,
              adOutStreamMutedAutoplay: true,
              ads: true,
              adsResponse: vastXml,
              adOutStream: true,
              skin: 'outstream'
            };
            var elementID = 'rmpPlayer';
            var rmp = new RadiantMP(elementID);
            rmp.init(settings);
          }
        }
      }
    }
  });
});
