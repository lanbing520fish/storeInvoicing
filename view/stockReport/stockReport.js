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

        // 商品类别获取接口
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

        // 商品品牌获取接口
        httpMethod.loadBrand = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/config/report/q/loadBrand',
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

        // 商品型号获取接口
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
        //合计
        httpMethod.qryStockOfferNumTotal = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryStockOfferNumTotal',
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

        //列表
        httpMethod.qryStockOfferStatistic = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryStockOfferStatistic',
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
            // 商品类别模拟数据
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadAllCategory', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'categoryCd': '@id',
                    'categoryName': '@cword(6)'
                }],
                'errors': null
            });

            // 商品品牌模拟数据
            Mock.mock(httpConfig.siteUrl + '/chain/config/report/q/loadBrand', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'brandCd': '@id',
                    'brandName': '@cword(6)'
                }],
                'errors': null
            });

            // 商品型号模拟数据
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadModel', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'modelCd': '@id',
                    'modelName': '@cword(6)'
                }],
                'errors': null
            });


            // 库存统计列表
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryStockOfferStatistic', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'total|1-100': 10,
                    'list|10': [{
                        'basicInfo':{
                            'categoryName': '@cword(6)',
                            'brandName': '@cword(6)',
                            'modelName': '@cword(6)',
                            'offerName': '@cword(6)'
                        },
                        'price|100-1000': 100,
                        'offerNum':1000,
                        'storageName':'@cword(8)'
                    }]
                },
                'errors': null
            });

            // 库存统计合计
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryStockOfferNumTotal', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|1000-5000': 1000,
                'errors': null
            });
        }

        return httpMethod;
    }])
    .controller('conditionQuery', ['$scope', '$timeout', '$log', 'httpMethod', function($scope, $timeout, $log, httpMethod) {
        //获取所有类别
        httpMethod.loadAllCategory().then(function(rsp) {
            $scope.categorysList = rsp.data;
        });

        //监听类别改变获取相应品牌
        $scope.categoryChanged = function(val){
            if(val === null){
                $scope.brandsList = [];
                $scope.modelsList = [];
                $scope.brandCd = '';
                $scope.modelCd = '';
                return;
            }

            httpMethod.loadBrand({
                categoryCd: $scope.categoryCd
            }).then(function(rsp) {
                $scope.brandsList = rsp.data;
            });
        }

        //监听品牌改变获取相应型号
        $scope.brandChanged = function(val){
            if(val === null){
                $scope.modelsList = [];
                $scope.modelCd = '';
                return;
            }

            httpMethod.loadModel({
                categoryCd: $scope.categoryCd,
                brandId: $scope.brandCd
            }).then(function(rsp) {
                $scope.modelsList = rsp.data;
            });
        }

        //分页
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        // 确定查询
        $scope.queryFormSubmit = function(currentPage) {
            var param = {
                categoryCd: $scope.categoryCd || '',
                brandCd: $scope.brandCd || '',
                modelCd: $scope.modelCd || '',
                curPage: currentPage || 1,
                pageSize: 10
            };

            var paramTotal = {
                brandCd: $scope.brandCd || '',
                modelCd: $scope.modelCd || '',
                curPage: currentPage || 1,
                pageSize: 10
            }

            httpMethod.qryStockOfferNumTotal(param).then(function(rsp) {
                $scope.qryStockOfferNumTotal = rsp.data;
                $log.log('获取查询合计接口响应成功.');
            }, function() {
                $log.log('获取查询合计接口响应失败.');
            });

            httpMethod.qryStockOfferStatistic(param).then(function(rsp) {
                $scope.qryStockOfferStatisticData = rsp.data.list;
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
