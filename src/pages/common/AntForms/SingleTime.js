import React, { useState, useEffect, Fragment } from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';

const timeFormat = 'HH:mm';

function SingleTime(props) {
    let currentDate = new Date()
    const { value, onChange } = props;
    const [newData, setNewData] = useState();

    useEffect(() => {
        setNewData(value ? moment.utc(value, timeFormat) : moment.utc(new Date(), timeFormat))
    }, [value]);

    const handleDate = e => {
        onChange(e)
    }

    return <Fragment>
        <TimePicker
            value={newData}
            format={timeFormat}
            onChange={e => handleDate(e)}
            disabledDate={d => !d || d.isSameOrBefore(currentDate)}
            placeholder={'Enter date'}
        />
    </Fragment>
}

export default SingleTime