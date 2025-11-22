"use client";

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useTransition } from 'react';
import { keccak256 } from 'js-sha3';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BlessingCategories, type BlessingCategory } from '@/lib/types';
import { getBlessingPreview } from '@/lib/actions';
import { BlessingPreview } from './BlessingPreview';
import type { GenerateBlessingPreviewOutput } from '@/ai/flows/generative-blessing-preview';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';
import Balancer from 'react-wrap-balancer';

const formSchema = z.object({
  blessingText: z.string().min(10, { message: 'Your blessing must be at least 10 characters long.' }).max(280, { message: 'Your blessing cannot exceed 280 characters.' }),
  category: z.enum(BlessingCategories, { required_error: 'Please select a category.' }),
  recipient: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const initialState = {
  error: null,
  data: null,
};

export function BlessingForm() {
  const [previewState, formAction] = useFormState(getBlessingPreview, initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blessingText: '',
      category: 'Faith',
      recipient: '',
    },
  });

  const { watch } = form;
  const blessingText = watch('blessingText');
  const category = watch('category');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (form.getValues('blessingText').length >= 10 && form.getValues('category')) {
        const formData = new FormData();
        formData.append('blessingText', form.getValues('blessingText'));
        formData.append('category', form.getValues('category'));
        startTransition(() => formAction(formData));
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [blessingText, category, formAction, form]);


  const onMint = (data: FormValues) => {
    console.log("Minting blessing:", data);
    const timestamp = Date.now();
    const creator = '0xConnectedWalletAddress'; 
    const signature = keccak256(data.blessingText + timestamp + creator);
    console.log("Signature:", signature);
    
    toast({
      title: "✨ Blessing Minted!",
      description: "Your positive words are now on the chain.",
    });
    form.reset();
  };

  return (
    <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 py-12 lg:grid-cols-2">
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">
            <Balancer>Weave a Blessing into the Digital Cosmos</Balancer>
          </CardTitle>
          <CardDescription className="text-lg">
            Your words have power. Write a prayer, an affirmation, or a message of hope. It will be enshrined on-chain as a glowing token of light.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onMint)} className="space-y-8">
              <FormField
                control={form.control}
                name="blessingText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Your Blessing or Affirmation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="May you find joy in the small things and peace in your heart..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category for your blessing" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BlessingCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Gift to (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="0x..." {...field} />
                      </FormControl>
                      <FormDescription>Recipient's wallet address.</FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Mint Blessing Token
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <BlessingPreview
        blessingText={blessingText}
        category={category as BlessingCategory}
        previewData={previewState?.data as GenerateBlessingPreviewOutput | null}
        isLoading={isPending}
      />
    </div>
  );
}
