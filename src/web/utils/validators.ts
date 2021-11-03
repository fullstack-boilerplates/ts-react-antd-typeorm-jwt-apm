export const getRangeValidator = (min: number, max: number) => (val: string) => {
  if (val.length < min) throw `长度最少${min}位 | min length ${min}`
  if (val.length > max) throw `长度最大${max}位 | max length ${max}`
}

export const accountValidator = (val: string) => {
  getRangeValidator(6, 32)(val)
  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(val)) 
    throw '仅支持字母和数字且首字符不能为数字|only support alphabetic and numbers, and not start with number'
}

export const passwordValidator = (val: string) => {
  getRangeValidator(6, 32)(val)
}