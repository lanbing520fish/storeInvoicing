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
    .controller('monthConditionQuery', ['$scope', '$timeout', function($scope, $timeout) {

        $scope.monthConditionQueryForm = {
            createStartMonth: '', //制单日期开始
            createEndMonth: '', //制单日期结束
        };

        // 时间控件
        $scope.startMonthOptions = {
            formatYear: 'yy',
            maxMode: $scope.monthConditionQueryForm.createEndMonth,
            startingMonth: 1
        };
        $scope.endMonthOptions = {
            formatYear: 'yy',
            minMode: $scope.monthConditionQueryForm.createStartMonth,
            // maxDate: new Date(),
            startingMonth: 1
        };

        $scope.$watch('monthConditionQueryForm.createStartMonth', function(newValue) {
            $scope.endDateOptions.minMonth = newValue;
        });
        $scope.$watch('monthConditionQueryForm.createEndMonth', function(newValue) {
            $scope.startDateOptions.maxMonth = newValue;
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
    .controller('cityCheckCtrl', ['$scope', function($scope) {
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
            let me = this;
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
            let me = this;
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
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['[0,300]', '[300,700]','[700,1000]','[1000,1500]','[1500,2000]','[2000,3000]','[3000+]','总销量']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis:  {
                        type: ''
                    },
                    xAxis: {
                        type: 'category',
                        data: ['2016/01','2016/02','2016/03','2016/04','2016/05','2016/06']
                    },
                    series: [
                        {
                            name: '[0,300]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [10, 20, 30, 40, 50, 60]
                        },
                        {
                            name: '[300,700]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [20, 40, 30, 60, 70, 50]
                        },
                        {
                            name: '[700,1000]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [20, 18, 19, 23, 29, 33]
                        },
                        {
                            name: '[1000,1500]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [15, 21, 20, 15, 19, 33]
                        },
                        {
                            name: '[1500,2000]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [80, 32, 90, 34, 12, 13]
                        },
                        {
                            name: '[2000,3000]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [20, 32, 10, 30, 90, 30]
                        },
                        {
                            name: '[3000+]',
                            type: 'bar',
                            stack: '销量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [10, 10, 10, 10, 10, 10]
                        },
                        {
                            name: '总销量',
                            type: 'line',
                            stack: '总销量',
                            label: {
                                normal: {
                                    show: true,
                                    // position: ''
                                }
                            },
                            textStyle: {
                                fontSize: 12,
                                color: '#000'
                            },
                            data: [175, 174, 209, 212, 280, 229]
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
            $scope.queryTypeFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
