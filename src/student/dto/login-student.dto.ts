import { ApiProperty } from '@nestjs/swagger';

export class LoginStudent {
    @ApiProperty({
        description: 'Student e-mail'
    })
    email: string;
    @ApiProperty({
        description: 'Student password'
    })
    password: string;
}

