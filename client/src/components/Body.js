import React from 'react'
import { Icon, Header, Grid, Segment, Divider } from 'semantic-ui-react'

import FormContent from './FormContent';

const Body = () => (
  <Segment placeholder large="true">
    <Grid.Column padded="true">
      <Header as='h4'>
        <Icon name='checked calendar' />
        <Header.Content>
          Booking Availability
          <Header.Subheader>Select a timeframe to check availabilty</Header.Subheader>
        </Header.Content>
      </Header>
    </Grid.Column>
    <Divider/>
    <FormContent/>
  </Segment>
)

export default Body;