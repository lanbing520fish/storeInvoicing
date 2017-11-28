angular
    .module('salesmanManageModule', ['ui.bootstrap'])
    .run(['$rootScope', '$log', 'httpMethod', function($rootScope, $log, httpMethod) {
        $rootScope.staffId = '';
    }])

    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://127.0.0.1:28088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        // 根据staffId，获取角色信息
        httpMethod.qryPostRole = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryPostRole',
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

        // 根据staffId，获取门店信息
        httpMethod.qryStaffInfo = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryStaffInfo',
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

        // 店员管理（配置）查询接口
        httpMethod.qryStaffInShop = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryStaffInShop',
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

        // 批量/单个删除动作接口
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

        // 批量启用接口
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

        // 批量停用接口
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

        // 店员信息修改
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
            // 根据staffId，获取角色信息
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryPostRole', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|+1': [{
                    'POST_ROLE_ID': '',
                    'NAME': '',
                    'POST_ROLE_LEVEL': 51
                }, {
                    'POST_ROLE_ID': '',
                    'NAME': '',
                    'POST_ROLE_LEVEL': 13
                }, {
                    'POST_ROLE_ID': '',
                    'NAME': '',
                    'POST_ROLE_LEVEL': 12
                }],
                'errors': null
            });

            // 根据staffId，获取门店信息
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryStaffInfo', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'CHANNEL_ID': '@id',
                    'REGION_NAME': '@city',
                    'CHANNEL_NAME': '@cword(4)',
                    'CHANNEL_NBR': '@id',
                    'COMMON_REGION_ID': '@id'
                },
                'errors': null
            });

            // 店员管理（配置）查询接口
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryStaffInShop', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'list|4': [{
                        'SYSTEM_USER_ID': '@id',
                        'SYSTEM_USER_CODE': '@id',
                        'MOBILE_TEL': '1372892983', // 商户id
                        'STAFF_ID': '@cword(4)', // 经营主体名称
                        'STAFF_NAME': '@cword(4)',
                        'STAFF_CODE': '@id',
                        'RETAIL_SHOP_ID': '@id',
                        'RETAIL_SHOP_NAME': '@cword(4)',
                        'CHANNEL_ID': '@id',
                        'BIZMAN_ID': '@id',
                        'STAFF_ROLE': '@cword(4)',
                        'STATUS_CD': '@id',
                        'STATUS_NAME': '@cword(4)',
                        'REMARK': '@cword(8)',
                        'VERSION': '@date'
                    }],
                    'total|100': 10
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

            // 店员信息修改
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

    .controller('allQueryCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        // 查询结果分页信息
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalSize = 0; // 总条数
        $scope.maxSize = 5; // 最大展示页数

        $scope.orderQuery = function(currentPage) {
            !currentPage && $scope.$broadcast('pageChange');
            var param = {
                curPage: $scope.curPage, // 当前页
                pageSize: $scope.rowNumPerPage, // 每页展示行数, //每页条数
                channelId: _.get($rootScope, 'storeManList.CHANNEL_ID')
            };
            httpMethod.qryStaffInShop(param).then(function(rsp) {
                $log.log(param)
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
        };

        var param = {
            staffId: _.get($rootScope, 'staffId')
        }
        httpMethod.qryPostRole(param).then(function(rsp) {
            $log.log('调用获取角色接口成功.');
            if (rsp.success) {

                $rootScope.roleId = rsp.data.POST_ROLE_LEVEL;

                if ($rootScope.roleId === 12 || $rootScope.roleId === 13) {
                    var id = window.frameElement && window.frameElement.id || '',
                        obj = parent.$('#' + id).attr('data');
                    $rootScope.storeManList = obj ? JSON.parse(obj) : {};
                    $rootScope.storeManList = {
                        CHANNEL_ID: 11122,
                        REGION_NAME: '南京',
                        CHANNEL_NAME: '面装至机',
                        CHANNEL_NBR: '350000198204097569'
                    }
                    $scope.orderQuery($scope.curPage);

                } else if ($rootScope.roleId === 51) {
                    var param = {
                        staffId: _.get($rootScope, 'staffId')
                    }
                    httpMethod.qryStaffInfo(param).then(function(rsp) {
                        $log.log('调用获取门店信息接口成功.');
                        if (rsp.success) {
                            $rootScope.storeManList = rsp.data;
                        } else {
                            swal("OMG", rsp.msg || "调用获取门店信息接口失败!", "error");
                        }
                    }, function() {
                        $log.log('调用获取门店信息接口失败.');
                    });
                    $scope.orderQuery($scope.curPage);
                }
            } else {
                swal("OMG", rsp.msg || "调用获取角色接口失败!", "error");
            }
        }, function() {
            $log.log('调用获取角色接口失败.');
        });


    }])

    // 查询结果控制器
    .controller('salemanSetupCtrl', ['$scope', '$rootScope', 'httpMethod', '$timeout', '$log', function($scope, $rootScope, httpMethod, $timeout, $log) {
        // 修改
        $scope.editStoreman = function(item) {
            $scope.$emit('openDetailAccountsModal', item);
        };
        // 新建
        $scope.addStoreman = function() {
            $rootScope.storeInfoList = $rootScope.storeManList;
            // parent.angular.element(parent.$('#tabs')).scope().addTab('修改店员', '/storeInvoicing/view/addNewSalesman/addNewSalesman.html', 'storeInfoList', JSON.stringify($rootScope.storeInfoList));
        };

        $scope.checkedAdminInfo = [];
        $scope.checkAll = function(chk) {
            if (chk) {
                $scope.isChecked = true;
                $scope.checkedAdminInfo = _.clone($scope.storeResultList);
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
                                // $scope.isCheckedAll = false;
                                // $scope.isChecked = false;
                                // $scope.checkedAdminInfo = [];
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
                            $scope.isCheckedAll = false;
                            $scope.isChecked = false;
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
                            // $scope.isCheckedAll = false;
                            // $scope.isChecked = false;
                            // $scope.checkedAdminInfo = [];
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
    }])
    // 弹出框
    .controller('addAdjustInModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 修改
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
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            $scope.orderQuery($scope.currentPage);
        };
    }])
