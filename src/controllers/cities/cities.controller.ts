import { Controller, Get, Req, Res } from '@nestjs/common';
import { CitiesService } from '../../services/cities/cities.service';
import { Request, Response } from 'express';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const offset = req.query.offset || '1';
    const limit = req.query.limit || '10';
    const cities = await this.citiesService.getAll({
      offset: parseInt(offset as string),
      limit: parseInt(limit as string),
    });
    return res.status(200).send(cities);
  }
}
