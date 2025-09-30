'use client'

import { useState, useEffect } from 'react'
import { Button } from './button'
import { Badge } from './badge'

export function EnvironmentToggle() {
  const [currentEnv, setCurrentEnv] = useState<string>('')

  useEffect(() => {
    setCurrentEnv(process.env.NEXT_PUBLIC_ENV || 'local')
  }, [])

  const toggleEnvironment = () => {
    const newEnv = currentEnv === 'local' ? 'live' : 'local'
    const message = `Para alternar para ${newEnv === 'local' ? 'Local' : 'Live'}, defina NEXT_PUBLIC_ENV=${newEnv} e reinicie a aplicação`
    alert(message)
  }

  if (!currentEnv) return null

  return (
    <div className="flex items-center gap-2">
      <Badge variant={currentEnv === 'live' ? 'default' : 'secondary'}>
        {currentEnv === 'live' ? '🌐 Live' : '🏠 Local'}
      </Badge>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleEnvironment}
        className="text-xs"
      >
        Alternar
      </Button>
    </div>
  )
}
