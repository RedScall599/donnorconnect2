/**
 * Donor Status Badge Component
 * TODO: Implement status badge for donor states
 */

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function DonorStatusBadge({ status, className }) {
  // Define status variants and their styling
  const statusVariants = {
    ACTIVE: 'success', // green
    INACTIVE: 'neutral', // gray/neutral (for test compatibility)
    LAPSED: 'warning', // yellow
    PROSPECTIVE: 'info', // blue
    DO_NOT_CONTACT: 'destructive', // red/critical
  }

  // Map status to display label
  const statusLabels = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    LAPSED: 'Lapsed',
    PROSPECTIVE: 'Prospective',
    DO_NOT_CONTACT: 'Do Not Contact',
  }

  const variant = statusVariants[status] || 'default'
  const label = statusLabels[status] || 'Unknown'

  return (
    <Badge variant={variant} className={cn(className)}>
      {label}
    </Badge>
  )
}

// TODO: Example usage:
// <DonorStatusBadge status="ACTIVE" />
// <DonorStatusBadge status="LAPSED" className="ml-2" />