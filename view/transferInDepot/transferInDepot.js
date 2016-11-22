angular
    .module('transferInDepotModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.stepNum = 0; // 当前显示的step索引值（Number类型）
        $rootScope.goBack = function(num) { // 返回（num-1）
            $rootScope.stepNum = num - 1;
        };
        $rootScope.forward = function(num) { // 返回（num+1）
            $rootScope.stepNum = num + 1;
        };
    }])
    .controller('conditionQuery', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.conditionQueryForm = {
            createStartDt: '', //制单日期开始
            createEndDt: '', //制单日期结束
        };

        // 时间控件
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.conditionQueryForm.createEndDt,
            startingDay: 1
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.conditionQueryForm.createStartDt,
            // maxDate: new Date(),
            startingDay: 1
        };

        $scope.$watch('conditionQueryForm.createStartDt', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
        });
        $scope.$watch('conditionQueryForm.createEndDt', function(newValue) {
            $scope.startDateOptions.maxDate = newValue;
        });

        $scope.startOpen = function() {
            $timeout(function() {
                $scope.startPopupOpened = true;
            });
        };
        $scope.endOpen = function() {
            $timeout(function() {
                $scope.endPopupOpened = true;
            });
        };
        $scope.startPopupOpened = false;
        $scope.endPopupOpened = false;
    }])
    
    .controller('resultCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    
        // 串号录入
        $scope.editQueryType = function() {
            $scope.$emit('openSerialNumberModal');
        };
    }])
    .controller('serisListModalCtrl', ['$scope', function($scope) {
        $scope.serisListResult = [
            {nub: 20161101},
            {nub: 20161102},
            {nub: 20161103},
            {nub: 20161104},
            {nub: 20161105},
            {nub: 20161106},
            {nub: 20161107},
            {nub: 20161108},
            {nub: 20161109},
            {nub: 20161110},
            {nub: 20161111},
            {nub: 20161112},
            {nub: 20161113},
            {nub: 20161114},
            {nub: 20161115},
            {nub: 20161116},
            {nub: 20161117},
            {nub: 20161118},
            {nub: 20161119},
            {nub: 20161120},
            {nub: 20161121},
            {nub: 20161122},
            {nub: 20161123},
            {nub: 20161124},
            {nub: 20161125},
            {nub: 20161126},
            {nub: 20161127},
            {nub: 20161128},
            {nub: 20161129},
            {nub: 20161130}
        ];
    }])
    // 弹出框
    .controller('addPurchaseModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 串号录入
        $scope.$on('openSerialNumberModal', function(d, data) {
            $ctrl.openSerialNumberModal(data);
        });

        $ctrl.openSerialNumberModal = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title',
                ariaDescribedBy: 'serial-number-body',
                templateUrl: 'serialNumberModal.html',
                controller: 'serialNumberModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return data;
                    }
                }
            });
        };
        
    })

    .controller('serialNumberModalCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $scope.$broadcast('submitCardRange');
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })

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
