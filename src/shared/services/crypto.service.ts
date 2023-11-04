import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt'


@Injectable()
export class CryptoProviderService {
    constructor(
        private readonly config: ConfigService
    ){}

    async hashKeyCrypto(password) {
        const iv = randomBytes(16)
        const secrectKey = this.config.get('HASH_KEY')
        const key = (await promisify(scrypt)(secrectKey, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const encryptedText = Buffer.concat([
            cipher.update(password),
            cipher.final(),
        ]);

        return encryptedText
    }

    async decrypKey(encryptedText) {
        const iv = randomBytes(16)
        const secrectKey = this.config.get('HASH_KEY')
        const key = (await promisify(scrypt)(secrectKey, 'salt', 32)) as Buffer;
        const decipher = createDecipheriv('aes-256-ctr', key, iv);
        const decryptedText = Buffer.concat([
            decipher.update(encryptedText),
            decipher.final(),
        ]);
        return decryptedText
    }

    async bcryptPassword(password) {
        const salt = 10
        const hash = await bcrypt.hash(password, salt)
        return hash
    }

    async comparePassword(hashPassword, password) {
        return bcrypt.compare(password, hashPassword)
    }
}