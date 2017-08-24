define(function () {
    var httpConfig = {
        'siteUrl': 'http://192.168.16.161/rading-web',
        // 'siteUrl': 'http://192.168.74.17/rading-web',
        //'siteUrl': 'http://192.168.16.161/rading-web',
        // 'siteUrl': 'http://192.168.16.37:8080/rading-web',
        'requestHeader': {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        isMock: false, // 启用MOCK数据
        isProdEnvironment: true // true: 开发环境, false: 生产环境
    };
    return httpConfig;
});
