import React from 'react';

export default class Inputfield extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value : ''
    //     };
    // }
    // handleChange(e){
    // 	this.setState({value : e.target.value});
    // }

    render() {
        return <input className="input-field" {...this.props} />;
    }
}

