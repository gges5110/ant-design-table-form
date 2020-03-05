import * as React from "react";
import { Form, Input, Button } from "antd";
import { EditableUsersTable } from "./EditableUsersTable";
import { useForm } from "antd/lib/form/util";

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
  const [form] = useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form
      form={form}
      name="dynamic_form_item"
      onFinish={onFinish}
      initialValues={mockData}
    >
      <Form.Item name={["userlistName"]} label={"User List Name"}>
        <Input placeholder="Please enter a name" />
      </Form.Item>
      <Form.List name="users">
        {(users, { add, remove }) => {
          return (
            <EditableUsersTable
              form={form}
              users={users}
              add={add}
              remove={remove}
            />
          );
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
