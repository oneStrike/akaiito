"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryption = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
const encryption = async function encryption(str, salt) {
    if (!salt) {
        salt = (0, crypto_1.randomBytes)(8).toString('hex');
    }
    const key = (await scrypt(str, salt, 32));
    return salt + '.' + key.toString('hex');
};
exports.encryption = encryption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVuY3J5cHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQXVEO0FBQ3ZELCtCQUFnQztBQUVoQyxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFTLEVBQUMsZUFBTyxDQUFDLENBQUE7QUFFMUIsTUFBTSxVQUFVLEdBQUcsS0FBSyxVQUFVLFVBQVUsQ0FDakQsR0FBVyxFQUNYLElBQWE7SUFFYixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixJQUFJLEdBQUcsSUFBQSxvQkFBVyxFQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBQ0QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFXLENBQUE7SUFDbkQsT0FBTyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDekMsQ0FBQyxDQUFBO0FBVFksUUFBQSxVQUFVLGNBU3RCIn0=