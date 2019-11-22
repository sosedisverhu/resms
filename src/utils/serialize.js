import isObject from 'lodash/isObject';
import mapValues from 'lodash/mapValues';

export default function serialize(value) {
  return (isObject(value) ? mapValues(value, serialize) : (value || ''));
}
