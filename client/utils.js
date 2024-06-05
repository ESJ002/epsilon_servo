import * as MapApi from "../map_api.js";
import { getMap } from "./components/map.js";

export function createStationElem(station) {
  let elem = document.createElement("div");
  elem.className = "station";

  let textDiv = document.createElement("div")
  let name = document.createElement("p");
  let address = document.createElement("p");
  let owner = document.createElement("img");

  name.textContent = station.name;
  address.textContent = station.address;

  owner.className = "nearest-icon";

  switch (station.owner) {
    case "Caltex":
      owner.src = "../images/caltex.png";
      break;
    case "Shell":
      owner.src = "../images/shell.png";
      break;
    case "7-Eleven Pty Ltd":
      owner.src = "../images/7-eleven.png";
      break;
    case "Ampol":
      owner.src = "../images/ampol.png";
      break;
    case "BP":
      owner.src = "../images/bp.png";
      break;
    case "United":
      owner.src = "../images/united.png";
      break;
    default:
      owner.src = "../images/fuel.png";
  }

  elem.appendChild(owner);
  textDiv.appendChild(name);
  textDiv.appendChild(address);
  elem.appendChild(textDiv)
  return elem;
}

export async function createCentreElem(map) {
  const currentCenter = map.getCenter();
  const mapCenter = document.querySelector(".map-centre");

  let lat = document.createElement("p");
  let lng = document.createElement("p");
  let lookupButton = document.createElement("button");
  let centreAddressDiv = document.createElement("div");

  lat.textContent = `lat: ${currentCenter.lat()}`;
  lng.textContent = `lng: ${currentCenter.lng()}`;
  lookupButton.textContent = "lookup address";
  lookupButton.dataset.lat = currentCenter.lat();
  lookupButton.dataset.lng = currentCenter.lng();

  lookupButton.addEventListener("click", handleGetAddress);

  function handleGetAddress(event) {
    let centre = event.target;

    MapApi.fetchAddress(centre.dataset.lat, centre.dataset.lng).then(
      (address) => {
        centreAddressDiv.textContent = address.results[0].formatted_address;
      }
    );
  }
  mapCenter.appendChild(lat);
  mapCenter.appendChild(lng);
  mapCenter.appendChild(centreAddressDiv);
  mapCenter.appendChild(lookupButton);
}

export async function createMarker (station, AdvancedMarkerElement, spotlight = null) {
  const lat = Number(station.latitude);
  const lng = Number(station.longitude);

  const position = {
    lat: lat,
    lng: lng,
  };
  const markerImg = document.createElement("img");
  markerImg.className = "marker";

  switch (station.owner) {
    case "Caltex":
      markerImg.src = "../images/caltex.png";
      break;
    case "Shell":
      markerImg.src = "../images/shell.png";
      break;
    case "7-Eleven Pty Ltd":
      markerImg.src = "../images/7-eleven.png";
      break;
    case "Ampol":
      markerImg.src = "../images/ampol.png";
      break;
    case "BP":
      markerImg.src = "../images/bp.png";
      break;
    case "United":
      markerImg.src = "../images/united.png";
      break;
    default:
      markerImg.src = "../images/fuel.png";
  }

  const marker = new AdvancedMarkerElement({
    map: getMap(),
    position: position,
    title: station.name,
    content: markerImg,
  });

  const name = station.name;
  const address = station.address;
  const owner = station.owner;

  const contentString = `<div id="content">
    <h1>${name}</h1>
    <p>${address}</p>
    <p>${owner}</p>
    <p>${lat.toFixed(6)}</p>
    <p>${lng.toFixed(6)}</p>
    <button>Save</button>
  </div>
  `;
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    // ariaLabel: "NAME"
  });
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });
}