angular
    .module('sellModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {

        $rootScope.stepNum = 0; // 当前显示的step索引值（Number类型）
        $rootScope.goBack = function(num) { // 返回（num-1）
            $rootScope.stepNum = num - 1;
        };
        $rootScope.forward = function(num) { // 返回（num+1）
            $rootScope.stepNum = num + 1;
        };
    }])
    .controller('resultCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout) {

        // 新增一行
        $scope.addQueryType = function() {
            $scope.$emit('openEditQueryTypeModal');
        }
    }])

    //跳转
    

    // 弹出框
    .controller('addPurchaseModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 新增一行
        $scope.$on('openEditQueryTypeModal', function(d, data) {
            $rootScope.queryTypeResultList = [];
            $ctrl.open(data);
        });

        $ctrl.open = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'new-line-title',
                ariaDescribedBy: 'new-line-body',
                templateUrl: 'addNewLine.html',
                controller: 'addNewLineCtrl',
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
    .controller('addNewLineCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;
        $ctrl.isHidden = true; // 更多查询条件列表是否隐藏
        $ctrl.isFoldBrand = true; // 品牌列表是否折叠
        $ctrl.isFoldModel = true; // 型号列表是否折叠

        // 切换展示
        $ctrl.toggle = function(name) {
            switch (name) {
                case '$ctrl.isHidden':
                    $ctrl.isHidden = !$ctrl.isHidden;
                    break;
                case '$ctrl.isFoldBrand':
                    $ctrl.isFoldBrand = !$ctrl.isFoldBrand;
                    break;
                case '$ctrl.isFoldModel':
                    $ctrl.isFoldModel = !$ctrl.isFoldModel;
                    break;
            }
        }

        $ctrl.ok = function() {
            $scope.$broadcast('submitPowerListModal');
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
