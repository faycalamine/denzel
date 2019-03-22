peuplement_mongo.js:

utulisation unique afin de remplir le bd sur mongodb atlas

mongo_test.js:

fichier principale.
Permet de se connecter au port port 9292 et de lancer les requetes get et post
exemples d'utilsation:
*http://localhost:9292/movies (get)
*http://localhost:9292/movies/populate (get)
*http://localhost:9292/movies/search?limit=1&metascore=2 (get)
*http://localhost:9292/movies/tt0133952 (get)
*http://localhost:9292/movies?date="ff"&review='ff'&id=tt1907668 (post)
