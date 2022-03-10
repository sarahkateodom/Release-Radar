import React, { Component } from 'react'
import axios from 'axios';

export default class Artists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            dataIsLoaded: false
        };
    }

    componentDidMount() {
        if (this.props.accessToken) {
            axios.get('https://api.spotify.com/v1/me/following?type=artist' , { headers: {"Authorization" : `Bearer ${this.props.accessToken}`} })
                .then(res => {
                    this.setState({                      
                        artists: res.data.artists.items,
                    });
                    console.log('state', this.state);
                }).catch((error) => {
                    console.log(error)
                }).finally(() => {
                    this.setState({dataIsLoaded: true})
                });
            
          } else {
              console.log('no access token')
          } 
    }

    render() {
        //const { dataIsLoaded, artists } = this.state;
        if (!this.state.dataIsLoaded) 
            return <div> <h1> Loading... </h1> </div> ;
   
        return (
            <div> Artists: {this.state.artists.length}               
            {
                this.state.artists.map((artist)=> (    
                    <div>{artist.name}</div>
                ))
            }
            </div>
        )
    }
}
  