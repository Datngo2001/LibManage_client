import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataGrid, Column, Pager, Paging, Selection } from 'devextreme-react/data-grid'
import React, { useEffect, useState } from 'react'
import { getBorrowerById } from '../../api/user'
import dateDiff from "../../utils/dateDiff"

function ReaderDetail(prop) {
    const [borrower, setBorrower] = useState({})

    useEffect(() => {
        getBorrowerById(prop.data.data.id)
            .then(res => {
                setBorrower(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    function getBorrowInfos() {
        if (borrower.borrowRegister == undefined) return

        const borrowInfos = []

        borrower.borrowRegister.forEach(register => {
            register.bookNames = ""
            register.books.forEach(book => register.bookNames += (book.BookTitle.title + ", "))
            borrowInfos.push(register)
        })

        borrower.borrowBills.forEach(bill => {
            bill.bookNames = ""
            bill.books.forEach(book => bill.bookNames += (book.BookTitle.title + ", "))
            borrowInfos.push(bill)
        })

        return borrowInfos
    }

    function handleConfirm() {

    }

    function handleReject() {

    }

    function handleReturn() {

    }

    function renderColumnStatus(e) {
        const data = e.data
        if (data.isConfirmed != undefined && data.isConfirmed === false) {
            return (
                <div className='d-flex justify-content-around'>
                    <button onClick={handleConfirm} className='btn btn-success btn-sm me-2 w-50'>Confirm</button>
                    <button onClick={handleReject} className='btn btn-danger btn-sm w-50'>Reject</button>
                </div>
            )
        }
        if (data.isReturned === false) {
            let remain = dateDiff(new Date(data.planReturnDate), new Date());
            if (remain > 0) {
                return <button onClick={handleReturn} className='btn btn-warning btn-sm w-50'>Return</button>
            } else {
                return <button onClick={handleReturn} className='btn btn-primary btn-sm w-50'>Return</button >
            }
        }
        if (data.isReturned === true) {
            return <span className='text-success fw-bolder fs-5'><FontAwesomeIcon icon={"check"}></FontAwesomeIcon></span>
        }
    }

    return (
        <div>
            <DataGrid
                allowColumnResizing={true}
                allowColumnReordering={true}
                columnAutoWidth={true}
                dataSource={getBorrowInfos()}>
                <Pager showPageSizeSelector={true} />
                <Paging defaultPageSize={10} />
                <Selection mode={"single"}></Selection>

                <Column dataField="bookNames" />
                <Column dataField="Note" />
                <Column dataField="planReturnDate" dataType="datetime" />
                <Column dataField="returnDate" dataType="datetime" />
                <Column dataField="createDate" dataType="datetime" />
                <Column
                    caption={"Returned"}
                    alignment={"center"}
                    width={"200"}
                    cellRender={renderColumnStatus}
                />
            </DataGrid>
        </div>
    )
}

export default ReaderDetail