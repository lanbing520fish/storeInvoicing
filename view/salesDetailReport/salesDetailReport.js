angular
    .module('inventoryModule', ['ui.bootstrap'])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://192.168.16.84:8088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        // 品牌获取接口
        httpMethod.loadBrand = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/config/offer/q/loadBrand',
                method: 'POST',
                headers: httpConfig.requestHeader
            }).success(function(data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 型号获取接口
        httpMethod.loadModel = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/config/offer/q/loadModel',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 条件查询
        httpMethod.qryRetailItemStatistic = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryRetailItemStatistic',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        if (httpConfig.isMock) {
            // 品牌模拟数据
            Mock.mock(httpConfig.siteUrl + '/chain/config/offer/q/loadBrand', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'brandCd': '@id',
                    'brandName': '@cword(3)'
                }],
                'errors': null
            });

            // 型号模拟数据
            Mock.mock(httpConfig.siteUrl + '/chain/config/offer/q/loadModel', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'modelCd': '@id',
                    'modelName': '@cword(3)'
                }],
                'errors': null
            });

            // 终端库存及库存周转分析
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryRetailItemStatistic', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'total|1-100': 10,
                    'list|10': [{
                        'shopName': null,
                        'basicInfo': {
                            'offerId': 100000009138,
                            'productId': null,
                            'offerCode': '112905109139',
                            'offerName': '魅族PLUS6',
                            'categoryCd': 1,
                            'categoryName': '手机',
                            'brandCd': 1,
                            'brandName': '魅族',
                            'modelCd': 100002905,
                            'modelName': '魅蓝A型',
                            'offerConfig': '吊打一切',
                            'manageType': '100000',
                            'manageTypeName': null,
                            'ticketUse': 'T',
                            'bizmanId': 74273,
                            'statusCd': '1001',
                            'statusName': null,
                            'remarks': null,
                            'offerQty': 0,
                            'offerMembers': null,
                            'price': null,
                            'priceLess': null,
                            'qtyInstCode': null,
                            'unitCd': '1',
                            'operators': null,
                            'priceRetail': {
                                'priceRetailId': 1000000000009142,
                                'offerId': 100000009138,
                                'retailPrice': 4000,
                                'retailPriceLess': 2500,
                                'version': '2017-01-06 00:00:00',
                                'bizmanId': null
                            },
                            'bizmanName': null,
                            'product': null,
                            'source': null,
                            'sourceName': null,
                            'unifyOfferId': null,
                            'bizman': {
                                'bizmanId': 74273,
                                'bizmanName': '迪信通',
                                'manageStaff': null,
                                'linkNbr': null,
                                'email': null,
                                'identifyType': null,
                                'identifyName': null,
                                'identifyNum': null,
                                'remarks': null,
                                'retailShopName': null,
                                'bizmanCode': null,
                                'operatorsNbr': null,
                                'areaId': null,
                                'statusCd': null,
                                'staffName': null,
                                'parentBizman': null,
                                'regionName': null,
                                'operatorsId': null,
                                'operatorsName': null,
                                'oldBizmanName': null,
                                'commonRegionId': null
                            },
                            'instCodes': null,
                            'instCode': null,
                            'lastPage': 0,
                            'storageId': null,
                            'retailShopName': null,
                            'retailShopId': null,
                            'sincd': 0,
                            'rsLst': null
                        },
                        'offerName': '魅族PLUS6',
                        'manageType': null,
                        'instCode': 'plus6123',
                        'offerQty': 0,
                        'orderType|+1': ['1', '2', '3'],
                        'supplierName': null,
                        'costPrice': 55.0,
                        'salePrice': 4000.0,
                        'amount': null,
                        'saleCost': null,
                        'staffName': '@cname',
                        'r2s': null,
                        'purchaseDate': '@date("yyyy-MM-dd")',
                        'purchaseDateStr': null,
                        'saleDate': '@date("yyyy-MM-dd")',
                        'retailDtChar': null,
                        'saleDateStr': null,
                        'remark': null,
                        'phoneNumber': null,
                        'state': null,
                        'stateName': null,
                        'inStorageDay': 0,
                        'profit': null,
                        'retailOrderId': '12017020973100000010690',
                        'bizmanId': null,
                        'bizmanName': null,
                        'ticketCode': null,
                        'ticketAmount': 0.0,
                        'sellTypeName': null,
                        'retailShopId': null,
                        'custName': '阿斯蒂芬',
                        'custPhone': '18729912342',
                        'payMentNumber': null,
                        'zhiDanStaffName': 'jxc01',
                        'totalAmount': null,
                        'totalSaleCost': null,
                        'totalProfit': null
                    }]
                },
                'errors': null
            });
        }

        return httpMethod;
    }])
    .filter('saleTypeFilter', function() {
        return function(stateValue) {
            switch (stateValue) {
                case '1':
                    return '零售销售';
                    break;
                case '2':
                    return '零售退货';
                    break;
                case '3':
                    return '零售换货';
                    break;
            }
        }
    })
    .controller('conditionQuery', ['$scope', '$timeout', '$log', 'httpMethod', function($scope, $timeout, $log, httpMethod) {
        httpMethod.loadBrand().then(function(rsp) {
            $scope.allBrandList = rsp.data;
        });

        $scope.conditionQueryForm = {
            createStartDt: '', //制单日期开始
            createEndDt: '' //制单日期结束
        };
        // 时间控件
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.conditionQueryForm.createEndDt,
            startingDay: 1,
            showWeeks: false
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.conditionQueryForm.createStartDt,
            // maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };
        $scope.$watch('conditionQueryForm.createStartDt', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
        });
        $scope.$watch('conditionQueryForm.createEndDt', function(newValue) {
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

        //分页
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.brandCd = ''; // 品牌ID
        $scope.modelCd = ''; // 型号ID
        $scope.$watch('brandCd', function(cur) {
            if (cur || cur === null) {
                $scope.modelCd = ''; // 型号ID

                var param = {
                    brandId: cur
                };

                httpMethod.loadModel(param).then(function(rsp) {
                    $scope.allModelList = rsp.data;
                });
            }
        })

        // 确定查询
        $scope.queryFormSubmit = function(currentPage) {
            var param = {
                brandCd: $scope.brandCd,
                modelCd: $scope.modelCd,
                startDate: $scope.conditionQueryForm.createStartDt ? moment($scope.conditionQueryForm.createStartDt).format('YYYY-MM-DD') : '', //开始时间
                endDate: $scope.conditionQueryForm.createEndDt ? moment($scope.conditionQueryForm.createEndDt).format('YYYY-MM-DD') : '', //结束时间
                curPage: currentPage || 1,
                pageSize: 10
            };
            httpMethod.qryRetailItemStatistic(param).then(function(rsp) {
                $scope.qryStockStatisticData = rsp.data.list;
                $scope.totalNum = rsp.data.total;
                $log.log('获取查询数据接口响应成功.');
            }, function() {
                $log.log('获取查询数据接口响应失败.');
            });
        }

        $scope.$on('pageChange', function(event, data) {
            $scope.queryFormSubmit(data);
        })
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            $scope.$emit('pageChange', $scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])
