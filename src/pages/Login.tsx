import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useLogin } from "../hooks/api/useLogin";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {
  const navigate = useNavigate();
  const mutateAsync = useLogin();

  const handleLogin = (values: any) => {
    mutateAsync(values).then((loginResponse) => {
      console.log("Login Response:", loginResponse);

      if (loginResponse.status === 200) {
        console.log("navigating to /profile");
        navigate("/profile");
      }
    });
  };

  return (
    <>
      <h1>LogIn</h1>
      <Form
        className="form"
        name="loginForm"
        layout="vertical"
        autoComplete="off"
        onFinish={handleLogin}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            placeholder="Name"
            value="denchiosa.chiosa.external+org_owner1@tenera.io"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            value="s3cr3t1212323"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LogInForm;

// setTimeout(() => {
//   setEnabled(true);

//   setTimeout(() => {
//     console.log("Before invalidatePostsQuery");
//     invalidatePostsQuery();
//   }, 5000);
// }, 11000);
// const invalidatePostsQuery = () => {
//   queryClient.invalidateQueries({ queryKey: ["user"] });
// };
