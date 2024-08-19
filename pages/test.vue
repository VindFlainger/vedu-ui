<template>
    <div>
        <a class="skiplink" href="#map">Go to map</a>
        <div id="map" class="map h-[500px]" tabindex="0"></div>
        <button id="zoom-out">Zoom out</button>
        <button id="zoom-in">Zoom in</button>
        <button id="route">Get Route</button>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'empty'
})

import css from '../node_modules/ol/ol.css?inline'


useHead({
    link: {
        value: css,
    }
})


import {onMounted} from "vue";

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

import Geocoder from 'ol-geocoder';
import {XYZ} from "ol/source.js";
import {fromLonLat, toLonLat} from 'ol/proj.js';
import OpenRouteService from 'openrouteservice-js';
import {LineString} from "ol/geom.js";
import {Feature} from "ol";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import {Stroke, Style} from "ol/style.js";
import polyline from '@mapbox/polyline';

// @mapbox/polyline, ol, ol-geocoder, openrouteservice-js


onMounted(() => {
    const vectorSource = new VectorSource(); // Создаем источник для векторных данных
    const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
            stroke: new Stroke({
                color: '#1648c4',
                width: 7,
            }),
        }),
    });

    const map = new Map({
        layers: [
            /* new TileLayer({
                 source: new OSM({

                 }),
                 visible: true,
             }),*/
            new TileLayer({
                source: new XYZ({
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    attributions: 'Tiles © Esri',
                }),
                visible: true,
            }),
            new TileLayer({
                source: new XYZ({
                    url: 'https://api.maptiler.com/maps/2900d16f-0d5f-40fb-b41c-7a79a988060b/?key=aaTJgsTJuf9rAe59rOTa#{z}/{y}/{x}', // Замените YOUR_API_KEY на ваш API ключ
                    attributions: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
                }),
                visible: true,
            }),
            vectorLayer,
        ],
        target: 'map',
        view: new View({
            center: [0, 0],
            zoom: 2,
        }),
    });

    document.getElementById('zoom-out').onclick = function () {
        const view = map.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom - 1);
    };

    document.getElementById('zoom-in').onclick = function () {
        const view = map.getView();
        const zoom = view.getZoom();
        view.setZoom(zoom + 1);
    };

    const geocoder = new Geocoder('nominatim', {
        provider: 'osm', // Используем OpenStreetMap как провайдера геокодирования
        autoComplete: true,
        targetType: 'text-input', // Можно выбрать 'glass-button' или 'input'
        lang: 'en-US',
        placeholder: 'Search for a location...',
        limit: 5,
        keepOpen: true
    });

    map.addControl(geocoder);

    // Обработка события выбора в поиске
    geocoder.on('addresschosen', function (evt) {
        const view = map.getView();
        const coordinates = evt.coordinate;
        view.setCenter(coordinates);
        view.setZoom(12); // Задаем масштаб при переходе к найденному месту
    });

    document.getElementById('route').addEventListener('click', async () => {
        const startCoords = [8.681495, 49.41443]; // Example start coordinates
        const endCoords = [8.687872, 49.420318]; // Example end coordinates

        // Convert coordinates to the format required by OpenRouteService
        const [startLonLat, endLonLat] = [startCoords, endCoords].map(coord => toLonLat(coord));


        const orsClient = new OpenRouteService.Directions({ api_key: '5b3ce3597851110001cf624882549bd1310d4beabe2ca5c15f87f880' });

        try {
            const { routes } = await orsClient.calculate({
                coordinates: [[8.690958, 49.404662], [8.687868, 49.390139]],
                profile: 'driving-car',
                extra_info: ['waytype', 'steepness'],
                format: 'json',
                api_version: 'v2'
                /*coordinates: [startLonLat, endLonLat],
                profile: 'driving-car', // or 'cycling-regular', 'foot-walking'*/
            });

            // Decode polyline string to coordinates
            const polylineString = routes[0].geometry; // Получаем строку polyline
            const routeCoordinates = polyline.decode(polylineString); // Декодируем строку polyline

            const [firstPart, secondPart] = splitRoute(routeCoordinates, 0.4);

            // Convert coordinates to map projection (EPSG:3857)
            const firstSegment = new LineString(firstPart.map(coord => fromLonLat([coord[1], coord[0]])));
            const secondSegment = new LineString(secondPart.map(coord => fromLonLat([coord[1], coord[0]])));


            const firstFeature = new Feature(firstSegment);
            const secondFeature = new Feature(secondSegment);


            vectorSource.clear(); // Очищаем старые маршруты
            vectorSource.addFeature(firstFeature);
            vectorSource.addFeature(secondFeature);


            vectorLayer.setStyle((feature) => {
                const color = feature === firstFeature ? '#ff0000' : '#1648c4'; // Red for the first 40%, blue for the rest
                return new Style({
                    stroke: new Stroke({
                        color: color,
                        width: 7,
                    }),
                });
            });


            // Calculate extent and fit the view
            const extent = firstSegment.getExtent().concat(secondSegment.getExtent());
            map.getView().fit(extent);


        } catch (error) {
            console.error('Error fetching route:', error);
        }
    });

    function splitRoute(routeCoordinates, fraction) {
        const splitIndex = Math.floor(routeCoordinates.length * fraction);
        const firstPart = routeCoordinates.slice(0, splitIndex + 1); // +1 чтобы включить splitIndex
        const secondPart = routeCoordinates.slice(splitIndex);

        return [firstPart, secondPart];
    }


})

</script>
