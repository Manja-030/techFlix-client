import React from 'react';
import { connect } from 'react-redux';

import { Form, Row, Col } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss';

function VisibilityFilterInput(props) {
  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label className="visibility-label">Search Movies: </Form.Label>
        <Col className="search-bar-col">
          <Form.Control
            className="search-bar-input"
            onChange={(e) => props.setFilter(e.target.value)}
            value={props.visibilityFilter}
            placeholder="Movie Title "
          />
        </Col>
      </Form.Group>
    </Form>
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
