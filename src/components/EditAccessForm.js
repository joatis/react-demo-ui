import React from 'react';
import { Button, Form, Input, Select } from 'antd';

class EditAccessForm extends React.Component {

  constructor(props) {
    super(props);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }

  cancelChanges() {
    const { form } = this.props;
    form.resetFields();
  }

  submitChanges() {
    const { form, updateSelectedAccessRecord } = this.props;
    form.validateFields((errors, values) => {
      if (!errors){
        console.log('here too?');
        console.log(values);
        updateSelectedAccessRecord(values);
        form.resetFields(); // need to do this so that the form values change when you select another record
      }
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { readers, selectedAccessRecord } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    const readerOptions = readers.map(reader => {
      return <Select.Option key={reader.id} value={reader.id}>{reader.name}</Select.Option>
    });
    return (
      <Form layout='horizontal'>
              <h2>Access Name</h2>
        <Form.Item {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            rules: [ {required: true} ],
            initialValue: selectedAccessRecord.name
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Description">
          {getFieldDecorator('description', {
            initialValue: selectedAccessRecord.Description
          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Reader(s)">
        {getFieldDecorator('readers', {
          rules: [ {required: true} ],
          initialValue: selectedAccessRecord.readerId || null
        })(
            <Select placeholder="All Reader Groups">
              {readerOptions}
            </Select>
        )}
        </Form.Item>
        <Button type="primary" onClick={(evt) => this.submitChanges()}>Save</Button>
        <Button type="default" onClick={(evt) => this.cancelChanges()}>Cancel</Button>
      </Form>
    );
  }
}
export const WrappedEditAccessForm = Form.create({ name: 'edit-access-form' })(EditAccessForm);