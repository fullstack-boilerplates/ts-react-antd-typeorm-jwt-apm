import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { FC, ReactNode, useState } from "react"
import { FilterDropdownProps } from "antd/lib/table/interface"

const { Option } = Select

export const getSearchFilterProps = (
  getCandidatesFn: (prifix: string) => Promise<string[]>,
  callback: (str: string) => void | any
): {
  filterDropdown: FC<FilterDropdownProps>,
  filterIcon: (filtered: boolean) => ReactNode
} => {

  return {
    filterDropdown: ({ confirm }) => {
      let [candidates, setCandidates] = useState([] as string[])
      let [current, setCurrent] = useState('')
      let [loading, setLoading] = useState(false)
      return <Select
        style={{ width: 200 }}
        showSearch
        loading={loading}
        onSearch={async val => {
          setCurrent(val)
          setLoading(true)
          setCandidates(await getCandidatesFn(val))
          setLoading(false)
        }}
        onChange={(val: string) => {
          confirm({ closeDropdown: true })
          callback(val)
        }}
      >
        {<Option value={current} key={current}>{current}</Option>}
        {candidates.map(x => x == current ? null : <Option key={x} value={x} >{x}</Option>)}
      </Select>
    },
    filterIcon: (filtered = false) =>
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  }
}