"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { Loader2, WandSparkles } from "lucide-react";
import type { GenerateBlessingPreviewOutput } from "@/ai/flows/generative-blessing-preview";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { BlessingCategory } from "@/lib/types";

interface BlessingPreviewProps {
  blessingText: string;
  category: BlessingCategory;
  previewData: GenerateBlessingPreviewOutput | null;
  isLoading: boolean;
}

export function BlessingPreview({ blessingText, category, previewData, isLoading }: BlessingPreviewProps) {
  const placeholderImage = PlaceHolderImages[0];
  const displayImage = previewData?.imageUrl || placeholderImage.imageUrl;
  const auraColor = previewData?.auraColor || 'hsl(var(--primary))';
  
  const hasContent = blessingText.length >= 10;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold text-center">
        <Balancer>Live Preview</Balancer>
      </h2>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card
            className={cn(
              "relative w-full overflow-hidden border-2 transition-all",
              isLoading && "animate-pulse"
            )}
            style={{
              // @ts-ignore
              '--aura-color': auraColor,
              borderColor: 'hsl(var(--aura-color) / 0.3)',
              boxShadow: `0 0 30px -8px hsl(var(--aura-color) / 0.7), 0 0 50px -20px hsl(var(--aura-color) / 0.7)`,
            }}
          >
            <div className="absolute inset-0 size-full opacity-30" style={{ background: `radial-gradient(circle, hsl(var(--aura-color)/0.25) 0%, transparent 70%)` }} />
            
            <CardContent className="p-0">
              <div className="relative aspect-video w-full">
                <AnimatePresence>
                  <motion.div
                    key={displayImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={displayImage}
                      alt={blessingText || "A glowing visual representation of a blessing."}
                      fill
                      className="object-cover"
                      data-ai-hint={placeholderImage.imageHint}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {!hasContent && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 p-4 text-center text-primary-foreground">
                      <WandSparkles className="h-12 w-12 text-primary opacity-80" />
                      <p className="mt-4 text-lg font-medium">Write your blessing to see it glow</p>
                  </div>
                )}

                {isLoading && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="ml-4 text-lg text-primary-foreground">Generating your glow...</p>
                  </div>
                )}
              </div>
            </CardContent>

            <CardHeader>
              <p className="min-h-[6rem] text-xl font-medium text-center leading-relaxed">
                <Balancer>{blessingText || '...'}</Balancer>
              </p>
            </CardHeader>

            <CardFooter className="flex justify-center text-sm text-muted-foreground">
              <p>Category: {category}</p>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
