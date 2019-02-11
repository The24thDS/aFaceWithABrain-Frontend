import React from 'react'
import Rank from '../../components/Rank/Rank'
import ImageForm from '../../components/ImageForm/ImageForm'
import Output from '../../components/Output/Output'

class Image extends React.Component {
    constructor() {
        super()
        this.state = {
            inputValue: '',
            imageUrl: '',
            boxes: []
        }
    }

    onInputChange = (event) => {
        this.setState({ inputValue: event.target.value })
    }

    calculateFaceLocations = (data) => {
        let boxes = data.regions.map(region => {
            return {
                top: region.region_info.bounding_box.top_row * 100 + '%',
                left: region.region_info.bounding_box.left_col * 100 + '%',
                width: (region.region_info.bounding_box.right_col - region.region_info.bounding_box.left_col) * 100 + '%',
                height: (region.region_info.bounding_box.bottom_row - region.region_info.bounding_box.top_row) * 100 + '%'
            }
        })
        return boxes
    }

    displayFaces = (boxes) => {
        this.setState({
            imageUrl: this.state.inputValue,
            inputValue: '',
            boxes
        })
    }

    onSubmit = () => {
        this.setState({ imageUrl: '', boxes: [] });
        fetch("http://localhost:3030/clarifai", {
            method: 'POST',
            body: JSON.stringify({
                image: this.state.inputValue
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200)
                return response.json()
            else throw response.statusText
        })
        .then(data => this.displayFaces(this.calculateFaceLocations(data)))
        .catch(err => this.setState({
            inputValue: '',
            imageUrl: err
        }));
    }

    render() {
        const { inputValue, imageUrl, boxes } = this.state
        return (
            <div style={{width: '100%'}}>
                <Rank />
                <ImageForm 
                    value={inputValue} 
                    onInputChange={this.onInputChange} 
                    onSubmit={this.onSubmit}
                />
                <Output 
                    source={imageUrl} 
                    faces={boxes}
                />
            </div>
        )
    }
}

export default Image