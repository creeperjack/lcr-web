import React, { Component } from 'react';

/* global $ */

import VideoPlayer from '../components/VideoPlayer';

import {defaultData, defaultPoster } from '../Variables.jsx';

import NowPlaying from '../components/NowPlaying';

class Live extends Component {

  state = { 
      showData : {}
  };

  defaults = defaultData;

  updateShowData(){
  $.get('/api/public/currentshow').done((response) => {
      this.setState({showData: response});
  });
  }

  componentWillMount(){
      this.updateShowData();
      this.refreshSongInterval = setInterval(this.updateShowData.bind(this), 10000);
  }

  componentWillUnmount(){
      clearInterval(this.refreshSongInterval);
  }

  render() {

    var showData = this.state.showData;

    if(!showData.title) showData.title = this.defaults.title;
    if(!showData.description) showData.description = this.defaults.description;
    if(!showData.image) showData.image = this.defaults.image;

    return (
        <div className="" id="live-container">
          <div className="row">
              <div class="col-sm-12 col-lg-8 col-xl-7 offset-xl-2">
                <div className="card">
                  <img className="card-img-top" src={showData.image} alt="Show Image" />
                </div>
                <div className="card-body now-playing-info">
                  <h4 className="card-title">{showData.title}</h4>
                  {showData.description}
                </div>
              </div>
              <div class="col-sm-12 col-lg-4 col-xl-3">
                { (!showData.disableSongDisplay)? <NowPlaying /> : "" }
               </div>
          </div> 
      </div>
    );
  }
}

export default Live;
