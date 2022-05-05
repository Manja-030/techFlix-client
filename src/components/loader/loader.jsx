import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="danger" />
    </div>
  );
}
