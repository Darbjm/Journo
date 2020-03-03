import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class ImageUpload extends React.Component {
  state = {
    image: null,
    selectedImage: null 
  }

  async componentDidMount() {
    const image = this.props.value
    this.setState({ image })
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData
    data.append('file', files[0])
    data.append('upload_preset', 'fkrgmpqn')
    const res = await axios.post('https://api.cloudinary.com/v1_1/dkb9vu8mh/image/upload', data)
    this.setState({ image: res.data.url }, () => {
      this.props.handleChange({ target: { name: this.props.fieldName, value: res.data.url } })
      console.log(this.props)
    })
  }

  render() {
    const labelClass = this.props.labelClassName ? this.props.labelClassName : 'default_class'
    const { image } = this.state
    return (
      <div className="is-row image-input">
        {image &&    
          <div>
            <img src={image} className="upload-image"/>
          </div>}
            <label className={labelClass}>{this.props.labelText}</label>
            <input
              className={this.props.inputClassName}
              type="file"
              onChange={this.handleUpload}
            />
        
      </div>
    )
  }
}

export default ImageUpload