angular
    .module('purchaseModule', ['ui.bootstrap'])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.priceRetailAdjustOrder = {};// 详情  
        $rootScope.retailPriceType = []; // 门店信息
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpMethod = {},
            isMock = true;
        // 查询对应门店信息
        httpMethod.loadShop = function (param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/price/retail/a/loadShop',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: 'param=' + JSON.stringify(param)
            }).success(function (data, header, config, status) {
                if (status != 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        }; 

        // 查询零售调价单
        httpMethod.savePriceRetailAdjustOrder = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/price/retail/a/savePriceRetailAdjustOrder',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: 'body=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status != 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };
        // 详情页查询
        httpMethod.findPriceRetailAdjustOrder = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/price/retail/q/findPriceRetailAdjustOrder',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: 'body=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status != 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };
        if (isMock) {
            // 查询对应门店信息
            Mock.mock('http://192.168.74.17:8088/price/retail/a/loadShop', {
                "data|3": [{
                    "retailShopId": '@id',
                    "retailShopName|+1": ['一店','二店','三店'],
                    "retailShopType": '',
                    "retailShopTypeName": '',
                    "bizmanId": '@id',
                    "bizmanName": '@cname()',
                    "statusCd|1": ['1', '2', '3'],
                    "statusName|+1": ['暂存','已完成','作废']
                }],
            });
            // 查询零售调价单
            Mock.mock('http://192.168.74.17:8088/price/retail/a/savePriceRetailAdjustOrder', {
                "data": {
                    "pageNum": 1,
                    "pageSize": 10,
                    "size": 10,
                    "startRow": 1,
                    "endRow": 10,
                    "total": 23,
                    "pages": 3,
                    "list|10": [{
                            "praOrderId": '@id',
                            "staffId": '@id',
                            "staffName": '@cname()',
                            "retailShopId": '@id',
                            "retailShopName": '@cword(8)',
                            "createDt": '@date',
                            "statusCd|1": ['1', '2', '3'],
                            "statusName": ['暂存','已完成','作废'],
                        }
                    ],
                    "firstPage": 1,
                    "prePage": 0,
                    "nextPage": 2,
                    "lastPage": 3,
                    "isFirstPage": true,
                    "isLastPage": false,
                    "hasPreviousPage": false,
                    "hasNextPage": true,
                    "navigatePages": 8,
                    "navigatepageNums": [1, 2, 3]           
                },
            });
            // 详情查询
            Mock.mock('http://192.168.74.17:8088/price/retail/q/findPriceRetailAdjustOrder', {
                "data": {
                    "praOrderId": '@id',
                    "staffId": '@id',
                    "staffName": '@cname',
                    "retailShopId": '@id',
                    "retailShopName": '@cword(4)',
                    "createDt": '@date',
                    "remarks": '',
                    "priceRetailAdjustItemList|5": [{
                            "praOrderId": '@id',
                            "offerId": '@id',
                            "oldRetailPrice": '@money',
                            "newRetailPrice": '@num',
                            "oldRetailPriceLess": '@num',
                            "newRetailPriceLess": '@num',
                            "offerName": '@cword(6)',
                            "categoryName": '@cword(6)',
                            "brandName": '@cword(6)',
                            "modelName": '@cword(6)',
                            "offerConfig": '@cword(6)'
                        }
                    ],
                    "priceRetailAdjust2ShopList": [{
                            "praOrderId": '零售调价适用门店单据号',
                            "retailShopId": '适用门店ID',
                            "retailShopName": '适用门店名称'
                        }
                    ],
                    "retailShopNames": '@cword(4),@cword(4),@cword(4)'
                },
            });
        }
        return httpMethod;
    }])
    .filter('orderTypeFilter', function() {
        return function(stateValue) {
            switch (stateValue) {
                case '1':
                    return '暂存';
                    break;
                case '2':
                    return '已完成';
                    break;
                case '3':
                    return '作废';
                    break;
            }
        }
    })

    .controller('conditionQuery', ['$scope', '$rootScope', '$log', 'httpMethod', '$timeout', function($scope, $rootScope, $log, httpMethod, $timeout) {
        // 查询结果分页信息
        $scope.curPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数
        $scope.maxSize = 5; // 最大展示页数

        $scope.conditionQueryForm = {
            startDate: '', //制单日期开始
            endDate: '', //制单日期结束
        };
        // 时间控件
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.conditionQueryForm.endTime,
            startingDay: 1,
            showWeeks: false
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.conditionQueryForm.startTime,
            // maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };
        $scope.$watch('conditionQueryForm.startDate', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
        });
        $scope.$watch('conditionQueryForm.endDate', function(newValue) {
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

        // 获取门店信息
        httpMethod.loadShop().then(function (rsp) {
            $log.log('调用门店信息接口成功.');
            $rootScope.retailPriceType = rsp.data;
            $rootScope.statusType = rsp.data;
        }, function () {
            $log.log('调用获取门店接口失败.');
        });

        $scope.orderId = '';
        $scope.orderQuery = function(curPage) {
            !curPage && $scope.$broadcast('pageChange');
            var param = {
                'pageSize': $scope.rowNumPerPage, //每页条数
                'curPage': $scope.curPage, //当前页
                'totalSize': $scope.totalSize,
                'praOrderId': $scope.praOrderId, //订单号码
                'statusCd': '', //门店ID
                'staffName': '', //员工ID
                'retailShopId':'',
                'startDate':'',
                'endDate':''
            }

            // 查询零售调价单
            httpMethod.savePriceRetailAdjustOrder(param).then(function(rsp) {
                $log.log('调用查询零售调价单接口成功.');
                $rootScope.retailPriceResultList = rsp.data.list;

                $scope.totalNum = rsp.data.total;
            }, function() {
                $log.log('调用查询零售调价单接口失败.');
            });
        }

    }])
    .controller('resultListCtrl', ['$scope','$rootScope', '$log', 'httpMethod',function($scope, $rootScope, $log, httpMethod) {
        // 添加
        $scope.addRetailPrice = function(index, item) {
            // parent.angular.element(parent.$('#tabs')).scope().addTab('新零售调价单', '', 'orderCharge', item);
        }
        // 详情
        $scope.retailPriceDetail = function(item) {
            
            var param = item.praOrderId;
            // 查询零售调价单
            httpMethod.findPriceRetailAdjustOrder(param).then(function(rsp) {
                $log.log('调用查询零售调价单接口成功.');
                $rootScope.priceRetailAdjustOrder = rsp.data;
            }, function() {
                $log.log('调用查询零售调价单接口失败.');
            }); 
            $scope.$emit('openSerialNumberModal', item);
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

   