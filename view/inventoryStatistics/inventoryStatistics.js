angular
    .module('inventoryModule', ['ui.bootstrap'])
    .controller('storeQuery', ['$scope', '$rootScope', function($scope, $rootScope) {
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
    // 弹框内城市
    .controller('bouncedCityCheckCtrl', ['$scope', function($scope) {
        $scope.citys = [{
            areaId: '009',
            areaName: '江苏省',
            children: [{
                areaId: '025',
                areaName: '南京市',
            }, {
                areaId: '026',
                areaName: '常州市',
            }]
        }, {
            areaId: '009',
            areaName: '安徽省',
            children: [{
                areaId: '0551',
                areaName: '合肥市',
            }]
        }];

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
            // maxDate: new Date(),
            startingDay: 1
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
<<<<<<< .merge_file_6sJmJC
=======



        // 确定查询
        $scope.queryFormSubmit = function() {
            var param = {
                beginDt: $scope.conditionQueryForm.createStartDt, //开始时间
                endDt: $scope.conditionQueryForm.createEndDt, //结束时间
                bizmanId: '', //商户id
                commonRegionId: $rootScope.checkedAreaID //区域id
            };
            httpMethod.qryStockStatisticTwo(param).then(function(rsp) {
                $rootScope.qryStockStatisticData = rsp.data;
                $log.log('获取库存量TOP5统计数据成功.');
            }, function() {
                $log.log('获取库存量TOP5统计数据失败.');
            });
        }
>>>>>>> .merge_file_30AuAN
    }])
    // 城市
    .controller('cityCheckCtrl', ['$scope','$rootScope', function($scope, $rootScope) {

        $scope.cityClose = function() {
            $scope.visible = !$scope.visible;
        };
        $scope.clHide = function() {
            $scope.visible = false;
        };

        $scope.cityList = [{
                name: '江西省',
                areaId: '001',
                child: [
                        {
                            name: '南昌市',
                            areaId: '001001',
                            child: [
                                {
                                    name: '东湖区',
                                    areaId:'001001001',
                                }, {
                                    name: '西湖区',
                                    areaId:'001001002',
                                }, {
                                    name: '青云谱区',
                                    areaId:'001001003',
                                },
                                {
                                    name: '湾里区',
                                    areaId:'001001004',
                                }
                            ]
                        },
                        {
                            name: '景德镇市',
                            areaId: '001002',
                            child: [
                                {
                                    name: '昌江区',
                                    areaId:'001002001',
                                }, {
                                    name: '珠山区',
                                    areaId:'001002002',
                                }, {
                                    name: '乐平市',
                                    areaId:'001002003',
                                },
                                {
                                    name: '浮梁县',
                                    areaId:'001002004',
                                }
                            ]
                        }
                    ]
            },
            {
                name: '吉林省',
                areaId: '002',
                child: [
                        {
                            name: '长春市',
                            areaId: '002001',
                            child: [
                                {
                                    name: '朝阳区',
                                    areaId:'002001001',
                                }, {
                                    name: '南关区',
                                    areaId:'002001002',
                                }, {
                                    name: '宽城区',
                                    areaId:'002001003',
                                },
                                {
                                    name: '二道区',
                                    areaId:'002001004',
                                }
                            ]
                        },
                        {
                            name: '吉林市',
                            areaId: '002002',
                            child: [
                                {
                                    name: '船营区',
                                    areaId:'002002001',
                                }, {
                                    name: '昌邑区',
                                    areaId:'002002002',
                                }, {
                                    name: '龙潭区',
                                    areaId:'002002003',
                                },
                                {
                                    name: '丰满区',
                                    areaId:'002002004',
                                }
                            ]
                        }
                    ]
            },
            {
                name: '黑龙江省',
                areaId: '003',
                child: [
                        {
                            name: '齐齐哈尔市',
                            areaId: '003001',
                        },
                        {
                            name: '牡丹江市',
                            areaId: '003002',
                        }
                    ]
            },
            {
                name: '上海市',
                areaId: '004'
            },
            {
                name: '江苏省',
                areaId: '005',
                child: [
                        {
                            name: '南京市',
                            areaId: '005001',
                            child: [
                                {
                                    name: '雨花区',
                                    areaId:'005001001',
                                }, {
                                    name: '建邺',
                                    areaId:'005001002',
                                }, {
                                    name: '鼓楼区',
                                    areaId:'005001003',
                                },
                                {
                                    name: '浦口区',
                                    areaId:'006001004',
                                }
                            ]
                        },
                        {
                            name: '苏州市',
                            areaId: '005002',
                            child: [
                                {
                                    name: '姑苏区',
                                    areaId:'005002001',
                                }, {
                                    name: '虎丘区',
                                    areaId:'005002002',
                                }, {
                                    name: '吴中区',
                                    areaId:'005002003',
                                },
                                {
                                    name: '相城区',
                                    areaId:'005002004',
                                }
                            ]
                        }
                    ]
            }
        ];

        $scope.selectedRow = null; //一级索引值
        $scope.selectedRowb = null; //二级索引值
        $scope.selectedProvince = '',
        $scope.selectedCity = '',
        $scope.selectedArea = '',
        $scope.checkedAreaName = '';

        $scope.selectProvince = function(index,item) {
            $scope.selectedRow = index;
            $scope.selectedRowb = null;
            $scope.selectedProvince = item.name;
            $scope.selectedCity = '';
            $scope.selectedArea = '';
        };

        $scope.selectCity = function(rowb, item) {
            event.stopPropagation();
            $scope.selectedRowb = rowb;
            $scope.selectedCity = ' - ' + item.name;
            $scope.selectedArea = '';
        };

        $scope.selectArea = function(rowb, item) {
            event.stopPropagation();
            $scope.selectedArea = ' - ' + item.name; 
        };

        $scope.cityChecked = function(){
            $scope.checkedAreaName = $scope.selectedProvince + $scope.selectedCity + $scope.selectedArea;
            $scope.visible = !$scope.visible;
        };


    }])
    .controller('inventoryCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.legend = ['中兴', '酷派', '三星', '华为', '乐视'];
        $scope.data = [
            {value: 30, name: '中兴'},
            {value: 50, name: '酷派'},
            {value: 150, name: '三星'},
            {value: 100, name: '华为'},
            {value: 200, name: '乐视'}
        ];
    }])
    .directive('brandChart', function () {
        return {
            scope: {
                id: "@",
                legend: "=",
                data: "="
            },
            restrict: 'E',
            template: '<div style="height:400px; width:100%;"></div>',
            replace: true,
            link: function ($scope, iElm, iAttrs, controller) {
                var option = {
                    title: {
                        text: '库存量TOP5品牌',
                        x: 'center',
                        textStyle: {
                            'fontWeight': 'bolder'
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#b148cc', '#41a36e', '#29dcdc', '#e8be50', '#ff5baa'],
                    legend: {
                        x: 'right',
                        y: '26%',
                        orient: 'vertical',
                        itemWidth: 14,
                        itemHeight: 14,
                        align: 'left',
                        textStyle: {
                            'color': '#393939'
                        },
                        data: $scope.legend
                    },
                    series: {
                        name: '库存量',
                        type: 'pie',
                        radius: [60, 100],
                        center: ['50%', '40%'],
                        roseType: 'radius',
                        label: {
                            normal: {
                                show: true,
                                formatter: "{c}"
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        lableLine: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: $scope.data
                    }
                };

                var myChart = echarts.init(document.getElementById($scope.id));
                myChart.setOption(option);
            }
        };
    })
    .controller('terminaltypeCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.legend = ['三星J3199', '中兴', '海信', 'iphone6s', '魅族'];
        $scope.data = [
            {value: 99, name: '三星J3199'},
            {value: 88, name: '中兴'},
            {value: 77, name: '海信'},
            {value: 66, name: 'iphone6s'},
            {value: 30, name: '魅族'}
        ];
    }])
    .directive('modelChart', function () {
        return {
            scope: {
                id: "@",
                legend: "=",
                data: "="
            },
            restrict: 'E',
            template: '<div style="height:420px; width:100%;"></div>',
            replace: true,
            link: function ($scope, iElm, iAttrs, controller) {
                var option = {
                    title : {
                        text: '库存量TOP5机型',
                        x:'center',
                        textStyle: {
                            'fontWeight': 'bolder'
                        },
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#f7d14d', '#e65252', '#79c564', '#48adc8', '#5b7ed6'],
                    legend: {
                        x: 'right',
                        y: '23%',
                        orient: 'vertical',
                        itemWidth: 14,
                        itemHeight: 14,
                        align: 'left',
                        data: $scope.legend
                    },
                    series : [
                        {
                            name: '库存量',
                            type: 'pie',
                            radius : '40%',
                            center: ['50%', '38%'],
                            data: $scope.data,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: "{c}"
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            lableLine: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                        }
                    ]
                };

                var myChart = echarts.init(document.getElementById($scope.id));
                myChart.setOption(option);
            }
        };
    })
