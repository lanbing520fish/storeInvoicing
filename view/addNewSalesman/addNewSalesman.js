angular
    .module('addNewSalesmanModule', ['ui.bootstrap'])
    .run(['$rootScope',  function($rootScope) {
    	$rootScope.isChecked = false;
        $rootScope.checkAdminInfo = {};
        var id = window.frameElement && window.frameElement.id || '',
            obj = parent.$('#' + id).attr('data');
        $rootScope.storeInfoList = obj ? JSON.parse(obj) : {};

        $rootScope.checkAdminInfo = {
            'STAFF_ID': null, // 员工ID
            'STAFF_CODE': '', // 集团工号
            'PARTY_ID': null,
            'COMMON_REGION_ID': '', // 地区ID
            'STAFF_NAME': '', // 员工名称
            'SALES_CODE': '', // 员工编码
            'CHANNEL_ID': null, // 所属渠道ID
            'CHANNEL_NBR': null, // 所属渠道编码
            'CHANNEL_NAME': '', // 所属渠道
            'CHANNEL_CLASS': '',
            'CHANNEL_ID': $rootScope.storeInfoList.CHANNEL_ID, // 所属渠道ID
            'CHANNEL_NBR': $rootScope.storeInfoList.CHANNEL_NBR, // 所属渠道编码
            'CHANNEL_NAME': $rootScope.storeInfoList.CHANNEL_NAME, // 所属渠道
            'REGION_NAME': '', // 地区
            'REGION_CODE': '',
            'UP_REGION_ID': '',
            'AREA_LEVEL': ''
        };
        $rootScope.storeInfoList ={
            CHANNEL_NAME:'于务产月志切',
            CHANNEL_NBR:'350000198204097569',
            COMMON_REGION_ID:'123456',
            CHANNEL_ID:'54321'
        }
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

        // 条件查询接口
        httpMethod.qryStaffFromCrmLte = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryStaffFromCrmLte',
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

        // 新增管理员确认
        httpMethod.insertAdmin = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/a/insertAdmin',
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

        // 新增店员界面，获取单选的店员的各种角色
        httpMethod.qryStaffRoles = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryStaffRoles',
                method: 'POST',
                headers: httpConfig.requestHeader,
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
            // 条件查询接口
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryStaffFromCrmLte', {
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
                    'list|4': [{
                        'STAFF_ID': '@id',
                        'STAFF_CODE': '',
                        'PARTY_ID': null,
                        'COMMON_REGION_ID': '',
                        'STAFF_NAME': '@cname',
                        'SALES_CODE': '',
                        'CHANNEL_ID': null,
                        'CHANNEL_NBR': null,
                        'CHANNEL_NAME': '@cword(4)',
                        'CHANNEL_CLASS': '',
                        'OPERATORS_ID': '',
                        'OPERATORS_NBR': '',
                        'OPERATORS_NAME': '@cword(5)',
                        'REGION_NAME': '@city',
                        'REGION_CODE': '',
                        'UP_REGION_ID': '',
                        'AREA_LEVEL': ''
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

            // 新增管理员确认
            Mock.mock(httpConfig.siteUrl + '/chain/power/a/insertAdmin', {
                'rsphead': 's',
                'success|1': [true, false], //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': null,
                'errors': null
            });

            // 新增店员界面，获取单选的店员的各种角色
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryStaffRoles', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': [{
                    'TEXT':'店长',
                    'VALUE':51
                },{
                    'TEXT':'库管',
                    'VALUE':52
                },{
                    'TEXT':'收银员',
                    'VALUE':53
                },{
                    'TEXT':'销售员',
                    'VALUE':54
                }],
                'errors': null
            });
        }

        return httpMethod;
    }])   
    .controller('addNewInfoCtrl', ['$scope', '$rootScope', '$log', '$timeout', 'httpMethod', function($scope, $rootScope, $log, $timeout, httpMethod) {
        $scope.checkfor = function(isChecked) {
            $rootScope.isChecked = !isChecked;
        };
        httpMethod.qryStaffRoles().then(function(rsp) {
            $log.log('调用店员的各种角色接口成功.');
            if (rsp.success) {
                $scope.storeManRoleList = rsp.data;
            } else {
                swal("OMG", rsp.msg || "调用店员的各种角色接口失败!", "error");
            }
        }, function() {
            $log.log('调用店员的各种角色接口失败.');
        });

        // 选择员工
        $scope.chooseSalesman = function() {
            $scope.$emit('openStoreQueryTypeModal', $scope.checkAdminInfo);
        };

        $scope.account = '';
        $scope.password = '';
        $scope.repassword = '';
        $scope.phone = '';
        $scope.remarks = '';
        $scope.staffName = '';
        $scope.postRoleLevel = '';

        $scope.insertAdmin = function() {
            if ($rootScope.isChecked){                
                if (!$scope.staffName.trim()) {
                    swal({
                        title: '操作提醒',
                        text: '员工姓名不能为空',
                        timer: 1000,
                        showConfirmButton: false
                    });
                    return;
                };
                $scope.postRoleLevel = 54;
                var param = {
                    'adminType': 'jituan',
                    'staffName':$scope.staffName,
                    'commonRegionId':$rootScope.storeInfoList.COMMON_REGION_ID,
                    'remarks': $scope.remarks,
                    'channelNbr':$rootScope.storeInfoList.CHANNEL_NBR,
                    'channnelId':$rootScope.storeInfoList.CHANNEL_ID,
                    'shopUseSystemFlag':$scope.isChecked  
                };      
            }else{
                if (!$rootScope.checkAdminInfo.STAFF_ID) {
                    swal({
                        title: '操作提醒',
                        text: '请选择员工信息',
                        timer: 1000,
                        showConfirmButton: false
                    });
                    return;
                };
                if ($scope.password !== $scope.repassword) {
                    swal({
                        title: '操作提醒',
                        text: '两次输入密码不一致',
                        timer: 1000,
                        showConfirmButton: false
                    });
                    return;
                };
                if (!$scope.account.trim()) {
                    swal({
                        title: '操作提醒',
                        text: '系统账号不能为空',
                        timer: 1000,
                        showConfirmButton: false
                    });
                    return;
                };
                if (!$scope.password.trim()) {
                    swal({
                        title: '操作提醒',
                        text: '密码不能为空',
                        timer: 1000,
                        showConfirmButton: false
                    });
                    return;
                };
                if (!$scope.phone.trim()) {
                    swal({
                        title: '操作提醒',
                        text: '手机号码不能为空',
                        timer: 1000,
                        showConfirmButton: false
                    });
                    return;
                };
                if (!/^0{0,1}(13[0-9]|15[7-9]|153|156|17[0-9]|18[7-9])[0-9]{8}$/.test($scope.phone)) {
                    swal({
                        title: '操作提醒',
                        text: '手机号码不正确',
                        timer: 1000,
                        showConfirmButton: false
                    });
                    return;
                } 
                if (!$scope.postRoleLevel.trim()) {
                    swal({
                        title: '操作提醒',
                        text: '请选择店员角色',
                        timer: 1000,
                        showConfirmButton: false
                    });
                    return;
                };
               
                var param = {
                    'adminType': 'jituan',
                    'staffId': $scope.checkAdminInfo.STAFF_ID,
                    'account': $scope.account,
                    'password': $scope.password,
                    'phone': $scope.phone,
                    'postRoleLevel':$scope.postRoleLevel,
                    'commonRegionId':$rootScope.storeInfoList.COMMON_REGION_ID,
                    'remarks': $scope.remarks,
                    'channelNbr':$rootScope.storeInfoList.CHANNEL_NBR,
                    'channnelId':$rootScope.storeInfoList.CHANNEL_ID,
                    'shopUseSystemFlag':$scope.isChecked
                };
            }
            httpMethod.insertAdmin(param).then(function(rsp) {
                $log.log(param);
                if (rsp.success) {
                    swal({
                        title: '恭喜你.',
                        text: '新增管理员成功',
                        type: 'success',
                        confirmButtonText: '确定'
                    }, function() {
                        $timeout(function() {
                            parent.angular.element(parent.$('#tabs')).scope().removeTab();
                        });
                    });
                } else {
                    swal({
                        title: 'Sorry.',
                        text: '新增管理员失败',
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            });
        };
    }])
    // 弹出框
    .controller('addNewSalesmanModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;
        //对应经营主体
        $scope.$on('openStoreQueryTypeModal', function(d, data) {
            $ctrl.openStoreQueryTypeModal(data);
        });
        $ctrl.openStoreQueryTypeModal = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title',
                ariaDescribedBy: 'serial-number-body',
                templateUrl: 'storeQueryTypeModal.html',
                controller: 'storeQueryTypeModalCtrl',
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
    .controller('storeQueryTypeModalCtrl', function($uibModalInstance, $scope, $rootScope, items, httpMethod) {
        var $ctrl = this;
        $ctrl.staffName = '';
        $ctrl.salesCode = '';
        $ctrl.staffCode = '';
        $ctrl.operatorsName = '';
        $ctrl.operatorsNbr = '';

        $ctrl.currentPage = 1; //当前页
        $ctrl.rowNumPerPage = 4; //每页显示行数
        $ctrl.totalNum = 0; //总条数
        $ctrl.maxSize = 5; //最大显示页码数

        $ctrl.pageChanged = function() {
            $ctrl.keywordQuery($scope.currentPage);
        };

        //关键字查询
        $scope.keywordQuery = function() {
            var param = {
                'curPage': $ctrl.currentPage, //当前页,
                'pageSize': $ctrl.rowNumPerPage, //每页条数,
                'staffName': $ctrl.staffName,
                'salesCode': $ctrl.salesCode,
                'staffCode': $ctrl.staffCode,
                'channnelName': $rootScope.storeInfoList.CHANNEL_NAME,
                'channelNbr': $rootScope.storeInfoList.CHANNEL_NBR,
                'operatorsName': $ctrl.operatorsName,
                'operatorsNbr': $ctrl.operatorsNbr
            };

            httpMethod.qryStaffFromCrmLte(param).then(function(rsp) {
                
                if (rsp.success) {
                    $ctrl.resourceList = rsp.data.list;
                    $ctrl.totalNum = rsp.data.total;
                };
            });
        };

        $ctrl.todoChecked = {}; //待确认的选项
        //单选框选择
        $ctrl.check = function(item) {
            $ctrl.todoChecked = item;
        };

        $ctrl.ok = function() {
            _.assign(items, $ctrl.todoChecked);
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
            $scope.keywordQuery($scope.currentPage);
        };
    }])
    
