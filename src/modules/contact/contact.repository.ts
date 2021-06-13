import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@providers/prisma/prisma.service';

@Injectable()
export class ContactRepository {
  constructor(private readonly databaseService: PrismaService) {}

  async createOne(entry: Prisma.ContactCreateInput) {
    const contact = await this.databaseService.contact.create({
      data: entry,
    });
    return contact;
  }

  async createMany(entries: Prisma.ContactCreateManyInput[]) {
    const contact = await this.databaseService.contact.createMany({
      data: entries,
    });
    return contact;
  }

  async findAll() {
    const contacts = await this.databaseService.contact.findMany();
    return contacts;
  }

  async findOneById(registerId: string) {
    const contact = await this.databaseService.contact.findUnique({
      where: {
        id: registerId,
      },
    });
    return contact;
  }

  async findOne(args: Prisma.ContactFindFirstArgs) {
    const contact = await this.databaseService.contact.findFirst(args);
    return contact;
  }

  async deleteOneById(registerId: string) {
    await this.databaseService.contact.delete({
      where: {
        id: registerId,
      },
    });
    return true;
  }

  async deleteMany(where: Prisma.ContactWhereInput) {
    await this.databaseService.contact.deleteMany({
      where,
    });
    return true;
  }
}
