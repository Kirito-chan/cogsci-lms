import React, { useEffect } from "react";
import { getUsers, loadUsers, updateUserRole } from "./allUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import UsersList from "./UsersList";
import { showLoaderIfAnyNull } from "../../../components/StringUtils";
import Navigation from "../../../components/Navigation";
import { IS_ADMIN, IS_STUDENT } from "../../../constants";

function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleMakeAdmin = (e) => {
    const userId = e.target.value;
    dispatch(updateUserRole(userId, IS_ADMIN)).then(() => {
      dispatch(loadUsers());
    });
  };

  const handleMakeStudent = (e) => {
    const userId = e.target.value;
    dispatch(updateUserRole(userId, IS_STUDENT)).then(() => {
      dispatch(loadUsers());
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
        />
      )}
    </div>
  );
}

export default UsersPage;
