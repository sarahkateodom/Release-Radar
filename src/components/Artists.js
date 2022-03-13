import React, { Component } from 'react'
import axios from 'axios';

export default class Artists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            artistsUrl: 'https://api.spotify.com/v1/me/following?type=artist',
            artistsDataIsLoaded: false,
            newReleases: [],
            newReleasesUrl: 'https://api.spotify.com/v1/browse/new-releases',
            newReleasesDataIsLoaded: false,
            myNewReleases: [],
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
                            artistsDataIsLoaded: true,
                        });

                        if (this.state.newReleasesDataIsLoaded) this.getMyNewReleases();
                    }
                }).catch((error) => {
                    console.log(error)
                });
        } else {
            console.log('no access token')
        } 
    }

    getNewReleases() {
        if (this.props.accessToken) {
            axios.get(this.state.newReleasesUrl, 
                { headers: {"Authorization" : `Bearer ${this.props.accessToken}`} })
                .then(res => {
                    this.setState({  
                        newReleasesUrl: res.data.albums.next,                    
                        newReleases: this.state.newReleases.concat(res.data.albums.items),
                    });

                    // if there are more albums, recurse!
                    if (res.data.albums.next) 
                        this.getNewReleases();
                    else {
                        this.setState({
                            newReleasesDataIsLoaded: true,
                        });

                        if (this.state.artistsDataIsLoaded) this.getMyNewReleases();
                    }
                }).catch((error) => {
                    console.log(error)
                });
        } else {
            console.log('no access token')
        } 
    }

    getMyNewReleases() {
        var newReleases = this.state.newReleases.filter(release => {
            return this.state.artists.filter(artist => {
                return release.artists.map(a => a.id).indexOf(artist.id) >= 0;
            }).length > 0; 
        });

        this.setState({
            myNewReleases: newReleases
        });
    }

    renderArtists(artists) {
        if (artists.lengh > 0) {
            return artists.map(a => {
                return <span>{a.name}</span>
            }).join(", ");
        } else {
            return <span>{artists[0].name}</span>;
        }
    }

    renderNewRelease(release) {
        return (
            <div>
                <p>
                    <span>{release.name} ({release.album_type}) - </span>
                    {
                        this.renderArtists(release.artists)
                    }
                </p>
            </div>
          );
    }

    componentDidMount() {
        this.getArtists();
        this.getNewReleases();
    }

    render() {
        if (!this.state.artistsDataIsLoaded || !this.state.newReleasesDataIsLoaded) 
            return <div><h1> Loading... </h1></div>;
   
        return (
            <div>
                <div>My New Releases: {this.state.myNewReleases.length} </div>
                         
                {
                    this.state.myNewReleases.map((release)=> (    
                        this.renderNewRelease(release)
                    ))
                }
            </div>
        )
    }
}
  