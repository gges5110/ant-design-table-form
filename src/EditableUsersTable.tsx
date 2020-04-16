import {
  CloseOutlined,
  EditOutlined,
  MinusOutlined,
  PlusOutlined,
  SaveOutlined
} from "@ant-design/icons";
import { Button, Input, InputNumber, Popconfirm, Table } from "antd";
import { FormInstance } from "antd/lib/form/util";
import { FieldData } from "rc-field-form/lib/interface";
import * as React from "react";
import { useState } from "react";
import { EditableFormItem } from "./EditableFormItem";

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
      footer={() => (
        <Button onClick={addUser}>
          <PlusOutlined /> Add User
        </Button>
      )}
    >
      <Column
        dataIndex={"age"}
        title={"Age"}
        width={125}
        render={(value, row, index) => {
          return (
            <EditableFormItem
              name={[index, "age"]}
              editing={index === editingIndex}
              className={"ant-form-item-no-bottom-margin"}
            >
              <InputNumber placeholder="age" min={0} max={150} />
            </EditableFormItem>
          );
        }}
      />
      <Column
        dataIndex={"name"}
        title={"Name"}
        width={200}
        render={(value, row, index) => {
          return (
            <EditableFormItem
              rules={[{ required: true, message: "Name is required" }]}
              name={[index, "name"]}
              editing={index === editingIndex}
              className={"ant-form-item-no-bottom-margin"}
            >
              <Input placeholder="name" />
            </EditableFormItem>
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
                  disabled={editingIndex !== undefined}
                  onClick={() => setEditingIndex(index)}
                />
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => remove(index)}
                >
                  <Button
                    icon={<MinusOutlined />}
                    shape={"circle"}
                    type={"danger"}
                    disabled={editingIndex !== undefined}
                  />
                </Popconfirm>
              </React.Fragment>
            );
          }
        }}
      />
    </Table>
  );
};
