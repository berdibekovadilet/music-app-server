import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [TrackModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
