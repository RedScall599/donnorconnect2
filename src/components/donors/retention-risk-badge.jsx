/**
 * Retention Risk Badge Component
 * TODO: Implement badge for donor retention risk levels
 */

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function RetentionRiskBadge({ risk, className }) {
  // TODO: Define risk variants and their styling
  const riskVariants = {
    LOW: 'success', // green
    MEDIUM: 'warning', // yellow
    HIGH: 'destructive', // red
  }

  // TODO: Get variant based on risk level
  const variant = riskVariants[risk] || 'default' // TODO: Replace with riskVariants[risk] || 'default'

  return (
    <>
      {/* TODO: Implement Badge component with proper variant */}
      <Badge variant={variant} className={cn(className)}>
        {/* TODO: Display formatted risk text */}
        {risk ? risk.charAt(0) + risk.slice(1).toLowerCase() : 'Unknown'}
      </Badge>
      {/* TODO: Apply custom className if provided */}
    </>
  )
}

// TODO: Example usage:
// <RetentionRiskBadge risk="LOW" />
// <RetentionRiskBadge risk="HIGH" className="ml-2" />