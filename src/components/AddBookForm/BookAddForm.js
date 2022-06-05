import { React, useState, useEffect, useContext } from 'react'
import {
    DataGrid,
    Selection,
    Editing,
    Column,
} from 'devextreme-react/data-grid';
import { Popup } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import LoadingContext from '../../context/LoadingContext';
import { createBook, deleteBook, getBook, getBookById, updateBook } from '../../api/book';
import { getBookTitleById } from '../../api/bookTitle';

function BookAddForm(prop) {
    debugger
    const setLoading = useContext(LoadingContext);
    const [bookTitle, setBookTitle] = useState({});
    const [inputs, setInputs] = useState({});

    // Get require data
    useEffect(() => {
        setLoading(true)
        getBookTitleById(prop.booktitle.id).then(res => {
            if (res.message === "OK") {
                setBookTitle(() => res.data)
                setLoading(false)
            }
        }).catch(err => console.log(err))
    }, [])

    function handleAdd(e) {
        setLoading(true)
        createBook({
            isGood: e.data.isGood,
            bookTitleId: bookTitle.id
        }).then(res => {
            setBookTitle(value => {
                value.books.push(res.data)
                return value
            })
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }

    function handleEdit(e) {
        setLoading(true)
        updateBook(e.data.id, {
            isGood: e.data.isGood,
            bookTitleId: bookTitle.id
        }).then(res => {
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }

    function handleDelete(e) {
        setLoading(true)
        deleteBook(e.data.id)
            .then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
    }

    function setDefaultValue(e) {
        e.data.isGood = true
    }
    return (
        <Popup visible={prop.visible} onHiding={prop.onHiding} title="Manage book title">
            <ScrollView width='100%' height='100%'>
                <DataGrid dataSource={bookTitle.books}
                    onInitNewRow={setDefaultValue}
                    onRowInserted={handleAdd}
                    onRowUpdated={handleEdit}
                    onRowRemoved={handleDelete}>
                    <Editing mode='row' allowAdding={true} allowUpdating={true} allowDeleting={true}></Editing>
                    <Selection mode="multiple"></Selection>

                    <Column dataField="id" allowEditing={false}></Column>
                    <Column dataField="isGood" dataType="boolean"></Column>
                    <Column dataField="createdAt" allowEditing={false} dataType="datetime"></Column>
                </DataGrid>
            </ScrollView>
        </Popup>
    )
}

export default BookAddForm