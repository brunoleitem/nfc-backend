import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EnvService } from "./env/env.service";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvService);

  const config = new DocumentBuilder()
    .setTitle("BACKEND NFC API")
    .setDescription("API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = configService.get("PORT");
  await app.listen(port);
}
bootstrap();
