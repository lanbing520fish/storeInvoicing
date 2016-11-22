angular
    .module('stockCheckModule', ['ui.bootstrap'])
    .controller('resultListCtrl', ['$scope', function($scope) {
         // 详情
        $scope.stockCheckDetail = function(index, item) {
            var obj = _.clone(item);
            _.set(obj, '$$hashKey', null);
            $scope.$emit('openSerialNumberModal', index, obj);
        }
    }])
     // 弹出框
    .controller('stockCheckModuleCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        $scope.$on('openSerialNumberModal', function(d, index, item) {
            $ctrl.openSerialNumberModal(index, item);
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
