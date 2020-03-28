import * as React from "react";
import { Form, Input, Button, notification, Row } from "antd";
import { EditableUsersTable } from "./EditableUsersTable";
import { useForm } from "antd/lib/form/util";
import { useState } from "react";
import { SaveOutlined, ReloadOutlined } from "@ant-design/icons";

const mockData = {
  userlistName: "Students",
  users: [
    {
      age: 25,
      name: "John"
    },
    {
      age: 23,
      name: "Marry"
    },
    {
      age: 42,
      name: "Kyle"
    }
  ]
};

export const EditableTableForm = () => {
  const [data, setData] = useState(mockData);
  const [form] = useForm();

  const onFinish = (values: any) => {
    notification.success({
      message: "Submit",
      description: `Received values of form: ${JSON.stringify(values)}`
    });
    setData(values);
  };

  const onReset = () => {
    form.resetFields();
    notification.info({
      message: "Reset",
      description: "Fields reset to original values."
    });
  };

  return (
    <Form
      form={form}
      name="dynamic_form_item"
      onFinish={onFinish}
      initialValues={data}
    >
      <Form.Item name={["userlistName"]} label={"User List Name"}>
        <Input placeholder="Please enter a name" style={{ width: "30%" }} />
      </Form.Item>
      <Form.List name="users">
        {(users, { add, remove }) => (
          <EditableUsersTable
            form={form}
            users={users}
            add={add}
            remove={remove}
          />
        )}
      </Form.List>
      <br />
      <Row>
        <Form.Item>
          <Button type="default" onClick={onReset} icon={<ReloadOutlined />}>
            Reset
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            style={{ marginLeft: 8 }}
          >
            Submit
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};
