angular
    .module('checkModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope){
        $rootScope.STAFF_ID = '';
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://192.168.16.84:8088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        // “状态”的下拉数据
        httpMethod.qryUserStatus = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryUserStatus',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param = {}'
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

        // 管理省份的下拉数据
        httpMethod.qryRegion = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryRegion',
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

        // 条件查询接口
        httpMethod.qryAdminInfosByCond = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryAdminInfosByCond',
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

        // 批量删除
        httpMethod.batchDeleteAccount = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/u/batchDeleteAccount',
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

        // 批量启用
        httpMethod.batchStartAccount = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/u/batchStartAccount',
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

        // 批量停用
        httpMethod.batchStopAccount = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/u/batchStopAccount',
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

        // 管理员信息修改
        httpMethod.updateSystemUserBaseInfo = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/u/updateSystemUserBaseInfo',
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
            // “状态”的下拉数据
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryUserStatus', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|2': [{
                    'STATUS_CD': '@id',
                    'STATUS_NAME|+1': ['正常', '停用'],
                    'DESCRIPTION': '状态描述'
                }],
                'errors': null
            });

            // 管理省份的下拉数据
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryRegion', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|10': [{
                    'COMMON_REGION_ID': '@id',
                    'REGION_NAME': '@province'
                }],
                'errors': null
            });

            // 条件查询接口
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryAdminInfosByCond', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'pageNum': 1,
                    'pageSize': 10,
                    'size': 10,
                    'startRow': 1,
                    'endRow': 10,
                    'total': 33,
                    'pages': 4,
                    'list|10': [{
                        'OPERATORS_NBR': 'J32010233931',
                        'OPERATORS_ID': 2400157,
                        'POST_ROLE_NAME': '省级管理员',
                        'REMARKS': 'sjadmin09/sjadmin09',
                        'CHANNEL_ID': 106468336,
                        'UPDATE_TIME': '@date("yyyy-MM-dd")',
                        'CHANNEL_NAME': '南京市玄武区金正通讯经营部@南京玄武区金正通讯手机卖场',
                        'COMMON_REGION_ID': 8320102,
                        'OPERATORS_NAME': '网盈（南京市玄武区金正通讯经营部）',
                        'POST_ROLE_LEVEL': 12,
                        'REGION_NAME': '@province',
                        'STAFF_ID': 4585440,
                        'SYSTEM_USER_ID': 4585440,
                        'SYSTEM_USER_CODE': 'sjadmin09',
                        'MOBILE_TEL': /^(13[0-9]|15[7-9]|153|156|17[0-9]|18[7-9])[0-9]{8}$/,
                        'ROW_ID': 1,
                        'STATUS_CD': '1000',
                        'STAFF_NAME': '@cname',
                        'POST_ROLE_ID': 82000000,
                        'STATUS_NAME|1': ['正常', '停用']
                    }],
                    'firstPage': 1,
                    'prePage': 0,
                    'nextPage': 2,
                    'lastPage': 4,
                    'isFirstPage': true,
                    'isLastPage': false,
                    'hasPreviousPage': false,
                    'hasNextPage': true,
                    'navigatePages': 8,
                    'navigatepageNums': [1, 2, 3, 4]
                },
                'errors': null
            });

            // 批量删除
            Mock.mock(httpConfig.siteUrl + '/chain/power/u/batchDeleteAccount', {
                'rsphead': 's',
                'success|1': [true, false], //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': null,
                'errors': null
            });

            // 批量启用
            Mock.mock(httpConfig.siteUrl + '/chain/power/u/batchStartAccount', {
                'rsphead': 's',
                'success|1': [true, false], //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': null,
                'errors': null
            });

            // 批量停用
            Mock.mock(httpConfig.siteUrl + '/chain/power/u/batchStopAccount', {
                'rsphead': 's',
                'success|1': [true, false], //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': null,
                'errors': null
            });

            // 管理员信息修改
            Mock.mock(httpConfig.siteUrl + '/chain/power/u/updateSystemUserBaseInfo', {
                'rsphead': 's',
                'success|1': [true, false], //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': null,
                'errors': null
            });
        }

        return httpMethod;
    }])
    .controller('conditionQuery', ['$scope', '$rootScope', '$log', '$timeout', 'httpMethod', function($scope, $rootScope, $log, $timeout, httpMethod) {
        $scope.conditionQueryForm = {
            'staffName': '',
            'staffCode': '',
            'account': '',
            'channelName': '',
            'channelNbr': '',
            'statusCd': ''
        };

        $scope.userStatusList = []; // 状态列表
        httpMethod.qryUserStatus().then(function(rsp) {
            if (rsp.success) {
                $scope.userStatusList = rsp.data;
            };
        });

        $scope.curPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数
        $scope.maxSize = 5; // 最大展示页数

        $scope.orderQuery = function(curPage) {
            !curPage && $scope.$broadcast('pageChange');
            var param = {
                'curPage': curPage || $scope.curPage, //当前页
                'pageSize': $scope.rowNumPerPage, //每页条数
                'staffName': _.get($scope, 'conditionQueryForm.staffName'),
                'staffCode': _.get($scope, 'conditionQueryForm.staffCode'),
                'account': _.get($scope, 'conditionQueryForm.account'),
                'channelName': _.get($scope, 'conditionQueryForm.channelName'),
                'channelNbr': _.get($scope, 'conditionQueryForm.channelNbr'),
                'statusCd': _.get($scope, 'conditionQueryForm.statusCd'),
                'adminType': 'province',
                'commonRegionId': _.get($rootScope, 'area.COMMON_REGION_ID')
            };
            httpMethod.qryAdminInfosByCond(param).then(function(rsp) {
                if (rsp.success) {
                    $scope.adminInfosList = rsp.data.list;
                    $scope.totalNum = rsp.data.total;
                };
            });
        };

        $scope.checkedAdminInfo = [];
        $scope.checkAll = function(chk) {
            if (chk) {
                $scope.isChecked = true;
                $scope.checkedAdminInfo = _.clone($scope.adminInfosList);
                _.map($scope.checkedAdminInfo, function(item, index) {
                    item.$$hashKey = null;
                });
            } else {
                $scope.isChecked = false;
                $scope.checkedAdminInfo = [];
            }
        }

        // 单选
        $scope.check = function(val, chk) {
            var valueOfIndex = '';
            $scope.checkedAdminInfo.length && _.map($scope.checkedAdminInfo, function(item, index) {
                if (item.STAFF_ID === val.STAFF_ID) {
                    valueOfIndex = index;
                }
            });
            chk ? valueOfIndex === '' && $scope.checkedAdminInfo.push(val) : $scope.checkedAdminInfo.splice(valueOfIndex, 1);
        };

        var getAttributeSerial = function(attr, list) {
            var arr = [];
            _.map(list, function(item) {
                item[attr] && arr.push(item[attr]);
            });
            return arr.join(',');
        };

        // 新增系统管理员
        $scope.addNewAccount = function() {
            // parent.angular.element(parent.$('#tabs')).scope().addTab('新增系统管理员', '', 'addNewAccount');
        };
        // 批量删除
        $scope.batchDeleteAccount = function(item) {
            if (item) {
                var param = {
                    'systemUserIds': item.SYSTEM_USER_ID,
                    'staffIds': item.STAFF_ID
                };
                httpMethod.batchDeleteAccount(param).then(function(rsp) {
                    if (rsp.success) {
                        swal({
                            title: '恭喜你.',
                            text: '删除成功',
                            type: 'success',
                            confirmButtonText: '确定'
                        }, function() {
                            $timeout(function() {
                                $scope.orderQuery();
                            });
                        });
                    } else {
                        swal({
                            title: 'Sorry.',
                            text: '删除失败',
                            timer: 1000,
                            showConfirmButton: false
                        });
                    }
                });
            } else {
                if (!$scope.checkedAdminInfo.length) {
                    swal({
                        title: '操作提醒',
                        text: '你没有选择任何项',
                        timer: 1000,
                        showConfirmButton: false
                    });
                    return;
                };
                var param = {
                    'systemUserIds': getAttributeSerial('SYSTEM_USER_ID', $scope.checkedAdminInfo),
                    'staffIds': getAttributeSerial('STAFF_ID', $scope.checkedAdminInfo)
                };
                httpMethod.batchDeleteAccount(param).then(function(rsp) {
                    if (rsp.success) {
                        swal({
                            title: '恭喜你.',
                            text: '批量删除成功',
                            type: 'success',
                            confirmButtonText: '确定'
                        }, function() {
                            $timeout(function() {
                                $scope.checkedAdminInfo = [];
                                $scope.orderQuery();
                            });
                        });
                    } else {
                        swal({
                            title: 'Sorry.',
                            text: '批量删除失败',
                            timer: 1000,
                            showConfirmButton: false
                        });
                    }
                });
            }
        };
        // 批量启用
        $scope.batchStartAccount = function() {
            if (!$scope.checkedAdminInfo.length) {
                swal({
                    title: '操作提醒',
                    text: '你没有选择任何项',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            };
            var param = {
                'systemUserIds': getAttributeSerial('SYSTEM_USER_ID', $scope.checkedAdminInfo),
                'staffIds': getAttributeSerial('STAFF_ID', $scope.checkedAdminInfo)
            };
            httpMethod.batchStartAccount(param).then(function(rsp) {
                if (rsp.success) {
                    swal({
                        title: '恭喜你.',
                        text: '批量启用成功',
                        type: 'success',
                        confirmButtonText: '确定'
                    }, function() {
                        $timeout(function() {
                            $scope.checkedAdminInfo = [];
                            $scope.orderQuery();
                        });
                    });
                } else {
                    swal({
                        title: 'Sorry.',
                        text: '批量启用失败',
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            });
        };
        // 批量停用
        $scope.batchStopAccount = function() {
            if (!$scope.checkedAdminInfo.length) {
                swal({
                    title: '操作提醒',
                    text: '你没有选择任何项',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            };
            var param = {
                'systemUserIds': getAttributeSerial('SYSTEM_USER_ID', $scope.checkedAdminInfo),
                'staffIds': getAttributeSerial('STAFF_ID', $scope.checkedAdminInfo)
            };
            httpMethod.batchStopAccount(param).then(function(rsp) {
                if (rsp.success) {
                    swal({
                        title: '恭喜你.',
                        text: '批量停用成功',
                        type: 'success',
                        confirmButtonText: '确定'
                    }, function() {
                        $timeout(function() {
                            $scope.checkedAdminInfo = [];
                            $scope.orderQuery();
                        });
                    });
                } else {
                    swal({
                        title: 'Sorry.',
                        text: '批量停用失败',
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            });
        };
        // 详情
        $scope.detailAccounts = function(item) {
            $scope.$emit('openDetailAccountsModal', item);
        };
    }])
    // 弹出框
    .controller('addAdjustInModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 详情
        $scope.$on('openDetailAccountsModal', function(d, data) {
            $ctrl.openDetailAccountsModal(data);
        });


        $ctrl.openDetailAccountsModal = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title',
                ariaDescribedBy: 'serial-number-body',
                templateUrl: 'detailAccountsModal.html',
                controller: 'detailAccountsModalCtrl',
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
    .controller('detailAccountsModalCtrl', function($uibModalInstance, $scope, $timeout, items, httpMethod) {
        var $ctrl = this;
        $ctrl.items = items;
        $ctrl.password = '';
        $ctrl.telephone = '';
        $ctrl.remark = '';

        $ctrl.ok = function() {
            if (!$ctrl.password.trim()) {
                swal({
                    title: '操作提醒',
                    text: '登录密码不能为空',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            };
            if (!$ctrl.telephone.trim()) {
                swal({
                    title: '操作提醒',
                    text: '捆绑手机号码不能为空',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            };
            if (!/^0{0,1}(13[0-9]|15[7-9]|153|156|17[0-9]|18[7-9])[0-9]{8}$/.test($ctrl.telephone)) {
                swal({
                    title: '操作提醒',
                    text: '捆绑手机号码不正确',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            };
            var param = {
                'staffId': $ctrl.items.STAFF_ID,
                'systemUserId': $ctrl.items.SYSTEM_USER_ID,
                'password': $ctrl.password,
                'telephone': $ctrl.telephone,
                'remark': $ctrl.remark
            };
            httpMethod.updateSystemUserBaseInfo(param).then(function(rsp) {
                if (rsp.success) {
                    swal({
                        title: '恭喜你.',
                        text: '修改管理员信息成功',
                        type: 'success',
                        confirmButtonText: '确定'
                    }, function() {
                        $timeout(function() {
                            // TODO 刷新
                        });
                    });
                } else {
                    swal({
                        title: 'Sorry.',
                        text: '修改管理员信息失败',
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            });
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    // 城市
    .controller('cityCheckCtrl', ['$scope', '$rootScope', 'httpMethod', function($scope, $rootScope, httpMethod) {
        httpMethod.qryRegion().then(function(rsp) {
            if (rsp.success) {
                $scope.citys = rsp.data;
            };
        });

        $scope.visible = false;
        $scope.provinceIndex = '';

        $scope.cityCheck = function() {
            $scope.visible = !$scope.visible;
        }
        $scope.clHide = function() {
            $scope.visible = false;
        }
        $scope.handleSelectCity = function(item, index) {
            $scope.provinceIndex = index;
            $rootScope.area = item;
            $scope.clHide();
        };
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            $scope.orderQuery($scope.currentPage);
        };
    }]);
