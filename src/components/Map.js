import React from 'react';
import { NaverMap, Marker } from 'react-naver-maps';
import axios from 'axios';
import { debounce } from 'lodash';

class Map extends React.Component {

  state = {
    loading: false,
    shops: []
  }

  constructor(props) {
    super(props);
    this.onBoundsChanged = debounce(this.onBoundsChanged, 500);
  }

  componentDidMount() {
    this.onBoundsChanged(this.map.getBounds())
  }

  onBoundsChanged = (bound) => {
    console.log(bound);
    const { _min, _max } = bound;
    const { _lat: fromLat, _lng: fromLng } = _min;
    const { _lat: toLat, _lng: toLng } = _max;
    this.loadShops(fromLat, fromLng, toLat, toLng);
  }


  loadShops = (fromLat, fromLng, toLat, toLng) => {
    this.setState({
      loading: true
    })

    const url = `${process.env.REACT_APP_API_HOST}/shops?from_lat=${fromLat}&from_lng=${fromLng}&to_lat=${toLat}&to_lng=${toLng}`;
    console.log(url);

    axios.get(url)
      .then(r => {
        console.log(r.data);
        this.setState({
          loading: false,
          shops: r.data
        })
      })
  }

  render() {
    const { loading, shops } = this.state;

    // const navermaps = window.naver.maps;

    return (
      <div>
        <NaverMap
          naverRef={r => this.map = r}
          mapDivId={"localcash-map"}
          style={{
            width: '100%',
            height: '600px'
          }}
          defaultCenter={{ lat: 37.433, lng: 127.15 }}
          onBoundsChanged={this.onBoundsChanged}
        >
          {shops.map(shop => (
            <Marker
              key={shop.id}
              position={{ lat: shop.lat, lng: shop.lng }}
              onClick={() => alert(shop.name)} />
          ))}
        </NaverMap>
      </div>
    )
  }
}

export default Map;