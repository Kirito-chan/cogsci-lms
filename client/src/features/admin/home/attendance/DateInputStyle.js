import { forwardRef } from "react";
import Button from "react-bootstrap/Button";

const DateInputStyle = forwardRef(function myFunction({ value, onClick }, ref) {
  return (
    <div className="text-right">
      <Button variant="info" size="sm" onClick={onClick} ref={ref}>
        {value}
      </Button>
    </div>
  );
});

export default DateInputStyle;
