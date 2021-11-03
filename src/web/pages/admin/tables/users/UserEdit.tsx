import { Alert, Button, PageHeader, Space, Spin, Form, Input, notification, Checkbox } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { addUser, findUserById, updateUser } from "../../../../../apis/admin/user"
import { accountExists } from "../../../../../apis/user"
import { swr } from '../../../../utils/swr'
import { accountValidator, passwordValidator } from "../../../../utils/validators"

const UserEdit = () => {
  let { id } = useParams() as { id?: string }
  let [loading, value, error] = swr(async () => id ? await findUserById(id) : {})
  let [form] = useForm()
  let [operating, setOperating] = useState(false)
  return <div>
    <PageHeader>{id ? `Edit#${id}` : `Create`}</PageHeader>
    <Space style={{ marginBottom: 16 }}>
      <Link to="/admin/users/list">
        <Button type="link">List</Button>
      </Link>
    </Space>
    {(() => {
      if (loading) return <Spin size="large" />
      if (error) return <Alert type="error" message={error.toString()} />
      return <Form
        initialValues={value}
        form={form}
      >
        <Form.Item
          label="Account"
          name="account"
          rules={id ? [] : [{
            validator: async (_, val) => {
              accountValidator(val)
              if (await accountExists(val)) throw `账号已存在`
            }
          }]}
        >
          <Input disabled={!!id} />
        </Form.Item>

        <Form.Item
          label="Pass"
          name="pass"
          rules={[{
            validator: async (_, val) => passwordValidator(val)
          }]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item name="isAdmin" valuePropName="checked">
          <Checkbox>isAdmin</Checkbox>
        </Form.Item>


        <Form.Item name="disabled" valuePropName="checked">
          <Checkbox>disabled</Checkbox>
        </Form.Item>

        <Form.Item shouldUpdate >
          {() => <Button type="primary" disabled={
            form.getFieldsError()
              .filter(({ errors }) => errors.length)
              .length > 0
          }
            onClick={async () => {
              setOperating(true)
              try {
                if (id) {
                  //更新
                  await updateUser({
                    ...form.getFieldsValue(),
                    id: parseInt(id),
                  })
                } else {
                  //创建
                  await addUser(form.getFieldsValue())
                }
                notification.open({
                  message: 'cuccess',
                  type: 'success',
                  placement: 'bottomRight'
                })
                if (!id) {
                  form.resetFields()
                }
              } catch (e) {
                notification.open({
                  message: 'fail',
                  type: 'error',
                  description: e.toString(),
                  placement: 'bottomRight'
                })
              } finally {
                setOperating(false)
              }
            }}
            loading={operating}
          >{id ? 'update' : 'create'}</Button>}
        </Form.Item>
      </Form>
    })()}
  </div>
}

export default UserEdit