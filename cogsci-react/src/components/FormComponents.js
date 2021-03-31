import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function TextInput({ title, content, handleContent }) {
  return (
    <Form.Group as={Row}>
      <Form.Label column sm="3" className="text-right">
        <b> {title}</b>
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
        <b> {title}</b>
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
