import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Typography, Form, Input, Select, Row, Col, DatePicker, Button, message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { getStudents } from '@/services/students/api';
import { toDateLocal } from '@/utils/UtilDate';

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
      title: 'Ngày sinh',
      dataIndex: 'dayOfBirth',
      key: 'dayOfBirth',
      render: (text) => {
        const timeStamp = new Date(text);
        return <span>{timeStamp.toLocaleDateString('vi-VN')}</span>;
      }
    },
    {
      title: 'Giới tính',
      dataIndex: 'sex',
      key: 'sex',
      render: (text) => <span>{text ? 'Nữ' : 'Nam'}</span>
    },
    {
      title: 'Lớp',
      dataIndex: 'class',
      key: 'class',
      render: (text) => <span>{text ? text : '-'}</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    }
  ];

  return (
    <Card>
      <Table columns={columns} dataSource={students} loading={loading} />
    </Card>
  );
};
