import { BlessingCard } from '@/components/blessings/BlessingCard';
import { mockBlessings } from '@/lib/data';
import { cn } from '@/lib/utils';
import Balancer from 'react-wrap-balancer';

export default function BlessingChainPage() {
  const blessings = mockBlessings;

  return (
    <div className="container mx-auto max-w-3xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight">
          <Balancer>The Unbroken Chain</Balancer>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          <Balancer>A chronological ledger of every blessing minted on the chain. Each one linked to the last, forming an eternal stream of positivity.</Balancer>
        </p>
      </div>
      
      <div className="relative flex flex-col items-center gap-16">
        {/* The chain line */}
        <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
        
        {blessings.map((blessing, index) => (
          <div key={blessing.id} className="relative z-10 w-full max-w-2xl">
            <BlessingCard blessing={blessing} />
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 size-4 rounded-full bg-primary/50 border-2 border-primary" />
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 size-4 rounded-full bg-primary/50 border-2 border-primary" />
          </div>
        ))}
      </div>
    </div>
  );
}
