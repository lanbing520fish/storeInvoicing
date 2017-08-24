/**
 * nieyalan
 * Date 2017-08-23
 */
"use strict";
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'angular-md5', 'ngStorage'], function(angular, $, httpConfig, swal, _, md5) {
    angular
        .module('loginIndexModule', ['angular-md5', 'ngStorage'])
        .run(['$rootScope', function($rootScope){
            $rootScope.key = '';
        }])
        .factory('httpMethod', ['$http', '$q', function($http, $q) {
            var httpMethod = {};
            // 获取手机验证码
            httpMethod.getMobileVerNum = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/chain/power/r/sendSMS',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
                }).success(function(data, header, config, status) {
                    if (status != 200) {
                        //跳转403页面
                    }
                    defer.resolve(data);
                }).error(function(data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };
            //用户登录
            httpMethod.loginCheck = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/submit.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'body=' + JSON.stringify(param)
                }).success(function(data, header, config, status) {
                    if (status !== 200) {
                        // 跳转403页面
                    }
                    defer.resolve(data);
                }).error(function(data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            return httpMethod;
        }])
        .directive('ngFocusValidate', function(){
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function($scope, iElm, iAttrs, ngModel) {
                    if(!ngModel) return;
                    ngModel.$focused = false;
                    iElm.bind('focus',function(evt){
                        $scope.$apply(function(){
                            ngModel.$focused = false;
                        });
                    }).bind('blur',function(evt){
                        $scope.$apply(function(){
                            ngModel.$focused = true;
                        });
                    })
                }
            }
        })
        
        .controller('loginCtrl', ['$scope', '$rootScope', '$log', '$interval', '$timeout', 'httpMethod', 'md5', '$sessionStorage',function($scope, $rootScope, $log, $interval, $timeout, httpMethod, md5, $sessionStorage) {
            $scope.focusItem = 'mobileNum';
            $scope.phoneVerifyText = '获取验证码';
           
            $scope.setFocusItem = function(name){
                $scope.focusItem = name;
            };

            var phoneNub = /^(((13[0-9]{1})|(15[0-9]{1})|17[0-9]{1}|(18[0-9]{1}))+\d{8})$/; //手机号码正则
            $scope.$watch('mobileNum', function(newValue){
                if(phoneNub.test(newValue)){
                    $scope.isGetcode = false;
                }else{
                    $scope.isGetcode = true;
                };  
            }, true);

            // 获取手机验证码
            $scope.getVerifyCode = function(){
                var timer, count = 3;
                if($scope.isGetcode === true) return;
                var param = {
                    mobileNum:_.get($scope, 'mobileNum')
                };
                httpMethod.getMobileVerNum(param).then(function (rsp) {
                    if (rsp.success) {
                        swal({
                            title: '提示!',
                            text: '验证码发送成功！',
                            type: 'success'
                        }, function() {
                            $scope.phoneVerifyClass = true;
                            timer = $interval(function(){
                                $scope.phoneVerifyText = count + '秒后重新发送';  
                                count--;
                                if(count == -1){
                                    $interval.cancel(timer);
                                    $scope.phoneVerifyText = '获取验证码';
                                    $scope.phoneVerifyClass = false;
                                }
                            },1000);
                        });
                    } else {
                        swal("OMG", rsp.msg || "获取手机验证码失败!", "error");
                    };
                }, function () {
                    $log.log('调用获取手机验证码接口失败.');
                });
            };
            //登录
            $scope.submitUserForm = function(){ 
                var param = {
                    mobileNum:_.get($scope, 'mobileNum'),
                    userPwd: md5.createHash(_.get($scope, 'userPwd')),//密码
                    checkNum:_.get($scope, 'verify')//验证码
                };
                // 用户名登录
                httpMethod.loginCheck(param).then(function(rsp) {
                    $log.log('调用用户登录接口成功.');
                    if (rsp.success) {
                        $sessionStorage.key = rsp.data;
                        // window.location = '../homePage/homePage.html';
                    } else {
                        swal("OMG", rsp.msg || "用户登录接口失败!", "error");
                    }
                }, function() {
                    $log.log('调用用户登录接口失败.');
                });
            };  
            //重置
            $scope.resetPwd = function(){
                window.location = '../resetPassword/resetPassword.html';
            }      
        }]);
});










