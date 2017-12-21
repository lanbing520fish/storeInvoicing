angular
    .module('inventoryModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {

    }])
    .factory('httpConfig', [function() {
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
        httpMethod.qrySaleDetail = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/report/q/qrySaleDetail',
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
                'rsphead': 's',
                'success': true,
                'code': null,
                'msg': null,
                'data|5': [{
                    'brandCd': '@id',
                    'brandName': '@cword(6)',
                    'seq': null,
                    'codeRegex': null,
                    'bizmanId': null,
                    'categoryCd': null,
                    'firstLetter': null
                }, ],
                'errors': null
            });

            // 型号选择值获取接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/loadModel', {
                'rsphead': 's',
                'success': true,
                'code': null,
                'msg': null,
                'data|5': [{
                    'modelCd': '@id',
                    'modelName': '@cword(6)',
                    'brandCd': 262,
                    'categoryCd': 1,
                    'seq': null,
                    'codeRegex': null,
                    'bizmanId': null,
                    'brandName': '华为',
                    'categoryName': '手机',
                    'source': '9',
                    'sourceName': null,
                    'unifyOfferModelId': null,
                    'mergeSerId': null
                }],
                "errors": null
            });

            // 条件查询接口
            Mock.mock(httpConfig.siteUrl + '/chain/report/q/qrySaleDetail', {
                'rsphead': 's',
                'success': true,
                'code': null,
                'msg': null,
                "errors": null,
                'data': {
                    'total|1-100': 10,
                    'pageNum|1-100': 10,
                    'list|10': [{
                        'BRAN_NAME': '@cword(4)', //
                        'MODEL_NAME': '', //
                        'OFFER_NAME': '', //
                        'IN_STOCK_COUNT': '', //
                        'IN_STOCK_AMOUNT': '', //
                        'OUT_STOCK_COUNT': '', //
                        'OUT_STOCK_AMOUNT': '', //
                        'ALL_SALE_COUNT': '', //
                        'CONTRACT_SALE_COUNT': '', //
                        'TERMINAL_SALE_COUNT': '', //
                        'ALLOT_IN_COUNT': '', //
                        'ALLOT_IN_AMOUNT': '', //
                        'ALLOT_OUT_COUNT': '', //
                        'ALLOT_OUT_AMOUNT': '', //
                        'SALE_OUT_COUNT': '', //
                        'SALE_OUT_AMOUNT': '', //
                        'NOW_STOCK_COUNT': '', //
                        'NOW_STOCK_AMOUNT': '', //
                        'ALL_SALE_AMOUNT': '', //
                        'CONTRACT_SALE_AMOUNT': '', //
                        'TERMINAL_SALE_AMOUNT': '', //
                        'IN_STOCK_SALE_AMOUNT': '', //
                        'IN_STOCK_CONTRACT_SALE_COUNT': '', //
                        'IN_STOCK_TERMINAL_SALE_COUNT|100-1000': 100, //
                        'RESALE_DIGESTIBILITY': '', //
                    }],
                }
            });
        }

        return httpMethod;
    }])
    .controller('conditionQuery', ['$scope', '$rootScope', '$timeout', '$log', 'httpMethod', function($scope, $rootScope, $timeout, $log, httpMethod) {

        $rootScope.queryForm = {
            brandCd: '',
            modelCd: '',
            brandName: '',
            modelName: '',
            st_time: '',
            ed_time: ''
        }

        // 品牌选择值获取接口
        var brand_param = {}
        httpMethod.loadBrand(brand_param).then(function(rsp) {
            $rootScope.loadBrandList = rsp.data;
            $log.log('调用品牌选择值获取接口成功.');
        }, function() {
            $log.log('调用品牌选择值获取接口失败.');
        });

        // 型号选择值获取接口
        $scope.$watch('queryForm.brandCd', function(newValue) {
            var model_param = {
                brandId: newValue
            };
            httpMethod.loadModel(model_param).then(function(rsp) {
                $rootScope.loadModelList = rsp.data;
                $log.log('调用型号选择值获取接口成功.');
            }, function() {
                $log.log('调用型号选择值获取接口失败.');
            });
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

            // var param = {
            //     curPage: currentPage || $scope.currentPage,
            //     pageSize: $scope.rowNumPerPage,
            //     brandCd: $rootScope.queryForm.brandCd ? $rootScope.queryForm.brandCd : '',
            //     modelCd: $rootScope.queryForm.modelCd ? $rootScope.queryForm.modelCd : '',
            //     brandName: $rootScope.queryForm.brandName ? $rootScope.queryForm.brandName : '',
            //     modelName: $rootScope.queryForm.modelName ? $rootScope.queryForm.modelName : '',
            //     st_time: $rootScope.queryForm.st_time ? moment($rootScope.queryForm.st_time).format('YYYY-MM-DD HH:mm:ss') : '',
            //     ed_time: $rootScope.queryForm.ed_time ? moment($rootScope.queryForm.ed_time).format('YYYY-MM-DD HH:mm:ss') : '',
            // };
            // httpMethod.qrySaleDetail(param).then(function(rsp) {
            //     $scope.qrySaleDetailList = rsp.data.list;
            //     $scope.totalNum = rsp.data.total;
            //     $log.log('调用条件查询接口成功.');
            // }, function() {
            //     $log.log('调用条件查询接口失败.');
            // });
        }

        $scope.$on('pageChange', function(event, data) {
            $scope.queryFormSubmit(data);
        })
    }])
    // 查询结果控制器
    .controller('QueryResultCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'httpConfig', function($scope, $rootScope, $log, httpMethod, httpConfig) {

        $scope.serialDetail = function(index, item) {
            $scope.$emit('open', index);
        }

    }])
    // 弹出框
    .controller('historyDetailModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 串号详情
        $scope.$on('open', function(d, index) {
            $ctrl.open(index);
        });

        $ctrl.open = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'new-line-title',
                ariaDescribedBy: 'new-line-body',
                templateUrl: 'addNewLine.html',
                controller: 'addNewLineCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return data;
                    }
                }
            });
        };

        $ctrl.toggleAnimation = function() {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
    })

    .controller('addNewLineCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $scope.$broadcast('submitCardRange');
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
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
