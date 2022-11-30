import React, { useState, useEffect, Fragment } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

function SingleDate(props) {
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
            value={newData}
            format={dateFormat}
            onChange={e => handleDate(e)}
            disabledDate={d => !d || d.isSameOrBefore(currentDate)}
            placeholder={'Enter date'}
        />
    </Fragment>
}

export default SingleDate