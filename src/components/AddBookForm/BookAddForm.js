import { React, useState, useEffect, useContext } from 'react'
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
import { createBookTitle, getBookTitle, getBookTitleById, updateBookTitle } from '../../api/bookTitle';
import { getCategory } from '../../api/category';
import { createBook, getBook, getBookById, updateBook } from '../../api/book';

function BookAddForm(prop) {
    const setLoading = useContext(LoadingContext);
    const [bookTitles, setBookTitles] = useState([]);
    const [category, setCategory] = useState([]);
    // const [book, setBook] = useState([]);
    const [inputs, setInputs] = useState({});
    let isCreateForm = (prop.book ==  undefined)

    // Get require data
    useEffect(() => {

        if (!isCreateForm) {
            setLoading(true)
            getBookById(prop.book.id).then(res => {
                if (res.message === "OK") {
                    res.data.password = ""
                    setInputs(() => res.data)
                    setLoading(false)
                }
            }).catch(err => console.log(err))
        } else {
            setInputs(() => ({
                isGood: '',
                bookTitles: []
            }))
        }

        // getBook().then(res => {
        //     if (res.message === "OK")
        //         setBook(() => res.data)
        // })

        // getBookTitle().then(res => {
        //     if (res.message === "OK")
        //         setBookTitles(() => res.data)
        // }).catch(err => console.log(err))
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    // const handleBookChange = (e) => {
    //     debugger
    //     setInputs(values => ({ ...values, ["books"]: e.selectedRowData}))
    // }

    // const handleCategoryChange = (e) => {
    //     setInputs(values => ({ ...values, ["categorys"]: e.selectedRowsData }))
    // }

    const handleSave = () => {
        setLoading(true)
        if (isCreateForm) {
            createBook({
                isGood: inputs.isGood,
                bookTitleIds: inputs.bookTitles.map(g=>g.id)  
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        } else {

            updateBook(inputs.id, {
                isGood: inputs.isGood,
                bookTitleIds: inputs.bookTitles.map(g=>g.id) 
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        }
    }


    return (
        <Popup visible={true} onHiding={prop.onHiding}>
            <ScrollView width='100%' height='100%'>
                <div className='p-2'>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">Id</label>
                            <input name='id' type="text" className="form-control" id="id" value={inputs.id || ""} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="isgood" className="form-label">Is Good</label>
                            <input name='isgood' type="text" className="form-control" id="title" value={inputs.isGood || ""} onChange={handleChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='bookTitleId' className='form-control'>Book Title Id</label>
                            <input name='bookTitleId' type="text" className='form-control' id='bookTitleId' value={inputs.bookTitleIds || ""} onChange={handleChange} />
                        </div>
                    </form>
                    {/* <hr></hr>
                    <h4>Category</h4>
                    <DataGrid
                        dataSource={category}
                        showBorders={true}
                        allowColumnResizing={true}
                        columnAutoWidth={true}
                        selectedRowKeys={inputs.categorys}
                        onSelectionChanged={handleCategoryChange}>
                        <FilterRow visible={true} />
                        <Selection mode="multiple" />
                        <Pager showPageSizeSelector={true} />
                        <Paging defaultPageSize={8} />
                    </DataGrid> */}
                    <div className='d-flex justify-content-around mt-3'>
                        <button type="button" className="btn btn-danger w-25" onClick={prop.onHiding}>Cancel</button>
                        <button type="button" className="btn btn-success w-25" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </ScrollView>
        </Popup>
    )
}

export default BookAddForm