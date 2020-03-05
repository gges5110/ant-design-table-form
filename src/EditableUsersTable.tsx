import { useState } from "react";
import * as React from "react";
import { Form, Input, Button, Table } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  MinusOutlined,
  SaveOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { FieldData } from "rc-field-form/lib/interface";
import { FormInstance } from "antd/lib/form/util";

const { Column } = Table;

interface User {
  name: string;
  age: number;
}

interface EditableUsersTableProps {
  readonly users: FieldData[];
  readonly form: FormInstance;
  readonly add: () => void;
  readonly remove: (index: number) => void;
}

export const EditableUsersTable: React.FC<EditableUsersTableProps> = props => {
  const { users, form, add, remove } = props;
  const [editingIndex, setEditingIndex] = useState<number | undefined>(
    undefined
  );
  const [isNewUser, setNewUser] = useState<boolean>(false);

  const addUser = () => {
    add();
    setEditingIndex(users.length);
    setNewUser(true);
  };

  const onSave = () => {
    form
      .validateFields()
      .then(() => {
        setNewUser(false);
        setEditingIndex(undefined);
      })
      .catch(error => {
        console.log(error.errorFields);
      });
  };

  const onCancel = (index: number) => {
    if (isNewUser) {
      remove(index);
    } else {
      form.resetFields([["users", index, "age"], ["users", index, "name"]]);
    }

    setNewUser(false);
    setEditingIndex(undefined);
  };

  return (
    <Table
      dataSource={users}
      pagination={false}
      footer={() => {
        return (
          <Form.Item>
            <Button onClick={addUser}>
              <PlusOutlined /> Add User
            </Button>
          </Form.Item>
        );
      }}
    >
      <Column
        dataIndex={"age"}
        title={"Age"}
        width={100}
        render={(value, row, index) => {
          return (
            <Form.Item name={[index, "age"]}>
              {index === editingIndex ? <Input placeholder="age" /> : <Dummy />}
            </Form.Item>
          );
        }}
      />
      <Column
        dataIndex={"name"}
        title={"Name"}
        width={200}
        render={(value, row, index) => {
          return (
            <Form.Item
              rules={[{ required: true, message: "Name is required" }]}
              name={[index, "name"]}
            >
              {index === editingIndex ? (
                <Input placeholder="name" />
              ) : (
                <Dummy />
              )}
            </Form.Item>
          );
        }}
      />
      <Column
        title={"Action"}
        render={(value, row, index) => {
          if (index === editingIndex) {
            return (
              <React.Fragment>
                <Button
                  icon={<SaveOutlined />}
                  shape={"circle"}
                  type={"primary"}
                  style={{ marginRight: 8 }}
                  onClick={onSave}
                />
                <Button
                  icon={<CloseOutlined />}
                  shape={"circle"}
                  onClick={() => onCancel(index)}
                />
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment>
                <Button
                  icon={<EditOutlined />}
                  shape={"circle"}
                  style={{ marginRight: 8 }}
                  onClick={() => setEditingIndex(index)}
                />
                <Button
                  icon={<MinusOutlined />}
                  shape={"circle"}
                  type={"danger"}
                  onClick={() => remove(index)}
                />
              </React.Fragment>
            );
          }
        }}
      />
    </Table>
  );
};

interface DummyProps {
  readonly value?: any;
}
const Dummy: React.FC<DummyProps> = props => {
  return <React.Fragment>{props.value}</React.Fragment>;
};
