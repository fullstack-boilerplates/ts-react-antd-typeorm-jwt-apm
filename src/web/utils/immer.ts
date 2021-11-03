export const immerSetPath = (state: any, pathes: (string | number)[], value: any,
  arrOption: 'none' | 'prepend' | 'append' = "none") => {
  let rtn = { ...state }, t = rtn
  while (pathes.length > 1) {
    let p = pathes.shift()
    if (!t[p]) t[p] = typeof p === 'number' ? [] : {}
    t = t[p]
  }
  let p = pathes.shift()
  t[p] = arrOption === 'none'
    ? value
    : arrOption === 'prepend'
      ? [value, ...(t[p] || [])]
      : [...(t[p] || []), value]
  return rtn
}