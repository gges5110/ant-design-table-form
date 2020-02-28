import * as React from "react";
import { Form, Input, Button } from "antd";
import { EditableUsersTable } from "./EditableUsersTable";

const mockData = {
  userlistName: "name",
  users: [
    {
      age: 1,
      name: "john"
    },
    {
      age: 2,
      name: "marry"
    }
  ]
};

export const EditableTableForm = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <Form name="dynamic_form_item" onFinish={onFinish} initialValues={mockData}>
      <Form.Item name={["userlistName"]}>
        <Input
          placeholder="user list name"
          style={{ width: "30%", marginRight: 8 }}
        />
      </Form.Item>
      <Form.List name="users">
        {(users, { add, remove }) => {
          return <EditableUsersTable users={users} add={add} remove={remove} />;
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
