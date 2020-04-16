import * as React from "react";
import { Form } from "antd";
import { FormItemProps } from "antd/lib/form";

interface EditableFormItemProps extends FormItemProps {
  readonly editing: boolean;
}

export const EditableFormItem: React.FC<EditableFormItemProps> = props => {
  const { editing, ...rest } = props;
  return (
    <Form.Item {...rest}>{editing ? props.children : <Dummy />}</Form.Item>
  );
};

interface DummyProps {
  readonly value?: any;
}

const Dummy: React.FC<DummyProps> = props => (
  <div style={{ paddingLeft: 12 }}>{props.value}</div>
);