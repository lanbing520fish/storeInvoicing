angular
    .module('inventoryModule', ['ui.bootstrap'])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.ismoreConditions = false; //更多查询条件
        var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');
        $rootScope.queryForm = obj ? JSON.parse(obj) : {}; // 页面传入的信息

    }])
    .factory('httpConfig', [function(){
        httpConfig = {
                'siteUrl': 'http://127.0.0.1:28088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
        };
        return httpConfig;
    }])
    .factory('httpMethod', ['$http', '$q', 'httpConfig', function($http, $q, httpConfig) {
        
        var httpMethod = {};

        // 省份选择值获取接口
        httpMethod.qryProvince = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryProvince',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + encodeURI(JSON.stringify(param))
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

        // 市级选择值获取接
        httpMethod.qryCity = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryCity',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + encodeURI(JSON.stringify(param))
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
        httpMethod.loadBrand = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/loadBrand',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + encodeURI(JSON.stringify(param))
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

        // 型号选择值获取接口
        httpMethod.loadModel = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/loadModel',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + encodeURI(JSON.stringify(param))
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
        httpMethod.loadChannelType = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/loadChannelType',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + encodeURI(JSON.stringify(param))
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
        httpMethod.loadMyHall = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/loadMyHall',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + encodeURI(JSON.stringify(param))
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
        httpMethod.loadBoutiqueStar = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/loadBoutiqueStar',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + encodeURI(JSON.stringify(param))
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

        // 条件查询接口
        httpMethod.qryDianCodeDetail = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryDianCodeDetail',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + encodeURI(JSON.stringify(param))
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

        // 查询当前登录用户的省级和市级区域ID
        httpMethod.qryCurrentUserProvinceAndCity = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryCurrentUserProvinceAndCity',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + encodeURI(JSON.stringify(param))
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
                'data|1': [{
                    'PROVINCE_COMMONREGION_VALUE': '@id',
                    'PROVINCE_COMMONREGION_TEXT': '@province',
                    'CITY_COMMONREGION_VALUE': '@id',
                    'CITY_COMMONREGION_TEXT': '@city'
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

            // 市级选择值获取接
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
                'rsphead':'s',
                'success':true,
                'code':null,
                'msg':null,
                'data|5':[
                    {
                        'brandCd':'@id',
                        'brandName':'@cword(6)',
                        'seq':null,
                        'codeRegex':null,
                        'bizmanId':null,
                        'categoryCd':null,
                        'firstLetter':null
                    },
                ],
                'errors':null
            });

            // 型号选择值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadModel', {
                'rsphead':'s',
                'success':true,
                'code':null,
                'msg':null,
                'data|5':[
                    {
                        'modelCd':'@id',
                        'modelName':'@cword(6)',
                        'brandCd':262,
                        'categoryCd':1,
                        'seq':null,
                        'codeRegex':null,
                        'bizmanId':null,
                        'brandName':'华为',
                        'categoryName':'手机',
                        'source':'9',
                        'sourceName':null,
                        'unifyOfferModelId':null,
                        'mergeSerId':null
                    }
                ],
                "errors":null
            });

            // 渠道类型选择值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadChannelType', {
                'rsphead':'s',
                'success':true,
                'code':null,
                'msg':null,
                'data|5':[
                    {
                        'channelTypeId':'@id',
                        'channelTypeName':'@cword(6)'
                    }
                ],
                "errors":null
            });

            // 自有厅级别选择值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadMyHall', {
                'rsphead':'s',
                'success':true,
                'code':null,
                'msg':null,
                'data|5':[
                    {
                        'hallLevelId':'@id',
                        'hallLevelName':'@cword(6)'
                    }
                ],
                "errors":null
            });

            // 专营店星级选项选择值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadBoutiqueStar', {
                'rsphead':'s',
                'success':true,
                'code':null,
                'msg':null,
                'data|5':[
                    {
                        'boutiqueStarId':'@id',
                        'boutiqueStarName':'@cword(6)'
                    }
                ],
                "errors":null
            });

            // 条件查询接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryDianCodeDetail', {
                'rsphead':'s',
                'success':true,
                'code':null,
                'msg':null,
                "errors":null,
                'data':{
                    'totalSize|1-100': 10,
                    'curPage|1-100': 10,
                    'list|10': [{
                        'SHOP_NAME': '@cword(6)', //  门店
                        'CHANNEL_NAME': '@cword(6)', //  渠道单元
                        'CHANNEL_TYPE': '@cword(6)', //  渠道单元类型
                        'CHANNEL_NBR': '@id', //  渠道单元编码
                        'INST_CODE': '@id', //  串码
                        'BRAN_NAME': '@cword(6)', //  品牌
                        'MODEL_NAME': '@word(6)', //  型号
                        'OFFER_NAME': '@cword(6)', //  名称
                        'COLOR': '@cword(6)', //  颜色
                        'RAM_ROM': '@cword(6)', //  RAM&ROM
                        'IN_STOCK_TIME': '@date', //  入库时间
                        'SALE_TIME': '@time', //销售时间
                        'TURNOVER_DAYS|1-100': 1, //  周转天数
                        'PROCURE_AMOUNT|1-10000': 1000, //  采购价
                        'SALE_PRICE|1-10000': 1000, //  销售单价
                        'PROFIT|1-10000': 1000, //  毛利
                        'SALE_TYPE': '@cword(6)', //  销售方式
                        'SALES_MAN': '@cname', //  销售员
                        'REGISTER_STATUS': '@cword(6)', //  自注册状态
                        'ISNO_PROVINCE_REGISTER|1': ['是','否'], //  是否本省注册
                        'NEW_REGISTER_PHONE_TYPE': '@cword(4)', //  首次注册手机号码类型
                        'CRM_PHONENUMBER_TYPE': '@cword(6)', //  CRM捆绑号码类型
                        'ISNO_REGISTER_CRM_PHONENUMBER|1': ['是','否'], //  注册手机号码与CRM捆绑号码是否一致
                    }],
                }
            });

        }

        return httpMethod;
    }])
    .controller('conditionQuery', ['$scope', '$rootScope', '$timeout', '$log', 'httpMethod', function($scope, $rootScope, $timeout, $log, httpMethod) {

        $rootScope.queryForm = $.extend(true, {
            provinceId: '',//省份ID
            cityId: '',//城市ID
            brandCd: '', //品牌ID
            modelCd: '', //机型
            brandName: '', //品牌名
            modelName: '', //机型名
            st_time: '', //选择的入库日期开始时间
            ed_time: '', //选择的入库日期结束时间
            channelTypeId: '', //渠道类型
            hallLevelId: '', //自由厅级别
            boutiqueStarId: '', //专营厅星级
            channelName: '', //渠道单元名称
            channeNbr: '', //渠道单元编码
            instCode: '' //串码
        }, $rootScope.queryFormList);

        $scope.checkedAreaName = '';
        $scope.isDisabled = true;
        
        $scope.visible = false;
        $scope.key = 1;
        $scope.provinceIndex = '';
        $scope.cityIndex = '';
        $scope.areaId = '';

        $scope.provinceName = '';
        $scope.cityName = '';

        $scope.isshowprovinceName = true;
        $scope.isshowcityName = true;

        var user_param = {}

        $scope.queryCity = function() {

            // 市级选择值获取接口
            $scope.$watch('queryForm.provinceId', function (newValue) {
                var city_param = {
                    provinceId : newValue
                };
                httpMethod.qryCity(city_param).then(function(rsp) {
                    $rootScope.qryCityList = rsp.data;
                    $log.log('调用市级选择值获取接口成功.');
                }, function() {
                    $log.log('调用市级选择值获取接口失败.');
                });
            });

        };

        httpMethod.qryCurrentUserProvinceAndCity(user_param).then(function(rsp) {
            $rootScope.userList = rsp.data;
            if($rootScope.userList.PROVINCE_COMMONREGION_TEXT){
                $scope.provinceName = $rootScope.userList.PROVINCE_COMMONREGION_TEXT;
                $scope.checkedAreaName = $scope.provinceName;
                $rootScope.queryForm.provinceId = $rootScope.userList.PROVINCE_COMMONREGION_VALUE;
                $scope.key = 2;
                $scope.isshowprovinceName = false;
                if($rootScope.userList.CITY_COMMONREGION_TEXT){
                    $scope.cityName = $rootScope.userList.CITY_COMMONREGION_TEXT;
                    $scope.checkedAreaName = $scope.provinceName + ' ' + $scope.cityName;
                    $rootScope.queryForm.cityId = $rootScope.userList.CITY_COMMONREGION_VALUE;
                    $scope.isshowcityName = false;
                }else{
                    $scope.queryCity();
                };
            }else{
                // 查询省份
                var pro_param = {}
                httpMethod.qryProvince(pro_param).then(function(rsp) {
                    $rootScope.qryProvinceList = rsp.data;
                    $log.log('调用省份选择值获取接口成功.');
                }, function() {
                    $log.log('调用省份选择值获取接口失败.');
                });
                $scope.queryCity();
            };
            $log.log('调用查询当前登录用户的省级和市级区域ID接口成功.');
        }, function() {
            $log.log('调用查询当前登录用户的省级和市级区域ID接口失败.');
        });

        //更多查询条件
        $scope.moreConditions = function(){
            $rootScope.ismoreConditions = !$rootScope.ismoreConditions;
        };

        $scope.clHide = function() {
            $scope.visible = false;
        };

        $scope.isForbid = true;

        // 城市选择
        $scope.cityCheck = function() {
            $scope.visible = !$scope.visible;
        };
        $scope.handleSelectCity = function(level, index, areaId, areaName) {
            var me = this;
            switch (level) {
                case 'province':
                    $scope.key = 2;
                    $scope.provinceIndex = index;
                    $scope.provinceName = areaName;
                    $rootScope.queryForm.provinceId = areaId;
                    break;
                case 'city':
                    $scope.cityIndex = index;
                    $scope.cityName = areaName;
                    $rootScope.queryForm.cityId = areaId;
                    me.handleSubmitBtn(level);
                    break;
            }
        };
        $scope.handleSubmitBtn = function(level) {
            switch (level) {
                case 'province':
                    $scope.checkedAreaName = $scope.provinceName;
                    break;
                case 'city':
                    $scope.checkedAreaName = $scope.provinceName + ' ' + $scope.cityName;
                    $scope.visible = false;
                    break;
            }
        };

        // 品牌选择值获取接口
        var brand_param = {}
        httpMethod.loadBrand(brand_param).then(function(rsp) {
            $rootScope.loadBrandList = rsp.data;
            $log.log('调用品牌选择值获取接口成功.');
        }, function() {
            $log.log('调用品牌选择值获取接口失败.');
        });

        // 型号选择值获取接口
        $scope.$watch('queryForm.brandCd', function (newValue) {
            var model_param = {
                brandId : newValue
            };
            httpMethod.loadModel(model_param).then(function(rsp) {
                $rootScope.loadModelList = rsp.data;
                $log.log('调用型号选择值获取接口成功.');
            }, function() {
                $log.log('调用型号选择值获取接口失败.');
            });
        });

        // 渠道类型选择值获取接口
        var ChannelType_param = {}
        httpMethod.loadChannelType(ChannelType_param).then(function(rsp) {
            $rootScope.loadChannelTypeList = rsp.data;
            $log.log('调用渠道类型选择值获取接口成功.');
        }, function() {
            $log.log('调用渠道类型选择值获取接口失败.');
        });

        // 自有厅级别选择值获取接口
        var loadMyHall_param = {}
        httpMethod.loadMyHall(loadMyHall_param).then(function(rsp) {
            $rootScope.loadMyHallList = rsp.data;
            $log.log('调用自有厅级别选择值获取接口成功.');
        }, function() {
            $log.log('调用自有厅级别选择值获取接口失败.');
        });
        
        // 专营店星级选项选择值获取接口
        var loadBoutiqueStar_param = {}
        httpMethod.loadBoutiqueStar(loadBoutiqueStar_param).then(function(rsp) {
            $rootScope.loadBoutiqueStarList = rsp.data;
            $log.log('调用专营店星级选项选择值获取接口成功.');
        }, function() {
            $log.log('调用专营店星级选项选择值获取接口失败.');
        });

        // 时间控件
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $rootScope.queryForm.ed_time,
            startingDay: 1,
            showWeeks: false
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $rootScope.queryForm.st_time,
            // maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };
        $scope.$watch('queryForm.st_time', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
        });
        $scope.$watch('queryForm.ed_time', function(newValue) {
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

        // 条件查询
        $scope.queryFormSubmit = function(currentPage) {
            var param = {
                curPage: currentPage || $scope.currentPage,
                pageSize: $scope.rowNumPerPage,
                totalSize: $scope.totalNum,
                provinceId: $rootScope.queryForm.provinceId ? $rootScope.queryForm.provinceId : '',
                cityId: $rootScope.queryForm.cityId ? $rootScope.queryForm.cityId : '',
                brandCd: $rootScope.queryForm.brandCd ? $rootScope.queryForm.brandCd : '',
                brandName: $rootScope.queryForm.brandName ? $rootScope.queryForm.brandName : '',
                modelName: $rootScope.queryForm.modelName ? $rootScope.queryForm.modelName : '',
                modelCd: $rootScope.queryForm.modelCd ? $rootScope.queryForm.modelCd : '',
                channelTypeId: $rootScope.queryForm.channelTypeId ? $rootScope.queryForm.channelTypeId : '',
                hallLevelId: $rootScope.queryForm.hallLevelId ? $rootScope.queryForm.hallLevelId : '',
                boutiqueStarId: $rootScope.queryForm.boutiqueStarId ? $rootScope.queryForm.boutiqueStarId : '',
                channeNbr: $rootScope.queryForm.channelNbr ? $rootScope.queryForm.channelNbr : '',
                channelName: $rootScope.queryForm.channelName ? $rootScope.queryForm.channelName : '',
                instCode: $rootScope.queryForm.instCode ? $rootScope.queryForm.instCode : '',
                st_time: $rootScope.queryForm.st_time ? moment($rootScope.queryForm.st_time).format('YYYY-MM-DD HH:mm:ss') : '',
                ed_time: $rootScope.queryForm.ed_time ? moment($rootScope.queryForm.ed_time).format('YYYY-MM-DD HH:mm:ss') : '',
            };
            httpMethod.qryDianCodeDetail(param).then(function(rsp) {
                $scope.qryDianCodeDetailList = rsp.data.list;
                $scope.totalNum = rsp.data.totalSize;
                $log.log('调用条件查询接口成功.');
            }, function() {
                $log.log('调用条件查询接口失败.');
            });
        }

        $scope.$on('pageChange', function(event, data) {
            $scope.queryFormSubmit(data);
        })
    }])
    // 查询结果控制器
    .controller('QueryResultCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'httpConfig', function($scope, $rootScope, $log, httpMethod, httpConfig) {

        //导出
        $scope.exportQryInOutStockDetail = function(currentPage) {
            var param = {
                curPage: currentPage || $scope.currentPage,
                pageSize: $scope.rowNumPerPage,
                totalSize: $scope.totalNum,
                provinceId: _.get($rootScope, 'queryForm.provinceId'),
                cityId: _.get($rootScope, 'queryForm.cityId'),
                brandCd: _.get($rootScope, 'queryForm.brandCd'),
                brandName: _.get($rootScope, 'queryForm.brandName'),
                modelName: _.get($rootScope, 'queryForm.modelName'),
                modelCd: _.get($rootScope, 'queryForm.modelCd'),
                channelTypeId: _.get($rootScope, 'queryForm.channelTypeId'),
                hallLevelId: _.get($rootScope, 'queryForm.hallLevelId'),
                boutiqueStarId: _.get($rootScope, 'queryForm.boutiqueStarId'),
                channeNbr: _.get($rootScope, 'queryForm.channeNbr'),
                channelName: _.get($rootScope, 'queryForm.channelName'),
                instCode: _.get($rootScope, 'queryForm.instCode'),
                st_time: _.get($rootScope, 'queryForm.st_time'),
                ed_time: _.get($rootScope, 'queryForm.ed_time'),
            };
            // 导出接口暂缺，接口待调整
            window.open(httpConfig.siteUrl + '/chain/report/q/exportQryDianCodeDetail?param=' + encodeURI(JSON.stringify(param)));
        }
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
