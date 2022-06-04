import React, { useEffect, useState, useContext } from 'react'
import {
    DataGrid,
    Pager,
    Paging,
    Selection,
    FilterRow,
    Editing,
    Column,
    Button,
    SearchPanel
} from 'devextreme-react/data-grid';
import { render } from 'react-dom'
import { deleteUser, getUsers } from '../../api/user';
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import UserEditForm from '../../components/UserEditForm/UserEditForm';
import LoadingContext from '../../context/LoadingContext';
import { deleteBookTitle, getBookTitle } from '../../api/bookTitle';
import BookTitleEditForm from '../../components/BookTitleEditForm/BookTitleEditForm';
import BookAddForm from '../../components/AddBookForm/BookAddForm';
function BookManagement() {
    const setLoading = useContext(LoadingContext);
    const [data, setData] = useState({})
    const [formVisible, setFormVisible] = useState(false)
    const [currentBookTitle, setCurrentBookTitle] = useState(undefined)

    // Get require data
    useEffect(() => {
        setLoading(true)
        getBookTitle().then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }, [formVisible])

    const showEditForm = (booktitle) => {
        setCurrentBookTitle(() => booktitle)
        setFormVisible(() => true)
    }

    const hideEditForm = () => {
        setCurrentBookTitle({})
        setFormVisible(false)
    }

    const handleEdit = (e) => {
        let booktitle = e.row.data
        showEditForm(booktitle)
    }

    const   handleAdd = (e) => {
        showEditForm(undefined)
    }

    const handleAddBook = (e) => {
        let addbook = e.row.data
        showEditForm(addbook)
    }

    const handleDelete = (e) => {
        setLoading(true)
        deleteBookTitle(e.data.id).then(res => {
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            e.cancel = true
        })
    }


    // make sure rerender form when state change
    const renderEditForm = () => {
        if (formVisible == false) {
            return (<div></div>)
        } else {
            return (
                <BookTitleEditForm
                    onHiding={hideEditForm}
                    booktitle={currentBookTitle}
                    >
                </BookTitleEditForm>
            )
        }
    }
 
    const renderAddForm = () => {
        if (formVisible == false) {
            return (<div></div>)
        } else {
            return (
                <BookAddForm
                    onHiding={hideEditForm}
                    booktitle={currentBookTitle}
                    >
                </BookAddForm>
            )
        }
    }

    return (
        <div className='m-3'>
            <DataGrid
                dataSource={data}
                showBorders={true}
                selectedRowKeys={[]}
                onRowRemoving={handleDelete}
            >
                <SearchPanel visible={true}
                    width={"auto"}
                    placeholder="Search..." />
                <FilterRow visible={true} />
                <Selection mode="single" />
                <Pager allowedPageSizes={200} showPageSizeSelector={true} />
                <Paging defaultPageSize={100} />
                <Editing mode={"row"} allowDeleting={true} allowUpdating={true} />
                <SpeedDialAction
                    icon="add"
                    label="Create Book Title"
                    index={1}
                    onClick={handleAdd} />

                <Column dataField="id" />
                <Column dataField="title" />
                <Column dataField="author" />
                <Column dataField="image" cellRender={cellRender}/>
                <Column dataField="description" />
                <Column dataField="createdAt" />
                <Column type="buttons">
                    <Button hint="Add" onClick={handleAdd} ><button className='btn btn-success btn-sm'>Add</button></Button>
                    <Button hint="Edit" onClick={handleEdit} ><button className='btn btn-success btn-sm'>Edit</button></Button>
                    <Button name="delete" ><button className='btn btn-danger btn-sm'>Delete</button></Button>
                </Column>
            </DataGrid>
            {renderAddForm()}
            {renderEditForm()} 
        </div>
    )
}

function cellRender(data) {
    return <img height={100} src={data.value} />
}
export default BookManagement