import React, { useState, useEffect, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, TimePicker, Row, Col, message } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD HH:mm';

function DateTime(props) {
    let currentDate = new Date()
    const { value, onChange } = props;
    const [newData, setNewData] = useState();

    useEffect(() => {
        setNewData(value ? moment.utc(value, dateFormat) : moment.utc(new Date(), dateFormat))
    }, [value]);

    const handleDate = e => {
        onChange(e)
    }

    return <Fragment>
        <DatePicker
        showTime
            value={newData}
            format={dateFormat}
            onChange={e => handleDate(e)}
            // disabledDate={d => !d || d.isSameOrBefore(currentDate)}
            placeholder={'Enter date'}
        />
    </Fragment>
}


DateTime.propTypes = {
    value: PropTypes.node,
    onChange: PropTypes.func,
  };

export default DateTime
