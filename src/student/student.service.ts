import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/database/prisma.service';
import { LoginStudent } from './dto/login-student.dto';
import { UpdatePasswordStudent } from './dto/update-password-student.dto';

@Injectable()
export class StudentService {

  constructor(private prisma: PrismaService) { }

  create(createStudentDto: CreateStudentDto) {
    const student = this.prisma.student.create({
      data: {
        email: createStudentDto.email,
        name: createStudentDto.name,
        password: createStudentDto.password
      }
    })
    return student;
  }

  findAll() {
    return this.prisma.student.findMany();
  }

  findOne(id: number) {
    return this.prisma.student.findFirst({
      where: { id }
    });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: { id },
      data: {
        name: updateStudentDto.name,
        email: updateStudentDto.email
      }
    });
  }

  remove(id: number) {
    return this.prisma.student.delete({
      where: { id }
    });
  }

  login(email: string, password: string) {
    const teacher = this.prisma.teacher.findFirst({
      where: {
        AND: [
          { email: email },
          { password: password }
        ]
      }
    })

    if (teacher == null)
      return false

    return true
  }

  passwordUpdate(email: string, password: string) {
    const newPasswordStudent = this.prisma.teacher.update({
      where: { email: email },
      data: {
        password: password
      }
    })
    return newPasswordStudent
  }
}
