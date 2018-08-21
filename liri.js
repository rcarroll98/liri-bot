
require("dotenv").config();

var keys = require("./keys.js");

var fs = require('fs');

var src = fs.readFileSync(__dirname + '/random.txt');

var request = require("request");

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

var inputString = process.argv;

function Spotify(){};

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

function myTweets(){

}
function spotifyThisSong(inputAlt){
    //Artist(s)
    //input must be converted

    var newInput = inputAlt.replace(/ /g, "+")
    request("https://api.spotify.com/v1/search?query" + newInput + "&type=track", function(error, response){

      if (!error && response.statusCode === 200) {

    //The song's name
    console.log("This song's artist is: " + JSON.parse(response.body).tracks.items.album.artists.name)
    //A preview link of the song from Spotify
    console.log("This song's preview is: " + JSON.parse(response.body).tracks.items.preview_url)
    //The album that the song is from
    console.log("This song's album is: " + JSON.parse(response.body).tracks.items.album.name)
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
        console.log("The movie's title is: " + JSON.parse(response.body).imdbTitle)
        console.log("The movie's Country is: " + JSON.parse(response.body).imdbCountry)
        console.log("The movie's language is: " + JSON.parse(response.body).imdbLanguage)
        console.log("The movie's actors is: " + JSON.parse(response.body).imdbActors)
        console.log("The movie's release year is: " + JSON.parse(response.body).imdbYear)

        }
    })
}

function doWhatItSays(){

  var inputAlt = src;
  spotifyThisSong()
};
