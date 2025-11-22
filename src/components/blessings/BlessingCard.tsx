import type { Blessing } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Gift, Heart, Shield, Star, Link as LinkIcon } from 'lucide-react';
import Balancer from 'react-wrap-balancer';

const categoryIcons: { [key: string]: React.ReactNode } = {
  Faith: <Star className="h-4 w-4" />,
  Confidence: <Shield className="h-4 w-4" />,
  Healing: <Heart className="h-4 w-4" />,
  Protection: <Shield className="h-4 w-4" />,
  Love: <Gift className="h-4 w-4" />,
  Gratitude: <Star className="h-4 w-4" />,
};

export function BlessingCard({ blessing, className }: { blessing: Blessing; className?: string }) {
  const { text, category, auraColor, creator, recipient, timestamp, imageUrl } = blessing;

  return (
    <Card
      className={cn('relative h-full overflow-hidden border-2 transition-all hover:scale-[1.02] hover:shadow-2xl', className)}
      style={{
        // @ts-ignore
        '--aura-color': auraColor,
        borderColor: 'hsl(var(--aura-color) / 0.2)',
        boxShadow: `0 0 20px -5px hsl(var(--aura-color) / 0.5), 0 0 40px -15px hsl(var(--aura-color) / 0.5)`,
      }}
    >
      <div className="absolute inset-0 size-full opacity-30" style={{ background: `radial-gradient(circle, hsl(var(--aura-color)/0.2) 0%, transparent 70%)` }} />

      <CardHeader>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2 rounded-full border bg-card px-3 py-1">
            {categoryIcons[category]}
            <span>{category}</span>
          </div>
          <span>{formatDistanceToNow(new Date(timestamp), { addSuffix: true })}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {imageUrl && (
           <div className="aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={imageUrl}
              alt={`Visual representation of the blessing: ${text}`}
              width={600}
              height={400}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="spiritual glow"
            />
           </div>
        )}
        <CardTitle className="text-2xl font-normal leading-snug">
          <Balancer>&ldquo;{text}&rdquo;</Balancer>
        </CardTitle>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 text-sm">
        <div className="w-full text-muted-foreground">
          <p className="truncate">
            <span className="font-medium">From:</span> {creator}
          </p>
          {recipient && (
            <p className="truncate">
              <span className="font-medium">To:</span> {recipient}
            </p>
          )}
        </div>
        <button className="group/link inline-flex items-center gap-2 text-primary">
          View on Chain <LinkIcon className="size-4 transition-transform group-hover/link:translate-x-1" />
        </button>
      </CardFooter>
    </Card>
  );
}
