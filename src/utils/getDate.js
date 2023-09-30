/**
 * get time of string in milliseconds
 * @param {String} ts
 * @returns {number} duration in milliseconds
 */
function getTime(ts) {
  const time = parseFloat(ts);
  let times = {
    d: 24 * 60 * 60 * 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    s: 1000,
  };

  if (ts.includes("d")) return time * times.d;
  else if (ts.includes("m")) return time * times.m;
  else if (ts.includes("h")) return time * times.h;
  else if (ts.includes("s")) return time * times.s;
  else return parseInt(ts);
}

export default getTime;
