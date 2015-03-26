$(function(){
    $.ajax({
        method: "GET",
        cache: false,
        url: "/json/videos.json"
    })
    .success(function(data, textStatus, jqxhr) {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };

        var url = "https://www.youtube.com/embed/" + data.videoIds[getRandomInt(0,data.videoIds.length)];
        $("#videoFrame").attr("src", url);
        $("div.outerContainer").show();

    })
    .error(function(jqxhr, textStatus, errorThrown) {
        console.log("You done fucked up!");
    })
});
