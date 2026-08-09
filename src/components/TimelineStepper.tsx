import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrip } from '../context/TripContext';
import type { TimelineStep } from '../types';

export const TimelineStepper: React.FC = () => {
  const { state } = useTrip();
  const steps: TimelineStep[] = state.tripData?.steps ?? [];

  return (
    <ul role="list" className="space-y-4">
      {steps.map((step) => (
        <li key={step.id} className="border rounded-lg p-4 bg-white shadow-sm">
          <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <header className="flex justify-between items-center cursor-pointer" onClick={() => {}}>
              <h3 className="text-lg font-medium">{step.title}</h3>
              <span className="text-sm text-gray-500">{new Date(step.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </header>
            <AnimatePresence>
              {step.completed && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-gray-700"
                >
                  {step.details ?? 'Completed'}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </li>
      ))}
    </ul>
  );
};
