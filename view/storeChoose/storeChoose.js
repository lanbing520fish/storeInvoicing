angular
    .module('storeChooseModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.staffId = '';  
    }])
    .factory('httpMethod', ['$http', '$q', function ($http, $q) {
        var httpConfig = {
            'siteUrl': 'http://127.0.0.1:28088',
            'requestHeader': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'isMock': true // 是否开启测试数据
        },
        httpMethod = {};

        // 根据staffId，获取角色信息
        httpMethod.qryPostRole = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryPostRole',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: $.param(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 根据staffId获取员工归属的省级区域信息
        httpMethod.qryProvinceRegion = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryProvinceRegion',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: $.param(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 管理市级下拉值获取接口
        httpMethod.qryRegion = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryRegion',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: $.param(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 查询门店
        httpMethod.qryChannel = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryChannel',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 店员管理（配置）查询接口
        httpMethod.qryStaffInShop = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryStaffInShop',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: $.param(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        if (httpConfig.isMock) {
            // 根据staffId，获取角色信息
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryRegion', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|+1': [{
                    'POST_ROLE_ID': '',
                    'NAME': '',
                    'POST_ROLE_LEVEL': 12
                },{
                    'POST_ROLE_ID': '',
                    'NAME': '',
                    'POST_ROLE_LEVEL': 13
                }],
                'errors': null
            });

            // 根据staffId获取员工归属的省级区域信息
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryProvinceRegion', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'COMMON_REGION_ID': '@id',
                    'REGION_NAME': '@province'
                },
                'errors': null
            });

            // 管理市级下拉值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryRegion', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'COMMON_REGION_ID': '@id',
                    'REGION_NAME': '@city'
                }],
                'errors': null
            });

            // 查询门店
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryChannel', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'list|4': [{
                        'CHANNEL_ID': '@id',
                        'CHANNEL_NAME': '@cword(4)',
                        'CHANNEL_CLASS': '@cword(4)', 
                        'CHANNEL_NBR': '@id', 
                        'OPERATORS_ID': '@id',
                        'OPERATORS_NAME': '@cword(4)',
                        'OPERATORS_NBR': '@id',
                        'COMMON_REGION_ID': '@id',
                        'REGION_NAME': '@cword(4)',
                        'AREA_LEVEL|+1': [11,12,13,14,15],
                        'STATUS_CD': '@id',
                        'STATUS_NAME': '@cword(4)', 
                    }],
                    'total|10': 10
                },
                'errors': null
            });   
        }

        return httpMethod;
    }])
    // 获取省
    .controller('allQueryCtrl', ['$scope','$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        var param = {
            staffId: _.get($rootScope, 'staffId')
        };
        httpMethod.qryProvinceRegion(param).then(function(rsp) {
            $log.log('获取员工归属的省级区域信息成功.');
            if (rsp.success) {
                $rootScope.COMMON_REGION_ID = rsp.data.COMMON_REGION_ID;
            } else {
                swal("OMG", rsp.msg || "获取员工归属的省级区域信息失败!", "error");
            }
        }, function() {
            $log.log('获取员工归属的省级区域信息失败.');
        });
    }])
    // 获取城市
    .controller('cityCheckCtrl', ['$scope','$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        var param = {
            commonRegionId: _.get($rootScope, 'COMMON_REGION_ID')
        };
        httpMethod.qryRegion(param).then(function(rsp) {
            $log.log('获取城市信息成功.');
            if (rsp.success) {
                $rootScope.areaList = rsp.data;
            } else {
                swal("OMG", rsp.msg || "获取城市信息失败!", "error");
            }
        }, function() {
            $log.log('获取城市信息失败.');
        });
    }])

    //查询门店
    .controller('conditionQueryCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        // 查询结果分页信息
        $scope.curPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalSize = 0; // 总条数
        $scope.maxSize = 5; // 最大展示页数

        $scope.orderQuery = function(curPage) {
            !curPage && $scope.$broadcast('pageChange');
            var param = {
                curPage: curPage || $scope.curPage, // 当前页
                pageSize: $scope.rowNumPerPage, // 每页展示行数, //每页条数
                staffId: _.get($rootScope, 'staffId'),
                commonRegionId: _.get(conditionQueryForm, 'conditionQueryForm.type'),
                channelName: _.get(conditionQueryForm, 'conditionQueryForm.channelName'),
                channelNbr: _.get(conditionQueryForm, 'conditionQueryForm.channelNbr'),
                operatorsName: _.get(conditionQueryForm, 'conditionQueryForm.operatorsName'),
                operatorsNbr: _.get(conditionQueryForm, 'conditionQueryForm.operatorsNbr')
            };
            httpMethod.qryChannel(param).then(function(rsp) {
                $log.log('调用查询门店接口成功.');
                if (rsp.success) {
                    $scope.storeResultList = rsp.data.list;
                    $scope.totalNum = rsp.data.total;
                } else {
                    swal("OMG", rsp.msg || "调用查询门店接口失败!", "error");
                }
            }, function() {
                $log.log('调用查询门店接口失败.');
            });   
        }
    }])
    
    
    .controller('salemanSetupCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        // 店员配置
        $scope.salesmanSetup = function(index) {
            $rootScope.storeManList = $scope.storeResultList[index];
            // parent.angular.element(parent.$('#tabs')).scope().addTab('店员配置', '/storeInvoicing/view/salesmanManage/salesmanManage.html', 'storeManList', JSON.stringify(item));
        };
        
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.maxSize = 10;

        $scope.$on('pageChange', function() {
            $scope.curPage = 1;
        });
        $scope.setPage = function(pageNo) {
            $scope.curPage = pageNo;
        };
        $scope.pageChanged = function() {
            $scope.orderQuery($scope.curPage);
            $log.log('Page changed to: ' + $scope.curPage);
        };
    }])