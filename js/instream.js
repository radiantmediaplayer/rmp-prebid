/* when Prebid gives us a VAST tag we set up our player */
function invokeVideoPlayer(adTagUrl) {
  console.log('prebid VAST tag: ' + adTagUrl);
  const src = {
    hls: 'https://www.radiantmediaplayer.com/media/v1/avc-mp4/hls/playlist.m3u8'
  };
  const settings = {
    licenseKey: 'your-license-key',
    src: src,
    width: 640,
    height: 360,
    // we enabled ads for our player in muted autoplay mode
    ads: true,
    autoplay: true,
    muted: true,
    // we use Google IMA in this demo, but you can use "rmp-vast" as well depending on your requirements
    adParser: 'ima',
    // here is our winning VAST tag
    adTagUrl: adTagUrl,
    contentMetadata: {
      poster: [
        'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg'
      ]
    }
  };
  const elementID = 'rmp';
  const rmp = new RadiantMP(elementID);
  rmp.init(settings);
}

let pbjs = window.pbjs || {};
pbjs.que = pbjs.que || [];

/* Prebid video ad unit */
const videoAdUnit = {
  code: 'video1',
  mediaTypes: {
    video: {
      context: 'instream',
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
      placementId: 13232361
    }
  }]
};

pbjs.que.push(() => {
  pbjs.addAdUnits(videoAdUnit);

  pbjs.setConfig({
    debug: true,
    cache: {
      url: 'https://prebid.adnxs.com/pbc/v1/cache'
    }
  });

  pbjs.requestBids({
    bidsBackHandler: (/*bids*/) => {
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
      invokeVideoPlayer(videoUrl);
    }
  });
});
