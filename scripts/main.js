"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/index.js
  var dist_exports = {};
  __export(dist_exports, {
    add: () => t2,
    addProp: () => t3,
    allPass: () => t4,
    anyPass: () => t5,
    capitalize: () => t6,
    ceil: () => n6,
    chunk: () => t8,
    clamp: () => t9,
    clone: () => t10,
    concat: () => t11,
    conditional: () => t12,
    constant: () => e4,
    countBy: () => t13,
    debounce: () => e5,
    defaultTo: () => t14,
    difference: () => r5,
    differenceWith: () => n16,
    divide: () => t18,
    doNothing: () => e7,
    drop: () => r7,
    dropFirstBy: () => r10,
    dropLast: () => t22,
    dropLastWhile: () => t23,
    dropWhile: () => t24,
    endsWith: () => t25,
    entries: () => t26,
    evolve: () => t27,
    filter: () => n26,
    find: () => r12,
    findIndex: () => t28,
    findLast: () => t29,
    findLastIndex: () => t30,
    first: () => n30,
    firstBy: () => n31,
    flat: () => n32,
    flatMap: () => t31,
    floor: () => n34,
    forEach: () => t32,
    forEachObj: () => t33,
    fromEntries: () => t34,
    fromKeys: () => t35,
    funnel: () => n38,
    groupBy: () => t37,
    groupByProp: () => t38,
    hasAtLeast: () => t20,
    hasSubObject: () => n42,
    identity: () => e12,
    indexBy: () => t41,
    intersection: () => r20,
    intersectionWith: () => n44,
    invert: () => t42,
    isArray: () => e13,
    isBigInt: () => e14,
    isBoolean: () => e15,
    isDate: () => e16,
    isDeepEqual: () => t39,
    isDefined: () => e17,
    isEmpty: () => e18,
    isEmptyish: () => e19,
    isError: () => e20,
    isFunction: () => e21,
    isIncludedIn: () => e22,
    isNonNull: () => e23,
    isNonNullish: () => e24,
    isNot: () => e25,
    isNullish: () => e26,
    isNumber: () => e27,
    isObjectType: () => e28,
    isPlainObject: () => e29,
    isPromise: () => e30,
    isShallowEqual: () => t43,
    isStrictEqual: () => t44,
    isString: () => e31,
    isSymbol: () => e32,
    isTruthy: () => e33,
    join: () => t45,
    keys: () => t46,
    last: () => t47,
    length: () => t48,
    map: () => t49,
    mapKeys: () => t50,
    mapToObj: () => t51,
    mapValues: () => t52,
    mapWithFeedback: () => t53,
    mean: () => n57,
    meanBy: () => t55,
    median: () => t56,
    merge: () => t57,
    mergeAll: () => e34,
    mergeDeep: () => n61,
    multiply: () => t58,
    nthBy: () => a7,
    objOf: () => t59,
    omit: () => n65,
    omitBy: () => t60,
    once: () => e35,
    only: () => t61,
    partialBind: () => e36,
    partialLastBind: () => e37,
    partition: () => t62,
    pathOr: () => t63,
    pick: () => t64,
    pickBy: () => t65,
    pipe: () => t16,
    piped: () => t66,
    product: () => t67,
    prop: () => e38,
    pullObject: () => t69,
    purry: () => t,
    randomBigInt: () => e39,
    randomInteger: () => e40,
    randomString: () => t71,
    range: () => t72,
    rankBy: () => t73,
    reduce: () => t74,
    reverse: () => t75,
    round: () => n80,
    sample: () => t76,
    set: () => t77,
    setPath: () => t78,
    shuffle: () => t79,
    sliceString: () => e41,
    sort: () => t80,
    sortBy: () => t81,
    sortedIndex: () => n87,
    sortedIndexBy: () => n88,
    sortedIndexWith: () => n89,
    sortedLastIndex: () => n90,
    sortedLastIndexBy: () => n91,
    splice: () => t82,
    split: () => e43,
    splitAt: () => t83,
    splitWhen: () => t84,
    startsWith: () => t85,
    stringToPath: () => t86,
    subtract: () => t87,
    sum: () => t54,
    sumBy: () => t88,
    swapIndices: () => t89,
    swapProps: () => t90,
    take: () => n100,
    takeFirstBy: () => r35,
    takeLast: () => t91,
    takeLastWhile: () => t92,
    takeWhile: () => t93,
    tap: () => t94,
    times: () => t95,
    toCamelCase: () => n106,
    toKebabCase: () => n107,
    toLowerCase: () => t98,
    toSnakeCase: () => n109,
    toTitleCase: () => n110,
    toUpperCase: () => t100,
    truncate: () => e46,
    uncapitalize: () => t102,
    unique: () => n113,
    uniqueBy: () => n114,
    uniqueWith: () => n115,
    values: () => t103,
    when: () => e47,
    zip: () => t105,
    zipWith: () => t106
  });

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/lazyDataLastImpl-DtF3cihj.js
  function e(e48, t107, n118) {
    let r45 = /* @__PURE__ */ __name((n119) => e48(n119, ...t107), "r");
    return n118 === void 0 ? r45 : Object.assign(r45, { lazy: n118, lazyArgs: t107 });
  }
  __name(e, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/purry-GjwKKIlp.js
  function t(t107, n118, r45) {
    let i18 = t107.length - n118.length;
    if (i18 === 0)
      return t107(...n118);
    if (i18 === 1)
      return e(t107, n118, r45);
    throw Error(`Wrong number of arguments`);
  }
  __name(t, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/add.js
  function t2(...t107) {
    return t(n, t107);
  }
  __name(t2, "t");
  var n = /* @__PURE__ */ __name((e48, t107) => e48 + t107, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/addProp.js
  function t3(...t107) {
    return t(n2, t107);
  }
  __name(t3, "t");
  var n2 = /* @__PURE__ */ __name((e48, t107, n118) => ({ ...e48, [t107]: n118 }), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/allPass.js
  function t4(...t107) {
    return t(n3, t107);
  }
  __name(t4, "t");
  var n3 = /* @__PURE__ */ __name((e48, t107) => t107.every((t108) => t108(e48)), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/anyPass.js
  function t5(...t107) {
    return t(n4, t107);
  }
  __name(t5, "t");
  var n4 = /* @__PURE__ */ __name((e48, t107) => t107.some((t108) => t108(e48)), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/capitalize.js
  function t6(...t107) {
    return t(n5, t107);
  }
  __name(t6, "t");
  var n5 = /* @__PURE__ */ __name((e48) => `${e48[0]?.toUpperCase() ?? ``}${e48.slice(1)}`, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/withPrecision-CGLvbgFW.js
  var e2 = /* @__PURE__ */ __name((e48) => (n118, r45) => {
    if (r45 === 0)
      return e48(n118);
    if (!Number.isInteger(r45))
      throw TypeError(`precision must be an integer: ${r45.toString()}`);
    if (r45 > 15 || r45 < -15)
      throw RangeError(`precision must be between -15 and 15`);
    return Number.isNaN(n118) || !Number.isFinite(n118) ? e48(n118) : t7(e48(t7(n118, r45)), -r45);
  }, "e");
  function t7(e48, t107) {
    let [n118, r45] = e48.toString().split(`e`), i18 = `${n118}e${((r45 === void 0 ? 0 : Number.parseInt(r45, 10)) + t107).toString()}`;
    return Number.parseFloat(i18);
  }
  __name(t7, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/ceil.js
  function n6(...n118) {
    return t(e2(Math.ceil), n118);
  }
  __name(n6, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/chunk.js
  function t8(...t107) {
    return t(n7, t107);
  }
  __name(t8, "t");
  function n7(e48, t107) {
    if (t107 < 1)
      throw RangeError(`chunk: A chunk size of '${t107.toString()}' would result in an infinite array`);
    if (e48.length === 0)
      return [];
    if (t107 >= e48.length)
      return [[...e48]];
    let n118 = Math.ceil(e48.length / t107), r45 = Array(n118);
    if (t107 === 1)
      for (let [t108, n119] of e48.entries())
        r45[t108] = [n119];
    else
      for (let i18 = 0; i18 < n118; i18 += 1) {
        let n119 = i18 * t107;
        r45[i18] = e48.slice(n119, n119 + t107);
      }
    return r45;
  }
  __name(n7, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/clamp.js
  function t9(...t107) {
    return t(n8, t107);
  }
  __name(t9, "t");
  var n8 = /* @__PURE__ */ __name((e48, { min: t107, max: n118 }) => t107 !== void 0 && e48 < t107 ? t107 : n118 !== void 0 && e48 > n118 ? n118 : e48, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/clone.js
  function t10(...t107) {
    return t(n9, t107);
  }
  __name(t10, "t");
  function n9(e48, t107 = [], n118 = []) {
    if (typeof e48 == `function`)
      return e48;
    if (typeof e48 != `object` || !e48)
      return structuredClone(e48);
    let a8 = Object.getPrototypeOf(e48);
    if (!Array.isArray(e48) && a8 !== null && a8 !== Object.prototype)
      return structuredClone(e48);
    let o2 = t107.indexOf(e48);
    return o2 === -1 ? (t107.push(e48), Array.isArray(e48) ? i(e48, t107, n118) : r(e48, t107, n118)) : n118[o2];
  }
  __name(n9, "n");
  function r(e48, t107, r45) {
    let i18 = {};
    r45.push(i18);
    for (let [a8, o2] of Object.entries(e48))
      i18[a8] = n9(o2, t107, r45);
    return i18;
  }
  __name(r, "r");
  function i(e48, t107, r45) {
    let i18 = [];
    r45.push(i18);
    for (let [a8, o2] of e48.entries())
      i18[a8] = n9(o2, t107, r45);
    return i18;
  }
  __name(i, "i");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/concat.js
  function t11(...t107) {
    return t(n10, t107);
  }
  __name(t11, "t");
  var n10 = /* @__PURE__ */ __name((e48, t107) => [...e48, ...t107], "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/conditional-CbyGGQT0.js
  function e3(e48, t107, n118) {
    return e48(n118[0]) ? (e49) => t107(e49, ...n118) : t107(...n118);
  }
  __name(e3, "e");
  function t12(...t107) {
    return e3(r2, n11, t107);
  }
  __name(t12, "t");
  function n11(e48, ...t107) {
    for (let n118 of t107) {
      if (typeof n118 == `function`)
        return n118(e48);
      let [t108, r45] = n118;
      if (t108(e48))
        return r45(e48);
    }
    throw Error(`conditional: data failed for all cases`);
  }
  __name(n11, "n");
  function r2(e48) {
    if (!Array.isArray(e48))
      return false;
    let [t107, n118, ...r45] = e48;
    return typeof t107 == `function` && t107.length <= 1 && typeof n118 == `function` && n118.length <= 1 && r45.length === 0;
  }
  __name(r2, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/constant.js
  function e4(e48) {
    return () => e48;
  }
  __name(e4, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/countBy.js
  function t13(...t107) {
    return t(n12, t107);
  }
  __name(t13, "t");
  var n12 = /* @__PURE__ */ __name((e48, t107) => {
    let n118 = /* @__PURE__ */ new Map();
    for (let [r45, i18] of e48.entries()) {
      let a8 = t107(i18, r45, e48);
      if (a8 !== void 0) {
        let e49 = n118.get(a8);
        e49 === void 0 ? n118.set(a8, 1) : n118.set(a8, e49 + 1);
      }
    }
    return Object.fromEntries(n118);
  }, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/debounce.js
  function e5(e48, { waitMs: t107, timing: n118 = `trailing`, maxWaitMs: r45 }) {
    if (r45 !== void 0 && t107 !== void 0 && r45 < t107)
      throw Error(`debounce: maxWaitMs (${r45.toString()}) cannot be less than waitMs (${t107.toString()})`);
    let i18, a8, o2, s, c = /* @__PURE__ */ __name(() => {
      if (a8 !== void 0) {
        let e49 = a8;
        a8 = void 0, clearTimeout(e49);
      }
      if (o2 === void 0)
        throw Error(`REMEDA[debounce]: latestCallArgs was unexpectedly undefined.`);
      let t108 = o2;
      o2 = void 0, s = e48(...t108);
    }, "c"), l = /* @__PURE__ */ __name(() => {
      if (i18 === void 0)
        return;
      let e49 = i18;
      i18 = void 0, clearTimeout(e49), o2 !== void 0 && c();
    }, "l"), u = /* @__PURE__ */ __name((e49) => {
      o2 = e49, r45 !== void 0 && a8 === void 0 && (a8 = setTimeout(c, r45));
    }, "u");
    return { call: (...a9) => {
      if (i18 === void 0)
        n118 === `trailing` ? u(a9) : s = e48(...a9);
      else {
        n118 !== `leading` && u(a9);
        let e49 = i18;
        i18 = void 0, clearTimeout(e49);
      }
      return i18 = setTimeout(l, t107 ?? r45 ?? 0), s;
    }, cancel: () => {
      if (i18 !== void 0) {
        let e49 = i18;
        i18 = void 0, clearTimeout(e49);
      }
      if (a8 !== void 0) {
        let e49 = a8;
        a8 = void 0, clearTimeout(e49);
      }
      o2 = void 0;
    }, flush: () => (l(), s), get isPending() {
      return i18 !== void 0;
    }, get cachedValue() {
      return s;
    } };
  }
  __name(e5, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/defaultTo.js
  function t14(...t107) {
    return t(n13, t107);
  }
  __name(t14, "t");
  var n13 = /* @__PURE__ */ __name((e48, t107) => e48 ?? t107, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/utilityEvaluators-D7O7U3FY.js
  var e6 = { done: true, hasNext: false };
  var t15 = { done: false, hasNext: false };
  var n14 = /* @__PURE__ */ __name(() => e6, "n");
  var r3 = /* @__PURE__ */ __name((e48) => ({ hasNext: true, next: e48, done: false }), "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/pipe-CRsqNjLF.js
  function t16(e48, ...t107) {
    let a8 = e48, o2 = t107.map((e49) => `lazy` in e49 ? r4(e49) : void 0), s = 0;
    for (; s < t107.length; ) {
      if (o2[s] === void 0 || !i2(a8)) {
        let e50 = t107[s];
        a8 = e50(a8), s += 1;
        continue;
      }
      let e49 = [];
      for (let n118 = s; n118 < t107.length; n118++) {
        let t108 = o2[n118];
        if (t108 === void 0 || (e49.push(t108), t108.isSingle))
          break;
      }
      let r45 = [];
      for (let t108 of a8)
        if (n15(t108, r45, e49))
          break;
      let { isSingle: c } = e49.at(-1);
      a8 = c ? r45[0] : r45, s += e49.length;
    }
    return a8;
  }
  __name(t16, "t");
  function n15(t107, r45, i18) {
    if (i18.length === 0)
      return r45.push(t107), false;
    let a8 = t107, o2 = t15, s = false;
    for (let [e48, t108] of i18.entries()) {
      let { index: c, items: l } = t108;
      if (l.push(a8), o2 = t108(a8, c, l), t108.index += 1, o2.hasNext) {
        if (o2.hasMany ?? false) {
          for (let t109 of o2.next)
            if (n15(t109, r45, i18.slice(e48 + 1)))
              return true;
          return s;
        }
        a8 = o2.next;
      }
      if (!o2.hasNext)
        break;
      o2.done && (s = true);
    }
    return o2.hasNext && r45.push(a8), s;
  }
  __name(n15, "n");
  function r4(e48) {
    let { lazy: t107, lazyArgs: n118 } = e48, r45 = t107(...n118);
    return Object.assign(r45, { isSingle: t107.single ?? false, index: 0, items: [] });
  }
  __name(r4, "r");
  function i2(e48) {
    return typeof e48 == `string` || typeof e48 == `object` && !!e48 && Symbol.iterator in e48;
  }
  __name(i2, "i");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/purryFromLazy-C1RBdBlx.js
  function t17(t107, n118) {
    let r45 = n118.length - t107.length;
    if (r45 === 1) {
      let [r46, ...i18] = n118;
      return t16(r46, { lazy: t107, lazyArgs: i18 });
    }
    if (r45 === 0) {
      let r46 = { lazy: t107, lazyArgs: n118 };
      return Object.assign((t108) => t16(t108, r46), r46);
    }
    throw Error(`Wrong number of arguments`);
  }
  __name(t17, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/difference.js
  function r5(...e48) {
    return t17(i3, e48);
  }
  __name(r5, "r");
  function i3(n118) {
    if (n118.length === 0)
      return r3;
    let r45 = /* @__PURE__ */ new Map();
    for (let e48 of n118)
      r45.set(e48, (r45.get(e48) ?? 0) + 1);
    return (e48) => {
      let n119 = r45.get(e48);
      return n119 === void 0 || n119 === 0 ? { done: false, hasNext: true, next: e48 } : (r45.set(e48, n119 - 1), t15);
    };
  }
  __name(i3, "i");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/differenceWith.js
  function n16(...e48) {
    return t17(r6, e48);
  }
  __name(n16, "n");
  var r6 = /* @__PURE__ */ __name((t107, n118) => (r45) => t107.every((e48) => !n118(r45, e48)) ? { done: false, hasNext: true, next: r45 } : t15, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/divide.js
  function t18(...t107) {
    return t(n17, t107);
  }
  __name(t18, "t");
  var n17 = /* @__PURE__ */ __name((e48, t107) => e48 / t107, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/doNothing.js
  function e7() {
    return t19;
  }
  __name(e7, "e");
  function t19(...e48) {
  }
  __name(t19, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/drop.js
  function r7(...t107) {
    return t(i4, t107, a);
  }
  __name(r7, "r");
  var i4 = /* @__PURE__ */ __name((e48, t107) => t107 < 0 ? [...e48] : e48.slice(t107), "i");
  function a(e48) {
    if (e48 <= 0)
      return r3;
    let r45 = e48;
    return (e49) => r45 > 0 ? (--r45, t15) : { done: false, hasNext: true, next: e49 };
  }
  __name(a, "a");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/hasAtLeast-C6VESifI.js
  function t20(...t107) {
    return t(n18, t107);
  }
  __name(t20, "t");
  var n18 = /* @__PURE__ */ __name((e48, t107) => e48.length >= t107, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/swapInPlace-BLjuUtir.js
  function e8(e48, t107, n118) {
    [e48[t107], e48[n118]] = [e48[n118], e48[t107]];
  }
  __name(e8, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/heap-CmRflSHM.js
  function n19(e48, t107) {
    for (let n118 = Math.floor(e48.length / 2) - 1; n118 >= 0; n118--)
      i5(e48, n118, t107);
  }
  __name(n19, "n");
  function r8(t107, n118, r45) {
    if (!t20(t107, 1))
      return;
    let [a8] = t107;
    if (!(n118(r45, a8) >= 0))
      return t107[0] = r45, i5(t107, 0, n118), a8;
  }
  __name(r8, "r");
  function i5(e48, n118, r45) {
    let i18 = n118;
    for (; i18 * 2 + 1 < e48.length; ) {
      let n119 = i18 * 2 + 1, a8 = r45(e48[i18], e48[n119]) < 0 ? n119 : i18, o2 = n119 + 1;
      if (o2 < e48.length && r45(e48[a8], e48[o2]) < 0 && (a8 = o2), a8 === i18)
        return;
      e8(e48, i18, a8), i18 = a8;
    }
  }
  __name(i5, "i");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/purryOrderRules-LBeHSsQr.js
  var e9 = { asc: (e48, t107) => e48 > t107, desc: (e48, t107) => e48 < t107 };
  function t21(e48, t107) {
    let [n118, ...a8] = t107;
    if (!i6(n118))
      return e48(n118, r9(...a8));
    let o2 = r9(n118, ...a8);
    return (t108) => e48(t108, o2);
  }
  __name(t21, "t");
  function n20(e48, [n118, r45, ...a8]) {
    let o2, s;
    return i6(r45) ? (o2 = n118, s = [r45, ...a8]) : (o2 = r45, s = [n118, ...a8]), t21((...t107) => e48(...t107, o2), s);
  }
  __name(n20, "n");
  function r9(t107, n118, ...i18) {
    let a8 = typeof t107 == `function` ? t107 : t107[0], o2 = typeof t107 == `function` ? `asc` : t107[1], { [o2]: s } = e9, c = n118 === void 0 ? void 0 : r9(n118, ...i18);
    return (e48, t108) => {
      let n119 = a8(e48), r45 = a8(t108);
      return s(n119, r45) ? 1 : s(r45, n119) ? -1 : c?.(e48, t108) ?? 0;
    };
  }
  __name(r9, "r");
  function i6(t107) {
    if (a2(t107))
      return true;
    if (typeof t107 != `object` || !Array.isArray(t107))
      return false;
    let [n118, r45, ...i18] = t107;
    return a2(n118) && typeof r45 == `string` && r45 in e9 && i18.length === 0;
  }
  __name(i6, "i");
  var a2 = /* @__PURE__ */ __name((e48) => typeof e48 == `function` && e48.length === 1, "a");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/dropFirstBy.js
  function r10(...e48) {
    return n20(i7, e48);
  }
  __name(r10, "r");
  function i7(n118, r45, i18) {
    if (i18 >= n118.length)
      return [];
    if (i18 <= 0)
      return [...n118];
    let a8 = n118.slice(0, i18);
    n19(a8, r45);
    let o2 = [], s = n118.slice(i18);
    for (let e48 of s) {
      let n119 = r8(a8, r45, e48);
      o2.push(n119 ?? e48);
    }
    return o2;
  }
  __name(i7, "i");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/dropLast.js
  function t22(...t107) {
    return t(n21, t107);
  }
  __name(t22, "t");
  var n21 = /* @__PURE__ */ __name((e48, t107) => t107 > 0 ? e48.slice(0, Math.max(0, e48.length - t107)) : [...e48], "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/dropLastWhile.js
  function t23(...t107) {
    return t(n22, t107);
  }
  __name(t23, "t");
  function n22(e48, t107) {
    for (let n118 = e48.length - 1; n118 >= 0; n118--)
      if (!t107(e48[n118], n118, e48))
        return e48.slice(0, n118 + 1);
    return [];
  }
  __name(n22, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/dropWhile.js
  function t24(...t107) {
    return t(n23, t107);
  }
  __name(t24, "t");
  function n23(e48, t107) {
    for (let [n118, r45] of e48.entries())
      if (!t107(r45, n118, e48))
        return e48.slice(n118);
    return [];
  }
  __name(n23, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/endsWith.js
  function t25(...t107) {
    return t(n24, t107);
  }
  __name(t25, "t");
  var n24 = /* @__PURE__ */ __name((e48, t107) => e48.endsWith(t107), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/entries.js
  function t26(...t107) {
    return t(Object.entries, t107);
  }
  __name(t26, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/evolve.js
  function t27(...t107) {
    return t(n25, t107);
  }
  __name(t27, "t");
  function n25(e48, t107) {
    if (typeof e48 != `object` || !e48)
      return e48;
    let r45 = { ...e48 };
    for (let [e49, i18] of Object.entries(t107))
      e49 in r45 && (r45[e49] = typeof i18 == `function` ? i18(r45[e49]) : n25(r45[e49], i18));
    return r45;
  }
  __name(n25, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/filter.js
  function n26(...t107) {
    return t(r11, t107, i8);
  }
  __name(n26, "n");
  var r11 = /* @__PURE__ */ __name((e48, t107) => e48.filter(t107), "r");
  var i8 = /* @__PURE__ */ __name((e48) => (n118, r45, i18) => e48(n118, r45, i18) ? { done: false, hasNext: true, next: n118 } : t15, "i");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/toSingle-CGZ0h6zD.js
  var e10 = /* @__PURE__ */ __name((e48) => Object.assign(e48, { single: true }), "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/find.js
  function r12(...t107) {
    return t(i9, t107, e10(a3));
  }
  __name(r12, "r");
  var i9 = /* @__PURE__ */ __name((e48, t107) => e48.find(t107), "i");
  var a3 = /* @__PURE__ */ __name((e48) => (n118, r45, i18) => e48(n118, r45, i18) ? { done: true, hasNext: true, next: n118 } : t15, "a");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/findIndex.js
  function t28(...t107) {
    return t(n27, t107);
  }
  __name(t28, "t");
  var n27 = /* @__PURE__ */ __name((e48, t107) => e48.findIndex(t107), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/findLast.js
  function t29(...t107) {
    return t(n28, t107);
  }
  __name(t29, "t");
  var n28 = /* @__PURE__ */ __name((e48, t107) => {
    for (let n118 = e48.length - 1; n118 >= 0; n118--) {
      let r45 = e48[n118];
      if (t107(r45, n118, e48))
        return r45;
    }
  }, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/findLastIndex.js
  function t30(...t107) {
    return t(n29, t107);
  }
  __name(t30, "t");
  var n29 = /* @__PURE__ */ __name((e48, t107) => {
    for (let n118 = e48.length - 1; n118 >= 0; n118--)
      if (t107(e48[n118], n118, e48))
        return n118;
    return -1;
  }, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/first.js
  function n30(...n118) {
    return t(r13, n118, e10(i10));
  }
  __name(n30, "n");
  var r13 = /* @__PURE__ */ __name(([e48]) => e48, "r");
  var i10 = /* @__PURE__ */ __name(() => a4, "i");
  var a4 = /* @__PURE__ */ __name((e48) => ({ hasNext: true, next: e48, done: true }), "a");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/firstBy.js
  function n31(...e48) {
    return t21(r14, e48);
  }
  __name(n31, "n");
  function r14(t107, n118) {
    if (!t20(t107, 2))
      return t107[0];
    let [r45] = t107, [, ...i18] = t107;
    for (let e48 of i18)
      n118(e48, r45) < 0 && (r45 = e48);
    return r45;
  }
  __name(r14, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/flat.js
  function n32(t107, n118) {
    return typeof t107 == `object` ? r15(t107, n118) : e(r15, t107 === void 0 ? [] : [t107], i11);
  }
  __name(n32, "n");
  var r15 = /* @__PURE__ */ __name((e48, t107) => t107 === void 0 ? e48.flat() : e48.flat(t107), "r");
  var i11 = /* @__PURE__ */ __name((e48) => e48 === void 0 || e48 === 1 ? a5 : e48 <= 0 ? r3 : (t107) => Array.isArray(t107) ? { next: t107.flat(e48 - 1), hasNext: true, hasMany: true, done: false } : { next: t107, hasNext: true, done: false }, "i");
  var a5 = /* @__PURE__ */ __name((e48) => Array.isArray(e48) ? { next: e48, hasNext: true, hasMany: true, done: false } : { next: e48, hasNext: true, done: false }, "a");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/flatMap.js
  function t31(...t107) {
    return t(n33, t107, r16);
  }
  __name(t31, "t");
  var n33 = /* @__PURE__ */ __name((e48, t107) => e48.flatMap(t107), "n");
  var r16 = /* @__PURE__ */ __name((e48) => (t107, n118, r45) => {
    let i18 = e48(t107, n118, r45);
    return Array.isArray(i18) ? { done: false, hasNext: true, hasMany: true, next: i18 } : { done: false, hasNext: true, next: i18 };
  }, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/floor.js
  function n34(...n118) {
    return t(e2(Math.floor), n118);
  }
  __name(n34, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/forEach.js
  function t32(...t107) {
    return t(n35, t107, r17);
  }
  __name(t32, "t");
  function n35(e48, t107) {
    return e48.forEach(t107), e48;
  }
  __name(n35, "n");
  var r17 = /* @__PURE__ */ __name((e48) => (t107, n118, r45) => (e48(t107, n118, r45), { done: false, hasNext: true, next: t107 }), "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/forEachObj.js
  function t33(...t107) {
    return t(n36, t107);
  }
  __name(t33, "t");
  function n36(e48, t107) {
    for (let [n118, r45] of Object.entries(e48))
      t107(r45, n118, e48);
    return e48;
  }
  __name(n36, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/fromEntries.js
  function t34(...t107) {
    return t(Object.fromEntries, t107);
  }
  __name(t34, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/fromKeys.js
  function t35(...t107) {
    return t(n37, t107);
  }
  __name(t35, "t");
  function n37(e48, t107) {
    let n118 = {};
    for (let [r45, i18] of e48.entries())
      n118[i18] = t107(i18, r45, e48);
    return n118;
  }
  __name(n37, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/funnel.js
  var e11 = Symbol(`funnel/voidReducer`);
  var t36 = /* @__PURE__ */ __name(() => e11, "t");
  function n38(n118, { triggerAt: r45 = `end`, minQuietPeriodMs: i18, maxBurstDurationMs: a8, minGapMs: o2, reducer: s = t36 }) {
    let c, l, u, d, f = /* @__PURE__ */ __name(() => {
      let t107 = u;
      t107 !== void 0 && (u = void 0, t107 === e11 ? n118() : n118(t107), o2 !== void 0 && (l = setTimeout(p, o2)));
    }, "f"), p = /* @__PURE__ */ __name(() => {
      clearTimeout(l), l = void 0, c === void 0 && f();
    }, "p"), m = /* @__PURE__ */ __name(() => {
      clearTimeout(c), c = void 0, d = void 0, l === void 0 && f();
    }, "m");
    return { call: (...e48) => {
      let t107 = c === void 0 && l === void 0;
      if ((r45 !== `start` || t107) && (u = s(u, ...e48)), !(c === void 0 && !t107)) {
        if (i18 !== void 0 || a8 !== void 0 || o2 === void 0) {
          clearTimeout(c);
          let e49 = Date.now();
          d ??= e49;
          let t108 = a8 === void 0 ? i18 ?? 0 : Math.min(i18 ?? a8, Math.max(0, a8 - (e49 - d)));
          c = setTimeout(m, t108);
        }
        r45 !== `end` && t107 && f();
      }
    }, cancel: () => {
      clearTimeout(c), c = void 0, d = void 0, clearTimeout(l), l = void 0, u = void 0;
    }, flush: () => {
      m(), p();
    }, get isIdle() {
      return c === void 0 && l === void 0;
    } };
  }
  __name(n38, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/groupBy.js
  function t37(...t107) {
    return t(n39, t107);
  }
  __name(t37, "t");
  var n39 = /* @__PURE__ */ __name((e48, t107) => {
    let n118 = /* @__PURE__ */ Object.create(null);
    for (let r45 = 0; r45 < e48.length; r45++) {
      let i18 = e48[r45], a8 = t107(i18, r45, e48);
      if (a8 !== void 0) {
        let e49 = n118[a8];
        e49 === void 0 ? n118[a8] = [i18] : e49.push(i18);
      }
    }
    return Object.setPrototypeOf(n118, Object.prototype), n118;
  }, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/groupByProp.js
  function t38(...t107) {
    return t(n40, t107);
  }
  __name(t38, "t");
  function n40(e48, t107) {
    let n118 = /* @__PURE__ */ Object.create(null);
    for (let r45 of e48) {
      let e49 = r45?.[t107];
      if (e49 !== void 0) {
        let t108 = n118[e49];
        t108 === void 0 ? n118[e49] = [r45] : t108.push(r45);
      }
    }
    return Object.setPrototypeOf(n118, Object.prototype), n118;
  }
  __name(n40, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isDeepEqual.js
  function t39(...t107) {
    return t(n41, t107);
  }
  __name(t39, "t");
  function n41(e48, t107) {
    if (e48 === t107 || Object.is(e48, t107))
      return true;
    if (typeof e48 != `object` || typeof t107 != `object` || e48 === null || t107 === null || Object.getPrototypeOf(e48) !== Object.getPrototypeOf(t107))
      return false;
    if (Array.isArray(e48))
      return r18(e48, t107);
    if (e48 instanceof Map)
      return i12(e48, t107);
    if (e48 instanceof Set)
      return a6(e48, t107);
    if (e48 instanceof Date)
      return e48.getTime() === t107.getTime();
    if (e48 instanceof RegExp)
      return e48.toString() === t107.toString();
    if (Object.keys(e48).length !== Object.keys(t107).length)
      return false;
    for (let [r45, i18] of Object.entries(e48))
      if (!(r45 in t107) || !n41(i18, t107[r45]))
        return false;
    return true;
  }
  __name(n41, "n");
  function r18(e48, t107) {
    if (e48.length !== t107.length)
      return false;
    for (let [r45, i18] of e48.entries())
      if (!n41(i18, t107[r45]))
        return false;
    return true;
  }
  __name(r18, "r");
  function i12(e48, t107) {
    if (e48.size !== t107.size)
      return false;
    for (let [r45, i18] of e48.entries())
      if (!t107.has(r45) || !n41(i18, t107.get(r45)))
        return false;
    return true;
  }
  __name(i12, "i");
  function a6(e48, t107) {
    if (e48.size !== t107.size)
      return false;
    let r45 = [...t107];
    for (let t108 of e48) {
      let e49 = false;
      for (let [i18, a8] of r45.entries())
        if (n41(t108, a8)) {
          e49 = true, r45.splice(i18, 1);
          break;
        }
      if (!e49)
        return false;
    }
    return true;
  }
  __name(a6, "a");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/hasSubObject.js
  function n42(...t107) {
    return t(r19, t107);
  }
  __name(n42, "n");
  function r19(e48, n118) {
    for (let [r45, i18] of Object.entries(n118))
      if (!Object.hasOwn(e48, r45) || !t39(i18, e48[r45]))
        return false;
    return true;
  }
  __name(r19, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/identity.js
  function e12() {
    return t40;
  }
  __name(e12, "e");
  var t40 = /* @__PURE__ */ __name((e48) => e48, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/indexBy.js
  function t41(...t107) {
    return t(n43, t107);
  }
  __name(t41, "t");
  function n43(e48, t107) {
    let n118 = {};
    for (let [r45, i18] of e48.entries()) {
      let a8 = t107(i18, r45, e48);
      n118[a8] = i18;
    }
    return n118;
  }
  __name(n43, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/intersection.js
  function r20(...e48) {
    return t17(i13, e48);
  }
  __name(r20, "r");
  function i13(n118) {
    if (n118.length === 0)
      return n14;
    let r45 = /* @__PURE__ */ new Map();
    for (let e48 of n118)
      r45.set(e48, (r45.get(e48) ?? 0) + 1);
    return (e48) => {
      let n119 = r45.get(e48);
      return n119 === void 0 || n119 === 0 ? t15 : (n119 === 1 ? r45.delete(e48) : r45.set(e48, n119 - 1), { hasNext: true, next: e48, done: r45.size === 0 });
    };
  }
  __name(i13, "i");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/intersectionWith.js
  function n44(...e48) {
    return t17(r21, e48);
  }
  __name(n44, "n");
  var r21 = /* @__PURE__ */ __name((t107, n118) => (r45) => t107.some((e48) => n118(r45, e48)) ? { done: false, hasNext: true, next: r45 } : t15, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/invert.js
  function t42(...t107) {
    return t(n45, t107);
  }
  __name(t42, "t");
  function n45(e48) {
    let t107 = {};
    for (let [n118, r45] of Object.entries(e48))
      t107[r45] = n118;
    return t107;
  }
  __name(n45, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isArray.js
  function e13(e48) {
    return Array.isArray(e48);
  }
  __name(e13, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isBigInt.js
  function e14(e48) {
    return typeof e48 == `bigint`;
  }
  __name(e14, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isBoolean.js
  function e15(e48) {
    return typeof e48 == `boolean`;
  }
  __name(e15, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isDate.js
  function e16(e48) {
    return e48 instanceof Date;
  }
  __name(e16, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isDefined.js
  function e17(e48) {
    return e48 !== void 0;
  }
  __name(e17, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isEmpty.js
  function e18(e48) {
    return e48 === `` || e48 === void 0 ? true : Array.isArray(e48) ? e48.length === 0 : Object.keys(e48).length === 0;
  }
  __name(e18, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isEmptyish.js
  function e19(e48) {
    if (e48 == null || e48 === ``)
      return true;
    if (typeof e48 != `object`)
      return false;
    if (`length` in e48 && typeof e48.length == `number`)
      return e48.length === 0;
    if (`size` in e48 && typeof e48.size == `number`)
      return e48.size === 0;
    for (let t107 in e48)
      return false;
    return Object.getOwnPropertySymbols(e48).length === 0;
  }
  __name(e19, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isError.js
  function e20(e48) {
    return e48 instanceof Error;
  }
  __name(e20, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isFunction.js
  var e21 = /* @__PURE__ */ __name((e48) => typeof e48 == `function`, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isIncludedIn.js
  function e22(e48, t107) {
    if (t107 === void 0) {
      let t108 = new Set(e48);
      return (e49) => t108.has(e49);
    }
    return t107.includes(e48);
  }
  __name(e22, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isNonNull.js
  function e23(e48) {
    return e48 !== null;
  }
  __name(e23, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isNonNullish.js
  function e24(e48) {
    return e48 != null;
  }
  __name(e24, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isNot.js
  function e25(e48) {
    return (t107) => !e48(t107);
  }
  __name(e25, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isNullish.js
  function e26(e48) {
    return e48 == null;
  }
  __name(e26, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isNumber.js
  function e27(e48) {
    return typeof e48 == `number` && !Number.isNaN(e48);
  }
  __name(e27, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isObjectType.js
  function e28(e48) {
    return typeof e48 == `object` && !!e48;
  }
  __name(e28, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isPlainObject.js
  function e29(e48) {
    if (typeof e48 != `object` || !e48)
      return false;
    let t107 = Object.getPrototypeOf(e48);
    return t107 === null || t107 === Object.prototype;
  }
  __name(e29, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isPromise.js
  function e30(e48) {
    return e48 instanceof Promise;
  }
  __name(e30, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isShallowEqual.js
  function t43(...t107) {
    return t(n46, t107);
  }
  __name(t43, "t");
  function n46(e48, t107) {
    if (e48 === t107 || Object.is(e48, t107))
      return true;
    if (typeof e48 != `object` || !e48 || typeof t107 != `object` || !t107)
      return false;
    if (e48 instanceof Map && t107 instanceof Map)
      return r22(e48, t107);
    if (e48 instanceof Set && t107 instanceof Set)
      return i14(e48, t107);
    let n118 = Object.keys(e48);
    if (n118.length !== Object.keys(t107).length)
      return false;
    for (let r45 of n118) {
      if (!Object.hasOwn(t107, r45))
        return false;
      let { [r45]: n119 } = e48, { [r45]: i18 } = t107;
      if (n119 !== i18 || !Object.is(n119, i18))
        return false;
    }
    return true;
  }
  __name(n46, "n");
  function r22(e48, t107) {
    if (e48.size !== t107.size)
      return false;
    for (let [n118, r45] of e48) {
      let e49 = t107.get(n118);
      if (r45 !== e49 || !Object.is(r45, e49))
        return false;
    }
    return true;
  }
  __name(r22, "r");
  function i14(e48, t107) {
    if (e48.size !== t107.size)
      return false;
    for (let n118 of e48)
      if (!t107.has(n118))
        return false;
    return true;
  }
  __name(i14, "i");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isStrictEqual.js
  function t44(...t107) {
    return t(n47, t107);
  }
  __name(t44, "t");
  var n47 = /* @__PURE__ */ __name((e48, t107) => e48 === t107 || Object.is(e48, t107), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isString.js
  function e31(e48) {
    return typeof e48 == `string`;
  }
  __name(e31, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isSymbol.js
  function e32(e48) {
    return typeof e48 == `symbol`;
  }
  __name(e32, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/isTruthy.js
  function e33(e48) {
    return !!e48;
  }
  __name(e33, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/join.js
  function t45(...t107) {
    return t(n48, t107);
  }
  __name(t45, "t");
  var n48 = /* @__PURE__ */ __name((e48, t107) => e48.join(t107), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/keys.js
  function t46(...t107) {
    return t(Object.keys, t107);
  }
  __name(t46, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/last.js
  function t47(...t107) {
    return t(n49, t107);
  }
  __name(t47, "t");
  var n49 = /* @__PURE__ */ __name((e48) => e48.at(-1), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/length.js
  function t48(...t107) {
    return t(n50, t107);
  }
  __name(t48, "t");
  var n50 = /* @__PURE__ */ __name((e48) => `length` in e48 ? e48.length : [...e48].length, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/map.js
  function t49(...t107) {
    return t(n51, t107, r23);
  }
  __name(t49, "t");
  var n51 = /* @__PURE__ */ __name((e48, t107) => e48.map(t107), "n");
  var r23 = /* @__PURE__ */ __name((e48) => (t107, n118, r45) => ({ done: false, hasNext: true, next: e48(t107, n118, r45) }), "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/mapKeys.js
  function t50(...t107) {
    return t(n52, t107);
  }
  __name(t50, "t");
  function n52(e48, t107) {
    let n118 = {};
    for (let [r45, i18] of Object.entries(e48)) {
      let a8 = t107(r45, i18, e48);
      n118[a8] = i18;
    }
    return n118;
  }
  __name(n52, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/mapToObj.js
  function t51(...t107) {
    return t(n53, t107);
  }
  __name(t51, "t");
  function n53(e48, t107) {
    let n118 = {};
    for (let [r45, i18] of e48.entries()) {
      let [a8, o2] = t107(i18, r45, e48);
      n118[a8] = o2;
    }
    return n118;
  }
  __name(n53, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/mapValues.js
  function t52(...t107) {
    return t(n54, t107);
  }
  __name(t52, "t");
  function n54(e48, t107) {
    let n118 = {};
    for (let [r45, i18] of Object.entries(e48))
      n118[r45] = t107(i18, r45, e48);
    return n118;
  }
  __name(n54, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/mapWithFeedback.js
  function t53(...t107) {
    return t17(n55, t107);
  }
  __name(t53, "t");
  var n55 = /* @__PURE__ */ __name((e48, t107) => {
    let n118 = t107;
    return (t108, r45, i18) => (n118 = e48(n118, t108, r45, i18), { done: false, hasNext: true, next: n118 });
  }, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/sum.js
  function t54(...t107) {
    return t(n56, t107);
  }
  __name(t54, "t");
  function n56(e48) {
    let t107 = typeof e48[0] == `bigint` ? 0n : 0;
    for (let n118 of e48)
      t107 += n118;
    return t107;
  }
  __name(n56, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/mean.js
  function n57(...t107) {
    return t(r24, t107);
  }
  __name(n57, "n");
  function r24(e48) {
    if (e48.length !== 0)
      return t54(e48) / e48.length;
  }
  __name(r24, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/meanBy.js
  function t55(...t107) {
    return t(n58, t107);
  }
  __name(t55, "t");
  var n58 = /* @__PURE__ */ __name((e48, t107) => {
    if (e48.length === 0)
      return NaN;
    let n118 = 0;
    for (let [r45, i18] of e48.entries())
      n118 += t107(i18, r45, e48);
    return n118 / e48.length;
  }, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/median.js
  function t56(...t107) {
    return t(r25, t107);
  }
  __name(t56, "t");
  var n59 = /* @__PURE__ */ __name((e48, t107) => e48 - t107, "n");
  function r25(e48) {
    if (e48.length === 0)
      return;
    let t107 = [...e48].sort(n59);
    if (t107.length % 2 != 0)
      return t107[(t107.length - 1) / 2];
    let r45 = t107.length / 2;
    return (t107[r45] + t107[r45 - 1]) / 2;
  }
  __name(r25, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/merge.js
  function t57(...t107) {
    return t(n60, t107);
  }
  __name(t57, "t");
  var n60 = /* @__PURE__ */ __name((e48, t107) => ({ ...e48, ...t107 }), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/mergeAll.js
  function e34(e48) {
    let t107 = {};
    for (let n118 of e48)
      t107 = { ...t107, ...n118 };
    return t107;
  }
  __name(e34, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/mergeDeep.js
  function n61(...t107) {
    return t(r26, t107);
  }
  __name(n61, "n");
  function r26(e48, n118) {
    let i18 = { ...e48, ...n118 };
    for (let a8 in n118) {
      if (!(a8 in e48))
        continue;
      let { [a8]: o2 } = e48;
      if (!e29(o2))
        continue;
      let { [a8]: s } = n118;
      e29(s) && (i18[a8] = r26(o2, s));
    }
    return i18;
  }
  __name(r26, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/multiply.js
  function t58(...t107) {
    return t(n62, t107);
  }
  __name(t58, "t");
  var n62 = /* @__PURE__ */ __name((e48, t107) => e48 * t107, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/nthBy-BAdA7NIc.js
  var n63 = /* @__PURE__ */ __name((e48, t107, n118) => t107 < 0 || t107 >= e48.length ? void 0 : r27([...e48], 0, e48.length - 1, t107, n118), "n");
  function r27(e48, t107, n118, a8, o2) {
    if (t107 === n118)
      return e48[t107];
    let s = i15(e48, t107, n118, o2);
    return a8 === s ? e48[a8] : r27(e48, a8 < s ? t107 : s + 1, a8 < s ? s - 1 : n118, a8, o2);
  }
  __name(r27, "r");
  function i15(t107, n118, r45, i18) {
    let a8 = t107[r45], o2 = n118;
    for (let s = n118; s < r45; s++)
      i18(t107[s], a8) < 0 && (e8(t107, o2, s), o2 += 1);
    return e8(t107, o2, r45), o2;
  }
  __name(i15, "i");
  function a7(...e48) {
    return n20(o, e48);
  }
  __name(a7, "a");
  var o = /* @__PURE__ */ __name((e48, t107, r45) => n63(e48, r45 >= 0 ? r45 : e48.length + r45, t107), "o");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/objOf.js
  function t59(...t107) {
    return t(n64, t107);
  }
  __name(t59, "t");
  var n64 = /* @__PURE__ */ __name((e48, t107) => ({ [t107]: e48 }), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/omit.js
  function n65(...t107) {
    return t(r28, t107);
  }
  __name(n65, "n");
  function r28(e48, n118) {
    if (!t20(n118, 1))
      return { ...e48 };
    if (!t20(n118, 2)) {
      let { [n118[0]]: t107, ...r46 } = e48;
      return r46;
    }
    let r45 = { ...e48 };
    for (let e49 of n118)
      delete r45[e49];
    return r45;
  }
  __name(r28, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/omitBy.js
  function t60(...t107) {
    return t(n66, t107);
  }
  __name(t60, "t");
  function n66(e48, t107) {
    let n118 = { ...e48 };
    for (let [r45, i18] of Object.entries(n118))
      t107(i18, r45, e48) && delete n118[r45];
    return n118;
  }
  __name(n66, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/once.js
  function e35(e48) {
    let t107 = false, n118;
    return () => (t107 ||= (n118 = e48(), true), n118);
  }
  __name(e35, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/only.js
  function t61(...t107) {
    return t(n67, t107);
  }
  __name(t61, "t");
  var n67 = /* @__PURE__ */ __name((e48) => e48.length === 1 ? e48[0] : void 0, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/partialBind.js
  function e36(e48, ...t107) {
    return (...n118) => e48(...t107, ...n118);
  }
  __name(e36, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/partialLastBind.js
  function e37(e48, ...t107) {
    return (...n118) => e48(...n118, ...t107);
  }
  __name(e37, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/partition.js
  function t62(...t107) {
    return t(n68, t107);
  }
  __name(t62, "t");
  var n68 = /* @__PURE__ */ __name((e48, t107) => {
    let n118 = [[], []];
    for (let [r45, i18] of e48.entries())
      t107(i18, r45, e48) ? n118[0].push(i18) : n118[1].push(i18);
    return n118;
  }, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/pathOr.js
  function t63(...t107) {
    return t(n69, t107);
  }
  __name(t63, "t");
  function n69(e48, t107, n118) {
    let r45 = e48;
    for (let e49 of t107) {
      if (r45 == null)
        break;
      r45 = r45[e49];
    }
    return r45 ?? n118;
  }
  __name(n69, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/pick.js
  function t64(...t107) {
    return t(n70, t107);
  }
  __name(t64, "t");
  function n70(e48, t107) {
    let n118 = {};
    for (let r45 of t107)
      r45 in e48 && (n118[r45] = e48[r45]);
    return n118;
  }
  __name(n70, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/pickBy.js
  function t65(...t107) {
    return t(n71, t107);
  }
  __name(t65, "t");
  function n71(e48, t107) {
    let n118 = {};
    for (let [r45, i18] of Object.entries(e48))
      t107(i18, r45, e48) && (n118[r45] = i18);
    return n118;
  }
  __name(n71, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/piped.js
  function t66(...t107) {
    return (n118) => t16(n118, ...t107);
  }
  __name(t66, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/product.js
  function t67(...t107) {
    return t(n72, t107);
  }
  __name(t67, "t");
  function n72(e48) {
    let t107 = typeof e48[0] == `bigint` ? 1n : 1;
    for (let n118 of e48)
      t107 *= n118;
    return t107;
  }
  __name(n72, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/prop.js
  function e38(e48, ...n118) {
    return typeof e48 == `string` || typeof e48 == `number` || typeof e48 == `symbol` ? (r45) => t68(r45, e48, ...n118) : t68(e48, ...n118);
  }
  __name(e38, "e");
  function t68(e48, ...t107) {
    let n118 = e48;
    for (let e49 of t107) {
      if (n118 == null)
        return;
      n118 = n118[e49];
    }
    return n118;
  }
  __name(t68, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/pullObject.js
  function t69(...t107) {
    return t(n73, t107);
  }
  __name(t69, "t");
  function n73(e48, t107, n118) {
    let r45 = {};
    for (let [i18, a8] of e48.entries()) {
      let o2 = t107(a8, i18, e48);
      r45[o2] = n118(a8, i18, e48);
    }
    return r45;
  }
  __name(n73, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/randomBigInt.js
  function e39(e48, r45) {
    if (r45 < e48)
      throw RangeError(`randomBigInt: The range [${e48.toString()},${r45.toString()}] is empty.`);
    let i18 = r45 - e48, { length: a8 } = i18.toString(2), o2 = Math.ceil(a8 / 8), s = BigInt(8 - a8 % 8);
    for (; ; ) {
      let r46 = t70(n74(o2)) >> s;
      if (r46 <= i18)
        return r46 + e48;
    }
  }
  __name(e39, "e");
  function t70(e48) {
    let t107 = 0n;
    for (let n118 of e48)
      t107 = (t107 << 8n) + BigInt(n118);
    return t107;
  }
  __name(t70, "t");
  function n74(e48) {
    let t107 = new Uint8Array(e48);
    if (typeof crypto > `u`)
      for (let n118 = 0; n118 < e48; n118 += 1)
        t107[n118] = Math.floor(Math.random() * 256);
    else
      crypto.getRandomValues(t107);
    return t107;
  }
  __name(n74, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/randomInteger.js
  function e40(e48, t107) {
    let n118 = Math.ceil(e48), r45 = Math.floor(t107);
    if (r45 < n118)
      throw RangeError(`randomInteger: The range [${e48.toString()},${t107.toString()}] contains no integer`);
    return Math.floor(Math.random() * (r45 - n118 + 1) + n118);
  }
  __name(e40, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/randomString.js
  function t71(...t107) {
    return t(n75, t107);
  }
  __name(t71, "t");
  function n75(e48) {
    let t107 = [];
    for (let n118 = 0; n118 < e48; n118++) {
      let e49 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`[Math.floor(Math.random() * 62)];
      t107.push(e49);
    }
    return t107.join(``);
  }
  __name(n75, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/range.js
  function t72(...t107) {
    return t(n76, t107);
  }
  __name(t72, "t");
  function n76(e48, t107) {
    let n118 = [];
    for (let r45 = e48; r45 < t107; r45++)
      n118.push(r45);
    return n118;
  }
  __name(n76, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/rankBy.js
  function t73(...t107) {
    return n20(n77, t107);
  }
  __name(t73, "t");
  function n77(e48, t107, n118) {
    let r45 = 0;
    for (let i18 of e48)
      t107(n118, i18) > 0 && (r45 += 1);
    return r45;
  }
  __name(n77, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/reduce.js
  function t74(...t107) {
    return t(n78, t107);
  }
  __name(t74, "t");
  var n78 = /* @__PURE__ */ __name((e48, t107, n118) => e48.reduce(t107, n118), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/reverse.js
  function t75(...t107) {
    return t(n79, t107);
  }
  __name(t75, "t");
  function n79(e48) {
    return [...e48].reverse();
  }
  __name(n79, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/round.js
  function n80(...n118) {
    return t(e2(Math.round), n118);
  }
  __name(n80, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/sample.js
  function t76(...t107) {
    return t(n81, t107);
  }
  __name(t76, "t");
  function n81(e48, t107) {
    if (t107 <= 0)
      return [];
    if (t107 >= e48.length)
      return [...e48];
    let n118 = Math.min(t107, e48.length - t107), r45 = /* @__PURE__ */ new Set();
    for (; r45.size < n118; ) {
      let t108 = Math.floor(Math.random() * e48.length);
      r45.add(t108);
    }
    return t107 === n118 ? [...r45].sort((e49, t108) => e49 - t108).map((t108) => e48[t108]) : e48.filter((e49, t108) => !r45.has(t108));
  }
  __name(n81, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/set.js
  function t77(...t107) {
    return t(n82, t107);
  }
  __name(t77, "t");
  var n82 = /* @__PURE__ */ __name((e48, t107, n118) => ({ ...e48, [t107]: n118 }), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/setPath.js
  function t78(...t107) {
    return t(n83, t107);
  }
  __name(t78, "t");
  function n83(e48, t107, r45) {
    let [i18, ...a8] = t107;
    if (i18 === void 0)
      return r45;
    if (Array.isArray(e48)) {
      let t108 = [...e48];
      return t108[i18] = n83(e48[i18], a8, r45), t108;
    }
    let { [i18]: o2, ...s } = e48;
    return { ...s, [i18]: n83(o2, a8, r45) };
  }
  __name(n83, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/shuffle.js
  function t79(...t107) {
    return t(n84, t107);
  }
  __name(t79, "t");
  function n84(e48) {
    let t107 = [...e48];
    for (let n118 = 0; n118 < e48.length; n118++) {
      let r45 = n118 + Math.floor(Math.random() * (e48.length - n118)), i18 = t107[r45];
      t107[r45] = t107[n118], t107[n118] = i18;
    }
    return t107;
  }
  __name(n84, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/sliceString.js
  function e41(e48, t107, n118) {
    return typeof e48 == `string` ? e48.slice(t107, n118) : (n119) => n119.slice(e48, t107);
  }
  __name(e41, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/sort.js
  function t80(...t107) {
    return t(n85, t107);
  }
  __name(t80, "t");
  function n85(e48, t107) {
    let n118 = [...e48];
    return n118.sort(t107), n118;
  }
  __name(n85, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/sortBy.js
  function t81(...t107) {
    return t21(n86, t107);
  }
  __name(t81, "t");
  var n86 = /* @__PURE__ */ __name((e48, t107) => [...e48].sort(t107), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/binarySearchCutoffIndex-Bdl6tV2n.js
  function e42(e48, t107) {
    let n118 = 0, r45 = e48.length;
    for (; n118 < r45; ) {
      let i18 = n118 + r45 >>> 1, a8 = e48[i18];
      t107(a8, i18, e48) ? n118 = i18 + 1 : r45 = i18;
    }
    return r45;
  }
  __name(e42, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/sortedIndex.js
  function n87(...t107) {
    return t(r29, t107);
  }
  __name(n87, "n");
  var r29 = /* @__PURE__ */ __name((e48, n118) => e42(e48, (e49) => e49 < n118), "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/sortedIndexBy.js
  function n88(...t107) {
    return t(r30, t107);
  }
  __name(n88, "n");
  function r30(e48, n118, r45) {
    let i18 = r45(n118, void 0, e48);
    return e42(e48, (t107, n119) => r45(t107, n119, e48) < i18);
  }
  __name(r30, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/sortedIndexWith.js
  function n89(...n118) {
    return t(e42, n118);
  }
  __name(n89, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/sortedLastIndex.js
  function n90(...t107) {
    return t(r31, t107);
  }
  __name(n90, "n");
  var r31 = /* @__PURE__ */ __name((e48, n118) => e42(e48, (e49) => e49 <= n118), "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/sortedLastIndexBy.js
  function n91(...t107) {
    return t(r32, t107);
  }
  __name(n91, "n");
  function r32(e48, n118, r45) {
    let i18 = r45(n118, void 0, e48);
    return e42(e48, (t107, n119) => r45(t107, n119, e48) <= i18);
  }
  __name(r32, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/splice.js
  function t82(...t107) {
    return t(n92, t107);
  }
  __name(t82, "t");
  function n92(e48, t107, n118, r45) {
    let i18 = [...e48];
    return i18.splice(t107, n118, ...r45), i18;
  }
  __name(n92, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/split.js
  function e43(e48, t107, n118) {
    return typeof t107 == `number` || t107 === void 0 ? (n119) => n119.split(e48, t107) : e48.split(t107, n118);
  }
  __name(e43, "e");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/splitAt.js
  function t83(...t107) {
    return t(n93, t107);
  }
  __name(t83, "t");
  function n93(e48, t107) {
    let n118 = Math.max(Math.min(t107 < 0 ? e48.length + t107 : t107, e48.length), 0);
    return [e48.slice(0, n118), e48.slice(n118)];
  }
  __name(n93, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/splitWhen.js
  function t84(...t107) {
    return t(n94, t107);
  }
  __name(t84, "t");
  function n94(e48, t107) {
    let n118 = e48.findIndex(t107);
    return n118 === -1 ? [[...e48], []] : [e48.slice(0, n118), e48.slice(n118)];
  }
  __name(n94, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/startsWith.js
  function t85(...t107) {
    return t(n95, t107);
  }
  __name(t85, "t");
  var n95 = /* @__PURE__ */ __name((e48, t107) => e48.startsWith(t107), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/stringToPath.js
  var e44 = /^(?:0|[1-9][0-9]*)$/u;
  function t86(n118) {
    let r45 = [], i18 = /\.{0,4096}(?<propName>[^.[\]]+)|\['(?<quoted>.{0,4096}?)'\]|\["(?<doubleQuoted>.{0,4096}?)"\]|\[(?<unquoted>.{0,4096}?)\]/uy, a8;
    for (; (a8 = i18.exec(n118)) !== null; ) {
      let { propName: n119, quoted: i19, doubleQuoted: o2, unquoted: s } = a8.groups;
      if (s !== void 0) {
        r45.push(...t86(s));
        continue;
      }
      r45.push(n119 === void 0 ? i19 ?? o2 : e44.test(n119) ? Number(n119) : n119);
    }
    return r45;
  }
  __name(t86, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/subtract.js
  function t87(...t107) {
    return t(n96, t107);
  }
  __name(t87, "t");
  var n96 = /* @__PURE__ */ __name((e48, t107) => e48 - t107, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/sumBy.js
  function t88(...t107) {
    return t(n97, t107);
  }
  __name(t88, "t");
  var n97 = /* @__PURE__ */ __name((e48, t107) => {
    let n118 = e48.entries(), r45 = n118.next();
    if (`done` in r45 && r45.done)
      return 0;
    let { value: [, i18] } = r45, a8 = t107(i18, 0, e48);
    for (let [r46, i19] of n118) {
      let n119 = t107(i19, r46, e48);
      a8 += n119;
    }
    return a8;
  }, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/swapIndices.js
  function t89(...t107) {
    return t(n98, t107);
  }
  __name(t89, "t");
  var n98 = /* @__PURE__ */ __name((e48, t107, n118) => typeof e48 == `string` ? r33([...e48], t107, n118).join(``) : r33(e48, t107, n118), "n");
  function r33(e48, t107, n118) {
    let r45 = [...e48];
    if (Number.isNaN(t107) || Number.isNaN(n118))
      return r45;
    let i18 = t107 < 0 ? e48.length + t107 : t107, a8 = n118 < 0 ? e48.length + n118 : n118;
    return i18 < 0 || i18 > e48.length || a8 < 0 || a8 > e48.length ? r45 : (r45[i18] = e48[a8], r45[a8] = e48[i18], r45);
  }
  __name(r33, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/swapProps.js
  function t90(...t107) {
    return t(n99, t107);
  }
  __name(t90, "t");
  function n99(e48, t107, n118) {
    let { [t107]: r45, [n118]: i18 } = e48;
    return { ...e48, [t107]: i18, [n118]: r45 };
  }
  __name(n99, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/take.js
  function n100(...t107) {
    return t(r34, t107, i16);
  }
  __name(n100, "n");
  var r34 = /* @__PURE__ */ __name((e48, t107) => t107 < 0 ? [] : e48.slice(0, t107), "r");
  function i16(e48) {
    if (e48 <= 0)
      return n14;
    let n118 = e48;
    return (e49) => (--n118, { done: n118 <= 0, hasNext: true, next: e49 });
  }
  __name(i16, "i");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/takeFirstBy.js
  function r35(...e48) {
    return n20(i17, e48);
  }
  __name(r35, "r");
  function i17(n118, r45, i18) {
    if (i18 <= 0)
      return [];
    if (i18 >= n118.length)
      return [...n118];
    let a8 = n118.slice(0, i18);
    n19(a8, r45);
    let o2 = n118.slice(i18);
    for (let e48 of o2)
      r8(a8, r45, e48);
    return a8;
  }
  __name(i17, "i");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/takeLast.js
  function t91(...t107) {
    return t(n101, t107);
  }
  __name(t91, "t");
  var n101 = /* @__PURE__ */ __name((e48, t107) => t107 > 0 ? e48.slice(Math.max(0, e48.length - t107)) : [], "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/takeLastWhile.js
  function t92(...t107) {
    return t(n102, t107);
  }
  __name(t92, "t");
  function n102(e48, t107) {
    for (let n118 = e48.length - 1; n118 >= 0; n118--)
      if (!t107(e48[n118], n118, e48))
        return e48.slice(n118 + 1);
    return [...e48];
  }
  __name(n102, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/takeWhile.js
  function t93(...t107) {
    return t(n103, t107);
  }
  __name(t93, "t");
  function n103(e48, t107) {
    let n118 = [];
    for (let [r45, i18] of e48.entries()) {
      if (!t107(i18, r45, e48))
        break;
      n118.push(i18);
    }
    return n118;
  }
  __name(n103, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/tap.js
  function t94(...t107) {
    return t(n104, t107);
  }
  __name(t94, "t");
  function n104(e48, t107) {
    return t107(e48), e48;
  }
  __name(n104, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/times.js
  function t95(...t107) {
    return t(n105, t107);
  }
  __name(t95, "t");
  function n105(e48, t107) {
    if (e48 < 1)
      return [];
    let n118 = Number.isInteger(e48) ? e48 : Math.floor(e48), r45 = Array(n118);
    for (let e49 = 0; e49 < n118; e49++)
      r45[e49] = t107(e49);
    return r45;
  }
  __name(n105, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/words-idA5_J31.js
  var e45 = /* @__PURE__ */ new Set([`-`, `_`, ...`	.
.\v.\f.\r. .\x85.\xA0.\u1680.\u2000.\u2001.\u2002.\u2003.\u2004.\u2005.\u2006.\u2007.\u2008.\u2009.\u200A.\u2028.\u2029.\u202F.\u205F.\u3000.\uFEFF`.split(`.`)]);
  var t96 = /* @__PURE__ */ __name((t107) => {
    let n118 = [], r45 = ``, i18 = /* @__PURE__ */ __name(() => {
      r45.length > 0 && (n118.push(r45), r45 = ``);
    }, "i");
    for (let n119 of t107) {
      if (e45.has(n119)) {
        i18();
        continue;
      }
      if (/[a-z]$/u.test(r45) && /[A-Z]/u.test(n119))
        i18();
      else if (/[A-Z][A-Z]$/u.test(r45) && /[a-z]/u.test(n119)) {
        let e48 = r45.slice(-1);
        r45 = r45.slice(0, -1), i18(), r45 = e48;
      } else
        /\d$/u.test(r45) !== /\d/u.test(n119) && i18();
      r45 += n119;
    }
    return i18(), n118;
  }, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/toCamelCase.js
  var t97 = /[a-z]/u;
  function n106(e48, t107) {
    return typeof e48 == `string` ? r36(e48, t107) : (t108) => r36(t108, e48);
  }
  __name(n106, "n");
  var r36 = /* @__PURE__ */ __name((n118, { preserveConsecutiveUppercase: r45 = true } = {}) => t96(t97.test(n118) ? n118 : n118.toLowerCase()).map((e48, t107) => `${t107 === 0 ? e48[0].toLowerCase() : e48[0].toUpperCase()}${r45 ? e48.slice(1) : e48.slice(1).toLowerCase()}`).join(``), "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/toKebabCase.js
  function n107(...t107) {
    return t(r37, t107);
  }
  __name(n107, "n");
  var r37 = /* @__PURE__ */ __name((e48) => t96(e48).join(`-`).toLowerCase(), "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/toLowerCase.js
  function t98(...t107) {
    return t(n108, t107);
  }
  __name(t98, "t");
  var n108 = /* @__PURE__ */ __name((e48) => e48.toLowerCase(), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/toSnakeCase.js
  function n109(...t107) {
    return t(r38, t107);
  }
  __name(n109, "n");
  var r38 = /* @__PURE__ */ __name((e48) => t96(e48).join(`_`).toLowerCase(), "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/toTitleCase.js
  var t99 = /[a-z]/u;
  function n110(e48, t107) {
    return typeof e48 == `string` ? r39(e48, t107) : (t108) => r39(t108, e48);
  }
  __name(n110, "n");
  var r39 = /* @__PURE__ */ __name((n118, { preserveConsecutiveUppercase: r45 = true } = {}) => t96(t99.test(n118) ? n118 : n118.toLowerCase()).map((e48) => `${e48[0].toUpperCase()}${r45 ? e48.slice(1) : e48.slice(1).toLowerCase()}`).join(` `), "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/toUpperCase.js
  function t100(...t107) {
    return t(n111, t107);
  }
  __name(t100, "t");
  var n111 = /* @__PURE__ */ __name((e48) => e48.toUpperCase(), "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/truncate.js
  function e46(e48, n118, r45) {
    return typeof e48 == `string` ? t101(e48, n118, r45) : (r46) => t101(r46, e48, n118);
  }
  __name(e46, "e");
  function t101(e48, t107, { omission: n118 = `...`, separator: r45 } = {}) {
    if (e48.length <= t107)
      return e48;
    if (t107 <= 0)
      return ``;
    if (t107 < n118.length)
      return n118.slice(0, t107);
    let i18 = t107 - n118.length;
    if (typeof r45 == `string`) {
      let t108 = e48.lastIndexOf(r45, i18);
      t108 !== -1 && (i18 = t108);
    } else if (r45 !== void 0) {
      let t108 = r45.flags.includes(`g`) ? r45 : new RegExp(r45.source, `${r45.flags}g`), n119;
      for (let { index: r46 } of e48.matchAll(t108)) {
        if (r46 > i18)
          break;
        n119 = r46;
      }
      n119 !== void 0 && (i18 = n119);
    }
    return `${e48.slice(0, i18)}${n118}`;
  }
  __name(t101, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/uncapitalize.js
  function t102(...t107) {
    return t(n112, t107);
  }
  __name(t102, "t");
  var n112 = /* @__PURE__ */ __name((e48) => `${e48[0]?.toLowerCase() ?? ``}${e48.slice(1)}`, "n");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/unique.js
  function n113(...e48) {
    return t17(r40, e48);
  }
  __name(n113, "n");
  function r40() {
    let t107 = /* @__PURE__ */ new Set();
    return (n118) => t107.has(n118) ? t15 : (t107.add(n118), { done: false, hasNext: true, next: n118 });
  }
  __name(r40, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/uniqueBy.js
  function n114(...e48) {
    return t17(r41, e48);
  }
  __name(n114, "n");
  function r41(t107) {
    let n118 = t107, r45 = /* @__PURE__ */ new Set();
    return (t108, i18, a8) => {
      let o2 = n118(t108, i18, a8);
      return r45.has(o2) ? t15 : (r45.add(o2), { done: false, hasNext: true, next: t108 });
    };
  }
  __name(r41, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/uniqueWith.js
  function n115(...e48) {
    return t17(r42, e48);
  }
  __name(n115, "n");
  var r42 = /* @__PURE__ */ __name((t107) => (n118, r45, i18) => i18.findIndex((e48, i19) => r45 === i19 || t107(n118, e48)) === r45 ? { done: false, hasNext: true, next: n118 } : t15, "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/values.js
  function t103(...t107) {
    return t(Object.values, t107);
  }
  __name(t103, "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/when.js
  function e47(...e48) {
    return e48.length === 2 ? (n118, ...r45) => t104(n118, ...e48, ...r45) : t104(...e48);
  }
  __name(e47, "e");
  var t104 = /* @__PURE__ */ __name((e48, t107, n118, ...r45) => t107(e48, ...r45) ? typeof n118 == `function` ? n118(e48, ...r45) : n118.onTrue(e48, ...r45) : typeof n118 == `function` ? e48 : n118.onFalse(e48, ...r45), "t");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/zip.js
  function t105(...t107) {
    return t(n116, t107, r43);
  }
  __name(t105, "t");
  var n116 = /* @__PURE__ */ __name((e48, t107) => e48.length < t107.length ? e48.map((e49, n118) => [e49, t107[n118]]) : t107.map((t108, n118) => [e48[n118], t108]), "n");
  var r43 = /* @__PURE__ */ __name((e48) => (t107, n118) => ({ hasNext: true, next: [t107, e48[n118]], done: n118 >= e48.length - 1 }), "r");

  // ../../../../dev/foundry-helpers/node_modules/remeda/dist/zipWith.js
  function t106(t107, i18, a8) {
    return typeof t107 == `function` ? (e48, r45) => n117(e48, r45, t107) : typeof i18 == `function` ? e(n117, [t107, i18], r44) : n117(t107, i18, a8);
  }
  __name(t106, "t");
  function n117(e48, t107, n118) {
    let r45 = [e48, t107];
    return e48.length < t107.length ? e48.map((e49, i18) => n118(e49, t107[i18], i18, r45)) : t107.map((t108, i18) => n118(e48[i18], t108, i18, r45));
  }
  __name(n117, "n");
  var r44 = /* @__PURE__ */ __name((e48, t107) => (n118, r45, i18) => ({ next: t107(n118, e48[r45], r45, [i18, e48]), hasNext: true, done: r45 >= e48.length - 1 }), "r");

  // ../../../../dev/foundry-helpers/dist/_module.js
  var MODULE = class _MODULE {
    static {
      __name(this, "MODULE");
    }
    static #instance;
    static #current;
    #id;
    #globalName;
    constructor(id, globalName) {
      this.#id = id;
      this.#globalName = globalName || id.replace(/^pf2e-/, "").replace(/-(\w)/g, (_, c) => c.toUpperCase());
      this.#initialize();
    }
    static register(id, globalName) {
      if (this.#instance) {
        throw new Error("Module was already registered.");
      }
      this.#instance = new _MODULE(id, globalName);
    }
    static get id() {
      return this.#instance.#id;
    }
    static get current() {
      return this.#current ??= game.modules.get(this.id);
    }
    static path(...path) {
      const tail = dist_exports.join(path, ".");
      return `${this.id}.${tail}`;
    }
    static relativePath(...path) {
      const tail = dist_exports.join(path, "/");
      return `modules/${this.id}/${tail}`;
    }
    static templatePath(...path) {
      const root = this.relativePath("templates", ...path);
      return `${root}.hbs`;
    }
    get id() {
      return this.#id;
    }
    get active() {
      return _MODULE.current.active;
    }
    getSetting(...path) {
      return this.active ? game.settings.get(this.id, dist_exports.join(path, ".")) : void 0;
    }
    localize(...args) {
      return localize(...args);
    }
    #initialize() {
      Hooks.once("init", () => {
        game[this.#globalName] = this;
      });
    }
  };

  // ../../../../dev/foundry-helpers/dist/_system.js
  var SYSTEM = class {
    static {
      __name(this, "SYSTEM");
    }
    static get id() {
      return game.system.id;
    }
    static get isPF2e() {
      return this.id === "pf2e";
    }
    static get isSF2e() {
      return this.id === "sf2e";
    }
    static path(...path) {
      return () => this.relativePath(...path);
    }
    static uuid(pf2e, sf2e) {
      return () => {
        return this.isSF2e ? sf2e : pf2e;
      };
    }
    static relativePath(...path) {
      const tail = dist_exports.join(path, "/");
      return `systems/${this.id}/${tail}`;
    }
    static sluggify(text, options) {
      return game.pf2e.system.sluggify(text, options);
    }
  };

  // ../../../../dev/foundry-helpers/dist/handlebars.js
  function render(...args) {
    const data = args.at(-1);
    const template = args.slice(0, -1).join();
    const path = MODULE.templatePath(template);
    if (dist_exports.isString(data.i18n)) {
      data.i18n = localize.sub(data.i18n);
    } else if (!("i18n" in data)) {
      data.i18n = localize.sub(template.replace(/\//, "."));
    }
    data.isSF2e = SYSTEM.isSF2e;
    data.systemId = SYSTEM.id;
    data.systemPartial = (path2) => SYSTEM.relativePath("templates", path2);
    return foundry.applications.handlebars.renderTemplate(path, data);
  }
  __name(render, "render");

  // ../../../../dev/foundry-helpers/dist/html.js
  function addListener(parent, selectors, ...args) {
    if (!(parent instanceof Element || parent instanceof Document))
      return;
    const element = parent.querySelector(selectors);
    if (!(element instanceof HTMLElement))
      return;
    const event = typeof args[0] === "string" ? args[0] : "click";
    const listener = typeof args[0] === "function" ? args[0] : args[1];
    const useCapture = typeof args[1] === "boolean" ? args[1] : args[2];
    element.addEventListener(event, (e48) => listener(element, e48), useCapture);
  }
  __name(addListener, "addListener");
  function addListenerAll(parent, selectors, ...args) {
    if (!(parent instanceof Element || parent instanceof Document))
      return;
    const elements = parent.querySelectorAll(selectors);
    const event = typeof args[0] === "string" ? args[0] : "click";
    const listener = typeof args[0] === "function" ? args[0] : args[1];
    const useCapture = typeof args[1] === "boolean" ? args[1] : args[2];
    for (const element of elements) {
      if (!(element instanceof HTMLElement))
        continue;
      element.addEventListener(event, (e48) => listener(element, e48), useCapture);
    }
  }
  __name(addListenerAll, "addListenerAll");
  function styleValue(value) {
    return `${value}px`;
  }
  __name(styleValue, "styleValue");
  function setStyleProperty(html, property, value) {
    html?.style.setProperty(property, styleValue(value));
  }
  __name(setStyleProperty, "setStyleProperty");

  // ../../../../dev/foundry-helpers/dist/localize.js
  var Localize = class _Localize extends Function {
    static {
      __name(this, "Localize");
    }
    constructor(...subkeys) {
      super();
      this.subkeys = subkeys;
      const self = this;
      function localize2(...args) {
        const { data, path } = self.getLocalizeData(...args);
        return self.localizeOrFormat(path, data);
      }
      __name(localize2, "localize");
      Object.assign(localize2, this);
      Object.setPrototypeOf(localize2, Object.getPrototypeOf(this));
      return localize2;
    }
    getLocalizeData(...args) {
      const data = dist_exports.isObjectType(args.at(-1)) ? args.pop() : void 0;
      const path = MODULE.path(...this.subkeys, ...args);
      return { path, data };
    }
    ifExist(...args) {
      const { data, path } = this.getLocalizeData(...args);
      if (game.i18n.has(path, true)) {
        return this.localizeOrFormat(path, data);
      }
    }
    sub(...subkeys) {
      return new _Localize(...this.subkeys, ...subkeys);
    }
    root(...args) {
      const data = dist_exports.isObjectType(args.at(-1)) ? args.pop() : void 0;
      const path = MODULE.path(...args);
      return this.localizeOrFormat(path, data);
    }
    tooltip(...args) {
      const tooltip = args.slice(0, -1);
      return `data-tooltip="${tooltip}"`;
    }
    localizeOrFormat(path, data) {
      return typeof data === "object" ? game.i18n.format(path, data) : game.i18n.localize(path);
    }
  };
  var localize = new Localize();

  // ../../../../dev/foundry-helpers/dist/pixi.js
  function subtractPoint(a8, b) {
    return {
      x: a8.x - b.x,
      y: a8.y - b.y
    };
  }
  __name(subtractPoint, "subtractPoint");
  function addPoints(a8, b) {
    return {
      x: a8.x + b.x,
      y: a8.y + b.y
    };
  }
  __name(addPoints, "addPoints");
  function drawRectangleMask(x, y, width, height, radius) {
    const mask = new PIXI.Graphics();
    mask.beginFill(5592405);
    if (radius) {
      mask.drawRoundedRect(x, y, width, height, radius);
    } else {
      mask.drawRect(x, y, width, height);
    }
    mask.endFill();
    return mask;
  }
  __name(drawRectangleMask, "drawRectangleMask");
  function drawCircleMask(x, y, radius) {
    const mask = new PIXI.Graphics();
    mask.beginFill(5592405);
    mask.drawCircle(x, y, radius);
    mask.endFill();
    return mask;
  }
  __name(drawCircleMask, "drawCircleMask");
  function drawPolygonMask(...path) {
    const mask = new PIXI.Graphics();
    mask.lineStyle(0);
    mask.beginFill(5592405);
    for (const [x, y] of path) {
      mask.lineTo(x, y);
    }
    mask.endFill();
    return mask;
  }
  __name(drawPolygonMask, "drawPolygonMask");

  // src/application.ts
  var EditorApplication = class extends PIXI.Application {
    static {
      __name(this, "EditorApplication");
    }
    #avatar;
    #background;
    #border;
    #bottom;
    #bottomMask;
    #editor;
    #hitArea;
    #dragData = {
      avatar: { offset: { x: 0, y: 0 } },
      preview: { offset: { x: 0, y: 0 }, origin: { x: 0, y: 0 } }
    };
    #popout = { value: "disabled", range: this.defaultPopoutRange / 100 };
    #preview;
    #top;
    #topMask;
    constructor() {
      super({
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio
      });
      this.stage.eventMode = "static";
      this.stage.hitArea = this.#hitArea = new PIXI.Rectangle();
    }
    get previewSize() {
      return 300;
    }
    get previewTokenSize() {
      return this.previewSize * 0.85;
    }
    get previewBorderIndex() {
      return 10;
    }
    get borderImage() {
      return MODULE.relativePath("images", "token-001.webp");
    }
    get backgroundImage() {
      return MODULE.relativePath("images", "background.webp");
    }
    get defaultPopoutRange() {
      return 66;
    }
    setAvatar(image) {
      const size = this.previewSize;
      const texture = PIXI.Texture.from(image);
      for (const sprite of [this.#top, this.#bottom]) {
        sprite.texture = texture;
        sprite.position.set(size / 2);
        sprite.scale.set(1);
      }
      this.#bottomMask?.position.set(0);
      this.#topMask?.position.set(0);
      this.#avatar.texture = texture;
      this.#avatar.position.set((this.screen.width - size) / 2);
      this.#avatar.scale.set(1);
      this.#setPreviewMask();
    }
    setPopout(popout) {
      this.#popout.value = popout;
      this.#top.zIndex = dist_exports.isIncludedIn(popout, ["both", "top"]) ? this.previewBorderIndex * 2 : 0;
      this.#bottom.zIndex = dist_exports.isIncludedIn(popout, ["both", "bottom"]) ? this.previewBorderIndex * 2 : 0;
      this.#setPreviewMask();
    }
    setPopoutRange(range) {
      this.#popout.range = range / 100;
      this.#setPreviewMask();
    }
    setBackgroundColor(color) {
      this.#background.tint = color;
    }
    setBorderColor(color) {
      this.#border.tint = color;
    }
    draw() {
      this.#createEditor();
      this.#createPreview();
      this.#hitArea.width = this.screen.width;
      this.#hitArea.height = this.screen.height;
      this.stage.on("pointerdown", this.#onDragLeftStart, this);
    }
    #onDragLeftStart(event) {
      const editorCursor = event.getLocalPosition(this.#editor);
      const previewCursor = event.getLocalPosition(this.#preview);
      this.#dragData = {
        avatar: {
          offset: subtractPoint(editorCursor, this.#avatar)
        },
        preview: {
          offset: subtractPoint(previewCursor, this.#top),
          origin: addPoints(this.#top.position, this.#topMask?.position ?? { x: 0, y: 0 })
        }
      };
      this.stage.on("pointermove", this.#onDragLeftMove, this);
      this.stage.on("pointerup", this.#onDragLeftEnd, this);
      this.stage.on("pointerupoutside", this.#terminateDrag, this);
    }
    #onDragLeftMove(event) {
      const editorCursor = event.getLocalPosition(this.#editor);
      const previewCursor = event.getLocalPosition(this.#preview);
      const avatar = subtractPoint(editorCursor, this.#dragData.avatar.offset);
      const preview = subtractPoint(previewCursor, this.#dragData.preview.offset);
      this.#avatar.position.set(avatar.x, avatar.y);
      this.#top.position.set(preview.x, preview.y);
      this.#bottom.position.set(preview.x, preview.y);
      const inverseOffset = subtractPoint(this.#dragData.preview.origin, preview);
      this.#bottomMask?.position.set(inverseOffset.x, inverseOffset.y);
      this.#topMask?.position.set(inverseOffset.x, inverseOffset.y);
    }
    #onDragLeftEnd(_event) {
      this.#terminateDrag();
    }
    #terminateDrag() {
      this.stage.off("pointermove", this.#onDragLeftMove);
      this.stage.off("pointerup", this.#onDragLeftEnd);
      this.stage.off("pointerupoutside", this.#terminateDrag);
    }
    #setPreviewMask() {
      const topOffset = this.#topMask?.position;
      const bottomOffset = this.#bottomMask?.position;
      if (this.#topMask) {
        this.#top.removeChild(this.#topMask);
        this.#topMask.destroy();
      }
      if (this.#bottomMask) {
        this.#bottom.removeChild(this.#bottomMask);
        this.#bottomMask.destroy();
      }
      const size = this.previewSize;
      const tokenSize = this.previewTokenSize;
      const halfSize = size / 2;
      const tokenHalfSize = tokenSize / 2;
      if (this.#popout.value === "disabled") {
        this.#topMask = drawCircleMask(0, 0, tokenHalfSize);
        this.#bottomMask = drawCircleMask(0, 0, tokenHalfSize);
      } else if (this.#popout.value === "top") {
        this.#topMask = drawRectangleMask(-halfSize, -halfSize, size, size * this.#popout.range);
        this.#bottomMask = drawCircleMask(0, 0, tokenHalfSize);
      } else if (this.#popout.value === "bottom") {
        const offset = size * ((1 - this.#popout.range) / 2);
        this.#topMask = drawCircleMask(0, 0, tokenHalfSize);
        this.#bottomMask = drawRectangleMask(-halfSize, -offset, size, halfSize + offset);
      } else {
        this.#topMask = drawRectangleMask(-halfSize, -halfSize, size, halfSize);
        this.#bottomMask = drawRectangleMask(-halfSize, 0, size, halfSize);
      }
      this.#top.mask = this.#topMask;
      this.#top.addChild(this.#topMask);
      this.#bottom.mask = this.#bottomMask;
      this.#bottom.addChild(this.#bottomMask);
      if (topOffset) {
        this.#topMask.position.set(topOffset.x, topOffset.y);
      }
      if (bottomOffset) {
        this.#bottomMask.position.set(bottomOffset.x, bottomOffset.y);
      }
    }
    #createEditor() {
      const { height, width } = this.screen;
      const size = this.previewSize;
      const editor = this.#editor = new PIXI.Container();
      const avatar = this.#avatar = new PIXI.Sprite();
      const border = new PIXI.Sprite();
      border.alpha = 0.4;
      border.texture = PIXI.Texture.from(this.borderImage);
      for (const sprite of [avatar, border]) {
        sprite.anchor.set(0.5);
        sprite.position.set((width - size) / 2);
        editor.addChild(sprite);
      }
      const mask = drawPolygonMask(
        [0, 0],
        [width, 0],
        [width, height - size],
        [width - size, height - size],
        [width - size, height],
        [0, height]
      );
      editor.mask = mask;
      editor.addChild(mask);
      this.stage.addChild(editor);
    }
    #createPreview() {
      const screen = this.screen;
      const size = this.previewSize;
      const tokenSize = this.previewTokenSize;
      const preview = this.#preview = new PIXI.Container();
      preview.width = size;
      preview.height = size;
      preview.position.set(screen.width - size, screen.height - size);
      const previewMask = drawRectangleMask(0, 0, size, size);
      preview.mask = previewMask;
      preview.addChild(previewMask);
      const background = this.#background = new PIXI.Sprite();
      background.texture = PIXI.Texture.from(this.backgroundImage);
      const backgroundNoise = new PIXI.NoiseFilter(0.1, 0.2);
      background.filters = [backgroundNoise];
      const top = this.#top = new PIXI.Sprite();
      const bottom = this.#bottom = new PIXI.Sprite();
      const border = this.#border = new PIXI.Sprite();
      border.zIndex = this.previewBorderIndex;
      border.texture = PIXI.Texture.from(this.borderImage);
      const borderMask = drawCircleMask(0, 0, tokenSize / 2);
      border.mask = borderMask;
      border.addChild(borderMask);
      for (const sprite of [background, bottom, top, border]) {
        sprite.anchor.set(0.5);
        sprite.position.set(size / 2, size / 2);
        preview.addChild(sprite);
      }
      for (const sprite of [background, border]) {
        sprite.width = tokenSize;
        sprite.height = tokenSize;
      }
      preview.sortableChildren = true;
      this.stage.addChild(preview);
    }
  };

  // src/editor.ts
  var TokenEditor = class _TokenEditor extends foundry.applications.api.ApplicationV2 {
    static {
      __name(this, "TokenEditor");
    }
    #actor;
    #application = new EditorApplication();
    constructor(actor, options = {}) {
      options.id = _TokenEditor.idFromActor(actor);
      super(options);
      this.#actor = actor;
    }
    static idFromActor(actor) {
      return `easy-token-editor-${actor.uuid}`;
    }
    static async open(actor) {
      const id = this.idFromActor(actor);
      const exist = foundry.applications.instances.get(id);
      if (exist) {
        return exist.bringToFront();
      } else {
        return new _TokenEditor(actor).render(true);
      }
    }
    get actor() {
      return this.#actor;
    }
    get title() {
      const label = localize("label");
      return `${label} - ${this.actor.name}`;
    }
    get previewSize() {
      return this.#application.previewSize;
    }
    async _prepareContext(_options) {
      return {
        canBrowse: game.user.can("FILES_BROWSE"),
        isToken: this.actor.isToken,
        popoutRange: this.#application.defaultPopoutRange
      };
    }
    _renderHTML(context, _options) {
      return render("editor", context);
    }
    async _onFirstRender(_context, _options) {
      setStyleProperty(this.element, "--preview-size", this.previewSize);
      requestAnimationFrame(() => {
        const content = this.element.querySelector(".window-content");
        if (!content)
          return;
        content.prepend(this.#application.view);
        this.#application.resizeTo = content;
        this.#application.draw();
      });
    }
    _replaceHTML(result, content, _options) {
      content.innerHTML = result;
      this.#activateListeners(content);
    }
    _onClickAction(_event, target) {
      const action = target.dataset.action;
      switch (action) {
        case "load-avatar": {
          this.#unlockButtons();
          return this.#application.setAvatar(this.actor.img);
        }
        case "open-local": {
          return;
        }
        case "open-server": {
          return;
        }
        case "save-all": {
          return;
        }
        case "save-avatar": {
          return;
        }
        case "save-token": {
          return;
        }
      }
    }
    #unlockButtons() {
      const buttons = this.element.querySelectorAll(".menu button");
      for (const button of buttons) {
        if (button.dataset.action === "open-server")
          continue;
        button.disabled = false;
      }
    }
    #activateListeners(html) {
      addListenerAll(
        html,
        `input[type="color"]`,
        "input",
        foundry.utils.throttle((target) => {
          if (target.name === "background") {
            this.#application.setBackgroundColor(target.value);
          } else if (target.name === "border") {
            this.#application.setBorderColor(target.value);
          }
        }, 50)
      );
      addListener(html, `select[name="popout"]`, "change", (target) => {
        const popout = target.value;
        const input = target.nextElementSibling;
        input.disabled = dist_exports.isIncludedIn(popout, ["disabled", "both"]);
        this.#application.setPopout(popout);
      });
      addListener(html, `input[name="popout-range"]`, "input", (target) => {
        const range = target.valueAsNumber;
        this.#application.setPopoutRange(range);
      });
    }
  };

  // src/main.ts
  MODULE.register("easy-token");
  Hooks.on("getActorSheetHeaderButtons", (sheet, buttons) => {
    if (!game.user.can("FILES_UPLOAD"))
      return;
    buttons.unshift({
      class: "easy-token",
      icon: "fas fa-image",
      label: localize("label"),
      onclick: () => {
        TokenEditor.open(sheet.actor);
      }
    });
  });
  Hooks.on("getHeaderControlsActorSheetV2", (sheet, buttons) => {
    buttons.unshift({
      action: "easy-token",
      icon: "fas fa-image",
      label: localize("label"),
      visible: game.user.can("FILES_UPLOAD"),
      onClick: () => {
        TokenEditor.open(sheet.actor);
      }
    });
  });
})();
//# sourceMappingURL=main.js.map
