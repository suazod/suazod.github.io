
var newFriendData = require("../data/friends");


  app.post("/api/friends", function(req, res) {
    for (i = 0; i < newFriendData.length; i++) {
      var newUser == newFriendData[i];
      //need help with this part
      newFriendData.push(req.body);
      res.json(true);
    }
    else {
      //newFriendData.push(req.body);
      res.json(false);
    }
  });
