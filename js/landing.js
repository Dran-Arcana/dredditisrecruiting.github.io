$(function(){
    var videoRoulette = function() {
        //data
        this.videoManifest = [];
        this.currentVideoIndex = null;
        this.rendering = false;

        //helper methods
        this.getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };
        this.createEmbedUrl = function(youtubeVideoId) {
            return "https://www.youtube.com/embed/" + youtubeVideoId;
        };
        this.loadVideoManifest = function() {
            //construction
            var self = this;
            $.ajax({
                method: "GET",
                cache: false,
                url: "/json/videos.json"
            })
            .success(function(data, textStatus, jqxhr) {

                self.videoManifest = data.videoIds;
                self.nextViewVideo();
            })
            .error(function(jqxhr, textStatus, errorThrown) {
                console.log("You done fucked up!");
            })
        }
        this.nextViewVideo = function() {
            if (this.currentVideoIndex == null) {
                this.currentVideoIndex = 0;
            } else {
                var upperBound = this.videoManifest.length - 1;
                if (this.currentVideoIndex >= upperBound) {
                    this.currentVideoIndex = 0;                    
                } else {
                    this.currentVideoIndex += 1;
                }
            }
            this.setViewVideo(this.createEmbedUrl(this.videoManifest[this.currentVideoIndex]));
        };

        this.previousViewVideo = function() {
          if (this.currentVideoIndex == null) {
            this.currentVideoIndex = 0;
          } else {
              var upperBound = this.videoManifest.length - 1;
              if (this.currentVideoIndex <= 0) {
                  this.currentVideoIndex = upperBound;
              } else {
                  this.currentVideoIndex -= 1;
              }
          }
          this.setViewVideo(this.createEmbedUrl(this.videoManifest[this.currentVideoIndex]));
        };

        this.setViewVideo = function(url) {
            $("#videoFrame").attr("src", url);

            if (!this.rendering) {
                $("div.outerContainer").show();
                this.rendering = true;
            }
        }


        this.loadVideoManifest();
    };

    var roulette = new videoRoulette();
    $("#btnPrevVideo").click(function() {
        roulette.previousViewVideo();
    });
    $("#btnNextVideo").click(function() {
        roulette.nextViewVideo();
    });
});
