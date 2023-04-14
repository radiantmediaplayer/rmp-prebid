# rmp-prebid
Implements header bidding for [Radiant Media Player](https://www.radiantmediaplayer.com) through [Prebid.js](https://prebid.org/).

## Header Bidding
Header Bidding (also known as header auctions, parallel bidding, or header bidding) is a technique that involves running SSP and Ad Exchange code directly on page so publishers can receive bids on their inventory that may be unavailable through their primary ad server and exchange.

The returned bids are then passed into the ad server so they can compete with direct demand and the primary ad server's exchange on a level playing field.
More information on the subject can be found [here](https://prebid.org/overview/intro.html) and [here](https://www.adopsinsider.com/header-bidding/header-bidding-step-by-step/).

Before using a specific Prebid bidder, make sure that it supports video ad format.

## Prebid video
In this repository, we will show how to set up Prebid.js with Radiant Media Player to show instream video ads, outstream video ads and ad-scheduling (pre/mid/post roll) with Prebid.js. Code in this repository has been written with Radiant Media Player 9.2.0 and Prebid.js 7.45.0.

### Instream video ads
See `instream.html`.  [A working example can be found here](https://www.radiantmediaplayer.com/docs/latest/gist/rmp-pb/instream.html).

### Outstream video ads (Google IMA SDK)
See `outstream-ima.html`.  [A working example can be found here](https://www.radiantmediaplayer.com/docs/latest/gist/rmp-pb/outstream-ima.html).

### Ad-scheduling
See `instream-schedule.html`.  [A working example can be found here](https://www.radiantmediaplayer.com/docs/latest/gist/rmp-pb/instream-schedule.html).

### Production notes
The above examples are start points to best implement header bidding for Radiant Media Player through Prebid.js. For production usage you will need to:
- configure Radiant Media Player with your settings
- configure Prebid according to your requirements
- use a Prebid.js custom build that only encompasses your target bidders

## License for rmp-prebid
rmp-prebid is released under MIT License

## License for Prebid.js
Prebid.js is released under [Apache License 2.0](https://github.com/prebid/Prebid.js/blob/master/LICENSE)

## License for Radiant Media Player
Radiant Media Player is a commercial HTML5 media player, not covered by the above MIT license. 

Radiant Media Player license can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html). 

You may request a free trial for Radiant Media Player at: [https://www.radiantmediaplayer.com/free-trial.html](https://www.radiantmediaplayer.com/free-trial.html).