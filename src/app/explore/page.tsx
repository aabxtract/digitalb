"use client"

import { useState } from 'react';
import { BlessingCard } from '@/components/blessings/BlessingCard';
import { mockBlessings } from '@/lib/data';
import type { Blessing, BlessingCategory } from '@/lib/types';
import { BlessingCategories } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Balancer from 'react-wrap-balancer';
import { AnimatePresence, motion } from 'framer-motion';

type SortOption = 'Most Recent' | 'Most Uplifting' | 'Most Gifted';

export default function ExplorePage() {
  const [blessings, setBlessings] = useState<Blessing[]>(mockBlessings);
  const [sort, setSort] = useState<SortOption>('Most Recent');
  const [filter, setFilter] = useState<BlessingCategory | 'All'>('All');

  const displayedBlessings = blessings
    .filter(b => filter === 'All' || b.category === filter)
    .sort((a, b) => {
      if (sort === 'Most Recent') return b.timestamp - a.timestamp;
      return Math.random() - 0.5;
    });

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight">
          <Balancer>Explore the Cosmos of Blessings</Balancer>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          <Balancer>Discover the most radiant blessings shared by the community.</Balancer>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <Tabs defaultValue="All" onValueChange={(value) => setFilter(value as BlessingCategory | 'All')} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
            <TabsTrigger value="All">All</TabsTrigger>
            {BlessingCategories.map(cat => (
              <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Most Recent">Most Recent</SelectItem>
            <SelectItem value="Most Uplifting">Most Uplifting</SelectItem>
            <SelectItem value="Most Gifted">Most Gifted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
        {displayedBlessings.map((blessing) => (
            <motion.div
                key={blessing.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
            >
                <BlessingCard blessing={blessing} />
            </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
