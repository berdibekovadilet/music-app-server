import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { Track, TrackDocument } from "./schemas/track.schema";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.trackModel.create({
      ...createTrackDto,
      listens: 0,
    });
    return track;
  }

  async findAll(): Promise<Track[]> {
    const tracks = await this.trackModel.find();
    return tracks;
  }

  async findOne(id: ObjectId): Promise<Track> {
    const track = await (
      await this.trackModel.findById(id)
    ).populate("comments");
    return track;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  async remove(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }

  async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(createCommentDto.trackId);
    const comment = await this.commentModel.create({ ...createCommentDto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
}
