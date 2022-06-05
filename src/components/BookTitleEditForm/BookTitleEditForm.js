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
import { createBookTitle, getBookTitleById, updateBookTitle } from '../../api/bookTitle';
import { getCategory } from '../../api/category';

function BookTitleEditForm(prop) {
    const setLoading = useContext(LoadingContext);
    const [category, setCategory] = useState([]);
    let bookTitle
    let isCreateForm = prop.isCreate
    if (isCreateForm) {
        bookTitle = {
            id: '',
            title: '',
            author: '',
            image: '',
            description: '',
            createdAt: '',
            categorys: []
        }
    } else {
        bookTitle = prop.booktitle
    }
    const [inputs, setInputs] = useState({ ...bookTitle });

    // Get require data
    useEffect(() => {
        getCategory().then(res => {
            if (res.message === "OK")
                setCategory(() => res.data)
        }).catch(err => console.log(err))
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleCategoryChange = (e) => {
        setInputs(values => ({ ...values, ["categorys"]: e.selectedRowsData }))
    }

    const handleSave = () => {
        setLoading(true)
        if (isCreateForm) {
            createBookTitle({
                title: inputs.title,
                author: inputs.author,
                image: inputs.image,
                description: inputs.description,
                createdAt: inputs.createdAt,
                categoryIds: inputs.categorys.map(g => g.id),
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        } else {

            updateBookTitle(inputs.id, {
                title: inputs.title,
                author: inputs.author,
                image: inputs.image,
                description: inputs.description,
                createdAt: inputs.createdAt,
                categoryIds: inputs.categorys.map(g => g.id),
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        }
    }


    return (
        <Popup visible={prop.visible} onHiding={prop.onHiding}>
            <ScrollView width='100%' height='100%'>
                <div className='p-2'>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">Id</label>
                            <input name='id' type="text" className="form-control" id="id" value={inputs.id || ""} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input name='title' type="text" className="form-control" id="title" value={inputs.title || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label">Author</label>
                            <input name='author' type="text" className="form-control" id="author" value={inputs.author || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input name='image' type="text" className="form-control" id="image" value={inputs.image || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input name='description' type="text" className="form-control" id="description" value={inputs.description || ""} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="createdAt" className="form-label">Created At</label>
                            <input name='createdAt' type="text" className="form-control" id="createdAt" value={inputs.createdAt} readOnly />
                        </div>
                    </form>
                    <hr></hr>
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
                    </DataGrid>
                    <div className='d-flex justify-content-around mt-3'>
                        <button type="button" className="btn btn-danger w-25" onClick={prop.onHiding}>Cancel</button>
                        <button type="button" className="btn btn-success w-25" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </ScrollView>
        </Popup>
    )
}

export default BookTitleEditForm