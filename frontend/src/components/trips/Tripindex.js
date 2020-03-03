import React from 'react'
import { get } from 'axios'
import Trips from './Trips'

class Index extends React.Component {
  state = {
    data : []
  }

  getData = async() => {
    try{
      const { data } =  await get('/api/trips/')
      this.setState({ data })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return(
      <Trips trips={this.state.data} />
    )
  }
}

export default Index

