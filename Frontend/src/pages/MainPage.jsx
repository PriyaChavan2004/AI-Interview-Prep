import { Button } from '@/components/ui/button'
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Session from "@/Pages/Session";

const MainPage = () => {
  return (
    <div className="h-[88vh] w-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl max-w-3xl"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold text-center"
        >
          Prepare Your Interview with Your Personal
        </motion.h1>

        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold capitalize text-[#0062ff] drop-shadow-lg"
        >
          AI Coach
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center text-sm md:text-lg text-zinc-300 max-w-2xl"
        >
          Unlock your potential with AI-powered coaching. Practice mock interviews, 
          get real-time feedback, and ace your dream job with confidence.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
      <Button className="capitalize px-6 py-3 text-lg rounded-xl bg-[#003c9c] hover:bg-[#002663] shadow-lg">
            <Link to='/session'>Get Started</Link>
          </Button>

        </motion.div>
      </motion.div>
    </div>
  )
}

export default MainPage