import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("tracks")
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "picture", maxCount: 1 },
      { name: "audio", maxCount: 1 },
    ])
  )
  create(
    @UploadedFiles()
    files: {
      picture?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
    @Body() createTrackDto: CreateTrackDto
  ) {
    const { picture, audio } = files;
    return this.trackService.create(createTrackDto, picture[0], audio[0]);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: ObjectId) {
    return this.trackService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(+id, updateTrackDto);
  }

  @Delete(":id")
  remove(@Param("id") id: ObjectId) {
    return this.trackService.remove(id);
  }

  @Post("/comment")
  addComment(@Body() createCommentDto: CreateCommentDto) {
    return this.trackService.addComment(createCommentDto);
  }
}
