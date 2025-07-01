import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { TeacherModule } from './teacher.module';
import { UpdatePasswordTeacher } from './dto/update-password-teacher.dto';
import { LoginTeacher } from './dto/login-teacher.dto';


@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Post()
  @ApiOperation({ summary: 'Create teacher' })
  @ApiResponse({ status: 201, description: 'The teacher has been successfully created.' })
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiBody({ type: CreateTeacherDto })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all teachers' })
  @ApiResponse({ status: 201, description: 'successfully.', isArray: true })
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.', isArray: true })
  @ApiResponse({ status: 500, description: 'Internal error.', isArray: true })
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id', description: 'Id of teacher', required: true, type: Number,})
  @ApiOperation({ summary: 'Find only a id teachers' })
  @ApiResponse({ status: 201, description: 'successfully.', type: TeacherModule})
  @ApiResponse({ status: 202, description: 'None found.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.'})
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({name: 'id', description: 'Id of teacher', required: true, type: Number,})
  @ApiOperation({ summary: 'Update only a id teachers' })
  @ApiResponse({ status: 201, description: 'successfully.', type: TeacherModule})
  @ApiResponse({ status: 202, description: 'None found.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.'})
  @ApiBody({ type: CreateTeacherDto })
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update password teacher' })
  @ApiResponse({ status: 201, description: 'successfully.', type: TeacherModule})
  @ApiResponse({ status: 202, description: 'None found.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.'})
  @ApiBody({ type: UpdatePasswordTeacher })
  passwordUpdate(@Body() updatePasswordTeacher: UpdatePasswordTeacher) {
    return this.teacherService.passwordUpdate(updatePasswordTeacher);
  }

  @Get()
  @ApiOperation({ summary: 'Login teacher' })
  @ApiResponse({ status: 201, description: 'successfully.', type: TeacherModule})
  @ApiResponse({ status: 202, description: 'None found.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.'})
  @ApiBody({ type: LoginTeacher })
  login(@Body() loginTeacher: LoginTeacher) {
    return this.teacherService.login(loginTeacher);
  }

  @Delete(':id')
  @ApiParam({name: 'id', description: 'Id do usuário', required: true, type: Number,})
  @ApiOperation({ summary: 'Delete only a id teachers' })
  @ApiResponse({ status: 201, description: 'successfully.', type: TeacherModule})
  @ApiResponse({ status: 202, description: 'None found.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.'})
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
