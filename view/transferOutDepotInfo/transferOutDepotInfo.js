angular
    .module('transferOutDepotInfoModule', ['ui.bootstrap'])
    .controller('resultCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout) {
        // 串码信息
        $scope.editQueryType = function() {
            $scope.$emit('openSerialNumberModal');
        };

    }])
    // 弹出框
    .controller('detailPurchaseModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 串码信息
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
    .controller('serialNumberModalCtrl', function($uibModalInstance, $scope, $log, items) {
        var $ctrl = this;

        $scope.serialNubList = ['10010', '10011', '10012', '10013', '10014', '10015', '10010', '10011', '10012', '10013', '10014', '10015', '10016', '10011', '10012', '10013', '10014', '10015', '10010', '10011', '10012', '10013', '10014', '10015', '10020', '10011', '10012', '10013', '10014', '10015', '10010', '10011', '10012', '10013', '10014', '10015', '10030', '10011', '10012', '10013', '10014', '10015', '10010', '10011', '10012', '10013', '10014', '10015', '10040', '10051', '10012', '10013', '10014', '10015', '10010', '10011', '10012', '10013', '10014', '10019', '10010', '10011', '10012', '10013', '10014', '10015', '10010', '10011', '10012', '10013', '10014', '10015', '10016', '10011', '10012', '10013', '10014', '10015', '10010', '10011', '10012', '10013', '10014', '10015', '10020', '10011', '10012', '10013', '10014', '10015', '10010', '10011', '10012', '10013', '10014', '10015', '10030', '10011', '10012', '10013', '10014', '10015', '10010', '10011', '10012', '10013', '10014', '10015', '10040', '10051', '10012', '10013', '10014', '10015', '10010', '10011', '10012', '10013', '10014', '10019']; // 总列表
        $scope.totalNum = $scope.serialNubList.length; // 总条数
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 30; // 每页显示行数
        $scope.serialNubListChunk = _.chunk($scope.serialNubList, $scope.rowNumPerPage);
        $scope.serialNubShow = $scope.serialNubListChunk[0]; // 当前页待显示列表
        $scope.maxSize = 5; // 最大显示分页条数
        $scope.pageChanged = function() {
            $scope.serialNubShow = $scope.serialNubListChunk[$scope.currentPage - 1];
        };

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
