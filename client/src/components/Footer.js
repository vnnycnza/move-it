import React from 'react'
import { Header, Image, Grid } from 'semantic-ui-react'

const Footer = () => (
  <Grid columns={2}>
    <Header as='h3'>
      <Image circular src='https://scontent.fmnl2-1.fna.fbcdn.net/v/t1.0-9/27072671_10213665746590258_7244669167321060560_n.jpg?_nc_cat=109&_nc_ht=scontent.fmnl2-1.fna&oh=c98dee89dbac0a245ea9eef74bf0ee4d&oe=5D9E3ECC' /> 
      <Header.Content>
      Created by <a href='https://www.linkedin.com/in/vannyconoza/'> @vnnycnza </a>  
      </Header.Content>
    </Header>
  </Grid>
)

export default Footer;