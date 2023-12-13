"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const port = 4000;
app.use(body_parser_1.default.json());
app.use('/awesome/applicant', userRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map