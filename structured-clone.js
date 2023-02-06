// polyfill
const structuredClone = (obj) => {
  let result = {};
  for (key in obj) {
    if (typeof obj[key] === "object") {
      result[key] = structuredClone(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

// tests

const isClone = (obj1, obj2) => {
  for (key in obj1) {
    if (!(key in obj2)) {
      return false;
    }
    if (typeof obj1[key] === "object") {
      if (isClone(obj1[key], obj2[key]) === false) return false;
    } else {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
};

console.log(isClone({ a: 1, b: 2 }, { a: 1, b: 1 })); // false
console.log(isClone({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
console.log(
  isClone({ a: 1, b: 2, c: 3 }, structuredClone({ a: 1, b: 2, c: 3 }))
); // true
console.log(isClone({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })); // true
console.log(
  isClone(
    { a: { b: 1 }, c: 3, d: "rahul" },
    structuredClone({ a: { b: 1 }, c: 3, d: "rahul" })
  )
); // true
