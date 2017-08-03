// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var friends = require("../data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friends array)
  // ---------------------------------------------------------------------------
  app.post("/api/friends", function(req, res) {
  // This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    var greatMatch = {
      name: "",
      image: "",
      matchDifference: 1000
    };
    var userData = req.body;
    var userName = userData.name;
    var userImage = userData.image;
    var userScores = userData.scores;

    var totalDifference = 0;

    //loop through the friends data array of objects to get each friends scores
    for(var i = 0; i < [friends].length-1; i++){
      console.log(friends[i].name);
      totalDifference = 0;

      //loop through that friends score and the users score and calculate the 
      // absolute difference between the two and push that to the total difference variable set above
      for(var j = 0; j < 10; j++){
        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= greatMatch.friendDifference){
          // Reset the bestMatch to be the new friend. 
          greatMatch.name = friends[i].name;
          greatMatch.photo = friends[i].photo;
          greatMatch.matchDifference = totalDifference;
        }
      }
    }

    friends.push(userData);
 
    res.json(greatMatch);
  });
  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!
  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friends = [];
    console.log(friends);
  });
};