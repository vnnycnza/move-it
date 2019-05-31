import React from 'react'
import { Icon, Header, Modal } from 'semantic-ui-react'
import MyMap from './MyMap'

class ModalMap extends React.Component {
  render () {
    const booking = this.props.booking;

    return (
      <Modal trigger={<Icon name='map'/>}>
        <Modal.Header>Drop off Locations</Modal.Header>
        <Modal.Content>
          <Header as='h4'>
            <Icon name='car'/>
            <Header.Content>
              {booking.location}
              <Header.Subheader>Blue dot refers to the primary location and the red dot/s show drop off locations</Header.Subheader>
            </Header.Content>
          </Header>
          <MyMap
            latCenter={Number(booking.coordinates.split(',')[0])}
            lngCenter={Number(booking.coordinates.split(',')[1])}
            markers={booking.dropoff_locations}
          />
        </Modal.Content>
      </Modal>
    )
  }
};
export default ModalMap;
