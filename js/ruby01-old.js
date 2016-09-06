/**
 * CODE09 Template
 * Javascript Custom
 * Copyright @2015 Thystudio
 */
function widgetBtnToggle() {
    var t = $(".btn-toggle"),
        e = $(".ele-toggle");
    t.length && t.btntoggle(), e.length && e.eletoggle()
}

function tablesswap() {
    var t = $(".price"),
        e = ["tb-1col", "tb-2col", "tb-3col", "tb-4col", "tb-5col", "tb-6col", "tb-7col", "tb-8col", "tb-9col", "tb-10col"],
        a = e.join(" "),
        n = function(t) {
            $(window).width() < 768 && t.data("isResponse") && t.addClass("tab-hor").tab({
                selectorSec: ".tb-col",
                sectionActived: "feature"
            }).data("isResponse", !1), $(window).width() >= 768 && !t.data("isResponse") && t.removeClass("tab-hor tab-mini").html(t.data("src")).data("isResponse", !0)
        },
        i = function(t) {
            var e;
            $(window).resize(function() {
                clearTimeout(e), e = setTimeout(function() {
                    n(t)
                }, 200)
            }), n(t)
        };
    t.length && t.each(function() {
        var t = $(this),
            n = t.hasClass("tab-hor, tab-ver") ? !1 : !0,
            o = t.find(".tb-col, .tb-desc").length - 1;
        t.removeClass(a).addClass(e[o]), t.data("src", t.html()).data("isResponse", !0), o > 1 && n && i(t)
    })
}

function timeCounting() {
    var t = $(".counting");
    t.length && t.timer()
}

