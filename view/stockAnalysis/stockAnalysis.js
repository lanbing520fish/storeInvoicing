angular
    .module('carriedOutModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
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
    /*echarts图标*/
    .controller('monthLineCtrl', function($rootScope, $scope, $log) {
        $rootScope.storeList = [
            {
              date:'11/01',
              store: '28',
              value: '39200',
              sales: '5',
              turndays: '4.6666667',
            },
            {
              date:'11/02',
              store: '31',
              value: '41850',
              sales: '7',
              turndays: '5.1666667',
            },
            {
              date:'11/03',
              store: '35',
              value: '51100',
              sales: '8',
              turndays: '5.8333333',
            },
            {
              date:'11/04',
              store: '34',
              value: '47940',
              sales: '6',
              turndays: '5.6666667',
            },
            {
              date:'11/05',
              store: '44',
              value: '52000',
              sales: '6',
              turndays: '6.6666667',
            },
            {
              date:'11/06',
              store: '35',
              value: '51123',
              sales: '8',
              turndays: '5.8333333',
            },
            {
              date:'11/07',
              store: '31',
              value: '41900',
              sales: '7',
              turndays: '5.1666667',
            },
        ];
        $scope.date = [];
        $scope.store = [];
        $scope.sales = [];
        $scope.turndays = [];
        _.map($rootScope.storeList, function(elem, index){
            $scope.date.push(elem.date);
            $scope.store.push(elem.store);
            $scope.sales.push(elem.sales);
            $scope.turndays.push(elem.turndays);
        });
    })
    .directive('monthline', function() {
        return {  
            scope: {  
                id: "@",  
                date: "=",  
                store: "=",
                sales: "=",
                turndays: "=",
            },
            restrict: 'E',  
            template: '<div style="width:100%; height:200px;"></div>',  
            replace: true,  
            link: function($scope, element, attrs, controller) { 
                var option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['库存到达量','库存价值（元）','库存周转天数']
                        },
                        color: ['#41c9eb','#fd5c5c','#41be47'],
                        xAxis: [
                            {
                                type: 'category',
                                data: $scope.date
                            }
                        ],
                        yAxis: [
                            {
                                show: false,
                            },
                            {
                                show: false,
                            }
                        ],
                        series: [
                            {
                                name:'库存到达量',
                                type:'bar',
                                barGap: 0,
                                data: $scope.store
                            },
                            {
                                name:'库存价值（元）',
                                type:'bar',
                                barGap: 0,
                                data: $scope.sales
                            },
                            {
                                name:'库存周转天数',
                                type:'line',
                                yAxisIndex: 1,
                                symbol: 'circle',
                                data: $scope.turndays
                            }
                        ]
                    };
                var myChart = echarts.init(document.getElementById($scope.id),'macarons');  
                myChart.setOption(option);  
            }  
        }
    })