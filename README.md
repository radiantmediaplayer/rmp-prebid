# rmp-prebid
Implements header bidding for [Radiant Media Player](https://www.radiantmediaplayer.com) through [Prebid.js](https://github.com/prebid/Prebid.js/).

## Header Bidding
Header Bidding (also known as header auctions, parallel bidding, or header bidding) is a technique that involves running SSP & Ad Exchange code directly on page so publishers can receive bids on their inventory that may be unavailable through their primary ad server and exchange.

The returned bids are then passed into the ad server so they can compete with direct demand and the primary ad server's exchange on a level playing field.
More information on the subject can be found [here](https://prebid.org/overview/intro.html) and [here](https://www.adopsinsider.com/header-bidding/header-bidding-step-by-step/).

A list of bidders with video ads support [can be found here](https://prebid.org/dev-docs/bidders.html#bidders-with-video-and-native-demand).

## Prebid video
In this repository, we will show how to set up Prebid with Radiant Media Player to show instream video ads with our client side adapter, using Prebid Server, outstream video ads and our ad-scheduler. Prebid.js for video overview [can be found here](https://prebid.org/prebid-video/video-overview.html).

### client-side adapter
See `instream-client-side.html`.  [A working example can be found here](https://www.radiantmediaplayer.com/docs/latest/gist/rmp-pb/instream-client-side.html).

### Prebid Server
See `instream-prebid-server.html`.  [A working example can be found here](https://www.radiantmediaplayer.com/docs/latest/gist/rmp-pb/instream-prebid-server.html).

### Outstream video ads
See `outstream.html`.  [A working example can be found here](https://www.radiantmediaplayer.com/docs/latest/gist/rmp-pb/outstream.html).

### Ad-scheduling
See `ad-scheduling-client-side.html`.  [A working example can be found here](https://www.radiantmediaplayer.com/docs/latest/gist/rmp-pb/ad-scheduling-client-side.html).

### Production notes
The above examples are start points to best implement header bidding for Radiant Media Player through Prebid.js. For production usage you will need to:
- configure Radiant Media Player with your settings
- configure prebid according to your requirements and ad-server
- use a prebid.js custom build that only encompasses your target bidders

## License for rmp-prebid
rmp-prebid is released under MIT License

## License for Prebid.js
Prebid.js is released under [Apache License 2.0](https://github.com/prebid/Prebid.js/blob/master/LICENSE)

## License for Radiant Media Player
Radiant Media Player is a commercial HTML5 media player, not covered by the above MIT license. 

Radiant Media Player license can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html). 

You may request a free trial for Radiant Media Player at: [https://www.radiantmediaplayer.com/free-trial.html](https://www.radiantmediaplayer.com/free-trial.html).