import { Checkbox, notification, Spin } from "antd"
import { FC, useState } from "react"


export const CellUpdateCheckbox: FC<{ val: boolean, updateFn: (to: boolean) => Promise<any | void> }> = ({ val, updateFn }) => {
  let [value, setValue] = useState(val)
  let [loading, setLoading] = useState(false)
  return <>
    <Checkbox checked={value} disabled={!!loading} onChange={e => {
      setLoading(true)
      updateFn(e.target.checked).then(() => {
        setValue(e.target.checked)
        setLoading(false)
      }).catch(e => notification.error({
        placement: "bottomRight",
        message: e.toString(),
        description: `请刷新页面重试 | please refresh and retry`
      }))
    }} />
    {loading && <Spin size="small" />}
  </>
}