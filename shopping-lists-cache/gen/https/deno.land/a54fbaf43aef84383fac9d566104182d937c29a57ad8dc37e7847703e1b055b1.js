// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/** Check whether binary arrays are equal to each other using 8-bit comparisons.
 * @private
 * @param a first array to check equality
 * @param b second array to check equality
 */ export function equalsNaive(a, b) {
  if (a.length !== b.length) return false;
  for(let i = 0; i < b.length; i++){
    if (a[i] !== b[i]) return false;
  }
  return true;
}
/** Check whether binary arrays are equal to each other using 32-bit comparisons.
 * @private
 * @param a first array to check equality
 * @param b second array to check equality
 */ export function equals32Bit(a, b) {
  if (a.length !== b.length) return false;
  const len = a.length;
  const compressable = Math.floor(len / 4);
  const compressedA = new Uint32Array(a.buffer, 0, compressable);
  const compressedB = new Uint32Array(b.buffer, 0, compressable);
  for(let i = compressable * 4; i < len; i++){
    if (a[i] !== b[i]) return false;
  }
  for(let i = 0; i < compressedA.length; i++){
    if (compressedA[i] !== compressedB[i]) return false;
  }
  return true;
}
/** Check whether binary arrays are equal to each other.
 * @param a first array to check equality
 * @param b second array to check equality
 */ export function equals(a, b) {
  if (a.length < 1000) return equalsNaive(a, b);
  return equals32Bit(a, b);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE2MC4wL2J5dGVzL2VxdWFscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG4vKiogQ2hlY2sgd2hldGhlciBiaW5hcnkgYXJyYXlzIGFyZSBlcXVhbCB0byBlYWNoIG90aGVyIHVzaW5nIDgtYml0IGNvbXBhcmlzb25zLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSBhIGZpcnN0IGFycmF5IHRvIGNoZWNrIGVxdWFsaXR5XG4gKiBAcGFyYW0gYiBzZWNvbmQgYXJyYXkgdG8gY2hlY2sgZXF1YWxpdHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsc05haXZlKGE6IFVpbnQ4QXJyYXksIGI6IFVpbnQ4QXJyYXkpOiBib29sZWFuIHtcbiAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKiogQ2hlY2sgd2hldGhlciBiaW5hcnkgYXJyYXlzIGFyZSBlcXVhbCB0byBlYWNoIG90aGVyIHVzaW5nIDMyLWJpdCBjb21wYXJpc29ucy5cbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gYSBmaXJzdCBhcnJheSB0byBjaGVjayBlcXVhbGl0eVxuICogQHBhcmFtIGIgc2Vjb25kIGFycmF5IHRvIGNoZWNrIGVxdWFsaXR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMzMkJpdChhOiBVaW50OEFycmF5LCBiOiBVaW50OEFycmF5KTogYm9vbGVhbiB7XG4gIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgbGVuID0gYS5sZW5ndGg7XG4gIGNvbnN0IGNvbXByZXNzYWJsZSA9IE1hdGguZmxvb3IobGVuIC8gNCk7XG4gIGNvbnN0IGNvbXByZXNzZWRBID0gbmV3IFVpbnQzMkFycmF5KGEuYnVmZmVyLCAwLCBjb21wcmVzc2FibGUpO1xuICBjb25zdCBjb21wcmVzc2VkQiA9IG5ldyBVaW50MzJBcnJheShiLmJ1ZmZlciwgMCwgY29tcHJlc3NhYmxlKTtcbiAgZm9yIChsZXQgaSA9IGNvbXByZXNzYWJsZSAqIDQ7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wcmVzc2VkQS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjb21wcmVzc2VkQVtpXSAhPT0gY29tcHJlc3NlZEJbaV0pIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqIENoZWNrIHdoZXRoZXIgYmluYXJ5IGFycmF5cyBhcmUgZXF1YWwgdG8gZWFjaCBvdGhlci5cbiAqIEBwYXJhbSBhIGZpcnN0IGFycmF5IHRvIGNoZWNrIGVxdWFsaXR5XG4gKiBAcGFyYW0gYiBzZWNvbmQgYXJyYXkgdG8gY2hlY2sgZXF1YWxpdHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhOiBVaW50OEFycmF5LCBiOiBVaW50OEFycmF5KTogYm9vbGVhbiB7XG4gIGlmIChhLmxlbmd0aCA8IDEwMDApIHJldHVybiBlcXVhbHNOYWl2ZShhLCBiKTtcbiAgcmV0dXJuIGVxdWFsczMyQml0KGEsIGIpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxxQ0FBcUM7QUFFckM7Ozs7Q0FJQyxHQUNELE9BQU8sU0FBUyxZQUFZLENBQWEsRUFBRSxDQUFhO0VBQ3RELElBQUksRUFBRSxNQUFNLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTztFQUNsQyxJQUFLLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSztJQUNqQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPO0VBQzVCO0VBQ0EsT0FBTztBQUNUO0FBRUE7Ozs7Q0FJQyxHQUNELE9BQU8sU0FBUyxZQUFZLENBQWEsRUFBRSxDQUFhO0VBQ3RELElBQUksRUFBRSxNQUFNLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTztFQUNsQyxNQUFNLE1BQU0sRUFBRSxNQUFNO0VBQ3BCLE1BQU0sZUFBZSxLQUFLLEtBQUssQ0FBQyxNQUFNO0VBQ3RDLE1BQU0sY0FBYyxJQUFJLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRztFQUNqRCxNQUFNLGNBQWMsSUFBSSxZQUFZLEVBQUUsTUFBTSxFQUFFLEdBQUc7RUFDakQsSUFBSyxJQUFJLElBQUksZUFBZSxHQUFHLElBQUksS0FBSyxJQUFLO0lBQzNDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU87RUFDNUI7RUFDQSxJQUFLLElBQUksSUFBSSxHQUFHLElBQUksWUFBWSxNQUFNLEVBQUUsSUFBSztJQUMzQyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDLEVBQUUsRUFBRSxPQUFPO0VBQ2hEO0VBQ0EsT0FBTztBQUNUO0FBRUE7OztDQUdDLEdBQ0QsT0FBTyxTQUFTLE9BQU8sQ0FBYSxFQUFFLENBQWE7RUFDakQsSUFBSSxFQUFFLE1BQU0sR0FBRyxNQUFNLE9BQU8sWUFBWSxHQUFHO0VBQzNDLE9BQU8sWUFBWSxHQUFHO0FBQ3hCIn0=