"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authNewCredentials = exports.createNewCredentials = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const CredentialEntity_1 = require("../Entities/CredentialEntity");
const dataSource_1 = require("../config/dataSource");
const createNewCredentials = (entityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newCredential = entityManager.create(CredentialEntity_1.Credential, {
        username: username,
        password: hashedPassword,
    });
    yield entityManager.save(newCredential);
    return newCredential;
});
exports.createNewCredentials = createNewCredentials;
const authNewCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialUse = yield dataSource_1.credentialModel.findOne({
        where: {
            username,
        },
    });
    if (!credentialUse) {
        throw new Error("Username no encontrado");
    }
    const isTrue = yield bcrypt_1.default.compare(password, credentialUse === null || credentialUse === void 0 ? void 0 : credentialUse.password);
    if (!isTrue) {
        console.log("Contraseña inválida");
    }
    return credentialUse.id;
});
exports.authNewCredentials = authNewCredentials;
