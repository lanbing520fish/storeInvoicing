(function() {
    'use strict';
    angular.module('directive.btn.query', [])
        .directive('btnQuery', function() {
            return {
                scope: {
                    orderQuery: '&'
                },
                restrict: 'AE',
                template: '<button type="submit" ng-disabled="flag"><i class="iconfont">&#xe600;</i> 查询</button>',
                replace: true,
                link: function(scope, iElm, iAttrs, controller) {
                    iAttrs.className && iElm.addClass(iAttrs.className);
                    scope.flag = false;
                    iElm.on('click', function() {
                        showLoad();
                        scope.$evalAsync(function() {
                            scope.flag = true;
                            scope.orderQuery({
                                'curPage': 1,
                                'cb': hideLoad
                            });
                        });
                    });

                    function showLoad() {
                        var loadDom = '<div id="load" style="position: absolute; top: 0; left: 0; z-index: 9999999; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .7);"><img src="../../resources/images/loading.gif" style="position: absolute; top: 50%; left: 50%; display: block; width: 80px; height: 80px; margin-top: -40px; margin-left: -40px;" /></div>';
                        if (!$('body').find('#load').length) {
                            $('body').append(loadDom);
                        };
                        $('body').find('#load').css({
                            display: 'block'
                        });
                    }

                    function hideLoad() {
                        scope.$evalAsync(function() {
                            scope.flag = false;
                        });
                        $('body').find('#load').css({
                            display: 'none'
                        });
                    }
                }
            };
        })
}());
