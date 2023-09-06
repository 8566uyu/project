"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const user_authority_entity_1 = require("./user-authority.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'kakao_id', length: 45 }),
    __metadata("design:type", String)
], User.prototype, "kakaoId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'email', length: 100 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'name', nullable: true, length: 45 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'gender', nullable: true, length: 10 }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'phone', nullable: true, length: 20 }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'birth', nullable: true, length: 10 }),
    __metadata("design:type", String)
], User.prototype, "birth", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'profile_image', nullable: true, length: 200 }),
    __metadata("design:type", String)
], User.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', {
        name: 'created_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', {
        name: 'updated_at',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_authority_entity_1.UserAuthority, (userAuthority) => userAuthority.user, {
        eager: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "authorities", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('user', { schema: 'slider' })
], User);
//# sourceMappingURL=user.entity.js.map