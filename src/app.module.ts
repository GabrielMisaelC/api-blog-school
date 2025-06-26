import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { PostModule } from './post/post.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [StudentModule, TeacherModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
