import React, { Component } from 'react';
import { Container, Divider, Grid, Image} from 'semantic-ui-react'

import Body from './components/Body';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
        <Grid centered segment="true" columns={2}>
          <Grid.Row padded="true">
          </Grid.Row>
          <Grid.Row padded="true">
            <Grid.Column>
              <Image size='big' src='https://media.giphy.com/media/lVF1IzSO16ZH2/giphy.gif' /> 
              <Divider/>
              <Body></Body>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row padded="true">
          <Footer/>
          </Grid.Row>
        </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
