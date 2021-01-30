import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './Attendance.css'
import {loadAttendance, selectAttendance} from './homeStudentSlice'
import {getCurrentUser} from '../../app/currentUserSlice'
import AttendanceTable from './AttendanceTable'

export default function Attendance() {
    const dispatch = useDispatch()
    
    const currentUserId = useSelector(getCurrentUser)
    const attendances = useSelector(selectAttendance)

    useEffect(()=>{
        dispatch(loadAttendance(currentUserId))
    }, [])

    return (
        <AttendanceTable attendances={attendances} />
    )
}