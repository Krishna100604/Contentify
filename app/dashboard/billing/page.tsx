"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import axio from 'axios'
import { Loader2Icon } from 'lucide-react';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function Billing() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const CreateSubscription = () => {
    setLoading(true)
    axio.post('/api/create-subscription', {})
      .then(resp => {
        console.log(resp.data);
        OnPayment(resp.data.id)
      }, (error) => {
        setLoading(false);
      })
  }

  const loadScript = (src: any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const OnPayment = async (subId: string) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay failed to load!!");
      return;
    }

    const options = {
      "key": process.env.RAZORPAY_KEY_ID,
      "subscription_id": subId,
      "name": 'Contentify',
      description: 'Monthly Subscription',
      handler: async (resp: any) => {
        console.log(resp);
        if (resp) {
          SaveSubscription(resp?.razorpay_payment_id)
        }
        setLoading(false);
      }
    }

    try {
      // @ts-ignore 
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
    catch (e) {
      console.log("Try Again...", e);
      setLoading(false);
    }
  }

  const SaveSubscription = async (paymentId: string) => {
    const result = await db.insert(UserSubscription)
      .values({
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        active: true,
        paymentId: paymentId,
        joinDate: moment().format('DD/MM/yyyy')
      });
    console.log(result);
    if (result) {
      window.location.reload();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="mx-auto max-w-4xl px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
        <h2 className="text-center font-bold text-4xl my-8 text-indigo-800">Upgrade With Monthly Plan</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Free Plan Card */}
          <div className="rounded-2xl bg-white border border-gray-200 p-8 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900">Free Plan</h3>
              <p className="mt-4">
                <span className="text-3xl font-bold text-gray-800">0$</span>
                <span className="text-sm font-medium text-gray-600">/month</span>
              </p>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                10,000 Words/Month
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                50+ Content Templates
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Unlimited Download & Copy
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                1 Month of History
              </li>
            </ul>
            <a
              href="/dashboard"
              className="mt-8 block w-full rounded-full border border-indigo-600 px-6 py-2 text-center text-sm font-medium text-black
              hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-in-out hover:shadow-md focus:outline-none"
            >
              Currently Active Plan
            </a>
          </div>

          {/* Monthly Plan Card */}
          <div className="rounded-2xl bg-white border border-gray-200 p-8 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900">Monthly Plan</h3>
              <p className="mt-4">
                <span className="text-3xl font-bold text-gray-800">9.99$</span>
                <span className="text-sm font-medium text-gray-600">/month</span>
              </p>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                1,00,000 Words/Month
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                50+ Template Access
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Unlimited Download & Copy
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                1 Year of History
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Priority Support
              </li>
            </ul>
            <Button
              disabled={loading}
              onClick={() => CreateSubscription()}
              className="mt-8 block w-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 text-center text-sm font-medium text-white
              hover:scale-105 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out shadow-md focus:outline-none disabled:opacity-70"
            >
              {loading && <Loader2Icon className="animate-spin" />}
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
