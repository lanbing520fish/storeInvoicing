'use strict';

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'mock', 'ui-bootstrap-tpls', 'angular-animate', 'echarts'], function(angular, $, httpConfig, swal, _, Mock, echarts) {

    angular
        .module('salesStatisticsModule', ['ui.bootstrap'])
        .run(['$rootScope', function($rootScope) {
            $rootScope.stepNum = 0; // 当前显示的step索引值（Number类型）
            $rootScope.goBack = function(num) {
                $rootScope.stepNum = 0;
            };
            $rootScope.forward = function(num) {
                $rootScope.stepNum = 1;
            };

            $rootScope.salesList = []; //列表内容
            $rootScope.sectionList = ["价位：0～300", "价位：300～700", "价位：700～1000", "价位：1000～1500", "价位：1500～2000", "价位：2000～3000", "价位：3000+"]; //价格区间

            $rootScope.cityList = []; //查询地区列表
            $rootScope.contactList = []; //查询商户列表


        }])

    /*传入数据*/
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
            var httpMethod = {};

            // 查询地区
            httpMethod.qryCommonRegionInfo = function() {
                var defer = $q.defer();
                $http({
                    url: 'http://192.168.16.84:8088/chain/terminal/q/qryCommonRegionInfo',
                    method: 'GET',
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
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
            // 查询商户
            httpMethod.qryBizmanByCon = function(param) {
                var defer = $q.defer();
                $http({
                    url: 'http://192.168.16.84:8088/chain/config/claim/q/qryBizmanByCon',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    data: param
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
            //查询终端分价位销量统计
            httpMethod.qrySalesStatisticsByCon = function() {
                var defer = $q.defer();
                $http({
                    url: 'http://192.168.16.84:8088/chain/form/q/qrySalesStatisticsByCon',
                    method: 'GET',
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    data: JSON.stringify(),
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

            //终端库存及库存周转分析
            httpMethod.qryStockAnalysisByCon = function() {
                var defer = $q.defer();
                $http({
                    url: 'http://192.168.16.84:8088/chain/form/q/qryStockAnalysisByCon',
                    method: 'GET',
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    data: JSON.stringify(),
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


            if (httpConfig.isMock) {
                // 地区查询
                Mock.mock('http://192.168.16.84:8088/chain/terminal/q/qryCommonRegionInfo', {
                    'areaId': '@id',
                    'areaLevel': ['1', '2', '3'], //(地区等级，1：国家，2:省，3，市)
                    'childrenCommon': [{ //(下一级地区列表)
                        'areaId': '@id',
                        'areaLevel|1-100': 3,
                        'childrenCommon': 'null',
                        'commonRegionId': '@id', //(区域id)
                        'createDate': "2013-04-15 11:46:11",
                        'idPrefix|1-100': 73,
                        'regionCode': "@id",
                        'regionDesc': "乌海市", //(区域详情)
                        'regionName': "乌海市", //(区域名称)
                        'upRegionId|1-100': 2, //(上一级commonRegionId)
                        'zipCode': "0473",
                        'zoneNumber': "17399",
                    }],
                    'commonRegionId|1-100': 2,
                    'createDate': "2013-04-15 11:46:11",
                    'idPrefix|90-99': 99,
                    'regionCode': "@id",
                    'regionDesc': "内蒙古自治区",
                    'regionName': "内蒙古",
                    'upRegionId': 'null',
                    'zipCode': "0000",
                    'zoneNumber': "2",
                });
                // 查询商户
                Mock.mock('http://192.168.16.84:8088/chain/config/claim/q/qryBizmanByCon', {
                    'endRow': 5,
                    'firstPage': 1,
                    'hasNextPage': 'true',
                    'hasPreviousPage': 'false',
                    'isFirstPage': 'true',
                    'isLastPage': 'false',
                    'lastPage': 2,
                    'list': [{ //(数据信息在这个list)
                        'areaId': 'null',
                        'bizmanCode': 'null',
                        'bizmanId': '54173', //(商户id)
                        'bizmanName': "德乐", //(经营主体名称)
                        'commonRegionId': 'null',
                        'email': 'null',
                        'identifyName': 'null',
                        'identifyNum': 'null',
                        'identifyType': 'null',
                        'linkNbr': 'null',
                        'manageStaff': 'null',
                        'oldBizmanName': 'null',
                        'operatorsId': 'null', //(经营主体id)
                        'operatorsName': "中国电信齐齐哈尔分公司", //(经营主体名称)
                        'operatorsNbr': "J12345212344", //(经营主体编码)
                        'parentBizman': 'null',
                        'regionName': "乌海市",
                        'remarks': 'null',
                        'retailShopName': 'null',
                        'staffName': 'null',
                        'statusCd': "1001",
                    }],
                    'navigatePages': '8',
                    'navigatepageNums': [{
                        '0': '1',
                        '1': '2',
                    }],
                    'nextPage': '2',
                    'pageNum': '1',
                    'pageSize': '5',
                    'pages': '2',
                    'prePage': '0',
                    'size': '5',
                    'startRow': '1',
                    'success': 'true',
                    'total': '10',
                });
                // 查询终端分价位销量统计
                Mock.mock('http://192.168.16.84:8088/chain/form/q/qrySalesStatisticsByCon', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data': {
                        'bizmanId': 'null', //(商户id)
                        'bizmanName': 'null', //(商户名称)
                        'channelId': 'null', //(渠道id)
                        'channelName': 'null', //(渠道名称)
                        'commonRegionId': 'null', //(区域id)
                        'etlTime': 'null',
                        'levelQty': 'null',
                        'numType': 'null',
                        'priceSeg': 'null',
                        'retailPrice': 'null',
                        'retailShopId': 'null',
                        'retailShopName': 'null', //(门店名称)
                        'saleMonth': "201607", //(月份信息，按月查询的时候用)
                        'saleTime': 'null', //(日期信息，按日查询时候用)
                        'salesQty': 'null',
                        'segList': [{ //(价位分类)
                            'priceSegment': '1', //(价位类型，从1到7)
                            'totalNum': '0', //(销量总和)
                        }],
                        'sellingPrice': 'null',
                        'statisticId': 'null',
                        'totalQty': 'null', //(销售总和)
                    },
                    'errors': null
                });
                // 终端库存及库存周转分析
                Mock.mock('http://192.168.16.84:8088/chain/form/q/qryStockAnalysisByCon', {
                    'bizmanId': 'null',
                    'bizmanName': 'null',
                    'channelId': 'null',
                    'channelName': 'null',
                    'commonRegionId': 'null',
                    'retailShopId': 'null',
                    'retailShopName': 'null',
                    'salesQty': 'null', //(当日销售总和)
                    'stockDuring': 'null', //(最近一周的销量总和)
                    'stockQty': 'null', //(库存总和)
                    'stockTime': "2016-11-10 00:00:00", //(统计月份)
                    'stockValue': 'null', //(库存价值总和)
                });
            }

            return httpMethod;
        }])
        /*传入数据*/

    .controller('storeQuery', ['$scope', '$rootScope', 'httpMethod', function($scope, $rootScope, httpMethod) {
            //门店所属商户
            $scope.openStoreQueryType = function() {
                $scope.$emit('openStoreQueryTypeModal');
            };

        }])
        // 弹出框
        .controller('addPurchaseModalCtrl', function($scope, $rootScope, $uibModal) {
            var $ctrl = this,
                modalInstance;
            $ctrl.animationsEnabled = true;

            //门店所属商户
            $scope.$on('openStoreQueryTypeModal', function(d, data) {
                $ctrl.openStoreQueryTypeModal(data);
            });

            $ctrl.openStoreQueryTypeModal = function(data) {
                modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    ariaLabelledBy: 'serial-number-title1',
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

    .controller('storeQueryTypeModalCtrl', function($uibModalInstance, $scope, items) {
            var $ctrl = this;
            $ctrl.ok = function() {
                $scope.$broadcast('submitCardRange');
                $uibModalInstance.close();
            };
            $ctrl.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
        .controller('monthConditionQuery', ['$scope', '$timeout', '$filter', function($scope, $timeout, $filter) {
            $scope.format = "yyyy年MM月";
            $scope.conditionQueryForm = {
                createStartDt: '', //制单日期开始
                createEndDt: '', //制单日期结束
            };

            // 时间控件

            $scope.startDateOptions = {
                formatYear: 'yy',
                minMode: 'month',
                minDate: '',
                maxDate: $scope.conditionQueryForm.createEndDt,
            };
            $scope.endDateOptions = {
                formatYear: 'yy',
                minMode: 'month',
                minDate: $scope.conditionQueryForm.createStartDt,
                maxDate: '',
            };

            $scope.$watch('conditionQueryForm.createStartDt', function(newValue) {
                $scope.endDateOptions.minDate = newValue;
                $scope.endDateOptions.maxDate = newValue ? moment(newValue).add(5, 'M') : null;
            });
            $scope.$watch('conditionQueryForm.createEndDt', function(newValue) {
                $scope.startDateOptions.maxDate = newValue;
                $scope.startDateOptions.minDate = newValue ? moment(newValue).subtract(5, 'M') : null;
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
        }])
        .controller('conditionQuery', ['$scope', '$timeout', function($scope, $timeout) {

            $scope.conditionQueryForm = {
                createStartDt: '', //制单日期开始
                createEndDt: '', //制单日期结束
            };

            // 时间控件
            $scope.startDateOptions = {
                formatYear: 'yy',
                maxDate: $scope.conditionQueryForm.createEndDt,
                startingDay: 1
            };
            $scope.endDateOptions = {
                formatYear: 'yy',
                minDate: $scope.conditionQueryForm.createStartDt,
                startingDay: 1
            };

            $scope.$watch('conditionQueryForm.createStartDt', function(newValue) {
                $scope.endDateOptions.minDate = newValue;
                $scope.endDateOptions.maxDate = newValue ? moment(newValue).add(5, 'd') : null;
            });
            $scope.$watch('conditionQueryForm.createEndDt', function(newValue) {
                $scope.startDateOptions.maxDate = newValue;
                $scope.startDateOptions.minDate = newValue ? moment(newValue).subtract(5, 'd') : null;
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
        }])
        // 弹框内城市
        .controller('bouncedCityCheckCtrl', ['$scope', '$rootScope', 'httpMethod', function($scope, $rootScope, httpMethod) {
            // 查询地区信息
            httpMethod.qryCommonRegionInfo().then(function(rsp) {
                console.log('调用查询地区接口成功.');
                $rootScope.citys = rsp.data;
            }, function() {
                console.log('调用查询地区接口失败.');
            });

            $scope.visible = false;
            $scope.key = 1;
            $scope.provinceIndex = '';
            $scope.cityIndex = '';
            $scope.areaId = '';
            $scope.provinceName = '';
            $scope.cityName = '';
            $scope.checkedAreaName = '';

            $scope.cityCheck = function() {
                $scope.visible = !$scope.visible;
            }
            $scope.handleSelectCity = function(level, index, areaId, areaName) {
                var me = this;
                switch (level) {
                    case 'province':
                        $scope.key = 2;
                        $scope.provinceIndex = index;
                        $scope.provinceName = areaName;
                        break;
                    case 'city':
                        $scope.cityIndex = index;
                        $scope.areaId = areaId;
                        $scope.cityName = areaName;
                        me.handleSubmitBtn(level);
                        break;
                }
            };
            $scope.handleSubmitBtn = function(level) {
                var me = this;
                switch (level) {
                    case 'province':
                        $scope.checkedAreaName = $scope.provinceName;
                        break;
                    case 'city':
                        $scope.checkedAreaName = $scope.provinceName + ' ' + $scope.cityName;
                        $scope.visible = false;
                        break;
                }
            }
        }])
        // 城市
        .controller('cityCheckCtrl', ['$scope', '$rootScope', 'httpMethod', function($scope, $rootScope, httpMethod) {

            $scope.cityClose = function() {
                $scope.visible = !$scope.visible;
            };
            $scope.clHide = function() {
                $scope.visible = false;
            };

            // 查询地区信息
            httpMethod.qryCommonRegionInfo().then(function(rsp) {
                console.log('调用查询地区接口成功.');
                $rootScope.cityList = rsp.data;
            }, function() {
                console.log('调用查询地区接口失败.');
            });

            $scope.selectedRow = null; //一级索引值
            $scope.selectedRowb = null; //二级索引值
            $scope.selectedProvince = '',
                $scope.selectedCity = '',
                $scope.selectedArea = '',
                $scope.checkedAreaName = '';

            $scope.selectProvince = function(index, item) {
                $scope.selectedRow = index;
                $scope.selectedRowb = null;
                $scope.selectedProvince = item.regionName;
                $scope.selectedCity = '';
                $scope.selectedArea = '';
            };

            $scope.selectCity = function(rowb, item) {
                event.stopPropagation();
                $scope.selectedRowb = rowb;
                $scope.selectedCity = ' - ' + item.regionName;
                $scope.selectedArea = '';
            };

            $scope.selectArea = function(rowb, item) {
                event.stopPropagation();
                $scope.selectedArea = ' - ' + item.regionName;
            };

            $scope.cityChecked = function() {
                $scope.checkedAreaName = $scope.selectedProvince + $scope.selectedCity + $scope.selectedArea;
                $scope.visible = !$scope.visible;
            };


        }])

    // 弹窗内查询控制器
    .controller('queryStoreFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {

        $scope.isForbid = true;
        $scope.queryStoreForm = {
            bizmanName: '', //门店名称
            bizmanId: '', //商户id
            areaId: '', //地区
        };

        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.curPage = 1; // 当前页
        $scope.pageSize = 10; // 每页显示行数
        $scope.totalSize = 0; // 总条数


        $scope.queryStoreFormSubmit = function(curPage) {
            !curPage && $scope.$broadcast('pageChange');
            $scope.checkedSys = []; // 置空已选业务模型列表

            var param = {
                // requirePaging: $scope.requirePaging, // 是否需要分页
                curPage: curPage || $scope.curPage, // 当前页
                pageSize: $scope.pageSize, // 每页显示行数
                totalSize: $scope.totalSize, //总条数
                bizmanId: undefined,
                bizmanName: undefined,
                areaId: undefined,
                cityId: undefined,
            };
            $scope.queryStoreForm.bizmanId ? param.bizmanId = $scope.queryStoreForm.bizmanId : undefined;
            $scope.queryStoreForm.bizmanName ? param.bizmanName = $scope.queryStoreForm.bizmanName : undefined;
            // $scope.queryStoreForm.areaIdItem ? param.areaId = $scope.queryStoreForm.areaIdItem.areaId : undefined;
            // $scope.queryStoreForm.cityIdItem ? param.cityId = $scope.queryStoreForm.cityIdItem.cityId : undefined;

            // 查询商户信息
            httpMethod.qryBizmanByCon(param).then(function(rsp) {
                console.log('调用查询商户信息接口成功.');
                $rootScope.contactList = rsp.list;
            }, function() {
                console.log('调用查询商户信息接口失败.');
            });
        }
        $scope.$watch('queryStoreForm', function(current, old, scope) {
            if (scope.queryStoreForm.bizmanId || scope.queryStoreForm.bizmanName) {
                scope.isForbid = false;
            } else {
                scope.isForbid = true;
            }
        }, true)
    }])

    /*echarts图标1*/
    .controller('monthLineCtrl', function($rootScope, $scope, $log) {
            $scope.xData = [];
            $scope.series = new Array(8);
            $scope.legend = [];

            $scope.queryFormSubmit = function() {
                $scope.shuzu = []; // 放置数据库查询回来的数据
                $scope.legend = [];
                $scope.xAxis = [];
                $scope.series = [];

                httpMethod.qrySalesStatisticsByCon().then(function(rsp) {
                    debugger
                    console.log('调用终端分价位销量统计接口成功.');
                    $rootScope.salesList = rsp.data;
                }, function() {
                    console.log('调用终端分价位销量统计接口失败.');
                });

                _.map($rootScope.salesList, function(elem, index) {
                    $scope.xAxis.push(elem.date);
                    $scope.shuzu.push(elem.sales);
                    _.map(elem.sales, function(item, i) {
                        switch (i) {
                            case 0:
                                $scope.series[0].push(item);
                                break;
                            case 1:
                                $scope.series[1].push(item);
                                break;
                            case 2:
                                $scope.series[2].push(item);
                                break;
                            case 3:
                                $scope.series[3].push(item);
                                break;
                            case 4:
                                $scope.series[4].push(item);
                                break;
                            case 5:
                                $scope.series[5].push(item);
                                break;
                            case 6:
                                $scope.series[6].push(item);
                                break;
                        }
                    })
                });
                $scope.series[7] = [180, 200, 200, 200, 400, 190];
                //更新数据
                $scope.legend = ['[0,300]', '[300,700]', '[700,1000]', '[1000,1500]', '[1500,2000]', '[2000,3000]', '[3000+]', '总销量'];
            };

        })
        .directive('monthline', function() {
            return {
                scope: {
                    id: "@",
                    series: "=", // series数据
                    xData: "=", // X轴
                    legend: "=" // 图例
                },
                restrict: 'E',
                template: '<div style="width:100%; height:300px;"></div>',
                replace: true,
                link: function($scope, element, attrs, controller) {
                    debugger
                    var option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data: $scope.legend,
                            width: 400,
                            left: 'center',
                            itemHeight: 8
                        },
                        color: ['#b770ff', '#9f9f9f', '#fbbb0b', '#3f92e7', '#4bc863', '#99c3f4', '#fd5c5c', '#41c9eb'],
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        yAxis: {
                            show: false,
                            type: '',
                            // max: 300
                        },
                        xAxis: {
                            type: 'category',
                            data: $scope.xAxis,
                        },
                        series: [{
                            name: '[0,300]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arra
                        }, {
                            name: '[300,700]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arrb
                        }, {
                            name: '[700,1000]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arrc
                        }, {
                            name: '[1000,1500]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arrd
                        }, {
                            name: '[1500,2000]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arre
                        }, {
                            name: '[2000,3000]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arrf
                        }, {
                            name: '[3000+]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arrg
                        }, {
                            name: '总销量',
                            type: 'line',
                            stack: '总销量',
                            symbol: 'circle',
                            label: {
                                normal: {
                                    show: false,
                                    // position: ''
                                }
                            },
                            textStyle: {
                                fontSize: 12,
                                color: '#000'
                            },
                            data: $scope.total
                        }]
                    };
                    myChart = echarts.init(document.getElementById($scope.id), 'macarons');
                    myChart.setOption(option);
                }
            }
        })

    /*echarts图标2*/
    .controller('dayLineCtrl', function($rootScope, $scope, $log) {
            $scope.legend = [];
            $scope.xAxis = [];
            $scope.shuzub = [];
            $scope.total = [];
            $scope.queryFormSubmit = function() {
                $scope.legend = [];
                $scope.xAxis = [];
                $scope.shuzu = [];
                $scope.arra = [];
                $scope.arrb = [];
                $scope.arrc = [];
                $scope.arrd = [];
                $scope.arre = [];
                $scope.arrf = [];
                $scope.arrg = [];
                $scope.total = [0, 0, 0, 0, 0, 0];
                $rootScope.daysalesList = [{
                    date: '2016/01/01',
                    sales: [11, 21, 31, 41, 51, 61, 71],
                }, {
                    date: '2016/02/01',
                    sales: [12, 22, 32, 42, 52, 62, 72],
                }, {
                    date: '2016/03/01',
                    sales: [13, 23, 33, 43, 53, 63, 73],
                }, {
                    date: '2016/04/01',
                    sales: [14, 24, 34, 44, 54, 64, 74],
                }, {
                    date: '2016/05/01',
                    sales: [15, 25, 35, 45, 55, 65, 75],
                }, {
                    date: '2016/06/01',
                    sales: [16, 26, 36, 46, 56, 66, 76],
                }];

                _.map($rootScope.daysalesList, function(elem, index) {
                    $scope.xAxis.push(elem.date);
                    $scope.shuzub.push(elem.sales);
                    _.map(elem.sales, function(item, i) {
                        switch (i) {
                            case 0:
                                $scope.arra.push(item);
                                break;
                            case 1:
                                $scope.arrb.push(item);
                                break;
                            case 2:
                                $scope.arrc.push(item);
                                break;
                            case 3:
                                $scope.arrd.push(item);
                                break;
                            case 4:
                                $scope.arre.push(item);
                                break;
                            case 5:
                                $scope.arrf.push(item);
                                break;
                            case 6:
                                $scope.arrg.push(item);
                                break;
                        }
                    })
                });
                $scope.total = [180, 200, 200, 200, 400, 190]
                    //更新数据
                $scope.legend = ['[0,300]', '[300,700]', '[700,1000]', '[1000,1500]', '[1500,2000]', '[2000,3000]', '[3000+]', '总销量']
                var option = daymyChart.getOption();
                option.legend[0].data = $scope.legend;
                option.xAxis[0].data = $scope.xAxis;
                option.series[0].data = $scope.arra;
                option.series[1].data = $scope.arrb;
                option.series[2].data = $scope.arrc;
                option.series[3].data = $scope.arrd;
                option.series[4].data = $scope.arre;
                option.series[5].data = $scope.arrf;
                option.series[6].data = $scope.arrg;
                option.series[7].data = $scope.total;
                daymyChart.setOption(option);
            };

        })
        .directive('dayline', function() {
            return {
                scope: {
                    id: "@",
                    date: "=",
                    price: "=",
                    legend: "="
                },
                restrict: 'E',
                template: '<div style="width:100%; height:300px;"></div>',
                replace: true,
                link: function($scope, element, attrs, controller) {
                    var option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data: $scope.legend,
                            width: 400,
                            left: 'center',
                            itemHeight: 8
                        },
                        color: ['#b770ff', '#9f9f9f', '#fbbb0b', '#3f92e7', '#4bc863', '#99c3f4', '#fd5c5c', '#41c9eb'],
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        yAxis: {
                            show: false,
                            type: '',
                            // max: 300
                        },
                        xAxis: {
                            type: 'category',
                            data: $scope.xAxis,
                        },
                        series: [{
                            name: '[0,300]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arra
                        }, {
                            name: '[300,700]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arrb
                        }, {
                            name: '[700,1000]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arrc
                        }, {
                            name: '[1000,1500]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arrd
                        }, {
                            name: '[1500,2000]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arre
                        }, {
                            name: '[2000,3000]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arrf
                        }, {
                            name: '[3000+]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: $scope.arrg
                        }, {
                            name: '总销量',
                            type: 'line',
                            stack: '总销量',
                            symbol: 'circle',
                            label: {
                                normal: {
                                    show: false,
                                    // position: ''
                                }
                            },
                            textStyle: {
                                fontSize: 12,
                                color: '#000'
                            },
                            data: $scope.total
                        }]
                    };
                    daymyChart = echarts.init(document.getElementById($scope.id), 'macarons');
                    daymyChart.setOption(option);
                }
            }
        })
        // 分页控制器
        .controller('paginationCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
            $scope.$on('pageChange', function() {
                $scope.curPage = 1;
            });
            $scope.maxSize = 10;
            $scope.setPage = function(pageNo) {
                $scope.curPage = pageNo;
            };

            $scope.pageChanged = function() {
                $scope.queryStoreFormSubmit($scope.curPage);
                $log.log('Page changed to: ' + $scope.curPage);
            };
        }])
});