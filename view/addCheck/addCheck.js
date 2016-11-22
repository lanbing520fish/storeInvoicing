angular
    .module('addCheckModule', ['ui.bootstrap'])
    .controller('resultCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout) {
        $scope.arr = ['0', '1'];

        // 串码核对
        $scope.editQueryType = function() {
            $scope.$emit('openSerialNumberModal');
        };

        // 数量核对
        $scope.toggleCheckNum = function(item, chk) {

        }

        // 关闭数量核对
        $scope.close = function() {
            this.isChecked = false;
        }

        // 暂存
        $scope.saveProcureOrder = function() {
            swal({
                title: '操作成功!',
                text: '更新采购入库成功～',
                type: 'success',
                confirmButtonText: '确定'
            }, function() {
                $timeout(function() {
                    // parent.angular.element(parent.$('#tabs')).scope().removeTab();
                });
            });
        }
    }])
    // 弹出框
    .controller('addCheckModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 串码核对
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
