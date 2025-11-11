/*! @yama-dev/js-modal-module version:0.16.3 repository:https://github.com/yama-dev/js-modal-module copyright:yama-dev licensed:MIT */
!function(e, t) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        var n = t();
        for (var o in n)
            ("object" == typeof exports ? exports : e)[o] = n[o]
    }
}(window, (function() {
    return function(e) {
        var t = {};
        function n(o) {
            if (t[o])
                return t[o].exports;
            var i = t[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(i.exports, i, i.exports, n),
            i.l = !0,
            i.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: o
            })
        }
        ,
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var o = Object.create(null);
            if (n.r(o),
            Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var i in e)
                    n.d(o, i, function(t) {
                        return e[t]
                    }
                    .bind(null, i));
            return o
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return n.d(t, "a", t),
            t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 0)
    }([function(e, t, n) {
        "use strict";
        function o(e) {
            try {
                return e instanceof HTMLElement
            } catch (e) {
                return !1
            }
        }
        function i(e) {
            if (!e)
                return !1;
            var t;
            if (!Array.isArray(e) && !e.length || function(e) {
                try {
                    return "string" == typeof e
                } catch (e) {
                    return !1
                }
            }(e))
                t = o(e) ? Array(e) : Array.prototype.slice.call(document.querySelectorAll(e));
            else {
                if (!o(e[0]))
                    return !1;
                t = Array.prototype.slice.call(e)
            }
            return 0 === t.length && (t = null),
            t
        }
        function a(e, t) {
            var n = i(e);
            if (!n)
                return !1;
            n.map((function(e) {
                e.classList.add(t)
            }
            ))
        }
        function l(e, t) {
            var n = i(e);
            if (!n)
                return !1;
            n.map((function(e) {
                e.classList.remove(t)
            }
            ))
        }
        function s(e, t, n) {
            if (e === window)
                window.addEventListener(t, n, {
                    passive: !1
                });
            else {
                var o = i(e);
                if (!o)
                    return !1;
                o.map((function(e) {
                    e.addEventListener(t, n, {
                        passive: !1
                    })
                }
                ))
            }
        }
        function r(e, t, n) {
            if (e === window)
                window.removeEventListener(t, n);
            else {
                var o = i(e);
                if (!o)
                    return !1;
                o.map((function(e) {
                    e.removeEventListener(t, n)
                }
                ))
            }
        }
        function m(e, t) {
            var n = i(e);
            if (!n)
                return !1;
            n.map((function(e) {
                var n = "";
                Object.keys(t).forEach((function(e) {
                    null !== t[e] && (n += e.replace(/([A-Z])/g, "-$1").toLowerCase() + ": " + t[e] + ";")
                }
                )),
                e.setAttribute("style", n)
            }
            ))
        }
        function c(e, t) {
            var n = i(e);
            if (!n)
                return !1;
            n.map((function(e) {
                var n = "";
                Object.keys(t).forEach((function(o) {
                    n = o.replace(/([A-Z])/g, "-$1").toLowerCase(),
                    e.setAttribute(n, t[o])
                }
                ))
            }
            ))
        }
        function d(e, t) {
            var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            if (!e)
                return !1;
            for (var o in t) {
                new RegExp("({{.?" + o + ".?}})","g");
                var i = new RegExp("{{.?(" + o + ").?}}","g");
                e.match(i);
                var a = RegExp.$1;
                e = e.replace(i, t[a])
            }
            n && (e = e.replace(/({{.*}})/g, ""));
            return e
        }
        n.r(t),
        n.d(t, "MODAL_MODULE", (function() {
            return b
        }
        ));
        var u = ' <style id="{{ id }}-style" data-modal-type> body.is-modal-open, body.is-modal-overflow { overflow: hidden; } template { display: none; } .m-modal { position: {{ position }}; top: 0; left: 0; z-index: {{ zIndex }}; width: 100%; height: 100%; overflow: auto; visibility: hidden; -ms-touch-action: none; touch-action: none; pointer-events: none; opacity: 0; -webkit-transition: all {{ duration }}ms cubic-bezier(.215, .61, .355, 1) 0s; transition: all {{ duration }}ms cubic-bezier(.215, .61, .355, 1) 0s; } .m-modal.is-open, .m-modal.is-load-start { opacity: 1; visibility: visible; -ms-touch-action: auto; touch-action: auto; pointer-events: auto; } .m-modal.is-open { -webkit-transition: all {{ duration }}ms cubic-bezier(.215, .61, .355, 1) 0s; transition: all {{ duration }}ms cubic-bezier(.215, .61, .355, 1) 0s; } .m-modal.is-load-start { -webkit-transition: all 0s cubic-bezier(.215, .61, .355, 1) 0s; transition: all 0s cubic-bezier(.215, .61, .355, 1) 0s; } .m-modal.is-close { visibility: hidden; -ms-touch-action: none; touch-action: none; pointer-events: none; opacity: 0; -webkit-transition: all {{ duration }}ms cubic-bezier(.215, .61, .355, 1) 0s; transition: all {{ duration }}ms cubic-bezier(.215, .61, .355, 1) 0s; } .m-modal .m-modal__bg { position: {{ position }}; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); cursor: pointer; } .is-modal-overflow .m-modal .m-modal__bg { position: absolute; } .m-modal .m-modal__content { position: {{ position }}; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; max-width: 1200px; min-width: 500px; height: auto; text-align: center; } .is-modal-overflow-prep .m-modal .m-modal__content { position: relative; top: auto; left: auto; -webkit-transform: translate(0, 0); transform: translate(0, 0); margin: 50px auto; } .m-modal .m-modal__content > * { width: 100%; height: auto; } .m-modal .m-modal__content > * img { backface-visibility: hidden; } .m-modal .m-modal__close-btn { position: absolute; top: -80px; right: -80px; width: 80px; height: 80px; cursor: pointer; } .m-modal button.m-modal__close-btn { background: none; border: none; } .m-modal .m-modal__close-btn::before { content: ""; position: absolute; top: 0; left: 50%; -webkit-transform: rotate(-45deg); transform: rotate(-45deg); background-color: #fff; width: 1px; height: 80px; } .m-modal .m-modal__close-btn::after { content: ""; position: absolute; top: 0px; left: 50%; -webkit-transform: rotate(45deg); transform: rotate(45deg); background-color: #fff; width: 1px; height: 80px; } @media screen and (max-height: 900px) { .m-modal .m-modal__content { max-width: 900px; } } @media screen and (max-height: 800px) { .m-modal .m-modal__content { max-width: 800px; } } @media screen and (max-height: 700px) { .m-modal .m-modal__content { max-width: 700px; } } @media screen and (max-height: 600px) { .m-modal .m-modal__content { max-width: 600px; } } @media screen and (max-width: 767px) { .m-modal .m-modal__content { width: 96%; min-width: 0; } .m-modal .m-modal__content .m-modal__content-btn { position: relative; top: auto; right: auto; width: 84%; height: auto; margin: 20px auto 0; } } @media screen and (min-width: 768px) { .m-modal .is-pc { display: block; } .m-modal .is-sp { display: none; } } @media screen and (max-width: 767px) { .m-modal .is-pc { display: none; } .m-modal .is-sp { display: block; } } {{ custom_style }} </style> ';
        function f() {
            return (f = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var o in n)
                        Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
                }
                return e
            }
            ).apply(this, arguments)
        }
        function h(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, o)
            }
            return n
        }
        function p(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? h(Object(n), !0).forEach((function(t) {
                    g(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : h(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function g(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        function C(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function y(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1,
                o.configurable = !0,
                "value"in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o)
            }
        }
        function v(e) {
            for (var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", o = n.length, i = 0; i < e; i++)
                t += n.charAt(Math.floor(Math.random() * o));
            return t
        }
        var b = function() {
            function e() {
                var t = this
                  , n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                C(this, e);
                var o = {
                    id: "jmm-" + v(12),
                    elemOutputSelector: "body",
                    elem: null,
                    elemContentId: null,
                    elemStyle: null,
                    elemYoutubePlayerId: null,
                    elemContent: ".m-modal__content",
                    elemBg: ".m-modal__bg",
                    elemDataClose: "data-modal-ui-close",
                    elemDataFocus: "data-modal-ui-focus",
                    elemDataBtn: "data-modal",
                    defaultClassName: "",
                    movie: {
                        youtube: {}
                    },
                    elemYoutubePlayerAspectRatio: "16:9",
                    duration: 500,
                    zIndex: 100,
                    position: "fixed",
                    removeWrapperTag: !1,
                    defaultModalStyle: !0,
                    focus: !0,
                    customModalHtml: null,
                    customModalStyle: null,
                    openCheckFunc: function() {
                        return !0
                    },
                    on: {
                        init: null,
                        prepOpen: null,
                        beforeOpen: null,
                        afterOpen: null,
                        prepClose: null,
                        beforeClose: null,
                        afterClose: null
                    }
                };
                this.elem = {
                    modal: null,
                    modalContent: null,
                    modalBg: null,
                    modalClose: null,
                    modalBtns: null
                },
                this.state = {
                    data: null,
                    elemOpen: null,
                    elemOpenHtml: "",
                    elemOpenType: "",
                    flg: {
                        open: !1,
                        lock: !1
                    }
                },
                this.Events = {},
                this.Config = p(p({}, o), n),
                this.Config.elem = "#".concat(this.Config.id),
                this.Config.elemStyle = "#".concat(this.Config.id, "-style"),
                this.Config.elemContentId = "#".concat(this.Config.id, "__content"),
                this.Config.elemYoutubePlayerId = "".concat(this.Config.id, "__youtube"),
                this.Html = "",
                this.Player = null,
                this.Html = this._makeModalHtml(),
                "complete" == document.readyState || "interactive" == document.readyState ? (this._attachEvent(),
                this.onInit()) : document.addEventListener("DOMContentLoaded", (function() {
                    t._attachEvent(),
                    t.onInit()
                }
                )),
                s(document.body, "keydown", (function(e) {
                    t.state.flg.open && "Escape" == e.code && t.Close()
                }
                ))
            }
            var t, n, o;
            return t = e,
            o = [{
                key: "outerHeight",
                value: function(e) {
                    var t = (e = document.querySelector(e)).offsetHeight
                      , n = getComputedStyle(e);
                    return t += parseInt(n.marginTop) + parseInt(n.marginBottom)
                }
            }, {
                key: "Make",
                value: function(t, n) {
                    var o = null
                      , i = p(p({
                        removeWrapperTag: !0
                    }, n), {}, {
                        on: {
                            init: function() {
                                setTimeout((function() {
                                    o.Open(t)
                                }
                                ), 100)
                            },
                            afterClose: function() {
                                o.Destroy(),
                                o = null
                            }
                        }
                    });
                    o = new e(i)
                }
            }],
            (n = [{
                key: "_makeModalHtml",
                value: function() {
                    var e, t, n, o = "";
                    if (this.Config.customModalHtml) {
                        if ("function" == typeof this.Config.customModalHtml) {
                            var i = this.state.data ? this.state.data.match(/^([^:]+):(.+)/) : null;
                            e = this.Config.customModalHtml(i ? i[1] : this.state.data, i ? i[2] : this.state.data, i || null, this.state.elemOpen, this.elem)
                        } else
                            e = this.Config.customModalHtml;
                        if (/\{\{\s{0,2}contentStart\s{0,1}\}\}/.test(e) && /\{\{\s{0,2}contentEnd\s{0,1}\}\}/.test(e))
                            o += d(e, {
                                id: this.Config.id,
                                zIndex: this.Config.zIndex,
                                duration: this.Config.duration,
                                contentStart: '<div id="'.concat(this.Config.id, '__content">'),
                                contentEnd: "</div>",
                                defaultClassName: this.Config.defaultClassName
                            });
                        else if (/\{\{\s{0,2}contentId\s{0,1}\}\}/.test(e))
                            o += d(e, {
                                id: this.Config.id,
                                zIndex: this.Config.zIndex,
                                duration: this.Config.duration,
                                contentId: "".concat(this.Config.id, "__content"),
                                defaultClassName: this.Config.defaultClassName
                            });
                        else {
                            if (!/\{\{\s{0,2}content\s{0,1}\}\}/.test(e))
                                throw new Error("Not Found {{ content || contentStart || contentEnd || contentId }}.");
                            o += d(e, {
                                id: this.Config.id,
                                zIndex: this.Config.zIndex,
                                duration: this.Config.duration,
                                content: '<div id="'.concat(this.Config.id, '__content"></div>'),
                                defaultClassName: this.Config.defaultClassName
                            })
                        }
                    } else
                        o += d(' <section class="m-modal {{ defaultClassName }}" id="{{ id }}" data-modal-type> <div class="m-modal__bg"></div> <div class="m-modal__content"> {{ content }} <button class="m-modal__close-btn" data-modal-ui-close></button> </div> </section>', {
                            id: this.Config.id,
                            zIndex: this.Config.zIndex,
                            duration: this.Config.duration,
                            content: '<div id="'.concat(this.Config.id, '__content"></div>'),
                            defaultClassName: this.Config.defaultClassName
                        });
                    return this.Config.defaultModalStyle ? (this.Config.customModalStyle ? (n = d(this.Config.customModalStyle, {
                        id: this.Config.id,
                        zIndex: this.Config.zIndex,
                        defaultClassName: ".".concat(this.Config.defaultClassName),
                        duration: this.Config.duration
                    }),
                    t = d(u, {
                        id: this.Config.id,
                        zIndex: this.Config.zIndex,
                        position: this.Config.position,
                        duration: this.Config.duration,
                        defaultClassName: ".".concat(this.Config.defaultClassName),
                        custom_style: n
                    })) : t = u,
                    o += d(t, {
                        id: this.Config.id,
                        zIndex: this.Config.zIndex,
                        position: this.Config.position,
                        defaultClassName: ".".concat(this.Config.defaultClassName),
                        duration: this.Config.duration
                    })) : this.Config.customModalStyle && (o += d(this.Config.customModalStyle, {
                        id: this.Config.id,
                        zIndex: this.Config.zIndex,
                        position: this.Config.position,
                        defaultClassName: ".".concat(this.Config.defaultClassName),
                        duration: this.Config.duration
                    })),
                    o
                }
            }, {
                key: "_updateDom",
                value: function() {
                    i("[".concat(this.Config.elemDataClose, "]")) && c(i("[".concat(this.Config.elemDataClose, "]")), {
                        tabindex: 0
                    }),
                    i("[".concat(this.Config.elemDataFocus, "]")) && c(i("[".concat(this.Config.elemDataFocus, "]")), {
                        tabindex: 0
                    }),
                    this.elem.modal = i(this.Config.elem),
                    this.elem.modalContent = i("".concat(this.Config.elem, " ").concat(this.Config.elemContent)),
                    this.elem.modalBg = i("".concat(this.Config.elem, " ").concat(this.Config.elemBg)),
                    this.elem.modalClose = i("[".concat(this.Config.elemDataClose, "]")),
                    this.elem.modalFocus = i("[".concat(this.Config.elemDataFocus, "]")),
                    this.elem.modalBtns = i("[".concat(this.Config.elemDataBtn, "]"))
                }
            }, {
                key: "_remove",
                value: function() {
                    if (i(this.Config.elem)) {
                        var e = i(this.Config.elem)[0];
                        e.parentNode.removeChild(e)
                    }
                    if (i(this.Config.elemStyle)) {
                        var t = i(this.Config.elemStyle)[0];
                        t.parentNode.removeChild(t)
                    }
                }
            }, {
                key: "_render",
                value: function() {
                    document.querySelector(this.Config.elemOutputSelector).insertAdjacentHTML("beforeend", this.Html)
                }
            }, {
                key: "_attachEvent",
                value: function() {
                    var e = this;
                    this._updateDom(),
                    this.Events.modalOpen = [],
                    i(this.elem.modalBtns) && i(this.elem.modalBtns).map((function(t, n) {
                        e.Events.modalOpen.push((function(t) {
                            var n = t.currentTarget.getAttribute(e.Config.elemDataBtn);
                            e.Open(n, t.currentTarget)
                        }
                        )),
                        s(t, "click", e.Events.modalOpen[n])
                    }
                    )),
                    window.addEventListener("resize", (function() {
                        e.state.flg.open && e._updateModalSize()
                    }
                    ))
                }
            }, {
                key: "_detachEvent",
                value: function() {
                    var e = this
                      , t = i(this.elem.modalBtns);
                    t && t.map((function(t, n) {
                        r(t, "click", e.Events.modalOpen[n])
                    }
                    )),
                    this.Events.modalOpen = []
                }
            }, {
                key: "_setContent",
                value: function(e) {
                    !function(e, t) {
                        var n = i(e);
                        if (!n)
                            return !1;
                        n.map((function(e) {
                            e.innerHTML = t
                        }
                        ))
                    }("".concat(this.Config.elem, " ").concat(this.Config.elemContentId), e)
                }
            }, {
                key: "_updateModalSize",
                value: function() {
                    var t = document.querySelector("".concat(this.Config.elem, " ").concat(this.Config.elemContentId)).clientHeight;
                    if (t >= window.innerHeight) {
                        a(this.Config.elemOutputSelector, "is-modal-overflow-prep"),
                        a(this.Config.elemOutputSelector, "is-modal-overflow"),
                        m("".concat(this.Config.elem, " ").concat(this.Config.elemContent), {
                            height: "".concat(t, "px")
                        });
                        var n = e.outerHeight("".concat(this.Config.elem, " ").concat(this.Config.elemContent));
                        m("".concat(this.Config.elem, " ").concat(this.Config.elemBg), {
                            height: "".concat(n, "px")
                        })
                    } else
                        l(this.Config.elemOutputSelector, "is-modal-overflow-prep"),
                        l(this.Config.elemOutputSelector, "is-modal-overflow"),
                        m("".concat(this.Config.elem, " ").concat(this.Config.elemBg), {
                            height: ""
                        }),
                        m("".concat(this.Config.elem, " ").concat(this.Config.elemContent), {
                            height: ""
                        })
                }
            }, {
                key: "_youtube",
                value: function(e) {
                    var t = this
                      , n = {
                        height: "360",
                        width: "640",
                        videoId: e,
                        playerVars: {
                            autoplay: 1,
                            playsinline: 1,
                            controls: 1,
                            disablekb: 0,
                            fs: 1,
                            loop: 0,
                            rel: 0
                        },
                        events: {
                            onReady: function(e) {
                                n.playerVars.autoplay && e.target.playVideo()
                            },
                            onStateChange: function(e) {
                                e.data == YT.PlayerState.ENDED && t.Close()
                            }
                        }
                    };
                    if (n = f(n, this.Config.movie.youtube),
                    window.YT)
                        t.Player = new YT.Player(t.Config.elemYoutubePlayerId,n);
                    else {
                        var o = document.createElement("script");
                        o.src = "https://www.youtube.com/iframe_api";
                        var i = document.getElementsByTagName("script")[0];
                        i.parentNode.insertBefore(o, i),
                        o.onload = function() {
                            window.onYouTubeIframeAPIReady = function() {
                                t.Player = new YT.Player(t.Config.elemYoutubePlayerId,n)
                            }
                        }
                    }
                }
            }, {
                key: "Open",
                value: function(e, t) {
                    var n = this;
                    if (!e)
                        throw new Error("Not Found Modal data.");
                    if (!this.Config.openCheckFunc(e, t))
                        return !1;
                    if (this.state.flg.lock)
                        return !1;
                    if (this.state.flg.lock = !0,
                    this.state.elemOpen = t,
                    this.state.elemOpenType = "",
                    this.state.data = e,
                    this.state.elemOpenHtml = "",
                    this._remove(),
                    this.Html = this._makeModalHtml(),
                    this._render(),
                    this.Update(),
                    this.onPrepOpen(e, t),
                    a(this.Config.elemOutputSelector, "is-modal-open"),
                    setTimeout((function() {
                        a(n.elem.modal, "is-open"),
                        l(n.elem.modal, "is-close")
                    }
                    ), 30),
                    /img:/.test(this.state.data)) {
                        var o = this.state.data.match(/d*:(.*)$/)[1];
                        this.state.elemOpenHtml = '<img src="'.concat(o, '" alt="">'),
                        this.state.elemOpenType = "img"
                    }
                    if (/youtube:/.test(this.state.data)) {
                        var r = this.Config.elemYoutubePlayerAspectRatio.split(/[/:]/)
                          , m = 56.25;
                        2 == r.length && (m = Number(r[1]) / Number(r[0]) * 100),
                        this.state.elemOpenHtml = '<div id="'.concat(this.Config.elemYoutubePlayerId, '-wrap"> <style> #').concat(this.Config.elemYoutubePlayerId, "-wrap { position: relative; } #").concat(this.Config.elemYoutubePlayerId, "-wrap::before { content: ''; display: block; width: 100%; padding-top: ").concat(m, "%; } #").concat(this.Config.elemYoutubePlayerId, ' { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } </style> <div id="').concat(this.Config.elemYoutubePlayerId, '"></div> </div>'),
                        this.state.elemOpenType = "youtube"
                    }
                    if (/^(\.|#)/.test(this.state.data)) {
                        var c = this.state.data.match(/(.*)$/)[1];
                        if (!this.state.elemOpen) {
                            if (!i(c))
                                throw new Error("Not Found append data.");
                            this.state.elemOpen = document.body
                        }
                        this.state.elemOpen.querySelector(c) ? this.Config.removeWrapperTag ? this.state.elemOpenHtml = this.state.elemOpen.querySelector(c).innerHTML : this.state.elemOpenHtml = this.state.elemOpen.querySelector(c).outerHTML : this.state.elemOpen.parentNode.querySelector(c) && (this.Config.removeWrapperTag ? this.state.elemOpenHtml = this.state.elemOpen.parentNode.querySelector(c).innerHTML : this.state.elemOpenHtml = this.state.elemOpen.parentNode.querySelector(c).outerHTML),
                        this.state.elemOpenType = "element"
                    }
                    if (/^(template)/.test(this.state.data)) {
                        var d = this.state.data.match(/(.*)$/)[1];
                        if (!this.state.elemOpen) {
                            if (!i(d))
                                throw new Error("Not Found append data.");
                            this.state.elemOpen = document.body
                        }
                        this.state.elemOpen.querySelector(d) ? this.state.elemOpenHtml = this.state.elemOpen.querySelector(d).innerHTML : this.state.elemOpen.parentNode.querySelector(d) ? this.state.elemOpenHtml = this.state.elemOpen.parentNode.querySelector(d).innerHTML : this.state.elemOpen.parentNode.parentNode.querySelector(d) && (this.state.elemOpenHtml = this.state.elemOpen.parentNode.parentNode.querySelector(d).innerHTML),
                        this.state.elemOpenType = "template"
                    }
                    if (/^(group:)/.test(this.state.data)) {
                        var u = this.state.data.match(/d*:(.*)$/)[1];
                        if (!this.state.elemOpen) {
                            if (!i(u))
                                throw new Error("Not Found append data.");
                            this.state.elemOpen = document.body
                        }
                        this.state.elemOpen.parentNode.querySelector(u) ? i(this.state.elemOpen.parentNode.querySelectorAll(u)).map((function(e) {
                            n.state.elemOpenHtml += e.innerHTML
                        }
                        )) : this.state.elemOpen.parentNode.parentNode.querySelector(u) && i(this.state.elemOpen.parentNode.parentNode.querySelectorAll(u)).map((function(e) {
                            n.state.elemOpenHtml += e.innerHTML
                        }
                        )),
                        this.state.elemOpenType = "group"
                    }
                    if (this.onBeforeOpen(e, t),
                    this.state.elemOpenHtml && this._setContent(this.state.elemOpenHtml),
                    "youtube" == this.state.elemOpenType) {
                        var f = this.state.data.match(/d*:(.*)$/)[1];
                        this._youtube(f)
                    }
                    this.elem.modal[0].setAttribute("data-modal-type", this.state.elemOpenType),
                    this.Events.modalBg = function() {
                        n.Close()
                    }
                    ,
                    this.Events.modalClose = function() {
                        n.Close()
                    }
                    ,
                    this._updateDom(),
                    s(this.elem.modalBg, "click", this.Events.modalBg),
                    s(this.elem.modalClose, "click", this.Events.modalClose),
                    setTimeout((function() {
                        n.Config.focus && (i("[".concat(n.Config.elemDataClose, "]")) && i("[".concat(n.Config.elemDataClose, "]"))[0].focus(),
                        i("[".concat(n.Config.elemDataFocus, "]")) && i("[".concat(n.Config.elemDataFocus, "]"))[0].focus())
                    }
                    ), 100),
                    setTimeout((function() {
                        n.state.flg.open = !0,
                        n.state.flg.lock = !1,
                        n.onAfterOpen(e, t)
                    }
                    ), this.Config.duration),
                    /<img.*?src\s*=\s*["|'](.*?)["|'].*?>/.test(this.state.elemOpenHtml) ? i("".concat(this.Config.elem, " ").concat(this.Config.elemContentId, " img"))[0].addEventListener("load", (function() {
                        n._updateModalSize()
                    }
                    )) : this._updateModalSize()
                }
            }, {
                key: "Close",
                value: function() {
                    var e = this;
                    if (this.state.flg.lock)
                        return !1;
                    this.state.flg.lock = !0,
                    this.onPrepClose(),
                    l(this.Config.elemOutputSelector, "is-modal-open"),
                    l(this.elem.modal, "is-load-start"),
                    l(this.elem.modal, "is-open"),
                    a(this.elem.modal, "is-close"),
                    l(this.Config.elemOutputSelector, "is-modal-overflow"),
                    this.onBeforeClose(),
                    r(this.elem.modalBg, "click", this.Events.modalBgClose),
                    r(this.elem.modalClose, "click", this.Events.modalClose),
                    this.Player && this.Player.pauseVideo && this.Player.pauseVideo(),
                    setTimeout((function() {
                        e.onAfterClose(),
                        e._setContent("\x3c!-- none --\x3e"),
                        e.elem.modal[0].setAttribute("data-modal-type", ""),
                        l(e.Config.elemOutputSelector, "is-modal-overflow-prep"),
                        m("".concat(e.Config.elem, " ").concat(e.Config.elemContent), {
                            height: null
                        }),
                        e.Player && e.Player.stopVideo && (e.Player.stopVideo(),
                        e.Player = null),
                        e._remove(),
                        e.state.flg.open = !1,
                        e.state.flg.lock = !1
                    }
                    ), this.Config.duration)
                }
            }, {
                key: "Update",
                value: function() {
                    this._detachEvent(),
                    this._attachEvent()
                }
            }, {
                key: "Destroy",
                value: function() {
                    this._detachEvent(),
                    this._remove()
                }
            }, {
                key: "onInit",
                value: function() {
                    this.Config.on.init && this.Config.on.init()
                }
            }, {
                key: "onPrepOpen",
                value: function(e, t) {
                    this.Config.on.prepOpen && this.Config.on.prepOpen(e, t, this.state, this.elem)
                }
            }, {
                key: "onBeforeOpen",
                value: function(e, t) {
                    this.Config.on.beforeOpen && this.Config.on.beforeOpen(e, t, this.state, this.elem)
                }
            }, {
                key: "onAfterOpen",
                value: function(e, t) {
                    this.Config.on.afterOpen && this.Config.on.afterOpen(e, t, this.state, this.elem)
                }
            }, {
                key: "onPrepClose",
                value: function() {
                    this.Config.on.prepClose && this.Config.on.prepClose()
                }
            }, {
                key: "onBeforeClose",
                value: function() {
                    this.Config.on.beforeClose && this.Config.on.beforeClose()
                }
            }, {
                key: "onAfterClose",
                value: function() {
                    this.Config.on.afterClose && this.Config.on.afterClose()
                }
            }]) && y(t.prototype, n),
            o && y(t, o),
            e
        }()
    }
    ])
}
));
