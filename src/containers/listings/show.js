import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchListingIfNeeded
} from '../../modules/listings/show'

class Listings extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(fetchListingIfNeeded(id));
  }

  render() {
    const { isShowingPopup } = this.props;
    const { listing } = this.props.listing

    if (!listing) {
      return <div>Fetching listing</div>
    }

    return <div className="listing">
      <header>
        <div>
          <div>
            <h6>Apartamento</h6>
            <p>{listing.address.street}, {listing.address.street_number}</p>
            <p>
              {listing.address.neighborhood}, {listing.address.city}
            </p>
          </div>
          <div>
            R${listing.price}
          </div>
        </div>

        <button className="green">
          Marcar Visita
        </button>
      </header>

      <div className="main-content">
        <img src="http://www.judicearaujo.com.br/imoveis/010420141931256rjkwb.jpg" alt="Map"/>

        <div>
          <div>
            {listing.description}
          </div>
          <table>
            <tbody>
              <tr>
                <td>Quartos</td>
                <td>{listing.rooms}</td>
              </tr>
              <tr>
                <td>Vagas Garagem</td>
                <td>{listing.garage_spots}</td>
              </tr>
              <tr>
                <td>Banheiros</td>
                <td>{listing.bathrooms}</td>
              </tr>
              <tr>
                <td>Andar</td>
                <td>{listing.floor}</td>
              </tr>
              <tr>
                <td>Área</td>
                <td>{listing.area}</td>
              </tr>
              <tr>
                <td>R$/m²</td>
                <td>xxxx</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <img src="http://www.mapaplan.com/seating-plan/wembley-stadium-chart-london/high-resolution/wembley-stadium-london-seating-plan-09-google-map-high-resolution.jpg" alt="Map"/>

      <footer>
        <Link to="/">‹ Ver Todos os Imóveis</Link>
        <button className="green">
          Marcar Visita
        </button>
      </footer>

      {isShowingPopup &&
        <Popup/>
      }

    </div>

  }
}

function Popup() {
  return <div className="popup">
    <div>
      <h1>Marcar Visita</h1>
      <p>Teremos um grande prazer em mostrar este apartamento para você. Por favor insira abaixo seu nome, email e telefone com ddd e entraremos em contato em minutos.</p>

      <input type="text" name="name" placeholder="Nome"/>
      <input type="text" name="email" placeholder="Email"/>
      <input type="text" name="phone" placeholder="Telefone"/>
      <button>Enviar</button>
    </div>
  </div>
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  isFetching: state.listing.isFetching,
  isShowingPopup: state.listing.isShowingPopup,
  listing: state.listing
})

export default connect(
  mapStateToProps
)(Listings)
