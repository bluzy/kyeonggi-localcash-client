import React from 'react';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import Map from './Map';

class LocalCash extends React.Component {

  render() {
    return (
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}
        error={<p>Maps Load Error</p>}
        loading={<p>Loading...</p>}>
        <Map />
      </RenderAfterNavermapsLoaded>
    )
  }
}

export default LocalCash;