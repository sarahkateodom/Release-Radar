import React, { Component } from 'react'
import axios from 'axios';

export default class Artists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            artistsUrl: 'https://api.spotify.com/v1/me/following?type=artist',
            dataIsLoaded: false
        };
    }

    getArtists() {
        if (this.props.accessToken) {
            axios.get(this.state.artistsUrl, 
                { headers: {"Authorization" : `Bearer ${this.props.accessToken}`} })
                .then(res => {
                    this.setState({  
                        artistsUrl: res.data.artists.next,                    
                        artists: this.state.artists.concat(res.data.artists.items),
                    });

                    // if there are more artists, recurse!
                    if (res.data.artists.next) 
                        this.getArtists();
                    else {
                        this.setState({
                            dataIsLoaded: true,
                        });
                    }
                }).catch((error) => {
                    console.log(error)
                });
        } else {
            console.log('no access token')
        } 
    }

    componentDidMount() {
        this.getArtists();
    }

    render() {
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
  