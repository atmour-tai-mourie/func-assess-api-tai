/**
 * Retrieve an environment variable.
 * @param envVarName Name of the env var
 */
export function getEnv(envVarName: string): string {
  const envValue = process.env[envVarName as string];
  if (envValue) return envValue;
  throw new Error(`Environment variable undefined: ${envVarName}`);
}
