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
