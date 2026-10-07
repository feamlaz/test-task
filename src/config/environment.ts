import { plainToInstance } from 'class-transformer';
import { IsInt, IsString, Matches, Max, Min, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  HOST!: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  PORT!: number;

  @Matches(/^postgres(ql)?:\/\/.+/, {
    message: 'DATABASE_URL must be a postgres connection string',
  })
  DATABASE_URL!: string;

  @IsString()
  CORS_ORIGIN!: string;
}

export function validateEnvironment(config: Record<string, unknown>): EnvironmentVariables {
  const variables = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(variables, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(
      `Invalid environment: ${errors.map((error) => error.toString()).join(', ')}`,
    );
  }

  return variables;
}