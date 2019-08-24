const isArray = <(value: any) => boolean>Array.isArray;
const isBoolean = (value: any) => typeof value === 'boolean';
const isNumber = (value: any) => typeof value === 'number' && !isNaN(value) && isFinite(value);
const isObject = (value: any) => value === Object(value);
const isString = (value: any) => typeof value === 'string';

export { isArray, isBoolean, isNumber, isObject, isString };
