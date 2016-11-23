angular
    .module('addTransferOutDepotModule', ['ui.bootstrap'])
    .controller('resultCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        // 串号录入
        $scope.editQueryType = function() {
            $scope.$emit('openSerialNumberModal');
        };
        // 新增一行
        $scope.addQueryType = function() {
            $scope.$emit('openEditQueryTypeModal');
        };
        // 暂存
        $scope.saveProcureOrder = function() {
            swal({
                title: '操作成功!',
                text: '更新采购入库成功～',
                type: 'success',
                confirmButtonText: '确定'
            }, function() {
                $timeout(function() {
                    // parent.angular.element(parent.$('#tabs')).scope().removeTab();
                });
            });
        }
    }])
    .controller('purchaseQueryCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        // 选择门店
        $scope.openStoreQueryType = function() {
            $scope.$emit('openStoreQueryTypeModal');
        };
    }])
    // 弹出框
    .controller('addPurchaseModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 新增一行
        $scope.$on('openEditQueryTypeModal', function(d, data) {
            $ctrl.open(data);
        });

        // 选择门店
        $scope.$on('openStoreQueryTypeModal', function(d, data) {
            $ctrl.openStoreQueryTypeModal(data);
        });

        // 串号录入
        $scope.$on('openSerialNumberModal', function(d, data) {
            $ctrl.openSerialNumberModal(data);
        });

        $ctrl.open = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'new-line-title',
                ariaDescribedBy: 'new-line-body',
                templateUrl: 'addNewLine.html',
                controller: 'addNewLineCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return data;
                    }
                }
            });
        };

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

        $ctrl.openSerialNumberModal = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title',
                ariaDescribedBy: 'serial-number-body',
                templateUrl: 'serialNumberModal.html',
                controller: 'serialNumberModalCtrl',
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
    .controller('addNewLineCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;
        $ctrl.isHidden = true; // 更多查询条件列表是否隐藏
        $ctrl.isFoldBrand = true; // 品牌列表是否折叠
        $ctrl.isFoldModel = true; // 型号列表是否折叠

        // 切换展示
        $ctrl.toggle = function(name) {
            switch (name) {
                case '$ctrl.isHidden':
                    $ctrl.isHidden = !$ctrl.isHidden;
                    break;
                case '$ctrl.isFoldBrand':
                    $ctrl.isFoldBrand = !$ctrl.isFoldBrand;
                    break;
                case '$ctrl.isFoldModel':
                    $ctrl.isFoldModel = !$ctrl.isFoldModel;
                    break;
            }
        }

        $ctrl.ok = function() {
            $scope.$broadcast('submitPowerListModal');
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('goodsListModalCtrl', ['$scope', function($scope) {
        $scope.goodsListResult = [{
            name: '测试配件 A',
            type: '手机',
            brand: '中兴',
            model: 'nubia Z9 Max（全网通）',
            configuration: '单电单充',
            color: '黑色',
            RAM: '3072',
            size: '154.8*76.6*7.9（mm）',
            OS: 'nubia UI 2.8（基于Android L/5.0）'
        }, {
            name: '测试配件 B',
            type: '手机',
            brand: '华为',
            model: 'nubia Z9 Max（全网通）',
            configuration: '单电单充',
            color: '黑色',
            RAM: '3072',
            size: '154.8*76.6*7.9（mm）',
            OS: 'nubia UI 2.8（基于Android L/5.0）'
        }, {
            name: '测试配件 C',
            type: '手机',
            brand: '苹果',
            model: 'nubia Z9 Max（全网通）',
            configuration: '单电单充',
            color: '黑色',
            RAM: '3072',
            size: '154.8*76.6*7.9（mm）',
            OS: 'nubia UI 2.8（基于Android L/5.0）'
        }, {
            name: '测试配件 D',
            type: '手机',
            brand: '酷派',
            model: 'nubia Z9 Max（全网通）',
            configuration: '单电单充',
            color: '黑色',
            RAM: '3072',
            size: '154.8*76.6*7.9（mm）',
            OS: 'nubia UI 2.8（基于Android L/5.0）'
        }, {
            name: '测试配件 E',
            type: '手机',
            brand: '三星',
            model: 'nubia Z9 Max（全网通）',
            configuration: '单电单充',
            color: '黑色',
            RAM: '3072',
            size: '154.8*76.6*7.9（mm）',
            OS: 'nubia UI 2.8（基于Android L/5.0）'
        }, {
            name: '测试配件 F',
            type: '手机',
            brand: '黑莓',
            model: 'nubia Z9 Max（全网通）',
            configuration: '单电单充',
            color: '黑色',
            RAM: '3072',
            size: '154.8*76.6*7.9（mm）',
            OS: 'nubia UI 2.8（基于Android L/5.0）'
        }, {
            name: '测试配件 G',
            type: '手机',
            brand: 'OPPO',
            model: 'nubia Z9 Max（全网通）',
            configuration: '单电单充',
            color: '黑色',
            RAM: '3072',
            size: '154.8*76.6*7.9（mm）',
            OS: 'nubia UI 2.8（基于Android L/5.0）'
        }];
        $scope.hoverIndex = 0; // 鼠标Hover的索引
        $scope.checkIndex = ''; // 鼠标Checked的索引
        $scope.hoverGoods = function(index) {
            $scope.hoverIndex = index;
        }
        $scope.checkedGoods = function(index) {
            $scope.checkIndex = index;
        }
    }])
    .controller('serisListModalCtrl', ['$scope', function($scope) {
        $scope.serisListResult = [
            { nub: 20161101 },
            { nub: 20161102 },
            { nub: 20161103 },
            { nub: 20161104 },
            { nub: 20161105 },
            { nub: 20161106 },
            { nub: 20161107 },
            { nub: 20161108 }
        ];
    }])
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
    .controller('serialNumberModalCtrl', function($uibModalInstance, $scope, items) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $scope.$broadcast('submitCardRange');
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
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
                    $scope.areaId = areaId;
                    $scope.provinceName = areaName;
                    me.handleSubmitBtn(level);
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
                case 'city':
                    $scope.checkedAreaName = $scope.provinceName + ' ' + $scope.cityName;
                    $scope.visible = false;
                    break;
            }
        }
    }])
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
