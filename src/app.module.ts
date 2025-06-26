import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { PostModule } from './post/post.module';
import { TeacherModule } from './teacher/teacher.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [StudentModule, TeacherModule, PostModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
