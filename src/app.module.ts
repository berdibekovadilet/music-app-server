import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TrackModule } from "./track/track.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://admin:adi30013763@cluster0.ssnw1va.mongodb.net/music-app-server?retryWrites=true&w=majority"),
    TrackModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
