/**
* draftbuddy Module
*
* Description
*/
var app = angular.module('draftbuddy', []);

app.controller('PlayerController', function($scope, playerService) {
	$scope.showDrafted = true;
	$scope.shouldShow = true;
	$scope.showQBOption = false;

	loadPlayerData();

	$scope.teams = [
		{'name':"adamo", 'players': []}, 
		{'name':"ben", 'players': []}, 
		{'name':"luke", 'players': []}, 
		{'name':"mike", 'players': []}, 
		{'name':"shannon", 'players': []}
	];

	$scope.draft = function(fantasyTeam, player) {
		for (var i=0; i < $scope.teams.length; i++) {
			var team = $scope.teams[i];
			if (team.name == fantasyTeam.name) {
				player.drafted = true
				team.players.push(player);
			}
		}
	};

	$scope.shouldShowDraftedPlayer = function(player) {
		return ($scope.showDrafted == player.drafted || !player.drafted) && player.shouldShow; 
	};

	$scope.showQB = function(showQBOption) {
		for (var j=0; j < this.players.length; j++) {
				var player = this.players[j];
				player.shouldShow = (player.Position == "QB" && showQBOption) || !showQBOption;
			}
	};

	function loadPlayerData() {
		$scope.players = playerService.getAllPlayers();
	};
});

app.factory("playerService", function($http, $q) {
	return({
		getAllPlayers: getAllPlayers,
	});

	function getAllPlayers() {
		//var request = $http({
		//	method: "get",
		//	url: "http://localhost:8080/players"
		//});

		var data = [
			{'ADP': 1.01, 'Overall': 1.2, 'Name': "DeMarco Murray", 'Position': "RB", 'Team': "DAL", 'Times Drafted': 84, 'Bye': 11, 'Watch': true, 'drafted': false, 'shouldShow': true},
			{'ADP': 1.03, 'Overall': 2.7, 'Name': "Peyton Manning", 'Position': "QB", 'Team': "DEN", 'Times Drafted': 41, 'Bye': 4, 'Watch': true, 'drafted': false, 'shouldShow': true},
			{'ADP': 1.03, 'Overall': 3.4, 'Name': "Marshawn Lynch", 'Position': "RB", 'Team': "SEA", 'Times Drafted': 19, 'Bye': 4, 'Watch': true, 'drafted': false, 'shouldShow': true},
			{'ADP': 1.04, 'Overall': 4.1, 'Name': "LeVeon Bell", 'Position': "RB", 'Team': "PIT", 'Times Drafted': 65, 'Bye': 12, 'Watch': true, 'drafted': false, 'shouldShow': true},
			{'ADP': 1.05, 'Overall': 4.9, 'Name': "Jamaal Charles", 'Position': "RB", 'Team': "KC", 'Times Drafted': 67, 'Bye': 6, 'Watch': true, 'drafted': false, 'shouldShow': true},
			{'ADP': 1.05, 'Overall': 5.1, 'Name': "Demaryius Thomas", 'Position': "WR", 'Team': "DEN", 'Times Drafted': 54, 'Bye': 4, 'Watch': true, 'drafted': false, 'shouldShow': true},
		];
		return data;
		//return (request.then(handleSuccess, handleError));
	}

	// I transform the error response, unwrapping the application dta from
	// the API response payload.
    function handleError( response ) {
		// The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (! angular.isObject( response.data ) ||
            ! response.data.message) {

            return( $q.reject( "An unknown error occurred." ) );
        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {

        return( response.data );
    }
});