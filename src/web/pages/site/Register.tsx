import { Form, Input, Button, Modal, PageHeader } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { accountExists, register } from '../../../apis/user';
import { accountValidator, getRangeValidator, passwordValidator } from '../../utils/validators'

const Register = () => {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  return (<>
    <PageHeader>注册|Register</PageHeader>
    <Form
      initialValues={{ remember: true }}
      form={form}
    >
      <Form.Item
        label="账号|account"
        name="account"
        rules={[{
          validator: async (_, val: string) => {
            accountValidator(val)
            if (await accountExists(val)) throw '账号已存在|account exists'
          },
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码|pass"
        name="pass"
        rules={[{
          validator: async (_, val) => passwordValidator(val)
        }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        shouldUpdate={true}
      >
        {() => <Button type="primary" disabled={
          // form.isFieldsTouched(true) ||
          loading || form.getFieldsError()
            .filter(({ errors }) => errors.length)
            .length > 0
        }
          onClick={async () => {
            setLoading(true)
            try {
              await register(form.getFieldsValue())
              setSuccess(true)
            } catch (e) {
              form.validateFields()
            } finally {
              setLoading(false)
            }
          }}
        >注册</Button>}

      </Form.Item>
    </Form>
    <Modal title="恭喜!" visible={success} footer={[
      <Link to='/login'>
        <Button>
          去登录|go to login
        </Button>
      </Link>
    ]}>
      <p>注册成功|Success！</p>
    </Modal>
  </>);
}

export default Register