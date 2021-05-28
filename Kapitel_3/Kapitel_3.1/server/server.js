"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
var P_3_1Server;
(function (P_3_1Server) {
    // gibt Starting Server auf der Konsole aus
    console.log("Starting server");
    // initialisiert den Port, process.env gibt ein Objekt zurück mit Infos zur Umgebung
    // process.env.PORT ist ein Element dieses Objekts, durch dessen Benutzung die Wertezuweisung
    //über mehrere Plattformen und die Änderung der Werte wesentlich einfacher wird
    let port = Number(process.env.PORT);
    // wenn port nicht weiter definiert ist
    if (!port)
        // dann setze den port, den wir benutzen, auf 8100
        port = 8100;
    // aufsetzen eines neuen Servers mittels des Befehls Http.createServer()    
    let server = Http.createServer();
    // auf diesen Server setzen wir zwei Listener
    // einen, der mit Anfragen umgeht
    server.addListener("request", handleRequest);
    // und einen der aufgerufen wird, wenn der Server anfängt zuzuhören
    server.addListener("listening", handleListen);
    // hier beginnt der Server zu horchen und zwar auf den Port, den wir oben spezifiziert haben
    server.listen(port);
    // der Listener, der aufgerufen wird, wenn der Server horcht
    function handleListen() {
        // gibt auf der Konsole Listening aus
        console.log("Listening");
    }
    // der Listener, der mit den Anfragen an den Server umgeht
    // er kriegt zwei Parameter übergeben: einmal die Anfrage und einmal die Antwort vom Server
    function handleRequest(_request, _response) {
        // wenn der Server eine Anfrage bekommt, gibt er in der Konsole aus, dass er etwas hört
        console.log("I hear voices!");
        // die übergebene Serverantwort wird als text bzw html zurückgegeben
        _response.setHeader("content-type", "text/html; charset=utf-8");
        // die Serverantwort darf von jedem Client empfangen werden
        _response.setHeader("Access-Control-Allow-Origin", "*");
        // als Serverantwort wird die url der Anfrage auf die Seite geschrieben
        _response.write(_request.url);
        console.log(_response.write(_request.url));
        // die Serverantwort wird beendet
        _response.end();
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map