! function (t, e) {
    t.ES6Promise = e()
}(this, function () {
    "use strict";

    function t(t) {
        var e = typeof t;
        return null !== t && ("object" === e || "function" === e)
    }

    function e(t) {
        return "function" == typeof t
    }

    function n(t) {
        W = t
    }

    function r(t) {
        z = t
    }

    function o() {
        return function () {
            return process.nextTick(a)
        }
    }

    function i() {
        return "undefined" != typeof U ? function () {
            U(a)
        } : c()
    }

    function s() {
        var t = 0,
            e = new H(a),
            n = document.createTextNode("");
        return e.observe(n, {
            characterData: !0
        }),
            function () {
                n.data = t = ++t % 2
            }
    }

    function u() {
        var t = new MessageChannel;
        return t.port1.onmessage = a,
            function () {
                return t.port2.postMessage(0)
            }
    }

    function c() {
        var t = setTimeout;
        return function () {
            return t(a, 1)
        }
    }

    function a() {
        for (var t = 0; t < N; t += 2) {
            var e = Q[t],
                n = Q[t + 1];
            e(n), Q[t] = void 0, Q[t + 1] = void 0
        }
        N = 0
    }

    function f() {
        try {
            var t = Function("return this")().require("vertx");
            return U = t.runOnLoop || t.runOnContext, i()
        } catch (e) {
            return c()
        }
    }

    function l(t, e) {
        var n = this,
            r = new this.constructor(p);
        void 0 === r[V] && x(r);
        var o = n._state;
        if (o) {
            var i = arguments[o - 1];
            z(function () {
                return T(o, r, i, n._result)
            })
        } else j(n, r, t, e);
        return r
    }

    function h(t) {
        var e = this;
        if (t && "object" == typeof t && t.constructor === e) return t;
        var n = new e(p);
        return w(n, t), n
    }

    function p() { }

    function v() {
        return new TypeError("You cannot resolve a promise with itself")
    }

    function d() {
        return new TypeError("A promises callback cannot return that same promise.")
    }

    function _(t, e, n, r) {
        try {
            t.call(e, n, r)
        } catch (o) {
            return o
        }
    }

    function y(t, e, n) {
        z(function (t) {
            var r = !1,
                o = _(n, e, function (n) {
                    r || (r = !0, e !== n ? w(t, n) : A(t, n))
                }, function (e) {
                    r || (r = !0, S(t, e))
                }, "Settle: " + (t._label || " unknown promise"));
            !r && o && (r = !0, S(t, o))
        }, t)
    }

    function m(t, e) {
        e._state === Z ? A(t, e._result) : e._state === $ ? S(t, e._result) : j(e, void 0, function (e) {
            return w(t, e)
        }, function (e) {
            return S(t, e)
        })
    }

    function b(t, n, r) {
        n.constructor === t.constructor && r === l && n.constructor.resolve === h ? m(t, n) : void 0 === r ? A(t, n) : e(r) ? y(t, n, r) : A(t, n)
    }

    function w(e, n) {
        if (e === n) S(e, v());
        else if (t(n)) {
            var r = void 0;
            try {
                r = n.then
            } catch (o) {
                return void S(e, o)
            }
            b(e, n, r)
        } else A(e, n)
    }

    function g(t) {
        t._onerror && t._onerror(t._result), E(t)
    }

    function A(t, e) {
        t._state === X && (t._result = e, t._state = Z, 0 !== t._subscribers.length && z(E, t))
    }

    function S(t, e) {
        t._state === X && (t._state = $, t._result = e, z(g, t))
    }

    function j(t, e, n, r) {
        var o = t._subscribers,
            i = o.length;
        t._onerror = null, o[i] = e, o[i + Z] = n, o[i + $] = r, 0 === i && t._state && z(E, t)
    }

    function E(t) {
        var e = t._subscribers,
            n = t._state;
        if (0 !== e.length) {
            for (var r = void 0, o = void 0, i = t._result, s = 0; s < e.length; s += 3) r = e[s], o = e[s + n], r ? T(n, r, o, i) : o(i);
            t._subscribers.length = 0
        }
    }

    function T(t, n, r, o) {
        var i = e(r),
            s = void 0,
            u = void 0,
            c = !0;
        if (i) {
            try {
                s = r(o)
            } catch (a) {
                c = !1, u = a
            }
            if (n === s) return void S(n, d())
        } else s = o;
        n._state !== X || (i && c ? w(n, s) : c === !1 ? S(n, u) : t === Z ? A(n, s) : t === $ && S(n, s))
    }

    function M(t, e) {
        try {
            e(function (e) {
                w(t, e)
            }, function (e) {
                S(t, e)
            })
        } catch (n) {
            S(t, n)
        }
    }

    function P() {
        return tt++
    }

    function x(t) {
        t[V] = tt++ , t._state = void 0, t._result = void 0, t._subscribers = []
    }

    function C() {
        return new Error("Array Methods must be provided an Array")
    }

    function O(t) {
        return new et(this, t).promise
    }

    function k(t) {
        var e = this;
        return new e(L(t) ? function (n, r) {
            for (var o = t.length, i = 0; i < o; i++) e.resolve(t[i]).then(n, r)
        } : function (t, e) {
            return e(new TypeError("You must pass an array to race."))
        })
    }

    function F(t) {
        var e = this,
            n = new e(p);
        return S(n, t), n
    }

    function Y() {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
    }

    function q() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
    }

    function D() {
        var t = void 0;
        if ("undefined" != typeof global) t = global;
        else if ("undefined" != typeof self) t = self;
        else try {
            t = Function("return this")()
        } catch (e) {
            throw new Error("polyfill failed because global object is unavailable in this environment")
        }
        var n = t.Promise;
        if (n) {
            var r = null;
            try {
                r = Object.prototype.toString.call(n.resolve())
            } catch (e) { }
            if ("[object Promise]" === r && !n.cast) return
        }
        t.Promise = nt
    }
    var K = void 0;
    K = Array.isArray ? Array.isArray : function (t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    };
    var L = K,
        N = 0,
        U = void 0,
        W = void 0,
        z = function (t, e) {
            Q[N] = t, Q[N + 1] = e, N += 2, 2 === N && (W ? W(a) : R())
        },
        B = "undefined" != typeof window ? window : void 0,
        G = B || {},
        H = G.MutationObserver || G.WebKitMutationObserver,
        I = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
        J = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
        Q = new Array(1e3),
        R = void 0;
    R = I ? o() : H ? s() : J ? u() : void 0 === B && "function" == typeof require ? f() : c();
    var V = Math.random().toString(36).substring(2),
        X = void 0,
        Z = 1,
        $ = 2,
        tt = 0,
        et = function () {
            function t(t, e) {
                this._instanceConstructor = t, this.promise = new t(p), this.promise[V] || x(this.promise), L(e) ? (this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? A(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(e), 0 === this._remaining && A(this.promise, this._result))) : S(this.promise, C())
            }
            return t.prototype._enumerate = function (t) {
                for (var e = 0; this._state === X && e < t.length; e++) this._eachEntry(t[e], e)
            }, t.prototype._eachEntry = function (t, e) {
                var n = this._instanceConstructor,
                    r = n.resolve;
                if (r === h) {
                    var o = void 0,
                        i = void 0,
                        s = !1;
                    try {
                        o = t.then
                    } catch (u) {
                        s = !0, i = u
                    }
                    if (o === l && t._state !== X) this._settledAt(t._state, e, t._result);
                    else if ("function" != typeof o) this._remaining-- , this._result[e] = t;
                    else if (n === nt) {
                        var c = new n(p);
                        s ? S(c, i) : b(c, t, o), this._willSettleAt(c, e)
                    } else this._willSettleAt(new n(function (e) {
                        return e(t)
                    }), e)
                } else this._willSettleAt(r(t), e)
            }, t.prototype._settledAt = function (t, e, n) {
                var r = this.promise;
                r._state === X && (this._remaining-- , t === $ ? S(r, n) : this._result[e] = n), 0 === this._remaining && A(r, this._result)
            }, t.prototype._willSettleAt = function (t, e) {
                var n = this;
                j(t, void 0, function (t) {
                    return n._settledAt(Z, e, t)
                }, function (t) {
                    return n._settledAt($, e, t)
                })
            }, t
        }(),
        nt = function () {
            function t(e) {
                this[V] = P(), this._result = this._state = void 0, this._subscribers = [], p !== e && ("function" != typeof e && Y(), this instanceof t ? M(this, e) : q())
            }
            return t.prototype["catch"] = function (t) {
                return this.then(null, t)
            }, t.prototype["finally"] = function (t) {
                var n = this,
                    r = n.constructor;
                return e(t) ? n.then(function (e) {
                    return r.resolve(t()).then(function () {
                        return e
                    })
                }, function (e) {
                    return r.resolve(t()).then(function () {
                        throw e
                    })
                }) : n.then(t, t)
            }, t
        }();
    return nt.prototype.then = l, nt.all = O, nt.race = k, nt.resolve = h, nt.reject = F, nt._setScheduler = n, nt._setAsap = r, nt._asap = z, nt.polyfill = D, nt.Promise = nt, nt.polyfill(), nt
});
"use strict";
var MsCrmMkt;
(function (MsCrmMkt) {
    var Captcha = function () {
        function Captcha() {
            this.error = 0;
            this.left = "10";
            this.showInstruction = true;
            this.showMenu = true;
            this.showError = true;
            this.errorMessage = "";
            this.instructionsInside = false;
            this.inputWidth = 245;
            this.done = false;
            this.holder = "ms_captcha_holder";
            this.scriptHolder = "ms_captcha_scriptholder";
            this.count = 0;
            this.type = "visual";
            this.market = "en-us"
        }
        Captcha.prototype.getInstruction = function () { };
        Captcha.prototype.getMenu = function () { };
        Captcha.prototype.getError = function () {
            return null
        };
        Captcha.prototype.getSolution = function () { };
        Captcha.prototype.reloadHIP = function () { };
        Captcha.prototype.switchHIP = function () { };
        Captcha.prototype.clientValidation = function () { };
        Captcha.prototype.setError = function () {
            return null
        };
        Captcha.prototype.setFocus = function () { };
        Captcha.prototype.verify = function (callback, param) { };
        Captcha.prototype.instructionOutsideCallback = function (instruction) {
            this.instructionCallback(instruction)
        };
        Captcha.prototype.menuOutsideCallback = function (menu) {
            this.refreshOutsideMenu(menu)
        };
        Captcha.prototype.showErrorCallback = function (message) {
            var ele = document.getElementById("idError");
            if (ele) {
                ele.innerHTML = message
            }
        };
        Captcha.prototype.removeErrorCallback = function () {
            var ele = document.getElementById("idError");
            if (ele) {
                ele.innerHTML = ""
            }
        };
        Captcha.prototype.postLoad = function () {
            var inputId = this.setError();
            var messageText = this.getError();
            if (messageText && inputId) {
                var captchaInput = document.getElementById(inputId);
                if (captchaInput) {
                    captchaInput.focus()
                }
            }
        };
        Captcha.prototype.verifyCallback = function (solution, token, param) {
            this.clientValidation();
            if (this.error != 0) {
                return
            }
            document.getElementById("Solution").value = solution;
            document.getElementById("Token").value = token;
            document.getElementById("Type").value = this.type;
            return
        };
        Captcha.prototype.refreshOutsideMenu = function (menu) {
            for (var i = 0; i < 4; i++) {
                var ele = document.getElementById("idMenu" + i);
                if (!ele) return;
                ele.innerHTML = "";
                ele.title = "";
                ele.onclick = function () { }
            }
            var itemLength = menu.length;
            if (!this.showMenu) {
                var _loop_1 = function (j) {
                    var ele = document.getElementById("idMenu" + j);
                    if (!ele) return {
                        value: void 0
                    };
                    ele.innerHTML = menu[j].text;
                    ele.title = menu[j].tip;
                    var trigger = menu[j].trigger;
                    ele.onclick = function () {
                        trigger();
                        return false
                    }
                };
                for (var j = 0; j < itemLength; j++) {
                    var state_1 = _loop_1(j);
                    if (typeof state_1 === "object") return state_1.value
                }
            }
        };
        Captcha.prototype.instructionCallback = function (instruction) {
            if (this.showInstruction) {
                var ins_1 = document.getElementById("idInstruction");
                if (ins_1) {
                    ins_1.innerHTML = ""
                }
                return
            }
            var ins = document.getElementById("idInstruction");
            if (ins) {
                ins.innerHTML = instruction
            }
        };
        Captcha.prototype.reloadCaptchaAndShowError = function () {
            var error = WLSPHIP0.error;
            this.reloadHIP();
            this.error = error;
            this.setError()
        };
        return Captcha
    }();
    MsCrmMkt.Captcha = Captcha
})(MsCrmMkt || (MsCrmMkt = {}));
var WLSPHIP0 = new MsCrmMkt.Captcha;
var MsCrmMkt;
(function (MsCrmMkt) {
    var FormEvent = function () {
        function FormEvent(formPageId, formPlaceholder) {
            this.formPageId = formPageId;
            this.formPlaceholder = formPlaceholder
        }
        FormEvent.prototype.getFormPageId = function () {
            return this.formPageId
        };
        FormEvent.prototype.getFormPlaceholder = function () {
            return this.formPlaceholder
        };
        FormEvent.prototype.preventDefault = function () {
            this.defaultPrevented = true
        };
        return FormEvent
    }();
    MsCrmMkt.FormEvent = FormEvent
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    var FormCaptureConfigProvider = function () {
        function FormCaptureConfigProvider() { }
        FormCaptureConfigProvider.getConfig = function () {
            var configElements = document.getElementsByClassName("d365-mkt-config");
            if (configElements.length > 0) {
                if (configElements.length > 1) {
                    window.console && window.console.log("only one element with class 'd365-mkt-config' is expected for tracking configuration")
                }
                var ignorePreventDefaultValue = configElements[0].getAttribute("data-ignore-prevent-default");
                return {
                    WebsiteId: configElements[0].getAttribute("data-website-id"),
                    HostName: configElements[0].getAttribute("data-hostname"),
                    IgnorePreventDefault: ignorePreventDefaultValue && ignorePreventDefaultValue.toLowerCase() === "true"
                }
            }
            return null
        };
        return FormCaptureConfigProvider
    }();
    MsCrmMkt.FormCaptureConfigProvider = FormCaptureConfigProvider
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    "use strict";
    var ScriptLoader = function () {
        function ScriptLoader() {
            this.loadedScripts = {};
            this.callbacks = {}
        }
        ScriptLoader.prototype.loadScript = function (src, callback) {
            var _this = this;
            if (this.loadedScripts[src]) {
                callback();
                return
            }
            if (this.callbacks[src]) {
                this.callbacks[src].push(callback);
                return
            }
            this.callbacks[src] = [callback];
            var scriptLoaded = false;
            var scriptElement = document.createElement("script");
            scriptElement.type = "text/javascript";
            scriptElement.src = src;
            var onLoadFunction = function () {
                if (!scriptLoaded && (!scriptElement.readyState || scriptElement.readyState === "complete")) {
                    scriptLoaded = true;
                    _this.loadedScripts[src] = true;
                    for (var i = 0; i < _this.callbacks[src].length; i++) {
                        _this.callbacks[src][i]()
                    }
                    _this.callbacks[src] = null
                }
            };
            scriptElement.onload = onLoadFunction;
            scriptElement.onreadystatechange = onLoadFunction;
            var firstScriptOnPage = document.getElementsByTagName("script")[0];
            firstScriptOnPage.parentNode.insertBefore(scriptElement, firstScriptOnPage)
        };
        ScriptLoader.prototype.ensureModernizr = function (callback) {
            if (typeof Modernizr !== "undefined") {
                callback();
                return
            }
            this.loadScript("https://ajax.aspnetcdn.com/ajax/modernizr/modernizr-2.8.3.js", callback)
        };
        ScriptLoader.prototype.ensureJquery = function (callback) {
            if (typeof $ !== "undefined") {
                callback($);
                return
            }
            if (typeof jQuery !== "undefined") {
                callback(jQuery);
                return
            }
            this.loadScript("https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.4.min.js", function () {
                callback($)
            })
        };
        ScriptLoader.prototype.ensureJqueryUI = function (callback) {
            var _this = this;
            this.ensureJquery(function ($) {
                if ($("#msdyncrm-mkt-jquery-ui-css").length === 0) {
                    $("head").append('<link id="msdyncrm-mkt-jquery-ui-css" rel="stylesheet" href="https://ajax.aspnetcdn.com/ajax/jquery.ui/1.12.1/themes/base/jquery-ui.css" />')
                }
                if ($.datepicker) {
                    callback();
                    return
                }
                _this.loadScript("https://ajax.aspnetcdn.com/ajax/jquery.ui/1.12.1/jquery-ui.min.js", callback)
            })
        };
        return ScriptLoader
    }();
    MsCrmMkt.ScriptLoader = ScriptLoader
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    var Telemetry;
    (function (Telemetry) {
        var internalStartTime = now();
        var TelemetryObject = function () {
            function TelemetryObject(serviceEndpoint) {
                var _this = this;
                if (serviceEndpoint === void 0) {
                    serviceEndpoint = ""
                }
                this.onUnloadFunction = null;
                this.serviceEndpoint = serviceEndpoint;
                this.formPageId = TelemetryObject.getFirstFormPageId();
                if (window.addEventListener) {
                    this.onUnloadFunction = function () {
                        _this.onUnload()
                    };
                    window.addEventListener("beforeunload", this.onUnloadFunction)
                }
            }
            TelemetryObject.prototype.onUnload = function () {
                var endpoint = this.getFormSendingUrl();
                if (!endpoint) {
                    return
                }
                var measure = new Telemetry.ImmediateMeasurement("MsCrmMkt.WindowUnload");
                var measurements = new Array(measure);
                measurements = getResourcesMeasurements(measurements);
                measurements = getNavigationMeasurements(measurements);
                var data = JSON.stringify(measurements);
                if (typeof navigator.sendBeacon === "function") {
                    navigator.sendBeacon(endpoint, data);
                    return
                }
                var request = new XMLHttpRequest;
                request.open("POST", endpoint, false);
                request.setRequestHeader("Content-Type", "text/plain");
                request.send(data)
            };
            TelemetryObject.prototype.getFormSendingUrl = function () {
                if (!this.formPageId || this.formPageId.length === 0 || !this.serviceEndpoint || this.serviceEndpoint.length === 0) {
                    return null
                }
                return [this.serviceEndpoint, "m", this.formPageId, "id", TelemetryObject.activityId].join("/")
            };
            TelemetryObject.getFirstFormPageId = function () {
                var formBlock = document.querySelector("[" + MsCrmMkt.formBlockIdAttrName + "]");
                if (formBlock) {
                    return formBlock.getAttribute(MsCrmMkt.formBlockIdAttrName)
                }
                return null
            };
            TelemetryObject.prototype.removeUnloadCallback = function () {
                if (window.removeEventListener && this.onUnloadFunction) {
                    window.removeEventListener("beforeunload", this.onUnloadFunction)
                }
            };
            TelemetryObject.prototype.sendMeasurements = function (measurements) {
                if (measurements === void 0) {
                    measurements = null
                }
                var url = this.getFormSendingUrl();
                if (url) {
                    measurements = getResourcesMeasurements(measurements);
                    measurements = getNavigationMeasurements(measurements);
                    measurements.push(new Measurement("MsCrmMkt.LoaderStartTime", internalStartTime));
                    var request = getSendRequest(url);
                    request.send(JSON.stringify(measurements))
                }
                this.removeUnloadCallback()
            };
            TelemetryObject.prototype.setActivityIdInRequest = function (request) {
                request.setRequestHeader("x-activity-id", TelemetryObject.activityId);
                request.setRequestHeader("x-ms-activity-id", TelemetryObject.activityId)
            };
            TelemetryObject.prototype.runAndMeasure = function (fun, name, measurements) {
                if (measurements === void 0) {
                    measurements = null
                }
                if (measurements == null) {
                    measurements = new Array
                }
                measurements.push(new ImmediateMeasurement(name + "Start"));
                var success = true;
                try {
                    fun()
                } catch (_a) {
                    success = false
                }
                measurements.push(new ImmediateMeasurement(name + "End", success));
                return measurements
            };
            TelemetryObject.activityId = generateUUID();
            return TelemetryObject
        }();
        Telemetry.TelemetryObject = TelemetryObject;
        var Measurement = function () {
            function Measurement(name, value, success) {
                if (success === void 0) {
                    success = true
                }
                this.name = name;
                this.value = value;
                this.success = success
            }
            return Measurement
        }();
        Telemetry.Measurement = Measurement;
        var ImmediateMeasurement = function () {
            function ImmediateMeasurement(name, success) {
                if (success === void 0) {
                    success = true
                }
                this.name = name;
                this.success = success;
                this.value = now()
            }
            return ImmediateMeasurement
        }();
        Telemetry.ImmediateMeasurement = ImmediateMeasurement;

        function now() {
            if (Date.now) {
                return Date.now()
            } else {
                return (new Date).getTime()
            }
        }

        function getSendRequest(endpoint) {
            var request = new XMLHttpRequest;
            request.open("POST", endpoint, true);
            request.setRequestHeader("Content-Type", "text/plain");
            return request
        }

        function performanceTimingEnabled() {
            return !!(window.performance && window.performance.timing)
        }

        function performanceNavigationEnabled() {
            return !!(window.performance && window.performance.navigation)
        }

        function performanceEntriesEnabled() {
            return !!window.performance.getEntriesByType
        }

        function getNavigationMeasurements(measurements) {
            if (measurements === void 0) {
                measurements = null
            }
            if (measurements == null) {
                measurements = new Array
            }
            if (performanceTimingEnabled()) {
                var navigationObject = window.performance.timing;
                measurements.push(new Measurement("MsCrmMkt.Navigation.NavigationStart", navigationObject.navigationStart));
                measurements.push(new Measurement("MsCrmMkt.Navigation.RedirectStart", navigationObject.redirectStart));
                measurements.push(new Measurement("MsCrmMkt.Navigation.RedirectEnd", navigationObject.redirectEnd));
                measurements.push(new Measurement("MsCrmMkt.Navigation.FetchStart", navigationObject.fetchStart));
                measurements.push(new Measurement("MsCrmMkt.Navigation.DomainLookupStart", navigationObject.domainLookupStart));
                measurements.push(new Measurement("MsCrmMkt.Navigation.DomainLookupEnd", navigationObject.domainLookupEnd));
                measurements.push(new Measurement("MsCrmMkt.Navigation.ConnectStart", navigationObject.connectStart));
                measurements.push(new Measurement("MsCrmMkt.Navigation.ConnectEnd", navigationObject.connectEnd));
                measurements.push(new Measurement("MsCrmMkt.Navigation.RequestStart", navigationObject.requestStart));
                measurements.push(new Measurement("MsCrmMkt.Navigation.ResponseStart", navigationObject.responseStart));
                measurements.push(new Measurement("MsCrmMkt.Navigation.ResponseEnd", navigationObject.responseEnd));
                measurements.push(new Measurement("MsCrmMkt.Navigation.DOMLoading", navigationObject.domLoading));
                measurements.push(new Measurement("MsCrmMkt.Navigation.DOMInteractive", navigationObject.domInteractive));
                measurements.push(new Measurement("MsCrmMkt.Navigation.DOMComplete", navigationObject.domComplete));
                measurements.push(new Measurement("MsCrmMkt.Navigation.LoadEventStart", navigationObject.loadEventStart));
                measurements.push(new Measurement("MsCrmMkt.Navigation.LoadEventEnd", navigationObject.loadEventEnd))
            }
            return measurements
        }

        function getResourcesMeasurements(measurements) {
            if (measurements === void 0) {
                measurements = null
            }
            if (measurements == null) {
                measurements = new Array
            }
            if (performanceEntriesEnabled() && window.performance.getEntriesByType("resource").length > 0 && window.performance.getEntriesByType("resource")[0] instanceof PerformanceResourceTiming) {
                var resourceEntries = window.performance.getEntriesByType("resource");
                for (var i = 0; i < resourceEntries.length; i++) {
                    var url = resourceEntries[i].name;
                    var measureName = "";
                    if (url.search("^https?://.*dynamics.com/t/w") == 0) {
                        measureName = "MsCrmMkt.Resource.RequestW|" + url.substring(url.search("/t/w")) + "|"
                    } else if (url.search("^https?://.*dynamics.com/t/v") == 0) {
                        measureName = "MsCrmMkt.Resource.RequestV|" + url.substring(url.search("/t/v")) + "|"
                    } else if (url.search("^https?://.*dynamics.com/t/c") == 0) {
                        measureName = "MsCrmMkt.Resource.RequestC|" + url.substring(url.search("/t/c")) + "|"
                    } else if (url.search("^https?://.*dynamics.com/f/formpage") == 0) {
                        measureName = "MsCrmMkt.Resource.RequestF|" + url.substring(url.search("/f/formpage")) + "|"
                    } else if (url.search("^https?://.*js/loader.js") == 0 || url.search("^https?://.*js/form-loader.js") == 0) {
                        measureName = "MsCrmMkt.Resource.RequestLoader"
                    } else if (url.search("^https?://.*js/captcha.js") == 0) {
                        measureName = "MsCrmMkt.Resource.CaptchaLoader"
                    }
                    if (measureName != "") {
                        measurements.push(new Measurement(measureName + "Start", resourceEntries[i].startTime));
                        measurements.push(new Measurement(measureName + "End", resourceEntries[i].startTime + resourceEntries[i].duration))
                    }
                }
            }
            return measurements
        }

        function generateUUID() {
            var d = now();
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : r & 3 | 8).toString(16)
            })
        }
        Telemetry.generateUUID = generateUUID
    })(Telemetry = MsCrmMkt.Telemetry || (MsCrmMkt.Telemetry = {}))
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    var correlationUrlPath = "c";
    var correlationWithoutWebsiteUrlPath = "cc";
    var correlationMessage = "getCid";
    var CorrelationHandler = function () {
        function CorrelationHandler() { }
        CorrelationHandler.prototype.uuidv4 = function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == "x" ? r : r & 3 | 8;
                return v.toString(16)
            })
        };
        CorrelationHandler.prototype.establishCorrelation = function (baseUrl, websiteId, websiteVisitedQueryParams) {
            var _this = this;
            var queryParameters = "";
            if (websiteVisitedQueryParams && websiteVisitedQueryParams.length !== 0) {
                queryParameters += "?trackwebsitevisited=true&" + websiteVisitedQueryParams
            }
            var forms = MsCrmMkt.FormUtility.getAllForms().map(function (f) {
                return f.FormPageId
            });
            if (forms.length !== 0) {
                var prefix = queryParameters.length === 0 ? "?" : "&";
                queryParameters += prefix + "formPageIds=" + forms.join(",")
            }
            this.frame = document.createElement("iframe");
            this.frame.style.display = "none";
            this.frame.src = this.buildUrl(baseUrl, websiteId) + queryParameters;
            var a = document.createElement("a");
            a.href = this.frame.src;
            this.frameOrigin = a.protocol + "//" + a.hostname;
            var token = this.uuidv4();
            this.frame.onload = function () {
                _this.frame.contentWindow.postMessage({
                    msg: correlationMessage,
                    token: token
                }, _this.frameOrigin)
            };
            this.frame.onerror = function () {
                if (typeof _this.onCorrelationFailed === "function") {
                    _this.onCorrelationFailed(websiteId)
                }
            };
            this.receiveMessageListener = function (event) {
                _this.receiveMessage(event, websiteId, token)
            };
            window.addEventListener("message", this.receiveMessageListener, false);
            document.body.appendChild(this.frame)
        };
        CorrelationHandler.prototype.receiveMessage = function (event, websiteId, token) {
            if (event.origin !== this.frameOrigin) {
                return
            }
            var correlationResponse = event.data;
            if (correlationResponse.token && correlationResponse.token !== token) {
                return
            }
            if (correlationResponse.msg !== "cid") {
                if (typeof this.onCorrelationFailed === "function") {
                    this.onCorrelationFailed(null)
                }
                return
            }
            if (typeof this.onCorrelationEstablished === "function") {
                this.onCorrelationEstablished(websiteId, correlationResponse.data, correlationResponse.captureForms, correlationResponse.forms)
            }
        };
        CorrelationHandler.prototype.buildUrl = function (baseUrl, id) {
            if (typeof id === "undefined" || id == null) {
                return [baseUrl, correlationWithoutWebsiteUrlPath].join("/")
            }
            return [baseUrl, correlationUrlPath, id].join("/")
        };
        CorrelationHandler.prototype.dispose = function () {
            if (!this.frame) {
                return
            }
            window.removeEventListener("message", this.receiveMessageListener);
            this.receiveMessageListener = null;
            this.frame.parentNode.removeChild(this.frame)
        };
        return CorrelationHandler
    }();
    MsCrmMkt.CorrelationHandler = CorrelationHandler
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    "use strict";
    var requiredErrorMessageAttrName = "data-requiredErrorMessage";
    var formBlockPrefixAttrName = "data-formControlsPrefix";
    MsCrmMkt.formBlockIdAttrName = "data-form-block-id";
    MsCrmMkt.formAlreadyLoaded = false;
    var MsCrmFormLoader = function () {
        function MsCrmFormLoader(baseUrl, correlationId, knownForms, telemetryObject) {
            this.baseUrl = baseUrl;
            this.correlationId = correlationId;
            this.knownForms = knownForms;
            this.telemetryObject = telemetryObject;
            this.measurements = [];
            this.scriptLoader = new MsCrmMkt.ScriptLoader
        }
        MsCrmFormLoader.prototype.measuredCall = function (call, name) {
            if (name === void 0) {
                name = ""
            }
            this.measurements.push(new MsCrmMkt.Telemetry.ImmediateMeasurement(name + "Start"));
            try {
                call()
            } catch (e) {
                this.measurements.push(new MsCrmMkt.Telemetry.ImmediateMeasurement(name + "End", true));
                throw e
            }
            this.measurements.push(new MsCrmMkt.Telemetry.ImmediateMeasurement(name + "End", false))
        };
        MsCrmFormLoader.prototype.load = function () {
            var _this = this;
            MsCrmMkt.CssProvider.ensureDefaultStyles();
            return new ES6Promise.Promise(function (resolve, reject) {
                var promises = MsCrmMkt.FormUtility.getAllForms().map(function (f) {
                    return _this.loadForm(f)
                });
                ES6Promise.Promise.all(promises).then(function () {
                    _this.finishAndSendLogs(true);
                    resolve()
                }, function () {
                    _this.finishAndSendLogs(false);
                    reject()
                })
            })
        };
        MsCrmFormLoader.prototype.clientApiCallback = function (form, name, clientApiFunction) {
            this.measuredCall(function () {
                return form.FormPlaceholders.forEach(function (placeholder) {
                    var formEvent = new MsCrmMkt.FormEvent(form.FormPageId, placeholder);
                    clientApiFunction(form.FormPageId, formEvent)
                })
            }, name)
        };
        MsCrmFormLoader.getGlobalConfiguration = function () {
            var key = "msdyncrm_forms";
            if (typeof window[key] === "undefined") {
                var defaultConfig = {
                    FormsBeingLoaded: {},
                    FormsMetadata: {}
                };
                window[key] = defaultConfig
            }
            return window[key]
        };
        MsCrmFormLoader.prototype.loadForm = function (form) {
            var _this = this;
            var formLoaderDiv = document.createElement("div");
            formLoaderDiv.className = "formLoader";
            for (var _i = 0, _a = form.FormPlaceholders; _i < _a.length; _i++) {
                var formPlaceholder = _a[_i];
                formPlaceholder.appendChild(formLoaderDiv)
            }
            return new ES6Promise.Promise(function (resolve, reject) {
                var globalConfiguration = MsCrmFormLoader.getGlobalConfiguration();
                if (globalConfiguration.FormsBeingLoaded[form.FormPageId]) {
                    resolve();
                    return
                }
                globalConfiguration.FormsBeingLoaded[form.FormPageId] = true;
                _this.clientApiCallback(form, "MsCrmMkt.OnFormLoad_" + form.FormPageId + "_", function (formPageId, formEvent) {
                    return MsCrmFormLoader.onformload(formPageId, formEvent)
                });
                _this.measurements.push(new MsCrmMkt.Telemetry.ImmediateMeasurement("MsCrmMkt.LoadForm_" + form.FormPageId + "_Start", true));
                var formLoadFinished = function (success) {
                    return _this.measurements.push(new MsCrmMkt.Telemetry.ImmediateMeasurement("MsCrmMkt.LoadForm_" + form.FormPageId + "_End", success))
                };
                var onLoadSuccess = function (data) {
                    formLoadFinished(true);
                    try {
                        _this.processForm(form, data)
                    } catch (e) {
                        reject();
                        return
                    }
                    resolve()
                };
                if (_this.knownForms && _this.knownForms[form.FormPageId]) {
                    onLoadSuccess(_this.knownForms[form.FormPageId]);
                    return
                }
                _this.getForm(form.FormPageId).then(function (data) {
                    onLoadSuccess(data)
                }, function () {
                    formLoadFinished(false);
                    reject()
                })
            })
        };
        MsCrmFormLoader.prototype.finishAndSendLogs = function (sucess) {
            if (this.telemetryObject) {
                var finishedLoadingMeasurement = new MsCrmMkt.Telemetry.ImmediateMeasurement("MsCrmMkt.LoadedAllForms", sucess);
                this.measurements.push(finishedLoadingMeasurement);
                this.telemetryObject.sendMeasurements(this.measurements)
            }
        };
        MsCrmFormLoader.prototype.processForm = function (form, parsedResponse) {
            var _this = this;
            this.clientApiCallback(form, "MsCrmMkt.OnFormRender_" + form.FormPageId + "_", function (formPageId, formEvent) {
                return MsCrmFormLoader.onformrender(formPageId, formEvent)
            });
            if (parsedResponse.Form) {
                var metadata = {
                    ErrorMessage: parsedResponse.Form.ErrorMessage,
                    SuccessImageUrl: parsedResponse.Form.SuccessImageUrl,
                    ErrorImageUrl: parsedResponse.Form.ErrorImageUrl
                };
                var configuration = MsCrmFormLoader.getGlobalConfiguration();
                configuration.FormsMetadata[form.FormPageId] = metadata
            }
            this.renderForms(form, parsedResponse.Form.FormRendering);
            if (parsedResponse.PrefillData) {
                this.measuredCall(function () {
                    return _this.prefillData(form, parsedResponse.PrefillData)
                }, "MsCrmMkt.PrefillForm_" + form.FormPageId + "_")
            }
            if (parsedResponse.Form && parsedResponse.Form.ContainsCaptcha) {
                this.measuredCall(function () {
                    return _this.renderCaptcha(parsedResponse.Form.HipUrl, parsedResponse.Form.FlowId)
                }, "MsCrmMkt.RenderCaptcha_" + form.FormPageId + "_")
            }
            this.clientApiCallback(form, "MsCrmMkt.AfterFormRender_" + form.FormPageId + "_", function (formPageId, formEvent) {
                return MsCrmFormLoader.afterformrender(formPageId, formEvent)
            });
            this.attachSubmitHandlers(form, parsedResponse.Form.FormControlsMappings, parsedResponse.Form.ContainsCaptcha);
            this.attachValidationHandlers(form);
            this.clientApiCallback(form, "MsCrmMkt.AfterFormLoad_" + form.FormPageId + "_", function (formPageId, formEvent) {
                return MsCrmFormLoader.afterformload(formPageId, formEvent)
            })
        };
        MsCrmFormLoader.prototype.renderForms = function (form, formHtmlContent) {
            var _this = this;
            form.FormPlaceholders.forEach(function (placeholder) {
                var formLoaders = placeholder.getElementsByClassName("formLoader");
                for (var i = formLoaders.length - 1; i >= 0; --i) {
                    formLoaders[i].parentNode.removeChild(formLoaders[i])
                }
                var formFragment = _this.createFormDocumentFragment(formHtmlContent);
                var controlIdPrefix = placeholder.getAttribute(formBlockPrefixAttrName);
                _this.addControlsPrefix(formFragment, controlIdPrefix);
                placeholder.appendChild(formFragment);
                _this.modernizeIfNeeded(placeholder)
            })
        };
        MsCrmFormLoader.prototype.modernizeIfNeeded = function (placeholder) {
            var _this = this;
            var elements = placeholder.querySelectorAll("input[type='date']");
            if (elements.length === 0) {
                return
            }
            this.scriptLoader.ensureModernizr(function () {
                if (!Modernizr.inputtypes.date) {
                    _this.scriptLoader.ensureJqueryUI(function () {
                        $(placeholder).children("input[type='date']").datepicker({
                            dateFormat: MsCrmFormLoader.defaultDateFormat
                        })
                    })
                }
            })
        };
        MsCrmFormLoader.prototype.prefillData = function (form, prefillData) {
            var _this = this;
            if (!prefillData) {
                return
            }
            var _loop_2 = function (i) {
                var currentItem = prefillData[i];
                if (!currentItem || !currentItem.Key) {
                    return "continue"
                }
                form.FormPlaceholders.forEach(function (placeholder) {
                    var elements = placeholder.querySelectorAll('[name="' + currentItem.Key + '"]');
                    if (!elements || elements.length === 0) {
                        return
                    }
                    for (var j = 0; j < elements.length; j++) {
                        var element = elements[j];
                        if (element.nodeName === "INPUT" && element.type === "checkbox") {
                            element.checked = false
                        }
                    }
                    var value = currentItem.Value;
                    for (var j = 0; j < elements.length; j++) {
                        var element = elements[j];
                        var nodeName = element.nodeName;
                        var originalInputType = element.attributes["type"] ? element.attributes["type"].value : undefined;
                        if (nodeName === "INPUT") {
                            var input = element;
                            if (input.type === "checkbox") {
                                if (value && value.toUpperCase() === "TRUE") {
                                    input.checked = true
                                }
                                continue
                            }
                            if (input.type === "radio") {
                                var crmValue = _this.mapToCrmValue(value);
                                input.checked = input.value === crmValue;
                                continue
                            }
                            if (originalInputType === "datetime-local") {
                                var pattern = input.attributes["pattern"] ? input.attributes["pattern"].value : undefined;
                                if (input.type === "datetime-local" || input.type === "text" && pattern === MsCrmFormLoader.defaultDatetimePattern) {
                                    var localDateTime = new Date(value);
                                    var timezoneOffset = (new Date).getTimezoneOffset() * 6e4;
                                    var localISODateTime = new Date(localDateTime.getTime() - timezoneOffset).toISOString().slice(0, -8);
                                    input.value = localISODateTime
                                }
                                continue
                            }
                            if (originalInputType === "date") {
                                var pattern = input.attributes["pattern"] ? input.attributes["pattern"].value : undefined;
                                if (input.type === "date" || input.type === "text" && pattern === MsCrmFormLoader.defaultDatePattern) {
                                    var localDate = new Date(value);
                                    var isoDate = localDate.toISOString().split("T")[0];
                                    input.value = isoDate
                                }
                                continue
                            }
                            if (input.type === "button" || input.type === "submit" || input.type === "reset") {
                                continue
                            }
                            input.value = value;
                            continue
                        }
                        if (nodeName === "SELECT") {
                            var select = element;
                            if (select.type === "select-one") {
                                for (var k = 0; k < select.options.length; k++) {
                                    var option = select.options.item(k);
                                    var crmValue = _this.mapToCrmValue(value);
                                    option.selected = option.value === crmValue
                                }
                            }
                            continue
                        }
                        if (nodeName === "TEXTAREA") {
                            element.value = value;
                            continue
                        }
                    }
                })
            };
            for (var i = 0; i < prefillData.length; i++) {
                _loop_2(i)
            }
        };
        MsCrmFormLoader.prototype.mapToCrmValue = function (value) {
            var twoOptionsFlag = value === "True" || value === "False";
            if (!twoOptionsFlag) {
                return value
            }
            return value === "True" ? "1" : "0"
        };
        MsCrmFormLoader.prototype.createFormDocumentFragment = function (formHtmlContent) {
            var result = document.createDocumentFragment();
            var hostElement = document.createElement("div");
            hostElement.insertAdjacentHTML("beforeend", formHtmlContent);
            while (hostElement.hasChildNodes()) {
                result.appendChild(hostElement.firstChild)
            }
            return result
        };
        MsCrmFormLoader.prototype.addControlsPrefix = function (node, controlIdPrefix) {
            if (!controlIdPrefix || controlIdPrefix.trim().length === 0) {
                return
            }
            var labels = node.querySelectorAll("label[for]");
            for (var i = 0; i < labels.length; i++) {
                var label = labels[i];
                var controlId = label.getAttribute("for");
                var control = node.querySelector("[id='" + controlId + "']");
                if (control) {
                    var newId = controlIdPrefix + control.id;
                    control.id = newId;
                    label.setAttribute("for", newId)
                }
            }
        };
        MsCrmFormLoader.prototype.renderCaptcha = function (hipUrl, flowId) {
            if (!hipUrl || !flowId) {
                return
            }
            var scriptHolder = document.getElementById("ms_captcha_scriptholder");
            if (scriptHolder == null) {
                return
            }
            WLSPHIP0.error = 0;
            var renderScript = document.createElement("script");
            renderScript.src = hipUrl;
            var placeholderScript = scriptHolder.getElementsByTagName("script")[0];
            placeholderScript.parentNode.replaceChild(renderScript, placeholderScript);
            var captchaFlowId = document.getElementById("ms_captcha_flow_id");
            if (captchaFlowId != null) {
                captchaFlowId.value = flowId
            }
        };
        MsCrmFormLoader.prototype.getErrorMessage = function (formPageId) {
            var metadata = MsCrmFormLoader.getGlobalConfiguration().FormsMetadata[formPageId];
            return metadata ? metadata.ErrorMessage : null
        };
        MsCrmFormLoader.prototype.attachSubmitHandlers = function (form, formControlMapping, containsCaptcha) {
            var _this = this;
            form.FormPlaceholders.forEach(function (placeholder) {
                var allForms = placeholder.querySelectorAll("FORM");
                var _loop_3 = function (i) {
                    var currentForm = allForms[i];
                    currentForm.onsubmit = function (e) {
                        e.preventDefault();
                        if (typeof MsCrmFormLoader.onformsubmit === "function") {
                            var formEvent = new MsCrmMkt.FormEvent(form.FormPageId, placeholder);
                            MsCrmFormLoader.onformsubmit(form.FormPageId, formEvent);
                            if (formEvent.defaultPrevented) {
                                return
                            }
                        }
                        if (containsCaptcha) {
                            WLSPHIP0.verify(function (solution, token, param) {
                                return WLSPHIP0.verifyCallback(solution, token, param)
                            }, "");
                            if (WLSPHIP0.error !== 0) {
                                WLSPHIP0.reloadCaptchaAndShowError();
                                return
                            }
                        }
                        if (!_this.forwardToFriendValid(currentForm, formControlMapping)) {
                            _this.onFormSubmittedFeedback(currentForm, form.FormPageId, _this.getErrorMessage(form.FormPageId), true)
                        }
                        _this.serializeAndPostForm(currentForm, form.FormPageId).then(function (responseText) {
                            return _this.onFormSubmitted(form.FormPageId, responseText, currentForm)
                        }, function () {
                            return _this.onFormSubmittedFeedback(currentForm, form.FormPageId, _this.getErrorMessage(form.FormPageId), true)
                        })
                    }
                };
                for (var i = 0; i < allForms.length; i++) {
                    _loop_3(i)
                }
            })
        };
        MsCrmFormLoader.prototype.forwardToFriendValid = function (currentForm, formControlMapping) {
            if (!formControlMapping) {
                return true
            }
            var f2fTools = formControlMapping.filter(function (c) {
                return c.Type === "forwardToFriend" && c.FormControlId
            });
            if (!f2fTools.length) {
                return true
            }
            for (var _i = 0, f2fTools_1 = f2fTools; _i < f2fTools_1.length; _i++) {
                var f2fTool = f2fTools_1[_i];
                var f2fToolElements = currentForm.querySelectorAll("[name=" + f2fTool.FormControlId + "]");
                for (var i = 0; i < f2fToolElements.length; i++) {
                    var f2fToolElementInputs = f2fToolElements[i].querySelectorAll("input[name=f2f_email]");
                    for (var j = 0; j < f2fToolElementInputs.length; j++) {
                        var value = f2fToolElementInputs[j].value;
                        if (value && value.length) {
                            return true
                        }
                    }
                }
            }
            return false
        };
        MsCrmFormLoader.prototype.attachValidationHandlers = function (form) {
            var _this = this;
            form.FormPlaceholders.forEach(function (placeholder) {
                var allForms = placeholder.querySelectorAll("FORM");
                for (var i = 0; i < allForms.length; i++) {
                    var requiredElements = allForms[i].querySelectorAll("[required]");
                    for (var j = 0; j < requiredElements.length; j++) {
                        var requiredElement = requiredElements[j];
                        var tagName = requiredElement.tagName;
                        var type = requiredElement.type;
                        var isValidForPatternChange = tagName === "INPUT" && (type === "text" || type === "phone") || tagName === "TEXTAREA";
                        var currentPattern = requiredElement.pattern;
                        if (isValidForPatternChange && (!currentPattern || currentPattern.length === 0)) {
                            requiredElement.pattern = ".*\\S+.*"
                        }
                        requiredElement.addEventListener("change", _this.validateRequired, false);
                        requiredElement.addEventListener("invalid", _this.validateRequired, false)
                    }
                    var datetimeElements = allForms[i].querySelectorAll('[type="datetime-local"]');
                    for (var j = 0; j < datetimeElements.length; j++) {
                        if (datetimeElements[j].type === "text") {
                            if (!_this.isValidDatetime(datetimeElements[j].value)) {
                                datetimeElements[j].setCustomValidity(MsCrmFormLoader.datetimeErrorMessage)
                            }
                            datetimeElements[j].addEventListener("change", _this.validateDatetime(MsCrmFormLoader.datetimeErrorMessage), false)
                        }
                    }
                    var dateElements = allForms[i].querySelectorAll('[type="date"]');
                    for (var j = 0; j < dateElements.length; j++) {
                        if (dateElements[j].type === "text") {
                            if (!_this.isValidDatetime(dateElements[j].value)) {
                                dateElements[j].setCustomValidity(MsCrmFormLoader.dateErrorMessage)
                            }
                            dateElements[j].addEventListener("change", _this.validateDate(MsCrmFormLoader.dateErrorMessage), false)
                        }
                    }
                }
            })
        };
        MsCrmFormLoader.localizeRequiredErrorMessage = function (requiredElement) {
            if (requiredElement.validity.valueMissing || requiredElement.pattern === ".*\\S+.*" && requiredElement.validity.patternMismatch) {
                var errorMessage = requiredElement.getAttribute(requiredErrorMessageAttrName);
                if (errorMessage) {
                    requiredElement.setCustomValidity(errorMessage)
                }
            }
        };
        MsCrmFormLoader.prototype.validateRequired = function (e) {
            var target = e.target;
            target.setCustomValidity("");
            MsCrmFormLoader.localizeRequiredErrorMessage(target)
        };
        MsCrmFormLoader.prototype.validateDatetime = function (message) {
            return function (e) {
                var target = e.target;
                target.setCustomValidity("");
                var date = new Date(target.value);
                var isValidDatetime = date instanceof Date ? !isNaN(date.getTime()) : false;
                if (!isValidDatetime) {
                    target.setCustomValidity(message)
                }
            }
        };
        MsCrmFormLoader.prototype.validateDate = function (message) {
            return function (e) {
                var target = e.target;
                target.setCustomValidity("");
                var date = new Date(target.value);
                var isValidDatetime = date instanceof Date ? !isNaN(date.getTime()) : false;
                if (!isValidDatetime) {
                    target.setCustomValidity(message)
                }
            }
        };
        MsCrmFormLoader.prototype.isValidDatetime = function (datetime) {
            if (!datetime) {
                return true
            }
            var date = new Date(datetime);
            var isValidDatetime = date instanceof Date ? !isNaN(date.getTime()) : false;
            return isValidDatetime
        };
        MsCrmFormLoader.prototype.onFormSubmittedFeedback = function (form, formPageId, message, isError) {
            var _this = this;
            var metadata = MsCrmFormLoader.getGlobalConfiguration().FormsMetadata[formPageId];
            var container = MsCrmMkt.DialogProvider.showFeedback(isError, message, form, form.offsetHeight, form.offsetWidth, metadata ? metadata.ErrorImageUrl : null, metadata ? metadata.SuccessImageUrl : null);
            var button = container.getElementsByTagName("button")[0];
            button.addEventListener("click", function () {
                var configuration = MsCrmFormLoader.getGlobalConfiguration();
                configuration.FormsBeingLoaded[formPageId] = false;
                var placeHolder = container.parentElement;
                placeHolder.removeChild(container);
                _this.loadForm({
                    FormPageId: formPageId,
                    FormPlaceholders: [placeHolder]
                })
            })
        };
        MsCrmFormLoader.prototype.onFormSubmitted = function (formPageId, responseText, form) {
            if (!responseText) {
                if (typeof MsCrmFormLoader.afterformsubmit === "function") {
                    MsCrmFormLoader.afterformsubmit(formPageId)
                }
                return
            }
            var parsedResult = JSON.parse(responseText);
            if (parsedResult.SubmissionStatus && parsedResult.SubmissionStatus !== "Success") {
                if (parsedResult.MissingRequiredFields && parsedResult.MissingRequiredFields.length) {
                    if (typeof form.reportValidity === "function") {
                        form.reportValidity();
                        return
                    }
                    MsCrmMkt.CssProvider.ensureDefaultStyles();
                    var missingRequiredFields_1 = {};
                    parsedResult.MissingRequiredFields.forEach(function (f) {
                        return missingRequiredFields_1[f] = true
                    });
                    form.querySelectorAll("input,select,textarea").forEach(function (e) {
                        if (missingRequiredFields_1[e.name] || missingRequiredFields_1[e.id]) {
                            MsCrmMkt.CssProvider.addClass(e, MsCrmMkt.CssProvider.requiredFieldClassName())
                        } else {
                            MsCrmMkt.CssProvider.removeClass(e, MsCrmMkt.CssProvider.requiredFieldClassName())
                        }
                    });
                    return
                }
                if (parsedResult.SubmissionStatus === "LimitExceeded") {
                    var message = parsedResult.LimitExceededMessage || MsCrmFormLoader.limitExceededDefaultMessage;
                    this.onFormSubmittedFeedback(form, formPageId, message, true);
                    return
                }
                this.onFormSubmittedFeedback(form, formPageId, this.getErrorMessage(formPageId), true);
                return
            }
            if (!parsedResult.CaptchaVerificationResult) {
                WLSPHIP0.error = 1;
                WLSPHIP0.reloadCaptchaAndShowError();
                return
            }
            if (typeof MsCrmFormLoader.afterformsubmit === "function") {
                MsCrmFormLoader.afterformsubmit(formPageId)
            }
            var confirmationMessage = parsedResult.ConfirmationMessage;
            this.onFormSubmittedFeedback(form, formPageId, confirmationMessage, false);
            var redirectUrl = parsedResult.RedirectUrl;
            if (!this.isNullOrWhiteSpace(redirectUrl)) {
                document.location.href = redirectUrl
            }
        };
        MsCrmFormLoader.prototype.isNullOrWhiteSpace = function (text) {
            return typeof text === "undefined" || text == null || text.trim() === ""
        };
        MsCrmFormLoader.prototype.serializeForm = function (form) {
            if (!form) {
                return null
            }
            var elements = form.elements;
            var encodedData = [];
            for (var i = 0; i < elements.length; i++) {
                var currentElement = elements[i];
                var name_1 = currentElement["name"];
                if (!name_1) {
                    continue
                }
                var encodedName = encodeURIComponent(name_1);
                if (currentElement.nodeName === "INPUT") {
                    var input = currentElement;
                    var encodedValue = encodeURIComponent(input.value);
                    var originalInputType = input.attributes["type"] ? input.attributes["type"].value : undefined;
                    if (input.type === "file") {
                        continue
                    }
                    if (originalInputType === "datetime-local") {
                        var pattern = input.attributes["pattern"] ? input.attributes["pattern"].value : undefined;
                        if (input.type === "datetime-local" || input.type === "text" && pattern === MsCrmFormLoader.defaultDatetimePattern) {
                            if (input.value) {
                                var localDateTime = new Date(input.value.replace("T", " ").replace(/-/g, "/"));
                                var utcDateTime = localDateTime.toISOString();
                                var encodedUtcDateTime = encodeURIComponent(utcDateTime);
                                encodedData.push(encodedName + "=" + encodedUtcDateTime)
                            } else {
                                encodedData.push(encodedName + "=" + encodedValue)
                            }
                        }
                        continue
                    }
                    if (originalInputType === "date") {
                        var pattern = input.attributes["pattern"] ? input.attributes["pattern"].value : undefined;
                        if (input.type === "date" || input.type === "text" && pattern === MsCrmFormLoader.defaultDatePattern) {
                            encodedData.push(encodedName + "=" + encodedValue)
                        }
                        continue
                    }
                    if (input.type === "checkbox") {
                        if (input.checked) {
                            encodedData.push(encodedName + "=true")
                        }
                        continue
                    }
                    if (input.type === "radio") {
                        if (input.checked) {
                            encodedData.push(encodedName + "=" + encodedValue)
                        }
                        continue
                    }
                    encodedData.push(encodedName + "=" + encodedValue);
                    continue
                }
                if (currentElement.nodeName === "TEXTAREA") {
                    var input = currentElement;
                    var encodedValue = encodeURIComponent(input.value);
                    encodedData.push(encodedName + "=" + encodedValue);
                    continue
                }
                if (currentElement.nodeName === "BUTTON") {
                    var input = currentElement;
                    var encodedValue = encodeURIComponent(input.value);
                    encodedData.push(encodedName + "=" + encodedValue);
                    continue
                }
                if (currentElement.nodeName === "SELECT") {
                    var input = currentElement;
                    if (input.type === "select-one") {
                        var encodedValue = encodeURIComponent(input.value);
                        encodedData.push(encodedName + "=" + encodedValue)
                    }
                }
            }
            return encodedData.join("&")
        };
        MsCrmFormLoader.prototype.getForm = function (formPageId) {
            var _this = this;
            return new ES6Promise.Promise(function (resolve, reject) {
                var request = new XMLHttpRequest;
                var url = _this.buildUrl(formPageId);
                request.open("GET", url, true);
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        request.onreadystatechange = null;
                        var status_1 = request.status;
                        if (status_1 === 200 || status_1 === 204) {
                            var parsedResponse = JSON.parse(request.responseText);
                            if (!parsedResponse || !parsedResponse.Form || !parsedResponse.Form.FormRendering) {
                                throw "No form data"
                            }
                            resolve(parsedResponse);
                            return
                        }
                        reject({
                            status: status_1,
                            responseText: request.responseText
                        })
                    }
                };
                request.send()
            })
        };
        MsCrmFormLoader.prototype.serializeAndPostForm = function (formElement, formPageId) {
            return this.postForm(formPageId, this.serializeForm(formElement))
        };
        MsCrmFormLoader.prototype.postFormOnce = function (url, data) {
            return new ES6Promise.Promise(function (resolve, reject) {
                var request = new XMLHttpRequest;
                request.open("POST", url, true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        request.onreadystatechange = null;
                        if (request.status === 200) {
                            resolve(request.responseText);
                            return
                        }
                        reject()
                    }
                };
                request.send(data)
            })
        };
        MsCrmFormLoader.prototype.postForm = function (formPageId, data) {
            var _this = this;
            var maxRetries = 3;
            return new ES6Promise.Promise(function (resolve, reject) {
                var url = _this.buildUrl(formPageId);
                var retry = function () {
                    _this.postFormOnce(url, data).then(function (responseText) {
                        return resolve(responseText)
                    }, function (e) {
                        maxRetries--;
                        if (maxRetries === 0) {
                            reject(e);
                            return
                        }
                        retry()
                    })
                };
                retry()
            })
        };
        MsCrmFormLoader.prototype.buildUrl = function (id) {
            var urlParts = [this.baseUrl, "formpage", id];
            if (!!this.correlationId) {
                urlParts.push("correlation");
                urlParts.push(this.correlationId)
            }
            return urlParts.join("/")
        };
        MsCrmFormLoader.defaultDatetimePattern = "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}";
        MsCrmFormLoader.defaultDatePattern = "[0-9]{4}-[0-9]{2}-[0-9]{2}";
        MsCrmFormLoader.defaultDateFormat = "yy-mm-dd";
        MsCrmFormLoader.datetimeErrorMessage = "Invalid date or time value.";
        MsCrmFormLoader.dateErrorMessage = "Invalid date value.";
        MsCrmFormLoader.limitExceededDefaultMessage = "Requests count limit was exceeded";
        MsCrmFormLoader.onformload = function (formPageId, formEvent) { };
        MsCrmFormLoader.afterformload = function (formPageId, formEvent) { };
        MsCrmFormLoader.onformrender = function (formPageId, formEvent) { };
        MsCrmFormLoader.afterformrender = function (formPageId, formEvent) { };
        MsCrmFormLoader.onformsubmit = function (formPageId, formEvent) { };
        MsCrmFormLoader.afterformsubmit = function (formPageId) { };
        return MsCrmFormLoader
    }();
    MsCrmMkt.MsCrmFormLoader = MsCrmFormLoader
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    "use strict";
    var MsCrmPageLoader = function () {
        function MsCrmPageLoader(telemetryObject) {
            this.telemetryObject = telemetryObject
        }
        MsCrmPageLoader.prototype.load = function (serviceEndpoint, correlationId) {
            var configuration = MsCrmPageLoader.getConfiguration();
            if (!configuration || !configuration.id || configuration.id.length === 0) {
                return
            }
            var url = [serviceEndpoint, "p", configuration.id, "c", correlationId].join("/");
            var maxRetries = 3;
            this.getPersonalizedPage(maxRetries, url)
        };
        MsCrmPageLoader.ensurePersonalization = function () {
            if (document.readyState !== "loading") {
                MsCrmPageLoader.ensurePersonalizedPageLoaded()
            } else {
                document.addEventListener("DOMContentLoaded", MsCrmPageLoader.ensurePersonalizedPageLoaded)
            }
        };
        MsCrmPageLoader.prototype.getPersonalizedPage = function (retries, url) {
            var _this = this;
            var request = new XMLHttpRequest;
            request.open("GET", url, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        _this.signalSuccess(request.status, request.responseText);
                        return
                    }
                    if (retries > 0) {
                        _this.getPersonalizedPage(retries - 1, url);
                        return
                    }
                    _this.signalFailure(request.status, request.responseText);
                    return
                }
            };
            request.send()
        };
        MsCrmPageLoader.getConfiguration = function () {
            return window.msdyncrm_personalizedpage
        };
        MsCrmPageLoader.prototype.signalSuccess = function (status, responseText) {
            var parsedText;
            try {
                parsedText = JSON.parse(responseText)
            } catch (_a) {
                this.signalFailure(status, responseText);
                return
            }
            if (parsedText && parsedText.Error) {
                this.signalFailure(status, responseText);
                return
            }
            var configuration = MsCrmPageLoader.getConfiguration();
            if (configuration && configuration.success && typeof configuration.success === "function") {
                configuration.success(parsedText)
            }
        };
        MsCrmPageLoader.prototype.signalFailure = function (status, responseText) {
            var configuration = MsCrmPageLoader.getConfiguration();
            if (configuration && configuration.error && typeof configuration.error === "function") {
                configuration.error({
                    status: status,
                    responseText: responseText
                })
            }
        };
        MsCrmPageLoader.isCorrelationEstablished = function () {
            var trackingScriptBase = document.getElementsByClassName("ms_crm_trackingscript_base");
            if (trackingScriptBase.length > 0) {
                return true
            }
            var trackingScriptPresents = window.trackingScriptLoaded;
            if (typeof trackingScriptPresents !== "undefined" && trackingScriptPresents) {
                return true
            }
            var scripts = document.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src) continue;
                var content = scripts[i].innerHTML;
                if (content.indexOf("ms_tr_il_08") !== -1 || content.indexOf("ms_tr_il_w_01") !== -1) {
                    return true
                }
            }
            return false
        };
        MsCrmPageLoader.ensurePersonalizedPageLoaded = function () {
            if (MsCrmPageLoader.isCorrelationEstablished()) {
                return
            }
            var configuration = MsCrmPageLoader.getConfiguration();
            if (!configuration || !configuration.id || configuration.id.length === 0 || configuration._loaded) {
                return
            }
            configuration._loaded = true;
            var serviceEndpoint = configuration.endpoint;
            if (!serviceEndpoint || serviceEndpoint.length === 0) {
                return
            }
            var adParam = "ad=" + encodeURIComponent(document.location.toString()) + "&" + "id=" + encodeURIComponent(Math.floor(Math.random() * 9999999999).toString());
            var baseUrl = serviceEndpoint + "/t";
            var formsUrl = serviceEndpoint + "/f";
            var correlationHandler = new MsCrmMkt.CorrelationHandler;
            correlationHandler.onCorrelationEstablished = function (wid, correlationId, formsToCapture) {
                var telemetryObject = new MsCrmMkt.Telemetry.TelemetryObject(formsUrl);
                var pageLoader = new MsCrmMkt.MsCrmPageLoader(telemetryObject);
                pageLoader.load(formsUrl, correlationId);
                correlationHandler.dispose()
            };
            correlationHandler.onCorrelationFailed = function () {
                correlationHandler.dispose()
            };
            correlationHandler.establishCorrelation(baseUrl, null, adParam)
        };
        return MsCrmPageLoader
    }();
    MsCrmMkt.MsCrmPageLoader = MsCrmPageLoader
})(MsCrmMkt || (MsCrmMkt = {}));
MsCrmMkt.MsCrmPageLoader.ensurePersonalization();

