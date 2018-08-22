
require("dotenv").config();

var keys = require("./keys.js");

var fs = require('fs');

var src = fs.readFileSync(__dirname + '/random.txt');

var request = require("request");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

var inputString = process.argv;

function Twitter(){};

//* `my-tweets`

// `spotify-this-song`

//`movie-this`

//`do-what-it-says`

var input = inputString[2];

var inputAlt = inputString[3];

if (input === "my-tweets"){
    myTweets()
}
if (input === "spotify-this-song"){
    spotifyThisSong()
}
if (input === "movie-this"){
    movieThis()
}
if (input === "do-what-it-says"){
    doWhatItSays()
}
if (input === "movieThis" && inputAlt === null ) {
  var inputAlt = "Mr. Nobody"
  movieThis()
}
if (input === "spotifyThisSong" && inputAlt === null) {
  var inputAlt = "The Sign"
}

function myTweets(){
  //My twitter account was not allowed developer access
}
function spotifyThisSong(){



      spotify.search({ type: 'track', query: inputAlt, limit: 1}, function(error, response) {
      //converts the response from an object to a json string, however, json wont parse through this string
      //or the non-stringified object
      var data = JSON.stringify(response)

      console.log(data);

      if (!error && response.statusCode === 200) {
      //parses through the string using json to console log the name of the artist
      console.log(JSON.parse(response.tracks).items.album.artists.name)
      //parses through the string using json to console log the name of the song name
      console.log("This song's artist is: " + JSON.parse(data.tracks).items.name)
      //parses through the string using json to console log the preview link
      console.log("This song's artist is: " + JSON.parse(data.tracks).items.album.artists.preview_url)
      //parses through the string using json to console log the album the song is from
      console.log("This song's artist is: " + JSON.parse(data.tracks).items.album.name)
    }
  })
}
function movieThis(){

    //* Title of the movie.
    //* Year the movie came out.
    //* IMDB Rating of the movie.
    //* Rotten Tomatoes Rating of the movie.
    //* Country where the movie was produced.
    //* Language of the movie.
    //* Plot of the movie.
    //* Actors in the movie.

    request("http://www.omdbapi.com/?t=+" + inputAlt + "&y=&plot=short&apikey=trilogy", function(error, response) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("The movie's rating is: " + JSON.parse(response.body).imdbRating)
        console.log("The movie's title is: " + JSON.parse(response.body).Title)
        console.log("The movie's Country is: " + JSON.parse(response.body).Country)
        console.log("The movie's language is: " + JSON.parse(response.body).Language)
        console.log("The movie's actors is: " + JSON.parse(response.body).Actors)
        console.log("The movie's release year is: " + JSON.parse(response.body).Year)

        }
    })
}

function doWhatItSays(){

  var inputAlt = src;
  spotifyThisSong()
};
