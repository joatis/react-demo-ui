import React from 'react';
import { Button, Form, Input, Select } from 'antd';

class EditAccessForm extends React.Component {
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal">
              <h2>Access Name</h2>
        <Form.Item>
          {getFieldDecorator('Name', {

          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('Description', {

          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('Reader(s)', {

          })(
            <Select />
          )}
        </Form.Item>
        <Button type="primary">Save</Button>
        <Button type="default">Cancel</Button>
      </Form>
    );
  }
}
export const WrappedEditAccessForm = Form.create({ name: 'edit-access-form' })(EditAccessForm);