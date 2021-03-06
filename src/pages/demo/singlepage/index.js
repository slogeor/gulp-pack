!(function(){var a={};a.install=function(j){function b(t,r){for(var s=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector;t;){if(s.call(t,r)){return t}t=t.parentElement}return null}function l(s,t){var r=s.className.split(" ").filter(function(u){return 0!==u.lastIndexOf(t,0)});s.className=r.join(" ").trim()}function q(v,s,t,u){var x=v._vueFormCtrl,w="undefined"!=typeof u[t]?u[t]+"":j.util.getBindAttr(v.el,t);w&&s.$watch(w,function(z,y){x[t]=z,"type"===t?(delete x.validators[y],x.validators[z]=e[z]):"custom-validator"===t?x.validators[t]=s.$eval(w):(x.validators[t]=e[t],(z===!1||"undefined"==typeof z)&&(x.validators[t]=!1)),v._vueForm?x.validate():j.nextTick(function(){j.nextTick(function(){x.validate()})})},{immediate:!0});var r=v.el.getAttribute(t);null!==r&&(x[t]=r||!0,"type"===t?x.validators[r]=e[r]:"custom-validator"===t?x.validators[t]=s[r]:x.validators[t]=e[t])}var m=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,h=/^(http\:\/\/|https\:\/\/)(.{4,})$/,c="vf-dirty",d="vf-pristine",k="vf-valid",p="vf-invalid",o="vf-submitted",g="vf-touched",f="vf-untouched",n=["type","required","pattern","multiple","minlength","maxlength","min","max","custom-validator"],i=["minlength","maxlength","min","max","pattern"],e={required:function(r){return j.util.isArray(r)?!!r.length:!!r},email:function(s,r){return m.test(s)},number:function(r){return !isNaN(r)},url:function(r){return h.test(r)},minlength:function(s,r){return s.length>=r},maxlength:function(s,r){return r>=s.length},pattern:function(t,s){var r=new RegExp("^"+s+"$");return r.test(t)},min:function(s,r){return 1*s>=1*r},max:function(s,r){return 1*r>=1*s}};j.directive("form",{id:"form",priority:10001,bind:function(){var v=this.el,t=v.getAttribute("name"),x=v.getAttribute("hook"),u=this.vm,r={};v.noValidate=!0;var w=this._state={$name:t,$dirty:!1,$pristine:!0,$valid:!0,$invalid:!1,$submitted:!1,$touched:!1,$untouched:!0,$error:{}};u.$set(t,w),j.util.addClass(v,d),j.util.addClass(v,k),j.util.addClass(v,f);var s=this.el._vueForm={name:t,state:w,controls:r,addControl:function(y){r[y.name]=y},removeControl:function(y){this.removeError(y.name),delete r[y.name],this.checkValidity()},setData:function(y,z){u.$set(t+"."+y,z)},removeError:function(y){w.$error[y]=!1,delete w.$error[y]},checkValidity:function(){var y=!0;Object.keys(r).forEach(function(z){r[z].state.$invalid&&(y=!1)}),this.setValidity(y)},setValidity:function(y){w.$valid=y,w.$invalid=!y,y?(j.util.addClass(v,k),j.util.removeClass(v,p),l(v,p+"-")):(j.util.removeClass(v,k),j.util.addClass(v,p))},setDirty:function(){w.$dirty=!0,w.$pristine=!1,j.util.addClass(v,c),j.util.removeClass(v,d)},setPristine:function(){w.$dirty=!1,w.$pristine=!0,Object.keys(r).forEach(function(y){r[y].setPristine()}),s.setSubmitted(!1),j.util.removeClass(v,c),j.util.addClass(v,d)},setSubmitted:function(y){w.$submitted=y,y?j.util.addClass(v,o):j.util.removeClass(v,o)},setTouched:function(){w.$touched=!0,w.$untouched=!1,j.util.addClass(v,g),j.util.removeClass(v,f)},setUntouched:function(){w.$touched=!1,w.$untouched=!0,j.util.removeClass(v,g),j.util.addClass(v,f),Object.keys(r).forEach(function(y){r[y].setUntouched()})}};x&&u[x](s),this._submitEvent=function(){s.setSubmitted(!0)},j.util.on(v,"submit",this._submitEvent)},update:function(){},unbind:function(){j.util.off(this.el,"submit",this._submitEvent),delete this.el._vueForm}}),j.directive("formCtrl",{id:"formCtrl",priority:10000,deep:!0,bind:function(){function D(F){if(F){C._vueForm=F,F.addControl(x),F.setData(A,r),j.util.addClass(u,d),j.util.addClass(u,k),j.util.addClass(u,f),j.util.on(u,"blur",x.setTouched);var G=!0;y&&E.$watch(y,function(I,H){G||x.setDirty(),G=!1,C._value=I,x.validate(I)},{immediate:!0})}}var E,t,A=this.el.getAttribute("name"),z=this.el.getAttribute(":name")||this.el.getAttribute("v-bind:name"),w=this.el.getAttribute(":")||this.el.getAttribute("v-bind"),y=this.el.getAttribute("v-model"),B=this.el.getAttribute("hook"),v=this.vm,u=this.el,C=this;if(E=this._scope?this._scope:this.vm,z&&E.$watch(z,function(F){A=F},{immediate:!0}),null!==w&&(t=E.$eval(w),t.name&&(A=t.name)),!A){return void console.warn("Name attribute must be populated")}var r=C._state={$name:A,$dirty:!1,$pristine:!0,$valid:!0,$invalid:!1,$touched:!1,$untouched:!0,$error:{}},x=u._vueFormCtrl=C._vueFormCtrl={el:u,name:A,state:r,setVadility:function(G,H){var F=C._vueForm;if(F){if("boolean"==typeof G){return r.$valid=H,r.$invalid=!H,H?(F.removeError(A),j.util.addClass(u,k),j.util.removeClass(u,p)):(j.util.removeClass(u,k),j.util.addClass(u,p)),void F.checkValidity()}G=j.util.camelize(G),H?(F.setData(A+".$error."+G,!1),delete r.$error[G],l(u,p+"-")):(F.setData(A+".$error."+G,!0),F.setData("$error."+A,r),j.util.addClass(u,p+"-"+G))}},setDirty:function(){r.$dirty=!0,r.$pristine=!1,C._vueForm.setDirty(),j.util.addClass(u,c),j.util.removeClass(u,d)},setPristine:function(){r.$dirty=!1,r.$pristine=!0,j.util.removeClass(u,c),j.util.addClass(u,d)
},setTouched:function(F){r.$touched=!0,r.$untouched=!1,C._vueForm.setTouched(),j.util.addClass(u,g),j.util.removeClass(u,f)},setUntouched:function(F){r.$touched=!1,r.$untouched=!0,j.util.removeClass(u,g),j.util.addClass(u,f)},validators:{},error:{},validate:function(){var G=!0,H=this,F=C._value;return Object.keys(this.validators).forEach(function(J){var I=[F];if(H.validators[J]===!1){return void H.setVadility(J,!0)}if(H.validators[J]){if("required"!==J&&!F&&"number"!=typeof F){return void H.setVadility(J,!0)}"email"===J?I.push(H.multiple):-1!==i.indexOf(J)&&I.push(H[J]),H.validators[J].apply(this,I)?H.setVadility(J,!0):(G=!1,H.setVadility(J,!1))}}),H.setVadility(!0,G),G}};n.forEach(function(F){q(C,E,F,t||{})});var s;u.form?D(u.form._vueForm):(s=b(u,"form[name]"),s&&s._vueForm?D(s._vueForm):setTimeout(function(){s=u.form||b(u,"form[name]"),D(s._vueForm)},0)),B&&v[B](x)},update:function(s,r){"undefined"!=typeof s&&(this._notfirst&&this._vueFormCtrl.setDirty(),this._notfirst=!0,this._value=s,this._vueFormCtrl.validate(s))},unbind:function(){this._vueForm.removeControl(this._vueFormCtrl),j.util.off(this.el,"blur",this._vueFormCtrl.setTouched),delete this.el._vueFormCtrl}})},"object"==typeof exports?module.exports=a:"function"==typeof define&&define.amd?define([],function(){return a}):window.Vue&&(window.vueForm=a,Vue.use(a))}());

