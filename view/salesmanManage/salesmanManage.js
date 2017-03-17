angular
    .module('salesmanManageModule', ['ui.bootstrap'])
    .run(['$rootScope', '$log', 'httpMethod', function($rootScope, $log, httpMethod) {
        $rootScope.staffId='';
        var param ={
            staffId : _.get($rootScope, 'staffId')
        }
        httpMethod.qryPostRole(param).then(function(rsp) {
            $log.log('调用获取角色接口成功.');
            if (rsp.success) {
                $rootScope.roleId = rsp.data.POST_ROLE_LEVEL;

                if($rootScope.roleId === 12 || $rootScope.roleId === 13){
                    var id = window.frameElement && window.frameElement.id || '',
                        obj = parent.$('#' + id).attr('data');
                    $rootScope.storeManList = obj ? JSON.parse(obj) : {};

                    $rootScope.storeManList ={
                        CHANNEL_ID:'',
                        REGION_NAME:'南京',
                        CHANNEL_NAME:'面装至机',
                        CHANNEL_NBR:'350000198204097569'
                    }
                }else if($rootScope.roleId === 51){
                    var param ={
                        staffId : 'staffId'
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
                }  
            } else {
                swal("OMG", rsp.msg || "调用获取角色接口失败!", "error");
            }
        }, function() {
            $log.log('调用获取角色接口失败.');
        });      
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

        // 根据staffId，获取门店信息
        httpMethod.qryStaffInfo = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryStaffInfo',
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

        // 批量/单个删除动作接口
        httpMethod.batchDeleteAccount = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/u/batchDeleteAccount',
                method: 'POST',
                headers: httpConfig.requestHeader,
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

        // 批量启用接口
        httpMethod.batchStartAccount = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/u/batchStartAccount',
                method: 'POST',
                headers: httpConfig.requestHeader,
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

        // 批量停用接口
        httpMethod.batchStopAccount = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/u/batchStopAccount',
                method: 'POST',
                headers: httpConfig.requestHeader,
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
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryPostRole', {
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
                },{
                    'POST_ROLE_ID': '',
                    'NAME': '',
                    'POST_ROLE_LEVEL': 51
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
                    'CHANNEL_ID':'@id',
                    'REGION_NAME':'@city',
                    'CHANNEL_NAME':'@cword(4)',
                    'CHANNEL_NBR':'@id'
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
                    'total|10': 10
                },
                'errors': null
            });  
        }
        return httpMethod;
    }])

    .controller('allQueryCtrl', ['$scope','$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        // 查询结果分页信息
        $scope.curPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalSize = 0; // 总条数
        $scope.maxSize = 5; // 最大展示页数

        $scope.$on('pageChange', function() {
            $scope.curPage = 1;
        });

        var param = {
            curPage: $scope.curPage, // 当前页
            pageSize: $scope.rowNumPerPage, // 每页展示行数, //每页条数
            CHANNEL_ID: _.get($rootScope, 'storeManList.CHANNEL_ID'),
        };
        httpMethod.qryStaffInShop(param).then(function(rsp) {
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
    }])

    // 查询结果控制器
    .controller('salemanSetupCtrl', ['$scope', '$rootScope', 'httpMethod', '$log', function ($scope, $rootScope, httpMethod, $log) {

        // 修改
        $scope.editStoreman = function (title, index) {
            $rootScope.isDisable = true;
            $rootScope.modifiedStoreman = $rootScope.querySupplierResultList[index];
            $rootScope.modalTitle = title;
            // parent.angular.element(parent.$('#tabs')).scope().addTab('添加店员', '/storeInvoicing/view/addNewSalesman/addNewSalesman.html', 'modifiedStoreman', JSON.stringify(item));

        };
        // 新建
        $scope.addStoreman = function (title) {
            $rootScope.isDisable = false;
            $rootScope.modifiedStoreman = {};
            $rootScope.modalTitle = title;
            // parent.angular.element(parent.$('#tabs')).scope().addTab('修改店员', '/storeInvoicing/view/addNewSalesman/addNewSalesman.html', 'modifiedStoreman', JSON.stringify(item));
        };

        /**
         * [check 复选框点击事件]
         * @param  {[type]} val [整行数据]
         * @param  {[boolean]} chk [是否选中]
         */
        $scope.check = function (val, chk) {
            var valueOfIndex = '';
            $scope.checkedStoreman.length && $scope.checkedStoreman.map(function (item, index) {
                if (item.systemUserId == val.systemUserId) {
                    valueOfIndex = index;
                }
            });
            chk ? valueOfIndex === '' && $scope.checkedStoreman.push(val) : $scope.checkedStoreman.splice(valueOfIndex, 1);
        };

        // 批量删除/单个删除
        $scope.deleteStoreman = function(systemUserId) {
            if (systemUserId) {
                var param = {
                    systemUserIds: systemUserId,//供货商状态（1000:启用 -1:停用 -2:删除）
                    staffIds: ''//供货商ID（多个已逗号分隔）
                };
                swal({
                    title: '删除操作',
                    text: '确定要删除吗?',
                    type: 'info',
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: '确定',
                    confirmButtonColor: '#ffaa00',
                    cancelButtonText: '取消',
                    showLoaderOnConfirm: true
                }, function() {
                    httpMethod.batchDeleteAccount(param).then(function(rsp) {
                        // $log.log('调用供货商启用/停用/删除接口成功.');
                        if (rsp.success) {
                            swal({
                                title: '操作成功',
                                text:  '删除成功!',
                                type: 'success',
                                confirmButtonText: '确定',
                                confirmButtonColor: '#ffaa00'
                            }, function() {
                                $scope.$emit('requery');
                            });
                        } else {
                            swal('OMG', rsp.msg || '删除失败!', 'error');
                        }
                    }, function() {
                        swal('OMG', rsp.msg || '删除失败!', 'error');
                    });
                });
            } else {
                if ($scope.checkedStoreman.length) {
                    var param = {
                            systemUserIds: '', //商品状态（1:上架0:下架-1:删除）
                            staffIds: '' //商品ID（多个已逗号分隔）
                        };
                    var systemUserIdList = [],
                        staffIdList = [];
                    $scope.checkedStoreman.map(function(item) {
                        systemUserIdList.push(_.get(item, 'systemUserId'));
                        staffIdList.push(_.get(item, 'staffId'));
                    });
                    param.supplierIds = supplierIdList.join();
                    param.staffIds = staffIdList.join();

                    swal({
                        title: '批量删除操作',
                        text: '确定要批量删除吗?',
                        type: 'info',
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: '确定',
                        confirmButtonColor: '#ffaa00',
                        cancelButtonText: '取消',
                        showLoaderOnConfirm: true
                    }, function() {
                        httpMethod.batchDeleteAccount(param).then(function(rsp) {
                            if (rsp.success) {
                                swal({
                                    title: '操作成功',
                                    text: '批量删除成功!',
                                    type: 'success',
                                    confirmButtonText: '确定',
                                    confirmButtonColor: '#ffaa00'
                                }, function() {
                                    $scope.$emit('requery');
                                });
                            } else {
                                swal('OMG', rsp.msg || '批量删除失败!', 'error');
                            }
                        }, function() {
                            swal('OMG', rsp.msg || '批量删除失败!', 'error');
                        });
                    });
                } else {
                    swal('操作提醒', '您没有选中任何需要操作的店员！', 'info');
                }
            }
        };
        
        //批量启用
        $scope.batchStartAccount = function(systemUserId) {
            var param = {
                    systemUserIds: '', //商品状态（1:上架0:下架-1:删除）
                    staffIds: '' //商品ID（多个已逗号分隔）
                };
            var systemUserIdList = [],
                staffIdList = [];
            $scope.checkedStoreman.map(function(item) {
                systemUserIdList.push(_.get(item, 'systemUserId'));
                staffIdList.push(_.get(item, 'staffIds'));
            });
            param.supplierIds = supplierIdList.join();
            param.staffIds = staffIdList.join();

            swal({
                title: '启用操作',
                text: '确定要启用吗?',
                type: 'info',
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: '确定',
                confirmButtonColor: '#ffaa00',
                cancelButtonText: '取消',
                showLoaderOnConfirm: true
            }, function() {
                httpMethod.batchStartAccount(param).then(function(rsp) {
                    if (rsp.success) {
                        swal({
                            title: '操作成功',
                            text:'启用成功!',
                            type: 'success',
                            confirmButtonText: '确定',
                            confirmButtonColor: '#ffaa00'
                        }, function() {
                            $scope.$emit('requery');
                        });
                    } else {
                        swal('OMG', rsp.msg || '启用失败!', 'error');
                    }
                }, function() {
                    swal('OMG', rsp.msg || '启用失败!', 'error');
                });
            });    
        };

        //批量停用
        $scope.batchStopAccount = function(systemUserId) {
            var param = {
                    systemUserIds: '', 
                    staffIds: '' 
                };
            var systemUserIdList = [],
                staffIdList = [];
            $scope.checkedStoreman.map(function(item) {
                systemUserIdList.push(_.get(item, 'systemUserId'));
                staffIdList.push(_.get(item, 'staffId'));
            });
            param.supplierIds = supplierIdList.join();
            param.staffIds = staffIdList.join();

            swal({
                title: '停用操作',
                text: '确定要停用吗?',
                type: 'info',
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: '确定',
                confirmButtonColor: '#ffaa00',
                cancelButtonText: '取消',
                showLoaderOnConfirm: true
            }, function() {
                httpMethod.batchStopAccount(param).then(function(rsp) {
                    if (rsp.success) {
                        swal({
                            title: '操作成功',
                            text:'停用成功!',
                            type: 'success',
                            confirmButtonText: '确定',
                            confirmButtonColor: '#ffaa00'
                        }, function() {
                            $scope.$emit('requery');
                        });
                    } else {
                        swal('OMG', rsp.msg || '停用失败!', 'error');
                    }
                }, function() {
                    swal('OMG', rsp.msg || '停用失败!', 'error');
                });
            });    
        };
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.curPage = pageNo;
        };
        $scope.pageChanged = function(curPage) {
            !currentPage && $scope.$emit('pageChange');
            var param = {
                curPage: curPage || $scope.curPage, // 当前页
                pageSize: $scope.rowNumPerPage, // 每页展示行数, //每页条数
                CHANNEL_ID: _.get($rootScope, 'storeManList.CHANNEL_ID'),
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
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])