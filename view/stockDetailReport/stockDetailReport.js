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

        // 商品品牌获取接口
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

        // 商品型号获取接口
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

        // 条件查询
        //列表
        httpMethod.queryListData = function(param) {
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

            // 商品品牌模拟数据
            Mock.mock(httpConfig.siteUrl + '/chain/config/offer/q/loadBrand', {
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
            Mock.mock(httpConfig.siteUrl + '/chain/config/offer/q/loadModel', {
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

            // 仓库模拟数据
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryStorages', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'storageId': '@id',
                    'storageName': '@cword(6)'
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
                        'instCode':'@natural',
                        'costPrice|100-1000': 100,
                        'procureInDate':'@date',
                        'storageName':'@cword(8)',
                        'keepTime|1-100':1
                    }]
                },
                'errors': null
            });
        }

        return httpMethod;
    }])
    .controller('conditionQuery', ['$scope', '$timeout', '$log', 'httpMethod', function($scope, $timeout, $log, httpMethod) {

        //获取所有品牌
        httpMethod.loadBrand().then(function(rsp) {
            $scope.brandsList = rsp.data;
        });

        //监听品牌改变获取相应型号
        $scope.brandChanged = function(val){
            if(val === null){
                $scope.modelsList = [];
                $scope.modelCd = '';
                return;
            }

            httpMethod.loadModel({
                brandId: $scope.brandCd
            }).then(function(rsp) {
                $scope.modelsList = rsp.data;
            });
        }

        //获取仓库
        httpMethod.qryStorages().then(function(rsp) {
            $scope.storagesList = rsp.data;
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

        // 确定查询
        $scope.queryFormSubmit = function(currentPage) {
            var param = {
                brandCd: $scope.brandCd || '',
                modelCd: $scope.modelCd || '',
                storageId: $scope.storageId || '',
                curPage: currentPage || 1,
                pageSize: 10
            };

            httpMethod.queryListData(param).then(function(rsp) {
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
