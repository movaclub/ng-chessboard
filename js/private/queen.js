'use strict';

(function(){
	var app = angular.module('queen', ['ngSanitize']);

  app.controller('qCtrl', ['$scope', function($scope){
		console.log('qCtrl');
		$scope.cellnum = 4;
		$scope.bw = [];
		$scope.finalhtml = '';
		$scope.$watch('cellnum', function(){
			$scope.finalhtml = "<div class='row-centered'>";
			if(typeof($scope.cellnum) == 'undefined'){$scope.cellnum = 4;}
			let rowcell = 1;
			let totcell = $scope.cellnum * $scope.cellnum;
			let bw = [];
			console.log('total cells: ', totcell);
			// process cells
			for(let i=0; i<totcell; i++){
				if(i%2){
					bw.push("<div class='bsquare col-centered'></div>");
				} else {
					bw.push("<div class='wsquare col-centered'></div>");
				}
			}
			// if the row number is even
			let spliced = [];
			if($scope.cellnum%2==0){
				console.log('even:', $scope.cellnum);
				while(bw.length>0){
					spliced.push(bw.splice(0,$scope.cellnum));
				}
			}
			// process rows
			for( let i=0; i<spliced.length; i++){
				if(i%2){
					bw = bw.concat(spliced[i].reverse());
				} else {
					bw = bw.concat(spliced[i]);
				}
			}
			// place Queens
			let queens = [];
			let step = $scope.cellnum -2;
			for(let i=($scope.cellnum-1); i<=totcell; i+=step){
					console.log('I:', i);
					queens.push(i);

			}
			console.log('queens: ', queens);
// 			
			for(let i=0; i<totcell; i++){
				$scope.finalhtml = $scope.finalhtml + bw[i];
				rowcell += 1;
				if(rowcell == ($scope.cellnum+1) && ( i < (totcell-1) ) ){
					$scope.finalhtml = $scope.finalhtml + "</div><div class='row-centered'>";
					rowcell = 1;
				}
				if(rowcell == ($scope.cellnum+1) && ( i == (totcell-1) ) ){$scope.finalhtml = $scope.finalhtml + "</div>"; rowcell = 1;}
			}
		}, true);
  }]);

})();
