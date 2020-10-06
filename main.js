// 카카오 지도 js
const main = () => {
  // 리앤 통신
  const button = document.getElementById('send');
  button.onclick = () => {
    var lat = document.getElementById('lat').innerText;
    var lng = document.getElementById('lng').innerText;
    var coord = new kakao.maps.LatLng(lat, lng);
    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var address = result[0].address.address_name;
        var result = `${address},${lat},${lng}`;
        window.ReactNativeWebView.postMessage(result);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };
  // 좌표 값 가져 오기
  const qs = getQueryStringObject();
  const lat = qs.lat; // 925641
  const lng = qs.lng; // 1666020
  var container = document.getElementById('map');
  var options = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3,
  };
  var map = new kakao.maps.Map(container, options);
  var geocoder = new kakao.maps.services.Geocoder();
  var mapTypeControl = new kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
  var zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  var marker = new kakao.maps.Marker({
    position: map.getCenter(),
  });
  marker.setMap(map);
  kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    var latlng = mouseEvent.latLng;
    marker.setPosition(latlng);
    document.getElementById('lat').innerText = latlng.getLat();
    document.getElementById('lng').innerText = latlng.getLng();
  });

  
  function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == '') return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
      var p = a[i].split('=', 2);
      if (p.length == 1) b[p[0]] = '';
      else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
    }
    return b;
  }
};
window.onload = main;
