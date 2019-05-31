import React from 'react'
import { Button, Icon, List, Container, Header } from 'semantic-ui-react'
import ModalMap from './ModalMap';

class DataTable extends React.Component{
  constructor(props) {
    super(props);
 
    this.state = {
      maxItems: 5
    };

    this.showMore = this.showMore.bind(this);
  }

  showMore() {
    this.setState({
      maxItems: this.state.maxItems + 5
    });
  }

  render() {
    const data = this.props.bookings;
    return (
      <Container>
        <Header as='h3'>
          <Icon name='location arrow' />
          <Header.Content>Locations</Header.Content>
        </Header>
        <Container>
        <List divided relaxed>
        {data.slice(0, this.state.maxItems).map((item) => 
          (
            <List.Item key={item.id}>
              <List.Icon name='map signs' size='big' verticalAlign='middle' />
              <List.Content>
                <List.Header as='a'>{item.location}</List.Header>
                <List.Description>
                  <List bulleted horizontal>
                    <List.Item>Available Cars: {item.available_cars}</List.Item>
                    <List.Item>Dropoffs: {item.dropoff_count}</List.Item>
                    <List.Item>Show in Map: <ModalMap booking={item}/></List.Item>
                  </List>
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <Button onClick={this.showMore.bind(this)}> Show More</Button>
        </Container>
      </Container>
    )
  };
};

export default DataTable;