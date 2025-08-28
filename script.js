var map = L.map('map').setView([37.7, -122.4], 10.5);

// load a tile layer
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by Stamen Design, under CC BY 3.0.',
	maxZoom: 20
}).addTo(map);


$.getJSON('https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/sf_crime.geojson', function(data){
    var ratIcon = L.icon({
      iconUrl: 'https://www.s4g.com/thumbnail.asp?file=assets/images/mighty-mouse.jpg&maxx=400&maxy=0',
      iconSize: [60,60]
    });
    var rodents = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng,{icon: ratIcon});
        marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT + '<br/>' + feature.properties.SUBJECT);
        return marker;
      }
    });
    var clusters = L.markerClusterGroup();
    clusters.addLayer(rodents);
    map.addLayer(clusters);
});