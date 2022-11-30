import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Alert } from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

const StandardTable = (props) => {
  const { columns, onSelectRow, onChange } = props;
  const { selectedRows, data = {}, pageOnChange, rowKey, ...rest } = props;
  const { list = [], pagination, count } = data;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [needTotalList, setNeedTotalList] = useState(initTotalList(columns));
  const [current, setCurrent] = useState(1);


  const handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let newNeedTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }
    setSelectedRowKeys(selectedRowKeys)
    setNeedTotalList(newNeedTotalList)
  };

  const handleTableChange = (pagination, filters, sorter) => {
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  const cleanSelectedKeys = () => {
    handleRowSelectChange([], []);
  };

  const paginationProps = {
    showSizeChanger: false,
    showQuickJumper: false,
    current,
    onChange: (page, pageSize) => {
      pageOnChange(page, pageSize)
      setCurrent(page)
    },
    ...pagination,
    total: count,
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleRowSelectChange,
    getCheckboxProps: record => ({
      disabled: record.disabled,
    }),
  };

  return (
    <div className={styles.standardTable}>
      {/* <div className={styles.tableAlert}>
        {selectedRows && (<Alert
          message={
            <Fragment>
              Choose <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> Item&nbsp;&nbsp;
              {needTotalList.map(item => (
                <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                  {item.title}
                  &nbsp;
                  <span style={{ fontWeight: 600 }}>
                    {item.render ? item.render(item.total) : item.total}
                  </span>
                </span>
              ))}
              <a onClick={cleanSelectedKeys} style={{ marginLeft: 24 }}>
                Empty
              </a>
            </Fragment>
          }
          type="info"
          showIcon
        />)}
      </div> */}
      <Table
        rowKey={rowKey || '_id'}
        locale={{ emptyText: 'No results found' }}
        // rowSelection={selectedRows === false ? false : rowSelection}
        rowSelection={false}
        dataSource={list}
        pagination={paginationProps}
        onChange={handleTableChange}
        {...rest}
      />
    </div>
  );
}

StandardTable.defaultProps = {
  columns: [],
  data: {},
};

StandardTable.propTypes = {
  onSelectRow: PropTypes.func,
  onChange: PropTypes.node,
  selectedRows: PropTypes.node,
  pageOnChange: PropTypes.func,
  columns: PropTypes.array,
  data: PropTypes.object,
  rowKey: PropTypes.node,
  maxHeight: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.number,
};

export default StandardTable;