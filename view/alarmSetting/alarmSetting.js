angular
    .module('alarmSettingModule', ['ui.bootstrap'])
    .controller('conditionQuery', ['$scope', function($scope) {

    }])
    .controller('resultCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout) {
        // 修改库存
        $scope.editQueryType = function() {
            $scope.$emit('openSerialNumberModal');
        };
    }])
    // 弹出框
    .controller('detailCheckModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 修改库存
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

        $ctrl.toggleAnimation = function() {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
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
