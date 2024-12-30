import React, { useEffect, useState } from 'react';
import { Table, Tag, Select } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Room = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('Tất cả');
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('oldPeopleData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
      setFilteredData(parsedData);
    }
  }, []);

  const handleRoomChange = (value) => {
    setSelectedRoom(value);
    if (value === 'Tất cả') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.room === value);
      setFilteredData(filtered);
    }
  };
  const handleNavigateToDetail = (record) => {
    navigate(`/oldpeople/${record.key}`, { state: { record } });
  };
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text, record) => (
        <a onClick={() => handleNavigateToDetail(record)}>{text}</a>
      ),
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
      key: 'age',
      width: 100,
    },
    {
      title: 'Điều Dưỡng Chăm Sóc',
      dataIndex: 'nurse',
      key: 'nurse',
      width: 200,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 400,
    },
    {
      title: 'Sức khỏe',
      key: 'health',
      dataIndex: 'health',
      width: 100,
      render: (health) => (
        <Tag color={health === 'Tốt' ? 'success' : 'volcano'} key={health}>
          {health}
        </Tag>
      ),
    },
    {
      title: 'Phòng',
      key: 'room',
      dataIndex: 'room',
      width: 200,
    },
    {
      title: 'Ngày vào',
      key: 'startDate',
      dataIndex: 'startDate',
      render: (startDate) => {
        if (startDate) {
          return moment(startDate).format('YYYY-MM-DD');
        }
        return '';
      },
    },
  ];

  const roomOptions = Array.from(new Set(data.map((item) => item.room))).map(
    (room) => (
      <Option key={room} value={room}>
        {room}
      </Option>
    )
  );

  return (
    <div style={{ margin: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <h2>Danh Sách Người Cao Tuổi Theo Phòng</h2>
        <Select
          value={selectedRoom}
          onChange={handleRoomChange}
          style={{ marginBottom: 16, width: 200 }}>
          <Option value="Tất cả">Hiển thị tất cả</Option>
          {roomOptions}
        </Select>
      </div>
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default Room;
