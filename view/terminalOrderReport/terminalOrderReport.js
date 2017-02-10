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

        // 条件查询
        httpMethod.qryTerminalInOrderData = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryTerminalInOrderData',
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

            // 终端库存及库存周转分析
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryTerminalInOrderData', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'total|1-100': 10,
                    'list|10': [{
                        'STORAGE_NAME': '@cword(8)',
                        'STAFF_ID': '@id',
                        'SI_ORDER_ID': '@id',
                        'ROW_ID': '',
                        'RK_TIME': '@date("yyyy-MM-dd")',
                        'STAFF_NAME': '@name',
                        'RETAIL_SHOP_NAME': '@cword(10)',
                        'STATUS_NAME': '已完成',
                        'IN_NUM|1000-2000': 1000,
                        'ZD_TIME': '@date("yyyy-MM-dd")'
                    }]
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
                staffId: $scope.staffId,
                storageId: $scope.storageId,
                st_time: $scope.conditionQueryForm.createStartDt ? moment($scope.conditionQueryForm.createStartDt).format('YYYY-MM-DD') : '', //开始时间
                ed_time: $scope.conditionQueryForm.createEndDt ? moment($scope.conditionQueryForm.createEndDt).format('YYYY-MM-DD') : '', //结束时间
                curPage: currentPage || 1,
                pageSize: 10
            };
            httpMethod.qryTerminalInOrderData(param).then(function(rsp) {
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
