import { React, useState, useEffect, useContext } from 'react'
import {
    DataGrid,
    Pager,
    Paging,
    Selection,
    FilterRow,
    Editing,
    Column,
} from 'devextreme-react/data-grid';
import { Popup } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import LoadingContext from '../../context/LoadingContext';
import { createBook, getBook, getBookById, updateBook } from '../../api/book';
import { getBookTitleById } from '../../api/bookTitle';

function BookAddForm(prop) {
    const setLoading = useContext(LoadingContext);
    const [bookTitle, setBookTitle] = useState({});
    const [inputs, setInputs] = useState({});
    let isCreateForm = (prop.book == undefined)

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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSave = () => {
        setLoading(true)
        if (isCreateForm) {
            createBook({
                isGood: inputs.isGood,
                bookTitleIds: inputs.bookTitles.map(g => g.id)
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        } else {

            updateBook(inputs.id, {
                isGood: inputs.isGood,
                bookTitleIds: inputs.bookTitles.map(g => g.id)
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        }
    }


    return (
        <Popup visible={prop.visible} onHiding={prop.onHiding} title="Manage book title">
            <ScrollView width='100%' height='100%'>
                <DataGrid dataSource={bookTitle.books}>
                    <Editing mode='row' allowAdding={true} allowUpdating={true} allowDeleting={true}></Editing>

                    <Column dataField="id"></Column>
                    <Column dataField="isGood"></Column>
                    <Column dataField="createdAt"></Column>
                </DataGrid>
            </ScrollView>
        </Popup>
    )
}

export default BookAddForm