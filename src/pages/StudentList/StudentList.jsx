import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Typography, Form, Input, Select, Row, Col, DatePicker, Button, message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { getStudents } from '@/services/students/api';
import { toDateLocal } from '@/utils/UtilDate';
import styles from './StudentList.less';

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
      title: 'Lớp',
      dataIndex: 'class',
      key: 'class',
      render: (text) => <span>{text ? text : '-'}</span>
    },
    {
      title: 'TB học kỳ 1',
      dataIndex: 'semester1Score',
      key: 'semester1Score',
      render: (text) => <span>{text ? text / 10 : '-'}</span>
    },
    {
      title: 'TB học kỳ 2',
      dataIndex: 'semester2Score',
      key: 'semester2Score',
      render: (text) => <span>{text ? text / 10 : '-'}</span>
    }
  ];

  return (
    <Card>
      <Input.Search placeholder="Tìm tên học sinh" size="large" style={{ width: '300px', marginBottom: '16px' }} />
      <Table columns={columns} dataSource={students} loading={loading} />
    </Card>
  );
};