function ms_tr_il_08(websiteId, serviceEndpoint, baseUrl, websiteVisitedQueryParams, correlationCallback) {
    if (MsCrmMkt.formAlreadyLoaded) {
        return
    }
    MsCrmMkt.formAlreadyLoaded = true;
    var telemetryObject = new MsCrmMkt.Telemetry.TelemetryObject(serviceEndpoint);
    var correlationHandler = new MsCrmMkt.CorrelationHandler;
    correlationHandler.onCorrelationEstablished = function (wid, correlationId, formsToCapture, forms) {
        var pageLoader = new MsCrmMkt.MsCrmPageLoader(telemetryObject);
        pageLoader.load(serviceEndpoint, correlationId);
        var formLoader = new MsCrmMkt.MsCrmFormLoader(serviceEndpoint, correlationId, forms, telemetryObject);
        formLoader.load();
        if (typeof correlationCallback === "function") {
            correlationCallback(formLoader, correlationId, formsToCapture)
        }
        correlationHandler.dispose()
    };
    correlationHandler.onCorrelationFailed = function () {
        var forms = MsCrmMkt.FormUtility.getAllForms().map(function (f) {
            return f.FormPlaceholders
        });
        var message = MsCrmMkt.LocalizationProvider.getMessage("InvalidDomain");
        var messageLink = MsCrmMkt.LocalizationProvider.getMessage("InvalidDomainLink");
        var messageUrl = MsCrmMkt.LocalizationProvider.getMessage("InvalidDomainURL");
        if (message) {
            forms.forEach(function (formPlaceholders) {
                formPlaceholders.forEach(function (formPlaceholder) {
                    MsCrmMkt.DialogProvider.showErrorMessage(message, messageUrl, messageLink, formPlaceholder, 400, 400)
                })
            })
        }
        console.log("The domain where this page is published isn't whitelisted for use the embedded forms");
        correlationHandler.dispose()
    };
    correlationHandler.establishCorrelation(baseUrl, websiteId, websiteVisitedQueryParams)
}
var ms_tr_il_w_01 = function () {
    var websiteId, tcMicroserviceUrl;

    function getLocationQueryParam() {
        return "ad=" + encodeURIComponent(document.location.toString())
    }

    function getReferrerQueryParam() {
        return "rf=" + encodeURIComponent(document.referrer)
    }

    function getRandomIdQueryParam() {
        return "id=" + encodeURIComponent(Math.floor(Math.random() * 9999999999).toString())
    }

    function getWebsiteInteractionUrl(interactionType) {
        return tcMicroserviceUrl + "/" + interactionType + "/" + websiteId + "?" + getLocationQueryParam() + "&" + getReferrerQueryParam() + "&" + getRandomIdQueryParam()
    }

    function appendLinkInfo(websiteInteractionUrl, tg, fn) {
        return websiteInteractionUrl + "&tg=" + encodeURIComponent(tg) + "&fn=" + encodeURIComponent(fn)
    }

    function performImageRequest(imgSrc, onImageLoaded) {
        var image = new Image;
        image.id = "i" + websiteId;
        image.width = 0;
        image.height = 0;
        image.src = imgSrc;
        image.onload = function () {
            var imgContainer = document.getElementById("d" + websiteId);
            if (imgContainer) {
                imgContainer.style.width = "0px";
                imgContainer.style.height = "0px";
                imgContainer.appendChild(image)
            }
            if (typeof onImageLoaded === "function") {
                onImageLoaded()
            }
        }
    }

    function requestWebsiteClicked(linkHref, linkText) {
        performImageRequest(appendLinkInfo(getWebsiteInteractionUrl("l"), linkHref, linkText), null)
    }

    function onClick(ev) {
        if (ev.button === 0 || ev.button === 1) {
            var t = ev.target;
            while (t && t.tagName !== "A") {
                t = t.parentElement || t.parentNode
            }
            if (t && t.getAttribute("data-msdyn-tracking") !== "false") {
                var ch = t.firstElementChild;
                requestWebsiteClicked(t.href, ch && (ch.alt || ch.title || ch.src) || t.text || t.innerText)
            }
        }
    }

    function listenClicks() {
        if (document.body.addEventListener) {
            var eventName = navigator.appVersion.indexOf("MSIE") === -1 ? "mousedown" : "click";
            document.body.addEventListener(eventName, onClick)
        }
    }
    return {
        w: function (wid, srv, c) {
            websiteId = wid;
            tcMicroserviceUrl = srv;
            listenClicks();
            var websiteVisitQueryParams = [getLocationQueryParam(), getReferrerQueryParam(), getRandomIdQueryParam()].join("&");
            c(websiteVisitQueryParams)
        }
    }
}();
var MsCrmMkt;
(function (MsCrmMkt) {
    "use strict";
    var FormCaptureState = function () {
        function FormCaptureState(sendSubmission, ignorePreventDefault, triggerSubmit) {
            this.sendSubmission = sendSubmission;
            this.ignorePreventDefault = ignorePreventDefault;
            this.triggerSubmit = triggerSubmit;
            this.ignoreSubmit = false
        }
        FormCaptureState.prototype.captureSubmit = function (event) {
            var _this = this;
            if (this.ignoreSubmit) {
                return
            }
            var defaultPrevented = event.defaultPrevented || typeof event.isDefaultPrevented === "function" && event.isDefaultPrevented();
            if (defaultPrevented && !this.ignorePreventDefault) {
                return
            }
            event.preventDefault();
            var formElement = event.target;
            var finishCapture = function () {
                try {
                    _this.ignoreSubmit = true;
                    _this.triggerSubmit(formElement)
                } finally {
                    _this.ignoreSubmit = false
                }
            };
            this.sendSubmission(defaultPrevented ? function () { } : finishCapture)
        };
        return FormCaptureState
    }();
    MsCrmMkt.FormCaptureState = FormCaptureState
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    "use strict";
    var FormCapture = function () {
        function FormCapture(loader, formsToCapture, baseUrl, config, correlationId) {
            this.loader = loader;
            this.formsToCapture = formsToCapture;
            this.baseUrl = baseUrl;
            this.config = config;
            this.correlationId = correlationId
        }
        FormCapture.prototype.submitFormWhenJQueryActive = function (form) {
            var button = form.ownerDocument.createElement("input");
            button.style.display = "none";
            button.type = "submit";
            form.appendChild(button).click();
            form.removeChild(button)
        };
        FormCapture.prototype.captureForms = function () {
            var _this = this;
            if (this.formsToCapture && this.formsToCapture.length > 0) {
                var visitData = {
                    location: document.location.toString(),
                    missingForms: [],
                    foundForms: []
                };
                var jQueryGlobal_1 = window["jQuery"] || window["$"];
                var jQuerySubmission = typeof jQueryGlobal_1 == "function" && typeof jQueryGlobal_1(document).submit == "function";
                var attachHandler = jQuerySubmission ? function (element, handler) {
                    jQueryGlobal_1(element).submit(handler)
                } : function (element, handler) {
                    element.addEventListener("submit", handler, true)
                };
                var triggerSubmission = jQuerySubmission ? function (element) {
                    _this.submitFormWhenJQueryActive(element)
                } : function (element) {
                    HTMLFormElement.prototype.submit.call(element)
                };
                var _loop_4 = function (captureDef) {
                    var form = this_1.findForm(captureDef);
                    if (!form) {
                        visitData.missingForms.push(captureDef);
                        window.console && window.console.log("form not found for " + JSON.stringify(captureDef));
                        return "continue"
                    }
                    var sendSubmission = function (finishCapture) {
                        return _this.loader.serializeAndPostForm(form, captureDef.blockId).then(function () {
                            return finishCapture()
                        }, function () {
                            return finishCapture()
                        })
                    };
                    form[FormCapture.captureKey] = new MsCrmMkt.FormCaptureState(sendSubmission, this_1.config.IgnorePreventDefault, triggerSubmission);
                    if (!form[FormCapture.handlerAttachedKey]) {
                        var submitHandler = function (event) {
                            if (event.target[FormCapture.captureKey]) {
                                event.target[FormCapture.captureKey].captureSubmit(event)
                            }
                        };
                        attachHandler(form, submitHandler);
                        form[FormCapture.handlerAttachedKey] = true
                    }
                    visitData.foundForms.push(this_1.reportFoundForm(captureDef, form))
                };
                var this_1 = this;
                for (var _i = 0, _a = this.formsToCapture; _i < _a.length; _i++) {
                    var captureDef = _a[_i];
                    _loop_4(captureDef)
                }
                this.post(this.baseUrl + ("/cv/" + encodeURIComponent(this.config.WebsiteId) + "/c/" + encodeURIComponent(this.correlationId)), visitData)
            }
        };
        FormCapture.prototype.reportFoundForm = function (record, form) {
            return {
                form: record,
                fields: Array.prototype.map.call(form.elements, function (e) {
                    return {
                        tagName: e.tagName,
                        type: e.type,
                        name: e.name,
                        typeAttr: e.getAttribute("type")
                    }
                })
            }
        };
        FormCapture.prototype.findForm = function (captureDef) {
            if (captureDef.formId.id) {
                var element = document.getElementById(captureDef.formId.id);
                if (!element || element.nodeName.toUpperCase() !== "FORM") {
                    window.console && window.console.log("Element with id " + captureDef.formId.id + " is not a form");
                    return null
                }
                return element
            }
            var attributeSelector = "";
            if (captureDef.formId.name) {
                attributeSelector += '[name="' + captureDef.formId.name + '"]'
            }
            if (captureDef.formId.action) {
                attributeSelector += '[action="' + captureDef.formId.action + '"]'
            }
            if (captureDef.formId.method) {
                attributeSelector += '[method="' + captureDef.formId.method + '"]'
            }
            if (attributeSelector !== "") {
                var forms = document.querySelectorAll("form" + attributeSelector);
                if (forms && forms.length === 1) {
                    window.console && window.console.log("Multiple forms selected by '" + attributeSelector + "', falling back to index");
                    return forms[0]
                }
            }
            if (typeof captureDef.formId.index === "number") {
                var allForms = document.forms;
                if (allForms && allForms.length > captureDef.formId.index) {
                    return allForms[captureDef.formId.index]
                }
            }
            return null
        };
        FormCapture.prototype.post = function (url, data) {
            var request = new XMLHttpRequest;
            request.open("POST", url, true);
            request.setRequestHeader("Content-Type", "text/plain");
            request.send(JSON.stringify(data))
        };
        FormCapture.captureKey = "msd365mktCaptureState";
        FormCapture.handlerAttachedKey = "msd365mktHandlerAttached";
        return FormCapture
    }();
    MsCrmMkt.FormCapture = FormCapture
})(MsCrmMkt || (MsCrmMkt = {}));
var PromiseModule;
(function (PromiseModule) {
    if (typeof ES6Promise !== "undefined") {
        ES6Promise.polyfill()
    }
})(PromiseModule || (PromiseModule = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    var FormUtility = function () {
        function FormUtility() { }
        FormUtility.getAllForms = function () {
            var forms = new Array;
            var formsMap = {};
            var formBlockElements = document.querySelectorAll("[" + MsCrmMkt.formBlockIdAttrName + "]");
            for (var i = 0; i < formBlockElements.length; i++) {
                var element = formBlockElements[i];
                var id = element.getAttribute(MsCrmMkt.formBlockIdAttrName);
                if (id) {
                    var form = formsMap[id];
                    if (form) {
                        form.FormPlaceholders.push(element);
                        continue
                    }
                    form = {
                        FormPageId: id,
                        FormPlaceholders: [element]
                    };
                    forms.push(form);
                    formsMap[id] = form
                }
            }
            return forms
        };
        return FormUtility
    }();
    MsCrmMkt.FormUtility = FormUtility
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    "use strict";

    function initTracking(config) {
        var formsRoute = "https://" + config.HostName + "/f";
        var trackingRoute = "https://" + config.HostName + "/t";
        var websiteScript = "https://" + config.HostName + "/t/w";
        var loadForms = typeof ms_tr_il_08 !== "function" ? null : ms_tr_il_08;
        var visitTracking = ms_tr_il_w_01 && ms_tr_il_w_01.w ? ms_tr_il_w_01 : null;

        function captureForms(formLoader, correlationId, formsToCapture) {
            if (formsToCapture) {
                new MsCrmMkt.FormCapture(formLoader, formsToCapture, formsRoute, config, correlationId).captureForms()
            }
        }

        function track(callback) {
            var count = 0;
            var trackVisitOnce = function () {
                if (count === 0) {
                    count++;
                    if (visitTracking) {
                        visitTracking.w(config.WebsiteId, trackingRoute, callback)
                    }
                }
            };
            var ts = document.createElement("script");
            ts.src = websiteScript;
            ts.type = "text/javascript";
            ts.onload = trackVisitOnce;
            ts["onreadystatechange"] = function () {
                if (this.readyState === "complete" || this.readyState === "loaded") {
                    trackVisitOnce()
                }
            };
            var head = document.getElementsByTagName("head")[0];
            head.appendChild(ts)
        }
        if (typeof loadForms === "function") {
            if (visitTracking !== null) {
                visitTracking.w(config.WebsiteId, trackingRoute, function (websiteVisitedParams) {
                    loadForms(config.WebsiteId, formsRoute, trackingRoute, websiteVisitedParams, captureForms)
                })
            } else {
                track(function () {
                    return loadForms(config.WebsiteId, formsRoute, trackingRoute, null, captureForms)
                })
            }
        } else {
            track(null)
        }
    }
    MsCrmMkt.initTracking = initTracking;

    function collectConfig() {
        var config = MsCrmMkt.FormCaptureConfigProvider.getConfig();
        if (config) {
            MsCrmMkt.initTracking(config)
        }
    }
    if (document.readyState !== "loading") {
        collectConfig()
    } else {
        document.addEventListener("DOMContentLoaded", collectConfig)
    }
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    var Localization = function () {
        function Localization() { }
        Localization.labels = {
            "ar-sa": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "ØªØ­ØªÙˆÙŠ Ù‡Ø°Ù‡ Ø§Ù„ØµÙØ­Ø© Ø¹Ù„Ù‰ Ù†Ù…ÙˆØ°Ø¬ ØªØ³ÙˆÙŠÙ‚ Ù…Ø¶Ù…Ù† Ø¨Ù‡Ø§ØŒ ÙˆÙ„ÙƒÙ† Ø§Ù„Ù…Ø¬Ø§Ù„ Ø§Ù„Ø°ÙŠ ØªÙ… Ù†Ø´Ø± Ù‡Ø°Ù‡ Ø§Ù„ØµÙØ­Ø© Ø¹Ù„ÙŠÙ‡ ØºÙŠØ± Ù…Ø¯Ø±Ø¬ ÙÙŠ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¨ÙŠØ¶Ø§Ø¡ Ù„Ù„Ø³Ù…Ø§Ø­ Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù…Ù‡ Ù…Ø¹ Ù‡Ø°Ø§ Ø§Ù„Ù†Ù…ÙˆØ°Ø¬. Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø§Ù„Ø°Ù‡Ø§Ø¨ Ø¥Ù„Ù‰ Dynamics 365 Marketing ÙˆØ¥Ø¶Ø§ÙØ© Ù‡Ø°Ø§ Ø§Ù„Ù…Ø¬Ø§Ù„ Ø¥Ù„Ù‰ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¨ÙŠØ¶Ø§Ø¡ Ø§Ù„Ù…Ø³Ù…ÙˆØ­ Ø¨Ù‡Ø§ Ù„Ù„Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„Ù…Ø¶Ù…Ù† Ù‡Ù†Ø§."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„Ù…Ø²ÙŠØ¯"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªØ­Ù…ÙŠÙ„"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Ø­Ø§ÙˆÙ„ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰"
                }
            },
            "bg-bg": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Ð¢Ð°Ð·Ð¸ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ð¸Ð¼Ð° Ð¼Ð°Ñ€ÐºÐµÑ‚Ð¸Ð½Ð³Ð¾Ð² Ñ„Ð¾Ñ€Ð¼ÑƒÐ»ÑÑ€, Ð²Ð³Ñ€Ð°Ð´ÐµÐ½ Ð² Ð½ÐµÑ, Ð½Ð¾ Ð´Ð¾Ð¼ÐµÐ¹Ð½ÑŠÑ‚, Ð½Ð° ÐºÐ¾Ð¹Ñ‚Ð¾ Ðµ Ð¿ÑƒÐ±Ð»Ð¸ÐºÑƒÐ²Ð°Ð½Ð° Ñ‚Ð°Ð·Ð¸ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°, Ð½Ðµ Ðµ Ð² Ð±ÑÐ» ÑÐ¿Ð¸ÑÑŠÐº Ð·Ð° Ð¸Ð·Ð¿Ð¾Ð»Ð·Ð²Ð°Ð½Ðµ Ñ Ñ‚Ð¾Ð·Ð¸ Ñ„Ð¾Ñ€Ð¼ÑƒÐ»ÑÑ€. ÐžÑ‚Ð¸Ð´ÐµÑ‚Ðµ Ð² Dynamics 365 Marketing Ð¸ Ð´Ð¾Ð±Ð°Ð²ÐµÑ‚Ðµ Ñ‚Ð¾Ð·Ð¸ Ð´Ð¾Ð¼ÐµÐ¹Ð½ ÐºÑŠÐ¼ Ð±ÐµÐ»Ð¸Ñ ÑÐ¿Ð¸ÑÑŠÐº Ð·Ð° Ñ„Ð¾Ñ€Ð¼ÑƒÐ»ÑÑ€Ð°, Ð²Ð³Ñ€Ð°Ð´ÐµÐ½ Ñ‚ÑƒÐº."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "ÐŸÑ€Ð¾Ñ‡ÐµÑ‚ÐµÑ‚Ðµ Ð¿Ð¾Ð²ÐµÑ‡Ðµ"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "ÐŸÐ¾Ð²Ñ‚Ð¾Ñ€Ð½Ð¾ Ð·Ð°Ñ€ÐµÐ¶Ð´Ð°Ð½Ðµ"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "ÐŸÐ¾Ð²Ñ‚Ð¾Ñ€ÐµÐ½ Ð¾Ð¿Ð¸Ñ‚"
                }
            },
            "ca-es": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Aquesta pÃ gina tÃ© un formulari de mÃ rqueting incrustat, perÃ² el domini on estÃ  publicada no estÃ  afegit en cap llista blanca per a aquest formulari. Aneu al Dynamics 365 Marketing i afegiu aquest domini a la llista blanca per al formulari que hi ha incrustat aquÃ­."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "MÃ©s informaciÃ³"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Torna a carregar"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Torna-ho a provar"
                }
            },
            "cs-cz": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Na tÃ©to strÃ¡nce je vloÅ¾en marketingovÃ½ formulÃ¡Å™, ale domÃ©na, kde je tato strÃ¡nka publikovÃ¡na, nenÃ­ na seznamu povolenÃ½ch pro pouÅ¾itÃ­ s tÃ­mto formulÃ¡Å™em. PÅ™ejdÄ›te do aplikace Dynamics 365 Marketing a pÅ™idejte tuto domÃ©nu do seznamu povolenÃ½ch pro formulÃ¡Å™ vloÅ¾enÃ½ zde."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "ÄŒÃ­st dÃ¡l"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Znovu naÄÃ­st"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Opakovat"
                }
            },
            "da-dk": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Denne side har en marketingformular integreret, men det domÃ¦ne, som denne side er publiceret i, er ikke hvidlistet til brug sammen med formularen. GÃ¥ til Dynamics 365 Marketing, og fÃ¸j dette domÃ¦ne til hvidlisten for den indlejrede formular."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "LÃ¦s mere"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "GenindlÃ¦s"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "PrÃ¸v igen"
                }
            },
            "de-de": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Auf dieser Seite ist ein Marketingformular eingebettet. Die DomÃ¤ne, unter der diese Seite verÃ¶ffentlicht ist, ist jedoch nicht fÃ¼r die Verwendung mit diesem Formular zugelassen. Wechseln Sie zu Dynamics 365 Marketing, und fÃ¼gen Sie diese DomÃ¤ne der Whitelist fÃ¼r das hier eingebettete Formular hinzu."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Weitere Informationen"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Neu laden"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Wiederholen"
                }
            },
            "el-gr": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Î‘Ï…Ï„Î® Î· ÏƒÎµÎ»Î¯Î´Î± Î­Ï‡ÎµÎ¹ ÎµÎ½ÏƒÏ‰Î¼Î±Ï„Ï‰Î¼Î­Î½Î· Î¼Î¹Î± Ï†ÏŒÏÎ¼Î± Î¼Î¬ÏÎºÎµÏ„Î¹Î½Î³Îº, Î±Î»Î»Î¬ Î¿ Ï„Î¿Î¼Î­Î±Ï‚ ÏƒÏ„Î¿Î½ Î¿Ï€Î¿Î¯Î¿ ÎµÎ¯Î½Î±Î¹ Î´Î·Î¼Î¿ÏƒÎ¹ÎµÏ…Î¼Î­Î½Î· Î±Ï…Ï„Î® Î· ÏƒÎµÎ»Î¯Î´Î± Î´ÎµÎ½ Î±Î½Î®ÎºÎµÎ¹ ÏƒÎµ Î»Î¯ÏƒÏ„Î± ÎµÏ€Î¹Ï„ÏÎµÏ€ÏŒÎ¼ÎµÎ½Ï‰Î½ Î³Î¹Î± Ï‡ÏÎ®ÏƒÎ· Î¼Îµ Î±Ï…Ï„Î®Î½ Ï„Î· Ï†ÏŒÏÎ¼Î±. ÎœÎµÏ„Î±Î²ÎµÎ¯Ï„Îµ ÏƒÏ„Î¿ Dynamics 365 Marketing ÎºÎ±Î¹ Ï€ÏÎ¿ÏƒÎ¸Î­ÏƒÏ„Îµ Î±Ï…Ï„ÏŒÎ½ Ï„Î¿Î½ Ï„Î¿Î¼Î­Î± ÏƒÏ„Î· Î»Î¯ÏƒÏ„Î± ÎµÏ€Î¹Ï„ÏÎµÏ€ÏŒÎ¼ÎµÎ½Ï‰Î½ Î³Î¹Î± Ï„Î· Ï†ÏŒÏÎ¼Î± Ï€Î¿Ï… ÎµÎ¯Î½Î±Î¹ ÎµÎ½ÏƒÏ‰Î¼Î±Ï„Ï‰Î¼Î­Î½Î· ÎµÎ´ÏŽ."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Î”Î¹Î±Î²Î¬ÏƒÏ„Îµ Ï€ÎµÏÎ¹ÏƒÏƒÏŒÏ„ÎµÏÎ±"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Î•Ï€Î±Î½Î¬Î»Î·ÏˆÎ· Ï†ÏŒÏÏ„Ï‰ÏƒÎ·Ï‚"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "ÎÎ­Î± Ï€ÏÎ¿ÏƒÏ€Î¬Î¸ÎµÎ¹Î±"
                }
            },
            "en-au": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "This page has a marketing form embedded on it, but the domain where this page is published isn't whitelisted for use with that form. Please go to Dynamics 365 Marketing and add this domain to the whitelist for the form embedded here."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Read more"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Reload"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Try again"
                }
            },
            "en-ca": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "This page has a marketing form embedded on it, but the domain where this page is published isn't whitelisted for use with that form. Please go to Dynamics 365 Marketing and add this domain to the whitelist for the form embedded here."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Read more"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Reload"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Try again"
                }
            },
            "en-gb": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "This page has a marketing form embedded on it, but the domain where this page is published isn't whitelisted for use with that form. Please go to Dynamics 365 Marketing and add this domain to the whitelist for the form embedded here."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Read more"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Reload"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Try again"
                }
            },
            "en-us": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "This page has a marketing form embedded on it, but the domain where this page is published isn't whitelisted for use with that form. Please go to Dynamics 365 Marketing and add this domain to the whitelist for the form embedded here."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Read more"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Reload"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Try again"
                }
            },
            "es-es": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Esta pÃ¡gina tiene un formulario de marketing insertado, pero el dominio en el que se publica esta pÃ¡gina no se encuentra en la lista blanca para su uso con ese formulario. Vaya a Dynamics 365 Marketing y agregue este dominio a la lista blanca para el formulario insertado aquÃ­."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Leer mÃ¡s"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Volver a cargar"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Volver a intentarlo"
                }
            },
            "et-ee": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Sellel lehel on manustatud turundusvorm, kuid domeen, kus see leht on avaldatud, pole soovitusloendis selle vormiga kasutamiseks. Avage Dynamics 365 Marketing ja lisage see domeen siia manustatud vormi soovitusloendisse."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Lisateave"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Laadi uuesti"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Proovi uuesti"
                }
            },
            "eu-es": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Orri honek marketin-inprimakia du kapsulatuta, baina orri hau argitaratuta dagoen domeinua ez dago inprimaki horretan erabiltzeko zerrenda zurian. Joan Dynamics 365 Marketing-era eta gehitu domeinua kapsulatutako inprimakiaren zerrenda zurian."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Irakurri gehiago"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Kargatu berriro"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Saiatu berriro"
                }
            },
            "fi-fi": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "TÃ¤llÃ¤ sivulla on upotettuna markkinointilomake, mutta toimialue, jossa tÃ¤mÃ¤ sivu julkaistaan, ei ole lomakkeen sallittujen osoitteiden luettelossa. Siirry Dynamics 365 Marketingiin ja lisÃ¤Ã¤ tÃ¤mÃ¤ toimialue upotetun lomakkeen sallittujen osoitteiden luetteloon."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "LisÃ¤tietoja"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Lataa uudelleen"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "YritÃ¤ uudelleen"
                }
            },
            "fr-ca": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Cette page comporte un formulaire marketing incorporÃ©, mais le domaine dans lequel elle est publiÃ©e nâ€™est pas un formulaire dâ€™autorisation Ã  utiliser avec ce formulaire. Veuillez accÃ©der Ã  Dynamics 365 Marketing et ajoutez ce domaine Ã  la liste dâ€™autorisation pour le formulaire incorporÃ© ici."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "En savoir plus"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Recharger"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "RÃ©essayer"
                }
            },
            "fr-fr": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Cette page comporte un formulaire marketing incorporÃ©, mais le domaine dans lequel elle est publiÃ©e nâ€™est pas un formulaire dâ€™autorisation Ã  utiliser avec ce formulaire. Veuillez accÃ©der Ã  Dynamics 365 Marketing et ajoutez ce domaine Ã  la liste dâ€™autorisation pour le formulaire incorporÃ© ici."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "En savoir plus"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Recharger"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "RÃ©essayer"
                }
            },
            "gl-es": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Esta pÃ¡xina ten un formulario de mÃ¡rketing incorporado, pero o dominio onde se publica esta pÃ¡xina non estÃ¡ na lista branca para o seu uso co formulario. Vaia a Dynamics 365 Marketing e engada este dominio Ã¡ lista branca para o formulario incorporado aquÃ­."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Ler mÃ¡is"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Cargar de novo"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Tentar de novo"
                }
            },
            "he-il": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "×‘×“×£ ×–×” ×™×© ×˜×•×¤×¡ ×©×™×•×•×§×™ ×©×ž×•×˜×‘×¢ ×‘×•, ××š ×”×ª×—×•× ×©×‘×• ×¤×•×¨×¡× ×”×“×£ ×œ× ×”×•×’×“×¨ ×œ×©×™×ž×•×© ×¢× ×”×˜×•×¤×¡. ×¢×‘×•×¨ ××œ Dynamics 365 Marketing ×•×”×•×¡×£ ××ª ×”×ª×—×•× ×œ×¨×©×™×ž×ª ×”×¢×¨×›×™× ×”×ž×•×ª×¨×™× ×¢×‘×•×¨ ×”×˜×•×¤×¡ ×”×ž×•×˜×‘×¢ ×›××Ÿ."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "×ž×™×“×¢ × ×•×¡×£"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "×˜×¢×Ÿ ×ž×—×“×©"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "× ×¡×” ×©×•×‘"
                }
            },
            "hr-hr": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Na ovoj je stranici ugraÄ‘en marketinÅ¡ki obrazac, ali domena na kojoj je objavljena ta stranica nije na listi dopuÅ¡tenih za upotrebu s tim obrascem. Idite u aplikaciju Dynamics 365 Marketing i dodajte tu domenu u listu dopuÅ¡tenih za ovdje ugraÄ‘eni obrazac."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Saznajte viÅ¡e"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Ponovno uÄitaj"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "PokuÅ¡ajte ponovno"
                }
            },
            "hu-hu": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Ezen az oldalon talÃ¡lhatÃ³ egy beÃ¡gyazott marketinges Å±rlap, azonban a tartomÃ¡ny, amelyen az oldalt kÃ¶zzÃ©tettÃ©k, nem szerepel az adott Å±rlappal valÃ³ hasznÃ¡lat engedÃ©lyezÃ©sÃ©nek listÃ¡jÃ¡n. Nyissa meg a Dynamics 365 Marketing szolgÃ¡ltatÃ¡st, Ã©s adja hozzÃ¡ a tartomÃ¡nyt az Å±rlap beÃ¡gyazÃ¡sÃ¡nak engedÃ©lyezÃ©sÃ©re vonatkozÃ³ listÃ¡hoz."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "TovÃ¡bbi informÃ¡ciÃ³k"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "ÃšjratÃ¶ltÃ©s"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Ãšjra"
                }
            },
            "id-id": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Halaman ini memiliki formulir pemasaran yang disematkan di dalamnya, namun domain tempat halaman ini dipublikasikan tanpa daftar putih untuk digunakan dengan formulir tersebut. Buka Dynamics 365 Marketing dan tambahkan domain ini ke daftar putih untuk formulir yang disematkan di sini."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Baca selengkapnya"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Muat ulang"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Coba lagi"
                }
            },
            "it-it": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Questa pagina ha un modulo di marketing incorporato, ma il dominio in cui questa pagina Ã¨ pubblicata non Ã¨ incluso nell'elenco elementi consentiti per l'utilizzo in questo modulo. Vai a Dynamics 365 Marketing e aggiungi questo dominio all'elenco elementi consentiti per il modulo incorporato qui."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Altre informazioni"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Ricarica"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Riprova"
                }
            },
            "ja-jp": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "ã“ã®ãƒšãƒ¼ã‚¸ã«ã¯ãƒžãƒ¼ã‚±ãƒ†ã‚£ãƒ³ã‚° ãƒ•ã‚©ãƒ¼ãƒ ãŒåŸ‹ã‚è¾¼ã¾ã‚Œã¦ã„ã¾ã™ãŒã€ã“ã®ãƒšãƒ¼ã‚¸ã®å…¬é–‹å…ƒã®ãƒ‰ãƒ¡ã‚¤ãƒ³ãŒã€ãƒ•ã‚©ãƒ¼ãƒ ã§ä½¿ç”¨ã§ãã‚‹ãƒ›ãƒ¯ã‚¤ãƒˆãƒªã‚¹ãƒˆã«å«ã¾ã‚Œã¦ã„ã¾ã›ã‚“ã€‚Dynamics 365 Marketin ã«ç§»å‹•ã—ã¦ã€ã“ã“ã«åŸ‹ã‚è¾¼ã¾ã‚Œã¦ã„ã‚‹ãƒ•ã‚©ãƒ¼ãƒ ã®ãƒ›ãƒ¯ã‚¤ãƒˆãƒªã‚¹ãƒˆã«ã“ã®ãƒ‰ãƒ¡ã‚¤ãƒ³ã‚’è¿½åŠ ã—ã¦ãã ã•ã„ã€‚"
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "è©³ç´°"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "å†èª­ã¿è¾¼ã¿"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "ã‚„ã‚Šç›´ã—"
                }
            },
            "ko-kr": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "ì´ íŽ˜ì´ì§€ì—ëŠ” ë§ˆì¼€íŒ… ì–‘ì‹ì´ í¬í•¨ë˜ì–´ ìžˆì§€ë§Œ ì´ íŽ˜ì´ì§€ê°€ ê²Œì‹œëœ ë„ë©”ì¸ì€ í•´ë‹¹ ì–‘ì‹ê³¼ í•¨ê»˜ ì‚¬ìš©í•  ìˆ˜ ìžˆë„ë¡ í—ˆìš© ëª©ë¡ì— í¬í•¨ë˜ì§€ ì•Šì•˜ìŠµë‹ˆë‹¤. Dynamics 365 Marketingìœ¼ë¡œ ì´ë™í•˜ì—¬ ì—¬ê¸°ì— í¬í•¨ëœ ì–‘ì‹ì˜ í—ˆìš© ëª©ë¡ì— ì´ ë„ë©”ì¸ì„ ì¶”ê°€í•˜ì‹­ì‹œì˜¤."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "ìžì„¸í•œ ë‚´ìš©"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "ë‹¤ì‹œ ë¡œë“œ"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "ë‹¤ì‹œ ì‹œë„"
                }
            },
            "lt-lt": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Å iame puslapyje yra Ä¯dÄ—toji rinkodaros forma, bet domenas, kuriame publikuojamas Å¡is puslapis, nÄ—ra baltajame sÄ…raÅ¡e naudoti su Å¡ia forma. Eikite Ä¯ â€žDynamics 365 Marketingâ€œ ir pridÄ—kite Å¡Ä¯ domenÄ… prie baltojo sÄ…raÅ¡o Äia Ä¯dÄ—tajai formai."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Skaityti daugiau"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Ä®kelti iÅ¡ naujo"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Bandyti dar kartÄ…"
                }
            },
            "lv-lv": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Å ajÄ lapÄ ir iegulta mÄrketinga veidlapa, taÄu domÄ“ns, kurÄ Å¡Ä« lapa ir publicÄ“ta, nav iekÄ¼auts baltajÄ sarakstÄ izmantoÅ¡anai Å¡ajÄ veidlapÄ. PÄrejiet uz programmu DynamicsÂ 365 Marketing un pievienojiet Å¡o domÄ“nu baltajam sarakstam (Å¡eit iegultajai veidlapai)."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "UzzinÄt vairÄk"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "IelÄdÄ“t atkÄrtoti"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "MÄ“Ä£iniet vÄ“lreiz"
                }
            },
            "nb-no": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Denne siden har et markedsfÃ¸ringsskjema innebygd, men domenet der denne siden er publisert, er ikke hvitelistet for bruk med dette skjemaet. GÃ¥ til Dynamics 365 Marketing, og legg til dette domenet i hvitelisten for skjemaet som er innebygd her."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Les mer"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Last inn pÃ¥ nytt"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "PrÃ¸v pÃ¥ nytt"
                }
            },
            "nl-nl": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Op deze pagina is een marketingformulier ingesloten, maar het domein waar deze pagina wordt gepubliceerd, is niet opgenomen in de whitelist voor gebruik met dat formulier. Ga naar Dynamics 365 Marketing en voeg dit domein toe aan de whitelist voor het formulier dat u hier hebt ingesloten."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Meer lezen"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Opnieuw laden"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Opnieuw proberen"
                }
            },
            "pl-pl": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "W tej stronie osadzony jest formularz marketingowy, ale domena, w ktÃ³rej ta strona jest publikowana, nie zostaÅ‚a umieszczona na biaÅ‚ej liÅ›cie do uÅ¼ycia z tym formularzem. PrzejdÅº do aplikacji Dynamics 365 Marketing i dodaj tÄ™ domenÄ™ do biaÅ‚ej listy dla osadzonego tutaj formularza."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Dowiedz siÄ™ wiÄ™cej"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "ZaÅ‚aduj ponownie"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "SprÃ³buj ponownie"
                }
            },
            "pt-br": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Esta pÃ¡gina tem um formulÃ¡rio de marketing inserido, mas o domÃ­nio onde a pÃ¡gina foi publicada nÃ£o estÃ¡ na lista de permissÃµes a ser usada com esse formulÃ¡rio. Acesse o Dynamics 365 Marketing e adicione o domÃ­nio Ã  lista de permissÃµes do formulÃ¡rio inserido aqui."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Leia mais"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Recarregar"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Tentar novamente"
                }
            },
            "pt-pt": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Esta pÃ¡gina tem um formulÃ¡rio de marketing incorporado, mas o domÃ­nio onde esta pÃ¡gina estÃ¡ publicada nÃ£o estÃ¡ incluÃ­do na lista de permissÃµes para utilizaÃ§Ã£o com esse formulÃ¡rio. Aceda ao Dynamics 365 Marketing e adicione este domÃ­nio Ã  lista de permissÃµes para o formulÃ¡rio aqui incorporado."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Mais informaÃ§Ãµes"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Recarregar"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Tentar novamente"
                }
            },
            "ro-ro": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "AceastÄƒ paginÄƒ are un formular de marketing Ã®ncorporat, dar domeniul pe care este publicatÄƒ aceastÄƒ paginÄƒ nu este trecut Ã®n lista albÄƒ pentru utilizare cu acel formular. AccesaÈ›i Dynamics 365 Marketing È™i adÄƒugaÈ›i acest domeniul Ã®n lista albÄƒ pentru formularul Ã®ncorporat acolo."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "CitiÈ›i mai multe"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "ReÃ®ncÄƒrcaÈ›i"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "ÃŽncercaÈ›i din nou"
                }
            },
            "ru-ru": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Ð­Ñ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° ÑÐ¾Ð´ÐµÑ€Ð¶Ð¸Ñ‚ Ð²ÑÑ‚Ñ€Ð¾ÐµÐ½Ð½ÑƒÑŽ Ð¼Ð°Ñ€ÐºÐµÑ‚Ð¸Ð½Ð³Ð¾Ð²ÑƒÑŽ Ñ„Ð¾Ñ€Ð¼Ñƒ, Ð½Ð¾ Ð´Ð¾Ð¼ÐµÐ½, Ð³Ð´Ðµ ÑÑ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ð¾Ð¿ÑƒÐ±Ð»Ð¸ÐºÐ¾Ð²Ð°Ð½Ð°, Ð½Ðµ Ð½Ð°Ñ…Ð¾Ð´Ð¸Ñ‚ÑÑ Ð² Ð±ÐµÐ»Ð¾Ð¼ ÑÐ¿Ð¸ÑÐºÐµ Ð´Ð»Ñ Ð´Ð°Ð½Ð½Ð¾Ð¹ Ñ„Ð¾Ñ€Ð¼Ñ‹. ÐŸÐµÑ€ÐµÐ¹Ð´Ð¸Ñ‚Ðµ Ð² Dynamics 365 Marketing Ð¸ Ð´Ð¾Ð±Ð°Ð²ÑŒÑ‚Ðµ ÑÑ‚Ð¾Ñ‚ Ð´Ð¾Ð¼ÐµÐ½ Ð² Ð±ÐµÐ»Ñ‹Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "ÐŸÐ¾Ð´Ñ€Ð¾Ð±Ð½ÐµÐµ..."
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "ÐŸÐµÑ€ÐµÐ·Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "ÐŸÐ¾Ð²Ñ‚Ð¾Ñ€Ð¸Ñ‚ÑŒ Ð¿Ð¾Ð¿Ñ‹Ñ‚ÐºÑƒ"
                }
            },
            "sk-sk": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "TÃ¡to strÃ¡nka mÃ¡ na sebe vloÅ¾enÃ½ marketingovÃ½ formulÃ¡r, no domÃ©na, na ktorej je tÃ¡to strÃ¡nka publikovanÃ¡, sa nenachÃ¡dza vÂ zozname povolenÃ½ch domÃ©n, vÂ ktorÃ½ch sa dÃ¡ pouÅ¾iÅ¥ sÂ danÃ½m formulÃ¡rom. Prejdite do aplikÃ¡cie DynamicsÂ 365 Marketing aÂ pridajte tÃºto domÃ©nu do zoznamu povolenÃ½ch domÃ©n pre formulÃ¡r, ktorÃ½ je tu vloÅ¾enÃ½."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "ÄŒÃ­taÅ¥ Äalej"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Znova naÄÃ­taÅ¥"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "SkÃºsiÅ¥ znova"
                }
            },
            "sl-si": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "V to stran je vdelan obrazec za trÅ¾enje, vendar domena, na kateri je stran objavljena, ni na seznamu dovoljenih za uporabo s tem obrazcem. Pojdite v Dynamics 365 Marketing in dodajte to domeno na seznam dovoljenih za obrazec, ki je vdelan tukaj."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "VeÄ o tem"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Znova naloÅ¾i"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "VnoviÄni poskus"
                }
            },
            "sr-cyrl-cs": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "ÐžÐ²Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ð¿Ð¾ÑÐµÐ´ÑƒÑ˜Ðµ ÑƒÐ³Ñ€Ð°Ñ’ÐµÐ½Ð¸ Ð¼Ð°Ñ€ÐºÐµÑ‚Ð¸Ð½ÑˆÐºÐ¸ Ð¾Ð±Ñ€Ð°Ð·Ð°Ñ†, Ð°Ð»Ð¸ Ð´Ð¾Ð¼ÐµÐ½ Ð³Ð´Ðµ Ñ˜Ðµ Ð¾Ð²Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ð¾Ð±Ñ˜Ð°Ð²Ñ™ÐµÐ½Ð° ÑÐµ Ð½Ðµ Ð½Ð°Ð»Ð°Ð·Ð¸ Ð½Ð° Ð±ÐµÐ»Ð¾Ñ˜ Ð»Ð¸ÑÑ‚Ð¸ Ð·Ð° ÐºÐ¾Ñ€Ð¸ÑˆÑ›ÐµÑšÐµ ÑÐ° Ñ‚Ð¸Ð¼ Ð¾Ð±Ñ€Ð°ÑÑ†ÐµÐ¼. Ð˜Ð´Ð¸Ñ‚Ðµ Ñƒ ÑƒÑÐ»ÑƒÐ³Ñƒ Dynamics 365 Marketing Ð¸ Ð´Ð¾Ð´Ð°Ñ˜Ñ‚Ðµ Ð¾Ð²Ð°Ñ˜ Ð´Ð¾Ð¼ÐµÐ½ Ð½Ð° Ð±ÐµÐ»Ñƒ Ð»Ð¸ÑÑ‚Ñƒ Ð·Ð° Ð¾Ð±Ñ€Ð°Ð·Ð°Ñ† ÐºÐ¾Ñ˜Ð¸ Ñ˜Ðµ Ð¾Ð²Ð´Ðµ ÑƒÐ³Ñ€Ð°Ñ’ÐµÐ½."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "ÐŸÑ€Ð¾Ñ‡Ð¸Ñ‚Ð°Ñ˜Ñ‚Ðµ Ð²Ð¸ÑˆÐµ"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Ð£Ñ‡Ð¸Ñ‚Ð°Ñ˜ Ð¿Ð¾Ð½Ð¾Ð²Ð¾"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "ÐŸÐ¾ÐºÑƒÑˆÐ°Ñ˜ Ð¿Ð¾Ð½Ð¾Ð²Ð¾"
                }
            },
            "sr-latn-cs": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Ova stranica sadrÅ¾i ugraÄ‘eni marketinÅ¡ki obrazac, ali domen gde je ova stranica objavljena se ne nalazi na beloj listi za koriÅ¡Ä‡enje sa tim obrascem. Idite u uslugu Dynamics 365 Marketing i dodajte ovaj domen na belu listu za obrazac koji je ovde ugraÄ‘en."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "ProÄitajte viÅ¡e"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "UÄitaj ponovo"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "PokuÅ¡aj ponovo"
                }
            },
            "sv-se": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Den hÃ¤r sidan har ett inbÃ¤ddat marknadsfÃ¶ringsformulÃ¤r, men domÃ¤nen dÃ¤r sidan Ã¤r publicerad Ã¤r inte med pÃ¥ listan Ã¶ver godkÃ¤nda domÃ¤ner fÃ¶r anvÃ¤ndning med det formulÃ¤ret. GÃ¥ till Dynamics 365 Marketing och lÃ¤gg till denna domÃ¤n i listan fÃ¶r formulÃ¤ret som Ã¤r inbÃ¤ddat hÃ¤r."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Mer information"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "LÃ¤s in igen"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "FÃ¶rsÃ¶k igen"
                }
            },
            "th-th": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "à¹€à¸žà¸ˆà¸™à¸µà¹‰à¸¡à¸µà¸Ÿà¸­à¸£à¹Œà¸¡à¸—à¸²à¸‡à¸à¸²à¸£à¸•à¸¥à¸²à¸”à¸à¸±à¸‡à¸­à¸¢à¸¹à¹ˆ à¹à¸•à¹ˆà¹‚à¸”à¹€à¸¡à¸™à¸—à¸µà¹ˆà¸¡à¸µà¸à¸²à¸£à¹€à¸œà¸¢à¹à¸žà¸£à¹ˆà¹€à¸žà¸ˆà¸™à¸µà¹‰à¹„à¸¡à¹ˆà¸­à¸¢à¸¹à¹ˆà¹ƒà¸™à¸£à¸²à¸¢à¸à¸²à¸£à¸—à¸µà¹ˆà¸­à¸™à¸¸à¸à¸²à¸•à¸ªà¸³à¸«à¸£à¸±à¸šà¸à¸²à¸£à¹ƒà¸Šà¹‰à¸à¸±à¸šà¸Ÿà¸­à¸£à¹Œà¸¡à¸™à¸±à¹‰à¸™ à¹‚à¸›à¸£à¸”à¹„à¸›à¸—à¸µà¹ˆ Dynamics 365 Marketing à¹à¸¥à¸°à¹€à¸žà¸´à¹ˆà¸¡à¹‚à¸”à¹€à¸¡à¸™à¸™à¸µà¹‰à¸¥à¸‡à¹ƒà¸™à¸£à¸²à¸¢à¸à¸²à¸£à¸—à¸µà¹ˆà¸­à¸™à¸¸à¸à¸²à¸•à¸ªà¸³à¸«à¸£à¸±à¸šà¸Ÿà¸­à¸£à¹Œà¸¡à¸—à¸µà¹ˆà¸à¸±à¸‡à¸­à¸¢à¸¹à¹ˆà¸—à¸µà¹ˆà¸™à¸µà¹ˆ"
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "à¸­à¹ˆà¸²à¸™à¹€à¸žà¸´à¹ˆà¸¡à¹€à¸•à¸´à¸¡"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "à¹‚à¸«à¸¥à¸”à¹ƒà¸«à¸¡à¹ˆ"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "à¸¥à¸­à¸‡à¸­à¸µà¸à¸„à¸£à¸±à¹‰à¸‡"
                }
            },
            "tr-tr": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Bu sayfada katÄ±ÅŸtÄ±rÄ±lmÄ±ÅŸ bir pazarlama formu vardÄ±r, ancak bu sayfanÄ±n yayÄ±mlandÄ±ÄŸÄ± etki alanÄ± bu formla kullanÄ±lmak Ã¼zere beyaz listeye eklenmedi. LÃ¼tfen Dynamics 365 Marketing'e gidin ve bu etki alanÄ±nÄ± buraya katÄ±ÅŸtÄ±rÄ±lan form iÃ§in beyaz listeye ekleyin."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "DevamÄ±nÄ± okuyun"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Yeniden yÃ¼kle"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Yeniden dene"
                }
            },
            "uk-ua": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Ð¦Ñ ÑÑ‚Ð¾Ñ€Ñ–Ð½ÐºÐ° Ð¼Ð°Ñ” Ð²Ð±ÑƒÐ´Ð¾Ð²Ð°Ð½Ñƒ Ð¼Ð°Ñ€ÐºÐµÑ‚Ð¸Ð½Ð³Ð¾Ð²Ñƒ Ñ„Ð¾Ñ€Ð¼Ñƒ, Ð°Ð»Ðµ Ð´Ð¾Ð¼ÐµÐ½ ÑÑ‚Ð¾Ñ€Ñ–Ð½ÐºÐ¸ Ð½Ðµ Ð²ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ð¹ Ð´Ð¾ Ð±Ñ–Ð»Ð¾Ð³Ð¾ ÑÐ¿Ð¸ÑÐºÑƒ Ñ„Ð¾Ñ€Ð¼Ð¸. ÐŸÐµÑ€ÐµÐ¹Ð´Ñ–Ñ‚ÑŒ Ð´Ð¾ Dynamics 365 Marketing Ñ– Ð´Ð¾Ð´Ð°Ð¹Ñ‚Ðµ Ñ†ÐµÐ¹ Ð´Ð¾Ð¼ÐµÐ½ Ð´Ð¾ Ð±Ñ–Ð»Ð¾Ð³Ð¾ ÑÐ¿Ð¸ÑÐºÑƒ Ð´Ð»Ñ Ñ„Ð¾Ñ€Ð¼Ð¸, Ð²Ð±ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¾Ñ— Ñ‚ÑƒÑ‚."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Ð§Ð¸Ñ‚Ð°Ñ‚Ð¸ Ñ‰Ðµ"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "ÐŸÐµÑ€ÐµÐ·Ð°Ð²Ð°Ð½Ñ‚Ð°Ð¶Ð¸Ñ‚Ð¸"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "ÐŸÐ¾Ð²Ñ‚Ð¾Ñ€Ñ–Ñ‚ÑŒ ÑÐ¿Ñ€Ð¾Ð±Ñƒ"
                }
            },
            "vi-vn": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "Trang nÃ y cÃ³ nhÃºng má»™t biá»ƒu máº«u tiáº¿p thá»‹, nhÆ°ng tÃªn miá»n nÆ¡i trang nÃ y Ä‘Æ°á»£c xuáº¥t báº£n khÃ´ng Ä‘Æ°á»£c Ä‘Æ°a vÃ o danh sÃ¡ch tráº¯ng Ä‘á»ƒ sá»­ dá»¥ng vá»›i biá»ƒu máº«u Ä‘Ã³. Vui lÃ²ng truy cáº­p Dynamics 365 Marketing vÃ  thÃªm tÃªn miá»n nÃ y vÃ o danh sÃ¡ch tráº¯ng cho biá»ƒu máº«u Ä‘Æ°á»£c nhÃºng táº¡i Ä‘Ã¢y."
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "Äá»c thÃªm"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "Táº£i láº¡i"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "Thá»­ láº¡i"
                }
            },
            "zh-hk": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "æ­¤é é¢ä¸Šå·²å…§åµŒè¡ŒéŠ·è¡¨å–®ï¼Œä½†å…è¨±ä½¿ç”¨è©²è¡¨å–®çš„æ¸…å–®ä¸­ä¸¦ä¸åŒ…å«ç™¼è¡Œæ­¤é é¢çš„ç¶²åŸŸã€‚è«‹å‰å¾€ Dynamics 365 Marketingï¼Œä¸¦å°‡æ­¤ç¶²åŸŸåŠ å…¥å…è¨±ä½¿ç”¨æ­¤è™•å…§åµŒä¹‹è¡¨å–®çš„æ¸…å–®ä¸­ã€‚"
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "é€²ä¸€æ­¥äº†è§£"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "é‡æ–°è¼‰å…¥"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "å†è©¦ä¸€æ¬¡"
                }
            },
            "zh-tw": {
                InvalidDomain: {
                    Purpose: "Warning: form misconfigured",
                    Value: "æ­¤é é¢ä¸Šå·²å…§åµŒè¡ŒéŠ·è¡¨å–®ï¼Œä½†å…è¨±ä½¿ç”¨è©²è¡¨å–®çš„æ¸…å–®ä¸­ä¸¦ä¸åŒ…å«ç™¼è¡Œæ­¤é é¢çš„ç¶²åŸŸã€‚è«‹å‰å¾€ Dynamics 365 Marketingï¼Œä¸¦å°‡æ­¤ç¶²åŸŸåŠ å…¥å…è¨±ä½¿ç”¨æ­¤è™•å…§åµŒä¹‹è¡¨å–®çš„æ¸…å–®ä¸­ã€‚"
                },
                InvalidDomainLink: {
                    Purpose: "text of the link for form misconfigured domain",
                    Value: "é€²ä¸€æ­¥äº†è§£"
                },
                InvalidDomainURL: {
                    Purpose: "URL for form misconfigured domain",
                    Value: "https://go.microsoft.com/fwlink/p/?linkid=2099472"
                },
                Reload: {
                    Purpose: "Reload",
                    Value: "é‡æ–°è¼‰å…¥"
                },
                TryAgain: {
                    Purpose: "TryAgain",
                    Value: "å†è©¦ä¸€æ¬¡"
                }
            },
            _config: {
                defaultVariant: {
                    "*": "en-us",
                    en: "en-us",
                    fr: "fr-fr",
                    pt: "pt-pt",
                    sr: "sr-latn-cs",
                    zh: "zh-tw"
                }
            }
        };
        return Localization
    }();
    MsCrmMkt.Localization = Localization
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    "use strict";
    var LocalizationProvider = function () {
        function LocalizationProvider() { }
        LocalizationProvider.getMessage = function (key) {
            return LocalizationProvider.getMessageForLanguage(key, navigator.language)
        };
        LocalizationProvider.getMessageForLanguage = function (key, language) {
            if (LocalizationProvider.getMessageShown[key]) {
                return null
            }
            LocalizationProvider.ensureBaseVariants();
            language = language.toLowerCase();
            language = LocalizationProvider.baseVariant[language] || language;
            if (MsCrmMkt.Localization.labels && !MsCrmMkt.Localization.labels[language]) {
                language = LocalizationProvider.baseVariant["*"] || "en-us"
            }
            LocalizationProvider.getMessageShown[key] = true;
            return MsCrmMkt.Localization.labels[language][key] !== undefined ? MsCrmMkt.Localization.labels[language][key]["Value"] : ""
        };
        LocalizationProvider.reloadKey = function (key) {
            LocalizationProvider.getMessageShown[key] = false
        };
        LocalizationProvider.ensureBaseVariants = function () {
            if (!LocalizationProvider.baseVariant && MsCrmMkt.Localization.labels) {
                var buffer = {};
                var defaultMissing = {};
                for (var key in MsCrmMkt.Localization.labels) {
                    if (!MsCrmMkt.Localization.labels.hasOwnProperty(key)) {
                        continue
                    }
                    var dash = key.indexOf("-");
                    if (dash > 0) {
                        var base = key.substring(0, dash);
                        if (buffer[base] && !MsCrmMkt.Localization.labels._config.defaultVariant[base]) {
                            if (console && console.log) {
                                console.log("Multiple variants found for the base language " + base + " and no default is configured")
                            }
                            defaultMissing[base] = true
                        }
                        buffer[base] = key
                    }
                }
                for (var key in defaultMissing) {
                    if (!defaultMissing.hasOwnProperty(key)) {
                        continue
                    }
                    delete buffer[key]
                }
                for (var key in MsCrmMkt.Localization.labels._config.defaultVariant) {
                    if (!MsCrmMkt.Localization.labels._config.defaultVariant.hasOwnProperty(key)) {
                        continue
                    }
                    buffer[key] = MsCrmMkt.Localization.labels._config.defaultVariant[key]
                }
                LocalizationProvider.baseVariant = buffer
            }
        };
        LocalizationProvider.getMessageShown = {};
        LocalizationProvider.baseVariant = null;
        return LocalizationProvider
    }();
    MsCrmMkt.LocalizationProvider = LocalizationProvider
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    "use strict";
    var DialogProvider = function () {
        function DialogProvider() { }
        DialogProvider.showErrorMessage = function (message, link, linkMessage, form, containerHeight, containerWidth) {
            MsCrmMkt.CssProvider.ensureDefaultStyles();
            var container = document.createElement("div");
            var internalContainer = document.createElement("div");
            var messageContainer = document.createElement("div");
            var linkContainer = document.createElement("div");
            var linkElement = document.createElement("a");
            var iconContainer = document.createElement("img");
            container.className = "dialogProviderContainerStyle";
            container.style.height = containerHeight < 400 ? "400px" : containerHeight + "px";
            container.style.width = containerWidth < 400 ? "400px" : containerWidth + "px";
            iconContainer.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAMgAyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/UjVdVtND0+4v7+5is7K2jaae4ncJHEijLMzHgADnJr4h8ZftgfET49eLbvwd+z1oZltbc7LrxXfRAKg6b18wbI1ODjeGdh0UEUftgeMte+Pfxl0P9nnwdeG1tZCl34jvUOVRceZsbHVUTD7c/M7ovBFfVvgLwF4R/Z8+HUelaVHb6NoGmQGa4u52VC5Vf3k80hxljjJY+mBgAAebKU8RNwg+WMd31b7Ltbqz7ShQw2TYanisVTVWvVV4QfwxjspSS1k5P4Y7W1d7nypa/8ABOzxP8Qh9s+Kfxh1rXL6TmS2si8kUZPZXmY5HsI1xT7j/gmBpvh+P7R4N+J3iPQNTX5knZFYbu3+qMZH519meEvF2keOtAs9b0K/g1PSbyMS293btuSRT/Igggg8ggg4IrWZggyenqapYHDNX5b+d3+dzOXFOdU5OHteVLTlUIqK8uXlt8mfAV18UP2h/wBjq5if4hwr8Tfh8HWNtZhcyXECnoTKQHVuekwYE8B+9fZ3wp+LPhr4z+ELbxJ4W1Bb7TpvlZeksEmMtHInVXGRx7gjIIJl8OeL/Cfxe0LUf7I1HTvEukrLLp94sLLPEWHyyRuOhH14IIIyCDXw54j0u4/YB/aQ0zWtJeQfCPxlN5N5aMSyWTbvmA94929CeSm9ecE1neWEtLm5qb+bXnfqvyOz2dHP1Oi6KpYyKbSiuWNSyu4uP2Z21VrKW1j9D6KhS5SVFdGDowyGU5BHrRXqHwZ8O/8ABOyzHxB8dfGH4p3h86+1XVTa28rcmON3aZ1HtgwADtsFfaHi7wlpXjrw7f6FrlnFqOk30RhuLWZcrIp/UEdQRyCARgivjT/gl/djQtB+Jvgy4O3UdG11Xljbg/Mpi/nbmvuFmCDJ6eprz8Ck8NG/W9/W7ufYcUzlDOqvI7KPKo26RUY8tvlqj87P+Ku/4Jz/ABG/5e/E3wT125+sljIf0WVQPZZVHZh8u78cP2kPEH7U/ieH4RfA6R5NOvYg2teJcPEiwEDeuSAUjAOGONzn5FGPvH7SHxw1r9qfxhJ8DfhFDDqOnSOBr3iBxvtlRGBYK+CBGrAZccuwCpx97k9L0vxb/wAE2/iElxcI3iv4VeImiivL+C3Ec0Uqg8kZOyRcuQpO11z0YfL5kpOLdOm37G+r7d0n27vofc0aMa8aeLxdOLzFxbhBu3Pa3LOcbW9pa7jFtc9k2rn2p+z18APDn7O/gWPw/oSGe4k2y3+pSriW8mxjc3oo5CqOFHqSSeJ/b28EW/jX9mHxZ5kYe50lE1a2c/8ALN4mG8j6xtIv/Aq9s8H+MNI8e+HLHXtBvodS0m+iE1vdQNlXU/qCOhB5BBBwQa8u/bP8QweGv2YfiFczsFE2mtZJ7vOywqB+L17FWFOOHlFfDZ/kfnGBxGLqZzRrVW3VdSN7735knf8AFW6bWPjjwJ/wUOvvDHgjw9o0vkzy6dp1vaPLIoLOY4lQknuTiivBfDn7JXizxJ4e0vVra0ma3v7WK6iYJwVdAw7ehor5mOIxqStc/bquVcLupJzcb3d9et3f8bn1d8TrmX9jn9sqH4gywyr8PfHatFqckS5WCdiDKSB/EHCzepV5AMkGvtLxh4b0z4u/D3UdHOoTx6TrdkYhfaXcbHMUi8PG69iCD3BBwQQSDF8WvhR4f+NPgi/8LeJbb7Rp10uQ6YEkEg+5LG38LKeh75IOQSD8RaR4l+L/AOwFdvpGuaXN8QvhGrk2uoWuQ1ipPrz5PXJjf5CfuMMsT7r/ANklJSV6cvwb3v5P8D8rppZ/RoyozUcZRSjZtL2kY/C4t6c8drP4klY+vvgB+z14Z/Z38FroXh+MzXEpEl/qcygT3ko/ibHRRkhVHAHqSSe28YeD9I8e+HL7QdesYdS0m+iMNxazrlXU/qCOoI5BAIwQK8U8Fft7fBXxraRSDxbHoVywy1prcTWzx+xfBjP/AAFzW14h/bP+C3hq0ae5+IWkXIUfc06Rrtz7ARBq6YVcPGnaMly+qPFxGBzmpi3VrUajqt3vyyvfvdL7rPToan7O/wCzvo37OPhrVNF0XVNR1O2vr57z/T5crEDwiIg+UYUAFgMsRk8YA+X/ANsfxtc/tJfF7wt8AvBsxnigvhdeIb2D5kgKjBUn/pkhdmHdyi/eGKXxp+2N4+/aTvZvBvwB8L6lbRynyrvxReKIzboepBGUg74dmLn+FQ2K97/ZW/ZW0j9nfw7PLJONY8YakA2p6w4Pzc58qPPIQHnJ5Y8nsF4/dxMVQoL931fS3Zd79WfRpVcmqyzXNZXxb+CGjkpNW5520jyrWMXq2ez6H4dtPDmiafpOnoLewsLeO1t4lHCRooVVH0AAorUor11poj86k3JuUnqwqC8RZYWR1DowKsrDIIPUGiigT2PzO/4KFeBPDXhjWzJo3h7StJklQSO9jZRQl2K5LEqoySe9eC/sneHtK8R/EK1ttW0yz1S3aQAw3lukyHp2YEUUV8diIpY61up/SeUVaj4X53J3s9bu/wB97/ifs94d0LTfDemx6fpGn2ml2EQAjtbKBYYkHsqgAfgK1KKK+xtbRH828zk3KTu2FFFFAH//2Q==";
            iconContainer.className = "dialogProviderIconContainerStyle";
            messageContainer.textContent = message;
            messageContainer.className = "dialogProviderMessageContainerStyle";
            linkElement.href = link;
            linkElement.textContent = linkMessage ? linkMessage : "Read more";
            linkContainer.className = "dialogProviderLinkContainerStyle";
            linkContainer.appendChild(linkElement);
            internalContainer.className = "dialogProviderInternalContainerStyle";
            internalContainer.appendChild(iconContainer);
            internalContainer.appendChild(messageContainer);
            internalContainer.appendChild(linkContainer);
            internalContainer.style.top = (containerHeight - 400) / 2 + "px";
            container.appendChild(internalContainer);
            form.parentElement.appendChild(container)
        };
        DialogProvider.showFeedback = function (isError, message, form, containerHeight, containerWidth, errorImageUrl, successImageUrl) {
            MsCrmMkt.CssProvider.ensureDefaultStyles();
            var formContainer = form.parentElement;
            var container = document.createElement("div");
            var internalContainer = document.createElement("div");
            var messageContainer = document.createElement("div");
            var buttonContainer = document.createElement("button");
            var iconContainer = document.createElement("img");
            DialogProvider.fixContainerSize(containerHeight, containerWidth, container);
            container.className = "onFormSubmittedFeedback";
            if (isError) {
                internalContainer.setAttribute("data-submissionresponse", "error");
                iconContainer.src = errorImageUrl && errorImageUrl.length ? errorImageUrl : "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23FFC8C8'/%3E%3Cpath d='M33.5996 31L45.7285 43.1465L44.1465 44.7285L32 32.5996L19.8535 44.7285L18.2715 43.1465L30.4004 31L18.2715 18.8535L19.8535 17.2715L32 29.4004L44.1465 17.2715L45.7285 18.8535L33.5996 31Z' fill='%23A80000'/%3E%3C/svg%3E%0A";
                MsCrmMkt.LocalizationProvider.reloadKey("TryAgain");
                buttonContainer.textContent = MsCrmMkt.LocalizationProvider.getMessage("TryAgain");
                buttonContainer.className = "onFormSubmittedFeedbackButton onFormSubmittedFeedbackButtonFail"
            } else {
                internalContainer.setAttribute("data-submissionresponse", "success");
                iconContainer.src = successImageUrl && successImageUrl.length ? successImageUrl : "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23C5E6C2'/%3E%3Cpath d='M45.091 22.591L26.3 41.3996L16.509 31.591L18.091 30.009L26.3 38.2004L43.509 21.009L45.091 22.591Z' fill='%2327AE60'/%3E%3C/svg%3E%0A";
                MsCrmMkt.LocalizationProvider.reloadKey("Reload");
                buttonContainer.textContent = MsCrmMkt.LocalizationProvider.getMessage("Reload");
                buttonContainer.className = "onFormSubmittedFeedbackButton onFormSubmittedFeedbackButtonSuccess"
            }
            iconContainer.className = "onFormSubmittedFeedbackIcon";
            messageContainer.textContent = message;
            messageContainer.className = "onFormSubmittedFeedbackMessage";
            internalContainer.className = "onFormSubmittedFeedbackInternalContainerStyle";
            internalContainer.appendChild(iconContainer);
            internalContainer.appendChild(messageContainer);
            internalContainer.appendChild(buttonContainer);
            internalContainer.style.top = (containerHeight - 400) / 2 + "px";
            container.appendChild(internalContainer);
            formContainer.appendChild(container);
            form.parentNode.removeChild(form);
            return container
        };
        DialogProvider.fixContainerSize = function (containerHeight, containerWidth, container) {
            var minContainerSize = 400;
            if (containerHeight < minContainerSize) {
                container.style.height = minContainerSize + "px"
            } else if (containerHeight > window.innerHeight) {
                container.style.height = window.innerHeight + "px"
            } else {
                container.style.height = containerHeight + "px"
            }
            if (containerWidth < minContainerSize) {
                container.style.width = minContainerSize + "px"
            } else if (containerWidth > window.innerWidth) {
                container.style.width = window.innerWidth + "px"
            } else {
                container.style.width = containerWidth + "px"
            }
        };
        return DialogProvider
    }();
    MsCrmMkt.DialogProvider = DialogProvider
})(MsCrmMkt || (MsCrmMkt = {}));
var MsCrmMkt;
(function (MsCrmMkt) {
    "use strict";
    var defaultStyleElementId = "cssProviderStyle";
    var requiredFieldClassName = "mkt-required-field";
    var CssProvider = function () {
        function CssProvider() { }
        CssProvider.requiredFieldClassName = function () {
            return requiredFieldClassName
        };
        CssProvider.hasClass = function (el, className) {
            return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className)
        };
        CssProvider.addClass = function (el, className) {
            if (el.classList) {
                el.classList.add(className);
                return
            }
            if (!CssProvider.hasClass(el, className)) {
                el.className += " " + className
            }
        };
        CssProvider.removeClass = function (el, className) {
            if (el.classList) {
                el.classList.remove(className);
                return
            }
            el.className = el.className.replace(new RegExp("\\b" + className + "\\b", "g"), "")
        };
        CssProvider.ensureDefaultStyles = function () {
            if (document.getElementById(defaultStyleElementId)) {
                return
            }
            var css = ".dialogProviderMessageContainerStyle { color: #A80000; padding-top: 20px; padding-bottom: 20px; text-align: center; }\n                .dialogProviderInternalContainerStyle { padding: 20px; position: absolute; }\n                .dialogProviderIconContainerStyle { display: block; margin-left: auto; margin-right: auto; }\n                .dialogProviderLinkContainerStyle { text-align: center; } \n                .dialogProviderContainerStyle { background: white; position: relative; }\n                .onFormSubmittedFeedback { display: flex; align-items: center; justify-content: center; background: white; margin: 0 auto; }\n                .onFormSubmittedFeedbackIcon { display: block; margin-left: auto; margin-right: auto; height: 64px; size: 64px; }\n                .onFormSubmittedFeedback .onFormSubmittedFeedbackMessage { padding: 30px 10px 40px 10px; color: black; font-size: 16px; font-family: Segoe UI; text-align: center; }\n                .onFormSubmittedFeedback .onFormSubmittedFeedbackButton { min-width: 80px; min-height: 32px; font-size: 14px; border-radius: 2px; display: block; margin-left: auto; margin-right: auto; }\n                .onFormSubmittedFeedback .onFormSubmittedFeedbackButtonSuccess { color: white; background-color: #0078D4; border: 1px solid #0078D4; }\n                .onFormSubmittedFeedback .onFormSubmittedFeedbackButtonFail { color: black; background-color: white; border: 1px solid #8A8886; }\n                .onFormSubmittedFeedback .onFormSubmittedFeedbackInternalContainerStyle { padding: 20px; }\n                .formLoader { border: 16px solid #f3f3f3; border-radius: 50%; border-top: 16px solid #0078D4; width: 120px; height: 120px; -webkit-animation: spin 2s linear infinite; /* Safari */ animation: spin 2s linear infinite; margin: 0 auto; }\n                /* Safari */ @-webkit-keyframes spin { 0% { -webkit-transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); } }\n                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } }\n                ." + requiredFieldClassName + " { border-color: red; }";
            var head = document.head || document.getElementsByTagName("head")[0];
            var style = document.createElement("style");
            style.id = defaultStyleElementId;
            style.type = "text/css";
            style.appendChild(document.createTextNode(css));
            head.insertBefore(style, head.firstChild)
        };
        return CssProvider
    }();
    MsCrmMkt.CssProvider = CssProvider
})(MsCrmMkt || (MsCrmMkt = {}));