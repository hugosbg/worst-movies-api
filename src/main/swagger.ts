import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  static use(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Worst Movies')
      .setDescription(
        'Lista de indicados e vencedores da categoria "Pior Filme" do Golden Raspberry Awards.',
      )
      .setVersion('v1')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/doc', app, document);
  }
}
