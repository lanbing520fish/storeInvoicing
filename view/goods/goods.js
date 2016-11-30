angular
    .module('goodsModule', ['ui.bootstrap'])
    .controller('resultCtrl', ['$scope', '$timeout', function($scope, $timeout) {

        // 新增一行
        $scope.addQueryType = function() {
            $scope.$emit('openEditQueryTypeModal');
        };
        // 串号录入
        $scope.editQueryType = function() {
            $scope.$emit('openSerialNumberModal');
        };


    }])
    // 弹出框
    .controller('addAdjustInModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 新增一行
        $scope.$on('openEditQueryTypeModal', function(d, data) {
            $rootScope.queryTypeResultList = [];
            $ctrl.open(data);
        });

        // 串号录入
        $scope.$on('openSerialNumberModal', function(d, data) {
            $ctrl.openSerialNumberModal(data);
        });

        $ctrl.open = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'new-line-title',
                ariaDescribedBy: 'new-line-body1',
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
    .controller('addNewLineCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $scope.$broadcast('submitPowerListModal');
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
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
    .controller('brandListModalCtrl', ['$scope', function($scope) {
        $scope.visible = false;
        $scope.selectedCheck = function() {
            $scope.visible = !$scope.visible;
        };
        $scope.brandsListResult = [{
            type: '热门',
            list: [{
                brand:'苹果'
            },{
                brand:'三星'
            },{
                brand:'华为'
            },{
                brand:'中兴'
            },{
                brand:'魅族'
            },{
                brand:'小米'
            },{
                brand:'联想'
            },{
                brand:'三星'
            },{
                brand:'华为'
            },{
                brand:'中兴'
            },{
                brand:'魅族'
            },{
                brand:'小米'
            },{
                brand:'联想'
            }]
        },{
            type: 'ABCDEFG',
            list: [{
                brand:'苹果'
            }]
        },{
            type: 'HIJKLMN',
            list: [{
                brand:'华为'
            },{
                brand:'魅族'
            },{
                brand:'联想'
            },{
                brand:'诺基亚'
            },{
                brand:'摩托罗拉'
            }]
        },{
            type: 'OPQRST',
            list: [{
                brand:'OPPO'
            },{
                brand:'三星'
            }]
        },{
            type: 'UVWXYZ',
            list: [{
                brand:'中兴'
            },{
                brand:'小米'
            }]
        }];

        $scope.brand = '';
        $scope.selectedbrand = '';

        $scope.hoverIndex = 0; // 鼠标Hover的索引
        $scope.hoverGoods = function(index) {
            $scope.hoverIndex = index;
        }
        $scope.handleSelectBrand = function(brand) {
            $scope.selectedbrand = brand;
            $scope.visible = false;
        };
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
