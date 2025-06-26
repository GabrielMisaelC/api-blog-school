import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class TeacherService {

  constructor(private prisma: PrismaService) {}

  create(createTeacherDto: CreateTeacherDto) {
    const teacher = this.prisma.teacher.create({
      data: {
        name: createTeacherDto.name,
        email: createTeacherDto.email,
        schoolMaterial: createTeacherDto.email
      }
    })
    return teacher;
  }

  findAll() {
    return this.prisma.teacher.findMany();
  }

  findOne(id: number) {
    return this.prisma.teacher.findFirst({
      where: {id}
    });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.prisma.teacher.update({
      where: {id},
      data: {
        name: updateTeacherDto.name,
        email: updateTeacherDto.email,
        schoolMaterial: updateTeacherDto.schoolMaterial
      }
    });
  }

  remove(id: number) {
    return this.prisma.teacher.delete({
      where: {id}
    });
  }
}
