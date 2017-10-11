var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var channelsObjects = channels.map(function(channel){
  var url = 'https://wind-bow.glitch.me/twitch-api/streams/' + channel;
  var online = false;
  $.ajax({
    async: false,
    url: url,
    success: function(data){
      if (data.stream){
        online = true;
      }
    }
  });
  return {
    channelName: channel,
    isOnline: online,
    symbol: online ? '<h4><i class="fa fa-check-circle"></i></h4>' : '<h4><i class="fa fa-times-circle"></i></h4>',
    show: ko.observable(false)
  }
});

function twitchModelView(){
  var that = this;
  that.selectedChannels = ko.observableArray(channelsObjects);
  that.streamURL = ko.observable('');

  // toggle on click of hamburger icon
  that.toggleSideBar = function(){

    function a(){

      $('.embedded-video').css({
        'visibility': 'hidden',
        'width': '0%',
        'height': '0%'
      });

      $('.side-bar').animate({
        width: "100%",
        height: "100vh"
      }, "fast");

      window.setTimeout(function(){
        $('.fa-bars').one('click', b);
      }, 1000);

    }

    function b(){

      $('.side-bar').animate({
        width: "0%",
        height: "0%"
      }, "fast");

      window.setTimeout(function(){
        $('.embedded-video').css({
          visibility: "visible",
          width: "100%",
          height: "100vh"
        }, "slow");
      }, 400);

      $('.fa-bars').one('click', a);

    }

    $('.fa-bars').unbind().one('click', a());

  }

  // all
  that.showAll = function(){
    that.selectedChannels(that.selectedChannels().map(function(channel){
      channel.show(true);
      return channel;
    }));
  }

  // offline
  that.showOffline = function(){
    that.selectedChannels(that.selectedChannels().map(function(channel){
      if (!channel.isOnline) {
        channel.show(true);
      } else {
        channel.show(false);
      }
      return channel;
    }));
  }

  // online
  that.showOnline = function(){
    that.selectedChannels(that.selectedChannels().map(function(channel){
      if (!channel.isOnline) {
        channel.show(false);
      } else {
        channel.show(true);
      }
      return channel;
    }));
  }

  that.showStream = function(channel){
    var channelName = channel.channelName;
    var twitchStreamURL = 'https://player.twitch.tv/?channel=' + channelName;

    if (channel.isOnline){
      that.streamURL(twitchStreamURL);
      alert("Now streaming... " + channelName);
    } else {
      that.streamURL('https://giphy.com/embed/14uQ3cOFteDaU');
    }

  }

}
ko.applyBindings(new twitchModelView());

$(document).ready(function(){
  $('.btn-primary').trigger('click');
});
