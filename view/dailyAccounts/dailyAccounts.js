angular
    .module('dailyAccountsModule', ['ui.bootstrap'])
    .run(['$rootScope', function ($rootScope) {  
            $rootScope.isHidden = true; // 禁用提交按钮
    }])
    .controller('dailyAccountsCtrl',['$scope', '$rootScope',function($scope,$rootScope){

        $rootScope.isHidden = true;
        // 切换展示
        $scope.toggle = function() {          
            $rootScope.isHidden = !$rootScope.isHidden;           
        }
    }])

    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });

        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.queryTypeFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);

    
   
   
   