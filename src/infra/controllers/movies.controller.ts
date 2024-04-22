import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ListRankedUsecase } from '@domain/usecase/list-ranked';
import { RankedDto } from '@infra/dtos/ranked.dto';

@ApiTags('movies')
@Controller({
  path: '/movies',
  version: '1',
})
export class MoviesController {
  constructor(private readonly listRankedUsecase: ListRankedUsecase) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: RankedDto })
  async getListRanked() {
    const result = await this.listRankedUsecase.execute();
    return RankedDto.parse(result);
  }
}
