const BASE_URL = process.env.REACT_APP_BACKEND_URL;


export class WebSocketService extends WebSocket {

    private static instance = new WebSocketService();

    static getInstance() {
        return this.instance;
    }

    constructor() {
        super(BASE_URL ?? "");

        this.onopen = (event) => {
            console.log("Websocket connection opened", event);
        };

        this.onclose = (event) => {
            console.log("Websocket connection closed", event);
            WebSocketService.instance = new WebSocketService();
        };
    }

    get isConnecting() {
        return this.readyState === WebSocket.CONNECTING;
    }

    get isConnected() {
        return this.readyState === WebSocket.OPEN;
    }

    get isClosing() {
        return this.readyState === WebSocket.CLOSING;
    }

    get isClosed() {
        return this.readyState === WebSocket.CLOSED;
    }

}