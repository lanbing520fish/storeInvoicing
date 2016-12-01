angular
    .module('inventoryModule', ['ui.bootstrap'])
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
            template: '<div class="charts-box fn-left"></div>',
            replace: true,
            link: function ($scope, iElm, iAttrs, controller) {
                var option = {
                    title: {
                        text: '库存量TOP5品牌',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#b148cc', '#41a36e', '#29dcdc', '#e8be50', '#ff5baa'],
                    legend: {
                        x: 'right',
                        y: 'center',
                        orient: 'vertical',
                        itemWidth: 14,
                        itemHeight: 14,
                        textStyle: {
                            'color': '#393939'
                        },
                        data: $scope.legend
                    },
                    series: {
                        name: '库存量',
                        type: 'pie',
                        radius: [80, 130],
                        center: ['50%', '50%'],
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
    .directive('modelChart', function () {
        return {
            scope: {
                id: "@",
                legend: "=",
                data: "="
            },
            restrict: 'E',
            template: '<div class="charts-box fn-left"></div>',
            replace: true,
            link: function ($scope, iElm, iAttrs, controller) {
                var option = {
                    title: {
                        text: '库存量TOP5品牌',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#b148cc', '#41a36e', '#29dcdc', '#e8be50', '#ff5baa'],
                    legend: {
                        x: 'right',
                        y: 'center',
                        orient: 'vertical',
                        data: $scope.legend
                    },
                    series: {
                        name: '半径模式',
                        type: 'pie',
                        radius: [80, 130],
                        center: ['50%', '50%'],
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
