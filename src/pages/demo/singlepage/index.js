var apiHost = /meituan.com/.test(location.href) ? 'http://jiudian.meituan.com' : 'http://hotel.hoteldev.sankuai.com';
var urlList = {
    province: '/api/v1/fe/cityselect/provinces',
    subarea: '/api/v1/fe/cityselect/subarea',
    bizself: '/api/v1/mta/sc/bizself'
};

var eventUtil = {
    addHandler: function (element, type, handler) { //添加事件
        if (element.addEventListener) {
            element.addEventListener(type, handler, false); //使用DOM2级方法添加事件
        } else if (element.attachEvent) { //使用IE方法添加事件
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler; //使用DOM0级方法添加事件
        }
    },

    removeHandler: function (element, type, handler) { //取消事件
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};

var vue = new Vue({
    el: '#app',
    data: {
        // 配置数据
        config: {
            submit: false,
            provinceList: [],
            cityList: [],
            locationList: []
        },
        // 基本信息
        basicInfo: {
            poiName: '',
            provinceId: -1,
            provinceName: '',
            cityId: -1,
            cityName: '',
            locationId: -1,
            locationName: '',
            address: '',
            phone: '',
            roomCount: '',
            introduction: ''
        },
        // 证照信息
        certificateInfo: {
            fileUrl: ''
        },
        // 酒店联系人
        contactInfo: {
            name: '',
            phone: '',
            email: ''
        }
    },
    methods: {
        init: function () {
            this.getProvince();
        },

        // 获取省份数据
        getProvince: function () {
            var vm = this;
            var provinceUrl = apiHost + urlList.province;
            Vue.http.get(provinceUrl, null, null).then(function (response) {
                var result = response.json();
                if (result.status === 0) {
                    vm.config.provinceList = result.data;
                } else {
                    alert('接口请求失败');
                }
            }, function (err) {
                alert(err.message || '服务器错误');
            });
        },

        // 获取子区域数据
        getSubarea: function (id, type) {
            var vm = this;
            var subareaUrl = apiHost + urlList.subarea + '/' + id;
            Vue.http.get(subareaUrl, null, null).then(function (response) {
                var result = response.json();
                if (result.status === 0) {
                    if (type === 'city') {
                        vm.config.cityList = result.data;
                        vm.config.locationList = [];
                        vm.basicInfo.cityId = -1;
                        vm.basicInfo.locationId = -1;
                    } else if (type === 'location') {
                        vm.config.locationList = result.data;
                        vm.basicInfo.locationId = -1;
                    }
                } else {
                    alert('接口请求失败');
                }
            }, function (err) {
                alert(err.message || '服务器错误');
            });
        },

        // 地区改动
        changeRegion: function (type) {
            console.log(JSON.stringify(this.basicInfo));
            var vm = this;
            if (type === 'province') {
                vm.getSubarea(vm.basicInfo.provinceId, 'city');
            } else if (type === 'city') {
                vm.getSubarea(vm.basicInfo.cityId, 'location');
            }
        },

        // 表单提交
        submitForm: function () {
            this.config.submit = true;
            if (!this.myform.$valid) return;
            var basicInfo = JSON.parse(JSON.stringify(this.basicInfo));
            var contactInfo = JSON.parse(JSON.stringify(this.contactInfo));

            if (basicInfo.provinceId === -1) {
                alert('请选择省份');
                return;
            }

            if (basicInfo.cityId === -1) {
                alert('请选择城市');
                return;
            }

            if (basicInfo.locationId === -1) {
                alert('请选择区域');
                return;
            }

            var param = {
                basicInfo: basicInfo,
                contactInfo: contactInfo
            };

            var bizselfUrl = apiHost + urlList.bizself;

            Vue.http.post(bizselfUrl, param, null).then(function (response) {
                var result = response.json();
                if (result.status === 0) {
                    console.log(result);
                } else {
                    alert('接口请求失败');
                }
            }, function (err) {
                alert(err.message || '服务器错误');
            });
        },

        uploadFile: function (argument) {

        },

        onFileChange: function (e) {
            var files = e.target.files || e.dataTransfer.files;

            if (!files.length) return;

            var file = files[0];
            var url = 'http://hotel.hoteldev.sankuai.com/api/v1/mta/sc/bizself/certificate/upload';

            var formData = new FormData();
            formData.append('file', file);

            var options = {
                cache: false,
                processData: false,
                contentType: false
            };

            // 只选择图片文件
            if (!file.type.match('image.*')) return;
            var vm = this;
            Vue.http.post(url, formData, options).then(function (response) {
                var body = response.body;
                if (body.status === 0) {
                    vm.image = body.data.fileUrl;
                } else {

                }
            }, function () {

            });
        },
        removeImage: function (e) {
            this.image = '';
        }
    }
});
vue.init();
