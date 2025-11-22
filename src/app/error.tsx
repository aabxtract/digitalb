'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="max-w-md text-center">
            <CardHeader>
                <CardTitle className="text-3xl">A Moment of Reflection</CardTitle>
                <CardDescription>Something went wrong, but every challenge is an opportunity for growth.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">There was an unexpected disturbance in the cosmic flow.</p>
                <Button onClick={() => reset()}>
                    Try Again
                </Button>
            </CardContent>
        </Card>
    </div>
  )
}
