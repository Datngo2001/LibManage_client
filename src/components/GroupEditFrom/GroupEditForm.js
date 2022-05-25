import { React, useState, useEffect, useContext } from 'react'
import { createGroup, deleteGroup, getGroupById, updateGroup } from '../../api/group';
import { getUsers } from '../../api/user';
import { getPermissions } from '../../api/permission';
import {
    DataGrid,
    Pager,
    Paging,
    Selection,
    FilterRow,
} from 'devextreme-react/data-grid';
import { Popup } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import LoadingContext from '../../context/LoadingContext';

function GroupEditForm(prop) {
    const setLoading = useContext(LoadingContext);
    const [permissions, setPermissions] = useState([])
    const [users, setUsers] = useState([])
    const [inputs, setInputs] = useState({
        id: '',
        name: '',
        createdAt: '',
        permissions: [],
        users: []
    });

    // Get require data
    useEffect(() => {
        debugger
        if (prop.group.id != undefined) {
            getGroupById(prop.group.id).then(res => {
                if (res.message === "OK")
                    setInputs(() => res.data)
            })
        }
        getUsers().then(res => {
            if (res.message === "findAll")
                setUsers(() => res.data)
        })
        getPermissions().then(res => {
            if (res.message === "OK")
                setPermissions(() => res.data)
        })
    }, [prop.group])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handlePermssionsChange = (e) => {
        setInputs(values => ({ ...values, ["permissions"]: e.selectedRowsData }))
    }

    const handleUsersChange = (e) => {
        setInputs(values => ({ ...values, ["users"]: e.selectedRowsData }))
    }

    const handleSave = () => {
        setLoading(true)
        if (prop.group.id == undefined) {
            createGroup({
                name: inputs.name,
                permissionIds: inputs.permissions.map(p => p.id),
                userIds: inputs.users.map(u => u.id),
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        } else {
            updateGroup(inputs.id, {
                name: inputs.name,
                permissionIds: inputs.permissions.map(p => p.id),
                userIds: inputs.users.map(u => u.id),
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        }
    }

    const handleDelete = () => {
        setLoading(true)
        deleteGroup(inputs.id).then(res => {
            prop.onHiding()
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }

    return (
        <Popup visible={prop.visible} onHiding={prop.onHiding}>
            <ScrollView width='100%' height='100%'>
                <div className='py-2'>
                    <div className='d-flex justify-content-between mb-3'>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">Id</label>
                            <input name='id' type="text" className="form-control" id="id" value={inputs.id} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nameInput" className="form-label">Name</label>
                            <input name='name' type="text" className="form-control" id="nameInput" value={inputs.name || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="createdAt" className="form-label">Created At</label>
                            <input name='createdAt' type="text" className="form-control" id="createdAt" value={inputs.createdAt} readOnly />
                        </div>
                    </form>
                    <hr></hr>
                    <h4>Permissions</h4>
                    <DataGrid
                        dataSource={permissions}
                        showBorders={true}
                        selectedRowKeys={inputs.permissions}
                        onSelectionChanged={handlePermssionsChange}>
                        <FilterRow visible={true} />
                        <Selection mode="multiple" />
                        <Pager showPageSizeSelector={true} />
                        <Paging defaultPageSize={8} />
                    </DataGrid>
                    <hr></hr>
                    <h4>Users</h4>
                    <DataGrid
                        dataSource={users}
                        showBorders={true}
                        allowColumnResizing={true}
                        columnAutoWidth={true}
                        selectedRowKeys={inputs.users}
                        onSelectedRowKeysChange={handleUsersChange}>
                        <FilterRow visible={true} />
                        <Selection mode="multiple" />
                        <Pager showPageSizeSelector={true} />
                        <Paging defaultPageSize={8} />
                    </DataGrid>
                </div>
            </ScrollView>
        </Popup>
    )
}

export default GroupEditForm