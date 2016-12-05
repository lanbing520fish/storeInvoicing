angular
    .module('orderChargeModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        var id = window.frameElement && window.frameElement.id || '',
            obj = parent.$('#' + id).attr('data'),
            isMock = true;
        $rootScope.modifiedOrderCharge = obj ? JSON.parse(obj) : {}; // 订单基本信息
        if (isMock) {
            $rootScope.modifiedOrderCharge = {
                "orderNo": "460000197611193508",
                "orderType": "1",
                "custName": "潘勇",
                "phoneNumber": "18976549888",
                "offerName": "",
                "staffName": "李辉",
                "channelName": "",
                "orderDate": "",
                "recoderTime": "",
                "dealFlag": "0",
                "terminalList": [{
                    "orderNo": "510000200312087317",
                    "terminalName": "孔霞",
                    "instCode": "34000019850515457X"
                }, {
                    "orderNo": "45000019950105642X",
                    "terminalName": "金敏",
                    "instCode": "230000197006165725"
                }, {
                    "orderNo": "310000200409107348",
                    "terminalName": "阎平",
                    "instCode": "41000019700421710X"
                }, {
                    "orderNo": "220000201203015635",
                    "terminalName": "范涛",
                    "instCode": "630000200608234344"
                }, {
                    "orderNo": "820000199506098759",
                    "terminalName": "王娜",
                    "instCode": "710000197501196670"
                }, {
                    "orderNo": "370000200501265358",
                    "terminalName": "苏秀英",
                    "instCode": "350000198404169715"
                }, {
                    "orderNo": "650000201106125058",
                    "terminalName": "谭平",
                    "instCode": "51000019810127258X"
                }, {
                    "orderNo": "810000200004238559",
                    "terminalName": "姚强",
                    "instCode": "610000199701135878"
                }],
                "infoList": [{
                    "orderNo": "540000198303202550",
                    "feeItemName": "为几性点",
                    "amount": "1000",
                    "chargeFlag": "N"
                }, {
                    "orderNo": "330000200512074728",
                    "feeItemName": "如地形象",
                    "amount": "2000",
                    "chargeFlag": "Y"
                }, {
                    "orderNo": "530000198405031949",
                    "feeItemName": "约们明此",
                    "amount": "1500",
                    "chargeFlag": "Y"
                }]
            }
        }
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpMethod = {},
            isMock = true;
        httpMethod.comfirmCashOrder = function(param) {
            var defer = $q.defer();
            $http({
                url: 'http://192.168.74.17:8088/cash/offer/o/comfirmCashOrder',
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
            Mock.mock('http://192.168.74.17:8088/cash/offer/o/comfirmCashOrder', {
                'flag|1': ['0', '1'], // 0成功 1失败
                'msg': '' // 错误原因
            })
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
    .controller('orderChargeCtrl', ['$scope', '$rootScope', 'httpMethod', function($scope, $rootScope, httpMethod) {
        var amountUncollected = 0;
        _.map($rootScope.modifiedOrderCharge.infoList, function(item) {
            if (item.chargeFlag == 'N') {
                amountUncollected += item.amount;
            }
        })
        $scope.uncollected = amountUncollected; // 未收费总金额

        $scope.cashAmount = 0; // 现金支付金额
        $scope.posAmount = 0; // pos支付金额
        $scope.posNo = ''; // pos单据号

        $scope.remark = ''; // 备注
        $scope.comfirmCashOrder = function() {
            debugger
            var param = {
                'orderId': '', //订单号码
                'retailShopId': '', //门店ID
                'staffId': '', //员工ID
                'remark': $scope.remark, //备注
                'receiveList': [{
                    'itemName': '现金', //方式
                    'itemPrice': $scope.cashAmount, //金额
                    'itemOrder': '' //单据号
                }, {
                    'itemName': 'POS机', //方式
                    'itemPrice': $scope.posAmount, //金额
                    'itemOrder': $scope.posNo //单据号
                }]
            }

            httpMethod.comfirmCashOrder(param).then(function(rsp) {
                if (!rsp.flag) {
                    swal({
                        title: "操作成功",
                        text: "确认收银成功!",
                        type: "success",
                        confirmButtonText: "确定",
                        confirmButtonColor: "#ffaa00"
                    });
                } else {
                    swal("OMG", rsp.msg || "确认收银失败!", "error");
                }
            }, function() {
                $log.log('调用确认收银成功接口失败.');
            });
        }
    }])
