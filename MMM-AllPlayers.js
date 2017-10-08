Module.register("MMM-AllPlayers",{
    defaults: {
        text: "Hello World!",
        lists: "some list",
        width: "100px",
        options : { 
          url: 'http://api.football-data.org/v1/soccerseasons/', 
          headers: {'X-Auth-Token': 'YOUR_TOKEN'},
          shortNameLeague: "BL1",
          shortNameTeam: "HSV",
          nextGamesView: 4,
          lastGamesView: 4,
        },
    },

    socketNotificationReceived: function(notification, payload) {

        if(notification === 'GET_ALL_PLAYERS'){
          this.players = payload;
          this.updateDom(3000); 
        }
    },

    // Override dom generator.
    getDom: function() {
      
        var wrapper = document.createElement("table");
        wrapper.className = "normal small light";
      
        var court = this.getCourtModel();

        if(this.players.length != 0){
          
          for (var i = 0; i < this.players.length; i++) {
            
            this.addToCourt(court, this.players[i]);
          }
        }
        
        this.addCourtToWrapper(court, wrapper);

        return wrapper;
    },

    start: function() {        
        this.players = [];
        this.sendSocketNotification("CONNECTED", this.config.options);
    },

    createTableTdElement: function(id, text, colSpan) {
      var element = document.createElement('td');
      element.id = id;
      element.style.border = '1px solid grey';
      element.colSpan = colSpan;
      element.innerHTML = text;
      return element;
    },

    createTableTrElement: function(id, colSpan) {
      var element = document.createElement('tr');
      element.id = id;
      return element;
    },

    camelCase: function (item) {
      item = item.toLowerCase();
      item = this.cleaner(item, '-');
      item = this.cleaner(item, ' ');
      return item;
    },

    cleaner: function (string, replacement) {
      if(string.indexOf(replacement) != -1){
        var index = string.indexOf(replacement);
        var char = string.charAt(index + 1);
        string = string.substr(0, index) + char.toUpperCase() + string.substr(index + char.length);
        string = string.replace(replacement , '');
        string = string.slice(0, index + 1) + string.slice(index + 2);
      }
      return string;
    },

    addToCourt: function(court, player) {
      for (var key in court) {
        if (court.hasOwnProperty(key)) {
          var val = court[key];
          for(var item in val){
            if(val.hasOwnProperty(item)){
              if(item == this.camelCase(player.position)){
                court[key][item].push(player);
              }
            }
          }
        }
      }
    },

    addCourtToWrapper: function (court, wrapper) {
      for (var key in court) {
        
        if (court.hasOwnProperty(key)) {
          
          var val = court[key];
          var tr = this.createTableTrElement(val + 'Row');
          var tdsAdded = false;
        
          for(var item in val){
            
            if(val.hasOwnProperty(item)){
                
                var text = "";
                var separator = "<br>"
                var colSpan = 4 - Object.keys(val).length;
                var players = court[key][item];

                for (var i = players.length - 1; i >= 0; i--) {
                  tdsAdded = true;
                  if(colSpan == 3){
                    separator = ","
                  }
                  
                  if(i == players.length - 1){
                    text = players[i].name;
                  }
                  
                  else{
                    text += separator + " " + players[i].name;  
                  }
                }
                  
                  tr.appendChild(this.createTableTdElement(item, text, colSpan));
            }
          }
          if(tdsAdded){
            wrapper.appendChild(tr);
          }
        }
      }
    },
    getCourtModel: function (argument) {
      var court = {};

      court.keeperRow = {};
      court.keeperRow.keeper = [];

      court.backRow = {};
      court.backRow.rightBack = [];
      court.backRow.centreBack = [];
      court.backRow.leftBack = [];

      court.defMidRow = {};
      court.defMidRow.defensiveMidfield = [];

      court.centreMidRow = {};
      court.centreMidRow.rightMidfield = [];
      court.centreMidRow.centralMidfield = [];
      court.centreMidRow.leftMidfield = [];

      court.attackMidRow = {};
      court.attackMidRow.attackingMidfield = [];

      court.secForwardRow = {};
      court.secForwardRow.secondaryStriker = [];
      
      court.forwardRow = {};
      court.forwardRow.rightWing = [];
      court.forwardRow.centreForward = [];
      court.forwardRow.leftWing = [];

      return court;
    }
});




