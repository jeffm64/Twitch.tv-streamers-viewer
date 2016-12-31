jQuery(document).ready(function() {

          //variables
          var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "RobotCaleb", "noobs2ninjas", "comster404"];
          var link;
          var logo;
          var brokenLink;

          //for loop for cycling and adding all streamers from the array
          for(let i=0;i<streamers.length;i++){

          //grabs the data for channel information and link
            $.getJSON('https://api.twitch.tv/kraken/channels/' + streamers[i] + '?client_id=ln0oespx4cil6oaw19knl6hlj04gmlw', function(data1) {

              //grabs data for if streamer is online or offline
              $.getJSON('https://api.twitch.tv/kraken/streams/' + streamers[i] + '?client_id=ln0oespx4cil6oaw19knl6hlj04gmlw', function(data2) {
                console.log(data1);


                //variables for data information
                logo = "<img class='stream-img' src='" + data1.logo + "' alt='streamer logo'> ";

                link = "<a class='stream-name' href='" + data1.url + "'>" + data1.name + "</a>";
                
                brokenLink = "<a class='stream-name' href='https://s.codepen.io/FreeCodeCamp/fullpage/undefined'>" + streamers[i] + "</a>";


                //if else statement for creating data for online/offline/account closed
                if(data2.stream === null) {
                  //creates offline stream data
                  $(".streamers-list").append("<li class='streamer-offline'>" + logo + link +"<span class='offline'>Offline</span></li>"); 
                } 
                else {
                  //creates account online stream data
                  $(".streamers-list").prepend("<li class='streamer-online'>" + logo + link +"<span class='online'>online</span><p class='stream-game'>" + data2.stream.game + ": " + data2.stream.channel.status + "</p></li>");
                };
                $(".streamer-closed").appendTo(".streamers-list");
              }); 
              //if the call fails it makes a closed account for the failed name
            }).fail(function(d) {
                //creates account closed stream data
                  $(".streamers-list").append("<li class='streamer-closed'><a class='stream-name' href='https://s.codepen.io/FreeCodeCamp/fullpage/undefined'>" + streamers[i] + "</a><span class='closed'>Account closed</span></li>");
            });
          };
          

        });