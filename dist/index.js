"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv/config");
const express_1 = tslib_1.__importDefault(require("express"));
const xata_1 = require("./libs/xata");
console.log(process.env.XATA_API_KEY);
const app = (0, express_1.default)();
const client = (0, xata_1.getXataClient)();
app.use(express_1.default.json());
app.listen(8000, () => {
    console.log('listening on 8000');
});
