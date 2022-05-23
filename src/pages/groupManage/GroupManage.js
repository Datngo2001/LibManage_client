import React, { useEffect, useState } from 'react'
import {
    DataGrid,
    Pager,
    Paging,
    Selection,
    FilterRow,
} from 'devextreme-react/data-grid';
import { getGroup } from '../../api/group';
import GroupEditForm from '../../components/GroupEditFrom/GroupEditForm';
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';

function GroupManage() {
    const [data, setData] = useState({})
    const [formVisible, setFormVisible] = useState(false)
    const [currentGroup, setCurrentGroup] = useState({})

    // Get require data
    useEffect(() => {
        getGroup().then(res => {
            setData(res.data)
        })
    }, [])

    const showEditForm = (group) => {
        setCurrentGroup(group)
        setFormVisible(true)
    }

    const hideEditForm = () => {
        setCurrentGroup({})
        setFormVisible(false)
    }

    const handleSelection = (e) => {
        let group = e.selectedRowsData[0]
        showEditForm(group)
    }

    const handleAdd = () => {
        setFormVisible(true)
    }

    return (
        <div className='m-3'>
            <h4>Group Management</h4>
            <DataGrid dataSource={data} showBorders={true}
                onSelectionChanged={handleSelection} selectedRowKeys={[]}>
                <FilterRow visible={true} />
                <Selection mode="single" />
                <Pager allowedPageSizes={200} showPageSizeSelector={true} />
                <Paging defaultPageSize={100} />
                <SpeedDialAction
                    icon="add"
                    label="Create Group"
                    index={1}
                    onClick={handleAdd} />
            </DataGrid>
            <GroupEditForm
                visible={formVisible}
                onHiding={hideEditForm}
                group={currentGroup}>
            </GroupEditForm>
        </div>
    )
}

export default GroupManage