import React, { useState, useEffect, useRef, useContext } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Typography, Input, Form, Row, Col, DatePicker, Button, message } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import { getStudents } from '@/services/students/api';
import { toDateLocal } from '@/utils/UtilDate';
import styles from './CloseSubject.less';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className={styles.editableCellValueWrap}
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      editable: true,
    },
    {
      title: 'Sĩ số',
      dataIndex: 'class',
      key: 'class',
      render: (text) => <span>{text ? text : '-'}</span>,
      editable: true,
    },
    {
      title: 'Số lượng đạt',
      dataIndex: 'semester1Score',
      key: 'semester1Score',
      editable: true,
    },
    {
      title: 'Tỷ lệ',
      dataIndex: 'semester2Score',
      key: 'semester2Score',
      render: (text) => <span>{text ? text / 10 : '-'}</span>,
      editable: true,
    }
  ];

  const handleDelete = (key) => {
    const dataSource = [...students];
    setStudents(dataSource.filter((item) => item.key !== key));
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      fullName: `Nguyễn Văn A`,
      class: '100',
      semester1Score: `70`,
      semester2Score: `70%`,
    };
    setStudents([...students, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...students];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setStudents(newData);
  };

  return (
    <Card>
      <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Row>
          <Col md={24} lg={7}>
          <Form.Item //
              name="subject"
              label="Môn"
              rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}>
              <Input size="large" />
            </Form.Item>
            
          </Col>
          <Col md={24} lg={1} />
          <Col md={24} lg={7}>
          <Form.Item //
              name="className"
              label="Học kỳ"
              rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}>
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col md={24} lg={1} />
        </Row>
        <Button
          onClick={() => handleAdd()}
          type="primary"
          style={{
            marginBottom: 16
          }}>
          Thêm dòng
        </Button>
        <Table //
          rowClassName={styles.editableRow}
          components={components}
          columns={columns}
          dataSource={students}
          loading={loading}
        />
        <Button loading={false} type="primary" htmlType="submit" size="large">
          Xong
        </Button>
      </Form>
    </Card>
  );
};
