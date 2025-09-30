const environments = {
  local: 'http://localhost:3000',
  live: 'https://desafio-tecnico-kata.onrender.com'
} as const

type Environment = keyof typeof environments

const getEnvironment = (): Environment => {
  const env = process.env.NEXT_PUBLIC_ENV as Environment
  return env && env in environments ? env : 'local'
}

export const API_BASE_URL = environments[getEnvironment()]
