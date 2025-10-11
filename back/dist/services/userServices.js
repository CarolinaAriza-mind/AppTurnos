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
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnUserByIdServices = exports.AllUsersServices = exports.createNewUserService = void 0;
const dataSource_1 = require("../config/dataSource");
const UserEntity_1 = require("../Entities/UserEntity");
const credentialServices_1 = require("./credentialServices");
const createNewUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const resultTrans = dataSource_1.appDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const credential = yield (0, credentialServices_1.createNewCredentials)(entityManager, user.username, user.password);
        const nuevoUsuario = entityManager.create(UserEntity_1.User, {
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
            credentials: credential,
        });
        return yield entityManager.save(nuevoUsuario);
    }));
    return resultTrans;
});
exports.createNewUserService = createNewUserService;
const AllUsersServices = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield dataSource_1.userModel.find();
});
exports.AllUsersServices = AllUsersServices;
const returnUserByIdServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const IdUser = yield dataSource_1.userModel.findOne({
        where: {
            id: id,
        },
        relations: ["appointment"]
    });
    if (!IdUser)
        throw new Error(`Usuario con id: ${id}, no encontrado`);
    return IdUser;
});
exports.returnUserByIdServices = returnUserByIdServices;
