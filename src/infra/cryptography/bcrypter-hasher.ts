import { HasherComparer } from '@/domain/forum/application/cryptography/hasher-comparer'
import { HasherGenerator } from '@/domain/forum/application/cryptography/hasher-generator'
import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

@Injectable()
export class BcrypterHasher implements HasherGenerator, HasherComparer {
  private HASH_SALT_LENGHT = 8

  async compare(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash)
  }

  async hash(plain: string): Promise<string> {
    return await hash(plain, this.HASH_SALT_LENGHT)
  }
}
