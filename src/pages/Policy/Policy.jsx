import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Form, Input, Select, Row, Col, DatePicker, Button, message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { createStudent } from '@/services/students/api';
import styles from './Policy.less';

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
              label="Số tuổi tối thiểu"
              rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col md={24} lg={1} />
          <Col md={24} lg={12}>
            <Form.Item
              name="a"
              label="Số tuổi tối đa"
              rules={[
                { required: true, message: 'Vui lòng điền thông tin' },
              ]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col md={24} lg={24}>
            <Form.Item
              name="c"
              label="Điểm chuẩn đạt môn"
              rules={[
                { required: true, message: 'Vui lòng điền thông tin' },
              ]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col md={24} lg={11}>
            <Form.Item
              name="d"
              label="Số lượng môn học"
              rules={[
                { required: true, message: 'Vui lòng điền thông tin' },
              ]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col md={24} lg={1} />
          <Col md={24} lg={12}>
            <Form.Item
              name="e"
              label="Tên các môn học"
              extra="Ngăn cách bởi dấu phẩy (,)"
              rules={[
                { required: true, message: 'Vui lòng điền thông tin' },
              ]}>
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24} lg={7}>
            <Form.Item
              name="f"
              label="Sĩ số tối đa của các lớp"
              rules={[
                { required: true, message: 'Vui lòng điền thông tin' },
              ]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col md={24} lg={1} />
          <Col md={24} lg={7}>
            <Form.Item
              name="g"
              label="Số lượng lớp học"
              rules={[
                { required: true, message: 'Vui lòng điền thông tin' },
              ]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col md={24} lg={1} />
          <Col md={24} lg={8}>
            <Form.Item
              name="h"
              label="Tên các lớp"
              extra="Ngăn cách bởi dấu phẩy (,)"
              rules={[
                { required: true, message: 'Vui lòng điền thông tin' },
              ]}>
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Button loading={submitting} type="primary" htmlType="submit" size="large">
          Xong
        </Button>
      </Form>
    </Card>
  );
};
