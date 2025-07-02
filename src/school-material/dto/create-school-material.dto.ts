import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolMaterialDto {
    @ApiProperty({
        description: 'School Material title'
    })
    name: string
}
