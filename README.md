# MMM-AllPlayers

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Shows a table with all the players from your favorite team.

## Visualisation

|                    Keeper            |  
|----               |----               |----
| rightBack         | centreBack        | leftBack
|                   | defensiveMidfield |
| rightMidfield     | centralMidfield   | leftMidfield
|                   | attackingMidfield |
|                   | secondaryStriker  |
| rightWing         | centreForward     | leftWing


## Using the module
Install the package football-data-api.
```js
npm install football-data-api
```

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
	        module: 'MMM-AllPlayers',
	        position: 'top_center',  // This can be any of the regions. Best results in left or right regions.
	        header: 'Alle Spieler', // Topic of your modul.
		    config: {
	            options: {
		          headers: {'X-Auth-Token': 'YOUR_TOKEN'},
		          shortNameLeague: "BL1", //Short name of your League.
		          shortNameTeam: "HSV", //Short name of your team. Team must be in the League.
		        },
		    }
		}
    ]
}
```

## Configuration options

| Option                    | Description
|-------------------------- |-----------
| `X-Auth-Token`    		| *Required* You can get it from [here](http://football-data.org/index).
| `shortNameLeague`        	| *Required* Short name of your League
| `shortNameTeam`        	| *Required* Short name of your team. Team must be in the League.






