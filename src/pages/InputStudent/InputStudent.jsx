import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Form, Input, Select, Row, Col, DatePicker, Button, message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { createStudent } from '@/services/students/api';
import styles from './InputStudent.less';

export default () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const intl = useIntl();

  const onFinish = (values) => {
    setSubmitting(true);
    const body = { ...values, class: null };
    createStudent(body)
      .then((res) => {
        setSubmitting(false);
        console.log('trandev ~ file: InputStudent.jsx ~ line 25 ~ onFinish ~ res', res);
        message.success('Tiếp nhận học sinh thành công!');
      })
      .catch((err) => {
        setSubmitting(false);
        console.log('trandev ~ file: InputStudent.jsx ~ line 29 ~ onFinish ~ err', err);
        message.error('Tiếp nhận học sinh thất bại!');
      });
  };

  const onFinishFailed = (error) => {
    setSubmitting(false);
    console.log('trandev ~ file: InputStudent.jsx ~ line 24 ~ onFinishFailed ~ error', error);
  };

  return (
    <Card>
      <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row>
          <Col md={24} lg={11}>
            <Form.Item //
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col md={24} lg={1} />
          <Col md={24} lg={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng điền thông tin' },
                { type: 'email', message: 'Email sai định dạng' }
              ]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col md={24} lg={11}>
            <Form.Item name="sex" label="Giới tính" rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}>
              <Select
                size="large"
                options={[
                  { label: 'Nam', value: false },
                  { label: 'Nữ', value: true }
                ]}
              />
            </Form.Item>
          </Col>
          <Col md={24} lg={1} />
          <Col md={24} lg={12}>
            <Form.Item
              extra={'Học sinh phải đủ tuổi từ 15 đến 20'}
              name="dayOfBirth"
              label="Ngày sinh"
              rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}>
              <DatePicker size="large" className="w-100" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}>
          <Input size="large" />
        </Form.Item>

        <Button loading={submitting} type="primary" htmlType="submit" size="large">
          Xong
        </Button>
      </Form>
    </Card>
  );
};
