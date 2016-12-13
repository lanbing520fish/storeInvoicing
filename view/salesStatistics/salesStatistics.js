angular
    .module('carriedOutModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.stepNum = 0; // 当前显示的step索引值（Number类型）
        $rootScope.goBack = function(num) {
            $rootScope.stepNum = 0;
        };
        $rootScope.forward = function(num) {
            $rootScope.stepNum = 1;
        };

        $rootScope.salesList = []; //列表内容
        $rootScope.sectionList = ["价位：0～300", "价位：300～700","价位：700～1000","价位：1000～1500","价位：1500～2000","价位：2000～3000","价位：3000+"]; //价格区间
    }])
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
    /*echarts图标1*/
    .controller('monthLineCtrl', function($rootScope, $scope, $log) {
        $scope.legend = [];
        $scope.date = [];
        $scope.shuzu = [];
        $scope.total = [];
        $scope.queryFormSubmit = function(){
                $scope.legend = [];
                $scope.date = [];
                $scope.shuzu = [];
                $scope.arra = [];
                $scope.arrb = [];
                $scope.arrc = [];
                $scope.arrd = [];
                $scope.arre = [];
                $scope.arrf = [];
                $scope.arrg = [];
                $scope.total = [0, 0, 0, 0, 0, 0];
                $rootScope.salesList = [
                    {
                      date:'2016/01',
                      sales:[1,2,3,4,5,6,7],
                    },{
                      date:'2016/02',
                      sales:[11,12,13,14,15,16,17],
                    },{
                      date:'2016/03',
                      sales:[21,22,23,24,25,26,27],
                    },{
                      date:'2016/04',
                      sales:[31,32,33,34,35,36,37],
                    },{
                      date:'2016/05',
                      sales:[41,42,43,44,45,46,47],
                    },{
                      date:'2016/06',
                      sales:[51,52,53,54,55,56,57],
                    }
                ];

            _.map($rootScope.salesList, function(elem, index){
                $scope.date.push(elem.date);
                $scope.shuzu.push(elem.sales);
                _.map(elem.sales, function(item, i) {
                    switch(i) {
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
            $scope.tootal = [180, 200, 200, 200, 400, 190]
            //更新数据
            $scope.legend = ['[0,300]', '[300,700]','[700,1000]','[1000,1500]','[1500,2000]','[2000,3000]','[3000+]','总销量']
            var option = myChart.getOption();
            option.legend[0].data = $scope.legend;
            option.xAxis[0].data = $scope.date;
            option.series[0].data = $scope.arra;
            option.series[1].data = $scope.arrb;
            option.series[2].data = $scope.arrc;
            option.series[3].data = $scope.arrd;
            option.series[4].data = $scope.arre;
            option.series[5].data = $scope.arrf;
            option.series[6].data = $scope.arrg;
            option.series[7].data = $scope.tootal;
            myChart.setOption(option); 
        };

    })
    .directive('monthline', function() {
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
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: $scope.legend,
                        width: 400,
                        left: 'center',
                        itemHeight: 8
                    },
                    color: ['#b770ff', '#9f9f9f', '#fbbb0b', '#3f92e7', '#4bc863', '#99c3f4', '#fd5c5c','#41c9eb'],
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis:  {
                        show: false,
                        type: '',
                        // max: 300
                    },
                    xAxis: {
                        type: 'category',
                        data: $scope.date,
                    },
                    series: [
                        {
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
                        },
                        {
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
                        },
                        {
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
                        },
                        {
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
                        },
                        {
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
                        },
                        {
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
                        },
                        {
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
                        },
                        {
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
                            data: $scope.tootal
                        }
                    ]
                };  
                myChart = echarts.init(document.getElementById($scope.id),'macarons');  
                myChart.setOption(option);  
            }  
        }
    })
    
    /*echarts图标2*/
    .controller('dayLineCtrl', function($rootScope, $scope, $log) {
        $scope.legend = [];
        $scope.date = [];
        $scope.shuzub = [];
        $scope.total = [];
        $scope.queryFormSubmit = function(){
                $scope.legend = [];
                $scope.date = [];
                $scope.shuzu = [];
                $scope.arra = [];
                $scope.arrb = [];
                $scope.arrc = [];
                $scope.arrd = [];
                $scope.arre = [];
                $scope.arrf = [];
                $scope.arrg = [];
                $scope.total = [0, 0, 0, 0, 0, 0];
                $rootScope.daysalesList = [
                    {
                      date:'2016/01/01',
                      sales:[11,21,31,41,51,61,71],
                    },{
                      date:'2016/02/01',
                      sales:[12,22,32,42,52,62,72],
                    },{
                      date:'2016/03/01',
                      sales:[13,23,33,43,53,63,73],
                    },{
                      date:'2016/04/01',
                      sales:[14,24,34,44,54,64,74],
                    },{
                      date:'2016/05/01',
                      sales:[15,25,35,45,55,65,75],
                    },{
                      date:'2016/06/01',
                      sales:[16,26,36,46,56,66,76],
                    }
                ];

            _.map($rootScope.daysalesList, function(elem, index){
                $scope.date.push(elem.date);
                $scope.shuzub.push(elem.sales);
                _.map(elem.sales, function(item, i) {
                    switch(i) {
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
            $scope.tootal = [180, 200, 200, 200, 400, 190]
            //更新数据
            $scope.legend = ['[0,300]', '[300,700]','[700,1000]','[1000,1500]','[1500,2000]','[2000,3000]','[3000+]','总销量']
            var option = daymyChart.getOption();
            option.legend[0].data = $scope.legend;
            option.xAxis[0].data = $scope.date;
            option.series[0].data = $scope.arra;
            option.series[1].data = $scope.arrb;
            option.series[2].data = $scope.arrc;
            option.series[3].data = $scope.arrd;
            option.series[4].data = $scope.arre;
            option.series[5].data = $scope.arrf;
            option.series[6].data = $scope.arrg;
            option.series[7].data = $scope.tootal;
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
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: $scope.legend,
                        width: 400,
                        left: 'center',
                        itemHeight: 8
                    },
                    color: ['#b770ff', '#9f9f9f', '#fbbb0b', '#3f92e7', '#4bc863', '#99c3f4', '#fd5c5c','#41c9eb'],
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis:  {
                        show: false,
                        type: '',
                        // max: 300
                    },
                    xAxis: {
                        type: 'category',
                        data: $scope.date,
                    },
                    series: [
                        {
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
                        },
                        {
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
                        },
                        {
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
                        },
                        {
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
                        },
                        {
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
                        },
                        {
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
                        },
                        {
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
                        },
                        {
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
                            data: $scope.tootal
                        }
                    ]
                };  
                daymyChart = echarts.init(document.getElementById($scope.id),'macarons');  
                daymyChart.setOption(option);  
            }  
        }
    })
