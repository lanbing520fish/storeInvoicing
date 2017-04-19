angular
    .module('inventoryTurnoverReportModule', ['ui.bootstrap'])
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
        
        //条件查询
        httpMethod.qrySaleDetail = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qrySaleDetail',
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
        httpMethod.exportProvinceCitySale = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/exportProvinceCitySale',
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
                'data': {
                    'PROVINCE_COMMONREGION_VALUE': '@id'||'',
                    'PROVINCE_COMMONREGION_TEXT': '@province',
                    'CITY_COMMONREGION_VALUE':'@id'||'',
                    'CITY_COMMONREGION_TEXT':'@city',
                },
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
           
            // 条件查询
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qrySaleDetail', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'total|1-100': 50,
                    'list|10': [{ 
                        'PROVINCE_NAME': '@province',
                        'CITY_NAME':'@city',
                        'NOW_STOCK_COUNT|1-1000': 100,// 库存量
                        'NOW_STOCK_AMOUNT|1-1000': 100,// 库存价值
                        'NOW_STOCK_REGISTER|1-1000': 100,// 库存中自注册注册量
                        'PROVINCE_REGISTER|1-1000': 100,// 其中本省注册量
                        'OTHER_REGISTER|1-1000': 100,// 其中外省注册量
                        'INSTOCK_ONE|1-1000': 100,// 在库时间（天）:0-30
                        'INSTOCK_TWO|1-1000': 100,// 在库时间（天）:31-60
                        'INSTOCK_THREE|1-1000': 100,// 在库时间（天）:61-90
                        'INSTOCK_FOUR|1-1000': 100,// 在库时间（天）:91以上
                        'TURNOVER_DAYS|1-1000': 100,// 库存周转天数                 
                    }]
                },
                'errors': null
            });

            // 导出
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/exportProvinceCitySale', {
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
    .controller('conditionQuery', ['$scope', '$rootScope', 'httpMethod', '$log', '$timeout', function($scope, $rootScope, httpMethod, $log, $timeout) {       
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
        $scope.conditionQueryForm.brandCd = '';
        //品牌选择值获取接口
        httpMethod.loadBrand().then(function(rsp) {
            if (rsp.success) {
                $scope.allBrandList = rsp.data;      
            };
        });    
        $scope.$watch('conditionQueryForm.brandCd', function(newValue) {
            $scope.conditionQueryForm.brandCd = newValue; 

            var param = {
                'brandId' : _.get($scope, 'conditionQueryForm.brandCd')
            }
            //机型选择值获取接口
            httpMethod.loadModel(param).then(function(rsp) {
                if (rsp.success) {
                    $scope.allModelList = rsp.data;
                };
            });  
        });
        
    }])
    .controller('conditionResult', ['$scope', '$rootScope', 'httpMethod', '$log', '$timeout', function($scope, $rootScope, httpMethod, $log, $timeout) {       
        // 查询结果分页信息
        $scope.curPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数
        $scope.maxSize = 5; // 最大展示页数

        $scope.orderQuery = function(curPage) {
            !curPage && $scope.$broadcast('pageChange');
            var params = {
                provinceId : _.get($scope, 'provinceId'),
                cityId: _.get($scope, 'cityId'),
                brandCd: _.get($scope, 'conditionQueryForm.brandCd'),
                modelCd: _.get($scope, 'conditionQueryForm.modelCd'),
                brandName: _.get($scope, 'conditionQueryForm.brandName'),
                modelName: _.get($scope, 'conditionQueryForm.modelName'),
                st_time: _.get($scope, 'conditionQueryForm.createStartDt'),
                ed_time: _.get($scope, 'conditionQueryForm.createEndDt'),
                curPage: curPage || $scope.curPage, // 当前页
                pageSize: $scope.rowNumPerPage // 每页展示行数
            } 
            //查询接口
            httpMethod.qrySaleDetail(params).then(function(rsp) {
                if (rsp.success) {
                    $scope.resultList = rsp.data.list;
                    $scope.totalNum = rsp.data.total;
                };
            });     
        }

        // 导出
        $scope.exportProvinceCityInStock = function() {
            var param = {
                provinceId : _.get($scope, 'provinceId'),
                cityId: _.get($scope, 'cityId'),
                brandCd: _.get($scope, 'conditionQueryForm.brandCd'),
                modelCd: _.get($scope, 'conditionQueryForm.modelCd'),
                brandName: _.get($scope, 'conditionQueryForm.brandName'),
                modelName: _.get($scope, 'conditionQueryForm.modelName'),
                st_time: _.get($scope, 'conditionQueryForm.createStartDt'),
                ed_time: _.get($scope, 'conditionQueryForm.createEndDt'),
                channelTypeId: _.get($scope, 'conditionQueryForm.channelTypeId'),
                hallLevelId: _.get($scope, 'conditionQueryForm.hallLevelId'),
                boutiqueStarId: _.get($scope, 'conditionQueryForm.boutiqueStarId'),
                storageName: _.get($scope, 'conditionQueryForm.storageName'),
                curPage: curPage || $scope.curPage, // 当前页
                pageSize: $scope.rowNumPerPage // 每页展示行数
            };

            window.open(httpConfig.siteUrl + '/chain/report/q/exportProvinceCitySale?param=' + JSON.stringify(param));
        }
    }])
    // 城市
    .controller('cityCheckCtrl', ['$scope', '$rootScope', 'httpMethod',function($scope, $rootScope, httpMethod) { 
        $scope.provincesAndCities = {
            PROVINCE_COMMONREGION_VALUE: '',
            PROVINCE_COMMONREGION_TEXT: '',
            CITY_COMMONREGION_VALUE:'',
            CITY_COMMONREGION_TEXT:''
        }
        // 查询当前登录用户的省级和市级区域ID
        httpMethod.qryCurrentUserProvinceAndCity().then(function(rsp) {
            if (rsp.success) {
                $scope.provincesAndCities = rsp.data;             
                if($scope.provincesAndCities.PROVINCE_COMMONREGION_VALUE === ''){
                    httpMethod.qryProvince().then(function(rsp) {
                        if (rsp.success) {
                            $scope.provinces = rsp.data;
                        };   
                    });   
                }else{
                    $scope.provinces = [{
                        'commonRegionId' : $scope.provincesAndCities.PROVINCE_COMMONREGION_VALUE,
                        'commonRegionName' : $scope.provincesAndCities.PROVINCE_COMMONREGION_TEXT
                    }]
                }
                if($scope.provincesAndCities.CITY_COMMONREGION_VALUE === ''){
                    var param = {
                        'provinceId': _.get($scope, 'provinceId')
                    }
                    httpMethod.qryCity(param).then(function(rsp) {
                        if (rsp.success) {
                            $scope.citys = rsp.data;
                        };
                    }); 
                        
                }else{ 
                    $scope.citys = [{
                        'commonRegionId' : $scope.provincesAndCities.CITY_COMMONREGION_VALUE,
                        'commonRegionName' : $scope.provincesAndCities.CITY_COMMONREGION_TEXT
                    }]
                }
            };
        });  

        $scope.visible = false;
        $scope.key = 1;
        $scope.provinceIndex = '';
        $scope.cityIndex = '';
        $scope.areaId = '';
        $scope.provinceName = '';
        $scope.cityName = '';
        $scope.checkedAreaName = '';

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
                    $scope.provinceName = areaName;
                    break;
                case 'city':
                    $scope.cityIndex = index;
                    $scope.areaId = areaId;
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