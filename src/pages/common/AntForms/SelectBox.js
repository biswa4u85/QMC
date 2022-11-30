import React, { useState, useEffect, Fragment } from 'react';
import { Select } from 'antd';

const { Option } = Select;

function selectbox(props) {
    const { data, mode, value, placeholder, onSearch, title, onChange, hindSearch } = props;
    const [newData, setNewData] = useState(value);
    useEffect(() => {
        if (mode && value) {
            let values = []
            for (let item of value) {
                values.push(item._id ? item._id : item)
            }
            setNewData(values)
        } else {
            setNewData(value?._id ? value?._id : value)
        }
    }, [value]);

    return <Fragment>
        <Select
            value={newData}
            mode={mode}
            showSearch={hindSearch ? false : true}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder={placeholder}
            {...props}
        >
            {data ? data.map((item, key) => {
                if (item) {
                    return <Option key={item._id}>{item[title]}</Option>
                }
            }) : null}
        </Select>
    </Fragment>
}

export default selectbox