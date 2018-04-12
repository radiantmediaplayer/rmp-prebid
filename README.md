# rmp-prebid
Implements header bidding for Radiant Media Player through [Prebid.js](https://github.com/prebid/Prebid.js/).

## Header Bidding
Header Bidding (also known as header auctions, parallel bidding, or header bidding) is a technique that involves running SSP & Ad Exchange code directly on page so publishers can receive bids on their inventory that may be unavailable through their primary ad server and exchange.

The returned bids are then passed into the ad server so they can compete with direct demand and the primary ad server’s exchange on a level playing field.
More information on the subject can be found [here](http://prebid.org/overview/intro.html) and [here](http://www.adopsinsider.com/header-bidding/header-bidding-step-by-step/)

## Prebid video
In this repository, we will show how to set up Prebid to show a video ad from DFP. We will use Radiant Media Player and the AppNexus AST bidder, but the principles are the same across video-enabled bidders. Examples will focus on instream video ads. Other set-up, like with outstream video ads are possible but not covered here, though indications provided should help fit your custom requirements. Code is commented at key points for a better understanding of how Prebid.js can work with Radiant Media Player.

### Prebid.js with Radiant Media Player: client-side adapter
See `client-side-adapter.html`. A working example can be found [here](https://www.radiantmediaplayer.com/docs/latest/gist/rmp-prebid/)

### Prebid.js with Radiant Media Player: Prebid Server
[Prebid Server](https://github.com/prebid/prebid-server) is a server side component to offload prebid processing to the cloud. More information can be found [here](http://prebid.org/dev-docs/get-started-with-prebid-server.html). Using Prebid Server with Radiant Media Player can be achieved by using a specific Prebid Server config. See `prebid-server.html`.

## License 
rmp-prebid examples are released under MIT License

Prebid.js is released under Apache License 2.0

Radiant Media Player is a commercial HTML5 video player and has its own license which can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html)