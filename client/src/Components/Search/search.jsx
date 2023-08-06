import React, { useState } from "react";

// Importing BootStrap CDN
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// Importing react date range
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import { amadeiusFetch } from "../../utils/API";

const Search = () => {
  const [searchedFlights, setSearchedFlights] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await amadeiusFetch(searchInput);
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const{ data } = await response.json();
      const flightData = data.map((flight) => ({
        price: flight.price.base,
        id: flight.id
      }));
      console.log(flightData)
      setSearchedFlights(flightData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ButtonGroup aria-label="Basic example" as= {Col} className="position-relative rounded-pill top-100 start-50 translate-middle bi bi-caret-down-fill">
        <Button variant="secondary">Economy</Button>
        <Button variant="secondary">Business</Button>
        <Button variant="secondary">First Class</Button>
      </ButtonGroup>
      <Form onSubmit={handleFormSubmit}>
      <Row>
        {/* <Form.Group as={Col} controlId="formGridState" className="searchForm">
          <Form.Label>Destination From</Form.Label>
          <Form.Control type= "text" placeholder="Enter an Origin"></Form.Control>
        </Form.Group> */}
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Destination To</Form.Label>
          <Form.Control 
          type= "text" 
          placeholder="Enter a Destination"
          name="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          ></Form.Control>
        </Form.Group>
        </Row>
        {/* <Row>
          <Form.Group className="top-25 searchForm" as={Col} controlId="formGridState">
            <Form.Label>Check In | Check Out</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
              </DemoContainer>
            </LocalizationProvider>
          </Form.Group>
          <Form.Group className='searchForm' as={Col} controlId="formGridState">
            <Form.Label>How many Travelers?</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </Form.Select>
          </Form.Group>
        </Row> */}
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </>
  )
}

export default Search
