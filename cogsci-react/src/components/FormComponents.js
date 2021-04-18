import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";

export function TextInput({ title, content, handleContent }) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm="3" className="text-right">
        <b>{title}</b>
      </Form.Label>
      <Col sm="9">
        <Form.Control
          required
          type="text"
          onChange={handleContent}
          value={content}
        />
      </Col>
    </Form.Group>
  );
}

export function TextAreaInput({ title, content, handleContent, rows }) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm="3" className="text-right">
        <b>{title}</b>
      </Form.Label>
      <Col sm="9">
        <Form.Control
          required
          as="textarea"
          rows={rows}
          onChange={handleContent}
          value={content}
        />
      </Col>
    </Form.Group>
  );
}

export function TextInputRegistration({
  title,
  setContent,
  type = "text",
  autoComplete,
  isInvalid = false,
  error,
  clearError,
}) {
  const dispatch = useDispatch();
  return (
    <Form.Group as={Row}>
      <Form.Label column md="4" sm="4" xs="3" className="text-right">
        <b>{title}</b>
      </Form.Label>
      <Col lg="4" md="6" sm="8" xs="9">
        <Form.Control
          required
          type={type}
          isInvalid={isInvalid}
          autoComplete={autoComplete}
          onChange={(e) => {
            setContent(e.target.value);
            if (clearError) dispatch(clearError());
          }}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
}

export function TextInputSettings({
  title,
  content,
  handleContent,
  allAreInvalid,
}) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm="2">
        <b>{title}</b>
      </Form.Label>
      <Col sm="5">
        <Form.Control
          required
          type="text"
          onChange={handleContent}
          value={content}
          isInvalid={allAreInvalid}
        />
      </Col>
    </Form.Group>
  );
}

export function TextAreaInputSettings({ title, content, handleContent, rows }) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm="2">
        <b>{title}</b>
      </Form.Label>
      <Col sm="5">
        <Form.Control
          required
          as="textarea"
          rows={rows}
          onChange={handleContent}
          value={content}
        />
      </Col>
    </Form.Group>
  );
}
