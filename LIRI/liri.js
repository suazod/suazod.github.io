var Twitter = require('twitter');
var twitterKey = require('./keys.js');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var get_tweets = function() {

  var client = new Twitter(twitterKey.twitterKeys);

  var params = {screen_name: 'dan_git'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      //console.log(tweets);//im getting the tweets from my timeline here
      for(var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log('-----');
        console.log(tweets[i].text);
      }
    }
  });

}

var artistNames = function(artist) {
  return artist.name;
}

var spotifyInfo = function(songName) {

  spotify.search({ type: 'track', query: songName }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;
      }
        var songs = data.tracks.items[0];//dive into the object and pull the data you want exactly

        for(var i = 0; i < songs.length; i++) {
          console.log(i);
          console.log('artists: ' + songs[i].artists.map(artistNames));
          console.log('song names ' + songs[i].name);
          console.log('preview songs: ' + songs[i].preview_url);
          console.log('albums ' + songs[i].album.name);
          console.log('~~~~~~~~~')
        }
  });
}

var theMovie = function(movieTitle) {

      request('http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&r=json', function(error, response, body) { if (!error && response.statusCode == 200) {
        var moviesData = JSON.parse(body);//makes it more readable

        console.log('Title: ' + moviesData.Title);
        console.log('Year: ' + moviesData.Year);
        console.log('Rated: ' + moviesData.Rated);
        console.log('Rating: ' + moviesData.Rating);
        console.log('Country; ' + moviesData.Country);
        console.log('Language: ' + moviesData.Language);
        console.log('Plot: ' + moviesData.Plot);
        console.log('Actors: ' + moviesData.Actors);
        console.log('Rotten tomatoes rating: ' + moviesData.tomatoRating);
        console.log('Rotten tomatoes URL: ' + moviesData.tomatoURL);

      }
    })
}

var doThisOther = function () {
fs.readFile('random.txt', 'utf8', function(err, data) {
  if (err) throw err;
  //console.log(data);
  var dataArr = data.split('.');//creates two indexs

  if (dataArr.lenght == 2) {
    choice(dataArr[0], dataArr[1]);
  } else if (dataArr.length == 1) {
    choice(dataArr[0]);
  }
});
}

var choice = function(tweetData, funData) {
  switch(tweetData) {
    case 'my-tweets':
        get_tweets();//run this when user types "my-tweets"
        break;
    case 'spotify-this-song':
        spotifyInfo(funData);//run this when user types "spotify-this-song"
        break;
    case 'movie-this':
        theMovie(funData);//run this when user types "movie-this"
    case 'do-what-it-says':
        doThisOther();//run this when user types "do-what-it-says"
        break;
      default:
      console.log('LIRI does not know what that is')//if user types something different it will not recognize it
  }
}

var doThis = function(argOne, argTwo) {
  choice(argOne, argTwo);//will take arguments from the user and run it through the switch function
};

doThis(process.argv[2], process.argv[3]);//here user puts their inputs
