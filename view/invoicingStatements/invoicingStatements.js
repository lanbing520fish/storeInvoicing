/*  author:nieyalan */
angular
    .module('invoicingStatementsModule', ['ui.bootstrap', 'directive.btn.query'])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
            'siteUrl': 'http://192.168.16.84:8088',
            'requestHeader': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'isMock': true // 是否开启测试数据
        },
        httpMethod = {};

        // 查询当前登录用户的省级和市级区域ID
        httpMethod.qryCurrentUserProvinceAndCity = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryCurrentUserProvinceAndCity',
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

        // 省份选择值获取接口
        httpMethod.qryProvince = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryProvince',
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

        // 市级选择值获取接口
        httpMethod.qryCity = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryCity',
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

        // 品牌选择值获取接口
        httpMethod.loadBrand = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/loadBrand',
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
        // 机型选择值获取接口
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
        // 渠道类型选择值获取接口
        httpMethod.loadChannelType = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/loadChannelType',
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
        // 自有厅级别选择值获取接口
        httpMethod.loadMyHall = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/loadMyHall',
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
        // 专营店星级选项选择值获取接口
        httpMethod.loadBoutiqueStar = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/loadBoutiqueStar',
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

        //条件查询
        httpMethod.qryProvinceCityInStock = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryProvinceCityInStock',
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

        //导出
        httpMethod.exportProvinceCityInStock = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/exportProvinceCityInStock',
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
            // 查询当前登录用户的省级和市级区域ID
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryCurrentUserProvinceAndCity', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|2': [{
                    // 'PROVINCE_COMMONREGION_VALUE': '@id',
                    // 'PROVINCE_COMMONREGION_TEXT': '@province',
                    // 'CITY_COMMONREGION_VALUE':'@id',
                    // 'CITY_COMMONREGION_TEXT':'@city',
                }],
                'errors': null
            });

            // 省份选择值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryProvince', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'commonRegionId': '@id',
                    'commonRegionName': '@province'
                }],
                'errors': null
            });

            // 市级选择值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryCity', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'commonRegionId': '@id',
                    'commonRegionName': '@city'
                }],
                'errors': null
            });

            // 品牌选择值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadBrand', {
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
            // 型号选择值获取接口
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
            // 渠道类型选择值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadChannelType', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'channelTypeId': '@id',
                    'channelTypeName': '@cword(6)'
                }],
                'errors': null
            });
            // 自有厅级别选择值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadMyHall', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'hallLevelId': '@id',
                    'hallLevelName': '@cword(6)'
                }],
                'errors': null
            });
            // 专营店星级选项选择值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadBoutiqueStar', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'boutiqueStarId': '@id',
                    'boutiqueStarName': '@cword(6)'
                }],
                'errors': null
            });

            // 条件查询
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryProvinceCityInStock', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'total|1-100': 50,
                    'list|10': [{
                        'PROVINCE_NAME': '@province',
                        'CITY_NAME':'@city',
                        'IN_STOCK_COUNT|1-1000': 100,//入库量
                        'IN_STOCK_AMOUNT|1-1000': 100,//入库价值
                        'OUT_STOCK_COUNT|1-1000': 100,//退库量
                        'OUT_STOCK_AMOUNT|1-1000': 100,//退库价值
                        'ALL_SALE_COUNT|1-1000': 100,//总销量
                        'CONTRACT_SALE_COUNT|1-1000': 100,//其中合约销量
                        'TERMINAL_SALE_COUNT|1-1000': 100,//其中裸机销量
                        'ALLOT_IN_COUNT|1-1000': 100,//调拨入库量
                        'ALLOT_IN_AMOUNT|1-1000': 100,//调拨入库价值
                        'ALLOT_OUT_COUNT|1-1000': 100,//调拨出库量
                        'ALLOT_OUT_AMOUNT|1-1000': 100,//调拨出库价值
                        'SALE_OUT_COUNT|1-1000': 100,//退货量
                        'SALE_OUT_AMOUNT|1-1000': 100,//退货价值
                        'NOW_STOCK_COUNT|1-1000': 100,//库存量
                        'NOW_STOCK_AMOUNT|1-1000': 100,//库存价值
                        'ALL_SALE_AMOUNT|1-1000': 100,//收银总金额
                        'CONTRACT_SALE_AMOUNT|1-1000': 100,//其中合约收银金额
                        'TERMINAL_SALE_AMOUNT|1-1000': 100,//其中裸机收银金额
                        'INSTOCK_SALEAMOUNT|1-1000': 100,//入库后的销量
                        'INSTOCK_CONTRACT_SALECOUNT|1-1000': 100,//其中合约销量
                        'INSTOCK_TERMINAL_SALECOUNT|1-1000': 100,//其中裸机销量
                        'RESALE_DIGESTIBILITY|1-1000': 100,//零售消化率
                        'SALE_REGISTRATIONS|1-1000': 100,//销售后的注册量
                        'SALE_REGISTRATIONS_SELF|1-1000': 100,//销售后的注册量（本省）
                        'SALE_REGISTRATIONS_OTHER|1-1000': 100,//销售后的注册量（外省）
                    }]
                },
                'errors': null
            });

            // 导出
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/exportProvinceCityInStock', {
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
    .controller('conditionResult', ['$scope', '$rootScope', 'httpMethod', '$log', '$timeout', function($scope, $rootScope, httpMethod, $log, $timeout) {
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

        //品牌选择值获取接口
        httpMethod.loadBrand().then(function(rsp) {
            if (rsp.success) {
                $scope.allBrandList = rsp.data;
            };
        });
        $scope.$watch('conditionQueryForm.brandCd', function(newValue) {
            $scope.conditionQueryForm.brandCd = newValue;

            var param = {
                'brandId' : newValue
            }
            //机型选择值获取接口
            httpMethod.loadModel(param).then(function(rsp) {
                if (rsp.success) {
                    $scope.allModelList = rsp.data;
                };
            });
        });

        //渠道类型选择值获取接口
        httpMethod.loadChannelType().then(function(rsp) {
            if (rsp.success) {
                $scope.channelTypeList = rsp.data;
            };
        });
        //自有厅级别选择值获取接口
        httpMethod.loadMyHall().then(function(rsp) {
            if (rsp.success) {
                $scope.myHallList = rsp.data;
            };
        });
        //专营店星级选项选择值获取接口
        httpMethod.loadBoutiqueStar().then(function(rsp) {
            if (rsp.success) {
                $scope.boutiqueStarList = rsp.data;
            };
        });

        // 查询结果分页信息
        $scope.curPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数
        $scope.maxSize = 5; // 最大展示页数

        $scope.orderQuery = function(curPage, cb) {
            !curPage && $scope.$broadcast('pageChange');
            var params = {
                provinceId: _.get($rootScope, 'provinceId'),
                cityId: _.get($rootScope, 'cityId'),
                brandCd: _.get($scope, 'conditionQueryForm.brandCd'),
                modelCd: _.get($scope, 'conditionQueryForm.modelCd'),
                brandName: _.get($scope, 'conditionQueryForm.brandName'),
                modelName: _.get($scope, 'conditionQueryForm.modelName'),
                st_time: _.get($scope, 'conditionQueryForm.createStartDt'),
                ed_time: _.get($scope, 'conditionQueryForm.createEndDt'),
                channelTypeId: _.get($scope, 'conditionQueryForm.channelTypeId'),
                hallLevelId: _.get($scope, 'conditionQueryForm.hallLevelId'),
                boutiqueStarId: _.get($scope, 'conditionQueryForm.boutiqueStarId'),
                curPage: curPage || $scope.curPage, // 当前页
                pageSize: $scope.rowNumPerPage // 每页展示行数
            }
            httpMethod.qryProvinceCityInStock(params).then(function(rsp) {
                if (rsp.success) {
                    cb && cb();
                    $scope.resultList = rsp.data.list;
                    $scope.totalNum = rsp.data.total;
                };
            });
        }

        // 导出
        $scope.exportProvinceCityInStock = function() {
            var param = {
                provinceId: _.get($rootScope, 'provinceId'),
                cityId: _.get($rootScope, 'cityId'),
                brandCd: _.get($scope, 'conditionQueryForm.brandCd'),
                modelCd: _.get($scope, 'conditionQueryForm.modelCd'),
                brandName: _.get($scope, 'conditionQueryForm.brandName'),
                modelName: _.get($scope, 'conditionQueryForm.modelName'),
                st_time: _.get($scope, 'conditionQueryForm.createStartDt'),
                ed_time: _.get($scope, 'conditionQueryForm.createEndDt'),
                channelTypeId: _.get($scope, 'conditionQueryForm.channelTypeId'),
                hallLevelId: _.get($scope, 'conditionQueryForm.hallLevelId'),
                boutiqueStarId: _.get($scope, 'conditionQueryForm.boutiqueStarId'),
                curPage: curPage || $scope.curPage, // 当前页
                pageSize: $scope.rowNumPerPage // 每页展示行数
            };

            window.open(httpConfig.siteUrl + '/chain/report/q/exportProvinceCityInStock?param=' + JSON.stringify(param));
        }
    }])
    // 城市
    .controller('cityCheckCtrl', ['$scope', '$rootScope', 'httpMethod', function($scope, $rootScope, httpMethod) {
        $scope.isshowprovinceName = true;
        $scope.isshowcityName = true;
        $scope.visible = false;
        $scope.key = 1;
        $scope.provinceIndex = '';
        $scope.cityIndex = '';
        $scope.provinceName = '';
        $scope.cityName = '';
        $scope.checkedAreaName = '';

        // 查询当前登录用户的省级和市级区域ID
        httpMethod.qryCurrentUserProvinceAndCity().then(function(rsp) {
            if (rsp.success) {
                $scope.provincesAndCities = rsp.data[0];
                if (!$scope.provincesAndCities.PROVINCE_COMMONREGION_VALUE) {
                    httpMethod.qryProvince().then(function(rsp) {
                        if (rsp.success) {
                            $scope.provinces = rsp.data;
                        };
                    });
                } else {
                    $scope.isshowprovinceName = false;
                    $scope.key = 2;
                    $rootScope.provinceId = $scope.provincesAndCities.PROVINCE_COMMONREGION_VALUE;
                    $scope.checkedAreaName = $scope.provinceName = $scope.provincesAndCities.PROVINCE_COMMONREGION_TEXT;
                }
                if (!$scope.provincesAndCities.CITY_COMMONREGION_VALUE) {
                    $rootScope.$watch('provinceId', function(newValue) {
                        if ($rootScope.provinceId) {
                            var param = {
                                provinceId: newValue
                            }
                            httpMethod.qryCity(param).then(function(rsp) {
                                if (rsp.success) {
                                    $scope.citys = rsp.data;
                                };
                            });
                        } else {
                            $scope.citys = [];
                        }
                    })
                } else {
                    $scope.isshowcityName = false;
                    $rootScope.cityId = $scope.provincesAndCities.CITY_COMMONREGION_VALUE;
                    $scope.checkedAreaName = $scope.provincesAndCities.PROVINCE_COMMONREGION_TEXT + ' ' + $scope.provincesAndCities.CITY_COMMONREGION_TEXT;
                }
            };
        });

        $scope.cityCheck = function() {
            $scope.visible = !$scope.visible;
        }
        $scope.clHide = function() {
            $scope.visible = false;
        }
        $scope.handleSelectCity = function(level, index, areaId, areaName) {
            var me = this;
            switch (level) {
                case 'province':
                    $scope.key = 2;
                    $scope.provinceIndex = index;
                    $rootScope.provinceId = areaId;
                    $scope.provinceName = areaName;
                    me.handleSubmitBtn(level);
                    break;
                case 'city':
                    $scope.cityIndex = index;
                    $rootScope.cityId = areaId;
                    $scope.cityName = areaName;
                    me.handleSubmitBtn(level);
                    break;
            }
        };
        $scope.handleSubmitBtn = function(level) {
            var me = this;
            switch (level) {
                case 'province':
                    $scope.checkedAreaName = $scope.provinceName;
                    break;
                case 'city':
                    $scope.checkedAreaName = $scope.provinceName + ' ' + $scope.cityName;
                    $scope.visible = false;
                    break;
            }
        }
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('pageChange', function() {
            $scope.curPage = 1;
        });

        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.curPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.orderQuery($scope.curPage);
            $log.log('Page changed to: ' + $scope.curPage);
        };
    }]);
