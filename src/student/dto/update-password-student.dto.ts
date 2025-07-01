import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordStudent {
    @ApiProperty({
        description: 'Student e-mail'
    })
    email: string;
    @ApiProperty({
        description: 'Student password'
    })
    password: string;
}

