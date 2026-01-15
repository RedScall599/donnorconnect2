import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
        warning: 'border-transparent bg-yellow-400 text-black hover:bg-yellow-500',
        secondary: 'border-transparent bg-gray-400 text-white hover:bg-gray-500',
        neutral: 'border-transparent bg-gray-400 text-white hover:bg-gray-500', // alias for secondary
        destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({ className, variant, ...props }) {
  // Always include the variant name as a class for test compatibility
  return <div className={cn(badgeVariants({ variant }), variant, className)} {...props} />
}

export { Badge, badgeVariants }
