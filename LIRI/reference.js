var Twitter = require('twitter');

var twitterKey = require('./key.js');

var Spotify = require('spotify');

var Request = require('request');

var fs = require("fs");



var operation = process.argv[2];

var input = '';

var logContent = '';



for (var i = 3; i < process.argv.length; i++) {

    input = input + process.argv[i] + ' ';

}

input = input.trim();

console.log('');



if (operation === 'do-what-it-says') {

    fs.readFile("random.txt", "utf8", function(error, data) {

        var dataArr = data.split(",");

        operation = dataArr[0];

        input = dataArr[1].replace(/"/g, '');

        mainOperations(operation, input);

    });

}

mainOperations(operation, input);



function mainOperations(operation, input) {

    //Tweets operation. Display 20 last tweets.

    if (operation === 'my-tweets') {

        var client = new Twitter(twitterKey.twitterKeys);

        var accountName = 'BarackObama';

        var params = {screen_name: accountName};

        client.get('statuses/user_timeline', params, function(error, tweets, response) {

            logContent = '\n@' + accountName + " Tweets: ";

            console.log('@' + accountName + " Tweets: ");

            if (!error) {

                for (var i = 0; i < 20; i++) {

                    console.log(tweets[i].created_at);

                    console.log((i + 1) + ": " + tweets[i].text); console.log('');

                    logContent = logContent + tweets[i].created_at + '\n' + (i+1) + ": " + tweets[i].text + '\n';

                }

            }

            else {

                console.log('Error occured: ' + error)

            }

            logData(logContent);

        });

    }

    //Spotify operation. Display song details - artist, name, link, album.

    if (operation === 'spotify-this-song') {

        if (input === '') {

            input = 'the sign ace of base';

        }

        Spotify.search({type: 'track', query: input}, function(error, data) {

            var pointer = data.tracks.items[0];

            if (error) {

                console.log('Error occurred: ' + error);

                return;

            }

            console.log("Artist: " + pointer.artists[0].name);

            console.log("Song: " + pointer.name);

            console.log("Link: " + pointer.external_urls.spotify);

            console.log("Album: " + pointer.album.name + '\n');

            logContent = "\nArtist: " + pointer.artists[0].name + '\n' + "Song: " + pointer.name + '\n' +

                         "Link: " + pointer.external_urls.spotify + '\n' + "Album: " + pointer.album.name + '\n';

            logData(logContent);

        });

    }



    //Movie operation. Display movie information - title, year, imdbrating, country, language, plot, actors, rotten link

    if (operation === 'movie-this') {

        if (input === '') {

            input = 'mr_nobody';

        }

        Request('http://www.omdbapi.com/?t=' + input, function(error, response, body) {

            var movieData = JSON.parse(body);

            //console.log(movieData);

            console.log("Title: " + movieData.Title);

            console.log("Year: " + movieData.Year);

            console.log("IMDB Rating: " + movieData.imdbRating);

            console.log("Country: " + movieData.Country);

            console.log("Language: " + movieData.Language);

            console.log("Plot: " + movieData.Plot);

            console.log("Actors: " + movieData.Actors);



            input = input.replace(/ /g, '_')

            input = input.replace(/:/g, '')

            console.log("Rotten Tomatoes URL: " + 'https://www.rottentomatoes.com/m/' + input + '\n');



            logContent = "\nTitle: " + movieData.Title + '\n' + "Year: " + movieData.Year + '\n' +

                         "IMDB Rating: " + movieData.imdbRating + '\n' + "Country: " + movieData.Country + '\n' +

                         "Country: " + movieData.Country + '\n' + "Language: " + movieData.Language + '\n' +

                         "Plot: " + movieData.Plot + '\n' + "Actors: " + movieData.Actors + '\n' +

                         "Rotten Tomatoes URL: " + 'https://www.rottentomatoes.com/m/' + input + '\n';

            logData(logContent);

        });

    }





}



function logData(logContent) {

    fs.appendFile('log.txt', logContent, function(err) {

        if (err) {console.log(err);}

        //else {console.log("Content Logged!");}

    });

}
