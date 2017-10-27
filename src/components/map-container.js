import React from 'react'
import {Gmaps, Marker} from 'react-gmaps'

const params = {v: '3.exp', key: 'AIzaSyDmYQLTPwsDPtErGWTgiejz17QCw39MEVQ'}

class MapContainer extends React.Component {
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    })
  }

  onClick(e) {
    console.log('onClick', e)
  }

  render() {
    const {height, width, lat, lng, listings} = this.props

    return (
      <Gmaps
        width={width}
        height={height}
        lat={lat ? lat : '-22.9608099'}
        lng={lng ? lng : '-43.2096142'}
        zoom={15}
        loadingMessage={' '}
        params={params}>
        <Marker
          lat={lat}
          lng={lng}/>

        {listings && listings.map((listing, i) => {
          return <Marker key={i} lat={listing.address.lat} lng={listing.address.lng} />
        })}

      </Gmaps>
    )
  }
}

export default MapContainer
