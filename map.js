'use strict';
import {
  MapContainer,
  TileLayer,
  useMap,
} from 'https://cdn.esm.sh/react-leaflet'

const position = [55.9447956,-3.1875313]
const destination = [55.944433, -3.187893]

render(
  <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        Current Location.
      </Popup>
    </Marker>
    <Marker position={destination}>
      <Popup>
        Nearest bin.
      </Popup>
    </Marker>
  </MapContainer>
)













//
//class LikeButton extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = { liked: false };
//  }
//
//  render() {
//    if (this.state.liked) {
//      return 'You liked comment number ' + this.props.commentID;
//    }
//
//    return e(
//      'button',
//      { onClick: () => this.setState({ liked: true }) },
//      'Like'
//    );
//  }
//}
//
// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll('.map_container')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const commentID = parseInt(domContainer.dataset.commentid, 10);
    const root = ReactDOM.createRoot(domContainer);
    root.render(
      e(LikeButton, { commentID: commentID })
    );
  });