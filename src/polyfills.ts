// src/polyfills.ts

// Array.prototype.at polyfill 정의
/* eslint-disable no-extend-native, object-shorthand, no-param-reassign */

if (!Array.prototype.at) {
  Object.defineProperty(Array.prototype, 'at', {
    // eslint-disable-next-line func-names
    value: function (n) {
      n = Math.trunc(n) || 0;
      if (n < 0) n += this.length;
      if (n < 0 || n >= this.length) return undefined;
      return this[n];
    },
    writable: true,
    configurable: true,
  });
}

/* eslint-enable no-extend-native, object-shorthand, no-param-reassign */
export {}; // 이 줄 추가!
