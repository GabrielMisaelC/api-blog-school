import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordTeacher {
    @ApiProperty({
        description: 'Teacher e-mail'
    })
    email: string;
    @ApiProperty({
        description: 'Teacher password'
    })
    password: string;
}

