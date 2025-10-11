"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouters_1 = __importDefault(require("./usersRouters"));
const appointmentRouters_1 = __importDefault(require("./appointmentRouters"));
const router = (0, express_1.Router)();
router.use("/users", usersRouters_1.default);
router.use("/appointments", appointmentRouters_1.default);
exports.default = router;
