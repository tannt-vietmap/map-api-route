import * as PolylineUtil from "./polyline-endcode";
var apiKey = '037b133e9e910d8e978e9189d2c97c41e89f33c51001994d';
var map = L.map('map').setView([10.764562461092875,106.6640322418213], 8);
L.tileLayer(`https://maps.vietmap.vn/api/tm/{z}/{x}/{y}.png?apikey=${apiKey}`, {
    maxZoom: 18,
}).addTo(map);
const startLatLng = [10.765562461092875,105.6670322418213];
const endLatLng = [10.764562461092875,106.6640322418213];
const start = L.marker(startLatLng).addTo(map);
const end = L.marker(endLatLng).addTo(map);
const callRouteApi = async () => {
  const response = await fetch(`https://maps.vietmap.vn/api/route?api-version=1.1&apikey=${apiKey}&point=${startLatLng[0]},${startLatLng[1]}&point=${endLatLng[0]},${endLatLng[1]}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json();
 
  const paths = myJson.paths[0];
  const points = paths.points;
  const decode = L.Polyline.fromEncoded(points)
  
  drawLine(decode.getLatLngs());
}
callRouteApi();
const drawLine = (listLatLng) =>{
  console.log(listLatLng)
  const latLngs = []
  listLatLng.map(e=>{
    latLngs.push([e.lat,e.lng]);
  });
  console.log(latLngs)
  var polyline = L.polyline(latLngs, {color: 'red'}).addTo(map);
  map.fitBounds(polyline.getBounds());
}