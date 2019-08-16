const isArray = Array.isArray;
const isBoolean = value => value === Boolean(value);
const isNumber = value => value === Number(value);
const isObject = value => value === Object(value);
const isString = value => value === String(value);

export { isArray, isBoolean, isNumber, isObject, isString };
