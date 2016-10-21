var apiHost = /meituan.com/.test(location.href) ? 'http://jiudian.meituan.com' : 'http://hotel.hoteldev.sankuai.com';
var urlList = {
    province: '/api/v1/fe/cityselect/provinces',
    subarea: '/api/v1/fe/cityselect/subarea',
    bizself: '/api/v1/mta/sc/bizself',
    upload: '/api/v1/mta/sc/bizself/certificate/upload'
};
var vue = new Vue({
    el: '#container',
    data: {
        // 配置数据
        config: {
            submitForm: false,
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
        certificateInfo: [],
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
            var certificateInfo = JSON.parse(JSON.stringify(this.certificateInfo));

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
                contactInfo: contactInfo,
                certificateInfo: certificateInfo

            };

            var bizselfUrl = apiHost + urlList.bizself;
            var vm = this;
            Vue.http.post(bizselfUrl, param, null).then(function (response) {
                var result = response.json();
                if (result.status === 0) {
                    alert('保存成功');
                    window.scroll(0, 0);
                    var clientHeight = window.screen.height;
                    document.getElementById('container').style.minHeight = clientHeight + 'px';

                    vm.config.submitForm = true;
                } else {
                    alert('接口请求失败');
                }
            }, function (err) {
                alert(err.message || '服务器错误');
            });
        },

        // 文件上传
        onFileChange: function (e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            var file = files[0];
            var fileUrl = apiHost + urlList.upload;
            var formData = new FormData();
            var options = {
                cache: false,
                processData: false,
                contentType: false
            };
            var vm = this;
            formData.append('file', file);

            // 只选择图片文件
            if (!file.type.match('image.*')) return;
            Vue.http.post(fileUrl, formData, options).then(function (response) {
                var result = response.json();
                if (result.status === 0) {
                   vm.certificateInfo.push(result.data);
                } else {
                    alert('上传失败');
                }
            }, function (err) {
                alert(err.message || '服务器错误');
            });
            document.getElementById('hue-file').value = "";
        },
        // 移除图片
        removeImage: function (index) {
            this.certificateInfo.splice(index, 1);
        }
    }
});
vue.init();
