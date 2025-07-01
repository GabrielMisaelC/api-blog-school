import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { StudentModule } from './student.module';
import { LoginStudent } from './dto/login-student.dto';
import { UpdatePasswordStudent } from './dto/update-password-student.dto';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({ status: 201, description: 'The student has been successfully created.' })
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiBody({ type: CreateStudentDto })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all student' })
  @ApiResponse({ status: 201, description: 'successfully.' })
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Id of student', required: true, type: Number, })
  @ApiOperation({ summary: 'Find only a id student' })
  @ApiResponse({ status: 201, description: 'successfully.', type: StudentModule })
  @ApiResponse({ status: 202, description: 'None found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'Id of student', required: true, type: Number, })
  @ApiOperation({ summary: 'Update only a id student' })
  @ApiResponse({ status: 201, description: 'successfully.', type: StudentModule })
  @ApiResponse({ status: 202, description: 'None found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiBody({ type: CreateStudentDto })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Id of student', required: true, type: Number, })
  @ApiOperation({ summary: 'Delete only a id student' })
  @ApiResponse({ status: 201, description: 'successfully.', type: StudentModule })
  @ApiResponse({ status: 202, description: 'None found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update password student' })
  @ApiResponse({ status: 201, description: 'successfully.', type: StudentModule })
  @ApiResponse({ status: 202, description: 'None found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiBody({ type: UpdatePasswordStudent })
  passwordUpdate(@Body() updatePasswordStudent: UpdatePasswordStudent) {
    return this.studentService.passwordUpdate(updatePasswordStudent);
  }

  @Get()
  @ApiOperation({ summary: 'Login student' })
  @ApiResponse({ status: 201, description: 'successfully.', type: StudentModule })
  @ApiResponse({ status: 202, description: 'None found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiBody({ type: LoginStudent })
  login(@Body() loginStudent: LoginStudent) {
    return this.studentService.login(loginStudent);
  }
}
