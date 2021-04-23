import React, { useEffect, useState } from "react";
import EmailPageView from "./EmailPageView";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUserEmailsAndNames,
  getStudentEmailsAndNames,
  sendEmail,
} from "../home/homeSlice";
import { useParams } from "react-router";
import {
  getCurrentUserName,
  getCurrentUserEmail,
} from "../../../app/currentUserSlice";

function EmailPage() {
  const dispatch = useDispatch();
  const { subjectId } = useParams();
  const studentEmailsAndNames = useSelector(getStudentEmailsAndNames);
  const currentUserName = useSelector(getCurrentUserName);
  const currentUserEmail = useSelector(getCurrentUserEmail);
  const [
    studentEmailsAndNamesDoubleArr,
    setStudentEmailsAndNamesDoubleArr,
  ] = useState(null);
  const [checkedEmails, setCheckedEmails] = useState({
    checkedItems: new Map(),
  });

  const [subject, setSubject] = useState("");
  const handleSubject = (e) => setSubject(e.target.value);

  const [message, setMessage] = useState("");
  const handleMessage = (e) => setMessage(e.target.value);

  const handleChange = (e) => {
    const email = e.target.id;
    const isChecked = e.target.checked;
    setCheckedEmails((prevState) => ({
      checkedItems: prevState.checkedItems.set(email, isChecked),
    }));
  };

  const handleCheckAll = (e) => {
    const isChecked = e.target.checked;
    studentEmailsAndNames.forEach((student) =>
      setCheckedEmails((prevState) => ({
        checkedItems: prevState.checkedItems.set(student.email, isChecked),
      }))
    );
  };

  useEffect(() => {
    if (subjectId) dispatch(loadUserEmailsAndNames(subjectId));
  }, [subjectId]);

  useEffect(() => {
    if (studentEmailsAndNames) {
      for (const student of studentEmailsAndNames) {
        setCheckedEmails((prevState) => ({
          checkedItems: prevState.checkedItems.set(student.email, false),
        }));
      }

      const emailsDivided = [];
      let SIZE = 10;
      if (studentEmailsAndNames.length < 40) SIZE = 10;
      else if (studentEmailsAndNames >= 40 && studentEmailsAndNames < 60)
        SIZE = 15;
      else if (studentEmailsAndNames >= 60 && studentEmailsAndNames <= 100)
        SIZE = 20;
      else SIZE = 30;

      for (
        let index = 0;
        index < studentEmailsAndNames?.length;
        index += SIZE
      ) {
        emailsDivided.push(studentEmailsAndNames.slice(index, index + SIZE));
      }
      setStudentEmailsAndNamesDoubleArr(emailsDivided);
    }
  }, [studentEmailsAndNames]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const toEmailRecipients = [];

    for (const [email, isChecked] of checkedEmails.checkedItems.entries()) {
      if (isChecked) toEmailRecipients.push(email);
    }

    dispatch(
      sendEmail(
        currentUserEmail,
        toEmailRecipients,
        currentUserName,
        subject,
        message
      )
    ).then(() => {
      setSubject("");
      setMessage("");
    });
  };
  return (
    <div>
      <EmailPageView
        studentEmailsAndNamesDoubleArr={studentEmailsAndNamesDoubleArr}
        subject={subject}
        message={message}
        handleSubmit={handleSubmit}
        handleCheckAll={handleCheckAll}
        handleChange={handleChange}
        handleMessage={handleMessage}
        handleSubject={handleSubject}
        checkedEmails={checkedEmails}
      />
    </div>
  );
}

export default EmailPage;
