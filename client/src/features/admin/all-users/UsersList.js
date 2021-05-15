import React from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { IS_ADMIN } from "../../../constants";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/esm/Button";

function UsersList({ users, handleMakeAdmin, handleMakeStudent }) {
  return (
    <Container fluid>
      <Table bordered striped hover size="sm" className="text-center">
        <thead>
          <tr>
            <th>Meno</th>
            <th>Používateľské meno</th>
            <th>Rola</th>
            <th>Email</th>
            <th>Úprava role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>
                {user.last_name} {user.first_name}
              </td>
              <td>{user.username}</td>
              <td>
                {user.role == IS_ADMIN ? (
                  <Badge pill variant="warning">
                    Admin
                  </Badge>
                ) : (
                  <Badge pill variant="success">
                    Študent
                  </Badge>
                )}
              </td>
              <td>{user.email}</td>
              <td>
                {user.role == IS_ADMIN ? (
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={handleMakeStudent}
                    value={user.id}
                  >
                    Urobiť študentom
                  </Button>
                ) : (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleMakeAdmin}
                    value={user.id}
                  >
                    Urobiť adminom
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default UsersList;
