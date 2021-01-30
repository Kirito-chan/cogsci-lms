import React, {useEffect} from 'react';
import Table from 'react-bootstrap/Table'
import {useDispatch, useSelector} from 'react-redux'
import formatDate from '../../components/DateUtils'
import {FaCheck, FaTimes} from 'react-icons/fa'
import './Attendance.css'
import {loadAttendance, selectAttendance} from './homeStudentSlice'
import {getCurrentUser} from '../../app/currentUserSlice'

export default function Attendance() {
    const dispatch = useDispatch()
    
    const currentUserId = useSelector(getCurrentUser)
    const attendances = useSelector(selectAttendance)

    useEffect(()=>{
        dispatch(loadAttendance(currentUserId))
    }, [])

    return (
        <Table bordered striped hover size="sm" className="text-center">
            <thead>
                <tr>
                    <th>Týždeň</th>
                    <th>Dátum</th>
                    <th>Body</th>
                    <th>Heslo</th>
                </tr>
            </thead>
            <tbody>
                {attendances.map( (data, i) => 
                <tr>
                   <td>{i+1}</td>
                   {/* {data.map(column => <td>{column}</td>)} */}
                   <td>{formatDate(data.date)}</td>
                   <td>{data.got_point}</td>
                   <td>{data.got_point ? <FaCheck /> : <FaTimes />}</td>
                </tr>)}
            </tbody>
        </Table>
    )
}