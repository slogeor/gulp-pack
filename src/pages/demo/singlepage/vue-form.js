!(function () {
    var vueForm = {};
    vueForm.install = function (Vue) {
        function closest(elem, selector) {
            for (var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector; elem;) {
                if (matchesSelector.call(elem, selector)) return elem;
                elem = elem.parentElement
            }
            return null
        }

        function removeClassWithPrefix(el, prefix) {
            var classes = el.className.split(" ").filter(function (c) {
                return 0 !== c.lastIndexOf(prefix, 0)
            });
            el.className = classes.join(" ").trim()
        }

        function checkAttribute($this, scope, attribute, objectBinding) {
            var vueFormCtrl = $this._vueFormCtrl,
                binding = "undefined" != typeof objectBinding[attribute] ? objectBinding[attribute] + "" : Vue.util.getBindAttr($this.el, attribute);
            binding && scope.$watch(binding, function (value, oldValue) {
                vueFormCtrl[attribute] = value, "type" === attribute ? (delete vueFormCtrl.validators[oldValue], vueFormCtrl.validators[value] = validators[value]) : "custom-validator" === attribute ? vueFormCtrl.validators[attribute] = scope.$eval(binding) : (vueFormCtrl.validators[attribute] = validators[attribute], (value === !1 || "undefined" == typeof value) && (vueFormCtrl.validators[attribute] = !1)), $this._vueForm ? vueFormCtrl.validate() : Vue.nextTick(function () {
                    Vue.nextTick(function () {
                        vueFormCtrl.validate()
                    })
                })
            }, {
                immediate: !0
            });
            var staticAttr = $this.el.getAttribute(attribute);
            null !== staticAttr && (vueFormCtrl[attribute] = staticAttr || !0, "type" === attribute ? vueFormCtrl.validators[staticAttr] = validators[staticAttr] : "custom-validator" === attribute ? vueFormCtrl.validators[attribute] = scope[staticAttr] : vueFormCtrl.validators[attribute] = validators[attribute])
        }
        var emailRegExp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
            urlRegExp = /^(http\:\/\/|https\:\/\/)(.{4,})$/,
            dirtyClass = "vf-dirty",
            pristineClass = "vf-pristine",
            validClass = "vf-valid",
            invalidClass = "vf-invalid",
            submittedClass = "vf-submitted",
            touchedClass = "vf-touched",
            untouchedClass = "vf-untouched",
            attrs = ["type", "required", "pattern", "multiple", "minlength", "maxlength", "min", "max", "custom-validator"],
            attrsWithValue = ["minlength", "maxlength", "min", "max", "pattern"],
            validators = {
                required: function (value) {
                    return Vue.util.isArray(value) ? !!value.length : !!value
                },
                email: function (value, multiple) {
                    return emailRegExp.test(value)
                },
                number: function (value) {
                    return !isNaN(value)
                },
                url: function (value) {
                    return urlRegExp.test(value)
                },
                minlength: function (value, length) {
                    return value.length >= length
                },
                maxlength: function (value, length) {
                    return length >= value.length
                },
                pattern: function (value, pattern) {
                    var patternRegExp = new RegExp("^" + pattern + "$");
                    return patternRegExp.test(value)
                },
                min: function (value, min) {
                    return 1 * value >= 1 * min
                },
                max: function (value, max) {
                    return 1 * max >= 1 * value
                }
            };
        Vue.directive("form", {
            id: "form",
            priority: 10001,
            bind: function () {
                var el = this.el,
                    formName = el.getAttribute("name"),
                    hook = el.getAttribute("hook"),
                    vm = this.vm,
                    controls = {};
                el.noValidate = !0;
                var state = this._state = {
                    $name: formName,
                    $dirty: !1,
                    $pristine: !0,
                    $valid: !0,
                    $invalid: !1,
                    $submitted: !1,
                    $touched: !1,
                    $untouched: !0,
                    $error: {}
                };
                vm.$set(formName, state), Vue.util.addClass(el, pristineClass), Vue.util.addClass(el, validClass), Vue.util.addClass(el, untouchedClass);
                var vueForm = this.el._vueForm = {
                    name: formName,
                    state: state,
                    controls: controls,
                    addControl: function (ctrl) {
                        controls[ctrl.name] = ctrl
                    },
                    removeControl: function (ctrl) {
                        this.removeError(ctrl.name), delete controls[ctrl.name], this.checkValidity()
                    },
                    setData: function (key, data) {
                        vm.$set(formName + "." + key, data)
                    },
                    removeError: function (key) {
                        state.$error[key] = !1, delete state.$error[key]
                    },
                    checkValidity: function () {
                        var isValid = !0;
                        Object.keys(controls).forEach(function (ctrl) {
                            controls[ctrl].state.$invalid && (isValid = !1)
                        }), this.setValidity(isValid)
                    },
                    setValidity: function (isValid) {
                        state.$valid = isValid, state.$invalid = !isValid, isValid ? (Vue.util.addClass(el, validClass), Vue.util.removeClass(el, invalidClass), removeClassWithPrefix(el, invalidClass + "-")) : (Vue.util.removeClass(el, validClass), Vue.util.addClass(el, invalidClass))
                    },
                    setDirty: function () {
                        state.$dirty = !0, state.$pristine = !1, Vue.util.addClass(el, dirtyClass), Vue.util.removeClass(el, pristineClass)
                    },
                    setPristine: function () {
                        state.$dirty = !1, state.$pristine = !0, Object.keys(controls).forEach(function (ctrl) {
                            controls[ctrl].setPristine()
                        }), vueForm.setSubmitted(!1), Vue.util.removeClass(el, dirtyClass), Vue.util.addClass(el, pristineClass)
                    },
                    setSubmitted: function (isSubmitted) {
                        state.$submitted = isSubmitted, isSubmitted ? Vue.util.addClass(el, submittedClass) : Vue.util.removeClass(el, submittedClass)
                    },
                    setTouched: function () {
                        state.$touched = !0, state.$untouched = !1, Vue.util.addClass(el, touchedClass), Vue.util.removeClass(el, untouchedClass)
                    },
                    setUntouched: function () {
                        state.$touched = !1, state.$untouched = !0, Vue.util.removeClass(el, touchedClass), Vue.util.addClass(el, untouchedClass), Object.keys(controls).forEach(function (ctrl) {
                            controls[ctrl].setUntouched()
                        })
                    }
                };
                hook && vm[hook](vueForm), this._submitEvent = function () {
                    vueForm.setSubmitted(!0)
                }, Vue.util.on(el, "submit", this._submitEvent)
            },
            update: function () {},
            unbind: function () {
                Vue.util.off(this.el, "submit", this._submitEvent), delete this.el._vueForm
            }
        }), Vue.directive("formCtrl", {
            id: "formCtrl",
            priority: 1e4,
            deep: !0,
            bind: function () {
                function init(vueForm) {
                    if (vueForm) {
                        self._vueForm = vueForm, vueForm.addControl(vueFormCtrl), vueForm.setData(inputName, state), Vue.util.addClass(el, pristineClass), Vue.util.addClass(el, validClass), Vue.util.addClass(el, untouchedClass), Vue.util.on(el, "blur", vueFormCtrl.setTouched);
                        var first = !0;
                        vModel && scope.$watch(vModel, function (value, oldValue) {
                            first || vueFormCtrl.setDirty(), first = !1, self._value = value, vueFormCtrl.validate(value)
                        }, {
                            immediate: !0
                        })
                    }
                }
                var scope, objectBinding, inputName = this.el.getAttribute("name"),
                    boundInputName = this.el.getAttribute(":name") || this.el.getAttribute("v-bind:name"),
                    objectBindingExp = this.el.getAttribute(":") || this.el.getAttribute("v-bind"),
                    vModel = this.el.getAttribute("v-model"),
                    hook = this.el.getAttribute("hook"),
                    vm = this.vm,
                    el = this.el,
                    self = this;
                if (scope = this._scope ? this._scope : this.vm, boundInputName && scope.$watch(boundInputName, function (value) {
                        inputName = value
                    }, {
                        immediate: !0
                    }), null !== objectBindingExp && (objectBinding = scope.$eval(objectBindingExp), objectBinding.name && (inputName = objectBinding.name)), !inputName) return void console.warn("Name attribute must be populated");
                var state = self._state = {
                        $name: inputName,
                        $dirty: !1,
                        $pristine: !0,
                        $valid: !0,
                        $invalid: !1,
                        $touched: !1,
                        $untouched: !0,
                        $error: {}
                    },
                    vueFormCtrl = el._vueFormCtrl = self._vueFormCtrl = {
                        el: el,
                        name: inputName,
                        state: state,
                        setVadility: function (key, isValid) {
                            var vueForm = self._vueForm;
                            if (vueForm) {
                                if ("boolean" == typeof key) return state.$valid = isValid, state.$invalid = !isValid, isValid ? (vueForm.removeError(inputName), Vue.util.addClass(el, validClass), Vue.util.removeClass(el, invalidClass)) : (Vue.util.removeClass(el, validClass), Vue.util.addClass(el, invalidClass)), void vueForm.checkValidity();
                                key = Vue.util.camelize(key), isValid ? (vueForm.setData(inputName + ".$error." + key, !1), delete state.$error[key], removeClassWithPrefix(el, invalidClass + "-")) : (vueForm.setData(inputName + ".$error." + key, !0), vueForm.setData("$error." + inputName, state), Vue.util.addClass(el, invalidClass + "-" + key))
                            }
                        },
                        setDirty: function () {
                            state.$dirty = !0, state.$pristine = !1, self._vueForm.setDirty(), Vue.util.addClass(el, dirtyClass), Vue.util.removeClass(el, pristineClass)
                        },
                        setPristine: function () {
                            state.$dirty = !1, state.$pristine = !0, Vue.util.removeClass(el, dirtyClass), Vue.util.addClass(el, pristineClass)
                        },
                        setTouched: function (isTouched) {
                            state.$touched = !0, state.$untouched = !1, self._vueForm.setTouched(), Vue.util.addClass(el, touchedClass), Vue.util.removeClass(el, untouchedClass)
                        },
                        setUntouched: function (isTouched) {
                            state.$touched = !1, state.$untouched = !0, Vue.util.removeClass(el, touchedClass), Vue.util.addClass(el, untouchedClass)
                        },
                        validators: {},
                        error: {},
                        validate: function () {
                            var isValid = !0,
                                _this = this,
                                value = self._value;
                            return Object.keys(this.validators).forEach(function (validator) {
                                var args = [value];
                                if (_this.validators[validator] === !1) return void _this.setVadility(validator, !0);
                                if (_this.validators[validator]) {
                                    if ("required" !== validator && !value && "number" != typeof value) return void _this.setVadility(validator, !0);
                                    "email" === validator ? args.push(_this.multiple) : -1 !== attrsWithValue.indexOf(validator) && args.push(_this[validator]), _this.validators[validator].apply(this, args) ? _this.setVadility(validator, !0) : (isValid = !1, _this.setVadility(validator, !1))
                                }
                            }), _this.setVadility(!0, isValid), isValid
                        }
                    };
                attrs.forEach(function (attr) {
                    checkAttribute(self, scope, attr, objectBinding || {})
                });
                var form;
                el.form ? init(el.form._vueForm) : (form = closest(el, "form[name]"), form && form._vueForm ? init(form._vueForm) : setTimeout(function () {
                    form = el.form || closest(el, "form[name]"), init(form._vueForm)
                }, 0)), hook && vm[hook](vueFormCtrl)
            },
            update: function (value, oldValue) {
                "undefined" != typeof value && (this._notfirst && this._vueFormCtrl.setDirty(), this._notfirst = !0, this._value = value, this._vueFormCtrl.validate(value))
            },
            unbind: function () {
                this._vueForm.removeControl(this._vueFormCtrl), Vue.util.off(this.el, "blur", this._vueFormCtrl.setTouched), delete this.el._vueFormCtrl
            }
        })
    }, "object" == typeof exports ? module.exports = vueForm : "function" == typeof define && define.amd ? define([], function () {
        return vueForm
    }) : window.Vue && (window.vueForm = vueForm, Vue.use(vueForm))
}());
