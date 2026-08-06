import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common'
import { FmService } from './fm.service'
import { CreateFmDto } from './dto/create-fm.dto'
import { UpdateFmDto } from './dto/update-fm.dto'
import * as path from 'path'
import { Response } from 'express'

@Controller('fm')
export class FmController {
  constructor(private readonly fmService: FmService) {}

  @Post()
  create(@Body() createFmDto: CreateFmDto) {
    return this.fmService.create(createFmDto)
  }

  @Get()
  findAll() {
    return this.fmService.findAll()
    // const abPath = path.resolve(__dirname)
    // const audioSourcePath = abPath.slice(0, -13) + '\\back\\audios\\1.mp3'
    // console.log(audioSourcePath.replace(/(\\)+/g,"\\"))
    // console.log(audioSourcePath)
    // return audioSourcePath

    // const files = this.fmService.getAllFiles(audioSourcePath)
    // return JSON.stringify(files)
    // return this.fmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fmService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFmDto: UpdateFmDto) {
    return this.fmService.update(+id, updateFmDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fmService.remove(+id)
  }
}
