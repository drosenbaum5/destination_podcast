$( document ).ready(function() {

   
    


    // Listen API 

    var topic;
    var minLength;
    var maxLength;

    function displayPods() {

        var podcastDiv = $("<div>").attr("id", "podcast-holder");
        $("#podcast-container").append(podcastDiv);

        //event.preventDefault();

        var key = "2ce331e1a7d34875879ce8fc37eded8f";

        // retrieve topic from input box
        topic = $("#topic").val();
        console.log("topic: " + topic);

        //var minLength = 40;

        //var maxLength = 60;

        var queryURL = "https://listen-api.listennotes.com/api/v2/search?q=" + topic + "&sort_by_date=0&type=episode&offset=0&len_min=" + minLength + "&len_max=" + maxLength + "&genre_ids=68%2C82&published_before=1390190241000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=1";

        $.ajax({
            url: queryURL,
            method: 'GET',
            headers: {
                "X-ListenAPI-Key": key
            }
            }).then(response => {
                
                console.log(response);

                $("#podcast-holder").empty();

                var podArr = response.results;

                for (i=0; i < 9; i++) {

                    //creating a div to hold the podcast info
                    var div = $("<div>");
                    div.addClass("")
                    div.attr("id", "podDiv");

                    // retrieving the thumbnail data
                    var podThumbnail = podArr[i].thumbnail;
                
                    // creating an element to hold the thumbnail
                    var thumb = $("<img>").attr("src", podThumbnail);

                    // Displaying the thumbnail
                    div.append(thumb);

                    // Retrieving the podcast title
                    var podTitle = podArr[i].title_original

                    // Creating an element to hold the title
                    var title = $("<p>").text(podTitle);

                    // Displaying the title
                    div.append(title);

                    // Creating an element to hold the audio
                    var audio = $("<audio controls>");
                    var audioSrc = $("<source>").attr("src", podArr[i].audio);
                    audio.append(audioSrc);
                    
                    // Displaying the audio
                    div.append(audio);

                    // putting the entire div below the previous
                    $("#podcast-holder").append(div);
                    
                }

            });
    }


    // function for displaying the map

    var startLoc;
    var destLoc;

    function displayMap() {

        event.preventDefault();

        startLoc = $("#location").val()

        console.log("start: " + startLoc);

        destLoc = $("#destination").val();

        console.log("dest: " + destLoc);

        L.mapquest.key = 'dvFjIsAPsAlAFFRVAmS01LOQ7lu5cZEl';

        var map = L.mapquest.map('map', {
          center: [40.7128, -74.0059],
          layers: L.mapquest.tileLayer('map'),
          zoom: 13
        });

        L.mapquest.directions().route({
          start: startLoc,
          end: destLoc
        });

    };

    // function for retrieving and displaying time

    function displayTime() {

        event.preventDefault();

        var startLoc = $("#location").val()

        console.log("start: " + startLoc);

        var destLoc = $("#destination").val();

        console.log("dest: " + destLoc);

        var queryURL = "http://www.mapquestapi.com/directions/v2/routematrix?key=dvFjIsAPsAlAFFRVAmS01LOQ7lu5cZEl&ambiguities=ignore&doReverseGeocode=true&outFormat=json&routeType=fastest&locale=de_DE&unit=k&allToAll=false&from=" + startLoc + "&to=" + destLoc 
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(res) {


            console.log(res);

            var timeToLoc = res.time[1];
            console.log("seconds: " + timeToLoc);

            timeInMin = Math.floor(timeToLoc/60);
            console.log("minutes: " + timeInMin);

            $("#time-to-loc").text(timeInMin);

            minLength = timeInMin - 5;
            console.log("minLength: " + minLength);

            maxLength = timeInMin + 5;
            console.log("maxLength: " + maxLength)

        })

    }


    $(document).on("click", "#submit-button", displayPods);
    $(document).on("click", "#submit-button", displayMap);
    $(document).on("click", "#submit-button", displayTime);
    //$(document).on("click", "#submit-button", displayPods);
    $("#submit-button").on("click", function(){
       setTimeout(displayPods, 1000);
    });


    
    $("#submit-button").on("click", function(){

     if ($.trim($("#location").val()) === "" || $.trim($("#destination").val()) === "" || $.trim($("#topic").val()) === "") {
        event.preventDefault();

        var inlocation = $('#location').val();
        //console.log("Starting Location:" +inlocation);
        var indestination = $('#destination').val();
        //console.log("Your Destination:" +indestination);
    
        if ((inlocation == 0) && (indestination == 0))
             {
                 // Starting Location and Destination are blank
                // console.log("MISSING THE LOCATION");
                // console.log("Both missing - Starting Location:" +inlocation);
                // console.log("Both missing - Your Destination:" +indestination);
                 $('audio#pop1')[0].play()
                 //$('#location').val('Location cannot be blank').css('color', 'red');
                // $('#destination').val('Destination cannot be blank').css('color', 'red');
             }
         else
             if ((inlocation == 0) && (indestination !== 0))
                  {
                       // Starting Location is blank and Destination is not
                      // console.log("Just Location missing - Starting Location:" +inlocation);
                       $('audio#pop2')[0].play()
                  //     $('#location').val('Location cannot be blank').css('color', 'red');
                  }
             else
                if ((indestination == 0) && (inlocation !== 0))
                       {
                            //  Destination is blank and Starting Location is not
                           // console.log("MISSING THE DESTINATION");
                            //console.log("Just Dest missing - Your Destination:" +indestination);
                            $('audio#pop3')[0].play()
                           // $('#destination').val('Destination cannot be blank').css('color', 'red');
                        } 
            return false;
            }





           else {
               
            $("#submission-box").hide();
            $("#podcast-card").show();
             event.preventDefault();

           }

    // var inlocation = $('#location').val();
    // //console.log("Starting Location:" +inlocation);
    // var indestination = $('#destination').val();
    // //console.log("Your Destination:" +indestination);

    // if ((inlocation == 0) && (indestination == 0))
    //      {
    //          // Starting Location and Destination are blank
    //         // console.log("MISSING THE LOCATION");
    //         // console.log("Both missing - Starting Location:" +inlocation);
    //         // console.log("Both missing - Your Destination:" +indestination);
    //          $('audio#pop1')[0].play()
    //          //$('#location').val('Location cannot be blank').css('color', 'red');
    //         // $('#destination').val('Destination cannot be blank').css('color', 'red');
    //      }
    //  else
    //      if ((inlocation == 0) && (indestination !== 0))
    //           {
    //                // Starting Location is blank and Destination is not
    //               // console.log("Just Location missing - Starting Location:" +inlocation);
    //                $('audio#pop2')[0].play()
    //           //     $('#location').val('Location cannot be blank').css('color', 'red');
    //           }
    //      else
    //         if ((indestination == 0) && (inlocation !== 0))
    //                {
    //                     //  Destination is blank and Starting Location is not
    //                    // console.log("MISSING THE DESTINATION");
    //                     //console.log("Just Dest missing - Your Destination:" +indestination);
    //                     $('audio#pop3')[0].play()
    //                    // $('#destination').val('Destination cannot be blank').css('color', 'red');
    //                 } 
                //    }
})


try  {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
catch(e) {
        console.error(e);
        //$('.no-browser-support').show();
        //$('.app').hide();
      }


var noteTextareaLoc  = $('#location');
var noteTextareaDest = $('#destination');
var noteTextareaDestPod = $('#topic');
var instructions = $('#recording-instructions');
var notesList = $('ul#notes');

var LocationContent    = '';
var DestinationContent = '';
var DestPodContent     = '';
var loc_counter = 1;
// Get all notes from previous sessions and display them.
//var notes = getAllNotes();
//renderNotes(notes);

/*-----------------------------
Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = true;

// This block is called every time the Speech APi captures a line. 

recognition.onresult = function(event) 
  {
       // event is a SpeechRecognitionEvent object.
       // It holds all the lines we have captured so far. 
       // We only need the current one.

       console.log('Inside recognition.onresult function');

       var current = event.resultIndex;

       // Get a transcript of what was said.
       var transcript = event.results[current][0].transcript;
        
       // Add the current transcript to the contents of our Note.
       // There is a weird bug on mobile, where everything is repeated twice.
       // There is no official solution so far so we have to handle an edge case.
       var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

       //console.log('LocationContent: ' +transcript);

       console.log('Transcript = ' + transcript);
       console.log('mobileReaptBug = ' + mobileRepeatBug);
       console.log('loc_counter: ' + loc_counter);
       
       if(!mobileRepeatBug && loc_counter == 1)
            {
                 LocationContent += transcript;
                 noteTextareaLoc.val(LocationContent);
                 loc_counter ++;
            }
       else
          if (!mobileRepeatBug && loc_counter == 2)
            {
                 DestinationContent += transcript;
                 noteTextareaDest.val(DestinationContent);
                 loc_counter ++;
        }
          else
             if (!mobileRepeatBug && loc_counter == 3)
                 {
                      DestPodContent += transcript;
                      noteTextareaDestPod.val(DestPodContent);
                      loc_counter ++;
                 }
  };

recognition.onstart = function() 
  { 
       console.log("Recognition.onstart function");
       //$("#Destination").focus();
       instructions.text('Voice recognition activated. Try speaking into the microphone.');
  }

recognition.onspeechend = function() 
  {
       instructions.text('You were quiet for a while so voice recognition turned itself off.');
  }

recognition.onerror = function(event) 
  {
       if(event.error == 'no-speech') 
            {
                 instructions.text('No speech was detected. Try again.');  
            }
  }



/*-----------------------------
          start capturing the user's voice input
        ------------------------------*/
        $('#voice-btn').on('click', function(e)
             {console.log('Start record btn pressed');

                  if (LocationContent.length)
                       {
                            LocationContent += ' ';
                       }
                  console.log('starting speech recogniton');
                  recognition.start();
             });

    });


    



