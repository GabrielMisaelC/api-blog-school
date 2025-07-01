import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PostModule } from './post.module';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 201, description: 'The post has been successfully created.' })       
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiBody({ type: CreatePostDto })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all post' })
  @ApiResponse({ status: 201, description: 'successfully.' })   
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id', description: 'Id of post', required: true, type: Number,})
  @ApiOperation({ summary: 'Find only a id post' })
  @ApiResponse({ status: 201, description: 'successfully.', type: PostModule})
  @ApiResponse({ status: 202, description: 'None found.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.'})
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({name: 'id', description: 'Id of post', required: true, type: Number,})
  @ApiOperation({ summary: 'Update only a id post' })
  @ApiResponse({ status: 201, description: 'successfully.', type: PostModule})
  @ApiResponse({ status: 202, description: 'None found.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.'})
  @ApiBody({ type: UpdatePostDto })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiParam({name: 'id', description: 'Id of post', required: true, type: Number,})
  @ApiOperation({ summary: 'Delete only a id post' })
  @ApiResponse({ status: 201, description: 'successfully.', type: PostModule})
  @ApiResponse({ status: 202, description: 'None found.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.'})
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
