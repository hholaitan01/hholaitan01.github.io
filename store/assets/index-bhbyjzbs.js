const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["assets/index.esm-DmHAKC5Y.js", "assets/index.esm-Bce8K4fQ.js"]))) => i.map(i => d[i]);
import {
    A as e,
    C as t,
    D as n,
    E as r,
    F as i,
    I as a,
    L as o,
    M as s,
    N as c,
    O as l,
    P as u,
    S as d,
    T as f,
    _ as p,
    a as m,
    b as h,
    d as g,
    f as _,
    h as v,
    i as y,
    k as b,
    l as x,
    n as ee,
    o as te,
    p as S,
    r as ne,
    s as re,
    t as C,
    u as ie,
    v as ae,
    w,
    x as oe,
    y as se
} from "./index.esm-Bce8K4fQ.js";
var T = (e, t) => () => (t || e((t = {
    exports: {}
}).exports, t), t.exports);
(function() {
    let e = document.createElement(`link`).relList;
    if (e && e.supports && e.supports(`modulepreload`)) return;
    for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
    new MutationObserver(e => {
        for (let t of e)
            if (t.type === `childList`)
                for (let e of t.addedNodes) e.tagName === `LINK` && e.rel === `modulepreload` && n(e)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function t(e) {
        let t = {};
        return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), e.crossOrigin === `use-credentials` ? t.credentials = `include` : e.crossOrigin === `anonymous` ? t.credentials = `omit` : t.credentials = `same-origin`, t
    }

    function n(e) {
        if (e.ep) return;
        e.ep = !0;
        let n = t(e);
        fetch(e.href, n)
    }
})();
var E = T((e => {
        var t = Symbol.for(`react.transitional.element`),
            n = Symbol.for(`react.portal`),
            r = Symbol.for(`react.fragment`),
            i = Symbol.for(`react.strict_mode`),
            a = Symbol.for(`react.profiler`),
            o = Symbol.for(`react.consumer`),
            s = Symbol.for(`react.context`),
            c = Symbol.for(`react.forward_ref`),
            l = Symbol.for(`react.suspense`),
            u = Symbol.for(`react.memo`),
            d = Symbol.for(`react.lazy`),
            f = Symbol.for(`react.activity`),
            p = Symbol.iterator;

        function m(e) {
            return typeof e != `object` || !e ? null : (e = p && e[p] || e[`@@iterator`], typeof e == `function` ? e : null)
        }
        var h = {
                isMounted: function() {
                    return !1
                },
                enqueueForceUpdate: function() {},
                enqueueReplaceState: function() {},
                enqueueSetState: function() {}
            },
            g = Object.assign,
            _ = {};

        function v(e, t, n) {
            this.props = e, this.context = t, this.refs = _, this.updater = n || h
        }
        v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
            if (typeof e != `object` && typeof e != `function` && e != null) throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);
            this.updater.enqueueSetState(this, e, t, `setState`)
        }, v.prototype.forceUpdate = function(e) {
            this.updater.enqueueForceUpdate(this, e, `forceUpdate`)
        };

        function y() {}
        y.prototype = v.prototype;

        function b(e, t, n) {
            this.props = e, this.context = t, this.refs = _, this.updater = n || h
        }
        var x = b.prototype = new y;
        x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
        var ee = Array.isArray;

        function te() {}
        var S = {
                H: null,
                A: null,
                T: null,
                S: null
            },
            ne = Object.prototype.hasOwnProperty;

        function re(e, n, r) {
            var i = r.ref;
            return {
                $$typeof: t,
                type: e,
                key: n,
                ref: i === void 0 ? null : i,
                props: r
            }
        }

        function C(e, t) {
            return re(e.type, t, e.props)
        }

        function ie(e) {
            return typeof e == `object` && !!e && e.$$typeof === t
        }

        function ae(e) {
            var t = {
                "=": `=0`,
                ":": `=2`
            };
            return `$` + e.replace(/[=:]/g, function(e) {
                return t[e]
            })
        }
        var w = /\/+/g;

        function oe(e, t) {
            return typeof e == `object` && e && e.key != null ? ae(`` + e.key) : t.toString(36)
        }

        function se(e) {
            switch (e.status) {
                case `fulfilled`:
                    return e.value;
                case `rejected`:
                    throw e.reason;
                default:
                    switch (typeof e.status == `string` ? e.then(te, te) : (e.status = `pending`, e.then(function(t) {
                            e.status === `pending` && (e.status = `fulfilled`, e.value = t)
                        }, function(t) {
                            e.status === `pending` && (e.status = `rejected`, e.reason = t)
                        })), e.status) {
                        case `fulfilled`:
                            return e.value;
                        case `rejected`:
                            throw e.reason
                    }
            }
            throw e
        }

        function T(e, r, i, a, o) {
            var s = typeof e;
            (s === `undefined` || s === `boolean`) && (e = null);
            var c = !1;
            if (e === null) c = !0;
            else switch (s) {
                case `bigint`:
                case `string`:
                case `number`:
                    c = !0;
                    break;
                case `object`:
                    switch (e.$$typeof) {
                        case t:
                        case n:
                            c = !0;
                            break;
                        case d:
                            return c = e._init, T(c(e._payload), r, i, a, o)
                    }
            }
            if (c) return o = o(e), c = a === `` ? `.` + oe(e, 0) : a, ee(o) ? (i = ``, c != null && (i = c.replace(w, `$&/`) + `/`), T(o, r, i, ``, function(e) {
                return e
            })) : o != null && (ie(o) && (o = C(o, i + (o.key == null || e && e.key === o.key ? `` : (`` + o.key).replace(w, `$&/`) + `/`) + c)), r.push(o)), 1;
            c = 0;
            var l = a === `` ? `.` : a + `:`;
            if (ee(e))
                for (var u = 0; u < e.length; u++) a = e[u], s = l + oe(a, u), c += T(a, r, i, s, o);
            else if (u = m(e), typeof u == `function`)
                for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + oe(a, u++), c += T(a, r, i, s, o);
            else if (s === `object`) {
                if (typeof e.then == `function`) return T(se(e), r, i, a, o);
                throw r = String(e), Error(`Objects are not valid as a React child (found: ` + (r === `[object Object]` ? `object with keys {` + Object.keys(e).join(`, `) + `}` : r) + `). If you meant to render a collection of children, use an array instead.`)
            }
            return c
        }

        function E(e, t, n) {
            if (e == null) return e;
            var r = [],
                i = 0;
            return T(e, r, ``, ``, function(e) {
                return t.call(n, e, i++)
            }), r
        }

        function ce(e) {
            if (e._status === -1) {
                var t = e._result;
                t = t(), t.then(function(t) {
                    (e._status === 0 || e._status === -1) && (e._status = 1, e._result = t)
                }, function(t) {
                    (e._status === 0 || e._status === -1) && (e._status = 2, e._result = t)
                }), e._status === -1 && (e._status = 0, e._result = t)
            }
            if (e._status === 1) return e._result.default;
            throw e._result
        }
        var le = typeof reportError == `function` ? reportError : function(e) {
                if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
                    var t = new window.ErrorEvent(`error`, {
                        bubbles: !0,
                        cancelable: !0,
                        message: typeof e == `object` && e && typeof e.message == `string` ? String(e.message) : String(e),
                        error: e
                    });
                    if (!window.dispatchEvent(t)) return
                } else if (typeof process == `object` && typeof process.emit == `function`) {
                    process.emit(`uncaughtException`, e);
                    return
                }
                console.error(e)
            },
            ue = {
                map: E,
                forEach: function(e, t, n) {
                    E(e, function() {
                        t.apply(this, arguments)
                    }, n)
                },
                count: function(e) {
                    var t = 0;
                    return E(e, function() {
                        t++
                    }), t
                },
                toArray: function(e) {
                    return E(e, function(e) {
                        return e
                    }) || []
                },
                only: function(e) {
                    if (!ie(e)) throw Error(`React.Children.only expected to receive a single React element child.`);
                    return e
                }
            };
        e.Activity = f, e.Children = ue, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S, e.__COMPILER_RUNTIME = {
            __proto__: null,
            c: function(e) {
                return S.H.useMemoCache(e)
            }
        }, e.cache = function(e) {
            return function() {
                return e.apply(null, arguments)
            }
        }, e.cacheSignal = function() {
            return null
        }, e.cloneElement = function(e, t, n) {
            if (e == null) throw Error(`The argument must be a React element, but you passed ` + e + `.`);
            var r = g({}, e.props),
                i = e.key;
            if (t != null)
                for (a in t.key !== void 0 && (i = `` + t.key), t) !ne.call(t, a) || a === `key` || a === `__self` || a === `__source` || a === `ref` && t.ref === void 0 || (r[a] = t[a]);
            var a = arguments.length - 2;
            if (a === 1) r.children = n;
            else if (1 < a) {
                for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
                r.children = o
            }
            return re(e.type, i, r)
        }, e.createContext = function(e) {
            return e = {
                $$typeof: s,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null
            }, e.Provider = e, e.Consumer = {
                $$typeof: o,
                _context: e
            }, e
        }, e.createElement = function(e, t, n) {
            var r, i = {},
                a = null;
            if (t != null)
                for (r in t.key !== void 0 && (a = `` + t.key), t) ne.call(t, r) && r !== `key` && r !== `__self` && r !== `__source` && (i[r] = t[r]);
            var o = arguments.length - 2;
            if (o === 1) i.children = n;
            else if (1 < o) {
                for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
                i.children = s
            }
            if (e && e.defaultProps)
                for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
            return re(e, a, i)
        }, e.createRef = function() {
            return {
                current: null
            }
        }, e.forwardRef = function(e) {
            return {
                $$typeof: c,
                render: e
            }
        }, e.isValidElement = ie, e.lazy = function(e) {
            return {
                $$typeof: d,
                _payload: {
                    _status: -1,
                    _result: e
                },
                _init: ce
            }
        }, e.memo = function(e, t) {
            return {
                $$typeof: u,
                type: e,
                compare: t === void 0 ? null : t
            }
        }, e.startTransition = function(e) {
            var t = S.T,
                n = {};
            S.T = n;
            try {
                var r = e(),
                    i = S.S;
                i !== null && i(n, r), typeof r == `object` && r && typeof r.then == `function` && r.then(te, le)
            } catch (e) {
                le(e)
            } finally {
                t !== null && n.types !== null && (t.types = n.types), S.T = t
            }
        }, e.unstable_useCacheRefresh = function() {
            return S.H.useCacheRefresh()
        }, e.use = function(e) {
            return S.H.use(e)
        }, e.useActionState = function(e, t, n) {
            return S.H.useActionState(e, t, n)
        }, e.useCallback = function(e, t) {
            return S.H.useCallback(e, t)
        }, e.useContext = function(e) {
            return S.H.useContext(e)
        }, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
            return S.H.useDeferredValue(e, t)
        }, e.useEffect = function(e, t) {
            return S.H.useEffect(e, t)
        }, e.useEffectEvent = function(e) {
            return S.H.useEffectEvent(e)
        }, e.useId = function() {
            return S.H.useId()
        }, e.useImperativeHandle = function(e, t, n) {
            return S.H.useImperativeHandle(e, t, n)
        }, e.useInsertionEffect = function(e, t) {
            return S.H.useInsertionEffect(e, t)
        }, e.useLayoutEffect = function(e, t) {
            return S.H.useLayoutEffect(e, t)
        }, e.useMemo = function(e, t) {
            return S.H.useMemo(e, t)
        }, e.useOptimistic = function(e, t) {
            return S.H.useOptimistic(e, t)
        }, e.useReducer = function(e, t, n) {
            return S.H.useReducer(e, t, n)
        }, e.useRef = function(e) {
            return S.H.useRef(e)
        }, e.useState = function(e) {
            return S.H.useState(e)
        }, e.useSyncExternalStore = function(e, t, n) {
            return S.H.useSyncExternalStore(e, t, n)
        }, e.useTransition = function() {
            return S.H.useTransition()
        }, e.version = `19.2.4`
    })),
    ce = T(((e, t) => {
        t.exports = E()
    })),
    le = T((e => {
        function t(e, t) {
            var n = e.length;
            e.push(t);
            a: for (; 0 < n;) {
                var r = n - 1 >>> 1,
                    a = e[r];
                if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
                else break a
            }
        }

        function n(e) {
            return e.length === 0 ? null : e[0]
        }

        function r(e) {
            if (e.length === 0) return null;
            var t = e[0],
                n = e.pop();
            if (n !== t) {
                e[0] = n;
                a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
                    var s = 2 * (r + 1) - 1,
                        c = e[s],
                        l = s + 1,
                        u = e[l];
                    if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
                    else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
                    else break a
                }
            }
            return t
        }

        function i(e, t) {
            var n = e.sortIndex - t.sortIndex;
            return n === 0 ? e.id - t.id : n
        }
        if (e.unstable_now = void 0, typeof performance == `object` && typeof performance.now == `function`) {
            var a = performance;
            e.unstable_now = function() {
                return a.now()
            }
        } else {
            var o = Date,
                s = o.now();
            e.unstable_now = function() {
                return o.now() - s
            }
        }
        var c = [],
            l = [],
            u = 1,
            d = null,
            f = 3,
            p = !1,
            m = !1,
            h = !1,
            g = !1,
            _ = typeof setTimeout == `function` ? setTimeout : null,
            v = typeof clearTimeout == `function` ? clearTimeout : null,
            y = typeof setImmediate < `u` ? setImmediate : null;

        function b(e) {
            for (var i = n(l); i !== null;) {
                if (i.callback === null) r(l);
                else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
                else break;
                i = n(l)
            }
        }

        function x(e) {
            if (h = !1, b(e), !m)
                if (n(c) !== null) m = !0, ee || (ee = !0, ie());
                else {
                    var t = n(l);
                    t !== null && oe(x, t.startTime - e)
                }
        }
        var ee = !1,
            te = -1,
            S = 5,
            ne = -1;

        function re() {
            return g ? !0 : !(e.unstable_now() - ne < S)
        }

        function C() {
            if (g = !1, ee) {
                var t = e.unstable_now();
                ne = t;
                var i = !0;
                try {
                    a: {
                        m = !1,
                        h && (h = !1, v(te), te = -1),
                        p = !0;
                        var a = f;
                        try {
                            b: {
                                for (b(t), d = n(c); d !== null && !(d.expirationTime > t && re());) {
                                    var o = d.callback;
                                    if (typeof o == `function`) {
                                        d.callback = null, f = d.priorityLevel;
                                        var s = o(d.expirationTime <= t);
                                        if (t = e.unstable_now(), typeof s == `function`) {
                                            d.callback = s, b(t), i = !0;
                                            break b
                                        }
                                        d === n(c) && r(c), b(t)
                                    } else r(c);
                                    d = n(c)
                                }
                                if (d !== null) i = !0;
                                else {
                                    var u = n(l);
                                    u !== null && oe(x, u.startTime - t), i = !1
                                }
                            }
                            break a
                        }
                        finally {
                            d = null, f = a, p = !1
                        }
                        i = void 0
                    }
                }
                finally {
                    i ? ie() : ee = !1
                }
            }
        }
        var ie;
        if (typeof y == `function`) ie = function() {
            y(C)
        };
        else if (typeof MessageChannel < `u`) {
            var ae = new MessageChannel,
                w = ae.port2;
            ae.port1.onmessage = C, ie = function() {
                w.postMessage(null)
            }
        } else ie = function() {
            _(C, 0)
        };

        function oe(t, n) {
            te = _(function() {
                t(e.unstable_now())
            }, n)
        }
        e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
            e.callback = null
        }, e.unstable_forceFrameRate = function(e) {
            0 > e || 125 < e ? console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`) : S = 0 < e ? Math.floor(1e3 / e) : 5
        }, e.unstable_getCurrentPriorityLevel = function() {
            return f
        }, e.unstable_next = function(e) {
            switch (f) {
                case 1:
                case 2:
                case 3:
                    var t = 3;
                    break;
                default:
                    t = f
            }
            var n = f;
            f = t;
            try {
                return e()
            } finally {
                f = n
            }
        }, e.unstable_requestPaint = function() {
            g = !0
        }, e.unstable_runWithPriority = function(e, t) {
            switch (e) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    e = 3
            }
            var n = f;
            f = e;
            try {
                return t()
            } finally {
                f = n
            }
        }, e.unstable_scheduleCallback = function(r, i, a) {
            var o = e.unstable_now();
            switch (typeof a == `object` && a ? (a = a.delay, a = typeof a == `number` && 0 < a ? o + a : o) : a = o, r) {
                case 1:
                    var s = -1;
                    break;
                case 2:
                    s = 250;
                    break;
                case 5:
                    s = 1073741823;
                    break;
                case 4:
                    s = 1e4;
                    break;
                default:
                    s = 5e3
            }
            return s = a + s, r = {
                id: u++,
                callback: i,
                priorityLevel: r,
                startTime: a,
                expirationTime: s,
                sortIndex: -1
            }, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(te), te = -1) : h = !0, oe(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, ie()))), r
        }, e.unstable_shouldYield = re, e.unstable_wrapCallback = function(e) {
            var t = f;
            return function() {
                var n = f;
                f = t;
                try {
                    return e.apply(this, arguments)
                } finally {
                    f = n
                }
            }
        }
    })),
    ue = T(((e, t) => {
        t.exports = le()
    })),
    de = T((e => {
        var t = ce();

        function n(e) {
            var t = `https://react.dev/errors/` + e;
            if (1 < arguments.length) {
                t += `?args[]=` + encodeURIComponent(arguments[1]);
                for (var n = 2; n < arguments.length; n++) t += `&args[]=` + encodeURIComponent(arguments[n])
            }
            return `Minified React error #` + e + `; visit ` + t + ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
        }

        function r() {}
        var i = {
                d: {
                    f: r,
                    r: function() {
                        throw Error(n(522))
                    },
                    D: r,
                    C: r,
                    L: r,
                    m: r,
                    X: r,
                    S: r,
                    M: r
                },
                p: 0,
                findDOMNode: null
            },
            a = Symbol.for(`react.portal`);

        function o(e, t, n) {
            var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
            return {
                $$typeof: a,
                key: r == null ? null : `` + r,
                children: e,
                containerInfo: t,
                implementation: n
            }
        }
        var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

        function c(e, t) {
            if (e === `font`) return ``;
            if (typeof t == `string`) return t === `use-credentials` ? t : ``
        }
        e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
            var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
            if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
            return o(e, t, null, r)
        }, e.flushSync = function(e) {
            var t = s.T,
                n = i.p;
            try {
                if (s.T = null, i.p = 2, e) return e()
            } finally {
                s.T = t, i.p = n, i.d.f()
            }
        }, e.preconnect = function(e, t) {
            typeof e == `string` && (t ? (t = t.crossOrigin, t = typeof t == `string` ? t === `use-credentials` ? t : `` : void 0) : t = null, i.d.C(e, t))
        }, e.prefetchDNS = function(e) {
            typeof e == `string` && i.d.D(e)
        }, e.preinit = function(e, t) {
            if (typeof e == `string` && t && typeof t.as == `string`) {
                var n = t.as,
                    r = c(n, t.crossOrigin),
                    a = typeof t.integrity == `string` ? t.integrity : void 0,
                    o = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0;
                n === `style` ? i.d.S(e, typeof t.precedence == `string` ? t.precedence : void 0, {
                    crossOrigin: r,
                    integrity: a,
                    fetchPriority: o
                }) : n === `script` && i.d.X(e, {
                    crossOrigin: r,
                    integrity: a,
                    fetchPriority: o,
                    nonce: typeof t.nonce == `string` ? t.nonce : void 0
                })
            }
        }, e.preinitModule = function(e, t) {
            if (typeof e == `string`)
                if (typeof t == `object` && t) {
                    if (t.as == null || t.as === `script`) {
                        var n = c(t.as, t.crossOrigin);
                        i.d.M(e, {
                            crossOrigin: n,
                            integrity: typeof t.integrity == `string` ? t.integrity : void 0,
                            nonce: typeof t.nonce == `string` ? t.nonce : void 0
                        })
                    }
                } else t ?? i.d.M(e)
        }, e.preload = function(e, t) {
            if (typeof e == `string` && typeof t == `object` && t && typeof t.as == `string`) {
                var n = t.as,
                    r = c(n, t.crossOrigin);
                i.d.L(e, n, {
                    crossOrigin: r,
                    integrity: typeof t.integrity == `string` ? t.integrity : void 0,
                    nonce: typeof t.nonce == `string` ? t.nonce : void 0,
                    type: typeof t.type == `string` ? t.type : void 0,
                    fetchPriority: typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
                    referrerPolicy: typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
                    imageSrcSet: typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
                    imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : void 0,
                    media: typeof t.media == `string` ? t.media : void 0
                })
            }
        }, e.preloadModule = function(e, t) {
            if (typeof e == `string`)
                if (t) {
                    var n = c(t.as, t.crossOrigin);
                    i.d.m(e, {
                        as: typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
                        crossOrigin: n,
                        integrity: typeof t.integrity == `string` ? t.integrity : void 0
                    })
                } else i.d.m(e)
        }, e.requestFormReset = function(e) {
            i.d.r(e)
        }, e.unstable_batchedUpdates = function(e, t) {
            return e(t)
        }, e.useFormState = function(e, t, n) {
            return s.H.useFormState(e, t, n)
        }, e.useFormStatus = function() {
            return s.H.useHostTransitionStatus()
        }, e.version = `19.2.4`
    })),
    fe = T(((e, t) => {
        function n() {
            if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`)) try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)
            } catch (e) {
                console.error(e)
            }
        }
        n(), t.exports = de()
    })),
    pe = T((e => {
        var t = ue(),
            n = ce(),
            r = fe();

        function i(e) {
            var t = `https://react.dev/errors/` + e;
            if (1 < arguments.length) {
                t += `?args[]=` + encodeURIComponent(arguments[1]);
                for (var n = 2; n < arguments.length; n++) t += `&args[]=` + encodeURIComponent(arguments[n])
            }
            return `Minified React error #` + e + `; visit ` + t + ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
        }

        function a(e) {
            return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
        }

        function o(e) {
            var t = e,
                n = e;
            if (e.alternate)
                for (; t.return;) t = t.return;
            else {
                e = t;
                do t = e, t.flags & 4098 && (n = t.return), e = t.return; while (e)
            }
            return t.tag === 3 ? n : null
        }

        function s(e) {
            if (e.tag === 13) {
                var t = e.memoizedState;
                if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
            }
            return null
        }

        function c(e) {
            if (e.tag === 31) {
                var t = e.memoizedState;
                if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
            }
            return null
        }

        function l(e) {
            if (o(e) !== e) throw Error(i(188))
        }

        function u(e) {
            var t = e.alternate;
            if (!t) {
                if (t = o(e), t === null) throw Error(i(188));
                return t === e ? e : null
            }
            for (var n = e, r = t;;) {
                var a = n.return;
                if (a === null) break;
                var s = a.alternate;
                if (s === null) {
                    if (r = a.return, r !== null) {
                        n = r;
                        continue
                    }
                    break
                }
                if (a.child === s.child) {
                    for (s = a.child; s;) {
                        if (s === n) return l(a), e;
                        if (s === r) return l(a), t;
                        s = s.sibling
                    }
                    throw Error(i(188))
                }
                if (n.return !== r.return) n = a, r = s;
                else {
                    for (var c = !1, u = a.child; u;) {
                        if (u === n) {
                            c = !0, n = a, r = s;
                            break
                        }
                        if (u === r) {
                            c = !0, r = a, n = s;
                            break
                        }
                        u = u.sibling
                    }
                    if (!c) {
                        for (u = s.child; u;) {
                            if (u === n) {
                                c = !0, n = s, r = a;
                                break
                            }
                            if (u === r) {
                                c = !0, r = s, n = a;
                                break
                            }
                            u = u.sibling
                        }
                        if (!c) throw Error(i(189))
                    }
                }
                if (n.alternate !== r) throw Error(i(190))
            }
            if (n.tag !== 3) throw Error(i(188));
            return n.stateNode.current === n ? e : t
        }

        function d(e) {
            var t = e.tag;
            if (t === 5 || t === 26 || t === 27 || t === 6) return e;
            for (e = e.child; e !== null;) {
                if (t = d(e), t !== null) return t;
                e = e.sibling
            }
            return null
        }
        var f = Object.assign,
            p = Symbol.for(`react.element`),
            m = Symbol.for(`react.transitional.element`),
            h = Symbol.for(`react.portal`),
            g = Symbol.for(`react.fragment`),
            _ = Symbol.for(`react.strict_mode`),
            v = Symbol.for(`react.profiler`),
            y = Symbol.for(`react.consumer`),
            b = Symbol.for(`react.context`),
            x = Symbol.for(`react.forward_ref`),
            ee = Symbol.for(`react.suspense`),
            te = Symbol.for(`react.suspense_list`),
            S = Symbol.for(`react.memo`),
            ne = Symbol.for(`react.lazy`),
            re = Symbol.for(`react.activity`),
            C = Symbol.for(`react.memo_cache_sentinel`),
            ie = Symbol.iterator;

        function ae(e) {
            return typeof e != `object` || !e ? null : (e = ie && e[ie] || e[`@@iterator`], typeof e == `function` ? e : null)
        }
        var w = Symbol.for(`react.client.reference`);

        function oe(e) {
            if (e == null) return null;
            if (typeof e == `function`) return e.$$typeof === w ? null : e.displayName || e.name || null;
            if (typeof e == `string`) return e;
            switch (e) {
                case g:
                    return `Fragment`;
                case v:
                    return `Profiler`;
                case _:
                    return `StrictMode`;
                case ee:
                    return `Suspense`;
                case te:
                    return `SuspenseList`;
                case re:
                    return `Activity`
            }
            if (typeof e == `object`) switch (e.$$typeof) {
                case h:
                    return `Portal`;
                case b:
                    return e.displayName || `Context`;
                case y:
                    return (e._context.displayName || `Context`) + `.Consumer`;
                case x:
                    var t = e.render;
                    return e = e.displayName, e ||= (e = t.displayName || t.name || ``, e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`), e;
                case S:
                    return t = e.displayName || null, t === null ? oe(e.type) || `Memo` : t;
                case ne:
                    t = e._payload, e = e._init;
                    try {
                        return oe(e(t))
                    } catch {}
            }
            return null
        }
        var se = Array.isArray,
            T = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
            E = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
            le = {
                pending: !1,
                data: null,
                method: null,
                action: null
            },
            de = [],
            pe = -1;

        function me(e) {
            return {
                current: e
            }
        }

        function D(e) {
            0 > pe || (e.current = de[pe], de[pe] = null, pe--)
        }

        function O(e, t) {
            pe++, de[pe] = e.current, e.current = t
        }
        var he = me(null),
            ge = me(null),
            _e = me(null),
            ve = me(null);

        function ye(e, t) {
            switch (O(_e, t), O(ge, e), O(he, null), t.nodeType) {
                case 9:
                case 11:
                    e = (e = t.documentElement) && (e = e.namespaceURI) ? Hd(e) : 0;
                    break;
                default:
                    if (e = t.tagName, t = t.namespaceURI) t = Hd(t), e = Ud(t, e);
                    else switch (e) {
                        case `svg`:
                            e = 1;
                            break;
                        case `math`:
                            e = 2;
                            break;
                        default:
                            e = 0
                    }
            }
            D(he), O(he, e)
        }

        function be() {
            D(he), D(ge), D(_e)
        }

        function xe(e) {
            e.memoizedState !== null && O(ve, e);
            var t = he.current,
                n = Ud(t, e.type);
            t !== n && (O(ge, e), O(he, n))
        }

        function Se(e) {
            ge.current === e && (D(he), D(ge)), ve.current === e && (D(ve), $f._currentValue = le)
        }
        var Ce, we;

        function Te(e) {
            if (Ce === void 0) try {
                throw Error()
            } catch (e) {
                var t = e.stack.trim().match(/\n( *(at )?)/);
                Ce = t && t[1] || ``, we = -1 < e.stack.indexOf(`
    at`) ? ` (<anonymous>)` : -1 < e.stack.indexOf(`@`) ? `@unknown:0:0` : ``
            }
            return `
` + Ce + e + we
        }
        var Ee = !1;

        function De(e, t) {
            if (!e || Ee) return ``;
            Ee = !0;
            var n = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            try {
                var r = {
                    DetermineComponentFrameRoot: function() {
                        try {
                            if (t) {
                                var n = function() {
                                    throw Error()
                                };
                                if (Object.defineProperty(n.prototype, `props`, {
                                        set: function() {
                                            throw Error()
                                        }
                                    }), typeof Reflect == `object` && Reflect.construct) {
                                    try {
                                        Reflect.construct(n, [])
                                    } catch (e) {
                                        var r = e
                                    }
                                    Reflect.construct(e, [], n)
                                } else {
                                    try {
                                        n.call()
                                    } catch (e) {
                                        r = e
                                    }
                                    e.call(n.prototype)
                                }
                            } else {
                                try {
                                    throw Error()
                                } catch (e) {
                                    r = e
                                }(n = e()) && typeof n.catch == `function` && n.catch(function() {})
                            }
                        } catch (e) {
                            if (e && r && typeof e.stack == `string`) return [e.stack, r.stack]
                        }
                        return [null, null]
                    }
                };
                r.DetermineComponentFrameRoot.displayName = `DetermineComponentFrameRoot`;
                var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, `name`);
                i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, `name`, {
                    value: `DetermineComponentFrameRoot`
                });
                var a = r.DetermineComponentFrameRoot(),
                    o = a[0],
                    s = a[1];
                if (o && s) {
                    var c = o.split(`
`),
                        l = s.split(`
`);
                    for (i = r = 0; r < c.length && !c[r].includes(`DetermineComponentFrameRoot`);) r++;
                    for (; i < l.length && !l[i].includes(`DetermineComponentFrameRoot`);) i++;
                    if (r === c.length || i === l.length)
                        for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
                    for (; 1 <= r && 0 <= i; r--, i--)
                        if (c[r] !== l[i]) {
                            if (r !== 1 || i !== 1)
                                do
                                    if (r--, i--, 0 > i || c[r] !== l[i]) {
                                        var u = `
` + c[r].replace(` at new `, ` at `);
                                        return e.displayName && u.includes(`<anonymous>`) && (u = u.replace(`<anonymous>`, e.displayName)), u
                                    } while (1 <= r && 0 <= i);
                            break
                        }
                }
            } finally {
                Ee = !1, Error.prepareStackTrace = n
            }
            return (n = e ? e.displayName || e.name : ``) ? Te(n) : ``
        }

        function Oe(e, t) {
            switch (e.tag) {
                case 26:
                case 27:
                case 5:
                    return Te(e.type);
                case 16:
                    return Te(`Lazy`);
                case 13:
                    return e.child !== t && t !== null ? Te(`Suspense Fallback`) : Te(`Suspense`);
                case 19:
                    return Te(`SuspenseList`);
                case 0:
                case 15:
                    return De(e.type, !1);
                case 11:
                    return De(e.type.render, !1);
                case 1:
                    return De(e.type, !0);
                case 31:
                    return Te(`Activity`);
                default:
                    return ``
            }
        }

        function ke(e) {
            try {
                var t = ``,
                    n = null;
                do t += Oe(e, n), n = e, e = e.return; while (e);
                return t
            } catch (e) {
                return `
Error generating stack: ` + e.message + `
` + e.stack
            }
        }
        var Ae = Object.prototype.hasOwnProperty,
            je = t.unstable_scheduleCallback,
            Me = t.unstable_cancelCallback,
            k = t.unstable_shouldYield,
            Ne = t.unstable_requestPaint,
            Pe = t.unstable_now,
            Fe = t.unstable_getCurrentPriorityLevel,
            A = t.unstable_ImmediatePriority,
            Ie = t.unstable_UserBlockingPriority,
            j = t.unstable_NormalPriority,
            M = t.unstable_LowPriority,
            N = t.unstable_IdlePriority,
            P = t.log,
            Le = t.unstable_setDisableYieldValue,
            Re = null,
            ze = null;

        function Be(e) {
            if (typeof P == `function` && Le(e), ze && typeof ze.setStrictMode == `function`) try {
                ze.setStrictMode(Re, e)
            } catch {}
        }
        var Ve = Math.clz32 ? Math.clz32 : We,
            He = Math.log,
            Ue = Math.LN2;

        function We(e) {
            return e >>>= 0, e === 0 ? 32 : 31 - (He(e) / Ue | 0) | 0
        }
        var Ge = 256,
            Ke = 262144,
            qe = 4194304;

        function F(e) {
            var t = e & 42;
            if (t !== 0) return t;
            switch (e & -e) {
                case 1:
                    return 1;
                case 2:
                    return 2;
                case 4:
                    return 4;
                case 8:
                    return 8;
                case 16:
                    return 16;
                case 32:
                    return 32;
                case 64:
                    return 64;
                case 128:
                    return 128;
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                    return e & 261888;
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                    return e & 3932160;
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                    return e & 62914560;
                case 67108864:
                    return 67108864;
                case 134217728:
                    return 134217728;
                case 268435456:
                    return 268435456;
                case 536870912:
                    return 536870912;
                case 1073741824:
                    return 0;
                default:
                    return e
            }
        }

        function Je(e, t, n) {
            var r = e.pendingLanes;
            if (r === 0) return 0;
            var i = 0,
                a = e.suspendedLanes,
                o = e.pingedLanes;
            e = e.warmLanes;
            var s = r & 134217727;
            return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = F(n))) : i = F(o) : i = F(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = F(n))) : i = F(o)) : i = F(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i
        }

        function Ye(e, t) {
            return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
        }

        function Xe(e, t) {
            switch (e) {
                case 1:
                case 2:
                case 4:
                case 8:
                case 64:
                    return t + 250;
                case 16:
                case 32:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                    return t + 5e3;
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                    return -1;
                case 67108864:
                case 134217728:
                case 268435456:
                case 536870912:
                case 1073741824:
                    return -1;
                default:
                    return -1
            }
        }

        function Ze() {
            var e = qe;
            return qe <<= 1, !(qe & 62914560) && (qe = 4194304), e
        }

        function Qe(e) {
            for (var t = [], n = 0; 31 > n; n++) t.push(e);
            return t
        }

        function $e(e, t) {
            e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0)
        }

        function et(e, t, n, r, i, a) {
            var o = e.pendingLanes;
            e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
            var s = e.entanglements,
                c = e.expirationTimes,
                l = e.hiddenUpdates;
            for (n = o & ~n; 0 < n;) {
                var u = 31 - Ve(n),
                    d = 1 << u;
                s[u] = 0, c[u] = -1;
                var f = l[u];
                if (f !== null)
                    for (l[u] = null, u = 0; u < f.length; u++) {
                        var p = f[u];
                        p !== null && (p.lane &= -536870913)
                    }
                n &= ~d
            }
            r !== 0 && tt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t))
        }

        function tt(e, t, n) {
            e.pendingLanes |= t, e.suspendedLanes &= ~t;
            var r = 31 - Ve(t);
            e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930
        }

        function nt(e, t) {
            var n = e.entangledLanes |= t;
            for (e = e.entanglements; n;) {
                var r = 31 - Ve(n),
                    i = 1 << r;
                i & t | e[r] & t && (e[r] |= t), n &= ~i
            }
        }

        function rt(e, t) {
            var n = t & -t;
            return n = n & 42 ? 1 : I(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0
        }

        function I(e) {
            switch (e) {
                case 2:
                    e = 1;
                    break;
                case 8:
                    e = 4;
                    break;
                case 32:
                    e = 16;
                    break;
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                    e = 128;
                    break;
                case 268435456:
                    e = 134217728;
                    break;
                default:
                    e = 0
            }
            return e
        }

        function it(e) {
            return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2
        }

        function at() {
            var e = E.p;
            return e === 0 ? (e = window.event, e === void 0 ? 32 : hp(e.type)) : e
        }

        function ot(e, t) {
            var n = E.p;
            try {
                return E.p = e, t()
            } finally {
                E.p = n
            }
        }
        var st = Math.random().toString(36).slice(2),
            ct = `__reactFiber$` + st,
            lt = `__reactProps$` + st,
            ut = `__reactContainer$` + st,
            dt = `__reactEvents$` + st,
            ft = `__reactListeners$` + st,
            pt = `__reactHandles$` + st,
            mt = `__reactResources$` + st,
            ht = `__reactMarker$` + st;

        function L(e) {
            delete e[ct], delete e[lt], delete e[dt], delete e[ft], delete e[pt]
        }

        function gt(e) {
            var t = e[ct];
            if (t) return t;
            for (var n = e.parentNode; n;) {
                if (t = n[ut] || n[ct]) {
                    if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
                        for (e = ff(e); e !== null;) {
                            if (n = e[ct]) return n;
                            e = ff(e)
                        }
                    return t
                }
                e = n, n = e.parentNode
            }
            return null
        }

        function _t(e) {
            if (e = e[ct] || e[ut]) {
                var t = e.tag;
                if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e
            }
            return null
        }

        function vt(e) {
            var t = e.tag;
            if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
            throw Error(i(33))
        }

        function yt(e) {
            var t = e[mt];
            return t ||= e[mt] = {
                hoistableStyles: new Map,
                hoistableScripts: new Map
            }, t
        }

        function bt(e) {
            e[ht] = !0
        }
        var xt = new Set,
            St = {};

        function Ct(e, t) {
            wt(e, t), wt(e + `Capture`, t)
        }

        function wt(e, t) {
            for (St[e] = t, e = 0; e < t.length; e++) xt.add(t[e])
        }
        var R = RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),
            Tt = {},
            Et = {};

        function Dt(e) {
            return Ae.call(Et, e) ? !0 : Ae.call(Tt, e) ? !1 : R.test(e) ? Et[e] = !0 : (Tt[e] = !0, !1)
        }

        function Ot(e, t, n) {
            if (Dt(t))
                if (n === null) e.removeAttribute(t);
                else {
                    switch (typeof n) {
                        case `undefined`:
                        case `function`:
                        case `symbol`:
                            e.removeAttribute(t);
                            return;
                        case `boolean`:
                            var r = t.toLowerCase().slice(0, 5);
                            if (r !== `data-` && r !== `aria-`) {
                                e.removeAttribute(t);
                                return
                            }
                    }
                    e.setAttribute(t, `` + n)
                }
        }

        function kt(e, t, n) {
            if (n === null) e.removeAttribute(t);
            else {
                switch (typeof n) {
                    case `undefined`:
                    case `function`:
                    case `symbol`:
                    case `boolean`:
                        e.removeAttribute(t);
                        return
                }
                e.setAttribute(t, `` + n)
            }
        }

        function At(e, t, n, r) {
            if (r === null) e.removeAttribute(n);
            else {
                switch (typeof r) {
                    case `undefined`:
                    case `function`:
                    case `symbol`:
                    case `boolean`:
                        e.removeAttribute(n);
                        return
                }
                e.setAttributeNS(t, n, `` + r)
            }
        }

        function jt(e) {
            switch (typeof e) {
                case `bigint`:
                case `boolean`:
                case `number`:
                case `string`:
                case `undefined`:
                    return e;
                case `object`:
                    return e;
                default:
                    return ``
            }
        }

        function Mt(e) {
            var t = e.type;
            return (e = e.nodeName) && e.toLowerCase() === `input` && (t === `checkbox` || t === `radio`)
        }

        function Nt(e, t, n) {
            var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
            if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == `function` && typeof r.set == `function`) {
                var i = r.get,
                    a = r.set;
                return Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function() {
                        return i.call(this)
                    },
                    set: function(e) {
                        n = `` + e, a.call(this, e)
                    }
                }), Object.defineProperty(e, t, {
                    enumerable: r.enumerable
                }), {
                    getValue: function() {
                        return n
                    },
                    setValue: function(e) {
                        n = `` + e
                    },
                    stopTracking: function() {
                        e._valueTracker = null, delete e[t]
                    }
                }
            }
        }

        function Pt(e) {
            if (!e._valueTracker) {
                var t = Mt(e) ? `checked` : `value`;
                e._valueTracker = Nt(e, t, `` + e[t])
            }
        }

        function Ft(e) {
            if (!e) return !1;
            var t = e._valueTracker;
            if (!t) return !0;
            var n = t.getValue(),
                r = ``;
            return e && (r = Mt(e) ? e.checked ? `true` : `false` : e.value), e = r, e === n ? !1 : (t.setValue(e), !0)
        }

        function It(e) {
            if (e ||= typeof document < `u` ? document : void 0, e === void 0) return null;
            try {
                return e.activeElement || e.body
            } catch {
                return e.body
            }
        }
        var Lt = /[\n"\\]/g;

        function Rt(e) {
            return e.replace(Lt, function(e) {
                return `\\` + e.charCodeAt(0).toString(16) + ` `
            })
        }

        function zt(e, t, n, r, i, a, o, s) {
            e.name = ``, o != null && typeof o != `function` && typeof o != `symbol` && typeof o != `boolean` ? e.type = o : e.removeAttribute(`type`), t == null ? o !== `submit` && o !== `reset` || e.removeAttribute(`value`) : o === `number` ? (t === 0 && e.value === `` || e.value != t) && (e.value = `` + jt(t)) : e.value !== `` + jt(t) && (e.value = `` + jt(t)), t == null ? n == null ? r != null && e.removeAttribute(`value`) : z(e, o, jt(n)) : z(e, o, jt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != `function` && typeof i != `symbol`), s != null && typeof s != `function` && typeof s != `symbol` && typeof s != `boolean` ? e.name = `` + jt(s) : e.removeAttribute(`name`)
        }

        function Bt(e, t, n, r, i, a, o, s) {
            if (a != null && typeof a != `function` && typeof a != `symbol` && typeof a != `boolean` && (e.type = a), t != null || n != null) {
                if (!(a !== `submit` && a !== `reset` || t != null)) {
                    Pt(e);
                    return
                }
                n = n == null ? `` : `` + jt(n), t = t == null ? n : `` + jt(t), s || t === e.value || (e.value = t), e.defaultValue = t
            }
            r ??= i, r = typeof r != `function` && typeof r != `symbol` && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != `function` && typeof o != `symbol` && typeof o != `boolean` && (e.name = o), Pt(e)
        }

        function z(e, t, n) {
            t === `number` && It(e.ownerDocument) === e || e.defaultValue === `` + n || (e.defaultValue = `` + n)
        }

        function Vt(e, t, n, r) {
            if (e = e.options, t) {
                t = {};
                for (var i = 0; i < n.length; i++) t[`$` + n[i]] = !0;
                for (n = 0; n < e.length; n++) i = t.hasOwnProperty(`$` + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0)
            } else {
                for (n = `` + jt(n), t = null, i = 0; i < e.length; i++) {
                    if (e[i].value === n) {
                        e[i].selected = !0, r && (e[i].defaultSelected = !0);
                        return
                    }
                    t !== null || e[i].disabled || (t = e[i])
                }
                t !== null && (t.selected = !0)
            }
        }

        function Ht(e, t, n) {
            if (t != null && (t = `` + jt(t), t !== e.value && (e.value = t), n == null)) {
                e.defaultValue !== t && (e.defaultValue = t);
                return
            }
            e.defaultValue = n == null ? `` : `` + jt(n)
        }

        function Ut(e, t, n, r) {
            if (t == null) {
                if (r != null) {
                    if (n != null) throw Error(i(92));
                    if (se(r)) {
                        if (1 < r.length) throw Error(i(93));
                        r = r[0]
                    }
                    n = r
                }
                n ??= ``, t = n
            }
            n = jt(t), e.defaultValue = n, r = e.textContent, r === n && r !== `` && r !== null && (e.value = r), Pt(e)
        }

        function Wt(e, t) {
            if (t) {
                var n = e.firstChild;
                if (n && n === e.lastChild && n.nodeType === 3) {
                    n.nodeValue = t;
                    return
                }
            }
            e.textContent = t
        }
        var Gt = new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));

        function Kt(e, t, n) {
            var r = t.indexOf(`--`) === 0;
            n == null || typeof n == `boolean` || n === `` ? r ? e.setProperty(t, ``) : t === `float` ? e.cssFloat = `` : e[t] = `` : r ? e.setProperty(t, n) : typeof n != `number` || n === 0 || Gt.has(t) ? t === `float` ? e.cssFloat = n : e[t] = (`` + n).trim() : e[t] = n + `px`
        }

        function qt(e, t, n) {
            if (t != null && typeof t != `object`) throw Error(i(62));
            if (e = e.style, n != null) {
                for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf(`--`) === 0 ? e.setProperty(r, ``) : r === `float` ? e.cssFloat = `` : e[r] = ``);
                for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Kt(e, a, r)
            } else
                for (var o in t) t.hasOwnProperty(o) && Kt(e, o, t[o])
        }

        function Jt(e) {
            if (e.indexOf(`-`) === -1) return !1;
            switch (e) {
                case `annotation-xml`:
                case `color-profile`:
                case `font-face`:
                case `font-face-src`:
                case `font-face-uri`:
                case `font-face-format`:
                case `font-face-name`:
                case `missing-glyph`:
                    return !1;
                default:
                    return !0
            }
        }
        var Yt = new Map([
                [`acceptCharset`, `accept-charset`],
                [`htmlFor`, `for`],
                [`httpEquiv`, `http-equiv`],
                [`crossOrigin`, `crossorigin`],
                [`accentHeight`, `accent-height`],
                [`alignmentBaseline`, `alignment-baseline`],
                [`arabicForm`, `arabic-form`],
                [`baselineShift`, `baseline-shift`],
                [`capHeight`, `cap-height`],
                [`clipPath`, `clip-path`],
                [`clipRule`, `clip-rule`],
                [`colorInterpolation`, `color-interpolation`],
                [`colorInterpolationFilters`, `color-interpolation-filters`],
                [`colorProfile`, `color-profile`],
                [`colorRendering`, `color-rendering`],
                [`dominantBaseline`, `dominant-baseline`],
                [`enableBackground`, `enable-background`],
                [`fillOpacity`, `fill-opacity`],
                [`fillRule`, `fill-rule`],
                [`floodColor`, `flood-color`],
                [`floodOpacity`, `flood-opacity`],
                [`fontFamily`, `font-family`],
                [`fontSize`, `font-size`],
                [`fontSizeAdjust`, `font-size-adjust`],
                [`fontStretch`, `font-stretch`],
                [`fontStyle`, `font-style`],
                [`fontVariant`, `font-variant`],
                [`fontWeight`, `font-weight`],
                [`glyphName`, `glyph-name`],
                [`glyphOrientationHorizontal`, `glyph-orientation-horizontal`],
                [`glyphOrientationVertical`, `glyph-orientation-vertical`],
                [`horizAdvX`, `horiz-adv-x`],
                [`horizOriginX`, `horiz-origin-x`],
                [`imageRendering`, `image-rendering`],
                [`letterSpacing`, `letter-spacing`],
                [`lightingColor`, `lighting-color`],
                [`markerEnd`, `marker-end`],
                [`markerMid`, `marker-mid`],
                [`markerStart`, `marker-start`],
                [`overlinePosition`, `overline-position`],
                [`overlineThickness`, `overline-thickness`],
                [`paintOrder`, `paint-order`],
                [`panose-1`, `panose-1`],
                [`pointerEvents`, `pointer-events`],
                [`renderingIntent`, `rendering-intent`],
                [`shapeRendering`, `shape-rendering`],
                [`stopColor`, `stop-color`],
                [`stopOpacity`, `stop-opacity`],
                [`strikethroughPosition`, `strikethrough-position`],
                [`strikethroughThickness`, `strikethrough-thickness`],
                [`strokeDasharray`, `stroke-dasharray`],
                [`strokeDashoffset`, `stroke-dashoffset`],
                [`strokeLinecap`, `stroke-linecap`],
                [`strokeLinejoin`, `stroke-linejoin`],
                [`strokeMiterlimit`, `stroke-miterlimit`],
                [`strokeOpacity`, `stroke-opacity`],
                [`strokeWidth`, `stroke-width`],
                [`textAnchor`, `text-anchor`],
                [`textDecoration`, `text-decoration`],
                [`textRendering`, `text-rendering`],
                [`transformOrigin`, `transform-origin`],
                [`underlinePosition`, `underline-position`],
                [`underlineThickness`, `underline-thickness`],
                [`unicodeBidi`, `unicode-bidi`],
                [`unicodeRange`, `unicode-range`],
                [`unitsPerEm`, `units-per-em`],
                [`vAlphabetic`, `v-alphabetic`],
                [`vHanging`, `v-hanging`],
                [`vIdeographic`, `v-ideographic`],
                [`vMathematical`, `v-mathematical`],
                [`vectorEffect`, `vector-effect`],
                [`vertAdvY`, `vert-adv-y`],
                [`vertOriginX`, `vert-origin-x`],
                [`vertOriginY`, `vert-origin-y`],
                [`wordSpacing`, `word-spacing`],
                [`writingMode`, `writing-mode`],
                [`xmlnsXlink`, `xmlns:xlink`],
                [`xHeight`, `x-height`]
            ]),
            Xt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;

        function Zt(e) {
            return Xt.test(`` + e) ? `javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')` : e
        }

        function Qt() {}
        var $t = null;

        function en(e) {
            return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
        }
        var tn = null,
            nn = null;

        function rn(e) {
            var t = _t(e);
            if (t && (e = t.stateNode)) {
                var n = e[lt] || null;
                a: switch (e = t.stateNode, t.type) {
                    case `input`:
                        if (zt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === `radio` && t != null) {
                            for (n = e; n.parentNode;) n = n.parentNode;
                            for (n = n.querySelectorAll(`input[name="` + Rt(`` + t) + `"][type="radio"]`), t = 0; t < n.length; t++) {
                                var r = n[t];
                                if (r !== e && r.form === e.form) {
                                    var a = r[lt] || null;
                                    if (!a) throw Error(i(90));
                                    zt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name)
                                }
                            }
                            for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Ft(r)
                        }
                        break a;
                    case `textarea`:
                        Ht(e, n.value, n.defaultValue);
                        break a;
                    case `select`:
                        t = n.value, t != null && Vt(e, !!n.multiple, t, !1)
                }
            }
        }
        var an = !1;

        function on(e, t, n) {
            if (an) return e(t, n);
            an = !0;
            try {
                return e(t)
            } finally {
                if (an = !1, (tn !== null || nn !== null) && (bu(), tn && (t = tn, e = nn, nn = tn = null, rn(t), e)))
                    for (t = 0; t < e.length; t++) rn(e[t])
            }
        }

        function sn(e, t) {
            var n = e.stateNode;
            if (n === null) return null;
            var r = n[lt] || null;
            if (r === null) return null;
            n = r[t];
            a: switch (t) {
                case `onClick`:
                case `onClickCapture`:
                case `onDoubleClick`:
                case `onDoubleClickCapture`:
                case `onMouseDown`:
                case `onMouseDownCapture`:
                case `onMouseMove`:
                case `onMouseMoveCapture`:
                case `onMouseUp`:
                case `onMouseUpCapture`:
                case `onMouseEnter`:
                    (r = !r.disabled) || (e = e.type, r = !(e === `button` || e === `input` || e === `select` || e === `textarea`)), e = !r;
                    break a;
                default:
                    e = !1
            }
            if (e) return null;
            if (n && typeof n != `function`) throw Error(i(231, t, typeof n));
            return n
        }
        var cn = !(typeof window > `u` || window.document === void 0 || window.document.createElement === void 0),
            ln = !1;
        if (cn) try {
            var un = {};
            Object.defineProperty(un, `passive`, {
                get: function() {
                    ln = !0
                }
            }), window.addEventListener(`test`, un, un), window.removeEventListener(`test`, un, un)
        } catch {
            ln = !1
        }
        var dn = null,
            fn = null,
            pn = null;

        function mn() {
            if (pn) return pn;
            var e, t = fn,
                n = t.length,
                r, i = `value` in dn ? dn.value : dn.textContent,
                a = i.length;
            for (e = 0; e < n && t[e] === i[e]; e++);
            var o = n - e;
            for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
            return pn = i.slice(e, 1 < r ? 1 - r : void 0)
        }

        function hn(e) {
            var t = e.keyCode;
            return `charCode` in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
        }

        function gn() {
            return !0
        }

        function _n() {
            return !1
        }

        function vn(e) {
            function t(t, n, r, i, a) {
                for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
                return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? gn : _n, this.isPropagationStopped = _n, this
            }
            return f(t.prototype, {
                preventDefault: function() {
                    this.defaultPrevented = !0;
                    var e = this.nativeEvent;
                    e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != `unknown` && (e.returnValue = !1), this.isDefaultPrevented = gn)
                },
                stopPropagation: function() {
                    var e = this.nativeEvent;
                    e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != `unknown` && (e.cancelBubble = !0), this.isPropagationStopped = gn)
                },
                persist: function() {},
                isPersistent: gn
            }), t
        }
        var yn = {
                eventPhase: 0,
                bubbles: 0,
                cancelable: 0,
                timeStamp: function(e) {
                    return e.timeStamp || Date.now()
                },
                defaultPrevented: 0,
                isTrusted: 0
            },
            bn = vn(yn),
            xn = f({}, yn, {
                view: 0,
                detail: 0
            }),
            Sn = vn(xn),
            Cn, wn, Tn, En = f({}, xn, {
                screenX: 0,
                screenY: 0,
                clientX: 0,
                clientY: 0,
                pageX: 0,
                pageY: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                getModifierState: Ln,
                button: 0,
                buttons: 0,
                relatedTarget: function(e) {
                    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
                },
                movementX: function(e) {
                    return `movementX` in e ? e.movementX : (e !== Tn && (Tn && e.type === `mousemove` ? (Cn = e.screenX - Tn.screenX, wn = e.screenY - Tn.screenY) : wn = Cn = 0, Tn = e), Cn)
                },
                movementY: function(e) {
                    return `movementY` in e ? e.movementY : wn
                }
            }),
            Dn = vn(En),
            On = vn(f({}, En, {
                dataTransfer: 0
            })),
            kn = vn(f({}, xn, {
                relatedTarget: 0
            })),
            An = vn(f({}, yn, {
                animationName: 0,
                elapsedTime: 0,
                pseudoElement: 0
            })),
            jn = vn(f({}, yn, {
                clipboardData: function(e) {
                    return `clipboardData` in e ? e.clipboardData : window.clipboardData
                }
            })),
            Mn = vn(f({}, yn, {
                data: 0
            })),
            Nn = {
                Esc: `Escape`,
                Spacebar: ` `,
                Left: `ArrowLeft`,
                Up: `ArrowUp`,
                Right: `ArrowRight`,
                Down: `ArrowDown`,
                Del: `Delete`,
                Win: `OS`,
                Menu: `ContextMenu`,
                Apps: `ContextMenu`,
                Scroll: `ScrollLock`,
                MozPrintableKey: `Unidentified`
            },
            Pn = {
                8: `Backspace`,
                9: `Tab`,
                12: `Clear`,
                13: `Enter`,
                16: `Shift`,
                17: `Control`,
                18: `Alt`,
                19: `Pause`,
                20: `CapsLock`,
                27: `Escape`,
                32: ` `,
                33: `PageUp`,
                34: `PageDown`,
                35: `End`,
                36: `Home`,
                37: `ArrowLeft`,
                38: `ArrowUp`,
                39: `ArrowRight`,
                40: `ArrowDown`,
                45: `Insert`,
                46: `Delete`,
                112: `F1`,
                113: `F2`,
                114: `F3`,
                115: `F4`,
                116: `F5`,
                117: `F6`,
                118: `F7`,
                119: `F8`,
                120: `F9`,
                121: `F10`,
                122: `F11`,
                123: `F12`,
                144: `NumLock`,
                145: `ScrollLock`,
                224: `Meta`
            },
            Fn = {
                Alt: `altKey`,
                Control: `ctrlKey`,
                Meta: `metaKey`,
                Shift: `shiftKey`
            };

        function In(e) {
            var t = this.nativeEvent;
            return t.getModifierState ? t.getModifierState(e) : (e = Fn[e]) ? !!t[e] : !1
        }

        function Ln() {
            return In
        }
        var Rn = vn(f({}, xn, {
                key: function(e) {
                    if (e.key) {
                        var t = Nn[e.key] || e.key;
                        if (t !== `Unidentified`) return t
                    }
                    return e.type === `keypress` ? (e = hn(e), e === 13 ? `Enter` : String.fromCharCode(e)) : e.type === `keydown` || e.type === `keyup` ? Pn[e.keyCode] || `Unidentified` : ``
                },
                code: 0,
                location: 0,
                ctrlKey: 0,
                shiftKey: 0,
                altKey: 0,
                metaKey: 0,
                repeat: 0,
                locale: 0,
                getModifierState: Ln,
                charCode: function(e) {
                    return e.type === `keypress` ? hn(e) : 0
                },
                keyCode: function(e) {
                    return e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0
                },
                which: function(e) {
                    return e.type === `keypress` ? hn(e) : e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0
                }
            })),
            zn = vn(f({}, En, {
                pointerId: 0,
                width: 0,
                height: 0,
                pressure: 0,
                tangentialPressure: 0,
                tiltX: 0,
                tiltY: 0,
                twist: 0,
                pointerType: 0,
                isPrimary: 0
            })),
            Bn = vn(f({}, xn, {
                touches: 0,
                targetTouches: 0,
                changedTouches: 0,
                altKey: 0,
                metaKey: 0,
                ctrlKey: 0,
                shiftKey: 0,
                getModifierState: Ln
            })),
            Vn = vn(f({}, yn, {
                propertyName: 0,
                elapsedTime: 0,
                pseudoElement: 0
            })),
            Hn = vn(f({}, En, {
                deltaX: function(e) {
                    return `deltaX` in e ? e.deltaX : `wheelDeltaX` in e ? -e.wheelDeltaX : 0
                },
                deltaY: function(e) {
                    return `deltaY` in e ? e.deltaY : `wheelDeltaY` in e ? -e.wheelDeltaY : `wheelDelta` in e ? -e.wheelDelta : 0
                },
                deltaZ: 0,
                deltaMode: 0
            })),
            Un = vn(f({}, yn, {
                newState: 0,
                oldState: 0
            })),
            Wn = [9, 13, 27, 32],
            Gn = cn && `CompositionEvent` in window,
            Kn = null;
        cn && `documentMode` in document && (Kn = document.documentMode);
        var qn = cn && `TextEvent` in window && !Kn,
            Jn = cn && (!Gn || Kn && 8 < Kn && 11 >= Kn),
            Yn = ` `,
            Xn = !1;

        function Zn(e, t) {
            switch (e) {
                case `keyup`:
                    return Wn.indexOf(t.keyCode) !== -1;
                case `keydown`:
                    return t.keyCode !== 229;
                case `keypress`:
                case `mousedown`:
                case `focusout`:
                    return !0;
                default:
                    return !1
            }
        }

        function Qn(e) {
            return e = e.detail, typeof e == `object` && `data` in e ? e.data : null
        }
        var $n = !1;

        function er(e, t) {
            switch (e) {
                case `compositionend`:
                    return Qn(t);
                case `keypress`:
                    return t.which === 32 ? (Xn = !0, Yn) : null;
                case `textInput`:
                    return e = t.data, e === Yn && Xn ? null : e;
                default:
                    return null
            }
        }

        function tr(e, t) {
            if ($n) return e === `compositionend` || !Gn && Zn(e, t) ? (e = mn(), pn = fn = dn = null, $n = !1, e) : null;
            switch (e) {
                case `paste`:
                    return null;
                case `keypress`:
                    if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                        if (t.char && 1 < t.char.length) return t.char;
                        if (t.which) return String.fromCharCode(t.which)
                    }
                    return null;
                case `compositionend`:
                    return Jn && t.locale !== `ko` ? null : t.data;
                default:
                    return null
            }
        }
        var nr = {
            color: !0,
            date: !0,
            datetime: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            password: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0
        };

        function rr(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return t === `input` ? !!nr[e.type] : t === `textarea`
        }

        function ir(e, t, n, r) {
            tn ? nn ? nn.push(r) : nn = [r] : tn = r, t = Ed(t, `onChange`), 0 < t.length && (n = new bn(`onChange`, `change`, null, n, r), e.push({
                event: n,
                listeners: t
            }))
        }
        var ar = null,
            or = null;

        function sr(e) {
            yd(e, 0)
        }

        function cr(e) {
            if (Ft(vt(e))) return e
        }

        function lr(e, t) {
            if (e === `change`) return t
        }
        var ur = !1;
        if (cn) {
            var dr;
            if (cn) {
                var fr = `oninput` in document;
                if (!fr) {
                    var pr = document.createElement(`div`);
                    pr.setAttribute(`oninput`, `return;`), fr = typeof pr.oninput == `function`
                }
                dr = fr
            } else dr = !1;
            ur = dr && (!document.documentMode || 9 < document.documentMode)
        }

        function mr() {
            ar && (ar.detachEvent(`onpropertychange`, hr), or = ar = null)
        }

        function hr(e) {
            if (e.propertyName === `value` && cr(or)) {
                var t = [];
                ir(t, or, e, en(e)), on(sr, t)
            }
        }

        function gr(e, t, n) {
            e === `focusin` ? (mr(), ar = t, or = n, ar.attachEvent(`onpropertychange`, hr)) : e === `focusout` && mr()
        }

        function _r(e) {
            if (e === `selectionchange` || e === `keyup` || e === `keydown`) return cr(or)
        }

        function vr(e, t) {
            if (e === `click`) return cr(t)
        }

        function yr(e, t) {
            if (e === `input` || e === `change`) return cr(t)
        }

        function br(e, t) {
            return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t
        }
        var xr = typeof Object.is == `function` ? Object.is : br;

        function Sr(e, t) {
            if (xr(e, t)) return !0;
            if (typeof e != `object` || !e || typeof t != `object` || !t) return !1;
            var n = Object.keys(e),
                r = Object.keys(t);
            if (n.length !== r.length) return !1;
            for (r = 0; r < n.length; r++) {
                var i = n[r];
                if (!Ae.call(t, i) || !xr(e[i], t[i])) return !1
            }
            return !0
        }

        function Cr(e) {
            for (; e && e.firstChild;) e = e.firstChild;
            return e
        }

        function wr(e, t) {
            var n = Cr(e);
            e = 0;
            for (var r; n;) {
                if (n.nodeType === 3) {
                    if (r = e + n.textContent.length, e <= t && r >= t) return {
                        node: n,
                        offset: t - e
                    };
                    e = r
                }
                a: {
                    for (; n;) {
                        if (n.nextSibling) {
                            n = n.nextSibling;
                            break a
                        }
                        n = n.parentNode
                    }
                    n = void 0
                }
                n = Cr(n)
            }
        }

        function Tr(e, t) {
            return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Tr(e, t.parentNode) : `contains` in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
        }

        function Er(e) {
            e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
            for (var t = It(e.document); t instanceof e.HTMLIFrameElement;) {
                try {
                    var n = typeof t.contentWindow.location.href == `string`
                } catch {
                    n = !1
                }
                if (n) e = t.contentWindow;
                else break;
                t = It(e.document)
            }
            return t
        }

        function Dr(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return t && (t === `input` && (e.type === `text` || e.type === `search` || e.type === `tel` || e.type === `url` || e.type === `password`) || t === `textarea` || e.contentEditable === `true`)
        }
        var Or = cn && `documentMode` in document && 11 >= document.documentMode,
            kr = null,
            Ar = null,
            jr = null,
            Mr = !1;

        function Nr(e, t, n) {
            var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
            Mr || kr == null || kr !== It(r) || (r = kr, `selectionStart` in r && Dr(r) ? r = {
                start: r.selectionStart,
                end: r.selectionEnd
            } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
                anchorNode: r.anchorNode,
                anchorOffset: r.anchorOffset,
                focusNode: r.focusNode,
                focusOffset: r.focusOffset
            }), jr && Sr(jr, r) || (jr = r, r = Ed(Ar, `onSelect`), 0 < r.length && (t = new bn(`onSelect`, `select`, null, t, n), e.push({
                event: t,
                listeners: r
            }), t.target = kr)))
        }

        function B(e, t) {
            var n = {};
            return n[e.toLowerCase()] = t.toLowerCase(), n[`Webkit` + e] = `webkit` + t, n[`Moz` + e] = `moz` + t, n
        }
        var Pr = {
                animationend: B(`Animation`, `AnimationEnd`),
                animationiteration: B(`Animation`, `AnimationIteration`),
                animationstart: B(`Animation`, `AnimationStart`),
                transitionrun: B(`Transition`, `TransitionRun`),
                transitionstart: B(`Transition`, `TransitionStart`),
                transitioncancel: B(`Transition`, `TransitionCancel`),
                transitionend: B(`Transition`, `TransitionEnd`)
            },
            Fr = {},
            Ir = {};
        cn && (Ir = document.createElement(`div`).style, `AnimationEvent` in window || (delete Pr.animationend.animation, delete Pr.animationiteration.animation, delete Pr.animationstart.animation), `TransitionEvent` in window || delete Pr.transitionend.transition);

        function Lr(e) {
            if (Fr[e]) return Fr[e];
            if (!Pr[e]) return e;
            var t = Pr[e],
                n;
            for (n in t)
                if (t.hasOwnProperty(n) && n in Ir) return Fr[e] = t[n];
            return e
        }
        var Rr = Lr(`animationend`),
            zr = Lr(`animationiteration`),
            Br = Lr(`animationstart`),
            Vr = Lr(`transitionrun`),
            Hr = Lr(`transitionstart`),
            Ur = Lr(`transitioncancel`),
            Wr = Lr(`transitionend`),
            Gr = new Map,
            Kr = `abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);
        Kr.push(`scrollEnd`);

        function qr(e, t) {
            Gr.set(e, t), Ct(t, [e])
        }
        var Jr = typeof reportError == `function` ? reportError : function(e) {
                if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
                    var t = new window.ErrorEvent(`error`, {
                        bubbles: !0,
                        cancelable: !0,
                        message: typeof e == `object` && e && typeof e.message == `string` ? String(e.message) : String(e),
                        error: e
                    });
                    if (!window.dispatchEvent(t)) return
                } else if (typeof process == `object` && typeof process.emit == `function`) {
                    process.emit(`uncaughtException`, e);
                    return
                }
                console.error(e)
            },
            Yr = [],
            Xr = 0,
            Zr = 0;

        function Qr() {
            for (var e = Xr, t = Zr = Xr = 0; t < e;) {
                var n = Yr[t];
                Yr[t++] = null;
                var r = Yr[t];
                Yr[t++] = null;
                var i = Yr[t];
                Yr[t++] = null;
                var a = Yr[t];
                if (Yr[t++] = null, r !== null && i !== null) {
                    var o = r.pending;
                    o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i
                }
                a !== 0 && ni(n, i, a)
            }
        }

        function $r(e, t, n, r) {
            Yr[Xr++] = e, Yr[Xr++] = t, Yr[Xr++] = n, Yr[Xr++] = r, Zr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r)
        }

        function ei(e, t, n, r) {
            return $r(e, t, n, r), ri(e)
        }

        function ti(e, t) {
            return $r(e, null, null, t), ri(e)
        }

        function ni(e, t, n) {
            e.lanes |= n;
            var r = e.alternate;
            r !== null && (r.lanes |= n);
            for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
            return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ve(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null
        }

        function ri(e) {
            if (50 < du) throw du = 0, fu = null, Error(i(185));
            for (var t = e.return; t !== null;) e = t, t = e.return;
            return e.tag === 3 ? e.stateNode : null
        }
        var ii = {};

        function ai(e, t, n, r) {
            this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
        }

        function oi(e, t, n, r) {
            return new ai(e, t, n, r)
        }

        function si(e) {
            return e = e.prototype, !(!e || !e.isReactComponent)
        }

        function ci(e, t) {
            var n = e.alternate;
            return n === null ? (n = oi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
                lanes: t.lanes,
                firstContext: t.firstContext
            }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n
        }

        function li(e, t) {
            e.flags &= 65011714;
            var n = e.alternate;
            return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
                lanes: t.lanes,
                firstContext: t.firstContext
            }), e
        }

        function ui(e, t, n, r, a, o) {
            var s = 0;
            if (r = e, typeof e == `function`) si(e) && (s = 1);
            else if (typeof e == `string`) s = Wf(e, n, he.current) ? 26 : e === `html` || e === `head` || e === `body` ? 27 : 5;
            else a: switch (e) {
                case re:
                    return e = oi(31, n, t, a), e.elementType = re, e.lanes = o, e;
                case g:
                    return di(n.children, a, o, t);
                case _:
                    s = 8, a |= 24;
                    break;
                case v:
                    return e = oi(12, n, t, a | 2), e.elementType = v, e.lanes = o, e;
                case ee:
                    return e = oi(13, n, t, a), e.elementType = ee, e.lanes = o, e;
                case te:
                    return e = oi(19, n, t, a), e.elementType = te, e.lanes = o, e;
                default:
                    if (typeof e == `object` && e) switch (e.$$typeof) {
                        case b:
                            s = 10;
                            break a;
                        case y:
                            s = 9;
                            break a;
                        case x:
                            s = 11;
                            break a;
                        case S:
                            s = 14;
                            break a;
                        case ne:
                            s = 16, r = null;
                            break a
                    }
                    s = 29, n = Error(i(130, e === null ? `null` : typeof e, ``)), r = null
            }
            return t = oi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t
        }

        function di(e, t, n, r) {
            return e = oi(7, e, r, t), e.lanes = n, e
        }

        function fi(e, t, n) {
            return e = oi(6, e, null, t), e.lanes = n, e
        }

        function pi(e) {
            var t = oi(18, null, null, 0);
            return t.stateNode = e, t
        }

        function mi(e, t, n) {
            return t = oi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
                containerInfo: e.containerInfo,
                pendingChildren: null,
                implementation: e.implementation
            }, t
        }
        var hi = new WeakMap;

        function gi(e, t) {
            if (typeof e == `object` && e) {
                var n = hi.get(e);
                return n === void 0 ? (t = {
                    value: e,
                    source: t,
                    stack: ke(t)
                }, hi.set(e, t), t) : n
            }
            return {
                value: e,
                source: t,
                stack: ke(t)
            }
        }
        var _i = [],
            vi = 0,
            V = null,
            yi = 0,
            bi = [],
            xi = 0,
            Si = null,
            Ci = 1,
            wi = ``;

        function Ti(e, t) {
            _i[vi++] = yi, _i[vi++] = V, V = e, yi = t
        }

        function Ei(e, t, n) {
            bi[xi++] = Ci, bi[xi++] = wi, bi[xi++] = Si, Si = e;
            var r = Ci;
            e = wi;
            var i = 32 - Ve(r) - 1;
            r &= ~(1 << i), n += 1;
            var a = 32 - Ve(t) + i;
            if (30 < a) {
                var o = i - i % 5;
                a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ci = 1 << 32 - Ve(t) + i | n << i | r, wi = a + e
            } else Ci = 1 << a | n << i | r, wi = e
        }

        function Di(e) {
            e.return !== null && (Ti(e, 1), Ei(e, 1, 0))
        }

        function Oi(e) {
            for (; e === V;) V = _i[--vi], _i[vi] = null, yi = _i[--vi], _i[vi] = null;
            for (; e === Si;) Si = bi[--xi], bi[xi] = null, wi = bi[--xi], bi[xi] = null, Ci = bi[--xi], bi[xi] = null
        }

        function ki(e, t) {
            bi[xi++] = Ci, bi[xi++] = wi, bi[xi++] = Si, Ci = t.id, wi = t.overflow, Si = e
        }
        var Ai = null,
            ji = null,
            H = !1,
            Mi = null,
            Ni = !1,
            Pi = Error(i(519));

        function Fi(e) {
            throw Vi(gi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? `text` : `HTML`, ``)), e)), Pi
        }

        function Ii(e) {
            var t = e.stateNode,
                n = e.type,
                r = e.memoizedProps;
            switch (t[ct] = e, t[lt] = r, n) {
                case `dialog`:
                    Q(`cancel`, t), Q(`close`, t);
                    break;
                case `iframe`:
                case `object`:
                case `embed`:
                    Q(`load`, t);
                    break;
                case `video`:
                case `audio`:
                    for (n = 0; n < _d.length; n++) Q(_d[n], t);
                    break;
                case `source`:
                    Q(`error`, t);
                    break;
                case `img`:
                case `image`:
                case `link`:
                    Q(`error`, t), Q(`load`, t);
                    break;
                case `details`:
                    Q(`toggle`, t);
                    break;
                case `input`:
                    Q(`invalid`, t), Bt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
                    break;
                case `select`:
                    Q(`invalid`, t);
                    break;
                case `textarea`:
                    Q(`invalid`, t), Ut(t, r.value, r.defaultValue, r.children)
            }
            n = r.children, typeof n != `string` && typeof n != `number` && typeof n != `bigint` || t.textContent === `` + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q(`beforetoggle`, t), Q(`toggle`, t)), r.onScroll != null && Q(`scroll`, t), r.onScrollEnd != null && Q(`scrollend`, t), r.onClick != null && (t.onclick = Qt), t = !0) : t = !1, t || Fi(e, !0)
        }

        function Li(e) {
            for (Ai = e.return; Ai;) switch (Ai.tag) {
                case 5:
                case 31:
                case 13:
                    Ni = !1;
                    return;
                case 27:
                case 3:
                    Ni = !0;
                    return;
                default:
                    Ai = Ai.return
            }
        }

        function Ri(e) {
            if (e !== Ai) return !1;
            if (!H) return Li(e), H = !0, !1;
            var t = e.tag,
                n;
            if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== `form` && n !== `button`) || Wd(e.type, e.memoizedProps)), n = !n), n && ji && Fi(e), Li(e), t === 13) {
                if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
                ji = df(e)
            } else if (t === 31) {
                if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
                ji = df(e)
            } else t === 27 ? (t = ji, Qd(e.type) ? (e = uf, uf = null, ji = e) : ji = t) : ji = Ai ? lf(e.stateNode.nextSibling) : null;
            return !0
        }

        function zi() {
            ji = Ai = null, H = !1
        }

        function Bi() {
            var e = Mi;
            return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Mi = null), e
        }

        function Vi(e) {
            Mi === null ? Mi = [e] : Mi.push(e)
        }
        var Hi = me(null),
            Ui = null,
            Wi = null;

        function Gi(e, t, n) {
            O(Hi, t._currentValue), t._currentValue = n
        }

        function Ki(e) {
            e._currentValue = Hi.current, D(Hi)
        }

        function qi(e, t, n) {
            for (; e !== null;) {
                var r = e.alternate;
                if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
                e = e.return
            }
        }

        function Ji(e, t, n, r) {
            var a = e.child;
            for (a !== null && (a.return = e); a !== null;) {
                var o = a.dependencies;
                if (o !== null) {
                    var s = a.child;
                    o = o.firstContext;
                    a: for (; o !== null;) {
                        var c = o;
                        o = a;
                        for (var l = 0; l < t.length; l++)
                            if (c.context === t[l]) {
                                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), qi(o.return, n, e), r || (s = null);
                                break a
                            } o = c.next
                    }
                } else if (a.tag === 18) {
                    if (s = a.return, s === null) throw Error(i(341));
                    s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), qi(s, n, e), s = null
                } else s = a.child;
                if (s !== null) s.return = a;
                else
                    for (s = a; s !== null;) {
                        if (s === e) {
                            s = null;
                            break
                        }
                        if (a = s.sibling, a !== null) {
                            a.return = s.return, s = a;
                            break
                        }
                        s = s.return
                    }
                a = s
            }
        }

        function Yi(e, t, n, r) {
            e = null;
            for (var a = t, o = !1; a !== null;) {
                if (!o) {
                    if (a.flags & 524288) o = !0;
                    else if (a.flags & 262144) break
                }
                if (a.tag === 10) {
                    var s = a.alternate;
                    if (s === null) throw Error(i(387));
                    if (s = s.memoizedProps, s !== null) {
                        var c = a.type;
                        xr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c))
                    }
                } else if (a === ve.current) {
                    if (s = a.alternate, s === null) throw Error(i(387));
                    s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [$f] : e.push($f))
                }
                a = a.return
            }
            e !== null && Ji(t, e, n, r), t.flags |= 262144
        }

        function Xi(e) {
            for (e = e.firstContext; e !== null;) {
                if (!xr(e.context._currentValue, e.memoizedValue)) return !0;
                e = e.next
            }
            return !1
        }

        function Zi(e) {
            Ui = e, Wi = null, e = e.dependencies, e !== null && (e.firstContext = null)
        }

        function Qi(e) {
            return ea(Ui, e)
        }

        function $i(e, t) {
            return Ui === null && Zi(e), ea(e, t)
        }

        function ea(e, t) {
            var n = t._currentValue;
            if (t = {
                    context: t,
                    memoizedValue: n,
                    next: null
                }, Wi === null) {
                if (e === null) throw Error(i(308));
                Wi = t, e.dependencies = {
                    lanes: 0,
                    firstContext: t
                }, e.flags |= 524288
            } else Wi = Wi.next = t;
            return n
        }
        var ta = typeof AbortController < `u` ? AbortController : function() {
                var e = [],
                    t = this.signal = {
                        aborted: !1,
                        addEventListener: function(t, n) {
                            e.push(n)
                        }
                    };
                this.abort = function() {
                    t.aborted = !0, e.forEach(function(e) {
                        return e()
                    })
                }
            },
            na = t.unstable_scheduleCallback,
            ra = t.unstable_NormalPriority,
            ia = {
                $$typeof: b,
                Consumer: null,
                Provider: null,
                _currentValue: null,
                _currentValue2: null,
                _threadCount: 0
            };

        function aa() {
            return {
                controller: new ta,
                data: new Map,
                refCount: 0
            }
        }

        function oa(e) {
            e.refCount--, e.refCount === 0 && na(ra, function() {
                e.controller.abort()
            })
        }
        var sa = null,
            ca = 0,
            la = 0,
            ua = null;

        function da(e, t) {
            if (sa === null) {
                var n = sa = [];
                ca = 0, la = dd(), ua = {
                    status: `pending`,
                    value: void 0,
                    then: function(e) {
                        n.push(e)
                    }
                }
            }
            return ca++, t.then(fa, fa), t
        }

        function fa() {
            if (--ca === 0 && sa !== null) {
                ua !== null && (ua.status = `fulfilled`);
                var e = sa;
                sa = null, la = 0, ua = null;
                for (var t = 0; t < e.length; t++)(0, e[t])()
            }
        }

        function pa(e, t) {
            var n = [],
                r = {
                    status: `pending`,
                    value: null,
                    reason: null,
                    then: function(e) {
                        n.push(e)
                    }
                };
            return e.then(function() {
                r.status = `fulfilled`, r.value = t;
                for (var e = 0; e < n.length; e++)(0, n[e])(t)
            }, function(e) {
                for (r.status = `rejected`, r.reason = e, e = 0; e < n.length; e++)(0, n[e])(void 0)
            }), r
        }
        var ma = T.S;
        T.S = function(e, t) {
            eu = Pe(), typeof t == `object` && t && typeof t.then == `function` && da(e, t), ma !== null && ma(e, t)
        };
        var ha = me(null);

        function ga() {
            var e = ha.current;
            return e === null ? Bl.pooledCache : e
        }

        function _a(e, t) {
            t === null ? O(ha, ha.current) : O(ha, t.pool)
        }

        function va() {
            var e = ga();
            return e === null ? null : {
                parent: ia._currentValue,
                pool: e
            }
        }
        var ya = Error(i(460)),
            ba = Error(i(474)),
            xa = Error(i(542)),
            Sa = {
                then: function() {}
            };

        function Ca(e) {
            return e = e.status, e === `fulfilled` || e === `rejected`
        }

        function wa(e, t, n) {
            switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Qt, Qt), t = n), t.status) {
                case `fulfilled`:
                    return t.value;
                case `rejected`:
                    throw e = t.reason, Oa(e), e;
                default:
                    if (typeof t.status == `string`) t.then(Qt, Qt);
                    else {
                        if (e = Bl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
                        e = t, e.status = `pending`, e.then(function(e) {
                            if (t.status === `pending`) {
                                var n = t;
                                n.status = `fulfilled`, n.value = e
                            }
                        }, function(e) {
                            if (t.status === `pending`) {
                                var n = t;
                                n.status = `rejected`, n.reason = e
                            }
                        })
                    }
                    switch (t.status) {
                        case `fulfilled`:
                            return t.value;
                        case `rejected`:
                            throw e = t.reason, Oa(e), e
                    }
                    throw Ea = t, ya
            }
        }

        function Ta(e) {
            try {
                var t = e._init;
                return t(e._payload)
            } catch (e) {
                throw typeof e == `object` && e && typeof e.then == `function` ? (Ea = e, ya) : e
            }
        }
        var Ea = null;

        function Da() {
            if (Ea === null) throw Error(i(459));
            var e = Ea;
            return Ea = null, e
        }

        function Oa(e) {
            if (e === ya || e === xa) throw Error(i(483))
        }
        var ka = null,
            Aa = 0;

        function ja(e) {
            var t = Aa;
            return Aa += 1, ka === null && (ka = []), wa(ka, e, t)
        }

        function Ma(e, t) {
            t = t.props.ref, e.ref = t === void 0 ? null : t
        }

        function Na(e, t) {
            throw t.$$typeof === p ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === `[object Object]` ? `object with keys {` + Object.keys(t).join(`, `) + `}` : e)))
        }

        function Pa(e) {
            function t(t, n) {
                if (e) {
                    var r = t.deletions;
                    r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n)
                }
            }

            function n(n, r) {
                if (!e) return null;
                for (; r !== null;) t(n, r), r = r.sibling;
                return null
            }

            function r(e) {
                for (var t = new Map; e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
                return t
            }

            function a(e, t) {
                return e = ci(e, t), e.index = 0, e.sibling = null, e
            }

            function o(t, n, r) {
                return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n)
            }

            function s(t) {
                return e && t.alternate === null && (t.flags |= 67108866), t
            }

            function c(e, t, n, r) {
                return t === null || t.tag !== 6 ? (t = fi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t)
            }

            function l(e, t, n, r) {
                var i = n.type;
                return i === g ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == `object` && i && i.$$typeof === ne && Ta(i) === t.type) ? (t = a(t, n.props), Ma(t, n), t.return = e, t) : (t = ui(n.type, n.key, n.props, null, e.mode, r), Ma(t, n), t.return = e, t)
            }

            function u(e, t, n, r) {
                return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = mi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t)
            }

            function d(e, t, n, r, i) {
                return t === null || t.tag !== 7 ? (t = di(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t)
            }

            function f(e, t, n) {
                if (typeof t == `string` && t !== `` || typeof t == `number` || typeof t == `bigint`) return t = fi(`` + t, e.mode, n), t.return = e, t;
                if (typeof t == `object` && t) {
                    switch (t.$$typeof) {
                        case m:
                            return n = ui(t.type, t.key, t.props, null, e.mode, n), Ma(n, t), n.return = e, n;
                        case h:
                            return t = mi(t, e.mode, n), t.return = e, t;
                        case ne:
                            return t = Ta(t), f(e, t, n)
                    }
                    if (se(t) || ae(t)) return t = di(t, e.mode, n, null), t.return = e, t;
                    if (typeof t.then == `function`) return f(e, ja(t), n);
                    if (t.$$typeof === b) return f(e, $i(e, t), n);
                    Na(e, t)
                }
                return null
            }

            function p(e, t, n, r) {
                var i = t === null ? null : t.key;
                if (typeof n == `string` && n !== `` || typeof n == `number` || typeof n == `bigint`) return i === null ? c(e, t, `` + n, r) : null;
                if (typeof n == `object` && n) {
                    switch (n.$$typeof) {
                        case m:
                            return n.key === i ? l(e, t, n, r) : null;
                        case h:
                            return n.key === i ? u(e, t, n, r) : null;
                        case ne:
                            return n = Ta(n), p(e, t, n, r)
                    }
                    if (se(n) || ae(n)) return i === null ? d(e, t, n, r, null) : null;
                    if (typeof n.then == `function`) return p(e, t, ja(n), r);
                    if (n.$$typeof === b) return p(e, t, $i(e, n), r);
                    Na(e, n)
                }
                return null
            }

            function _(e, t, n, r, i) {
                if (typeof r == `string` && r !== `` || typeof r == `number` || typeof r == `bigint`) return e = e.get(n) || null, c(t, e, `` + r, i);
                if (typeof r == `object` && r) {
                    switch (r.$$typeof) {
                        case m:
                            return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
                        case h:
                            return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
                        case ne:
                            return r = Ta(r), _(e, t, n, r, i)
                    }
                    if (se(r) || ae(r)) return e = e.get(n) || null, d(t, e, r, i, null);
                    if (typeof r.then == `function`) return _(e, t, n, ja(r), i);
                    if (r.$$typeof === b) return _(e, t, n, $i(t, r), i);
                    Na(t, r)
                }
                return null
            }

            function v(i, a, s, c) {
                for (var l = null, u = null, d = a, m = a = 0, h = null; d !== null && m < s.length; m++) {
                    d.index > m ? (h = d, d = null) : h = d.sibling;
                    var g = p(i, d, s[m], c);
                    if (g === null) {
                        d === null && (d = h);
                        break
                    }
                    e && d && g.alternate === null && t(i, d), a = o(g, a, m), u === null ? l = g : u.sibling = g, u = g, d = h
                }
                if (m === s.length) return n(i, d), H && Ti(i, m), l;
                if (d === null) {
                    for (; m < s.length; m++) d = f(i, s[m], c), d !== null && (a = o(d, a, m), u === null ? l = d : u.sibling = d, u = d);
                    return H && Ti(i, m), l
                }
                for (d = r(d); m < s.length; m++) h = _(d, i, m, s[m], c), h !== null && (e && h.alternate !== null && d.delete(h.key === null ? m : h.key), a = o(h, a, m), u === null ? l = h : u.sibling = h, u = h);
                return e && d.forEach(function(e) {
                    return t(i, e)
                }), H && Ti(i, m), l
            }

            function y(a, s, c, l) {
                if (c == null) throw Error(i(151));
                for (var u = null, d = null, m = s, h = s = 0, g = null, v = c.next(); m !== null && !v.done; h++, v = c.next()) {
                    m.index > h ? (g = m, m = null) : g = m.sibling;
                    var y = p(a, m, v.value, l);
                    if (y === null) {
                        m === null && (m = g);
                        break
                    }
                    e && m && y.alternate === null && t(a, m), s = o(y, s, h), d === null ? u = y : d.sibling = y, d = y, m = g
                }
                if (v.done) return n(a, m), H && Ti(a, h), u;
                if (m === null) {
                    for (; !v.done; h++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, h), d === null ? u = v : d.sibling = v, d = v);
                    return H && Ti(a, h), u
                }
                for (m = r(m); !v.done; h++, v = c.next()) v = _(m, a, h, v.value, l), v !== null && (e && v.alternate !== null && m.delete(v.key === null ? h : v.key), s = o(v, s, h), d === null ? u = v : d.sibling = v, d = v);
                return e && m.forEach(function(e) {
                    return t(a, e)
                }), H && Ti(a, h), u
            }

            function x(e, r, o, c) {
                if (typeof o == `object` && o && o.type === g && o.key === null && (o = o.props.children), typeof o == `object` && o) {
                    switch (o.$$typeof) {
                        case m:
                            a: {
                                for (var l = o.key; r !== null;) {
                                    if (r.key === l) {
                                        if (l = o.type, l === g) {
                                            if (r.tag === 7) {
                                                n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
                                                break a
                                            }
                                        } else if (r.elementType === l || typeof l == `object` && l && l.$$typeof === ne && Ta(l) === r.type) {
                                            n(e, r.sibling), c = a(r, o.props), Ma(c, o), c.return = e, e = c;
                                            break a
                                        }
                                        n(e, r);
                                        break
                                    } else t(e, r);
                                    r = r.sibling
                                }
                                o.type === g ? (c = di(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = ui(o.type, o.key, o.props, null, e.mode, c), Ma(c, o), c.return = e, e = c)
                            }
                            return s(e);
                        case h:
                            a: {
                                for (l = o.key; r !== null;) {
                                    if (r.key === l)
                                        if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
                                            n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
                                            break a
                                        } else {
                                            n(e, r);
                                            break
                                        }
                                    else t(e, r);
                                    r = r.sibling
                                }
                                c = mi(o, e.mode, c),
                                c.return = e,
                                e = c
                            }
                            return s(e);
                        case ne:
                            return o = Ta(o), x(e, r, o, c)
                    }
                    if (se(o)) return v(e, r, o, c);
                    if (ae(o)) {
                        if (l = ae(o), typeof l != `function`) throw Error(i(150));
                        return o = l.call(o), y(e, r, o, c)
                    }
                    if (typeof o.then == `function`) return x(e, r, ja(o), c);
                    if (o.$$typeof === b) return x(e, r, $i(e, o), c);
                    Na(e, o)
                }
                return typeof o == `string` && o !== `` || typeof o == `number` || typeof o == `bigint` ? (o = `` + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = fi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r)
            }
            return function(e, t, n, r) {
                try {
                    Aa = 0;
                    var i = x(e, t, n, r);
                    return ka = null, i
                } catch (t) {
                    if (t === ya || t === xa) throw t;
                    var a = oi(29, t, null, e.mode);
                    return a.lanes = r, a.return = e, a
                }
            }
        }
        var Fa = Pa(!0),
            Ia = Pa(!1),
            La = !1;

        function Ra(e) {
            e.updateQueue = {
                baseState: e.memoizedState,
                firstBaseUpdate: null,
                lastBaseUpdate: null,
                shared: {
                    pending: null,
                    lanes: 0,
                    hiddenCallbacks: null
                },
                callbacks: null
            }
        }

        function za(e, t) {
            e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                callbacks: null
            })
        }

        function Ba(e) {
            return {
                lane: e,
                tag: 0,
                payload: null,
                callback: null,
                next: null
            }
        }

        function Va(e, t, n) {
            var r = e.updateQueue;
            if (r === null) return null;
            if (r = r.shared, G & 2) {
                var i = r.pending;
                return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ri(e), ni(e, null, n), t
            }
            return $r(e, r, t, n), ri(e)
        }

        function Ha(e, t, n) {
            if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
                var r = t.lanes;
                r &= e.pendingLanes, n |= r, t.lanes = n, nt(e, n)
            }
        }

        function Ua(e, t) {
            var n = e.updateQueue,
                r = e.alternate;
            if (r !== null && (r = r.updateQueue, n === r)) {
                var i = null,
                    a = null;
                if (n = n.firstBaseUpdate, n !== null) {
                    do {
                        var o = {
                            lane: n.lane,
                            tag: n.tag,
                            payload: n.payload,
                            callback: null,
                            next: null
                        };
                        a === null ? i = a = o : a = a.next = o, n = n.next
                    } while (n !== null);
                    a === null ? i = a = t : a = a.next = t
                } else i = a = t;
                n = {
                    baseState: r.baseState,
                    firstBaseUpdate: i,
                    lastBaseUpdate: a,
                    shared: r.shared,
                    callbacks: r.callbacks
                }, e.updateQueue = n;
                return
            }
            e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
        }
        var Wa = !1;

        function Ga() {
            if (Wa) {
                var e = ua;
                if (e !== null) throw e
            }
        }

        function Ka(e, t, n, r) {
            Wa = !1;
            var i = e.updateQueue;
            La = !1;
            var a = i.firstBaseUpdate,
                o = i.lastBaseUpdate,
                s = i.shared.pending;
            if (s !== null) {
                i.shared.pending = null;
                var c = s,
                    l = c.next;
                c.next = null, o === null ? a = l : o.next = l, o = c;
                var u = e.alternate;
                u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c))
            }
            if (a !== null) {
                var d = i.baseState;
                o = 0, u = l = c = null, s = a;
                do {
                    var p = s.lane & -536870913,
                        m = p !== s.lane;
                    if (m ? (q & p) === p : (r & p) === p) {
                        p !== 0 && p === la && (Wa = !0), u !== null && (u = u.next = {
                            lane: 0,
                            tag: s.tag,
                            payload: s.payload,
                            callback: null,
                            next: null
                        });
                        a: {
                            var h = e,
                                g = s;p = t;
                            var _ = n;
                            switch (g.tag) {
                                case 1:
                                    if (h = g.payload, typeof h == `function`) {
                                        d = h.call(_, d, p);
                                        break a
                                    }
                                    d = h;
                                    break a;
                                case 3:
                                    h.flags = h.flags & -65537 | 128;
                                case 0:
                                    if (h = g.payload, p = typeof h == `function` ? h.call(_, d, p) : h, p == null) break a;
                                    d = f({}, d, p);
                                    break a;
                                case 2:
                                    La = !0
                            }
                        }
                        p = s.callback, p !== null && (e.flags |= 64, m && (e.flags |= 8192), m = i.callbacks, m === null ? i.callbacks = [p] : m.push(p))
                    } else m = {
                        lane: p,
                        tag: s.tag,
                        payload: s.payload,
                        callback: s.callback,
                        next: null
                    }, u === null ? (l = u = m, c = d) : u = u.next = m, o |= p;
                    if (s = s.next, s === null) {
                        if (s = i.shared.pending, s === null) break;
                        m = s, s = m.next, m.next = null, i.lastBaseUpdate = m, i.shared.pending = null
                    }
                } while (1);
                u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d
            }
        }

        function qa(e, t) {
            if (typeof e != `function`) throw Error(i(191, e));
            e.call(t)
        }

        function Ja(e, t) {
            var n = e.callbacks;
            if (n !== null)
                for (e.callbacks = null, e = 0; e < n.length; e++) qa(n[e], t)
        }
        var Ya = me(null),
            Xa = me(0);

        function Za(e, t) {
            e = Wl, O(Xa, e), O(Ya, t), Wl = e | t.baseLanes
        }

        function Qa() {
            O(Xa, Wl), O(Ya, Ya.current)
        }

        function $a() {
            Wl = Xa.current, D(Ya), D(Xa)
        }
        var eo = me(null),
            to = null;

        function no(e) {
            var t = e.alternate;
            O(so, so.current & 1), O(eo, e), to === null && (t === null || Ya.current !== null || t.memoizedState !== null) && (to = e)
        }

        function ro(e) {
            O(so, so.current), O(eo, e), to === null && (to = e)
        }

        function io(e) {
            e.tag === 22 ? (O(so, so.current), O(eo, e), to === null && (to = e)) : ao(e)
        }

        function ao() {
            O(so, so.current), O(eo, eo.current)
        }

        function oo(e) {
            D(eo), to === e && (to = null), D(so)
        }
        var so = me(0);

        function co(e) {
            for (var t = e; t !== null;) {
                if (t.tag === 13) {
                    var n = t.memoizedState;
                    if (n !== null && (n = n.dehydrated, n === null || of(n) || sf(n))) return t
                } else if (t.tag === 19 && (t.memoizedProps.revealOrder === `forwards` || t.memoizedProps.revealOrder === `backwards` || t.memoizedProps.revealOrder === `unstable_legacy-backwards` || t.memoizedProps.revealOrder === `together`)) {
                    if (t.flags & 128) return t
                } else if (t.child !== null) {
                    t.child.return = t, t = t.child;
                    continue
                }
                if (t === e) break;
                for (; t.sibling === null;) {
                    if (t.return === null || t.return === e) return null;
                    t = t.return
                }
                t.sibling.return = t.return, t = t.sibling
            }
            return null
        }
        var lo = 0,
            U = null,
            W = null,
            uo = null,
            fo = !1,
            po = !1,
            mo = !1,
            ho = 0,
            go = 0,
            _o = null,
            vo = 0;

        function yo() {
            throw Error(i(321))
        }

        function bo(e, t) {
            if (t === null) return !1;
            for (var n = 0; n < t.length && n < e.length; n++)
                if (!xr(e[n], t[n])) return !1;
            return !0
        }

        function xo(e, t, n, r, i, a) {
            return lo = a, U = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, T.H = e === null || e.memoizedState === null ? Rs : zs, mo = !1, a = n(r, i), mo = !1, po && (a = Co(t, n, r, i)), So(e), a
        }

        function So(e) {
            T.H = Ls;
            var t = W !== null && W.next !== null;
            if (lo = 0, uo = W = U = null, fo = !1, go = 0, _o = null, t) throw Error(i(300));
            e === null || nc || (e = e.dependencies, e !== null && Xi(e) && (nc = !0))
        }

        function Co(e, t, n, r) {
            U = e;
            var a = 0;
            do {
                if (po && (_o = null), go = 0, po = !1, 25 <= a) throw Error(i(301));
                if (a += 1, uo = W = null, e.updateQueue != null) {
                    var o = e.updateQueue;
                    o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0)
                }
                T.H = Bs, o = t(n, r)
            } while (po);
            return o
        }

        function wo() {
            var e = T.H,
                t = e.useState()[0];
            return t = typeof t.then == `function` ? jo(t) : t, e = e.useState()[0], (W === null ? null : W.memoizedState) !== e && (U.flags |= 1024), t
        }

        function To() {
            var e = ho !== 0;
            return ho = 0, e
        }

        function Eo(e, t, n) {
            t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n
        }

        function Do(e) {
            if (fo) {
                for (e = e.memoizedState; e !== null;) {
                    var t = e.queue;
                    t !== null && (t.pending = null), e = e.next
                }
                fo = !1
            }
            lo = 0, uo = W = U = null, po = !1, go = ho = 0, _o = null
        }

        function Oo() {
            var e = {
                memoizedState: null,
                baseState: null,
                baseQueue: null,
                queue: null,
                next: null
            };
            return uo === null ? U.memoizedState = uo = e : uo = uo.next = e, uo
        }

        function ko() {
            if (W === null) {
                var e = U.alternate;
                e = e === null ? null : e.memoizedState
            } else e = W.next;
            var t = uo === null ? U.memoizedState : uo.next;
            if (t !== null) uo = t, W = e;
            else {
                if (e === null) throw U.alternate === null ? Error(i(467)) : Error(i(310));
                W = e, e = {
                    memoizedState: W.memoizedState,
                    baseState: W.baseState,
                    baseQueue: W.baseQueue,
                    queue: W.queue,
                    next: null
                }, uo === null ? U.memoizedState = uo = e : uo = uo.next = e
            }
            return uo
        }

        function Ao() {
            return {
                lastEffect: null,
                events: null,
                stores: null,
                memoCache: null
            }
        }

        function jo(e) {
            var t = go;
            return go += 1, _o === null && (_o = []), e = wa(_o, e, t), t = U, (uo === null ? t.memoizedState : uo.next) === null && (t = t.alternate, T.H = t === null || t.memoizedState === null ? Rs : zs), e
        }

        function Mo(e) {
            if (typeof e == `object` && e) {
                if (typeof e.then == `function`) return jo(e);
                if (e.$$typeof === b) return Qi(e)
            }
            throw Error(i(438, String(e)))
        }

        function No(e) {
            var t = null,
                n = U.updateQueue;
            if (n !== null && (t = n.memoCache), t == null) {
                var r = U.alternate;
                r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
                    data: r.data.map(function(e) {
                        return e.slice()
                    }),
                    index: 0
                })))
            }
            if (t ??= {
                    data: [],
                    index: 0
                }, n === null && (n = Ao(), U.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
                for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = C;
            return t.index++, n
        }

        function Po(e, t) {
            return typeof t == `function` ? t(e) : t
        }

        function Fo(e) {
            return Io(ko(), W, e)
        }

        function Io(e, t, n) {
            var r = e.queue;
            if (r === null) throw Error(i(311));
            r.lastRenderedReducer = n;
            var a = e.baseQueue,
                o = r.pending;
            if (o !== null) {
                if (a !== null) {
                    var s = a.next;
                    a.next = o.next, o.next = s
                }
                t.baseQueue = a = o, r.pending = null
            }
            if (o = e.baseState, a === null) e.memoizedState = o;
            else {
                t = a.next;
                var c = s = null,
                    l = null,
                    u = t,
                    d = !1;
                do {
                    var f = u.lane & -536870913;
                    if (f === u.lane ? (lo & f) === f : (q & f) === f) {
                        var p = u.revertLane;
                        if (p === 0) l !== null && (l = l.next = {
                            lane: 0,
                            revertLane: 0,
                            gesture: null,
                            action: u.action,
                            hasEagerState: u.hasEagerState,
                            eagerState: u.eagerState,
                            next: null
                        }), f === la && (d = !0);
                        else if ((lo & p) === p) {
                            u = u.next, p === la && (d = !0);
                            continue
                        } else f = {
                            lane: 0,
                            revertLane: u.revertLane,
                            gesture: null,
                            action: u.action,
                            hasEagerState: u.hasEagerState,
                            eagerState: u.eagerState,
                            next: null
                        }, l === null ? (c = l = f, s = o) : l = l.next = f, U.lanes |= p, Gl |= p;
                        f = u.action, mo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f)
                    } else p = {
                        lane: f,
                        revertLane: u.revertLane,
                        gesture: u.gesture,
                        action: u.action,
                        hasEagerState: u.hasEagerState,
                        eagerState: u.eagerState,
                        next: null
                    }, l === null ? (c = l = p, s = o) : l = l.next = p, U.lanes |= f, Gl |= f;
                    u = u.next
                } while (u !== null && u !== t);
                if (l === null ? s = o : l.next = c, !xr(o, e.memoizedState) && (nc = !0, d && (n = ua, n !== null))) throw n;
                e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o
            }
            return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch]
        }

        function Lo(e) {
            var t = ko(),
                n = t.queue;
            if (n === null) throw Error(i(311));
            n.lastRenderedReducer = e;
            var r = n.dispatch,
                a = n.pending,
                o = t.memoizedState;
            if (a !== null) {
                n.pending = null;
                var s = a = a.next;
                do o = e(o, s.action), s = s.next; while (s !== a);
                xr(o, t.memoizedState) || (nc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o
            }
            return [o, r]
        }

        function Ro(e, t, n) {
            var r = U,
                a = ko(),
                o = H;
            if (o) {
                if (n === void 0) throw Error(i(407));
                n = n()
            } else n = t();
            var s = !xr((W || a).memoizedState, n);
            if (s && (a.memoizedState = n, nc = !0), a = a.queue, ls(Vo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || uo !== null && uo.memoizedState.tag & 1) {
                if (r.flags |= 2048, is(9, {
                        destroy: void 0
                    }, Bo.bind(null, r, a, n, t), null), Bl === null) throw Error(i(349));
                o || lo & 127 || zo(r, t, n)
            }
            return n
        }

        function zo(e, t, n) {
            e.flags |= 16384, e = {
                getSnapshot: t,
                value: n
            }, t = U.updateQueue, t === null ? (t = Ao(), U.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e))
        }

        function Bo(e, t, n, r) {
            t.value = n, t.getSnapshot = r, Ho(t) && Uo(e)
        }

        function Vo(e, t, n) {
            return n(function() {
                Ho(t) && Uo(e)
            })
        }

        function Ho(e) {
            var t = e.getSnapshot;
            e = e.value;
            try {
                var n = t();
                return !xr(e, n)
            } catch {
                return !0
            }
        }

        function Uo(e) {
            var t = ti(e, 2);
            t !== null && hu(t, e, 2)
        }

        function Wo(e) {
            var t = Oo();
            if (typeof e == `function`) {
                var n = e;
                if (e = n(), mo) {
                    Be(!0);
                    try {
                        n()
                    } finally {
                        Be(!1)
                    }
                }
            }
            return t.memoizedState = t.baseState = e, t.queue = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Po,
                lastRenderedState: e
            }, t
        }

        function Go(e, t, n, r) {
            return e.baseState = n, Io(e, W, typeof r == `function` ? r : Po)
        }

        function Ko(e, t, n, r, a) {
            if (Ps(e)) throw Error(i(485));
            if (e = t.action, e !== null) {
                var o = {
                    payload: a,
                    action: e,
                    next: null,
                    isTransition: !0,
                    status: `pending`,
                    value: null,
                    reason: null,
                    listeners: [],
                    then: function(e) {
                        o.listeners.push(e)
                    }
                };
                T.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, qo(t, o)) : (o.next = n.next, t.pending = n.next = o)
            }
        }

        function qo(e, t) {
            var n = t.action,
                r = t.payload,
                i = e.state;
            if (t.isTransition) {
                var a = T.T,
                    o = {};
                T.T = o;
                try {
                    var s = n(i, r),
                        c = T.S;
                    c !== null && c(o, s), Jo(e, t, s)
                } catch (n) {
                    Xo(e, t, n)
                } finally {
                    a !== null && o.types !== null && (a.types = o.types), T.T = a
                }
            } else try {
                a = n(i, r), Jo(e, t, a)
            } catch (n) {
                Xo(e, t, n)
            }
        }

        function Jo(e, t, n) {
            typeof n == `object` && n && typeof n.then == `function` ? n.then(function(n) {
                Yo(e, t, n)
            }, function(n) {
                return Xo(e, t, n)
            }) : Yo(e, t, n)
        }

        function Yo(e, t, n) {
            t.status = `fulfilled`, t.value = n, Zo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, qo(e, n)))
        }

        function Xo(e, t, n) {
            var r = e.pending;
            if (e.pending = null, r !== null) {
                r = r.next;
                do t.status = `rejected`, t.reason = n, Zo(t), t = t.next; while (t !== r)
            }
            e.action = null
        }

        function Zo(e) {
            e = e.listeners;
            for (var t = 0; t < e.length; t++)(0, e[t])()
        }

        function Qo(e, t) {
            return t
        }

        function $o(e, t) {
            if (H) {
                var n = Bl.formState;
                if (n !== null) {
                    a: {
                        var r = U;
                        if (H) {
                            if (ji) {
                                b: {
                                    for (var i = ji, a = Ni; i.nodeType !== 8;) {
                                        if (!a) {
                                            i = null;
                                            break b
                                        }
                                        if (i = lf(i.nextSibling), i === null) {
                                            i = null;
                                            break b
                                        }
                                    }
                                    a = i.data,
                                    i = a === `F!` || a === `F` ? i : null
                                }
                                if (i) {
                                    ji = lf(i.nextSibling), r = i.data === `F!`;
                                    break a
                                }
                            }
                            Fi(r)
                        }
                        r = !1
                    }
                    r && (t = n[0])
                }
            }
            return n = Oo(), n.memoizedState = n.baseState = t, r = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Qo,
                lastRenderedState: t
            }, n.queue = r, n = js.bind(null, U, r), r.dispatch = n, r = Wo(!1), a = Ns.bind(null, U, !1, r.queue), r = Oo(), i = {
                state: t,
                dispatch: null,
                action: e,
                pending: null
            }, r.queue = i, n = Ko.bind(null, U, i, a, n), i.dispatch = n, r.memoizedState = e, [t, n, !1]
        }

        function es(e) {
            return ts(ko(), W, e)
        }

        function ts(e, t, n) {
            if (t = Io(e, t, Qo)[0], e = Fo(Po)[0], typeof t == `object` && t && typeof t.then == `function`) try {
                var r = jo(t)
            } catch (e) {
                throw e === ya ? xa : e
            } else r = t;
            t = ko();
            var i = t.queue,
                a = i.dispatch;
            return n !== t.memoizedState && (U.flags |= 2048, is(9, {
                destroy: void 0
            }, ns.bind(null, i, n), null)), [r, a, e]
        }

        function ns(e, t) {
            e.action = t
        }

        function rs(e) {
            var t = ko(),
                n = W;
            if (n !== null) return ts(t, n, e);
            ko(), t = t.memoizedState, n = ko();
            var r = n.queue.dispatch;
            return n.memoizedState = e, [t, r, !1]
        }

        function is(e, t, n, r) {
            return e = {
                tag: e,
                create: n,
                deps: r,
                inst: t,
                next: null
            }, t = U.updateQueue, t === null && (t = Ao(), U.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e
        }

        function as() {
            return ko().memoizedState
        }

        function os(e, t, n, r) {
            var i = Oo();
            U.flags |= e, i.memoizedState = is(1 | t, {
                destroy: void 0
            }, n, r === void 0 ? null : r)
        }

        function ss(e, t, n, r) {
            var i = ko();
            r = r === void 0 ? null : r;
            var a = i.memoizedState.inst;
            W !== null && r !== null && bo(r, W.memoizedState.deps) ? i.memoizedState = is(t, a, n, r) : (U.flags |= e, i.memoizedState = is(1 | t, a, n, r))
        }

        function cs(e, t) {
            os(8390656, 8, e, t)
        }

        function ls(e, t) {
            ss(2048, 8, e, t)
        }

        function us(e) {
            U.flags |= 4;
            var t = U.updateQueue;
            if (t === null) t = Ao(), U.updateQueue = t, t.events = [e];
            else {
                var n = t.events;
                n === null ? t.events = [e] : n.push(e)
            }
        }

        function ds(e) {
            var t = ko().memoizedState;
            return us({
                    ref: t,
                    nextImpl: e
                }),
                function() {
                    if (G & 2) throw Error(i(440));
                    return t.impl.apply(void 0, arguments)
                }
        }

        function fs(e, t) {
            return ss(4, 2, e, t)
        }

        function ps(e, t) {
            return ss(4, 4, e, t)
        }

        function ms(e, t) {
            if (typeof t == `function`) {
                e = e();
                var n = t(e);
                return function() {
                    typeof n == `function` ? n() : t(null)
                }
            }
            if (t != null) return e = e(), t.current = e,
                function() {
                    t.current = null
                }
        }

        function hs(e, t, n) {
            n = n == null ? null : n.concat([e]), ss(4, 4, ms.bind(null, t, e), n)
        }

        function gs() {}

        function _s(e, t) {
            var n = ko();
            t = t === void 0 ? null : t;
            var r = n.memoizedState;
            return t !== null && bo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
        }

        function vs(e, t) {
            var n = ko();
            t = t === void 0 ? null : t;
            var r = n.memoizedState;
            if (t !== null && bo(t, r[1])) return r[0];
            if (r = e(), mo) {
                Be(!0);
                try {
                    e()
                } finally {
                    Be(!1)
                }
            }
            return n.memoizedState = [r, t], r
        }

        function ys(e, t, n) {
            return n === void 0 || lo & 1073741824 && !(q & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), U.lanes |= e, Gl |= e, n)
        }

        function bs(e, t, n, r) {
            return xr(n, t) ? n : Ya.current === null ? !(lo & 42) || lo & 1073741824 && !(q & 261930) ? (nc = !0, e.memoizedState = n) : (e = mu(), U.lanes |= e, Gl |= e, t) : (e = ys(e, n, r), xr(e, t) || (nc = !0), e)
        }

        function xs(e, t, n, r, i) {
            var a = E.p;
            E.p = a !== 0 && 8 > a ? a : 8;
            var o = T.T,
                s = {};
            T.T = s, Ns(e, !1, t, n);
            try {
                var c = i(),
                    l = T.S;
                l !== null && l(s, c), typeof c == `object` && c && typeof c.then == `function` ? Ms(e, t, pa(c, r), pu(e)) : Ms(e, t, r, pu(e))
            } catch (n) {
                Ms(e, t, {
                    then: function() {},
                    status: `rejected`,
                    reason: n
                }, pu())
            } finally {
                E.p = a, o !== null && s.types !== null && (o.types = s.types), T.T = o
            }
        }

        function Ss() {}

        function Cs(e, t, n, r) {
            if (e.tag !== 5) throw Error(i(476));
            var a = ws(e).queue;
            xs(e, a, t, le, n === null ? Ss : function() {
                return Ts(e), n(r)
            })
        }

        function ws(e) {
            var t = e.memoizedState;
            if (t !== null) return t;
            t = {
                memoizedState: le,
                baseState: le,
                baseQueue: null,
                queue: {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: Po,
                    lastRenderedState: le
                },
                next: null
            };
            var n = {};
            return t.next = {
                memoizedState: n,
                baseState: n,
                baseQueue: null,
                queue: {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: Po,
                    lastRenderedState: n
                },
                next: null
            }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t
        }

        function Ts(e) {
            var t = ws(e);
            t.next === null && (t = e.alternate.memoizedState), Ms(e, t.next.queue, {}, pu())
        }

        function Es() {
            return Qi($f)
        }

        function Ds() {
            return ko().memoizedState
        }

        function Os() {
            return ko().memoizedState
        }

        function ks(e) {
            for (var t = e.return; t !== null;) {
                switch (t.tag) {
                    case 24:
                    case 3:
                        var n = pu();
                        e = Ba(n);
                        var r = Va(t, e, n);
                        r !== null && (hu(r, t, n), Ha(r, t, n)), t = {
                            cache: aa()
                        }, e.payload = t;
                        return
                }
                t = t.return
            }
        }

        function As(e, t, n) {
            var r = pu();
            n = {
                lane: r,
                revertLane: 0,
                gesture: null,
                action: n,
                hasEagerState: !1,
                eagerState: null,
                next: null
            }, Ps(e) ? Fs(t, n) : (n = ei(e, t, n, r), n !== null && (hu(n, e, r), Is(n, t, r)))
        }

        function js(e, t, n) {
            Ms(e, t, n, pu())
        }

        function Ms(e, t, n, r) {
            var i = {
                lane: r,
                revertLane: 0,
                gesture: null,
                action: n,
                hasEagerState: !1,
                eagerState: null,
                next: null
            };
            if (Ps(e)) Fs(t, i);
            else {
                var a = e.alternate;
                if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
                    var o = t.lastRenderedState,
                        s = a(o, n);
                    if (i.hasEagerState = !0, i.eagerState = s, xr(s, o)) return $r(e, t, i, 0), Bl === null && Qr(), !1
                } catch {}
                if (n = ei(e, t, i, r), n !== null) return hu(n, e, r), Is(n, t, r), !0
            }
            return !1
        }

        function Ns(e, t, n, r) {
            if (r = {
                    lane: 2,
                    revertLane: dd(),
                    gesture: null,
                    action: r,
                    hasEagerState: !1,
                    eagerState: null,
                    next: null
                }, Ps(e)) {
                if (t) throw Error(i(479))
            } else t = ei(e, n, r, 2), t !== null && hu(t, e, 2)
        }

        function Ps(e) {
            var t = e.alternate;
            return e === U || t !== null && t === U
        }

        function Fs(e, t) {
            po = fo = !0;
            var n = e.pending;
            n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
        }

        function Is(e, t, n) {
            if (n & 4194048) {
                var r = t.lanes;
                r &= e.pendingLanes, n |= r, t.lanes = n, nt(e, n)
            }
        }
        var Ls = {
            readContext: Qi,
            use: Mo,
            useCallback: yo,
            useContext: yo,
            useEffect: yo,
            useImperativeHandle: yo,
            useLayoutEffect: yo,
            useInsertionEffect: yo,
            useMemo: yo,
            useReducer: yo,
            useRef: yo,
            useState: yo,
            useDebugValue: yo,
            useDeferredValue: yo,
            useTransition: yo,
            useSyncExternalStore: yo,
            useId: yo,
            useHostTransitionStatus: yo,
            useFormState: yo,
            useActionState: yo,
            useOptimistic: yo,
            useMemoCache: yo,
            useCacheRefresh: yo
        };
        Ls.useEffectEvent = yo;
        var Rs = {
                readContext: Qi,
                use: Mo,
                useCallback: function(e, t) {
                    return Oo().memoizedState = [e, t === void 0 ? null : t], e
                },
                useContext: Qi,
                useEffect: cs,
                useImperativeHandle: function(e, t, n) {
                    n = n == null ? null : n.concat([e]), os(4194308, 4, ms.bind(null, t, e), n)
                },
                useLayoutEffect: function(e, t) {
                    return os(4194308, 4, e, t)
                },
                useInsertionEffect: function(e, t) {
                    os(4, 2, e, t)
                },
                useMemo: function(e, t) {
                    var n = Oo();
                    t = t === void 0 ? null : t;
                    var r = e();
                    if (mo) {
                        Be(!0);
                        try {
                            e()
                        } finally {
                            Be(!1)
                        }
                    }
                    return n.memoizedState = [r, t], r
                },
                useReducer: function(e, t, n) {
                    var r = Oo();
                    if (n !== void 0) {
                        var i = n(t);
                        if (mo) {
                            Be(!0);
                            try {
                                n(t)
                            } finally {
                                Be(!1)
                            }
                        }
                    } else i = t;
                    return r.memoizedState = r.baseState = i, e = {
                        pending: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: e,
                        lastRenderedState: i
                    }, r.queue = e, e = e.dispatch = As.bind(null, U, e), [r.memoizedState, e]
                },
                useRef: function(e) {
                    var t = Oo();
                    return e = {
                        current: e
                    }, t.memoizedState = e
                },
                useState: function(e) {
                    e = Wo(e);
                    var t = e.queue,
                        n = js.bind(null, U, t);
                    return t.dispatch = n, [e.memoizedState, n]
                },
                useDebugValue: gs,
                useDeferredValue: function(e, t) {
                    return ys(Oo(), e, t)
                },
                useTransition: function() {
                    var e = Wo(!1);
                    return e = xs.bind(null, U, e.queue, !0, !1), Oo().memoizedState = e, [!1, e]
                },
                useSyncExternalStore: function(e, t, n) {
                    var r = U,
                        a = Oo();
                    if (H) {
                        if (n === void 0) throw Error(i(407));
                        n = n()
                    } else {
                        if (n = t(), Bl === null) throw Error(i(349));
                        q & 127 || zo(r, t, n)
                    }
                    a.memoizedState = n;
                    var o = {
                        value: n,
                        getSnapshot: t
                    };
                    return a.queue = o, cs(Vo.bind(null, r, o, e), [e]), r.flags |= 2048, is(9, {
                        destroy: void 0
                    }, Bo.bind(null, r, o, n, t), null), n
                },
                useId: function() {
                    var e = Oo(),
                        t = Bl.identifierPrefix;
                    if (H) {
                        var n = wi,
                            r = Ci;
                        n = (r & ~(1 << 32 - Ve(r) - 1)).toString(32) + n, t = `_` + t + `R_` + n, n = ho++, 0 < n && (t += `H` + n.toString(32)), t += `_`
                    } else n = vo++, t = `_` + t + `r_` + n.toString(32) + `_`;
                    return e.memoizedState = t
                },
                useHostTransitionStatus: Es,
                useFormState: $o,
                useActionState: $o,
                useOptimistic: function(e) {
                    var t = Oo();
                    t.memoizedState = t.baseState = e;
                    var n = {
                        pending: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: null,
                        lastRenderedState: null
                    };
                    return t.queue = n, t = Ns.bind(null, U, !0, n), n.dispatch = t, [e, t]
                },
                useMemoCache: No,
                useCacheRefresh: function() {
                    return Oo().memoizedState = ks.bind(null, U)
                },
                useEffectEvent: function(e) {
                    var t = Oo(),
                        n = {
                            impl: e
                        };
                    return t.memoizedState = n,
                        function() {
                            if (G & 2) throw Error(i(440));
                            return n.impl.apply(void 0, arguments)
                        }
                }
            },
            zs = {
                readContext: Qi,
                use: Mo,
                useCallback: _s,
                useContext: Qi,
                useEffect: ls,
                useImperativeHandle: hs,
                useInsertionEffect: fs,
                useLayoutEffect: ps,
                useMemo: vs,
                useReducer: Fo,
                useRef: as,
                useState: function() {
                    return Fo(Po)
                },
                useDebugValue: gs,
                useDeferredValue: function(e, t) {
                    return bs(ko(), W.memoizedState, e, t)
                },
                useTransition: function() {
                    var e = Fo(Po)[0],
                        t = ko().memoizedState;
                    return [typeof e == `boolean` ? e : jo(e), t]
                },
                useSyncExternalStore: Ro,
                useId: Ds,
                useHostTransitionStatus: Es,
                useFormState: es,
                useActionState: es,
                useOptimistic: function(e, t) {
                    return Go(ko(), W, e, t)
                },
                useMemoCache: No,
                useCacheRefresh: Os
            };
        zs.useEffectEvent = ds;
        var Bs = {
            readContext: Qi,
            use: Mo,
            useCallback: _s,
            useContext: Qi,
            useEffect: ls,
            useImperativeHandle: hs,
            useInsertionEffect: fs,
            useLayoutEffect: ps,
            useMemo: vs,
            useReducer: Lo,
            useRef: as,
            useState: function() {
                return Lo(Po)
            },
            useDebugValue: gs,
            useDeferredValue: function(e, t) {
                var n = ko();
                return W === null ? ys(n, e, t) : bs(n, W.memoizedState, e, t)
            },
            useTransition: function() {
                var e = Lo(Po)[0],
                    t = ko().memoizedState;
                return [typeof e == `boolean` ? e : jo(e), t]
            },
            useSyncExternalStore: Ro,
            useId: Ds,
            useHostTransitionStatus: Es,
            useFormState: rs,
            useActionState: rs,
            useOptimistic: function(e, t) {
                var n = ko();
                return W === null ? (n.baseState = e, [e, n.queue.dispatch]) : Go(n, W, e, t)
            },
            useMemoCache: No,
            useCacheRefresh: Os
        };
        Bs.useEffectEvent = ds;

        function Vs(e, t, n, r) {
            t = e.memoizedState, n = n(r, t), n = n == null ? t : f({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n)
        }
        var Hs = {
            enqueueSetState: function(e, t, n) {
                e = e._reactInternals;
                var r = pu(),
                    i = Ba(r);
                i.payload = t, n != null && (i.callback = n), t = Va(e, i, r), t !== null && (hu(t, e, r), Ha(t, e, r))
            },
            enqueueReplaceState: function(e, t, n) {
                e = e._reactInternals;
                var r = pu(),
                    i = Ba(r);
                i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Va(e, i, r), t !== null && (hu(t, e, r), Ha(t, e, r))
            },
            enqueueForceUpdate: function(e, t) {
                e = e._reactInternals;
                var n = pu(),
                    r = Ba(n);
                r.tag = 2, t != null && (r.callback = t), t = Va(e, r, n), t !== null && (hu(t, e, n), Ha(t, e, n))
            }
        };

        function Us(e, t, n, r, i, a, o) {
            return e = e.stateNode, typeof e.shouldComponentUpdate == `function` ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Sr(n, r) || !Sr(i, a) : !0
        }

        function Ws(e, t, n, r) {
            e = t.state, typeof t.componentWillReceiveProps == `function` && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == `function` && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Hs.enqueueReplaceState(t, t.state, null)
        }

        function Gs(e, t) {
            var n = t;
            if (`ref` in t)
                for (var r in n = {}, t) r !== `ref` && (n[r] = t[r]);
            if (e = e.defaultProps)
                for (var i in n === t && (n = f({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
            return n
        }

        function Ks(e) {
            Jr(e)
        }

        function qs(e) {
            console.error(e)
        }

        function Js(e) {
            Jr(e)
        }

        function Ys(e, t) {
            try {
                var n = e.onUncaughtError;
                n(t.value, {
                    componentStack: t.stack
                })
            } catch (e) {
                setTimeout(function() {
                    throw e
                })
            }
        }

        function Xs(e, t, n) {
            try {
                var r = e.onCaughtError;
                r(n.value, {
                    componentStack: n.stack,
                    errorBoundary: t.tag === 1 ? t.stateNode : null
                })
            } catch (e) {
                setTimeout(function() {
                    throw e
                })
            }
        }

        function Zs(e, t, n) {
            return n = Ba(n), n.tag = 3, n.payload = {
                element: null
            }, n.callback = function() {
                Ys(e, t)
            }, n
        }

        function Qs(e) {
            return e = Ba(e), e.tag = 3, e
        }

        function $s(e, t, n, r) {
            var i = n.type.getDerivedStateFromError;
            if (typeof i == `function`) {
                var a = r.value;
                e.payload = function() {
                    return i(a)
                }, e.callback = function() {
                    Xs(t, n, r)
                }
            }
            var o = n.stateNode;
            o !== null && typeof o.componentDidCatch == `function` && (e.callback = function() {
                Xs(t, n, r), typeof i != `function` && (ru === null ? ru = new Set([this]) : ru.add(this));
                var e = r.stack;
                this.componentDidCatch(r.value, {
                    componentStack: e === null ? `` : e
                })
            })
        }

        function ec(e, t, n, r, a) {
            if (n.flags |= 32768, typeof r == `object` && r && typeof r.then == `function`) {
                if (t = n.alternate, t !== null && Yi(t, n, a, !0), n = eo.current, n !== null) {
                    switch (n.tag) {
                        case 31:
                        case 13:
                            return to === null ? Du() : n.alternate === null && X === 0 && (X = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Sa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Gu(e, r, a)), !1;
                        case 22:
                            return n.flags |= 65536, r === Sa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
                                transitions: null,
                                markerInstances: null,
                                retryQueue: new Set([r])
                            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Gu(e, r, a)), !1
                    }
                    throw Error(i(435, n.tag))
                }
                return Gu(e, r, a), Du(), !1
            }
            if (H) return t = eo.current, t === null ? (r !== Pi && (t = Error(i(423), {
                cause: r
            }), Vi(gi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = gi(r, n), a = Zs(e.stateNode, r, a), Ua(e, a), X !== 4 && (X = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Pi && (e = Error(i(422), {
                cause: r
            }), Vi(gi(e, n)))), !1;
            var o = Error(i(520), {
                cause: r
            });
            if (o = gi(o, n), Xl === null ? Xl = [o] : Xl.push(o), X !== 4 && (X = 2), t === null) return !0;
            r = gi(r, n), n = t;
            do {
                switch (n.tag) {
                    case 3:
                        return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Zs(n.stateNode, r, e), Ua(n, e), !1;
                    case 1:
                        if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == `function` || o !== null && typeof o.componentDidCatch == `function` && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Qs(a), $s(a, e, n, r), Ua(n, a), !1
                }
                n = n.return
            } while (n !== null);
            return !1
        }
        var tc = Error(i(461)),
            nc = !1;

        function rc(e, t, n, r) {
            t.child = e === null ? Ia(t, null, n, r) : Fa(t, e.child, n, r)
        }

        function ic(e, t, n, r, i) {
            n = n.render;
            var a = t.ref;
            if (`ref` in r) {
                var o = {};
                for (var s in r) s !== `ref` && (o[s] = r[s])
            } else o = r;
            return Zi(t), r = xo(e, t, n, o, a, i), s = To(), e !== null && !nc ? (Eo(e, t, i), Oc(e, t, i)) : (H && s && Di(t), t.flags |= 1, rc(e, t, r, i), t.child)
        }

        function ac(e, t, n, r, i) {
            if (e === null) {
                var a = n.type;
                return typeof a == `function` && !si(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, oc(e, t, a, r, i)) : (e = ui(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e)
            }
            if (a = e.child, !kc(e, i)) {
                var o = a.memoizedProps;
                if (n = n.compare, n = n === null ? Sr : n, n(o, r) && e.ref === t.ref) return Oc(e, t, i)
            }
            return t.flags |= 1, e = ci(a, r), e.ref = t.ref, e.return = t, t.child = e
        }

        function oc(e, t, n, r, i) {
            if (e !== null) {
                var a = e.memoizedProps;
                if (Sr(a, r) && e.ref === t.ref)
                    if (nc = !1, t.pendingProps = r = a, kc(e, i)) e.flags & 131072 && (nc = !0);
                    else return t.lanes = e.lanes, Oc(e, t, i)
            }
            return mc(e, t, n, r, i)
        }

        function sc(e, t, n, r) {
            var i = r.children,
                a = e === null ? null : e.memoizedState;
            if (e === null && t.stateNode === null && (t.stateNode = {
                    _visibility: 1,
                    _pendingMarkers: null,
                    _retryCache: null,
                    _transitions: null
                }), r.mode === `hidden`) {
                if (t.flags & 128) {
                    if (a = a === null ? n : a.baseLanes | n, e !== null) {
                        for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
                        r = i & ~a
                    } else r = 0, t.child = null;
                    return lc(e, t, a, n, r)
                }
                if (n & 536870912) t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null
                }, e !== null && _a(t, a === null ? null : a.cachePool), a === null ? Qa() : Za(t, a), io(t);
                else return r = t.lanes = 536870912, lc(e, t, a === null ? n : a.baseLanes | n, n, r)
            } else a === null ? (e !== null && _a(t, null), Qa(), ao(t)) : (_a(t, a.cachePool), Za(t, a), ao(t), t.memoizedState = null);
            return rc(e, t, i, n), t.child
        }

        function cc(e, t) {
            return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
                _visibility: 1,
                _pendingMarkers: null,
                _retryCache: null,
                _transitions: null
            }), t.sibling
        }

        function lc(e, t, n, r, i) {
            var a = ga();
            return a = a === null ? null : {
                parent: ia._currentValue,
                pool: a
            }, t.memoizedState = {
                baseLanes: n,
                cachePool: a
            }, e !== null && _a(t, null), Qa(), io(t), e !== null && Yi(e, t, r, !0), t.childLanes = i, null
        }

        function uc(e, t) {
            return t = Cc({
                mode: t.mode,
                children: t.children
            }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t
        }

        function dc(e, t, n) {
            return Fa(t, e.child, null, n), e = uc(t, t.pendingProps), e.flags |= 2, oo(t), t.memoizedState = null, e
        }

        function fc(e, t, n) {
            var r = t.pendingProps,
                a = (t.flags & 128) != 0;
            if (t.flags &= -129, e === null) {
                if (H) {
                    if (r.mode === `hidden`) return e = uc(t, r), t.lanes = 536870912, cc(null, e);
                    if (ro(t), (e = ji) ? (e = af(e, Ni), e = e !== null && e.data === `&` ? e : null, e !== null && (t.memoizedState = {
                            dehydrated: e,
                            treeContext: Si === null ? null : {
                                id: Ci,
                                overflow: wi
                            },
                            retryLane: 536870912,
                            hydrationErrors: null
                        }, n = pi(e), n.return = t, t.child = n, Ai = t, ji = null)) : e = null, e === null) throw Fi(t);
                    return t.lanes = 536870912, null
                }
                return uc(t, r)
            }
            var o = e.memoizedState;
            if (o !== null) {
                var s = o.dehydrated;
                if (ro(t), a)
                    if (t.flags & 256) t.flags &= -257, t = dc(e, t, n);
                    else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
                else throw Error(i(558));
                else if (nc || Yi(e, t, n, !1), a = (n & e.childLanes) !== 0, nc || a) {
                    if (r = Bl, r !== null && (s = rt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ti(e, s), hu(r, e, s), tc;
                    Du(), t = dc(e, t, n)
                } else e = o.treeContext, ji = lf(s.nextSibling), Ai = t, H = !0, Mi = null, Ni = !1, e !== null && ki(t, e), t = uc(t, r), t.flags |= 4096;
                return t
            }
            return e = ci(e.child, {
                mode: r.mode,
                children: r.children
            }), e.ref = t.ref, t.child = e, e.return = t, e
        }

        function pc(e, t) {
            var n = t.ref;
            if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
            else {
                if (typeof n != `function` && typeof n != `object`) throw Error(i(284));
                (e === null || e.ref !== n) && (t.flags |= 4194816)
            }
        }

        function mc(e, t, n, r, i) {
            return Zi(t), n = xo(e, t, n, r, void 0, i), r = To(), e !== null && !nc ? (Eo(e, t, i), Oc(e, t, i)) : (H && r && Di(t), t.flags |= 1, rc(e, t, n, i), t.child)
        }

        function hc(e, t, n, r, i, a) {
            return Zi(t), t.updateQueue = null, n = Co(t, r, n, i), So(e), r = To(), e !== null && !nc ? (Eo(e, t, a), Oc(e, t, a)) : (H && r && Di(t), t.flags |= 1, rc(e, t, n, a), t.child)
        }

        function gc(e, t, n, r, i) {
            if (Zi(t), t.stateNode === null) {
                var a = ii,
                    o = n.contextType;
                typeof o == `object` && o && (a = Qi(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Hs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ra(t), o = n.contextType, a.context = typeof o == `object` && o ? Qi(o) : ii, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == `function` && (Vs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == `function` || typeof a.getSnapshotBeforeUpdate == `function` || typeof a.UNSAFE_componentWillMount != `function` && typeof a.componentWillMount != `function` || (o = a.state, typeof a.componentWillMount == `function` && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == `function` && a.UNSAFE_componentWillMount(), o !== a.state && Hs.enqueueReplaceState(a, a.state, null), Ka(t, r, a, i), Ga(), a.state = t.memoizedState), typeof a.componentDidMount == `function` && (t.flags |= 4194308), r = !0
            } else if (e === null) {
                a = t.stateNode;
                var s = t.memoizedProps,
                    c = Gs(n, s);
                a.props = c;
                var l = a.context,
                    u = n.contextType;
                o = ii, typeof u == `object` && u && (o = Qi(u));
                var d = n.getDerivedStateFromProps;
                u = typeof d == `function` || typeof a.getSnapshotBeforeUpdate == `function`, s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != `function` && typeof a.componentWillReceiveProps != `function` || (s || l !== o) && Ws(t, a, r, o), La = !1;
                var f = t.memoizedState;
                a.state = f, Ka(t, r, a, i), Ga(), l = t.memoizedState, s || f !== l || La ? (typeof d == `function` && (Vs(t, n, d, r), l = t.memoizedState), (c = La || Us(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != `function` && typeof a.componentWillMount != `function` || (typeof a.componentWillMount == `function` && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == `function` && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == `function` && (t.flags |= 4194308)) : (typeof a.componentDidMount == `function` && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == `function` && (t.flags |= 4194308), r = !1)
            } else {
                a = t.stateNode, za(e, t), o = t.memoizedProps, u = Gs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = ii, typeof l == `object` && l && (c = Qi(l)), s = n.getDerivedStateFromProps, (l = typeof s == `function` || typeof a.getSnapshotBeforeUpdate == `function`) || typeof a.UNSAFE_componentWillReceiveProps != `function` && typeof a.componentWillReceiveProps != `function` || (o !== d || f !== c) && Ws(t, a, r, c), La = !1, f = t.memoizedState, a.state = f, Ka(t, r, a, i), Ga();
                var p = t.memoizedState;
                o !== d || f !== p || La || e !== null && e.dependencies !== null && Xi(e.dependencies) ? (typeof s == `function` && (Vs(t, n, s, r), p = t.memoizedState), (u = La || Us(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Xi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != `function` && typeof a.componentWillUpdate != `function` || (typeof a.componentWillUpdate == `function` && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == `function` && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == `function` && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == `function` && (t.flags |= 1024)) : (typeof a.componentDidUpdate != `function` || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != `function` || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != `function` || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != `function` || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1)
            }
            return a = r, pc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != `function` ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Fa(t, e.child, null, i), t.child = Fa(t, null, n, i)) : rc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Oc(e, t, i), e
        }

        function _c(e, t, n, r) {
            return zi(), t.flags |= 256, rc(e, t, n, r), t.child
        }
        var vc = {
            dehydrated: null,
            treeContext: null,
            retryLane: 0,
            hydrationErrors: null
        };

        function yc(e) {
            return {
                baseLanes: e,
                cachePool: va()
            }
        }

        function bc(e, t, n) {
            return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e
        }

        function xc(e, t, n) {
            var r = t.pendingProps,
                a = !1,
                o = (t.flags & 128) != 0,
                s;
            if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (so.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
                if (H) {
                    if (a ? no(t) : ao(t), (e = ji) ? (e = af(e, Ni), e = e !== null && e.data !== `&` ? e : null, e !== null && (t.memoizedState = {
                            dehydrated: e,
                            treeContext: Si === null ? null : {
                                id: Ci,
                                overflow: wi
                            },
                            retryLane: 536870912,
                            hydrationErrors: null
                        }, n = pi(e), n.return = t, t.child = n, Ai = t, ji = null)) : e = null, e === null) throw Fi(t);
                    return sf(e) ? t.lanes = 32 : t.lanes = 536870912, null
                }
                var c = r.children;
                return r = r.fallback, a ? (ao(t), a = t.mode, c = Cc({
                    mode: `hidden`,
                    children: c
                }, a), r = di(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = yc(n), r.childLanes = bc(e, s, n), t.memoizedState = vc, cc(null, r)) : (no(t), Sc(t, c))
            }
            var l = e.memoizedState;
            if (l !== null && (c = l.dehydrated, c !== null)) {
                if (o) t.flags & 256 ? (no(t), t.flags &= -257, t = wc(e, t, n)) : t.memoizedState === null ? (ao(t), c = r.fallback, a = t.mode, r = Cc({
                    mode: `visible`,
                    children: r.children
                }, a), c = di(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Fa(t, e.child, null, n), r = t.child, r.memoizedState = yc(n), r.childLanes = bc(e, s, n), t.memoizedState = vc, t = cc(null, r)) : (ao(t), t.child = e.child, t.flags |= 128, t = null);
                else if (no(t), sf(c)) {
                    if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
                    s = u, r = Error(i(419)), r.stack = ``, r.digest = s, Vi({
                        value: r,
                        source: null,
                        stack: null
                    }), t = wc(e, t, n)
                } else if (nc || Yi(e, t, n, !1), s = (n & e.childLanes) !== 0, nc || s) {
                    if (s = Bl, s !== null && (r = rt(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ti(e, r), hu(s, e, r), tc;
                    of(c) || Du(), t = wc(e, t, n)
                } else of(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, ji = lf(c.nextSibling), Ai = t, H = !0, Mi = null, Ni = !1, e !== null && ki(t, e), t = Sc(t, r.children), t.flags |= 4096);
                return t
            }
            return a ? (ao(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = ci(l, {
                mode: `hidden`,
                children: r.children
            }), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = di(c, a, n, null), c.flags |= 2) : c = ci(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, cc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = yc(n) : (a = c.cachePool, a === null ? a = va() : (l = ia._currentValue, a = a.parent === l ? a : {
                parent: l,
                pool: l
            }), c = {
                baseLanes: c.baseLanes | n,
                cachePool: a
            }), r.memoizedState = c, r.childLanes = bc(e, s, n), t.memoizedState = vc, cc(e.child, r)) : (no(t), n = e.child, e = n.sibling, n = ci(n, {
                mode: `visible`,
                children: r.children
            }), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n)
        }

        function Sc(e, t) {
            return t = Cc({
                mode: `visible`,
                children: t
            }, e.mode), t.return = e, e.child = t
        }

        function Cc(e, t) {
            return e = oi(22, e, null, t), e.lanes = 0, e
        }

        function wc(e, t, n) {
            return Fa(t, e.child, null, n), e = Sc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
        }

        function Tc(e, t, n) {
            e.lanes |= t;
            var r = e.alternate;
            r !== null && (r.lanes |= t), qi(e.return, t, n)
        }

        function Ec(e, t, n, r, i, a) {
            var o = e.memoizedState;
            o === null ? e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: r,
                tail: n,
                tailMode: i,
                treeForkCount: a
            } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a)
        }

        function Dc(e, t, n) {
            var r = t.pendingProps,
                i = r.revealOrder,
                a = r.tail;
            r = r.children;
            var o = so.current,
                s = (o & 2) != 0;
            if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, O(so, o), rc(e, t, r, n), r = H ? yi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
                if (e.tag === 13) e.memoizedState !== null && Tc(e, n, t);
                else if (e.tag === 19) Tc(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e, e = e.child;
                    continue
                }
                if (e === t) break a;
                for (; e.sibling === null;) {
                    if (e.return === null || e.return === t) break a;
                    e = e.return
                }
                e.sibling.return = e.return, e = e.sibling
            }
            switch (i) {
                case `forwards`:
                    for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && co(e) === null && (i = n), n = n.sibling;
                    n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Ec(t, !1, i, n, a, r);
                    break;
                case `backwards`:
                case `unstable_legacy-backwards`:
                    for (n = null, i = t.child, t.child = null; i !== null;) {
                        if (e = i.alternate, e !== null && co(e) === null) {
                            t.child = i;
                            break
                        }
                        e = i.sibling, i.sibling = n, n = i, i = e
                    }
                    Ec(t, !0, n, null, a, r);
                    break;
                case `together`:
                    Ec(t, !1, null, null, void 0, r);
                    break;
                default:
                    t.memoizedState = null
            }
            return t.child
        }

        function Oc(e, t, n) {
            if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0)
                if (e !== null) {
                    if (Yi(e, t, n, !1), (n & t.childLanes) === 0) return null
                } else return null;
            if (e !== null && t.child !== e.child) throw Error(i(153));
            if (t.child !== null) {
                for (e = t.child, n = ci(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ci(e, e.pendingProps), n.return = t;
                n.sibling = null
            }
            return t.child
        }

        function kc(e, t) {
            return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Xi(e))) : !0
        }

        function Ac(e, t, n) {
            switch (t.tag) {
                case 3:
                    ye(t, t.stateNode.containerInfo), Gi(t, ia, e.memoizedState.cache), zi();
                    break;
                case 27:
                case 5:
                    xe(t);
                    break;
                case 4:
                    ye(t, t.stateNode.containerInfo);
                    break;
                case 10:
                    Gi(t, t.type, t.memoizedProps.value);
                    break;
                case 31:
                    if (t.memoizedState !== null) return t.flags |= 128, ro(t), null;
                    break;
                case 13:
                    var r = t.memoizedState;
                    if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (no(t), e = Oc(e, t, n), e === null ? null : e.sibling) : xc(e, t, n) : (no(t), t.flags |= 128, null);
                    no(t);
                    break;
                case 19:
                    var i = (e.flags & 128) != 0;
                    if (r = (n & t.childLanes) !== 0, r ||= (Yi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
                        if (r) return Dc(e, t, n);
                        t.flags |= 128
                    }
                    if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), O(so, so.current), r) break;
                    return null;
                case 22:
                    return t.lanes = 0, sc(e, t, n, t.pendingProps);
                case 24:
                    Gi(t, ia, e.memoizedState.cache)
            }
            return Oc(e, t, n)
        }

        function jc(e, t, n) {
            if (e !== null)
                if (e.memoizedProps !== t.pendingProps) nc = !0;
                else {
                    if (!kc(e, n) && !(t.flags & 128)) return nc = !1, Ac(e, t, n);
                    nc = !!(e.flags & 131072)
                }
            else nc = !1, H && t.flags & 1048576 && Ei(t, yi, t.index);
            switch (t.lanes = 0, t.tag) {
                case 16:
                    a: {
                        var r = t.pendingProps;
                        if (e = Ta(t.elementType), t.type = e, typeof e == `function`) si(e) ? (r = Gs(e, r), t.tag = 1, t = gc(null, t, e, r, n)) : (t.tag = 0, t = mc(null, t, e, r, n));
                        else {
                            if (e != null) {
                                var a = e.$$typeof;
                                if (a === x) {
                                    t.tag = 11, t = ic(null, t, e, r, n);
                                    break a
                                } else if (a === S) {
                                    t.tag = 14, t = ac(null, t, e, r, n);
                                    break a
                                }
                            }
                            throw t = oe(e) || e, Error(i(306, t, ``))
                        }
                    }
                    return t;
                case 0:
                    return mc(e, t, t.type, t.pendingProps, n);
                case 1:
                    return r = t.type, a = Gs(r, t.pendingProps), gc(e, t, r, a, n);
                case 3:
                    a: {
                        if (ye(t, t.stateNode.containerInfo), e === null) throw Error(i(387));r = t.pendingProps;
                        var o = t.memoizedState;a = o.element,
                        za(e, t),
                        Ka(t, r, null, n);
                        var s = t.memoizedState;
                        if (r = s.cache, Gi(t, ia, r), r !== o.cache && Ji(t, [ia], n, !0), Ga(), r = s.element, o.isDehydrated)
                            if (o = {
                                    element: r,
                                    isDehydrated: !1,
                                    cache: s.cache
                                }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
                                t = _c(e, t, r, n);
                                break a
                            } else if (r !== a) {
                            a = gi(Error(i(424)), t), Vi(a), t = _c(e, t, r, n);
                            break a
                        } else {
                            switch (e = t.stateNode.containerInfo, e.nodeType) {
                                case 9:
                                    e = e.body;
                                    break;
                                default:
                                    e = e.nodeName === `HTML` ? e.ownerDocument.body : e
                            }
                            for (ji = lf(e.firstChild), Ai = t, H = !0, Mi = null, Ni = !0, n = Ia(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling
                        } else {
                            if (zi(), r === a) {
                                t = Oc(e, t, n);
                                break a
                            }
                            rc(e, t, r, n)
                        }
                        t = t.child
                    }
                    return t;
                case 26:
                    return pc(e, t), e === null ? (n = Af(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : H || (n = t.type, e = t.pendingProps, r = Vd(_e.current).createElement(n), r[ct] = t, r[lt] = e, Fd(r, n, e), bt(r), t.stateNode = r) : t.memoizedState = Af(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
                case 27:
                    return xe(t), e === null && H && (r = t.stateNode = pf(t.type, t.pendingProps, _e.current), Ai = t, Ni = !0, a = ji, Qd(t.type) ? (uf = a, ji = lf(r.firstChild)) : ji = a), rc(e, t, t.pendingProps.children, n), pc(e, t), e === null && (t.flags |= 4194304), t.child;
                case 5:
                    return e === null && H && ((a = r = ji) && (r = nf(r, t.type, t.pendingProps, Ni), r === null ? a = !1 : (t.stateNode = r, Ai = t, ji = lf(r.firstChild), Ni = !1, a = !0)), a || Fi(t)), xe(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Wd(a, o) ? r = null : s !== null && Wd(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = xo(e, t, wo, null, null, n), $f._currentValue = a), pc(e, t), rc(e, t, r, n), t.child;
                case 6:
                    return e === null && H && ((e = n = ji) && (n = rf(n, t.pendingProps, Ni), n === null ? e = !1 : (t.stateNode = n, Ai = t, ji = null, e = !0)), e || Fi(t)), null;
                case 13:
                    return xc(e, t, n);
                case 4:
                    return ye(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Fa(t, null, r, n) : rc(e, t, r, n), t.child;
                case 11:
                    return ic(e, t, t.type, t.pendingProps, n);
                case 7:
                    return rc(e, t, t.pendingProps, n), t.child;
                case 8:
                    return rc(e, t, t.pendingProps.children, n), t.child;
                case 12:
                    return rc(e, t, t.pendingProps.children, n), t.child;
                case 10:
                    return r = t.pendingProps, Gi(t, t.type, r.value), rc(e, t, r.children, n), t.child;
                case 9:
                    return a = t.type._context, r = t.pendingProps.children, Zi(t), a = Qi(a), r = r(a), t.flags |= 1, rc(e, t, r, n), t.child;
                case 14:
                    return ac(e, t, t.type, t.pendingProps, n);
                case 15:
                    return oc(e, t, t.type, t.pendingProps, n);
                case 19:
                    return Dc(e, t, n);
                case 31:
                    return fc(e, t, n);
                case 22:
                    return sc(e, t, n, t.pendingProps);
                case 24:
                    return Zi(t), r = Qi(ia), e === null ? (a = ga(), a === null && (a = Bl, o = aa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
                        parent: r,
                        cache: a
                    }, Ra(t), Gi(t, ia, a)) : ((e.lanes & n) !== 0 && (za(e, t), Ka(t, null, null, n), Ga()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Gi(t, ia, r), r !== a.cache && Ji(t, [ia], n, !0)) : (a = {
                        parent: r,
                        cache: r
                    }, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Gi(t, ia, r))), rc(e, t, t.pendingProps.children, n), t.child;
                case 29:
                    throw t.pendingProps
            }
            throw Error(i(156, t.tag))
        }

        function Mc(e) {
            e.flags |= 4
        }

        function Nc(e, t, n, r, i) {
            if ((t = (e.mode & 32) != 0) && (t = !1), t) {
                if (e.flags |= 16777216, (i & 335544128) === i)
                    if (e.stateNode.complete) e.flags |= 8192;
                    else if (wu()) e.flags |= 8192;
                else throw Ea = Sa, ba
            } else e.flags &= -16777217
        }

        function Pc(e, t) {
            if (t.type !== `stylesheet` || t.state.loading & 4) e.flags &= -16777217;
            else if (e.flags |= 16777216, !Gf(t))
                if (wu()) e.flags |= 8192;
                else throw Ea = Sa, ba
        }

        function Fc(e, t) {
            t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Ze(), e.lanes |= t, Yl |= t)
        }

        function Ic(e, t) {
            if (!H) switch (e.tailMode) {
                case `hidden`:
                    t = e.tail;
                    for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
                    n === null ? e.tail = null : n.sibling = null;
                    break;
                case `collapsed`:
                    n = e.tail;
                    for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
                    r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
            }
        }

        function Lc(e) {
            var t = e.alternate !== null && e.alternate.child === e.child,
                n = 0,
                r = 0;
            if (t)
                for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
            else
                for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
            return e.subtreeFlags |= r, e.childLanes = n, t
        }

        function Rc(e, t, n) {
            var r = t.pendingProps;
            switch (Oi(t), t.tag) {
                case 16:
                case 15:
                case 0:
                case 11:
                case 7:
                case 8:
                case 12:
                case 9:
                case 14:
                    return Lc(t), null;
                case 1:
                    return Lc(t), null;
                case 3:
                    return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Ki(ia), be(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ri(t) ? Mc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Bi())), Lc(t), null;
                case 26:
                    var a = t.type,
                        o = t.memoizedState;
                    return e === null ? (Mc(t), o === null ? (Lc(t), Nc(t, a, null, r, n)) : (Lc(t), Pc(t, o))) : o ? o === e.memoizedState ? (Lc(t), t.flags &= -16777217) : (Mc(t), Lc(t), Pc(t, o)) : (e = e.memoizedProps, e !== r && Mc(t), Lc(t), Nc(t, a, e, r, n)), null;
                case 27:
                    if (Se(t), n = _e.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Mc(t);
                    else {
                        if (!r) {
                            if (t.stateNode === null) throw Error(i(166));
                            return Lc(t), null
                        }
                        e = he.current, Ri(t) ? Ii(t, e) : (e = pf(a, r, n), t.stateNode = e, Mc(t))
                    }
                    return Lc(t), null;
                case 5:
                    if (Se(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Mc(t);
                    else {
                        if (!r) {
                            if (t.stateNode === null) throw Error(i(166));
                            return Lc(t), null
                        }
                        if (o = he.current, Ri(t)) Ii(t, o);
                        else {
                            var s = Vd(_e.current);
                            switch (o) {
                                case 1:
                                    o = s.createElementNS(`http://www.w3.org/2000/svg`, a);
                                    break;
                                case 2:
                                    o = s.createElementNS(`http://www.w3.org/1998/Math/MathML`, a);
                                    break;
                                default:
                                    switch (a) {
                                        case `svg`:
                                            o = s.createElementNS(`http://www.w3.org/2000/svg`, a);
                                            break;
                                        case `math`:
                                            o = s.createElementNS(`http://www.w3.org/1998/Math/MathML`, a);
                                            break;
                                        case `script`:
                                            o = s.createElement(`div`), o.innerHTML = `<script><\/script>`, o = o.removeChild(o.firstChild);
                                            break;
                                        case `select`:
                                            o = typeof r.is == `string` ? s.createElement(`select`, {
                                                is: r.is
                                            }) : s.createElement(`select`), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
                                            break;
                                        default:
                                            o = typeof r.is == `string` ? s.createElement(a, {
                                                is: r.is
                                            }) : s.createElement(a)
                                    }
                            }
                            o[ct] = t, o[lt] = r;
                            a: for (s = t.child; s !== null;) {
                                if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
                                else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                                    s.child.return = s, s = s.child;
                                    continue
                                }
                                if (s === t) break a;
                                for (; s.sibling === null;) {
                                    if (s.return === null || s.return === t) break a;
                                    s = s.return
                                }
                                s.sibling.return = s.return, s = s.sibling
                            }
                            t.stateNode = o;
                            a: switch (Fd(o, a, r), a) {
                                case `button`:
                                case `input`:
                                case `select`:
                                case `textarea`:
                                    r = !!r.autoFocus;
                                    break a;
                                case `img`:
                                    r = !0;
                                    break a;
                                default:
                                    r = !1
                            }
                            r && Mc(t)
                        }
                    }
                    return Lc(t), Nc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
                case 6:
                    if (e && t.stateNode != null) e.memoizedProps !== r && Mc(t);
                    else {
                        if (typeof r != `string` && t.stateNode === null) throw Error(i(166));
                        if (e = _e.current, Ri(t)) {
                            if (e = t.stateNode, n = t.memoizedProps, r = null, a = Ai, a !== null) switch (a.tag) {
                                case 27:
                                case 5:
                                    r = a.memoizedProps
                            }
                            e[ct] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Fi(t, !0)
                        } else e = Vd(e).createTextNode(r), e[ct] = t, t.stateNode = e
                    }
                    return Lc(t), null;
                case 31:
                    if (n = t.memoizedState, e === null || e.memoizedState !== null) {
                        if (r = Ri(t), n !== null) {
                            if (e === null) {
                                if (!r) throw Error(i(318));
                                if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
                                e[ct] = t
                            } else zi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
                            Lc(t), e = !1
                        } else n = Bi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
                        if (!e) return t.flags & 256 ? (oo(t), t) : (oo(t), null);
                        if (t.flags & 128) throw Error(i(558))
                    }
                    return Lc(t), null;
                case 13:
                    if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                        if (a = Ri(t), r !== null && r.dehydrated !== null) {
                            if (e === null) {
                                if (!a) throw Error(i(318));
                                if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
                                a[ct] = t
                            } else zi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
                            Lc(t), a = !1
                        } else a = Bi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
                        if (!a) return t.flags & 256 ? (oo(t), t) : (oo(t), null)
                    }
                    return oo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Fc(t, t.updateQueue), Lc(t), null);
                case 4:
                    return be(), e === null && Sd(t.stateNode.containerInfo), Lc(t), null;
                case 10:
                    return Ki(t.type), Lc(t), null;
                case 19:
                    if (D(so), r = t.memoizedState, r === null) return Lc(t), null;
                    if (a = (t.flags & 128) != 0, o = r.rendering, o === null)
                        if (a) Ic(r, !1);
                        else {
                            if (X !== 0 || e !== null && e.flags & 128)
                                for (e = t.child; e !== null;) {
                                    if (o = co(e), o !== null) {
                                        for (t.flags |= 128, Ic(r, !1), e = o.updateQueue, t.updateQueue = e, Fc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) li(n, e), n = n.sibling;
                                        return O(so, so.current & 1 | 2), H && Ti(t, r.treeForkCount), t.child
                                    }
                                    e = e.sibling
                                }
                            r.tail !== null && Pe() > tu && (t.flags |= 128, a = !0, Ic(r, !1), t.lanes = 4194304)
                        }
                    else {
                        if (!a)
                            if (e = co(o), e !== null) {
                                if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Fc(t, e), Ic(r, !0), r.tail === null && r.tailMode === `hidden` && !o.alternate && !H) return Lc(t), null
                            } else 2 * Pe() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, Ic(r, !1), t.lanes = 4194304);
                        r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o)
                    }
                    return r.tail === null ? (Lc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Pe(), e.sibling = null, n = so.current, O(so, a ? n & 1 | 2 : n & 1), H && Ti(t, r.treeForkCount), e);
                case 22:
                case 23:
                    return oo(t), $a(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Lc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Lc(t), n = t.updateQueue, n !== null && Fc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && D(ha), null;
                case 24:
                    return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Ki(ia), Lc(t), null;
                case 25:
                    return null;
                case 30:
                    return null
            }
            throw Error(i(156, t.tag))
        }

        function zc(e, t) {
            switch (Oi(t), t.tag) {
                case 1:
                    return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 3:
                    return Ki(ia), be(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
                case 26:
                case 27:
                case 5:
                    return Se(t), null;
                case 31:
                    if (t.memoizedState !== null) {
                        if (oo(t), t.alternate === null) throw Error(i(340));
                        zi()
                    }
                    return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 13:
                    if (oo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                        if (t.alternate === null) throw Error(i(340));
                        zi()
                    }
                    return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 19:
                    return D(so), null;
                case 4:
                    return be(), null;
                case 10:
                    return Ki(t.type), null;
                case 22:
                case 23:
                    return oo(t), $a(), e !== null && D(ha), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 24:
                    return Ki(ia), null;
                case 25:
                    return null;
                default:
                    return null
            }
        }

        function Bc(e, t) {
            switch (Oi(t), t.tag) {
                case 3:
                    Ki(ia), be();
                    break;
                case 26:
                case 27:
                case 5:
                    Se(t);
                    break;
                case 4:
                    be();
                    break;
                case 31:
                    t.memoizedState !== null && oo(t);
                    break;
                case 13:
                    oo(t);
                    break;
                case 19:
                    D(so);
                    break;
                case 10:
                    Ki(t.type);
                    break;
                case 22:
                case 23:
                    oo(t), $a(), e !== null && D(ha);
                    break;
                case 24:
                    Ki(ia)
            }
        }

        function Vc(e, t) {
            try {
                var n = t.updateQueue,
                    r = n === null ? null : n.lastEffect;
                if (r !== null) {
                    var i = r.next;
                    n = i;
                    do {
                        if ((n.tag & e) === e) {
                            r = void 0;
                            var a = n.create,
                                o = n.inst;
                            r = a(), o.destroy = r
                        }
                        n = n.next
                    } while (n !== i)
                }
            } catch (e) {
                Z(t, t.return, e)
            }
        }

        function Hc(e, t, n) {
            try {
                var r = t.updateQueue,
                    i = r === null ? null : r.lastEffect;
                if (i !== null) {
                    var a = i.next;
                    r = a;
                    do {
                        if ((r.tag & e) === e) {
                            var o = r.inst,
                                s = o.destroy;
                            if (s !== void 0) {
                                o.destroy = void 0, i = t;
                                var c = n,
                                    l = s;
                                try {
                                    l()
                                } catch (e) {
                                    Z(i, c, e)
                                }
                            }
                        }
                        r = r.next
                    } while (r !== a)
                }
            } catch (e) {
                Z(t, t.return, e)
            }
        }

        function Uc(e) {
            var t = e.updateQueue;
            if (t !== null) {
                var n = e.stateNode;
                try {
                    Ja(t, n)
                } catch (t) {
                    Z(e, e.return, t)
                }
            }
        }

        function Wc(e, t, n) {
            n.props = Gs(e.type, e.memoizedProps), n.state = e.memoizedState;
            try {
                n.componentWillUnmount()
            } catch (n) {
                Z(e, t, n)
            }
        }

        function Gc(e, t) {
            try {
                var n = e.ref;
                if (n !== null) {
                    switch (e.tag) {
                        case 26:
                        case 27:
                        case 5:
                            var r = e.stateNode;
                            break;
                        case 30:
                            r = e.stateNode;
                            break;
                        default:
                            r = e.stateNode
                    }
                    typeof n == `function` ? e.refCleanup = n(r) : n.current = r
                }
            } catch (n) {
                Z(e, t, n)
            }
        }

        function Kc(e, t) {
            var n = e.ref,
                r = e.refCleanup;
            if (n !== null)
                if (typeof r == `function`) try {
                    r()
                } catch (n) {
                    Z(e, t, n)
                } finally {
                    e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null)
                } else if (typeof n == `function`) try {
                    n(null)
                } catch (n) {
                    Z(e, t, n)
                } else n.current = null
        }

        function qc(e) {
            var t = e.type,
                n = e.memoizedProps,
                r = e.stateNode;
            try {
                a: switch (t) {
                    case `button`:
                    case `input`:
                    case `select`:
                    case `textarea`:
                        n.autoFocus && r.focus();
                        break a;
                    case `img`:
                        n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet)
                }
            }
            catch (t) {
                Z(e, e.return, t)
            }
        }

        function Jc(e, t, n) {
            try {
                var r = e.stateNode;
                Id(r, e.type, n, t), r[lt] = t
            } catch (t) {
                Z(e, e.return, t)
            }
        }

        function Yc(e) {
            return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Qd(e.type) || e.tag === 4
        }

        function Xc(e) {
            a: for (;;) {
                for (; e.sibling === null;) {
                    if (e.return === null || Yc(e.return)) return null;
                    e = e.return
                }
                for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
                    if (e.tag === 27 && Qd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
                    e.child.return = e, e = e.child
                }
                if (!(e.flags & 2)) return e.stateNode
            }
        }

        function Zc(e, t, n) {
            var r = e.tag;
            if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === `HTML` ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === `HTML` ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Qt));
            else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
                for (Zc(e, t, n), e = e.sibling; e !== null;) Zc(e, t, n), e = e.sibling
        }

        function Qc(e, t, n) {
            var r = e.tag;
            if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
            else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode), e = e.child, e !== null))
                for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling
        }

        function $c(e) {
            var t = e.stateNode,
                n = e.memoizedProps;
            try {
                for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
                Fd(t, r, n), t[ct] = e, t[lt] = n
            } catch (t) {
                Z(e, e.return, t)
            }
        }
        var el = !1,
            tl = !1,
            nl = !1,
            rl = typeof WeakSet == `function` ? WeakSet : Set,
            il = null;

        function al(e, t) {
            if (e = e.containerInfo, zd = cp, e = Er(e), Dr(e)) {
                if (`selectionStart` in e) var n = {
                    start: e.selectionStart,
                    end: e.selectionEnd
                };
                else a: {
                    n = (n = e.ownerDocument) && n.defaultView || window;
                    var r = n.getSelection && n.getSelection();
                    if (r && r.rangeCount !== 0) {
                        n = r.anchorNode;
                        var a = r.anchorOffset,
                            o = r.focusNode;
                        r = r.focusOffset;
                        try {
                            n.nodeType, o.nodeType
                        } catch {
                            n = null;
                            break a
                        }
                        var s = 0,
                            c = -1,
                            l = -1,
                            u = 0,
                            d = 0,
                            f = e,
                            p = null;
                        b: for (;;) {
                            for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
                            for (;;) {
                                if (f === e) break b;
                                if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
                                f = p, p = f.parentNode
                            }
                            f = m
                        }
                        n = c === -1 || l === -1 ? null : {
                            start: c,
                            end: l
                        }
                    } else n = null
                }
                n ||= {
                    start: 0,
                    end: 0
                }
            } else n = null;
            for (Bd = {
                    focusedElem: e,
                    selectionRange: n
                }, cp = !1, il = t; il !== null;)
                if (t = il, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, il = e;
                else
                    for (; il !== null;) {
                        switch (t = il, o = t.alternate, e = t.flags, t.tag) {
                            case 0:
                                if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null))
                                    for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
                                break;
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (e & 1024 && o !== null) {
                                    e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
                                    try {
                                        var h = Gs(n.type, a);
                                        e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e
                                    } catch (e) {
                                        Z(n, n.return, e)
                                    }
                                }
                                break;
                            case 3:
                                if (e & 1024) {
                                    if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) tf(e);
                                    else if (n === 1) switch (e.nodeName) {
                                        case `HEAD`:
                                        case `HTML`:
                                        case `BODY`:
                                            tf(e);
                                            break;
                                        default:
                                            e.textContent = ``
                                    }
                                }
                                break;
                            case 5:
                            case 26:
                            case 27:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                if (e & 1024) throw Error(i(163))
                        }
                        if (e = t.sibling, e !== null) {
                            e.return = t.return, il = e;
                            break
                        }
                        il = t.return
                    }
        }

        function ol(e, t, n) {
            var r = n.flags;
            switch (n.tag) {
                case 0:
                case 11:
                case 15:
                    xl(e, n), r & 4 && Vc(5, n);
                    break;
                case 1:
                    if (xl(e, n), r & 4)
                        if (e = n.stateNode, t === null) try {
                            e.componentDidMount()
                        } catch (e) {
                            Z(n, n.return, e)
                        } else {
                            var i = Gs(n.type, t.memoizedProps);
                            t = t.memoizedState;
                            try {
                                e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate)
                            } catch (e) {
                                Z(n, n.return, e)
                            }
                        }
                    r & 64 && Uc(n), r & 512 && Gc(n, n.return);
                    break;
                case 3:
                    if (xl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
                        if (t = null, n.child !== null) switch (n.child.tag) {
                            case 27:
                            case 5:
                                t = n.child.stateNode;
                                break;
                            case 1:
                                t = n.child.stateNode
                        }
                        try {
                            Ja(e, t)
                        } catch (e) {
                            Z(n, n.return, e)
                        }
                    }
                    break;
                case 27:
                    t === null && r & 4 && $c(n);
                case 26:
                case 5:
                    xl(e, n), t === null && r & 4 && qc(n), r & 512 && Gc(n, n.return);
                    break;
                case 12:
                    xl(e, n);
                    break;
                case 31:
                    xl(e, n), r & 4 && fl(e, n);
                    break;
                case 13:
                    xl(e, n), r & 4 && pl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), cf(e, n))));
                    break;
                case 22:
                    if (r = n.memoizedState !== null || el, !r) {
                        t = t !== null && t.memoizedState !== null || tl, i = el;
                        var a = tl;
                        el = r, (tl = t) && !a ? Cl(e, n, (n.subtreeFlags & 8772) != 0) : xl(e, n), el = i, tl = a
                    }
                    break;
                case 30:
                    break;
                default:
                    xl(e, n)
            }
        }

        function sl(e) {
            var t = e.alternate;
            t !== null && (e.alternate = null, sl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && L(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
        }
        var cl = null,
            ll = !1;

        function ul(e, t, n) {
            for (n = n.child; n !== null;) dl(e, t, n), n = n.sibling
        }

        function dl(e, t, n) {
            if (ze && typeof ze.onCommitFiberUnmount == `function`) try {
                ze.onCommitFiberUnmount(Re, n)
            } catch {}
            switch (n.tag) {
                case 26:
                    tl || Kc(n, t), ul(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
                    break;
                case 27:
                    tl || Kc(n, t);
                    var r = cl,
                        i = ll;
                    Qd(n.type) && (cl = n.stateNode, ll = !1), ul(e, t, n), mf(n.stateNode), cl = r, ll = i;
                    break;
                case 5:
                    tl || Kc(n, t);
                case 6:
                    if (r = cl, i = ll, cl = null, ul(e, t, n), cl = r, ll = i, cl !== null)
                        if (ll) try {
                            (cl.nodeType === 9 ? cl.body : cl.nodeName === `HTML` ? cl.ownerDocument.body : cl).removeChild(n.stateNode)
                        } catch (e) {
                            Z(n, t, e)
                        } else try {
                            cl.removeChild(n.stateNode)
                        } catch (e) {
                            Z(n, t, e)
                        }
                    break;
                case 18:
                    cl !== null && (ll ? (e = cl, $d(e.nodeType === 9 ? e.body : e.nodeName === `HTML` ? e.ownerDocument.body : e, n.stateNode), Pp(e)) : $d(cl, n.stateNode));
                    break;
                case 4:
                    r = cl, i = ll, cl = n.stateNode.containerInfo, ll = !0, ul(e, t, n), cl = r, ll = i;
                    break;
                case 0:
                case 11:
                case 14:
                case 15:
                    Hc(2, n, t), tl || Hc(4, n, t), ul(e, t, n);
                    break;
                case 1:
                    tl || (Kc(n, t), r = n.stateNode, typeof r.componentWillUnmount == `function` && Wc(n, t, r)), ul(e, t, n);
                    break;
                case 21:
                    ul(e, t, n);
                    break;
                case 22:
                    tl = (r = tl) || n.memoizedState !== null, ul(e, t, n), tl = r;
                    break;
                default:
                    ul(e, t, n)
            }
        }

        function fl(e, t) {
            if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
                e = e.dehydrated;
                try {
                    Pp(e)
                } catch (e) {
                    Z(t, t.return, e)
                }
            }
        }

        function pl(e, t) {
            if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
                Pp(e)
            } catch (e) {
                Z(t, t.return, e)
            }
        }

        function ml(e) {
            switch (e.tag) {
                case 31:
                case 13:
                case 19:
                    var t = e.stateNode;
                    return t === null && (t = e.stateNode = new rl), t;
                case 22:
                    return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new rl), t;
                default:
                    throw Error(i(435, e.tag))
            }
        }

        function hl(e, t) {
            var n = ml(e);
            t.forEach(function(t) {
                if (!n.has(t)) {
                    n.add(t);
                    var r = Yu.bind(null, e, t);
                    t.then(r, r)
                }
            })
        }

        function gl(e, t) {
            var n = t.deletions;
            if (n !== null)
                for (var r = 0; r < n.length; r++) {
                    var a = n[r],
                        o = e,
                        s = t,
                        c = s;
                    a: for (; c !== null;) {
                        switch (c.tag) {
                            case 27:
                                if (Qd(c.type)) {
                                    cl = c.stateNode, ll = !1;
                                    break a
                                }
                                break;
                            case 5:
                                cl = c.stateNode, ll = !1;
                                break a;
                            case 3:
                            case 4:
                                cl = c.stateNode.containerInfo, ll = !0;
                                break a
                        }
                        c = c.return
                    }
                    if (cl === null) throw Error(i(160));
                    dl(o, s, a), cl = null, ll = !1, o = a.alternate, o !== null && (o.return = null), a.return = null
                }
            if (t.subtreeFlags & 13886)
                for (t = t.child; t !== null;) vl(t, e), t = t.sibling
        }
        var _l = null;

        function vl(e, t) {
            var n = e.alternate,
                r = e.flags;
            switch (e.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                    gl(t, e), yl(e), r & 4 && (Hc(3, e, e.return), Vc(3, e), Hc(5, e, e.return));
                    break;
                case 1:
                    gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 64 && el && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
                    break;
                case 26:
                    var a = _l;
                    if (gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 4) {
                        var o = n === null ? null : n.memoizedState;
                        if (r = e.memoizedState, n === null)
                            if (r === null)
                                if (e.stateNode === null) {
                                    a: {
                                        r = e.type,
                                        n = e.memoizedProps,
                                        a = a.ownerDocument || a;b: switch (r) {
                                            case `title`:
                                                o = a.getElementsByTagName(`title`)[0], (!o || o[ht] || o[ct] || o.namespaceURI === `http://www.w3.org/2000/svg` || o.hasAttribute(`itemprop`)) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector(`head > title`))), Fd(o, r, n), o[ct] = e, bt(o), r = o;
                                                break a;
                                            case `link`:
                                                var s = Hf(`link`, `href`, a).get(r + (n.href || ``));
                                                if (s) {
                                                    for (var c = 0; c < s.length; c++)
                                                        if (o = s[c], o.getAttribute(`href`) === (n.href == null || n.href === `` ? null : n.href) && o.getAttribute(`rel`) === (n.rel == null ? null : n.rel) && o.getAttribute(`title`) === (n.title == null ? null : n.title) && o.getAttribute(`crossorigin`) === (n.crossOrigin == null ? null : n.crossOrigin)) {
                                                            s.splice(c, 1);
                                                            break b
                                                        }
                                                }
                                                o = a.createElement(r), Fd(o, r, n), a.head.appendChild(o);
                                                break;
                                            case `meta`:
                                                if (s = Hf(`meta`, `content`, a).get(r + (n.content || ``))) {
                                                    for (c = 0; c < s.length; c++)
                                                        if (o = s[c], o.getAttribute(`content`) === (n.content == null ? null : `` + n.content) && o.getAttribute(`name`) === (n.name == null ? null : n.name) && o.getAttribute(`property`) === (n.property == null ? null : n.property) && o.getAttribute(`http-equiv`) === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute(`charset`) === (n.charSet == null ? null : n.charSet)) {
                                                            s.splice(c, 1);
                                                            break b
                                                        }
                                                }
                                                o = a.createElement(r), Fd(o, r, n), a.head.appendChild(o);
                                                break;
                                            default:
                                                throw Error(i(468, r))
                                        }
                                        o[ct] = e,
                                        bt(o),
                                        r = o
                                    }
                                    e.stateNode = r
                                }
                        else Uf(a, e.type, e.stateNode);
                        else e.stateNode = Lf(a, r, e.memoizedProps);
                        else o === r ? r === null && e.stateNode !== null && Jc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Uf(a, e.type, e.stateNode) : Lf(a, r, e.memoizedProps))
                    }
                    break;
                case 27:
                    gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), n !== null && r & 4 && Jc(e, e.memoizedProps, n.memoizedProps);
                    break;
                case 5:
                    if (gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), e.flags & 32) {
                        a = e.stateNode;
                        try {
                            Wt(a, ``)
                        } catch (t) {
                            Z(e, e.return, t)
                        }
                    }
                    r & 4 && e.stateNode != null && (a = e.memoizedProps, Jc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (nl = !0);
                    break;
                case 6:
                    if (gl(t, e), yl(e), r & 4) {
                        if (e.stateNode === null) throw Error(i(162));
                        r = e.memoizedProps, n = e.stateNode;
                        try {
                            n.nodeValue = r
                        } catch (t) {
                            Z(e, e.return, t)
                        }
                    }
                    break;
                case 3:
                    if (Vf = null, a = _l, _l = _f(t.containerInfo), gl(t, e), _l = a, yl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
                        Pp(t.containerInfo)
                    } catch (t) {
                        Z(e, e.return, t)
                    }
                    nl && (nl = !1, bl(e));
                    break;
                case 4:
                    r = _l, _l = _f(e.stateNode.containerInfo), gl(t, e), yl(e), _l = r;
                    break;
                case 12:
                    gl(t, e), yl(e);
                    break;
                case 31:
                    gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
                    break;
                case 13:
                    gl(t, e), yl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = Pe()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
                    break;
                case 22:
                    a = e.memoizedState !== null;
                    var l = n !== null && n.memoizedState !== null,
                        u = el,
                        d = tl;
                    if (el = u || a, tl = d || l, gl(t, e), tl = d, el = u, yl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || el || tl || Sl(e)), n = null, t = e;;) {
                        if (t.tag === 5 || t.tag === 26) {
                            if (n === null) {
                                l = n = t;
                                try {
                                    if (o = l.stateNode, a) s = o.style, typeof s.setProperty == `function` ? s.setProperty(`display`, `none`, `important`) : s.display = `none`;
                                    else {
                                        c = l.stateNode;
                                        var f = l.memoizedProps.style,
                                            p = f != null && f.hasOwnProperty(`display`) ? f.display : null;
                                        c.style.display = p == null || typeof p == `boolean` ? `` : (`` + p).trim()
                                    }
                                } catch (e) {
                                    Z(l, l.return, e)
                                }
                            }
                        } else if (t.tag === 6) {
                            if (n === null) {
                                l = t;
                                try {
                                    l.stateNode.nodeValue = a ? `` : l.memoizedProps
                                } catch (e) {
                                    Z(l, l.return, e)
                                }
                            }
                        } else if (t.tag === 18) {
                            if (n === null) {
                                l = t;
                                try {
                                    var m = l.stateNode;
                                    a ? ef(m, !0) : ef(l.stateNode, !1)
                                } catch (e) {
                                    Z(l, l.return, e)
                                }
                            }
                        } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                            t.child.return = t, t = t.child;
                            continue
                        }
                        if (t === e) break a;
                        for (; t.sibling === null;) {
                            if (t.return === null || t.return === e) break a;
                            n === t && (n = null), t = t.return
                        }
                        n === t && (n = null), t.sibling.return = t.return, t = t.sibling
                    }
                    r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, hl(e, n))));
                    break;
                case 19:
                    gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
                    break;
                case 30:
                    break;
                case 21:
                    break;
                default:
                    gl(t, e), yl(e)
            }
        }

        function yl(e) {
            var t = e.flags;
            if (t & 2) {
                try {
                    for (var n, r = e.return; r !== null;) {
                        if (Yc(r)) {
                            n = r;
                            break
                        }
                        r = r.return
                    }
                    if (n == null) throw Error(i(160));
                    switch (n.tag) {
                        case 27:
                            var a = n.stateNode;
                            Qc(e, Xc(e), a);
                            break;
                        case 5:
                            var o = n.stateNode;
                            n.flags & 32 && (Wt(o, ``), n.flags &= -33), Qc(e, Xc(e), o);
                            break;
                        case 3:
                        case 4:
                            var s = n.stateNode.containerInfo;
                            Zc(e, Xc(e), s);
                            break;
                        default:
                            throw Error(i(161))
                    }
                } catch (t) {
                    Z(e, e.return, t)
                }
                e.flags &= -3
            }
            t & 4096 && (e.flags &= -4097)
        }

        function bl(e) {
            if (e.subtreeFlags & 1024)
                for (e = e.child; e !== null;) {
                    var t = e;
                    bl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling
                }
        }

        function xl(e, t) {
            if (t.subtreeFlags & 8772)
                for (t = t.child; t !== null;) ol(e, t.alternate, t), t = t.sibling
        }

        function Sl(e) {
            for (e = e.child; e !== null;) {
                var t = e;
                switch (t.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                        Hc(4, t, t.return), Sl(t);
                        break;
                    case 1:
                        Kc(t, t.return);
                        var n = t.stateNode;
                        typeof n.componentWillUnmount == `function` && Wc(t, t.return, n), Sl(t);
                        break;
                    case 27:
                        mf(t.stateNode);
                    case 26:
                    case 5:
                        Kc(t, t.return), Sl(t);
                        break;
                    case 22:
                        t.memoizedState === null && Sl(t);
                        break;
                    case 30:
                        Sl(t);
                        break;
                    default:
                        Sl(t)
                }
                e = e.sibling
            }
        }

        function Cl(e, t, n) {
            for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
                var r = t.alternate,
                    i = e,
                    a = t,
                    o = a.flags;
                switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Cl(i, a, n), Vc(4, a);
                        break;
                    case 1:
                        if (Cl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == `function`) try {
                            i.componentDidMount()
                        } catch (e) {
                            Z(r, r.return, e)
                        }
                        if (r = a, i = r.updateQueue, i !== null) {
                            var s = r.stateNode;
                            try {
                                var c = i.shared.hiddenCallbacks;
                                if (c !== null)
                                    for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) qa(c[i], s)
                            } catch (e) {
                                Z(r, r.return, e)
                            }
                        }
                        n && o & 64 && Uc(a), Gc(a, a.return);
                        break;
                    case 27:
                        $c(a);
                    case 26:
                    case 5:
                        Cl(i, a, n), n && r === null && o & 4 && qc(a), Gc(a, a.return);
                        break;
                    case 12:
                        Cl(i, a, n);
                        break;
                    case 31:
                        Cl(i, a, n), n && o & 4 && fl(i, a);
                        break;
                    case 13:
                        Cl(i, a, n), n && o & 4 && pl(i, a);
                        break;
                    case 22:
                        a.memoizedState === null && Cl(i, a, n), Gc(a, a.return);
                        break;
                    case 30:
                        break;
                    default:
                        Cl(i, a, n)
                }
                t = t.sibling
            }
        }

        function wl(e, t) {
            var n = null;
            e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && oa(n))
        }

        function Tl(e, t) {
            e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && oa(e))
        }

        function El(e, t, n, r) {
            if (t.subtreeFlags & 10256)
                for (t = t.child; t !== null;) Dl(e, t, n, r), t = t.sibling
        }

        function Dl(e, t, n, r) {
            var i = t.flags;
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    El(e, t, n, r), i & 2048 && Vc(9, t);
                    break;
                case 1:
                    El(e, t, n, r);
                    break;
                case 3:
                    El(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && oa(e)));
                    break;
                case 12:
                    if (i & 2048) {
                        El(e, t, n, r), e = t.stateNode;
                        try {
                            var a = t.memoizedProps,
                                o = a.id,
                                s = a.onPostCommit;
                            typeof s == `function` && s(o, t.alternate === null ? `mount` : `update`, e.passiveEffectDuration, -0)
                        } catch (e) {
                            Z(t, t.return, e)
                        }
                    } else El(e, t, n, r);
                    break;
                case 31:
                    El(e, t, n, r);
                    break;
                case 13:
                    El(e, t, n, r);
                    break;
                case 23:
                    break;
                case 22:
                    a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? El(e, t, n, r) : (a._visibility |= 2, Ol(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? El(e, t, n, r) : kl(e, t), i & 2048 && wl(o, t);
                    break;
                case 24:
                    El(e, t, n, r), i & 2048 && Tl(t.alternate, t);
                    break;
                default:
                    El(e, t, n, r)
            }
        }

        function Ol(e, t, n, r, i) {
            for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
                var a = e,
                    o = t,
                    s = n,
                    c = r,
                    l = o.flags;
                switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Ol(a, o, s, c, i), Vc(8, o);
                        break;
                    case 23:
                        break;
                    case 22:
                        var u = o.stateNode;
                        o.memoizedState === null ? (u._visibility |= 2, Ol(a, o, s, c, i)) : u._visibility & 2 ? Ol(a, o, s, c, i) : kl(a, o), i && l & 2048 && wl(o.alternate, o);
                        break;
                    case 24:
                        Ol(a, o, s, c, i), i && l & 2048 && Tl(o.alternate, o);
                        break;
                    default:
                        Ol(a, o, s, c, i)
                }
                t = t.sibling
            }
        }

        function kl(e, t) {
            if (t.subtreeFlags & 10256)
                for (t = t.child; t !== null;) {
                    var n = e,
                        r = t,
                        i = r.flags;
                    switch (r.tag) {
                        case 22:
                            kl(n, r), i & 2048 && wl(r.alternate, r);
                            break;
                        case 24:
                            kl(n, r), i & 2048 && Tl(r.alternate, r);
                            break;
                        default:
                            kl(n, r)
                    }
                    t = t.sibling
                }
        }
        var Al = 8192;

        function jl(e, t, n) {
            if (e.subtreeFlags & Al)
                for (e = e.child; e !== null;) Ml(e, t, n), e = e.sibling
        }

        function Ml(e, t, n) {
            switch (e.tag) {
                case 26:
                    jl(e, t, n), e.flags & Al && e.memoizedState !== null && Kf(n, _l, e.memoizedState, e.memoizedProps);
                    break;
                case 5:
                    jl(e, t, n);
                    break;
                case 3:
                case 4:
                    var r = _l;
                    _l = _f(e.stateNode.containerInfo), jl(e, t, n), _l = r;
                    break;
                case 22:
                    e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Al, Al = 16777216, jl(e, t, n), Al = r) : jl(e, t, n));
                    break;
                default:
                    jl(e, t, n)
            }
        }

        function Nl(e) {
            var t = e.alternate;
            if (t !== null && (e = t.child, e !== null)) {
                t.child = null;
                do t = e.sibling, e.sibling = null, e = t; while (e !== null)
            }
        }

        function Pl(e) {
            var t = e.deletions;
            if (e.flags & 16) {
                if (t !== null)
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        il = r, Ll(r, e)
                    }
                Nl(e)
            }
            if (e.subtreeFlags & 10256)
                for (e = e.child; e !== null;) Fl(e), e = e.sibling
        }

        function Fl(e) {
            switch (e.tag) {
                case 0:
                case 11:
                case 15:
                    Pl(e), e.flags & 2048 && Hc(9, e, e.return);
                    break;
                case 3:
                    Pl(e);
                    break;
                case 12:
                    Pl(e);
                    break;
                case 22:
                    var t = e.stateNode;
                    e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Il(e)) : Pl(e);
                    break;
                default:
                    Pl(e)
            }
        }

        function Il(e) {
            var t = e.deletions;
            if (e.flags & 16) {
                if (t !== null)
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        il = r, Ll(r, e)
                    }
                Nl(e)
            }
            for (e = e.child; e !== null;) {
                switch (t = e, t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Hc(8, t, t.return), Il(t);
                        break;
                    case 22:
                        n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Il(t));
                        break;
                    default:
                        Il(t)
                }
                e = e.sibling
            }
        }

        function Ll(e, t) {
            for (; il !== null;) {
                var n = il;
                switch (n.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Hc(8, n, t);
                        break;
                    case 23:
                    case 22:
                        if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
                            var r = n.memoizedState.cachePool.pool;
                            r != null && r.refCount++
                        }
                        break;
                    case 24:
                        oa(n.memoizedState.cache)
                }
                if (r = n.child, r !== null) r.return = n, il = r;
                else a: for (n = e; il !== null;) {
                    r = il;
                    var i = r.sibling,
                        a = r.return;
                    if (sl(r), r === n) {
                        il = null;
                        break a
                    }
                    if (i !== null) {
                        i.return = a, il = i;
                        break a
                    }
                    il = a
                }
            }
        }
        var Rl = {
                getCacheForType: function(e) {
                    var t = Qi(ia),
                        n = t.data.get(e);
                    return n === void 0 && (n = e(), t.data.set(e, n)), n
                },
                cacheSignal: function() {
                    return Qi(ia).controller.signal
                }
            },
            zl = typeof WeakMap == `function` ? WeakMap : Map,
            G = 0,
            Bl = null,
            K = null,
            q = 0,
            J = 0,
            Vl = null,
            Hl = !1,
            Ul = !1,
            Y = !1,
            Wl = 0,
            X = 0,
            Gl = 0,
            Kl = 0,
            ql = 0,
            Jl = 0,
            Yl = 0,
            Xl = null,
            Zl = null,
            Ql = !1,
            $l = 0,
            eu = 0,
            tu = 1 / 0,
            nu = null,
            ru = null,
            iu = 0,
            au = null,
            ou = null,
            su = 0,
            cu = 0,
            lu = null,
            uu = null,
            du = 0,
            fu = null;

        function pu() {
            return G & 2 && q !== 0 ? q & -q : T.T === null ? at() : dd()
        }

        function mu() {
            if (Jl === 0)
                if (!(q & 536870912) || H) {
                    var e = Ke;
                    Ke <<= 1, !(Ke & 3932160) && (Ke = 262144), Jl = e
                } else Jl = 536870912;
            return e = eo.current, e !== null && (e.flags |= 32), Jl
        }

        function hu(e, t, n) {
            (e === Bl && (J === 2 || J === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, q, Jl, !1)), $e(e, n), (!(G & 2) || e !== Bl) && (e === Bl && (!(G & 2) && (Kl |= n), X === 4 && yu(e, q, Jl, !1)), rd(e))
        }

        function gu(e, t, n) {
            if (G & 6) throw Error(i(327));
            var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Ye(e, t),
                a = r ? Au(e, t) : Ou(e, t, !0),
                o = r;
            do {
                if (a === 0) {
                    Ul && !r && yu(e, t, 0, !1);
                    break
                } else {
                    if (n = e.current.alternate, o && !vu(n)) {
                        a = Ou(e, t, !1), o = !1;
                        continue
                    }
                    if (a === 2) {
                        if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
                        else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
                        if (s !== 0) {
                            t = s;
                            a: {
                                var c = e;a = Xl;
                                var l = c.current.memoizedState.isDehydrated;
                                if (l && (Su(c, s).flags |= 256), s = Ou(c, s, !1), s !== 2) {
                                    if (Y && !l) {
                                        c.errorRecoveryDisabledLanes |= o, Kl |= o, a = 4;
                                        break a
                                    }
                                    o = Zl, Zl = a, o !== null && (Zl === null ? Zl = o : Zl.push.apply(Zl, o))
                                }
                                a = s
                            }
                            if (o = !1, a !== 2) continue
                        }
                    }
                    if (a === 1) {
                        Su(e, 0), yu(e, t, 0, !0);
                        break
                    }
                    a: {
                        switch (r = e, o = a, o) {
                            case 0:
                            case 1:
                                throw Error(i(345));
                            case 4:
                                if ((t & 4194048) !== t) break;
                            case 6:
                                yu(r, t, Jl, !Hl);
                                break a;
                            case 2:
                                Zl = null;
                                break;
                            case 3:
                            case 5:
                                break;
                            default:
                                throw Error(i(329))
                        }
                        if ((t & 62914560) === t && (a = $l + 300 - Pe(), 10 < a)) {
                            if (yu(r, t, Jl, !Hl), Je(r, 0, !0) !== 0) break a;
                            su = t, r.timeoutHandle = qd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Hl, o, `Throttled`, -0, 0), a);
                            break a
                        }
                        _u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Hl, o, null, -0, 0)
                    }
                }
                break
            } while (1);
            rd(e)
        }

        function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
            if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
                d = {
                    stylesheets: null,
                    count: 0,
                    imgCount: 0,
                    imgBytes: 0,
                    suspenseyImages: [],
                    waitingForImages: !0,
                    waitingForViewTransition: !1,
                    unsuspend: Qt
                }, Ml(t, a, d);
                var m = (a & 62914560) === a ? $l - Pe() : (a & 4194048) === a ? eu - Pe() : 0;
                if (m = Jf(d, m), m !== null) {
                    su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
                    return
                }
            }
            Lu(e, t, a, n, r, i, o, s, c)
        }

        function vu(e) {
            for (var t = e;;) {
                var n = t.tag;
                if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
                    for (var r = 0; r < n.length; r++) {
                        var i = n[r],
                            a = i.getSnapshot;
                        i = i.value;
                        try {
                            if (!xr(a(), i)) return !1
                        } catch {
                            return !1
                        }
                    }
                if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
                else {
                    if (t === e) break;
                    for (; t.sibling === null;) {
                        if (t.return === null || t.return === e) return !0;
                        t = t.return
                    }
                    t.sibling.return = t.return, t = t.sibling
                }
            }
            return !0
        }

        function yu(e, t, n, r) {
            t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
            for (var i = t; 0 < i;) {
                var a = 31 - Ve(i),
                    o = 1 << a;
                r[a] = -1, i &= ~o
            }
            n !== 0 && tt(e, n, t)
        }

        function bu() {
            return G & 6 ? !0 : (id(0, !1), !1)
        }

        function xu() {
            if (K !== null) {
                if (J === 0) var e = K.return;
                else e = K, Wi = Ui = null, Do(e), ka = null, Aa = 0, e = K;
                for (; e !== null;) Bc(e.alternate, e), e = e.return;
                K = null
            }
        }

        function Su(e, t) {
            var n = e.timeoutHandle;
            n !== -1 && (e.timeoutHandle = -1, Jd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), Bl = e, K = n = ci(e.current, null), q = t, J = 0, Vl = null, Hl = !1, Ul = Ye(e, t), Y = !1, Yl = Jl = ql = Kl = Gl = X = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
            var r = e.entangledLanes;
            if (r !== 0)
                for (e = e.entanglements, r &= t; 0 < r;) {
                    var i = 31 - Ve(r),
                        a = 1 << i;
                    t |= e[i], r &= ~a
                }
            return Wl = t, Qr(), n
        }

        function Cu(e, t) {
            U = null, T.H = Ls, t === ya || t === xa ? (t = Da(), J = 3) : t === ba ? (t = Da(), J = 4) : J = t === tc ? 8 : typeof t == `object` && t && typeof t.then == `function` ? 6 : 1, Vl = t, K === null && (X = 1, Ys(e, gi(t, e.current)))
        }

        function wu() {
            var e = eo.current;
            return e === null ? !0 : (q & 4194048) === q ? to === null : (q & 62914560) === q || q & 536870912 ? e === to : !1
        }

        function Tu() {
            var e = T.H;
            return T.H = Ls, e === null ? Ls : e
        }

        function Eu() {
            var e = T.A;
            return T.A = Rl, e
        }

        function Du() {
            X = 4, Hl || (q & 4194048) !== q && eo.current !== null || (Ul = !0), !(Gl & 134217727) && !(Kl & 134217727) || Bl === null || yu(Bl, q, Jl, !1)
        }

        function Ou(e, t, n) {
            var r = G;
            G |= 2;
            var i = Tu(),
                a = Eu();
            (Bl !== e || q !== t) && (nu = null, Su(e, t)), t = !1;
            var o = X;
            a: do try {
                    if (J !== 0 && K !== null) {
                        var s = K,
                            c = Vl;
                        switch (J) {
                            case 8:
                                xu(), o = 6;
                                break a;
                            case 3:
                            case 2:
                            case 9:
                            case 6:
                                eo.current === null && (t = !0);
                                var l = J;
                                if (J = 0, Vl = null, Pu(e, s, c, l), n && Ul) {
                                    o = 0;
                                    break a
                                }
                                break;
                            default:
                                l = J, J = 0, Vl = null, Pu(e, s, c, l)
                        }
                    }
                    ku(), o = X;
                    break
                } catch (t) {
                    Cu(e, t)
                }
                while (1);
                return t && e.shellSuspendCounter++, Wi = Ui = null, G = r, T.H = i, T.A = a, K === null && (Bl = null, q = 0, Qr()), o
        }

        function ku() {
            for (; K !== null;) Mu(K)
        }

        function Au(e, t) {
            var n = G;
            G |= 2;
            var r = Tu(),
                a = Eu();
            Bl !== e || q !== t ? (nu = null, tu = Pe() + 500, Su(e, t)) : Ul = Ye(e, t);
            a: do try {
                    if (J !== 0 && K !== null) {
                        t = K;
                        var o = Vl;
                        b: switch (J) {
                            case 1:
                                J = 0, Vl = null, Pu(e, t, o, 1);
                                break;
                            case 2:
                            case 9:
                                if (Ca(o)) {
                                    J = 0, Vl = null, Nu(t);
                                    break
                                }
                                t = function() {
                                    J !== 2 && J !== 9 || Bl !== e || (J = 7), rd(e)
                                }, o.then(t, t);
                                break a;
                            case 3:
                                J = 7;
                                break a;
                            case 4:
                                J = 5;
                                break a;
                            case 7:
                                Ca(o) ? (J = 0, Vl = null, Nu(t)) : (J = 0, Vl = null, Pu(e, t, o, 7));
                                break;
                            case 5:
                                var s = null;
                                switch (K.tag) {
                                    case 26:
                                        s = K.memoizedState;
                                    case 5:
                                    case 27:
                                        var c = K;
                                        if (s ? Gf(s) : c.stateNode.complete) {
                                            J = 0, Vl = null;
                                            var l = c.sibling;
                                            if (l !== null) K = l;
                                            else {
                                                var u = c.return;
                                                u === null ? K = null : (K = u, Fu(u))
                                            }
                                            break b
                                        }
                                }
                                J = 0, Vl = null, Pu(e, t, o, 5);
                                break;
                            case 6:
                                J = 0, Vl = null, Pu(e, t, o, 6);
                                break;
                            case 8:
                                xu(), X = 6;
                                break a;
                            default:
                                throw Error(i(462))
                        }
                    }
                    ju();
                    break
                } catch (t) {
                    Cu(e, t)
                }
                while (1);
                return Wi = Ui = null, T.H = r, T.A = a, G = n, K === null ? (Bl = null, q = 0, Qr(), X) : 0
        }

        function ju() {
            for (; K !== null && !k();) Mu(K)
        }

        function Mu(e) {
            var t = jc(e.alternate, e, Wl);
            e.memoizedProps = e.pendingProps, t === null ? Fu(e) : K = t
        }

        function Nu(e) {
            var t = e,
                n = t.alternate;
            switch (t.tag) {
                case 15:
                case 0:
                    t = hc(n, t, t.pendingProps, t.type, void 0, q);
                    break;
                case 11:
                    t = hc(n, t, t.pendingProps, t.type.render, t.ref, q);
                    break;
                case 5:
                    Do(t);
                default:
                    Bc(n, t), t = K = li(t, Wl), t = jc(n, t, Wl)
            }
            e.memoizedProps = e.pendingProps, t === null ? Fu(e) : K = t
        }

        function Pu(e, t, n, r) {
            Wi = Ui = null, Do(t), ka = null, Aa = 0;
            var i = t.return;
            try {
                if (ec(e, i, t, n, q)) {
                    X = 1, Ys(e, gi(n, e.current)), K = null;
                    return
                }
            } catch (t) {
                if (i !== null) throw K = i, t;
                X = 1, Ys(e, gi(n, e.current)), K = null;
                return
            }
            t.flags & 32768 ? (H || r === 1 ? e = !0 : Ul || q & 536870912 ? e = !1 : (Hl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = eo.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t)
        }

        function Fu(e) {
            var t = e;
            do {
                if (t.flags & 32768) {
                    Iu(t, Hl);
                    return
                }
                e = t.return;
                var n = Rc(t.alternate, t, Wl);
                if (n !== null) {
                    K = n;
                    return
                }
                if (t = t.sibling, t !== null) {
                    K = t;
                    return
                }
                K = t = e
            } while (t !== null);
            X === 0 && (X = 5)
        }

        function Iu(e, t) {
            do {
                var n = zc(e.alternate, e);
                if (n !== null) {
                    n.flags &= 32767, K = n;
                    return
                }
                if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
                    K = e;
                    return
                }
                K = e = n
            } while (e !== null);
            X = 6, K = null
        }

        function Lu(e, t, n, r, a, o, s, c, l) {
            e.cancelPendingCommit = null;
            do Hu(); while (iu !== 0);
            if (G & 6) throw Error(i(327));
            if (t !== null) {
                if (t === e.current) throw Error(i(177));
                if (o = t.lanes | t.childLanes, o |= Zr, et(e, n, o, s, c, l), e === Bl && (K = Bl = null, q = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(j, function() {
                        return Uu(), null
                    })) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
                    r = T.T, T.T = null, a = E.p, E.p = 2, s = G, G |= 4;
                    try {
                        al(e, t, n)
                    } finally {
                        G = s, E.p = a, T.T = r
                    }
                }
                iu = 1, Ru(), zu(), Bu()
            }
        }

        function Ru() {
            if (iu === 1) {
                iu = 0;
                var e = au,
                    t = ou,
                    n = (t.flags & 13878) != 0;
                if (t.subtreeFlags & 13878 || n) {
                    n = T.T, T.T = null;
                    var r = E.p;
                    E.p = 2;
                    var i = G;
                    G |= 4;
                    try {
                        vl(t, e);
                        var a = Bd,
                            o = Er(e.containerInfo),
                            s = a.focusedElem,
                            c = a.selectionRange;
                        if (o !== s && s && s.ownerDocument && Tr(s.ownerDocument.documentElement, s)) {
                            if (c !== null && Dr(s)) {
                                var l = c.start,
                                    u = c.end;
                                if (u === void 0 && (u = l), `selectionStart` in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
                                else {
                                    var d = s.ownerDocument || document,
                                        f = d && d.defaultView || window;
                                    if (f.getSelection) {
                                        var p = f.getSelection(),
                                            m = s.textContent.length,
                                            h = Math.min(c.start, m),
                                            g = c.end === void 0 ? h : Math.min(c.end, m);
                                        !p.extend && h > g && (o = g, g = h, h = o);
                                        var _ = wr(s, h),
                                            v = wr(s, g);
                                        if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
                                            var y = d.createRange();
                                            y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y))
                                        }
                                    }
                                }
                            }
                            for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
                                element: p,
                                left: p.scrollLeft,
                                top: p.scrollTop
                            });
                            for (typeof s.focus == `function` && s.focus(), s = 0; s < d.length; s++) {
                                var b = d[s];
                                b.element.scrollLeft = b.left, b.element.scrollTop = b.top
                            }
                        }
                        cp = !!zd, Bd = zd = null
                    } finally {
                        G = i, E.p = r, T.T = n
                    }
                }
                e.current = t, iu = 2
            }
        }

        function zu() {
            if (iu === 2) {
                iu = 0;
                var e = au,
                    t = ou,
                    n = (t.flags & 8772) != 0;
                if (t.subtreeFlags & 8772 || n) {
                    n = T.T, T.T = null;
                    var r = E.p;
                    E.p = 2;
                    var i = G;
                    G |= 4;
                    try {
                        ol(e, t.alternate, t)
                    } finally {
                        G = i, E.p = r, T.T = n
                    }
                }
                iu = 3
            }
        }

        function Bu() {
            if (iu === 4 || iu === 3) {
                iu = 0, Ne();
                var e = au,
                    t = ou,
                    n = su,
                    r = uu;
                t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
                var i = e.pendingLanes;
                if (i === 0 && (ru = null), it(n), t = t.stateNode, ze && typeof ze.onCommitFiberRoot == `function`) try {
                    ze.onCommitFiberRoot(Re, t, void 0, (t.current.flags & 128) == 128)
                } catch {}
                if (r !== null) {
                    t = T.T, i = E.p, E.p = 2, T.T = null;
                    try {
                        for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
                            var s = r[o];
                            a(s.value, {
                                componentStack: s.stack
                            })
                        }
                    } finally {
                        T.T = t, E.p = i
                    }
                }
                su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1)
            }
        }

        function Vu(e, t) {
            (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, oa(t)))
        }

        function Hu() {
            return Ru(), zu(), Bu(), Uu()
        }

        function Uu() {
            if (iu !== 5) return !1;
            var e = au,
                t = cu;
            cu = 0;
            var n = it(su),
                r = T.T,
                a = E.p;
            try {
                E.p = 32 > n ? 32 : n, T.T = null, n = lu, lu = null;
                var o = au,
                    s = su;
                if (iu = 0, ou = au = null, su = 0, G & 6) throw Error(i(331));
                var c = G;
                if (G |= 4, Fl(o.current), Dl(o, o.current, s, n), G = c, id(0, !1), ze && typeof ze.onPostCommitFiberRoot == `function`) try {
                    ze.onPostCommitFiberRoot(Re, o)
                } catch {}
                return !0
            } finally {
                E.p = a, T.T = r, Vu(e, t)
            }
        }

        function Wu(e, t, n) {
            t = gi(n, t), t = Zs(e.stateNode, t, 2), e = Va(e, t, 2), e !== null && ($e(e, 2), rd(e))
        }

        function Z(e, t, n) {
            if (e.tag === 3) Wu(e, e, n);
            else
                for (; t !== null;) {
                    if (t.tag === 3) {
                        Wu(t, e, n);
                        break
                    } else if (t.tag === 1) {
                        var r = t.stateNode;
                        if (typeof t.type.getDerivedStateFromError == `function` || typeof r.componentDidCatch == `function` && (ru === null || !ru.has(r))) {
                            e = gi(n, e), n = Qs(2), r = Va(t, n, 2), r !== null && ($s(n, r, t, e), $e(r, 2), rd(r));
                            break
                        }
                    }
                    t = t.return
                }
        }

        function Gu(e, t, n) {
            var r = e.pingCache;
            if (r === null) {
                r = e.pingCache = new zl;
                var i = new Set;
                r.set(t, i)
            } else i = r.get(t), i === void 0 && (i = new Set, r.set(t, i));
            i.has(n) || (Y = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e))
        }

        function Ku(e, t, n) {
            var r = e.pingCache;
            r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Bl === e && (q & n) === n && (X === 4 || X === 3 && (q & 62914560) === q && 300 > Pe() - $l ? !(G & 2) && Su(e, 0) : ql |= n, Yl === q && (Yl = 0)), rd(e)
        }

        function qu(e, t) {
            t === 0 && (t = Ze()), e = ti(e, t), e !== null && ($e(e, t), rd(e))
        }

        function Ju(e) {
            var t = e.memoizedState,
                n = 0;
            t !== null && (n = t.retryLane), qu(e, n)
        }

        function Yu(e, t) {
            var n = 0;
            switch (e.tag) {
                case 31:
                case 13:
                    var r = e.stateNode,
                        a = e.memoizedState;
                    a !== null && (n = a.retryLane);
                    break;
                case 19:
                    r = e.stateNode;
                    break;
                case 22:
                    r = e.stateNode._retryCache;
                    break;
                default:
                    throw Error(i(314))
            }
            r !== null && r.delete(t), qu(e, n)
        }

        function Xu(e, t) {
            return je(e, t)
        }
        var Zu = null,
            Qu = null,
            $u = !1,
            ed = !1,
            td = !1,
            nd = 0;

        function rd(e) {
            e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud())
        }

        function id(e, t) {
            if (!td && ed) {
                td = !0;
                do
                    for (var n = !1, r = Zu; r !== null;) {
                        if (!t)
                            if (e !== 0) {
                                var i = r.pendingLanes;
                                if (i === 0) var a = 0;
                                else {
                                    var o = r.suspendedLanes,
                                        s = r.pingedLanes;
                                    a = (1 << 31 - Ve(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0
                                }
                                a !== 0 && (n = !0, ld(r, a))
                            } else a = q, a = Je(r, r === Bl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Ye(r, a) || (n = !0, ld(r, a));
                        r = r.next
                    }
                while (n);
                td = !1
            }
        }

        function ad() {
            od()
        }

        function od() {
            ed = $u = !1;
            var e = 0;
            nd !== 0 && Kd() && (e = nd);
            for (var t = Pe(), n = null, r = Zu; r !== null;) {
                var i = r.next,
                    a = sd(r, t);
                a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i
            }
            iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0)
        }

        function sd(e, t) {
            for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
                var o = 31 - Ve(a),
                    s = 1 << o,
                    c = i[o];
                c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Xe(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s
            }
            if (t = Bl, n = q, n = Je(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (J === 2 || J === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Me(r), e.callbackNode = null, e.callbackPriority = 0;
            if (!(n & 3) || Ye(e, n)) {
                if (t = n & -n, t === e.callbackPriority) return t;
                switch (r !== null && Me(r), it(n)) {
                    case 2:
                    case 8:
                        n = Ie;
                        break;
                    case 32:
                        n = j;
                        break;
                    case 268435456:
                        n = N;
                        break;
                    default:
                        n = j
                }
                return r = cd.bind(null, e), n = je(n, r), e.callbackPriority = t, e.callbackNode = n, t
            }
            return r !== null && r !== null && Me(r), e.callbackPriority = 2, e.callbackNode = null, 2
        }

        function cd(e, t) {
            if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
            var n = e.callbackNode;
            if (Hu() && e.callbackNode !== n) return null;
            var r = q;
            return r = Je(e, e === Bl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, Pe()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null)
        }

        function ld(e, t) {
            if (Hu()) return null;
            gu(e, t, !0)
        }

        function ud() {
            Xd(function() {
                G & 6 ? je(A, ad) : od()
            })
        }

        function dd() {
            if (nd === 0) {
                var e = la;
                e === 0 && (e = Ge, Ge <<= 1, !(Ge & 261888) && (Ge = 256)), nd = e
            }
            return nd
        }

        function fd(e) {
            return e == null || typeof e == `symbol` || typeof e == `boolean` ? null : typeof e == `function` ? e : Zt(`` + e)
        }

        function pd(e, t) {
            var n = t.ownerDocument.createElement(`input`);
            return n.name = t.name, n.value = t.value, e.id && n.setAttribute(`form`, e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e
        }

        function md(e, t, n, r, i) {
            if (t === `submit` && n && n.stateNode === i) {
                var a = fd((i[lt] || null).action),
                    o = r.submitter;
                o && (t = (t = o[lt] || null) ? fd(t.formAction) : o.getAttribute(`formAction`), t !== null && (a = t, o = null));
                var s = new bn(`action`, `action`, null, r, i);
                e.push({
                    event: s,
                    listeners: [{
                        instance: null,
                        listener: function() {
                            if (r.defaultPrevented) {
                                if (nd !== 0) {
                                    var e = o ? pd(i, o) : new FormData(i);
                                    Cs(n, {
                                        pending: !0,
                                        data: e,
                                        method: i.method,
                                        action: a
                                    }, null, e)
                                }
                            } else typeof a == `function` && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), Cs(n, {
                                pending: !0,
                                data: e,
                                method: i.method,
                                action: a
                            }, a, e))
                        },
                        currentTarget: i
                    }]
                })
            }
        }
        for (var hd = 0; hd < Kr.length; hd++) {
            var gd = Kr[hd];
            qr(gd.toLowerCase(), `on` + (gd[0].toUpperCase() + gd.slice(1)))
        }
        qr(Rr, `onAnimationEnd`), qr(zr, `onAnimationIteration`), qr(Br, `onAnimationStart`), qr(`dblclick`, `onDoubleClick`), qr(`focusin`, `onFocus`), qr(`focusout`, `onBlur`), qr(Vr, `onTransitionRun`), qr(Hr, `onTransitionStart`), qr(Ur, `onTransitionCancel`), qr(Wr, `onTransitionEnd`), wt(`onMouseEnter`, [`mouseout`, `mouseover`]), wt(`onMouseLeave`, [`mouseout`, `mouseover`]), wt(`onPointerEnter`, [`pointerout`, `pointerover`]), wt(`onPointerLeave`, [`pointerout`, `pointerover`]), Ct(`onChange`, `change click focusin focusout input keydown keyup selectionchange`.split(` `)), Ct(`onSelect`, `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)), Ct(`onBeforeInput`, [`compositionend`, `keypress`, `textInput`, `paste`]), Ct(`onCompositionEnd`, `compositionend focusout keydown keypress keyup mousedown`.split(` `)), Ct(`onCompositionStart`, `compositionstart focusout keydown keypress keyup mousedown`.split(` `)), Ct(`onCompositionUpdate`, `compositionupdate focusout keydown keypress keyup mousedown`.split(` `));
        var _d = `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),
            vd = new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));

        function yd(e, t) {
            t = (t & 4) != 0;
            for (var n = 0; n < e.length; n++) {
                var r = e[n],
                    i = r.event;
                r = r.listeners;
                a: {
                    var a = void 0;
                    if (t)
                        for (var o = r.length - 1; 0 <= o; o--) {
                            var s = r[o],
                                c = s.instance,
                                l = s.currentTarget;
                            if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
                            a = s, i.currentTarget = l;
                            try {
                                a(i)
                            } catch (e) {
                                Jr(e)
                            }
                            i.currentTarget = null, a = c
                        } else
                            for (o = 0; o < r.length; o++) {
                                if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
                                a = s, i.currentTarget = l;
                                try {
                                    a(i)
                                } catch (e) {
                                    Jr(e)
                                }
                                i.currentTarget = null, a = c
                            }
                }
            }
        }

        function Q(e, t) {
            var n = t[dt];
            n === void 0 && (n = t[dt] = new Set);
            var r = e + `__bubble`;
            n.has(r) || (Cd(t, e, 2, !1), n.add(r))
        }

        function bd(e, t, n) {
            var r = 0;
            t && (r |= 4), Cd(n, e, r, t)
        }
        var xd = `_reactListening` + Math.random().toString(36).slice(2);

        function Sd(e) {
            if (!e[xd]) {
                e[xd] = !0, xt.forEach(function(t) {
                    t !== `selectionchange` && (vd.has(t) || bd(t, !1, e), bd(t, !0, e))
                });
                var t = e.nodeType === 9 ? e : e.ownerDocument;
                t === null || t[xd] || (t[xd] = !0, bd(`selectionchange`, !1, t))
            }
        }

        function Cd(e, t, n, r) {
            switch (hp(t)) {
                case 2:
                    var i = lp;
                    break;
                case 8:
                    i = up;
                    break;
                default:
                    i = dp
            }
            n = i.bind(null, t, n, e), i = void 0, !ln || t !== `touchstart` && t !== `touchmove` && t !== `wheel` || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
                capture: !0,
                passive: i
            }) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, {
                passive: i
            })
        }

        function wd(e, t, n, r, i) {
            var a = r;
            if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
                if (r === null) return;
                var s = r.tag;
                if (s === 3 || s === 4) {
                    var c = r.stateNode.containerInfo;
                    if (c === i) break;
                    if (s === 4)
                        for (s = r.return; s !== null;) {
                            var l = s.tag;
                            if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
                            s = s.return
                        }
                    for (; c !== null;) {
                        if (s = gt(c), s === null) return;
                        if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
                            r = a = s;
                            continue a
                        }
                        c = c.parentNode
                    }
                }
                r = r.return
            }
            on(function() {
                var r = a,
                    i = en(n),
                    s = [];
                a: {
                    var c = Gr.get(e);
                    if (c !== void 0) {
                        var l = bn,
                            u = e;
                        switch (e) {
                            case `keypress`:
                                if (hn(n) === 0) break a;
                            case `keydown`:
                            case `keyup`:
                                l = Rn;
                                break;
                            case `focusin`:
                                u = `focus`, l = kn;
                                break;
                            case `focusout`:
                                u = `blur`, l = kn;
                                break;
                            case `beforeblur`:
                            case `afterblur`:
                                l = kn;
                                break;
                            case `click`:
                                if (n.button === 2) break a;
                            case `auxclick`:
                            case `dblclick`:
                            case `mousedown`:
                            case `mousemove`:
                            case `mouseup`:
                            case `mouseout`:
                            case `mouseover`:
                            case `contextmenu`:
                                l = Dn;
                                break;
                            case `drag`:
                            case `dragend`:
                            case `dragenter`:
                            case `dragexit`:
                            case `dragleave`:
                            case `dragover`:
                            case `dragstart`:
                            case `drop`:
                                l = On;
                                break;
                            case `touchcancel`:
                            case `touchend`:
                            case `touchmove`:
                            case `touchstart`:
                                l = Bn;
                                break;
                            case Rr:
                            case zr:
                            case Br:
                                l = An;
                                break;
                            case Wr:
                                l = Vn;
                                break;
                            case `scroll`:
                            case `scrollend`:
                                l = Sn;
                                break;
                            case `wheel`:
                                l = Hn;
                                break;
                            case `copy`:
                            case `cut`:
                            case `paste`:
                                l = jn;
                                break;
                            case `gotpointercapture`:
                            case `lostpointercapture`:
                            case `pointercancel`:
                            case `pointerdown`:
                            case `pointermove`:
                            case `pointerout`:
                            case `pointerover`:
                            case `pointerup`:
                                l = zn;
                                break;
                            case `toggle`:
                            case `beforetoggle`:
                                l = Un
                        }
                        var d = (t & 4) != 0,
                            f = !d && (e === `scroll` || e === `scrollend`),
                            p = d ? c === null ? null : c + `Capture` : c;
                        d = [];
                        for (var m = r, h; m !== null;) {
                            var g = m;
                            if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = sn(m, p), g != null && d.push(Td(m, g, h))), f) break;
                            m = m.return
                        }
                        0 < d.length && (c = new l(c, u, null, n, i), s.push({
                            event: c,
                            listeners: d
                        }))
                    }
                }
                if (!(t & 7)) {
                    a: {
                        if (c = e === `mouseover` || e === `pointerover`, l = e === `mouseout` || e === `pointerout`, c && n !== $t && (u = n.relatedTarget || n.fromElement) && (gt(u) || u[ut])) break a;
                        if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? gt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
                            if (d = Dn, g = `onMouseLeave`, p = `onMouseEnter`, m = `mouse`, (e === `pointerout` || e === `pointerover`) && (d = zn, g = `onPointerLeave`, p = `onPointerEnter`, m = `pointer`), f = l == null ? c : vt(l), h = u == null ? c : vt(u), c = new d(g, m + `leave`, l, n, i), c.target = f, c.relatedTarget = h, g = null, gt(i) === r && (d = new d(p, m + `enter`, u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
                                for (d = Dd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;g = 0;
                                for (var _ = m; _; _ = d(_)) g++;
                                for (; 0 < h - g;) p = d(p),
                                h--;
                                for (; 0 < g - h;) m = d(m),
                                g--;
                                for (; h--;) {
                                    if (p === m || m !== null && p === m.alternate) {
                                        d = p;
                                        break b
                                    }
                                    p = d(p), m = d(m)
                                }
                                d = null
                            }
                            else d = null;
                            l !== null && Od(s, c, l, d, !1), u !== null && f !== null && Od(s, f, u, d, !0)
                        }
                    }
                    a: {
                        if (c = r ? vt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === `select` || l === `input` && c.type === `file`) var v = lr;
                        else if (rr(c))
                            if (ur) v = yr;
                            else {
                                v = _r;
                                var y = gr
                            }
                        else l = c.nodeName,
                        !l || l.toLowerCase() !== `input` || c.type !== `checkbox` && c.type !== `radio` ? r && Jt(r.elementType) && (v = lr) : v = vr;
                        if (v &&= v(e, r)) {
                            ir(s, v, n, i);
                            break a
                        }
                        y && y(e, c, r),
                        e === `focusout` && r && c.type === `number` && r.memoizedProps.value != null && z(c, `number`, c.value)
                    }
                    switch (y = r ? vt(r) : window, e) {
                        case `focusin`:
                            (rr(y) || y.contentEditable === `true`) && (kr = y, Ar = r, jr = null);
                            break;
                        case `focusout`:
                            jr = Ar = kr = null;
                            break;
                        case `mousedown`:
                            Mr = !0;
                            break;
                        case `contextmenu`:
                        case `mouseup`:
                        case `dragend`:
                            Mr = !1, Nr(s, n, i);
                            break;
                        case `selectionchange`:
                            if (Or) break;
                        case `keydown`:
                        case `keyup`:
                            Nr(s, n, i)
                    }
                    var b;
                    if (Gn) b: {
                        switch (e) {
                            case `compositionstart`:
                                var x = `onCompositionStart`;
                                break b;
                            case `compositionend`:
                                x = `onCompositionEnd`;
                                break b;
                            case `compositionupdate`:
                                x = `onCompositionUpdate`;
                                break b
                        }
                        x = void 0
                    }
                    else $n ? Zn(e, n) && (x = `onCompositionEnd`) : e === `keydown` && n.keyCode === 229 && (x = `onCompositionStart`);x && (Jn && n.locale !== `ko` && ($n || x !== `onCompositionStart` ? x === `onCompositionEnd` && $n && (b = mn()) : (dn = i, fn = `value` in dn ? dn.value : dn.textContent, $n = !0)), y = Ed(r, x), 0 < y.length && (x = new Mn(x, e, null, n, i), s.push({
                        event: x,
                        listeners: y
                    }), b ? x.data = b : (b = Qn(n), b !== null && (x.data = b)))),
                    (b = qn ? er(e, n) : tr(e, n)) && (x = Ed(r, `onBeforeInput`), 0 < x.length && (y = new Mn(`onBeforeInput`, `beforeinput`, null, n, i), s.push({
                        event: y,
                        listeners: x
                    }), y.data = b)),
                    md(s, e, r, n, i)
                }
                yd(s, t)
            })
        }

        function Td(e, t, n) {
            return {
                instance: e,
                listener: t,
                currentTarget: n
            }
        }

        function Ed(e, t) {
            for (var n = t + `Capture`, r = []; e !== null;) {
                var i = e,
                    a = i.stateNode;
                if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = sn(e, n), i != null && r.unshift(Td(e, i, a)), i = sn(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
                e = e.return
            }
            return []
        }

        function Dd(e) {
            if (e === null) return null;
            do e = e.return; while (e && e.tag !== 5 && e.tag !== 27);
            return e || null
        }

        function Od(e, t, n, r, i) {
            for (var a = t._reactName, o = []; n !== null && n !== r;) {
                var s = n,
                    c = s.alternate,
                    l = s.stateNode;
                if (s = s.tag, c !== null && c === r) break;
                s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = sn(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = sn(n, a), l != null && o.push(Td(n, l, c)))), n = n.return
            }
            o.length !== 0 && e.push({
                event: t,
                listeners: o
            })
        }
        var kd = /\r\n?/g,
            Ad = /\u0000|\uFFFD/g;

        function jd(e) {
            return (typeof e == `string` ? e : `` + e).replace(kd, `
`).replace(Ad, ``)
        }

        function Md(e, t) {
            return t = jd(t), jd(e) === t
        }

        function Nd(e, t, n, r, a, o) {
            switch (n) {
                case `children`:
                    typeof r == `string` ? t === `body` || t === `textarea` && r === `` || Wt(e, r) : (typeof r == `number` || typeof r == `bigint`) && t !== `body` && Wt(e, `` + r);
                    break;
                case `className`:
                    kt(e, `class`, r);
                    break;
                case `tabIndex`:
                    kt(e, `tabindex`, r);
                    break;
                case `dir`:
                case `role`:
                case `viewBox`:
                case `width`:
                case `height`:
                    kt(e, n, r);
                    break;
                case `style`:
                    qt(e, r, o);
                    break;
                case `data`:
                    if (t !== `object`) {
                        kt(e, `data`, r);
                        break
                    }
                case `src`:
                case `href`:
                    if (r === `` && (t !== `a` || n !== `href`)) {
                        e.removeAttribute(n);
                        break
                    }
                    if (r == null || typeof r == `function` || typeof r == `symbol` || typeof r == `boolean`) {
                        e.removeAttribute(n);
                        break
                    }
                    r = Zt(`` + r), e.setAttribute(n, r);
                    break;
                case `action`:
                case `formAction`:
                    if (typeof r == `function`) {
                        e.setAttribute(n, `javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);
                        break
                    } else typeof o == `function` && (n === `formAction` ? (t !== `input` && Nd(e, t, `name`, a.name, a, null), Nd(e, t, `formEncType`, a.formEncType, a, null), Nd(e, t, `formMethod`, a.formMethod, a, null), Nd(e, t, `formTarget`, a.formTarget, a, null)) : (Nd(e, t, `encType`, a.encType, a, null), Nd(e, t, `method`, a.method, a, null), Nd(e, t, `target`, a.target, a, null)));
                    if (r == null || typeof r == `symbol` || typeof r == `boolean`) {
                        e.removeAttribute(n);
                        break
                    }
                    r = Zt(`` + r), e.setAttribute(n, r);
                    break;
                case `onClick`:
                    r != null && (e.onclick = Qt);
                    break;
                case `onScroll`:
                    r != null && Q(`scroll`, e);
                    break;
                case `onScrollEnd`:
                    r != null && Q(`scrollend`, e);
                    break;
                case `dangerouslySetInnerHTML`:
                    if (r != null) {
                        if (typeof r != `object` || !(`__html` in r)) throw Error(i(61));
                        if (n = r.__html, n != null) {
                            if (a.children != null) throw Error(i(60));
                            e.innerHTML = n
                        }
                    }
                    break;
                case `multiple`:
                    e.multiple = r && typeof r != `function` && typeof r != `symbol`;
                    break;
                case `muted`:
                    e.muted = r && typeof r != `function` && typeof r != `symbol`;
                    break;
                case `suppressContentEditableWarning`:
                case `suppressHydrationWarning`:
                case `defaultValue`:
                case `defaultChecked`:
                case `innerHTML`:
                case `ref`:
                    break;
                case `autoFocus`:
                    break;
                case `xlinkHref`:
                    if (r == null || typeof r == `function` || typeof r == `boolean` || typeof r == `symbol`) {
                        e.removeAttribute(`xlink:href`);
                        break
                    }
                    n = Zt(`` + r), e.setAttributeNS(`http://www.w3.org/1999/xlink`, `xlink:href`, n);
                    break;
                case `contentEditable`:
                case `spellCheck`:
                case `draggable`:
                case `value`:
                case `autoReverse`:
                case `externalResourcesRequired`:
                case `focusable`:
                case `preserveAlpha`:
                    r != null && typeof r != `function` && typeof r != `symbol` ? e.setAttribute(n, `` + r) : e.removeAttribute(n);
                    break;
                case `inert`:
                case `allowFullScreen`:
                case `async`:
                case `autoPlay`:
                case `controls`:
                case `default`:
                case `defer`:
                case `disabled`:
                case `disablePictureInPicture`:
                case `disableRemotePlayback`:
                case `formNoValidate`:
                case `hidden`:
                case `loop`:
                case `noModule`:
                case `noValidate`:
                case `open`:
                case `playsInline`:
                case `readOnly`:
                case `required`:
                case `reversed`:
                case `scoped`:
                case `seamless`:
                case `itemScope`:
                    r && typeof r != `function` && typeof r != `symbol` ? e.setAttribute(n, ``) : e.removeAttribute(n);
                    break;
                case `capture`:
                case `download`:
                    !0 === r ? e.setAttribute(n, ``) : !1 !== r && r != null && typeof r != `function` && typeof r != `symbol` ? e.setAttribute(n, r) : e.removeAttribute(n);
                    break;
                case `cols`:
                case `rows`:
                case `size`:
                case `span`:
                    r != null && typeof r != `function` && typeof r != `symbol` && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
                    break;
                case `rowSpan`:
                case `start`:
                    r == null || typeof r == `function` || typeof r == `symbol` || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
                    break;
                case `popover`:
                    Q(`beforetoggle`, e), Q(`toggle`, e), Ot(e, `popover`, r);
                    break;
                case `xlinkActuate`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:actuate`, r);
                    break;
                case `xlinkArcrole`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:arcrole`, r);
                    break;
                case `xlinkRole`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:role`, r);
                    break;
                case `xlinkShow`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:show`, r);
                    break;
                case `xlinkTitle`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:title`, r);
                    break;
                case `xlinkType`:
                    At(e, `http://www.w3.org/1999/xlink`, `xlink:type`, r);
                    break;
                case `xmlBase`:
                    At(e, `http://www.w3.org/XML/1998/namespace`, `xml:base`, r);
                    break;
                case `xmlLang`:
                    At(e, `http://www.w3.org/XML/1998/namespace`, `xml:lang`, r);
                    break;
                case `xmlSpace`:
                    At(e, `http://www.w3.org/XML/1998/namespace`, `xml:space`, r);
                    break;
                case `is`:
                    Ot(e, `is`, r);
                    break;
                case `innerText`:
                case `textContent`:
                    break;
                default:
                    (!(2 < n.length) || n[0] !== `o` && n[0] !== `O` || n[1] !== `n` && n[1] !== `N`) && (n = Yt.get(n) || n, Ot(e, n, r))
            }
        }

        function Pd(e, t, n, r, a, o) {
            switch (n) {
                case `style`:
                    qt(e, r, o);
                    break;
                case `dangerouslySetInnerHTML`:
                    if (r != null) {
                        if (typeof r != `object` || !(`__html` in r)) throw Error(i(61));
                        if (n = r.__html, n != null) {
                            if (a.children != null) throw Error(i(60));
                            e.innerHTML = n
                        }
                    }
                    break;
                case `children`:
                    typeof r == `string` ? Wt(e, r) : (typeof r == `number` || typeof r == `bigint`) && Wt(e, `` + r);
                    break;
                case `onScroll`:
                    r != null && Q(`scroll`, e);
                    break;
                case `onScrollEnd`:
                    r != null && Q(`scrollend`, e);
                    break;
                case `onClick`:
                    r != null && (e.onclick = Qt);
                    break;
                case `suppressContentEditableWarning`:
                case `suppressHydrationWarning`:
                case `innerHTML`:
                case `ref`:
                    break;
                case `innerText`:
                case `textContent`:
                    break;
                default:
                    if (!St.hasOwnProperty(n)) a: {
                        if (n[0] === `o` && n[1] === `n` && (a = n.endsWith(`Capture`), t = n.slice(2, a ? n.length - 7 : void 0), o = e[lt] || null, o = o == null ? null : o[n], typeof o == `function` && e.removeEventListener(t, o, a), typeof r == `function`)) {
                            typeof o != `function` && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
                            break a
                        }
                        n in e ? e[n] = r : !0 === r ? e.setAttribute(n, ``) : Ot(e, n, r)
                    }
            }
        }

        function Fd(e, t, n) {
            switch (t) {
                case `div`:
                case `span`:
                case `svg`:
                case `path`:
                case `a`:
                case `g`:
                case `p`:
                case `li`:
                    break;
                case `img`:
                    Q(`error`, e), Q(`load`, e);
                    var r = !1,
                        a = !1,
                        o;
                    for (o in n)
                        if (n.hasOwnProperty(o)) {
                            var s = n[o];
                            if (s != null) switch (o) {
                                case `src`:
                                    r = !0;
                                    break;
                                case `srcSet`:
                                    a = !0;
                                    break;
                                case `children`:
                                case `dangerouslySetInnerHTML`:
                                    throw Error(i(137, t));
                                default:
                                    Nd(e, t, o, s, n, null)
                            }
                        } a && Nd(e, t, `srcSet`, n.srcSet, n, null), r && Nd(e, t, `src`, n.src, n, null);
                    return;
                case `input`:
                    Q(`invalid`, e);
                    var c = o = s = a = null,
                        l = null,
                        u = null;
                    for (r in n)
                        if (n.hasOwnProperty(r)) {
                            var d = n[r];
                            if (d != null) switch (r) {
                                case `name`:
                                    a = d;
                                    break;
                                case `type`:
                                    s = d;
                                    break;
                                case `checked`:
                                    l = d;
                                    break;
                                case `defaultChecked`:
                                    u = d;
                                    break;
                                case `value`:
                                    o = d;
                                    break;
                                case `defaultValue`:
                                    c = d;
                                    break;
                                case `children`:
                                case `dangerouslySetInnerHTML`:
                                    if (d != null) throw Error(i(137, t));
                                    break;
                                default:
                                    Nd(e, t, r, d, n, null)
                            }
                        } Bt(e, o, c, l, u, s, a, !1);
                    return;
                case `select`:
                    for (a in Q(`invalid`, e), r = s = o = null, n)
                        if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
                            case `value`:
                                o = c;
                                break;
                            case `defaultValue`:
                                s = c;
                                break;
                            case `multiple`:
                                r = c;
                            default:
                                Nd(e, t, a, c, n, null)
                        }
                    t = o, n = s, e.multiple = !!r, t == null ? n != null && Vt(e, !!r, n, !0) : Vt(e, !!r, t, !1);
                    return;
                case `textarea`:
                    for (s in Q(`invalid`, e), o = a = r = null, n)
                        if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
                            case `value`:
                                r = c;
                                break;
                            case `defaultValue`:
                                a = c;
                                break;
                            case `children`:
                                o = c;
                                break;
                            case `dangerouslySetInnerHTML`:
                                if (c != null) throw Error(i(91));
                                break;
                            default:
                                Nd(e, t, s, c, n, null)
                        }
                    Ut(e, r, a, o);
                    return;
                case `option`:
                    for (l in n)
                        if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
                            case `selected`:
                                e.selected = r && typeof r != `function` && typeof r != `symbol`;
                                break;
                            default:
                                Nd(e, t, l, r, n, null)
                        }
                    return;
                case `dialog`:
                    Q(`beforetoggle`, e), Q(`toggle`, e), Q(`cancel`, e), Q(`close`, e);
                    break;
                case `iframe`:
                case `object`:
                    Q(`load`, e);
                    break;
                case `video`:
                case `audio`:
                    for (r = 0; r < _d.length; r++) Q(_d[r], e);
                    break;
                case `image`:
                    Q(`error`, e), Q(`load`, e);
                    break;
                case `details`:
                    Q(`toggle`, e);
                    break;
                case `embed`:
                case `source`:
                case `link`:
                    Q(`error`, e), Q(`load`, e);
                case `area`:
                case `base`:
                case `br`:
                case `col`:
                case `hr`:
                case `keygen`:
                case `meta`:
                case `param`:
                case `track`:
                case `wbr`:
                case `menuitem`:
                    for (u in n)
                        if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
                            case `children`:
                            case `dangerouslySetInnerHTML`:
                                throw Error(i(137, t));
                            default:
                                Nd(e, t, u, r, n, null)
                        }
                    return;
                default:
                    if (Jt(t)) {
                        for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Pd(e, t, d, r, n, void 0));
                        return
                    }
            }
            for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Nd(e, t, c, r, n, null))
        }

        function Id(e, t, n, r) {
            switch (t) {
                case `div`:
                case `span`:
                case `svg`:
                case `path`:
                case `a`:
                case `g`:
                case `p`:
                case `li`:
                    break;
                case `input`:
                    var a = null,
                        o = null,
                        s = null,
                        c = null,
                        l = null,
                        u = null,
                        d = null;
                    for (m in n) {
                        var f = n[m];
                        if (n.hasOwnProperty(m) && f != null) switch (m) {
                            case `checked`:
                                break;
                            case `value`:
                                break;
                            case `defaultValue`:
                                l = f;
                            default:
                                r.hasOwnProperty(m) || Nd(e, t, m, null, r, f)
                        }
                    }
                    for (var p in r) {
                        var m = r[p];
                        if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
                            case `type`:
                                o = m;
                                break;
                            case `name`:
                                a = m;
                                break;
                            case `checked`:
                                u = m;
                                break;
                            case `defaultChecked`:
                                d = m;
                                break;
                            case `value`:
                                s = m;
                                break;
                            case `defaultValue`:
                                c = m;
                                break;
                            case `children`:
                            case `dangerouslySetInnerHTML`:
                                if (m != null) throw Error(i(137, t));
                                break;
                            default:
                                m !== f && Nd(e, t, p, m, r, f)
                        }
                    }
                    zt(e, s, c, l, u, d, o, a);
                    return;
                case `select`:
                    for (o in m = s = c = p = null, n)
                        if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
                            case `value`:
                                break;
                            case `multiple`:
                                m = l;
                            default:
                                r.hasOwnProperty(o) || Nd(e, t, o, null, r, l)
                        }
                    for (a in r)
                        if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
                            case `value`:
                                p = o;
                                break;
                            case `defaultValue`:
                                c = o;
                                break;
                            case `multiple`:
                                s = o;
                            default:
                                o !== l && Nd(e, t, a, o, r, l)
                        }
                    t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Vt(e, !!n, n ? [] : ``, !1) : Vt(e, !!n, t, !0)) : Vt(e, !!n, p, !1);
                    return;
                case `textarea`:
                    for (c in m = p = null, n)
                        if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
                            case `value`:
                                break;
                            case `children`:
                                break;
                            default:
                                Nd(e, t, c, null, r, a)
                        }
                    for (s in r)
                        if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
                            case `value`:
                                p = a;
                                break;
                            case `defaultValue`:
                                m = a;
                                break;
                            case `children`:
                                break;
                            case `dangerouslySetInnerHTML`:
                                if (a != null) throw Error(i(91));
                                break;
                            default:
                                a !== o && Nd(e, t, s, a, r, o)
                        }
                    Ht(e, p, m);
                    return;
                case `option`:
                    for (var h in n)
                        if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
                            case `selected`:
                                e.selected = !1;
                                break;
                            default:
                                Nd(e, t, h, null, r, p)
                        }
                    for (l in r)
                        if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
                            case `selected`:
                                e.selected = p && typeof p != `function` && typeof p != `symbol`;
                                break;
                            default:
                                Nd(e, t, l, p, r, m)
                        }
                    return;
                case `img`:
                case `link`:
                case `area`:
                case `base`:
                case `br`:
                case `col`:
                case `embed`:
                case `hr`:
                case `keygen`:
                case `meta`:
                case `param`:
                case `source`:
                case `track`:
                case `wbr`:
                case `menuitem`:
                    for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Nd(e, t, g, null, r, p);
                    for (u in r)
                        if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
                            case `children`:
                            case `dangerouslySetInnerHTML`:
                                if (p != null) throw Error(i(137, t));
                                break;
                            default:
                                Nd(e, t, u, p, r, m)
                        }
                    return;
                default:
                    if (Jt(t)) {
                        for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Pd(e, t, _, void 0, r, p);
                        for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Pd(e, t, d, p, r, m);
                        return
                    }
            }
            for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Nd(e, t, v, null, r, p);
            for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Nd(e, t, f, p, r, m)
        }

        function Ld(e) {
            switch (e) {
                case `css`:
                case `script`:
                case `font`:
                case `img`:
                case `image`:
                case `input`:
                case `link`:
                    return !0;
                default:
                    return !1
            }
        }

        function Rd() {
            if (typeof performance.getEntriesByType == `function`) {
                for (var e = 0, t = 0, n = performance.getEntriesByType(`resource`), r = 0; r < n.length; r++) {
                    var i = n[r],
                        a = i.transferSize,
                        o = i.initiatorType,
                        s = i.duration;
                    if (a && s && Ld(o)) {
                        for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
                            var c = n[r],
                                l = c.startTime;
                            if (l > s) break;
                            var u = c.transferSize,
                                d = c.initiatorType;
                            u && Ld(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)))
                        }
                        if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break
                    }
                }
                if (0 < e) return t / e / 1e6
            }
            return navigator.connection && (e = navigator.connection.downlink, typeof e == `number`) ? e : 5
        }
        var zd = null,
            Bd = null;

        function Vd(e) {
            return e.nodeType === 9 ? e : e.ownerDocument
        }

        function Hd(e) {
            switch (e) {
                case `http://www.w3.org/2000/svg`:
                    return 1;
                case `http://www.w3.org/1998/Math/MathML`:
                    return 2;
                default:
                    return 0
            }
        }

        function Ud(e, t) {
            if (e === 0) switch (t) {
                case `svg`:
                    return 1;
                case `math`:
                    return 2;
                default:
                    return 0
            }
            return e === 1 && t === `foreignObject` ? 0 : e
        }

        function Wd(e, t) {
            return e === `textarea` || e === `noscript` || typeof t.children == `string` || typeof t.children == `number` || typeof t.children == `bigint` || typeof t.dangerouslySetInnerHTML == `object` && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
        }
        var Gd = null;

        function Kd() {
            var e = window.event;
            return e && e.type === `popstate` ? e === Gd ? !1 : (Gd = e, !0) : (Gd = null, !1)
        }
        var qd = typeof setTimeout == `function` ? setTimeout : void 0,
            Jd = typeof clearTimeout == `function` ? clearTimeout : void 0,
            Yd = typeof Promise == `function` ? Promise : void 0,
            Xd = typeof queueMicrotask == `function` ? queueMicrotask : Yd === void 0 ? qd : function(e) {
                return Yd.resolve(null).then(e).catch(Zd)
            };

        function Zd(e) {
            setTimeout(function() {
                throw e
            })
        }

        function Qd(e) {
            return e === `head`
        }

        function $d(e, t) {
            var n = t,
                r = 0;
            do {
                var i = n.nextSibling;
                if (e.removeChild(n), i && i.nodeType === 8)
                    if (n = i.data, n === `/$` || n === `/&`) {
                        if (r === 0) {
                            e.removeChild(i), Pp(t);
                            return
                        }
                        r--
                    } else if (n === `$` || n === `$?` || n === `$~` || n === `$!` || n === `&`) r++;
                else if (n === `html`) mf(e.ownerDocument.documentElement);
                else if (n === `head`) {
                    n = e.ownerDocument.head, mf(n);
                    for (var a = n.firstChild; a;) {
                        var o = a.nextSibling,
                            s = a.nodeName;
                        a[ht] || s === `SCRIPT` || s === `STYLE` || s === `LINK` && a.rel.toLowerCase() === `stylesheet` || n.removeChild(a), a = o
                    }
                } else n === `body` && mf(e.ownerDocument.body);
                n = i
            } while (n);
            Pp(t)
        }

        function ef(e, t) {
            var n = e;
            e = 0;
            do {
                var r = n.nextSibling;
                if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = `none`) : (n.style.display = n._stashedDisplay || ``, n.getAttribute(`style`) === `` && n.removeAttribute(`style`)) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = ``) : n.nodeValue = n._stashedText || ``), r && r.nodeType === 8)
                    if (n = r.data, n === `/$`) {
                        if (e === 0) break;
                        e--
                    } else n !== `$` && n !== `$?` && n !== `$~` && n !== `$!` || e++;
                n = r
            } while (n)
        }

        function tf(e) {
            var t = e.firstChild;
            for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
                var n = t;
                switch (t = t.nextSibling, n.nodeName) {
                    case `HTML`:
                    case `HEAD`:
                    case `BODY`:
                        tf(n), L(n);
                        continue;
                    case `SCRIPT`:
                    case `STYLE`:
                        continue;
                    case `LINK`:
                        if (n.rel.toLowerCase() === `stylesheet`) continue
                }
                e.removeChild(n)
            }
        }

        function nf(e, t, n, r) {
            for (; e.nodeType === 1;) {
                var i = n;
                if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                    if (!r && (e.nodeName !== `INPUT` || e.type !== `hidden`)) break
                } else if (!r)
                    if (t === `input` && e.type === `hidden`) {
                        var a = i.name == null ? null : `` + i.name;
                        if (i.type === `hidden` && e.getAttribute(`name`) === a) return e
                    } else return e;
                else if (!e[ht]) switch (t) {
                    case `meta`:
                        if (!e.hasAttribute(`itemprop`)) break;
                        return e;
                    case `link`:
                        if (a = e.getAttribute(`rel`), a === `stylesheet` && e.hasAttribute(`data-precedence`) || a !== i.rel || e.getAttribute(`href`) !== (i.href == null || i.href === `` ? null : i.href) || e.getAttribute(`crossorigin`) !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute(`title`) !== (i.title == null ? null : i.title)) break;
                        return e;
                    case `style`:
                        if (e.hasAttribute(`data-precedence`)) break;
                        return e;
                    case `script`:
                        if (a = e.getAttribute(`src`), (a !== (i.src == null ? null : i.src) || e.getAttribute(`type`) !== (i.type == null ? null : i.type) || e.getAttribute(`crossorigin`) !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute(`async`) && !e.hasAttribute(`itemprop`)) break;
                        return e;
                    default:
                        return e
                }
                if (e = lf(e.nextSibling), e === null) break
            }
            return null
        }

        function rf(e, t, n) {
            if (t === ``) return null;
            for (; e.nodeType !== 3;)
                if ((e.nodeType !== 1 || e.nodeName !== `INPUT` || e.type !== `hidden`) && !n || (e = lf(e.nextSibling), e === null)) return null;
            return e
        }

        function af(e, t) {
            for (; e.nodeType !== 8;)
                if ((e.nodeType !== 1 || e.nodeName !== `INPUT` || e.type !== `hidden`) && !t || (e = lf(e.nextSibling), e === null)) return null;
            return e
        }

        function of(e) {
            return e.data === `$?` || e.data === `$~`
        }

        function sf(e) {
            return e.data === `$!` || e.data === `$?` && e.ownerDocument.readyState !== `loading`
        }

        function cf(e, t) {
            var n = e.ownerDocument;
            if (e.data === `$~`) e._reactRetry = t;
            else if (e.data !== `$?` || n.readyState !== `loading`) t();
            else {
                var r = function() {
                    t(), n.removeEventListener(`DOMContentLoaded`, r)
                };
                n.addEventListener(`DOMContentLoaded`, r), e._reactRetry = r
            }
        }

        function lf(e) {
            for (; e != null; e = e.nextSibling) {
                var t = e.nodeType;
                if (t === 1 || t === 3) break;
                if (t === 8) {
                    if (t = e.data, t === `$` || t === `$!` || t === `$?` || t === `$~` || t === `&` || t === `F!` || t === `F`) break;
                    if (t === `/$` || t === `/&`) return null
                }
            }
            return e
        }
        var uf = null;

        function df(e) {
            e = e.nextSibling;
            for (var t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === `/$` || n === `/&`) {
                        if (t === 0) return lf(e.nextSibling);
                        t--
                    } else n !== `$` && n !== `$!` && n !== `$?` && n !== `$~` && n !== `&` || t++
                }
                e = e.nextSibling
            }
            return null
        }

        function ff(e) {
            e = e.previousSibling;
            for (var t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === `$` || n === `$!` || n === `$?` || n === `$~` || n === `&`) {
                        if (t === 0) return e;
                        t--
                    } else n !== `/$` && n !== `/&` || t++
                }
                e = e.previousSibling
            }
            return null
        }

        function pf(e, t, n) {
            switch (t = Vd(n), e) {
                case `html`:
                    if (e = t.documentElement, !e) throw Error(i(452));
                    return e;
                case `head`:
                    if (e = t.head, !e) throw Error(i(453));
                    return e;
                case `body`:
                    if (e = t.body, !e) throw Error(i(454));
                    return e;
                default:
                    throw Error(i(451))
            }
        }

        function mf(e) {
            for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
            L(e)
        }
        var hf = new Map,
            gf = new Set;

        function _f(e) {
            return typeof e.getRootNode == `function` ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument
        }
        var vf = E.d;
        E.d = {
            f: yf,
            r: bf,
            D: Cf,
            C: wf,
            L: Tf,
            m: Ef,
            X: Of,
            S: Df,
            M: kf
        };

        function yf() {
            var e = vf.f(),
                t = bu();
            return e || t
        }

        function bf(e) {
            var t = _t(e);
            t !== null && t.tag === 5 && t.type === `form` ? Ts(t) : vf.r(e)
        }
        var xf = typeof document > `u` ? null : document;

        function Sf(e, t, n) {
            var r = xf;
            if (r && typeof t == `string` && t) {
                var i = Rt(t);
                i = `link[rel="` + e + `"][href="` + i + `"]`, typeof n == `string` && (i += `[crossorigin="` + n + `"]`), gf.has(i) || (gf.add(i), e = {
                    rel: e,
                    crossOrigin: n,
                    href: t
                }, r.querySelector(i) === null && (t = r.createElement(`link`), Fd(t, `link`, e), bt(t), r.head.appendChild(t)))
            }
        }

        function Cf(e) {
            vf.D(e), Sf(`dns-prefetch`, e, null)
        }

        function wf(e, t) {
            vf.C(e, t), Sf(`preconnect`, e, t)
        }

        function Tf(e, t, n) {
            vf.L(e, t, n);
            var r = xf;
            if (r && e && t) {
                var i = `link[rel="preload"][as="` + Rt(t) + `"]`;
                t === `image` && n && n.imageSrcSet ? (i += `[imagesrcset="` + Rt(n.imageSrcSet) + `"]`, typeof n.imageSizes == `string` && (i += `[imagesizes="` + Rt(n.imageSizes) + `"]`)) : i += `[href="` + Rt(e) + `"]`;
                var a = i;
                switch (t) {
                    case `style`:
                        a = jf(e);
                        break;
                    case `script`:
                        a = Ff(e)
                }
                hf.has(a) || (e = f({
                    rel: `preload`,
                    href: t === `image` && n && n.imageSrcSet ? void 0 : e,
                    as: t
                }, n), hf.set(a, e), r.querySelector(i) !== null || t === `style` && r.querySelector(Mf(a)) || t === `script` && r.querySelector(If(a)) || (t = r.createElement(`link`), Fd(t, `link`, e), bt(t), r.head.appendChild(t)))
            }
        }

        function Ef(e, t) {
            vf.m(e, t);
            var n = xf;
            if (n && e) {
                var r = t && typeof t.as == `string` ? t.as : `script`,
                    i = `link[rel="modulepreload"][as="` + Rt(r) + `"][href="` + Rt(e) + `"]`,
                    a = i;
                switch (r) {
                    case `audioworklet`:
                    case `paintworklet`:
                    case `serviceworker`:
                    case `sharedworker`:
                    case `worker`:
                    case `script`:
                        a = Ff(e)
                }
                if (!hf.has(a) && (e = f({
                        rel: `modulepreload`,
                        href: e
                    }, t), hf.set(a, e), n.querySelector(i) === null)) {
                    switch (r) {
                        case `audioworklet`:
                        case `paintworklet`:
                        case `serviceworker`:
                        case `sharedworker`:
                        case `worker`:
                        case `script`:
                            if (n.querySelector(If(a))) return
                    }
                    r = n.createElement(`link`), Fd(r, `link`, e), bt(r), n.head.appendChild(r)
                }
            }
        }

        function Df(e, t, n) {
            vf.S(e, t, n);
            var r = xf;
            if (r && e) {
                var i = yt(r).hoistableStyles,
                    a = jf(e);
                t ||= `default`;
                var o = i.get(a);
                if (!o) {
                    var s = {
                        loading: 0,
                        preload: null
                    };
                    if (o = r.querySelector(Mf(a))) s.loading = 5;
                    else {
                        e = f({
                            rel: `stylesheet`,
                            href: e,
                            "data-precedence": t
                        }, n), (n = hf.get(a)) && zf(e, n);
                        var c = o = r.createElement(`link`);
                        bt(c), Fd(c, `link`, e), c._p = new Promise(function(e, t) {
                            c.onload = e, c.onerror = t
                        }), c.addEventListener(`load`, function() {
                            s.loading |= 1
                        }), c.addEventListener(`error`, function() {
                            s.loading |= 2
                        }), s.loading |= 4, Rf(o, t, r)
                    }
                    o = {
                        type: `stylesheet`,
                        instance: o,
                        count: 1,
                        state: s
                    }, i.set(a, o)
                }
            }
        }

        function Of(e, t) {
            vf.X(e, t);
            var n = xf;
            if (n && e) {
                var r = yt(n).hoistableScripts,
                    i = Ff(e),
                    a = r.get(i);
                a || (a = n.querySelector(If(i)), a || (e = f({
                    src: e,
                    async: !0
                }, t), (t = hf.get(i)) && Bf(e, t), a = n.createElement(`script`), bt(a), Fd(a, `link`, e), n.head.appendChild(a)), a = {
                    type: `script`,
                    instance: a,
                    count: 1,
                    state: null
                }, r.set(i, a))
            }
        }

        function kf(e, t) {
            vf.M(e, t);
            var n = xf;
            if (n && e) {
                var r = yt(n).hoistableScripts,
                    i = Ff(e),
                    a = r.get(i);
                a || (a = n.querySelector(If(i)), a || (e = f({
                    src: e,
                    async: !0,
                    type: `module`
                }, t), (t = hf.get(i)) && Bf(e, t), a = n.createElement(`script`), bt(a), Fd(a, `link`, e), n.head.appendChild(a)), a = {
                    type: `script`,
                    instance: a,
                    count: 1,
                    state: null
                }, r.set(i, a))
            }
        }

        function Af(e, t, n, r) {
            var a = (a = _e.current) ? _f(a) : null;
            if (!a) throw Error(i(446));
            switch (e) {
                case `meta`:
                case `title`:
                    return null;
                case `style`:
                    return typeof n.precedence == `string` && typeof n.href == `string` ? (t = jf(n.href), n = yt(a).hoistableStyles, r = n.get(t), r || (r = {
                        type: `style`,
                        instance: null,
                        count: 0,
                        state: null
                    }, n.set(t, r)), r) : {
                        type: `void`,
                        instance: null,
                        count: 0,
                        state: null
                    };
                case `link`:
                    if (n.rel === `stylesheet` && typeof n.href == `string` && typeof n.precedence == `string`) {
                        e = jf(n.href);
                        var o = yt(a).hoistableStyles,
                            s = o.get(e);
                        if (s || (a = a.ownerDocument || a, s = {
                                type: `stylesheet`,
                                instance: null,
                                count: 0,
                                state: {
                                    loading: 0,
                                    preload: null
                                }
                            }, o.set(e, s), (o = a.querySelector(Mf(e))) && !o._p && (s.instance = o, s.state.loading = 5), hf.has(e) || (n = {
                                rel: `preload`,
                                as: `style`,
                                href: n.href,
                                crossOrigin: n.crossOrigin,
                                integrity: n.integrity,
                                media: n.media,
                                hrefLang: n.hrefLang,
                                referrerPolicy: n.referrerPolicy
                            }, hf.set(e, n), o || Pf(a, e, n, s.state))), t && r === null) throw Error(i(528, ``));
                        return s
                    }
                    if (t && r !== null) throw Error(i(529, ``));
                    return null;
                case `script`:
                    return t = n.async, n = n.src, typeof n == `string` && t && typeof t != `function` && typeof t != `symbol` ? (t = Ff(n), n = yt(a).hoistableScripts, r = n.get(t), r || (r = {
                        type: `script`,
                        instance: null,
                        count: 0,
                        state: null
                    }, n.set(t, r)), r) : {
                        type: `void`,
                        instance: null,
                        count: 0,
                        state: null
                    };
                default:
                    throw Error(i(444, e))
            }
        }

        function jf(e) {
            return `href="` + Rt(e) + `"`
        }

        function Mf(e) {
            return `link[rel="stylesheet"][` + e + `]`
        }

        function Nf(e) {
            return f({}, e, {
                "data-precedence": e.precedence,
                precedence: null
            })
        }

        function Pf(e, t, n, r) {
            e.querySelector(`link[rel="preload"][as="style"][` + t + `]`) ? r.loading = 1 : (t = e.createElement(`link`), r.preload = t, t.addEventListener(`load`, function() {
                return r.loading |= 1
            }), t.addEventListener(`error`, function() {
                return r.loading |= 2
            }), Fd(t, `link`, n), bt(t), e.head.appendChild(t))
        }

        function Ff(e) {
            return `[src="` + Rt(e) + `"]`
        }

        function If(e) {
            return `script[async]` + e
        }

        function Lf(e, t, n) {
            if (t.count++, t.instance === null) switch (t.type) {
                case `style`:
                    var r = e.querySelector(`style[data-href~="` + Rt(n.href) + `"]`);
                    if (r) return t.instance = r, bt(r), r;
                    var a = f({}, n, {
                        "data-href": n.href,
                        "data-precedence": n.precedence,
                        href: null,
                        precedence: null
                    });
                    return r = (e.ownerDocument || e).createElement(`style`), bt(r), Fd(r, `style`, a), Rf(r, n.precedence, e), t.instance = r;
                case `stylesheet`:
                    a = jf(n.href);
                    var o = e.querySelector(Mf(a));
                    if (o) return t.state.loading |= 4, t.instance = o, bt(o), o;
                    r = Nf(n), (a = hf.get(a)) && zf(r, a), o = (e.ownerDocument || e).createElement(`link`), bt(o);
                    var s = o;
                    return s._p = new Promise(function(e, t) {
                        s.onload = e, s.onerror = t
                    }), Fd(o, `link`, r), t.state.loading |= 4, Rf(o, n.precedence, e), t.instance = o;
                case `script`:
                    return o = Ff(n.src), (a = e.querySelector(If(o))) ? (t.instance = a, bt(a), a) : (r = n, (a = hf.get(o)) && (r = f({}, n), Bf(r, a)), e = e.ownerDocument || e, a = e.createElement(`script`), bt(a), Fd(a, `link`, r), e.head.appendChild(a), t.instance = a);
                case `void`:
                    return null;
                default:
                    throw Error(i(443, t.type))
            } else t.type === `stylesheet` && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Rf(r, n.precedence, e));
            return t.instance
        }

        function Rf(e, t, n) {
            for (var r = n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
                var s = r[o];
                if (s.dataset.precedence === t) a = s;
                else if (a !== i) break
            }
            a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild))
        }

        function zf(e, t) {
            e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title
        }

        function Bf(e, t) {
            e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity
        }
        var Vf = null;

        function Hf(e, t, n) {
            if (Vf === null) {
                var r = new Map,
                    i = Vf = new Map;
                i.set(n, r)
            } else i = Vf, r = i.get(n), r || (r = new Map, i.set(n, r));
            if (r.has(e)) return r;
            for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
                var a = n[i];
                if (!(a[ht] || a[ct] || e === `link` && a.getAttribute(`rel`) === `stylesheet`) && a.namespaceURI !== `http://www.w3.org/2000/svg`) {
                    var o = a.getAttribute(t) || ``;
                    o = e + o;
                    var s = r.get(o);
                    s ? s.push(a) : r.set(o, [a])
                }
            }
            return r
        }

        function Uf(e, t, n) {
            e = e.ownerDocument || e, e.head.insertBefore(n, t === `title` ? e.querySelector(`head > title`) : null)
        }

        function Wf(e, t, n) {
            if (n === 1 || t.itemProp != null) return !1;
            switch (e) {
                case `meta`:
                case `title`:
                    return !0;
                case `style`:
                    if (typeof t.precedence != `string` || typeof t.href != `string` || t.href === ``) break;
                    return !0;
                case `link`:
                    if (typeof t.rel != `string` || typeof t.href != `string` || t.href === `` || t.onLoad || t.onError) break;
                    switch (t.rel) {
                        case `stylesheet`:
                            return e = t.disabled, typeof t.precedence == `string` && e == null;
                        default:
                            return !0
                    }
                case `script`:
                    if (t.async && typeof t.async != `function` && typeof t.async != `symbol` && !t.onLoad && !t.onError && t.src && typeof t.src == `string`) return !0
            }
            return !1
        }

        function Gf(e) {
            return !(e.type === `stylesheet` && !(e.state.loading & 3))
        }

        function Kf(e, t, n, r) {
            if (n.type === `stylesheet` && (typeof r.media != `string` || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
                if (n.instance === null) {
                    var i = jf(r.href),
                        a = t.querySelector(Mf(i));
                    if (a) {
                        t = a._p, typeof t == `object` && t && typeof t.then == `function` && (e.count++, e = Yf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, bt(a);
                        return
                    }
                    a = t.ownerDocument || t, r = Nf(r), (i = hf.get(i)) && zf(r, i), a = a.createElement(`link`), bt(a);
                    var o = a;
                    o._p = new Promise(function(e, t) {
                        o.onload = e, o.onerror = t
                    }), Fd(a, `link`, r), n.instance = a
                }
                e.stylesheets === null && (e.stylesheets = new Map), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Yf.bind(e), t.addEventListener(`load`, n), t.addEventListener(`error`, n))
            }
        }
        var qf = 0;

        function Jf(e, t) {
            return e.stylesheets && e.count === 0 && Zf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
                var r = setTimeout(function() {
                    if (e.stylesheets && Zf(e, e.stylesheets), e.unsuspend) {
                        var t = e.unsuspend;
                        e.unsuspend = null, t()
                    }
                }, 6e4 + t);
                0 < e.imgBytes && qf === 0 && (qf = 62500 * Rd());
                var i = setTimeout(function() {
                    if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Zf(e, e.stylesheets), e.unsuspend)) {
                        var t = e.unsuspend;
                        e.unsuspend = null, t()
                    }
                }, (e.imgBytes > qf ? 50 : 800) + t);
                return e.unsuspend = n,
                    function() {
                        e.unsuspend = null, clearTimeout(r), clearTimeout(i)
                    }
            } : null
        }

        function Yf() {
            if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
                if (this.stylesheets) Zf(this, this.stylesheets);
                else if (this.unsuspend) {
                    var e = this.unsuspend;
                    this.unsuspend = null, e()
                }
            }
        }
        var Xf = null;

        function Zf(e, t) {
            e.stylesheets = null, e.unsuspend !== null && (e.count++, Xf = new Map, t.forEach(Qf, e), Xf = null, Yf.call(e))
        }

        function Qf(e, t) {
            if (!(t.state.loading & 4)) {
                var n = Xf.get(e);
                if (n) var r = n.get(null);
                else {
                    n = new Map, Xf.set(e, n);
                    for (var i = e.querySelectorAll(`link[data-precedence],style[data-precedence]`), a = 0; a < i.length; a++) {
                        var o = i[a];
                        (o.nodeName === `LINK` || o.getAttribute(`media`) !== `not all`) && (n.set(o.dataset.precedence, o), r = o)
                    }
                    r && n.set(null, r)
                }
                i = t.instance, o = i.getAttribute(`data-precedence`), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Yf.bind(this), i.addEventListener(`load`, r), i.addEventListener(`error`, r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4
            }
        }
        var $f = {
            $$typeof: b,
            Provider: null,
            Consumer: null,
            _currentValue: le,
            _currentValue2: le,
            _threadCount: 0
        };

        function ep(e, t, n, r, i, a, o, s, c) {
            this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Qe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Qe(0), this.hiddenUpdates = Qe(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = new Map
        }

        function tp(e, t, n, r, i, a, o, s, c, l, u, d) {
            return e = new ep(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = oi(3, null, null, t), e.current = a, a.stateNode = e, t = aa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
                element: r,
                isDehydrated: n,
                cache: t
            }, Ra(a), e
        }

        function np(e) {
            return e ? (e = ii, e) : ii
        }

        function rp(e, t, n, r, i, a) {
            i = np(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ba(t), r.payload = {
                element: n
            }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Va(e, r, t), n !== null && (hu(n, e, t), Ha(n, e, t))
        }

        function ip(e, t) {
            if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
                var n = e.retryLane;
                e.retryLane = n !== 0 && n < t ? n : t
            }
        }

        function ap(e, t) {
            ip(e, t), (e = e.alternate) && ip(e, t)
        }

        function op(e) {
            if (e.tag === 13 || e.tag === 31) {
                var t = ti(e, 67108864);
                t !== null && hu(t, e, 67108864), ap(e, 67108864)
            }
        }

        function sp(e) {
            if (e.tag === 13 || e.tag === 31) {
                var t = pu();
                t = I(t);
                var n = ti(e, t);
                n !== null && hu(n, e, t), ap(e, t)
            }
        }
        var cp = !0;

        function lp(e, t, n, r) {
            var i = T.T;
            T.T = null;
            var a = E.p;
            try {
                E.p = 2, dp(e, t, n, r)
            } finally {
                E.p = a, T.T = i
            }
        }

        function up(e, t, n, r) {
            var i = T.T;
            T.T = null;
            var a = E.p;
            try {
                E.p = 8, dp(e, t, n, r)
            } finally {
                E.p = a, T.T = i
            }
        }

        function dp(e, t, n, r) {
            if (cp) {
                var i = fp(r);
                if (i === null) wd(e, t, r, pp, n), wp(e, r);
                else if (Ep(i, e, t, n, r)) r.stopPropagation();
                else if (wp(e, r), t & 4 && -1 < Cp.indexOf(e)) {
                    for (; i !== null;) {
                        var a = _t(i);
                        if (a !== null) switch (a.tag) {
                            case 3:
                                if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
                                    var o = F(a.pendingLanes);
                                    if (o !== 0) {
                                        var s = a;
                                        for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
                                            var c = 1 << 31 - Ve(o);
                                            s.entanglements[1] |= c, o &= ~c
                                        }
                                        rd(a), !(G & 6) && (tu = Pe() + 500, id(0, !1))
                                    }
                                }
                                break;
                            case 31:
                            case 13:
                                s = ti(a, 2), s !== null && hu(s, a, 2), bu(), ap(a, 2)
                        }
                        if (a = fp(r), a === null && wd(e, t, r, pp, n), a === i) break;
                        i = a
                    }
                    i !== null && r.stopPropagation()
                } else wd(e, t, r, null, n)
            }
        }

        function fp(e) {
            return e = en(e), mp(e)
        }
        var pp = null;

        function mp(e) {
            if (pp = null, e = gt(e), e !== null) {
                var t = o(e);
                if (t === null) e = null;
                else {
                    var n = t.tag;
                    if (n === 13) {
                        if (e = s(t), e !== null) return e;
                        e = null
                    } else if (n === 31) {
                        if (e = c(t), e !== null) return e;
                        e = null
                    } else if (n === 3) {
                        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
                        e = null
                    } else t !== e && (e = null)
                }
            }
            return pp = e, null
        }

        function hp(e) {
            switch (e) {
                case `beforetoggle`:
                case `cancel`:
                case `click`:
                case `close`:
                case `contextmenu`:
                case `copy`:
                case `cut`:
                case `auxclick`:
                case `dblclick`:
                case `dragend`:
                case `dragstart`:
                case `drop`:
                case `focusin`:
                case `focusout`:
                case `input`:
                case `invalid`:
                case `keydown`:
                case `keypress`:
                case `keyup`:
                case `mousedown`:
                case `mouseup`:
                case `paste`:
                case `pause`:
                case `play`:
                case `pointercancel`:
                case `pointerdown`:
                case `pointerup`:
                case `ratechange`:
                case `reset`:
                case `resize`:
                case `seeked`:
                case `submit`:
                case `toggle`:
                case `touchcancel`:
                case `touchend`:
                case `touchstart`:
                case `volumechange`:
                case `change`:
                case `selectionchange`:
                case `textInput`:
                case `compositionstart`:
                case `compositionend`:
                case `compositionupdate`:
                case `beforeblur`:
                case `afterblur`:
                case `beforeinput`:
                case `blur`:
                case `fullscreenchange`:
                case `focus`:
                case `hashchange`:
                case `popstate`:
                case `select`:
                case `selectstart`:
                    return 2;
                case `drag`:
                case `dragenter`:
                case `dragexit`:
                case `dragleave`:
                case `dragover`:
                case `mousemove`:
                case `mouseout`:
                case `mouseover`:
                case `pointermove`:
                case `pointerout`:
                case `pointerover`:
                case `scroll`:
                case `touchmove`:
                case `wheel`:
                case `mouseenter`:
                case `mouseleave`:
                case `pointerenter`:
                case `pointerleave`:
                    return 8;
                case `message`:
                    switch (Fe()) {
                        case A:
                            return 2;
                        case Ie:
                            return 8;
                        case j:
                        case M:
                            return 32;
                        case N:
                            return 268435456;
                        default:
                            return 32
                    }
                default:
                    return 32
            }
        }
        var gp = !1,
            _p = null,
            vp = null,
            yp = null,
            bp = new Map,
            xp = new Map,
            Sp = [],
            Cp = `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);

        function wp(e, t) {
            switch (e) {
                case `focusin`:
                case `focusout`:
                    _p = null;
                    break;
                case `dragenter`:
                case `dragleave`:
                    vp = null;
                    break;
                case `mouseover`:
                case `mouseout`:
                    yp = null;
                    break;
                case `pointerover`:
                case `pointerout`:
                    bp.delete(t.pointerId);
                    break;
                case `gotpointercapture`:
                case `lostpointercapture`:
                    xp.delete(t.pointerId)
            }
        }

        function Tp(e, t, n, r, i, a) {
            return e === null || e.nativeEvent !== a ? (e = {
                blockedOn: t,
                domEventName: n,
                eventSystemFlags: r,
                nativeEvent: a,
                targetContainers: [i]
            }, t !== null && (t = _t(t), t !== null && op(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e)
        }

        function Ep(e, t, n, r, i) {
            switch (t) {
                case `focusin`:
                    return _p = Tp(_p, e, t, n, r, i), !0;
                case `dragenter`:
                    return vp = Tp(vp, e, t, n, r, i), !0;
                case `mouseover`:
                    return yp = Tp(yp, e, t, n, r, i), !0;
                case `pointerover`:
                    var a = i.pointerId;
                    return bp.set(a, Tp(bp.get(a) || null, e, t, n, r, i)), !0;
                case `gotpointercapture`:
                    return a = i.pointerId, xp.set(a, Tp(xp.get(a) || null, e, t, n, r, i)), !0
            }
            return !1
        }

        function Dp(e) {
            var t = gt(e.target);
            if (t !== null) {
                var n = o(t);
                if (n !== null) {
                    if (t = n.tag, t === 13) {
                        if (t = s(n), t !== null) {
                            e.blockedOn = t, ot(e.priority, function() {
                                sp(n)
                            });
                            return
                        }
                    } else if (t === 31) {
                        if (t = c(n), t !== null) {
                            e.blockedOn = t, ot(e.priority, function() {
                                sp(n)
                            });
                            return
                        }
                    } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                        return
                    }
                }
            }
            e.blockedOn = null
        }

        function Op(e) {
            if (e.blockedOn !== null) return !1;
            for (var t = e.targetContainers; 0 < t.length;) {
                var n = fp(e.nativeEvent);
                if (n === null) {
                    n = e.nativeEvent;
                    var r = new n.constructor(n.type, n);
                    $t = r, n.target.dispatchEvent(r), $t = null
                } else return t = _t(n), t !== null && op(t), e.blockedOn = n, !1;
                t.shift()
            }
            return !0
        }

        function kp(e, t, n) {
            Op(e) && n.delete(t)
        }

        function Ap() {
            gp = !1, _p !== null && Op(_p) && (_p = null), vp !== null && Op(vp) && (vp = null), yp !== null && Op(yp) && (yp = null), bp.forEach(kp), xp.forEach(kp)
        }

        function jp(e, n) {
            e.blockedOn === n && (e.blockedOn = null, gp || (gp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Ap)))
        }
        var Mp = null;

        function Np(e) {
            Mp !== e && (Mp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
                Mp === e && (Mp = null);
                for (var t = 0; t < e.length; t += 3) {
                    var n = e[t],
                        r = e[t + 1],
                        i = e[t + 2];
                    if (typeof r != `function`) {
                        if (mp(r || n) === null) continue;
                        break
                    }
                    var a = _t(n);
                    a !== null && (e.splice(t, 3), t -= 3, Cs(a, {
                        pending: !0,
                        data: i,
                        method: n.method,
                        action: r
                    }, r, i))
                }
            }))
        }

        function Pp(e) {
            function t(t) {
                return jp(t, e)
            }
            _p !== null && jp(_p, e), vp !== null && jp(vp, e), yp !== null && jp(yp, e), bp.forEach(t), xp.forEach(t);
            for (var n = 0; n < Sp.length; n++) {
                var r = Sp[n];
                r.blockedOn === e && (r.blockedOn = null)
            }
            for (; 0 < Sp.length && (n = Sp[0], n.blockedOn === null);) Dp(n), n.blockedOn === null && Sp.shift();
            if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
                for (r = 0; r < n.length; r += 3) {
                    var i = n[r],
                        a = n[r + 1],
                        o = i[lt] || null;
                    if (typeof a == `function`) o || Np(n);
                    else if (o) {
                        var s = null;
                        if (a && a.hasAttribute(`formAction`)) {
                            if (i = a, o = a[lt] || null) s = o.formAction;
                            else if (mp(i) !== null) continue
                        } else s = o.action;
                        typeof s == `function` ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Np(n)
                    }
                }
        }

        function Fp() {
            function e(e) {
                e.canIntercept && e.info === `react-transition` && e.intercept({
                    handler: function() {
                        return new Promise(function(e) {
                            return i = e
                        })
                    },
                    focusReset: `manual`,
                    scroll: `manual`
                })
            }

            function t() {
                i !== null && (i(), i = null), r || setTimeout(n, 20)
            }

            function n() {
                if (!r && !navigation.transition) {
                    var e = navigation.currentEntry;
                    e && e.url != null && navigation.navigate(e.url, {
                        state: e.getState(),
                        info: `react-transition`,
                        history: `replace`
                    })
                }
            }
            if (typeof navigation == `object`) {
                var r = !1,
                    i = null;
                return navigation.addEventListener(`navigate`, e), navigation.addEventListener(`navigatesuccess`, t), navigation.addEventListener(`navigateerror`, t), setTimeout(n, 100),
                    function() {
                        r = !0, navigation.removeEventListener(`navigate`, e), navigation.removeEventListener(`navigatesuccess`, t), navigation.removeEventListener(`navigateerror`, t), i !== null && (i(), i = null)
                    }
            }
        }

        function Ip(e) {
            this._internalRoot = e
        }
        Lp.prototype.render = Ip.prototype.render = function(e) {
            var t = this._internalRoot;
            if (t === null) throw Error(i(409));
            var n = t.current;
            rp(n, pu(), e, t, null, null)
        }, Lp.prototype.unmount = Ip.prototype.unmount = function() {
            var e = this._internalRoot;
            if (e !== null) {
                this._internalRoot = null;
                var t = e.containerInfo;
                rp(e.current, 2, null, e, null, null), bu(), t[ut] = null
            }
        };

        function Lp(e) {
            this._internalRoot = e
        }
        Lp.prototype.unstable_scheduleHydration = function(e) {
            if (e) {
                var t = at();
                e = {
                    blockedOn: null,
                    target: e,
                    priority: t
                };
                for (var n = 0; n < Sp.length && t !== 0 && t < Sp[n].priority; n++);
                Sp.splice(n, 0, e), n === 0 && Dp(e)
            }
        };
        var Rp = n.version;
        if (Rp !== `19.2.4`) throw Error(i(527, Rp, `19.2.4`));
        E.findDOMNode = function(e) {
            var t = e._reactInternals;
            if (t === void 0) throw typeof e.render == `function` ? Error(i(188)) : (e = Object.keys(e).join(`,`), Error(i(268, e)));
            return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e
        };
        var zp = {
            bundleType: 0,
            version: `19.2.4`,
            rendererPackageName: `react-dom`,
            currentDispatcherRef: T,
            reconcilerVersion: `19.2.4`
        };
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
            var Bp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
            if (!Bp.isDisabled && Bp.supportsFiber) try {
                Re = Bp.inject(zp), ze = Bp
            } catch {}
        }
        e.createRoot = function(e, t) {
            if (!a(e)) throw Error(i(299));
            var n = !1,
                r = ``,
                o = Ks,
                s = qs,
                c = Js;
            return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = tp(e, 1, !1, null, null, n, r, null, o, s, c, Fp), e[ut] = t.current, Sd(e), new Ip(t)
        }
    })),
    me = T(((e, t) => {
        function n() {
            if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`)) try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)
            } catch (e) {
                console.error(e)
            }
        }
        n(), t.exports = pe()
    }))(),
    D = ce();
re(`firebase`, `12.11.0`, `app`);
var O = typeof globalThis < `u` ? globalThis : typeof window < `u` ? window : typeof global < `u` ? global : typeof self < `u` ? self : {},
    he = {},
    ge, _e;
(function() {
    var e;

    function t(e, t) {
        function n() {}
        n.prototype = t.prototype, e.F = t.prototype, e.prototype = new n, e.prototype.constructor = e, e.D = function(e, n, r) {
            for (var i = Array(arguments.length - 2), a = 2; a < arguments.length; a++) i[a - 2] = arguments[a];
            return t.prototype[n].apply(e, i)
        }
    }

    function n() {
        this.blockSize = -1
    }

    function r() {
        this.blockSize = -1, this.blockSize = 64, this.g = [, , , , ], this.C = Array(this.blockSize), this.o = this.h = 0, this.u()
    }
    t(r, n), r.prototype.u = function() {
        this.g[0] = 1732584193, this.g[1] = 4023233417, this.g[2] = 2562383102, this.g[3] = 271733878, this.o = this.h = 0
    };

    function i(e, t, n) {
        n ||= 0;
        let r = Array(16);
        if (typeof t == `string`)
            for (var i = 0; i < 16; ++i) r[i] = t.charCodeAt(n++) | t.charCodeAt(n++) << 8 | t.charCodeAt(n++) << 16 | t.charCodeAt(n++) << 24;
        else
            for (i = 0; i < 16; ++i) r[i] = t[n++] | t[n++] << 8 | t[n++] << 16 | t[n++] << 24;
        t = e.g[0], n = e.g[1], i = e.g[2];
        let a = e.g[3],
            o;
        o = t + (a ^ n & (i ^ a)) + r[0] + 3614090360 & 4294967295, t = n + (o << 7 & 4294967295 | o >>> 25), o = a + (i ^ t & (n ^ i)) + r[1] + 3905402710 & 4294967295, a = t + (o << 12 & 4294967295 | o >>> 20), o = i + (n ^ a & (t ^ n)) + r[2] + 606105819 & 4294967295, i = a + (o << 17 & 4294967295 | o >>> 15), o = n + (t ^ i & (a ^ t)) + r[3] + 3250441966 & 4294967295, n = i + (o << 22 & 4294967295 | o >>> 10), o = t + (a ^ n & (i ^ a)) + r[4] + 4118548399 & 4294967295, t = n + (o << 7 & 4294967295 | o >>> 25), o = a + (i ^ t & (n ^ i)) + r[5] + 1200080426 & 4294967295, a = t + (o << 12 & 4294967295 | o >>> 20), o = i + (n ^ a & (t ^ n)) + r[6] + 2821735955 & 4294967295, i = a + (o << 17 & 4294967295 | o >>> 15), o = n + (t ^ i & (a ^ t)) + r[7] + 4249261313 & 4294967295, n = i + (o << 22 & 4294967295 | o >>> 10), o = t + (a ^ n & (i ^ a)) + r[8] + 1770035416 & 4294967295, t = n + (o << 7 & 4294967295 | o >>> 25), o = a + (i ^ t & (n ^ i)) + r[9] + 2336552879 & 4294967295, a = t + (o << 12 & 4294967295 | o >>> 20), o = i + (n ^ a & (t ^ n)) + r[10] + 4294925233 & 4294967295, i = a + (o << 17 & 4294967295 | o >>> 15), o = n + (t ^ i & (a ^ t)) + r[11] + 2304563134 & 4294967295, n = i + (o << 22 & 4294967295 | o >>> 10), o = t + (a ^ n & (i ^ a)) + r[12] + 1804603682 & 4294967295, t = n + (o << 7 & 4294967295 | o >>> 25), o = a + (i ^ t & (n ^ i)) + r[13] + 4254626195 & 4294967295, a = t + (o << 12 & 4294967295 | o >>> 20), o = i + (n ^ a & (t ^ n)) + r[14] + 2792965006 & 4294967295, i = a + (o << 17 & 4294967295 | o >>> 15), o = n + (t ^ i & (a ^ t)) + r[15] + 1236535329 & 4294967295, n = i + (o << 22 & 4294967295 | o >>> 10), o = t + (i ^ a & (n ^ i)) + r[1] + 4129170786 & 4294967295, t = n + (o << 5 & 4294967295 | o >>> 27), o = a + (n ^ i & (t ^ n)) + r[6] + 3225465664 & 4294967295, a = t + (o << 9 & 4294967295 | o >>> 23), o = i + (t ^ n & (a ^ t)) + r[11] + 643717713 & 4294967295, i = a + (o << 14 & 4294967295 | o >>> 18), o = n + (a ^ t & (i ^ a)) + r[0] + 3921069994 & 4294967295, n = i + (o << 20 & 4294967295 | o >>> 12), o = t + (i ^ a & (n ^ i)) + r[5] + 3593408605 & 4294967295, t = n + (o << 5 & 4294967295 | o >>> 27), o = a + (n ^ i & (t ^ n)) + r[10] + 38016083 & 4294967295, a = t + (o << 9 & 4294967295 | o >>> 23), o = i + (t ^ n & (a ^ t)) + r[15] + 3634488961 & 4294967295, i = a + (o << 14 & 4294967295 | o >>> 18), o = n + (a ^ t & (i ^ a)) + r[4] + 3889429448 & 4294967295, n = i + (o << 20 & 4294967295 | o >>> 12), o = t + (i ^ a & (n ^ i)) + r[9] + 568446438 & 4294967295, t = n + (o << 5 & 4294967295 | o >>> 27), o = a + (n ^ i & (t ^ n)) + r[14] + 3275163606 & 4294967295, a = t + (o << 9 & 4294967295 | o >>> 23), o = i + (t ^ n & (a ^ t)) + r[3] + 4107603335 & 4294967295, i = a + (o << 14 & 4294967295 | o >>> 18), o = n + (a ^ t & (i ^ a)) + r[8] + 1163531501 & 4294967295, n = i + (o << 20 & 4294967295 | o >>> 12), o = t + (i ^ a & (n ^ i)) + r[13] + 2850285829 & 4294967295, t = n + (o << 5 & 4294967295 | o >>> 27), o = a + (n ^ i & (t ^ n)) + r[2] + 4243563512 & 4294967295, a = t + (o << 9 & 4294967295 | o >>> 23), o = i + (t ^ n & (a ^ t)) + r[7] + 1735328473 & 4294967295, i = a + (o << 14 & 4294967295 | o >>> 18), o = n + (a ^ t & (i ^ a)) + r[12] + 2368359562 & 4294967295, n = i + (o << 20 & 4294967295 | o >>> 12), o = t + (n ^ i ^ a) + r[5] + 4294588738 & 4294967295, t = n + (o << 4 & 4294967295 | o >>> 28), o = a + (t ^ n ^ i) + r[8] + 2272392833 & 4294967295, a = t + (o << 11 & 4294967295 | o >>> 21), o = i + (a ^ t ^ n) + r[11] + 1839030562 & 4294967295, i = a + (o << 16 & 4294967295 | o >>> 16), o = n + (i ^ a ^ t) + r[14] + 4259657740 & 4294967295, n = i + (o << 23 & 4294967295 | o >>> 9), o = t + (n ^ i ^ a) + r[1] + 2763975236 & 4294967295, t = n + (o << 4 & 4294967295 | o >>> 28), o = a + (t ^ n ^ i) + r[4] + 1272893353 & 4294967295, a = t + (o << 11 & 4294967295 | o >>> 21), o = i + (a ^ t ^ n) + r[7] + 4139469664 & 4294967295, i = a + (o << 16 & 4294967295 | o >>> 16), o = n + (i ^ a ^ t) + r[10] + 3200236656 & 4294967295, n = i + (o << 23 & 4294967295 | o >>> 9), o = t + (n ^ i ^ a) + r[13] + 681279174 & 4294967295, t = n + (o << 4 & 4294967295 | o >>> 28), o = a + (t ^ n ^ i) + r[0] + 3936430074 & 4294967295, a = t + (o << 11 & 4294967295 | o >>> 21), o = i + (a ^ t ^ n) + r[3] + 3572445317 & 4294967295, i = a + (o << 16 & 4294967295 | o >>> 16), o = n + (i ^ a ^ t) + r[6] + 76029189 & 4294967295, n = i + (o << 23 & 4294967295 | o >>> 9), o = t + (n ^ i ^ a) + r[9] + 3654602809 & 4294967295, t = n + (o << 4 & 4294967295 | o >>> 28), o = a + (t ^ n ^ i) + r[12] + 3873151461 & 4294967295, a = t + (o << 11 & 4294967295 | o >>> 21), o = i + (a ^ t ^ n) + r[15] + 530742520 & 4294967295, i = a + (o << 16 & 4294967295 | o >>> 16), o = n + (i ^ a ^ t) + r[2] + 3299628645 & 4294967295, n = i + (o << 23 & 4294967295 | o >>> 9), o = t + (i ^ (n | ~a)) + r[0] + 4096336452 & 4294967295, t = n + (o << 6 & 4294967295 | o >>> 26), o = a + (n ^ (t | ~i)) + r[7] + 1126891415 & 4294967295, a = t + (o << 10 & 4294967295 | o >>> 22), o = i + (t ^ (a | ~n)) + r[14] + 2878612391 & 4294967295, i = a + (o << 15 & 4294967295 | o >>> 17), o = n + (a ^ (i | ~t)) + r[5] + 4237533241 & 4294967295, n = i + (o << 21 & 4294967295 | o >>> 11), o = t + (i ^ (n | ~a)) + r[12] + 1700485571 & 4294967295, t = n + (o << 6 & 4294967295 | o >>> 26), o = a + (n ^ (t | ~i)) + r[3] + 2399980690 & 4294967295, a = t + (o << 10 & 4294967295 | o >>> 22), o = i + (t ^ (a | ~n)) + r[10] + 4293915773 & 4294967295, i = a + (o << 15 & 4294967295 | o >>> 17), o = n + (a ^ (i | ~t)) + r[1] + 2240044497 & 4294967295, n = i + (o << 21 & 4294967295 | o >>> 11), o = t + (i ^ (n | ~a)) + r[8] + 1873313359 & 4294967295, t = n + (o << 6 & 4294967295 | o >>> 26), o = a + (n ^ (t | ~i)) + r[15] + 4264355552 & 4294967295, a = t + (o << 10 & 4294967295 | o >>> 22), o = i + (t ^ (a | ~n)) + r[6] + 2734768916 & 4294967295, i = a + (o << 15 & 4294967295 | o >>> 17), o = n + (a ^ (i | ~t)) + r[13] + 1309151649 & 4294967295, n = i + (o << 21 & 4294967295 | o >>> 11), o = t + (i ^ (n | ~a)) + r[4] + 4149444226 & 4294967295, t = n + (o << 6 & 4294967295 | o >>> 26), o = a + (n ^ (t | ~i)) + r[11] + 3174756917 & 4294967295, a = t + (o << 10 & 4294967295 | o >>> 22), o = i + (t ^ (a | ~n)) + r[2] + 718787259 & 4294967295, i = a + (o << 15 & 4294967295 | o >>> 17), o = n + (a ^ (i | ~t)) + r[9] + 3951481745 & 4294967295, e.g[0] = e.g[0] + t & 4294967295, e.g[1] = e.g[1] + (i + (o << 21 & 4294967295 | o >>> 11)) & 4294967295, e.g[2] = e.g[2] + i & 4294967295, e.g[3] = e.g[3] + a & 4294967295
    }
    r.prototype.v = function(e, t) {
        t === void 0 && (t = e.length);
        let n = t - this.blockSize,
            r = this.C,
            a = this.h,
            o = 0;
        for (; o < t;) {
            if (a == 0)
                for (; o <= n;) i(this, e, o), o += this.blockSize;
            if (typeof e == `string`) {
                for (; o < t;)
                    if (r[a++] = e.charCodeAt(o++), a == this.blockSize) {
                        i(this, r), a = 0;
                        break
                    }
            } else
                for (; o < t;)
                    if (r[a++] = e[o++], a == this.blockSize) {
                        i(this, r), a = 0;
                        break
                    }
        }
        this.h = a, this.o += t
    }, r.prototype.A = function() {
        var e = Array((this.h < 56 ? this.blockSize : this.blockSize * 2) - this.h);
        e[0] = 128;
        for (var t = 1; t < e.length - 8; ++t) e[t] = 0;
        t = this.o * 8;
        for (var n = e.length - 8; n < e.length; ++n) e[n] = t & 255, t /= 256;
        for (this.v(e), e = Array(16), t = 0, n = 0; n < 4; ++n)
            for (let r = 0; r < 32; r += 8) e[t++] = this.g[n] >>> r & 255;
        return e
    };

    function a(e, t) {
        var n = s;
        return Object.prototype.hasOwnProperty.call(n, e) ? n[e] : n[e] = t(e)
    }

    function o(e, t) {
        this.h = t;
        let n = [],
            r = !0;
        for (let i = e.length - 1; i >= 0; i--) {
            let a = e[i] | 0;
            r && a == t || (n[i] = a, r = !1)
        }
        this.g = n
    }
    var s = {};

    function c(e) {
        return -128 <= e && e < 128 ? a(e, function(e) {
            return new o([e | 0], e < 0 ? -1 : 0)
        }) : new o([e | 0], e < 0 ? -1 : 0)
    }

    function l(e) {
        if (isNaN(e) || !isFinite(e)) return d;
        if (e < 0) return g(l(-e));
        let t = [],
            n = 1;
        for (let r = 0; e >= n; r++) t[r] = e / n | 0, n *= 4294967296;
        return new o(t, 0)
    }

    function u(e, t) {
        if (e.length == 0) throw Error(`number format error: empty string`);
        if (t ||= 10, t < 2 || 36 < t) throw Error(`radix out of range: ` + t);
        if (e.charAt(0) == `-`) return g(u(e.substring(1), t));
        if (e.indexOf(`-`) >= 0) throw Error(`number format error: interior "-" character`);
        let n = l(t ** 8),
            r = d;
        for (let a = 0; a < e.length; a += 8) {
            var i = Math.min(8, e.length - a);
            let o = parseInt(e.substring(a, a + i), t);
            i < 8 ? (i = l(t ** +i), r = r.j(i).add(l(o))) : (r = r.j(n), r = r.add(l(o)))
        }
        return r
    }
    var d = c(0),
        f = c(1),
        p = c(16777216);
    e = o.prototype, e.m = function() {
        if (h(this)) return -g(this).m();
        let e = 0,
            t = 1;
        for (let n = 0; n < this.g.length; n++) {
            let r = this.i(n);
            e += (r >= 0 ? r : 4294967296 + r) * t, t *= 4294967296
        }
        return e
    }, e.toString = function(e) {
        if (e ||= 10, e < 2 || 36 < e) throw Error(`radix out of range: ` + e);
        if (m(this)) return `0`;
        if (h(this)) return `-` + g(this).toString(e);
        let t = l(e ** 6);
        var n = this;
        let r = ``;
        for (;;) {
            let i = b(n, t).g;
            n = _(n, i.j(t));
            let a = ((n.g.length > 0 ? n.g[0] : n.h) >>> 0).toString(e);
            if (n = i, m(n)) return a + r;
            for (; a.length < 6;) a = `0` + a;
            r = a + r
        }
    }, e.i = function(e) {
        return e < 0 ? 0 : e < this.g.length ? this.g[e] : this.h
    };

    function m(e) {
        if (e.h != 0) return !1;
        for (let t = 0; t < e.g.length; t++)
            if (e.g[t] != 0) return !1;
        return !0
    }

    function h(e) {
        return e.h == -1
    }
    e.l = function(e) {
        return e = _(this, e), h(e) ? -1 : m(e) ? 0 : 1
    };

    function g(e) {
        let t = e.g.length,
            n = [];
        for (let r = 0; r < t; r++) n[r] = ~e.g[r];
        return new o(n, ~e.h).add(f)
    }
    e.abs = function() {
        return h(this) ? g(this) : this
    }, e.add = function(e) {
        let t = Math.max(this.g.length, e.g.length),
            n = [],
            r = 0;
        for (let i = 0; i <= t; i++) {
            let t = r + (this.i(i) & 65535) + (e.i(i) & 65535),
                a = (t >>> 16) + (this.i(i) >>> 16) + (e.i(i) >>> 16);
            r = a >>> 16, t &= 65535, a &= 65535, n[i] = a << 16 | t
        }
        return new o(n, n[n.length - 1] & -2147483648 ? -1 : 0)
    };

    function _(e, t) {
        return e.add(g(t))
    }
    e.j = function(e) {
        if (m(this) || m(e)) return d;
        if (h(this)) return h(e) ? g(this).j(g(e)) : g(g(this).j(e));
        if (h(e)) return g(this.j(g(e)));
        if (this.l(p) < 0 && e.l(p) < 0) return l(this.m() * e.m());
        let t = this.g.length + e.g.length,
            n = [];
        for (var r = 0; r < 2 * t; r++) n[r] = 0;
        for (r = 0; r < this.g.length; r++)
            for (let t = 0; t < e.g.length; t++) {
                let i = this.i(r) >>> 16,
                    a = this.i(r) & 65535,
                    o = e.i(t) >>> 16,
                    s = e.i(t) & 65535;
                n[2 * r + 2 * t] += a * s, v(n, 2 * r + 2 * t), n[2 * r + 2 * t + 1] += i * s, v(n, 2 * r + 2 * t + 1), n[2 * r + 2 * t + 1] += a * o, v(n, 2 * r + 2 * t + 1), n[2 * r + 2 * t + 2] += i * o, v(n, 2 * r + 2 * t + 2)
            }
        for (e = 0; e < t; e++) n[e] = n[2 * e + 1] << 16 | n[2 * e];
        for (e = t; e < 2 * t; e++) n[e] = 0;
        return new o(n, 0)
    };

    function v(e, t) {
        for (;
            (e[t] & 65535) != e[t];) e[t + 1] += e[t] >>> 16, e[t] &= 65535, t++
    }

    function y(e, t) {
        this.g = e, this.h = t
    }

    function b(e, t) {
        if (m(t)) throw Error(`division by zero`);
        if (m(e)) return new y(d, d);
        if (h(e)) return t = b(g(e), t), new y(g(t.g), g(t.h));
        if (h(t)) return t = b(e, g(t)), new y(g(t.g), t.h);
        if (e.g.length > 30) {
            if (h(e) || h(t)) throw Error(`slowDivide_ only works with positive integers.`);
            for (var n = f, r = t; r.l(e) <= 0;) n = x(n), r = x(r);
            var i = ee(n, 1),
                a = ee(r, 1);
            for (r = ee(r, 2), n = ee(n, 2); !m(r);) {
                var o = a.add(r);
                o.l(e) <= 0 && (i = i.add(n), a = o), r = ee(r, 1), n = ee(n, 1)
            }
            return t = _(e, i.j(t)), new y(i, t)
        }
        for (i = d; e.l(t) >= 0;) {
            for (n = Math.max(1, Math.floor(e.m() / t.m())), r = Math.ceil(Math.log(n) / Math.LN2), r = r <= 48 ? 1 : 2 ** (r - 48), a = l(n), o = a.j(t); h(o) || o.l(e) > 0;) n -= r, a = l(n), o = a.j(t);
            m(a) && (a = f), i = i.add(a), e = _(e, o)
        }
        return new y(i, e)
    }
    e.B = function(e) {
        return b(this, e).h
    }, e.and = function(e) {
        let t = Math.max(this.g.length, e.g.length),
            n = [];
        for (let r = 0; r < t; r++) n[r] = this.i(r) & e.i(r);
        return new o(n, this.h & e.h)
    }, e.or = function(e) {
        let t = Math.max(this.g.length, e.g.length),
            n = [];
        for (let r = 0; r < t; r++) n[r] = this.i(r) | e.i(r);
        return new o(n, this.h | e.h)
    }, e.xor = function(e) {
        let t = Math.max(this.g.length, e.g.length),
            n = [];
        for (let r = 0; r < t; r++) n[r] = this.i(r) ^ e.i(r);
        return new o(n, this.h ^ e.h)
    };

    function x(e) {
        let t = e.g.length + 1,
            n = [];
        for (let r = 0; r < t; r++) n[r] = e.i(r) << 1 | e.i(r - 1) >>> 31;
        return new o(n, e.h)
    }

    function ee(e, t) {
        let n = t >> 5;
        t %= 32;
        let r = e.g.length - n,
            i = [];
        for (let a = 0; a < r; a++) i[a] = t > 0 ? e.i(a + n) >>> t | e.i(a + n + 1) << 32 - t : e.i(a + n);
        return new o(i, e.h)
    }
    r.prototype.digest = r.prototype.A, r.prototype.reset = r.prototype.u, r.prototype.update = r.prototype.v, _e = he.Md5 = r, o.prototype.add = o.prototype.add, o.prototype.multiply = o.prototype.j, o.prototype.modulo = o.prototype.B, o.prototype.compare = o.prototype.l, o.prototype.toNumber = o.prototype.m, o.prototype.toString = o.prototype.toString, o.prototype.getBits = o.prototype.i, o.fromNumber = l, o.fromString = u, ge = he.Integer = o
}).apply(O === void 0 ? typeof self < `u` ? self : typeof window < `u` ? window : {} : O);
var ve = typeof globalThis < `u` ? globalThis : typeof window < `u` ? window : typeof global < `u` ? global : typeof self < `u` ? self : {},
    ye = {},
    be, xe, Se, Ce, we, Te, Ee, De;
(function() {
    var e, t = Object.defineProperty;

    function n(e) {
        e = [typeof globalThis == `object` && globalThis, e, typeof window == `object` && window, typeof self == `object` && self, typeof ve == `object` && ve];
        for (var t = 0; t < e.length; ++t) {
            var n = e[t];
            if (n && n.Math == Math) return n
        }
        throw Error(`Cannot find global object`)
    }
    var r = n(this);

    function i(e, n) {
        if (n) a: {
            var i = r;e = e.split(`.`);
            for (var a = 0; a < e.length - 1; a++) {
                var o = e[a];
                if (!(o in i)) break a;
                i = i[o]
            }
            e = e[e.length - 1],
            a = i[e],
            n = n(a),
            n != a && n != null && t(i, e, {
                configurable: !0,
                writable: !0,
                value: n
            })
        }
    }
    i(`Symbol.dispose`, function(e) {
        return e || Symbol(`Symbol.dispose`)
    }), i(`Array.prototype.values`, function(e) {
        return e || function() {
            return this[Symbol.iterator]()
        }
    }), i(`Object.entries`, function(e) {
        return e || function(e) {
            var t = [],
                n;
            for (n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push([n, e[n]]);
            return t
        }
    });
    var a = a || {},
        o = this || self;

    function s(e) {
        var t = typeof e;
        return t == `object` && e != null || t == `function`
    }

    function c(e, t, n) {
        return e.call.apply(e.bind, arguments)
    }

    function l(e, t, n) {
        return l = c, l.apply(null, arguments)
    }

    function u(e, t) {
        var n = Array.prototype.slice.call(arguments, 1);
        return function() {
            var t = n.slice();
            return t.push.apply(t, arguments), e.apply(this, t)
        }
    }

    function d(e, t) {
        function n() {}
        n.prototype = t.prototype, e.Z = t.prototype, e.prototype = new n, e.prototype.constructor = e, e.Ob = function(e, n, r) {
            for (var i = Array(arguments.length - 2), a = 2; a < arguments.length; a++) i[a - 2] = arguments[a];
            return t.prototype[n].apply(e, i)
        }
    }
    var f = typeof AsyncContext < `u` && typeof AsyncContext.Snapshot == `function` ? e => e && AsyncContext.Snapshot.wrap(e) : e => e;

    function p(e) {
        let t = e.length;
        if (t > 0) {
            let n = Array(t);
            for (let r = 0; r < t; r++) n[r] = e[r];
            return n
        }
        return []
    }

    function m(e, t) {
        for (let t = 1; t < arguments.length; t++) {
            let r = arguments[t];
            var n = typeof r;
            if (n = n == `object` ? r ? Array.isArray(r) ? `array` : n : `null` : n, n == `array` || n == `object` && typeof r.length == `number`) {
                n = e.length || 0;
                let t = r.length || 0;
                e.length = n + t;
                for (let i = 0; i < t; i++) e[n + i] = r[i]
            } else e.push(r)
        }
    }
    class h {
        constructor(e, t) {
            this.i = e, this.j = t, this.h = 0, this.g = null
        }
        get() {
            let e;
            return this.h > 0 ? (this.h--, e = this.g, this.g = e.next, e.next = null) : e = this.i(), e
        }
    }

    function g(e) {
        o.setTimeout(() => {
            throw e
        }, 0)
    }

    function _() {
        var e = te;
        let t = null;
        return e.g && (t = e.g, e.g = e.g.next, e.g || (e.h = null), t.next = null), t
    }
    class v {
        constructor() {
            this.h = this.g = null
        }
        add(e, t) {
            let n = y.get();
            n.set(e, t), this.h ? this.h.next = n : this.g = n, this.h = n
        }
    }
    var y = new h(() => new b, e => e.reset());
    class b {
        constructor() {
            this.next = this.g = this.h = null
        }
        set(e, t) {
            this.h = e, this.g = t, this.next = null
        }
        reset() {
            this.next = this.g = this.h = null
        }
    }
    let x, ee = !1,
        te = new v,
        S = () => {
            let e = Promise.resolve(void 0);
            x = () => {
                e.then(ne)
            }
        };

    function ne() {
        for (var e; e = _();) {
            try {
                e.h.call(e.g)
            } catch (e) {
                g(e)
            }
            var t = y;
            t.j(e), t.h < 100 && (t.h++, e.next = t.g, t.g = e)
        }
        ee = !1
    }

    function re() {
        this.u = this.u, this.C = this.C
    }
    re.prototype.u = !1, re.prototype.dispose = function() {
        this.u || (this.u = !0, this.N())
    }, re.prototype[Symbol.dispose] = function() {
        this.dispose()
    }, re.prototype.N = function() {
        if (this.C)
            for (; this.C.length;) this.C.shift()()
    };

    function C(e, t) {
        this.type = e, this.g = this.target = t, this.defaultPrevented = !1
    }
    C.prototype.h = function() {
        this.defaultPrevented = !0
    };
    var ie = function() {
        if (!o.addEventListener || !Object.defineProperty) return !1;
        var e = !1,
            t = Object.defineProperty({}, `passive`, {
                get: function() {
                    e = !0
                }
            });
        try {
            let e = () => {};
            o.addEventListener(`test`, e, t), o.removeEventListener(`test`, e, t)
        } catch {}
        return e
    }();

    function ae(e) {
        return /^[\s\xa0]*$/.test(e)
    }

    function w(e, t) {
        C.call(this, e ? e.type : ``), this.relatedTarget = this.g = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0, this.key = ``, this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.state = null, this.pointerId = 0, this.pointerType = ``, this.i = null, e && this.init(e, t)
    }
    d(w, C), w.prototype.init = function(e, t) {
        let n = this.type = e.type,
            r = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : null;
        this.target = e.target || e.srcElement, this.g = t, t = e.relatedTarget, t || (n == `mouseover` ? t = e.fromElement : n == `mouseout` && (t = e.toElement)), this.relatedTarget = t, r ? (this.clientX = r.clientX === void 0 ? r.pageX : r.clientX, this.clientY = r.clientY === void 0 ? r.pageY : r.clientY, this.screenX = r.screenX || 0, this.screenY = r.screenY || 0) : (this.clientX = e.clientX === void 0 ? e.pageX : e.clientX, this.clientY = e.clientY === void 0 ? e.pageY : e.clientY, this.screenX = e.screenX || 0, this.screenY = e.screenY || 0), this.button = e.button, this.key = e.key || ``, this.ctrlKey = e.ctrlKey, this.altKey = e.altKey, this.shiftKey = e.shiftKey, this.metaKey = e.metaKey, this.pointerId = e.pointerId || 0, this.pointerType = e.pointerType, this.state = e.state, this.i = e, e.defaultPrevented && w.Z.h.call(this)
    }, w.prototype.h = function() {
        w.Z.h.call(this);
        let e = this.i;
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    };
    var oe = `closure_listenable_` + (Math.random() * 1e6 | 0),
        se = 0;

    function T(e, t, n, r, i) {
        this.listener = e, this.proxy = null, this.src = t, this.type = n, this.capture = !!r, this.ha = i, this.key = ++se, this.da = this.fa = !1
    }

    function E(e) {
        e.da = !0, e.listener = null, e.proxy = null, e.src = null, e.ha = null
    }

    function ce(e, t, n) {
        for (let r in e) t.call(n, e[r], r, e)
    }

    function le(e, t) {
        for (let n in e) t.call(void 0, e[n], n, e)
    }

    function ue(e) {
        let t = {};
        for (let n in e) t[n] = e[n];
        return t
    }
    let de = `constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf`.split(` `);

    function fe(e, t) {
        let n, r;
        for (let t = 1; t < arguments.length; t++) {
            for (n in r = arguments[t], r) e[n] = r[n];
            for (let t = 0; t < de.length; t++) n = de[t], Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
        }
    }

    function pe(e) {
        this.src = e, this.g = {}, this.h = 0
    }
    pe.prototype.add = function(e, t, n, r, i) {
        let a = e.toString();
        e = this.g[a], e || (e = this.g[a] = [], this.h++);
        let o = D(e, t, r, i);
        return o > -1 ? (t = e[o], n || (t.fa = !1)) : (t = new T(t, this.src, a, !!r, i), t.fa = n, e.push(t)), t
    };

    function me(e, t) {
        let n = t.type;
        if (n in e.g) {
            var r = e.g[n],
                i = Array.prototype.indexOf.call(r, t, void 0),
                a;
            (a = i >= 0) && Array.prototype.splice.call(r, i, 1), a && (E(t), e.g[n].length == 0 && (delete e.g[n], e.h--))
        }
    }

    function D(e, t, n, r) {
        for (let i = 0; i < e.length; ++i) {
            let a = e[i];
            if (!a.da && a.listener == t && a.capture == !!n && a.ha == r) return i
        }
        return -1
    }
    var O = `closure_lm_` + (Math.random() * 1e6 | 0),
        he = {};

    function ge(e, t, n, r, i) {
        if (r && r.once) return ke(e, t, n, r, i);
        if (Array.isArray(t)) {
            for (let a = 0; a < t.length; a++) ge(e, t[a], n, r, i);
            return null
        }
        return n = Fe(n), e && e[oe] ? e.J(t, n, s(r) ? !!r.capture : !!r, i) : _e(e, t, n, !1, r, i)
    }

    function _e(e, t, n, r, i, a) {
        if (!t) throw Error(`Invalid event type`);
        let o = s(i) ? !!i.capture : !!i,
            c = Ne(e);
        if (c || (e[O] = c = new pe(e)), n = c.add(t, n, r, o, a), n.proxy) return n;
        if (r = Oe(), n.proxy = r, r.src = e, r.listener = n, e.addEventListener) ie || (i = o), i === void 0 && (i = !1), e.addEventListener(t.toString(), r, i);
        else if (e.attachEvent) e.attachEvent(Me(t.toString()), r);
        else if (e.addListener && e.removeListener) e.addListener(r);
        else throw Error(`addEventListener and attachEvent are unavailable.`);
        return n
    }

    function Oe() {
        function e(n) {
            return t.call(e.src, e.listener, n)
        }
        let t = k;
        return e
    }

    function ke(e, t, n, r, i) {
        if (Array.isArray(t)) {
            for (let a = 0; a < t.length; a++) ke(e, t[a], n, r, i);
            return null
        }
        return n = Fe(n), e && e[oe] ? e.K(t, n, s(r) ? !!r.capture : !!r, i) : _e(e, t, n, !0, r, i)
    }

    function Ae(e, t, n, r, i) {
        if (Array.isArray(t))
            for (var a = 0; a < t.length; a++) Ae(e, t[a], n, r, i);
        else r = s(r) ? !!r.capture : !!r, n = Fe(n), e && e[oe] ? (e = e.i, a = String(t).toString(), a in e.g && (t = e.g[a], n = D(t, n, r, i), n > -1 && (E(t[n]), Array.prototype.splice.call(t, n, 1), t.length == 0 && (delete e.g[a], e.h--)))) : (e &&= Ne(e)) && (t = e.g[t.toString()], e = -1, t && (e = D(t, n, r, i)), (n = e > -1 ? t[e] : null) && je(n))
    }

    function je(e) {
        if (typeof e != `number` && e && !e.da) {
            var t = e.src;
            if (t && t[oe]) me(t.i, e);
            else {
                var n = e.type,
                    r = e.proxy;
                t.removeEventListener ? t.removeEventListener(n, r, e.capture) : t.detachEvent ? t.detachEvent(Me(n), r) : t.addListener && t.removeListener && t.removeListener(r), (n = Ne(t)) ? (me(n, e), n.h == 0 && (n.src = null, t[O] = null)) : E(e)
            }
        }
    }

    function Me(e) {
        return e in he ? he[e] : he[e] = `on` + e
    }

    function k(e, t) {
        if (e.da) e = !0;
        else {
            t = new w(t, this);
            let n = e.listener,
                r = e.ha || e.src;
            e.fa && je(e), e = n.call(r, t)
        }
        return e
    }

    function Ne(e) {
        return e = e[O], e instanceof pe ? e : null
    }
    var Pe = `__closure_events_fn_` + (Math.random() * 1e9 >>> 0);

    function Fe(e) {
        return typeof e == `function` ? e : (e[Pe] || (e[Pe] = function(t) {
            return e.handleEvent(t)
        }), e[Pe])
    }

    function A() {
        re.call(this), this.i = new pe(this), this.M = this, this.G = null
    }
    d(A, re), A.prototype[oe] = !0, A.prototype.removeEventListener = function(e, t, n, r) {
        Ae(this, e, t, n, r)
    };

    function Ie(e, t) {
        var n, r = e.G;
        if (r)
            for (n = []; r; r = r.G) n.push(r);
        if (e = e.M, r = t.type || t, typeof t == `string`) t = new C(t, e);
        else if (t instanceof C) t.target = t.target || e;
        else {
            var i = t;
            t = new C(r, e), fe(t, i)
        }
        i = !0;
        let a, o;
        if (n)
            for (o = n.length - 1; o >= 0; o--) a = t.g = n[o], i = j(a, r, !0, t) && i;
        if (a = t.g = e, i = j(a, r, !0, t) && i, i = j(a, r, !1, t) && i, n)
            for (o = 0; o < n.length; o++) a = t.g = n[o], i = j(a, r, !1, t) && i
    }
    A.prototype.N = function() {
        if (A.Z.N.call(this), this.i) {
            var e = this.i;
            for (let t in e.g) {
                let n = e.g[t];
                for (let e = 0; e < n.length; e++) E(n[e]);
                delete e.g[t], e.h--
            }
        }
        this.G = null
    }, A.prototype.J = function(e, t, n, r) {
        return this.i.add(String(e), t, !1, n, r)
    }, A.prototype.K = function(e, t, n, r) {
        return this.i.add(String(e), t, !0, n, r)
    };

    function j(e, t, n, r) {
        if (t = e.i.g[String(t)], !t) return !0;
        t = t.concat();
        let i = !0;
        for (let a = 0; a < t.length; ++a) {
            let o = t[a];
            if (o && !o.da && o.capture == n) {
                let t = o.listener,
                    n = o.ha || o.src;
                o.fa && me(e.i, o), i = t.call(n, r) !== !1 && i
            }
        }
        return i && !r.defaultPrevented
    }

    function M(e, t) {
        if (typeof e != `function`)
            if (e && typeof e.handleEvent == `function`) e = l(e.handleEvent, e);
            else throw Error(`Invalid listener argument`);
        return Number(t) > 2147483647 ? -1 : o.setTimeout(e, t || 0)
    }

    function N(e) {
        e.g = M(() => {
            e.g = null, e.i && (e.i = !1, N(e))
        }, e.l);
        let t = e.h;
        e.h = null, e.m.apply(null, t)
    }
    class P extends re {
        constructor(e, t) {
            super(), this.m = e, this.l = t, this.h = null, this.i = !1, this.g = null
        }
        j(e) {
            this.h = arguments, this.g ? this.i = !0 : N(this)
        }
        N() {
            super.N(), this.g && (o.clearTimeout(this.g), this.g = null, this.i = !1, this.h = null)
        }
    }

    function Le(e) {
        re.call(this), this.h = e, this.g = {}
    }
    d(Le, re);
    var Re = [];

    function ze(e) {
        ce(e.g, function(e, t) {
            this.g.hasOwnProperty(t) && je(e)
        }, e), e.g = {}
    }
    Le.prototype.N = function() {
        Le.Z.N.call(this), ze(this)
    }, Le.prototype.handleEvent = function() {
        throw Error(`EventHandler.handleEvent not implemented`)
    };
    var Be = o.JSON.stringify,
        Ve = o.JSON.parse,
        He = class {
            stringify(e) {
                return o.JSON.stringify(e, void 0)
            }
            parse(e) {
                return o.JSON.parse(e, void 0)
            }
        };

    function Ue() {}

    function We() {}
    var Ge = {
        OPEN: `a`,
        hb: `b`,
        ERROR: `c`,
        tb: `d`
    };

    function Ke() {
        C.call(this, `d`)
    }
    d(Ke, C);

    function qe() {
        C.call(this, `c`)
    }
    d(qe, C);
    var F = {},
        Je = null;

    function Ye() {
        return Je ||= new A
    }
    F.Ia = `serverreachability`;

    function Xe(e) {
        C.call(this, F.Ia, e)
    }
    d(Xe, C);

    function Ze(e) {
        let t = Ye();
        Ie(t, new Xe(t))
    }
    F.STAT_EVENT = `statevent`;

    function Qe(e, t) {
        C.call(this, F.STAT_EVENT, e), this.stat = t
    }
    d(Qe, C);

    function $e(e) {
        let t = Ye();
        Ie(t, new Qe(t, e))
    }
    F.Ja = `timingevent`;

    function et(e, t) {
        C.call(this, F.Ja, e), this.size = t
    }
    d(et, C);

    function tt(e, t) {
        if (typeof e != `function`) throw Error(`Fn must not be null and must be a function`);
        return o.setTimeout(function() {
            e()
        }, t)
    }

    function nt() {
        this.g = !0
    }
    nt.prototype.ua = function() {
        this.g = !1
    };

    function rt(e, t, n, r, i, a) {
        e.info(function() {
            if (e.g)
                if (a) {
                    var o = ``,
                        s = a.split(`&`);
                    for (let e = 0; e < s.length; e++) {
                        var c = s[e].split(`=`);
                        if (c.length > 1) {
                            let e = c[0];
                            c = c[1];
                            let t = e.split(`_`);
                            o = t.length >= 2 && t[1] == `type` ? o + (e + `=` + c + `&`) : o + (e + `=redacted&`)
                        }
                    }
                } else o = null;
            else o = a;
            return `XMLHTTP REQ (` + r + `) [attempt ` + i + `]: ` + t + `
` + n + `
` + o
        })
    }

    function I(e, t, n, r, i, a, o) {
        e.info(function() {
            return `XMLHTTP RESP (` + r + `) [ attempt ` + i + `]: ` + t + `
` + n + `
` + a + ` ` + o
        })
    }

    function it(e, t, n, r) {
        e.info(function() {
            return `XMLHTTP TEXT (` + t + `): ` + ot(e, n) + (r ? ` ` + r : ``)
        })
    }

    function at(e, t) {
        e.info(function() {
            return `TIMEOUT: ` + t
        })
    }
    nt.prototype.info = function() {};

    function ot(e, t) {
        if (!e.g) return t;
        if (!t) return null;
        try {
            let a = JSON.parse(t);
            if (a) {
                for (e = 0; e < a.length; e++)
                    if (Array.isArray(a[e])) {
                        var n = a[e];
                        if (!(n.length < 2)) {
                            var r = n[1];
                            if (Array.isArray(r) && !(r.length < 1)) {
                                var i = r[0];
                                if (i != `noop` && i != `stop` && i != `close`)
                                    for (let e = 1; e < r.length; e++) r[e] = ``
                            }
                        }
                    }
            }
            return Be(a)
        } catch {
            return t
        }
    }
    var st = {
            NO_ERROR: 0,
            cb: 1,
            qb: 2,
            pb: 3,
            kb: 4,
            ob: 5,
            rb: 6,
            Ga: 7,
            TIMEOUT: 8,
            ub: 9
        },
        ct = {
            ib: `complete`,
            Fb: `success`,
            ERROR: `error`,
            Ga: `abort`,
            xb: `ready`,
            yb: `readystatechange`,
            TIMEOUT: `timeout`,
            sb: `incrementaldata`,
            wb: `progress`,
            lb: `downloadprogress`,
            Nb: `uploadprogress`
        },
        lt;

    function ut() {}
    d(ut, Ue), ut.prototype.g = function() {
        return new XMLHttpRequest
    }, lt = new ut;

    function dt(e) {
        return encodeURIComponent(String(e))
    }

    function ft(e) {
        var t = 1;
        e = e.split(`:`);
        let n = [];
        for (; t > 0 && e.length;) n.push(e.shift()), t--;
        return e.length && n.push(e.join(`:`)), n
    }

    function pt(e, t, n, r) {
        this.j = e, this.i = t, this.l = n, this.S = r || 1, this.V = new Le(this), this.H = 45e3, this.J = null, this.o = !1, this.u = this.B = this.A = this.M = this.F = this.T = this.D = null, this.G = [], this.g = null, this.C = 0, this.m = this.v = null, this.X = -1, this.K = !1, this.P = 0, this.O = null, this.W = this.L = this.U = this.R = !1, this.h = new mt
    }

    function mt() {
        this.i = null, this.g = ``, this.h = !1
    }
    var ht = {},
        L = {};

    function gt(e, t, n) {
        e.M = 1, e.A = Vt(Lt(t)), e.u = n, e.R = !0, _t(e, null)
    }

    function _t(e, t) {
        e.F = Date.now(), xt(e), e.B = Lt(e.A);
        var n = e.B,
            r = e.S;
        Array.isArray(r) || (r = [String(r)]), tn(n.i, `t`, r), e.C = 0, n = e.j.L, e.h = new mt, e.g = qn(e.j, n ? t : null, !e.u), e.P > 0 && (e.O = new P(l(e.Y, e, e.g), e.P)), t = e.V, n = e.g, r = e.ba;
        var i = `readystatechange`;
        Array.isArray(i) || (i && (Re[0] = i.toString()), i = Re);
        for (let e = 0; e < i.length; e++) {
            let a = ge(n, i[e], r || t.handleEvent, !1, t.h || t);
            if (!a) break;
            t.g[a.key] = a
        }
        t = e.J ? ue(e.J) : {}, e.u ? (e.v ||= `POST`, t[`Content-Type`] = `application/x-www-form-urlencoded`, e.g.ea(e.B, e.v, e.u, t)) : (e.v = `GET`, e.g.ea(e.B, e.v, null, t)), Ze(), rt(e.i, e.v, e.B, e.l, e.S, e.u)
    }
    pt.prototype.ba = function(e) {
        e = e.target;
        let t = this.O;
        t && wn(e) == 3 ? t.j() : this.Y(e)
    }, pt.prototype.Y = function(e) {
        try {
            if (e == this.g) a: {
                let s = wn(this.g),
                    c = this.g.ya(),
                    l = this.g.ca();
                if (!(s < 3) && (s != 3 || this.g && (this.h.h || this.g.la() || Tn(this.g)))) {
                    this.K || s != 4 || c == 7 || Ze(c == 8 || l <= 0 ? 3 : 2), Ct(this);
                    var t = this.g.ca();
                    this.X = t;
                    var n = vt(this);
                    if (this.o = t == 200, I(this.i, this.v, this.B, this.l, this.S, s, t), this.o) {
                        if (this.U && !this.L) {
                            b: {
                                if (this.g) {
                                    var r, i = this.g;
                                    if ((r = i.g ? i.g.getResponseHeader(`X-HTTP-Initial-Response`) : null) && !ae(r)) {
                                        var a = r;
                                        break b
                                    }
                                }
                                a = null
                            }
                            if (e = a) it(this.i, this.l, e, `Initial handshake response via X-HTTP-Initial-Response`),
                            this.L = !0,
                            Tt(this, e);
                            else {
                                this.o = !1, this.m = 3, $e(12), R(this), wt(this);
                                break a
                            }
                        }
                        if (this.R) {
                            e = !0;
                            let t;
                            for (; !this.K && this.C < n.length;)
                                if (t = bt(this, n), t == L) {
                                    s == 4 && (this.m = 4, $e(14), e = !1), it(this.i, this.l, null, `[Incomplete Response]`);
                                    break
                                } else if (t == ht) {
                                this.m = 4, $e(15), it(this.i, this.l, n, `[Invalid Chunk]`), e = !1;
                                break
                            } else it(this.i, this.l, t, null), Tt(this, t);
                            if (yt(this) && this.C != 0 && (this.h.g = this.h.g.slice(this.C), this.C = 0), s != 4 || n.length != 0 || this.h.h || (this.m = 1, $e(16), e = !1), this.o = this.o && e, !e) it(this.i, this.l, n, `[Invalid Chunked Response]`), R(this), wt(this);
                            else if (n.length > 0 && !this.W) {
                                this.W = !0;
                                var o = this.j;
                                o.g == this && o.aa && !o.P && (o.j.info(`Great, no buffering proxy detected. Bytes received: ` + n.length), zn(o), o.P = !0, $e(11))
                            }
                        } else it(this.i, this.l, n, null), Tt(this, n);
                        s == 4 && R(this), this.o && !this.K && (s == 4 ? Hn(this.j, this) : (this.o = !1, xt(this)))
                    } else En(this.g), t == 400 && n.indexOf(`Unknown SID`) > 0 ? (this.m = 3, $e(12)) : (this.m = 0, $e(13)), R(this), wt(this)
                }
            }
        } catch {}
    };

    function vt(e) {
        if (!yt(e)) return e.g.la();
        let t = Tn(e.g);
        if (t === ``) return ``;
        let n = ``,
            r = t.length,
            i = wn(e.g) == 4;
        if (!e.h.i) {
            if (typeof TextDecoder > `u`) return R(e), wt(e), ``;
            e.h.i = new o.TextDecoder
        }
        for (let a = 0; a < r; a++) e.h.h = !0, n += e.h.i.decode(t[a], {
            stream: !(i && a == r - 1)
        });
        return t.length = 0, e.h.g += n, e.C = 0, e.h.g
    }

    function yt(e) {
        return e.g ? e.v == `GET` && e.M != 2 && e.j.Aa : !1
    }

    function bt(e, t) {
        var n = e.C,
            r = t.indexOf(`
`, n);
        return r == -1 ? L : (n = Number(t.substring(n, r)), isNaN(n) ? ht : (r += 1, r + n > t.length ? L : (t = t.slice(r, r + n), e.C = r + n, t)))
    }
    pt.prototype.cancel = function() {
        this.K = !0, R(this)
    };

    function xt(e) {
        e.T = Date.now() + e.H, St(e, e.H)
    }

    function St(e, t) {
        if (e.D != null) throw Error(`WatchDog timer not null`);
        e.D = tt(l(e.aa, e), t)
    }

    function Ct(e) {
        e.D &&= (o.clearTimeout(e.D), null)
    }
    pt.prototype.aa = function() {
        this.D = null;
        let e = Date.now();
        e - this.T >= 0 ? (at(this.i, this.B), this.M != 2 && (Ze(), $e(17)), R(this), this.m = 2, wt(this)) : St(this, this.T - e)
    };

    function wt(e) {
        e.j.I == 0 || e.K || Hn(e.j, e)
    }

    function R(e) {
        Ct(e);
        var t = e.O;
        t && typeof t.dispose == `function` && t.dispose(), e.O = null, ze(e.V), e.g && (t = e.g, e.g = null, t.abort(), t.dispose())
    }

    function Tt(e, t) {
        try {
            var n = e.j;
            if (n.I != 0 && (n.g == e || At(n.h, e))) {
                if (!e.L && At(n.h, e) && n.I == 3) {
                    try {
                        var r = n.Ba.g.parse(t)
                    } catch {
                        r = null
                    }
                    if (Array.isArray(r) && r.length == 3) {
                        var i = r;
                        if (i[0] == 0) {
                            a: if (!n.v) {
                                if (n.g)
                                    if (n.g.F + 3e3 < e.F) Vn(n), An(n);
                                    else break a;
                                Rn(n), $e(18)
                            }
                        }
                        else n.xa = i[1], 0 < n.xa - n.K && i[2] < 37500 && n.F && n.A == 0 && !n.C && (n.C = tt(l(n.Va, n), 6e3));
                        kt(n.h) <= 1 && n.ta && (n.ta = void 0)
                    } else Wn(n, 11)
                } else if ((e.L || n.g == e) && Vn(n), !ae(t))
                    for (i = n.Ba.g.parse(t), t = 0; t < i.length; t++) {
                        let l = i[t],
                            u = l[0];
                        if (!(u <= n.K))
                            if (n.K = u, l = l[1], n.I == 2)
                                if (l[0] == `c`) {
                                    n.M = l[1], n.ba = l[2];
                                    let t = l[3];
                                    t != null && (n.ka = t, n.j.info(`VER=` + n.ka));
                                    let i = l[4];
                                    i != null && (n.za = i, n.j.info(`SVER=` + n.za));
                                    let u = l[5];
                                    u != null && typeof u == `number` && u > 0 && (r = 1.5 * u, n.O = r, n.j.info(`backChannelRequestTimeoutMs_=` + r)), r = n;
                                    let d = e.g;
                                    if (d) {
                                        let e = d.g ? d.g.getResponseHeader(`X-Client-Wire-Protocol`) : null;
                                        if (e) {
                                            var a = r.h;
                                            a.g || e.indexOf(`spdy`) == -1 && e.indexOf(`quic`) == -1 && e.indexOf(`h2`) == -1 || (a.j = a.l, a.g = new Set, a.h &&= (jt(a, a.h), null))
                                        }
                                        if (r.G) {
                                            let e = d.g ? d.g.getResponseHeader(`X-HTTP-Session-Id`) : null;
                                            e && (r.wa = e, z(r.J, r.G, e))
                                        }
                                    }
                                    n.I = 3, n.l && n.l.ra(), n.aa && (n.T = Date.now() - e.F, n.j.info(`Handshake RTT: ` + n.T + `ms`)), r = n;
                                    var o = e;
                                    if (r.na = Kn(r, r.L ? r.ba : null, r.W), o.L) {
                                        Mt(r.h, o);
                                        var s = o,
                                            c = r.O;
                                        c && (s.H = c), s.D && (Ct(s), xt(s)), r.g = o
                                    } else Ln(r);
                                    n.i.length > 0 && Mn(n)
                                } else l[0] != `stop` && l[0] != `close` || Wn(n, 7);
                        else n.I == 3 && (l[0] == `stop` || l[0] == `close` ? l[0] == `stop` ? Wn(n, 7) : kn(n) : l[0] != `noop` && n.l && n.l.qa(l), n.A = 0)
                    }
            }
            Ze(4)
        } catch {}
    }
    var Et = class {
        constructor(e, t) {
            this.g = e, this.map = t
        }
    };

    function Dt(e) {
        this.l = e || 10, o.PerformanceNavigationTiming ? (e = o.performance.getEntriesByType(`navigation`), e = e.length > 0 && (e[0].nextHopProtocol == `hq` || e[0].nextHopProtocol == `h2`)) : e = !!(o.chrome && o.chrome.loadTimes && o.chrome.loadTimes() && o.chrome.loadTimes().wasFetchedViaSpdy), this.j = e ? this.l : 1, this.g = null, this.j > 1 && (this.g = new Set), this.h = null, this.i = []
    }

    function Ot(e) {
        return e.h ? !0 : e.g ? e.g.size >= e.j : !1
    }

    function kt(e) {
        return e.h ? 1 : e.g ? e.g.size : 0
    }

    function At(e, t) {
        return e.h ? e.h == t : e.g ? e.g.has(t) : !1
    }

    function jt(e, t) {
        e.g ? e.g.add(t) : e.h = t
    }

    function Mt(e, t) {
        e.h && e.h == t ? e.h = null : e.g && e.g.has(t) && e.g.delete(t)
    }
    Dt.prototype.cancel = function() {
        if (this.i = Nt(this), this.h) this.h.cancel(), this.h = null;
        else if (this.g && this.g.size !== 0) {
            for (let e of this.g.values()) e.cancel();
            this.g.clear()
        }
    };

    function Nt(e) {
        if (e.h != null) return e.i.concat(e.h.G);
        if (e.g != null && e.g.size !== 0) {
            let t = e.i;
            for (let n of e.g.values()) t = t.concat(n.G);
            return t
        }
        return p(e.i)
    }
    var Pt = RegExp(`^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$`);

    function Ft(e, t) {
        if (e) {
            e = e.split(`&`);
            for (let n = 0; n < e.length; n++) {
                let r = e[n].indexOf(`=`),
                    i, a = null;
                r >= 0 ? (i = e[n].substring(0, r), a = e[n].substring(r + 1)) : i = e[n], t(i, a ? decodeURIComponent(a.replace(/\+/g, ` `)) : ``)
            }
        }
    }

    function It(e) {
        this.g = this.o = this.j = ``, this.u = null, this.m = this.h = ``, this.l = !1;
        let t;
        e instanceof It ? (this.l = e.l, Rt(this, e.j), this.o = e.o, this.g = e.g, zt(this, e.u), this.h = e.h, Bt(this, nn(e.i)), this.m = e.m) : e && (t = String(e).match(Pt)) ? (this.l = !1, Rt(this, t[1] || ``, !0), this.o = Ht(t[2] || ``), this.g = Ht(t[3] || ``, !0), zt(this, t[4]), this.h = Ht(t[5] || ``, !0), Bt(this, t[6] || ``, !0), this.m = Ht(t[7] || ``)) : (this.l = !1, this.i = new Xt(null, this.l))
    }
    It.prototype.toString = function() {
        let e = [];
        var t = this.j;
        t && e.push(Ut(t, Gt, !0), `:`);
        var n = this.g;
        return (n || t == `file`) && (e.push(`//`), (t = this.o) && e.push(Ut(t, Gt, !0), `@`), e.push(dt(n).replace(/%25([0-9a-fA-F]{2})/g, `%$1`)), n = this.u, n != null && e.push(`:`, String(n))), (n = this.h) && (this.g && n.charAt(0) != `/` && e.push(`/`), e.push(Ut(n, n.charAt(0) == `/` ? qt : Kt, !0))), (n = this.i.toString()) && e.push(`?`, n), (n = this.m) && e.push(`#`, Ut(n, Yt)), e.join(``)
    }, It.prototype.resolve = function(e) {
        let t = Lt(this),
            n = !!e.j;
        n ? Rt(t, e.j) : n = !!e.o, n ? t.o = e.o : n = !!e.g, n ? t.g = e.g : n = e.u != null;
        var r = e.h;
        if (n) zt(t, e.u);
        else if (n = !!e.h) {
            if (r.charAt(0) != `/`)
                if (this.g && !this.h) r = `/` + r;
                else {
                    var i = t.h.lastIndexOf(`/`);
                    i != -1 && (r = t.h.slice(0, i + 1) + r)
                } if (i = r, i == `..` || i == `.`) r = ``;
            else if (i.indexOf(`./`) != -1 || i.indexOf(`/.`) != -1) {
                r = i.lastIndexOf(`/`, 0) == 0, i = i.split(`/`);
                let e = [];
                for (let t = 0; t < i.length;) {
                    let n = i[t++];
                    n == `.` ? r && t == i.length && e.push(``) : n == `..` ? ((e.length > 1 || e.length == 1 && e[0] != ``) && e.pop(), r && t == i.length && e.push(``)) : (e.push(n), r = !0)
                }
                r = e.join(`/`)
            } else r = i
        }
        return n ? t.h = r : n = e.i.toString() !== ``, n ? Bt(t, nn(e.i)) : n = !!e.m, n && (t.m = e.m), t
    };

    function Lt(e) {
        return new It(e)
    }

    function Rt(e, t, n) {
        e.j = n ? Ht(t, !0) : t, e.j &&= e.j.replace(/:$/, ``)
    }

    function zt(e, t) {
        if (t) {
            if (t = Number(t), isNaN(t) || t < 0) throw Error(`Bad port number ` + t);
            e.u = t
        } else e.u = null
    }

    function Bt(e, t, n) {
        t instanceof Xt ? (e.i = t, an(e.i, e.l)) : (n || (t = Ut(t, Jt)), e.i = new Xt(t, e.l))
    }

    function z(e, t, n) {
        e.i.set(t, n)
    }

    function Vt(e) {
        return z(e, `zx`, Math.floor(Math.random() * 2147483648).toString(36) + Math.abs(Math.floor(Math.random() * 2147483648) ^ Date.now()).toString(36)), e
    }

    function Ht(e, t) {
        return e ? t ? decodeURI(e.replace(/%25/g, `%2525`)) : decodeURIComponent(e) : ``
    }

    function Ut(e, t, n) {
        return typeof e == `string` ? (e = encodeURI(e).replace(t, Wt), n && (e = e.replace(/%25([0-9a-fA-F]{2})/g, `%$1`)), e) : null
    }

    function Wt(e) {
        return e = e.charCodeAt(0), `%` + (e >> 4 & 15).toString(16) + (e & 15).toString(16)
    }
    var Gt = /[#\/\?@]/g,
        Kt = /[#\?:]/g,
        qt = /[#\?]/g,
        Jt = /[#\?@]/g,
        Yt = /#/g;

    function Xt(e, t) {
        this.h = this.g = null, this.i = e || null, this.j = !!t
    }

    function Zt(e) {
        e.g || (e.g = new Map, e.h = 0, e.i && Ft(e.i, function(t, n) {
            e.add(decodeURIComponent(t.replace(/\+/g, ` `)), n)
        }))
    }
    e = Xt.prototype, e.add = function(e, t) {
        Zt(this), this.i = null, e = rn(this, e);
        let n = this.g.get(e);
        return n || this.g.set(e, n = []), n.push(t), this.h += 1, this
    };

    function Qt(e, t) {
        Zt(e), t = rn(e, t), e.g.has(t) && (e.i = null, e.h -= e.g.get(t).length, e.g.delete(t))
    }

    function $t(e, t) {
        return Zt(e), t = rn(e, t), e.g.has(t)
    }
    e.forEach = function(e, t) {
        Zt(this), this.g.forEach(function(n, r) {
            n.forEach(function(n) {
                e.call(t, n, r, this)
            }, this)
        }, this)
    };

    function en(e, t) {
        Zt(e);
        let n = [];
        if (typeof t == `string`) $t(e, t) && (n = n.concat(e.g.get(rn(e, t))));
        else
            for (e = Array.from(e.g.values()), t = 0; t < e.length; t++) n = n.concat(e[t]);
        return n
    }
    e.set = function(e, t) {
        return Zt(this), this.i = null, e = rn(this, e), $t(this, e) && (this.h -= this.g.get(e).length), this.g.set(e, [t]), this.h += 1, this
    }, e.get = function(e, t) {
        return e ? (e = en(this, e), e.length > 0 ? String(e[0]) : t) : t
    };

    function tn(e, t, n) {
        Qt(e, t), n.length > 0 && (e.i = null, e.g.set(rn(e, t), p(n)), e.h += n.length)
    }
    e.toString = function() {
        if (this.i) return this.i;
        if (!this.g) return ``;
        let e = [],
            t = Array.from(this.g.keys());
        for (let r = 0; r < t.length; r++) {
            var n = t[r];
            let i = dt(n);
            n = en(this, n);
            for (let t = 0; t < n.length; t++) {
                let r = i;
                n[t] !== `` && (r += `=` + dt(n[t])), e.push(r)
            }
        }
        return this.i = e.join(`&`)
    };

    function nn(e) {
        let t = new Xt;
        return t.i = e.i, e.g && (t.g = new Map(e.g), t.h = e.h), t
    }

    function rn(e, t) {
        return t = String(t), e.j && (t = t.toLowerCase()), t
    }

    function an(e, t) {
        t && !e.j && (Zt(e), e.i = null, e.g.forEach(function(e, t) {
            let n = t.toLowerCase();
            t != n && (Qt(this, t), tn(this, n, e))
        }, e)), e.j = t
    }

    function on(e, t) {
        let n = new nt;
        if (o.Image) {
            let r = new Image;
            r.onload = u(cn, n, `TestLoadImage: loaded`, !0, t, r), r.onerror = u(cn, n, `TestLoadImage: error`, !1, t, r), r.onabort = u(cn, n, `TestLoadImage: abort`, !1, t, r), r.ontimeout = u(cn, n, `TestLoadImage: timeout`, !1, t, r), o.setTimeout(function() {
                r.ontimeout && r.ontimeout()
            }, 1e4), r.src = e
        } else t(!1)
    }

    function sn(e, t) {
        let n = new nt,
            r = new AbortController,
            i = setTimeout(() => {
                r.abort(), cn(n, `TestPingServer: timeout`, !1, t)
            }, 1e4);
        fetch(e, {
            signal: r.signal
        }).then(e => {
            clearTimeout(i), e.ok ? cn(n, `TestPingServer: ok`, !0, t) : cn(n, `TestPingServer: server error`, !1, t)
        }).catch(() => {
            clearTimeout(i), cn(n, `TestPingServer: error`, !1, t)
        })
    }

    function cn(e, t, n, r, i) {
        try {
            i && (i.onload = null, i.onerror = null, i.onabort = null, i.ontimeout = null), r(n)
        } catch {}
    }

    function ln() {
        this.g = new He
    }

    function un(e) {
        this.i = e.Sb || null, this.h = e.ab || !1
    }
    d(un, Ue), un.prototype.g = function() {
        return new dn(this.i, this.h)
    };

    function dn(e, t) {
        A.call(this), this.H = e, this.o = t, this.m = void 0, this.status = this.readyState = 0, this.responseType = this.responseText = this.response = this.statusText = ``, this.onreadystatechange = null, this.A = new Headers, this.h = null, this.F = `GET`, this.D = ``, this.g = !1, this.B = this.j = this.l = null, this.v = new AbortController
    }
    d(dn, A), e = dn.prototype, e.open = function(e, t) {
        if (this.readyState != 0) throw this.abort(), Error(`Error reopening a connection`);
        this.F = e, this.D = t, this.readyState = 1, mn(this)
    }, e.send = function(e) {
        if (this.readyState != 1) throw this.abort(), Error(`need to call open() first. `);
        if (this.v.signal.aborted) throw this.abort(), Error(`Request was aborted.`);
        this.g = !0;
        let t = {
            headers: this.A,
            method: this.F,
            credentials: this.m,
            cache: void 0,
            signal: this.v.signal
        };
        e && (t.body = e), (this.H || o).fetch(new Request(this.D, t)).then(this.Pa.bind(this), this.ga.bind(this))
    }, e.abort = function() {
        this.response = this.responseText = ``, this.A = new Headers, this.status = 0, this.v.abort(), this.j && this.j.cancel(`Request was aborted.`).catch(() => {}), this.readyState >= 1 && this.g && this.readyState != 4 && (this.g = !1, pn(this)), this.readyState = 0
    }, e.Pa = function(e) {
        if (this.g && (this.l = e, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = e.headers, this.readyState = 2, mn(this)), this.g && (this.readyState = 3, mn(this), this.g)))
            if (this.responseType === `arraybuffer`) e.arrayBuffer().then(this.Na.bind(this), this.ga.bind(this));
            else if (o.ReadableStream !== void 0 && `body` in e) {
            if (this.j = e.body.getReader(), this.o) {
                if (this.responseType) throw Error(`responseType must be empty for "streamBinaryChunks" mode responses.`);
                this.response = []
            } else this.response = this.responseText = ``, this.B = new TextDecoder;
            fn(this)
        } else e.text().then(this.Oa.bind(this), this.ga.bind(this))
    };

    function fn(e) {
        e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))
    }
    e.Ma = function(e) {
        if (this.g) {
            if (this.o && e.value) this.response.push(e.value);
            else if (!this.o) {
                var t = e.value ? e.value : new Uint8Array;
                (t = this.B.decode(t, {
                    stream: !e.done
                })) && (this.response = this.responseText += t)
            }
            e.done ? pn(this) : mn(this), this.readyState == 3 && fn(this)
        }
    }, e.Oa = function(e) {
        this.g && (this.response = this.responseText = e, pn(this))
    }, e.Na = function(e) {
        this.g && (this.response = e, pn(this))
    }, e.ga = function() {
        this.g && pn(this)
    };

    function pn(e) {
        e.readyState = 4, e.l = null, e.j = null, e.B = null, mn(e)
    }
    e.setRequestHeader = function(e, t) {
        this.A.append(e, t)
    }, e.getResponseHeader = function(e) {
        return this.h && this.h.get(e.toLowerCase()) || ``
    }, e.getAllResponseHeaders = function() {
        if (!this.h) return ``;
        let e = [],
            t = this.h.entries();
        for (var n = t.next(); !n.done;) n = n.value, e.push(n[0] + `: ` + n[1]), n = t.next();
        return e.join(`\r
`)
    };

    function mn(e) {
        e.onreadystatechange && e.onreadystatechange.call(e)
    }
    Object.defineProperty(dn.prototype, `withCredentials`, {
        get: function() {
            return this.m === `include`
        },
        set: function(e) {
            this.m = e ? `include` : `same-origin`
        }
    });

    function hn(e) {
        let t = ``;
        return ce(e, function(e, n) {
            t += n, t += `:`, t += e, t += `\r
`
        }), t
    }

    function gn(e, t, n) {
        a: {
            for (r in n) {
                var r = !1;
                break a
            }
            r = !0
        }
        r || (n = hn(n), typeof e == `string` ? n != null && dt(n) : z(e, t, n))
    }

    function _n(e) {
        A.call(this), this.headers = new Map, this.L = e || null, this.h = !1, this.g = null, this.D = ``, this.o = 0, this.l = ``, this.j = this.B = this.v = this.A = !1, this.m = null, this.F = ``, this.H = !1
    }
    d(_n, A);
    var vn = /^https?$/i,
        yn = [`POST`, `PUT`];
    e = _n.prototype, e.Fa = function(e) {
        this.H = e
    }, e.ea = function(e, t, n, r) {
        if (this.g) throw Error(`[goog.net.XhrIo] Object is active with another request=` + this.D + `; newUri=` + e);
        t = t ? t.toUpperCase() : `GET`, this.D = e, this.l = ``, this.o = 0, this.A = !1, this.h = !0, this.g = this.L ? this.L.g() : lt.g(), this.g.onreadystatechange = f(l(this.Ca, this));
        try {
            this.B = !0, this.g.open(t, String(e), !0), this.B = !1
        } catch (e) {
            bn(this, e);
            return
        }
        if (e = n || ``, n = new Map(this.headers), r)
            if (Object.getPrototypeOf(r) === Object.prototype)
                for (var i in r) n.set(i, r[i]);
            else if (typeof r.keys == `function` && typeof r.get == `function`)
            for (let e of r.keys()) n.set(e, r.get(e));
        else throw Error(`Unknown input type for opt_headers: ` + String(r));
        r = Array.from(n.keys()).find(e => e.toLowerCase() == `content-type`), i = o.FormData && e instanceof o.FormData, !(Array.prototype.indexOf.call(yn, t, void 0) >= 0) || r || i || n.set(`Content-Type`, `application/x-www-form-urlencoded;charset=utf-8`);
        for (let [e, t] of n) this.g.setRequestHeader(e, t);
        this.F && (this.g.responseType = this.F), `withCredentials` in this.g && this.g.withCredentials !== this.H && (this.g.withCredentials = this.H);
        try {
            this.m &&= (clearTimeout(this.m), null), this.v = !0, this.g.send(e), this.v = !1
        } catch (e) {
            bn(this, e)
        }
    };

    function bn(e, t) {
        e.h = !1, e.g && (e.j = !0, e.g.abort(), e.j = !1), e.l = t, e.o = 5, xn(e), Cn(e)
    }

    function xn(e) {
        e.A || (e.A = !0, Ie(e, `complete`), Ie(e, `error`))
    }
    e.abort = function(e) {
        this.g && this.h && (this.h = !1, this.j = !0, this.g.abort(), this.j = !1, this.o = e || 7, Ie(this, `complete`), Ie(this, `abort`), Cn(this))
    }, e.N = function() {
        this.g && (this.h && (this.h = !1, this.j = !0, this.g.abort(), this.j = !1), Cn(this, !0)), _n.Z.N.call(this)
    }, e.Ca = function() {
        this.u || (this.B || this.v || this.j ? Sn(this) : this.Xa())
    }, e.Xa = function() {
        Sn(this)
    };

    function Sn(e) {
        if (e.h && a !== void 0) {
            if (e.v && wn(e) == 4) setTimeout(e.Ca.bind(e), 0);
            else if (Ie(e, `readystatechange`), wn(e) == 4) {
                e.h = !1;
                try {
                    let a = e.ca();
                    a: switch (a) {
                        case 200:
                        case 201:
                        case 202:
                        case 204:
                        case 206:
                        case 304:
                        case 1223:
                            var t = !0;
                            break a;
                        default:
                            t = !1
                    }
                    var n;
                    if (!(n = t)) {
                        var r;
                        if (r = a === 0) {
                            let t = String(e.D).match(Pt)[1] || null;
                            !t && o.self && o.self.location && (t = o.self.location.protocol.slice(0, -1)), r = !vn.test(t ? t.toLowerCase() : ``)
                        }
                        n = r
                    }
                    if (n) Ie(e, `complete`), Ie(e, `success`);
                    else {
                        e.o = 6;
                        try {
                            var i = wn(e) > 2 ? e.g.statusText : ``
                        } catch {
                            i = ``
                        }
                        e.l = i + ` [` + e.ca() + `]`, xn(e)
                    }
                } finally {
                    Cn(e)
                }
            }
        }
    }

    function Cn(e, t) {
        if (e.g) {
            e.m &&= (clearTimeout(e.m), null);
            let n = e.g;
            e.g = null, t || Ie(e, `ready`);
            try {
                n.onreadystatechange = null
            } catch {}
        }
    }
    e.isActive = function() {
        return !!this.g
    };

    function wn(e) {
        return e.g ? e.g.readyState : 0
    }
    e.ca = function() {
        try {
            return wn(this) > 2 ? this.g.status : -1
        } catch {
            return -1
        }
    }, e.la = function() {
        try {
            return this.g ? this.g.responseText : ``
        } catch {
            return ``
        }
    }, e.La = function(e) {
        if (this.g) {
            var t = this.g.responseText;
            return e && t.indexOf(e) == 0 && (t = t.substring(e.length)), Ve(t)
        }
    };

    function Tn(e) {
        try {
            if (!e.g) return null;
            if (`response` in e.g) return e.g.response;
            switch (e.F) {
                case ``:
                case `text`:
                    return e.g.responseText;
                case `arraybuffer`:
                    if (`mozResponseArrayBuffer` in e.g) return e.g.mozResponseArrayBuffer
            }
            return null
        } catch {
            return null
        }
    }

    function En(e) {
        let t = {};
        e = (e.g && wn(e) >= 2 && e.g.getAllResponseHeaders() || ``).split(`\r
`);
        for (let r = 0; r < e.length; r++) {
            if (ae(e[r])) continue;
            var n = ft(e[r]);
            let i = n[0];
            if (n = n[1], typeof n != `string`) continue;
            n = n.trim();
            let a = t[i] || [];
            t[i] = a, a.push(n)
        }
        le(t, function(e) {
            return e.join(`, `)
        })
    }
    e.ya = function() {
        return this.o
    }, e.Ha = function() {
        return typeof this.l == `string` ? this.l : String(this.l)
    };

    function Dn(e, t, n) {
        return n && n.internalChannelParams && n.internalChannelParams[e] || t
    }

    function On(e) {
        this.za = 0, this.i = [], this.j = new nt, this.ba = this.na = this.J = this.W = this.g = this.wa = this.G = this.H = this.u = this.U = this.o = null, this.Ya = this.V = 0, this.Sa = Dn(`failFast`, !1, e), this.F = this.C = this.v = this.m = this.l = null, this.X = !0, this.xa = this.K = -1, this.Y = this.A = this.D = 0, this.Qa = Dn(`baseRetryDelayMs`, 5e3, e), this.Za = Dn(`retryDelaySeedMs`, 1e4, e), this.Ta = Dn(`forwardChannelMaxRetries`, 2, e), this.va = Dn(`forwardChannelRequestTimeoutMs`, 2e4, e), this.ma = e && e.xmlHttpFactory || void 0, this.Ua = e && e.Rb || void 0, this.Aa = e && e.useFetchStreams || !1, this.O = void 0, this.L = e && e.supportsCrossDomainXhr || !1, this.M = ``, this.h = new Dt(e && e.concurrentRequestLimit), this.Ba = new ln, this.S = e && e.fastHandshake || !1, this.R = e && e.encodeInitMessageHeaders || !1, this.S && this.R && (this.R = !1), this.Ra = e && e.Pb || !1, e && e.ua && this.j.ua(), e && e.forceLongPolling && (this.X = !1), this.aa = !this.S && this.X && e && e.detectBufferingProxy || !1, this.ia = void 0, e && e.longPollingTimeout && e.longPollingTimeout > 0 && (this.ia = e.longPollingTimeout), this.ta = void 0, this.T = 0, this.P = !1, this.ja = this.B = null
    }
    e = On.prototype, e.ka = 8, e.I = 1, e.connect = function(e, t, n, r) {
        $e(0), this.W = e, this.H = t || {}, n && r !== void 0 && (this.H.OSID = n, this.H.OAID = r), this.F = this.X, this.J = Kn(this, null, this.W), Mn(this)
    };

    function kn(e) {
        if (jn(e), e.I == 3) {
            var t = e.V++,
                n = Lt(e.J);
            if (z(n, `SID`, e.M), z(n, `RID`, t), z(n, `TYPE`, `terminate`), Fn(e, n), t = new pt(e, e.j, t), t.M = 2, t.A = Vt(Lt(n)), n = !1, o.navigator && o.navigator.sendBeacon) try {
                n = o.navigator.sendBeacon(t.A.toString(), ``)
            } catch {}!n && o.Image && (new Image().src = t.A, n = !0), n || (t.g = qn(t.j, null), t.g.ea(t.A)), t.F = Date.now(), xt(t)
        }
        Gn(e)
    }

    function An(e) {
        e.g &&= (zn(e), e.g.cancel(), null)
    }

    function jn(e) {
        An(e), e.v &&= (o.clearTimeout(e.v), null), Vn(e), e.h.cancel(), e.m &&= (typeof e.m == `number` && o.clearTimeout(e.m), null)
    }

    function Mn(e) {
        if (!Ot(e.h) && !e.m) {
            e.m = !0;
            var t = e.Ea;
            x || S(), ee ||= (x(), !0), te.add(t, e), e.D = 0
        }
    }

    function Nn(e, t) {
        return kt(e.h) >= e.h.j - (e.m ? 1 : 0) ? !1 : e.m ? (e.i = t.G.concat(e.i), !0) : e.I == 1 || e.I == 2 || e.D >= (e.Sa ? 0 : e.Ta) ? !1 : (e.m = tt(l(e.Ea, e, t), Un(e, e.D)), e.D++, !0)
    }
    e.Ea = function(e) {
        if (this.m)
            if (this.m = null, this.I == 1) {
                if (!e) {
                    this.V = Math.floor(Math.random() * 1e5), e = this.V++;
                    let i = new pt(this, this.j, e),
                        a = this.o;
                    if (this.U && (a ? (a = ue(a), fe(a, this.U)) : a = this.U), this.u !== null || this.R || (i.J = a, a = null), this.S) a: {
                        for (var t = 0, n = 0; n < this.i.length; n++) {
                            b: {
                                var r = this.i[n];
                                if (`__data__` in r.map && (r = r.map.__data__, typeof r == `string`)) {
                                    r = r.length;
                                    break b
                                }
                                r = void 0
                            }
                            if (r === void 0) break;
                            if (t += r, t > 4096) {
                                t = n;
                                break a
                            }
                            if (t === 4096 || n === this.i.length - 1) {
                                t = n + 1;
                                break a
                            }
                        }
                        t = 1e3
                    }
                    else t = 1e3;
                    t = In(this, i, t), n = Lt(this.J), z(n, `RID`, e), z(n, `CVER`, 22), this.G && z(n, `X-HTTP-Session-Id`, this.G), Fn(this, n), a && (this.R ? t = `headers=` + dt(hn(a)) + `&` + t : this.u && gn(n, this.u, a)), jt(this.h, i), this.Ra && z(n, `TYPE`, `init`), this.S ? (z(n, `$req`, t), z(n, `SID`, `null`), i.U = !0, gt(i, n, null)) : gt(i, n, t), this.I = 2
                }
            } else this.I == 3 && (e ? Pn(this, e) : this.i.length == 0 || Ot(this.h) || Pn(this))
    };

    function Pn(e, t) {
        var n = t ? t.l : e.V++;
        let r = Lt(e.J);
        z(r, `SID`, e.M), z(r, `RID`, n), z(r, `AID`, e.K), Fn(e, r), e.u && e.o && gn(r, e.u, e.o), n = new pt(e, e.j, n, e.D + 1), e.u === null && (n.J = e.o), t && (e.i = t.G.concat(e.i)), t = In(e, n, 1e3), n.H = Math.round(e.va * .5) + Math.round(e.va * .5 * Math.random()), jt(e.h, n), gt(n, r, t)
    }

    function Fn(e, t) {
        e.H && ce(e.H, function(e, n) {
            z(t, n, e)
        }), e.l && ce({}, function(e, n) {
            z(t, n, e)
        })
    }

    function In(e, t, n) {
        n = Math.min(e.i.length, n);
        let r = e.l ? l(e.l.Ka, e.l, e) : null;
        a: {
            var i = e.i;
            let t = -1;
            for (;;) {
                let e = [`count=` + n];
                t == -1 ? n > 0 ? (t = i[0].g, e.push(`ofs=` + t)) : t = 0 : e.push(`ofs=` + t);
                let c = !0;
                for (let l = 0; l < n; l++) {
                    var a = i[l].g;
                    let n = i[l].map;
                    if (a -= t, a < 0) t = Math.max(0, i[l].g - 100), c = !1;
                    else try {
                        a = `req` + a + `_` || ``;
                        try {
                            var o = n instanceof Map ? n : Object.entries(n);
                            for (let [t, n] of o) {
                                let r = n;
                                s(n) && (r = Be(n)), e.push(a + t + `=` + encodeURIComponent(r))
                            }
                        } catch (t) {
                            throw e.push(a + `type=_badmap`), t
                        }
                    } catch {
                        r && r(n)
                    }
                }
                if (c) {
                    o = e.join(`&`);
                    break a
                }
            }
            o = void 0
        }
        return e = e.i.splice(0, n), t.G = e, o
    }

    function Ln(e) {
        if (!e.g && !e.v) {
            e.Y = 1;
            var t = e.Da;
            x || S(), ee ||= (x(), !0), te.add(t, e), e.A = 0
        }
    }

    function Rn(e) {
        return e.g || e.v || e.A >= 3 ? !1 : (e.Y++, e.v = tt(l(e.Da, e), Un(e, e.A)), e.A++, !0)
    }
    e.Da = function() {
        if (this.v = null, Bn(this), this.aa && !(this.P || this.g == null || this.T <= 0)) {
            var e = 4 * this.T;
            this.j.info(`BP detection timer enabled: ` + e), this.B = tt(l(this.Wa, this), e)
        }
    }, e.Wa = function() {
        this.B && (this.B = null, this.j.info(`BP detection timeout reached.`), this.j.info(`Buffering proxy detected and switch to long-polling!`), this.F = !1, this.P = !0, $e(10), An(this), Bn(this))
    };

    function zn(e) {
        e.B != null && (o.clearTimeout(e.B), e.B = null)
    }

    function Bn(e) {
        e.g = new pt(e, e.j, `rpc`, e.Y), e.u === null && (e.g.J = e.o), e.g.P = 0;
        var t = Lt(e.na);
        z(t, `RID`, `rpc`), z(t, `SID`, e.M), z(t, `AID`, e.K), z(t, `CI`, e.F ? `0` : `1`), !e.F && e.ia && z(t, `TO`, e.ia), z(t, `TYPE`, `xmlhttp`), Fn(e, t), e.u && e.o && gn(t, e.u, e.o), e.O && (e.g.H = e.O);
        var n = e.g;
        e = e.ba, n.M = 1, n.A = Vt(Lt(t)), n.u = null, n.R = !0, _t(n, e)
    }
    e.Va = function() {
        this.C != null && (this.C = null, An(this), Rn(this), $e(19))
    };

    function Vn(e) {
        e.C != null && (o.clearTimeout(e.C), e.C = null)
    }

    function Hn(e, t) {
        var n = null;
        if (e.g == t) {
            Vn(e), zn(e), e.g = null;
            var r = 2
        } else if (At(e.h, t)) n = t.G, Mt(e.h, t), r = 1;
        else return;
        if (e.I != 0) {
            if (t.o)
                if (r == 1) {
                    n = t.u ? t.u.length : 0, t = Date.now() - t.F;
                    var i = e.D;
                    r = Ye(), Ie(r, new et(r, n)), Mn(e)
                } else Ln(e);
            else if (i = t.m, i == 3 || i == 0 && t.X > 0 || !(r == 1 && Nn(e, t) || r == 2 && Rn(e))) switch (n && n.length > 0 && (t = e.h, t.i = t.i.concat(n)), i) {
                case 1:
                    Wn(e, 5);
                    break;
                case 4:
                    Wn(e, 10);
                    break;
                case 3:
                    Wn(e, 6);
                    break;
                default:
                    Wn(e, 2)
            }
        }
    }

    function Un(e, t) {
        let n = e.Qa + Math.floor(Math.random() * e.Za);
        return e.isActive() || (n *= 2), n * t
    }

    function Wn(e, t) {
        if (e.j.info(`Error code ` + t), t == 2) {
            var n = l(e.bb, e),
                r = e.Ua;
            let t = !r;
            r = new It(r || `//www.google.com/images/cleardot.gif`), o.location && o.location.protocol == `http` || Rt(r, `https`), Vt(r), t ? on(r.toString(), n) : sn(r.toString(), n)
        } else $e(2);
        e.I = 0, e.l && e.l.pa(t), Gn(e), jn(e)
    }
    e.bb = function(e) {
        e ? (this.j.info(`Successfully pinged google.com`), $e(2)) : (this.j.info(`Failed to ping google.com`), $e(1))
    };

    function Gn(e) {
        if (e.I = 0, e.ja = [], e.l) {
            let t = Nt(e.h);
            (t.length != 0 || e.i.length != 0) && (m(e.ja, t), m(e.ja, e.i), e.h.i.length = 0, p(e.i), e.i.length = 0), e.l.oa()
        }
    }

    function Kn(e, t, n) {
        var r = n instanceof It ? Lt(n) : new It(n);
        if (r.g != ``) t && (r.g = t + `.` + r.g), zt(r, r.u);
        else {
            var i = o.location;
            r = i.protocol, t = t ? t + `.` + i.hostname : i.hostname, i = +i.port;
            let e = new It(null);
            r && Rt(e, r), t && (e.g = t), i && zt(e, i), n && (e.h = n), r = e
        }
        return n = e.G, t = e.wa, n && t && z(r, n, t), z(r, `VER`, e.ka), Fn(e, r), r
    }

    function qn(e, t, n) {
        if (t && !e.L) throw Error(`Can't create secondary domain capable XhrIo object.`);
        return t = e.Aa && !e.ma ? new _n(new un({
            ab: n
        })) : new _n(e.ma), t.Fa(e.L), t
    }
    e.isActive = function() {
        return !!this.l && this.l.isActive(this)
    };

    function Jn() {}
    e = Jn.prototype, e.ra = function() {}, e.qa = function() {}, e.pa = function() {}, e.oa = function() {}, e.isActive = function() {
        return !0
    }, e.Ka = function() {};

    function Yn() {}
    Yn.prototype.g = function(e, t) {
        return new Xn(e, t)
    };

    function Xn(e, t) {
        A.call(this), this.g = new On(t), this.l = e, this.h = t && t.messageUrlParams || null, e = t && t.messageHeaders || null, t && t.clientProtocolHeaderRequired && (e ? e[`X-Client-Protocol`] = `webchannel` : e = {
            "X-Client-Protocol": `webchannel`
        }), this.g.o = e, e = t && t.initMessageHeaders || null, t && t.messageContentType && (e ? e[`X-WebChannel-Content-Type`] = t.messageContentType : e = {
            "X-WebChannel-Content-Type": t.messageContentType
        }), t && t.sa && (e ? e[`X-WebChannel-Client-Profile`] = t.sa : e = {
            "X-WebChannel-Client-Profile": t.sa
        }), this.g.U = e, (e = t && t.Qb) && !ae(e) && (this.g.u = e), this.A = t && t.supportsCrossDomainXhr || !1, this.v = t && t.sendRawJson || !1, (t &&= t.httpSessionIdParam) && !ae(t) && (this.g.G = t, e = this.h, e !== null && t in e && (e = this.h, t in e && delete e[t])), this.j = new $n(this)
    }
    d(Xn, A), Xn.prototype.m = function() {
        this.g.l = this.j, this.A && (this.g.L = !0), this.g.connect(this.l, this.h || void 0)
    }, Xn.prototype.close = function() {
        kn(this.g)
    }, Xn.prototype.o = function(e) {
        var t = this.g;
        if (typeof e == `string`) {
            var n = {};
            n.__data__ = e, e = n
        } else this.v && (n = {}, n.__data__ = Be(e), e = n);
        t.i.push(new Et(t.Ya++, e)), t.I == 3 && Mn(t)
    }, Xn.prototype.N = function() {
        this.g.l = null, delete this.j, kn(this.g), delete this.g, Xn.Z.N.call(this)
    };

    function Zn(e) {
        Ke.call(this), e.__headers__ && (this.headers = e.__headers__, this.statusCode = e.__status__, delete e.__headers__, delete e.__status__);
        var t = e.__sm__;
        if (t) {
            a: {
                for (let n in t) {
                    e = n;
                    break a
                }
                e = void 0
            }(this.i = e) && (e = this.i, t = t !== null && e in t ? t[e] : void 0),
            this.data = t
        }
        else this.data = e
    }
    d(Zn, Ke);

    function Qn() {
        qe.call(this), this.status = 1
    }
    d(Qn, qe);

    function $n(e) {
        this.g = e
    }
    d($n, Jn), $n.prototype.ra = function() {
        Ie(this.g, `a`)
    }, $n.prototype.qa = function(e) {
        Ie(this.g, new Zn(e))
    }, $n.prototype.pa = function(e) {
        Ie(this.g, new Qn)
    }, $n.prototype.oa = function() {
        Ie(this.g, `b`)
    }, Yn.prototype.createWebChannel = Yn.prototype.g, Xn.prototype.send = Xn.prototype.o, Xn.prototype.open = Xn.prototype.m, Xn.prototype.close = Xn.prototype.close, De = ye.createWebChannelTransport = function() {
        return new Yn
    }, Ee = ye.getStatEventTarget = function() {
        return Ye()
    }, Te = ye.Event = F, we = ye.Stat = {
        jb: 0,
        mb: 1,
        nb: 2,
        Hb: 3,
        Mb: 4,
        Jb: 5,
        Kb: 6,
        Ib: 7,
        Gb: 8,
        Lb: 9,
        PROXY: 10,
        NOPROXY: 11,
        Eb: 12,
        Ab: 13,
        Bb: 14,
        zb: 15,
        Cb: 16,
        Db: 17,
        fb: 18,
        eb: 19,
        gb: 20
    }, st.NO_ERROR = 0, st.TIMEOUT = 8, st.HTTP_ERROR = 6, Ce = ye.ErrorCode = st, ct.COMPLETE = `complete`, Se = ye.EventType = ct, We.EventType = Ge, Ge.OPEN = `a`, Ge.CLOSE = `b`, Ge.ERROR = `c`, Ge.MESSAGE = `d`, A.prototype.listen = A.prototype.J, xe = ye.WebChannel = We, ye.FetchXmlHttpFactory = un, _n.prototype.listenOnce = _n.prototype.K, _n.prototype.getLastError = _n.prototype.Ha, _n.prototype.getLastErrorCode = _n.prototype.ya, _n.prototype.getStatus = _n.prototype.ca, _n.prototype.getResponseJson = _n.prototype.La, _n.prototype.getResponseText = _n.prototype.la, _n.prototype.send = _n.prototype.ea, _n.prototype.setWithCredentials = _n.prototype.Fa, be = ye.XhrIo = _n
}).apply(ve === void 0 ? typeof self < `u` ? self : typeof window < `u` ? window : {} : ve);
var Oe = class {
    constructor(e) {
        this.uid = e
    }
    isAuthenticated() {
        return this.uid != null
    }
    toKey() {
        return this.isAuthenticated() ? `uid:` + this.uid : `anonymous-user`
    }
    isEqual(e) {
        return e.uid === this.uid
    }
};
Oe.UNAUTHENTICATED = new Oe(null), Oe.GOOGLE_CREDENTIALS = new Oe(`google-credentials-uid`), Oe.FIRST_PARTY = new Oe(`first-party-uid`), Oe.MOCK_USER = new Oe(`mock-user`);
var ke = `12.11.0`;

function Ae(e) {
    ke = e
}
var je = new ie(`@firebase/firestore`);

function Me() {
    return je.logLevel
}

function k(e, ...t) {
    if (je.logLevel <= x.DEBUG) {
        let n = t.map(Fe);
        je.debug(`Firestore (${ke}): ${e}`, ...n)
    }
}

function Ne(e, ...t) {
    if (je.logLevel <= x.ERROR) {
        let n = t.map(Fe);
        je.error(`Firestore (${ke}): ${e}`, ...n)
    }
}

function Pe(e, ...t) {
    if (je.logLevel <= x.WARN) {
        let n = t.map(Fe);
        je.warn(`Firestore (${ke}): ${e}`, ...n)
    }
}

function Fe(e) {
    if (typeof e == `string`) return e;
    try {
        return function(e) {
            return JSON.stringify(e)
        }(e)
    } catch {
        return e
    }
}

function A(e, t, n) {
    let r = `Unexpected state`;
    typeof t == `string` ? r = t : n = t, Ie(e, r, n)
}

function Ie(e, t, n) {
    let r = `FIRESTORE (${ke}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;
    if (n !== void 0) try {
        r += ` CONTEXT: ` + JSON.stringify(n)
    } catch {
        r += ` CONTEXT: ` + n
    }
    throw Ne(r), Error(r)
}

function j(e, t, n, r) {
    let i = `Unexpected state`;
    typeof n == `string` ? i = n : r = n, e || Ie(t, i, r)
}

function M(e, t) {
    return e
}
var N = {
        OK: `ok`,
        CANCELLED: `cancelled`,
        UNKNOWN: `unknown`,
        INVALID_ARGUMENT: `invalid-argument`,
        DEADLINE_EXCEEDED: `deadline-exceeded`,
        NOT_FOUND: `not-found`,
        ALREADY_EXISTS: `already-exists`,
        PERMISSION_DENIED: `permission-denied`,
        UNAUTHENTICATED: `unauthenticated`,
        RESOURCE_EXHAUSTED: `resource-exhausted`,
        FAILED_PRECONDITION: `failed-precondition`,
        ABORTED: `aborted`,
        OUT_OF_RANGE: `out-of-range`,
        UNIMPLEMENTED: `unimplemented`,
        INTERNAL: `internal`,
        UNAVAILABLE: `unavailable`,
        DATA_LOSS: `data-loss`
    },
    P = class extends S {
        constructor(e, t) {
            super(e, t), this.code = e, this.message = t, this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`
        }
    },
    Le = class {
        constructor() {
            this.promise = new Promise(((e, t) => {
                this.resolve = e, this.reject = t
            }))
        }
    },
    Re = class {
        constructor(e, t) {
            this.user = t, this.type = `OAuth`, this.headers = new Map, this.headers.set(`Authorization`, `Bearer ${e}`)
        }
    },
    ze = class {
        getToken() {
            return Promise.resolve(null)
        }
        invalidateToken() {}
        start(e, t) {
            e.enqueueRetryable((() => t(Oe.UNAUTHENTICATED)))
        }
        shutdown() {}
    },
    Be = class {
        constructor(e) {
            this.token = e, this.changeListener = null
        }
        getToken() {
            return Promise.resolve(this.token)
        }
        invalidateToken() {}
        start(e, t) {
            this.changeListener = t, e.enqueueRetryable((() => t(this.token.user)))
        }
        shutdown() {
            this.changeListener = null
        }
    },
    Ve = class {
        constructor(e) {
            this.t = e, this.currentUser = Oe.UNAUTHENTICATED, this.i = 0, this.forceRefresh = !1, this.auth = null
        }
        start(e, t) {
            j(this.o === void 0, 42304);
            let n = this.i,
                r = e => this.i === n ? Promise.resolve() : (n = this.i, t(e)),
                i = new Le;
            this.o = () => {
                this.i++, this.currentUser = this.u(), i.resolve(), i = new Le, e.enqueueRetryable((() => r(this.currentUser)))
            };
            let a = () => {
                    let t = i;
                    e.enqueueRetryable((async () => {
                        await t.promise, await r(this.currentUser)
                    }))
                },
                o = e => {
                    k(`FirebaseAuthCredentialsProvider`, `Auth detected`), this.auth = e, this.o && (this.auth.addAuthTokenListener(this.o), a())
                };
            this.t.onInit((e => o(e))), setTimeout((() => {
                if (!this.auth) {
                    let e = this.t.getImmediate({
                        optional: !0
                    });
                    e ? o(e) : (k(`FirebaseAuthCredentialsProvider`, `Auth not yet detected`), i.resolve(), i = new Le)
                }
            }), 0), a()
        }
        getToken() {
            let e = this.i,
                t = this.forceRefresh;
            return this.forceRefresh = !1, this.auth ? this.auth.getToken(t).then((t => this.i === e ? t ? (j(typeof t.accessToken == `string`, 31837, {
                l: t
            }), new Re(t.accessToken, this.currentUser)) : null : (k(`FirebaseAuthCredentialsProvider`, `getToken aborted due to token change.`), this.getToken()))) : Promise.resolve(null)
        }
        invalidateToken() {
            this.forceRefresh = !0
        }
        shutdown() {
            this.auth && this.o && this.auth.removeAuthTokenListener(this.o), this.o = void 0
        }
        u() {
            let e = this.auth && this.auth.getUid();
            return j(e === null || typeof e == `string`, 2055, {
                h: e
            }), new Oe(e)
        }
    },
    He = class {
        constructor(e, t, n) {
            this.P = e, this.T = t, this.I = n, this.type = `FirstParty`, this.user = Oe.FIRST_PARTY, this.R = new Map
        }
        A() {
            return this.I ? this.I() : null
        }
        get headers() {
            this.R.set(`X-Goog-AuthUser`, this.P);
            let e = this.A();
            return e && this.R.set(`Authorization`, e), this.T && this.R.set(`X-Goog-Iam-Authorization-Token`, this.T), this.R
        }
    },
    Ue = class {
        constructor(e, t, n) {
            this.P = e, this.T = t, this.I = n
        }
        getToken() {
            return Promise.resolve(new He(this.P, this.T, this.I))
        }
        start(e, t) {
            e.enqueueRetryable((() => t(Oe.FIRST_PARTY)))
        }
        shutdown() {}
        invalidateToken() {}
    },
    We = class {
        constructor(e) {
            this.value = e, this.type = `AppCheck`, this.headers = new Map, e && e.length > 0 && this.headers.set(`x-firebase-appcheck`, this.value)
        }
    },
    Ge = class {
        constructor(e, t) {
            this.V = t, this.forceRefresh = !1, this.appCheck = null, this.m = null, this.p = null, ne(e) && e.settings.appCheckToken && (this.p = e.settings.appCheckToken)
        }
        start(e, t) {
            j(this.o === void 0, 3512);
            let n = e => {
                e.error != null && k(`FirebaseAppCheckTokenProvider`, `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);
                let n = e.token !== this.m;
                return this.m = e.token, k(`FirebaseAppCheckTokenProvider`, `Received ${n?`new`:`existing`} token.`), n ? t(e.token) : Promise.resolve()
            };
            this.o = t => {
                e.enqueueRetryable((() => n(t)))
            };
            let r = e => {
                k(`FirebaseAppCheckTokenProvider`, `AppCheck detected`), this.appCheck = e, this.o && this.appCheck.addTokenListener(this.o)
            };
            this.V.onInit((e => r(e))), setTimeout((() => {
                if (!this.appCheck) {
                    let e = this.V.getImmediate({
                        optional: !0
                    });
                    e ? r(e) : k(`FirebaseAppCheckTokenProvider`, `AppCheck not yet detected`)
                }
            }), 0)
        }
        getToken() {
            if (this.p) return Promise.resolve(new We(this.p));
            let e = this.forceRefresh;
            return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(e).then((e => e ? (j(typeof e.token == `string`, 44558, {
                tokenResult: e
            }), this.m = e.token, new We(e.token)) : null)) : Promise.resolve(null)
        }
        invalidateToken() {
            this.forceRefresh = !0
        }
        shutdown() {
            this.appCheck && this.o && this.appCheck.removeTokenListener(this.o), this.o = void 0
        }
    };

function Ke(e) {
    let t = typeof self < `u` && (self.crypto || self.msCrypto),
        n = new Uint8Array(e);
    if (t && typeof t.getRandomValues == `function`) t.getRandomValues(n);
    else
        for (let t = 0; t < e; t++) n[t] = Math.floor(256 * Math.random());
    return n
}
var qe = class {
    static newId() {
        let e = ``;
        for (; e.length < 20;) {
            let t = Ke(40);
            for (let n = 0; n < t.length; ++n) e.length < 20 && t[n] < 248 && (e += `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(t[n] % 62))
        }
        return e
    }
};

function F(e, t) {
    return e < t ? -1 : e > t ? 1 : 0
}

function Je(e, t) {
    let n = Math.min(e.length, t.length);
    for (let r = 0; r < n; r++) {
        let n = e.charAt(r),
            i = t.charAt(r);
        if (n !== i) return Ze(n) === Ze(i) ? F(n, i) : Ze(n) ? 1 : -1
    }
    return F(e.length, t.length)
}
var Ye = 55296,
    Xe = 57343;

function Ze(e) {
    let t = e.charCodeAt(0);
    return t >= Ye && t <= Xe
}

function Qe(e, t, n) {
    return e.length === t.length && e.every(((e, r) => n(e, t[r])))
}
var $e = `__name__`,
    et = class e {
        constructor(e, t, n) {
            t === void 0 ? t = 0 : t > e.length && A(637, {
                offset: t,
                range: e.length
            }), n === void 0 ? n = e.length - t : n > e.length - t && A(1746, {
                length: n,
                range: e.length - t
            }), this.segments = e, this.offset = t, this.len = n
        }
        get length() {
            return this.len
        }
        isEqual(t) {
            return e.comparator(this, t) === 0
        }
        child(t) {
            let n = this.segments.slice(this.offset, this.limit());
            return t instanceof e ? t.forEach((e => {
                n.push(e)
            })) : n.push(t), this.construct(n)
        }
        limit() {
            return this.offset + this.length
        }
        popFirst(e) {
            return e = e === void 0 ? 1 : e, this.construct(this.segments, this.offset + e, this.length - e)
        }
        popLast() {
            return this.construct(this.segments, this.offset, this.length - 1)
        }
        firstSegment() {
            return this.segments[this.offset]
        }
        lastSegment() {
            return this.get(this.length - 1)
        }
        get(e) {
            return this.segments[this.offset + e]
        }
        isEmpty() {
            return this.length === 0
        }
        isPrefixOf(e) {
            if (e.length < this.length) return !1;
            for (let t = 0; t < this.length; t++)
                if (this.get(t) !== e.get(t)) return !1;
            return !0
        }
        isImmediateParentOf(e) {
            if (this.length + 1 !== e.length) return !1;
            for (let t = 0; t < this.length; t++)
                if (this.get(t) !== e.get(t)) return !1;
            return !0
        }
        forEach(e) {
            for (let t = this.offset, n = this.limit(); t < n; t++) e(this.segments[t])
        }
        toArray() {
            return this.segments.slice(this.offset, this.limit())
        }
        static comparator(t, n) {
            let r = Math.min(t.length, n.length);
            for (let i = 0; i < r; i++) {
                let r = e.compareSegments(t.get(i), n.get(i));
                if (r !== 0) return r
            }
            return F(t.length, n.length)
        }
        static compareSegments(t, n) {
            let r = e.isNumericId(t),
                i = e.isNumericId(n);
            return r && !i ? -1 : !r && i ? 1 : r && i ? e.extractNumericId(t).compare(e.extractNumericId(n)) : Je(t, n)
        }
        static isNumericId(e) {
            return e.startsWith(`__id`) && e.endsWith(`__`)
        }
        static extractNumericId(e) {
            return ge.fromString(e.substring(4, e.length - 2))
        }
    },
    tt = class e extends et {
        construct(t, n, r) {
            return new e(t, n, r)
        }
        canonicalString() {
            return this.toArray().join(`/`)
        }
        toString() {
            return this.canonicalString()
        }
        toUriEncodedString() {
            return this.toArray().map(encodeURIComponent).join(`/`)
        }
        static fromString(...t) {
            let n = [];
            for (let e of t) {
                if (e.indexOf(`//`) >= 0) throw new P(N.INVALID_ARGUMENT, `Invalid segment (${e}). Paths must not contain // in them.`);
                n.push(...e.split(`/`).filter((e => e.length > 0)))
            }
            return new e(n)
        }
        static emptyPath() {
            return new e([])
        }
    },
    nt = /^[_a-zA-Z][_a-zA-Z0-9]*$/,
    rt = class e extends et {
        construct(t, n, r) {
            return new e(t, n, r)
        }
        static isValidIdentifier(e) {
            return nt.test(e)
        }
        canonicalString() {
            return this.toArray().map((t => (t = t.replace(/\\/g, `\\\\`).replace(/`/g, "\\`"), e.isValidIdentifier(t) || (t = "`" + t + "`"), t))).join(`.`)
        }
        toString() {
            return this.canonicalString()
        }
        isKeyField() {
            return this.length === 1 && this.get(0) === `__name__`
        }
        static keyField() {
            return new e([$e])
        }
        static fromServerFormat(t) {
            let n = [],
                r = ``,
                i = 0,
                a = () => {
                    if (r.length === 0) throw new P(N.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                    n.push(r), r = ``
                },
                o = !1;
            for (; i < t.length;) {
                let e = t[i];
                if (e === `\\`) {
                    if (i + 1 === t.length) throw new P(N.INVALID_ARGUMENT, `Path has trailing escape character: ` + t);
                    let e = t[i + 1];
                    if (e !== `\\` && e !== `.` && e !== "`") throw new P(N.INVALID_ARGUMENT, `Path has invalid escape sequence: ` + t);
                    r += e, i += 2
                } else e === "`" ? (o = !o, i++) : e !== `.` || o ? (r += e, i++) : (a(), i++)
            }
            if (a(), o) throw new P(N.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
            return new e(n)
        }
        static emptyPath() {
            return new e([])
        }
    },
    I = class e {
        constructor(e) {
            this.path = e
        }
        static fromPath(t) {
            return new e(tt.fromString(t))
        }
        static fromName(t) {
            return new e(tt.fromString(t).popFirst(5))
        }
        static empty() {
            return new e(tt.emptyPath())
        }
        get collectionGroup() {
            return this.path.popLast().lastSegment()
        }
        hasCollectionId(e) {
            return this.path.length >= 2 && this.path.get(this.path.length - 2) === e
        }
        getCollectionGroup() {
            return this.path.get(this.path.length - 2)
        }
        getCollectionPath() {
            return this.path.popLast()
        }
        isEqual(e) {
            return e !== null && tt.comparator(this.path, e.path) === 0
        }
        toString() {
            return this.path.toString()
        }
        static comparator(e, t) {
            return tt.comparator(e.path, t.path)
        }
        static isDocumentKey(e) {
            return e.length % 2 == 0
        }
        static fromSegments(t) {
            return new e(new tt(t.slice()))
        }
    };

function it(e, t, n) {
    if (!n) throw new P(N.INVALID_ARGUMENT, `Function ${e}() cannot be called with an empty ${t}.`)
}

function at(e, t, n, r) {
    if (!0 === t && !0 === r) throw new P(N.INVALID_ARGUMENT, `${e} and ${n} cannot be used together.`)
}

function ot(e) {
    if (!I.isDocumentKey(e)) throw new P(N.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)
}

function st(e) {
    if (I.isDocumentKey(e)) throw new P(N.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)
}

function ct(e) {
    return typeof e == `object` && !!e && (Object.getPrototypeOf(e) === Object.prototype || Object.getPrototypeOf(e) === null)
}

function lt(e) {
    if (e === void 0) return `undefined`;
    if (e === null) return `null`;
    if (typeof e == `string`) return e.length > 20 && (e = `${e.substring(0,20)}...`), JSON.stringify(e);
    if (typeof e == `number` || typeof e == `boolean`) return `` + e;
    if (typeof e == `object`) {
        if (e instanceof Array) return `an array`;
        {
            let t = function(e) {
                return e.constructor ? e.constructor.name : null
            }(e);
            return t ? `a custom ${t} object` : `an object`
        }
    }
    return typeof e == `function` ? `a function` : A(12329, {
        type: typeof e
    })
}

function ut(e, t) {
    if (`_delegate` in e && (e = e._delegate), !(e instanceof t)) {
        if (t.name === e.constructor.name) throw new P(N.INVALID_ARGUMENT, `Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?`);
        {
            let n = lt(e);
            throw new P(N.INVALID_ARGUMENT, `Expected type '${t.name}', but it was: ${n}`)
        }
    }
    return e
}

function dt(e, t) {
    let n = {
        typeString: e
    };
    return t && (n.value = t), n
}

function ft(e, t) {
    if (!ct(e)) throw new P(N.INVALID_ARGUMENT, `JSON must be an object`);
    let n;
    for (let r in t)
        if (t[r]) {
            let i = t[r].typeString,
                a = `value` in t[r] ? {
                    value: t[r].value
                } : void 0;
            if (!(r in e)) {
                n = `JSON missing required field: '${r}'`;
                break
            }
            let o = e[r];
            if (i && typeof o !== i) {
                n = `JSON field '${r}' must be a ${i}.`;
                break
            }
            if (a !== void 0 && o !== a.value) {
                n = `Expected '${r}' field to equal '${a.value}'`;
                break
            }
        } if (n) throw new P(N.INVALID_ARGUMENT, n);
    return !0
}
var pt = -62135596800,
    mt = 1e6,
    ht = class e {
        static now() {
            return e.fromMillis(Date.now())
        }
        static fromDate(t) {
            return e.fromMillis(t.getTime())
        }
        static fromMillis(t) {
            let n = Math.floor(t / 1e3);
            return new e(n, Math.floor((t - 1e3 * n) * mt))
        }
        constructor(e, t) {
            if (this.seconds = e, this.nanoseconds = t, t < 0 || t >= 1e9) throw new P(N.INVALID_ARGUMENT, `Timestamp nanoseconds out of range: ` + t);
            if (e < pt || e >= 253402300800) throw new P(N.INVALID_ARGUMENT, `Timestamp seconds out of range: ` + e)
        }
        toDate() {
            return new Date(this.toMillis())
        }
        toMillis() {
            return 1e3 * this.seconds + this.nanoseconds / mt
        }
        _compareTo(e) {
            return this.seconds === e.seconds ? F(this.nanoseconds, e.nanoseconds) : F(this.seconds, e.seconds)
        }
        isEqual(e) {
            return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds
        }
        toString() {
            return `Timestamp(seconds=` + this.seconds + `, nanoseconds=` + this.nanoseconds + `)`
        }
        toJSON() {
            return {
                type: e._jsonSchemaVersion,
                seconds: this.seconds,
                nanoseconds: this.nanoseconds
            }
        }
        static fromJSON(t) {
            if (ft(t, e._jsonSchema)) return new e(t.seconds, t.nanoseconds)
        }
        valueOf() {
            let e = this.seconds - pt;
            return String(e).padStart(12, `0`) + `.` + String(this.nanoseconds).padStart(9, `0`)
        }
    };
ht._jsonSchemaVersion = `firestore/timestamp/1.0`, ht._jsonSchema = {
    type: dt(`string`, ht._jsonSchemaVersion),
    seconds: dt(`number`),
    nanoseconds: dt(`number`)
};
var L = class e {
        static fromTimestamp(t) {
            return new e(t)
        }
        static min() {
            return new e(new ht(0, 0))
        }
        static max() {
            return new e(new ht(253402300799, 999999999))
        }
        constructor(e) {
            this.timestamp = e
        }
        compareTo(e) {
            return this.timestamp._compareTo(e.timestamp)
        }
        isEqual(e) {
            return this.timestamp.isEqual(e.timestamp)
        }
        toMicroseconds() {
            return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
        }
        toString() {
            return `SnapshotVersion(` + this.timestamp.toString() + `)`
        }
        toTimestamp() {
            return this.timestamp
        }
    },
    gt = -1,
    _t = class {
        constructor(e, t, n, r) {
            this.indexId = e, this.collectionGroup = t, this.fields = n, this.indexState = r
        }
    };
_t.UNKNOWN_ID = -1;

function vt(e, t) {
    let n = e.toTimestamp().seconds,
        r = e.toTimestamp().nanoseconds + 1;
    return new bt(L.fromTimestamp(r === 1e9 ? new ht(n + 1, 0) : new ht(n, r)), I.empty(), t)
}

function yt(e) {
    return new bt(e.readTime, e.key, gt)
}
var bt = class e {
    constructor(e, t, n) {
        this.readTime = e, this.documentKey = t, this.largestBatchId = n
    }
    static min() {
        return new e(L.min(), I.empty(), gt)
    }
    static max() {
        return new e(L.max(), I.empty(), gt)
    }
};

function xt(e, t) {
    let n = e.readTime.compareTo(t.readTime);
    return n === 0 ? (n = I.comparator(e.documentKey, t.documentKey), n === 0 ? F(e.largestBatchId, t.largestBatchId) : n) : n
}
var St = `The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.`,
    Ct = class {
        constructor() {
            this.onCommittedListeners = []
        }
        addOnCommittedListener(e) {
            this.onCommittedListeners.push(e)
        }
        raiseOnCommittedEvent() {
            this.onCommittedListeners.forEach((e => e()))
        }
    };
async function wt(e) {
    if (e.code !== N.FAILED_PRECONDITION || e.message !== St) throw e;
    k(`LocalStore`, `Unexpectedly lost primary lease`)
}
var R = class e {
    constructor(e) {
        this.nextCallback = null, this.catchCallback = null, this.result = void 0, this.error = void 0, this.isDone = !1, this.callbackAttached = !1, e((e => {
            this.isDone = !0, this.result = e, this.nextCallback && this.nextCallback(e)
        }), (e => {
            this.isDone = !0, this.error = e, this.catchCallback && this.catchCallback(e)
        }))
    } catch (e) {
        return this.next(void 0, e)
    }
    next(t, n) {
        return this.callbackAttached && A(59440), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(n, this.error) : this.wrapSuccess(t, this.result) : new e(((e, r) => {
            this.nextCallback = n => {
                this.wrapSuccess(t, n).next(e, r)
            }, this.catchCallback = t => {
                this.wrapFailure(n, t).next(e, r)
            }
        }))
    }
    toPromise() {
        return new Promise(((e, t) => {
            this.next(e, t)
        }))
    }
    wrapUserFunction(t) {
        try {
            let n = t();
            return n instanceof e ? n : e.resolve(n)
        } catch (t) {
            return e.reject(t)
        }
    }
    wrapSuccess(t, n) {
        return t ? this.wrapUserFunction((() => t(n))) : e.resolve(n)
    }
    wrapFailure(t, n) {
        return t ? this.wrapUserFunction((() => t(n))) : e.reject(n)
    }
    static resolve(t) {
        return new e(((e, n) => {
            e(t)
        }))
    }
    static reject(t) {
        return new e(((e, n) => {
            n(t)
        }))
    }
    static waitFor(t) {
        return new e(((e, n) => {
            let r = 0,
                i = 0,
                a = !1;
            t.forEach((t => {
                ++r, t.next((() => {
                    ++i, a && i === r && e()
                }), (e => n(e)))
            })), a = !0, i === r && e()
        }))
    }
    static or(t) {
        let n = e.resolve(!1);
        for (let r of t) n = n.next((t => t ? e.resolve(t) : r()));
        return n
    }
    static forEach(e, t) {
        let n = [];
        return e.forEach(((e, r) => {
            n.push(t.call(this, e, r))
        })), this.waitFor(n)
    }
    static mapArray(t, n) {
        return new e(((e, r) => {
            let i = t.length,
                a = Array(i),
                o = 0;
            for (let s = 0; s < i; s++) {
                let c = s;
                n(t[c]).next((t => {
                    a[c] = t, ++o, o === i && e(a)
                }), (e => r(e)))
            }
        }))
    }
    static doWhile(t, n) {
        return new e(((e, r) => {
            let i = () => {
                !0 === t() ? n().next((() => {
                    i()
                }), r) : e()
            };
            i()
        }))
    }
};

function Tt(e) {
    let t = e.match(/Android ([\d.]+)/i),
        n = t ? t[1].split(`.`).slice(0, 2).join(`.`) : `-1`;
    return Number(n)
}

function Et(e) {
    return e.name === `IndexedDbTransactionError`
}
var Dt = class {
    constructor(e, t) {
        this.previousValue = e, t && (t.sequenceNumberHandler = e => this.ae(e), this.ue = e => t.writeSequenceNumber(e))
    }
    ae(e) {
        return this.previousValue = Math.max(e, this.previousValue), this.previousValue
    }
    next() {
        let e = ++this.previousValue;
        return this.ue && this.ue(e), e
    }
};
Dt.ce = -1;
var Ot = -1;

function kt(e) {
    return e == null
}

function At(e) {
    return e === 0 && 1 / e == -1 / 0
}

function jt(e) {
    return typeof e == `number` && Number.isInteger(e) && !At(e) && e <= 2 ** 53 - 1 && e >= -(2 ** 53 - 1)
}
var Mt = ``;

function Nt(e) {
    let t = ``;
    for (let n = 0; n < e.length; n++) t.length > 0 && (t = Ft(t)), t = Pt(e.get(n), t);
    return Ft(t)
}

function Pt(e, t) {
    let n = t,
        r = e.length;
    for (let t = 0; t < r; t++) {
        let r = e.charAt(t);
        switch (r) {
            case `\0`:
                n += ``;
                break;
            case Mt:
                n += ``;
                break;
            default:
                n += r
        }
    }
    return n
}

function Ft(e) {
    return e + Mt + ``
}

function It(e) {
    let t = 0;
    for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
    return t
}

function Lt(e, t) {
    for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n])
}

function Rt(e) {
    for (let t in e)
        if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
    return !0
}
var zt = class e {
        constructor(e, t) {
            this.comparator = e, this.root = t || z.EMPTY
        }
        insert(t, n) {
            return new e(this.comparator, this.root.insert(t, n, this.comparator).copy(null, null, z.BLACK, null, null))
        }
        remove(t) {
            return new e(this.comparator, this.root.remove(t, this.comparator).copy(null, null, z.BLACK, null, null))
        }
        get(e) {
            let t = this.root;
            for (; !t.isEmpty();) {
                let n = this.comparator(e, t.key);
                if (n === 0) return t.value;
                n < 0 ? t = t.left : n > 0 && (t = t.right)
            }
            return null
        }
        indexOf(e) {
            let t = 0,
                n = this.root;
            for (; !n.isEmpty();) {
                let r = this.comparator(e, n.key);
                if (r === 0) return t + n.left.size;
                r < 0 ? n = n.left : (t += n.left.size + 1, n = n.right)
            }
            return -1
        }
        isEmpty() {
            return this.root.isEmpty()
        }
        get size() {
            return this.root.size
        }
        minKey() {
            return this.root.minKey()
        }
        maxKey() {
            return this.root.maxKey()
        }
        inorderTraversal(e) {
            return this.root.inorderTraversal(e)
        }
        forEach(e) {
            this.inorderTraversal(((t, n) => (e(t, n), !1)))
        }
        toString() {
            let e = [];
            return this.inorderTraversal(((t, n) => (e.push(`${t}:${n}`), !1))), `{${e.join(`, `)}}`
        }
        reverseTraversal(e) {
            return this.root.reverseTraversal(e)
        }
        getIterator() {
            return new Bt(this.root, null, this.comparator, !1)
        }
        getIteratorFrom(e) {
            return new Bt(this.root, e, this.comparator, !1)
        }
        getReverseIterator() {
            return new Bt(this.root, null, this.comparator, !0)
        }
        getReverseIteratorFrom(e) {
            return new Bt(this.root, e, this.comparator, !0)
        }
    },
    Bt = class {
        constructor(e, t, n, r) {
            this.isReverse = r, this.nodeStack = [];
            let i = 1;
            for (; !e.isEmpty();)
                if (i = t ? n(e.key, t) : 1, t && r && (i *= -1), i < 0) e = this.isReverse ? e.left : e.right;
                else {
                    if (i === 0) {
                        this.nodeStack.push(e);
                        break
                    }
                    this.nodeStack.push(e), e = this.isReverse ? e.right : e.left
                }
        }
        getNext() {
            let e = this.nodeStack.pop(),
                t = {
                    key: e.key,
                    value: e.value
                };
            if (this.isReverse)
                for (e = e.left; !e.isEmpty();) this.nodeStack.push(e), e = e.right;
            else
                for (e = e.right; !e.isEmpty();) this.nodeStack.push(e), e = e.left;
            return t
        }
        hasNext() {
            return this.nodeStack.length > 0
        }
        peek() {
            if (this.nodeStack.length === 0) return null;
            let e = this.nodeStack[this.nodeStack.length - 1];
            return {
                key: e.key,
                value: e.value
            }
        }
    },
    z = class e {
        constructor(t, n, r, i, a) {
            this.key = t, this.value = n, this.color = r ?? e.RED, this.left = i ?? e.EMPTY, this.right = a ?? e.EMPTY, this.size = this.left.size + 1 + this.right.size
        }
        copy(t, n, r, i, a) {
            return new e(t ?? this.key, n ?? this.value, r ?? this.color, i ?? this.left, a ?? this.right)
        }
        isEmpty() {
            return !1
        }
        inorderTraversal(e) {
            return this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e)
        }
        reverseTraversal(e) {
            return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e)
        }
        min() {
            return this.left.isEmpty() ? this : this.left.min()
        }
        minKey() {
            return this.min().key
        }
        maxKey() {
            return this.right.isEmpty() ? this.key : this.right.maxKey()
        }
        insert(e, t, n) {
            let r = this,
                i = n(e, r.key);
            return r = i < 0 ? r.copy(null, null, null, r.left.insert(e, t, n), null) : i === 0 ? r.copy(null, t, null, null, null) : r.copy(null, null, null, null, r.right.insert(e, t, n)), r.fixUp()
        }
        removeMin() {
            if (this.left.isEmpty()) return e.EMPTY;
            let t = this;
            return t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()), t = t.copy(null, null, null, t.left.removeMin(), null), t.fixUp()
        }
        remove(t, n) {
            let r, i = this;
            if (n(t, i.key) < 0) i.left.isEmpty() || i.left.isRed() || i.left.left.isRed() || (i = i.moveRedLeft()), i = i.copy(null, null, null, i.left.remove(t, n), null);
            else {
                if (i.left.isRed() && (i = i.rotateRight()), i.right.isEmpty() || i.right.isRed() || i.right.left.isRed() || (i = i.moveRedRight()), n(t, i.key) === 0) {
                    if (i.right.isEmpty()) return e.EMPTY;
                    r = i.right.min(), i = i.copy(r.key, r.value, null, null, i.right.removeMin())
                }
                i = i.copy(null, null, null, null, i.right.remove(t, n))
            }
            return i.fixUp()
        }
        isRed() {
            return this.color
        }
        fixUp() {
            let e = this;
            return e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()), e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()), e.left.isRed() && e.right.isRed() && (e = e.colorFlip()), e
        }
        moveRedLeft() {
            let e = this.colorFlip();
            return e.right.left.isRed() && (e = e.copy(null, null, null, null, e.right.rotateRight()), e = e.rotateLeft(), e = e.colorFlip()), e
        }
        moveRedRight() {
            let e = this.colorFlip();
            return e.left.left.isRed() && (e = e.rotateRight(), e = e.colorFlip()), e
        }
        rotateLeft() {
            let t = this.copy(null, null, e.RED, null, this.right.left);
            return this.right.copy(null, null, this.color, t, null)
        }
        rotateRight() {
            let t = this.copy(null, null, e.RED, this.left.right, null);
            return this.left.copy(null, null, this.color, null, t)
        }
        colorFlip() {
            let e = this.left.copy(null, null, !this.left.color, null, null),
                t = this.right.copy(null, null, !this.right.color, null, null);
            return this.copy(null, null, !this.color, e, t)
        }
        checkMaxDepth() {
            return 2 ** this.check() <= this.size + 1
        }
        check() {
            if (this.isRed() && this.left.isRed()) throw A(43730, {
                key: this.key,
                value: this.value
            });
            if (this.right.isRed()) throw A(14113, {
                key: this.key,
                value: this.value
            });
            let e = this.left.check();
            if (e !== this.right.check()) throw A(27949);
            return e + (this.isRed() ? 0 : 1)
        }
    };
z.EMPTY = null, z.RED = !0, z.BLACK = !1, z.EMPTY = new class {
    constructor() {
        this.size = 0
    }
    get key() {
        throw A(57766)
    }
    get value() {
        throw A(16141)
    }
    get color() {
        throw A(16727)
    }
    get left() {
        throw A(29726)
    }
    get right() {
        throw A(36894)
    }
    copy(e, t, n, r, i) {
        return this
    }
    insert(e, t, n) {
        return new z(e, t)
    }
    remove(e, t) {
        return this
    }
    isEmpty() {
        return !0
    }
    inorderTraversal(e) {
        return !1
    }
    reverseTraversal(e) {
        return !1
    }
    minKey() {
        return null
    }
    maxKey() {
        return null
    }
    isRed() {
        return !1
    }
    checkMaxDepth() {
        return !0
    }
    check() {
        return 0
    }
};
var Vt = class e {
        constructor(e) {
            this.comparator = e, this.data = new zt(this.comparator)
        }
        has(e) {
            return this.data.get(e) !== null
        }
        first() {
            return this.data.minKey()
        }
        last() {
            return this.data.maxKey()
        }
        get size() {
            return this.data.size
        }
        indexOf(e) {
            return this.data.indexOf(e)
        }
        forEach(e) {
            this.data.inorderTraversal(((t, n) => (e(t), !1)))
        }
        forEachInRange(e, t) {
            let n = this.data.getIteratorFrom(e[0]);
            for (; n.hasNext();) {
                let r = n.getNext();
                if (this.comparator(r.key, e[1]) >= 0) return;
                t(r.key)
            }
        }
        forEachWhile(e, t) {
            let n;
            for (n = t === void 0 ? this.data.getIterator() : this.data.getIteratorFrom(t); n.hasNext();)
                if (!e(n.getNext().key)) return
        }
        firstAfterOrEqual(e) {
            let t = this.data.getIteratorFrom(e);
            return t.hasNext() ? t.getNext().key : null
        }
        getIterator() {
            return new Ht(this.data.getIterator())
        }
        getIteratorFrom(e) {
            return new Ht(this.data.getIteratorFrom(e))
        }
        add(e) {
            return this.copy(this.data.remove(e).insert(e, !0))
        }
        delete(e) {
            return this.has(e) ? this.copy(this.data.remove(e)) : this
        }
        isEmpty() {
            return this.data.isEmpty()
        }
        unionWith(e) {
            let t = this;
            return t.size < e.size && (t = e, e = this), e.forEach((e => {
                t = t.add(e)
            })), t
        }
        isEqual(t) {
            if (!(t instanceof e) || this.size !== t.size) return !1;
            let n = this.data.getIterator(),
                r = t.data.getIterator();
            for (; n.hasNext();) {
                let e = n.getNext().key,
                    t = r.getNext().key;
                if (this.comparator(e, t) !== 0) return !1
            }
            return !0
        }
        toArray() {
            let e = [];
            return this.forEach((t => {
                e.push(t)
            })), e
        }
        toString() {
            let e = [];
            return this.forEach((t => e.push(t))), `SortedSet(` + e.toString() + `)`
        }
        copy(t) {
            let n = new e(this.comparator);
            return n.data = t, n
        }
    },
    Ht = class {
        constructor(e) {
            this.iter = e
        }
        getNext() {
            return this.iter.getNext().key
        }
        hasNext() {
            return this.iter.hasNext()
        }
    },
    Ut = class e {
        constructor(e) {
            this.fields = e, e.sort(rt.comparator)
        }
        static empty() {
            return new e([])
        }
        unionWith(t) {
            let n = new Vt(rt.comparator);
            for (let e of this.fields) n = n.add(e);
            for (let e of t) n = n.add(e);
            return new e(n.toArray())
        }
        covers(e) {
            for (let t of this.fields)
                if (t.isPrefixOf(e)) return !0;
            return !1
        }
        isEqual(e) {
            return Qe(this.fields, e.fields, ((e, t) => e.isEqual(t)))
        }
    },
    Wt = class extends Error {
        constructor() {
            super(...arguments), this.name = `Base64DecodeError`
        }
    },
    Gt = class e {
        constructor(e) {
            this.binaryString = e
        }
        static fromBase64String(t) {
            return new e(function(e) {
                try {
                    return atob(e)
                } catch (e) {
                    throw typeof DOMException < `u` && e instanceof DOMException ? new Wt(`Invalid base64 string: ` + e) : e
                }
            }(t))
        }
        static fromUint8Array(t) {
            return new e(function(e) {
                let t = ``;
                for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
                return t
            }(t))
        } [Symbol.iterator]() {
            let e = 0;
            return {
                next: () => e < this.binaryString.length ? {
                    value: this.binaryString.charCodeAt(e++),
                    done: !1
                } : {
                    value: void 0,
                    done: !0
                }
            }
        }
        toBase64() {
            return function(e) {
                return btoa(e)
            }(this.binaryString)
        }
        toUint8Array() {
            return function(e) {
                let t = new Uint8Array(e.length);
                for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
                return t
            }(this.binaryString)
        }
        approximateByteSize() {
            return 2 * this.binaryString.length
        }
        compareTo(e) {
            return F(this.binaryString, e.binaryString)
        }
        isEqual(e) {
            return this.binaryString === e.binaryString
        }
    };
Gt.EMPTY_BYTE_STRING = new Gt(``);
var Kt = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

function qt(e) {
    if (j(!!e, 39018), typeof e == `string`) {
        let t = 0,
            n = Kt.exec(e);
        if (j(!!n, 46558, {
                timestamp: e
            }), n[1]) {
            let e = n[1];
            e = (e + `000000000`).substr(0, 9), t = Number(e)
        }
        let r = new Date(e);
        return {
            seconds: Math.floor(r.getTime() / 1e3),
            nanos: t
        }
    }
    return {
        seconds: Jt(e.seconds),
        nanos: Jt(e.nanos)
    }
}

function Jt(e) {
    return typeof e == `number` ? e : typeof e == `string` ? Number(e) : 0
}

function Yt(e) {
    return typeof e == `string` ? Gt.fromBase64String(e) : Gt.fromUint8Array(e)
}
var Xt = `server_timestamp`,
    Zt = `__type__`,
    Qt = `__previous_value__`,
    $t = `__local_write_time__`;

function en(e) {
    return (e?.mapValue?.fields || {})[Zt]?.stringValue === Xt
}

function tn(e) {
    let t = e.mapValue.fields[Qt];
    return en(t) ? tn(t) : t
}

function nn(e) {
    let t = qt(e.mapValue.fields[$t].timestampValue);
    return new ht(t.seconds, t.nanos)
}
var rn = class {
        constructor(e, t, n, r, i, a, o, s, c, l, u) {
            this.databaseId = e, this.appId = t, this.persistenceKey = n, this.host = r, this.ssl = i, this.forceLongPolling = a, this.autoDetectLongPolling = o, this.longPollingOptions = s, this.useFetchStreams = c, this.isUsingEmulator = l, this.apiKey = u
        }
    },
    an = `(default)`,
    on = class e {
        constructor(e, t) {
            this.projectId = e, this.database = t || an
        }
        static empty() {
            return new e(``, ``)
        }
        get isDefaultDatabase() {
            return this.database === an
        }
        isEqual(t) {
            return t instanceof e && t.projectId === this.projectId && t.database === this.database
        }
    };

function sn(e, t) {
    if (!Object.prototype.hasOwnProperty.apply(e.options, [`projectId`])) throw new P(N.INVALID_ARGUMENT, `"projectId" not provided in firebase.initializeApp.`);
    return new on(e.options.projectId, t)
}
var cn = `__type__`,
    ln = `__max__`,
    un = {
        mapValue: {
            fields: {
                __type__: {
                    stringValue: ln
                }
            }
        }
    },
    dn = `__vector__`,
    fn = `value`;

function pn(e) {
    return `nullValue` in e ? 0 : `booleanValue` in e ? 1 : `integerValue` in e || `doubleValue` in e ? 2 : `timestampValue` in e ? 3 : `stringValue` in e ? 5 : `bytesValue` in e ? 6 : `referenceValue` in e ? 7 : `geoPointValue` in e ? 8 : `arrayValue` in e ? 9 : `mapValue` in e ? en(e) ? 4 : kn(e) ? 9007199254740991 : Dn(e) ? 10 : 11 : A(28295, {
        value: e
    })
}

function mn(e, t) {
    if (e === t) return !0;
    let n = pn(e);
    if (n !== pn(t)) return !1;
    switch (n) {
        case 0:
        case 9007199254740991:
            return !0;
        case 1:
            return e.booleanValue === t.booleanValue;
        case 4:
            return nn(e).isEqual(nn(t));
        case 3:
            return function(e, t) {
                if (typeof e.timestampValue == `string` && typeof t.timestampValue == `string` && e.timestampValue.length === t.timestampValue.length) return e.timestampValue === t.timestampValue;
                let n = qt(e.timestampValue),
                    r = qt(t.timestampValue);
                return n.seconds === r.seconds && n.nanos === r.nanos
            }(e, t);
        case 5:
            return e.stringValue === t.stringValue;
        case 6:
            return function(e, t) {
                return Yt(e.bytesValue).isEqual(Yt(t.bytesValue))
            }(e, t);
        case 7:
            return e.referenceValue === t.referenceValue;
        case 8:
            return function(e, t) {
                return Jt(e.geoPointValue.latitude) === Jt(t.geoPointValue.latitude) && Jt(e.geoPointValue.longitude) === Jt(t.geoPointValue.longitude)
            }(e, t);
        case 2:
            return function(e, t) {
                if (`integerValue` in e && `integerValue` in t) return Jt(e.integerValue) === Jt(t.integerValue);
                if (`doubleValue` in e && `doubleValue` in t) {
                    let n = Jt(e.doubleValue),
                        r = Jt(t.doubleValue);
                    return n === r ? At(n) === At(r) : isNaN(n) && isNaN(r)
                }
                return !1
            }(e, t);
        case 9:
            return Qe(e.arrayValue.values || [], t.arrayValue.values || [], mn);
        case 10:
        case 11:
            return function(e, t) {
                let n = e.mapValue.fields || {},
                    r = t.mapValue.fields || {};
                if (It(n) !== It(r)) return !1;
                for (let e in n)
                    if (n.hasOwnProperty(e) && (r[e] === void 0 || !mn(n[e], r[e]))) return !1;
                return !0
            }(e, t);
        default:
            return A(52216, {
                left: e
            })
    }
}

function hn(e, t) {
    return (e.values || []).find((e => mn(e, t))) !== void 0
}

function gn(e, t) {
    if (e === t) return 0;
    let n = pn(e),
        r = pn(t);
    if (n !== r) return F(n, r);
    switch (n) {
        case 0:
        case 9007199254740991:
            return 0;
        case 1:
            return F(e.booleanValue, t.booleanValue);
        case 2:
            return function(e, t) {
                let n = Jt(e.integerValue || e.doubleValue),
                    r = Jt(t.integerValue || t.doubleValue);
                return n < r ? -1 : n > r ? 1 : n === r ? 0 : isNaN(n) ? isNaN(r) ? 0 : -1 : 1
            }(e, t);
        case 3:
            return _n(e.timestampValue, t.timestampValue);
        case 4:
            return _n(nn(e), nn(t));
        case 5:
            return Je(e.stringValue, t.stringValue);
        case 6:
            return function(e, t) {
                let n = Yt(e),
                    r = Yt(t);
                return n.compareTo(r)
            }(e.bytesValue, t.bytesValue);
        case 7:
            return function(e, t) {
                let n = e.split(`/`),
                    r = t.split(`/`);
                for (let e = 0; e < n.length && e < r.length; e++) {
                    let t = F(n[e], r[e]);
                    if (t !== 0) return t
                }
                return F(n.length, r.length)
            }(e.referenceValue, t.referenceValue);
        case 8:
            return function(e, t) {
                let n = F(Jt(e.latitude), Jt(t.latitude));
                return n === 0 ? F(Jt(e.longitude), Jt(t.longitude)) : n
            }(e.geoPointValue, t.geoPointValue);
        case 9:
            return vn(e.arrayValue, t.arrayValue);
        case 10:
            return function(e, t) {
                let n = e.fields || {},
                    r = t.fields || {},
                    i = n[fn]?.arrayValue,
                    a = r[fn]?.arrayValue,
                    o = F(i?.values?.length || 0, a?.values?.length || 0);
                return o === 0 ? vn(i, a) : o
            }(e.mapValue, t.mapValue);
        case 11:
            return function(e, t) {
                if (e === un.mapValue && t === un.mapValue) return 0;
                if (e === un.mapValue) return 1;
                if (t === un.mapValue) return -1;
                let n = e.fields || {},
                    r = Object.keys(n),
                    i = t.fields || {},
                    a = Object.keys(i);
                r.sort(), a.sort();
                for (let e = 0; e < r.length && e < a.length; ++e) {
                    let t = Je(r[e], a[e]);
                    if (t !== 0) return t;
                    let o = gn(n[r[e]], i[a[e]]);
                    if (o !== 0) return o
                }
                return F(r.length, a.length)
            }(e.mapValue, t.mapValue);
        default:
            throw A(23264, {
                he: n
            })
    }
}

function _n(e, t) {
    if (typeof e == `string` && typeof t == `string` && e.length === t.length) return F(e, t);
    let n = qt(e),
        r = qt(t),
        i = F(n.seconds, r.seconds);
    return i === 0 ? F(n.nanos, r.nanos) : i
}

function vn(e, t) {
    let n = e.values || [],
        r = t.values || [];
    for (let e = 0; e < n.length && e < r.length; ++e) {
        let t = gn(n[e], r[e]);
        if (t) return t
    }
    return F(n.length, r.length)
}

function yn(e) {
    return bn(e)
}

function bn(e) {
    return `nullValue` in e ? `null` : `booleanValue` in e ? `` + e.booleanValue : `integerValue` in e ? `` + e.integerValue : `doubleValue` in e ? `` + e.doubleValue : `timestampValue` in e ? function(e) {
        let t = qt(e);
        return `time(${t.seconds},${t.nanos})`
    }(e.timestampValue) : `stringValue` in e ? e.stringValue : `bytesValue` in e ? function(e) {
        return Yt(e).toBase64()
    }(e.bytesValue) : `referenceValue` in e ? function(e) {
        return I.fromName(e).toString()
    }(e.referenceValue) : `geoPointValue` in e ? function(e) {
        return `geo(${e.latitude},${e.longitude})`
    }(e.geoPointValue) : `arrayValue` in e ? function(e) {
        let t = `[`,
            n = !0;
        for (let r of e.values || []) n ? n = !1 : t += `,`, t += bn(r);
        return t + `]`
    }(e.arrayValue) : `mapValue` in e ? function(e) {
        let t = Object.keys(e.fields || {}).sort(),
            n = `{`,
            r = !0;
        for (let i of t) r ? r = !1 : n += `,`, n += `${i}:${bn(e.fields[i])}`;
        return n + `}`
    }(e.mapValue) : A(61005, {
        value: e
    })
}

function xn(e) {
    switch (pn(e)) {
        case 0:
        case 1:
            return 4;
        case 2:
            return 8;
        case 3:
        case 8:
            return 16;
        case 4:
            let t = tn(e);
            return t ? 16 + xn(t) : 16;
        case 5:
            return 2 * e.stringValue.length;
        case 6:
            return Yt(e.bytesValue).approximateByteSize();
        case 7:
            return e.referenceValue.length;
        case 9:
            return function(e) {
                return (e.values || []).reduce(((e, t) => e + xn(t)), 0)
            }(e.arrayValue);
        case 10:
        case 11:
            return function(e) {
                let t = 0;
                return Lt(e.fields, ((e, n) => {
                    t += e.length + xn(n)
                })), t
            }(e.mapValue);
        default:
            throw A(13486, {
                value: e
            })
    }
}

function Sn(e) {
    return !!e && `integerValue` in e
}

function Cn(e) {
    return !!e && `arrayValue` in e
}

function wn(e) {
    return !!e && `nullValue` in e
}

function Tn(e) {
    return !!e && `doubleValue` in e && isNaN(Number(e.doubleValue))
}

function En(e) {
    return !!e && `mapValue` in e
}

function Dn(e) {
    return (e?.mapValue?.fields || {})[cn]?.stringValue === dn
}

function On(e) {
    if (e.geoPointValue) return {
        geoPointValue: {
            ...e.geoPointValue
        }
    };
    if (e.timestampValue && typeof e.timestampValue == `object`) return {
        timestampValue: {
            ...e.timestampValue
        }
    };
    if (e.mapValue) {
        let t = {
            mapValue: {
                fields: {}
            }
        };
        return Lt(e.mapValue.fields, ((e, n) => t.mapValue.fields[e] = On(n))), t
    }
    if (e.arrayValue) {
        let t = {
            arrayValue: {
                values: []
            }
        };
        for (let n = 0; n < (e.arrayValue.values || []).length; ++n) t.arrayValue.values[n] = On(e.arrayValue.values[n]);
        return t
    }
    return {
        ...e
    }
}

function kn(e) {
    return (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue === ln
}
var An = class e {
    constructor(e) {
        this.value = e
    }
    static empty() {
        return new e({
            mapValue: {}
        })
    }
    field(e) {
        if (e.isEmpty()) return this.value;
        {
            let t = this.value;
            for (let n = 0; n < e.length - 1; ++n)
                if (t = (t.mapValue.fields || {})[e.get(n)], !En(t)) return null;
            return t = (t.mapValue.fields || {})[e.lastSegment()], t || null
        }
    }
    set(e, t) {
        this.getFieldsMap(e.popLast())[e.lastSegment()] = On(t)
    }
    setAll(e) {
        let t = rt.emptyPath(),
            n = {},
            r = [];
        e.forEach(((e, i) => {
            if (!t.isImmediateParentOf(i)) {
                let e = this.getFieldsMap(t);
                this.applyChanges(e, n, r), n = {}, r = [], t = i.popLast()
            }
            e ? n[i.lastSegment()] = On(e) : r.push(i.lastSegment())
        }));
        let i = this.getFieldsMap(t);
        this.applyChanges(i, n, r)
    }
    delete(e) {
        let t = this.field(e.popLast());
        En(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()]
    }
    isEqual(e) {
        return mn(this.value, e.value)
    }
    getFieldsMap(e) {
        let t = this.value;
        t.mapValue.fields || (t.mapValue = {
            fields: {}
        });
        for (let n = 0; n < e.length; ++n) {
            let r = t.mapValue.fields[e.get(n)];
            En(r) && r.mapValue.fields || (r = {
                mapValue: {
                    fields: {}
                }
            }, t.mapValue.fields[e.get(n)] = r), t = r
        }
        return t.mapValue.fields
    }
    applyChanges(e, t, n) {
        Lt(t, ((t, n) => e[t] = n));
        for (let t of n) delete e[t]
    }
    clone() {
        return new e(On(this.value))
    }
};

function jn(e) {
    let t = [];
    return Lt(e.fields, ((e, n) => {
        let r = new rt([e]);
        if (En(n)) {
            let e = jn(n.mapValue).fields;
            if (e.length === 0) t.push(r);
            else
                for (let n of e) t.push(r.child(n))
        } else t.push(r)
    })), new Ut(t)
}
var Mn = class e {
        constructor(e, t, n, r, i, a, o) {
            this.key = e, this.documentType = t, this.version = n, this.readTime = r, this.createTime = i, this.data = a, this.documentState = o
        }
        static newInvalidDocument(t) {
            return new e(t, 0, L.min(), L.min(), L.min(), An.empty(), 0)
        }
        static newFoundDocument(t, n, r, i) {
            return new e(t, 1, n, L.min(), r, i, 0)
        }
        static newNoDocument(t, n) {
            return new e(t, 2, n, L.min(), L.min(), An.empty(), 0)
        }
        static newUnknownDocument(t, n) {
            return new e(t, 3, n, L.min(), L.min(), An.empty(), 2)
        }
        convertToFoundDocument(e, t) {
            return !this.createTime.isEqual(L.min()) || this.documentType !== 2 && this.documentType !== 0 || (this.createTime = e), this.version = e, this.documentType = 1, this.data = t, this.documentState = 0, this
        }
        convertToNoDocument(e) {
            return this.version = e, this.documentType = 2, this.data = An.empty(), this.documentState = 0, this
        }
        convertToUnknownDocument(e) {
            return this.version = e, this.documentType = 3, this.data = An.empty(), this.documentState = 2, this
        }
        setHasCommittedMutations() {
            return this.documentState = 2, this
        }
        setHasLocalMutations() {
            return this.documentState = 1, this.version = L.min(), this
        }
        setReadTime(e) {
            return this.readTime = e, this
        }
        get hasLocalMutations() {
            return this.documentState === 1
        }
        get hasCommittedMutations() {
            return this.documentState === 2
        }
        get hasPendingWrites() {
            return this.hasLocalMutations || this.hasCommittedMutations
        }
        isValidDocument() {
            return this.documentType !== 0
        }
        isFoundDocument() {
            return this.documentType === 1
        }
        isNoDocument() {
            return this.documentType === 2
        }
        isUnknownDocument() {
            return this.documentType === 3
        }
        isEqual(t) {
            return t instanceof e && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.documentType === t.documentType && this.documentState === t.documentState && this.data.isEqual(t.data)
        }
        mutableCopy() {
            return new e(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState)
        }
        toString() {
            return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`
        }
    },
    Nn = class {
        constructor(e, t) {
            this.position = e, this.inclusive = t
        }
    };

function Pn(e, t, n) {
    let r = 0;
    for (let i = 0; i < e.position.length; i++) {
        let a = t[i],
            o = e.position[i];
        if (r = a.field.isKeyField() ? I.comparator(I.fromName(o.referenceValue), n.key) : gn(o, n.data.field(a.field)), a.dir === `desc` && (r *= -1), r !== 0) break
    }
    return r
}

function Fn(e, t) {
    if (e === null) return t === null;
    if (t === null || e.inclusive !== t.inclusive || e.position.length !== t.position.length) return !1;
    for (let n = 0; n < e.position.length; n++)
        if (!mn(e.position[n], t.position[n])) return !1;
    return !0
}
var In = class {
    constructor(e, t = `asc`) {
        this.field = e, this.dir = t
    }
};

function Ln(e, t) {
    return e.dir === t.dir && e.field.isEqual(t.field)
}
var Rn = class {},
    zn = class e extends Rn {
        constructor(e, t, n) {
            super(), this.field = e, this.op = t, this.value = n
        }
        static create(t, n, r) {
            return t.isKeyField() ? n === `in` || n === `not-in` ? this.createKeyFieldInFilter(t, n, r) : new qn(t, n, r) : n === `array-contains` ? new Zn(t, r) : n === `in` ? new Qn(t, r) : n === `not-in` ? new $n(t, r) : n === `array-contains-any` ? new er(t, r) : new e(t, n, r)
        }
        static createKeyFieldInFilter(e, t, n) {
            return t === `in` ? new Jn(e, n) : new Yn(e, n)
        }
        matches(e) {
            let t = e.data.field(this.field);
            return this.op === `!=` ? t !== null && t.nullValue === void 0 && this.matchesComparison(gn(t, this.value)) : t !== null && pn(this.value) === pn(t) && this.matchesComparison(gn(t, this.value))
        }
        matchesComparison(e) {
            switch (this.op) {
                case `<`:
                    return e < 0;
                case `<=`:
                    return e <= 0;
                case `==`:
                    return e === 0;
                case `!=`:
                    return e !== 0;
                case `>`:
                    return e > 0;
                case `>=`:
                    return e >= 0;
                default:
                    return A(47266, {
                        operator: this.op
                    })
            }
        }
        isInequality() {
            return [`<`, `<=`, `>`, `>=`, `!=`, `not-in`].indexOf(this.op) >= 0
        }
        getFlattenedFilters() {
            return [this]
        }
        getFilters() {
            return [this]
        }
    },
    Bn = class e extends Rn {
        constructor(e, t) {
            super(), this.filters = e, this.op = t, this.Pe = null
        }
        static create(t, n) {
            return new e(t, n)
        }
        matches(e) {
            return Vn(this) ? this.filters.find((t => !t.matches(e))) === void 0 : this.filters.find((t => t.matches(e))) !== void 0
        }
        getFlattenedFilters() {
            return this.Pe !== null || (this.Pe = this.filters.reduce(((e, t) => e.concat(t.getFlattenedFilters())), [])), this.Pe
        }
        getFilters() {
            return Object.assign([], this.filters)
        }
    };

function Vn(e) {
    return e.op === `and`
}

function Hn(e) {
    return Un(e) && Vn(e)
}

function Un(e) {
    for (let t of e.filters)
        if (t instanceof Bn) return !1;
    return !0
}

function Wn(e) {
    if (e instanceof zn) return e.field.canonicalString() + e.op.toString() + yn(e.value);
    if (Hn(e)) return e.filters.map((e => Wn(e))).join(`,`);
    {
        let t = e.filters.map((e => Wn(e))).join(`,`);
        return `${e.op}(${t})`
    }
}

function Gn(e, t) {
    return e instanceof zn ? function(e, t) {
        return t instanceof zn && e.op === t.op && e.field.isEqual(t.field) && mn(e.value, t.value)
    }(e, t) : e instanceof Bn ? function(e, t) {
        return t instanceof Bn && e.op === t.op && e.filters.length === t.filters.length ? e.filters.reduce(((e, n, r) => e && Gn(n, t.filters[r])), !0) : !1
    }(e, t) : void A(19439)
}

function Kn(e) {
    return e instanceof zn ? function(e) {
        return `${e.field.canonicalString()} ${e.op} ${yn(e.value)}`
    }(e) : e instanceof Bn ? function(e) {
        return e.op.toString() + ` {` + e.getFilters().map(Kn).join(` ,`) + `}`
    }(e) : `Filter`
}
var qn = class extends zn {
        constructor(e, t, n) {
            super(e, t, n), this.key = I.fromName(n.referenceValue)
        }
        matches(e) {
            let t = I.comparator(e.key, this.key);
            return this.matchesComparison(t)
        }
    },
    Jn = class extends zn {
        constructor(e, t) {
            super(e, `in`, t), this.keys = Xn(`in`, t)
        }
        matches(e) {
            return this.keys.some((t => t.isEqual(e.key)))
        }
    },
    Yn = class extends zn {
        constructor(e, t) {
            super(e, `not-in`, t), this.keys = Xn(`not-in`, t)
        }
        matches(e) {
            return !this.keys.some((t => t.isEqual(e.key)))
        }
    };

function Xn(e, t) {
    return (t.arrayValue?.values || []).map((e => I.fromName(e.referenceValue)))
}
var Zn = class extends zn {
        constructor(e, t) {
            super(e, `array-contains`, t)
        }
        matches(e) {
            let t = e.data.field(this.field);
            return Cn(t) && hn(t.arrayValue, this.value)
        }
    },
    Qn = class extends zn {
        constructor(e, t) {
            super(e, `in`, t)
        }
        matches(e) {
            let t = e.data.field(this.field);
            return t !== null && hn(this.value.arrayValue, t)
        }
    },
    $n = class extends zn {
        constructor(e, t) {
            super(e, `not-in`, t)
        }
        matches(e) {
            if (hn(this.value.arrayValue, {
                    nullValue: `NULL_VALUE`
                })) return !1;
            let t = e.data.field(this.field);
            return t !== null && t.nullValue === void 0 && !hn(this.value.arrayValue, t)
        }
    },
    er = class extends zn {
        constructor(e, t) {
            super(e, `array-contains-any`, t)
        }
        matches(e) {
            let t = e.data.field(this.field);
            return !(!Cn(t) || !t.arrayValue.values) && t.arrayValue.values.some((e => hn(this.value.arrayValue, e)))
        }
    },
    tr = class {
        constructor(e, t = null, n = [], r = [], i = null, a = null, o = null) {
            this.path = e, this.collectionGroup = t, this.orderBy = n, this.filters = r, this.limit = i, this.startAt = a, this.endAt = o, this.Te = null
        }
    };

function nr(e, t = null, n = [], r = [], i = null, a = null, o = null) {
    return new tr(e, t, n, r, i, a, o)
}

function rr(e) {
    let t = M(e);
    if (t.Te === null) {
        let e = t.path.canonicalString();
        t.collectionGroup !== null && (e += `|cg:` + t.collectionGroup), e += `|f:`, e += t.filters.map((e => Wn(e))).join(`,`), e += `|ob:`, e += t.orderBy.map((e => function(e) {
            return e.field.canonicalString() + e.dir
        }(e))).join(`,`), kt(t.limit) || (e += `|l:`, e += t.limit), t.startAt && (e += `|lb:`, e += t.startAt.inclusive ? `b:` : `a:`, e += t.startAt.position.map((e => yn(e))).join(`,`)), t.endAt && (e += `|ub:`, e += t.endAt.inclusive ? `a:` : `b:`, e += t.endAt.position.map((e => yn(e))).join(`,`)), t.Te = e
    }
    return t.Te
}

function ir(e, t) {
    if (e.limit !== t.limit || e.orderBy.length !== t.orderBy.length) return !1;
    for (let n = 0; n < e.orderBy.length; n++)
        if (!Ln(e.orderBy[n], t.orderBy[n])) return !1;
    if (e.filters.length !== t.filters.length) return !1;
    for (let n = 0; n < e.filters.length; n++)
        if (!Gn(e.filters[n], t.filters[n])) return !1;
    return e.collectionGroup === t.collectionGroup && !!e.path.isEqual(t.path) && !!Fn(e.startAt, t.startAt) && Fn(e.endAt, t.endAt)
}

function ar(e) {
    return I.isDocumentKey(e.path) && e.collectionGroup === null && e.filters.length === 0
}
var or = class {
    constructor(e, t = null, n = [], r = [], i = null, a = `F`, o = null, s = null) {
        this.path = e, this.collectionGroup = t, this.explicitOrderBy = n, this.filters = r, this.limit = i, this.limitType = a, this.startAt = o, this.endAt = s, this.Ee = null, this.Ie = null, this.Re = null, this.startAt, this.endAt
    }
};

function sr(e, t, n, r, i, a, o, s) {
    return new or(e, t, n, r, i, a, o, s)
}

function cr(e) {
    return new or(e)
}

function lr(e) {
    return e.filters.length === 0 && e.limit === null && e.startAt == null && e.endAt == null && (e.explicitOrderBy.length === 0 || e.explicitOrderBy.length === 1 && e.explicitOrderBy[0].field.isKeyField())
}

function ur(e) {
    return I.isDocumentKey(e.path) && e.collectionGroup === null && e.filters.length === 0
}

function dr(e) {
    return e.collectionGroup !== null
}

function fr(e) {
    let t = M(e);
    if (t.Ee === null) {
        t.Ee = [];
        let e = new Set;
        for (let n of t.explicitOrderBy) t.Ee.push(n), e.add(n.field.canonicalString());
        let n = t.explicitOrderBy.length > 0 ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir : `asc`;
        (function(e) {
            let t = new Vt(rt.comparator);
            return e.filters.forEach((e => {
                e.getFlattenedFilters().forEach((e => {
                    e.isInequality() && (t = t.add(e.field))
                }))
            })), t
        })(t).forEach((r => {
            e.has(r.canonicalString()) || r.isKeyField() || t.Ee.push(new In(r, n))
        })), e.has(rt.keyField().canonicalString()) || t.Ee.push(new In(rt.keyField(), n))
    }
    return t.Ee
}

function pr(e) {
    let t = M(e);
    return t.Ie ||= mr(t, fr(e)), t.Ie
}

function mr(e, t) {
    if (e.limitType === `F`) return nr(e.path, e.collectionGroup, t, e.filters, e.limit, e.startAt, e.endAt);
    {
        t = t.map((e => {
            let t = e.dir === `desc` ? `asc` : `desc`;
            return new In(e.field, t)
        }));
        let n = e.endAt ? new Nn(e.endAt.position, e.endAt.inclusive) : null,
            r = e.startAt ? new Nn(e.startAt.position, e.startAt.inclusive) : null;
        return nr(e.path, e.collectionGroup, t, e.filters, e.limit, n, r)
    }
}

function hr(e, t, n) {
    return new or(e.path, e.collectionGroup, e.explicitOrderBy.slice(), e.filters.slice(), t, n, e.startAt, e.endAt)
}

function gr(e, t) {
    return ir(pr(e), pr(t)) && e.limitType === t.limitType
}

function _r(e) {
    return `${rr(pr(e))}|lt:${e.limitType}`
}

function vr(e) {
    return `Query(target=${function(e){let t=e.path.canonicalString();return e.collectionGroup!==null&&(t+=` collectionGroup=`+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map((e=>Kn(e))).join(`, `)}]`),kt(e.limit)||(t+=`, limit: `+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map((e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e))).join(`, `)}]`),e.startAt&&(t+=`, startAt: `,t+=e.startAt.inclusive?`b:`:`a:`,t+=e.startAt.position.map((e=>yn(e))).join(`,`)),e.endAt&&(t+=`, endAt: `,t+=e.endAt.inclusive?`a:`:`b:`,t+=e.endAt.position.map((e=>yn(e))).join(`,`)),`Target(${t})`}(pr(e))}; limitType=${e.limitType})`
}

function yr(e, t) {
    return t.isFoundDocument() && function(e, t) {
        let n = t.key.path;
        return e.collectionGroup === null ? I.isDocumentKey(e.path) ? e.path.isEqual(n) : e.path.isImmediateParentOf(n) : t.key.hasCollectionId(e.collectionGroup) && e.path.isPrefixOf(n)
    }(e, t) && function(e, t) {
        for (let n of fr(e))
            if (!n.field.isKeyField() && t.data.field(n.field) === null) return !1;
        return !0
    }(e, t) && function(e, t) {
        for (let n of e.filters)
            if (!n.matches(t)) return !1;
        return !0
    }(e, t) && function(e, t) {
        return !(e.startAt && ! function(e, t, n) {
            let r = Pn(e, t, n);
            return e.inclusive ? r <= 0 : r < 0
        }(e.startAt, fr(e), t) || e.endAt && ! function(e, t, n) {
            let r = Pn(e, t, n);
            return e.inclusive ? r >= 0 : r > 0
        }(e.endAt, fr(e), t))
    }(e, t)
}

function br(e) {
    return e.collectionGroup || (e.path.length % 2 == 1 ? e.path.lastSegment() : e.path.get(e.path.length - 2))
}

function xr(e) {
    return (t, n) => {
        let r = !1;
        for (let i of fr(e)) {
            let e = Sr(i, t, n);
            if (e !== 0) return e;
            r ||= i.field.isKeyField()
        }
        return 0
    }
}

function Sr(e, t, n) {
    let r = e.field.isKeyField() ? I.comparator(t.key, n.key) : function(e, t, n) {
        let r = t.data.field(e),
            i = n.data.field(e);
        return r !== null && i !== null ? gn(r, i) : A(42886)
    }(e.field, t, n);
    switch (e.dir) {
        case `asc`:
            return r;
        case `desc`:
            return -1 * r;
        default:
            return A(19790, {
                direction: e.dir
            })
    }
}
var Cr = class {
        constructor(e, t) {
            this.mapKeyFn = e, this.equalsFn = t, this.inner = {}, this.innerSize = 0
        }
        get(e) {
            let t = this.mapKeyFn(e),
                n = this.inner[t];
            if (n !== void 0) {
                for (let [t, r] of n)
                    if (this.equalsFn(t, e)) return r
            }
        }
        has(e) {
            return this.get(e) !== void 0
        }
        set(e, t) {
            let n = this.mapKeyFn(e),
                r = this.inner[n];
            if (r === void 0) return this.inner[n] = [
                [e, t]
            ], void this.innerSize++;
            for (let n = 0; n < r.length; n++)
                if (this.equalsFn(r[n][0], e)) return void(r[n] = [e, t]);
            r.push([e, t]), this.innerSize++
        }
        delete(e) {
            let t = this.mapKeyFn(e),
                n = this.inner[t];
            if (n === void 0) return !1;
            for (let r = 0; r < n.length; r++)
                if (this.equalsFn(n[r][0], e)) return n.length === 1 ? delete this.inner[t] : n.splice(r, 1), this.innerSize--, !0;
            return !1
        }
        forEach(e) {
            Lt(this.inner, ((t, n) => {
                for (let [t, r] of n) e(t, r)
            }))
        }
        isEmpty() {
            return Rt(this.inner)
        }
        size() {
            return this.innerSize
        }
    },
    wr = new zt(I.comparator);

function Tr() {
    return wr
}
var Er = new zt(I.comparator);

function Dr(...e) {
    let t = Er;
    for (let n of e) t = t.insert(n.key, n);
    return t
}

function Or(e) {
    let t = Er;
    return e.forEach(((e, n) => t = t.insert(e, n.overlayedDocument))), t
}

function kr() {
    return jr()
}

function Ar() {
    return jr()
}

function jr() {
    return new Cr((e => e.toString()), ((e, t) => e.isEqual(t)))
}
var Mr = new zt(I.comparator),
    Nr = new Vt(I.comparator);

function B(...e) {
    let t = Nr;
    for (let n of e) t = t.add(n);
    return t
}
var Pr = new Vt(F);

function Fr() {
    return Pr
}

function Ir(e, t) {
    if (e.useProto3Json) {
        if (isNaN(t)) return {
            doubleValue: `NaN`
        };
        if (t === 1 / 0) return {
            doubleValue: `Infinity`
        };
        if (t === -1 / 0) return {
            doubleValue: `-Infinity`
        }
    }
    return {
        doubleValue: At(t) ? `-0` : t
    }
}

function Lr(e) {
    return {
        integerValue: `` + e
    }
}

function Rr(e, t) {
    return jt(t) ? Lr(t) : Ir(e, t)
}
var zr = class {
    constructor() {
        this._ = void 0
    }
};

function Br(e, t, n) {
    return e instanceof Ur ? function(e, t) {
        let n = {
            fields: {
                [Zt]: {
                    stringValue: Xt
                },
                [$t]: {
                    timestampValue: {
                        seconds: e.seconds,
                        nanos: e.nanoseconds
                    }
                }
            }
        };
        return t && en(t) && (t = tn(t)), t && (n.fields[Qt] = t), {
            mapValue: n
        }
    }(n, t) : e instanceof Wr ? Gr(e, t) : e instanceof Kr ? qr(e, t) : function(e, t) {
        let n = Hr(e, t),
            r = Yr(n) + Yr(e.Ae);
        return Sn(n) && Sn(e.Ae) ? Lr(r) : Ir(e.serializer, r)
    }(e, t)
}

function Vr(e, t, n) {
    return e instanceof Wr ? Gr(e, t) : e instanceof Kr ? qr(e, t) : n
}

function Hr(e, t) {
    return e instanceof Jr ? function(e) {
        return Sn(e) || function(e) {
            return !!e && `doubleValue` in e
        }(e)
    }(t) ? t : {
        integerValue: 0
    } : null
}
var Ur = class extends zr {},
    Wr = class extends zr {
        constructor(e) {
            super(), this.elements = e
        }
    };

function Gr(e, t) {
    let n = Xr(t);
    for (let t of e.elements) n.some((e => mn(e, t))) || n.push(t);
    return {
        arrayValue: {
            values: n
        }
    }
}
var Kr = class extends zr {
    constructor(e) {
        super(), this.elements = e
    }
};

function qr(e, t) {
    let n = Xr(t);
    for (let t of e.elements) n = n.filter((e => !mn(e, t)));
    return {
        arrayValue: {
            values: n
        }
    }
}
var Jr = class extends zr {
    constructor(e, t) {
        super(), this.serializer = e, this.Ae = t
    }
};

function Yr(e) {
    return Jt(e.integerValue || e.doubleValue)
}

function Xr(e) {
    return Cn(e) && e.arrayValue.values ? e.arrayValue.values.slice() : []
}

function Zr(e, t) {
    return e.field.isEqual(t.field) && function(e, t) {
        return e instanceof Wr && t instanceof Wr || e instanceof Kr && t instanceof Kr ? Qe(e.elements, t.elements, mn) : e instanceof Jr && t instanceof Jr ? mn(e.Ae, t.Ae) : e instanceof Ur && t instanceof Ur
    }(e.transform, t.transform)
}
var Qr = class {
        constructor(e, t) {
            this.version = e, this.transformResults = t
        }
    },
    $r = class e {
        constructor(e, t) {
            this.updateTime = e, this.exists = t
        }
        static none() {
            return new e
        }
        static exists(t) {
            return new e(void 0, t)
        }
        static updateTime(t) {
            return new e(t)
        }
        get isNone() {
            return this.updateTime === void 0 && this.exists === void 0
        }
        isEqual(e) {
            return this.exists === e.exists && (this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime)
        }
    };

function ei(e, t) {
    return e.updateTime === void 0 ? e.exists === void 0 || e.exists === t.isFoundDocument() : t.isFoundDocument() && t.version.isEqual(e.updateTime)
}
var ti = class {};

function ni(e, t) {
    if (!e.hasLocalMutations || t && t.fields.length === 0) return null;
    if (t === null) return e.isNoDocument() ? new fi(e.key, $r.none()) : new si(e.key, e.data, $r.none());
    {
        let n = e.data,
            r = An.empty(),
            i = new Vt(rt.comparator);
        for (let e of t.fields)
            if (!i.has(e)) {
                let t = n.field(e);
                t === null && e.length > 1 && (e = e.popLast(), t = n.field(e)), t === null ? r.delete(e) : r.set(e, t), i = i.add(e)
            } return new ci(e.key, r, new Ut(i.toArray()), $r.none())
    }
}

function ri(e, t, n) {
    e instanceof si ? function(e, t, n) {
        let r = e.value.clone(),
            i = ui(e.fieldTransforms, t, n.transformResults);
        r.setAll(i), t.convertToFoundDocument(n.version, r).setHasCommittedMutations()
    }(e, t, n) : e instanceof ci ? function(e, t, n) {
        if (!ei(e.precondition, t)) return void t.convertToUnknownDocument(n.version);
        let r = ui(e.fieldTransforms, t, n.transformResults),
            i = t.data;
        i.setAll(li(e)), i.setAll(r), t.convertToFoundDocument(n.version, i).setHasCommittedMutations()
    }(e, t, n) : function(e, t, n) {
        t.convertToNoDocument(n.version).setHasCommittedMutations()
    }(0, t, n)
}

function ii(e, t, n, r) {
    return e instanceof si ? function(e, t, n, r) {
        if (!ei(e.precondition, t)) return n;
        let i = e.value.clone(),
            a = di(e.fieldTransforms, r, t);
        return i.setAll(a), t.convertToFoundDocument(t.version, i).setHasLocalMutations(), null
    }(e, t, n, r) : e instanceof ci ? function(e, t, n, r) {
        if (!ei(e.precondition, t)) return n;
        let i = di(e.fieldTransforms, r, t),
            a = t.data;
        return a.setAll(li(e)), a.setAll(i), t.convertToFoundDocument(t.version, a).setHasLocalMutations(), n === null ? null : n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map((e => e.field)))
    }(e, t, n, r) : function(e, t, n) {
        return ei(e.precondition, t) ? (t.convertToNoDocument(t.version).setHasLocalMutations(), null) : n
    }(e, t, n)
}

function ai(e, t) {
    let n = null;
    for (let r of e.fieldTransforms) {
        let e = t.data.field(r.field),
            i = Hr(r.transform, e || null);
        i != null && (n === null && (n = An.empty()), n.set(r.field, i))
    }
    return n || null
}

function oi(e, t) {
    return e.type === t.type && !!e.key.isEqual(t.key) && !!e.precondition.isEqual(t.precondition) && !! function(e, t) {
        return e === void 0 && t === void 0 || !(!e || !t) && Qe(e, t, ((e, t) => Zr(e, t)))
    }(e.fieldTransforms, t.fieldTransforms) && (e.type === 0 ? e.value.isEqual(t.value) : e.type !== 1 || e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask))
}
var si = class extends ti {
        constructor(e, t, n, r = []) {
            super(), this.key = e, this.value = t, this.precondition = n, this.fieldTransforms = r, this.type = 0
        }
        getFieldMask() {
            return null
        }
    },
    ci = class extends ti {
        constructor(e, t, n, r, i = []) {
            super(), this.key = e, this.data = t, this.fieldMask = n, this.precondition = r, this.fieldTransforms = i, this.type = 1
        }
        getFieldMask() {
            return this.fieldMask
        }
    };

function li(e) {
    let t = new Map;
    return e.fieldMask.fields.forEach((n => {
        if (!n.isEmpty()) {
            let r = e.data.field(n);
            t.set(n, r)
        }
    })), t
}

function ui(e, t, n) {
    let r = new Map;
    j(e.length === n.length, 32656, {
        Ve: n.length,
        de: e.length
    });
    for (let i = 0; i < n.length; i++) {
        let a = e[i],
            o = a.transform,
            s = t.data.field(a.field);
        r.set(a.field, Vr(o, s, n[i]))
    }
    return r
}

function di(e, t, n) {
    let r = new Map;
    for (let i of e) {
        let e = i.transform,
            a = n.data.field(i.field);
        r.set(i.field, Br(e, a, t))
    }
    return r
}
var fi = class extends ti {
        constructor(e, t) {
            super(), this.key = e, this.precondition = t, this.type = 2, this.fieldTransforms = []
        }
        getFieldMask() {
            return null
        }
    },
    pi = class extends ti {
        constructor(e, t) {
            super(), this.key = e, this.precondition = t, this.type = 3, this.fieldTransforms = []
        }
        getFieldMask() {
            return null
        }
    },
    mi = class {
        constructor(e, t, n, r) {
            this.batchId = e, this.localWriteTime = t, this.baseMutations = n, this.mutations = r
        }
        applyToRemoteDocument(e, t) {
            let n = t.mutationResults;
            for (let t = 0; t < this.mutations.length; t++) {
                let r = this.mutations[t];
                r.key.isEqual(e.key) && ri(r, e, n[t])
            }
        }
        applyToLocalView(e, t) {
            for (let n of this.baseMutations) n.key.isEqual(e.key) && (t = ii(n, e, t, this.localWriteTime));
            for (let n of this.mutations) n.key.isEqual(e.key) && (t = ii(n, e, t, this.localWriteTime));
            return t
        }
        applyToLocalDocumentSet(e, t) {
            let n = Ar();
            return this.mutations.forEach((r => {
                let i = e.get(r.key),
                    a = i.overlayedDocument,
                    o = this.applyToLocalView(a, i.mutatedFields);
                o = t.has(r.key) ? null : o;
                let s = ni(a, o);
                s !== null && n.set(r.key, s), a.isValidDocument() || a.convertToNoDocument(L.min())
            })), n
        }
        keys() {
            return this.mutations.reduce(((e, t) => e.add(t.key)), B())
        }
        isEqual(e) {
            return this.batchId === e.batchId && Qe(this.mutations, e.mutations, ((e, t) => oi(e, t))) && Qe(this.baseMutations, e.baseMutations, ((e, t) => oi(e, t)))
        }
    },
    hi = class e {
        constructor(e, t, n, r) {
            this.batch = e, this.commitVersion = t, this.mutationResults = n, this.docVersions = r
        }
        static from(t, n, r) {
            j(t.mutations.length === r.length, 58842, {
                me: t.mutations.length,
                fe: r.length
            });
            let i = function() {
                    return Mr
                }(),
                a = t.mutations;
            for (let e = 0; e < a.length; e++) i = i.insert(a[e].key, r[e].version);
            return new e(t, n, r, i)
        }
    },
    gi = class {
        constructor(e, t) {
            this.largestBatchId = e, this.mutation = t
        }
        getKey() {
            return this.mutation.key
        }
        isEqual(e) {
            return e !== null && this.mutation === e.mutation
        }
        toString() {
            return `Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`
        }
    },
    _i = class {
        constructor(e, t) {
            this.count = e, this.unchangedNames = t
        }
    },
    vi, V;

function yi(e) {
    switch (e) {
        case N.OK:
            return A(64938);
        case N.CANCELLED:
        case N.UNKNOWN:
        case N.DEADLINE_EXCEEDED:
        case N.RESOURCE_EXHAUSTED:
        case N.INTERNAL:
        case N.UNAVAILABLE:
        case N.UNAUTHENTICATED:
            return !1;
        case N.INVALID_ARGUMENT:
        case N.NOT_FOUND:
        case N.ALREADY_EXISTS:
        case N.PERMISSION_DENIED:
        case N.FAILED_PRECONDITION:
        case N.ABORTED:
        case N.OUT_OF_RANGE:
        case N.UNIMPLEMENTED:
        case N.DATA_LOSS:
            return !0;
        default:
            return A(15467, {
                code: e
            })
    }
}

function bi(e) {
    if (e === void 0) return Ne(`GRPC error has no .code`), N.UNKNOWN;
    switch (e) {
        case vi.OK:
            return N.OK;
        case vi.CANCELLED:
            return N.CANCELLED;
        case vi.UNKNOWN:
            return N.UNKNOWN;
        case vi.DEADLINE_EXCEEDED:
            return N.DEADLINE_EXCEEDED;
        case vi.RESOURCE_EXHAUSTED:
            return N.RESOURCE_EXHAUSTED;
        case vi.INTERNAL:
            return N.INTERNAL;
        case vi.UNAVAILABLE:
            return N.UNAVAILABLE;
        case vi.UNAUTHENTICATED:
            return N.UNAUTHENTICATED;
        case vi.INVALID_ARGUMENT:
            return N.INVALID_ARGUMENT;
        case vi.NOT_FOUND:
            return N.NOT_FOUND;
        case vi.ALREADY_EXISTS:
            return N.ALREADY_EXISTS;
        case vi.PERMISSION_DENIED:
            return N.PERMISSION_DENIED;
        case vi.FAILED_PRECONDITION:
            return N.FAILED_PRECONDITION;
        case vi.ABORTED:
            return N.ABORTED;
        case vi.OUT_OF_RANGE:
            return N.OUT_OF_RANGE;
        case vi.UNIMPLEMENTED:
            return N.UNIMPLEMENTED;
        case vi.DATA_LOSS:
            return N.DATA_LOSS;
        default:
            return A(39323, {
                code: e
            })
    }
}(V = vi ||= {})[V.OK = 0] = `OK`, V[V.CANCELLED = 1] = `CANCELLED`, V[V.UNKNOWN = 2] = `UNKNOWN`, V[V.INVALID_ARGUMENT = 3] = `INVALID_ARGUMENT`, V[V.DEADLINE_EXCEEDED = 4] = `DEADLINE_EXCEEDED`, V[V.NOT_FOUND = 5] = `NOT_FOUND`, V[V.ALREADY_EXISTS = 6] = `ALREADY_EXISTS`, V[V.PERMISSION_DENIED = 7] = `PERMISSION_DENIED`, V[V.UNAUTHENTICATED = 16] = `UNAUTHENTICATED`, V[V.RESOURCE_EXHAUSTED = 8] = `RESOURCE_EXHAUSTED`, V[V.FAILED_PRECONDITION = 9] = `FAILED_PRECONDITION`, V[V.ABORTED = 10] = `ABORTED`, V[V.OUT_OF_RANGE = 11] = `OUT_OF_RANGE`, V[V.UNIMPLEMENTED = 12] = `UNIMPLEMENTED`, V[V.INTERNAL = 13] = `INTERNAL`, V[V.UNAVAILABLE = 14] = `UNAVAILABLE`, V[V.DATA_LOSS = 15] = `DATA_LOSS`;
var xi = null;

function Si() {
    return new TextEncoder
}
var Ci = new ge([4294967295, 4294967295], 0);

function wi(e) {
    let t = Si().encode(e),
        n = new _e;
    return n.update(t), new Uint8Array(n.digest())
}

function Ti(e) {
    let t = new DataView(e.buffer),
        n = t.getUint32(0, !0),
        r = t.getUint32(4, !0),
        i = t.getUint32(8, !0),
        a = t.getUint32(12, !0);
    return [new ge([n, r], 0), new ge([i, a], 0)]
}
var Ei = class e {
        constructor(e, t, n) {
            if (this.bitmap = e, this.padding = t, this.hashCount = n, t < 0 || t >= 8) throw new Di(`Invalid padding: ${t}`);
            if (n < 0 || e.length > 0 && this.hashCount === 0) throw new Di(`Invalid hash count: ${n}`);
            if (e.length === 0 && t !== 0) throw new Di(`Invalid padding when bitmap length is 0: ${t}`);
            this.ge = 8 * e.length - t, this.pe = ge.fromNumber(this.ge)
        }
        ye(e, t, n) {
            let r = e.add(t.multiply(ge.fromNumber(n)));
            return r.compare(Ci) === 1 && (r = new ge([r.getBits(0), r.getBits(1)], 0)), r.modulo(this.pe).toNumber()
        }
        we(e) {
            return !!(this.bitmap[Math.floor(e / 8)] & 1 << e % 8)
        }
        mightContain(e) {
            if (this.ge === 0) return !1;
            let [t, n] = Ti(wi(e));
            for (let e = 0; e < this.hashCount; e++) {
                let r = this.ye(t, n, e);
                if (!this.we(r)) return !1
            }
            return !0
        }
        static create(t, n, r) {
            let i = t % 8 == 0 ? 0 : 8 - t % 8,
                a = new e(new Uint8Array(Math.ceil(t / 8)), i, n);
            return r.forEach((e => a.insert(e))), a
        }
        insert(e) {
            if (this.ge === 0) return;
            let [t, n] = Ti(wi(e));
            for (let e = 0; e < this.hashCount; e++) {
                let r = this.ye(t, n, e);
                this.Se(r)
            }
        }
        Se(e) {
            let t = Math.floor(e / 8),
                n = e % 8;
            this.bitmap[t] |= 1 << n
        }
    },
    Di = class extends Error {
        constructor() {
            super(...arguments), this.name = `BloomFilterError`
        }
    },
    Oi = class e {
        constructor(e, t, n, r, i) {
            this.snapshotVersion = e, this.targetChanges = t, this.targetMismatches = n, this.documentUpdates = r, this.resolvedLimboDocuments = i
        }
        static createSynthesizedRemoteEventForCurrentChange(t, n, r) {
            let i = new Map;
            return i.set(t, ki.createSynthesizedTargetChangeForCurrentChange(t, n, r)), new e(L.min(), i, new zt(F), Tr(), B())
        }
    },
    ki = class e {
        constructor(e, t, n, r, i) {
            this.resumeToken = e, this.current = t, this.addedDocuments = n, this.modifiedDocuments = r, this.removedDocuments = i
        }
        static createSynthesizedTargetChangeForCurrentChange(t, n, r) {
            return new e(r, n, B(), B(), B())
        }
    },
    Ai = class {
        constructor(e, t, n, r) {
            this.be = e, this.removedTargetIds = t, this.key = n, this.De = r
        }
    },
    ji = class {
        constructor(e, t) {
            this.targetId = e, this.Ce = t
        }
    },
    H = class {
        constructor(e, t, n = Gt.EMPTY_BYTE_STRING, r = null) {
            this.state = e, this.targetIds = t, this.resumeToken = n, this.cause = r
        }
    },
    Mi = class {
        constructor() {
            this.ve = 0, this.Fe = Fi(), this.Me = Gt.EMPTY_BYTE_STRING, this.xe = !1, this.Oe = !0
        }
        get current() {
            return this.xe
        }
        get resumeToken() {
            return this.Me
        }
        get Ne() {
            return this.ve !== 0
        }
        get Be() {
            return this.Oe
        }
        Le(e) {
            e.approximateByteSize() > 0 && (this.Oe = !0, this.Me = e)
        }
        ke() {
            let e = B(),
                t = B(),
                n = B();
            return this.Fe.forEach(((r, i) => {
                switch (i) {
                    case 0:
                        e = e.add(r);
                        break;
                    case 2:
                        t = t.add(r);
                        break;
                    case 1:
                        n = n.add(r);
                        break;
                    default:
                        A(38017, {
                            changeType: i
                        })
                }
            })), new ki(this.Me, this.xe, e, t, n)
        }
        qe() {
            this.Oe = !1, this.Fe = Fi()
        }
        Ke(e, t) {
            this.Oe = !0, this.Fe = this.Fe.insert(e, t)
        }
        Ue(e) {
            this.Oe = !0, this.Fe = this.Fe.remove(e)
        }
        $e() {
            this.ve += 1
        }
        We() {
            --this.ve, j(this.ve >= 0, 3241, {
                ve: this.ve
            })
        }
        Qe() {
            this.Oe = !0, this.xe = !0
        }
    },
    Ni = class {
        constructor(e) {
            this.Ge = e, this.ze = new Map, this.je = Tr(), this.Je = Pi(), this.He = Pi(), this.Ze = new zt(F)
        }
        Xe(e) {
            for (let t of e.be) e.De && e.De.isFoundDocument() ? this.Ye(t, e.De) : this.et(t, e.key, e.De);
            for (let t of e.removedTargetIds) this.et(t, e.key, e.De)
        }
        tt(e) {
            this.forEachTarget(e, (t => {
                let n = this.nt(t);
                switch (e.state) {
                    case 0:
                        this.rt(t) && n.Le(e.resumeToken);
                        break;
                    case 1:
                        n.We(), n.Ne || n.qe(), n.Le(e.resumeToken);
                        break;
                    case 2:
                        n.We(), n.Ne || this.removeTarget(t);
                        break;
                    case 3:
                        this.rt(t) && (n.Qe(), n.Le(e.resumeToken));
                        break;
                    case 4:
                        this.rt(t) && (this.it(t), n.Le(e.resumeToken));
                        break;
                    default:
                        A(56790, {
                            state: e.state
                        })
                }
            }))
        }
        forEachTarget(e, t) {
            e.targetIds.length > 0 ? e.targetIds.forEach(t) : this.ze.forEach(((e, n) => {
                this.rt(n) && t(n)
            }))
        }
        st(e) {
            let t = e.targetId,
                n = e.Ce.count,
                r = this.ot(t);
            if (r) {
                let i = r.target;
                if (ar(i))
                    if (n === 0) {
                        let e = new I(i.path);
                        this.et(t, e, Mn.newNoDocument(e, L.min()))
                    } else j(n === 1, 20013, {
                        expectedCount: n
                    });
                else {
                    let r = this._t(t);
                    if (r !== n) {
                        let n = this.ut(e),
                            i = n ? this.ct(n, e, r) : 1;
                        if (i !== 0) {
                            this.it(t);
                            let e = i === 2 ? `TargetPurposeExistenceFilterMismatchBloom` : `TargetPurposeExistenceFilterMismatch`;
                            this.Ze = this.Ze.insert(t, e)
                        }
                        xi?.o(function(e, t, n, r, i) {
                            let a = {
                                    localCacheCount: e,
                                    existenceFilterCount: t.count,
                                    databaseId: n.database,
                                    projectId: n.projectId
                                },
                                o = t.unchangedNames;
                            return o && (a.bloomFilter = {
                                applied: i === 0,
                                hashCount: o?.hashCount ?? 0,
                                bitmapLength: o?.bits?.bitmap?.length ?? 0,
                                padding: o?.bits?.padding ?? 0,
                                mightContain: e => r?.mightContain(e) ?? !1
                            }), a
                        }(r, e.Ce, this.Ge.ht(), n, i))
                    }
                }
            }
        }
        ut(e) {
            let t = e.Ce.unchangedNames;
            if (!t || !t.bits) return null;
            let {
                bits: {
                    bitmap: n = ``,
                    padding: r = 0
                },
                hashCount: i = 0
            } = t, a, o;
            try {
                a = Yt(n).toUint8Array()
            } catch (e) {
                if (e instanceof Wt) return Pe(`Decoding the base64 bloom filter in existence filter failed (` + e.message + `); ignoring the bloom filter and falling back to full re-query.`), null;
                throw e
            }
            try {
                o = new Ei(a, r, i)
            } catch (e) {
                return Pe(e instanceof Di ? `BloomFilter error: ` : `Applying bloom filter failed: `, e), null
            }
            return o.ge === 0 ? null : o
        }
        ct(e, t, n) {
            return t.Ce.count === n - this.Pt(e, t.targetId) ? 0 : 2
        }
        Pt(e, t) {
            let n = this.Ge.getRemoteKeysForTarget(t),
                r = 0;
            return n.forEach((n => {
                let i = this.Ge.ht(),
                    a = `projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;
                e.mightContain(a) || (this.et(t, n, null), r++)
            })), r
        }
        Tt(e) {
            let t = new Map;
            this.ze.forEach(((n, r) => {
                let i = this.ot(r);
                if (i) {
                    if (n.current && ar(i.target)) {
                        let t = new I(i.target.path);
                        this.Et(t).has(r) || this.It(r, t) || this.et(r, t, Mn.newNoDocument(t, e))
                    }
                    n.Be && (t.set(r, n.ke()), n.qe())
                }
            }));
            let n = B();
            this.He.forEach(((e, t) => {
                let r = !0;
                t.forEachWhile((e => {
                    let t = this.ot(e);
                    return !t || t.purpose === `TargetPurposeLimboResolution` || (r = !1, !1)
                })), r && (n = n.add(e))
            })), this.je.forEach(((t, n) => n.setReadTime(e)));
            let r = new Oi(e, t, this.Ze, this.je, n);
            return this.je = Tr(), this.Je = Pi(), this.He = Pi(), this.Ze = new zt(F), r
        }
        Ye(e, t) {
            if (!this.rt(e)) return;
            let n = this.It(e, t.key) ? 2 : 0;
            this.nt(e).Ke(t.key, n), this.je = this.je.insert(t.key, t), this.Je = this.Je.insert(t.key, this.Et(t.key).add(e)), this.He = this.He.insert(t.key, this.Rt(t.key).add(e))
        }
        et(e, t, n) {
            if (!this.rt(e)) return;
            let r = this.nt(e);
            this.It(e, t) ? r.Ke(t, 1) : r.Ue(t), this.He = this.He.insert(t, this.Rt(t).delete(e)), this.He = this.He.insert(t, this.Rt(t).add(e)), n && (this.je = this.je.insert(t, n))
        }
        removeTarget(e) {
            this.ze.delete(e)
        }
        _t(e) {
            let t = this.nt(e).ke();
            return this.Ge.getRemoteKeysForTarget(e).size + t.addedDocuments.size - t.removedDocuments.size
        }
        $e(e) {
            this.nt(e).$e()
        }
        nt(e) {
            let t = this.ze.get(e);
            return t || (t = new Mi, this.ze.set(e, t)), t
        }
        Rt(e) {
            let t = this.He.get(e);
            return t || (t = new Vt(F), this.He = this.He.insert(e, t)), t
        }
        Et(e) {
            let t = this.Je.get(e);
            return t || (t = new Vt(F), this.Je = this.Je.insert(e, t)), t
        }
        rt(e) {
            let t = this.ot(e) !== null;
            return t || k(`WatchChangeAggregator`, `Detected inactive target`, e), t
        }
        ot(e) {
            let t = this.ze.get(e);
            return t && t.Ne ? null : this.Ge.At(e)
        }
        it(e) {
            this.ze.set(e, new Mi), this.Ge.getRemoteKeysForTarget(e).forEach((t => {
                this.et(e, t, null)
            }))
        }
        It(e, t) {
            return this.Ge.getRemoteKeysForTarget(e).has(t)
        }
    };

function Pi() {
    return new zt(I.comparator)
}

function Fi() {
    return new zt(I.comparator)
}
var Ii = {
        asc: `ASCENDING`,
        desc: `DESCENDING`
    },
    Li = {
        "<": `LESS_THAN`,
        "<=": `LESS_THAN_OR_EQUAL`,
        ">": `GREATER_THAN`,
        ">=": `GREATER_THAN_OR_EQUAL`,
        "==": `EQUAL`,
        "!=": `NOT_EQUAL`,
        "array-contains": `ARRAY_CONTAINS`,
        in: `IN`,
        "not-in": `NOT_IN`,
        "array-contains-any": `ARRAY_CONTAINS_ANY`
    },
    Ri = {
        and: `AND`,
        or: `OR`
    },
    zi = class {
        constructor(e, t) {
            this.databaseId = e, this.useProto3Json = t
        }
    };

function Bi(e, t) {
    return e.useProto3Json || kt(t) ? t : {
        value: t
    }
}

function Vi(e, t) {
    return e.useProto3Json ? `${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,``).replace(`Z`,``)}.${(`000000000`+t.nanoseconds).slice(-9)}Z` : {
        seconds: `` + t.seconds,
        nanos: t.nanoseconds
    }
}

function Hi(e, t) {
    return e.useProto3Json ? t.toBase64() : t.toUint8Array()
}

function Ui(e, t) {
    return Vi(e, t.toTimestamp())
}

function Wi(e) {
    return j(!!e, 49232), L.fromTimestamp(function(e) {
        let t = qt(e);
        return new ht(t.seconds, t.nanos)
    }(e))
}

function Gi(e, t) {
    return Ki(e, t).canonicalString()
}

function Ki(e, t) {
    let n = function(e) {
        return new tt([`projects`, e.projectId, `databases`, e.database])
    }(e).child(`documents`);
    return t === void 0 ? n : n.child(t)
}

function qi(e) {
    let t = tt.fromString(e);
    return j(ga(t), 10190, {
        key: t.toString()
    }), t
}

function Ji(e, t) {
    return Gi(e.databaseId, t.path)
}

function Yi(e, t) {
    let n = qi(t);
    if (n.get(1) !== e.databaseId.projectId) throw new P(N.INVALID_ARGUMENT, `Tried to deserialize key from different project: ` + n.get(1) + ` vs ` + e.databaseId.projectId);
    if (n.get(3) !== e.databaseId.database) throw new P(N.INVALID_ARGUMENT, `Tried to deserialize key from different database: ` + n.get(3) + ` vs ` + e.databaseId.database);
    return new I($i(n))
}

function Xi(e, t) {
    return Gi(e.databaseId, t)
}

function Zi(e) {
    let t = qi(e);
    return t.length === 4 ? tt.emptyPath() : $i(t)
}

function Qi(e) {
    return new tt([`projects`, e.databaseId.projectId, `databases`, e.databaseId.database]).canonicalString()
}

function $i(e) {
    return j(e.length > 4 && e.get(4) === `documents`, 29091, {
        key: e.toString()
    }), e.popFirst(5)
}

function ea(e, t, n) {
    return {
        name: Ji(e, t),
        fields: n.value.mapValue.fields
    }
}

function ta(e, t) {
    let n;
    if (`targetChange` in t) {
        t.targetChange;
        let r = function(e) {
                return e === `NO_CHANGE` ? 0 : e === `ADD` ? 1 : e === `REMOVE` ? 2 : e === `CURRENT` ? 3 : e === `RESET` ? 4 : A(39313, {
                    state: e
                })
            }(t.targetChange.targetChangeType || `NO_CHANGE`),
            i = t.targetChange.targetIds || [],
            a = function(e, t) {
                return e.useProto3Json ? (j(t === void 0 || typeof t == `string`, 58123), Gt.fromBase64String(t || ``)) : (j(t === void 0 || t instanceof Buffer || t instanceof Uint8Array, 16193), Gt.fromUint8Array(t || new Uint8Array))
            }(e, t.targetChange.resumeToken),
            o = t.targetChange.cause;
        n = new H(r, i, a, o && function(e) {
            return new P(e.code === void 0 ? N.UNKNOWN : bi(e.code), e.message || ``)
        }(o) || null)
    } else if (`documentChange` in t) {
        t.documentChange;
        let r = t.documentChange;
        r.document, r.document.name, r.document.updateTime;
        let i = Yi(e, r.document.name),
            a = Wi(r.document.updateTime),
            o = r.document.createTime ? Wi(r.document.createTime) : L.min(),
            s = new An({
                mapValue: {
                    fields: r.document.fields
                }
            }),
            c = Mn.newFoundDocument(i, a, o, s);
        n = new Ai(r.targetIds || [], r.removedTargetIds || [], c.key, c)
    } else if (`documentDelete` in t) {
        t.documentDelete;
        let r = t.documentDelete;
        r.document;
        let i = Yi(e, r.document),
            a = r.readTime ? Wi(r.readTime) : L.min(),
            o = Mn.newNoDocument(i, a);
        n = new Ai([], r.removedTargetIds || [], o.key, o)
    } else if (`documentRemove` in t) {
        t.documentRemove;
        let r = t.documentRemove;
        r.document;
        let i = Yi(e, r.document);
        n = new Ai([], r.removedTargetIds || [], i, null)
    } else {
        if (!(`filter` in t)) return A(11601, {
            Vt: t
        });
        {
            t.filter;
            let e = t.filter;
            e.targetId;
            let {
                count: r = 0,
                unchangedNames: i
            } = e, a = new _i(r, i), o = e.targetId;
            n = new ji(o, a)
        }
    }
    return n
}

function na(e, t) {
    let n;
    if (t instanceof si) n = {
        update: ea(e, t.key, t.value)
    };
    else if (t instanceof fi) n = {
        delete: Ji(e, t.key)
    };
    else if (t instanceof ci) n = {
        update: ea(e, t.key, t.data),
        updateMask: ha(t.fieldMask)
    };
    else {
        if (!(t instanceof pi)) return A(16599, {
            dt: t.type
        });
        n = {
            verify: Ji(e, t.key)
        }
    }
    return t.fieldTransforms.length > 0 && (n.updateTransforms = t.fieldTransforms.map((e => function(e, t) {
        let n = t.transform;
        if (n instanceof Ur) return {
            fieldPath: t.field.canonicalString(),
            setToServerValue: `REQUEST_TIME`
        };
        if (n instanceof Wr) return {
            fieldPath: t.field.canonicalString(),
            appendMissingElements: {
                values: n.elements
            }
        };
        if (n instanceof Kr) return {
            fieldPath: t.field.canonicalString(),
            removeAllFromArray: {
                values: n.elements
            }
        };
        if (n instanceof Jr) return {
            fieldPath: t.field.canonicalString(),
            increment: n.Ae
        };
        throw A(20930, {
            transform: t.transform
        })
    }(0, e)))), t.precondition.isNone || (n.currentDocument = function(e, t) {
        return t.updateTime === void 0 ? t.exists === void 0 ? A(27497) : {
            exists: t.exists
        } : {
            updateTime: Ui(e, t.updateTime)
        }
    }(e, t.precondition)), n
}

function ra(e, t) {
    return e && e.length > 0 ? (j(t !== void 0, 14353), e.map((e => function(e, t) {
        let n = e.updateTime ? Wi(e.updateTime) : Wi(t);
        return n.isEqual(L.min()) && (n = Wi(t)), new Qr(n, e.transformResults || [])
    }(e, t)))) : []
}

function ia(e, t) {
    return {
        documents: [Xi(e, t.path)]
    }
}

function aa(e, t) {
    let n = {
            structuredQuery: {}
        },
        r = t.path,
        i;
    t.collectionGroup === null ? (i = r.popLast(), n.structuredQuery.from = [{
        collectionId: r.lastSegment()
    }]) : (i = r, n.structuredQuery.from = [{
        collectionId: t.collectionGroup,
        allDescendants: !0
    }]), n.parent = Xi(e, i);
    let a = function(e) {
        if (e.length !== 0) return ma(Bn.create(e, `and`))
    }(t.filters);
    a && (n.structuredQuery.where = a);
    let o = function(e) {
        if (e.length !== 0) return e.map((e => function(e) {
            return {
                field: fa(e.field),
                direction: la(e.dir)
            }
        }(e)))
    }(t.orderBy);
    o && (n.structuredQuery.orderBy = o);
    let s = Bi(e, t.limit);
    return s !== null && (n.structuredQuery.limit = s), t.startAt && (n.structuredQuery.startAt = function(e) {
        return {
            before: e.inclusive,
            values: e.position
        }
    }(t.startAt)), t.endAt && (n.structuredQuery.endAt = function(e) {
        return {
            before: !e.inclusive,
            values: e.position
        }
    }(t.endAt)), {
        ft: n,
        parent: i
    }
}

function oa(e) {
    let t = Zi(e.parent),
        n = e.structuredQuery,
        r = n.from ? n.from.length : 0,
        i = null;
    if (r > 0) {
        j(r === 1, 65062);
        let e = n.from[0];
        e.allDescendants ? i = e.collectionId : t = t.child(e.collectionId)
    }
    let a = [];
    n.where && (a = function(e) {
        let t = ca(e);
        return t instanceof Bn && Hn(t) ? t.getFilters() : [t]
    }(n.where));
    let o = [];
    n.orderBy && (o = function(e) {
        return e.map((e => function(e) {
            return new In(pa(e.field), function(e) {
                switch (e) {
                    case `ASCENDING`:
                        return `asc`;
                    case `DESCENDING`:
                        return `desc`;
                    default:
                        return
                }
            }(e.direction))
        }(e)))
    }(n.orderBy));
    let s = null;
    n.limit && (s = function(e) {
        let t;
        return t = typeof e == `object` ? e.value : e, kt(t) ? null : t
    }(n.limit));
    let c = null;
    n.startAt && (c = function(e) {
        let t = !!e.before;
        return new Nn(e.values || [], t)
    }(n.startAt));
    let l = null;
    return n.endAt && (l = function(e) {
        let t = !e.before;
        return new Nn(e.values || [], t)
    }(n.endAt)), sr(t, i, o, a, s, `F`, c, l)
}

function sa(e, t) {
    let n = function(e) {
        switch (e) {
            case `TargetPurposeListen`:
                return null;
            case `TargetPurposeExistenceFilterMismatch`:
                return `existence-filter-mismatch`;
            case `TargetPurposeExistenceFilterMismatchBloom`:
                return `existence-filter-mismatch-bloom`;
            case `TargetPurposeLimboResolution`:
                return `limbo-document`;
            default:
                return A(28987, {
                    purpose: e
                })
        }
    }(t.purpose);
    return n == null ? null : {
        "goog-listen-tags": n
    }
}

function ca(e) {
    return e.unaryFilter === void 0 ? e.fieldFilter === void 0 ? e.compositeFilter === void 0 ? A(30097, {
        filter: e
    }) : function(e) {
        return Bn.create(e.compositeFilter.filters.map((e => ca(e))), function(e) {
            switch (e) {
                case `AND`:
                    return `and`;
                case `OR`:
                    return `or`;
                default:
                    return A(1026)
            }
        }(e.compositeFilter.op))
    }(e) : function(e) {
        return zn.create(pa(e.fieldFilter.field), function(e) {
            switch (e) {
                case `EQUAL`:
                    return `==`;
                case `NOT_EQUAL`:
                    return `!=`;
                case `GREATER_THAN`:
                    return `>`;
                case `GREATER_THAN_OR_EQUAL`:
                    return `>=`;
                case `LESS_THAN`:
                    return `<`;
                case `LESS_THAN_OR_EQUAL`:
                    return `<=`;
                case `ARRAY_CONTAINS`:
                    return `array-contains`;
                case `IN`:
                    return `in`;
                case `NOT_IN`:
                    return `not-in`;
                case `ARRAY_CONTAINS_ANY`:
                    return `array-contains-any`;
                case `OPERATOR_UNSPECIFIED`:
                    return A(58110);
                default:
                    return A(50506)
            }
        }(e.fieldFilter.op), e.fieldFilter.value)
    }(e) : function(e) {
        switch (e.unaryFilter.op) {
            case `IS_NAN`:
                let t = pa(e.unaryFilter.field);
                return zn.create(t, `==`, {
                    doubleValue: NaN
                });
            case `IS_NULL`:
                let n = pa(e.unaryFilter.field);
                return zn.create(n, `==`, {
                    nullValue: `NULL_VALUE`
                });
            case `IS_NOT_NAN`:
                let r = pa(e.unaryFilter.field);
                return zn.create(r, `!=`, {
                    doubleValue: NaN
                });
            case `IS_NOT_NULL`:
                let i = pa(e.unaryFilter.field);
                return zn.create(i, `!=`, {
                    nullValue: `NULL_VALUE`
                });
            case `OPERATOR_UNSPECIFIED`:
                return A(61313);
            default:
                return A(60726)
        }
    }(e)
}

function la(e) {
    return Ii[e]
}

function ua(e) {
    return Li[e]
}

function da(e) {
    return Ri[e]
}

function fa(e) {
    return {
        fieldPath: e.canonicalString()
    }
}

function pa(e) {
    return rt.fromServerFormat(e.fieldPath)
}

function ma(e) {
    return e instanceof zn ? function(e) {
        if (e.op === `==`) {
            if (Tn(e.value)) return {
                unaryFilter: {
                    field: fa(e.field),
                    op: `IS_NAN`
                }
            };
            if (wn(e.value)) return {
                unaryFilter: {
                    field: fa(e.field),
                    op: `IS_NULL`
                }
            }
        } else if (e.op === `!=`) {
            if (Tn(e.value)) return {
                unaryFilter: {
                    field: fa(e.field),
                    op: `IS_NOT_NAN`
                }
            };
            if (wn(e.value)) return {
                unaryFilter: {
                    field: fa(e.field),
                    op: `IS_NOT_NULL`
                }
            }
        }
        return {
            fieldFilter: {
                field: fa(e.field),
                op: ua(e.op),
                value: e.value
            }
        }
    }(e) : e instanceof Bn ? function(e) {
        let t = e.getFilters().map((e => ma(e)));
        return t.length === 1 ? t[0] : {
            compositeFilter: {
                op: da(e.op),
                filters: t
            }
        }
    }(e) : A(54877, {
        filter: e
    })
}

function ha(e) {
    let t = [];
    return e.fields.forEach((e => t.push(e.canonicalString()))), {
        fieldPaths: t
    }
}

function ga(e) {
    return e.length >= 4 && e.get(0) === `projects` && e.get(2) === `databases`
}

function _a(e) {
    return !!e && typeof e._toProto == `function` && e._protoValueType === `ProtoValue`
}
var va = class e {
        constructor(e, t, n, r, i = L.min(), a = L.min(), o = Gt.EMPTY_BYTE_STRING, s = null) {
            this.target = e, this.targetId = t, this.purpose = n, this.sequenceNumber = r, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = a, this.resumeToken = o, this.expectedCount = s
        }
        withSequenceNumber(t) {
            return new e(this.target, this.targetId, this.purpose, t, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount)
        }
        withResumeToken(t, n) {
            return new e(this.target, this.targetId, this.purpose, this.sequenceNumber, n, this.lastLimboFreeSnapshotVersion, t, null)
        }
        withExpectedCount(t) {
            return new e(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, t)
        }
        withLastLimboFreeSnapshotVersion(t) {
            return new e(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, t, this.resumeToken, this.expectedCount)
        }
    },
    ya = class {
        constructor(e) {
            this.yt = e
        }
    };

function ba(e) {
    let t = oa({
        parent: e.parent,
        structuredQuery: e.structuredQuery
    });
    return e.limitType === `LAST` ? hr(t, t.limit, `L`) : t
}
var xa = class {
    constructor() {}
    Dt(e, t) {
        this.Ct(e, t), t.vt()
    }
    Ct(e, t) {
        if (`nullValue` in e) this.Ft(t, 5);
        else if (`booleanValue` in e) this.Ft(t, 10), t.Mt(e.booleanValue ? 1 : 0);
        else if (`integerValue` in e) this.Ft(t, 15), t.Mt(Jt(e.integerValue));
        else if (`doubleValue` in e) {
            let n = Jt(e.doubleValue);
            isNaN(n) ? this.Ft(t, 13) : (this.Ft(t, 15), At(n) ? t.Mt(0) : t.Mt(n))
        } else if (`timestampValue` in e) {
            let n = e.timestampValue;
            this.Ft(t, 20), typeof n == `string` && (n = qt(n)), t.xt(`${n.seconds||``}`), t.Mt(n.nanos || 0)
        } else if (`stringValue` in e) this.Ot(e.stringValue, t), this.Nt(t);
        else if (`bytesValue` in e) this.Ft(t, 30), t.Bt(Yt(e.bytesValue)), this.Nt(t);
        else if (`referenceValue` in e) this.Lt(e.referenceValue, t);
        else if (`geoPointValue` in e) {
            let n = e.geoPointValue;
            this.Ft(t, 45), t.Mt(n.latitude || 0), t.Mt(n.longitude || 0)
        } else `mapValue` in e ? kn(e) ? this.Ft(t, 2 ** 53 - 1) : Dn(e) ? this.kt(e.mapValue, t) : (this.qt(e.mapValue, t), this.Nt(t)) : `arrayValue` in e ? (this.Kt(e.arrayValue, t), this.Nt(t)) : A(19022, {
            Ut: e
        })
    }
    Ot(e, t) {
        this.Ft(t, 25), this.$t(e, t)
    }
    $t(e, t) {
        t.xt(e)
    }
    qt(e, t) {
        let n = e.fields || {};
        this.Ft(t, 55);
        for (let e of Object.keys(n)) this.Ot(e, t), this.Ct(n[e], t)
    }
    kt(e, t) {
        let n = e.fields || {};
        this.Ft(t, 53);
        let r = fn,
            i = n[r].arrayValue?.values?.length || 0;
        this.Ft(t, 15), t.Mt(Jt(i)), this.Ot(r, t), this.Ct(n[r], t)
    }
    Kt(e, t) {
        let n = e.values || [];
        this.Ft(t, 50);
        for (let e of n) this.Ct(e, t)
    }
    Lt(e, t) {
        this.Ft(t, 37), I.fromName(e).path.forEach((e => {
            this.Ft(t, 60), this.$t(e, t)
        }))
    }
    Ft(e, t) {
        e.Mt(t)
    }
    Nt(e) {
        e.Mt(2)
    }
};
xa.Wt = new xa;
var Sa = class {
        constructor() {
            this.bn = new Ca
        }
        addToCollectionParentIndex(e, t) {
            return this.bn.add(t), R.resolve()
        }
        getCollectionParents(e, t) {
            return R.resolve(this.bn.getEntries(t))
        }
        addFieldIndex(e, t) {
            return R.resolve()
        }
        deleteFieldIndex(e, t) {
            return R.resolve()
        }
        deleteAllFieldIndexes(e) {
            return R.resolve()
        }
        createTargetIndexes(e, t) {
            return R.resolve()
        }
        getDocumentsMatchingTarget(e, t) {
            return R.resolve(null)
        }
        getIndexType(e, t) {
            return R.resolve(0)
        }
        getFieldIndexes(e, t) {
            return R.resolve([])
        }
        getNextCollectionGroupToUpdate(e) {
            return R.resolve(null)
        }
        getMinOffset(e, t) {
            return R.resolve(bt.min())
        }
        getMinOffsetFromCollectionGroup(e, t) {
            return R.resolve(bt.min())
        }
        updateCollectionGroup(e, t, n) {
            return R.resolve()
        }
        updateIndexEntries(e, t) {
            return R.resolve()
        }
    },
    Ca = class {
        constructor() {
            this.index = {}
        }
        add(e) {
            let t = e.lastSegment(),
                n = e.popLast(),
                r = this.index[t] || new Vt(tt.comparator),
                i = !r.has(n);
            return this.index[t] = r.add(n), i
        }
        has(e) {
            let t = e.lastSegment(),
                n = e.popLast(),
                r = this.index[t];
            return r && r.has(n)
        }
        getEntries(e) {
            return (this.index[e] || new Vt(tt.comparator)).toArray()
        }
    };
new Uint8Array;
var wa = {
        didRun: !1,
        sequenceNumbersCollected: 0,
        targetsRemoved: 0,
        documentsRemoved: 0
    },
    Ta = 41943040,
    Ea = class e {
        static withCacheSize(t) {
            return new e(t, e.DEFAULT_COLLECTION_PERCENTILE, e.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)
        }
        constructor(e, t, n) {
            this.cacheSizeCollectionThreshold = e, this.percentileToCollect = t, this.maximumSequenceNumbersToCollect = n
        }
    };
Ea.DEFAULT_COLLECTION_PERCENTILE = 10, Ea.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, Ea.DEFAULT = new Ea(Ta, Ea.DEFAULT_COLLECTION_PERCENTILE, Ea.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), Ea.DISABLED = new Ea(-1, 0, 0);
var Da = class e {
        constructor(e) {
            this.sr = e
        }
        next() {
            return this.sr += 2, this.sr
        }
        static _r() {
            return new e(0)
        }
        static ar() {
            return new e(-1)
        }
    },
    Oa = `LruGarbageCollector`,
    ka = 1048576;

function Aa([e, t], [n, r]) {
    let i = F(e, n);
    return i === 0 ? F(t, r) : i
}
var ja = class {
        constructor(e) {
            this.Pr = e, this.buffer = new Vt(Aa), this.Tr = 0
        }
        Er() {
            return ++this.Tr
        }
        Ir(e) {
            let t = [e, this.Er()];
            if (this.buffer.size < this.Pr) this.buffer = this.buffer.add(t);
            else {
                let e = this.buffer.last();
                Aa(t, e) < 0 && (this.buffer = this.buffer.delete(e).add(t))
            }
        }
        get maxValue() {
            return this.buffer.last()[0]
        }
    },
    Ma = class {
        constructor(e, t, n) {
            this.garbageCollector = e, this.asyncQueue = t, this.localStore = n, this.Rr = null
        }
        start() {
            this.garbageCollector.params.cacheSizeCollectionThreshold !== -1 && this.Ar(6e4)
        }
        stop() {
            this.Rr &&= (this.Rr.cancel(), null)
        }
        get started() {
            return this.Rr !== null
        }
        Ar(e) {
            k(Oa, `Garbage collection scheduled in ${e}ms`), this.Rr = this.asyncQueue.enqueueAfterDelay(`lru_garbage_collection`, e, (async () => {
                this.Rr = null;
                try {
                    await this.localStore.collectGarbage(this.garbageCollector)
                } catch (e) {
                    Et(e) ? k(Oa, `Ignoring IndexedDB error during garbage collection: `, e) : await wt(e)
                }
                await this.Ar(3e5)
            }))
        }
    },
    Na = class {
        constructor(e, t) {
            this.Vr = e, this.params = t
        }
        calculateTargetCount(e, t) {
            return this.Vr.dr(e).next((e => Math.floor(t / 100 * e)))
        }
        nthSequenceNumber(e, t) {
            if (t === 0) return R.resolve(Dt.ce);
            let n = new ja(t);
            return this.Vr.forEachTarget(e, (e => n.Ir(e.sequenceNumber))).next((() => this.Vr.mr(e, (e => n.Ir(e))))).next((() => n.maxValue))
        }
        removeTargets(e, t, n) {
            return this.Vr.removeTargets(e, t, n)
        }
        removeOrphanedDocuments(e, t) {
            return this.Vr.removeOrphanedDocuments(e, t)
        }
        collect(e, t) {
            return this.params.cacheSizeCollectionThreshold === -1 ? (k(`LruGarbageCollector`, `Garbage collection skipped; disabled`), R.resolve(wa)) : this.getCacheSize(e).next((n => n < this.params.cacheSizeCollectionThreshold ? (k(`LruGarbageCollector`, `Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`), wa) : this.gr(e, t)))
        }
        getCacheSize(e) {
            return this.Vr.getCacheSize(e)
        }
        gr(e, t) {
            let n, r, i, a, o, s, c, l = Date.now();
            return this.calculateTargetCount(e, this.params.percentileToCollect).next((t => (t > this.params.maximumSequenceNumbersToCollect ? (k(`LruGarbageCollector`, `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`), r = this.params.maximumSequenceNumbersToCollect) : r = t, a = Date.now(), this.nthSequenceNumber(e, r)))).next((r => (n = r, o = Date.now(), this.removeTargets(e, n, t)))).next((t => (i = t, s = Date.now(), this.removeOrphanedDocuments(e, n)))).next((e => (c = Date.now(), Me() <= x.DEBUG && k(`LruGarbageCollector`, `LRU Garbage Collection\n\tCounted targets in ${a-l}ms\n\tDetermined least recently used ${r} in ` + (o - a) + `ms
\tRemoved ${i} targets in ` + (s - o) + `ms
\tRemoved ${e} documents in ` + (c - s) + `ms
Total Duration: ${c-l}ms`), R.resolve({
                didRun: !0,
                sequenceNumbersCollected: r,
                targetsRemoved: i,
                documentsRemoved: e
            }))))
        }
    };

function Pa(e, t) {
    return new Na(e, t)
}
var Fa = class {
        constructor() {
            this.changes = new Cr((e => e.toString()), ((e, t) => e.isEqual(t))), this.changesApplied = !1
        }
        addEntry(e) {
            this.assertNotApplied(), this.changes.set(e.key, e)
        }
        removeEntry(e, t) {
            this.assertNotApplied(), this.changes.set(e, Mn.newInvalidDocument(e).setReadTime(t))
        }
        getEntry(e, t) {
            this.assertNotApplied();
            let n = this.changes.get(t);
            return n === void 0 ? this.getFromCache(e, t) : R.resolve(n)
        }
        getEntries(e, t) {
            return this.getAllFromCache(e, t)
        }
        apply(e) {
            return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(e)
        }
        assertNotApplied() {}
    },
    Ia = class {
        constructor(e, t) {
            this.overlayedDocument = e, this.mutatedFields = t
        }
    },
    La = class {
        constructor(e, t, n, r) {
            this.remoteDocumentCache = e, this.mutationQueue = t, this.documentOverlayCache = n, this.indexManager = r
        }
        getDocument(e, t) {
            let n = null;
            return this.documentOverlayCache.getOverlay(e, t).next((r => (n = r, this.remoteDocumentCache.getEntry(e, t)))).next((e => (n !== null && ii(n.mutation, e, Ut.empty(), ht.now()), e)))
        }
        getDocuments(e, t) {
            return this.remoteDocumentCache.getEntries(e, t).next((t => this.getLocalViewOfDocuments(e, t, B()).next((() => t))))
        }
        getLocalViewOfDocuments(e, t, n = B()) {
            let r = kr();
            return this.populateOverlays(e, r, t).next((() => this.computeViews(e, t, r, n).next((e => {
                let t = Dr();
                return e.forEach(((e, n) => {
                    t = t.insert(e, n.overlayedDocument)
                })), t
            }))))
        }
        getOverlayedDocuments(e, t) {
            let n = kr();
            return this.populateOverlays(e, n, t).next((() => this.computeViews(e, t, n, B())))
        }
        populateOverlays(e, t, n) {
            let r = [];
            return n.forEach((e => {
                t.has(e) || r.push(e)
            })), this.documentOverlayCache.getOverlays(e, r).next((e => {
                e.forEach(((e, n) => {
                    t.set(e, n)
                }))
            }))
        }
        computeViews(e, t, n, r) {
            let i = Tr(),
                a = jr(),
                o = function() {
                    return jr()
                }();
            return t.forEach(((e, t) => {
                let o = n.get(t.key);
                r.has(t.key) && (o === void 0 || o.mutation instanceof ci) ? i = i.insert(t.key, t) : o === void 0 ? a.set(t.key, Ut.empty()) : (a.set(t.key, o.mutation.getFieldMask()), ii(o.mutation, t, o.mutation.getFieldMask(), ht.now()))
            })), this.recalculateAndSaveOverlays(e, i).next((e => (e.forEach(((e, t) => a.set(e, t))), t.forEach(((e, t) => o.set(e, new Ia(t, a.get(e) ?? null)))), o)))
        }
        recalculateAndSaveOverlays(e, t) {
            let n = jr(),
                r = new zt(((e, t) => e - t)),
                i = B();
            return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e, t).next((e => {
                for (let i of e) i.keys().forEach((e => {
                    let a = t.get(e);
                    if (a === null) return;
                    let o = n.get(e) || Ut.empty();
                    o = i.applyToLocalView(a, o), n.set(e, o);
                    let s = (r.get(i.batchId) || B()).add(e);
                    r = r.insert(i.batchId, s)
                }))
            })).next((() => {
                let a = [],
                    o = r.getReverseIterator();
                for (; o.hasNext();) {
                    let r = o.getNext(),
                        s = r.key,
                        c = r.value,
                        l = Ar();
                    c.forEach((e => {
                        if (!i.has(e)) {
                            let r = ni(t.get(e), n.get(e));
                            r !== null && l.set(e, r), i = i.add(e)
                        }
                    })), a.push(this.documentOverlayCache.saveOverlays(e, s, l))
                }
                return R.waitFor(a)
            })).next((() => n))
        }
        recalculateAndSaveOverlaysForDocumentKeys(e, t) {
            return this.remoteDocumentCache.getEntries(e, t).next((t => this.recalculateAndSaveOverlays(e, t)))
        }
        getDocumentsMatchingQuery(e, t, n, r) {
            return ur(t) ? this.getDocumentsMatchingDocumentQuery(e, t.path) : dr(t) ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, r) : this.getDocumentsMatchingCollectionQuery(e, t, n, r)
        }
        getNextDocuments(e, t, n, r) {
            return this.remoteDocumentCache.getAllFromCollectionGroup(e, t, n, r).next((i => {
                let a = r - i.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(e, t, n.largestBatchId, r - i.size) : R.resolve(kr()),
                    o = gt,
                    s = i;
                return a.next((t => R.forEach(t, ((t, n) => (o < n.largestBatchId && (o = n.largestBatchId), i.get(t) ? R.resolve() : this.remoteDocumentCache.getEntry(e, t).next((e => {
                    s = s.insert(t, e)
                }))))).next((() => this.populateOverlays(e, t, i))).next((() => this.computeViews(e, s, t, B()))).next((e => ({
                    batchId: o,
                    changes: Or(e)
                })))))
            }))
        }
        getDocumentsMatchingDocumentQuery(e, t) {
            return this.getDocument(e, new I(t)).next((e => {
                let t = Dr();
                return e.isFoundDocument() && (t = t.insert(e.key, e)), t
            }))
        }
        getDocumentsMatchingCollectionGroupQuery(e, t, n, r) {
            let i = t.collectionGroup,
                a = Dr();
            return this.indexManager.getCollectionParents(e, i).next((o => R.forEach(o, (o => {
                let s = function(e, t) {
                    return new or(t, null, e.explicitOrderBy.slice(), e.filters.slice(), e.limit, e.limitType, e.startAt, e.endAt)
                }(t, o.child(i));
                return this.getDocumentsMatchingCollectionQuery(e, s, n, r).next((e => {
                    e.forEach(((e, t) => {
                        a = a.insert(e, t)
                    }))
                }))
            })).next((() => a))))
        }
        getDocumentsMatchingCollectionQuery(e, t, n, r) {
            let i;
            return this.documentOverlayCache.getOverlaysForCollection(e, t.path, n.largestBatchId).next((a => (i = a, this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, n, i, r)))).next((e => {
                i.forEach(((t, n) => {
                    let r = n.getKey();
                    e.get(r) === null && (e = e.insert(r, Mn.newInvalidDocument(r)))
                }));
                let n = Dr();
                return e.forEach(((e, r) => {
                    let a = i.get(e);
                    a !== void 0 && ii(a.mutation, r, Ut.empty(), ht.now()), yr(t, r) && (n = n.insert(e, r))
                })), n
            }))
        }
    },
    Ra = class {
        constructor(e) {
            this.serializer = e, this.Nr = new Map, this.Br = new Map
        }
        getBundleMetadata(e, t) {
            return R.resolve(this.Nr.get(t))
        }
        saveBundleMetadata(e, t) {
            return this.Nr.set(t.id, function(e) {
                return {
                    id: e.id,
                    version: e.version,
                    createTime: Wi(e.createTime)
                }
            }(t)), R.resolve()
        }
        getNamedQuery(e, t) {
            return R.resolve(this.Br.get(t))
        }
        saveNamedQuery(e, t) {
            return this.Br.set(t.name, function(e) {
                return {
                    name: e.name,
                    query: ba(e.bundledQuery),
                    readTime: Wi(e.readTime)
                }
            }(t)), R.resolve()
        }
    },
    za = class {
        constructor() {
            this.overlays = new zt(I.comparator), this.Lr = new Map
        }
        getOverlay(e, t) {
            return R.resolve(this.overlays.get(t))
        }
        getOverlays(e, t) {
            let n = kr();
            return R.forEach(t, (t => this.getOverlay(e, t).next((e => {
                e !== null && n.set(t, e)
            })))).next((() => n))
        }
        saveOverlays(e, t, n) {
            return n.forEach(((n, r) => {
                this.St(e, t, r)
            })), R.resolve()
        }
        removeOverlaysForBatchId(e, t, n) {
            let r = this.Lr.get(n);
            return r !== void 0 && (r.forEach((e => this.overlays = this.overlays.remove(e))), this.Lr.delete(n)), R.resolve()
        }
        getOverlaysForCollection(e, t, n) {
            let r = kr(),
                i = t.length + 1,
                a = new I(t.child(``)),
                o = this.overlays.getIteratorFrom(a);
            for (; o.hasNext();) {
                let e = o.getNext().value,
                    a = e.getKey();
                if (!t.isPrefixOf(a.path)) break;
                a.path.length === i && e.largestBatchId > n && r.set(e.getKey(), e)
            }
            return R.resolve(r)
        }
        getOverlaysForCollectionGroup(e, t, n, r) {
            let i = new zt(((e, t) => e - t)),
                a = this.overlays.getIterator();
            for (; a.hasNext();) {
                let e = a.getNext().value;
                if (e.getKey().getCollectionGroup() === t && e.largestBatchId > n) {
                    let t = i.get(e.largestBatchId);
                    t === null && (t = kr(), i = i.insert(e.largestBatchId, t)), t.set(e.getKey(), e)
                }
            }
            let o = kr(),
                s = i.getIterator();
            for (; s.hasNext() && (s.getNext().value.forEach(((e, t) => o.set(e, t))), !(o.size() >= r)););
            return R.resolve(o)
        }
        St(e, t, n) {
            let r = this.overlays.get(n.key);
            if (r !== null) {
                let e = this.Lr.get(r.largestBatchId).delete(n.key);
                this.Lr.set(r.largestBatchId, e)
            }
            this.overlays = this.overlays.insert(n.key, new gi(t, n));
            let i = this.Lr.get(t);
            i === void 0 && (i = B(), this.Lr.set(t, i)), this.Lr.set(t, i.add(n.key))
        }
    },
    Ba = class {
        constructor() {
            this.sessionToken = Gt.EMPTY_BYTE_STRING
        }
        getSessionToken(e) {
            return R.resolve(this.sessionToken)
        }
        setSessionToken(e, t) {
            return this.sessionToken = t, R.resolve()
        }
    },
    Va = class {
        constructor() {
            this.kr = new Vt(Ha.qr), this.Kr = new Vt(Ha.Ur)
        }
        isEmpty() {
            return this.kr.isEmpty()
        }
        addReference(e, t) {
            let n = new Ha(e, t);
            this.kr = this.kr.add(n), this.Kr = this.Kr.add(n)
        }
        $r(e, t) {
            e.forEach((e => this.addReference(e, t)))
        }
        removeReference(e, t) {
            this.Wr(new Ha(e, t))
        }
        Qr(e, t) {
            e.forEach((e => this.removeReference(e, t)))
        }
        Gr(e) {
            let t = new I(new tt([])),
                n = new Ha(t, e),
                r = new Ha(t, e + 1),
                i = [];
            return this.Kr.forEachInRange([n, r], (e => {
                this.Wr(e), i.push(e.key)
            })), i
        }
        zr() {
            this.kr.forEach((e => this.Wr(e)))
        }
        Wr(e) {
            this.kr = this.kr.delete(e), this.Kr = this.Kr.delete(e)
        }
        jr(e) {
            let t = new I(new tt([])),
                n = new Ha(t, e),
                r = new Ha(t, e + 1),
                i = B();
            return this.Kr.forEachInRange([n, r], (e => {
                i = i.add(e.key)
            })), i
        }
        containsKey(e) {
            let t = new Ha(e, 0),
                n = this.kr.firstAfterOrEqual(t);
            return n !== null && e.isEqual(n.key)
        }
    },
    Ha = class {
        constructor(e, t) {
            this.key = e, this.Jr = t
        }
        static qr(e, t) {
            return I.comparator(e.key, t.key) || F(e.Jr, t.Jr)
        }
        static Ur(e, t) {
            return F(e.Jr, t.Jr) || I.comparator(e.key, t.key)
        }
    },
    Ua = class {
        constructor(e, t) {
            this.indexManager = e, this.referenceDelegate = t, this.mutationQueue = [], this.Yn = 1, this.Hr = new Vt(Ha.qr)
        }
        checkEmpty(e) {
            return R.resolve(this.mutationQueue.length === 0)
        }
        addMutationBatch(e, t, n, r) {
            let i = this.Yn;
            this.Yn++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
            let a = new mi(i, t, n, r);
            this.mutationQueue.push(a);
            for (let t of r) this.Hr = this.Hr.add(new Ha(t.key, i)), this.indexManager.addToCollectionParentIndex(e, t.key.path.popLast());
            return R.resolve(a)
        }
        lookupMutationBatch(e, t) {
            return R.resolve(this.Zr(t))
        }
        getNextMutationBatchAfterBatchId(e, t) {
            let n = t + 1,
                r = this.Xr(n),
                i = r < 0 ? 0 : r;
            return R.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null)
        }
        getHighestUnacknowledgedBatchId() {
            return R.resolve(this.mutationQueue.length === 0 ? Ot : this.Yn - 1)
        }
        getAllMutationBatches(e) {
            return R.resolve(this.mutationQueue.slice())
        }
        getAllMutationBatchesAffectingDocumentKey(e, t) {
            let n = new Ha(t, 0),
                r = new Ha(t, 1 / 0),
                i = [];
            return this.Hr.forEachInRange([n, r], (e => {
                let t = this.Zr(e.Jr);
                i.push(t)
            })), R.resolve(i)
        }
        getAllMutationBatchesAffectingDocumentKeys(e, t) {
            let n = new Vt(F);
            return t.forEach((e => {
                let t = new Ha(e, 0),
                    r = new Ha(e, 1 / 0);
                this.Hr.forEachInRange([t, r], (e => {
                    n = n.add(e.Jr)
                }))
            })), R.resolve(this.Yr(n))
        }
        getAllMutationBatchesAffectingQuery(e, t) {
            let n = t.path,
                r = n.length + 1,
                i = n;
            I.isDocumentKey(i) || (i = i.child(``));
            let a = new Ha(new I(i), 0),
                o = new Vt(F);
            return this.Hr.forEachWhile((e => {
                let t = e.key.path;
                return !!n.isPrefixOf(t) && (t.length === r && (o = o.add(e.Jr)), !0)
            }), a), R.resolve(this.Yr(o))
        }
        Yr(e) {
            let t = [];
            return e.forEach((e => {
                let n = this.Zr(e);
                n !== null && t.push(n)
            })), t
        }
        removeMutationBatch(e, t) {
            j(this.ei(t.batchId, `removed`) === 0, 55003), this.mutationQueue.shift();
            let n = this.Hr;
            return R.forEach(t.mutations, (r => {
                let i = new Ha(r.key, t.batchId);
                return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(e, r.key)
            })).next((() => {
                this.Hr = n
            }))
        }
        nr(e) {}
        containsKey(e, t) {
            let n = new Ha(t, 0),
                r = this.Hr.firstAfterOrEqual(n);
            return R.resolve(t.isEqual(r && r.key))
        }
        performConsistencyCheck(e) {
            return this.mutationQueue.length, R.resolve()
        }
        ei(e, t) {
            return this.Xr(e)
        }
        Xr(e) {
            return this.mutationQueue.length === 0 ? 0 : e - this.mutationQueue[0].batchId
        }
        Zr(e) {
            let t = this.Xr(e);
            return t < 0 || t >= this.mutationQueue.length ? null : this.mutationQueue[t]
        }
    },
    Wa = class {
        constructor(e) {
            this.ti = e, this.docs = function() {
                return new zt(I.comparator)
            }(), this.size = 0
        }
        setIndexManager(e) {
            this.indexManager = e
        }
        addEntry(e, t) {
            let n = t.key,
                r = this.docs.get(n),
                i = r ? r.size : 0,
                a = this.ti(t);
            return this.docs = this.docs.insert(n, {
                document: t.mutableCopy(),
                size: a
            }), this.size += a - i, this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
        }
        removeEntry(e) {
            let t = this.docs.get(e);
            t && (this.docs = this.docs.remove(e), this.size -= t.size)
        }
        getEntry(e, t) {
            let n = this.docs.get(t);
            return R.resolve(n ? n.document.mutableCopy() : Mn.newInvalidDocument(t))
        }
        getEntries(e, t) {
            let n = Tr();
            return t.forEach((e => {
                let t = this.docs.get(e);
                n = n.insert(e, t ? t.document.mutableCopy() : Mn.newInvalidDocument(e))
            })), R.resolve(n)
        }
        getDocumentsMatchingQuery(e, t, n, r) {
            let i = Tr(),
                a = t.path,
                o = new I(a.child(`__id-9223372036854775808__`)),
                s = this.docs.getIteratorFrom(o);
            for (; s.hasNext();) {
                let {
                    key: e,
                    value: {
                        document: o
                    }
                } = s.getNext();
                if (!a.isPrefixOf(e.path)) break;
                e.path.length > a.length + 1 || xt(yt(o), n) <= 0 || (r.has(o.key) || yr(t, o)) && (i = i.insert(o.key, o.mutableCopy()))
            }
            return R.resolve(i)
        }
        getAllFromCollectionGroup(e, t, n, r) {
            A(9500)
        }
        ni(e, t) {
            return R.forEach(this.docs, (e => t(e)))
        }
        newChangeBuffer(e) {
            return new Ga(this)
        }
        getSize(e) {
            return R.resolve(this.size)
        }
    },
    Ga = class extends Fa {
        constructor(e) {
            super(), this.Mr = e
        }
        applyChanges(e) {
            let t = [];
            return this.changes.forEach(((n, r) => {
                r.isValidDocument() ? t.push(this.Mr.addEntry(e, r)) : this.Mr.removeEntry(n)
            })), R.waitFor(t)
        }
        getFromCache(e, t) {
            return this.Mr.getEntry(e, t)
        }
        getAllFromCache(e, t) {
            return this.Mr.getEntries(e, t)
        }
    },
    Ka = class {
        constructor(e) {
            this.persistence = e, this.ri = new Cr((e => rr(e)), ir), this.lastRemoteSnapshotVersion = L.min(), this.highestTargetId = 0, this.ii = 0, this.si = new Va, this.targetCount = 0, this.oi = Da._r()
        }
        forEachTarget(e, t) {
            return this.ri.forEach(((e, n) => t(n))), R.resolve()
        }
        getLastRemoteSnapshotVersion(e) {
            return R.resolve(this.lastRemoteSnapshotVersion)
        }
        getHighestSequenceNumber(e) {
            return R.resolve(this.ii)
        }
        allocateTargetId(e) {
            return this.highestTargetId = this.oi.next(), R.resolve(this.highestTargetId)
        }
        setTargetsMetadata(e, t, n) {
            return n && (this.lastRemoteSnapshotVersion = n), t > this.ii && (this.ii = t), R.resolve()
        }
        lr(e) {
            this.ri.set(e.target, e);
            let t = e.targetId;
            t > this.highestTargetId && (this.oi = new Da(t), this.highestTargetId = t), e.sequenceNumber > this.ii && (this.ii = e.sequenceNumber)
        }
        addTargetData(e, t) {
            return this.lr(t), this.targetCount += 1, R.resolve()
        }
        updateTargetData(e, t) {
            return this.lr(t), R.resolve()
        }
        removeTargetData(e, t) {
            return this.ri.delete(t.target), this.si.Gr(t.targetId), --this.targetCount, R.resolve()
        }
        removeTargets(e, t, n) {
            let r = 0,
                i = [];
            return this.ri.forEach(((a, o) => {
                o.sequenceNumber <= t && n.get(o.targetId) === null && (this.ri.delete(a), i.push(this.removeMatchingKeysForTargetId(e, o.targetId)), r++)
            })), R.waitFor(i).next((() => r))
        }
        getTargetCount(e) {
            return R.resolve(this.targetCount)
        }
        getTargetData(e, t) {
            let n = this.ri.get(t) || null;
            return R.resolve(n)
        }
        addMatchingKeys(e, t, n) {
            return this.si.$r(t, n), R.resolve()
        }
        removeMatchingKeys(e, t, n) {
            this.si.Qr(t, n);
            let r = this.persistence.referenceDelegate,
                i = [];
            return r && t.forEach((t => {
                i.push(r.markPotentiallyOrphaned(e, t))
            })), R.waitFor(i)
        }
        removeMatchingKeysForTargetId(e, t) {
            return this.si.Gr(t), R.resolve()
        }
        getMatchingKeysForTargetId(e, t) {
            let n = this.si.jr(t);
            return R.resolve(n)
        }
        containsKey(e, t) {
            return R.resolve(this.si.containsKey(t))
        }
    },
    qa = class {
        constructor(e, t) {
            this._i = {}, this.overlays = {}, this.ai = new Dt(0), this.ui = !1, this.ui = !0, this.ci = new Ba, this.referenceDelegate = e(this), this.li = new Ka(this), this.indexManager = new Sa, this.remoteDocumentCache = function(e) {
                return new Wa(e)
            }((e => this.referenceDelegate.hi(e))), this.serializer = new ya(t), this.Pi = new Ra(this.serializer)
        }
        start() {
            return Promise.resolve()
        }
        shutdown() {
            return this.ui = !1, Promise.resolve()
        }
        get started() {
            return this.ui
        }
        setDatabaseDeletedListener() {}
        setNetworkEnabled() {}
        getIndexManager(e) {
            return this.indexManager
        }
        getDocumentOverlayCache(e) {
            let t = this.overlays[e.toKey()];
            return t || (t = new za, this.overlays[e.toKey()] = t), t
        }
        getMutationQueue(e, t) {
            let n = this._i[e.toKey()];
            return n || (n = new Ua(t, this.referenceDelegate), this._i[e.toKey()] = n), n
        }
        getGlobalsCache() {
            return this.ci
        }
        getTargetCache() {
            return this.li
        }
        getRemoteDocumentCache() {
            return this.remoteDocumentCache
        }
        getBundleCache() {
            return this.Pi
        }
        runTransaction(e, t, n) {
            k(`MemoryPersistence`, `Starting transaction:`, e);
            let r = new Ja(this.ai.next());
            return this.referenceDelegate.Ti(), n(r).next((e => this.referenceDelegate.Ei(r).next((() => e)))).toPromise().then((e => (r.raiseOnCommittedEvent(), e)))
        }
        Ii(e, t) {
            return R.or(Object.values(this._i).map((n => () => n.containsKey(e, t))))
        }
    },
    Ja = class extends Ct {
        constructor(e) {
            super(), this.currentSequenceNumber = e
        }
    },
    Ya = class e {
        constructor(e) {
            this.persistence = e, this.Ri = new Va, this.Ai = null
        }
        static Vi(t) {
            return new e(t)
        }
        get di() {
            if (this.Ai) return this.Ai;
            throw A(60996)
        }
        addReference(e, t, n) {
            return this.Ri.addReference(n, t), this.di.delete(n.toString()), R.resolve()
        }
        removeReference(e, t, n) {
            return this.Ri.removeReference(n, t), this.di.add(n.toString()), R.resolve()
        }
        markPotentiallyOrphaned(e, t) {
            return this.di.add(t.toString()), R.resolve()
        }
        removeTarget(e, t) {
            this.Ri.Gr(t.targetId).forEach((e => this.di.add(e.toString())));
            let n = this.persistence.getTargetCache();
            return n.getMatchingKeysForTargetId(e, t.targetId).next((e => {
                e.forEach((e => this.di.add(e.toString())))
            })).next((() => n.removeTargetData(e, t)))
        }
        Ti() {
            this.Ai = new Set
        }
        Ei(e) {
            let t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
            return R.forEach(this.di, (n => {
                let r = I.fromPath(n);
                return this.mi(e, r).next((e => {
                    e || t.removeEntry(r, L.min())
                }))
            })).next((() => (this.Ai = null, t.apply(e))))
        }
        updateLimboDocument(e, t) {
            return this.mi(e, t).next((e => {
                e ? this.di.delete(t.toString()) : this.di.add(t.toString())
            }))
        }
        hi(e) {
            return 0
        }
        mi(e, t) {
            return R.or([() => R.resolve(this.Ri.containsKey(t)), () => this.persistence.getTargetCache().containsKey(e, t), () => this.persistence.Ii(e, t)])
        }
    },
    Xa = class e {
        constructor(e, t) {
            this.persistence = e, this.fi = new Cr((e => Nt(e.path)), ((e, t) => e.isEqual(t))), this.garbageCollector = Pa(this, t)
        }
        static Vi(t, n) {
            return new e(t, n)
        }
        Ti() {}
        Ei(e) {
            return R.resolve()
        }
        forEachTarget(e, t) {
            return this.persistence.getTargetCache().forEachTarget(e, t)
        }
        dr(e) {
            let t = this.pr(e);
            return this.persistence.getTargetCache().getTargetCount(e).next((e => t.next((t => e + t))))
        }
        pr(e) {
            let t = 0;
            return this.mr(e, (e => {
                t++
            })).next((() => t))
        }
        mr(e, t) {
            return R.forEach(this.fi, ((n, r) => this.wr(e, n, r).next((e => e ? R.resolve() : t(r)))))
        }
        removeTargets(e, t, n) {
            return this.persistence.getTargetCache().removeTargets(e, t, n)
        }
        removeOrphanedDocuments(e, t) {
            let n = 0,
                r = this.persistence.getRemoteDocumentCache(),
                i = r.newChangeBuffer();
            return r.ni(e, (r => this.wr(e, r, t).next((e => {
                e || (n++, i.removeEntry(r, L.min()))
            })))).next((() => i.apply(e))).next((() => n))
        }
        markPotentiallyOrphaned(e, t) {
            return this.fi.set(t, e.currentSequenceNumber), R.resolve()
        }
        removeTarget(e, t) {
            let n = t.withSequenceNumber(e.currentSequenceNumber);
            return this.persistence.getTargetCache().updateTargetData(e, n)
        }
        addReference(e, t, n) {
            return this.fi.set(n, e.currentSequenceNumber), R.resolve()
        }
        removeReference(e, t, n) {
            return this.fi.set(n, e.currentSequenceNumber), R.resolve()
        }
        updateLimboDocument(e, t) {
            return this.fi.set(t, e.currentSequenceNumber), R.resolve()
        }
        hi(e) {
            let t = e.key.toString().length;
            return e.isFoundDocument() && (t += xn(e.data.value)), t
        }
        wr(e, t, n) {
            return R.or([() => this.persistence.Ii(e, t), () => this.persistence.getTargetCache().containsKey(e, t), () => {
                let e = this.fi.get(t);
                return R.resolve(e !== void 0 && e > n)
            }])
        }
        getCacheSize(e) {
            return this.persistence.getRemoteDocumentCache().getSize(e)
        }
    },
    Za = class e {
        constructor(e, t, n, r) {
            this.targetId = e, this.fromCache = t, this.Ts = n, this.Es = r
        }
        static Is(t, n) {
            let r = B(),
                i = B();
            for (let e of n.docChanges) switch (e.type) {
                case 0:
                    r = r.add(e.doc.key);
                    break;
                case 1:
                    i = i.add(e.doc.key)
            }
            return new e(t, n.fromCache, r, i)
        }
    },
    Qa = class {
        constructor() {
            this._documentReadCount = 0
        }
        get documentReadCount() {
            return this._documentReadCount
        }
        incrementDocumentReadCount(e) {
            this._documentReadCount += e
        }
    },
    $a = class {
        constructor() {
            this.Rs = !1, this.As = !1, this.Vs = 100, this.ds = function() {
                return u() ? 8 : Tt(f()) > 0 ? 6 : 4
            }()
        }
        initialize(e, t) {
            this.fs = e, this.indexManager = t, this.Rs = !0
        }
        getDocumentsMatchingQuery(e, t, n, r) {
            let i = {
                result: null
            };
            return this.gs(e, t).next((e => {
                i.result = e
            })).next((() => {
                if (!i.result) return this.ps(e, t, r, n).next((e => {
                    i.result = e
                }))
            })).next((() => {
                if (i.result) return;
                let n = new Qa;
                return this.ys(e, t, n).next((r => {
                    if (i.result = r, this.As) return this.ws(e, t, n, r.size)
                }))
            })).next((() => i.result))
        }
        ws(e, t, n, r) {
            return n.documentReadCount < this.Vs ? (Me() <= x.DEBUG && k(`QueryEngine`, `SDK will not create cache indexes for query:`, vr(t), `since it only creates cache indexes for collection contains`, `more than or equal to`, this.Vs, `documents`), R.resolve()) : (Me() <= x.DEBUG && k(`QueryEngine`, `Query:`, vr(t), `scans`, n.documentReadCount, `local documents and returns`, r, `documents as results.`), n.documentReadCount > this.ds * r ? (Me() <= x.DEBUG && k(`QueryEngine`, `The SDK decides to create cache indexes for query:`, vr(t), `as using cache indexes may help improve performance.`), this.indexManager.createTargetIndexes(e, pr(t))) : R.resolve())
        }
        gs(e, t) {
            if (lr(t)) return R.resolve(null);
            let n = pr(t);
            return this.indexManager.getIndexType(e, n).next((r => r === 0 ? null : (t.limit !== null && r === 1 && (t = hr(t, null, `F`), n = pr(t)), this.indexManager.getDocumentsMatchingTarget(e, n).next((r => {
                let i = B(...r);
                return this.fs.getDocuments(e, i).next((r => this.indexManager.getMinOffset(e, n).next((n => {
                    let a = this.Ss(t, r);
                    return this.bs(t, a, i, n.readTime) ? this.gs(e, hr(t, null, `F`)) : this.Ds(e, a, t, n)
                }))))
            })))))
        }
        ps(e, t, n, r) {
            return lr(t) || r.isEqual(L.min()) ? R.resolve(null) : this.fs.getDocuments(e, n).next((i => {
                let a = this.Ss(t, i);
                return this.bs(t, a, n, r) ? R.resolve(null) : (Me() <= x.DEBUG && k(`QueryEngine`, `Re-using previous result from %s to execute query: %s`, r.toString(), vr(t)), this.Ds(e, a, t, vt(r, gt)).next((e => e)))
            }))
        }
        Ss(e, t) {
            let n = new Vt(xr(e));
            return t.forEach(((t, r) => {
                yr(e, r) && (n = n.add(r))
            })), n
        }
        bs(e, t, n, r) {
            if (e.limit === null) return !1;
            if (n.size !== t.size) return !0;
            let i = e.limitType === `F` ? t.last() : t.first();
            return !!i && (i.hasPendingWrites || i.version.compareTo(r) > 0)
        }
        ys(e, t, n) {
            return Me() <= x.DEBUG && k(`QueryEngine`, `Using full collection scan to execute query:`, vr(t)), this.fs.getDocumentsMatchingQuery(e, t, bt.min(), n)
        }
        Ds(e, t, n, r) {
            return this.fs.getDocumentsMatchingQuery(e, n, r).next((e => (t.forEach((t => {
                e = e.insert(t.key, t)
            })), e)))
        }
    },
    eo = `LocalStore`,
    to = 3e8,
    no = class {
        constructor(e, t, n, r) {
            this.persistence = e, this.Cs = t, this.serializer = r, this.vs = new zt(F), this.Fs = new Cr((e => rr(e)), ir), this.Ms = new Map, this.xs = e.getRemoteDocumentCache(), this.li = e.getTargetCache(), this.Pi = e.getBundleCache(), this.Os(n)
        }
        Os(e) {
            this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e), this.indexManager = this.persistence.getIndexManager(e), this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager), this.localDocuments = new La(this.xs, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.xs.setIndexManager(this.indexManager), this.Cs.initialize(this.localDocuments, this.indexManager)
        }
        collectGarbage(e) {
            return this.persistence.runTransaction(`Collect garbage`, `readwrite-primary`, (t => e.collect(t, this.vs)))
        }
    };

function ro(e, t, n, r) {
    return new no(e, t, n, r)
}
async function io(e, t) {
    let n = M(e);
    return await n.persistence.runTransaction(`Handle user change`, `readonly`, (e => {
        let r;
        return n.mutationQueue.getAllMutationBatches(e).next((i => (r = i, n.Os(t), n.mutationQueue.getAllMutationBatches(e)))).next((t => {
            let i = [],
                a = [],
                o = B();
            for (let e of r) {
                i.push(e.batchId);
                for (let t of e.mutations) o = o.add(t.key)
            }
            for (let e of t) {
                a.push(e.batchId);
                for (let t of e.mutations) o = o.add(t.key)
            }
            return n.localDocuments.getDocuments(e, o).next((e => ({
                Ns: e,
                removedBatchIds: i,
                addedBatchIds: a
            })))
        }))
    }))
}

function ao(e, t) {
    let n = M(e);
    return n.persistence.runTransaction(`Acknowledge batch`, `readwrite-primary`, (e => {
        let r = t.batch.keys(),
            i = n.xs.newChangeBuffer({
                trackRemovals: !0
            });
        return function(e, t, n, r) {
            let i = n.batch,
                a = i.keys(),
                o = R.resolve();
            return a.forEach((e => {
                o = o.next((() => r.getEntry(t, e))).next((t => {
                    let a = n.docVersions.get(e);
                    j(a !== null, 48541), t.version.compareTo(a) < 0 && (i.applyToRemoteDocument(t, n), t.isValidDocument() && (t.setReadTime(n.commitVersion), r.addEntry(t)))
                }))
            })), o.next((() => e.mutationQueue.removeMutationBatch(t, i)))
        }(n, e, t, i).next((() => i.apply(e))).next((() => n.mutationQueue.performConsistencyCheck(e))).next((() => n.documentOverlayCache.removeOverlaysForBatchId(e, r, t.batch.batchId))).next((() => n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e, function(e) {
            let t = B();
            for (let n = 0; n < e.mutationResults.length; ++n) e.mutationResults[n].transformResults.length > 0 && (t = t.add(e.batch.mutations[n].key));
            return t
        }(t)))).next((() => n.localDocuments.getDocuments(e, r)))
    }))
}

function oo(e) {
    let t = M(e);
    return t.persistence.runTransaction(`Get last remote snapshot version`, `readonly`, (e => t.li.getLastRemoteSnapshotVersion(e)))
}

function so(e, t) {
    let n = M(e),
        r = t.snapshotVersion,
        i = n.vs;
    return n.persistence.runTransaction(`Apply remote event`, `readwrite-primary`, (e => {
        let a = n.xs.newChangeBuffer({
            trackRemovals: !0
        });
        i = n.vs;
        let o = [];
        t.targetChanges.forEach(((a, s) => {
            let c = i.get(s);
            if (!c) return;
            o.push(n.li.removeMatchingKeys(e, a.removedDocuments, s).next((() => n.li.addMatchingKeys(e, a.addedDocuments, s))));
            let l = c.withSequenceNumber(e.currentSequenceNumber);
            t.targetMismatches.get(s) === null ? a.resumeToken.approximateByteSize() > 0 && (l = l.withResumeToken(a.resumeToken, r)) : l = l.withResumeToken(Gt.EMPTY_BYTE_STRING, L.min()).withLastLimboFreeSnapshotVersion(L.min()), i = i.insert(s, l),
                function(e, t, n) {
                    return e.resumeToken.approximateByteSize() === 0 || t.snapshotVersion.toMicroseconds() - e.snapshotVersion.toMicroseconds() >= to ? !0 : n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0
                }(c, l, a) && o.push(n.li.updateTargetData(e, l))
        }));
        let s = Tr(),
            c = B();
        if (t.documentUpdates.forEach((r => {
                t.resolvedLimboDocuments.has(r) && o.push(n.persistence.referenceDelegate.updateLimboDocument(e, r))
            })), o.push(co(e, a, t.documentUpdates).next((e => {
                s = e.Bs, c = e.Ls
            }))), !r.isEqual(L.min())) {
            let t = n.li.getLastRemoteSnapshotVersion(e).next((t => n.li.setTargetsMetadata(e, e.currentSequenceNumber, r)));
            o.push(t)
        }
        return R.waitFor(o).next((() => a.apply(e))).next((() => n.localDocuments.getLocalViewOfDocuments(e, s, c))).next((() => s))
    })).then((e => (n.vs = i, e)))
}

function co(e, t, n) {
    let r = B(),
        i = B();
    return n.forEach((e => r = r.add(e))), t.getEntries(e, r).next((e => {
        let r = Tr();
        return n.forEach(((n, a) => {
            let o = e.get(n);
            a.isFoundDocument() !== o.isFoundDocument() && (i = i.add(n)), a.isNoDocument() && a.version.isEqual(L.min()) ? (t.removeEntry(n, a.readTime), r = r.insert(n, a)) : !o.isValidDocument() || a.version.compareTo(o.version) > 0 || a.version.compareTo(o.version) === 0 && o.hasPendingWrites ? (t.addEntry(a), r = r.insert(n, a)) : k(eo, `Ignoring outdated watch update for `, n, `. Current version:`, o.version, ` Watch version:`, a.version)
        })), {
            Bs: r,
            Ls: i
        }
    }))
}

function lo(e, t) {
    let n = M(e);
    return n.persistence.runTransaction(`Get next mutation batch`, `readonly`, (e => (t === void 0 && (t = Ot), n.mutationQueue.getNextMutationBatchAfterBatchId(e, t))))
}

function U(e, t) {
    let n = M(e);
    return n.persistence.runTransaction(`Allocate target`, `readwrite`, (e => {
        let r;
        return n.li.getTargetData(e, t).next((i => i ? (r = i, R.resolve(r)) : n.li.allocateTargetId(e).next((i => (r = new va(t, i, `TargetPurposeListen`, e.currentSequenceNumber), n.li.addTargetData(e, r).next((() => r)))))))
    })).then((e => {
        let r = n.vs.get(e.targetId);
        return (r === null || e.snapshotVersion.compareTo(r.snapshotVersion) > 0) && (n.vs = n.vs.insert(e.targetId, e), n.Fs.set(t, e.targetId)), e
    }))
}
async function W(e, t, n) {
    let r = M(e),
        i = r.vs.get(t),
        a = n ? `readwrite` : `readwrite-primary`;
    try {
        n || await r.persistence.runTransaction(`Release target`, a, (e => r.persistence.referenceDelegate.removeTarget(e, i)))
    } catch (e) {
        if (!Et(e)) throw e;
        k(eo, `Failed to update sequence numbers for target ${t}: ${e}`)
    }
    r.vs = r.vs.remove(t), r.Fs.delete(i.target)
}

function uo(e, t, n) {
    let r = M(e),
        i = L.min(),
        a = B();
    return r.persistence.runTransaction(`Execute query`, `readwrite`, (e => function(e, t, n) {
        let r = M(e),
            i = r.Fs.get(n);
        return i === void 0 ? r.li.getTargetData(t, n) : R.resolve(r.vs.get(i))
    }(r, e, pr(t)).next((t => {
        if (t) return i = t.lastLimboFreeSnapshotVersion, r.li.getMatchingKeysForTargetId(e, t.targetId).next((e => {
            a = e
        }))
    })).next((() => r.Cs.getDocumentsMatchingQuery(e, t, n ? i : L.min(), n ? a : B()))).next((e => (fo(r, br(t), e), {
        documents: e,
        ks: a
    })))))
}

function fo(e, t, n) {
    let r = e.Ms.get(t) || L.min();
    n.forEach(((e, t) => {
        t.readTime.compareTo(r) > 0 && (r = t.readTime)
    })), e.Ms.set(t, r)
}
var po = class {
        constructor() {
            this.activeTargetIds = Fr()
        }
        Qs(e) {
            this.activeTargetIds = this.activeTargetIds.add(e)
        }
        Gs(e) {
            this.activeTargetIds = this.activeTargetIds.delete(e)
        }
        Ws() {
            let e = {
                activeTargetIds: this.activeTargetIds.toArray(),
                updateTimeMs: Date.now()
            };
            return JSON.stringify(e)
        }
    },
    mo = class {
        constructor() {
            this.vo = new po, this.Fo = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null
        }
        addPendingMutation(e) {}
        updateMutationState(e, t, n) {}
        addLocalQueryTarget(e, t = !0) {
            return t && this.vo.Qs(e), this.Fo[e] || `not-current`
        }
        updateQueryState(e, t, n) {
            this.Fo[e] = t
        }
        removeLocalQueryTarget(e) {
            this.vo.Gs(e)
        }
        isLocalQueryTarget(e) {
            return this.vo.activeTargetIds.has(e)
        }
        clearQueryState(e) {
            delete this.Fo[e]
        }
        getAllActiveQueryTargets() {
            return this.vo.activeTargetIds
        }
        isActiveQueryTarget(e) {
            return this.vo.activeTargetIds.has(e)
        }
        start() {
            return this.vo = new po, Promise.resolve()
        }
        handleUserChange(e, t, n) {}
        setOnlineState(e) {}
        shutdown() {}
        writeSequenceNumber(e) {}
        notifyBundleLoaded(e) {}
    },
    ho = class {
        Mo(e) {}
        shutdown() {}
    },
    go = `ConnectivityMonitor`,
    _o = class {
        constructor() {
            this.xo = () => this.Oo(), this.No = () => this.Bo(), this.Lo = [], this.ko()
        }
        Mo(e) {
            this.Lo.push(e)
        }
        shutdown() {
            window.removeEventListener(`online`, this.xo), window.removeEventListener(`offline`, this.No)
        }
        ko() {
            window.addEventListener(`online`, this.xo), window.addEventListener(`offline`, this.No)
        }
        Oo() {
            k(go, `Network connectivity changed: AVAILABLE`);
            for (let e of this.Lo) e(0)
        }
        Bo() {
            k(go, `Network connectivity changed: UNAVAILABLE`);
            for (let e of this.Lo) e(1)
        }
        static v() {
            return typeof window < `u` && window.addEventListener !== void 0 && window.removeEventListener !== void 0
        }
    },
    vo = null;

function yo() {
    return vo === null ? vo = function() {
        return 268435456 + Math.round(2147483648 * Math.random())
    }() : vo++, `0x` + vo.toString(16)
}
var bo = `RestConnection`,
    xo = {
        BatchGetDocuments: `batchGet`,
        Commit: `commit`,
        RunQuery: `runQuery`,
        RunAggregationQuery: `runAggregationQuery`,
        ExecutePipeline: `executePipeline`
    },
    So = class {
        get qo() {
            return !1
        }
        constructor(e) {
            this.databaseInfo = e, this.databaseId = e.databaseId;
            let t = e.ssl ? `https` : `http`,
                n = encodeURIComponent(this.databaseId.projectId),
                r = encodeURIComponent(this.databaseId.database);
            this.Ko = t + `://` + e.host, this.Uo = `projects/${n}/databases/${r}`, this.$o = this.databaseId.database === an ? `project_id=${n}` : `project_id=${n}&database_id=${r}`
        }
        Wo(e, t, r, i, a) {
            let o = yo(),
                s = this.Qo(e, t.toUriEncodedString());
            k(bo, `Sending RPC '${e}' ${o}:`, s, r);
            let c = {
                "google-cloud-resource-prefix": this.Uo,
                "x-goog-request-params": this.$o
            };
            this.Go(c, i, a);
            let {
                host: l
            } = new URL(s), u = n(l);
            return this.zo(e, s, c, r, u).then((t => (k(bo, `Received RPC '${e}' ${o}: `, t), t)), (t => {
                throw Pe(bo, `RPC '${e}' ${o} failed with error: `, t, `url: `, s, `request:`, r), t
            }))
        }
        jo(e, t, n, r, i, a) {
            return this.Wo(e, t, n, r, i)
        }
        Go(e, t, n) {
            e[`X-Goog-Api-Client`] = function() {
                return `gl-js/ fire/` + ke
            }(), e[`Content-Type`] = `text/plain`, this.databaseInfo.appId && (e[`X-Firebase-GMPID`] = this.databaseInfo.appId), t && t.headers.forEach(((t, n) => e[n] = t)), n && n.headers.forEach(((t, n) => e[n] = t))
        }
        Qo(e, t) {
            let n = xo[e],
                r = `${this.Ko}/v1/${t}:${n}`;
            return this.databaseInfo.apiKey && (r = `${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`), r
        }
        terminate() {}
    },
    Co = class {
        constructor(e) {
            this.Jo = e.Jo, this.Ho = e.Ho
        }
        Zo(e) {
            this.Xo = e
        }
        Yo(e) {
            this.e_ = e
        }
        t_(e) {
            this.n_ = e
        }
        onMessage(e) {
            this.r_ = e
        }
        close() {
            this.Ho()
        }
        send(e) {
            this.Jo(e)
        }
        i_() {
            this.Xo()
        }
        s_() {
            this.e_()
        }
        o_(e) {
            this.n_(e)
        }
        __(e) {
            this.r_(e)
        }
    },
    wo = `WebChannelConnection`,
    To = (e, t, n) => {
        e.listen(t, (e => {
            try {
                n(e)
            } catch (e) {
                setTimeout((() => {
                    throw e
                }), 0)
            }
        }))
    },
    Eo = class e extends So {
        constructor(e) {
            super(e), this.a_ = [], this.forceLongPolling = e.forceLongPolling, this.autoDetectLongPolling = e.autoDetectLongPolling, this.useFetchStreams = e.useFetchStreams, this.longPollingOptions = e.longPollingOptions
        }
        static u_() {
            e.c_ ||= (To(Ee(), Te.STAT_EVENT, (e => {
                e.stat === we.PROXY ? k(wo, `STAT_EVENT: detected buffering proxy`) : e.stat === we.NOPROXY && k(wo, `STAT_EVENT: detected no buffering proxy`)
            })), !0)
        }
        zo(e, t, n, r, i) {
            let a = yo();
            return new Promise(((i, o) => {
                let s = new be;
                s.setWithCredentials(!0), s.listenOnce(Se.COMPLETE, (() => {
                    try {
                        switch (s.getLastErrorCode()) {
                            case Ce.NO_ERROR:
                                let t = s.getResponseJson();
                                k(wo, `XHR for RPC '${e}' ${a} received:`, JSON.stringify(t)), i(t);
                                break;
                            case Ce.TIMEOUT:
                                k(wo, `RPC '${e}' ${a} timed out`), o(new P(N.DEADLINE_EXCEEDED, `Request time out`));
                                break;
                            case Ce.HTTP_ERROR:
                                let n = s.getStatus();
                                if (k(wo, `RPC '${e}' ${a} failed with status:`, n, `response text:`, s.getResponseText()), n > 0) {
                                    let e = s.getResponseJson();
                                    Array.isArray(e) && (e = e[0]);
                                    let t = e?.error;
                                    t && t.status && t.message ? o(new P(function(e) {
                                        let t = e.toLowerCase().replace(/_/g, `-`);
                                        return Object.values(N).indexOf(t) >= 0 ? t : N.UNKNOWN
                                    }(t.status), t.message)) : o(new P(N.UNKNOWN, `Server responded with status ` + s.getStatus()))
                                } else o(new P(N.UNAVAILABLE, `Connection failed.`));
                                break;
                            default:
                                A(9055, {
                                    l_: e,
                                    streamId: a,
                                    h_: s.getLastErrorCode(),
                                    P_: s.getLastError()
                                })
                        }
                    } finally {
                        k(wo, `RPC '${e}' ${a} completed.`)
                    }
                }));
                let c = JSON.stringify(r);
                k(wo, `RPC '${e}' ${a} sending request:`, r), s.send(t, `POST`, c, n, 15)
            }))
        }
        T_(t, n, r) {
            let i = yo(),
                a = [this.Ko, `/`, `google.firestore.v1.Firestore`, `/`, t, `/channel`],
                o = this.createWebChannelTransport(),
                s = {
                    httpSessionIdParam: `gsessionid`,
                    initMessageHeaders: {},
                    messageUrlParams: {
                        database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
                    },
                    sendRawJson: !0,
                    supportsCrossDomainXhr: !0,
                    internalChannelParams: {
                        forwardChannelRequestTimeoutMs: 6e5
                    },
                    forceLongPolling: this.forceLongPolling,
                    detectBufferingProxy: this.autoDetectLongPolling
                },
                c = this.longPollingOptions.timeoutSeconds;
            c !== void 0 && (s.longPollingTimeout = Math.round(1e3 * c)), this.useFetchStreams && (s.useFetchStreams = !0), this.Go(s.initMessageHeaders, n, r), s.encodeInitMessageHeaders = !0;
            let l = a.join(``);
            k(wo, `Creating RPC '${t}' stream ${i}: ${l}`, s);
            let u = o.createWebChannel(l, s);
            this.E_(u);
            let d = !1,
                f = !1,
                p = new Co({
                    Jo: e => {
                        f ? k(wo, `Not sending because RPC '${t}' stream ${i} is closed:`, e) : (d ||= (k(wo, `Opening RPC '${t}' stream ${i} transport.`), u.open(), !0), k(wo, `RPC '${t}' stream ${i} sending:`, e), u.send(e))
                    },
                    Ho: () => u.close()
                });
            return To(u, xe.EventType.OPEN, (() => {
                f || (k(wo, `RPC '${t}' stream ${i} transport opened.`), p.i_())
            })), To(u, xe.EventType.CLOSE, (() => {
                f || (f = !0, k(wo, `RPC '${t}' stream ${i} transport closed`), p.o_(), this.I_(u))
            })), To(u, xe.EventType.ERROR, (e => {
                f || (f = !0, Pe(wo, `RPC '${t}' stream ${i} transport errored. Name:`, e.name, `Message:`, e.message), p.o_(new P(N.UNAVAILABLE, `The operation could not be completed`)))
            })), To(u, xe.EventType.MESSAGE, (e => {
                if (!f) {
                    let n = e.data[0];
                    j(!!n, 16349);
                    let r = n,
                        a = r?.error || r[0]?.error;
                    if (a) {
                        k(wo, `RPC '${t}' stream ${i} received error:`, a);
                        let e = a.status,
                            n = function(e) {
                                let t = vi[e];
                                if (t !== void 0) return bi(t)
                            }(e),
                            r = a.message;
                        e === `NOT_FOUND` && r.includes(`database`) && r.includes(`does not exist`) && r.includes(this.databaseId.database) && Pe(`Database '${this.databaseId.database}' not found. Please check your project configuration.`), n === void 0 && (n = N.INTERNAL, r = `Unknown error status: ` + e + ` with message ` + a.message), f = !0, p.o_(new P(n, r)), u.close()
                    } else k(wo, `RPC '${t}' stream ${i} received:`, n), p.__(n)
                }
            })), e.u_(), setTimeout((() => {
                p.s_()
            }), 0), p
        }
        terminate() {
            this.a_.forEach((e => e.close())), this.a_ = []
        }
        E_(e) {
            this.a_.push(e)
        }
        I_(e) {
            this.a_ = this.a_.filter((t => t === e))
        }
        Go(e, t, n) {
            super.Go(e, t, n), this.databaseInfo.apiKey && (e[`x-goog-api-key`] = this.databaseInfo.apiKey)
        }
        createWebChannelTransport() {
            return De()
        }
    };

function Do(e) {
    return new Eo(e)
}

function Oo() {
    return typeof document < `u` ? document : null
}

function ko(e) {
    return new zi(e, !0)
}
Eo.c_ = !1;
var Ao = class {
        constructor(e, t, n = 1e3, r = 1.5, i = 6e4) {
            this.Ci = e, this.timerId = t, this.R_ = n, this.A_ = r, this.V_ = i, this.d_ = 0, this.m_ = null, this.f_ = Date.now(), this.reset()
        }
        reset() {
            this.d_ = 0
        }
        g_() {
            this.d_ = this.V_
        }
        p_(e) {
            this.cancel();
            let t = Math.floor(this.d_ + this.y_()),
                n = Math.max(0, Date.now() - this.f_),
                r = Math.max(0, t - n);
            r > 0 && k(`ExponentialBackoff`, `Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`), this.m_ = this.Ci.enqueueAfterDelay(this.timerId, r, (() => (this.f_ = Date.now(), e()))), this.d_ *= this.A_, this.d_ < this.R_ && (this.d_ = this.R_), this.d_ > this.V_ && (this.d_ = this.V_)
        }
        w_() {
            this.m_ !== null && (this.m_.skipDelay(), this.m_ = null)
        }
        cancel() {
            this.m_ !== null && (this.m_.cancel(), this.m_ = null)
        }
        y_() {
            return (Math.random() - .5) * this.d_
        }
    },
    jo = `PersistentStream`,
    Mo = class {
        constructor(e, t, n, r, i, a, o, s) {
            this.Ci = e, this.S_ = n, this.b_ = r, this.connection = i, this.authCredentialsProvider = a, this.appCheckCredentialsProvider = o, this.listener = s, this.state = 0, this.D_ = 0, this.C_ = null, this.v_ = null, this.stream = null, this.F_ = 0, this.M_ = new Ao(e, t)
        }
        x_() {
            return this.state === 1 || this.state === 5 || this.O_()
        }
        O_() {
            return this.state === 2 || this.state === 3
        }
        start() {
            this.F_ = 0, this.state === 4 ? this.N_() : this.auth()
        }
        async stop() {
            this.x_() && await this.close(0)
        }
        B_() {
            this.state = 0, this.M_.reset()
        }
        L_() {
            this.O_() && this.C_ === null && (this.C_ = this.Ci.enqueueAfterDelay(this.S_, 6e4, (() => this.k_())))
        }
        q_(e) {
            this.K_(), this.stream.send(e)
        }
        async k_() {
            if (this.O_()) return this.close(0)
        }
        K_() {
            this.C_ &&= (this.C_.cancel(), null)
        }
        U_() {
            this.v_ &&= (this.v_.cancel(), null)
        }
        async close(e, t) {
            this.K_(), this.U_(), this.M_.cancel(), this.D_++, e === 4 ? t && t.code === N.RESOURCE_EXHAUSTED ? (Ne(t.toString()), Ne(`Using maximum backoff delay to prevent overloading the backend.`), this.M_.g_()) : t && t.code === N.UNAUTHENTICATED && this.state !== 3 && (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()) : this.M_.reset(), this.stream !== null && (this.W_(), this.stream.close(), this.stream = null), this.state = e, await this.listener.t_(t)
        }
        W_() {}
        auth() {
            this.state = 1;
            let e = this.Q_(this.D_),
                t = this.D_;
            Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then((([e, n]) => {
                this.D_ === t && this.G_(e, n)
            }), (t => {
                e((() => {
                    let e = new P(N.UNKNOWN, `Fetching auth token failed: ` + t.message);
                    return this.z_(e)
                }))
            }))
        }
        G_(e, t) {
            let n = this.Q_(this.D_);
            this.stream = this.j_(e, t), this.stream.Zo((() => {
                n((() => this.listener.Zo()))
            })), this.stream.Yo((() => {
                n((() => (this.state = 2, this.v_ = this.Ci.enqueueAfterDelay(this.b_, 1e4, (() => (this.O_() && (this.state = 3), Promise.resolve()))), this.listener.Yo())))
            })), this.stream.t_((e => {
                n((() => this.z_(e)))
            })), this.stream.onMessage((e => {
                n((() => ++this.F_ == 1 ? this.J_(e) : this.onNext(e)))
            }))
        }
        N_() {
            this.state = 5, this.M_.p_((async () => {
                this.state = 0, this.start()
            }))
        }
        z_(e) {
            return k(jo, `close with error: ${e}`), this.stream = null, this.close(4, e)
        }
        Q_(e) {
            return t => {
                this.Ci.enqueueAndForget((() => this.D_ === e ? t() : (k(jo, `stream callback skipped by getCloseGuardedDispatcher.`), Promise.resolve())))
            }
        }
    },
    No = class extends Mo {
        constructor(e, t, n, r, i, a) {
            super(e, `listen_stream_connection_backoff`, `listen_stream_idle`, `health_check_timeout`, t, n, r, a), this.serializer = i
        }
        j_(e, t) {
            return this.connection.T_(`Listen`, e, t)
        }
        J_(e) {
            return this.onNext(e)
        }
        onNext(e) {
            this.M_.reset();
            let t = ta(this.serializer, e),
                n = function(e) {
                    if (!(`targetChange` in e)) return L.min();
                    let t = e.targetChange;
                    return t.targetIds && t.targetIds.length ? L.min() : t.readTime ? Wi(t.readTime) : L.min()
                }(e);
            return this.listener.H_(t, n)
        }
        Z_(e) {
            let t = {};
            t.database = Qi(this.serializer), t.addTarget = function(e, t) {
                let n, r = t.target;
                if (n = ar(r) ? {
                        documents: ia(e, r)
                    } : {
                        query: aa(e, r).ft
                    }, n.targetId = t.targetId, t.resumeToken.approximateByteSize() > 0) {
                    n.resumeToken = Hi(e, t.resumeToken);
                    let r = Bi(e, t.expectedCount);
                    r !== null && (n.expectedCount = r)
                } else if (t.snapshotVersion.compareTo(L.min()) > 0) {
                    n.readTime = Vi(e, t.snapshotVersion.toTimestamp());
                    let r = Bi(e, t.expectedCount);
                    r !== null && (n.expectedCount = r)
                }
                return n
            }(this.serializer, e);
            let n = sa(this.serializer, e);
            n && (t.labels = n), this.q_(t)
        }
        X_(e) {
            let t = {};
            t.database = Qi(this.serializer), t.removeTarget = e, this.q_(t)
        }
    },
    Po = class extends Mo {
        constructor(e, t, n, r, i, a) {
            super(e, `write_stream_connection_backoff`, `write_stream_idle`, `health_check_timeout`, t, n, r, a), this.serializer = i
        }
        get Y_() {
            return this.F_ > 0
        }
        start() {
            this.lastStreamToken = void 0, super.start()
        }
        W_() {
            this.Y_ && this.ea([])
        }
        j_(e, t) {
            return this.connection.T_(`Write`, e, t)
        }
        J_(e) {
            return j(!!e.streamToken, 31322), this.lastStreamToken = e.streamToken, j(!e.writeResults || e.writeResults.length === 0, 55816), this.listener.ta()
        }
        onNext(e) {
            j(!!e.streamToken, 12678), this.lastStreamToken = e.streamToken, this.M_.reset();
            let t = ra(e.writeResults, e.commitTime),
                n = Wi(e.commitTime);
            return this.listener.na(n, t)
        }
        ra() {
            let e = {};
            e.database = Qi(this.serializer), this.q_(e)
        }
        ea(e) {
            let t = {
                streamToken: this.lastStreamToken,
                writes: e.map((e => na(this.serializer, e)))
            };
            this.q_(t)
        }
    },
    Fo = class {},
    Io = class extends Fo {
        constructor(e, t, n, r) {
            super(), this.authCredentials = e, this.appCheckCredentials = t, this.connection = n, this.serializer = r, this.ia = !1
        }
        sa() {
            if (this.ia) throw new P(N.FAILED_PRECONDITION, `The client has already been terminated.`)
        }
        Wo(e, t, n, r) {
            return this.sa(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then((([i, a]) => this.connection.Wo(e, Ki(t, n), r, i, a))).catch((e => {
                throw e.name === `FirebaseError` ? (e.code === N.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e) : new P(N.UNKNOWN, e.toString())
            }))
        }
        jo(e, t, n, r, i) {
            return this.sa(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then((([a, o]) => this.connection.jo(e, Ki(t, n), r, a, o, i))).catch((e => {
                throw e.name === `FirebaseError` ? (e.code === N.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), e) : new P(N.UNKNOWN, e.toString())
            }))
        }
        terminate() {
            this.ia = !0, this.connection.terminate()
        }
    };

function Lo(e, t, n, r) {
    return new Io(e, t, n, r)
}
var Ro = class {
        constructor(e, t) {
            this.asyncQueue = e, this.onlineStateHandler = t, this.state = `Unknown`, this.oa = 0, this._a = null, this.aa = !0
        }
        ua() {
            this.oa === 0 && (this.ca(`Unknown`), this._a = this.asyncQueue.enqueueAfterDelay(`online_state_timeout`, 1e4, (() => (this._a = null, this.la(`Backend didn't respond within 10 seconds.`), this.ca(`Offline`), Promise.resolve()))))
        }
        ha(e) {
            this.state === `Online` ? this.ca(`Unknown`) : (this.oa++, this.oa >= 1 && (this.Pa(), this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`), this.ca(`Offline`)))
        }
        set(e) {
            this.Pa(), this.oa = 0, e === `Online` && (this.aa = !1), this.ca(e)
        }
        ca(e) {
            e !== this.state && (this.state = e, this.onlineStateHandler(e))
        }
        la(e) {
            let t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
            this.aa ? (Ne(t), this.aa = !1) : k(`OnlineStateTracker`, t)
        }
        Pa() {
            this._a !== null && (this._a.cancel(), this._a = null)
        }
    },
    zo = `RemoteStore`,
    Bo = class {
        constructor(e, t, n, r, i) {
            this.localStore = e, this.datastore = t, this.asyncQueue = n, this.remoteSyncer = {}, this.Ta = [], this.Ea = new Map, this.Ia = new Set, this.Ra = [], this.Aa = i, this.Aa.Mo((e => {
                n.enqueueAndForget((async () => {
                    Yo(this) && (k(zo, `Restarting streams for network reachability change.`), await async function(e) {
                        let t = M(e);
                        t.Ia.add(4), await Ho(t), t.Va.set(`Unknown`), t.Ia.delete(4), await Vo(t)
                    }(this))
                }))
            })), this.Va = new Ro(n, r)
        }
    };
async function Vo(e) {
    if (Yo(e))
        for (let t of e.Ra) await t(!0)
}
async function Ho(e) {
    for (let t of e.Ra) await t(!1)
}

function Uo(e, t) {
    let n = M(e);
    n.Ea.has(t.targetId) || (n.Ea.set(t.targetId, t), Jo(n) ? qo(n) : ms(n).O_() && Go(n, t))
}

function Wo(e, t) {
    let n = M(e),
        r = ms(n);
    n.Ea.delete(t), r.O_() && Ko(n, t), n.Ea.size === 0 && (r.O_() ? r.L_() : Yo(n) && n.Va.set(`Unknown`))
}

function Go(e, t) {
    if (e.da.$e(t.targetId), t.resumeToken.approximateByteSize() > 0 || t.snapshotVersion.compareTo(L.min()) > 0) {
        let n = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;
        t = t.withExpectedCount(n)
    }
    ms(e).Z_(t)
}

function Ko(e, t) {
    e.da.$e(t), ms(e).X_(t)
}

function qo(e) {
    e.da = new Ni({
        getRemoteKeysForTarget: t => e.remoteSyncer.getRemoteKeysForTarget(t),
        At: t => e.Ea.get(t) || null,
        ht: () => e.datastore.serializer.databaseId
    }), ms(e).start(), e.Va.ua()
}

function Jo(e) {
    return Yo(e) && !ms(e).x_() && e.Ea.size > 0
}

function Yo(e) {
    return M(e).Ia.size === 0
}

function Xo(e) {
    e.da = void 0
}
async function Zo(e) {
    e.Va.set(`Online`)
}
async function Qo(e) {
    e.Ea.forEach(((t, n) => {
        Go(e, t)
    }))
}
async function $o(e, t) {
    Xo(e), Jo(e) ? (e.Va.ha(t), qo(e)) : e.Va.set(`Unknown`)
}
async function es(e, t, n) {
    if (e.Va.set(`Online`), t instanceof H && t.state === 2 && t.cause) try {
        await async function(e, t) {
            let n = t.cause;
            for (let r of t.targetIds) e.Ea.has(r) && (await e.remoteSyncer.rejectListen(r, n), e.Ea.delete(r), e.da.removeTarget(r))
        }(e, t)
    } catch (n) {
        k(zo, `Failed to remove targets %s: %s `, t.targetIds.join(`,`), n), await ts(e, n)
    } else if (t instanceof Ai ? e.da.Xe(t) : t instanceof ji ? e.da.st(t) : e.da.tt(t), !n.isEqual(L.min())) try {
        let t = await oo(e.localStore);
        n.compareTo(t) >= 0 && await
        function(e, t) {
            let n = e.da.Tt(t);
            return n.targetChanges.forEach(((n, r) => {
                if (n.resumeToken.approximateByteSize() > 0) {
                    let i = e.Ea.get(r);
                    i && e.Ea.set(r, i.withResumeToken(n.resumeToken, t))
                }
            })), n.targetMismatches.forEach(((t, n) => {
                let r = e.Ea.get(t);
                r && (e.Ea.set(t, r.withResumeToken(Gt.EMPTY_BYTE_STRING, r.snapshotVersion)), Ko(e, t), Go(e, new va(r.target, t, n, r.sequenceNumber)))
            })), e.remoteSyncer.applyRemoteEvent(n)
        }(e, n)
    } catch (t) {
        k(zo, `Failed to raise snapshot:`, t), await ts(e, t)
    }
}
async function ts(e, t, n) {
    if (!Et(t)) throw t;
    e.Ia.add(1), await Ho(e), e.Va.set(`Offline`), n ||= () => oo(e.localStore), e.asyncQueue.enqueueRetryable((async () => {
        k(zo, `Retrying IndexedDB access`), await n(), e.Ia.delete(1), await Vo(e)
    }))
}

function ns(e, t) {
    return t().catch((n => ts(e, n, t)))
}
async function rs(e) {
    let t = M(e),
        n = hs(t),
        r = t.Ta.length > 0 ? t.Ta[t.Ta.length - 1].batchId : Ot;
    for (; is(t);) try {
        let e = await lo(t.localStore, r);
        if (e === null) {
            t.Ta.length === 0 && n.L_();
            break
        }
        r = e.batchId, as(t, e)
    } catch (e) {
        await ts(t, e)
    }
    os(t) && ss(t)
}

function is(e) {
    return Yo(e) && e.Ta.length < 10
}

function as(e, t) {
    e.Ta.push(t);
    let n = hs(e);
    n.O_() && n.Y_ && n.ea(t.mutations)
}

function os(e) {
    return Yo(e) && !hs(e).x_() && e.Ta.length > 0
}

function ss(e) {
    hs(e).start()
}
async function cs(e) {
    hs(e).ra()
}
async function ls(e) {
    let t = hs(e);
    for (let n of e.Ta) t.ea(n.mutations)
}
async function us(e, t, n) {
    let r = e.Ta.shift(),
        i = hi.from(r, t, n);
    await ns(e, (() => e.remoteSyncer.applySuccessfulWrite(i))), await rs(e)
}
async function ds(e, t) {
    t && hs(e).Y_ && await async function(e, t) {
        if (function(e) {
                return yi(e) && e !== N.ABORTED
            }(t.code)) {
            let n = e.Ta.shift();
            hs(e).B_(), await ns(e, (() => e.remoteSyncer.rejectFailedWrite(n.batchId, t))), await rs(e)
        }
    }(e, t), os(e) && ss(e)
}
async function fs(e, t) {
    let n = M(e);
    n.asyncQueue.verifyOperationInProgress(), k(zo, `RemoteStore received new credentials`);
    let r = Yo(n);
    n.Ia.add(3), await Ho(n), r && n.Va.set(`Unknown`), await n.remoteSyncer.handleCredentialChange(t), n.Ia.delete(3), await Vo(n)
}
async function ps(e, t) {
    let n = M(e);
    t ? (n.Ia.delete(2), await Vo(n)) : t || (n.Ia.add(2), await Ho(n), n.Va.set(`Unknown`))
}

function ms(e) {
    return e.ma || (e.ma = function(e, t, n) {
        let r = M(e);
        return r.sa(), new No(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n)
    }(e.datastore, e.asyncQueue, {
        Zo: Zo.bind(null, e),
        Yo: Qo.bind(null, e),
        t_: $o.bind(null, e),
        H_: es.bind(null, e)
    }), e.Ra.push((async t => {
        t ? (e.ma.B_(), Jo(e) ? qo(e) : e.Va.set(`Unknown`)) : (await e.ma.stop(), Xo(e))
    }))), e.ma
}

function hs(e) {
    return e.fa || (e.fa = function(e, t, n) {
        let r = M(e);
        return r.sa(), new Po(t, r.connection, r.authCredentials, r.appCheckCredentials, r.serializer, n)
    }(e.datastore, e.asyncQueue, {
        Zo: () => Promise.resolve(),
        Yo: cs.bind(null, e),
        t_: ds.bind(null, e),
        ta: ls.bind(null, e),
        na: us.bind(null, e)
    }), e.Ra.push((async t => {
        t ? (e.fa.B_(), await rs(e)) : (await e.fa.stop(), e.Ta.length > 0 && (k(zo, `Stopping write stream with ${e.Ta.length} pending writes`), e.Ta = []))
    }))), e.fa
}
var gs = class e {
    constructor(e, t, n, r, i) {
        this.asyncQueue = e, this.timerId = t, this.targetTimeMs = n, this.op = r, this.removalCallback = i, this.deferred = new Le, this.then = this.deferred.promise.then.bind(this.deferred.promise), this.deferred.promise.catch((e => {}))
    }
    get promise() {
        return this.deferred.promise
    }
    static createAndSchedule(t, n, r, i, a) {
        let o = new e(t, n, Date.now() + r, i, a);
        return o.start(r), o
    }
    start(e) {
        this.timerHandle = setTimeout((() => this.handleDelayElapsed()), e)
    }
    skipDelay() {
        return this.handleDelayElapsed()
    }
    cancel(e) {
        this.timerHandle !== null && (this.clearTimeout(), this.deferred.reject(new P(N.CANCELLED, `Operation cancelled` + (e ? `: ` + e : ``))))
    }
    handleDelayElapsed() {
        this.asyncQueue.enqueueAndForget((() => this.timerHandle === null ? Promise.resolve() : (this.clearTimeout(), this.op().then((e => this.deferred.resolve(e))))))
    }
    clearTimeout() {
        this.timerHandle !== null && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null)
    }
};

function _s(e, t) {
    if (Ne(`AsyncQueue`, `${t}: ${e}`), Et(e)) return new P(N.UNAVAILABLE, `${t}: ${e}`);
    throw e
}
var vs = class e {
        static emptySet(t) {
            return new e(t.comparator)
        }
        constructor(e) {
            this.comparator = e ? (t, n) => e(t, n) || I.comparator(t.key, n.key) : (e, t) => I.comparator(e.key, t.key), this.keyedMap = Dr(), this.sortedSet = new zt(this.comparator)
        }
        has(e) {
            return this.keyedMap.get(e) != null
        }
        get(e) {
            return this.keyedMap.get(e)
        }
        first() {
            return this.sortedSet.minKey()
        }
        last() {
            return this.sortedSet.maxKey()
        }
        isEmpty() {
            return this.sortedSet.isEmpty()
        }
        indexOf(e) {
            let t = this.keyedMap.get(e);
            return t ? this.sortedSet.indexOf(t) : -1
        }
        get size() {
            return this.sortedSet.size
        }
        forEach(e) {
            this.sortedSet.inorderTraversal(((t, n) => (e(t), !1)))
        }
        add(e) {
            let t = this.delete(e.key);
            return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null))
        }
        delete(e) {
            let t = this.get(e);
            return t ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t)) : this
        }
        isEqual(t) {
            if (!(t instanceof e) || this.size !== t.size) return !1;
            let n = this.sortedSet.getIterator(),
                r = t.sortedSet.getIterator();
            for (; n.hasNext();) {
                let e = n.getNext().key,
                    t = r.getNext().key;
                if (!e.isEqual(t)) return !1
            }
            return !0
        }
        toString() {
            let e = [];
            return this.forEach((t => {
                e.push(t.toString())
            })), e.length === 0 ? `DocumentSet ()` : `DocumentSet (
  ` + e.join(`  
`) + `
)`
        }
        copy(t, n) {
            let r = new e;
            return r.comparator = this.comparator, r.keyedMap = t, r.sortedSet = n, r
        }
    },
    ys = class {
        constructor() {
            this.ga = new zt(I.comparator)
        }
        track(e) {
            let t = e.doc.key,
                n = this.ga.get(t);
            n ? e.type !== 0 && n.type === 3 ? this.ga = this.ga.insert(t, e) : e.type === 3 && n.type !== 1 ? this.ga = this.ga.insert(t, {
                type: n.type,
                doc: e.doc
            }) : e.type === 2 && n.type === 2 ? this.ga = this.ga.insert(t, {
                type: 2,
                doc: e.doc
            }) : e.type === 2 && n.type === 0 ? this.ga = this.ga.insert(t, {
                type: 0,
                doc: e.doc
            }) : e.type === 1 && n.type === 0 ? this.ga = this.ga.remove(t) : e.type === 1 && n.type === 2 ? this.ga = this.ga.insert(t, {
                type: 1,
                doc: n.doc
            }) : e.type === 0 && n.type === 1 ? this.ga = this.ga.insert(t, {
                type: 2,
                doc: e.doc
            }) : A(63341, {
                Vt: e,
                pa: n
            }) : this.ga = this.ga.insert(t, e)
        }
        ya() {
            let e = [];
            return this.ga.inorderTraversal(((t, n) => {
                e.push(n)
            })), e
        }
    },
    bs = class e {
        constructor(e, t, n, r, i, a, o, s, c) {
            this.query = e, this.docs = t, this.oldDocs = n, this.docChanges = r, this.mutatedKeys = i, this.fromCache = a, this.syncStateChanged = o, this.excludesMetadataChanges = s, this.hasCachedResults = c
        }
        static fromInitialDocuments(t, n, r, i, a) {
            let o = [];
            return n.forEach((e => {
                o.push({
                    type: 0,
                    doc: e
                })
            })), new e(t, n, vs.emptySet(n), o, r, i, !0, !1, a)
        }
        get hasPendingWrites() {
            return !this.mutatedKeys.isEmpty()
        }
        isEqual(e) {
            if (!(this.fromCache === e.fromCache && this.hasCachedResults === e.hasCachedResults && this.syncStateChanged === e.syncStateChanged && this.mutatedKeys.isEqual(e.mutatedKeys) && gr(this.query, e.query) && this.docs.isEqual(e.docs) && this.oldDocs.isEqual(e.oldDocs))) return !1;
            let t = this.docChanges,
                n = e.docChanges;
            if (t.length !== n.length) return !1;
            for (let e = 0; e < t.length; e++)
                if (t[e].type !== n[e].type || !t[e].doc.isEqual(n[e].doc)) return !1;
            return !0
        }
    },
    xs = class {
        constructor() {
            this.wa = void 0, this.Sa = []
        }
        ba() {
            return this.Sa.some((e => e.Da()))
        }
    },
    Ss = class {
        constructor() {
            this.queries = Cs(), this.onlineState = `Unknown`, this.Ca = new Set
        }
        terminate() {
            (function(e, t) {
                let n = M(e),
                    r = n.queries;
                n.queries = Cs(), r.forEach(((e, n) => {
                    for (let e of n.Sa) e.onError(t)
                }))
            })(this, new P(N.ABORTED, `Firestore shutting down`))
        }
    };

function Cs() {
    return new Cr((e => _r(e)), gr)
}
async function ws(e, t) {
    let n = M(e),
        r = 3,
        i = t.query,
        a = n.queries.get(i);
    a ? !a.ba() && t.Da() && (r = 2) : (a = new xs, r = t.Da() ? 0 : 1);
    try {
        switch (r) {
            case 0:
                a.wa = await n.onListen(i, !0);
                break;
            case 1:
                a.wa = await n.onListen(i, !1);
                break;
            case 2:
                await n.onFirstRemoteStoreListen(i)
        }
    } catch (e) {
        let n = _s(e, `Initialization of query '${vr(t.query)}' failed`);
        t.onError(n);
        return
    }
    n.queries.set(i, a), a.Sa.push(t), t.va(n.onlineState), a.wa && t.Fa(a.wa) && Os(n)
}
async function Ts(e, t) {
    let n = M(e),
        r = t.query,
        i = 3,
        a = n.queries.get(r);
    if (a) {
        let e = a.Sa.indexOf(t);
        e >= 0 && (a.Sa.splice(e, 1), a.Sa.length === 0 ? i = t.Da() ? 0 : 1 : !a.ba() && t.Da() && (i = 2))
    }
    switch (i) {
        case 0:
            return n.queries.delete(r), n.onUnlisten(r, !0);
        case 1:
            return n.queries.delete(r), n.onUnlisten(r, !1);
        case 2:
            return n.onLastRemoteStoreUnlisten(r);
        default:
            return
    }
}

function Es(e, t) {
    let n = M(e),
        r = !1;
    for (let e of t) {
        let t = e.query,
            i = n.queries.get(t);
        if (i) {
            for (let t of i.Sa) t.Fa(e) && (r = !0);
            i.wa = e
        }
    }
    r && Os(n)
}

function Ds(e, t, n) {
    let r = M(e),
        i = r.queries.get(t);
    if (i)
        for (let e of i.Sa) e.onError(n);
    r.queries.delete(t)
}

function Os(e) {
    e.Ca.forEach((e => {
        e.next()
    }))
}
var ks, As;
(As = ks ||= {}).Ma = `default`, As.Cache = `cache`;
var js = class {
        constructor(e, t, n) {
            this.query = e, this.xa = t, this.Oa = !1, this.Na = null, this.onlineState = `Unknown`, this.options = n || {}
        }
        Fa(e) {
            if (!this.options.includeMetadataChanges) {
                let t = [];
                for (let n of e.docChanges) n.type !== 3 && t.push(n);
                e = new bs(e.query, e.docs, e.oldDocs, t, e.mutatedKeys, e.fromCache, e.syncStateChanged, !0, e.hasCachedResults)
            }
            let t = !1;
            return this.Oa ? this.Ba(e) && (this.xa.next(e), t = !0) : this.La(e, this.onlineState) && (this.ka(e), t = !0), this.Na = e, t
        }
        onError(e) {
            this.xa.error(e)
        }
        va(e) {
            this.onlineState = e;
            let t = !1;
            return this.Na && !this.Oa && this.La(this.Na, e) && (this.ka(this.Na), t = !0), t
        }
        La(e, t) {
            if (!e.fromCache || !this.Da()) return !0;
            let n = t !== `Offline`;
            return (!this.options.qa || !n) && (!e.docs.isEmpty() || e.hasCachedResults || t === `Offline`)
        }
        Ba(e) {
            if (e.docChanges.length > 0) return !0;
            let t = this.Na && this.Na.hasPendingWrites !== e.hasPendingWrites;
            return !(!e.syncStateChanged && !t) && !0 === this.options.includeMetadataChanges
        }
        ka(e) {
            e = bs.fromInitialDocuments(e.query, e.docs, e.mutatedKeys, e.fromCache, e.hasCachedResults), this.Oa = !0, this.xa.next(e)
        }
        Da() {
            return this.options.source !== ks.Cache
        }
    },
    Ms = class {
        constructor(e) {
            this.key = e
        }
    },
    Ns = class {
        constructor(e) {
            this.key = e
        }
    },
    Ps = class {
        constructor(e, t) {
            this.query = e, this.Za = t, this.Xa = null, this.hasCachedResults = !1, this.current = !1, this.Ya = B(), this.mutatedKeys = B(), this.eu = xr(e), this.tu = new vs(this.eu)
        }
        get nu() {
            return this.Za
        }
        ru(e, t) {
            let n = t ? t.iu : new ys,
                r = t ? t.tu : this.tu,
                i = t ? t.mutatedKeys : this.mutatedKeys,
                a = r,
                o = !1,
                s = this.query.limitType === `F` && r.size === this.query.limit ? r.last() : null,
                c = this.query.limitType === `L` && r.size === this.query.limit ? r.first() : null;
            if (e.inorderTraversal(((e, t) => {
                    let l = r.get(e),
                        u = yr(this.query, t) ? t : null,
                        d = !!l && this.mutatedKeys.has(l.key),
                        f = !!u && (u.hasLocalMutations || this.mutatedKeys.has(u.key) && u.hasCommittedMutations),
                        p = !1;
                    l && u ? l.data.isEqual(u.data) ? d !== f && (n.track({
                        type: 3,
                        doc: u
                    }), p = !0) : this.su(l, u) || (n.track({
                        type: 2,
                        doc: u
                    }), p = !0, (s && this.eu(u, s) > 0 || c && this.eu(u, c) < 0) && (o = !0)) : !l && u ? (n.track({
                        type: 0,
                        doc: u
                    }), p = !0) : l && !u && (n.track({
                        type: 1,
                        doc: l
                    }), p = !0, (s || c) && (o = !0)), p && (u ? (a = a.add(u), i = f ? i.add(e) : i.delete(e)) : (a = a.delete(e), i = i.delete(e)))
                })), this.query.limit !== null)
                for (; a.size > this.query.limit;) {
                    let e = this.query.limitType === `F` ? a.last() : a.first();
                    a = a.delete(e.key), i = i.delete(e.key), n.track({
                        type: 1,
                        doc: e
                    })
                }
            return {
                tu: a,
                iu: n,
                bs: o,
                mutatedKeys: i
            }
        }
        su(e, t) {
            return e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations
        }
        applyChanges(e, t, n, r) {
            let i = this.tu;
            this.tu = e.tu, this.mutatedKeys = e.mutatedKeys;
            let a = e.iu.ya();
            a.sort(((e, t) => function(e, t) {
                let n = e => {
                    switch (e) {
                        case 0:
                            return 1;
                        case 2:
                        case 3:
                            return 2;
                        case 1:
                            return 0;
                        default:
                            return A(20277, {
                                Vt: e
                            })
                    }
                };
                return n(e) - n(t)
            }(e.type, t.type) || this.eu(e.doc, t.doc))), this.ou(n), r ??= !1;
            let o = t && !r ? this._u() : [],
                s = this.Ya.size === 0 && this.current && !r ? 1 : 0,
                c = s !== this.Xa;
            return this.Xa = s, a.length !== 0 || c ? {
                snapshot: new bs(this.query, e.tu, i, a, e.mutatedKeys, s === 0, c, !1, !!n && n.resumeToken.approximateByteSize() > 0),
                au: o
            } : {
                au: o
            }
        }
        va(e) {
            return this.current && e === `Offline` ? (this.current = !1, this.applyChanges({
                tu: this.tu,
                iu: new ys,
                mutatedKeys: this.mutatedKeys,
                bs: !1
            }, !1)) : {
                au: []
            }
        }
        uu(e) {
            return !this.Za.has(e) && !!this.tu.has(e) && !this.tu.get(e).hasLocalMutations
        }
        ou(e) {
            e && (e.addedDocuments.forEach((e => this.Za = this.Za.add(e))), e.modifiedDocuments.forEach((e => {})), e.removedDocuments.forEach((e => this.Za = this.Za.delete(e))), this.current = e.current)
        }
        _u() {
            if (!this.current) return [];
            let e = this.Ya;
            this.Ya = B(), this.tu.forEach((e => {
                this.uu(e.key) && (this.Ya = this.Ya.add(e.key))
            }));
            let t = [];
            return e.forEach((e => {
                this.Ya.has(e) || t.push(new Ns(e))
            })), this.Ya.forEach((n => {
                e.has(n) || t.push(new Ms(n))
            })), t
        }
        cu(e) {
            this.Za = e.ks, this.Ya = B();
            let t = this.ru(e.documents);
            return this.applyChanges(t, !0)
        }
        lu() {
            return bs.fromInitialDocuments(this.query, this.tu, this.mutatedKeys, this.Xa === 0, this.hasCachedResults)
        }
    },
    Fs = `SyncEngine`,
    Is = class {
        constructor(e, t, n) {
            this.query = e, this.targetId = t, this.view = n
        }
    },
    Ls = class {
        constructor(e) {
            this.key = e, this.hu = !1
        }
    },
    Rs = class {
        constructor(e, t, n, r, i, a) {
            this.localStore = e, this.remoteStore = t, this.eventManager = n, this.sharedClientState = r, this.currentUser = i, this.maxConcurrentLimboResolutions = a, this.Pu = {}, this.Tu = new Cr((e => _r(e)), gr), this.Eu = new Map, this.Iu = new Set, this.Ru = new zt(I.comparator), this.Au = new Map, this.Vu = new Va, this.du = {}, this.mu = new Map, this.fu = Da.ar(), this.onlineState = `Unknown`, this.gu = void 0
        }
        get isPrimaryClient() {
            return !0 === this.gu
        }
    };
async function zs(e, t, n = !0) {
    let r = sc(e),
        i, a = r.Tu.get(t);
    return a ? (r.sharedClientState.addLocalQueryTarget(a.targetId), i = a.view.lu()) : i = await Vs(r, t, n, !0), i
}
async function Bs(e, t) {
    await Vs(sc(e), t, !0, !1)
}
async function Vs(e, t, n, r) {
    let i = await U(e.localStore, pr(t)),
        a = i.targetId,
        o = e.sharedClientState.addLocalQueryTarget(a, n),
        s;
    return r && (s = await Hs(e, t, a, o === `current`, i.resumeToken)), e.isPrimaryClient && n && Uo(e.remoteStore, i), s
}
async function Hs(e, t, n, r, i) {
    e.pu = (t, n, r) => async function(e, t, n, r) {
        let i = t.view.ru(n);
        i.bs && (i = await uo(e.localStore, t.query, !1).then((({
            documents: e
        }) => t.view.ru(e, i))));
        let a = r && r.targetChanges.get(t.targetId),
            o = r && r.targetMismatches.get(t.targetId) != null,
            s = t.view.applyChanges(i, e.isPrimaryClient, a, o);
        return tc(e, t.targetId, s.au), s.snapshot
    }(e, t, n, r);
    let a = await uo(e.localStore, t, !0),
        o = new Ps(t, a.ks),
        s = o.ru(a.documents),
        c = ki.createSynthesizedTargetChangeForCurrentChange(n, r && e.onlineState !== `Offline`, i),
        l = o.applyChanges(s, e.isPrimaryClient, c);
    tc(e, n, l.au);
    let u = new Is(t, n, o);
    return e.Tu.set(t, u), e.Eu.has(n) ? e.Eu.get(n).push(t) : e.Eu.set(n, [t]), l.snapshot
}
async function Us(e, t, n) {
    let r = M(e),
        i = r.Tu.get(t),
        a = r.Eu.get(i.targetId);
    if (a.length > 1) return r.Eu.set(i.targetId, a.filter((e => !gr(e, t)))), void r.Tu.delete(t);
    r.isPrimaryClient ? (r.sharedClientState.removeLocalQueryTarget(i.targetId), r.sharedClientState.isActiveQueryTarget(i.targetId) || await W(r.localStore, i.targetId, !1).then((() => {
        r.sharedClientState.clearQueryState(i.targetId), n && Wo(r.remoteStore, i.targetId), $s(r, i.targetId)
    })).catch(wt)) : ($s(r, i.targetId), await W(r.localStore, i.targetId, !0))
}
async function Ws(e, t) {
    let n = M(e),
        r = n.Tu.get(t),
        i = n.Eu.get(r.targetId);
    n.isPrimaryClient && i.length === 1 && (n.sharedClientState.removeLocalQueryTarget(r.targetId), Wo(n.remoteStore, r.targetId))
}
async function Gs(e, t, n) {
    let r = cc(e);
    try {
        let e = await
        function(e, t) {
            let n = M(e),
                r = ht.now(),
                i = t.reduce(((e, t) => e.add(t.key)), B()),
                a, o;
            return n.persistence.runTransaction(`Locally write mutations`, `readwrite`, (e => {
                let s = Tr(),
                    c = B();
                return n.xs.getEntries(e, i).next((e => {
                    s = e, s.forEach(((e, t) => {
                        t.isValidDocument() || (c = c.add(e))
                    }))
                })).next((() => n.localDocuments.getOverlayedDocuments(e, s))).next((i => {
                    a = i;
                    let o = [];
                    for (let e of t) {
                        let t = ai(e, a.get(e.key).overlayedDocument);
                        t != null && o.push(new ci(e.key, t, jn(t.value.mapValue), $r.exists(!0)))
                    }
                    return n.mutationQueue.addMutationBatch(e, r, o, t)
                })).next((t => {
                    o = t;
                    let r = t.applyToLocalDocumentSet(a, c);
                    return n.documentOverlayCache.saveOverlays(e, t.batchId, r)
                }))
            })).then((() => ({
                batchId: o.batchId,
                changes: Or(a)
            })))
        }(r.localStore, t);
        r.sharedClientState.addPendingMutation(e.batchId),
            function(e, t, n) {
                let r = e.du[e.currentUser.toKey()];
                r ||= new zt(F), r = r.insert(t, n), e.du[e.currentUser.toKey()] = r
            }(r, e.batchId, n), await ic(r, e.changes), await rs(r.remoteStore)
    } catch (e) {
        let t = _s(e, `Failed to persist write`);
        n.reject(t)
    }
}
async function Ks(e, t) {
    let n = M(e);
    try {
        let e = await so(n.localStore, t);
        t.targetChanges.forEach(((e, t) => {
            let r = n.Au.get(t);
            r && (j(e.addedDocuments.size + e.modifiedDocuments.size + e.removedDocuments.size <= 1, 22616), e.addedDocuments.size > 0 ? r.hu = !0 : e.modifiedDocuments.size > 0 ? j(r.hu, 14607) : e.removedDocuments.size > 0 && (j(r.hu, 42227), r.hu = !1))
        })), await ic(n, e, t)
    } catch (e) {
        await wt(e)
    }
}

function qs(e, t, n) {
    let r = M(e);
    if (r.isPrimaryClient && n === 0 || !r.isPrimaryClient && n === 1) {
        let e = [];
        r.Tu.forEach(((n, r) => {
                let i = r.view.va(t);
                i.snapshot && e.push(i.snapshot)
            })),
            function(e, t) {
                let n = M(e);
                n.onlineState = t;
                let r = !1;
                n.queries.forEach(((e, n) => {
                    for (let e of n.Sa) e.va(t) && (r = !0)
                })), r && Os(n)
            }(r.eventManager, t), e.length && r.Pu.H_(e), r.onlineState = t, r.isPrimaryClient && r.sharedClientState.setOnlineState(t)
    }
}
async function Js(e, t, n) {
    let r = M(e);
    r.sharedClientState.updateQueryState(t, `rejected`, n);
    let i = r.Au.get(t),
        a = i && i.key;
    if (a) {
        let e = new zt(I.comparator);
        e = e.insert(a, Mn.newNoDocument(a, L.min()));
        let n = B().add(a);
        await Ks(r, new Oi(L.min(), new Map, new zt(F), e, n)), r.Ru = r.Ru.remove(a), r.Au.delete(t), rc(r)
    } else await W(r.localStore, t, !1).then((() => $s(r, t, n))).catch(wt)
}
async function Ys(e, t) {
    let n = M(e),
        r = t.batch.batchId;
    try {
        let e = await ao(n.localStore, t);
        Qs(n, r, null), Zs(n, r), n.sharedClientState.updateMutationState(r, `acknowledged`), await ic(n, e)
    } catch (e) {
        await wt(e)
    }
}
async function Xs(e, t, n) {
    let r = M(e);
    try {
        let e = await
        function(e, t) {
            let n = M(e);
            return n.persistence.runTransaction(`Reject batch`, `readwrite-primary`, (e => {
                let r;
                return n.mutationQueue.lookupMutationBatch(e, t).next((t => (j(t !== null, 37113), r = t.keys(), n.mutationQueue.removeMutationBatch(e, t)))).next((() => n.mutationQueue.performConsistencyCheck(e))).next((() => n.documentOverlayCache.removeOverlaysForBatchId(e, r, t))).next((() => n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e, r))).next((() => n.localDocuments.getDocuments(e, r)))
            }))
        }(r.localStore, t);
        Qs(r, t, n), Zs(r, t), r.sharedClientState.updateMutationState(t, `rejected`, n), await ic(r, e)
    } catch (e) {
        await wt(e)
    }
}

function Zs(e, t) {
    (e.mu.get(t) || []).forEach((e => {
        e.resolve()
    })), e.mu.delete(t)
}

function Qs(e, t, n) {
    let r = M(e),
        i = r.du[r.currentUser.toKey()];
    if (i) {
        let e = i.get(t);
        e && (n ? e.reject(n) : e.resolve(), i = i.remove(t)), r.du[r.currentUser.toKey()] = i
    }
}

function $s(e, t, n = null) {
    e.sharedClientState.removeLocalQueryTarget(t);
    for (let r of e.Eu.get(t)) e.Tu.delete(r), n && e.Pu.yu(r, n);
    e.Eu.delete(t), e.isPrimaryClient && e.Vu.Gr(t).forEach((t => {
        e.Vu.containsKey(t) || ec(e, t)
    }))
}

function ec(e, t) {
    e.Iu.delete(t.path.canonicalString());
    let n = e.Ru.get(t);
    n !== null && (Wo(e.remoteStore, n), e.Ru = e.Ru.remove(t), e.Au.delete(n), rc(e))
}

function tc(e, t, n) {
    for (let r of n) r instanceof Ms ? (e.Vu.addReference(r.key, t), nc(e, r)) : r instanceof Ns ? (k(Fs, `Document no longer in limbo: ` + r.key), e.Vu.removeReference(r.key, t), e.Vu.containsKey(r.key) || ec(e, r.key)) : A(19791, {
        wu: r
    })
}

function nc(e, t) {
    let n = t.key,
        r = n.path.canonicalString();
    e.Ru.get(n) || e.Iu.has(r) || (k(Fs, `New document in limbo: ` + n), e.Iu.add(r), rc(e))
}

function rc(e) {
    for (; e.Iu.size > 0 && e.Ru.size < e.maxConcurrentLimboResolutions;) {
        let t = e.Iu.values().next().value;
        e.Iu.delete(t);
        let n = new I(tt.fromString(t)),
            r = e.fu.next();
        e.Au.set(r, new Ls(n)), e.Ru = e.Ru.insert(n, r), Uo(e.remoteStore, new va(pr(cr(n.path)), r, `TargetPurposeLimboResolution`, Dt.ce))
    }
}
async function ic(e, t, n) {
    let r = M(e),
        i = [],
        a = [],
        o = [];
    r.Tu.isEmpty() || (r.Tu.forEach(((e, s) => {
        o.push(r.pu(s, t, n).then((e => {
            if ((e || n) && r.isPrimaryClient) {
                let t = e ? !e.fromCache : n?.targetChanges.get(s.targetId)?.current;
                r.sharedClientState.updateQueryState(s.targetId, t ? `current` : `not-current`)
            }
            if (e) {
                i.push(e);
                let t = Za.Is(s.targetId, e);
                a.push(t)
            }
        })))
    })), await Promise.all(o), r.Pu.H_(i), await async function(e, t) {
        let n = M(e);
        try {
            await n.persistence.runTransaction(`notifyLocalViewChanges`, `readwrite`, (e => R.forEach(t, (t => R.forEach(t.Ts, (r => n.persistence.referenceDelegate.addReference(e, t.targetId, r))).next((() => R.forEach(t.Es, (r => n.persistence.referenceDelegate.removeReference(e, t.targetId, r)))))))))
        } catch (e) {
            if (!Et(e)) throw e;
            k(eo, `Failed to update sequence numbers: ` + e)
        }
        for (let e of t) {
            let t = e.targetId;
            if (!e.fromCache) {
                let e = n.vs.get(t),
                    r = e.snapshotVersion,
                    i = e.withLastLimboFreeSnapshotVersion(r);
                n.vs = n.vs.insert(t, i)
            }
        }
    }(r.localStore, a))
}
async function ac(e, t) {
    let n = M(e);
    if (!n.currentUser.isEqual(t)) {
        k(Fs, `User change. New user:`, t.toKey());
        let e = await io(n.localStore, t);
        n.currentUser = t,
            function(e, t) {
                e.mu.forEach((e => {
                    e.forEach((e => {
                        e.reject(new P(N.CANCELLED, t))
                    }))
                })), e.mu.clear()
            }(n, `'waitForPendingWrites' promise is rejected due to a user change.`), n.sharedClientState.handleUserChange(t, e.removedBatchIds, e.addedBatchIds), await ic(n, e.Ns)
    }
}

function oc(e, t) {
    let n = M(e),
        r = n.Au.get(t);
    if (r && r.hu) return B().add(r.key);
    {
        let e = B(),
            r = n.Eu.get(t);
        if (!r) return e;
        for (let t of r) {
            let r = n.Tu.get(t);
            e = e.unionWith(r.view.nu)
        }
        return e
    }
}

function sc(e) {
    let t = M(e);
    return t.remoteStore.remoteSyncer.applyRemoteEvent = Ks.bind(null, t), t.remoteStore.remoteSyncer.getRemoteKeysForTarget = oc.bind(null, t), t.remoteStore.remoteSyncer.rejectListen = Js.bind(null, t), t.Pu.H_ = Es.bind(null, t.eventManager), t.Pu.yu = Ds.bind(null, t.eventManager), t
}

function cc(e) {
    let t = M(e);
    return t.remoteStore.remoteSyncer.applySuccessfulWrite = Ys.bind(null, t), t.remoteStore.remoteSyncer.rejectFailedWrite = Xs.bind(null, t), t
}
var lc = class {
    constructor() {
        this.kind = `memory`, this.synchronizeTabs = !1
    }
    async initialize(e) {
        this.serializer = ko(e.databaseInfo.databaseId), this.sharedClientState = this.Du(e), this.persistence = this.Cu(e), await this.persistence.start(), this.localStore = this.vu(e), this.gcScheduler = this.Fu(e, this.localStore), this.indexBackfillerScheduler = this.Mu(e, this.localStore)
    }
    Fu(e, t) {
        return null
    }
    Mu(e, t) {
        return null
    }
    vu(e) {
        return ro(this.persistence, new $a, e.initialUser, this.serializer)
    }
    Cu(e) {
        return new qa(Ya.Vi, this.serializer)
    }
    Du(e) {
        return new mo
    }
    async terminate() {
        this.gcScheduler?.stop(), this.indexBackfillerScheduler?.stop(), this.sharedClientState.shutdown(), await this.persistence.shutdown()
    }
};
lc.provider = {
    build: () => new lc
};
var uc = class extends lc {
        constructor(e) {
            super(), this.cacheSizeBytes = e
        }
        Fu(e, t) {
            j(this.persistence.referenceDelegate instanceof Xa, 46915);
            let n = this.persistence.referenceDelegate.garbageCollector;
            return new Ma(n, e.asyncQueue, t)
        }
        Cu(e) {
            let t = this.cacheSizeBytes === void 0 ? Ea.DEFAULT : Ea.withCacheSize(this.cacheSizeBytes);
            return new qa((e => Xa.Vi(e, t)), this.serializer)
        }
    },
    dc = class {
        async initialize(e, t) {
            this.localStore || (this.localStore = e.localStore, this.sharedClientState = e.sharedClientState, this.datastore = this.createDatastore(t), this.remoteStore = this.createRemoteStore(t), this.eventManager = this.createEventManager(t), this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs), this.sharedClientState.onlineStateHandler = e => qs(this.syncEngine, e, 1), this.remoteStore.remoteSyncer.handleCredentialChange = ac.bind(null, this.syncEngine), await ps(this.remoteStore, this.syncEngine.isPrimaryClient))
        }
        createEventManager(e) {
            return function() {
                return new Ss
            }()
        }
        createDatastore(e) {
            let t = ko(e.databaseInfo.databaseId),
                n = Do(e.databaseInfo);
            return Lo(e.authCredentials, e.appCheckCredentials, n, t)
        }
        createRemoteStore(e) {
            return function(e, t, n, r, i) {
                return new Bo(e, t, n, r, i)
            }(this.localStore, this.datastore, e.asyncQueue, (e => qs(this.syncEngine, e, 0)), function() {
                return _o.v() ? new _o : new ho
            }())
        }
        createSyncEngine(e, t) {
            return function(e, t, n, r, i, a, o) {
                let s = new Rs(e, t, n, r, i, a);
                return o && (s.gu = !0), s
            }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, e.initialUser, e.maxConcurrentLimboResolutions, t)
        }
        async terminate() {
            await async function(e) {
                let t = M(e);
                k(zo, `RemoteStore shutting down.`), t.Ia.add(5), await Ho(t), t.Aa.shutdown(), t.Va.set(`Unknown`)
            }(this.remoteStore), this.datastore?.terminate(), this.eventManager?.terminate()
        }
    };
dc.provider = {
    build: () => new dc
};
var fc = class {
        constructor(e) {
            this.observer = e, this.muted = !1
        }
        next(e) {
            this.muted || this.observer.next && this.Ou(this.observer.next, e)
        }
        error(e) {
            this.muted || (this.observer.error ? this.Ou(this.observer.error, e) : Ne(`Uncaught Error in snapshot listener:`, e.toString()))
        }
        Nu() {
            this.muted = !0
        }
        Ou(e, t) {
            setTimeout((() => {
                this.muted || e(t)
            }), 0)
        }
    },
    pc = `FirestoreClient`,
    mc = class {
        constructor(e, t, n, r, i) {
            this.authCredentials = e, this.appCheckCredentials = t, this.asyncQueue = n, this._databaseInfo = r, this.user = Oe.UNAUTHENTICATED, this.clientId = qe.newId(), this.authCredentialListener = () => Promise.resolve(), this.appCheckCredentialListener = () => Promise.resolve(), this._uninitializedComponentsProvider = i, this.authCredentials.start(n, (async e => {
                k(pc, `Received user=`, e.uid), await this.authCredentialListener(e), this.user = e
            })), this.appCheckCredentials.start(n, (e => (k(pc, `Received new app check token=`, e), this.appCheckCredentialListener(e, this.user))))
        }
        get configuration() {
            return {
                asyncQueue: this.asyncQueue,
                databaseInfo: this._databaseInfo,
                clientId: this.clientId,
                authCredentials: this.authCredentials,
                appCheckCredentials: this.appCheckCredentials,
                initialUser: this.user,
                maxConcurrentLimboResolutions: 100
            }
        }
        setCredentialChangeListener(e) {
            this.authCredentialListener = e
        }
        setAppCheckTokenChangeListener(e) {
            this.appCheckCredentialListener = e
        }
        terminate() {
            this.asyncQueue.enterRestrictedMode();
            let e = new Le;
            return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async () => {
                try {
                    this._onlineComponents && await this._onlineComponents.terminate(), this._offlineComponents && await this._offlineComponents.terminate(), this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), e.resolve()
                } catch (t) {
                    let n = _s(t, `Failed to shutdown persistence`);
                    e.reject(n)
                }
            })), e.promise
        }
    };
async function hc(e, t) {
    e.asyncQueue.verifyOperationInProgress(), k(pc, `Initializing OfflineComponentProvider`);
    let n = e.configuration;
    await t.initialize(n);
    let r = n.initialUser;
    e.setCredentialChangeListener((async e => {
        r.isEqual(e) || (await io(t.localStore, e), r = e)
    })), t.persistence.setDatabaseDeletedListener((() => e.terminate())), e._offlineComponents = t
}
async function gc(e, t) {
    e.asyncQueue.verifyOperationInProgress();
    let n = await _c(e);
    k(pc, `Initializing OnlineComponentProvider`), await t.initialize(n, e.configuration), e.setCredentialChangeListener((e => fs(t.remoteStore, e))), e.setAppCheckTokenChangeListener(((e, n) => fs(t.remoteStore, n))), e._onlineComponents = t
}
async function _c(e) {
    if (!e._offlineComponents)
        if (e._uninitializedComponentsProvider) {
            k(pc, `Using user provided OfflineComponentProvider`);
            try {
                await hc(e, e._uninitializedComponentsProvider._offline)
            } catch (t) {
                let n = t;
                if (! function(e) {
                        return e.name === `FirebaseError` ? e.code === N.FAILED_PRECONDITION || e.code === N.UNIMPLEMENTED : !(typeof DOMException < `u` && e instanceof DOMException) || e.code === 22 || e.code === 20 || e.code === 11
                    }(n)) throw n;
                Pe(`Error using user provided cache. Falling back to memory cache: ` + n), await hc(e, new lc)
            }
        } else k(pc, `Using default OfflineComponentProvider`), await hc(e, new uc(void 0));
    return e._offlineComponents
}
async function vc(e) {
    return e._onlineComponents || (e._uninitializedComponentsProvider ? (k(pc, `Using user provided OnlineComponentProvider`), await gc(e, e._uninitializedComponentsProvider._online)) : (k(pc, `Using default OnlineComponentProvider`), await gc(e, new dc))), e._onlineComponents
}

function yc(e) {
    return vc(e).then((e => e.syncEngine))
}
async function bc(e) {
    let t = await vc(e),
        n = t.eventManager;
    return n.onListen = zs.bind(null, t.syncEngine), n.onUnlisten = Us.bind(null, t.syncEngine), n.onFirstRemoteStoreListen = Bs.bind(null, t.syncEngine), n.onLastRemoteStoreUnlisten = Ws.bind(null, t.syncEngine), n
}

function xc(e, t, n = {}) {
    let r = new Le;
    return e.asyncQueue.enqueueAndForget((async () => function(e, t, n, r, i) {
        let a = new fc({
                next: s => {
                    a.Nu(), t.enqueueAndForget((() => Ts(e, o)));
                    let c = s.docs.has(n);
                    !c && s.fromCache ? i.reject(new P(N.UNAVAILABLE, `Failed to get document because the client is offline.`)) : c && s.fromCache && r && r.source === `server` ? i.reject(new P(N.UNAVAILABLE, `Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)`)) : i.resolve(s)
                },
                error: e => i.reject(e)
            }),
            o = new js(cr(n.path), a, {
                includeMetadataChanges: !0,
                qa: !0
            });
        return ws(e, o)
    }(await bc(e), e.asyncQueue, t, n, r))), r.promise
}

function Sc(e, t, n = {}) {
    let r = new Le;
    return e.asyncQueue.enqueueAndForget((async () => function(e, t, n, r, i) {
        let a = new fc({
                next: n => {
                    a.Nu(), t.enqueueAndForget((() => Ts(e, o))), n.fromCache && r.source === `server` ? i.reject(new P(N.UNAVAILABLE, `Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)`)) : i.resolve(n)
                },
                error: e => i.reject(e)
            }),
            o = new js(n, a, {
                includeMetadataChanges: !0,
                qa: !0
            });
        return ws(e, o)
    }(await bc(e), e.asyncQueue, t, n, r))), r.promise
}

function Cc(e, t) {
    let n = new Le;
    return e.asyncQueue.enqueueAndForget((async () => Gs(await yc(e), t, n))), n.promise
}

function wc(e) {
    let t = {};
    return e.timeoutSeconds !== void 0 && (t.timeoutSeconds = e.timeoutSeconds), t
}
var Tc = `ComponentProvider`,
    Ec = new Map;

function Dc(e, t, n, r, i) {
    return new rn(e, t, n, i.host, i.ssl, i.experimentalForceLongPolling, i.experimentalAutoDetectLongPolling, wc(i.experimentalLongPollingOptions), i.useFetchStreams, i.isUsingEmulator, r)
}
var Oc = `firestore.googleapis.com`,
    kc = !0,
    Ac = class {
        constructor(e) {
            if (e.host === void 0) {
                if (e.ssl !== void 0) throw new P(N.INVALID_ARGUMENT, `Can't provide ssl option if host option is not set`);
                this.host = Oc, this.ssl = kc
            } else this.host = e.host, this.ssl = e.ssl ?? kc;
            if (this.isUsingEmulator = e.emulatorOptions !== void 0, this.credentials = e.credentials, this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties, this.localCache = e.localCache, e.cacheSizeBytes === void 0) this.cacheSizeBytes = Ta;
            else {
                if (e.cacheSizeBytes !== -1 && e.cacheSizeBytes < ka) throw new P(N.INVALID_ARGUMENT, `cacheSizeBytes must be at least 1048576`);
                this.cacheSizeBytes = e.cacheSizeBytes
            }
            at(`experimentalForceLongPolling`, e.experimentalForceLongPolling, `experimentalAutoDetectLongPolling`, e.experimentalAutoDetectLongPolling), this.experimentalForceLongPolling = !!e.experimentalForceLongPolling, this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = !1 : e.experimentalAutoDetectLongPolling === void 0 ? this.experimentalAutoDetectLongPolling = !0 : this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling, this.experimentalLongPollingOptions = wc(e.experimentalLongPollingOptions ?? {}),
                function(e) {
                    if (e.timeoutSeconds !== void 0) {
                        if (isNaN(e.timeoutSeconds)) throw new P(N.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);
                        if (e.timeoutSeconds < 5) throw new P(N.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);
                        if (e.timeoutSeconds > 30) throw new P(N.INVALID_ARGUMENT, `invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)
                    }
                }(this.experimentalLongPollingOptions), this.useFetchStreams = !!e.useFetchStreams
        }
        isEqual(e) {
            return this.host === e.host && this.ssl === e.ssl && this.credentials === e.credentials && this.cacheSizeBytes === e.cacheSizeBytes && this.experimentalForceLongPolling === e.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling && function(e, t) {
                return e.timeoutSeconds === t.timeoutSeconds
            }(this.experimentalLongPollingOptions, e.experimentalLongPollingOptions) && this.ignoreUndefinedProperties === e.ignoreUndefinedProperties && this.useFetchStreams === e.useFetchStreams
        }
    },
    jc = class {
        constructor(e, t, n, r) {
            this._authCredentials = e, this._appCheckCredentials = t, this._databaseId = n, this._app = r, this.type = `firestore-lite`, this._persistenceKey = `(lite)`, this._settings = new Ac({}), this._settingsFrozen = !1, this._emulatorOptions = {}, this._terminateTask = `notTerminated`
        }
        get app() {
            if (!this._app) throw new P(N.FAILED_PRECONDITION, `Firestore was not initialized using the Firebase SDK. 'app' is not available`);
            return this._app
        }
        get _initialized() {
            return this._settingsFrozen
        }
        get _terminated() {
            return this._terminateTask !== `notTerminated`
        }
        _setSettings(e) {
            if (this._settingsFrozen) throw new P(N.FAILED_PRECONDITION, `Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.`);
            this._settings = new Ac(e), this._emulatorOptions = e.emulatorOptions || {}, e.credentials !== void 0 && (this._authCredentials = function(e) {
                if (!e) return new ze;
                switch (e.type) {
                    case `firstParty`:
                        return new Ue(e.sessionIndex || `0`, e.iamToken || null, e.authTokenFactory || null);
                    case `provider`:
                        return e.client;
                    default:
                        throw new P(N.INVALID_ARGUMENT, `makeAuthCredentialsProvider failed due to invalid credential type`)
                }
            }(e.credentials))
        }
        _getSettings() {
            return this._settings
        }
        _getEmulatorOptions() {
            return this._emulatorOptions
        }
        _freezeSettings() {
            return this._settingsFrozen = !0, this._settings
        }
        _delete() {
            return this._terminateTask === `notTerminated` && (this._terminateTask = this._terminate()), this._terminateTask
        }
        async _restart() {
            this._terminateTask === `notTerminated` ? await this._terminate() : this._terminateTask = `notTerminated`
        }
        toJSON() {
            return {
                app: this._app,
                databaseId: this._databaseId,
                settings: this._settings
            }
        }
        _terminate() {
            return function(e) {
                let t = Ec.get(e);
                t && (k(Tc, `Removing Datastore`), Ec.delete(e), t.terminate())
            }(this), Promise.resolve()
        }
    };

function Mc(e, t, r, a = {}) {
    e = ut(e, jc);
    let o = n(t),
        s = e._getSettings(),
        c = {
            ...s,
            emulatorOptions: e._getEmulatorOptions()
        },
        l = `${t}:${r}`;
    o && i(`https://${l}`), s.host !== Oc && s.host !== l && Pe(`Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.`);
    let u = {
        ...s,
        host: l,
        ssl: o,
        emulatorOptions: a
    };
    if (!se(u, c) && (e._setSettings(u), a.mockUserToken)) {
        let t, n;
        if (typeof a.mockUserToken == `string`) t = a.mockUserToken, n = Oe.MOCK_USER;
        else {
            t = p(a.mockUserToken, e._app?.options.projectId);
            let r = a.mockUserToken.sub || a.mockUserToken.user_id;
            if (!r) throw new P(N.INVALID_ARGUMENT, `mockUserToken must contain 'sub' or 'user_id' field!`);
            n = new Oe(r)
        }
        e._authCredentials = new Be(new Re(t, n))
    }
}
var Nc = class e {
        constructor(e, t, n) {
            this.converter = t, this._query = n, this.type = `query`, this.firestore = e
        }
        withConverter(t) {
            return new e(this.firestore, t, this._query)
        }
    },
    Pc = class e {
        constructor(e, t, n) {
            this.converter = t, this._key = n, this.type = `document`, this.firestore = e
        }
        get _path() {
            return this._key.path
        }
        get id() {
            return this._key.path.lastSegment()
        }
        get path() {
            return this._key.path.canonicalString()
        }
        get parent() {
            return new Fc(this.firestore, this.converter, this._key.path.popLast())
        }
        withConverter(t) {
            return new e(this.firestore, t, this._key)
        }
        toJSON() {
            return {
                type: e._jsonSchemaVersion,
                referencePath: this._key.toString()
            }
        }
        static fromJSON(t, n, r) {
            if (ft(n, e._jsonSchema)) return new e(t, r || null, new I(tt.fromString(n.referencePath)))
        }
    };
Pc._jsonSchemaVersion = `firestore/documentReference/1.0`, Pc._jsonSchema = {
    type: dt(`string`, Pc._jsonSchemaVersion),
    referencePath: dt(`string`)
};
var Fc = class e extends Nc {
    constructor(e, t, n) {
        super(e, t, cr(n)), this._path = n, this.type = `collection`
    }
    get id() {
        return this._query.path.lastSegment()
    }
    get path() {
        return this._query.path.canonicalString()
    }
    get parent() {
        let e = this._path.popLast();
        return e.isEmpty() ? null : new Pc(this.firestore, null, new I(e))
    }
    withConverter(t) {
        return new e(this.firestore, t, this._path)
    }
};

function Ic(e, t, ...n) {
    if (e = w(e), it(`collection`, `path`, t), e instanceof jc) {
        let r = tt.fromString(t, ...n);
        return st(r), new Fc(e, null, r)
    } {
        if (!(e instanceof Pc || e instanceof Fc)) throw new P(N.INVALID_ARGUMENT, `Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore`);
        let r = e._path.child(tt.fromString(t, ...n));
        return st(r), new Fc(e.firestore, null, r)
    }
}

function Lc(e, t, ...n) {
    if (e = w(e), arguments.length === 1 && (t = qe.newId()), it(`doc`, `path`, t), e instanceof jc) {
        let r = tt.fromString(t, ...n);
        return ot(r), new Pc(e, null, new I(r))
    } {
        if (!(e instanceof Pc || e instanceof Fc)) throw new P(N.INVALID_ARGUMENT, `Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore`);
        let r = e._path.child(tt.fromString(t, ...n));
        return ot(r), new Pc(e.firestore, e instanceof Fc ? e.converter : null, new I(r))
    }
}
var Rc = `AsyncQueue`,
    zc = class {
        constructor(e = Promise.resolve()) {
            this.Yu = [], this.ec = !1, this.tc = [], this.nc = null, this.rc = !1, this.sc = !1, this.oc = [], this.M_ = new Ao(this, `async_queue_retry`), this._c = () => {
                let e = Oo();
                e && k(Rc, `Visibility state changed to ` + e.visibilityState), this.M_.w_()
            }, this.ac = e;
            let t = Oo();
            t && typeof t.addEventListener == `function` && t.addEventListener(`visibilitychange`, this._c)
        }
        get isShuttingDown() {
            return this.ec
        }
        enqueueAndForget(e) {
            this.enqueue(e)
        }
        enqueueAndForgetEvenWhileRestricted(e) {
            this.uc(), this.cc(e)
        }
        enterRestrictedMode(e) {
            if (!this.ec) {
                this.ec = !0, this.sc = e || !1;
                let t = Oo();
                t && typeof t.removeEventListener == `function` && t.removeEventListener(`visibilitychange`, this._c)
            }
        }
        enqueue(e) {
            if (this.uc(), this.ec) return new Promise((() => {}));
            let t = new Le;
            return this.cc((() => this.ec && this.sc ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise))).then((() => t.promise))
        }
        enqueueRetryable(e) {
            this.enqueueAndForget((() => (this.Yu.push(e), this.lc())))
        }
        async lc() {
            if (this.Yu.length !== 0) {
                try {
                    await this.Yu[0](), this.Yu.shift(), this.M_.reset()
                } catch (e) {
                    if (!Et(e)) throw e;
                    k(Rc, `Operation failed with retryable error: ` + e)
                }
                this.Yu.length > 0 && this.M_.p_((() => this.lc()))
            }
        }
        cc(e) {
            let t = this.ac.then((() => (this.rc = !0, e().catch((e => {
                throw this.nc = e, this.rc = !1, Ne(`INTERNAL UNHANDLED ERROR: `, Bc(e)), e
            })).then((e => (this.rc = !1, e))))));
            return this.ac = t, t
        }
        enqueueAfterDelay(e, t, n) {
            this.uc(), this.oc.indexOf(e) > -1 && (t = 0);
            let r = gs.createAndSchedule(this, e, t, n, (e => this.hc(e)));
            return this.tc.push(r), r
        }
        uc() {
            this.nc && A(47125, {
                Pc: Bc(this.nc)
            })
        }
        verifyOperationInProgress() {}
        async Tc() {
            let e;
            do e = this.ac, await e; while (e !== this.ac)
        }
        Ec(e) {
            for (let t of this.tc)
                if (t.timerId === e) return !0;
            return !1
        }
        Ic(e) {
            return this.Tc().then((() => {
                this.tc.sort(((e, t) => e.targetTimeMs - t.targetTimeMs));
                for (let t of this.tc)
                    if (t.skipDelay(), e !== `all` && t.timerId === e) break;
                return this.Tc()
            }))
        }
        Rc(e) {
            this.oc.push(e)
        }
        hc(e) {
            let t = this.tc.indexOf(e);
            this.tc.splice(t, 1)
        }
    };

function Bc(e) {
    let t = e.message || ``;
    return e.stack && (t = e.stack.includes(e.message) ? e.stack : e.message + `
` + e.stack), t
}
var Vc = class extends jc {
    constructor(e, t, n, r) {
        super(e, t, n, r), this.type = `firestore`, this._queue = new zc, this._persistenceKey = r?.name || `[DEFAULT]`
    }
    async _terminate() {
        if (this._firestoreClient) {
            let e = this._firestoreClient.terminate();
            this._queue = new zc(e), this._firestoreClient = void 0, await e
        }
    }
};

function Hc(e, t) {
    let n = typeof e == `object` ? e : m(),
        r = typeof e == `string` ? e : t || an,
        i = ee(n, `firestore`).getImmediate({
            identifier: r
        });
    if (!i._initialized) {
        let e = d(`firestore`);
        e && Mc(i, ...e)
    }
    return i
}

function Uc(e) {
    if (e._terminated) throw new P(N.FAILED_PRECONDITION, `The client has already been terminated.`);
    return e._firestoreClient || Wc(e), e._firestoreClient
}

function Wc(e) {
    let t = e._freezeSettings(),
        n = Dc(e._databaseId, e._app?.options.appId || ``, e._persistenceKey, e._app?.options.apiKey, t);
    e._componentsProvider || t.localCache?._offlineComponentProvider && t.localCache?._onlineComponentProvider && (e._componentsProvider = {
        _offline: t.localCache._offlineComponentProvider,
        _online: t.localCache._onlineComponentProvider
    }), e._firestoreClient = new mc(e._authCredentials, e._appCheckCredentials, e._queue, n, e._componentsProvider && function(e) {
        let t = e?._online.build();
        return {
            _offline: e?._offline.build(t),
            _online: t
        }
    }(e._componentsProvider))
}
var Gc = class e {
    constructor(e) {
        this._byteString = e
    }
    static fromBase64String(t) {
        try {
            return new e(Gt.fromBase64String(t))
        } catch (e) {
            throw new P(N.INVALID_ARGUMENT, `Failed to construct data from Base64 string: ` + e)
        }
    }
    static fromUint8Array(t) {
        return new e(Gt.fromUint8Array(t))
    }
    toBase64() {
        return this._byteString.toBase64()
    }
    toUint8Array() {
        return this._byteString.toUint8Array()
    }
    toString() {
        return `Bytes(base64: ` + this.toBase64() + `)`
    }
    isEqual(e) {
        return this._byteString.isEqual(e._byteString)
    }
    toJSON() {
        return {
            type: e._jsonSchemaVersion,
            bytes: this.toBase64()
        }
    }
    static fromJSON(t) {
        if (ft(t, e._jsonSchema)) return e.fromBase64String(t.bytes)
    }
};
Gc._jsonSchemaVersion = `firestore/bytes/1.0`, Gc._jsonSchema = {
    type: dt(`string`, Gc._jsonSchemaVersion),
    bytes: dt(`string`)
};
var Kc = class {
        constructor(...e) {
            for (let t = 0; t < e.length; ++t)
                if (e[t].length === 0) throw new P(N.INVALID_ARGUMENT, `Invalid field name at argument $(i + 1). Field names must not be empty.`);
            this._internalPath = new rt(e)
        }
        isEqual(e) {
            return this._internalPath.isEqual(e._internalPath)
        }
    },
    qc = class {
        constructor(e) {
            this._methodName = e
        }
    },
    Jc = class e {
        constructor(e, t) {
            if (!isFinite(e) || e < -90 || e > 90) throw new P(N.INVALID_ARGUMENT, `Latitude must be a number between -90 and 90, but was: ` + e);
            if (!isFinite(t) || t < -180 || t > 180) throw new P(N.INVALID_ARGUMENT, `Longitude must be a number between -180 and 180, but was: ` + t);
            this._lat = e, this._long = t
        }
        get latitude() {
            return this._lat
        }
        get longitude() {
            return this._long
        }
        isEqual(e) {
            return this._lat === e._lat && this._long === e._long
        }
        _compareTo(e) {
            return F(this._lat, e._lat) || F(this._long, e._long)
        }
        toJSON() {
            return {
                latitude: this._lat,
                longitude: this._long,
                type: e._jsonSchemaVersion
            }
        }
        static fromJSON(t) {
            if (ft(t, e._jsonSchema)) return new e(t.latitude, t.longitude)
        }
    };
Jc._jsonSchemaVersion = `firestore/geoPoint/1.0`, Jc._jsonSchema = {
    type: dt(`string`, Jc._jsonSchemaVersion),
    latitude: dt(`number`),
    longitude: dt(`number`)
};
var Yc = class e {
    constructor(e) {
        this._values = (e || []).map((e => e))
    }
    toArray() {
        return this._values.map((e => e))
    }
    isEqual(e) {
        return function(e, t) {
            if (e.length !== t.length) return !1;
            for (let n = 0; n < e.length; ++n)
                if (e[n] !== t[n]) return !1;
            return !0
        }(this._values, e._values)
    }
    toJSON() {
        return {
            type: e._jsonSchemaVersion,
            vectorValues: this._values
        }
    }
    static fromJSON(t) {
        if (ft(t, e._jsonSchema)) {
            if (Array.isArray(t.vectorValues) && t.vectorValues.every((e => typeof e == `number`))) return new e(t.vectorValues);
            throw new P(N.INVALID_ARGUMENT, `Expected 'vectorValues' field to be a number array`)
        }
    }
};
Yc._jsonSchemaVersion = `firestore/vectorValue/1.0`, Yc._jsonSchema = {
    type: dt(`string`, Yc._jsonSchemaVersion),
    vectorValues: dt(`object`)
};
var Xc = /^__.*__$/,
    Zc = class {
        constructor(e, t, n) {
            this.data = e, this.fieldMask = t, this.fieldTransforms = n
        }
        toMutation(e, t) {
            return this.fieldMask === null ? new si(e, this.data, t, this.fieldTransforms) : new ci(e, this.data, this.fieldMask, t, this.fieldTransforms)
        }
    },
    Qc = class {
        constructor(e, t, n) {
            this.data = e, this.fieldMask = t, this.fieldTransforms = n
        }
        toMutation(e, t) {
            return new ci(e, this.data, this.fieldMask, t, this.fieldTransforms)
        }
    };

function $c(e) {
    switch (e) {
        case 0:
        case 2:
        case 1:
            return !0;
        case 3:
        case 4:
            return !1;
        default:
            throw A(40011, {
                dataSource: e
            })
    }
}
var el = class e {
        constructor(e, t, n, r, i, a) {
            this.settings = e, this.databaseId = t, this.serializer = n, this.ignoreUndefinedProperties = r, i === void 0 && this.Ac(), this.fieldTransforms = i || [], this.fieldMask = a || []
        }
        get path() {
            return this.settings.path
        }
        get dataSource() {
            return this.settings.dataSource
        }
        i(t) {
            return new e({
                ...this.settings,
                ...t
            }, this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask)
        }
        dc(e) {
            let t = this.path?.child(e),
                n = this.i({
                    path: t,
                    arrayElement: !1
                });
            return n.mc(e), n
        }
        fc(e) {
            let t = this.path?.child(e),
                n = this.i({
                    path: t,
                    arrayElement: !1
                });
            return n.Ac(), n
        }
        gc(e) {
            return this.i({
                path: void 0,
                arrayElement: !0
            })
        }
        yc(e) {
            return ml(e, this.settings.methodName, this.settings.hasConverter || !1, this.path, this.settings.targetDoc)
        }
        contains(e) {
            return this.fieldMask.find((t => e.isPrefixOf(t))) !== void 0 || this.fieldTransforms.find((t => e.isPrefixOf(t.field))) !== void 0
        }
        Ac() {
            if (this.path)
                for (let e = 0; e < this.path.length; e++) this.mc(this.path.get(e))
        }
        mc(e) {
            if (e.length === 0) throw this.yc(`Document fields must not be empty`);
            if ($c(this.dataSource) && Xc.test(e)) throw this.yc(`Document fields cannot begin and end with "__"`)
        }
    },
    tl = class {
        constructor(e, t, n) {
            this.databaseId = e, this.ignoreUndefinedProperties = t, this.serializer = n || ko(e)
        }
        A(e, t, n, r = !1) {
            return new el({
                dataSource: e,
                methodName: t,
                targetDoc: n,
                path: rt.emptyPath(),
                arrayElement: !1,
                hasConverter: r
            }, this.databaseId, this.serializer, this.ignoreUndefinedProperties)
        }
    };

function nl(e) {
    let t = e._freezeSettings(),
        n = ko(e._databaseId);
    return new tl(e._databaseId, !!t.ignoreUndefinedProperties, n)
}

function rl(e, t, n, r, i, a = {}) {
    let o = e.A(a.merge || a.mergeFields ? 2 : 0, t, n, i);
    ul(`Data must be an object, but it was:`, o, r);
    let s = cl(r, o),
        c, l;
    if (a.merge) c = new Ut(o.fieldMask), l = o.fieldTransforms;
    else if (a.mergeFields) {
        let e = [];
        for (let r of a.mergeFields) {
            let i = dl(t, r, n);
            if (!o.contains(i)) throw new P(N.INVALID_ARGUMENT, `Field '${i}' is specified in your field mask but missing from your input data.`);
            hl(e, i) || e.push(i)
        }
        c = new Ut(e), l = o.fieldTransforms.filter((e => c.covers(e.field)))
    } else c = null, l = o.fieldTransforms;
    return new Zc(new An(s), c, l)
}
var il = class e extends qc {
    _toFieldTransform(e) {
        if (e.dataSource !== 2) throw e.dataSource === 1 ? e.yc(`${this._methodName}() can only appear at the top level of your update data`) : e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
        return e.fieldMask.push(e.path), null
    }
    isEqual(t) {
        return t instanceof e
    }
};

function al(e, t, n, r) {
    let i = e.A(1, t, n);
    ul(`Data must be an object, but it was:`, i, r);
    let a = [],
        o = An.empty();
    return Lt(r, ((e, r) => {
        let s = pl(t, e, n);
        r = w(r);
        let c = i.fc(s);
        if (r instanceof il) a.push(s);
        else {
            let e = sl(r, c);
            e != null && (a.push(s), o.set(s, e))
        }
    })), new Qc(o, new Ut(a), i.fieldTransforms)
}

function ol(e, t, n, r, i, a) {
    let o = e.A(1, t, n),
        s = [dl(t, r, n)],
        c = [i];
    if (a.length % 2 != 0) throw new P(N.INVALID_ARGUMENT, `Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);
    for (let e = 0; e < a.length; e += 2) s.push(dl(t, a[e])), c.push(a[e + 1]);
    let l = [],
        u = An.empty();
    for (let e = s.length - 1; e >= 0; --e)
        if (!hl(l, s[e])) {
            let t = s[e],
                n = c[e];
            n = w(n);
            let r = o.fc(t);
            if (n instanceof il) l.push(t);
            else {
                let e = sl(n, r);
                e != null && (l.push(t), u.set(t, e))
            }
        } return new Qc(u, new Ut(l), o.fieldTransforms)
}

function sl(e, t) {
    if (ll(e = w(e))) return ul(`Unsupported field value:`, t, e), cl(e, t);
    if (e instanceof qc) return function(e, t) {
        if (!$c(t.dataSource)) throw t.yc(`${e._methodName}() can only be used with update() and set()`);
        if (!t.path) throw t.yc(`${e._methodName}() is not currently supported inside arrays`);
        let n = e._toFieldTransform(t);
        n && t.fieldTransforms.push(n)
    }(e, t), null;
    if (e === void 0 && t.ignoreUndefinedProperties) return null;
    if (t.path && t.fieldMask.push(t.path), e instanceof Array) {
        if (t.settings.arrayElement && t.dataSource !== 4) throw t.yc(`Nested arrays are not supported`);
        return function(e, t) {
            let n = [],
                r = 0;
            for (let i of e) {
                let e = sl(i, t.gc(r));
                e ??= {
                    nullValue: `NULL_VALUE`
                }, n.push(e), r++
            }
            return {
                arrayValue: {
                    values: n
                }
            }
        }(e, t)
    }
    return function(e, t) {
        if ((e = w(e)) === null) return {
            nullValue: `NULL_VALUE`
        };
        if (typeof e == `number`) return Rr(t.serializer, e);
        if (typeof e == `boolean`) return {
            booleanValue: e
        };
        if (typeof e == `string`) return {
            stringValue: e
        };
        if (e instanceof Date) {
            let n = ht.fromDate(e);
            return {
                timestampValue: Vi(t.serializer, n)
            }
        }
        if (e instanceof ht) {
            let n = new ht(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
            return {
                timestampValue: Vi(t.serializer, n)
            }
        }
        if (e instanceof Jc) return {
            geoPointValue: {
                latitude: e.latitude,
                longitude: e.longitude
            }
        };
        if (e instanceof Gc) return {
            bytesValue: Hi(t.serializer, e._byteString)
        };
        if (e instanceof Pc) {
            let n = t.databaseId,
                r = e.firestore._databaseId;
            if (!r.isEqual(n)) throw t.yc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);
            return {
                referenceValue: Gi(e.firestore._databaseId || t.databaseId, e._key.path)
            }
        }
        if (e instanceof Yc) return function(e, t) {
            let n = e instanceof Yc ? e.toArray() : e;
            return {
                mapValue: {
                    fields: {
                        [cn]: {
                            stringValue: dn
                        },
                        [fn]: {
                            arrayValue: {
                                values: n.map((e => {
                                    if (typeof e != `number`) throw t.yc(`VectorValues must only contain numeric values.`);
                                    return Ir(t.serializer, e)
                                }))
                            }
                        }
                    }
                }
            }
        }(e, t);
        if (_a(e)) return e._toProto(t.serializer);
        throw t.yc(`Unsupported field value: ${lt(e)}`)
    }(e, t)
}

function cl(e, t) {
    let n = {};
    return Rt(e) ? t.path && t.path.length > 0 && t.fieldMask.push(t.path) : Lt(e, ((e, r) => {
        let i = sl(r, t.dc(e));
        i != null && (n[e] = i)
    })), {
        mapValue: {
            fields: n
        }
    }
}

function ll(e) {
    return !(typeof e != `object` || !e || e instanceof Array || e instanceof Date || e instanceof ht || e instanceof Jc || e instanceof Gc || e instanceof Pc || e instanceof qc || e instanceof Yc || _a(e))
}

function ul(e, t, n) {
    if (!ll(n) || !ct(n)) {
        let r = lt(n);
        throw r === `an object` ? t.yc(e + ` a custom object`) : t.yc(e + ` ` + r)
    }
}

function dl(e, t, n) {
    if ((t = w(t)) instanceof Kc) return t._internalPath;
    if (typeof t == `string`) return pl(e, t);
    throw ml(`Field path arguments must be of type string or `, e, !1, void 0, n)
}
var fl = RegExp(`[~\\*/\\[\\]]`);

function pl(e, t, n) {
    if (t.search(fl) >= 0) throw ml(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`, e, !1, void 0, n);
    try {
        return new Kc(...t.split(`.`))._internalPath
    } catch {
        throw ml(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, e, !1, void 0, n)
    }
}

function ml(e, t, n, r, i) {
    let a = r && !r.isEmpty(),
        o = i !== void 0,
        s = `Function ${t}() called with invalid data`;
    n && (s += " (via `toFirestore()`)"), s += `. `;
    let c = ``;
    return (a || o) && (c += ` (found`, a && (c += ` in field ${r}`), o && (c += ` in document ${i}`), c += `)`), new P(N.INVALID_ARGUMENT, s + e + c)
}

function hl(e, t) {
    return e.some((e => e.isEqual(t)))
}
var gl = class {
        convertValue(e, t = `none`) {
            switch (pn(e)) {
                case 0:
                    return null;
                case 1:
                    return e.booleanValue;
                case 2:
                    return Jt(e.integerValue || e.doubleValue);
                case 3:
                    return this.convertTimestamp(e.timestampValue);
                case 4:
                    return this.convertServerTimestamp(e, t);
                case 5:
                    return e.stringValue;
                case 6:
                    return this.convertBytes(Yt(e.bytesValue));
                case 7:
                    return this.convertReference(e.referenceValue);
                case 8:
                    return this.convertGeoPoint(e.geoPointValue);
                case 9:
                    return this.convertArray(e.arrayValue, t);
                case 11:
                    return this.convertObject(e.mapValue, t);
                case 10:
                    return this.convertVectorValue(e.mapValue);
                default:
                    throw A(62114, {
                        value: e
                    })
            }
        }
        convertObject(e, t) {
            return this.convertObjectMap(e.fields, t)
        }
        convertObjectMap(e, t = `none`) {
            let n = {};
            return Lt(e, ((e, r) => {
                n[e] = this.convertValue(r, t)
            })), n
        }
        convertVectorValue(e) {
            let t = e.fields?.[fn].arrayValue?.values?.map((e => Jt(e.doubleValue)));
            return new Yc(t)
        }
        convertGeoPoint(e) {
            return new Jc(Jt(e.latitude), Jt(e.longitude))
        }
        convertArray(e, t) {
            return (e.values || []).map((e => this.convertValue(e, t)))
        }
        convertServerTimestamp(e, t) {
            switch (t) {
                case `previous`:
                    let n = tn(e);
                    return n == null ? null : this.convertValue(n, t);
                case `estimate`:
                    return this.convertTimestamp(nn(e));
                default:
                    return null
            }
        }
        convertTimestamp(e) {
            let t = qt(e);
            return new ht(t.seconds, t.nanos)
        }
        convertDocumentKey(e, t) {
            let n = tt.fromString(e);
            j(ga(n), 9688, {
                name: e
            });
            let r = new on(n.get(1), n.get(3)),
                i = new I(n.popFirst(5));
            return r.isEqual(t) || Ne(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`), i
        }
    },
    _l = class extends gl {
        constructor(e) {
            super(), this.firestore = e
        }
        convertBytes(e) {
            return new Gc(e)
        }
        convertReference(e) {
            let t = this.convertDocumentKey(e, this.firestore._databaseId);
            return new Pc(this.firestore, null, t)
        }
    },
    vl = `@firebase/firestore`,
    yl = `4.13.0`,
    bl = class {
        constructor(e, t, n, r, i) {
            this._firestore = e, this._userDataWriter = t, this._key = n, this._document = r, this._converter = i
        }
        get id() {
            return this._key.path.lastSegment()
        }
        get ref() {
            return new Pc(this._firestore, this._converter, this._key)
        }
        exists() {
            return this._document !== null
        }
        data() {
            if (this._document) {
                if (this._converter) {
                    let e = new xl(this._firestore, this._userDataWriter, this._key, this._document, null);
                    return this._converter.fromFirestore(e)
                }
                return this._userDataWriter.convertValue(this._document.data.value)
            }
        }
        _fieldsProto() {
            return this._document?.data.clone().value.mapValue.fields ?? void 0
        }
        get(e) {
            if (this._document) {
                let t = this._document.data.field(dl(`DocumentSnapshot.get`, e));
                if (t !== null) return this._userDataWriter.convertValue(t)
            }
        }
    },
    xl = class extends bl {
        data() {
            return super.data()
        }
    };

function Sl(e) {
    if (e.limitType === `L` && e.explicitOrderBy.length === 0) throw new P(N.UNIMPLEMENTED, `limitToLast() queries require specifying at least one orderBy() clause`)
}

function Cl(e, t, n) {
    let r;
    return r = e ? n && (n.merge || n.mergeFields) ? e.toFirestore(t, n) : e.toFirestore(t) : t, r
}
var wl = class {
        constructor(e, t) {
            this.hasPendingWrites = e, this.fromCache = t
        }
        isEqual(e) {
            return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache
        }
    },
    Tl = class e extends bl {
        constructor(e, t, n, r, i, a) {
            super(e, t, n, r, a), this._firestore = e, this._firestoreImpl = e, this.metadata = i
        }
        exists() {
            return super.exists()
        }
        data(e = {}) {
            if (this._document) {
                if (this._converter) {
                    let t = new El(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, null);
                    return this._converter.fromFirestore(t, e)
                }
                return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps)
            }
        }
        get(e, t = {}) {
            if (this._document) {
                let n = this._document.data.field(dl(`DocumentSnapshot.get`, e));
                if (n !== null) return this._userDataWriter.convertValue(n, t.serverTimestamps)
            }
        }
        toJSON() {
            if (this.metadata.hasPendingWrites) throw new P(N.FAILED_PRECONDITION, `DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().`);
            let t = this._document,
                n = {};
            return n.type = e._jsonSchemaVersion, n.bundle = ``, n.bundleSource = `DocumentSnapshot`, n.bundleName = this._key.toString(), !t || !t.isValidDocument() || !t.isFoundDocument() ? n : (this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields, `previous`), n.bundle = (this._firestore, this.ref.path, `NOT SUPPORTED`), n)
        }
    };
Tl._jsonSchemaVersion = `firestore/documentSnapshot/1.0`, Tl._jsonSchema = {
    type: dt(`string`, Tl._jsonSchemaVersion),
    bundleSource: dt(`string`, `DocumentSnapshot`),
    bundleName: dt(`string`),
    bundle: dt(`string`)
};
var El = class extends Tl {
        data(e = {}) {
            return super.data(e)
        }
    },
    Dl = class e {
        constructor(e, t, n, r) {
            this._firestore = e, this._userDataWriter = t, this._snapshot = r, this.metadata = new wl(r.hasPendingWrites, r.fromCache), this.query = n
        }
        get docs() {
            let e = [];
            return this.forEach((t => e.push(t))), e
        }
        get size() {
            return this._snapshot.docs.size
        }
        get empty() {
            return this.size === 0
        }
        forEach(e, t) {
            this._snapshot.docs.forEach((n => {
                e.call(t, new El(this._firestore, this._userDataWriter, n.key, n, new wl(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter))
            }))
        }
        docChanges(e = {}) {
            let t = !!e.includeMetadataChanges;
            if (t && this._snapshot.excludesMetadataChanges) throw new P(N.INVALID_ARGUMENT, `To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().`);
            return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === t || (this._cachedChanges = function(e, t) {
                if (e._snapshot.oldDocs.isEmpty()) {
                    let t = 0;
                    return e._snapshot.docChanges.map((n => {
                        let r = new El(e._firestore, e._userDataWriter, n.doc.key, n.doc, new wl(e._snapshot.mutatedKeys.has(n.doc.key), e._snapshot.fromCache), e.query.converter);
                        return n.doc, {
                            type: `added`,
                            doc: r,
                            oldIndex: -1,
                            newIndex: t++
                        }
                    }))
                } {
                    let n = e._snapshot.oldDocs;
                    return e._snapshot.docChanges.filter((e => t || e.type !== 3)).map((t => {
                        let r = new El(e._firestore, e._userDataWriter, t.doc.key, t.doc, new wl(e._snapshot.mutatedKeys.has(t.doc.key), e._snapshot.fromCache), e.query.converter),
                            i = -1,
                            a = -1;
                        return t.type !== 0 && (i = n.indexOf(t.doc.key), n = n.delete(t.doc.key)), t.type !== 1 && (n = n.add(t.doc), a = n.indexOf(t.doc.key)), {
                            type: Ol(t.type),
                            doc: r,
                            oldIndex: i,
                            newIndex: a
                        }
                    }))
                }
            }(this, t), this._cachedChangesIncludeMetadataChanges = t), this._cachedChanges
        }
        toJSON() {
            if (this.metadata.hasPendingWrites) throw new P(N.FAILED_PRECONDITION, `QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().`);
            let t = {};
            t.type = e._jsonSchemaVersion, t.bundleSource = `QuerySnapshot`, t.bundleName = qe.newId(), this._firestore._databaseId.database, this._firestore._databaseId.projectId;
            let n = [],
                r = [],
                i = [];
            return this.docs.forEach((e => {
                e._document !== null && (n.push(e._document), r.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields, `previous`)), i.push(e.ref.path))
            })), t.bundle = (this._firestore, this.query._query, t.bundleName, `NOT SUPPORTED`), t
        }
    };

function Ol(e) {
    switch (e) {
        case 0:
            return `added`;
        case 2:
        case 3:
            return `modified`;
        case 1:
            return `removed`;
        default:
            return A(61501, {
                type: e
            })
    }
}
Dl._jsonSchemaVersion = `firestore/querySnapshot/1.0`, Dl._jsonSchema = {
    type: dt(`string`, Dl._jsonSchemaVersion),
    bundleSource: dt(`string`, `QuerySnapshot`),
    bundleName: dt(`string`),
    bundle: dt(`string`)
};
var kl = class {
    constructor(e, t) {
        this._firestore = e, this._commitHandler = t, this._mutations = [], this._committed = !1, this._dataReader = nl(e)
    }
    set(e, t, n) {
        this._verifyNotCommitted();
        let r = Al(e, this._firestore),
            i = Cl(r.converter, t, n),
            a = rl(this._dataReader, `WriteBatch.set`, r._key, i, r.converter !== null, n);
        return this._mutations.push(a.toMutation(r._key, $r.none())), this
    }
    update(e, t, n, ...r) {
        this._verifyNotCommitted();
        let i = Al(e, this._firestore),
            a;
        return a = typeof(t = w(t)) == `string` || t instanceof Kc ? ol(this._dataReader, `WriteBatch.update`, i._key, t, n, r) : al(this._dataReader, `WriteBatch.update`, i._key, t), this._mutations.push(a.toMutation(i._key, $r.exists(!0))), this
    }
    delete(e) {
        this._verifyNotCommitted();
        let t = Al(e, this._firestore);
        return this._mutations = this._mutations.concat(new fi(t._key, $r.none())), this
    }
    commit() {
        return this._verifyNotCommitted(), this._committed = !0, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve()
    }
    _verifyNotCommitted() {
        if (this._committed) throw new P(N.FAILED_PRECONDITION, `A write batch can no longer be used after commit() has been called.`)
    }
};

function Al(e, t) {
    if ((e = w(e)).firestore !== t) throw new P(N.INVALID_ARGUMENT, `Provided document reference is from a different Firestore instance.`);
    return e
}

function jl(e) {
    e = ut(e, Pc);
    let t = ut(e.firestore, Vc);
    return xc(Uc(t), e._key).then((n => Fl(t, e, n)))
}

function Ml(e) {
    e = ut(e, Nc);
    let t = ut(e.firestore, Vc),
        n = Uc(t),
        r = new _l(t);
    return Sl(e._query), Sc(n, e._query).then((n => new Dl(t, r, e, n)))
}

function Nl(e, t, n) {
    e = ut(e, Pc);
    let r = ut(e.firestore, Vc),
        i = Cl(e.converter, t, n);
    return Pl(r, [rl(nl(r), `setDoc`, e._key, i, e.converter !== null, n).toMutation(e._key, $r.none())])
}

function Pl(e, t) {
    return Cc(Uc(e), t)
}

function Fl(e, t, n) {
    let r = n.docs.get(t._key);
    return new Tl(e, new _l(e), t._key, r, new wl(n.hasPendingWrites, n.fromCache), t.converter)
}

function Il(e) {
    return e = ut(e, Vc), Uc(e), new kl(e, (t => Pl(e, t)))
}(function(e, t = !0) {
    Ae(C), y(new g(`firestore`, ((e, {
        instanceIdentifier: n,
        options: r
    }) => {
        let i = e.getProvider(`app`).getImmediate(),
            a = new Vc(new Ve(e.getProvider(`auth-internal`)), new Ge(i, e.getProvider(`app-check-internal`)), sn(i, n), i);
        return r = {
            useFetchStreams: t,
            ...r
        }, a._setSettings(r), a
    }), `PUBLIC`).setMultipleInstances(!0)), re(vl, yl, e), re(vl, yl, `esm2020`)
})();

function Ll() {
    return {
        "dependent-sdk-initialized-before-auth": "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
    }
}
var Rl = Ll,
    zl = new _(`auth`, `Firebase`, Ll()),
    G = new ie(`@firebase/auth`);

function Bl(e, ...t) {
    G.logLevel <= x.WARN && G.warn(`Auth (${C}): ${e}`, ...t)
}

function K(e, ...t) {
    G.logLevel <= x.ERROR && G.error(`Auth (${C}): ${e}`, ...t)
}

function q(e, ...t) {
    throw Ul(e, ...t)
}

function J(e, ...t) {
    return Ul(e, ...t)
}

function Vl(e, t, n) {
    return new _(`auth`, `Firebase`, {
        ...Rl(),
        [t]: n
    }).create(t, {
        appName: e.name
    })
}

function Hl(e) {
    return Vl(e, `operation-not-supported-in-this-environment`, `Operations that alter the current user are not supported in conjunction with FirebaseServerApp`)
}

function Ul(e, ...t) {
    if (typeof e != `string`) {
        let n = t[0],
            r = [...t.slice(1)];
        return r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r)
    }
    return zl.create(e, ...t)
}

function Y(e, t, ...n) {
    if (!e) throw Ul(t, ...n)
}

function Wl(e) {
    let t = `INTERNAL ASSERTION FAILED: ` + e;
    throw K(t), Error(t)
}

function X(e, t) {
    e || Wl(t)
}

function Gl() {
    return typeof self < `u` && self.location?.href || ``
}

function Kl() {
    return ql() === `http:` || ql() === `https:`
}

function ql() {
    return typeof self < `u` && self.location?.protocol || null
}

function Jl() {
    return typeof navigator < `u` && navigator && `onLine` in navigator && typeof navigator.onLine == `boolean` && (Kl() || r() || `connection` in navigator) ? navigator.onLine : !0
}

function Yl() {
    if (typeof navigator > `u`) return null;
    let e = navigator;
    return e.languages && e.languages[0] || e.language || null
}
var Xl = class {
    constructor(e, t) {
        this.shortDelay = e, this.longDelay = t, X(t > e, `Short delay should be less than long delay!`), this.isMobile = s() || c()
    }
    get() {
        return Jl() ? this.isMobile ? this.longDelay : this.shortDelay : Math.min(5e3, this.shortDelay)
    }
};

function Zl(e, t) {
    X(e.emulator, `Emulator should always be set here`);
    let {
        url: n
    } = e.emulator;
    return t ? `${n}${t.startsWith(`/`)?t.slice(1):t}` : n
}
var Ql = class {
        static initialize(e, t, n) {
            this.fetchImpl = e, t && (this.headersImpl = t), n && (this.responseImpl = n)
        }
        static fetch() {
            if (this.fetchImpl) return this.fetchImpl;
            if (typeof self < `u` && `fetch` in self) return self.fetch;
            if (typeof globalThis < `u` && globalThis.fetch) return globalThis.fetch;
            if (typeof fetch < `u`) return fetch;
            Wl(`Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)
        }
        static headers() {
            if (this.headersImpl) return this.headersImpl;
            if (typeof self < `u` && `Headers` in self) return self.Headers;
            if (typeof globalThis < `u` && globalThis.Headers) return globalThis.Headers;
            if (typeof Headers < `u`) return Headers;
            Wl(`Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)
        }
        static response() {
            if (this.responseImpl) return this.responseImpl;
            if (typeof self < `u` && `Response` in self) return self.Response;
            if (typeof globalThis < `u` && globalThis.Response) return globalThis.Response;
            if (typeof Response < `u`) return Response;
            Wl(`Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)
        }
    },
    $l = {
        CREDENTIAL_MISMATCH: `custom-token-mismatch`,
        MISSING_CUSTOM_TOKEN: `internal-error`,
        INVALID_IDENTIFIER: `invalid-email`,
        MISSING_CONTINUE_URI: `internal-error`,
        INVALID_PASSWORD: `wrong-password`,
        MISSING_PASSWORD: `missing-password`,
        INVALID_LOGIN_CREDENTIALS: `invalid-credential`,
        EMAIL_EXISTS: `email-already-in-use`,
        PASSWORD_LOGIN_DISABLED: `operation-not-allowed`,
        INVALID_IDP_RESPONSE: `invalid-credential`,
        INVALID_PENDING_TOKEN: `invalid-credential`,
        FEDERATED_USER_ID_ALREADY_LINKED: `credential-already-in-use`,
        MISSING_REQ_TYPE: `internal-error`,
        EMAIL_NOT_FOUND: `user-not-found`,
        RESET_PASSWORD_EXCEED_LIMIT: `too-many-requests`,
        EXPIRED_OOB_CODE: `expired-action-code`,
        INVALID_OOB_CODE: `invalid-action-code`,
        MISSING_OOB_CODE: `internal-error`,
        CREDENTIAL_TOO_OLD_LOGIN_AGAIN: `requires-recent-login`,
        INVALID_ID_TOKEN: `invalid-user-token`,
        TOKEN_EXPIRED: `user-token-expired`,
        USER_NOT_FOUND: `user-token-expired`,
        TOO_MANY_ATTEMPTS_TRY_LATER: `too-many-requests`,
        PASSWORD_DOES_NOT_MEET_REQUIREMENTS: `password-does-not-meet-requirements`,
        INVALID_CODE: `invalid-verification-code`,
        INVALID_SESSION_INFO: `invalid-verification-id`,
        INVALID_TEMPORARY_PROOF: `invalid-credential`,
        MISSING_SESSION_INFO: `missing-verification-id`,
        SESSION_EXPIRED: `code-expired`,
        MISSING_ANDROID_PACKAGE_NAME: `missing-android-pkg-name`,
        UNAUTHORIZED_DOMAIN: `unauthorized-continue-uri`,
        INVALID_OAUTH_CLIENT_ID: `invalid-oauth-client-id`,
        ADMIN_ONLY_OPERATION: `admin-restricted-operation`,
        INVALID_MFA_PENDING_CREDENTIAL: `invalid-multi-factor-session`,
        MFA_ENROLLMENT_NOT_FOUND: `multi-factor-info-not-found`,
        MISSING_MFA_ENROLLMENT_ID: `missing-multi-factor-info`,
        MISSING_MFA_PENDING_CREDENTIAL: `missing-multi-factor-session`,
        SECOND_FACTOR_EXISTS: `second-factor-already-in-use`,
        SECOND_FACTOR_LIMIT_EXCEEDED: `maximum-second-factor-count-exceeded`,
        BLOCKING_FUNCTION_ERROR_RESPONSE: `internal-error`,
        RECAPTCHA_NOT_ENABLED: `recaptcha-not-enabled`,
        MISSING_RECAPTCHA_TOKEN: `missing-recaptcha-token`,
        INVALID_RECAPTCHA_TOKEN: `invalid-recaptcha-token`,
        INVALID_RECAPTCHA_ACTION: `invalid-recaptcha-action`,
        MISSING_CLIENT_TYPE: `missing-client-type`,
        MISSING_RECAPTCHA_VERSION: `missing-recaptcha-version`,
        INVALID_RECAPTCHA_VERSION: `invalid-recaptcha-version`,
        INVALID_REQ_TYPE: `invalid-req-type`
    },
    eu = [`/v1/accounts:signInWithCustomToken`, `/v1/accounts:signInWithEmailLink`, `/v1/accounts:signInWithIdp`, `/v1/accounts:signInWithPassword`, `/v1/accounts:signInWithPhoneNumber`, `/v1/token`],
    tu = new Xl(3e4, 6e4);

function nu(e, t) {
    return e.tenantId && !t.tenantId ? {
        ...t,
        tenantId: e.tenantId
    } : t
}
async function ru(e, t, r, i, o = {}) {
    return iu(e, o, async () => {
        let o = {},
            s = {};
        i && (t === `GET` ? s = i : o = {
            body: JSON.stringify(i)
        });
        let c = a({
                key: e.config.apiKey,
                ...s
            }).slice(1),
            u = await e._getAdditionalHeaders();
        u[`Content-Type`] = `application/json`, e.languageCode && (u[`X-Firebase-Locale`] = e.languageCode);
        let d = {
            method: t,
            headers: u,
            ...o
        };
        return l() || (d.referrerPolicy = `no-referrer`), e.emulatorConfig && n(e.emulatorConfig.host) && (d.credentials = `include`), Ql.fetch()(await ou(e, e.config.apiHost, r, c), d)
    })
}
async function iu(e, t, n) {
    e._canInitEmulator = !1;
    let r = {
        ...$l,
        ...t
    };
    try {
        let t = new cu(e),
            i = await Promise.race([n(), t.promise]);
        t.clearNetworkTimeout();
        let a = await i.json();
        if (`needConfirmation` in a) throw lu(e, `account-exists-with-different-credential`, a);
        if (i.ok && !(`errorMessage` in a)) return a;
        {
            let [t, n] = (i.ok ? a.errorMessage : a.error.message).split(` : `);
            if (t === `FEDERATED_USER_ID_ALREADY_LINKED`) throw lu(e, `credential-already-in-use`, a);
            if (t === `EMAIL_EXISTS`) throw lu(e, `email-already-in-use`, a);
            if (t === `USER_DISABLED`) throw lu(e, `user-disabled`, a);
            let o = r[t] || t.toLowerCase().replace(/[_\s]+/g, `-`);
            if (n) throw Vl(e, o, n);
            q(e, o)
        }
    } catch (t) {
        if (t instanceof S) throw t;
        q(e, `network-request-failed`, {
            message: String(t)
        })
    }
}
async function au(e, t, n, r, i = {}) {
    let a = await ru(e, t, n, r, i);
    return `mfaPendingCredential` in a && q(e, `multi-factor-auth-required`, {
        _serverResponse: a
    }), a
}
async function ou(e, t, n, r) {
    let i = `${t}${n}?${r}`,
        a = e,
        o = a.config.emulator ? Zl(e.config, i) : `${e.config.apiScheme}://${i}`;
    return eu.includes(n) && (await a._persistenceManagerAvailable, a._getPersistenceType() === `COOKIE`) ? a._getPersistence()._getFinalTarget(o).toString() : o
}

function su(e) {
    switch (e) {
        case `ENFORCE`:
            return `ENFORCE`;
        case `AUDIT`:
            return `AUDIT`;
        case `OFF`:
            return `OFF`;
        default:
            return `ENFORCEMENT_STATE_UNSPECIFIED`
    }
}
var cu = class {
    clearNetworkTimeout() {
        clearTimeout(this.timer)
    }
    constructor(e) {
        this.auth = e, this.timer = null, this.promise = new Promise((e, t) => {
            this.timer = setTimeout(() => t(J(this.auth, `network-request-failed`)), tu.get())
        })
    }
};

function lu(e, t, n) {
    let r = {
        appName: e.name
    };
    n.email && (r.email = n.email), n.phoneNumber && (r.phoneNumber = n.phoneNumber);
    let i = J(e, t, r);
    return i.customData._tokenResponse = n, i
}

function uu(e) {
    return e !== void 0 && e.enterprise !== void 0
}
var du = class {
    constructor(e) {
        if (this.siteKey = ``, this.recaptchaEnforcementState = [], e.recaptchaKey === void 0) throw Error(`recaptchaKey undefined`);
        this.siteKey = e.recaptchaKey.split(`/`)[3], this.recaptchaEnforcementState = e.recaptchaEnforcementState
    }
    getProviderEnforcementState(e) {
        if (!this.recaptchaEnforcementState || this.recaptchaEnforcementState.length === 0) return null;
        for (let t of this.recaptchaEnforcementState)
            if (t.provider && t.provider === e) return su(t.enforcementState);
        return null
    }
    isProviderEnabled(e) {
        return this.getProviderEnforcementState(e) === `ENFORCE` || this.getProviderEnforcementState(e) === `AUDIT`
    }
    isAnyProviderEnabled() {
        return this.isProviderEnabled(`EMAIL_PASSWORD_PROVIDER`) || this.isProviderEnabled(`PHONE_PROVIDER`)
    }
};
async function fu(e, t) {
    return ru(e, `GET`, `/v2/recaptchaConfig`, nu(e, t))
}
async function pu(e, t) {
    return ru(e, `POST`, `/v1/accounts:delete`, t)
}
async function mu(e, t) {
    return ru(e, `POST`, `/v1/accounts:lookup`, t)
}

function hu(e) {
    if (e) try {
        let t = new Date(Number(e));
        if (!isNaN(t.getTime())) return t.toUTCString()
    } catch {}
}
async function gu(e, t = !1) {
    let n = w(e),
        r = await n.getIdToken(t),
        i = vu(r);
    Y(i && i.exp && i.auth_time && i.iat, n.auth, `internal-error`);
    let a = typeof i.firebase == `object` ? i.firebase : void 0,
        o = a?.sign_in_provider;
    return {
        claims: i,
        token: r,
        authTime: hu(_u(i.auth_time)),
        issuedAtTime: hu(_u(i.iat)),
        expirationTime: hu(_u(i.exp)),
        signInProvider: o || null,
        signInSecondFactor: a?.sign_in_second_factor || null
    }
}

function _u(e) {
    return Number(e) * 1e3
}

function vu(e) {
    let [t, n, r] = e.split(`.`);
    if (t === void 0 || n === void 0 || r === void 0) return K(`JWT malformed, contained fewer than 3 sections`), null;
    try {
        let e = v(n);
        return e ? JSON.parse(e) : (K(`Failed to decode base64 JWT payload`), null)
    } catch (e) {
        return K(`Caught error parsing JWT payload as JSON`, e?.toString()), null
    }
}

function yu(e) {
    let t = vu(e);
    return Y(t, `internal-error`), Y(t.exp !== void 0, `internal-error`), Y(t.iat !== void 0, `internal-error`), Number(t.exp) - Number(t.iat)
}
async function bu(e, t, n = !1) {
    if (n) return t;
    try {
        return await t
    } catch (t) {
        throw t instanceof S && xu(t) && e.auth.currentUser === e && await e.auth.signOut(), t
    }
}

function xu({
    code: e
}) {
    return e === `auth/user-disabled` || e === `auth/user-token-expired`
}
var Su = class {
        constructor(e) {
            this.user = e, this.isRunning = !1, this.timerId = null, this.errorBackoff = 3e4
        }
        _start() {
            this.isRunning || (this.isRunning = !0, this.schedule())
        }
        _stop() {
            this.isRunning && (this.isRunning = !1, this.timerId !== null && clearTimeout(this.timerId))
        }
        getInterval(e) {
            if (e) {
                let e = this.errorBackoff;
                return this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4), e
            } else {
                this.errorBackoff = 3e4;
                let e = (this.user.stsTokenManager.expirationTime ?? 0) - Date.now() - 3e5;
                return Math.max(0, e)
            }
        }
        schedule(e = !1) {
            if (!this.isRunning) return;
            let t = this.getInterval(e);
            this.timerId = setTimeout(async () => {
                await this.iteration()
            }, t)
        }
        async iteration() {
            try {
                await this.user.getIdToken(!0)
            } catch (e) {
                e?.code === `auth/network-request-failed` && this.schedule(!0);
                return
            }
            this.schedule()
        }
    },
    Cu = class {
        constructor(e, t) {
            this.createdAt = e, this.lastLoginAt = t, this._initializeTime()
        }
        _initializeTime() {
            this.lastSignInTime = hu(this.lastLoginAt), this.creationTime = hu(this.createdAt)
        }
        _copy(e) {
            this.createdAt = e.createdAt, this.lastLoginAt = e.lastLoginAt, this._initializeTime()
        }
        toJSON() {
            return {
                createdAt: this.createdAt,
                lastLoginAt: this.lastLoginAt
            }
        }
    };
async function wu(e) {
    let t = e.auth,
        n = await bu(e, mu(t, {
            idToken: await e.getIdToken()
        }));
    Y(n?.users.length, t, `internal-error`);
    let r = n.users[0];
    e._notifyReloadListener(r);
    let i = r.providerUserInfo?.length ? Du(r.providerUserInfo) : [],
        a = Eu(e.providerData, i),
        o = e.isAnonymous,
        s = !(e.email && r.passwordHash) && !a?.length,
        c = o ? s : !1,
        l = {
            uid: r.localId,
            displayName: r.displayName || null,
            photoURL: r.photoUrl || null,
            email: r.email || null,
            emailVerified: r.emailVerified || !1,
            phoneNumber: r.phoneNumber || null,
            tenantId: r.tenantId || null,
            providerData: a,
            metadata: new Cu(r.createdAt, r.lastLoginAt),
            isAnonymous: c
        };
    Object.assign(e, l)
}
async function Tu(e) {
    let t = w(e);
    await wu(t), await t.auth._persistUserIfCurrent(t), t.auth._notifyListenersIfCurrent(t)
}

function Eu(e, t) {
    return [...e.filter(e => !t.some(t => t.providerId === e.providerId)), ...t]
}

function Du(e) {
    return e.map(({
        providerId: e,
        ...t
    }) => ({
        providerId: e,
        uid: t.rawId || ``,
        displayName: t.displayName || null,
        email: t.email || null,
        phoneNumber: t.phoneNumber || null,
        photoURL: t.photoUrl || null
    }))
}
async function Ou(e, t) {
    let r = await iu(e, {}, async () => {
        let r = a({
                grant_type: `refresh_token`,
                refresh_token: t
            }).slice(1),
            {
                tokenApiHost: i,
                apiKey: o
            } = e.config,
            s = await ou(e, i, `/v1/token`, `key=${o}`),
            c = await e._getAdditionalHeaders();
        c[`Content-Type`] = `application/x-www-form-urlencoded`;
        let l = {
            method: `POST`,
            headers: c,
            body: r
        };
        return e.emulatorConfig && n(e.emulatorConfig.host) && (l.credentials = `include`), Ql.fetch()(s, l)
    });
    return {
        accessToken: r.access_token,
        expiresIn: r.expires_in,
        refreshToken: r.refresh_token
    }
}
async function ku(e, t) {
    return ru(e, `POST`, `/v2/accounts:revokeToken`, nu(e, t))
}
var Au = class e {
    constructor() {
        this.refreshToken = null, this.accessToken = null, this.expirationTime = null
    }
    get isExpired() {
        return !this.expirationTime || Date.now() > this.expirationTime - 3e4
    }
    updateFromServerResponse(e) {
        Y(e.idToken, `internal-error`), Y(e.idToken !== void 0, `internal-error`), Y(e.refreshToken !== void 0, `internal-error`);
        let t = `expiresIn` in e && e.expiresIn !== void 0 ? Number(e.expiresIn) : yu(e.idToken);
        this.updateTokensAndExpiration(e.idToken, e.refreshToken, t)
    }
    updateFromIdToken(e) {
        Y(e.length !== 0, `internal-error`);
        let t = yu(e);
        this.updateTokensAndExpiration(e, null, t)
    }
    async getToken(e, t = !1) {
        return !t && this.accessToken && !this.isExpired ? this.accessToken : (Y(this.refreshToken, e, `user-token-expired`), this.refreshToken ? (await this.refresh(e, this.refreshToken), this.accessToken) : null)
    }
    clearRefreshToken() {
        this.refreshToken = null
    }
    async refresh(e, t) {
        let {
            accessToken: n,
            refreshToken: r,
            expiresIn: i
        } = await Ou(e, t);
        this.updateTokensAndExpiration(n, r, Number(i))
    }
    updateTokensAndExpiration(e, t, n) {
        this.refreshToken = t || null, this.accessToken = e || null, this.expirationTime = Date.now() + n * 1e3
    }
    static fromJSON(t, n) {
        let {
            refreshToken: r,
            accessToken: i,
            expirationTime: a
        } = n, o = new e;
        return r && (Y(typeof r == `string`, `internal-error`, {
            appName: t
        }), o.refreshToken = r), i && (Y(typeof i == `string`, `internal-error`, {
            appName: t
        }), o.accessToken = i), a && (Y(typeof a == `number`, `internal-error`, {
            appName: t
        }), o.expirationTime = a), o
    }
    toJSON() {
        return {
            refreshToken: this.refreshToken,
            accessToken: this.accessToken,
            expirationTime: this.expirationTime
        }
    }
    _assign(e) {
        this.accessToken = e.accessToken, this.refreshToken = e.refreshToken, this.expirationTime = e.expirationTime
    }
    _clone() {
        return Object.assign(new e, this.toJSON())
    }
    _performRefresh() {
        return Wl(`not implemented`)
    }
};

function ju(e, t) {
    Y(typeof e == `string` || e === void 0, `internal-error`, {
        appName: t
    })
}
var Mu = class e {
        constructor({
            uid: e,
            auth: t,
            stsTokenManager: n,
            ...r
        }) {
            this.providerId = `firebase`, this.proactiveRefresh = new Su(this), this.reloadUserInfo = null, this.reloadListener = null, this.uid = e, this.auth = t, this.stsTokenManager = n, this.accessToken = n.accessToken, this.displayName = r.displayName || null, this.email = r.email || null, this.emailVerified = r.emailVerified || !1, this.phoneNumber = r.phoneNumber || null, this.photoURL = r.photoURL || null, this.isAnonymous = r.isAnonymous || !1, this.tenantId = r.tenantId || null, this.providerData = r.providerData ? [...r.providerData] : [], this.metadata = new Cu(r.createdAt || void 0, r.lastLoginAt || void 0)
        }
        async getIdToken(e) {
            let t = await bu(this, this.stsTokenManager.getToken(this.auth, e));
            return Y(t, this.auth, `internal-error`), this.accessToken !== t && (this.accessToken = t, await this.auth._persistUserIfCurrent(this), this.auth._notifyListenersIfCurrent(this)), t
        }
        getIdTokenResult(e) {
            return gu(this, e)
        }
        reload() {
            return Tu(this)
        }
        _assign(e) {
            this !== e && (Y(this.uid === e.uid, this.auth, `internal-error`), this.displayName = e.displayName, this.photoURL = e.photoURL, this.email = e.email, this.emailVerified = e.emailVerified, this.phoneNumber = e.phoneNumber, this.isAnonymous = e.isAnonymous, this.tenantId = e.tenantId, this.providerData = e.providerData.map(e => ({
                ...e
            })), this.metadata._copy(e.metadata), this.stsTokenManager._assign(e.stsTokenManager))
        }
        _clone(t) {
            let n = new e({
                ...this,
                auth: t,
                stsTokenManager: this.stsTokenManager._clone()
            });
            return n.metadata._copy(this.metadata), n
        }
        _onReload(e) {
            Y(!this.reloadListener, this.auth, `internal-error`), this.reloadListener = e, this.reloadUserInfo &&= (this._notifyReloadListener(this.reloadUserInfo), null)
        }
        _notifyReloadListener(e) {
            this.reloadListener ? this.reloadListener(e) : this.reloadUserInfo = e
        }
        _startProactiveRefresh() {
            this.proactiveRefresh._start()
        }
        _stopProactiveRefresh() {
            this.proactiveRefresh._stop()
        }
        async _updateTokensIfNecessary(e, t = !1) {
            let n = !1;
            e.idToken && e.idToken !== this.stsTokenManager.accessToken && (this.stsTokenManager.updateFromServerResponse(e), n = !0), t && await wu(this), await this.auth._persistUserIfCurrent(this), n && this.auth._notifyListenersIfCurrent(this)
        }
        async delete() {
            if (ne(this.auth.app)) return Promise.reject(Hl(this.auth));
            let e = await this.getIdToken();
            return await bu(this, pu(this.auth, {
                idToken: e
            })), this.stsTokenManager.clearRefreshToken(), this.auth.signOut()
        }
        toJSON() {
            return {
                uid: this.uid,
                email: this.email || void 0,
                emailVerified: this.emailVerified,
                displayName: this.displayName || void 0,
                isAnonymous: this.isAnonymous,
                photoURL: this.photoURL || void 0,
                phoneNumber: this.phoneNumber || void 0,
                tenantId: this.tenantId || void 0,
                providerData: this.providerData.map(e => ({
                    ...e
                })),
                stsTokenManager: this.stsTokenManager.toJSON(),
                _redirectEventId: this._redirectEventId,
                ...this.metadata.toJSON(),
                apiKey: this.auth.config.apiKey,
                appName: this.auth.name
            }
        }
        get refreshToken() {
            return this.stsTokenManager.refreshToken || ``
        }
        static _fromJSON(t, n) {
            let r = n.displayName ?? void 0,
                i = n.email ?? void 0,
                a = n.phoneNumber ?? void 0,
                o = n.photoURL ?? void 0,
                s = n.tenantId ?? void 0,
                c = n._redirectEventId ?? void 0,
                l = n.createdAt ?? void 0,
                u = n.lastLoginAt ?? void 0,
                {
                    uid: d,
                    emailVerified: f,
                    isAnonymous: p,
                    providerData: m,
                    stsTokenManager: h
                } = n;
            Y(d && h, t, `internal-error`);
            let g = Au.fromJSON(this.name, h);
            Y(typeof d == `string`, t, `internal-error`), ju(r, t.name), ju(i, t.name), Y(typeof f == `boolean`, t, `internal-error`), Y(typeof p == `boolean`, t, `internal-error`), ju(a, t.name), ju(o, t.name), ju(s, t.name), ju(c, t.name), ju(l, t.name), ju(u, t.name);
            let _ = new e({
                uid: d,
                auth: t,
                email: i,
                emailVerified: f,
                displayName: r,
                isAnonymous: p,
                photoURL: o,
                phoneNumber: a,
                tenantId: s,
                stsTokenManager: g,
                createdAt: l,
                lastLoginAt: u
            });
            return m && Array.isArray(m) && (_.providerData = m.map(e => ({
                ...e
            }))), c && (_._redirectEventId = c), _
        }
        static async _fromIdTokenResponse(t, n, r = !1) {
            let i = new Au;
            i.updateFromServerResponse(n);
            let a = new e({
                uid: n.localId,
                auth: t,
                stsTokenManager: i,
                isAnonymous: r
            });
            return await wu(a), a
        }
        static async _fromGetAccountInfoResponse(t, n, r) {
            let i = n.users[0];
            Y(i.localId !== void 0, `internal-error`);
            let a = i.providerUserInfo === void 0 ? [] : Du(i.providerUserInfo),
                o = !(i.email && i.passwordHash) && !a?.length,
                s = new Au;
            s.updateFromIdToken(r);
            let c = new e({
                    uid: i.localId,
                    auth: t,
                    stsTokenManager: s,
                    isAnonymous: o
                }),
                l = {
                    uid: i.localId,
                    displayName: i.displayName || null,
                    photoURL: i.photoUrl || null,
                    email: i.email || null,
                    emailVerified: i.emailVerified || !1,
                    phoneNumber: i.phoneNumber || null,
                    tenantId: i.tenantId || null,
                    providerData: a,
                    metadata: new Cu(i.createdAt, i.lastLoginAt),
                    isAnonymous: !(i.email && i.passwordHash) && !a?.length
                };
            return Object.assign(c, l), c
        }
    },
    Nu = new Map;

function Pu(e) {
    X(e instanceof Function, `Expected a class definition`);
    let t = Nu.get(e);
    return t ? (X(t instanceof e, `Instance stored in cache mismatched with class`), t) : (t = new e, Nu.set(e, t), t)
}
var Fu = class {
    constructor() {
        this.type = `NONE`, this.storage = {}
    }
    async _isAvailable() {
        return !0
    }
    async _set(e, t) {
        this.storage[e] = t
    }
    async _get(e) {
        let t = this.storage[e];
        return t === void 0 ? null : t
    }
    async _remove(e) {
        delete this.storage[e]
    }
    _addListener(e, t) {}
    _removeListener(e, t) {}
};
Fu.type = `NONE`;
var Iu = Fu;

function Lu(e, t, n) {
    return `firebase:${e}:${t}:${n}`
}
var Ru = class e {
    constructor(e, t, n) {
        this.persistence = e, this.auth = t, this.userKey = n;
        let {
            config: r,
            name: i
        } = this.auth;
        this.fullUserKey = Lu(this.userKey, r.apiKey, i), this.fullPersistenceKey = Lu(`persistence`, r.apiKey, i), this.boundEventHandler = t._onStorageEvent.bind(t), this.persistence._addListener(this.fullUserKey, this.boundEventHandler)
    }
    setCurrentUser(e) {
        return this.persistence._set(this.fullUserKey, e.toJSON())
    }
    async getCurrentUser() {
        let e = await this.persistence._get(this.fullUserKey);
        if (!e) return null;
        if (typeof e == `string`) {
            let t = await mu(this.auth, {
                idToken: e
            }).catch(() => void 0);
            return t ? Mu._fromGetAccountInfoResponse(this.auth, t, e) : null
        }
        return Mu._fromJSON(this.auth, e)
    }
    removeCurrentUser() {
        return this.persistence._remove(this.fullUserKey)
    }
    savePersistenceForRedirect() {
        return this.persistence._set(this.fullPersistenceKey, this.persistence.type)
    }
    async setPersistence(e) {
        if (this.persistence === e) return;
        let t = await this.getCurrentUser();
        if (await this.removeCurrentUser(), this.persistence = e, t) return this.setCurrentUser(t)
    }
    delete() {
        this.persistence._removeListener(this.fullUserKey, this.boundEventHandler)
    }
    static async create(t, n, r = `authUser`) {
        if (!n.length) return new e(Pu(Iu), t, r);
        let i = (await Promise.all(n.map(async e => {
                if (await e._isAvailable()) return e
            }))).filter(e => e),
            a = i[0] || Pu(Iu),
            o = Lu(r, t.config.apiKey, t.name),
            s = null;
        for (let e of n) try {
            let n = await e._get(o);
            if (n) {
                let r;
                if (typeof n == `string`) {
                    let e = await mu(t, {
                        idToken: n
                    }).catch(() => void 0);
                    if (!e) break;
                    r = await Mu._fromGetAccountInfoResponse(t, e, n)
                } else r = Mu._fromJSON(t, n);
                e !== a && (s = r), a = e;
                break
            }
        } catch {}
        let c = i.filter(e => e._shouldAllowMigration);
        return !a._shouldAllowMigration || !c.length ? new e(a, t, r) : (a = c[0], s && await a._set(o, s.toJSON()), await Promise.all(n.map(async e => {
            if (e !== a) try {
                await e._remove(o)
            } catch {}
        })), new e(a, t, r))
    }
};

function zu(e) {
    let t = e.toLowerCase();
    if (t.includes(`opera/`) || t.includes(`opr/`) || t.includes(`opios/`)) return `Opera`;
    if (Uu(t)) return `IEMobile`;
    if (t.includes(`msie`) || t.includes(`trident/`)) return `IE`;
    if (t.includes(`edge/`)) return `Edge`;
    if (Bu(t)) return `Firefox`;
    if (t.includes(`silk/`)) return `Silk`;
    if (Z(t)) return `Blackberry`;
    if (Gu(t)) return `Webos`;
    if (Vu(t)) return `Safari`;
    if ((t.includes(`chrome/`) || Hu(t)) && !t.includes(`edge/`)) return `Chrome`;
    if (Wu(t)) return `Android`;
    {
        let t = e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
        if (t?.length === 2) return t[1]
    }
    return `Other`
}

function Bu(e = f()) {
    return /firefox\//i.test(e)
}

function Vu(e = f()) {
    let t = e.toLowerCase();
    return t.includes(`safari/`) && !t.includes(`chrome/`) && !t.includes(`crios/`) && !t.includes(`android`)
}

function Hu(e = f()) {
    return /crios\//i.test(e)
}

function Uu(e = f()) {
    return /iemobile/i.test(e)
}

function Wu(e = f()) {
    return /android/i.test(e)
}

function Z(e = f()) {
    return /blackberry/i.test(e)
}

function Gu(e = f()) {
    return /webos/i.test(e)
}

function Ku(e = f()) {
    return /iphone|ipad|ipod/i.test(e) || /macintosh/i.test(e) && /mobile/i.test(e)
}

function qu(e = f()) {
    return Ku(e) && !!window.navigator?.standalone
}

function Ju() {
    return e() && document.documentMode === 10
}

function Yu(e = f()) {
    return Ku(e) || Wu(e) || Gu(e) || Z(e) || /windows phone/i.test(e) || Uu(e)
}

function Xu(e, t = []) {
    let n;
    switch (e) {
        case `Browser`:
            n = zu(f());
            break;
        case `Worker`:
            n = `${zu(f())}-${e}`;
            break;
        default:
            n = e
    }
    let r = t.length ? t.join(`,`) : `FirebaseCore-web`;
    return `${n}/JsCore/${C}/${r}`
}
var Zu = class {
    constructor(e) {
        this.auth = e, this.queue = []
    }
    pushCallback(e, t) {
        let n = t => new Promise((n, r) => {
            try {
                n(e(t))
            } catch (e) {
                r(e)
            }
        });
        n.onAbort = t, this.queue.push(n);
        let r = this.queue.length - 1;
        return () => {
            this.queue[r] = () => Promise.resolve()
        }
    }
    async runMiddleware(e) {
        if (this.auth.currentUser === e) return;
        let t = [];
        try {
            for (let n of this.queue) await n(e), n.onAbort && t.push(n.onAbort)
        } catch (e) {
            t.reverse();
            for (let e of t) try {
                e()
            } catch {}
            throw this.auth._errorFactory.create(`login-blocked`, {
                originalMessage: e?.message
            })
        }
    }
};
async function Qu(e, t = {}) {
    return ru(e, `GET`, `/v2/passwordPolicy`, nu(e, t))
}
var $u = 6,
    ed = class {
        constructor(e) {
            let t = e.customStrengthOptions;
            this.customStrengthOptions = {}, this.customStrengthOptions.minPasswordLength = t.minPasswordLength ?? $u, t.maxPasswordLength && (this.customStrengthOptions.maxPasswordLength = t.maxPasswordLength), t.containsLowercaseCharacter !== void 0 && (this.customStrengthOptions.containsLowercaseLetter = t.containsLowercaseCharacter), t.containsUppercaseCharacter !== void 0 && (this.customStrengthOptions.containsUppercaseLetter = t.containsUppercaseCharacter), t.containsNumericCharacter !== void 0 && (this.customStrengthOptions.containsNumericCharacter = t.containsNumericCharacter), t.containsNonAlphanumericCharacter !== void 0 && (this.customStrengthOptions.containsNonAlphanumericCharacter = t.containsNonAlphanumericCharacter), this.enforcementState = e.enforcementState, this.enforcementState === `ENFORCEMENT_STATE_UNSPECIFIED` && (this.enforcementState = `OFF`), this.allowedNonAlphanumericCharacters = e.allowedNonAlphanumericCharacters?.join(``) ?? ``, this.forceUpgradeOnSignin = e.forceUpgradeOnSignin ?? !1, this.schemaVersion = e.schemaVersion
        }
        validatePassword(e) {
            let t = {
                isValid: !0,
                passwordPolicy: this
            };
            return this.validatePasswordLengthOptions(e, t), this.validatePasswordCharacterOptions(e, t), t.isValid &&= t.meetsMinPasswordLength ?? !0, t.isValid &&= t.meetsMaxPasswordLength ?? !0, t.isValid &&= t.containsLowercaseLetter ?? !0, t.isValid &&= t.containsUppercaseLetter ?? !0, t.isValid &&= t.containsNumericCharacter ?? !0, t.isValid &&= t.containsNonAlphanumericCharacter ?? !0, t
        }
        validatePasswordLengthOptions(e, t) {
            let n = this.customStrengthOptions.minPasswordLength,
                r = this.customStrengthOptions.maxPasswordLength;
            n && (t.meetsMinPasswordLength = e.length >= n), r && (t.meetsMaxPasswordLength = e.length <= r)
        }
        validatePasswordCharacterOptions(e, t) {
            this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
            let n;
            for (let r = 0; r < e.length; r++) n = e.charAt(r), this.updatePasswordCharacterOptionsStatuses(t, n >= `a` && n <= `z`, n >= `A` && n <= `Z`, n >= `0` && n <= `9`, this.allowedNonAlphanumericCharacters.includes(n))
        }
        updatePasswordCharacterOptionsStatuses(e, t, n, r, i) {
            this.customStrengthOptions.containsLowercaseLetter && (e.containsLowercaseLetter ||= t), this.customStrengthOptions.containsUppercaseLetter && (e.containsUppercaseLetter ||= n), this.customStrengthOptions.containsNumericCharacter && (e.containsNumericCharacter ||= r), this.customStrengthOptions.containsNonAlphanumericCharacter && (e.containsNonAlphanumericCharacter ||= i)
        }
    },
    td = class {
        constructor(e, t, n, r) {
            this.app = e, this.heartbeatServiceProvider = t, this.appCheckServiceProvider = n, this.config = r, this.currentUser = null, this.emulatorConfig = null, this.operations = Promise.resolve(), this.authStateSubscription = new rd(this), this.idTokenSubscription = new rd(this), this.beforeStateQueue = new Zu(this), this.redirectUser = null, this.isProactiveRefreshEnabled = !1, this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1, this._canInitEmulator = !0, this._isInitialized = !1, this._deleted = !1, this._initializationPromise = null, this._popupRedirectResolver = null, this._errorFactory = zl, this._agentRecaptchaConfig = null, this._tenantRecaptchaConfigs = {}, this._projectPasswordPolicy = null, this._tenantPasswordPolicies = {}, this._resolvePersistenceManagerAvailable = void 0, this.lastNotifiedUid = void 0, this.languageCode = null, this.tenantId = null, this.settings = {
                appVerificationDisabledForTesting: !1
            }, this.frameworks = [], this.name = e.name, this.clientVersion = r.sdkClientVersion, this._persistenceManagerAvailable = new Promise(e => this._resolvePersistenceManagerAvailable = e)
        }
        _initializeWithPersistence(e, t) {
            return t && (this._popupRedirectResolver = Pu(t)), this._initializationPromise = this.queue(async () => {
                if (!this._deleted && (this.persistenceManager = await Ru.create(this, e), this._resolvePersistenceManagerAvailable?.(), !this._deleted)) {
                    if (this._popupRedirectResolver?._shouldInitProactively) try {
                        await this._popupRedirectResolver._initialize(this)
                    } catch {}
                    await this.initializeCurrentUser(t), this.lastNotifiedUid = this.currentUser?.uid || null, !this._deleted && (this._isInitialized = !0)
                }
            }), this._initializationPromise
        }
        async _onStorageEvent() {
            if (this._deleted) return;
            let e = await this.assertedPersistence.getCurrentUser();
            if (!(!this.currentUser && !e)) {
                if (this.currentUser && e && this.currentUser.uid === e.uid) {
                    this._currentUser._assign(e), await this.currentUser.getIdToken();
                    return
                }
                await this._updateCurrentUser(e, !0)
            }
        }
        async initializeCurrentUserFromIdToken(e) {
            try {
                let t = await mu(this, {
                        idToken: e
                    }),
                    n = await Mu._fromGetAccountInfoResponse(this, t, e);
                await this.directlySetCurrentUser(n)
            } catch (e) {
                console.warn(`FirebaseServerApp could not login user with provided authIdToken: `, e), await this.directlySetCurrentUser(null)
            }
        }
        async initializeCurrentUser(e) {
            if (ne(this.app)) {
                let e = this.app.settings.authIdToken;
                return e ? new Promise(t => {
                    setTimeout(() => this.initializeCurrentUserFromIdToken(e).then(t, t))
                }) : this.directlySetCurrentUser(null)
            }
            let t = await this.assertedPersistence.getCurrentUser(),
                n = t,
                r = !1;
            if (e && this.config.authDomain) {
                await this.getOrInitRedirectPersistenceManager();
                let t = this.redirectUser?._redirectEventId,
                    i = n?._redirectEventId,
                    a = await this.tryRedirectSignIn(e);
                (!t || t === i) && a?.user && (n = a.user, r = !0)
            }
            if (!n) return this.directlySetCurrentUser(null);
            if (!n._redirectEventId) {
                if (r) try {
                    await this.beforeStateQueue.runMiddleware(n)
                } catch (e) {
                    n = t, this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e))
                }
                return n ? this.reloadAndSetCurrentUserOrClear(n) : this.directlySetCurrentUser(null)
            }
            return Y(this._popupRedirectResolver, this, `argument-error`), await this.getOrInitRedirectPersistenceManager(), this.redirectUser && this.redirectUser._redirectEventId === n._redirectEventId ? this.directlySetCurrentUser(n) : this.reloadAndSetCurrentUserOrClear(n)
        }
        async tryRedirectSignIn(e) {
            let t = null;
            try {
                t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0)
            } catch {
                await this._setRedirectUser(null)
            }
            return t
        }
        async reloadAndSetCurrentUserOrClear(e) {
            try {
                await wu(e)
            } catch (e) {
                if (e?.code !== `auth/network-request-failed`) return this.directlySetCurrentUser(null)
            }
            return this.directlySetCurrentUser(e)
        }
        useDeviceLanguage() {
            this.languageCode = Yl()
        }
        async _delete() {
            this._deleted = !0
        }
        async updateCurrentUser(e) {
            if (ne(this.app)) return Promise.reject(Hl(this));
            let t = e ? w(e) : null;
            return t && Y(t.auth.config.apiKey === this.config.apiKey, this, `invalid-user-token`), this._updateCurrentUser(t && t._clone(this))
        }
        async _updateCurrentUser(e, t = !1) {
            if (!this._deleted) return e && Y(this.tenantId === e.tenantId, this, `tenant-id-mismatch`), t || await this.beforeStateQueue.runMiddleware(e), this.queue(async () => {
                await this.directlySetCurrentUser(e), this.notifyAuthListeners()
            })
        }
        async signOut() {
            return ne(this.app) ? Promise.reject(Hl(this)) : (await this.beforeStateQueue.runMiddleware(null), (this.redirectPersistenceManager || this._popupRedirectResolver) && await this._setRedirectUser(null), this._updateCurrentUser(null, !0))
        }
        setPersistence(e) {
            return ne(this.app) ? Promise.reject(Hl(this)) : this.queue(async () => {
                await this.assertedPersistence.setPersistence(Pu(e))
            })
        }
        _getRecaptchaConfig() {
            return this.tenantId == null ? this._agentRecaptchaConfig : this._tenantRecaptchaConfigs[this.tenantId]
        }
        async validatePassword(e) {
            this._getPasswordPolicyInternal() || await this._updatePasswordPolicy();
            let t = this._getPasswordPolicyInternal();
            return t.schemaVersion === this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION ? t.validatePassword(e) : Promise.reject(this._errorFactory.create(`unsupported-password-policy-schema-version`, {}))
        }
        _getPasswordPolicyInternal() {
            return this.tenantId === null ? this._projectPasswordPolicy : this._tenantPasswordPolicies[this.tenantId]
        }
        async _updatePasswordPolicy() {
            let e = new ed(await Qu(this));
            this.tenantId === null ? this._projectPasswordPolicy = e : this._tenantPasswordPolicies[this.tenantId] = e
        }
        _getPersistenceType() {
            return this.assertedPersistence.persistence.type
        }
        _getPersistence() {
            return this.assertedPersistence.persistence
        }
        _updateErrorMap(e) {
            this._errorFactory = new _(`auth`, `Firebase`, e())
        }
        onAuthStateChanged(e, t, n) {
            return this.registerStateListener(this.authStateSubscription, e, t, n)
        }
        beforeAuthStateChanged(e, t) {
            return this.beforeStateQueue.pushCallback(e, t)
        }
        onIdTokenChanged(e, t, n) {
            return this.registerStateListener(this.idTokenSubscription, e, t, n)
        }
        authStateReady() {
            return new Promise((e, t) => {
                if (this.currentUser) e();
                else {
                    let n = this.onAuthStateChanged(() => {
                        n(), e()
                    }, t)
                }
            })
        }
        async revokeAccessToken(e) {
            if (this.currentUser) {
                let t = {
                    providerId: `apple.com`,
                    tokenType: `ACCESS_TOKEN`,
                    token: e,
                    idToken: await this.currentUser.getIdToken()
                };
                this.tenantId != null && (t.tenantId = this.tenantId), await ku(this, t)
            }
        }
        toJSON() {
            return {
                apiKey: this.config.apiKey,
                authDomain: this.config.authDomain,
                appName: this.name,
                currentUser: this._currentUser?.toJSON()
            }
        }
        async _setRedirectUser(e, t) {
            let n = await this.getOrInitRedirectPersistenceManager(t);
            return e === null ? n.removeCurrentUser() : n.setCurrentUser(e)
        }
        async getOrInitRedirectPersistenceManager(e) {
            if (!this.redirectPersistenceManager) {
                let t = e && Pu(e) || this._popupRedirectResolver;
                Y(t, this, `argument-error`), this.redirectPersistenceManager = await Ru.create(this, [Pu(t._redirectPersistence)], `redirectUser`), this.redirectUser = await this.redirectPersistenceManager.getCurrentUser()
            }
            return this.redirectPersistenceManager
        }
        async _redirectUserForId(e) {
            return this._isInitialized && await this.queue(async () => {}), this._currentUser?._redirectEventId === e ? this._currentUser : this.redirectUser?._redirectEventId === e ? this.redirectUser : null
        }
        async _persistUserIfCurrent(e) {
            if (e === this.currentUser) return this.queue(async () => this.directlySetCurrentUser(e))
        }
        _notifyListenersIfCurrent(e) {
            e === this.currentUser && this.notifyAuthListeners()
        }
        _key() {
            return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`
        }
        _startProactiveRefresh() {
            this.isProactiveRefreshEnabled = !0, this.currentUser && this._currentUser._startProactiveRefresh()
        }
        _stopProactiveRefresh() {
            this.isProactiveRefreshEnabled = !1, this.currentUser && this._currentUser._stopProactiveRefresh()
        }
        get _currentUser() {
            return this.currentUser
        }
        notifyAuthListeners() {
            if (!this._isInitialized) return;
            this.idTokenSubscription.next(this.currentUser);
            let e = this.currentUser?.uid ?? null;
            this.lastNotifiedUid !== e && (this.lastNotifiedUid = e, this.authStateSubscription.next(this.currentUser))
        }
        registerStateListener(e, t, n, r) {
            if (this._deleted) return () => {};
            let i = typeof t == `function` ? t : t.next.bind(t),
                a = !1,
                o = this._isInitialized ? Promise.resolve() : this._initializationPromise;
            if (Y(o, this, `internal-error`), o.then(() => {
                    a || i(this.currentUser)
                }), typeof t == `function`) {
                let i = e.addObserver(t, n, r);
                return () => {
                    a = !0, i()
                }
            } else {
                let n = e.addObserver(t);
                return () => {
                    a = !0, n()
                }
            }
        }
        async directlySetCurrentUser(e) {
            this.currentUser && this.currentUser !== e && this._currentUser._stopProactiveRefresh(), e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(), this.currentUser = e, e ? await this.assertedPersistence.setCurrentUser(e) : await this.assertedPersistence.removeCurrentUser()
        }
        queue(e) {
            return this.operations = this.operations.then(e, e), this.operations
        }
        get assertedPersistence() {
            return Y(this.persistenceManager, this, `internal-error`), this.persistenceManager
        }
        _logFramework(e) {
            !e || this.frameworks.includes(e) || (this.frameworks.push(e), this.frameworks.sort(), this.clientVersion = Xu(this.config.clientPlatform, this._getFrameworks()))
        }
        _getFrameworks() {
            return this.frameworks
        }
        async _getAdditionalHeaders() {
            let e = {
                "X-Client-Version": this.clientVersion
            };
            this.app.options.appId && (e[`X-Firebase-gmpid`] = this.app.options.appId);
            let t = await this.heartbeatServiceProvider.getImmediate({
                optional: !0
            })?.getHeartbeatsHeader();
            t && (e[`X-Firebase-Client`] = t);
            let n = await this._getAppCheckToken();
            return n && (e[`X-Firebase-AppCheck`] = n), e
        }
        async _getAppCheckToken() {
            if (ne(this.app) && this.app.settings.appCheckToken) return this.app.settings.appCheckToken;
            let e = await this.appCheckServiceProvider.getImmediate({
                optional: !0
            })?.getToken();
            return e?.error && Bl(`Error while retrieving App Check token: ${e.error}`), e?.token
        }
    };

function nd(e) {
    return w(e)
}
var rd = class {
        constructor(e) {
            this.auth = e, this.observer = null, this.addObserver = ae(e => this.observer = e)
        }
        get next() {
            return Y(this.observer, this.auth, `internal-error`), this.observer.next.bind(this.observer)
        }
    },
    id = {
        async loadJS() {
            throw Error(`Unable to load external scripts`)
        },
        recaptchaV2Script: ``,
        recaptchaEnterpriseScript: ``,
        gapiScript: ``
    };

function ad(e) {
    id = e
}

function od(e) {
    return id.loadJS(e)
}

function sd() {
    return id.recaptchaEnterpriseScript
}

function cd() {
    return id.gapiScript
}

function ld(e) {
    return `__${e}${Math.floor(Math.random()*1e6)}`
}
var ud = class {
        constructor() {
            this.enterprise = new dd
        }
        ready(e) {
            e()
        }
        execute(e, t) {
            return Promise.resolve(`token`)
        }
        render(e, t) {
            return ``
        }
    },
    dd = class {
        ready(e) {
            e()
        }
        execute(e, t) {
            return Promise.resolve(`token`)
        }
        render(e, t) {
            return ``
        }
    },
    fd = `recaptcha-enterprise`,
    pd = `NO_RECAPTCHA`,
    md = class {
        constructor(e) {
            this.type = fd, this.auth = nd(e)
        }
        async verify(e = `verify`, t = !1) {
            async function n(e) {
                if (!t) {
                    if (e.tenantId == null && e._agentRecaptchaConfig != null) return e._agentRecaptchaConfig.siteKey;
                    if (e.tenantId != null && e._tenantRecaptchaConfigs[e.tenantId] !== void 0) return e._tenantRecaptchaConfigs[e.tenantId].siteKey
                }
                return new Promise(async (t, n) => {
                    fu(e, {
                        clientType: `CLIENT_TYPE_WEB`,
                        version: `RECAPTCHA_ENTERPRISE`
                    }).then(r => {
                        if (r.recaptchaKey === void 0) n(Error(`recaptcha Enterprise site key undefined`));
                        else {
                            let n = new du(r);
                            return e.tenantId == null ? e._agentRecaptchaConfig = n : e._tenantRecaptchaConfigs[e.tenantId] = n, t(n.siteKey)
                        }
                    }).catch(e => {
                        n(e)
                    })
                })
            }

            function r(t, n, r) {
                let i = window.grecaptcha;
                uu(i) ? i.enterprise.ready(() => {
                    i.enterprise.execute(t, {
                        action: e
                    }).then(e => {
                        n(e)
                    }).catch(() => {
                        n(pd)
                    })
                }) : r(Error(`No reCAPTCHA enterprise script loaded.`))
            }
            return this.auth.settings.appVerificationDisabledForTesting ? new ud().execute(`siteKey`, {
                action: `verify`
            }) : new Promise((e, i) => {
                n(this.auth).then(n => {
                    if (!t && uu(window.grecaptcha)) r(n, e, i);
                    else {
                        if (typeof window > `u`) {
                            i(Error(`RecaptchaVerifier is only supported in browser`));
                            return
                        }
                        let t = sd();
                        t.length !== 0 && (t += n), od(t).then(() => {
                            r(n, e, i)
                        }).catch(e => {
                            i(e)
                        })
                    }
                }).catch(e => {
                    i(e)
                })
            })
        }
    };
async function hd(e, t, n, r = !1, i = !1) {
    let a = new md(e),
        o;
    if (i) o = pd;
    else try {
        o = await a.verify(n)
    } catch {
        o = await a.verify(n, !0)
    }
    let s = {
        ...t
    };
    if (n === `mfaSmsEnrollment` || n === `mfaSmsSignIn`) {
        if (`phoneEnrollmentInfo` in s) {
            let e = s.phoneEnrollmentInfo.phoneNumber,
                t = s.phoneEnrollmentInfo.recaptchaToken;
            Object.assign(s, {
                phoneEnrollmentInfo: {
                    phoneNumber: e,
                    recaptchaToken: t,
                    captchaResponse: o,
                    clientType: `CLIENT_TYPE_WEB`,
                    recaptchaVersion: `RECAPTCHA_ENTERPRISE`
                }
            })
        } else if (`phoneSignInInfo` in s) {
            let e = s.phoneSignInInfo.recaptchaToken;
            Object.assign(s, {
                phoneSignInInfo: {
                    recaptchaToken: e,
                    captchaResponse: o,
                    clientType: `CLIENT_TYPE_WEB`,
                    recaptchaVersion: `RECAPTCHA_ENTERPRISE`
                }
            })
        }
        return s
    }
    return r ? Object.assign(s, {
        captchaResp: o
    }) : Object.assign(s, {
        captchaResponse: o
    }), Object.assign(s, {
        clientType: `CLIENT_TYPE_WEB`
    }), Object.assign(s, {
        recaptchaVersion: `RECAPTCHA_ENTERPRISE`
    }), s
}
async function gd(e, t, n, r, i) {
    return i === `EMAIL_PASSWORD_PROVIDER` ? e._getRecaptchaConfig()?.isProviderEnabled(`EMAIL_PASSWORD_PROVIDER`) ? r(e, await hd(e, t, n, n === `getOobCode`)) : r(e, t).catch(async i => i.code === `auth/missing-recaptcha-token` ? (console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`), r(e, await hd(e, t, n, n === `getOobCode`))) : Promise.reject(i)) : i === `PHONE_PROVIDER` ? e._getRecaptchaConfig()?.isProviderEnabled(`PHONE_PROVIDER`) ? r(e, await hd(e, t, n)).catch(async i => e._getRecaptchaConfig()?.getProviderEnforcementState(`PHONE_PROVIDER`) === `AUDIT` && (i.code === `auth/missing-recaptcha-token` || i.code === `auth/invalid-app-credential`) ? (console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`), r(e, await hd(e, t, n, !1, !0))) : Promise.reject(i)) : r(e, await hd(e, t, n, !1, !0)) : Promise.reject(i + ` provider is not supported.`)
}
async function _d(e) {
    let t = nd(e),
        n = new du(await fu(t, {
            clientType: `CLIENT_TYPE_WEB`,
            version: `RECAPTCHA_ENTERPRISE`
        }));
    t.tenantId == null ? t._agentRecaptchaConfig = n : t._tenantRecaptchaConfigs[t.tenantId] = n, n.isAnyProviderEnabled() && new md(t).verify()
}

function vd(e, t) {
    let n = ee(e, `auth`);
    if (n.isInitialized()) {
        let e = n.getImmediate();
        if (se(n.getOptions(), t ?? {})) return e;
        q(e, `already-initialized`)
    }
    return n.initialize({
        options: t
    })
}

function yd(e, t) {
    let n = t?.persistence || [],
        r = (Array.isArray(n) ? n : [n]).map(Pu);
    t?.errorMap && e._updateErrorMap(t.errorMap), e._initializeWithPersistence(r, t?.popupRedirectResolver)
}

function Q(e, t, r) {
    let a = nd(e);
    Y(/^https?:\/\//.test(t), a, `invalid-emulator-scheme`);
    let o = !!r?.disableWarnings,
        s = bd(t),
        {
            host: c,
            port: l
        } = xd(t),
        u = l === null ? `` : `:${l}`,
        d = {
            url: `${s}//${c}${u}/`
        },
        f = Object.freeze({
            host: c,
            port: l,
            protocol: s.replace(`:`, ``),
            options: Object.freeze({
                disableWarnings: o
            })
        });
    if (!a._canInitEmulator) {
        Y(a.config.emulator && a.emulatorConfig, a, `emulator-config-failed`), Y(se(d, a.config.emulator) && se(f, a.emulatorConfig), a, `emulator-config-failed`);
        return
    }
    a.config.emulator = d, a.emulatorConfig = f, a.settings.appVerificationDisabledForTesting = !0, n(c) ? i(`${s}//${c}${u}`) : o || Cd()
}

function bd(e) {
    let t = e.indexOf(`:`);
    return t < 0 ? `` : e.substr(0, t + 1)
}

function xd(e) {
    let t = bd(e),
        n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
    if (!n) return {
        host: ``,
        port: null
    };
    let r = n[2].split(`@`).pop() || ``,
        i = /^(\[[^\]]+\])(:|$)/.exec(r);
    if (i) {
        let e = i[1];
        return {
            host: e,
            port: Sd(r.substr(e.length + 1))
        }
    } else {
        let [e, t] = r.split(`:`);
        return {
            host: e,
            port: Sd(t)
        }
    }
}

function Sd(e) {
    if (!e) return null;
    let t = Number(e);
    return isNaN(t) ? null : t
}

function Cd() {
    function e() {
        let e = document.createElement(`p`),
            t = e.style;
        e.innerText = `Running in emulator mode. Do not use with production credentials.`, t.position = `fixed`, t.width = `100%`, t.backgroundColor = `#ffffff`, t.border = `.1em solid #000000`, t.color = `#b50000`, t.bottom = `0px`, t.left = `0px`, t.margin = `0px`, t.zIndex = `10000`, t.textAlign = `center`, e.classList.add(`firebase-emulator-warning`), document.body.appendChild(e)
    }
    typeof console < `u` && typeof console.info == `function` && console.info(`WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.`), typeof window < `u` && typeof document < `u` && (document.readyState === `loading` ? window.addEventListener(`DOMContentLoaded`, e) : e())
}
var wd = class {
    constructor(e, t) {
        this.providerId = e, this.signInMethod = t
    }
    toJSON() {
        return Wl(`not implemented`)
    }
    _getIdTokenResponse(e) {
        return Wl(`not implemented`)
    }
    _linkToIdToken(e, t) {
        return Wl(`not implemented`)
    }
    _getReauthenticationResolver(e) {
        return Wl(`not implemented`)
    }
};
async function Td(e, t) {
    return ru(e, `POST`, `/v1/accounts:signUp`, t)
}
async function Ed(e, t) {
    return au(e, `POST`, `/v1/accounts:signInWithPassword`, nu(e, t))
}
async function Dd(e, t) {
    return au(e, `POST`, `/v1/accounts:signInWithEmailLink`, nu(e, t))
}
async function Od(e, t) {
    return au(e, `POST`, `/v1/accounts:signInWithEmailLink`, nu(e, t))
}
var kd = class e extends wd {
    constructor(e, t, n, r = null) {
        super(`password`, n), this._email = e, this._password = t, this._tenantId = r
    }
    static _fromEmailAndPassword(t, n) {
        return new e(t, n, `password`)
    }
    static _fromEmailAndCode(t, n, r = null) {
        return new e(t, n, `emailLink`, r)
    }
    toJSON() {
        return {
            email: this._email,
            password: this._password,
            signInMethod: this.signInMethod,
            tenantId: this._tenantId
        }
    }
    static fromJSON(e) {
        let t = typeof e == `string` ? JSON.parse(e) : e;
        if (t?.email && t?.password) {
            if (t.signInMethod === `password`) return this._fromEmailAndPassword(t.email, t.password);
            if (t.signInMethod === `emailLink`) return this._fromEmailAndCode(t.email, t.password, t.tenantId)
        }
        return null
    }
    async _getIdTokenResponse(e) {
        switch (this.signInMethod) {
            case `password`:
                return gd(e, {
                    returnSecureToken: !0,
                    email: this._email,
                    password: this._password,
                    clientType: `CLIENT_TYPE_WEB`
                }, `signInWithPassword`, Ed, `EMAIL_PASSWORD_PROVIDER`);
            case `emailLink`:
                return Dd(e, {
                    email: this._email,
                    oobCode: this._password
                });
            default:
                q(e, `internal-error`)
        }
    }
    async _linkToIdToken(e, t) {
        switch (this.signInMethod) {
            case `password`:
                return gd(e, {
                    idToken: t,
                    returnSecureToken: !0,
                    email: this._email,
                    password: this._password,
                    clientType: `CLIENT_TYPE_WEB`
                }, `signUpPassword`, Td, `EMAIL_PASSWORD_PROVIDER`);
            case `emailLink`:
                return Od(e, {
                    idToken: t,
                    email: this._email,
                    oobCode: this._password
                });
            default:
                q(e, `internal-error`)
        }
    }
    _getReauthenticationResolver(e) {
        return this._getIdTokenResponse(e)
    }
};
async function Ad(e, t) {
    return au(e, `POST`, `/v1/accounts:signInWithIdp`, nu(e, t))
}
var jd = `http://localhost`,
    Md = class e extends wd {
        constructor() {
            super(...arguments), this.pendingToken = null
        }
        static _fromParams(t) {
            let n = new e(t.providerId, t.signInMethod);
            return t.idToken || t.accessToken ? (t.idToken && (n.idToken = t.idToken), t.accessToken && (n.accessToken = t.accessToken), t.nonce && !t.pendingToken && (n.nonce = t.nonce), t.pendingToken && (n.pendingToken = t.pendingToken)) : t.oauthToken && t.oauthTokenSecret ? (n.accessToken = t.oauthToken, n.secret = t.oauthTokenSecret) : q(`argument-error`), n
        }
        toJSON() {
            return {
                idToken: this.idToken,
                accessToken: this.accessToken,
                secret: this.secret,
                nonce: this.nonce,
                pendingToken: this.pendingToken,
                providerId: this.providerId,
                signInMethod: this.signInMethod
            }
        }
        static fromJSON(t) {
            let {
                providerId: n,
                signInMethod: r,
                ...i
            } = typeof t == `string` ? JSON.parse(t) : t;
            if (!n || !r) return null;
            let a = new e(n, r);
            return a.idToken = i.idToken || void 0, a.accessToken = i.accessToken || void 0, a.secret = i.secret, a.nonce = i.nonce, a.pendingToken = i.pendingToken || null, a
        }
        _getIdTokenResponse(e) {
            return Ad(e, this.buildRequest())
        }
        _linkToIdToken(e, t) {
            let n = this.buildRequest();
            return n.idToken = t, Ad(e, n)
        }
        _getReauthenticationResolver(e) {
            let t = this.buildRequest();
            return t.autoCreate = !1, Ad(e, t)
        }
        buildRequest() {
            let e = {
                requestUri: jd,
                returnSecureToken: !0
            };
            if (this.pendingToken) e.pendingToken = this.pendingToken;
            else {
                let t = {};
                this.idToken && (t.id_token = this.idToken), this.accessToken && (t.access_token = this.accessToken), this.secret && (t.oauth_token_secret = this.secret), t.providerId = this.providerId, this.nonce && !this.pendingToken && (t.nonce = this.nonce), e.postBody = a(t)
            }
            return e
        }
    };
async function Nd(e, t) {
    return ru(e, `POST`, `/v1/accounts:sendVerificationCode`, nu(e, t))
}
async function Pd(e, t) {
    return au(e, `POST`, `/v1/accounts:signInWithPhoneNumber`, nu(e, t))
}
async function Fd(e, t) {
    let n = await au(e, `POST`, `/v1/accounts:signInWithPhoneNumber`, nu(e, t));
    if (n.temporaryProof) throw lu(e, `account-exists-with-different-credential`, n);
    return n
}
var Id = {
    USER_NOT_FOUND: `user-not-found`
};
async function Ld(e, t) {
    return au(e, `POST`, `/v1/accounts:signInWithPhoneNumber`, nu(e, {
        ...t,
        operation: `REAUTH`
    }), Id)
}
var Rd = class e extends wd {
    constructor(e) {
        super(`phone`, `phone`), this.params = e
    }
    static _fromVerification(t, n) {
        return new e({
            verificationId: t,
            verificationCode: n
        })
    }
    static _fromTokenResponse(t, n) {
        return new e({
            phoneNumber: t,
            temporaryProof: n
        })
    }
    _getIdTokenResponse(e) {
        return Pd(e, this._makeVerificationRequest())
    }
    _linkToIdToken(e, t) {
        return Fd(e, {
            idToken: t,
            ...this._makeVerificationRequest()
        })
    }
    _getReauthenticationResolver(e) {
        return Ld(e, this._makeVerificationRequest())
    }
    _makeVerificationRequest() {
        let {
            temporaryProof: e,
            phoneNumber: t,
            verificationId: n,
            verificationCode: r
        } = this.params;
        return e && t ? {
            temporaryProof: e,
            phoneNumber: t
        } : {
            sessionInfo: n,
            code: r
        }
    }
    toJSON() {
        let e = {
            providerId: this.providerId
        };
        return this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber), this.params.temporaryProof && (e.temporaryProof = this.params.temporaryProof), this.params.verificationCode && (e.verificationCode = this.params.verificationCode), this.params.verificationId && (e.verificationId = this.params.verificationId), e
    }
    static fromJSON(t) {
        typeof t == `string` && (t = JSON.parse(t));
        let {
            verificationId: n,
            verificationCode: r,
            phoneNumber: i,
            temporaryProof: a
        } = t;
        return !r && !n && !i && !a ? null : new e({
            verificationId: n,
            verificationCode: r,
            phoneNumber: i,
            temporaryProof: a
        })
    }
};

function zd(e) {
    switch (e) {
        case `recoverEmail`:
            return `RECOVER_EMAIL`;
        case `resetPassword`:
            return `PASSWORD_RESET`;
        case `signIn`:
            return `EMAIL_SIGNIN`;
        case `verifyEmail`:
            return `VERIFY_EMAIL`;
        case `verifyAndChangeEmail`:
            return `VERIFY_AND_CHANGE_EMAIL`;
        case `revertSecondFactorAddition`:
            return `REVERT_SECOND_FACTOR_ADDITION`;
        default:
            return null
    }
}

function Bd(e) {
    let t = o(h(e)).link,
        n = t ? o(h(t)).deep_link_id : null,
        r = o(h(e)).deep_link_id;
    return (r ? o(h(r)).link : null) || r || n || t || e
}
var Vd = class e {
        constructor(e) {
            let t = o(h(e)),
                n = t.apiKey ?? null,
                r = t.oobCode ?? null,
                i = zd(t.mode ?? null);
            Y(n && r && i, `argument-error`), this.apiKey = n, this.operation = i, this.code = r, this.continueUrl = t.continueUrl ?? null, this.languageCode = t.lang ?? null, this.tenantId = t.tenantId ?? null
        }
        static parseLink(t) {
            let n = Bd(t);
            try {
                return new e(n)
            } catch {
                return null
            }
        }
    },
    Hd = class e {
        constructor() {
            this.providerId = e.PROVIDER_ID
        }
        static credential(e, t) {
            return kd._fromEmailAndPassword(e, t)
        }
        static credentialWithLink(e, t) {
            let n = Vd.parseLink(t);
            return Y(n, `argument-error`), kd._fromEmailAndCode(e, n.code, n.tenantId)
        }
    };
Hd.PROVIDER_ID = `password`, Hd.EMAIL_PASSWORD_SIGN_IN_METHOD = `password`, Hd.EMAIL_LINK_SIGN_IN_METHOD = `emailLink`;
var Ud = class {
        constructor(e) {
            this.providerId = e, this.defaultLanguageCode = null, this.customParameters = {}
        }
        setDefaultLanguage(e) {
            this.defaultLanguageCode = e
        }
        setCustomParameters(e) {
            return this.customParameters = e, this
        }
        getCustomParameters() {
            return this.customParameters
        }
    },
    Wd = class extends Ud {
        constructor() {
            super(...arguments), this.scopes = []
        }
        addScope(e) {
            return this.scopes.includes(e) || this.scopes.push(e), this
        }
        getScopes() {
            return [...this.scopes]
        }
    },
    Gd = class e extends Wd {
        constructor() {
            super(`facebook.com`)
        }
        static credential(t) {
            return Md._fromParams({
                providerId: e.PROVIDER_ID,
                signInMethod: e.FACEBOOK_SIGN_IN_METHOD,
                accessToken: t
            })
        }
        static credentialFromResult(t) {
            return e.credentialFromTaggedObject(t)
        }
        static credentialFromError(t) {
            return e.credentialFromTaggedObject(t.customData || {})
        }
        static credentialFromTaggedObject({
            _tokenResponse: t
        }) {
            if (!t || !(`oauthAccessToken` in t) || !t.oauthAccessToken) return null;
            try {
                return e.credential(t.oauthAccessToken)
            } catch {
                return null
            }
        }
    };
Gd.FACEBOOK_SIGN_IN_METHOD = `facebook.com`, Gd.PROVIDER_ID = `facebook.com`;
var Kd = class e extends Wd {
    constructor() {
        super(`google.com`), this.addScope(`profile`)
    }
    static credential(t, n) {
        return Md._fromParams({
            providerId: e.PROVIDER_ID,
            signInMethod: e.GOOGLE_SIGN_IN_METHOD,
            idToken: t,
            accessToken: n
        })
    }
    static credentialFromResult(t) {
        return e.credentialFromTaggedObject(t)
    }
    static credentialFromError(t) {
        return e.credentialFromTaggedObject(t.customData || {})
    }
    static credentialFromTaggedObject({
        _tokenResponse: t
    }) {
        if (!t) return null;
        let {
            oauthIdToken: n,
            oauthAccessToken: r
        } = t;
        if (!n && !r) return null;
        try {
            return e.credential(n, r)
        } catch {
            return null
        }
    }
};
Kd.GOOGLE_SIGN_IN_METHOD = `google.com`, Kd.PROVIDER_ID = `google.com`;
var qd = class e extends Wd {
    constructor() {
        super(`github.com`)
    }
    static credential(t) {
        return Md._fromParams({
            providerId: e.PROVIDER_ID,
            signInMethod: e.GITHUB_SIGN_IN_METHOD,
            accessToken: t
        })
    }
    static credentialFromResult(t) {
        return e.credentialFromTaggedObject(t)
    }
    static credentialFromError(t) {
        return e.credentialFromTaggedObject(t.customData || {})
    }
    static credentialFromTaggedObject({
        _tokenResponse: t
    }) {
        if (!t || !(`oauthAccessToken` in t) || !t.oauthAccessToken) return null;
        try {
            return e.credential(t.oauthAccessToken)
        } catch {
            return null
        }
    }
};
qd.GITHUB_SIGN_IN_METHOD = `github.com`, qd.PROVIDER_ID = `github.com`;
var Jd = class e extends Wd {
    constructor() {
        super(`twitter.com`)
    }
    static credential(t, n) {
        return Md._fromParams({
            providerId: e.PROVIDER_ID,
            signInMethod: e.TWITTER_SIGN_IN_METHOD,
            oauthToken: t,
            oauthTokenSecret: n
        })
    }
    static credentialFromResult(t) {
        return e.credentialFromTaggedObject(t)
    }
    static credentialFromError(t) {
        return e.credentialFromTaggedObject(t.customData || {})
    }
    static credentialFromTaggedObject({
        _tokenResponse: t
    }) {
        if (!t) return null;
        let {
            oauthAccessToken: n,
            oauthTokenSecret: r
        } = t;
        if (!n || !r) return null;
        try {
            return e.credential(n, r)
        } catch {
            return null
        }
    }
};
Jd.TWITTER_SIGN_IN_METHOD = `twitter.com`, Jd.PROVIDER_ID = `twitter.com`;
var Yd = class e {
    constructor(e) {
        this.user = e.user, this.providerId = e.providerId, this._tokenResponse = e._tokenResponse, this.operationType = e.operationType
    }
    static async _fromIdTokenResponse(t, n, r, i = !1) {
        return new e({
            user: await Mu._fromIdTokenResponse(t, r, i),
            providerId: Xd(r),
            _tokenResponse: r,
            operationType: n
        })
    }
    static async _forOperation(t, n, r) {
        return await t._updateTokensIfNecessary(r, !0), new e({
            user: t,
            providerId: Xd(r),
            _tokenResponse: r,
            operationType: n
        })
    }
};

function Xd(e) {
    return e.providerId ? e.providerId : `phoneNumber` in e ? `phone` : null
}
var Zd = class e extends S {
    constructor(t, n, r, i) {
        super(n.code, n.message), this.operationType = r, this.user = i, Object.setPrototypeOf(this, e.prototype), this.customData = {
            appName: t.name,
            tenantId: t.tenantId ?? void 0,
            _serverResponse: n.customData._serverResponse,
            operationType: r
        }
    }
    static _fromErrorAndOperation(t, n, r, i) {
        return new e(t, n, r, i)
    }
};

function Qd(e, t, n, r) {
    return (t === `reauthenticate` ? n._getReauthenticationResolver(e) : n._getIdTokenResponse(e)).catch(n => {
        throw n.code === `auth/multi-factor-auth-required` ? Zd._fromErrorAndOperation(e, n, t, r) : n
    })
}
async function $d(e, t, n = !1) {
    let r = await bu(e, t._linkToIdToken(e.auth, await e.getIdToken()), n);
    return Yd._forOperation(e, `link`, r)
}
async function ef(e, t, n = !1) {
    let {
        auth: r
    } = e;
    if (ne(r.app)) return Promise.reject(Hl(r));
    let i = `reauthenticate`;
    try {
        let a = await bu(e, Qd(r, i, t, e), n);
        Y(a.idToken, r, `internal-error`);
        let o = vu(a.idToken);
        Y(o, r, `internal-error`);
        let {
            sub: s
        } = o;
        return Y(e.uid === s, r, `user-mismatch`), Yd._forOperation(e, i, a)
    } catch (e) {
        throw e?.code === `auth/user-not-found` && q(r, `user-mismatch`), e
    }
}
async function tf(e, t, n = !1) {
    if (ne(e.app)) return Promise.reject(Hl(e));
    let r = `signIn`,
        i = await Qd(e, r, t),
        a = await Yd._fromIdTokenResponse(e, r, i);
    return n || await e._updateCurrentUser(a.user), a
}
async function nf(e, t) {
    return tf(nd(e), t)
}
async function rf(e) {
    let t = nd(e);
    t._getPasswordPolicyInternal() && await t._updatePasswordPolicy()
}

function af(e, t, n) {
    return ne(e.app) ? Promise.reject(Hl(e)) : nf(w(e), Hd.credential(t, n)).catch(async t => {
        throw t.code === `auth/password-does-not-meet-requirements` && rf(e), t
    })
}

function of(e, t, n, r) {
    return w(e).onIdTokenChanged(t, n, r)
}

function sf(e, t, n) {
    return w(e).beforeAuthStateChanged(t, n)
}

function cf(e, t, n, r) {
    return w(e).onAuthStateChanged(t, n, r)
}

function lf(e) {
    return w(e).signOut()
}

function uf(e, t) {
    return ru(e, `POST`, `/v2/accounts/mfaEnrollment:start`, nu(e, t))
}

function df(e, t) {
    return ru(e, `POST`, `/v2/accounts/mfaEnrollment:finalize`, nu(e, t))
}

function ff(e, t) {
    return ru(e, `POST`, `/v2/accounts/mfaEnrollment:start`, nu(e, t))
}

function pf(e, t) {
    return ru(e, `POST`, `/v2/accounts/mfaEnrollment:finalize`, nu(e, t))
}
var mf = `__sak`,
    hf = class {
        constructor(e, t) {
            this.storageRetriever = e, this.type = t
        }
        _isAvailable() {
            try {
                return this.storage ? (this.storage.setItem(mf, `1`), this.storage.removeItem(mf), Promise.resolve(!0)) : Promise.resolve(!1)
            } catch {
                return Promise.resolve(!1)
            }
        }
        _set(e, t) {
            return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve()
        }
        _get(e) {
            let t = this.storage.getItem(e);
            return Promise.resolve(t ? JSON.parse(t) : null)
        }
        _remove(e) {
            return this.storage.removeItem(e), Promise.resolve()
        }
        get storage() {
            return this.storageRetriever()
        }
    },
    gf = 1e3,
    _f = 10,
    vf = class extends hf {
        constructor() {
            super(() => window.localStorage, `LOCAL`), this.boundEventHandler = (e, t) => this.onStorageEvent(e, t), this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.fallbackToPolling = Yu(), this._shouldAllowMigration = !0
        }
        forAllChangedKeys(e) {
            for (let t of Object.keys(this.listeners)) {
                let n = this.storage.getItem(t),
                    r = this.localCache[t];
                n !== r && e(t, r, n)
            }
        }
        onStorageEvent(e, t = !1) {
            if (!e.key) {
                this.forAllChangedKeys((e, t, n) => {
                    this.notifyListeners(e, n)
                });
                return
            }
            let n = e.key;
            t ? this.detachListener() : this.stopPolling();
            let r = () => {
                    let e = this.storage.getItem(n);
                    !t && this.localCache[n] === e || this.notifyListeners(n, e)
                },
                i = this.storage.getItem(n);
            Ju() && i !== e.newValue && e.newValue !== e.oldValue ? setTimeout(r, _f) : r()
        }
        notifyListeners(e, t) {
            this.localCache[e] = t;
            let n = this.listeners[e];
            if (n)
                for (let e of Array.from(n)) e(t && JSON.parse(t))
        }
        startPolling() {
            this.stopPolling(), this.pollTimer = setInterval(() => {
                this.forAllChangedKeys((e, t, n) => {
                    this.onStorageEvent(new StorageEvent(`storage`, {
                        key: e,
                        oldValue: t,
                        newValue: n
                    }), !0)
                })
            }, gf)
        }
        stopPolling() {
            this.pollTimer &&= (clearInterval(this.pollTimer), null)
        }
        attachListener() {
            window.addEventListener(`storage`, this.boundEventHandler)
        }
        detachListener() {
            window.removeEventListener(`storage`, this.boundEventHandler)
        }
        _addListener(e, t) {
            Object.keys(this.listeners).length === 0 && (this.fallbackToPolling ? this.startPolling() : this.attachListener()), this.listeners[e] || (this.listeners[e] = new Set, this.localCache[e] = this.storage.getItem(e)), this.listeners[e].add(t)
        }
        _removeListener(e, t) {
            this.listeners[e] && (this.listeners[e].delete(t), this.listeners[e].size === 0 && delete this.listeners[e]), Object.keys(this.listeners).length === 0 && (this.detachListener(), this.stopPolling())
        }
        async _set(e, t) {
            await super._set(e, t), this.localCache[e] = JSON.stringify(t)
        }
        async _get(e) {
            let t = await super._get(e);
            return this.localCache[e] = JSON.stringify(t), t
        }
        async _remove(e) {
            await super._remove(e), delete this.localCache[e]
        }
    };
vf.type = `LOCAL`;
var yf = vf,
    bf = 1e3;

function xf(e) {
    let t = e.replace(/[\\^$.*+?()[\]{}|]/g, `\\$&`),
        n = RegExp(`${t}=([^;]+)`);
    return document.cookie.match(n)?.[1] ?? null
}

function Sf(e) {
    return `${window.location.protocol===`http:`?`__dev_`:`__HOST-`}FIREBASE_${e.split(`:`)[3]}`
}
var Cf = class {
    constructor() {
        this.type = `COOKIE`, this.listenerUnsubscribes = new Map
    }
    _getFinalTarget(e) {
        let t = new URL(`${window.location.origin}/__cookies__`);
        return t.searchParams.set(`finalTarget`, e), t
    }
    async _isAvailable() {
        return typeof isSecureContext == `boolean` && !isSecureContext || typeof navigator > `u` || typeof document > `u` ? !1 : navigator.cookieEnabled ?? !0
    }
    async _set(e, t) {}
    async _get(e) {
        if (!this._isAvailable()) return null;
        let t = Sf(e);
        return window.cookieStore ? (await window.cookieStore.get(t))?.value : xf(t)
    }
    async _remove(e) {
        if (!this._isAvailable() || !await this._get(e)) return;
        let t = Sf(e);
        document.cookie = `${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`, await fetch(`/__cookies__`, {
            method: `DELETE`
        }).catch(() => void 0)
    }
    _addListener(e, t) {
        if (!this._isAvailable()) return;
        let n = Sf(e);
        if (window.cookieStore) {
            let e = (e => {
                let r = e.changed.find(e => e.name === n);
                r && t(r.value), e.deleted.find(e => e.name === n) && t(null)
            });
            return this.listenerUnsubscribes.set(t, () => window.cookieStore.removeEventListener(`change`, e)), window.cookieStore.addEventListener(`change`, e)
        }
        let r = xf(n),
            i = setInterval(() => {
                let e = xf(n);
                e !== r && (t(e), r = e)
            }, bf);
        this.listenerUnsubscribes.set(t, () => clearInterval(i))
    }
    _removeListener(e, t) {
        let n = this.listenerUnsubscribes.get(t);
        n && (n(), this.listenerUnsubscribes.delete(t))
    }
};
Cf.type = `COOKIE`;
var wf = class extends hf {
    constructor() {
        super(() => window.sessionStorage, `SESSION`)
    }
    _addListener(e, t) {}
    _removeListener(e, t) {}
};
wf.type = `SESSION`;
var Tf = wf;

function Ef(e) {
    return Promise.all(e.map(async e => {
        try {
            return {
                fulfilled: !0,
                value: await e
            }
        } catch (e) {
            return {
                fulfilled: !1,
                reason: e
            }
        }
    }))
}
var Df = class e {
    constructor(e) {
        this.eventTarget = e, this.handlersMap = {}, this.boundEventHandler = this.handleEvent.bind(this)
    }
    static _getInstance(t) {
        let n = this.receivers.find(e => e.isListeningto(t));
        if (n) return n;
        let r = new e(t);
        return this.receivers.push(r), r
    }
    isListeningto(e) {
        return this.eventTarget === e
    }
    async handleEvent(e) {
        let t = e,
            {
                eventId: n,
                eventType: r,
                data: i
            } = t.data,
            a = this.handlersMap[r];
        if (!a?.size) return;
        t.ports[0].postMessage({
            status: `ack`,
            eventId: n,
            eventType: r
        });
        let o = await Ef(Array.from(a).map(async e => e(t.origin, i)));
        t.ports[0].postMessage({
            status: `done`,
            eventId: n,
            eventType: r,
            response: o
        })
    }
    _subscribe(e, t) {
        Object.keys(this.handlersMap).length === 0 && this.eventTarget.addEventListener(`message`, this.boundEventHandler), this.handlersMap[e] || (this.handlersMap[e] = new Set), this.handlersMap[e].add(t)
    }
    _unsubscribe(e, t) {
        this.handlersMap[e] && t && this.handlersMap[e].delete(t), (!t || this.handlersMap[e].size === 0) && delete this.handlersMap[e], Object.keys(this.handlersMap).length === 0 && this.eventTarget.removeEventListener(`message`, this.boundEventHandler)
    }
};
Df.receivers = [];

function Of(e = ``, t = 10) {
    let n = ``;
    for (let e = 0; e < t; e++) n += Math.floor(Math.random() * 10);
    return e + n
}
var kf = class {
    constructor(e) {
        this.target = e, this.handlers = new Set
    }
    removeMessageHandler(e) {
        e.messageChannel && (e.messageChannel.port1.removeEventListener(`message`, e.onMessage), e.messageChannel.port1.close()), this.handlers.delete(e)
    }
    async _send(e, t, n = 50) {
        let r = typeof MessageChannel < `u` ? new MessageChannel : null;
        if (!r) throw Error(`connection_unavailable`);
        let i, a;
        return new Promise((o, s) => {
            let c = Of(``, 20);
            r.port1.start();
            let l = setTimeout(() => {
                s(Error(`unsupported_event`))
            }, n);
            a = {
                messageChannel: r,
                onMessage(e) {
                    let t = e;
                    if (t.data.eventId === c) switch (t.data.status) {
                        case `ack`:
                            clearTimeout(l), i = setTimeout(() => {
                                s(Error(`timeout`))
                            }, 3e3);
                            break;
                        case `done`:
                            clearTimeout(i), o(t.data.response);
                            break;
                        default:
                            clearTimeout(l), clearTimeout(i), s(Error(`invalid_response`));
                            break
                    }
                }
            }, this.handlers.add(a), r.port1.addEventListener(`message`, a.onMessage), this.target.postMessage({
                eventType: e,
                eventId: c,
                data: t
            }, [r.port2])
        }).finally(() => {
            a && this.removeMessageHandler(a)
        })
    }
};

function Af() {
    return window
}

function jf(e) {
    Af().location.href = e
}

function Mf() {
    return Af().WorkerGlobalScope !== void 0 && typeof Af().importScripts == `function`
}
async function Nf() {
    if (!navigator?.serviceWorker) return null;
    try {
        return (await navigator.serviceWorker.ready).active
    } catch {
        return null
    }
}

function Pf() {
    return navigator?.serviceWorker?.controller || null
}

function Ff() {
    return Mf() ? self : null
}
var If = `firebaseLocalStorageDb`,
    Lf = 1,
    Rf = `firebaseLocalStorage`,
    zf = `fbase_key`,
    Bf = class {
        constructor(e) {
            this.request = e
        }
        toPromise() {
            return new Promise((e, t) => {
                this.request.addEventListener(`success`, () => {
                    e(this.request.result)
                }), this.request.addEventListener(`error`, () => {
                    t(this.request.error)
                })
            })
        }
    };

function Vf(e, t) {
    return e.transaction([Rf], t ? `readwrite` : `readonly`).objectStore(Rf)
}

function Hf() {
    return new Bf(indexedDB.deleteDatabase(If)).toPromise()
}

function Uf() {
    let e = indexedDB.open(If, Lf);
    return new Promise((t, n) => {
        e.addEventListener(`error`, () => {
            n(e.error)
        }), e.addEventListener(`upgradeneeded`, () => {
            let t = e.result;
            try {
                t.createObjectStore(Rf, {
                    keyPath: zf
                })
            } catch (e) {
                n(e)
            }
        }), e.addEventListener(`success`, async () => {
            let n = e.result;
            n.objectStoreNames.contains(Rf) ? t(n) : (n.close(), await Hf(), t(await Uf()))
        })
    })
}
async function Wf(e, t, n) {
    return new Bf(Vf(e, !0).put({
        [zf]: t,
        value: n
    })).toPromise()
}
async function Gf(e, t) {
    let n = await new Bf(Vf(e, !1).get(t)).toPromise();
    return n === void 0 ? null : n.value
}

function Kf(e, t) {
    return new Bf(Vf(e, !0).delete(t)).toPromise()
}
var qf = 800,
    Jf = 3,
    Yf = class {
        constructor() {
            this.type = `LOCAL`, this._shouldAllowMigration = !0, this.listeners = {}, this.localCache = {}, this.pollTimer = null, this.pendingWrites = 0, this.receiver = null, this.sender = null, this.serviceWorkerReceiverAvailable = !1, this.activeServiceWorker = null, this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {}, () => {})
        }
        async _openDb() {
            return this.db ||= await Uf(), this.db
        }
        async _withRetries(e) {
            let t = 0;
            for (;;) try {
                return await e(await this._openDb())
            } catch (e) {
                if (t++ > Jf) throw e;
                this.db &&= (this.db.close(), void 0)
            }
        }
        async initializeServiceWorkerMessaging() {
            return Mf() ? this.initializeReceiver() : this.initializeSender()
        }
        async initializeReceiver() {
            this.receiver = Df._getInstance(Ff()), this.receiver._subscribe(`keyChanged`, async (e, t) => ({
                keyProcessed: (await this._poll()).includes(t.key)
            })), this.receiver._subscribe(`ping`, async (e, t) => [`keyChanged`])
        }
        async initializeSender() {
            if (this.activeServiceWorker = await Nf(), !this.activeServiceWorker) return;
            this.sender = new kf(this.activeServiceWorker);
            let e = await this.sender._send(`ping`, {}, 800);
            e && e[0]?.fulfilled && e[0]?.value.includes(`keyChanged`) && (this.serviceWorkerReceiverAvailable = !0)
        }
        async notifyServiceWorker(e) {
            if (!(!this.sender || !this.activeServiceWorker || Pf() !== this.activeServiceWorker)) try {
                await this.sender._send(`keyChanged`, {
                    key: e
                }, this.serviceWorkerReceiverAvailable ? 800 : 50)
            } catch {}
        }
        async _isAvailable() {
            try {
                if (!indexedDB) return !1;
                let e = await Uf();
                return await Wf(e, mf, `1`), await Kf(e, mf), !0
            } catch {}
            return !1
        }
        async _withPendingWrite(e) {
            this.pendingWrites++;
            try {
                await e()
            } finally {
                this.pendingWrites--
            }
        }
        async _set(e, t) {
            return this._withPendingWrite(async () => (await this._withRetries(n => Wf(n, e, t)), this.localCache[e] = t, this.notifyServiceWorker(e)))
        }
        async _get(e) {
            let t = await this._withRetries(t => Gf(t, e));
            return this.localCache[e] = t, t
        }
        async _remove(e) {
            return this._withPendingWrite(async () => (await this._withRetries(t => Kf(t, e)), delete this.localCache[e], this.notifyServiceWorker(e)))
        }
        async _poll() {
            let e = await this._withRetries(e => new Bf(Vf(e, !1).getAll()).toPromise());
            if (!e || this.pendingWrites !== 0) return [];
            let t = [],
                n = new Set;
            if (e.length !== 0)
                for (let {
                        fbase_key: r,
                        value: i
                    }
                    of e) n.add(r), JSON.stringify(this.localCache[r]) !== JSON.stringify(i) && (this.notifyListeners(r, i), t.push(r));
            for (let e of Object.keys(this.localCache)) this.localCache[e] && !n.has(e) && (this.notifyListeners(e, null), t.push(e));
            return t
        }
        notifyListeners(e, t) {
            this.localCache[e] = t;
            let n = this.listeners[e];
            if (n)
                for (let e of Array.from(n)) e(t)
        }
        startPolling() {
            this.stopPolling(), this.pollTimer = setInterval(async () => this._poll(), qf)
        }
        stopPolling() {
            this.pollTimer &&= (clearInterval(this.pollTimer), null)
        }
        _addListener(e, t) {
            Object.keys(this.listeners).length === 0 && this.startPolling(), this.listeners[e] || (this.listeners[e] = new Set, this._get(e)), this.listeners[e].add(t)
        }
        _removeListener(e, t) {
            this.listeners[e] && (this.listeners[e].delete(t), this.listeners[e].size === 0 && delete this.listeners[e]), Object.keys(this.listeners).length === 0 && this.stopPolling()
        }
    };
Yf.type = `LOCAL`;
var Xf = Yf;

function Zf(e, t) {
    return ru(e, `POST`, `/v2/accounts/mfaSignIn:start`, nu(e, t))
}

function Qf(e, t) {
    return ru(e, `POST`, `/v2/accounts/mfaSignIn:finalize`, nu(e, t))
}

function $f(e, t) {
    return ru(e, `POST`, `/v2/accounts/mfaSignIn:finalize`, nu(e, t))
}
ld(`rcb`), new Xl(3e4, 6e4);
var ep = `recaptcha`;
async function tp(e, t, n) {
    if (!e._getRecaptchaConfig()) try {
        await _d(e)
    } catch {
        console.log(`Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.`)
    }
    try {
        let r;
        if (r = typeof t == `string` ? {
                phoneNumber: t
            } : t, `session` in r) {
            let t = r.session;
            if (`phoneNumber` in r) return Y(t.type === `enroll`, e, `internal-error`), (await gd(e, {
                idToken: t.credential,
                phoneEnrollmentInfo: {
                    phoneNumber: r.phoneNumber,
                    clientType: `CLIENT_TYPE_WEB`
                }
            }, `mfaSmsEnrollment`, async (e, t) => t.phoneEnrollmentInfo.captchaResponse === pd ? (Y(n?.type === ep, e, `argument-error`), uf(e, await np(e, t, n))) : uf(e, t), `PHONE_PROVIDER`).catch(e => Promise.reject(e))).phoneSessionInfo.sessionInfo;
            {
                Y(t.type === `signin`, e, `internal-error`);
                let i = r.multiFactorHint?.uid || r.multiFactorUid;
                return Y(i, e, `missing-multi-factor-info`), (await gd(e, {
                    mfaPendingCredential: t.credential,
                    mfaEnrollmentId: i,
                    phoneSignInInfo: {
                        clientType: `CLIENT_TYPE_WEB`
                    }
                }, `mfaSmsSignIn`, async (e, t) => t.phoneSignInInfo.captchaResponse === pd ? (Y(n?.type === ep, e, `argument-error`), Zf(e, await np(e, t, n))) : Zf(e, t), `PHONE_PROVIDER`).catch(e => Promise.reject(e))).phoneResponseInfo.sessionInfo
            }
        } else return (await gd(e, {
            phoneNumber: r.phoneNumber,
            clientType: `CLIENT_TYPE_WEB`
        }, `sendVerificationCode`, async (e, t) => t.captchaResponse === pd ? (Y(n?.type === ep, e, `argument-error`), Nd(e, await np(e, t, n))) : Nd(e, t), `PHONE_PROVIDER`).catch(e => Promise.reject(e))).sessionInfo
    } finally {
        n?._reset()
    }
}
async function np(e, t, n) {
    Y(n.type === ep, e, `argument-error`);
    let r = await n.verify();
    Y(typeof r == `string`, e, `argument-error`);
    let i = {
        ...t
    };
    if (`phoneEnrollmentInfo` in i) {
        let e = i.phoneEnrollmentInfo.phoneNumber,
            t = i.phoneEnrollmentInfo.captchaResponse,
            n = i.phoneEnrollmentInfo.clientType,
            a = i.phoneEnrollmentInfo.recaptchaVersion;
        return Object.assign(i, {
            phoneEnrollmentInfo: {
                phoneNumber: e,
                recaptchaToken: r,
                captchaResponse: t,
                clientType: n,
                recaptchaVersion: a
            }
        }), i
    } else if (`phoneSignInInfo` in i) {
        let e = i.phoneSignInInfo.captchaResponse,
            t = i.phoneSignInInfo.clientType,
            n = i.phoneSignInInfo.recaptchaVersion;
        return Object.assign(i, {
            phoneSignInInfo: {
                recaptchaToken: r,
                captchaResponse: e,
                clientType: t,
                recaptchaVersion: n
            }
        }), i
    } else return Object.assign(i, {
        recaptchaToken: r
    }), i
}
var rp = class e {
    constructor(t) {
        this.providerId = e.PROVIDER_ID, this.auth = nd(t)
    }
    verifyPhoneNumber(e, t) {
        return tp(this.auth, e, w(t))
    }
    static credential(e, t) {
        return Rd._fromVerification(e, t)
    }
    static credentialFromResult(t) {
        let n = t;
        return e.credentialFromTaggedObject(n)
    }
    static credentialFromError(t) {
        return e.credentialFromTaggedObject(t.customData || {})
    }
    static credentialFromTaggedObject({
        _tokenResponse: e
    }) {
        if (!e) return null;
        let {
            phoneNumber: t,
            temporaryProof: n
        } = e;
        return t && n ? Rd._fromTokenResponse(t, n) : null
    }
};
rp.PROVIDER_ID = `phone`, rp.PHONE_SIGN_IN_METHOD = `phone`;

function ip(e, t) {
    return t ? Pu(t) : (Y(e._popupRedirectResolver, e, `argument-error`), e._popupRedirectResolver)
}
var ap = class extends wd {
    constructor(e) {
        super(`custom`, `custom`), this.params = e
    }
    _getIdTokenResponse(e) {
        return Ad(e, this._buildIdpRequest())
    }
    _linkToIdToken(e, t) {
        return Ad(e, this._buildIdpRequest(t))
    }
    _getReauthenticationResolver(e) {
        return Ad(e, this._buildIdpRequest())
    }
    _buildIdpRequest(e) {
        let t = {
            requestUri: this.params.requestUri,
            sessionId: this.params.sessionId,
            postBody: this.params.postBody,
            tenantId: this.params.tenantId,
            pendingToken: this.params.pendingToken,
            returnSecureToken: !0,
            returnIdpCredential: !0
        };
        return e && (t.idToken = e), t
    }
};

function op(e) {
    return tf(e.auth, new ap(e), e.bypassAuthState)
}

function sp(e) {
    let {
        auth: t,
        user: n
    } = e;
    return Y(n, t, `internal-error`), ef(n, new ap(e), e.bypassAuthState)
}
async function cp(e) {
    let {
        auth: t,
        user: n
    } = e;
    return Y(n, t, `internal-error`), $d(n, new ap(e), e.bypassAuthState)
}
var lp = class {
        constructor(e, t, n, r, i = !1) {
            this.auth = e, this.resolver = n, this.user = r, this.bypassAuthState = i, this.pendingPromise = null, this.eventManager = null, this.filter = Array.isArray(t) ? t : [t]
        }
        execute() {
            return new Promise(async (e, t) => {
                this.pendingPromise = {
                    resolve: e,
                    reject: t
                };
                try {
                    this.eventManager = await this.resolver._initialize(this.auth), await this.onExecution(), this.eventManager.registerConsumer(this)
                } catch (e) {
                    this.reject(e)
                }
            })
        }
        async onAuthEvent(e) {
            let {
                urlResponse: t,
                sessionId: n,
                postBody: r,
                tenantId: i,
                error: a,
                type: o
            } = e;
            if (a) {
                this.reject(a);
                return
            }
            let s = {
                auth: this.auth,
                requestUri: t,
                sessionId: n,
                tenantId: i || void 0,
                postBody: r || void 0,
                user: this.user,
                bypassAuthState: this.bypassAuthState
            };
            try {
                this.resolve(await this.getIdpTask(o)(s))
            } catch (e) {
                this.reject(e)
            }
        }
        onError(e) {
            this.reject(e)
        }
        getIdpTask(e) {
            switch (e) {
                case `signInViaPopup`:
                case `signInViaRedirect`:
                    return op;
                case `linkViaPopup`:
                case `linkViaRedirect`:
                    return cp;
                case `reauthViaPopup`:
                case `reauthViaRedirect`:
                    return sp;
                default:
                    q(this.auth, `internal-error`)
            }
        }
        resolve(e) {
            X(this.pendingPromise, `Pending promise was never set`), this.pendingPromise.resolve(e), this.unregisterAndCleanUp()
        }
        reject(e) {
            X(this.pendingPromise, `Pending promise was never set`), this.pendingPromise.reject(e), this.unregisterAndCleanUp()
        }
        unregisterAndCleanUp() {
            this.eventManager && this.eventManager.unregisterConsumer(this), this.pendingPromise = null, this.cleanUp()
        }
    },
    up = new Xl(2e3, 1e4),
    dp = class e extends lp {
        constructor(t, n, r, i, a) {
            super(t, n, i, a), this.provider = r, this.authWindow = null, this.pollId = null, e.currentPopupAction && e.currentPopupAction.cancel(), e.currentPopupAction = this
        }
        async executeNotNull() {
            let e = await this.execute();
            return Y(e, this.auth, `internal-error`), e
        }
        async onExecution() {
            X(this.filter.length === 1, `Popup operations only handle one event`);
            let e = Of();
            this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], e), this.authWindow.associatedEvent = e, this.resolver._originValidation(this.auth).catch(e => {
                this.reject(e)
            }), this.resolver._isIframeWebStorageSupported(this.auth, e => {
                e || this.reject(J(this.auth, `web-storage-unsupported`))
            }), this.pollUserCancellation()
        }
        get eventId() {
            return this.authWindow?.associatedEvent || null
        }
        cancel() {
            this.reject(J(this.auth, `cancelled-popup-request`))
        }
        cleanUp() {
            this.authWindow && this.authWindow.close(), this.pollId && window.clearTimeout(this.pollId), this.authWindow = null, this.pollId = null, e.currentPopupAction = null
        }
        pollUserCancellation() {
            let e = () => {
                if (this.authWindow?.window?.closed) {
                    this.pollId = window.setTimeout(() => {
                        this.pollId = null, this.reject(J(this.auth, `popup-closed-by-user`))
                    }, 8e3);
                    return
                }
                this.pollId = window.setTimeout(e, up.get())
            };
            e()
        }
    };
dp.currentPopupAction = null;
var fp = `pendingRedirect`,
    pp = new Map,
    mp = class extends lp {
        constructor(e, t, n = !1) {
            super(e, [`signInViaRedirect`, `linkViaRedirect`, `reauthViaRedirect`, `unknown`], t, void 0, n), this.eventId = null
        }
        async execute() {
            let e = pp.get(this.auth._key());
            if (!e) {
                try {
                    let t = await hp(this.resolver, this.auth) ? await super.execute() : null;
                    e = () => Promise.resolve(t)
                } catch (t) {
                    e = () => Promise.reject(t)
                }
                pp.set(this.auth._key(), e)
            }
            return this.bypassAuthState || pp.set(this.auth._key(), () => Promise.resolve(null)), e()
        }
        async onAuthEvent(e) {
            if (e.type === `signInViaRedirect`) return super.onAuthEvent(e);
            if (e.type === `unknown`) {
                this.resolve(null);
                return
            }
            if (e.eventId) {
                let t = await this.auth._redirectUserForId(e.eventId);
                if (t) return this.user = t, super.onAuthEvent(e);
                this.resolve(null)
            }
        }
        async onExecution() {}
        cleanUp() {}
    };
async function hp(e, t) {
    let n = vp(t),
        r = _p(e);
    if (!await r._isAvailable()) return !1;
    let i = await r._get(n) === `true`;
    return await r._remove(n), i
}

function gp(e, t) {
    pp.set(e._key(), t)
}

function _p(e) {
    return Pu(e._redirectPersistence)
}

function vp(e) {
    return Lu(fp, e.config.apiKey, e.name)
}
async function yp(e, t, n = !1) {
    if (ne(e.app)) return Promise.reject(Hl(e));
    let r = nd(e),
        i = await new mp(r, ip(r, t), n).execute();
    return i && !n && (delete i.user._redirectEventId, await r._persistUserIfCurrent(i.user), await r._setRedirectUser(null, t)), i
}
var bp = 600 * 1e3,
    xp = class {
        constructor(e) {
            this.auth = e, this.cachedEventUids = new Set, this.consumers = new Set, this.queuedRedirectEvent = null, this.hasHandledPotentialRedirect = !1, this.lastProcessedEventTime = Date.now()
        }
        registerConsumer(e) {
            this.consumers.add(e), this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, e) && (this.sendToConsumer(this.queuedRedirectEvent, e), this.saveEventToCache(this.queuedRedirectEvent), this.queuedRedirectEvent = null)
        }
        unregisterConsumer(e) {
            this.consumers.delete(e)
        }
        onEvent(e) {
            if (this.hasEventBeenHandled(e)) return !1;
            let t = !1;
            return this.consumers.forEach(n => {
                this.isEventForConsumer(e, n) && (t = !0, this.sendToConsumer(e, n), this.saveEventToCache(e))
            }), this.hasHandledPotentialRedirect || !wp(e) ? t : (this.hasHandledPotentialRedirect = !0, t ||= (this.queuedRedirectEvent = e, !0), t)
        }
        sendToConsumer(e, t) {
            if (e.error && !Cp(e)) {
                let n = e.error.code?.split(`auth/`)[1] || `internal-error`;
                t.onError(J(this.auth, n))
            } else t.onAuthEvent(e)
        }
        isEventForConsumer(e, t) {
            let n = t.eventId === null || !!e.eventId && e.eventId === t.eventId;
            return t.filter.includes(e.type) && n
        }
        hasEventBeenHandled(e) {
            return Date.now() - this.lastProcessedEventTime >= bp && this.cachedEventUids.clear(), this.cachedEventUids.has(Sp(e))
        }
        saveEventToCache(e) {
            this.cachedEventUids.add(Sp(e)), this.lastProcessedEventTime = Date.now()
        }
    };

function Sp(e) {
    return [e.type, e.eventId, e.sessionId, e.tenantId].filter(e => e).join(`-`)
}

function Cp({
    type: e,
    error: t
}) {
    return e === `unknown` && t?.code === `auth/no-auth-event`
}

function wp(e) {
    switch (e.type) {
        case `signInViaRedirect`:
        case `linkViaRedirect`:
        case `reauthViaRedirect`:
            return !0;
        case `unknown`:
            return Cp(e);
        default:
            return !1
    }
}
async function Tp(e, t = {}) {
    return ru(e, `GET`, `/v1/projects`, t)
}
var Ep = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    Dp = /^https?/;
async function Op(e) {
    if (e.config.emulator) return;
    let {
        authorizedDomains: t
    } = await Tp(e);
    for (let e of t) try {
        if (kp(e)) return
    } catch {}
    q(e, `unauthorized-domain`)
}

function kp(e) {
    let t = Gl(),
        {
            protocol: n,
            hostname: r
        } = new URL(t);
    if (e.startsWith(`chrome-extension://`)) {
        let i = new URL(e);
        return i.hostname === `` && r === `` ? n === `chrome-extension:` && e.replace(`chrome-extension://`, ``) === t.replace(`chrome-extension://`, ``) : n === `chrome-extension:` && i.hostname === r
    }
    if (!Dp.test(n)) return !1;
    if (Ep.test(e)) return r === e;
    let i = e.replace(/\./g, `\\.`);
    return RegExp(`^(.+\\.` + i + `|` + i + `)$`, `i`).test(r)
}
var Ap = new Xl(3e4, 6e4);

function jp() {
    let e = Af().___jsl;
    if (e?.H) {
        for (let t of Object.keys(e.H))
            if (e.H[t].r = e.H[t].r || [], e.H[t].L = e.H[t].L || [], e.H[t].r = [...e.H[t].L], e.CP)
                for (let t = 0; t < e.CP.length; t++) e.CP[t] = null
    }
}

function Mp(e) {
    return new Promise((t, n) => {
        function r() {
            jp(), gapi.load(`gapi.iframes`, {
                callback: () => {
                    t(gapi.iframes.getContext())
                },
                ontimeout: () => {
                    jp(), n(J(e, `network-request-failed`))
                },
                timeout: Ap.get()
            })
        }
        if (Af().gapi?.iframes?.Iframe) t(gapi.iframes.getContext());
        else if (Af().gapi?.load) r();
        else {
            let t = ld(`iframefcb`);
            return Af()[t] = () => {
                gapi.load ? r() : n(J(e, `network-request-failed`))
            }, od(`${cd()}?onload=${t}`).catch(e => n(e))
        }
    }).catch(e => {
        throw Np = null, e
    })
}
var Np = null;

function Pp(e) {
    return Np ||= Mp(e), Np
}
var Fp = new Xl(5e3, 15e3),
    Ip = `__/auth/iframe`,
    Lp = `emulator/auth/iframe`,
    Rp = {
        style: {
            position: `absolute`,
            top: `-100px`,
            width: `1px`,
            height: `1px`
        },
        "aria-hidden": `true`,
        tabindex: `-1`
    },
    zp = new Map([
        [`identitytoolkit.googleapis.com`, `p`],
        [`staging-identitytoolkit.sandbox.googleapis.com`, `s`],
        [`test-identitytoolkit.sandbox.googleapis.com`, `t`]
    ]);

function Bp(e) {
    let t = e.config;
    Y(t.authDomain, e, `auth-domain-config-required`);
    let n = t.emulator ? Zl(t, Lp) : `https://${e.config.authDomain}/${Ip}`,
        r = {
            apiKey: t.apiKey,
            appName: e.name,
            v: C
        },
        i = zp.get(e.config.apiHost);
    i && (r.eid = i);
    let o = e._getFrameworks();
    return o.length && (r.fw = o.join(`,`)), `${n}?${a(r).slice(1)}`
}
async function Vp(e) {
    let t = await Pp(e),
        n = Af().gapi;
    return Y(n, e, `internal-error`), t.open({
        where: document.body,
        url: Bp(e),
        messageHandlersFilter: n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
        attributes: Rp,
        dontclear: !0
    }, t => new Promise(async (n, r) => {
        await t.restyle({
            setHideOnLeave: !1
        });
        let i = J(e, `network-request-failed`),
            a = Af().setTimeout(() => {
                r(i)
            }, Fp.get());

        function o() {
            Af().clearTimeout(a), n(t)
        }
        t.ping(o).then(o, () => {
            r(i)
        })
    }))
}
var Hp = {
        location: `yes`,
        resizable: `yes`,
        statusbar: `yes`,
        toolbar: `no`
    },
    Up = 500,
    Wp = 600,
    Gp = `_blank`,
    Kp = `http://localhost`,
    qp = class {
        constructor(e) {
            this.window = e, this.associatedEvent = null
        }
        close() {
            if (this.window) try {
                this.window.close()
            } catch {}
        }
    };

function Jp(e, t, n, r = Up, i = Wp) {
    let a = Math.max((window.screen.availHeight - i) / 2, 0).toString(),
        o = Math.max((window.screen.availWidth - r) / 2, 0).toString(),
        s = ``,
        c = {
            ...Hp,
            width: r.toString(),
            height: i.toString(),
            top: a,
            left: o
        },
        l = f().toLowerCase();
    n && (s = Hu(l) ? Gp : n), Bu(l) && (t ||= Kp, c.scrollbars = `yes`);
    let u = Object.entries(c).reduce((e, [t, n]) => `${e}${t}=${n},`, ``);
    if (qu(l) && s !== `_self`) return Yp(t || ``, s), new qp(null);
    let d = window.open(t || ``, s, u);
    Y(d, e, `popup-blocked`);
    try {
        d.focus()
    } catch {}
    return new qp(d)
}

function Yp(e, t) {
    let n = document.createElement(`a`);
    n.href = e, n.target = t;
    let r = document.createEvent(`MouseEvent`);
    r.initMouseEvent(`click`, !0, !0, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 1, null), n.dispatchEvent(r)
}
var Xp = `__/auth/handler`,
    Zp = `emulator/auth/handler`,
    Qp = `fac`;
async function $p(e, t, n, r, i, o) {
    Y(e.config.authDomain, e, `auth-domain-config-required`), Y(e.config.apiKey, e, `invalid-api-key`);
    let s = {
        apiKey: e.config.apiKey,
        appName: e.name,
        authType: n,
        redirectUrl: r,
        v: C,
        eventId: i
    };
    if (t instanceof Ud) {
        t.setDefaultLanguage(e.languageCode), s.providerId = t.providerId || ``, b(t.getCustomParameters()) || (s.customParameters = JSON.stringify(t.getCustomParameters()));
        for (let [e, t] of Object.entries(o || {})) s[e] = t
    }
    if (t instanceof Wd) {
        let e = t.getScopes().filter(e => e !== ``);
        e.length > 0 && (s.scopes = e.join(`,`))
    }
    e.tenantId && (s.tid = e.tenantId);
    let c = s;
    for (let e of Object.keys(c)) c[e] === void 0 && delete c[e];
    let l = await e._getAppCheckToken(),
        u = l ? `#${Qp}=${encodeURIComponent(l)}` : ``;
    return `${em(e)}?${a(c).slice(1)}${u}`
}

function em({
    config: e
}) {
    return e.emulator ? Zl(e, Zp) : `https://${e.authDomain}/${Xp}`
}
var tm = `webStorageSupport`,
    nm = class {
        constructor() {
            this.eventManagers = {}, this.iframes = {}, this.originValidationPromises = {}, this._redirectPersistence = Tf, this._completeRedirectFn = yp, this._overrideRedirectResult = gp
        }
        async _openPopup(e, t, n, r) {
            return X(this.eventManagers[e._key()]?.manager, `_initialize() not called before _openPopup()`), Jp(e, await $p(e, t, n, Gl(), r), Of())
        }
        async _openRedirect(e, t, n, r) {
            return await this._originValidation(e), jf(await $p(e, t, n, Gl(), r)), new Promise(() => {})
        }
        _initialize(e) {
            let t = e._key();
            if (this.eventManagers[t]) {
                let {
                    manager: e,
                    promise: n
                } = this.eventManagers[t];
                return e ? Promise.resolve(e) : (X(n, `If manager is not set, promise should be`), n)
            }
            let n = this.initAndGetManager(e);
            return this.eventManagers[t] = {
                promise: n
            }, n.catch(() => {
                delete this.eventManagers[t]
            }), n
        }
        async initAndGetManager(e) {
            let t = await Vp(e),
                n = new xp(e);
            return t.register(`authEvent`, t => (Y(t?.authEvent, e, `invalid-auth-event`), {
                status: n.onEvent(t.authEvent) ? `ACK` : `ERROR`
            }), gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER), this.eventManagers[e._key()] = {
                manager: n
            }, this.iframes[e._key()] = t, n
        }
        _isIframeWebStorageSupported(e, t) {
            this.iframes[e._key()].send(tm, {
                type: tm
            }, n => {
                let r = n?.[0]?.[tm];
                r !== void 0 && t(!!r), q(e, `internal-error`)
            }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)
        }
        _originValidation(e) {
            let t = e._key();
            return this.originValidationPromises[t] || (this.originValidationPromises[t] = Op(e)), this.originValidationPromises[t]
        }
        get _shouldInitProactively() {
            return Yu() || Vu() || Ku()
        }
    },
    rm = class {
        constructor(e) {
            this.factorId = e
        }
        _process(e, t, n) {
            switch (t.type) {
                case `enroll`:
                    return this._finalizeEnroll(e, t.credential, n);
                case `signin`:
                    return this._finalizeSignIn(e, t.credential);
                default:
                    return Wl(`unexpected MultiFactorSessionType`)
            }
        }
    },
    im = class e extends rm {
        constructor(e) {
            super(`phone`), this.credential = e
        }
        static _fromCredential(t) {
            return new e(t)
        }
        _finalizeEnroll(e, t, n) {
            return df(e, {
                idToken: t,
                displayName: n,
                phoneVerificationInfo: this.credential._makeVerificationRequest()
            })
        }
        _finalizeSignIn(e, t) {
            return Qf(e, {
                mfaPendingCredential: t,
                phoneVerificationInfo: this.credential._makeVerificationRequest()
            })
        }
    },
    am = class {
        constructor() {}
        static assertion(e) {
            return im._fromCredential(e)
        }
    };
am.FACTOR_ID = `phone`;
var om = class {
    static assertionForEnrollment(e, t) {
        return sm._fromSecret(e, t)
    }
    static assertionForSignIn(e, t) {
        return sm._fromEnrollmentId(e, t)
    }
    static async generateSecret(e) {
        let t = e;
        Y(t.user?.auth !== void 0, `internal-error`);
        let n = await ff(t.user.auth, {
            idToken: t.credential,
            totpEnrollmentInfo: {}
        });
        return cm._fromStartTotpMfaEnrollmentResponse(n, t.user.auth)
    }
};
om.FACTOR_ID = `totp`;
var sm = class e extends rm {
        constructor(e, t, n) {
            super(`totp`), this.otp = e, this.enrollmentId = t, this.secret = n
        }
        static _fromSecret(t, n) {
            return new e(n, void 0, t)
        }
        static _fromEnrollmentId(t, n) {
            return new e(n, t)
        }
        async _finalizeEnroll(e, t, n) {
            return Y(this.secret !== void 0, e, `argument-error`), pf(e, {
                idToken: t,
                displayName: n,
                totpVerificationInfo: this.secret._makeTotpVerificationInfo(this.otp)
            })
        }
        async _finalizeSignIn(e, t) {
            Y(this.enrollmentId !== void 0 && this.otp !== void 0, e, `argument-error`);
            let n = {
                verificationCode: this.otp
            };
            return $f(e, {
                mfaPendingCredential: t,
                mfaEnrollmentId: this.enrollmentId,
                totpVerificationInfo: n
            })
        }
    },
    cm = class e {
        constructor(e, t, n, r, i, a, o) {
            this.sessionInfo = a, this.auth = o, this.secretKey = e, this.hashingAlgorithm = t, this.codeLength = n, this.codeIntervalSeconds = r, this.enrollmentCompletionDeadline = i
        }
        static _fromStartTotpMfaEnrollmentResponse(t, n) {
            return new e(t.totpSessionInfo.sharedSecretKey, t.totpSessionInfo.hashingAlgorithm, t.totpSessionInfo.verificationCodeLength, t.totpSessionInfo.periodSec, new Date(t.totpSessionInfo.finalizeEnrollmentTime).toUTCString(), t.totpSessionInfo.sessionInfo, n)
        }
        _makeTotpVerificationInfo(e) {
            return {
                sessionInfo: this.sessionInfo,
                verificationCode: e
            }
        }
        generateQrCodeUrl(e, t) {
            let n = !1;
            return (lm(e) || lm(t)) && (n = !0), n && (lm(e) && (e = this.auth.currentUser?.email || `unknownuser`), lm(t) && (t = this.auth.name)), `otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`
        }
    };

function lm(e) {
    return e === void 0 || e?.length === 0
}
var um = `@firebase/auth`,
    dm = `1.12.2`,
    fm = class {
        constructor(e) {
            this.auth = e, this.internalListeners = new Map
        }
        getUid() {
            return this.assertAuthConfigured(), this.auth.currentUser?.uid || null
        }
        async getToken(e) {
            return this.assertAuthConfigured(), await this.auth._initializationPromise, this.auth.currentUser ? {
                accessToken: await this.auth.currentUser.getIdToken(e)
            } : null
        }
        addAuthTokenListener(e) {
            if (this.assertAuthConfigured(), this.internalListeners.has(e)) return;
            let t = this.auth.onIdTokenChanged(t => {
                e(t?.stsTokenManager.accessToken || null)
            });
            this.internalListeners.set(e, t), this.updateProactiveRefresh()
        }
        removeAuthTokenListener(e) {
            this.assertAuthConfigured();
            let t = this.internalListeners.get(e);
            t && (this.internalListeners.delete(e), t(), this.updateProactiveRefresh())
        }
        assertAuthConfigured() {
            Y(this.auth._initializationPromise, `dependent-sdk-initialized-before-auth`)
        }
        updateProactiveRefresh() {
            this.internalListeners.size > 0 ? this.auth._startProactiveRefresh() : this.auth._stopProactiveRefresh()
        }
    };

function pm(e) {
    switch (e) {
        case `Node`:
            return `node`;
        case `ReactNative`:
            return `rn`;
        case `Worker`:
            return `webworker`;
        case `Cordova`:
            return `cordova`;
        case `WebExtension`:
            return `web-extension`;
        default:
            return
    }
}

function mm(e) {
    y(new g(`auth`, (t, {
        options: n
    }) => {
        let r = t.getProvider(`app`).getImmediate(),
            i = t.getProvider(`heartbeat`),
            a = t.getProvider(`app-check-internal`),
            {
                apiKey: o,
                authDomain: s
            } = r.options;
        Y(o && !o.includes(`:`), `invalid-api-key`, {
            appName: r.name
        });
        let c = new td(r, i, a, {
            apiKey: o,
            authDomain: s,
            clientPlatform: e,
            apiHost: `identitytoolkit.googleapis.com`,
            tokenApiHost: `securetoken.googleapis.com`,
            apiScheme: `https`,
            sdkClientVersion: Xu(e)
        });
        return yd(c, n), c
    }, `PUBLIC`).setInstantiationMode(`EXPLICIT`).setInstanceCreatedCallback((e, t, n) => {
        e.getProvider(`auth-internal`).initialize()
    })), y(new g(`auth-internal`, e => (e => new fm(e))(nd(e.getProvider(`auth`).getImmediate())), `PRIVATE`).setInstantiationMode(`EXPLICIT`)), re(um, dm, pm(e)), re(um, dm, `esm2020`)
}
var hm = t(`authIdTokenMaxAge`) || 300,
    gm = null,
    _m = e => async t => {
        let n = t && await t.getIdTokenResult(),
            r = n && (new Date().getTime() - Date.parse(n.issuedAtTime)) / 1e3;
        if (r && r > hm) return;
        let i = n?.token;
        gm !== i && (gm = i, await fetch(e, {
            method: i ? `POST` : `DELETE`,
            headers: i ? {
                Authorization: `Bearer ${i}`
            } : {}
        }))
    };

function vm(e = m()) {
    let n = ee(e, `auth`);
    if (n.isInitialized()) return n.getImmediate();
    let r = vd(e, {
            popupRedirectResolver: nm,
            persistence: [Xf, yf, Tf]
        }),
        i = t(`authTokenSyncURL`);
    if (i && typeof isSecureContext == `boolean` && isSecureContext) {
        let e = new URL(i, location.origin);
        if (location.origin === e.origin) {
            let t = _m(e.toString());
            sf(r, t, () => t(r.currentUser)), of(r, e => t(e))
        }
    }
    let a = oe(`auth`);
    return a && Q(r, `http://${a}`), r
}

function ym() {
    return document.getElementsByTagName(`head`)?.[0] ?? document
}
ad({
    loadJS(e) {
        return new Promise((t, n) => {
            let r = document.createElement(`script`);
            r.setAttribute(`src`, e), r.onload = t, r.onerror = e => {
                let t = J(`internal-error`);
                t.customData = e, n(t)
            }, r.type = `text/javascript`, r.charset = `UTF-8`, ym().appendChild(r)
        })
    },
    gapiScript: `https://apis.google.com/js/api.js`,
    recaptchaV2Script: `https://www.google.com/recaptcha/api.js`,
    recaptchaEnterpriseScript: `https://www.google.com/recaptcha/enterprise.js?render=`
}), mm(`Browser`);
var bm = `modulepreload`,
    xm = function(e) {
        return `/` + e
    },
    Sm = {},
    Cm = function(e, t, n) {
        let r = Promise.resolve();
        if (t && t.length > 0) {
            let e = document.getElementsByTagName(`link`),
                i = document.querySelector(`meta[property=csp-nonce]`),
                a = i?.nonce || i?.getAttribute(`nonce`);

            function o(e) {
                return Promise.all(e.map(e => Promise.resolve(e).then(e => ({
                    status: `fulfilled`,
                    value: e
                }), e => ({
                    status: `rejected`,
                    reason: e
                }))))
            }
            r = o(t.map(t => {
                if (t = xm(t, n), t in Sm) return;
                Sm[t] = !0;
                let r = t.endsWith(`.css`),
                    i = r ? `[rel="stylesheet"]` : ``;
                if (n)
                    for (let n = e.length - 1; n >= 0; n--) {
                        let i = e[n];
                        if (i.href === t && (!r || i.rel === `stylesheet`)) return
                    } else if (document.querySelector(`link[href="${t}"]${i}`)) return;
                let o = document.createElement(`link`);
                if (o.rel = r ? `stylesheet` : bm, r || (o.as = `script`), o.crossOrigin = ``, o.href = t, a && o.setAttribute(`nonce`, a), document.head.appendChild(o), r) return new Promise((e, n) => {
                    o.addEventListener(`load`, e), o.addEventListener(`error`, () => n(Error(`Unable to preload CSS for ${t}`)))
                })
            }))
        }

        function i(e) {
            let t = new Event(`vite:preloadError`, {
                cancelable: !0
            });
            if (t.payload = e, window.dispatchEvent(t), !t.defaultPrevented) throw e
        }
        return r.then(t => {
            for (let e of t || []) e.status === `rejected` && i(e.reason);
            return e().catch(i)
        })
    },
    wm = te({
        apiKey: `AIzaSyA2dj2DIIOjCaIl0x-IQcZ5dhfZ170QgBY`,
        authDomain: `lebylami.firebaseapp.com`,
        projectId: `lebylami`,
        storageBucket: `lebylami.firebasestorage.app`,
        messagingSenderId: `123590957629`,
        appId: `1:123590957629:web:be9e70bbe926357ffea854`,
        measurementId: `G-QGEQQJKD7E`
    });
try {
    let {
        getAnalytics: e
    } = await Cm(async () => {
        let {
            getAnalytics: e
        } = await import(`./index.esm-DmHAKC5Y.js`);
        return {
            getAnalytics: e
        }
    }, __vite__mapDeps([0, 1]));
    e(wm)
} catch (e) {
    console.warn(`Analytics unavailable:`, e.message)
}
var Tm = Hc(wm),
    Em = vm(wm),
    Dm = T((e => {
        var t = Symbol.for(`react.transitional.element`),
            n = Symbol.for(`react.fragment`);

        function r(e, n, r) {
            var i = null;
            if (r !== void 0 && (i = `` + r), n.key !== void 0 && (i = `` + n.key), `key` in n)
                for (var a in r = {}, n) a !== `key` && (r[a] = n[a]);
            else r = n;
            return n = r.ref, {
                $$typeof: t,
                type: e,
                key: i,
                ref: n === void 0 ? null : n,
                props: r
            }
        }
        e.Fragment = n, e.jsx = r, e.jsxs = r
    })),
    $ = T(((e, t) => {
        t.exports = Dm()
    }))();

function Qm(e) {
    if (typeof e !== `number` || isNaN(e)) return `0.00`;
    return e.toLocaleString(`en-US`, {minimumFractionDigits: 2, maximumFractionDigits: 2})
}

function Om(e) {
    return typeof e == `string` ? e.replace(/<[^>]*>/g, ``).replace(/[\\<>"'`;()]/g, ``).trim() : e
}

function km(e) {
    if (typeof e != `string`) return ``;
    if (e.startsWith(`data:image/`)) return e;
    if (e.startsWith(`/`)) return e.trim();
    try {
        let t = new URL(e);
        return [`https:`, `http:`].includes(t.protocol) ? e.trim() : ``
    } catch {
        return ``
    }
}

function Am(e) {
    return {
        ...e,
        name: Om(e.name),
        subtitle: Om(e.subtitle),
        description: Om(e.description),
        image: km(e.image),
        price: Math.max(0, Number(e.price) || 0),
        oldPrice: e.oldPrice ? Math.max(0, Number(e.oldPrice) || 0) : null
    }
}
var jm = [{
        id: `cat_1`,
        name: `Vibrators`,
        icon: `✦`
    }, {
        id: `cat_2`,
        name: `For Her`,
        icon: `◈`
    }, {
        id: `cat_3`,
        name: `For Him`,
        icon: `◆`
    }, {
        id: `cat_4`,
        name: `Couple Toys`,
        icon: `❖`
    }, {
        id: `cat_5`,
        name: `Massagers`,
        icon: `◎`
    }, {
        id: `cat_6`,
        name: `Accessories`,
        icon: `⬥`
    }],
    Mm = [{
        id: `prod_1`,
        name: `Rose Romeo™`,
        subtitle: `Double-Action Tongue Stimulator`,
        price: 89.99,
        oldPrice: 129.99,
        badge: `BESTSELLER`,
        category: `cat_1`,
        image: `/images/product_rose_romeo_1773603299502.png`,
        color: `#E8503A`,
        colors: [{
            name: `Rose Pink`,
            hex: `#C4788A`
        }, {
            name: `Deep Purple`,
            hex: `#8A3678`
        }, {
            name: `Midnight Black`,
            hex: `#1a1a1a`
        }],
        description: `Ergonomically curved for G-spot and clitoral stimulation.`,
        inStock: !0
    }, {
        id: `prod_2`,
        name: `Silk Touch Wand`,
        subtitle: `Premium Massage Wand`,
        price: 64.99,
        oldPrice: 94.99,
        badge: `NEW`,
        category: `cat_5`,
        image: `/images/product_silk_wand_1773603321337.png`,
        color: `#8A78C4`,
        colors: [{
            name: `Lavender`,
            hex: `#8A78C4`
        }, {
            name: `Blush`,
            hex: `#C4788A`
        }, {
            name: `White`,
            hex: `#e8e0d8`
        }],
        description: `Whisper-quiet motor with 10 intensity levels.`,
        inStock: !0
    }, {
        id: `prod_3`,
        name: `Luna Suction Pro`,
        subtitle: `Air Pulse Stimulator`,
        price: 74.99,
        oldPrice: null,
        badge: null,
        category: `cat_2`,
        image: `/images/product_luna_suction_1773603336669.png`,
        color: `#78C4A0`,
        colors: [{
            name: `Mint`,
            hex: `#78C4A0`
        }, {
            name: `Rose`,
            hex: `#C4788A`
        }],
        description: `11 suction modes for intense clitoral pleasure.`,
        inStock: !0
    }, {
        id: `prod_4`,
        name: `Duo Thrust`,
        subtitle: `Couples Rabbit Vibrator`,
        price: 109.99,
        oldPrice: 149.99,
        badge: `HOT`,
        category: `cat_4`,
        image: `/images/product_duo_thrust_1773603362334.png`,
        color: `#C4A078`,
        colors: [{
            name: `Gold`,
            hex: `#C4A078`
        }, {
            name: `Rose`,
            hex: `#C4788A`
        }, {
            name: `Black`,
            hex: `#1a1a1a`
        }],
        description: `Thrusting + vibration for shared pleasure.`,
        inStock: !0
    }, {
        id: `prod_5`,
        name: `Velvet Ring`,
        subtitle: `Vibrating Pleasure Ring`,
        price: 39.99,
        oldPrice: null,
        badge: null,
        category: `cat_3`,
        image: `/images/product_velvet_ring_1773603376683.png`,
        color: `#7896C4`,
        colors: [{
            name: `Ocean Blue`,
            hex: `#7896C4`
        }, {
            name: `Black`,
            hex: `#1a1a1a`
        }],
        description: `Stretchy silicone ring with rumbling vibrations.`,
        inStock: !0
    }, {
        id: `prod_6`,
        name: `Midnight Bullet`,
        subtitle: `Discreet Mini Vibrator`,
        price: 29.99,
        oldPrice: 44.99,
        badge: `SALE`,
        category: `cat_2`,
        image: `/images/product_midnight_bullet_1773603390162.png`,
        color: `#C478B8`,
        colors: [{
            name: `Orchid`,
            hex: `#C478B8`
        }, {
            name: `Rose`,
            hex: `#C4788A`
        }, {
            name: `Black`,
            hex: `#1a1a1a`
        }],
        description: `Travel-friendly with USB magnetic charging.`,
        inStock: !0
    }],
    Nm = [`/images/hero_background_1773603416692.png`, `/images/featured_lifestyle_1773603430232.png`],
    Pm = [{
        text: `Completely changed my understanding of pleasure. The quality is unmatched.`,
        author: `Sarah K.`,
        rating: 5
    }, {
        text: `Discreet packaging, beautiful design, incredible performance. 10/10.`,
        author: `Michelle R.`,
        rating: 5
    }, {
        text: `Worth every penny. My partner and I have never been happier.`,
        author: `Jade T.`,
        rating: 5
    }];
async function Fm() {
    try {
        let e = await jl(Lc(Tm, `store`, `categories`)),
            t = e.exists() ? e.data().items : null,
            n = await Ml(Ic(Tm, `store`, `data`, `products`)),
            r = null;
        if (n.empty || (r = n.docs.map(e => e.data())), !r) {
            let e = await jl(Lc(Tm, `store`, `data`));
            if (e.exists()) {
                let n = e.data();
                if (n.products && (r = n.products), !t && n.categories) return n
            }
        }
        if (r || t) return {
            products: r,
            categories: t
        }
    } catch (e) {
        console.error(`Load from Firestore failed:`, e)
    }
    return null
}
async function Im(e) {
    try {
        await Nl(Lc(Tm, `store`, `categories`), {
            items: e.categories
        });
        let t = Il(Tm),
            n = Ic(Tm, `store`, `data`, `products`);
        (await Ml(n)).docs.forEach(e => t.delete(e.ref));
        for (let r of e.products) t.set(Lc(n, r.id), r);
        await t.commit();
        let r = {
            products: e.products.map(e => ({
                ...e,
                image: e.image?.startsWith(`data:`) ? `` : e.image
            })),
            categories: e.categories
        };
        try {
            await Nl(Lc(Tm, `store`, `data`), r)
        } catch {}
        return !0
    } catch (e) {
        throw console.error(`Save to Firestore failed:`, e), e
    }
}

function Lm(e = .15) {
    let t = (0, D.useRef)(null),
        [n, r] = (0, D.useState)(!1);
    return (0, D.useEffect)(() => {
        let n = t.current;
        if (!n) return;
        let i = new IntersectionObserver(([e]) => {
            e.isIntersecting && (r(!0), i.disconnect())
        }, {
            threshold: e
        });
        return i.observe(n), () => i.disconnect()
    }, [e]), [t, n]
}

function Rm({
    children: e,
    delay: t = 0,
    className: n = ``
}) {
    let [r, i] = Lm();
    return (0, $.jsx)(`div`, {
        ref: r,
        className: n,
        style: {
            opacity: i ? 1 : 0,
            transform: i ? `translateY(0)` : `translateY(40px)`,
            transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${t}s`
        },
        children: e
    })
}

function zm({
    size: e = `default`
}) {
    let t = {
            small: .55,
            default: 1,
            large: 1.4
        } [e] || 1;
    return (0, $.jsxs)(`div`, {
        style: {
            display: `inline-flex`,
            flexDirection: `column`,
            alignItems: `center`,
            lineHeight: 1
        },
        children: [(0, $.jsx)(`span`, {
            style: {
                fontFamily: `'Cormorant Garamond',Georgia,serif`,
                fontSize: 28 * t,
                fontWeight: 600,
                letterSpacing: 8 * t,
                textTransform: `uppercase`,
                color: `#fff`
            },
            children: `Luxury Essentials`
        }), (0, $.jsx)(`span`, {
            style: {
                fontFamily: `'Cormorant Garamond',Georgia,serif`,
                fontSize: 16 * t,
                fontWeight: 400,
                fontStyle: `italic`,
                letterSpacing: 4 * t,
                color: `#E8503A`,
                marginTop: 2 * t
            },
            children: `by Lami`
        }), (0, $.jsx)(`span`, {
            style: {
                fontFamily: `'Inter','DM Sans',sans-serif`,
                fontSize: 8 * t,
                fontWeight: 400,
                letterSpacing: 6 * t,
                textTransform: `uppercase`,
                color: `#666`,
                marginTop: 4 * t
            },
            children: `NIGERIA`
        })]
    })
}

function Bm({
    products: e,
    categories: t,
    onSave: n,
    onBack: r,
    onLogout: i
}) {
    let [a, o] = (0, D.useState)(e), [s, c] = (0, D.useState)(t), [l, u] = (0, D.useState)(null), [d, f] = (0, D.useState)(`products`), [p, m] = (0, D.useState)(!1), [h, g] = (0, D.useState)(!1), [_, v] = (0, D.useState)({
        name: ``,
        icon: `✦`
    }), [y, b] = (0, D.useState)(`upload`), [x, ee] = (0, D.useState)(!1), [te, S] = (0, D.useState)(null), ne = (0, D.useRef)(null), re = [`✦`, `◈`, `◆`, `❖`, `◎`, `⬥`, `◇`, `★`, `♦`, `●`], C = {
        id: ``,
        name: ``,
        subtitle: ``,
        price: 0,
        oldPrice: null,
        badge: ``,
        category: s[0]?.id || ``,
        image: ``,
        color: `#E8503A`,
        colors: [],
        description: ``,
        inStock: !0
    }, [ie, ae] = (0, D.useState)(``), [w, oe] = (0, D.useState)(`#C4788A`), se = (0, D.useCallback)(e => {
        if (!e || !e.type.startsWith(`image/`)) {
            alert(`Please select a valid image file (JPG, PNG, WebP, etc.)`);
            return
        }
        if (e.size > 2097152) {
            alert(`Image is too large. Maximum size is 2MB. Please compress or resize your image.`);
            return
        }
        S(`reading`);
        let t = new FileReader;
        t.onload = e => {
            u(t => ({
                ...t,
                image: e.target.result
            })), S(`done`), setTimeout(() => S(null), 1500)
        }, t.onerror = () => {
            alert(`Failed to read image file. Please try again.`), S(null)
        }, t.readAsDataURL(e)
    }, []), T = (0, D.useCallback)(e => {
        e.preventDefault(), ee(!1);
        let t = e.dataTransfer?.files?.[0];
        t && se(t)
    }, [se]), E = (0, D.useCallback)(e => {
        e.preventDefault(), ee(!0)
    }, []), ce = (0, D.useCallback)(() => ee(!1), []), le = async () => {
        m(!0), await n({
            products: a,
            categories: s
        }), m(!1), g(!0), setTimeout(() => g(!1), 2500)
    }, ue = e => o(a.filter(t => t.id !== e)), de = e => o(a.map(t => t.id === e ? {
        ...t,
        inStock: !t.inStock
    } : t)), fe = e => {
        let t = Am(e);
        t.id ||= `prod_` + Date.now(), a.find(e => e.id === t.id) ? o(a.map(e => e.id === t.id ? t : e)) : o([...a, t]), u(null)
    }, pe = e => c(s.filter(t => t.id !== e));
    return (0, $.jsxs)(`div`, {
        style: {
            fontFamily: `'Outfit',sans-serif`,
            background: `#0a0a0a`,
            color: `#e8e0d8`,
            minHeight: `100vh`
        },
        children: [(0, $.jsx)(`style`, {
            children: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Outfit:wght@200;300;400;500;600&display=swap');
        .adm-btn { background:#C4788A; color:#0a0a0a; border:none; padding:10px 24px; font-family:'Outfit',sans-serif; font-size:12px; letter-spacing:2px; text-transform:uppercase; cursor:pointer; font-weight:500; transition:all .3s; }
        .adm-btn:hover { background:#d4889a; }
        .adm-btn:disabled { opacity:.5; cursor:default; }
        .adm-btn-outline { background:none; border:1px solid #333; color:#999; padding:10px 24px; font-family:'Outfit',sans-serif; font-size:12px; letter-spacing:2px; text-transform:uppercase; cursor:pointer; transition:all .3s; }
        .adm-btn-outline:hover { border-color:#C4788A; color:#C4788A; }
        .adm-btn-sm { padding:6px 14px; font-size:11px; }
        .adm-btn-danger { background:#4a2020; color:#ff8888; border:1px solid #4a2020; }
        .adm-btn-danger:hover { background:#5a2828; }
        .adm-btn-danger:disabled { opacity:.4; cursor:default; }
        .adm-input { background:#111; border:1px solid #222; color:#e8e0d8; padding:10px 14px; font-family:'Outfit',sans-serif; font-size:13px; width:100%; outline:none; transition:border-color .3s; }
        .adm-input:focus { border-color:#C4788A; }
        .adm-input::placeholder { color:#444; }
        .adm-label { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#666; margin-bottom:6px; display:block; }
        .adm-card { background:#111; border:1px solid #1a1a1a; padding:20px; transition:all .3s; }
        .adm-card:hover { border-color:#2a2a2a; }
        .adm-tab { padding:10px 24px; background:none; border:none; color:#555; font-family:'Outfit',sans-serif; font-size:12px; letter-spacing:2px; text-transform:uppercase; cursor:pointer; border-bottom:2px solid transparent; transition:all .3s; }
        .adm-tab.active { color:#C4788A; border-bottom-color:#C4788A; }
        .adm-select { background:#111; border:1px solid #222; color:#e8e0d8; padding:10px 14px; font-family:'Outfit',sans-serif; font-size:13px; width:100%; outline:none; }
        .adm-toggle { width:44px; height:24px; border-radius:12px; border:none; cursor:pointer; position:relative; transition:background .3s; }
        .adm-toggle::after { content:''; position:absolute; width:18px; height:18px; border-radius:50%; background:#fff; top:3px; transition:left .3s; }
        .adm-toggle.on { background:#C4788A; } .adm-toggle.on::after { left:23px; }
        .adm-toggle.off { background:#333; } .adm-toggle.off::after { left:3px; }
        .adm-saved { background:#1a3a1a; color:#88ff88; padding:8px 20px; font-size:12px; letter-spacing:2px; text-transform:uppercase; border-radius:4px; animation:fadeIn .3s; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
        .adm-dropzone { border:2px dashed #333; background:#0d0d0d; padding:40px 24px; text-align:center; cursor:pointer; transition:all .3s; position:relative; }
        .adm-dropzone:hover { border-color:#555; background:#111; }
        .adm-dropzone.drag-over { border-color:#C4788A; background:#C4788A0a; }
        .adm-dropzone-icon { font-size:32px; color:#444; margin-bottom:12px; }
        .adm-dropzone-text { font-size:13px; color:#666; margin-bottom:4px; }
        .adm-dropzone-hint { font-size:11px; color:#444; }
        .adm-dropzone-progress { font-size:11px; color:#C4788A; letter-spacing:2px; text-transform:uppercase; margin-top:8px; }
        .adm-mode-toggle { display:flex; gap:0; margin-bottom:12px; }
        .adm-mode-btn { flex:1; padding:8px 16px; background:#111; border:1px solid #222; color:#555; font-family:'Outfit',sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; cursor:pointer; transition:all .3s; }
        .adm-mode-btn:first-child { border-right:none; }
        .adm-mode-btn.active { background:#C4788A15; border-color:#C4788A; color:#C4788A; }
        .adm-img-preview { position:relative; display:inline-block; margin-top:12px; }
        .adm-img-remove { position:absolute; top:-8px; right:-8px; width:24px; height:24px; border-radius:50%; background:#C4788A; color:#0a0a0a; border:none; font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .3s; font-weight:700; }
        .adm-img-remove:hover { background:#ff4444; color:#fff; }
      `
        }), (0, $.jsxs)(`div`, {
            style: {
                padding: `20px 32px`,
                borderBottom: `1px solid #151515`,
                display: `flex`,
                justifyContent: `space-between`,
                alignItems: `center`,
                flexWrap: `wrap`,
                gap: 12
            },
            children: [(0, $.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    alignItems: `center`,
                    gap: 20
                },
                children: [(0, $.jsx)(zm, {
                    size: `small`
                }), (0, $.jsx)(`span`, {
                    style: {
                        color: `#555`,
                        fontSize: 11,
                        letterSpacing: 3,
                        textTransform: `uppercase`,
                        borderLeft: `1px solid #222`,
                        paddingLeft: 20
                    },
                    children: `Admin Panel`
                })]
            }), (0, $.jsxs)(`div`, {
                style: {
                    display: `flex`,
                    gap: 12,
                    alignItems: `center`
                },
                children: [h && (0, $.jsx)(`span`, {
                    className: `adm-saved`,
                    children: `✓ Published`
                }), (0, $.jsx)(`button`, {
                    className: `adm-btn`,
                    onClick: le,
                    disabled: p,
                    children: p ? `Saving...` : `Publish Changes`
                }), (0, $.jsx)(`button`, {
                    className: `adm-btn-outline`,
                    onClick: r,
                    children: `← Store`
                }), i && (0, $.jsx)(`button`, {
                    className: `adm-btn-outline`,
                    onClick: i,
                    style: {
                        color: `#ff6666`,
                        borderColor: `#4a2020`
                    },
                    children: `Sign Out`
                })]
            })]
        }), (0, $.jsxs)(`div`, {
            style: {
                padding: `0 32px`,
                borderBottom: `1px solid #151515`,
                display: `flex`,
                gap: 4
            },
            children: [(0, $.jsxs)(`button`, {
                className: `adm-tab ${d===`products`?`active`:``}`,
                onClick: () => f(`products`),
                children: [`Products (`, a.length, `)`]
            }), (0, $.jsxs)(`button`, {
                className: `adm-tab ${d===`categories`?`active`:``}`,
                onClick: () => f(`categories`),
                children: [`Categories (`, s.length, `)`]
            })]
        }), (0, $.jsxs)(`div`, {
            style: {
                padding: 32,
                maxWidth: 1100,
                margin: `0 auto`
            },
            children: [d === `products` && !l && (0, $.jsxs)(`div`, {
                children: [(0, $.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        justifyContent: `space-between`,
                        alignItems: `center`,
                        marginBottom: 24
                    },
                    children: [(0, $.jsx)(`h2`, {
                        style: {
                            fontFamily: `'Cormorant Garamond',serif`,
                            fontSize: 28,
                            fontWeight: 300
                        },
                        children: `Product Inventory`
                    }), (0, $.jsx)(`button`, {
                        className: `adm-btn`,
                        onClick: () => u({
                            ...C
                        }),
                        children: `+ Add Product`
                    })]
                }), (0, $.jsxs)(`div`, {
                    style: {
                        display: `grid`,
                        gap: 12
                    },
                    children: [a.map(e => (0, $.jsxs)(`div`, {
                        className: `adm-card`,
                        style: {
                            display: `grid`,
                            gridTemplateColumns: `60px 1fr auto`,
                            gap: 20,
                            alignItems: `center`
                        },
                        children: [(0, $.jsx)(`div`, {
                            style: {
                                width: 60,
                                height: 60,
                                borderRadius: 4,
                                overflow: `hidden`,
                                background: e.color + `22`,
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `center`
                            },
                            children: e.image ? (0, $.jsx)(`img`, {
                                src: e.image,
                                alt: ``,
                                style: {
                                    width: `100%`,
                                    height: `100%`,
                                    objectFit: `cover`
                                },
                                onError: e => {
                                    e.target.style.display = `none`
                                }
                            }) : (0, $.jsx)(`span`, {
                                style: {
                                    color: e.color,
                                    fontSize: 20
                                },
                                children: `✦`
                            })
                        }), (0, $.jsxs)(`div`, {
                            children: [(0, $.jsxs)(`div`, {
                                style: {
                                    fontSize: 15,
                                    fontWeight: 500,
                                    marginBottom: 2
                                },
                                children: [e.name, e.badge && (0, $.jsx)(`span`, {
                                    style: {
                                        marginLeft: 8,
                                        fontSize: 10,
                                        background: `#C4788A`,
                                        color: `#0a0a0a`,
                                        padding: `2px 8px`,
                                        fontWeight: 500,
                                        letterSpacing: 1
                                    },
                                    children: e.badge
                                }), !e.inStock && (0, $.jsx)(`span`, {
                                    style: {
                                        marginLeft: 8,
                                        fontSize: 10,
                                        background: `#4a2020`,
                                        color: `#ff8888`,
                                        padding: `2px 8px`
                                    },
                                    children: `OUT OF STOCK`
                                })]
                            }), (0, $.jsxs)(`div`, {
                                style: {
                                    fontSize: 12,
                                    color: `#666`
                                },
                                children: [e.subtitle, ` · ₦`, Qm(e.price), e.oldPrice ? ` (was ₦${Qm(e.oldPrice)})` : ``]
                            }), (0, $.jsxs)(`div`, {
                                style: {
                                    fontSize: 11,
                                    color: `#444`,
                                    marginTop: 2
                                },
                                children: [s.find(t => t.id === e.category)?.name || `Uncategorized`, e.colors?.length > 0 && (0, $.jsxs)(`span`, {
                                    style: {
                                        marginLeft: 8
                                    },
                                    children: [e.colors.length, ` color`, e.colors.length === 1 ? `` : `s`]
                                })]
                            })]
                        }), (0, $.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                gap: 8,
                                alignItems: `center`
                            },
                            children: [(0, $.jsx)(`button`, {
                                className: `adm-toggle ${e.inStock?`on`:`off`}`,
                                onClick: () => de(e.id),
                                title: e.inStock ? `In Stock` : `Out of Stock`
                            }), (0, $.jsx)(`button`, {
                                className: `adm-btn-outline adm-btn-sm`,
                                onClick: () => u({
                                    ...e
                                }),
                                children: `Edit`
                            }), (0, $.jsx)(`button`, {
                                className: `adm-btn-outline adm-btn-sm adm-btn-danger`,
                                onClick: () => ue(e.id),
                                children: `Delete`
                            })]
                        })]
                    }, e.id)), a.length === 0 && (0, $.jsx)(`div`, {
                        style: {
                            textAlign: `center`,
                            padding: 60,
                            color: `#444`
                        },
                        children: `No products yet. Click "+ Add Product" to get started.`
                    })]
                })]
            }), d === `products` && l && (0, $.jsxs)(`div`, {
                children: [(0, $.jsx)(`button`, {
                    className: `adm-btn-outline adm-btn-sm`,
                    onClick: () => u(null),
                    style: {
                        marginBottom: 24
                    },
                    children: `← Back to List`
                }), (0, $.jsx)(`h2`, {
                    style: {
                        fontFamily: `'Cormorant Garamond',serif`,
                        fontSize: 28,
                        fontWeight: 300,
                        marginBottom: 32
                    },
                    children: l.id && a.find(e => e.id === l.id) ? `Edit Product` : `New Product`
                }), (0, $.jsxs)(`div`, {
                    style: {
                        display: `grid`,
                        gridTemplateColumns: `1fr 1fr`,
                        gap: 20
                    },
                    children: [(0, $.jsxs)(`div`, {
                        children: [(0, $.jsx)(`label`, {
                            className: `adm-label`,
                            children: `Product Name *`
                        }), (0, $.jsx)(`input`, {
                            className: `adm-input`,
                            value: l.name,
                            onChange: e => u({
                                ...l,
                                name: e.target.value
                            }),
                            placeholder: `e.g. Rose Romeo™`
                        })]
                    }), (0, $.jsxs)(`div`, {
                        children: [(0, $.jsx)(`label`, {
                            className: `adm-label`,
                            children: `Subtitle`
                        }), (0, $.jsx)(`input`, {
                            className: `adm-input`,
                            value: l.subtitle,
                            onChange: e => u({
                                ...l,
                                subtitle: e.target.value
                            }),
                            placeholder: `Short description`
                        })]
                    }), (0, $.jsxs)(`div`, {
                        children: [(0, $.jsx)(`label`, {
                            className: `adm-label`,
                            children: `Price (₦) *`
                        }), (0, $.jsx)(`input`, {
                            className: `adm-input`,
                            type: `number`,
                            step: `0.01`,
                            value: l.price,
                            onChange: e => u({
                                ...l,
                                price: parseFloat(e.target.value) || 0
                            })
                        })]
                    }), (0, $.jsxs)(`div`, {
                        children: [(0, $.jsx)(`label`, {
                            className: `adm-label`,
                            children: `Original Price (₦)`
                        }), (0, $.jsx)(`input`, {
                            className: `adm-input`,
                            type: `number`,
                            step: `0.01`,
                            value: l.oldPrice || ``,
                            onChange: e => u({
                                ...l,
                                oldPrice: parseFloat(e.target.value) || null
                            }),
                            placeholder: `Leave empty if no sale`
                        })]
                    }), (0, $.jsxs)(`div`, {
                        children: [(0, $.jsx)(`label`, {
                            className: `adm-label`,
                            children: `Category`
                        }), (0, $.jsx)(`select`, {
                            className: `adm-select`,
                            value: l.category,
                            onChange: e => u({
                                ...l,
                                category: e.target.value
                            }),
                            children: s.map(e => (0, $.jsx)(`option`, {
                                value: e.id,
                                children: e.name
                            }, e.id))
                        })]
                    }), (0, $.jsxs)(`div`, {
                        children: [(0, $.jsx)(`label`, {
                            className: `adm-label`,
                            children: `Badge`
                        }), (0, $.jsxs)(`select`, {
                            className: `adm-select`,
                            value: l.badge || ``,
                            onChange: e => u({
                                ...l,
                                badge: e.target.value || null
                            }),
                            children: [(0, $.jsx)(`option`, {
                                value: ``,
                                children: `None`
                            }), (0, $.jsx)(`option`, {
                                value: `NEW`,
                                children: `NEW`
                            }), (0, $.jsx)(`option`, {
                                value: `HOT`,
                                children: `HOT`
                            }), (0, $.jsx)(`option`, {
                                value: `SALE`,
                                children: `SALE`
                            }), (0, $.jsx)(`option`, {
                                value: `BESTSELLER`,
                                children: `BESTSELLER`
                            }), (0, $.jsx)(`option`, {
                                value: `LIMITED`,
                                children: `LIMITED`
                            })]
                        })]
                    }), (0, $.jsxs)(`div`, {
                        style: {
                            gridColumn: `1/-1`
                        },
                        children: [(0, $.jsx)(`label`, {
                            className: `adm-label`,
                            children: `Product Image *`
                        }), (0, $.jsxs)(`div`, {
                            className: `adm-mode-toggle`,
                            children: [(0, $.jsx)(`button`, {
                                className: `adm-mode-btn ${y===`upload`?`active`:``}`,
                                onClick: () => b(`upload`),
                                children: `⬆ Upload Image`
                            }), (0, $.jsx)(`button`, {
                                className: `adm-mode-btn ${y===`url`?`active`:``}`,
                                onClick: () => b(`url`),
                                children: `🔗 Paste URL`
                            })]
                        }), y === `upload` ? (0, $.jsxs)(`div`, {
                            children: [(0, $.jsxs)(`div`, {
                                className: `adm-dropzone${x?` drag-over`:``}`,
                                onClick: () => ne.current?.click(),
                                onDrop: T,
                                onDragOver: E,
                                onDragLeave: ce,
                                children: [(0, $.jsx)(`div`, {
                                    className: `adm-dropzone-icon`,
                                    children: `📸`
                                }), (0, $.jsx)(`div`, {
                                    className: `adm-dropzone-text`,
                                    children: `Click to browse or drag & drop an image`
                                }), (0, $.jsx)(`div`, {
                                    className: `adm-dropzone-hint`,
                                    children: `JPG, PNG, WebP — Max 2MB`
                                }), te === `reading` && (0, $.jsx)(`div`, {
                                    className: `adm-dropzone-progress`,
                                    children: `Processing...`
                                }), te === `done` && (0, $.jsx)(`div`, {
                                    className: `adm-dropzone-progress`,
                                    style: {
                                        color: `#88ff88`
                                    },
                                    children: `✓ Image loaded`
                                })]
                            }), (0, $.jsx)(`input`, {
                                ref: ne,
                                type: `file`,
                                accept: `image/*`,
                                style: {
                                    display: `none`
                                },
                                onChange: e => {
                                    let t = e.target.files?.[0];
                                    t && se(t), e.target.value = ``
                                }
                            })]
                        }) : (0, $.jsx)(`input`, {
                            className: `adm-input`,
                            value: l.image?.startsWith(`data:`) ? `` : l.image || ``,
                            onChange: e => u({
                                ...l,
                                image: e.target.value
                            }),
                            placeholder: `https://example.com/image.jpg`
                        }), l.image && (0, $.jsxs)(`div`, {
                            className: `adm-img-preview`,
                            children: [(0, $.jsx)(`img`, {
                                src: l.image,
                                alt: `preview`,
                                style: {
                                    width: 100,
                                    height: 100,
                                    objectFit: `cover`,
                                    borderRadius: 4,
                                    border: `1px solid #222`
                                },
                                onError: e => e.target.style.display = `none`
                            }), (0, $.jsx)(`button`, {
                                className: `adm-img-remove`,
                                title: `Remove image`,
                                onClick: () => u({
                                    ...l,
                                    image: ``
                                }),
                                children: `×`
                            })]
                        })]
                    }), (0, $.jsxs)(`div`, {
                        style: {
                            gridColumn: `1/-1`
                        },
                        children: [(0, $.jsx)(`label`, {
                            className: `adm-label`,
                            children: `Available Colors`
                        }), (0, $.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                gap: 8,
                                flexWrap: `wrap`,
                                marginBottom: 12
                            },
                            children: [(l.colors || []).map((e, t) => (0, $.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 6,
                                    background: `#111`,
                                    border: `1px solid #222`,
                                    padding: `6px 12px`,
                                    borderRadius: 4
                                },
                                children: [(0, $.jsx)(`span`, {
                                    style: {
                                        width: 16,
                                        height: 16,
                                        borderRadius: `50%`,
                                        background: e.hex,
                                        border: `1px solid #333`,
                                        flexShrink: 0
                                    }
                                }), (0, $.jsx)(`span`, {
                                    style: {
                                        fontSize: 12,
                                        color: `#aaa`
                                    },
                                    children: e.name
                                }), (0, $.jsx)(`button`, {
                                    onClick: () => u({
                                        ...l,
                                        colors: l.colors.filter((e, n) => n !== t)
                                    }),
                                    style: {
                                        background: `none`,
                                        border: `none`,
                                        color: `#555`,
                                        cursor: `pointer`,
                                        fontSize: 14,
                                        padding: 0,
                                        lineHeight: 1
                                    },
                                    children: `×`
                                })]
                            }, t)), (!l.colors || l.colors.length === 0) && (0, $.jsx)(`span`, {
                                style: {
                                    fontSize: 12,
                                    color: `#444`
                                },
                                children: `No colors added yet`
                            })]
                        }), (0, $.jsxs)(`div`, {
                            style: {
                                display: `flex`,
                                gap: 8,
                                alignItems: `flex-end`,
                                flexWrap: `wrap`
                            },
                            children: [(0, $.jsxs)(`div`, {
                                style: {
                                    flex: 1,
                                    minWidth: 140
                                },
                                children: [(0, $.jsx)(`label`, {
                                    className: `adm-label`,
                                    style: {
                                        marginBottom: 4
                                    },
                                    children: `Color Name`
                                }), (0, $.jsx)(`input`, {
                                    className: `adm-input`,
                                    value: ie,
                                    onChange: e => ae(e.target.value),
                                    placeholder: `e.g. Rose Pink`
                                })]
                            }), (0, $.jsxs)(`div`, {
                                children: [(0, $.jsx)(`label`, {
                                    className: `adm-label`,
                                    style: {
                                        marginBottom: 4
                                    },
                                    children: `Color`
                                }), (0, $.jsxs)(`div`, {
                                    style: {
                                        display: `flex`,
                                        gap: 6,
                                        alignItems: `center`
                                    },
                                    children: [(0, $.jsx)(`input`, {
                                        type: `color`,
                                        value: w,
                                        onChange: e => oe(e.target.value),
                                        style: {
                                            width: 40,
                                            height: 36,
                                            background: `none`,
                                            border: `1px solid #222`,
                                            cursor: `pointer`
                                        }
                                    }), (0, $.jsx)(`input`, {
                                        className: `adm-input`,
                                        value: w,
                                        onChange: e => oe(e.target.value),
                                        style: {
                                            width: 90
                                        }
                                    })]
                                })]
                            }), (0, $.jsx)(`button`, {
                                className: `adm-btn adm-btn-sm`,
                                disabled: !ie.trim(),
                                onClick: () => {
                                    u({
                                        ...l,
                                        colors: [...l.colors || [], {
                                            name: ie.trim(),
                                            hex: w
                                        }],
                                        color: (l.colors || []).length === 0 ? w : l.color
                                    }), ae(``), oe(`#C4788A`)
                                },
                                children: `+ Add`
                            })]
                        })]
                    }), (0, $.jsx)(`div`, {
                        style: {
                            display: `flex`,
                            alignItems: `flex-end`,
                            gap: 12
                        },
                        children: (0, $.jsxs)(`div`, {
                            children: [(0, $.jsx)(`label`, {
                                className: `adm-label`,
                                children: `In Stock`
                            }), (0, $.jsx)(`button`, {
                                className: `adm-toggle ${l.inStock?`on`:`off`}`,
                                onClick: () => u({
                                    ...l,
                                    inStock: !l.inStock
                                })
                            })]
                        })
                    }), (0, $.jsxs)(`div`, {
                        style: {
                            gridColumn: `1/-1`
                        },
                        children: [(0, $.jsx)(`label`, {
                            className: `adm-label`,
                            children: `Description`
                        }), (0, $.jsx)(`textarea`, {
                            className: `adm-input`,
                            rows: 3,
                            value: l.description,
                            onChange: e => u({
                                ...l,
                                description: e.target.value
                            }),
                            placeholder: `Brief product description...`,
                            style: {
                                resize: `vertical`
                            }
                        })]
                    })]
                }), (0, $.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 12,
                        marginTop: 32
                    },
                    children: [(0, $.jsx)(`button`, {
                        className: `adm-btn`,
                        onClick: () => fe(l),
                        disabled: !l.name || !l.price,
                        children: `Save Product`
                    }), (0, $.jsx)(`button`, {
                        className: `adm-btn-outline`,
                        onClick: () => u(null),
                        children: `Cancel`
                    })]
                })]
            }), d === `categories` && (0, $.jsxs)(`div`, {
                children: [(0, $.jsx)(`h2`, {
                    style: {
                        fontFamily: `'Cormorant Garamond',serif`,
                        fontSize: 28,
                        fontWeight: 300,
                        marginBottom: 24
                    },
                    children: `Categories`
                }), (0, $.jsx)(`div`, {
                    style: {
                        display: `grid`,
                        gap: 12,
                        marginBottom: 32
                    },
                    children: s.map(e => {
                        let t = a.filter(t => t.category === e.id).length;
                        return (0, $.jsxs)(`div`, {
                            className: `adm-card`,
                            style: {
                                display: `flex`,
                                justifyContent: `space-between`,
                                alignItems: `center`
                            },
                            children: [(0, $.jsxs)(`div`, {
                                style: {
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 16
                                },
                                children: [(0, $.jsx)(`span`, {
                                    style: {
                                        fontSize: 20,
                                        color: `#E8503A`
                                    },
                                    children: e.icon
                                }), (0, $.jsx)(`span`, {
                                    style: {
                                        fontSize: 14,
                                        fontWeight: 400
                                    },
                                    children: e.name
                                }), (0, $.jsxs)(`span`, {
                                    style: {
                                        fontSize: 11,
                                        color: `#555`
                                    },
                                    children: [t, ` product`, t === 1 ? `` : `s`]
                                })]
                            }), (0, $.jsx)(`button`, {
                                className: `adm-btn-outline adm-btn-sm adm-btn-danger`,
                                onClick: () => pe(e.id),
                                disabled: t > 0,
                                title: t > 0 ? `Remove products first` : `Delete`,
                                children: t > 0 ? `Has products` : `Delete`
                            })]
                        }, e.id)
                    })
                }), (0, $.jsx)(`h3`, {
                    style: {
                        fontFamily: `'Cormorant Garamond',serif`,
                        fontSize: 20,
                        fontWeight: 300,
                        marginBottom: 16
                    },
                    children: `Add Category`
                }), (0, $.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 12,
                        alignItems: `flex-end`,
                        flexWrap: `wrap`
                    },
                    children: [(0, $.jsxs)(`div`, {
                        style: {
                            flex: 1,
                            minWidth: 200
                        },
                        children: [(0, $.jsx)(`label`, {
                            className: `adm-label`,
                            children: `Name`
                        }), (0, $.jsx)(`input`, {
                            className: `adm-input`,
                            value: _.name,
                            onChange: e => v({
                                ..._,
                                name: e.target.value
                            }),
                            placeholder: `Category name`
                        })]
                    }), (0, $.jsxs)(`div`, {
                        children: [(0, $.jsx)(`label`, {
                            className: `adm-label`,
                            children: `Icon`
                        }), (0, $.jsx)(`div`, {
                            style: {
                                display: `flex`,
                                gap: 4
                            },
                            children: re.map(e => (0, $.jsx)(`button`, {
                                onClick: () => v({
                                    ..._,
                                    icon: e
                                }),
                                style: {
                                    width: 36,
                                    height: 36,
                                    background: _.icon === e ? `#C4788A22` : `#111`,
                                    border: `1px solid ${_.icon===e?`#C4788A`:`#222`}`,
                                    color: `#E8503A`,
                                    fontSize: 16,
                                    cursor: `pointer`,
                                    display: `flex`,
                                    alignItems: `center`,
                                    justifyContent: `center`
                                },
                                children: e
                            }, e))
                        })]
                    }), (0, $.jsx)(`button`, {
                        className: `adm-btn`,
                        onClick: () => {
                            _.name.trim() && (c([...s, {
                                id: `cat_` + Date.now(),
                                name: _.name,
                                icon: _.icon
                            }]), v({
                                name: ``,
                                icon: `✦`
                            }))
                        },
                        disabled: !_.name.trim(),
                        children: `Add`
                    })]
                })]
            })]
        })]
    })
}


function Vm({
    title: e,
    onBack: t
}) {
    var pageContent = {
        "Our Story": [(0, $.jsxs)(`div`, {
            children: [(0, $.jsx)(`p`, {
                style: {marginBottom: 20},
                children: `Luxury Essentials by Lami was born from a simple belief: everyone deserves access to premium, body-safe intimate products without compromise on quality or discretion.`
            }), (0, $.jsx)(`p`, {
                style: {marginBottom: 20},
                children: `Founded by Lami, our brand is dedicated to breaking taboos and empowering individuals and couples to explore their desires with confidence. We meticulously curate every product in our collection, ensuring it meets the highest standards of safety, innovation, and design.`
            }), (0, $.jsx)(`p`, {
                style: {marginBottom: 20},
                children: `From our FDA-approved materials to our discreet packaging and dedicated customer support, every detail is crafted with your comfort and satisfaction in mind. We believe that intimacy is a vital part of wellbeing, and we are here to elevate that experience for you.`
            }), (0, $.jsx)(`p`, {
                children: `Welcome to Luxury Essentials by Lami — where pleasure meets purpose.`
            })]
        })],
        "Retail Stores": [(0, $.jsxs)(`div`, {
            children: [(0, $.jsx)(`p`, {
                style: {marginBottom: 20},
                children: `Visit our retail locations to explore our full collection in person. Our knowledgeable staff are available to help you find the perfect product.`
            }), (0, $.jsx)(`div`, {
                style: {marginBottom: 32, padding: `24px 32px`, border: `1px solid #222`, background: `#111`},
                children: (0, $.jsxs)(`div`, {
                    children: [(0, $.jsx)(`h3`, {
                        style: {fontFamily: `'Cormorant Garamond',serif`, fontSize: 24, fontWeight: 400, marginBottom: 12, color: `#E8503A`},
                        children: `Lagos Store`
                    }), (0, $.jsx)(`p`, {
                        style: {marginBottom: 8},
                        children: `Lagos, Nigeria`
                    }), (0, $.jsx)(`p`, {
                        style: {marginBottom: 8},
                        children: `Mon — Sat: 10am — 8pm`
                    }), (0, $.jsx)(`p`, {
                        children: `Phone: +234 706 040 8151`
                    })]
                })
            }), (0, $.jsx)(`p`, {
                children: `For wholesale enquiries and partnership opportunities, please contact us on WhatsApp.`
            })]
        })],
        "Contact Us": [(0, $.jsxs)(`div`, {
            children: [(0, $.jsx)(`p`, {
                style: {marginBottom: 20},
                children: `We would love to hear from you! Reach out to us through any of the channels below.`
            }), (0, $.jsxs)(`div`, {
                style: {marginBottom: 20},
                children: [(0, $.jsx)(`p`, {
                    style: {marginBottom: 8, color: `#E8503A`, fontFamily: `'Inter','DM Sans',sans-serif`, fontSize: 13, letterSpacing: 2, textTransform: `uppercase`},
                    children: `WhatsApp / Phone`
                }), (0, $.jsx)(`p`, {
                    children: `+234 706 040 8151`
                })]
            }), (0, $.jsxs)(`div`, {
                style: {marginBottom: 20},
                children: [(0, $.jsx)(`p`, {
                    style: {marginBottom: 8, color: `#E8503A`, fontFamily: `'Inter','DM Sans',sans-serif`, fontSize: 13, letterSpacing: 2, textTransform: `uppercase`},
                    children: `Instagram`
                }), (0, $.jsx)(`p`, {
                    children: `@lebylami`
                })]
            }), (0, $.jsxs)(`div`, {
                children: [(0, $.jsx)(`p`, {
                    style: {marginBottom: 8, color: `#E8503A`, fontFamily: `'Inter','DM Sans',sans-serif`, fontSize: 13, letterSpacing: 2, textTransform: `uppercase`},
                    children: `TikTok`
                }), (0, $.jsx)(`p`, {
                    children: `@lami_hammed`
                })]
            })]
        })],
        "Returns Policy": [(0, $.jsxs)(`div`, {
            children: [(0, $.jsx)(`p`, {
                style: {marginBottom: 20},
                children: `At Luxury Essentials by Lami, your satisfaction is our priority. We offer a hassle-free 48-hour return policy.`
            }), (0, $.jsx)(`h3`, {
                style: {fontFamily: `'Cormorant Garamond',serif`, fontSize: 24, fontWeight: 400, marginBottom: 12, color: `#E8503A`},
                children: `48-Hour Return Window`
            }), (0, $.jsx)(`p`, {
                style: {marginBottom: 20},
                children: `You may return any unopened, unused product within 48 hours of delivery for a full refund or store credit. Items must be in their original packaging and in resaleable condition.`
            }), (0, $.jsx)(`h3`, {
                style: {fontFamily: `'Cormorant Garamond',serif`, fontSize: 24, fontWeight: 400, marginBottom: 12, color: `#E8503A`},
                children: `How to Return`
            }), (0, $.jsx)(`p`, {
                children: `Contact us on WhatsApp at +234 706 040 8151 within 48 hours of receiving your order. Our team will guide you through the return process.`
            })]
        })]
    };
    var content = pageContent[e];
    return (0, $.jsxs)(`div`, {
        style: {
            background: `#000`,
            color: `#fff`,
            minHeight: `100vh`,
            fontFamily: `'Inter','DM Sans',sans-serif`,
            display: `flex`,
            flexDirection: `column`
        },
        children: [(0, $.jsx)(`style`, {
            children: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .info-back-btn { background:none; border:1px solid #333; color:#fff; padding:12px 32px; font-family:'Inter','DM Sans',sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; cursor:pointer; transition:all .3s;}
        .info-back-btn:hover { border-color:#E8503A; color:#E8503A; }
      `
        }), (0, $.jsx)(`div`, {
            style: {
                padding: `24px 40px`,
                borderBottom: `1px solid #1a1a1a`
            },
            children: (0, $.jsx)(`button`, {
                className: `info-back-btn`,
                onClick: t,
                children: `Back to Store`
            })
        }), (0, $.jsxs)(`div`, {
            style: {
                flex: 1,
                maxWidth: 800,
                margin: `0 auto`,
                padding: `80px 40px`,
                width: `100%`
            },
            children: [(0, $.jsx)(`h1`, {
                style: {
                    fontFamily: `'Cormorant Garamond',serif`,
                    fontSize: 48,
                    fontWeight: 300,
                    marginBottom: 40,
                    letterSpacing: 2
                },
                children: e
            }), (0, $.jsx)(`div`, {
                style: {
                    color: `#999`,
                    lineHeight: 1.8,
                    fontSize: 15,
                    fontFamily: `'Inter','DM Sans',sans-serif`
                },
                children: content ? content : (0, $.jsxs)(`p`, {
                    children: [`This page is currently being updated. Please check back soon for our latest information regarding `, e.toLowerCase(), `.`]
                })
            })]
        }), (0, $.jsx)(`footer`, {
            style: {
                borderTop: `1px solid #1a1a1a`,
                padding: `40px`,
                textAlign: `center`,
                fontSize: 11,
                color: `#555`,
                letterSpacing: 3,
                textTransform: `uppercase`,
                fontFamily: `'Inter','DM Sans',sans-serif`
            },
            children: `© 2025 Luxury Essentials by Lami | +234 706 040 8151`
        })]
    })
}

function Hm() {
    let [e, t] = (0, D.useState)(`store`), [n, r] = (0, D.useState)(Mm), [i, a] = (0, D.useState)(jm), [o, s] = (0, D.useState)(!0), [c, l] = (0, D.useState)(null), [u, d] = (0, D.useState)(``), [f, p] = (0, D.useState)(``), [m, h] = (0, D.useState)(``), [g, _] = (0, D.useState)(!1), [v, y] = (0, D.useState)(0), [b, x] = (0, D.useState)(`all`), [ee, te] = (0, D.useState)(0), [S, ne] = (0, D.useState)([]), [re, C] = (0, D.useState)(!1), [ie, ae] = (0, D.useState)({}), [mobileMenu, setMobileMenu] = (0, D.useState)(!1);
    (0, D.useEffect)(() => {
        let n = cf(Em, n => {
            l(n), n && e === `admin-login` && t(`admin`)
        });
        return () => n()
    }, [e]), (0, D.useEffect)(() => {
        (async () => {
            let e = await Fm();
            e && (e.products && r(e.products), e.categories && a(e.categories)), s(!1)
        })()
    }, []), (0, D.useEffect)(() => {
        let e = setInterval(() => te(e => (e + 1) % Pm.length), 5e3);
        return () => clearInterval(e)
    }, []);
    let w = async e => {
        try {
            await Im(e), r(e.products), a(e.categories)
        } catch (e) {
            alert(`Failed to save to database: ` + e.message + `\n\nYour changes were NOT saved. Check Firestore rules and try again.`)
        }
    }, oe = async () => {
        h(``), _(!0);
        try {
            await af(Em, u, f), t(`admin`), d(``), p(``)
        } catch (e) {
            h({
                "auth/invalid-credential": `Invalid email or password.`,
                "auth/user-not-found": `No admin account with this email.`,
                "auth/wrong-password": `Incorrect password.`,
                "auth/too-many-requests": `Too many attempts. Try again later.`,
                "auth/invalid-email": `Invalid email format.`
            } [e.code] || `Login failed: ` + e.message)
        } finally {
            _(!1)
        }
    }, se = async () => {
        await lf(Em), t(`store`)
    }, T = (e, t) => {
        e.stopPropagation();
        let n = ie[t.id],
            r = t.colors?.find(e => e.hex === n) || t.colors?.[0] || null,
            i = t.id + (r ? `_` + r.hex : ``);
        ne(e => e.find(e => e.cartKey === i) ? e.map(e => e.cartKey === i ? {
            ...e,
            qty: e.qty + 1
        } : e) : [...e, {
            ...t,
            qty: 1,
            cartKey: i,
            selectedColor: r
        }]), y(e => e + 1)
    }, E = e => {
        let t = S.find(t => t.cartKey === e);
        t && y(e => e - t.qty), ne(t => t.filter(t => t.cartKey !== e))
    }, ce = S.reduce((e, t) => e + t.price * t.qty, 0), le = b === `all` ? n.filter(e => e.inStock) : n.filter(e => e.category === b && e.inStock), ue = () => {
        if (S.length === 0) return;
        let orderItems = S.map(t => {
            let n = t.selectedColor ? ` (${t.selectedColor.name})` : ``;
            return t.name + n + ` x${t.qty}`
        }).join(`, `);
        let amountKobo = Math.round(ce * 100);
        let popup = new PaystackPop();
        popup.newTransaction({
            key: `pk_live_d82e9d9e43f16845916043561de9014e58c9a1fb`,
            email: `customer@lebylami.com`,
            amount: amountKobo,
            currency: `NGN`,
            metadata: {
                custom_fields: [{
                    display_name: `Order Items`,
                    variable_name: `order_items`,
                    value: orderItems
                }]
            },
            onSuccess: (transaction) => {
                let e = `🛍️ *New PAID Order — Luxury Essentials by Lami*\n*Ref: ` + transaction.reference + `*\n\n`;
                S.forEach(t => {
                    let n = t.selectedColor ? ` (${t.selectedColor.name})` : ``;
                    e += `▸ ${t.name}${n} × ${t.qty} — ₦${Qm(t.price*t.qty)}\n`
                });
                e += `\n*Total: ₦${Qm(ce)}*\n*Payment: Confirmed ✅*`;
                let t = `https://wa.me/2347060408151?text=` + encodeURIComponent(e);
                window.open(t, `_blank`);
                ne([]);
                y(0);
                C(!1);
                alert(`Payment successful! Reference: ` + transaction.reference)
            },
            onCancel: () => {
                alert(`Payment was cancelled. Your cart is still saved.`)
            }
        })
    };
    if (o) return (0, $.jsx)(`div`, {
        style: {
            background: `#000`,
            color: `#E8503A`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            height: `100vh`,
            fontFamily: `'Cormorant Garamond',serif`,
            fontSize: 24
        },
        children: `Loading...`
    });
    if (e === `admin-login`) {
        if (c) return t(`admin`), null;
        let e = {
            background: `#111`,
            border: `1px solid ${m?`#ff4444`:`#222`}`,
            color: `#fff`,
            padding: `14px 20px`,
            fontFamily: `'Inter','DM Sans',sans-serif`,
            fontSize: 14,
            width: `100%`,
            outline: `none`,
            marginBottom: 12
        };
        return (0, $.jsxs)(`div`, {
            style: {
                background: `#000`,
                color: `#fff`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                height: `100vh`,
                fontFamily: `'Inter','DM Sans',sans-serif`
            },
            children: [(0, $.jsx)(`style`, {
                children: `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');`
            }), (0, $.jsxs)(`div`, {
                style: {
                    textAlign: `center`,
                    width: 340
                },
                children: [(0, $.jsx)(zm, {}), (0, $.jsx)(`div`, {
                    style: {
                        marginTop: 40,
                        marginBottom: 16,
                        fontSize: 11,
                        letterSpacing: 3,
                        textTransform: `uppercase`,
                        color: `#666`
                    },
                    children: `Admin Access`
                }), (0, $.jsx)(`input`, {
                    type: `email`,
                    value: u,
                    onChange: e => {
                        d(e.target.value), h(``)
                    },
                    onKeyDown: e => e.key === `Enter` && f && oe(),
                    placeholder: `Admin email`,
                    autoComplete: `email`,
                    style: e
                }), (0, $.jsx)(`input`, {
                    type: `password`,
                    value: f,
                    onChange: e => {
                        p(e.target.value), h(``)
                    },
                    onKeyDown: e => e.key === `Enter` && oe(),
                    placeholder: `Password`,
                    autoComplete: `current-password`,
                    style: e
                }), m && (0, $.jsx)(`div`, {
                    style: {
                        color: `#ff4444`,
                        fontSize: 12,
                        marginBottom: 12,
                        textAlign: `left`
                    },
                    children: m
                }), (0, $.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        gap: 12
                    },
                    children: [(0, $.jsx)(`button`, {
                        onClick: oe,
                        disabled: g || !u || !f,
                        style: {
                            flex: 1,
                            background: `#E8503A`,
                            border: `none`,
                            color: `#fff`,
                            padding: `12px`,
                            fontFamily: `'Inter','DM Sans',sans-serif`,
                            fontSize: 12,
                            letterSpacing: 2,
                            textTransform: `uppercase`,
                            cursor: `pointer`,
                            opacity: g ? .5 : 1
                        },
                        children: g ? `Signing in...` : `Sign In`
                    }), (0, $.jsx)(`button`, {
                        onClick: () => {
                            t(`store`), h(``)
                        },
                        style: {
                            flex: 1,
                            background: `none`,
                            border: `1px solid #333`,
                            color: `#999`,
                            padding: `12px`,
                            fontFamily: `'Inter','DM Sans',sans-serif`,
                            fontSize: 12,
                            letterSpacing: 2,
                            textTransform: `uppercase`,
                            cursor: `pointer`
                        },
                        children: `Back`
                    })]
                })]
            })]
        })
    }
    if (e === `admin`) return c ? (0, $.jsx)(Bm, {
        products: n,
        categories: i,
        onSave: w,
        onBack: () => t(`store`),
        onLogout: se
    }) : (t(`admin-login`), null);
    let de = {
        "page-contact": `Contact Us`,
        "page-help": `Help Center`,
        "page-returns": `Returns Policy`,
        "page-shipping": `Shipping Information`,
        "page-care": `Product Care`,
        "page-story": `Our Story`,
        "page-journal": `Journal`,
        "page-careers": `Careers`,
        "page-stores": `Retail Stores`,
        "page-sustainability": `Sustainability`
    };
    return de[e] ? (0, $.jsx)(Vm, {
        title: de[e],
        onBack: () => {
            t(`store`), window.scrollTo(0, 0)
        }
    }) : (0, $.jsxs)(`div`, {
        style: {
            fontFamily: `'Inter','DM Sans',sans-serif`,
            background: `#000`,
            color: `#fff`,
            minHeight: `100vh`,
            overflowX: `hidden`
        },
        children: [(0, $.jsx)(`style`, {
            children: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#000} ::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
        .le-announce{display:none}
        .le-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 40px;display:flex;align-items:center;justify-content:space-between;background:transparent;transition:background .3s}
        .le-nav.scrolled{background:rgba(0,0,0,.95);backdrop-filter:blur(10px)}
        .le-nav-left{display:flex;align-items:center;gap:16px}
        .le-nav-menu-btn{background:none;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;gap:8px;font-family:'Inter','DM Sans',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;padding:0}
        .le-nav-menu-btn svg{width:20px;height:20px}
        .le-nav-center{position:absolute;left:50%;transform:translateX(-50%)}
        .le-nav-right{display:flex;align-items:center;gap:20px}
        .le-nav-icon{background:none;border:none;color:#fff;cursor:pointer;position:relative;padding:4px;display:flex;align-items:center;justify-content:center}
        .le-nav-icon svg{width:20px;height:20px}
        .le-badge{position:absolute;top:-4px;right:-6px;background:#E8503A;color:#fff;width:16px;height:16px;border-radius:50%;font-size:9px;display:flex;align-items:center;justify-content:center;font-weight:600}
        .le-mobile-menu{position:fixed;inset:0;z-index:300;background:#000;display:flex;flex-direction:column;padding:80px 40px 40px}
        .le-mobile-menu-close{position:absolute;top:20px;right:20px;background:none;border:none;color:#fff;font-size:28px;cursor:pointer}
        .le-mobile-menu a,.le-mobile-menu button{display:block;background:none;border:none;color:#fff;font-family:'Inter','DM Sans',sans-serif;font-size:24px;font-weight:300;letter-spacing:2px;text-transform:lowercase;padding:16px 0;cursor:pointer;text-decoration:none;text-align:left;border-bottom:1px solid #1a1a1a;width:100%}
        .le-hero{height:100vh;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
        .le-hero-bg{position:absolute;inset:0}
        .le-hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.4}
        .le-hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.3) 0%,rgba(0,0,0,.5) 100%)}
        @keyframes fadeUp{to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes scrollL{0%{top:-100%}100%{top:200%}}
        .le-hero-content{position:relative;z-index:2;text-align:center;max-width:800px;padding:0 24px}
        .le-hero-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(40px,7vw,80px);font-weight:300;line-height:1.1;margin-bottom:20px;text-transform:lowercase;opacity:0;transform:translateY(30px);animation:fadeUp 1s .3s forwards}
        .le-hero-title strong{font-weight:700}
        .le-hero-sub{font-size:14px;font-weight:300;color:rgba(255,255,255,.7);line-height:1.7;max-width:480px;margin:0 auto 40px;opacity:0;transform:translateY(20px);animation:fadeUp 1s .6s forwards}
        .le-discover-btn{display:inline-block;background:transparent;border:1px solid #fff;color:#fff;padding:14px 48px;font-family:'Inter','DM Sans',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all .4s;text-decoration:none;opacity:0;transform:translateY(20px);animation:fadeUp 1s .8s forwards}
        .le-discover-btn:hover{background:#fff;color:#000}
        .le-brand-statement{padding:100px 40px;text-align:center;background:#000}
        .le-brand-statement p{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(18px,2.5vw,28px);font-weight:300;line-height:1.8;max-width:800px;margin:0 auto;color:rgba(255,255,255,.8)}
        .le-cat-section{padding:80px 40px;background:#000}
        .le-cat-section-title{font-family:'Inter','DM Sans',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#999;margin-bottom:40px}
        .le-cat-scroll{display:flex;gap:16px;overflow-x:auto;padding-bottom:16px;-ms-overflow-style:none;scrollbar-width:none}
        .le-cat-scroll::-webkit-scrollbar{display:none}
        .le-cat-card{min-width:280px;height:360px;position:relative;overflow:hidden;cursor:pointer;flex-shrink:0;background:#1a1a1a}
        .le-cat-card-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.8) 100%);z-index:1}
        .le-cat-card-content{position:absolute;bottom:0;left:0;right:0;padding:32px;z-index:2}
        .le-cat-card-name{font-family:'Inter','DM Sans',sans-serif;font-size:16px;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}
        .le-cat-card-btn{background:transparent;border:1px solid #fff;color:#fff;padding:10px 28px;font-family:'Inter','DM Sans',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all .3s}
        .le-cat-card-btn:hover{background:#fff;color:#000}
        .le-promo-banner{position:relative;height:500px;overflow:hidden;background:#111}
        .le-promo-banner img{width:100%;height:100%;object-fit:cover;opacity:.5}
        .le-promo-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px}
        .le-promo-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(32px,5vw,56px);font-weight:300;margin-bottom:24px;text-transform:lowercase}
        .le-promo-title strong{font-weight:700}
        .le-shop-section{padding:80px 40px;background:#111}
        .le-shop-label{font-family:'Inter','DM Sans',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#999;margin-bottom:24px}
        .le-cat-filters{display:flex;gap:8px;margin-bottom:40px;flex-wrap:wrap}
        .le-cat-filter{font-family:'Inter','DM Sans',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:8px 20px;border:1px solid #333;background:none;color:#999;cursor:pointer;transition:all .3s;white-space:nowrap}
        .le-cat-filter:hover{border-color:#666;color:#fff}
        .le-cat-filter.active{border-color:#E8503A;color:#E8503A;background:rgba(232,80,58,.08)}
        .le-products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px}
        .le-pcard{background:#fff;overflow:hidden;cursor:pointer;transition:all .4s;position:relative}
        .le-pcard:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.3)}
        .le-pcard-img{height:320px;position:relative;overflow:hidden;background:#f5f5f5;display:flex;align-items:center;justify-content:center}
        .le-pcard-img img{max-width:85%;max-height:85%;object-fit:contain;transition:transform .5s ease}
        .le-pcard:hover .le-pcard-img img{transform:scale(1.05)}
        .le-pcard-wishlist{position:absolute;top:16px;right:16px;background:none;border:none;cursor:pointer;z-index:2;padding:4px}
        .le-pcard-wishlist svg{width:20px;height:20px;stroke:#999;fill:none;stroke-width:1.5;transition:all .3s}
        .le-pcard-wishlist:hover svg{stroke:#E8503A}
        .le-pcard-badge{position:absolute;top:16px;left:16px;font-size:9px;letter-spacing:2px;text-transform:uppercase;background:#E8503A;color:#fff;padding:4px 10px;font-weight:600;z-index:2}
        .le-pcard-add{position:absolute;bottom:0;left:0;right:0;background:#000;color:#fff;text-align:center;font-size:11px;letter-spacing:3px;text-transform:uppercase;padding:14px;transform:translateY(100%);transition:transform .3s ease;cursor:pointer;border:none;width:100%;font-weight:500;z-index:2}
        .le-pcard:hover .le-pcard-add{transform:translateY(0)}
        .le-pcard-info{padding:20px;background:#fff;color:#000}
        .le-pcard-name{font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;color:#000}
        .le-pcard-sub{font-size:11px;color:#888;letter-spacing:1px;margin-bottom:6px;text-transform:uppercase}
        .le-pcard-desc{font-size:12px;color:#666;line-height:1.5;margin-bottom:10px}
        .le-color-swatches{display:flex;gap:6px;margin-bottom:10px}
        .le-color-swatch{width:16px;height:16px;border-radius:50%;border:2px solid transparent;cursor:pointer;transition:all .3s;padding:0;outline:none}
        .le-color-swatch:hover{transform:scale(1.2)}
        .le-color-swatch.active{border-color:#E8503A;transform:scale(1.2)}
        .le-pcard-price-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
        .le-pcard-old{font-size:13px;color:#999;text-decoration:line-through;font-weight:400}
        .le-pcard-price{font-size:14px;font-weight:600;color:#E8503A}
        .le-pcard-save{font-size:10px;color:#E8503A;letter-spacing:1px;text-transform:uppercase;font-weight:600}
        .le-pcard-no-img{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;color:#ddd}
        .le-split{display:grid;grid-template-columns:1fr 1fr;min-height:500px;background:#000}
        .le-split-visual{position:relative;overflow:hidden}
        .le-split-visual img{width:100%;height:100%;object-fit:cover}
        .le-split-content{display:flex;flex-direction:column;justify-content:center;padding:80px 64px;background:#000}
        .le-split-label{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#999;margin-bottom:16px}
        .le-split-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(28px,4vw,48px);font-weight:300;margin-bottom:24px;text-transform:lowercase}
        .le-split-title strong{font-weight:700}
        .le-split-text{font-size:14px;color:rgba(255,255,255,.6);line-height:1.8;margin-bottom:32px}
        .le-test-section{text-align:center;padding:100px 40px;background:#000}
        .le-test-label{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#999;margin-bottom:40px}
        .le-test-stars{color:#E8503A;font-size:14px;margin-bottom:24px;letter-spacing:4px}
        .le-test-text{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(20px,3vw,30px);font-weight:300;font-style:italic;max-width:700px;margin:0 auto 24px;line-height:1.6;min-height:80px;color:rgba(255,255,255,.9)}
        .le-test-author{font-size:12px;color:#666;letter-spacing:3px;text-transform:uppercase}
        .le-test-dots{display:flex;gap:8px;justify-content:center;margin-top:32px}
        .le-test-dot{width:6px;height:6px;border-radius:50%;background:#333;cursor:pointer;transition:all .3s;border:none}
        .le-test-dot.active{background:#E8503A;width:24px;border-radius:3px}
        .le-newsletter{padding:100px 40px;text-align:center;background:#1a1a1a}
        .le-newsletter-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(28px,4vw,44px);font-weight:300;margin-bottom:16px}
        .le-newsletter-sub{font-size:13px;color:#999;margin-bottom:40px;letter-spacing:1px}
        .le-newsletter-form{display:flex;gap:0;max-width:480px;margin:0 auto}
        .le-newsletter-input{flex:1;background:#111;border:1px solid #333;border-right:none;color:#fff;padding:14px 20px;font-family:'Inter','DM Sans',sans-serif;font-size:13px;outline:none}
        .le-newsletter-input:focus{border-color:#E8503A}
        .le-newsletter-input::placeholder{color:#555}
        .le-newsletter-submit{background:#E8503A;border:1px solid #E8503A;color:#fff;padding:14px 28px;font-family:'Inter','DM Sans',sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;font-weight:500;transition:all .3s}
        .le-newsletter-submit:hover{background:#d4442f}
        .le-footer{border-top:1px solid #1a1a1a;padding:64px 40px 32px;background:#000}
        .le-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px}
        .le-footer-brand p{font-size:13px;color:#666;line-height:1.7;margin-top:16px}
        .le-footer-title{font-size:11px;letter-spacing:3px;text-transform:lowercase;color:#999;margin-bottom:20px}
        .le-footer-links{list-style:none}
        .le-footer-links li{margin-bottom:10px}
        .le-footer-links a{font-size:13px;color:#5B9A8B;text-decoration:none;transition:color .3s;cursor:pointer}
        .le-footer-links a:hover{color:#E8503A}
        .le-footer-bottom{border-top:1px solid #1a1a1a;padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .le-footer-copy{font-size:11px;color:#444}
        .le-footer-payments{display:flex;gap:8px;align-items:center}
        .le-footer-payment{width:40px;height:26px;background:#1a1a1a;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#666;letter-spacing:1px;font-weight:600}
        .le-footer-socials{display:flex;gap:12px}
        .le-footer-social{width:36px;height:36px;border:1px solid #1a1a1a;display:flex;align-items:center;justify-content:center;color:#5B9A8B;font-size:14px;text-decoration:none;transition:all .3s;cursor:pointer}
        .le-footer-social:hover{border-color:#E8503A;color:#E8503A}
        .le-admin-link{font-size:11px;color:#222;cursor:pointer;transition:color .3s;text-decoration:none}
        .le-admin-link:hover{color:#E8503A}
        .le-wa-float{position:fixed;bottom:28px;right:28px;z-index:90;width:56px;height:56px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,.4);transition:all .3s;text-decoration:none;border:none;cursor:pointer}
        .le-wa-float:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(37,211,102,.5)}
        .le-wa-float svg{width:28px;height:28px;fill:#fff}
        .le-cart-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:200;backdrop-filter:blur(4px)}
        .le-cart-drawer{position:fixed;top:0;right:0;bottom:0;width:400px;max-width:90vw;background:#111;z-index:201;border-left:1px solid #1a1a1a;display:flex;flex-direction:column;animation:slideIn .3s ease}
        .le-cart-header{padding:24px;border-bottom:1px solid #1a1a1a;display:flex;justify-content:space-between;align-items:center}
        .le-cart-close{background:none;border:none;color:#666;font-size:24px;cursor:pointer;transition:color .3s}
        .le-cart-close:hover{color:#fff}
        .le-cart-body{flex:1;overflow-y:auto;padding:24px}
        .le-cart-item{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid #1a1a1a}
        .le-cart-item-img{width:60px;height:60px;overflow:hidden;flex-shrink:0;background:#1a1a1a}
        .le-cart-item-img img{width:100%;height:100%;object-fit:cover}
        .le-cart-footer{padding:24px;border-top:1px solid #1a1a1a}
        @media(max-width:768px){
          .le-nav{padding:12px 16px}
          .le-nav-center{position:static;transform:none}
          .le-nav-menu-btn span{display:none}
          .le-brand-statement{padding:60px 20px}
          .le-cat-section{padding:60px 20px}
          .le-shop-section{padding:60px 20px}
          .le-split{grid-template-columns:1fr}
          .le-split-content{padding:48px 24px}
          .le-products-grid{grid-template-columns:1fr 1fr}
          .le-footer-grid{grid-template-columns:1fr 1fr}
          .le-newsletter{padding:60px 20px}
          .le-newsletter-form{flex-direction:column}
          .le-newsletter-input{border-right:1px solid #333}
          .le-test-section{padding:60px 20px}
          .le-promo-banner{height:350px}
        }
        @media(max-width:480px){
          .le-products-grid{grid-template-columns:1fr}
          .le-footer-grid{grid-template-columns:1fr}
        }
      `
        }), re && (0, $.jsxs)($.Fragment, {
            children: [(0, $.jsx)(`div`, {
                className: `le-cart-overlay`,
                onClick: () => C(!1)
            }), (0, $.jsxs)(`div`, {
                className: `le-cart-drawer`,
                children: [(0, $.jsxs)(`div`, {
                    className: `le-cart-header`,
                    children: [(0, $.jsxs)(`span`, {
                        style: {
                            fontSize: 11,
                            letterSpacing: 3,
                            textTransform: `uppercase`
                        },
                        children: [`Your Cart (`, S.reduce((e, t) => e + t.qty, 0), `)`]
                    }), (0, $.jsx)(`button`, {
                        className: `le-cart-close`,
                        onClick: () => C(!1),
                        children: `×`
                    })]
                }), (0, $.jsxs)(`div`, {
                    className: `le-cart-body`,
                    children: [S.length === 0 && (0, $.jsx)(`div`, {
                        style: {
                            textAlign: `center`,
                            color: `#555`,
                            paddingTop: 60,
                            fontSize: 13
                        },
                        children: `Your cart is empty`
                    }), S.map(e => (0, $.jsxs)(`div`, {
                        className: `le-cart-item`,
                        children: [(0, $.jsx)(`div`, {
                            className: `le-cart-item-img`,
                            children: e.image ? (0, $.jsx)(`img`, {
                                src: e.image,
                                alt: ``
                            }) : (0, $.jsx)(`div`, {
                                style: {
                                    width: `100%`,
                                    height: `100%`,
                                    background: e.color + `22`
                                }
                            })
                        }), (0, $.jsxs)(`div`, {
                            style: {
                                flex: 1
                            },
                            children: [(0, $.jsx)(`div`, {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 600,
                                    letterSpacing: 1,
                                    textTransform: `uppercase`,
                                    marginBottom: 4
                                },
                                children: e.name
                            }), e.selectedColor && (0, $.jsxs)(`div`, {
                                style: {
                                    fontSize: 11,
                                    color: `#888`,
                                    display: `flex`,
                                    alignItems: `center`,
                                    gap: 4,
                                    marginBottom: 2
                                },
                                children: [(0, $.jsx)(`span`, {
                                    style: {
                                        width: 10,
                                        height: 10,
                                        borderRadius: `50%`,
                                        background: e.selectedColor.hex,
                                        border: `1px solid #333`,
                                        display: `inline-block`
                                    }
                                }), e.selectedColor.name]
                            }), (0, $.jsxs)(`div`, {
                                style: {
                                    fontSize: 11,
                                    color: `#666`
                                },
                                children: [`Qty: `, e.qty]
                            }), (0, $.jsxs)(`div`, {
                                style: {
                                    fontSize: 14,
                                    color: `#E8503A`,
                                    fontWeight: 600,
                                    marginTop: 4
                                },
                                children: [`₦`, Qm(e.price * e.qty)]
                            })]
                        }), (0, $.jsx)(`button`, {
                            onClick: () => E(e.cartKey),
                            style: {
                                background: `none`,
                                border: `none`,
                                color: `#555`,
                                cursor: `pointer`,
                                fontSize: 16,
                                alignSelf: `flex-start`
                            },
                            children: `×`
                        })]
                    }, e.cartKey))]
                }), S.length > 0 && (0, $.jsxs)(`div`, {
                    className: `le-cart-footer`,
                    children: [(0, $.jsxs)(`div`, {
                        style: {
                            display: `flex`,
                            justifyContent: `space-between`,
                            marginBottom: 16
                        },
                        children: [(0, $.jsx)(`span`, {
                            style: {
                                fontSize: 11,
                                color: `#888`,
                                letterSpacing: 3,
                                textTransform: `uppercase`
                            },
                            children: `Total`
                        }), (0, $.jsxs)(`span`, {
                            style: {
                                fontSize: 18,
                                color: `#E8503A`,
                                fontWeight: 600
                            },
                            children: [`₦`, Qm(ce)]
                        })]
                    }), (0, $.jsx)(`button`, {
                        onClick: ue,
                        style: {
                            width: `100%`,
                            background: `#E8503A`,
                            border: `none`,
                            color: `#fff`,
                            padding: `16px`,
                            fontSize: 11,
                            letterSpacing: 3,
                            textTransform: `uppercase`,
                            cursor: `pointer`,
                            fontWeight: 600,
                            fontFamily: `'Inter','DM Sans',sans-serif`,
                            transition: `all .3s`
                        },
                        children: `Checkout with Paystack`
                    })]
                })]
            })]
        }), mobileMenu && (0, $.jsxs)(`div`, {
            className: `le-mobile-menu`,
            children: [(0, $.jsx)(`button`, {
                className: `le-mobile-menu-close`,
                onClick: () => setMobileMenu(!1),
                children: `×`
            }), (0, $.jsx)(`a`, {
                href: `#hero`,
                onClick: () => setMobileMenu(!1),
                children: `home`
            }), (0, $.jsx)(`a`, {
                href: `#shop`,
                onClick: () => setMobileMenu(!1),
                children: `shop`
            }), (0, $.jsx)(`a`, {
                href: `#about`,
                onClick: () => setMobileMenu(!1),
                children: `about`
            }), (0, $.jsx)(`a`, {
                href: `#contact`,
                onClick: () => setMobileMenu(!1),
                children: `contact`
            }), (0, $.jsx)(`button`, {
                onClick: () => { setMobileMenu(!1); C(!0) },
                children: `cart (${v})`
            })]
        }), (0, $.jsxs)(`nav`, {
            className: `le-nav`,
            children: [(0, $.jsxs)(`div`, {
                className: `le-nav-left`,
                children: [(0, $.jsxs)(`button`, {
                    className: `le-nav-menu-btn`,
                    onClick: () => setMobileMenu(!0),
                    children: [(0, $.jsx)(`svg`, {
                        viewBox: `0 0 24 24`,
                        fill: `none`,
                        stroke: `currentColor`,
                        strokeWidth: `1.5`,
                        children: [(0, $.jsx)(`line`, {x1:`3`,y1:`6`,x2:`21`,y2:`6`}), (0, $.jsx)(`line`, {x1:`3`,y1:`12`,x2:`21`,y2:`12`}), (0, $.jsx)(`line`, {x1:`3`,y1:`18`,x2:`21`,y2:`18`})]
                    }), (0, $.jsx)(`span`, {
                        children: `Menu`
                    })]
                })]
            }), (0, $.jsx)(`div`, {
                className: `le-nav-center`,
                children: (0, $.jsx)(`a`, {
                    href: `#hero`,
                    style: {textDecoration:`none`},
                    children: (0, $.jsx)(zm, {size:`small`})
                })
            }), (0, $.jsxs)(`div`, {
                className: `le-nav-right`,
                children: [(0, $.jsx)(`button`, {
                    className: `le-nav-icon`,
                    title: `Search`,
                    children: (0, $.jsx)(`svg`, {
                        viewBox: `0 0 24 24`,
                        fill: `none`,
                        stroke: `currentColor`,
                        strokeWidth: `1.5`,
                        children: [(0, $.jsx)(`circle`, {cx:`11`,cy:`11`,r:`8`}), (0, $.jsx)(`line`, {x1:`21`,y1:`21`,x2:`16.65`,y2:`16.65`})]
                    })
                }), (0, $.jsx)(`button`, {
                    className: `le-nav-icon`,
                    title: `Account`,
                    children: (0, $.jsx)(`svg`, {
                        viewBox: `0 0 24 24`,
                        fill: `none`,
                        stroke: `currentColor`,
                        strokeWidth: `1.5`,
                        children: [(0, $.jsx)(`path`, {d:`M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2`}), (0, $.jsx)(`circle`, {cx:`12`,cy:`7`,r:`4`})]
                    })
                }), (0, $.jsxs)(`button`, {
                    className: `le-nav-icon`,
                    onClick: () => C(!0),
                    title: `Cart`,
                    children: [(0, $.jsx)(`svg`, {
                        viewBox: `0 0 24 24`,
                        fill: `none`,
                        stroke: `currentColor`,
                        strokeWidth: `1.5`,
                        children: [(0, $.jsx)(`path`, {d:`M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z`}), (0, $.jsx)(`line`, {x1:`3`,y1:`6`,x2:`21`,y2:`6`}), (0, $.jsx)(`path`, {d:`M16 10a4 4 0 0 1-8 0`})]
                    }), v > 0 && (0, $.jsx)(`span`, {
                        className: `le-badge`,
                        children: v
                    })]
                })]
            })]
        }), (0, $.jsxs)(`section`, {
            id: `hero`,
            className: `le-hero`,
            children: [(0, $.jsx)(`div`, {
                className: `le-hero-bg`,
                children: (0, $.jsx)(`img`, {
                    src: Nm[0],
                    alt: ``
                })
            }), (0, $.jsx)(`div`, {
                className: `le-hero-overlay`
            }), (0, $.jsxs)(`div`, {
                className: `le-hero-content`,
                children: [(0, $.jsxs)(`h1`, {
                    className: `le-hero-title`,
                    children: [`elevate your `, (0, $.jsx)(`strong`, {
                        children: `pleasure`
                    })]
                }), (0, $.jsx)(`p`, {
                    className: `le-hero-sub`,
                    children: `Meticulously curated pleasure products designed to awaken your senses. Premium intimate luxury, delivered with discretion.`
                }), (0, $.jsx)(`a`, {
                    href: `#shop`,
                    children: (0, $.jsx)(`button`, {
                        className: `le-discover-btn`,
                        children: `Discover`
                    })
                })]
            })]
        }), (0, $.jsx)(`section`, {
            className: `le-brand-statement`,
            children: (0, $.jsx)(Rm, {
                children: (0, $.jsx)(`p`, {
                    children: `Luxury Essentials by Lami is dedicated to breaking taboos and empowering individuals and couples to explore their desires with confidence. Every product is meticulously curated to meet the highest standards of safety, innovation, and design.`
                })
            })
        }), (0, $.jsxs)(`section`, {
            className: `le-cat-section`,
            children: [(0, $.jsx)(Rm, {
                children: (0, $.jsx)(`h2`, {
                    className: `le-cat-section-title`,
                    children: `Popular Categories`
                })
            }), (0, $.jsx)(`div`, {
                className: `le-cat-scroll`,
                children: i.map((cat, idx) => (0, $.jsxs)(`div`, {
                    className: `le-cat-card`,
                    onClick: () => {
                        x(cat.id);
                        document.getElementById(`shop`)?.scrollIntoView({behavior:`smooth`})
                    },
                    children: [(0, $.jsx)(`div`, {
                        style: {
                            position: `absolute`,
                            inset: 0,
                            background: `linear-gradient(135deg, #1a1a1a, #111)`,
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `center`,
                            fontSize: 80,
                            opacity: .15
                        },
                        children: cat.icon
                    }), (0, $.jsx)(`div`, {
                        className: `le-cat-card-overlay`
                    }), (0, $.jsxs)(`div`, {
                        className: `le-cat-card-content`,
                        children: [(0, $.jsx)(`div`, {
                            className: `le-cat-card-name`,
                            children: cat.name
                        }), (0, $.jsx)(`button`, {
                            className: `le-cat-card-btn`,
                            children: `Discover`
                        })]
                    })]
                }, cat.id))
            })]
        }), (0, $.jsx)(`section`, {
            className: `le-promo-banner`,
            children: (0, $.jsxs)(`div`, {
                style: {position:`relative`,height:`100%`},
                children: [(0, $.jsx)(`img`, {
                    src: Nm[1],
                    alt: ``,
                    style: {position:`absolute`,inset:0,width:`100%`,height:`100%`,objectFit:`cover`,opacity:.4}
                }), (0, $.jsxs)(`div`, {
                    className: `le-promo-overlay`,
                    children: [(0, $.jsxs)(`h2`, {
                        className: `le-promo-title`,
                        children: [`passion `, (0, $.jsx)(`strong`, {children:`ignited`})]
                    }), (0, $.jsx)(`a`, {
                        href: `#shop`,
                        children: (0, $.jsx)(`button`, {
                            className: `le-discover-btn`,
                            style: {opacity:1,transform:`none`,animation:`none`},
                            children: `Discover`
                        })
                    })]
                })]
            })
        }), (0, $.jsxs)(`section`, {
            id: `shop`,
            className: `le-shop-section`,
            children: [(0, $.jsx)(Rm, {
                children: (0, $.jsx)(`h2`, {
                    className: `le-shop-label`,
                    children: `Bestsellers`
                })
            }), (0, $.jsxs)(`div`, {
                className: `le-cat-filters`,
                children: [(0, $.jsx)(`button`, {
                    className: `le-cat-filter ${b===`all`?`active`:``}`,
                    onClick: () => x(`all`),
                    children: `All`
                }), i.map(e => (0, $.jsx)(`button`, {
                    className: `le-cat-filter ${b===e.id?`active`:``}`,
                    onClick: () => x(e.id),
                    children: e.name
                }, e.id))]
            }), (0, $.jsxs)(`div`, {
                className: `le-products-grid`,
                children: [le.map((e, t) => (0, $.jsx)(Rm, {
                    delay: t * .06,
                    children: (0, $.jsxs)(`div`, {
                        className: `le-pcard`,
                        children: [(0, $.jsxs)(`div`, {
                            className: `le-pcard-img`,
                            children: [e.image ? (0, $.jsx)(`img`, {
                                src: e.image,
                                alt: e.name
                            }) : (0, $.jsx)(`div`, {
                                className: `le-pcard-no-img`,
                                children: `✦`
                            }), (0, $.jsx)(`button`, {
                                className: `le-pcard-wishlist`,
                                onClick: (ev) => ev.stopPropagation(),
                                children: (0, $.jsx)(`svg`, {
                                    viewBox: `0 0 24 24`,
                                    children: (0, $.jsx)(`path`, {
                                        d: `M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z`
                                    })
                                })
                            }), e.badge && (0, $.jsx)(`span`, {
                                className: `le-pcard-badge`,
                                children: e.badge
                            }), (0, $.jsx)(`button`, {
                                className: `le-pcard-add`,
                                onClick: t => T(t, e),
                                children: `Add to Cart`
                            })]
                        }), (0, $.jsxs)(`div`, {
                            className: `le-pcard-info`,
                            children: [(0, $.jsx)(`h3`, {
                                className: `le-pcard-name`,
                                children: e.name
                            }), (0, $.jsx)(`p`, {
                                className: `le-pcard-sub`,
                                children: e.subtitle
                            }), e.description && (0, $.jsx)(`p`, {
                                className: `le-pcard-desc`,
                                children: e.description
                            }), e.colors?.length > 0 && (0, $.jsx)(`div`, {
                                className: `le-color-swatches`,
                                children: e.colors.map((t, n) => (0, $.jsx)(`button`, {
                                    className: `le-color-swatch${(ie[e.id]||e.colors[0]?.hex)===t.hex?` active`:``}`,
                                    style: {
                                        background: t.hex
                                    },
                                    title: t.name,
                                    onClick: n => {
                                        n.stopPropagation(), ae(n => ({
                                            ...n,
                                            [e.id]: t.hex
                                        }))
                                    }
                                }, n))
                            }), (0, $.jsxs)(`div`, {
                                className: `le-pcard-price-row`,
                                children: [e.oldPrice && (0, $.jsxs)(`span`, {
                                    className: `le-pcard-old`,
                                    children: [`₦`, Qm(e.oldPrice)]
                                }), (0, $.jsxs)(`span`, {
                                    className: `le-pcard-price`,
                                    children: [`₦`, Qm(e.price)]
                                }), (0, $.jsxs)(`span`, {
                                    style: {fontSize:11,color:`#888`,marginLeft:4},
                                    children: [`($`, Qm(e.priceDollar || e.price / 1600), `)`]
                                }), e.oldPrice && (0, $.jsxs)(`span`, {
                                    className: `le-pcard-save`,
                                    children: [`Save ₦`, Qm(e.oldPrice - e.price)]
                                })]
                            })]
                        })]
                    })
                }, e.id)), le.length === 0 && (0, $.jsx)(`div`, {
                    style: {
                        gridColumn: `1/-1`,
                        textAlign: `center`,
                        padding: 80,
                        color: `#555`,
                        fontSize: 13
                    },
                    children: `No products in this category yet.`
                })]
            })]
        }), (0, $.jsxs)(`section`, {
            id: `about`,
            className: `le-split`,
            children: [(0, $.jsx)(`div`, {
                className: `le-split-visual`,
                children: (0, $.jsx)(`img`, {
                    src: Nm[1],
                    alt: ``,
                    style: {opacity:.8}
                })
            }), (0, $.jsx)(`div`, {
                className: `le-split-content`,
                children: (0, $.jsxs)(Rm, {
                    children: [(0, $.jsx)(`p`, {
                        className: `le-split-label`,
                        children: `Iconic`
                    }), (0, $.jsxs)(`h2`, {
                        className: `le-split-title`,
                        children: [`rose `, (0, $.jsx)(`strong`, {
                            children: `romeo™`
                        })]
                    }), (0, $.jsx)(`p`, {
                        className: `le-split-text`,
                        children: `Our cutting-edge double-action tongue lick shaker and clitoral stimulator. This is the toy that completely changes the way you think about blended orgasms. Experience pleasure, elevated by Lami.`
                    }), (0, $.jsx)(`a`, {
                        href: `#shop`,
                        children: (0, $.jsx)(`button`, {
                            className: `le-discover-btn`,
                            style: {
                                opacity: 1,
                                transform: `none`,
                                animation: `none`
                            },
                            children: `Discover`
                        })
                    })]
                })
            })]
        }), (0, $.jsx)(`section`, {
            className: `le-test-section`,
            children: (0, $.jsxs)(Rm, {
                children: [(0, $.jsx)(`p`, {
                    className: `le-test-label`,
                    children: `What our customers say`
                }), (0, $.jsx)(`div`, {
                    className: `le-test-stars`,
                    children: `★`.repeat(Pm[ee].rating)
                }), (0, $.jsxs)(`p`, {
                    className: `le-test-text`,
                    children: [`“`, Pm[ee].text, `”`]
                }), (0, $.jsxs)(`p`, {
                    className: `le-test-author`,
                    children: [`— `, Pm[ee].author]
                }), (0, $.jsx)(`div`, {
                    className: `le-test-dots`,
                    children: Pm.map((e, t) => (0, $.jsx)(`button`, {
                        className: `le-test-dot ${t===ee?`active`:``}`,
                        onClick: () => te(t)
                    }, t))
                })]
            })
        }), (0, $.jsxs)(`section`, {
            id: `contact`,
            className: `le-newsletter`,
            children: [(0, $.jsxs)(Rm, {
                children: [(0, $.jsx)(`h2`, {
                    className: `le-newsletter-title`,
                    children: `Stay Connected`
                }), (0, $.jsx)(`p`, {
                    className: `le-newsletter-sub`,
                    children: `Have questions or need assistance? Connect with our dedicated support team on WhatsApp.`
                }), (0, $.jsx)(`div`, {
                    style: {
                        display: `flex`,
                        justifyContent: `center`
                    },
                    children: (0, $.jsx)(`a`, {
                        href: `https://wa.me/2347060408151`,
                        target: `_blank`,
                        rel: `noopener noreferrer`,
                        style: {textDecoration:`none`},
                        children: (0, $.jsx)(`button`, {
                            className: `le-discover-btn`,
                            style: {opacity:1,transform:`none`,animation:`none`,borderColor:`#E8503A`,color:`#E8503A`},
                            children: `Chat on WhatsApp`
                        })
                    })
                })]
            })]
        }), (0, $.jsxs)(`footer`, {
            className: `le-footer`,
            children: [(0, $.jsxs)(`div`, {
                className: `le-footer-grid`,
                children: [(0, $.jsxs)(`div`, {
                    className: `le-footer-brand`,
                    children: [(0, $.jsx)(zm, {
                        size: `small`
                    }), (0, $.jsx)(`p`, {
                        children: `Curating premium intimate luxury with cutting-edge technology and innovative, body-safe design. Your trusted partner in elevated pleasure.`
                    })]
                }), (0, $.jsxs)(`div`, {
                    children: [(0, $.jsx)(`h4`, {
                        className: `le-footer-title`,
                        children: `help`
                    }), (0, $.jsxs)(`ul`, {
                        className: `le-footer-links`,
                        children: [(0, $.jsx)(`li`, {
                            children: (0, $.jsx)(`a`, {
                                onClick: () => {
                                    t(`page-contact`), window.scrollTo(0, 0)
                                },
                                children: `Contact Us`
                            })
                        }), (0, $.jsx)(`li`, {
                            children: (0, $.jsx)(`a`, {
                                onClick: () => {
                                    t(`page-help`), window.scrollTo(0, 0)
                                },
                                children: `Help Center`
                            })
                        }), (0, $.jsx)(`li`, {
                            children: (0, $.jsx)(`a`, {
                                onClick: () => {
                                    t(`page-returns`), window.scrollTo(0, 0)
                                },
                                children: `Returns`
                            })
                        }), (0, $.jsx)(`li`, {
                            children: (0, $.jsx)(`a`, {
                                onClick: () => {
                                    t(`page-shipping`), window.scrollTo(0, 0)
                                },
                                children: `Shipping`
                            })
                        }), (0, $.jsx)(`li`, {
                            children: (0, $.jsx)(`a`, {
                                onClick: () => {
                                    t(`page-care`), window.scrollTo(0, 0)
                                },
                                children: `Product Care`
                            })
                        })]
                    })]
                }), (0, $.jsxs)(`div`, {
                    children: [(0, $.jsx)(`h4`, {
                        className: `le-footer-title`,
                        children: `discover`
                    }), (0, $.jsxs)(`ul`, {
                        className: `le-footer-links`,
                        children: [(0, $.jsx)(`li`, {
                            children: (0, $.jsx)(`a`, {
                                onClick: () => {
                                    t(`page-story`), window.scrollTo(0, 0)
                                },
                                children: `Our Story`
                            })
                        }), (0, $.jsx)(`li`, {
                            children: (0, $.jsx)(`a`, {
                                onClick: () => {
                                    t(`page-journal`), window.scrollTo(0, 0)
                                },
                                children: `Journal`
                            })
                        }), (0, $.jsx)(`li`, {
                            children: (0, $.jsx)(`a`, {
                                onClick: () => {
                                    t(`page-careers`), window.scrollTo(0, 0)
                                },
                                children: `Careers`
                            })
                        }), (0, $.jsx)(`li`, {
                            children: (0, $.jsx)(`a`, {
                                onClick: () => {
                                    t(`page-stores`), window.scrollTo(0, 0)
                                },
                                children: `Retail Stores`
                            })
                        }), (0, $.jsx)(`li`, {
                            children: (0, $.jsx)(`a`, {
                                onClick: () => {
                                    t(`page-sustainability`), window.scrollTo(0, 0)
                                },
                                children: `Sustainability`
                            })
                        })]
                    })]
                }), (0, $.jsxs)(`div`, {
                    children: [(0, $.jsx)(`h4`, {
                        className: `le-footer-title`,
                        children: `shop`
                    }), (0, $.jsx)(`ul`, {
                        className: `le-footer-links`,
                        children: i.slice(0, 5).map(e => (0, $.jsx)(`li`, {
                            children: (0, $.jsx)(`a`, {
                                onClick: () => {
                                    x(e.id), document.getElementById(`shop`)?.scrollIntoView({
                                        behavior: `smooth`
                                    })
                                },
                                children: e.name
                            })
                        }, e.id))
                    })]
                })]
            }), (0, $.jsxs)(`div`, {
                className: `le-footer-bottom`,
                children: [(0, $.jsxs)(`div`, {
                    style: {
                        display: `flex`,
                        alignItems: `center`,
                        gap: 24
                    },
                    children: [(0, $.jsx)(`span`, {
                        className: `le-footer-copy`,
                        children: `© 2025 Luxury Essentials by Lami. All Rights Reserved. | +234 706 040 8151`
                    }), (0, $.jsx)(`a`, {
                        className: `le-admin-link`,
                        onClick: () => t(`admin-login`),
                        children: `Admin`
                    })]
                }), (0, $.jsxs)(`div`, {
                    className: `le-footer-payments`,
                    children: [(0, $.jsx)(`div`, {className:`le-footer-payment`,children:`VISA`}),
                    (0, $.jsx)(`div`, {className:`le-footer-payment`,children:`MC`}),
                    (0, $.jsx)(`div`, {className:`le-footer-payment`,children:`VERVE`})]
                }), (0, $.jsxs)(`div`, {
                    className: `le-footer-socials`,
                    children: [(0, $.jsx)(`a`, {
                        href: `https://wa.me/2347060408151`,
                        target: `_blank`,
                        rel: `noopener noreferrer`,
                        className: `le-footer-social`,
                        title: `WhatsApp`,
                        children: (0, $.jsx)(`svg`, {
                            width: `18`,
                            height: `18`,
                            viewBox: `0 0 24 24`,
                            fill: `currentColor`,
                            children: (0, $.jsx)(`path`, {
                                d: `M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z`
                            })
                        })
                    }), (0, $.jsx)(`a`, {
                        href: `https://www.instagram.com/lebylami?igsh=MWc0bXVpaHVnMzJzdw==`,
                        target: `_blank`,
                        rel: `noopener noreferrer`,
                        className: `le-footer-social`,
                        title: `Instagram`,
                        children: (0, $.jsxs)(`svg`, {
                            width: `18`,
                            height: `18`,
                            viewBox: `0 0 24 24`,
                            fill: `none`,
                            stroke: `currentColor`,
                            strokeWidth: `2`,
                            strokeLinecap: `round`,
                            strokeLinejoin: `round`,
                            children: [(0, $.jsx)(`rect`, {
                                x: `2`,
                                y: `2`,
                                width: `20`,
                                height: `20`,
                                rx: `5`,
                                ry: `5`
                            }), (0, $.jsx)(`path`, {
                                d: `M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z`
                            }), (0, $.jsx)(`line`, {
                                x1: `17.5`,
                                y1: `6.5`,
                                x2: `17.51`,
                                y2: `6.5`
                            })]
                        })
                    }), (0, $.jsx)(`a`, {
                        href: `https://www.tiktok.com/@lami_hammed?_r=1&_t=ZS-94iMPJId0x2`,
                        target: `_blank`,
                        rel: `noopener noreferrer`,
                        className: `le-footer-social`,
                        title: `TikTok`,
                        children: (0, $.jsx)(`svg`, {
                            width: `18`,
                            height: `18`,
                            viewBox: `0 0 24 24`,
                            fill: `currentColor`,
                            children: (0, $.jsx)(`path`, {
                                d: `M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.17v-3.45a4.85 4.85 0 01-2.99-1.04V6.69h2.99z`
                            })
                        })
                    })]
                })]
            })]
        }), (0, $.jsx)(`a`, {
            href: `https://wa.me/2347060408151`,
            target: `_blank`,
            rel: `noopener noreferrer`,
            className: `le-wa-float`,
            title: `Chat on WhatsApp`,
            children: (0, $.jsx)(`svg`, {
                viewBox: `0 0 24 24`,
                xmlns: `http://www.w3.org/2000/svg`,
                children: (0, $.jsx)(`path`, {
                    d: `M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z`
                })
            })
        })]
    })
}

function Um() {
    return (0, $.jsx)(Hm, {})
}
window.storage || (window.storage = {
    get: async e => {
        let t = localStorage.getItem(e);
        return t === null ? null : {
            value: t
        }
    },
    set: async (e, t) => {
        localStorage.setItem(e, t)
    }
}), (0, me.createRoot)(document.getElementById(`root`)).render((0, $.jsx)(D.StrictMode, {
    children: (0, $.jsx)(Um, {})
}));
