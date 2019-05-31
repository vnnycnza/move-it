import React from 'react'
import { TimeInput } from 'semantic-ui-calendar-react';
import { Container, Form, Button, Segment, Divider, Loader, Header, Message} from 'semantic-ui-react';
import DataTable from './DataTable';
import moment from 'moment';

class FormContent extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      startTime: '',
      endTime: '',
      bookings: [],
      loading: false,
      error: false,
      errorMessage: 'Can\'t fetch bookings right now'
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange (event, {name, value}) {
    if (this.state[name] !== undefined) {
      this.setState({ [name]: value });
    }
  }

  submitForm () {
    if (!this.state.startTime || !this.state.endTime) {
      this.setState({
        ...this.state, 
        ...{
          bookings: [],
          loading: false,
          error: true,
          errorMessage: 'You did not enter valid values'
        }
      });
    } else {
      const today = moment().format('YYYY-MM-DD');
      const startTime = moment(`${today} ${this.state.startTime}`, 'YYYY-MM-DD HH:mm');
      const endTime = moment(`${today} ${this.state.endTime}`, 'YYYY-MM-DD HH:mm');
      
      const unixStart = moment.utc(startTime).format('X');
      const unixEnd = moment.utc(endTime).format('X');
  
      this.setState({
        ...this.state, 
        ...{
          bookings: [],
          loading: true,
          error: false
        }
      }, () => {
        fetch(`/v1/availability?startTime=${unixStart}&endTime=${unixEnd}`, {
          method: 'GET',
          mode: 'no-cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((res) => {
          if(res.status === 200) {
            return res.json();
          } else {
            throw res.status;
          }
        })
        .then((result) => {
          console.log(`Backend response is ${result}`);
          this.setState({
            ...this.state, 
            ...{
              loading: false,
              error: false,
              bookings: result.bookings
            }
          });
        })
        .catch((error) => {
          console.log(`Backend encountered error ${error}`);
          this.setState({
            ...this.state, 
            ...{
              bookings: [],
              loading: false,
              error: true,
              errorMessage: 'Can\'t fetch bookings right now'
            }
          });
        })
      });
    }
  }
 
  render() {
    return (
      <Container>
      {
      (() =>
        ((this.state.error) ?
          (
            <Message negative>
              <Header as='h5'>
                <Header.Content>
                  I'm sorry there was a problem
                  <Header.Subheader>{this.state.errorMessage}</Header.Subheader>
                </Header.Content>
              </Header>             
            </Message>
          ) : ''
        ))()
      }
      <Form>
        <Form.Field>
         <label>Start Time</label>
          <TimeInput
            name="startTime"
            placeholder="Start Time"
            value={this.state.startTime}
            iconPosition="left"
            onChange={this.handleChange}
            popupPosition="bottom center"
            closable={true}
          />
        </Form.Field>
        <Form.Field>
         <label>End Time</label>
          <TimeInput
            name="endTime"
            placeholder="End Time"
            value={this.state.endTime}
            iconPosition="left"
            onChange={this.handleChange}
            popupPosition="bottom center"
          />
        </Form.Field>
        <Button type='submit' onClick={this.submitForm.bind(this)}>Submit</Button>
      </Form>
      {
        (() => {
          if (this.state.bookings && this.state.bookings.length) {
            return (
              <Segment>
              <Divider></Divider>
              <DataTable bookings={this.state.bookings}/>
              </Segment>
            )
          } else {
            return (this.state.loading) ? (
              <Segment>
                <Loader active inline='centered'>
                  <Header as='h5'> Fetching bookings... </Header>
                </Loader>  
              </Segment>) : ''
          }
        })()
      }
      </Container>
    );
  }
}

export default FormContent;