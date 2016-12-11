import { Component, ViewEncapsulation, Output, Input, OnChanges } from '@angular/core';

declare let google: any;
let nextUniqueId = 0;

@Component({
    selector: 'google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['google-map.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoogleMapComponent implements OnChanges {

    @Input() id: string = `google-${nextUniqueId++}`;
    @Input() location = { lat: 0, lng: 0 };
    @Input() info = '';
    @Input() infoLabelSize = 10;
    @Input() markerSize = 20;
    @Input() markerIcon = "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png";


    private _map;
    private _mapTag;
    private _infowindow;
    private _marker;
    private _infoLabel;
    private _isInitialized = false;


    get mapId(): string { return `${this.id}-map`; }


    ngOnChanges(changes) {
        this.update(this.location, this.info);
    }

    ngOnInit() {
        setTimeout(() => {
            this._mapTag = document.getElementById(this.mapId);
            this._infoLabel = document.getElementById(`${this.mapId}-info`);

            const top = (this._mapTag.clientHeight / 2);
            this._infoLabel.style.top = `${top - this.infoLabelSize}px`;
            this._infoLabel.style.fontSize = `${this.infoLabelSize}px`;

            this._map = new google.maps.Map(this._mapTag, {
                draggable: false,
                scrollwheel: false,
                disableDoubleClickZoom: true,
                zoom: 18,
                styles: [{
                    featureType: 'poi.business',
                    stylers: [{ visibility: 'off' }]
                }, {
                    featureType: 'transit',
                    elementType: 'labels.icon',
                    stylers: [{ visibility: 'off' }]
                }]
            });

            this._marker = new google.maps.Marker({
                map: this._map,
                clickable: false
            });

            this._isInitialized = true;
            this.update(this.location, this.info);
        }, 0);
    }

    update(location: Object, info: string): void {
        if (this._isInitialized) {
            this._marker.setVisible(false);

            if (location['lat'] && location['lng']) {
                this.showMapElelemts();

                this.updateMap(location);
                this.updateMarker(location);
                this.updateInfowindow(info);
            } else {
                this.hideMapElelemts();
            }
        }
    }

    private updateMap(location: Object): void {
        this._map.setCenter(location);
    }

    private updateMarker(location: Object): void {
        this._marker.setIcon({
            url: this.markerIcon,
            scaledSize: new google.maps.Size(this.markerSize, this.markerSize),
            origin: new google.maps.Point(0, 0)
        });
        this._marker.setPosition(location);
        this._marker.setVisible(true);
    }

    private updateInfowindow(info = ''): void {
        this._infoLabel.innerText = info;
    }

    private showMapElelemts(): void {
        this._infoLabel.style.visibility = 'visible';
        this._mapTag.style.visibility = 'visible';
    }

    private hideMapElelemts(): void {
        this._infoLabel.style.visibility = 'visible';
        this._mapTag.style.visibility = 'visible';
    }
}
