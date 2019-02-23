import React from 'react'
import Rank from '../../components/Rank/Rank'
import ImageForm from '../../components/ImageForm/ImageForm'
import Output from '../../components/Output/Output'

class Image extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            imageUrl: '',
            boxes: [],
            entries: 0
        }
    }

    onInputChange = (event) => {
        this.setState({ inputValue: event.target.value })
    }

    calculateFaceLocations = (data) => {
        let boxes = data.map(region => {
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

    onSubmit = async() => {
        this.setState({ imageUrl: '', boxes: [] });
        const request = {
            method: 'POST',
            body: JSON.stringify({
                image: this.state.inputValue,
                email: this.props.email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            const response = await fetch("https://afacewithabrain.herokuapp.com/clarifai", request)
            if(response.status===200)
                {
                    const {entries, regions} = await response.json()
                    this.setState({
                        entries
                    })
                    this.displayFaces(this.calculateFaceLocations(regions))
                }
            else
                throw response.statusText
        } catch(err) {
            this.setState({
                inputValue: '',
                imageUrl: err
            })
        }
    }

    async componentDidMount(){
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.props.email
            })
        }
        const response = await fetch('https://afacewithabrain.herokuapp.com/entries', request)
        const info = await response.json()
        const {entries} = info.response
        this.setState({
            entries
        })        
    }

    render() {
        const { inputValue, imageUrl, boxes, entries } = this.state
        return (
            <div style={{width: '100%'}}>
                <Rank username={this.props.username} entries={entries}/>
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