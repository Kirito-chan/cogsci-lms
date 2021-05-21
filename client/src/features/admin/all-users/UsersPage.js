import React, { useEffect, useState } from "react";
import { getUsers, loadUsers, updateUserRole } from "./allUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import UsersList from "./UsersList";
import { showLoaderIfAnyNull } from "../../../components/utils/StringUtils";
import Navigation from "../../../components/navigations/Navigation";
import { IS_ADMIN, IS_STUDENT } from "../../../constants";
import { resetState } from "../../../app/actions";

function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    dispatch(resetState()).then(() => {
      dispatch(loadUsers());
    });
  }, []);

  const handleMakeAdmin = (e) => {
    const userId = e.target.value;
    setLoading(userId);
    dispatch(updateUserRole(userId, IS_ADMIN)).then(() => {
      dispatch(loadUsers());
      setLoading(0);
    });
  };

  const handleMakeStudent = (e) => {
    const userId = e.target.value;
    setLoading(userId);
    dispatch(updateUserRole(userId, IS_STUDENT)).then(() => {
      dispatch(loadUsers());
      setLoading(0);
    });
  };

  return (
    <div>
      <Navigation />
      {showLoaderIfAnyNull(users) || (
        <UsersList
          users={users}
          handleMakeAdmin={handleMakeAdmin}
          handleMakeStudent={handleMakeStudent}
          loading={loading}
        />
      )}
    </div>
  );
}

export default UsersPage;
