angular
    .module('refundModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.checkedGoods = []; // 已选择待退换商品
        $rootScope.checkedGoodsPrice = 0; // 已选择待退换商品总价
    }])
    .filter('priceFilter', function() {
        return function(stateValue) {
            return '¥' + stateValue;
        }
    })
    .controller('stepCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.stepNum = 0; // 当前显示的step索引
    }])
    .controller('resultCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        // 原销售单销售商品列表
        $scope.queryTypeResultList = [{
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
            // chk ? $scope.isChecked = true : $scope.isChecked = false;
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
            })
        };
    }])
