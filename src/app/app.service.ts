import { Injectable } from "@angular/core";
import { Socket } from 'ng-socket-io';

@Injectable()
export class AppService {

    value: number = 0;

    onAvailable: Function = () => { };
    onUnavailable: Function = () => { };

    constructor(private socket: Socket) {
        this.socket.connect();
        this.socket.on('available', (value) => this._onAvailable(value));
        this.socket.on('unavailable', (value) => this._onUnavailable(value));
    }

    private _onAvailable(value) {
        this.onAvailable(value);
    }

    private _onUnavailable(value) {
        this.onUnavailable(value);
    }

}