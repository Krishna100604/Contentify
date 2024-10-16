"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'

// Update HISTORY interface to allow aiResponse to be null
interface HISTORY {
    id: number | null;
    formData: string | null;
    aiResponse: string | null; // Allow null values here
    templateSlug: string | null;
    createdBy: string | null;
    createdAt: string | null;
}

const UsageTrack = () => {

    const { user } = useUser();
    const [totalUsage, setTotalUsage] = useState<number>(0);

    useEffect(() => {
        if (user) {
            Getdata();
        }
    }, [user]);

    const Getdata = async () => {
        try {
            const email = user?.primaryEmailAddress?.emailAddress;
            if (email) {
                const result: HISTORY[] = await db
                    .select()
                    .from(AIOutput)
                    .where(eq(AIOutput.createdBy, email));

                // Sanitize the result in case aiResponse is null
                const sanitizedResult = result.map((item) => ({
                    ...item,
                    aiResponse: item.aiResponse ?? '', // Convert null to empty string
                }));

                GetTotalUsage(sanitizedResult);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const GetTotalUsage = (result: HISTORY[]) => {
        let total = 0;
        result.forEach((element) => {
            total += element.aiResponse ? element.aiResponse.length : 0; // Fallback to 0 if aiResponse is null
        });
        setTotalUsage(total);
    }

    return (
        <div className='m-5'>
            <div className='bg-primary p-3 text-white rounded-lg'>
                <h2 className='text-lg font-bold'>Credits</h2>
                <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
                    <div className='h-2 bg-white rounded-full'
                        style={{ width: (totalUsage / 10000) * 100 + "%" }}
                    >
                    </div>
                </div>
                <h2 className='text-sm my-2'>{totalUsage}/10,000 Credit Used</h2>
            </div>
            <Button variant={'secondary'} className='w-full my-3 text-primary font-bold'>Upgrade</Button>
        </div>
    )
}

export default UsageTrack;
