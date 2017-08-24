/**
 * nieyalan
 * Date 2017-08-23
 */
"use strict";
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'angular-md5', 'ngStorage'], function(angular, $, httpConfig, swal, _, md5) {
    angular
    .module('resetPasswordModule', ['angular-md5', 'ngStorage'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.stepNum = 0; // 当前显示的step索引值（Number类型）
        $rootScope.forward = function(num) { // 返回（num+1）
            $rootScope.stepNum = num + 1;
        };
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

        // 修改密码
        httpMethod.changePassword = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/config/common/u/changePassword',
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
    .controller('resultCtrl', ['$scope', '$rootScope', 'httpMethod', '$log', function($scope, $rootScope, httpMethod, $log) {
        $scope.phoneVerifyText = '获取验证码';
    
        var phoneNub = /^(((13[0-9]{1})|(15[0-9]{1})|17[0-9]{1}|(18[0-9]{1}))+\d{8})$/; //手机号码正则

        $scope.$watch('modifyPwdForm', function(current, old, scope){
            if(current.mobileNum && current.checkNum && current.userPwd && current.newPwd){  
                $scope.isSurePasswd = false;
            }else{
                $scope.isSurePasswd = true;
            } 
            if(phoneNub.test(current.mobileNum)){
                $scope.isGetcode = false;
            }else{
                $scope.isGetcode = true;
            }; 
                               
        }, true);
        $scope.setSurepwd = function(){
            if($scope.modifyPwdForm.userPwd === $scope.modifyPwdForm.newPwd){
                $scope.ischecksurepwd = false;
            }else{
                $scope.ischecksurepwd = true;
            } 
        };
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
                        $scope.isGetcode = true;
                        timer = $interval(function(){
                            $scope.phoneVerifyText = count + '秒后重新发送';  
                            count--;
                            if(count == -1){
                                $interval.cancel(timer);
                                $scope.phoneVerifyText = '获取验证码';
                                $scope.isGetcode = false;
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
        // 修改密码
        $scope.modifyPwd = function(){
            var param = {
                mobileNum:_.get($scope, 'modifyPwdForm.mobileNum'),
                userPwd:md5.createHash(_.get($scope, 'modifyPwdForm.userPwd')),
                checkNum:_.get($scope, 'modifyPwdForm.checkNum')
            }
            httpMethod.changePassword(param).then(function (rsp) {
                if (rsp.success) {
                    swal({
                        title: '提示!',
                        text: '修改密码成功！',
                        type: 'success'
                    }, function() {
                        $rootScope.stepNum = 2;
                    });
                } else {
                    swal("OMG", rsp.msg || "修改密码失败!", "error");
                };
            }, function () {
                $log.log('调用修改密码接口失败.');
            });
        }
        //修改成功
        $scope.successModify = function(){

        }
    }])
});
