//Date.now() / 1000 | 0

var app = angular.module('ChatApp', []);

//app.config();

app.controller('ChatController', ['$scope', function($scope){
	$scope.messages = [];
	$scope.submit = function(){
		io().emit('chat msg', {
			name: $('#name').val(),
			text: $('#msg').val(),
			time: Date.now()
		});
		$('#msg').val('').focus();
		return false;
	}
	io().on('chat msg', function(msg){
		$scope.messages.push(msg);
		$scope.messages.sort(function(a,b){
			if(a.time<b.time)return -1;
			else if(a.time>b.time)return 1;
			return 0;
		});
		$scope.$apply();
	});
}]);
