let pbjs = window.pbjs || {};
pbjs.que = pbjs.que || [];

function render(bid) {
  console.log(bid);
  const settings = {
    licenseKey: 'your-license-key',
    width: 640,
    height: 360,
    autoplay: true,
    adOutStreamMutedAutoplay: true,
    ads: true,
    adOutStream: true,
    adsResponse: bid.vastXml,
    skin: 'outstream'
  };
  const elementID = 'rmp';
  const rmp = new RadiantMP(elementID);
  rmp.init(settings);
}

/* Prebid video ad unit */
const videoAdUnit = {
  code: 'rmp',
  renderer: {
    render,
    url: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js'
  },
  mediaTypes: {
    video: {
      context: 'outstream',
      playerSize: [640, 480],
      mimes: ['video/mp4'],
      protocols: [1, 2, 3, 4, 5, 6, 7, 8],
      playbackmethod: [2],
      skip: 1
    }
  },
  bids: [{
    bidder: 'appnexus',
    params: {
      placementId: 13232385
    }
  }]
};

pbjs.que.push(() => {
  pbjs.addAdUnits(videoAdUnit);
  pbjs.requestBids({
    bidsBackHandler: (/*bids*/) => {
      const highestCpmBids = pbjs.getHighestCpmBids('rmp');
      pbjs.renderAd(document, highestCpmBids[0].adId);
    }
  });
});
