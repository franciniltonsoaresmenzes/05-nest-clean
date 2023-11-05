import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { BcrypterHasher } from './bcrypter-hasher'
import { HasherComparer } from '@/domain/forum/application/cryptography/hasher-comparer'
import { HasherGenerator } from '@/domain/forum/application/cryptography/hasher-generator'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HasherComparer, useClass: BcrypterHasher },
    { provide: HasherGenerator, useClass: BcrypterHasher },
  ],
  exports: [Encrypter, HasherComparer, HasherGenerator],
})
export class CryptographyModule {}
