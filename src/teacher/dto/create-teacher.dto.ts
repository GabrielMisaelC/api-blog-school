import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
    @ApiProperty({
        description: 'Teacher e-mail'
    })
    email: string;
    @ApiProperty({
        description: 'Name of teacher'
    })
    name: string;
    @ApiProperty({
        description: 'Material techer work'
    })
    schoolMaterial: string;
}
