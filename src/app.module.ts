import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { FileModule } from "./file/file.module";
import { TrackModule } from "./track/track.module";
import { UsersModule } from "./users/users.module";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "static"),
    }),
    MongooseModule.forRoot(
      "mongodb+srv://admin:adi30013763@cluster0.ssnw1va.mongodb.net/music-app-server?retryWrites=true&w=majority"
    ),
    TrackModule,
    UsersModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