function loadWebfont() {
    var t = document.createElement("script"),
        e = document.getElementsByTagName("script")[0];
    t.src = ("https:" == document.location.protocal ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js", t.type = "text/javascript", t.async = "true", e.parentNode.insertBefore(t, e)
}

function textFont() {
    var t = $("[data-font]");
    if (t.length) {
        var e = [],
            a = [],
            n = {
                textfont: "font",
                _class: "font-custom",
                ready: "font-ready",
                name: "name"
            },
            i = function(t) {
                var e, a, i = t.data("font"),
                    o = i.indexOf(":");
                if (-1 !== o) {
                    e = i.substr(0, o), a = i.substr(o + 1, i.length), -1 !== a.indexOf("i") && t.css("font-style", "italic"), -1 !== a.indexOf("b") && t.css("font-weight", "bold");
                    var s = a.replace(/\D+/g, "");
                    "" !== s && t.css("font-weight", s)
                } else e = i;
                t.css("font-family", e).data(n.name, e)
            };
        loadWebfont(), t.each(function() {
            var t = $(this),
                o = t.data(n.textfont);
            void 0 !== o && (e.push(o), a.push(t.text()), i(t), t.addClass(n._class))
        }), WebFontConfig = {
            google: {
                families: e
            },
            fontactive: function(e) {
                t.each(function() {
                    $(this).data(n.name) === e && $(this).addClass(n.ready)
                })
            }
        }
    }
}

function textFill() {
    var t = $("[data-fill]");
    t.length && t.textfill()
}

function showFit() {
    var t = $(".show-fit");
    t.length && t.showfit()
}

function showExpand() {
    var t = $(".show-expand");
    t.length && t.showexpand()
}

function bgImg() {
    var t = $(".bg-img");
    t.length && t.bgimg()
}

function imgFx() {
    var t = $("[data-mscale]"),
        e = $(".fx-img-hover");
    t.length && t.mscale(), e.length && e.imghover()
}

function imgZoom() {
    var t = $(".zoom"),
        e = 0,
        a = "img-";
    t.length && t.each(function() {
        var t = $(this),
            n = t.data("lightbox");
        (void 0 === n || "" === n) && (t.data("lightbox", a + e), t.attr("data-lightbox", a + e), e++)
    })
}

function imgLazy() {
    var t = $("[data-src]:not(.cs img[data-src])");
    t.length && t.imglazy()
}

function pageTransition() {
    var t = $(".page-perspective");
    t.length && t.page()
}

function slider() {
    var t = $("#sequence1"),
        e = $(".slider"),
        a = {
            autoPlay: !0,
            autoPlayDelay: 3e3
        },
        n = {
            wrap: "circular",
            list: ".sl-items",
            container: "sl-container",
            pagiClass: "pagi tiny",
            pagiSelector: "pagi",
            actived: "actived",
            selected: "selected",
            autoScroll: !0
        },
        i = function(t) {
            t.find(n.list).wrap('<div class="' + n.container + '"></div>'), t.data("sliderPagination") && t.find("." + n.container).after('<ul class="' + n.pagiClass + '"></ul>'), t.hasClass("simple-v2") && t.find(".container").children().wrapAll('<div class="slider-wrap columns"></div>')
        },
        o = function(t) {
            t.hasClass("two-item") ? t.data({
                items: 2,
                next: "+=2",
                prev: "-=2"
            }) : t.hasClass("three-item") ? t.data({
                items: 3,
                next: "+=3",
                prev: "-=3"
            }) : t.hasClass("four-item") ? t.data({
                items: 4,
                next: "+=4",
                prev: "-=4"
            }) : t.hasClass("five-item") ? t.data({
                items: 5,
                next: "+=5",
                prev: "-=5"
            }) : t.hasClass("six-item") ? t.data({
                items: 6,
                next: "+=6",
                prev: "-=6"
            }) : t.hasClass("seven-item") ? t.data({
                items: 7,
                next: "+=7",
                prev: "-=7"
            }) : t.hasClass("eight-item") ? t.data({
                items: 8,
                next: "+=8",
                prev: "-=8"
            }) : t.data({
                items: 1,
                next: "+=1",
                prev: "-=1",
                margin: 0
            });
            var e = t.find("." + n.container).outerWidth();
            t.data({
                lastwidth: e,
                actionFirst: !0
            })
        },
        s = function(t) {
            t.find(n.list).on("active.jcarouselcontrol", "li", function() {
                $(this).addClass(n.actived)
            });
            var e = t.find(".nav, .nav-tiny, .nav-center");
            e.length && (e.find(".prev").click(function() {
                return t.jcarousel("scroll", t.data("prev")), !1
            }), e.find(".next").click(function() {
                return t.jcarousel("scroll", t.data("next")), !1
            }))
        },
        r = function(t) {
            if (t.data("sliderPagination")) {
                var e = t.find("." + n.pagiSelector);
                e.jcarouselPagination({
                    carousel: t,
                    item: function(t, e) {
                        var a = '<li><a href="#' + t + '">' + t + "</a></li>";
                        return a
                    }
                }).on("active.jcarouselcontrol", "li", function() {
                    $(this).addClass(n.selected)
                }).on("inactive.jcarouselcontrol", "li", function() {
                    $(this).removeClass(n.selected)
                })
            }
        },
        l = function(t) {
            n.autoScroll && t.hover(function() {
                $(this).jcarouselAutoscroll("stop")
            }, function() {
                $(this).jcarouselAutoscroll("start")
            })
        },
        c = function(t) {
            var e;
            $(window).resize(function() {
                clearTimeout(e), e = setTimeout(function() {
                    d(t)
                }, 0)
            }), d(t)
        },
        d = function(t) {
            var e = t.find("." + n.container).outerWidth();
            (t.data("lastwidth") != e || t.data("actionFirst")) && ($(window).width() < 768 ? t.data("margin", 5) : t.data("margin", 10), 1 == t.data("items") && t.data("margin", 0), t.data({
                width: e / t.data("items") - 2 * t.data("margin"),
                lastwidth: e,
                actionFirst: !1
            }).find(n.list).children().css({
                width: t.data("width"),
                "margin-left": t.data("margin"),
                "margin-right": t.data("margin")
            }))
        };
    if (t.length) {
        t.sequence(a).data("sequence")
    }
    e.length && e.each(function() {
        var t = $(this);
        i(t), o(t), s(t), l(t), c(t), t.jcarousel(n).jcarouselAutoscroll({
            scroll: "+=1",
            interval: "3000"
        }), r(t)
    })
}


function filterSorting() {
    var t = $(".portfolio .items, .blog.grid .items");
    t.length && t.each(function() {
        var t, e = $(this);
        e.isotope({
            layoutMode: "fitRows",
            itemSelector: "article",
            animationEngine: "best-available",
            animationOptions: {
                duration: 300
            },
            containerStyle: {
                position: "relative",
                overflow: ""
            }
        }), t = e.parent().find(".filter li"), t.length && (e.find("article").each(function() {
            $(this).addClass($(this).attr("data-tags"))
        }), t.on("click touchstart", function() {
            var t = $(this).attr("data-tags");
            return t && ("*" != t && (t = "." + t, t = t.replace(/(,\s+)|(\s+)/g, ", .")), e.isotope({
                filter: t
            })), !1
        }))
    })
}

function centerVertical() {
    $center = $(".center-ver"), $center.length && $center.centerCSS()
}

function iframeresize() {
    var t = $("iframe, object"),
        e = function(t, e) {
            "OBJECT" === t.get(0).tagName && t.find("embed").length && t.find("embed").attr(e)
        },
        a = function(t, e) {
            var a = {
                height: t.width() / e
            };
            t.attr(a)
        },
        n = function(t, e) {
            var n;
            $(window).resize(function() {
                clearTimeout(n), n = setTimeout(function() {
                    a(t, e)
                }, 500)
            }), a(t, e)
        };
    t.length && t.each(function() {
        var t = $(this),
            a = parseInt(t.attr("width")),
            i = parseInt(t.attr("height")),
            o = Math.round(a / i * 1e3) / 1e3,
            s = {
                width: "100%"
            },
            r = {
                width: "100%",
                height: "100%"
            };
        t.attr(s), e(t, r), n(t, o)
    })
}

function colorHex(t) {
    if ("#" === t.substr(0, 1)) return t;
    var e = /.*?rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi,
        a = ["00000", "0000", "000", "00", "0", ""],
        n = e.exec(t),
        i = parseInt(n[1]),
        o = parseInt(n[2]),
        s = parseInt(n[3]),
        r = s | o << 8 | i << 16;
    return r = r.toString(16), r = "#" + a[r.length - 1] + r
}

function colorRGB(t) {
    if ("rgb" === t.substr(0, 3)) return t;
    var e, a = t.substr(1);
    3 == a.length ? (e = /(\w{1})(\w{1})(\w{1})/gi.exec(a), e[1] += e[1], e[2] += e[2], e[3] += e[3]) : e = /(\w{2})(\w{2})(\w{2})/gi.exec(a);
    var n = parseInt(e[1], 16),
        i = parseInt(e[2], 16),
        o = parseInt(e[3], 16);
    return a = "rgb(" + n + ", " + i + ", " + o + ")"
}

function _prosValue(t, e) {
    var a, n = e + "(\\-\\w*)*",
        i = /^\d+$/g;
    return a = new RegExp(n, "gi"), va = t.match(a), null !== va ? (va = va[0].replace(e + "-", ""), i.test(va) ? parseInt(va) : va) : !1
}

function _ie7() {
    var t = !1;
    return -1 !== navigator.appVersion.indexOf("MSIE 7.") && (t = !0), t
}

function colorHighlight() {
    var t = document.styleSheets,
        e = "#0cf",
        a = "#ffc400",
        n = [],
        i = [],
        o = [],
        s = [],
        r = [],
        l = [],
        c = []; - 1 == navigator.appVersion.indexOf("MSIE 7.") && -1 == navigator.appVersion.indexOf("MSIE 8.") && (e = colorRGB(e));
    for (var d = 0, f = t.length; f > d; d++) {
        var u = t[d].rules || t[d].cssRules;
        if (null == u) return;
        for (var h = 0, p = u.length; p > h; h++) {
            var v = u[h].selectorText,
                m = u[h].style;
            if ("undefined" != typeof m) {
                m.color == e && n.push(v), m.backgroundColor == e && i.push(v);
                var g = !0;
                m.borderColor == e && (o.push(v), g = !1), m.borderTopColor == e && g && s.push(v), m.borderBottomColor == e && g && r.push(v), m.borderLeftColor == e && g && l.push(v), m.borderRightColor == e && g && c.push(v)
            }
        }
    }
    var y = n.join(", ") + "{ color: " + a + "; }" + i.join(", ") + "{ background-color: " + a + "; }" + o.join(", ") + "{ border-color: " + a + "; }" + s.join(", ") + "{ border-top-color: " + a + "; }" + r.join(", ") + "{ border-bottom-color: " + a + "; }" + l.join(", ") + "{ border-left-color: " + a + "; }" + c.join(", ") + "{ border-right-color: " + a + "; }";
    $("head").append("<style>" + y + "</style>")
}! function(t) {
    t.fn.collapse = function(e) {
        return e = t.extend({}, t.fn.collapse.defaults, e), t(this).each(function() {
            var a, n, i, o = t(this),
                s = o.find(e.sec),
                r = t("> :first-child", s),
                l = t("> :last-child", s),
                c = !1,
                d = function() {
                    f(), u(), h(), p()
                },
                f = function() {
                    var t = o.data("accordion");
                    if (void 0 !== t) {
                        a = -1 != t.indexOf(e.multi) ? e.multi : e.single, n = -1 != t.indexOf(e.shfirstName) ? !e.isShowfirst : e.isShowfirst;
                        var s = /speed\-\w*/gi,
                            r = /^\d+$/g;
                        i = t.match(s), null !== i ? (i = i[0].replace(e.speedName, ""), r.test(i) && (i = parseInt(i))) : i = e.speed
                    } else a = e.type, n = e.shfirst, i = e.speed;
                    o.removeAttr("data-accordion")
                },
                u = function() {
                    s.each(function() {
                        var a = t(this);
                        a.hasClass(e.actived) && (a.addClass(e.ready), c = !0)
                    })
                },
                h = function() {
                    n && !c && s.first().addClass(e.ready).addClass(e.actived)
                },
                p = function() {
                    r.on("click", function(n) {
                        var o = t(this),
                            r = o.next(),
                            c = o.closest(e.sec);
                        a == e.single && (s.not(c).removeClass(e.ready), c.toggleClass(e.ready), l.not(r).slideUp({
                            duration: i,
                            complete: function() {
                                s.not(c).removeClass(e.actived)
                            }
                        }), r.slideToggle({
                            duration: i,
                            complete: function() {
                                c.toggleClass(e.actived)
                            }
                        })), a == e.multi && (c.toggleClass(e.ready), r.slideToggle({
                            duration: i,
                            complete: function() {
                                c.toggleClass(e.actived)
                            }
                        })), n.preventDefault()
                    })
                };
            d()
        })
    }, t.fn.collapse.defaults = {
        sec: "section",
        type: "single",
        single: "single",
        multi: "multi",
        speedName: "speed-",
        shfirstName: "show-first",
        actived: "actived",
        ready: "ready",
        speed: 200,
        isShowfirst: !1
    }
}(jQuery),
function(t) {
    t.fn.tab = function(e) {
        return e = t.extend({}, t.fn.tab.defaults, e), t(this).each(function() {
            var a, n, i, o, s, r, l = t(this),
                c = l.find("section"),
                d = 0,
                f = e.showFirst - 1,
                u = e.speed,
                h = e.tabminiAuto,
                p = function() {
                    v(), y(), w(i), b()
                },
                v = function() {
                    s = l.hasClass("tab-hor") ? "horizontal" : "vertical", r = l.data("sectionActived") || e.sectionActived, o = l.data("styleTablist") ? !0 : !1;
                    var n = l.data("tab");
                    if (void 0 !== n) {
                        h = -1 != n.indexOf("mini-off") ? !1 : !0;
                        var c = /speed\-\w*/gi,
                            d = /^\d+$/g;
                        u = n.match(c), null !== u && (u = u[0].replace(e.speedName, ""), d.test(u) && (u = parseInt(u)))
                    }
                    if (m(), g(), C(), a = l.find("." + e.tablist), i = a.children(), "horizontal" == s) {
                        var f = 0;
                        i.each(function() {
                            f += t(this).outerWidth(!0)
                        }), a.data("width", f)
                    }
                },
                m = function() {
                    c = l.find(l.data("selectorSection") || e.selectorSec)
                },
                g = function() {
                    var a = "";
                    if (c.each(function() {
                            var e = t(this);
                            e.attr("name", "tab-" + d), a += '<li><a href="#" name="' + e.attr("name") + '">';
                            var n = e.children().first().html();
                            a += n, a += "</a></li>", e.hasClass(r) && (f = d), d++
                        }), a = '<ul class="' + e.tablist + '">' + a + "</ul>", c.first().before(a), "vertical" == s) {
                        var i = '<div class="' + e.tabcontent + '"></div>';
                        c.wrapAll(i), n = c.closest("." + e.tabcontent)
                    }
                },
                y = function() {
                    i.eq(f).addClass(e.actived), c.eq(f).addClass(e.actived), l.data("lastHeight", l.height())
                },
                w = function(a) {
                    a.on("click touchstart", function(a) {
                        if (!t(this).hasClass(e.actived)) {
                            var n, i = t(this);
                            c.each(function() {
                                t(this).attr("name") == i.find("a").attr("name") && (n = t(this))
                            }), j(i, n)
                        }
                        a.preventDefault()
                    })
                },
                b = function() {
                    var e, a = 500;
                    t(window).resize(function() {
                        clearTimeout(e), e = setTimeout(function() {
                            o && x(), h && T()
                        }, a)
                    }), o && x(), h && T()
                },
                C = function() {
                    o || "vertical" !== s || l.addClass(e.widthauto)
                },
                x = function() {
                    "vertical" === s && (t(window).width() < 768 ? (a.removeClass(l.data("styleTablist")), n.removeClass(l.data("styleSection")), l.addClass(e.widthauto)) : (a.addClass(l.data("styleTablist")), n.addClass(l.data("styleSection")), l.removeClass(e.widthauto)))
                },
                T = function() {
                    h && ("vertical" == s ? (l.removeClass(e.tabmini), a.width() < 100 ? l.addClass(e.tabmini) : l.removeClass(e.tabmini)) : a.width() < a.data("width") ? l.addClass(e.tabmini) : l.removeClass(e.tabmini))
                },
                j = function(a, n) {
                    a.addClass(e.actived).siblings().removeClass(e.actived), n.css({
                        display: "block"
                    }).siblings().removeClass(e.actived).removeAttr("style"), l.data("height", l.height()).css("height", l.data("lastHeight")).animate({
                        height: l.data("height")
                    }, {
                        duration: u,
                        queue: !1,
                        complete: function() {
                            t(this).css({
                                height: "",
                                overflow: ""
                            })
                        }
                    }).data("lastHeight", l.data("height"))
                };
            p()
        })
    }, t.fn.tab.defaults = {
        actived: "actived",
        speed: 200,
        speedName: "speed-",
        tablist: "tablist",
        tabcontent: "tabcontent",
        tabmini: "tab-mini",
        tabminiAuto: !0,
        selectorSec: "section",
        sectionActived: "actived",
        widthauto: "width-auto",
        isWidthauto: !1,
        showFirst: 1
    }
}(jQuery),
function(t) {
    t.fn.tooltip = function(e) {
        return e = t.extend({}, t.fn.tooltip.defaults, e), t(this).each(function() {
            var a, n, i, o, s, r = t(this),
                l = t(document.body),
                c = !1,
                d = function() {
                    f(), u(), h(), p()
                },
                f = function() {
                    var i, o = "" != r.data("tooltip") ? r.data("tooltip") : e.nodata;
                    s = r.hasClass(e.content) ? !0 : !1, s ? (a = r, r = a.prev("." + e.tooltip), i = a.html()) : (a = t("<div></div>", {
                        "class": e.content,
                        html: o
                    }), i = o), n = t("<span></span>", {
                        html: i,
                        css: {
                            display: "inline-block",
                            "font-size": "12px"
                        }
                    }), r.append(a)
                },
                u = function() {
                    i = r.data(e.dataP) || e.position, o = r.data(e.dataA) || e.arrow, r.removeAttr("data-position").removeAttr("data-arrow").removeAttr("data-tooltip"), r.addClass(e.tooltip + " tp-" + i + " ta-" + o)
                },
                h = function() {
                    var e, a = 500;
                    t(window).resize(function() {
                        clearTimeout(e), e = setTimeout(function() {
                            v(), g()
                        }, a)
                    }), v(), g()
                },
                p = function() {
                    var t, e = 1;
                    r.hover(function() {
                        clearTimeout(t), t = setTimeout(m, e)
                    }, function() {}), m()
                },
                v = function() {
                    n.appendTo(l);
                    var t = n.width();
                    n.remove(), t > 200 ? (r.addClass(e.widthauto), a.data("width", 220), c = !0) : (r.removeClass(e.widthauto), a.data("width", t), c = !1)
                },
                m = function() {
                    if ("center" == o) {
                        var t = 0,
                            e = 22;
                        c || (a.css({
                            width: "auto"
                        }), t = 32), a.css({
                            visibility: "hidden",
                            overflow: "visible",
                            height: "auto"
                        }).data({
                            height: a.outerHeight(!0)
                        }).removeAttr("style");
                        var n = a.data("width") + t,
                            s = a.data("height") + e;
                        ("top" == i || "bottom" == i) && a.css("margin-left", -n / 2), ("left" == i || "right" == i) && a.css("margin-top", -s / 2)
                    }
                },
                g = function() {
                    var e = t(window).width() - r.offset().left - a.data("width");
                    0 > e && r.removeClass("ta-left ta-center").addClass("ta-right"), e > 0 && r.removeClass("ta-center ta-left ta-right").addClass("ta-" + o)
                };
            d()
        })
    }, t.fn.tooltip.defaults = {
        tooltip: "tooltip",
        content: "tt-content",
        dataP: "position",
        dataA: "arrow",
        position: "top",
        arrow: "center",
        nodata: "Oops! No content yet",
        widthauto: "width-auto",
        isWidthauto: !0
    }
}(jQuery),
function(t) {
    t.fn.alert = function(e) {
        return e = t.extend({}, t.fn.alert.defaults, e), t(this).each(function() {
            var a, n, i = t(this),
                o = i.closest(e.banner),
                s = function() {
                    r(), l(), c(), d()
                },
                r = function() {
                    o.length && (i.hasClass("warning") && o.addClass("warning"), i.hasClass("error") && o.addClass("error"), i.hasClass("success") && o.addClass("success")), o.addClass(e.ready)
                },
                l = function() {
                    var e = '<button class="close"><span class="cite"></span></button>';
                    a = t(e), a.prependTo(i)
                },
                c = function() {
                    n = Modernizr.csstransitions
                },
                d = function() {
                    var t, n = 300;
                    a.on("click touchstart", function(a) {
                        a.preventDefault(), i.addClass(e.fx), clearTimeout(t), t = setTimeout(function() {
                            o.length ? o.remove() : i.remove()
                        }, n)
                    })
                };
            s()
        })
    }, t.fn.alert.defaults = {
        banner: ".alert-block",
        ready: "ready",
        fx: "fx-zoomin",
        fxDelay: 200
    }
}(jQuery),
function(t) {
    t.fn.btntoggle = function(e) {
        return e = t.extend({}, t.fn.btntoggle.defaults, e), t(this).each(function(a) {
            var n, i = t(this),
                o = i.next(),
                s = i.data("animate") || e.animate,
                r = i.data("speed") || e.speed,
                l = i.data("type") || e.type,
                c = i.data("widthswap") || e.widthswap,
                d = function() {
                    c = parseInt(c), h(), "click" === l && f(), "hoverswap" === l && u()
                },
                f = function() {
                    i.on("click touchstart", function(t) {
                        t.preventDefault(), o.hasClass(e._class) ? v() : m()
                    })
                },
                u = function() {
                    i.on("click touchstart", function(t) {
                        p(), n && (o.hasClass(e._class) ? v() : m(), t.preventDefault())
                    })
                },
                h = function() {
                    if ("css" === s) {
                        var t, a = $el.hasClass("actived") || !1;
                        $el.data({
                            css: $el.css(e.css),
                            cssActived: $el.toggleClass(e._class).css(e.css)
                        }), $el.toggleClass(e._class), a && (t = $el.data("css"), $el.data("css", $el.data("cssActived")), $el.data("cssActived", t))
                    }
                },
                p = function() {
                    var e = t(window).width();
                    n = c > e || !1
                },
                v = function() {
                    i.removeClass(e._class), "slide" == s ? o.slideUp(r, function() {
                        g(t(this))
                    }) : "fade" == s ? o.fadeOut(r, function() {
                        g(t(this))
                    }) : "css" == s && o.animate(o.data("css"), r, function() {
                        g(t(this))
                    })
                },
                m = function() {
                    i.addClass(e._class), "slide" == s ? o.slideDown(r, function() {
                        y(t(this))
                    }) : "fade" == s ? o.fadeIn(r, function() {
                        y(t(this))
                    }) : "css" == s && o.animate(o.data("cssActived"), r, function() {
                        y(t(this))
                    })
                },
                g = function(t) {
                    t.removeClass(e._class).removeAttr("style")
                },
                y = function(t) {
                    t.addClass(e._class).removeAttr("style")
                };
            d()
        })
    }, t.fn.btntoggle.defaults = {
        _class: "actived",
        type: "click",
        animate: "slide",
        css: ["left", "right", "top", "bottom", "width", "height", "opacity", "display"],
        speed: 100,
        widthswap: 768
    }
}(jQuery),
function(t) {
    t.fn.eletoggle = function(e) {
        return e = t.extend({}, t.fn.eletoggle.defaults, e), t(this).each(function(a) {
            var n, i, o = t(this),
                s = function() {
                    r(), l()
                },
                r = function() {
                    var a = o.data("toggle") ? o.data("toggle") : e.target;
                    i = o.data("toggleClass") ? o.data("toggleClass") : e._class, a && (n = t(a)), o.removeAttr("data-toggle data-toggle-class")
                },
                l = function() {
                    void 0 !== n && o.on("click touchstart", function(t) {
                        o.hasClass(i) ? o.add(n).removeClass(i) : o.add(n).addClass(i), t.preventDefault()
                    })
                };
            s()
        })
    }, t.fn.eletoggle.defaults = {
        _class: "toggle",
        target: ""
    }
}(jQuery),
function(t) {
    t.fn.tablesswap = function(t) {}, t.fn.tablesswap.defaults = {}
}(jQuery),
function(t) {
    t.fn.timer = function(e) {
        return e = t.extend({}, t.fn.timer.defaults, e), t(this).each(function(a) {
            var n, i = t(this),
                o = new Date(i.data(e.end)),
                s = new Date,
                r = 1e3,
                l = {},
                c = !0,
                d = !1,
                f = Math.floor((o - s) / 1e3),
                u = f % 60,
                h = u % 10,
                p = Math.floor(u / 10),
                v = Math.floor(f / 60),
                m = v % 60,
                g = m % 10,
                y = Math.floor(m / 10),
                w = Math.floor(v / 60),
                b = w % 24,
                C = b % 10,
                x = Math.floor(b / 10) % 3,
                T = Math.floor(w / 24),
                j = T % 10,
                $ = Math.floor(T / 10) % 10,
                k = Math.floor(T / 100) % 10,
                z = Math.floor(T / 7),
                M = z % 10,
                A = Math.floor(z / 10) % 10,
                I = function() {
                    S(), _(), N()
                },
                S = function() {
                    l.iw = i.find(".week").length ? !0 : !1, l.id = i.find(".day").length ? !0 : !1, c = Modernizr.csstransitions, i.removeAttr("data-time-end")
                },
                _ = function() {
                    l.s0 = F(i.find(".second .number"), h, e.u0, 9), l.s1 = F(i.find(".second .number"), p, e.u1, 5), l.m0 = F(i.find(".minute .number"), g, e.u0, 9), l.m1 = F(i.find(".minute .number"), y, e.u1, 5), l.h0 = F(i.find(".hour   .number"), C, e.u0, 9), l.h1 = F(i.find(".hour   .number"), x, e.u1, 2), l.iw ? (j = T % 7, $ = 0, l.d0 = F(i.find(".day  .number"), j, e.u0, 6), l.d1 = F(i.find(".day  .number"), $, e.u1, 0), l.w0 = F(i.find(".week .number"), M, e.u0, 9), l.w1 = F(i.find(".week .number"), A, e.u1, 9)) : (l.id && (l.d0 = F(i.find(".day .number"), j, e.u0, 9), l.d1 = F(i.find(".day .number"), $, e.u1, 9)), k > 0 && (l.d2 = F(i.find(".day .number"), k, e.u2, 9)))
                },
                N = function() {
                    var e, a = 500;
                    t(window).resize(function() {
                        d || (d = !0, clearInterval(n), clearTimeout(e), e = setTimeout(function() {
                            d = !1, O()
                        }, a))
                    }), O()
                },
                O = function() {
                    n = setInterval(Q, r)
                },
                F = function(e, a, n, i) {
                    for (var o = t("<ul></ul>", {
                            "class": n
                        }), s = 0; i >= s; s++) t("<li></li>", {
                        "class": "num-" + s,
                        text: s
                    }).appendTo(o);
                    return e.prepend(o), D(o, a), o
                },
                D = function(t, a) {
                    var n = t.find("li"),
                        i = t.find(".num-" + a),
                        o = i.next(); - 1 == a && (i = t.find("li:last"), o = t.find("li:first")), t === l.h0 && (0 == x && -1 == C && (i = t.find(".num-3"), o = t.find("li:first")), 2 == x && 8 == C && (C = 2, i = t.find(".num-2"), o = i.next())), c ? (n.removeClass(e.current).removeClass(e.next), i.addClass(e.current), o.addClass(e.next)) : (n.not(i).not(o).css(e.css.prev), i.animate(e.css.cur, {
                        duration: e.css.duration,
                        queue: e.css.queue
                    }), o.animate(e.css.next, {
                        duration: e.css.duration,
                        queue: e.css.queue
                    }))
                },
                Q = function() {
                    h--, D(l.s0, h), 0 > h && (h = 9, p--, D(l.s1, p), 0 > p && (p = 5, g--, D(l.m0, g), 0 > g && (g = 9, y--, D(l.m1, y), 0 > y && (y = 5, C--, D(l.h0, C), 0 > C && (C = 9, x--, D(l.h1, x), 0 > x && (x = 2, j--, D(l.d0, j), 0 > j && (l.iw ? (j = 6, M--, D(l.w0, M), 0 > M && (M = 9, A--, D(l.w1, A), 0 > A && (A = 0, clearInterval(n)))) : (j = 9, $--, D(l.d1, $), 0 > $ && (0 > k && ($ = 0, clearInterval(n)), k > 0 && ($ = 9, k--, D(l.d2, k), 0 > k && (k = 0, clearInterval(n))))))))))))
                };
            I()
        })
    }, t.fn.timer.defaults = {
        current: "current",
        next: "next",
        begin: "timeBegin",
        end: "timeEnd",
        u0: "unit-0",
        u1: "unit-1",
        u2: "unit-2",
        css: {
            prev: {
                top: "-100%"
            },
            cur: {
                top: 0,
                opacity: 1
            },
            next: {
                top: "100%",
                opacity: 0
            },
            duration: 400,
            queue: !1
        }
    }
}(jQuery),
function(t) {
    t.fn.spy = function(e) {
        return e = t.extend({}, t.fn.spy.defaults, e), t(this).each(function(a) {
            var n, i, o, s, r, l, c = t(this),
                d = c.closest(".header"),
                f = d.clone(),
                u = t(window),
                h = t(),
                p = t(),
                v = t(),
                m = !0,
                g = !1,
                y = function() {
                    w(), b(), C(), j(), u.load(function() {
                        h.length && l && x(), k(), $(), T()
                    })
                },
                w = function() {
                    var t = "fixed" == c.css("position") || !1,
                        a = "fixed" == d.css("position") || !1,
                        n = c.data("spy"),
                        f = -1 != n.indexOf(e.helper) ? !e.ishelper : e.ishelper,
                        u = -1 != n.indexOf(e.affix) ? !e.isaffix : e.isaffix,
                        h = -1 != n.indexOf(e.scrollto) ? !e.isscrollto : e.isscrollto;
                    i = !t && !a && f || !1, s = u, l = h, c.hasClass("menu-hor") && (g = "hor"), c.hasClass("menu-ver") && (g = "ver"), o = i, r = s, c.removeAttr("data-spy")
                },
                b = function() {
                    i && (f.addClass(e.hghost).removeAttr("id"), d.after(f))
                },
                C = function() {
                    n = c.find("a"), $li = n.closest("li"), n.each(function() {
                        var e = t(this),
                            a = e.attr("href"),
                            n = void 0 != a ? a.substr(0, 1) : null;
                        "#" === n && a.length > 1 ? (t(a).closest(d).is(d) && (a = "body"), e.data("id", a), h = h.add(e)) : "#" === n && 1 === a.length ? v = v.add(e) : p = p.add(e)
                    })
                },
                x = function() {
                    h.on("click touchstart", function(a) {
                        var n = t(this),
                            i = t(n.data("id"));
                        if (i.length) {
                            var o = i.offset().top - e.scrollpadding;
                            t("html, body").animate({
                                scrollTop: o
                            }, {
                                duration: e.scrolldelay,
                                progress: function() {
                                    m = !1
                                },
                                done: function() {
                                    m = !0
                                }
                            }), S(n)
                        }
                        a.preventDefault()
                    })
                },
                T = function() {
                    "ver" === g && n.on("click touchstart", function(a) {
                        var n = t(this).next(e.menu);
                        if (void 0 !== c && n.length) {
                            var i, o = 400;
                            clearTimeout(i), i = setTimeout(function() {
                                c.css("height", "");
                                var t = c.outerHeight(!0);
                                c.data("heightouter", t), s && O()
                            }, o), a.preventDefault()
                        }
                    })
                },
                j = function() {
                    v.on("click", function(t) {
                        t.preventDefault()
                    })
                },
                $ = function() {
                    var t, e = c.width(),
                        a = 200;
                    u.resize(function() {
                        clearTimeout(t), t = setTimeout(function() {
                            var t = c.width();
                            t != e && (z(), i && A(), s && I(), s && N(), e = t), s && O()
                        }, a)
                    }), z(), i && A(), s && I(), s && O()
                },
                k = function() {
                    var t, e = 100;
                    u.on("scroll", function() {
                        i && _(), s && N(), l && (clearTimeout(t), t = setTimeout(function() {
                            m && M()
                        }, e))
                    }), i && _(), s && N(), l && M()
                },
                z = function() {
                    var t = u.width();
                    768 > t ? (i = !1, s = !1, d.removeClass(e.helperclass), c.removeClass(e.affixclass), c.css({
                        top: "",
                        height: ""
                    })) : (i = o, s = r)
                },
                M = function() {
                    for (var a = !0, n = 0; n < h.length && a; n++) {
                        var i = h.eq(n),
                            o = t(i.data("id"));
                        if (o.length) {
                            var s = o.offset().top - e.scrollpadding,
                                r = o.outerHeight(!0) + s,
                                l = u.scrollTop();
                            o.is(t(document.body)) && (r = 0), l >= s && r > l && (S(i), a = !1)
                        }
                    }
                },
                A = function() {
                    var t = f.hasClass(e.ready),
                        a = t ? f : d,
                        n = a.outerHeight(!0),
                        i = a.offset().top,
                        o = n + i + .5 * e.padding;
                    d.data("pbottom", o)
                },
                I = function() {
                    var t = c.clone().removeClass(e.affixclass);
                    t.insertBefore(c);
                    var a = c.data("offsetTop") ? c.data("offsetTop") : e.affixpadding,
                        n = t.offset().top - a,
                        i = t.height(),
                        o = t.outerHeight(!0),
                        s = o - i;
                    t.remove(), c.data({
                        top: a,
                        ptop: n,
                        heightouter: o,
                        margin: s
                    })
                },
                S = function(t) {
                    var a = t.closest("li");
                    a.hasClass(e.selected) || ($li.not(a).removeClass(e.selected), a.addClass(e.selected))
                },
                _ = function() {
                    var t, a = u.scrollTop(),
                        n = d.data("pbottom"),
                        i = 200;
                    a > n ? d.hasClass(e.helperclass) || (d.addClass(e.helperclass), f.addClass(e.ready), t = setTimeout(function() {
                        d.addClass(e.ready)
                    }, i)) : d.hasClass(e.helperclass) && (d.removeClass(e.helperclass), f.removeClass(e.ready), d.removeClass(e.ready), clearTimeout(t))
                },
                N = function() {
                    var t = u.scrollTop(),
                        a = c.data("ptop");
                    t > a ? c.hasClass(e.affixclass) || (c.addClass(e.affixclass), c.css("top", c.data("top"))) : c.hasClass(e.affixclass) && (c.removeClass(e.affixclass), c.css("top", ""))
                },
                O = function() {
                    var t = u.height(),
                        e = c.data("heightouter"),
                        a = c.data("top"),
                        n = c.data("margin"),
                        i = e + a;
                    i > t ? c.css("height", t - a - n) : c.css("height", "")
                };
            y()
        })
    }, t.fn.spy.defaults = {
        ishelper: !1,
        isaffix: !1,
        isscrollto: !1,
        scrolldelay: 400,
        scrollpadding: 40,
        affixpadding: 40,
        padding: 40,
        selected: "selected",
        ready: "ready",
        menu: ".menu",
        helper: "helper",
        helperclass: "helper",
        affix: "affix",
        affixclass: "affix",
        scrollto: "scrollto",
        hghost: "ghost"
    }
}(jQuery),
function(t) {
    window.co09FN || (window.co09FN = {}), window.co09FN.bgColor = function(e) {
        e.length && e.each(function() {
            var e = t(this),
                a = e.data("bg"),
                n = !1,
                i = !1;
            void 0 !== a && (-1 != a.indexOf("dark") && (n = !0), -1 != a.indexOf("only") && (i = !0), a = a.replace(/\s+/g, ""), a = a.replace(/dark|only/g, "")), i || (n ? e.addClass("bg-dark") : e.addClass("bg-light")), e.css("backgroundColor", a).removeAttr("data-bg")
        })
    }
}(jQuery),
function(t) {
    t.fn.textfill = function(e) {
        return e = t.extend({}, t.fn.textfill.defaults, e), t(this).each(function() {
            var a, n, i = t(this),
                o = -1,
                s = 0,
                r = !1,
                l = e.percent,
                c = parseInt(i.css("fontSize")),
                d = function() {
                    f(), r && (u(), h())
                },
                f = function() {
                    i.addClass(e._class);
                    var a = i.html();
                    "" !== a && (r = !0), n = t(e.tag, {
                        "class": e.textghost,
                        html: a
                    });
                    var o = i.data("fill");
                    "" !== o && (l = parseInt(o, 10) / 100), s = i.width(), i.removeAttr("data-fill")
                },
                u = function() {
                    var t, e = 500,
                        a = i.data("font");
                    "" !== a && void 0 !== a ? t = setInterval(function() {
                        i.hasClass("font-ready") && (p(), v(), clearInterval(t))
                    }, e) : (p(), v())
                },
                h = function() {
                    var e, a = 500;
                    t(window).resize(function() {
                        clearTimeout(e), e = setTimeout(function() {
                            var t = i.width();
                            t !== s && (v(), s = t)
                        }, a)
                    })
                },
                p = function() {
                    n.css({
                        "font-family": i.css("font-family"),
                        "font-weight": i.css("font-weight"),
                        "font-style": i.css("font-style")
                    })
                },
                v = function() {
                    n.css("font-size", i.css("font-size")).appendTo(t(document.body));
                    var e = i.width() * l - 5,
                        s = n.width();
                    for (-1 === o && (o = Math.round(c / s * 100) / 100), a = Math.floor(o * e * .94); e > s;) a++, s = n.css("font-size", a).width();
                    a--, 20 > a && a--, i.css("font-size", a), n.remove()
                };
            d()
        })
    }, t.fn.textfill.defaults = {
        _class: "textfill",
        textghost: "textghost",
        tag: "<span></span>",
        maxsize: 500,
        minsize: 5,
        percent: 1
    }
}(jQuery),
function(t) {
    t.fn.showfit = function(e) {
        return e = t.extend({}, t.fn.showfit.defaults, e), t(this).each(function(a) {
            var n = t(this),
                i = n.find(e.item),
                o = i.find(".thumbnail > img"),
                s = o.width(),
                r = !1,
                l = function() {
                    n.addClass(e.ready);
                    var t = 800;
                    setTimeout(function() {
                        c(), d()
                    }, t)
                },
                c = function() {
                    r = n.hasClass("isotope") ? !0 : !1
                },
                d = function() {
                    var e, a = 200;
                    t(window).resize(function() {
                        clearTimeout(e), e = setTimeout(f, a)
                    }), f()
                },
                f = function() {
                    var t = n.width(),
                        a = Math.floor(t / s),
                        i = t / s - a;
                    a > 2 ? i > e.ratio[0] && a++ : i > e.ratio[1] && a++, o.css("width", Math.floor(t / a)), r && n.isotope("reLayout")
                };
            l()
        })
    }, t.fn.showfit.defaults = {
        ratio: [.3, .2],
        item: "article",
        ready: "ready"
    }
}(jQuery),
function(t) {
    t.fn.showexpand = function(e) {
        return e = t.extend({}, t.fn.showexpand.defaults, e), t(this).each(function(a) {
            var n, i, o = t(this),
                s = o.find(e.item),
                r = t(),
                l = t(),
                c = t(),
                d = t(),
                f = e.theme,
                u = e.row,
                h = e.isContainer,
                p = e.isRow,
                v = e.isClose,
                m = function() {
                    g(), y();
                    var t = 500;
                    setTimeout(function() {
                        w(), b(), C()
                    }, t)
                },
                g = function() {
                    var t = o.data("expand");
                    void 0 !== t && (f = _prosValue(t, "theme") || e.theme, "light" === f && (f = ""), o.closest(".container").length && (h = !1), u = _prosValue(t, "gridsystem") || e.row, p = -1 !== t.indexOf("row-off") ? !e.isRow : e.isRow, v = -1 !== t.indexOf("close-off") ? !e.isClose : e.isClose)
                },
                y = function() {
                    s.each(function() {
                        var a = t(this),
                            n = a.find("." + e.expand);
                        if (n.length) {
                            var i = "<div></div>",
                                o = '<button class="' + e.closeClass + '"><span class="cite"></span></button>',
                                s = t(i, {
                                    "class": "container"
                                }),
                                r = t(i, {
                                    "class": u
                                }),
                                l = t(o, {
                                    "class": e.closeClass
                                }),
                                c = !0,
                                d = !0;
                            v && (a.data("close", l), n.append(l)), n.children(".container").length && (c = !1), n.children(".row").length && (d = !1), p && d && n.wrapInner(r), h && c && n.wrapInner(s), a.addClass(f), n.addClass(f), a.data("expand", n), n.remove()
                        } else a.data("expand", !1)
                    })
                },
                w = function() {
                    o.hasClass("isotope") && (o.isotope("option", {
                        itemPositionDataEnabled: !0
                    }), n = !0)
                },
                b = function() {
                    s.on("click touchstart", function(a) {
                        l = r, r = t(this);
                        var i = r.is(l);
                        i ? r.hasClass(e.actived) ? (r.removeClass(e.actived).css("margin-bottom", ""), c.remove(), n && setTimeout(function() {
                            o.isotope("reLayout")
                        }, 200)) : (r.addClass(e.actived), x()) : (r.addClass(e.actived), l.removeClass(e.actived).css("margin-bottom", ""), c.remove(), x(), !r.data("expand") && n && setTimeout(function() {
                            o.isotope("reLayout")
                        }, 200)), a.preventDefault()
                    })
                },
                C = function() {
                    var e, a = 200;
                    t(window).resize(function() {
                        clearTimeout(e), e = setTimeout(j, a)
                    })
                },
                x = function() {
                    var t = r.data("expand");
                    t && (c = t, r.after(t), setTimeout(function() {
                        j(!0)
                    }, 100), d = r.data("close"), d.data("item", r), T(d))
                },
                T = function(a) {
                    a.on("click touchstart", function(a) {
                        var i = t(this);
                        i.data("item");
                        c.remove(), r.removeClass(e.actived).css("margin-bottom", ""), n && setTimeout(function() {
                            o.isotope("reLayout")
                        }, 200), a.preventDefault()
                    })
                },
                j = function(t) {
                    if (n) {
                        var a;
                        null !== t ? a = 0 : t && (a = 300), o.isotope("option", {
                            itemPositionDataEnabled: !0
                        }), o.isotope("reLayout"), clearTimeout(i), i = setTimeout(function() {
                            if (r.length && c.length) {
                                var t = r.height(),
                                    a = r.data("isotope-item-position"),
                                    n = c.outerHeight(!0);
                                r.css("margin-bottom", n), c.css("top", t + a.y).addClass(e.ready), o.isotope("reLayout")
                            }
                        }, a)
                    }
                };
            m()
        })
    }, t.fn.showexpand.defaults = {
        item: "article",
        actived: "expand-actived",
        expand: "expand",
        pattern: "expand-pattern",
        ready: "ready",
        theme: "dark",
        row: "row-large",
        closeClass: "expand-close btn",
        isContainer: !0,
        isRow: !0,
        isClose: !0
    }
}(jQuery),
function(t) {
    t.fn.bgimg = function(e) {
        return e = t.extend({}, t.fn.bgimg.defaults, e), t(this).each(function(a) {
            var n, i, o, s, r, l, c, d = t(this),
                f = d.find("img"),
                u = d.parent(),
                h = e.overlay,
                p = !1,
                v = !1,
                m = !0,
                g = !0,
                y = {},
                w = e.time,
                b = e.overlayLight,
                C = function() {
                    x(), T(), $(), g && (k(), z())
                },
                x = function() {
                    if (m = Modernizr.csstransitions) {
                        var t = {
                            WebkitTransform: "-webkit-transform",
                            MozTransform: "-moz-transform",
                            OTransform: "-o-transform",
                            transform: "transform"
                        };
                        i = t[Modernizr.prefixed("transform")]
                    }
                },
                T = function() {
                    var t = d.data("setting");
                    void 0 !== t && (h = -1 !== t.indexOf("overlay-off") ? !e.overlay : e.overlay, b = -1 !== t.indexOf("overlay-dark") ? e.overlayDark : e.overlayLight, w = _prosValue(t, "resize")), f.length || (g = !1), h && j(), d.removeAttr("data-setting")
                },
                j = function() {
                    n = t("<div></div>", {
                        "class": b
                    }), n.appendTo(d)
                },
                $ = function() {
                    u.is(t(document.body)) ? (u.addClass(e.fullscreen), p = !0) : u.addClass(e.bgwrap)
                },
                k = function() {
                    var t = new Image;
                    t.onload = function() {
                        var a = t.width,
                            n = t.height;
                        c = a, l = a / n, d.addClass(e.ready), M()
                    }, t.src = f.attr("src")
                },
                z = function() {
                    var e;
                    t(window).resize(function() {
                        v || (v = !0, clearTimeout(e), e = setTimeout(function() {
                            M(), v = !1
                        }, w))
                    })
                },
                M = function() {
                    o = d.width() + 2, s = d.height() + 2, r = o / s;
                    var t, e, a, n, u = function() {
                            l > r ? (t = s * l, n = t / c, a = Math.floor(t - o) / 2, y[i] = "scale(" + n + ") translateX(" + -a + "px)") : (n = o / c, y[i] = "scale(" + n + ")"), f.css(y)
                        },
                        h = function() {
                            l > r ? (t = s * l, a = Math.floor((t - o) / 2), f.css({
                                width: t,
                                height: s,
                                "margin-left": -a
                            })) : (e = o / l, a = 0, f.css({
                                width: o,
                                height: e,
                                "margin-left": a
                            }))
                        };
                    m ? u() : h()
                };
            C()
        })
    }, t.fn.bgimg.defaults = {
        ready: "ready",
        actived: "actived",
        overlayName: "overlay",
        overlayLight: "overlay-light",
        overlayDark: "overlay-dark",
        fullscreen: "fullscreen",
        bgwrap: "bg-wrap",
        overlay: !0,
        time: 0
    }
}(jQuery),
function(t) {
    t.fn.mscale = function(e) {
        return e = t.extend({}, t.fn.mscale.defaults, e), t(this).each(function() {
            var a, n = t(this),
                i = n.find("img"),
                o = n.data(e.data),
                s = function() {
                    1 == i.length && (l(), void 0 !== o && "" !== o && (o = parseInt(o), r()))
                },
                r = function() {
                    var t = new Image;
                    t.src = i.attr("src"), t.onload = function() {
                        var e = Math.round(t.width * o / 100);
                        a.css({
                            width: e,
                            height: "auto"
                        }).data("width", e)
                    }
                },
                l = function() {
                    a = i.clone(), n.addClass(e._class), i.after(a)
                };
            s()
        })
    }, t.fn.mscale.defaults = {
        data: "mscale",
        _class: "m-scale"
    }
}(jQuery),
function(t) {
    t.fn.imghover = function(e) {
        return e = t.extend({}, t.fn.imghover.defaults, e), t(this).each(function(a) {
            var n, i = t(this),
                o = i.closest(".container"),
                s = t(window),
                r = o.width(),
                l = function() {
                    c(), d()
                },
                c = function() {
                    i.addClass(e.ready)
                },
                d = function() {
                    var t = new Image;
                    t.onload = function() {
                        n = t.width, f()
                    }, t.src = i.find("img").eq(0).attr("src")
                },
                f = function() {
                    var t, e = 300;
                    s.resize(function() {
                        clearTimeout(t), t = setTimeout(function() {
                            var t = o.width();
                            t !== r && (u(), r = t)
                        }, e)
                    }), u()
                },
                u = function() {
                    var t = o.width(),
                        e = i.find("img").eq(1).data("width");
                    748 > t && void 0 !== e && null !== e ? i.css("width", e / 2) : i.css("width", n / 2)
                };
            l()
        })
    }, t.fn.imghover.defaults = {
        ready: "fx-ready"
    }
}(jQuery),
function(t) {
    t.fn.imglazy = function(e) {
        return e = t.extend({}, t.fn.imglazy.defaults, e), t(this).each(function() {
            var a, n, i, o, s, r = t(this),
                l = t(window),
                c = r.data("src"),
                d = e.range,
                f = function() {
                    u(), h()
                },
                u = function() {
                    var t = r.data("range");
                    void 0 !== t && (d = t);
                    var e = Math.round(1e5 * Math.random());
                    e = "img" + e, s = "scroll." + e
                },
                h = function() {
                    var t, e = 100;
                    l.on(s, function() {
                        clearTimeout(t), t = setTimeout(p, e)
                    });
                    var a, n = 500;
                    l.resize(function() {
                        clearTimeout(a), a = setTimeout(p, n)
                    }), p()
                },
                p = function() {
                    var t = document;
                    a = Math.max(t.body.scrollTop, t.documentElement.scrollTop), i = window.innerHeight ? window.innerHeight : t.documentElement.clientHeight, n = a + i + d, o = r.offset().top, n > o && (r.attr("src", c).removeAttr("data-src"), l.off(s))
                };
            f()
        })
    }, t.fn.imglazy.defaults = {
        range: 10
    }
}(jQuery),
function(t) {
    t.fn.page = function(e) {
        return e = t.extend({}, t.fn.page.defaults, e), t(this).each(function() {
            var a, n, i, o, s, r = t(this),
                l = r.find("." + e.page),
                c = t(),
                d = !1,
                f = !1,
                u = !1,
                h = -1,
                p = function() {
                    v(), m(), g(), c.length && y()
                },
                v = function() {
                    var t = {
                        WebkitAnimation: "webkitAnimationEnd",
                        msAnimation: "MSAnimationEnd",
                        animation: "animationend"
                    };
                    s = t[Modernizr.prefixed("animation")]
                },
                m = function() {
                    var a = 0;
                    l.each(function() {
                        var n = t(this),
                            i = n.find("[data-page]");
                        i.data("currPage", n), c = c.add(i), n.hasClass(e.actived) && (n.removeClass(e.actived), h = a), a++, n.data("originalClass", n.attr("class"))
                    }), -1 !== h ? l.eq(h).addClass(e.actived) : l.eq(0).addClass(e.actived), t("html").addClass(e.htmlClass)
                },
                g = function() {
                    i = "page-slideIn", o = "page-slideOut"
                },
                y = function() {
                    function i(e) {
                        var i = e.data("page");
                        a = e.data("currPage"), n = t(i)
                    }
                    void 0 !== s ? c.on("click touchstart", function(e) {
                        return d ? !1 : (d = !0, i(t(this)), w(), void e.preventDefault())
                    }) : c.on("click", function(o) {
                        i(t(this)), a.removeClass(e.actived), n.addClass(e.actived), o.preventDefault()
                    })
                },
                w = function() {
                    r.addClass(e.running), a.addClass(o).on(s, function() {
                        a.off(s), f = !0, u && b()
                    }), n.addClass(i).addClass(e.actived).on(s, function() {
                        n.off(s), u = !0, f && b()
                    })
                },
                b = function() {
                    f = !1, u = !1, C(), d = !1
                },
                C = function() {
                    r.removeClass(e.running), a.attr("class", a.data("originalClass")), n.attr("class", n.data("originalClass")).addClass(e.actived)
                };
            p()
        })
    }, t.fn.page.defaults = {
        page: "page",
        actived: "actived",
        running: "page-running",
        htmlClass: "page-viewport"
    }
}(jQuery),
function(t) {
    t.fn.centerCSS = function(e) {
        return e = t.extend({}, t.fn.centerCSS.defaults, e), t(this).each(function(a) {
            var n, i, o = t(this),
                s = o.children(),
                r = function() {
                    l(), c()
                },
                l = function() {
                    if (s.length) {
                        var t = o.children(".bg-img");
                        t.length && (s = s.not(t))
                    }
                },
                c = function() {
                    n = t("<div></div>", {
                        "class": e.outer
                    });
                    var a = _ie7();
                    a && (i = t("<div></div>", {
                        "class": e.inner
                    }), n.append(i)), o.wrapInner(n)
                };
            r()
        })
    }, t.fn.centerCSS.defaults = {
        outer: "c-outer",
        inner: "c-inner"
    }
}(jQuery),
function(t) {
    window.co09FN || (window.co09FN = {}), window.co09FN.placeholder = function() {
        window.Modernizr && Modernizr.placeholder && t("input[placeholder], textarea[placeholder]").each(function() {
            var e = t(this),
                a = e.attr("placeholder");
            e.val(a), e.on("focus", function() {
                e.val() === a && e.val("")
            }), e.on("focusout", function() {
                "" === e.val() && e.val(a)
            })
        })
    }
}(jQuery),
function(t) {
    window.co09FN || (window.co09FN = {}), window.co09FN.backtop = function() {
        var e = t(document.body).data("setting"),
            a = !0;
        if (void 0 !== e && -1 !== e.indexOf("backtop-off") && (a = !1), a) {
            var n, i = '<a id="backtop" href="#">Top<span class="first"></span><span class="last"></span></a>';
            t(document.body).append(i), n = t("#backtop");
            var o, s = 400;
            t(window).on("scroll.backtop", function() {
                clearTimeout(o), o = setTimeout(function() {
                    t(this).scrollTop() > 100 ? n.hasClass("actived") || n.addClass("actived") : n.removeClass("actived")
                }, s)
            }), n.on("click touchstart", function(e) {
                t("html, body").animate({
                    scrollTop: 0
                }, 400), e.preventDefault()
            })
        }
    }
}(jQuery),
function(t) {
    window.co09FN || (window.co09FN = {}), window.co09FN.addElements = function() {
        var e = t(".menu .menu, .menu-mega .menu-outer").prev();
        e.length && (e.append('<span class="caret"></span>'), e.each(function() {
            var e = t(this),
                a = e.closest(".menu-ver");
            a.length ? e.btntoggle({
                type: "click"
            }) : e.btntoggle({
                type: "hoverswap"
            })
        }));
        var a = t(".menu-hor, .menu-ver");
        a.length && a.each(function() {
            var e = t(this);
            if (e.hasClass("m-classic")) {
                var a = '<a href="#"';
                a += ' class="menu-toggle btn-toggle"', a += " ><span></span><span></span><span></span>", a += "</a>", e.prepend(a)
            } else {
                var a = '<a href="#"';
                a += ' class="menu-toggle ele-toggle"', a += ' data-toggle="html"', a += ' data-toggle-class="push"', a += " ><span></span><span></span><span></span>", a += "</a>", e.before(a), e.addClass("m-push");
                var n = t('[class*="logo-"] .logo');
                n.length && n.wrap(t("<div></div>", {
                    "class": "l-push"
                }))
            }
        });
        var n = t(".menu .search-value");
        n.length && (n.focus(function() {
            t(this).addClass("focus")
        }), n.focusout(function() {
            t(this).removeClass("focus")
        }));
        var i = t(".select > li");
        i.length && i.click(function() {
            return t(this).addClass("selected").siblings().removeClass("selected"), !1
        });
        var o = _ie7();
        if (o) {
            var s, r = t(".backface");
            r.length && (s = t("<div></div>", {
                "class": "backface-inner"
            }), r.wrapInner(s))
        }
    }
}(jQuery),
function(t) {
    window.co09FN || (window.co09FN = {}), window.co09FN.themeControl = function() {
        var e = t(document.body),
            a = t("body > .header").outerHeight(!0) + parseInt(e.css("padding-top")) + 1,
            n = t("#theme-close"),
            i = t("#th-control .theme li"),
            o = t("#th-control .layout li"),
            s = t("#th-control .logo-layout li"),
            r = function(a, n) {
                var i = "";
                a.data("options") || a.siblings().each(function() {
                    i += t(this).data("class") + " ", a.data("options", i)
                }), void 0 === n && (n = e), n.hasClass(a.data("class")) || n.removeClass(a.data("options")).addClass(a.data("class"))
            };
        n.length && (a > 300 && (a = 125), n.css("top", parseInt(n.css("top")) != a ? a : "")), i.length && i.on("click", function() {
            return r(t(this)), !1
        }), o.length && o.on("click", function() {
            return r(t(this)), !1
        }), s.length && s.on("click", function() {
            return r(t(this), t(".header")), !1
        })
    }
}(jQuery), jQuery(document).ready(function(t) {
    var e = !!window.co09FN;
    e && (co09FN.addElements(), co09FN.bgColor(t("[data-bg]")));
    var a = t(".accordion");
    a.length && a.collapse();
    var n = t(".tab-hor, .tab-ver");
    n.length && n.tab();
    var i = t("[data-tooltip], .tt-content");
    i.length && i.tooltip();
    var o = t(".alert");
    o.length && o.alert();
    var s = t(".btn-toggle"),
        r = t(".ele-toggle");
    s.length && s.btntoggle(), r.length && r.eletoggle(), e && co09FN.placeholder(), $navControl = t("[data-spy]"), $navControl.length && $navControl.spy()
}), jQuery(window).load(function(t) {
    var e = !!window.co09FN;
    e && co09FN.themeControl()
});