/**
 * requireJs
 * http://www.requirejs.cn/docs/api.html
 */
"use strict";

window.loading = {
    // finish: function () {
    //     parent.$('.iframe-box').height(parent.$('.tabs-content').height());
    // },
    load: function () {
        require.config({
            paths: {
                'angular': '../../resources/js/angular.min',
                'angular-touch': '../../resources/js/angular-touch.min',
                'angular-animate': '../../resources/js/angular-animate.min',
                'angular-aria': '../../resources/js/angular-aria.min',
                'jquery': '../../resources/js/jquery.min',
                'bootstrap': '../../resources/js/bootstrap.min',
                'ui-bootstrap': '../../resources/js/ui-bootstrap',
                'ui-bootstrap-tpls': '../../resources/js/ui-bootstrap-tpls-2.1.3',
                'angular-locale_zh-cn': '../../resources/js/angular-locale_zh-cn',
                'lodash': '../../resources/js/lodash',
                'uploader': '../../resources/js/uploader.min',
                'angular-md5': '../../resources/js/angular-md5',
                'ngStorage': '../../resources/js/ngStorage.min',
                'sweetalert': '../../resources/js/sweetalert.min',
                'httpConfig': '../../resources/js/httpConfig'
            },
            shim: {
                'angular': {
                    'exports': 'angular'
                },
                'angular-touch': {
                    'deps': ['angular'],
                    'exports': 'ngTouch'
                },
                'angular-animate': {
                    'deps': ['angular'],
                    'exports': 'ngAnimate'
                },
                'angular-aria': {
                    'deps': ['angular'],
                    'exports': 'ngAria'
                },
                'bootstrap': {
                    'deps': ['jquery']
                },
                'ui-bootstrap-tpls': {
                    'deps': ['angular']
                },
                'uploader': {
                    'deps': ['angular']
                },
                'angular-locale_zh-cn': {
                    'deps': ['angular']
                },
                'angular-md5': {
                    'deps': ['angular'],
                },
                'ngStorage': {
                    'deps': ['angular'],
                }                 
            }
        });
    }
};

window.loading.load();
require(['angular', 'resetPassword'], function (angular) {
    angular.bootstrap(document, ['resetPasswordModule']);
    // window.loading.finish();
});