!(function () {
    var apiHost = /meituan.com/.test(location.href) ? 'http://jiudian.meituan.com' : 'http://hotel.hoteldev.sankuai.com';
    var urlList = {
        province: '/api/v1/fe/cityselect/provinces',
        subarea: '/api/v1/fe/cityselect/subarea',
        bizself: '/api/v1/mta/sc/bizself',
        upload: '/api/v1/mta/sc/bizself/certificate/upload'
    };
    var vm = new Vue({
        el: '#container',
        data: {
            // 配置数据
            config: {
                disabled: false,
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
                var _vm = this;
                var provinceUrl = apiHost + urlList.province;
                Vue.http.get(provinceUrl, null, null).then(function (response) {
                    var result = response.json();
                    if (result.status === 0) {
                        _vm.config.provinceList = result.data;
                    } else {
                        alert('接口请求失败');
                    }
                }, function (err) {
                    alert(err.message || '服务器错误');
                });
            },

            // 获取子区域数据
            getSubarea: function (id, type) {
                var _vm = this;
                var subareaUrl = apiHost + urlList.subarea + '/' + id;
                Vue.http.get(subareaUrl, null, null).then(function (response) {
                    var result = response.json();
                    if (result.status === 0) {
                        if (type === 'city') {
                            _vm.config.cityList = result.data;
                            _vm.config.locationList = [];
                            _vm.basicInfo.cityId = -1;
                            _vm.basicInfo.locationId = -1;
                        } else if (type === 'location') {
                            _vm.config.locationList = result.data;
                            _vm.basicInfo.locationId = -1;
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
                var _vm = this;
                if (type === 'province') {
                    _vm.getSubarea(_vm.basicInfo.provinceId, 'city');
                } else if (type === 'city') {
                    _vm.getSubarea(_vm.basicInfo.cityId, 'location');
                }
            },

            // 表单提交
            submitForm: function () {
                this.config.submit = true;
                if (!this.myform.$valid) return;
                var basicInfo = JSON.parse(JSON.stringify(this.basicInfo));
                var contactInfo = JSON.parse(JSON.stringify(this.contactInfo));
                var certificateInfo = JSON.parse(JSON.stringify(this.certificateInfo));

                if (Number(basicInfo.provinceId) === -1) {
                    alert('请选择省份');
                    return;
                }

                if (Number(basicInfo.cityId) === -1) {
                    alert('请选择城市');
                    return;
                }

                if (Number(basicInfo.locationId) === -1) {
                    alert('请选择区域');
                    return;
                }

                var param = {
                    basicInfo: basicInfo,
                    contactInfo: contactInfo,
                    certificateInfo: certificateInfo

                };

                var bizselfUrl = apiHost + urlList.bizself;
                var _vm = this;
                Vue.http.post(bizselfUrl, param, null).then(function (response) {
                    var result = response.json();
                    if (result.status === 0) {
                        // alert('保存成功');
                        window.scroll(0, 0);
                        var clientHeight = window.screen.height;
                        document.getElementById('container').style.minHeight = clientHeight + 'px';

                        _vm.config.submitForm = true;
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
                var _vm = this;
                formData.append('file', file);

                // 只选择图片文件
                if (!file.type.match('image.*')) return;

                _vm.config.disabled = true;

                Vue.http.post(fileUrl, formData, options).then(function (response) {
                    var result = response.json();
                    if (result.status === 0) {
                        var img = new Image();
                        img.src = result.data.fileUrl;
                        img.onload = function ()  {
                            _vm.certificateInfo.push(result.data);
                            _vm.config.disabled = false;
                        };
                    } else {
                        _vm.config.disabled = false;
                        alert('上传失败');
                    }
                }, function (err) {
                    _vm.config.disabled = false;
                    alert(err.message || '服务器错误');
                });
                document.getElementById('hue-file').value = '';
            },
            selectFile: function () {
                if (this.config.disabled) return;
                document.getElementById('hue-file').click();
            },
            // 移除图片
            removeImage: function (item) {
                this.certificateInfo.$remove(item);
            }
        }
    });
    vm.init();
}());
