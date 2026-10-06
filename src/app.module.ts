import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [HealthModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
