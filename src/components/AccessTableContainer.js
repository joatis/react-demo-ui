import React from 'react';
import { Table } from 'antd';
export const AccessTableContainer = (props) => {
  const { accessLevels, readers, readerTypes, spotLightFilter, setSelectedAccessId } = props; 
  // Get a union of the reader/readerType info 
  const readerObjects = readers.map(reader => {
    const rt = readerTypes.find(readerType => (readerType.id === reader.typeId));
    reader.typeName = rt.name;
    return reader;
  });
  // Add the reader Info to the Access Level Records for display
  let accessData = accessLevels.map(al => {
    const reader = readerObjects.find(ro => (ro.id === al.readerId));
    al.readerTypeName = reader.typeName;
    al.readerName = reader.name;
    al.key = al.id;
    return al;
  });
  // Filter out any AccessData that does not match the populated spotLightFilter
  if ( spotLightFilter !== '' ){
    const filterVal = spotLightFilter.toLowerCase();
    accessData = accessData.filter(ad => (
      ad.name.toLowerCase().includes(filterVal) || 
      ad.readerTypeName.toLowerCase().includes(filterVal) || 
      ad.readerName.toLowerCase().includes(filterVal)
    ));
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Reader Type',
      dataIndex: 'readerTypeName',
      key: 'readerTypeName',
    },
    {
      title: 'Reader(s)',
      dataIndex: 'readerName',
      key: 'readerName',
    },
  ];

    return <Table  onRow={(record, rowIndex) => {
      return {
        onClick: event => setSelectedAccessId(record), // click row
      };
    }} 
    dataSource={accessData} 
    columns={columns} 
    pagination={false}/>  
}