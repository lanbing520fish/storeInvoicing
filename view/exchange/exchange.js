angular
    .module('exchangeModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.checkedGoods = []; // 已选择待退换商品（批量退货）
        $rootScope.checkedGoodsPrice = 0; // 已选择待退换商品总价
        $rootScope.submitGoods = []; // 已确定的退换商品列表
        $rootScope.submitGoodsPrice = 0; // 已确定退换商品总价
        $rootScope.exchangeGoods = []; // 已选择待换购商品列表
        $rootScope.stepNum = 0; // 当前显示的step索引值（Number类型）
        $rootScope.goBack = function(num) { // 返回（num-1）
            $rootScope.stepNum = num - 1;
        };
        $rootScope.forward = function(num) { // 返回（num+1）
            $rootScope.stepNum = num + 1;
        };
    }])
    .filter('priceFilter', function() {
        return function(stateValue) {
            return '¥' + stateValue;
        }
    })
    .filter('priceReturnFilter', function() {
        return function(stateValue) {
            return '-¥' + stateValue + '(换)';
        }
    })
    .controller('addResultCtrl', ['$scope', function($scope) {
        // 新增一行
        $scope.addQueryType = function() {
            $scope.$emit('openEditQueryTypeModal');
        }
    }])
    .controller('resultCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    
        // 原销售单销售商品列表
        $rootScope.queryTypeResultList = [{
            "offerId": "420000199002061851",
            "offerName": "iphone6s",
            "price": "99"
        }, {
            "offerId": "120000199405104317",
            "offerName": "小米电源",
            "price": "123"
        }];

        // TODO 全选
        $scope.checkAll = function(chk) {
            if (chk) {
                $scope.isChecked = true;
                $rootScope.checkedGoods = _.clone($rootScope.queryTypeResultList);
                _.map($rootScope.checkedGoods, function(item, index) {
                    item.$$hashKey = null;
                });
                $rootScope.checkedGoodsPrice = 0; // 置0
                _.map($rootScope.checkedGoods, function(item, index) {
                    $rootScope.checkedGoodsPrice += _.toNumber(item.price);
                });
            } else {
                $scope.isChecked = false;
                $rootScope.checkedGoods = [];
                $rootScope.checkedGoodsPrice = 0; // 置0
            }
        }

        // 单选
        $scope.check = function(val, chk) {
            var valueOfIndex = '';
            $rootScope.checkedGoods.length && $rootScope.checkedGoods.map(function(item, index) {
                if (item.offerId === val.offerId) {
                    valueOfIndex = index;
                }
            });
            chk ? valueOfIndex === '' && $rootScope.checkedGoods.push(val) : $rootScope.checkedGoods.splice(valueOfIndex, 1);

            $rootScope.checkedGoodsPrice = 0; // 置0
            _.map($rootScope.checkedGoods, function(item, index) {
                $rootScope.checkedGoodsPrice += _.toNumber(item.price);
            });
        };

        // 单个退货
        $scope.singleReturn = function(item) {
            $rootScope.submitGoods = [item];
            $rootScope.submitGoodsPrice = 0; // 置0
            $rootScope.submitGoodsPrice = item.price;
            $rootScope.stepNum = 1;
        }

        // 批量退货
        $scope.batchReturn = function() {
            $rootScope.submitGoods = $rootScope.checkedGoods;
            $rootScope.submitGoodsPrice = 0; // 置0
            _.map($rootScope.submitGoods, function(item, index) {
                $rootScope.submitGoodsPrice += _.toNumber(item.price);
            })
            $rootScope.stepNum = 1;
        }
    }])
    // 弹出框
    .controller('addPurchaseModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 新增一行
        $scope.$on('openEditQueryTypeModal', function(d, data) {
            // $rootScope.queryTypeResultList = [];
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
