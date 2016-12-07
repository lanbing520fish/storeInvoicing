angular
    .module('carriedOutModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.stepNum = 0; // 当前显示的step索引值（Number类型）
        $rootScope.goBack = function(num) { // 返回（num-1）
            $rootScope.stepNum = num - 1;
        };
        $rootScope.forward = function(num) { // 返回（num+1）
            $rootScope.stepNum = num + 1;
        };
        
    }])
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
            maxDate: $scope.conditionQueryForm.createEndDt,
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minMode: 'month',
            minDate: $scope.conditionQueryForm.createStartDt,
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
    /*echarts图标1*/
    .controller('monthLineCtrl', function($rootScope, $scope, $log) {
        $rootScope.carriedoOutList = [
            {
              date:'2016/02',
              price:'110'
            },{
              date:'2016/03',
              price:'56'
            },{
              date:'2016/04',
              price:'70'
            },{
              date:'2016/05',
              price:'100'
            },{
              date:'2016/06',
              price:'89'
            },{
              date:'2016/07',
              price:'140'
            }
        ];
        $scope.date = [];
        $scope.price = [];

        _.map($rootScope.carriedoOutList, function(elem, index) {
          $scope.date.push(elem.date);
          $scope.price.push(elem.price);
        })

    })
    .directive('monthline', function() {
        return {  
            scope: {  
                id: "@",  
                date: "=",  
                price: "="
            },  
            restrict: 'E',  
            template: '<div style="width:100%; height:300px;"></div>',  
            replace: true,  
            link: function($scope, element, attrs, controller) { 
                var option = {
                              legend: {
                                  data: ['进货量(台)'],
                                  align: 'left',
                                  right: 10,
                                  top: 20,
                                  textStyle: {
                                      fontSize: 12,
                                      color: '#a0a0a0'
                                  }
                              },
                              color: ['#f98b33'],
                              tooltip : {
                                  trigger: 'axis',
                                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                  }
                              },
                              grid: {
                                  left: '3%',
                                  right: '4%',
                                  bottom: '3%',
                                  containLabel: true
                              },
                              xAxis : [
                                  {
                                      type : 'category',
                                      data : $scope.date,
                                      axisTick: {
                                          alignWithLabel: true
                                      }
                                  }
                              ],
                              yAxis : [
                                  {
                                      type : 'value'
                                  }
                              ],
                              series : [
                                  {
                                      name:'进货量(台)',
                                      type:'bar',
                                      barWidth: '40%',
                                      data: $scope.price
                                  }
                              ]
                          };  
                var myChart = echarts.init(document.getElementById($scope.id),'macarons');  
                myChart.setOption(option);  
            }  
        }
    })
    /*echarts图标2*/
    .controller('dayLineCtrl', function($rootScope, $scope, $log) {
        $rootScope.dayCarriedoOutList = [
            {
              day:'2016/02/02',
              price:'10'
            },{
              day:'2016/02/03',
              price:'5'
            },{
              day:'2016/02/04',
              price:'7'
            },{
              day:'2016/02/05',
              price:'12'
            },{
              day:'2016/02/06',
              price:'8'
            },{
              day:'2016/02/07',
              price:'14'
            }
        ];
        $scope.day = [];
        $scope.price = [];

        _.map($rootScope.dayCarriedoOutList, function(elem, index) {
          $scope.day.push(elem.day);
          $scope.price.push(elem.price);
        })

    })
    .directive('day', function() { 
        return {  
            scope: {  
                id: "@",  
                day: "=",  
                price: "="
            },  
            restrict: 'E',  
            template: '<div style="width:100%; height:300px;"></div>',  
            replace: true,  
            link: function($scope, element, attrs, controller) { 
                var option = {
                              legend: {
                                  data: ['进货量(台)'],
                                  align: 'left',
                                  right: 10,
                                  top: 20,
                                  textStyle: {
                                      fontSize: 12,
                                      color: '#a0a0a0'
                                  }
                              },
                              color: ['#1bc48e'],
                              tooltip : {
                                  trigger: 'axis',
                                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                  }
                              },
                              grid: {
                                  left: '3%',
                                  right: '4%',
                                  bottom: '3%',
                                  containLabel: true
                              },
                              xAxis : [
                                  {
                                      type : 'category',
                                      data : $scope.day,
                                      axisTick: {
                                          alignWithLabel: true
                                      }
                                  }
                              ],
                              yAxis : [
                                  {
                                      type : 'value'
                                  }
                              ],
                              series : [
                                  {
                                      name:'进货量(台)',
                                      type:'bar',
                                      barWidth: '40%',
                                      data: $scope.price
                                  }
                              ]
                          };  
                var myChart = echarts.init(document.getElementById($scope.id),'macarons');
                myChart.setOption(option);  
            }  
        }
    })

