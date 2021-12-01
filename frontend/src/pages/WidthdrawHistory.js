// craete OrderHistoryScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWidthdrawals } from '../actions/widthdrawActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function WidthdrawHistory(props) {

    const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);


    const myWidthdraws = useSelector(state => state.myWidthdraws);
    const { loading, error, widthdraws } = myWidthdraws

    const dispatch = useDispatch();
    useEffect(()=>{
        //call listOrderMine form orderActions
        dispatch(getWidthdrawals())

    }, [dispatch])
    return (
        <div>
            <h1> Widthdrawal History</h1>
            {
                loading? <LoadingBox></LoadingBox>:
                error? <MessageBox variant="danger">{error}</MessageBox>:
                (
                    <table className ="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>AMOUNT</th>
                                <th>PAID</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                widthdraws.map((width) =>(
                                    <tr key = {width._id}>
                                        <td>{width._id}</td>
                                        {/* get only the date part, and leave the time*/}
                                        <td>{width.requestedAt.substring(0, 10)}</td>
                                        <td>{width.amount.toFixed(2)}</td>
                                        <td>{width.isPaid? width.isPaidAt.substring(0, 10): "Pending"}</td>                             
                                        
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default WidthdrawHistory