import { Form, Input, Button, Checkbox, PageHeader, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { accountValidator, passwordValidator } from '../../utils/validators';
import { user, login } from '../../store'
import { useHistory } from 'react-router-dom';

const Login = () => {
  let [form] = useForm()
  let [, loading] = user.use()
  let history = useHistory()
  return (<>
    <PageHeader>登录|Login</PageHeader>
    <Form
      form={form}
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="账号|account"
        name="account"
        rules={[{
          validator: async (_, val) => accountValidator(val)
        }]}
      >
        <Input autoFocus />
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

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>记住我|remember me</Checkbox>
      </Form.Item>

      <Form.Item
        shouldUpdate={true}
      >
        {() => <Button type="primary" disabled={
          form.getFieldsError()
            .filter(({ errors }) => errors.length)
            .length > 0
        }
          onClick={() => {
            let { remember, account, pass } = form.getFieldsValue()
            login(account, pass, {
              remember,
              onSuccess: () => history.push('/'),
              onFail: e => notification.open({
                message: e.toString(),
                placement: 'bottomRight',
                type: 'error'
              })
            })
          }}
          loading={loading}
        >登录|Login</Button>}
      </Form.Item>
    </Form>
  </>);
}

export default Login