angular
    .module('addReturnedModule', ['ui.bootstrap'])
    .controller('resultCtrl', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout) {
        // 串号录入
        $scope.editQueryType = function(index, item) {
            var obj = _.clone(item);
            _.set(obj, '$$hashKey', null);
            $scope.$emit('openSerialNumberModal', index, obj);
        };

        // 新增一行
        $scope.addQueryType = function() {
            $scope.$emit('openEditQueryTypeModal');
        };

        // 删除
        $scope.delQueryType = function(index) {
            _.pullAt(_.get($rootScope, 'modifiedCardPur.itemList'), [index]);
        };

        // 暂存
        $scope.saveReturnedOrder = function() {
            httpMethod.saveProcureOrder(_.get($rootScope, 'modifiedCardPur')).then(function(rsp) {
                $log.log('调用保存采购单接口成功.');
                if (rsp.success) {
                    swal({
                        title: '操作成功!',
                        text: '保存采购单成功！',
                        type: 'success'
                    }, function() {
                        $timeout(function() {
                            parent.angular.element(parent.$('#tabs')).scope().removeTab();
                        });
                    });
                } else {
                    swal("OMG", "保存采购单失败!", "error");
                }
            })
        }

        // 提交
        $scope.submitReturnedOrder = function() {
            httpMethod.submitProcureOrder(_.get($rootScope, 'modifiedCardPur')).then(function(rsp) {
                $log.log('调用提交采购单接口成功.');
                if (rsp.success) {
                    swal({
                        title: '操作成功!',
                        text: '提交采购单成功！',
                        type: 'success'
                    }, function() {
                        $timeout(function() {
                            parent.angular.element(parent.$('#tabs')).scope().removeTab();
                        });
                    });
                } else {
                    swal("OMG", "提交采购单失败!", "error");
                }
            })
        }
    }])
    // 弹出框
    .controller('addReturnedModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        // 新增一行
        $scope.$on('openEditQueryTypeModal', function(d, data) {
            $rootScope.queryTypeResultList = [];
            $ctrl.open(data);
        });

        // 串号录入
        $scope.$on('openSerialNumberModal', function(d, index, item) {
            $ctrl.openSerialNumberModal(index, item);
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
            {nub: 20161101},
            {nub: 20161102},
            {nub: 20161103},
            {nub: 20161104},
            {nub: 20161105},
            {nub: 20161106},
            {nub: 20161107},
            {nub: 20161108},
            {nub: 20161109},
            {nub: 20161110},
            {nub: 20161111},
            {nub: 20161112},
            {nub: 20161113},
            {nub: 20161114},
            {nub: 20161115},
            {nub: 20161116},
            {nub: 20161117},
            {nub: 20161118},
            {nub: 20161119},
            {nub: 20161120},
            {nub: 20161121},
            {nub: 20161122},
            {nub: 20161123},
            {nub: 20161124},
            {nub: 20161125},
            {nub: 20161126},
            {nub: 20161127},
            {nub: 20161128},
            {nub: 20161129},
            {nub: 20161130}
        ];
    }])
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
