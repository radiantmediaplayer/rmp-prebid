let pbjs = window.pbjs || {};
pbjs.que = pbjs.que || [];

const adScheduleCallback = function () {
  return new Promise(resolve => {
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
          console.log(videoUrl);
          resolve(videoUrl);
        }
      });
    });
  });
};

const src = {
  hls: 'https://www.radiantmediaplayer.com/media/v1/avc-mp4/hls/playlist.m3u8'
};
const settings = {
  licenseKey: 'your-license-key',
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
  adScheduleCallback: adScheduleCallback,
  //adParser: 'rmp-vast',
  // Pass ad schedule
  adSchedule: {
    // Preroll
    preroll: 'callback',
    // Midroll
    midroll: [
      [30, 'callback']
    ],
    // Postroll
    postroll: 'callback'
  },
  contentMetadata: {
    poster: [
      'https://www.radiantmediaplayer.com/images/poster-rmp-showcase.jpg'
    ]
  }
};
const elementID = 'rmp';
const rmp = new RadiantMP(elementID);
rmp.init(settings);
