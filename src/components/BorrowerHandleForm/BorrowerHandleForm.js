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
import { createUser, deleteUser, getUserById, updateUser } from '../../api/user';
import { getGroup } from '../../api/group';
import { confirmBorrowRegister, deleteBorrowRegister, rejectBorrowRegister } from '../../api/borrowRegister';
import { returnBorrowBill, updateBorrowBill } from '../../api/borrowBill';

function BorrowerHandleForm(prop) {
    const setLoading = useContext(LoadingContext);
    const data = prop.data;

    function handleConfirm() {
        confirmBorrowRegister(data.id)
            .then(res => {

            }).catch(err => {
                console.log(err)
            })
    }

    function handleReject() {
        rejectBorrowRegister(data.id).then(res => { }).catch(err => { console.log(err) })
    }

    function handleReturn() {
        returnBorrowBill(data.id)
            .then(res => {

            }).catch(err => {
                console.log(err)
            })
    }

    function renderButton() {
        if (prop.mode == "confirm") {
            return (<button type="button" className="btn btn-success w-25" onClick={handleConfirm}>Confirm</button>)
        } else if (prop.mode == "reject") {
            return (<button type="button" className="btn btn-danger w-25" onClick={handleReject}>Reject</button>)
        } else if (prop.mode == "return") {
            return (<button type="button" className="btn btn-warning w-25" onClick={handleReturn}>Return</button>)
        }
    }

    return (
        <Popup visible={true} onHiding={prop.onHiding}>
            <ScrollView width='100%' height='100%'>
                <div className='p-2'>
                    <div className='d-flex justify-content-around mt-3'>
                        <button type="button" className="btn btn-danger w-25" onClick={prop.onHiding}>Cancel</button>
                        {renderButton()}
                    </div>
                </div>
            </ScrollView>
        </Popup>
    )
}

export default BorrowerHandleForm