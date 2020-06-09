/**
 * @function range
 *
 * @param {number} from - Range start value
 * @param {number} to - Range end value
 * @param {number} [step] - Number to increment each loop count by
 * @returns {Array.<number>} - An array of numbers from `from` to `to`
 */
export function range(from, to, step = 1) {
  const range = [];
  for (let number = from; number <= to; number += step) range.push(number);
  return range;
}
