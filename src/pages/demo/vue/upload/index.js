require('vue-resource');

new Vue({
    el: '#app',
    data: {
        image: ''
    },
    methods: {
        onFileChange(e) {
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
