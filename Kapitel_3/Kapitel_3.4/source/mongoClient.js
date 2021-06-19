"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kapiteldreivier = void 0;
const Mongo = require("mongodb");
var Kapiteldreivier;
(function (Kapiteldreivier) {
    async function connectToMongo(_databaseUrl) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_databaseUrl, options);
        await mongoClient.connect();
        Kapiteldreivier.rantData = mongoClient.db("Kapitel_3_4").collection("Rants");
        console.log("database connection ", Kapiteldreivier.rantData != undefined);
    }
    Kapiteldreivier.connectToMongo = connectToMongo;
})(Kapiteldreivier = exports.Kapiteldreivier || (exports.Kapiteldreivier = {}));
//# sourceMappingURL=mongoClient.js.map