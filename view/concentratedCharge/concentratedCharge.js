angular
    .module('concentratedChargeModule', ['ui.bootstrap'])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpMethod = {},
            isMock = true;
        // 集中收银查询
        httpMethod.qryCashOrderById = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/cash/q/qryCashOrderById',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: 'body=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status != 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        if (isMock) {
            // 集中收银查询
            Mock.mock('http://192.168.74.17:8088/cash/q/qryCashOrderById', {
                'data': {
                    'total': 20, //总页数
                    'pageNum': 1, //当前页面
                    'list|10': [{
                        'orderNo': '@id', //订单号
                        'orderType|1': ['1', '2'], //订单类型 1收费 2退费
                        'custName': '@cname()', //客户姓名
                        'phoneNumber|1': ['18761898923', '13853342435', '18976549888'], //电话好号码
                        'offerName': '', //合约主销售品名称
                        'staffName': '', //销售员名称
                        'channelName': '', //渠道单元名称
                        'orderDate': '', //订单时间
                        'recoderTime': '', //记录时间
                        'dealFlag|1': ['0', '1'], //处理标识 0未处理 1已处理
                        'terminalList|8': [{ //终端列表
                            'orderNo': '@id', //订单号码
                            'terminalName': '@cname()', //终端名称
                            'instCode': '@id', //串码
                        }],
                        'infoList|3': [{
                            'orderNo': '@id', //订单号码
                            'feeItemName': '@cword(4)', //收费名称
                            'amount|10': '8', //价格
                            'chargeFlag|1': ['N', 'Y'], //收费类型 N 未收费 Y 已收费
                        }]
                    }],
                }
            });
        }

        return httpMethod;
    }])
    .filter('orderTypeFilter', function() {
        return function(stateValue) {
            switch (stateValue) {
                case '1':
                    return '收费';
                    break;
                case '2':
                    return '退费';
                    break;
            }
        }
    })
    .filter('dealFlagFilter', function() {
        return function(stateValue) {
            switch (stateValue) {
                case '0':
                    return '未处理';
                    break;
                case '1':
                    return '已处理';
                    break;
            }
        }
    })
    .filter('chargeFlagFilter', function() {
        return function(stateValue) {
            switch (stateValue) {
                case 'N':
                    return '未处理';
                    break;
                case 'Y':
                    return '已处理';
                    break;
            }
        }
    })
    .controller('queryCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        // 查询结果分页信息
        $scope.curPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数
        $scope.maxSize = 5; // 最大展示页数

        $scope.orderId = '';
        $scope.orderQuery = function(curPage) {
            !curPage && $scope.$broadcast('pageChange');
            var param = {
                'pageSize': $scope.rowNumPerPage, //每页条数
                'curPage': $scope.curPage, //当前页
                'orderId': $scope.orderId, //订单号码
                'retailShopId': '', //门店ID
                'staffId': '', //员工ID
            }

            // 集中收银查询
            httpMethod.qryCashOrderById(param).then(function(rsp) {
                $log.log('调用查询集中收银接口成功.');
                $rootScope.cashOrderResultList = rsp.data.list;
                $scope.totalNum = rsp.data.total;
            }, function() {
                $log.log('调用查询集中收银接口失败.');
            });
        }
    }])
    .controller('resultCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout) {
        // 收费
        $scope.orderCharge = function(item) {
            // parent.angular.element(parent.$('#tabs')).scope().addTab('订单收费', '', 'orderCharge', item);
        };

        // 退费
        $scope.orderRefund = function(item) {
            // parent.angular.element(parent.$('#tabs')).scope().addTab('订单退费', '', 'orderRefund', item);
        };

        // 详情
        $scope.orderDetail = function(item) {
            $scope.$emit('openDetailOrderModal', item);
        };
    }])
    // 弹出框
    .controller('detailQueryModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 修改库存
        $scope.$on('openDetailOrderModal', function(d, data) {
            $ctrl.openDetailOrderModal(data);
        });

        $ctrl.openDetailOrderModal = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title',
                ariaDescribedBy: 'serial-number-body',
                templateUrl: 'serialNumberModal.html',
                controller: 'serialNumberModalCtrl',
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
    .controller('serialNumberModalCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;

        $ctrl.items = items;
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
        $scope.$on('pageChange', function() {
            $scope.curPage = 1;
        });

        $scope.pageChanged = function() {
            $scope.orderQuery($scope.curPage);
        };
    }]);
