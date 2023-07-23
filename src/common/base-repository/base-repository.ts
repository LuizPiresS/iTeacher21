import { PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { IBaseRepository } from './interfaces/base.repository.interface';

@Injectable()
export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.prisma[this.getModelName()].create({ data });
  }

  async findById(id: string): Promise<T | null> {
    return this.prisma[this.getModelName()].findUnique({ where: { id } });
  }

  async findAll(): Promise<T[]> {
    return this.prisma[this.getModelName()].findMany();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.prisma[this.getModelName()].update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.prisma[this.getModelName()].delete({
      where: { id },
    });
    return !!result;
  }

  // Método abstrato para obter o nome do modelo do Prisma (deve ser implementado nas subclasses)
  protected abstract getModelName(): string;
}
