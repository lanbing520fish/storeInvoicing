angular
    .module('inventoryModule', ['ui.bootstrap'])
    .run(['$rootScope', function ($rootScope) {

        $rootScope.ismoreConditions = false; //更多查询条件
        var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');
        $rootScope.queryFormList = obj ? JSON.parse(obj) : {}; // 页面传入的信息

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

        // 条件查询接口
        httpMethod.qryInstCodeLevelStockReport = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qryInstCodeLevelStockReport',
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

        // 条件导出接口
        httpMethod.exportInstCodeLevelStockReport = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/exportInstCodeLevelStockReport',
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

            // 条件查询接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryInstCodeLevelStockReport', {
                'rsphead':'s',
                'success':true,
                'code':null,
                'msg':null,
                "errors":null,
                'data':{
                    'total|1-100': 10,
                    'pageNum|1-100': 10,
                    'list|10': [{
                        'INDEX_NUM|1-100': 1, //序号
                        'INST_CODE': '@id', //串码
                        'BRAND_NAME': '@cword(6)', //品牌
                        'MODEL_NAME': '@word(6)', //型号
                        'OFFER_NAME': '@cword(6)', //名称
                        'OFFER_COLOR': '@cword(6)', //颜色
                        'RAM_ROM': '@cword(6)', //RAM&ROM
                        'STORAGE_NAME': '@cword(6)', //仓库
                        'CHANNEL_NAME': '@cword(6)', //渠道单元
                        'CHANNEL_TYPE': '@cword(6)', //渠道单元类型
                        'CHANNEL_NBR': '@id', //渠道单元编码
                        'OPERATORS_NAME': '@cword(6)', //经营主体全称
                        'OPERATORS_NBR': '@id', //经营主体编码
                        'IN_TIME': '@time', //入库时间
                        'IN_STOCK_DAY': '@date', //在库时间（天）
                        'IN_AMOUNT|1-10000': 1000, //采购单价
                        'ZZC_FLAG|1': ['是', '否'], //是否自注册
                        'ZZC_MYPROVINCE_FLAG|1': ['是', '否'], //是否本省注册
                    }],
                }
            });

            // 条件导出接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/exportInstCodeLevelStockReport', {
                }
            );

        }

        return httpMethod;
    }])
    .controller('conditionQuery', ['$scope', '$rootScope', '$timeout', '$log', 'httpMethod', function($scope, $rootScope, $timeout, $log, httpMethod) {

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

        $scope.queryForm = $.extend(true, {
            brandCd: '', //品牌选择值
            modelCd: '', //型号选择值
            brandName: '', //品牌输入框值
            modelName: '', //机型输入框值
            retailShopName: '', //门店名
            channelNbr: '', //门店对应渠道单元编码
            operatorsNbr: '', //门店对应经营主体编码
            channelName: '', //渠道单元名称
            instCode: '', //串码
        }, $rootScope.queryFormList);

        //更多查询条件
        $scope.moreConditions = function(){
            $rootScope.ismoreConditions = !$rootScope.ismoreConditions;
        };

        $scope.clHide = function() {
            $scope.visible = false;
        };

        $scope.isForbid = true;

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

        //分页
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        // 条件查询
        $scope.queryFormSubmit = function(currentPage) {
            var param={
                curPage: $scope.currentPage || 1,
                pageSize: $scope.rowNumPerPage,
                brandCd: $scope.queryForm.brandCd ? $scope.queryForm.brandCd : '',
                modelCd: $scope.queryForm.modelCd ? $scope.queryForm.modelCd : '',
                brandName: $scope.queryForm.brandName ? $scope.queryForm.brandName : '',
                modelName: $scope.queryForm.modelName ? $scope.queryForm.modelName : '',
                retailShopName: $scope.queryForm.retailShopName ? $scope.queryForm.retailShopName : '',
                channelNbr:  $scope.queryForm.channelNbr ? $scope.queryForm.channelNbr : '',
                operatorsNbr: $scope.queryForm.operatorsNbr ? $scope.queryForm.operatorsNbr : '',
                channelName: $scope.queryForm.channelName ? $scope.queryForm.channelName : '',
                instCode: $scope.queryForm.instCode ? $scope.queryForm.instCode : '',
            };
            httpMethod.qryInstCodeLevelStockReport(param).then(function(rsp) {
                $scope.qryInstCodeLevelStockReportList = rsp.data.list;
                $scope.totalNum = rsp.data.total;
                $log.log('获取条件查询接口响应成功.');
            }, function() {
                $log.log('获取条件查询接口响应失败.');
            });
        }

        $scope.$on('pageChange', function(event, data) {
            $scope.queryFormSubmit(data);
        })
    }])
    // 查询结果控制器
    .controller('QueryResultCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'httpConfig', function($scope, $rootScope, $log, httpMethod, httpConfig) {

        //导出
        $scope.exportInstCodeLevelStockReport = function() {
            var param = {
                curPage: $scope.currentPage || 1,
                pageSize: $scope.rowNumPerPage,
                curPage: _.get($rootScope, 'queryForm.curPage'),
                pageSize: _.get($rootScope, 'queryForm.pageSize'),
                brandCd: _.get($rootScope, 'queryForm.brandCd'),
                modelCd: _.get($rootScope, 'queryForm.modelCd'),
                brandName: _.get($rootScope, 'queryForm.brandName'),
                modelName: _.get($rootScope, 'queryForm.modelName'),
                retailShopName: _.get($rootScope, 'queryForm.retailShopName'),
                channelNbr: _.get($rootScope, 'queryForm.channelNbr'),
                operatorsNbr: _.get($rootScope, 'queryForm.operatorsNbr'),
                channelName: _.get($rootScope, 'queryForm.channelName'),
                instCode: _.get($rootScope, 'queryForm.instCode'),
            };
            window.open(httpConfig.siteUrl + '/chain/report/q/exportInstCodeLevelStockReport?param=' + encodeURI(JSON.stringify(param)));
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
