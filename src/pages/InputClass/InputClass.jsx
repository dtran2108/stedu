import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Typography, Input, Form, Row, Col, DatePicker, Button, message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { getStudents } from '@/services/students/api';
import { toDateLocal } from '@/utils/UtilDate';
import styles from './InputClass.less';

export default () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getStudents()
      .then((res) => {
        setLoading(false);
        setStudents(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log('trandev ~ file: StudentList.jsx ~ line 17 ~ useEffect ~ err', err);
      });
  }, []);

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Giới tính',
      dataIndex: 'sex',
      key: 'sex',
      render: (text) => <span>{text ? 'Nữ' : 'Nam'}</span>
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dayOfBirth',
      key: 'dayOfBirth',
      render: (text) => {
        const timeStamp = new Date(text);
        return <span>{timeStamp.toLocaleDateString('vi-VN')}</span>;
      }
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    }
  ];

  return (
    <Card>
      <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Row>
          <Col md={24} lg={11}>
            <Form.Item //
              name="className"
              label="Lớp"
              rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col md={24} lg={1} />
          <Col md={24} lg={12}>
            <Form.Item //
              name="studentCount"
              label="Sỉ số"
              rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}>
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Typography.Title level={5}>Chọn học sinh</Typography.Title>
        <Table rowSelection={{ type: 'checkbox' }} columns={columns} dataSource={students} loading={loading} />
        <Button loading={false} type="primary" htmlType="submit" size="large">
          Xong
        </Button>
      </Form>
    </Card>
  );
};
