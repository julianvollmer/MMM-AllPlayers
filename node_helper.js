"use strict";
var Football = require('football-data-api');
var fball = null;

module.exports = NodeHelper.create({

	socketNotificationReceived: function(notification, payload) {
		
		if(notification === "CONNECTED"){
			console.log(this.name + " received a socket notification: " + notification);
			fball = new Football(payload,this)
		}

		if (notification === "LOG"){
			console.log("LOG_GET_ALL_PLAYERS");
			console.log(JSON.stringify(payload, null, 4));
		}

		if (notification === "GET_ALL_PLAYERS"){
			console.log("GET_ALL_PLAYERS");
			console.log(payload);
		}
	},

    start: function() {        
        this.sendSocketNotification("CONNECTED", "connected");
    },

    update: function () {
    	var self = this;
        self.sendSocketNotification("UPDATEUI", "options");
        self.sendSocketNotification("GET_ALL_PLAYERS", fball.players.getPlayers());
    },

    callbackFromFootballApi: function (argument) {
    	this.update();
    }
});

