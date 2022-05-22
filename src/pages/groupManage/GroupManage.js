import React, { useEffect, useState } from 'react'
import {
    DataGrid,
    Pager,
    Paging,
    Selection,
    FilterRow,
    SearchPanel
} from 'devextreme-react/data-grid';
import { getGroup } from '../../api/group';

function GroupManage() {
    const [data, setData] = useState({})
    
    useEffect(() => {
        getGroup().then(res => {
            setData(res.data)
        })
    }, [])

    return (
        <div className='m-3'>
            <h4>Group Management</h4>
            <DataGrid dataSource={data} showBorders={true}>
                <FilterRow visible={true} />
                <Selection mode="single" />
                <Pager allowedPageSizes={200} showPageSizeSelector={true} />
                <Paging defaultPageSize={100} />
            </DataGrid>
        </div>
    )
}

export default GroupManage