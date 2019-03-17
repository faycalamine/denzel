/* eslint-disable no-console, no-process-exit */
const imdb = require('./src/imdb');
var fs = require('fs');
const DENZEL_IMDB_ID = 'nm0000243';
var liste_movies = null;
async function sandbox (actor) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);
    const awesome = movies.filter(movie => movie.metascore >= 77);
    liste_movies = movies;
    //console.log(`🍿 ${movies.length} movies found.`);
    console.log(JSON.stringify(movies, null, 2));
   
    fs.writeFile("./movies.json", JSON.stringify(movies, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`🍿 ${movies.length} movies found.`);
    console.log(`🥇 ${awesome.length} awesome movies found.`);
    console.log(JSON.stringify(awesome, null, 2));
    process.exit(0);
      });

  
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  
}

sandbox(DENZEL_IMDB_ID);
