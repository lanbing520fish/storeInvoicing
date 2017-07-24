angular
    .module('inventoryModule', ['ui.bootstrap', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.emptyBaseLayer'])
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
        httpMethod.loadAllBrand = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/loadAllBrand',
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

        if (httpConfig.isMock) {
            // 商品品牌模拟数据
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadAllBrand', {
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
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qryTerminalInCalData', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'total|1-100': 10,
                    'list': [{
                        "ROW_ID": 1,
                        "PROCUREIN_TYPE": "行货",
                        "IN_STOCK_TIMES": 1,
                        "BRAND_NAME": "vivo",
                        "OFFER_MODEL_NAME": "VIV-vivo X9",
                        "INST_CODE": "A100005A378948",
                        "PRICE": 3798,
                        "STAFF_NAME": "王银",
                        "CATEGORY_NAME": "手机",
                        "OFFER_NAME": "vivo vivo X9 金色",
                        "STORAGE_NAME": "解放东街营业厅-主仓库",
                        "CREATE_DT": "2017-07-04",
                        "UPRETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "SI_ORDER_ID": "1000000042626635",
                        "RETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "STAFF_ID": 64010150562,
                        "OPERATORS_NAME": "中国电信股份有限公司银川分公司"
                    }, {
                        "ROW_ID": 2,
                        "PROCUREIN_TYPE": "行货",
                        "IN_STOCK_TIMES": 1,
                        "BRAND_NAME": "vivo",
                        "OFFER_MODEL_NAME": "VIV-vivo Y66",
                        "INST_CODE": "A000006EE6CFBE",
                        "PRICE": 1098,
                        "STAFF_NAME": "王银",
                        "CATEGORY_NAME": "手机",
                        "OFFER_NAME": "vivo vivo Y66 金色",
                        "STORAGE_NAME": "中国电信解放东街营业厅（世纪恒天）第一仓库",
                        "CREATE_DT": "2017-07-02",
                        "UPRETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "SI_ORDER_ID": "1000000042110987",
                        "RETAIL_SHOP_NAME": "中国电信解放东街营业厅（世纪恒天）",
                        "STAFF_ID": 64010150562,
                        "OPERATORS_NAME": "宁夏世纪恒天通讯有限公司"
                    }, {
                        "ROW_ID": 3,
                        "PROCUREIN_TYPE": "行货",
                        "IN_STOCK_TIMES": 1,
                        "BRAND_NAME": "苹果",
                        "OFFER_MODEL_NAME": "ACM-A7Plus",
                        "INST_CODE": "355835083460105",
                        "PRICE": 7799,
                        "STAFF_NAME": "王银",
                        "CATEGORY_NAME": "手机",
                        "OFFER_NAME": "苹果 iPhone 7 Plus 32G金",
                        "STORAGE_NAME": "解放东街营业厅-主仓库",
                        "CREATE_DT": "2017-07-01",
                        "UPRETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "SI_ORDER_ID": "1000000041651905",
                        "RETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "STAFF_ID": 64010150562,
                        "OPERATORS_NAME": "中国电信股份有限公司银川分公司"
                    }, {
                        "ROW_ID": 4,
                        "PROCUREIN_TYPE": "行货",
                        "IN_STOCK_TIMES": 1,
                        "BRAND_NAME": "苹果",
                        "OFFER_MODEL_NAME": "ACM-A7",
                        "INST_CODE": "355826085427218",
                        "PRICE": 5388,
                        "STAFF_NAME": "王银",
                        "CATEGORY_NAME": "手机",
                        "OFFER_NAME": "苹果 iPhone 7 32G黑",
                        "STORAGE_NAME": "解放东街营业厅-主仓库",
                        "CREATE_DT": "2017-06-30",
                        "UPRETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "SI_ORDER_ID": "1000000041279348",
                        "RETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "STAFF_ID": 64010150562,
                        "OPERATORS_NAME": "中国电信股份有限公司银川分公司"
                    }, {
                        "ROW_ID": 5,
                        "PROCUREIN_TYPE": "行货",
                        "IN_STOCK_TIMES": 1,
                        "BRAND_NAME": "三星",
                        "OFFER_MODEL_NAME": "SCH-SM G9500",
                        "INST_CODE": "354765081180226",
                        "PRICE": 6188,
                        "STAFF_NAME": "王银",
                        "CATEGORY_NAME": "手机",
                        "OFFER_NAME": "三星 SM-G9500 烟晶灰",
                        "STORAGE_NAME": "解放东街营业厅-主仓库",
                        "CREATE_DT": "2017-06-30",
                        "UPRETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "SI_ORDER_ID": "1000000041277668",
                        "RETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "STAFF_ID": 64010150562,
                        "OPERATORS_NAME": "中国电信股份有限公司银川分公司"
                    }, {
                        "ROW_ID": 6,
                        "PROCUREIN_TYPE": "行货",
                        "IN_STOCK_TIMES": 1,
                        "BRAND_NAME": "三星",
                        "OFFER_MODEL_NAME": "SCH-SM G9550",
                        "INST_CODE": "354732081816910",
                        "PRICE": 6088,
                        "STAFF_NAME": "王银",
                        "CATEGORY_NAME": "手机",
                        "OFFER_NAME": "三星 SM-G9550 烟晶灰",
                        "STORAGE_NAME": "解放东街营业厅-主仓库",
                        "CREATE_DT": "2017-06-30",
                        "UPRETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "SI_ORDER_ID": "1000000041273564",
                        "RETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "STAFF_ID": 64010150562,
                        "OPERATORS_NAME": "中国电信股份有限公司银川分公司"
                    }, {
                        "ROW_ID": 7,
                        "PROCUREIN_TYPE": "行货",
                        "IN_STOCK_TIMES": 1,
                        "BRAND_NAME": "三星",
                        "OFFER_MODEL_NAME": "SCH-SM G9500",
                        "INST_CODE": "354765081879884",
                        "PRICE": 5388,
                        "STAFF_NAME": "王银",
                        "CATEGORY_NAME": "手机",
                        "OFFER_NAME": "三星 SM-G9500 烟晶灰",
                        "STORAGE_NAME": "解放东街营业厅-主仓库",
                        "CREATE_DT": "2017-06-30",
                        "UPRETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "SI_ORDER_ID": "1000000041272873",
                        "RETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "STAFF_ID": 64010150562,
                        "OPERATORS_NAME": "中国电信股份有限公司银川分公司"
                    }, {
                        "ROW_ID": 8,
                        "PROCUREIN_TYPE": "行货",
                        "IN_STOCK_TIMES": 1,
                        "BRAND_NAME": "三星",
                        "OFFER_MODEL_NAME": "SCH-SM J3119S",
                        "INST_CODE": "358067080281766",
                        "PRICE": 999,
                        "STAFF_NAME": "王银",
                        "CATEGORY_NAME": "手机",
                        "OFFER_NAME": "三星 SM-J3119S 流沙金",
                        "STORAGE_NAME": "解放东街营业厅-主仓库",
                        "CREATE_DT": "2017-06-30",
                        "UPRETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "SI_ORDER_ID": "1000000041235996",
                        "RETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "STAFF_ID": 64010150562,
                        "OPERATORS_NAME": "中国电信股份有限公司银川分公司"
                    }, {
                        "ROW_ID": 9,
                        "PROCUREIN_TYPE": "行货",
                        "IN_STOCK_TIMES": 1,
                        "BRAND_NAME": "三星",
                        "OFFER_MODEL_NAME": "SCH-SM J3119S",
                        "INST_CODE": "358067080281139",
                        "PRICE": 850,
                        "STAFF_NAME": "王银",
                        "CATEGORY_NAME": "手机",
                        "OFFER_NAME": "三星 SM-J3119S 流沙金",
                        "STORAGE_NAME": "中国电信解放东街营业厅（世纪恒天）第一仓库",
                        "CREATE_DT": "2017-06-30",
                        "UPRETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "SI_ORDER_ID": "1000000041198968",
                        "RETAIL_SHOP_NAME": "中国电信解放东街营业厅（世纪恒天）",
                        "STAFF_ID": 64010150562,
                        "OPERATORS_NAME": "宁夏世纪恒天通讯有限公司"
                    }, {
                        "ROW_ID": 10,
                        "PROCUREIN_TYPE": "行货",
                        "IN_STOCK_TIMES": 1,
                        "BRAND_NAME": "苹果",
                        "OFFER_MODEL_NAME": "ACM-A7",
                        "INST_CODE": "355833085430085",
                        "PRICE": 5388,
                        "STAFF_NAME": "王银",
                        "CATEGORY_NAME": "手机",
                        "OFFER_NAME": "苹果 iPhone 7 32G玫瑰金",
                        "STORAGE_NAME": "解放东街营业厅-主仓库",
                        "CREATE_DT": "2017-06-30",
                        "UPRETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "SI_ORDER_ID": "1000000041198697",
                        "RETAIL_SHOP_NAME": "中国电信解放东街营业厅",
                        "STAFF_ID": 64010150562,
                        "OPERATORS_NAME": "中国电信股份有限公司银川分公司"
                    }]
                },
                'errors': null
            });
        }

        return httpMethod;
    }])
    .controller('conditionQuery', ['$scope', '$timeout', '$log', 'httpMethod', function($scope, $timeout, $log, httpMethod) {
        //获取所有品牌
        httpMethod.loadAllBrand().then(function(rsp) {
            $scope.brandsList = rsp.data;
        });

        //监听品牌改变获取相应型号
        $scope.brandChanged = function(val) {
            if (val === null) {
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

        //ui.gird
        $scope.gridOptions = {
            enableSorting: false,
            enableColumnMenus: false,
            columnDefs: [
                { field: 'ROW_ID', displayName: '序号', width: '50' },
                { field: 'BRAND_NAME', displayName: '商品品牌', width: '66' },
                { field: 'OFFER_MODEL_NAME', displayName: '商品型号', width: '120' },
                { field: 'OFFER_NAME', displayName: '商品名称', width: '160' },
                { field: 'INST_CODE', displayName: '串码', width: '126' },
                { field: 'PRICE', displayName: '采购单价', width: '60' },
                { field: 'CREATE_DT', displayName: '入库时间', width: '80' },
                { field: 'RETAIL_SHOP_NAME', displayName: '入库门店', width: '160', cellTooltip: true },
                { field: 'STORAGE_NAME', displayName: '仓库', width: '160', cellTooltip: true },
                { field: 'STAFF_NAME', displayName: '操作人', width: '60' },
                { field: 'STAFF_ID', displayName: '操作人工号', width: '96' },
                { field: 'SI_ORDER_ID', displayName: '单据号', width: '126' },
            ]
        };

        // 确定查询
        $scope.queryFormSubmit = function(currentPage) {
            var param = {
                brandCd: $scope.brandCd || '',
                modelCd: $scope.modelCd || '',
                staffId: $scope.staffId || '',
                storageId: $scope.storageId || '',
                st_time: $scope.conditionQueryForm.createStartDt ? moment($scope.conditionQueryForm.createStartDt).format('YYYY-MM-DD') : '', //开始时间
                ed_time: $scope.conditionQueryForm.createEndDt ? moment($scope.conditionQueryForm.createEndDt).format('YYYY-MM-DD') : '', //结束时间
                curPage: currentPage || 1,
                pageSize: 10
            };
            httpMethod.qryTerminalInCalData(param).then(function(rsp) {
                $scope.gridOptions.data = rsp.data.list; //ui.gird data
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
