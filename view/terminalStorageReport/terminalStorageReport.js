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

            // 操作人获取接口
            httpMethod.qryStaffs = function() {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/chain/report/q/qryStaffs',
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

            // 仓库获取接口
            httpMethod.qryStorages = function() {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/chain/report/q/qryStorages',
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

            // 商品类型获取接口
            httpMethod.loadAllCategory = function() {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/chain/report/q/loadAllCategory',
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

            // 品牌获取接口
            httpMethod.loadBrand = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/chain/report/q/loadBrand',
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

            // 型号获取接口
            httpMethod.loadModel = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/chain/report/q/loadModel',
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
            httpMethod.qryTerminalInCalData = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/chain/report/q/qryTerminalInCalData',
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

            // 合计数据获取接口
            httpMethod.qryTerminalInCalTotal = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/chain/report/q/qryTerminalInCalTotal',
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
                // 操作人模拟数据
                Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryStaffs', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data|5': [{
                        'staffId': '@id',
                        'staffName': '@name'
                    }],
                    'errors': null
                });

                // 仓库模拟数据
                Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryStorages', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data|5': [{
                        'storageId': '@id',
                        'storageName': '@cword(8)'
                    }],
                    'errors': null
                });

                // 商品类型模拟数据
                Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadAllCategory', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data|5': [{
                        'categoryCd': '@id',
                        'categoryName': '@cword(3)'
                    }],
                    'errors': null
                });

                // 品牌模拟数据
                Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadBrand', {
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
                Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadModel', {
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

                // 条件查询
                Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryTerminalInCalData', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data': {
                        'total|1-100': 10,
                        'list|10': [{
                            'STORAGE_NAME': '@cword(8)',
                            'CATEGORY_NAME': '@cword(3)',
                            'PRICE|100-1000': 100,
                            'STAFF_ID': '@id',
                            'OFFER_NAME': '@cword(8)',
                            'OFFER_MODEL_NAME': '@cword(8)',
                            'OFFER_QTY|1-100': 1,
                            'ROW_ID|1-100': 1,
                            'STAFF_NAME': '@cword(3)',
                            'RETAIL_SHOP_NAME': '@cword(8)',
                            'BRAND_NAME': '@cword(3)'
                        }]
                    },
                    'errors': null
                });

                // 合计模拟数据
                Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryTerminalInCalTotal', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data': {
                        'STORAGE_NAME': '-',
                        'STAFF_ID': '-',
                        'OFFER_QTY|1000-2000': 1000,
                        'STAFF_NAME': '-',
                        'RETAIL_SHOP_NAME': '-'
                    },
                    'errors': null
                });
            }

            return httpMethod;
        }])
        .controller('conditionQuery', ['$scope', '$timeout', '$log', 'httpMethod', function($scope, $timeout, $log, httpMethod) {
            httpMethod.qryStaffs().then(function(rsp) {
                $scope.staffsList = rsp.data;
            });

            httpMethod.qryStorages().then(function(rsp) {
                $scope.storagesList = rsp.data;
            });

            httpMethod.loadAllCategory().then(function(rsp) {
                $scope.allCategoryList = rsp.data;
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

            $scope.categoryCd = ''; // 商品类型ID
            $scope.brandCd = ''; // 品牌ID
            $scope.modelCd = ''; // 型号ID
            $scope.$watch('categoryCd', function(cur) {
                if (cur || cur === null) {
                    $scope.brandCd = ''; // 品牌ID
                    $scope.modelCd = ''; // 型号ID

                    var param = {
                        categoryCd: cur
                    };
                    httpMethod.loadBrand(param).then(function(rsp) {
                        $scope.allBrandList = rsp.data;
                    });
                }
            })
            $scope.$watch('brandCd', function(cur) {
                if (cur || cur === null) {
                    $scope.modelCd = ''; // 型号ID

                    var param = {
                        categoryCd: $scope.categoryCd,
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
                    staffId: $scope.staffId,
                    storageId: $scope.storageId,
                    st_time: $scope.conditionQueryForm.createStartDt ? moment($scope.conditionQueryForm.createStartDt).format('YYYY-MM-DD') : '', //开始时间
                    ed_time: $scope.conditionQueryForm.createEndDt ? moment($scope.conditionQueryForm.createEndDt).format('YYYY-MM-DD') : '', //结束时间
                    categoryCd: $scope.categoryCd,
                    brandCd: $scope.brandCd,
                    modelCd: $scope.modelCd,
                    curPage: currentPage || 1,
                    pageSize: 10
                };
                httpMethod.qryTerminalInCalData(param).then(function(rsp) {
                    $scope.qryStockStatisticData = rsp.data.list;
                    $scope.totalNum = rsp.data.total;
                    $log.log('获取查询数据接口响应成功.');
                }, function() {
                    $log.log('获取查询数据接口响应失败.');
                });

                if (!currentPage) {
                    httpMethod.qryTerminalInCalTotal(param).then(function(rsp) {
                        $scope.allTerminalInCalTotal = rsp.data;
                    });
                }
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
