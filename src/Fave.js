import React, { Component } from 'react'

class Fave extends Component {
    constructor(props){
        super(props)
        this.state = {

        }

    }
    handleClick = (e) => {
        e.stopPropagation()

        // Add this line. You'll call the function passed through props
        this.props.onFaveToggle()

        // Delete the `setState` line. You no longer track state here
        // this.setState({isFave: !this.state.isFave})
    }
    render() {
        const isFave = (this.props.isFave) ? 'remove_from_queue' : 'add_to_queue'
        return (
            <div className={`film-row-fave ${isFave}`} onClick={this.handleClick}>
                <p className="material-icons">{isFave}</p>
            </div>
        )
    }
}
export default Fave
