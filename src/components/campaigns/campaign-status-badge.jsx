/**
 * Campaign Status Badge Component
 * TODO: Implement status badge for campaign states
 */

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function CampaignStatusBadge({ status, className }) {
  // TODO: Define status variants and their styling
  const statusVariants = {
    // TODO: Add status mappings:
    draft: 'secondary', // gray
    active: 'success', // green
    paused: 'warning', // yellow
    completed: 'info', // blue
    cancelled: 'destructive', // red
  };

  // TODO: Get variant based on status
  const variant = statusVariants[status] || 'default'; // TODO: Replace with statusVariants[status] || 'default'

  return (
    <>
      {/* TODO: Implement Badge component with proper variant */}
      <Badge variant={variant} className={cn(className)}>
        {/* TODO: Display formatted status text */}
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : ''}
      </Badge>
      {/* TODO: Apply custom className if provided */}
    </>
  );
}

// TODO: Example usage:
// <CampaignStatusBadge status="active" />
// <CampaignStatusBadge status="draft" className="ml-2" />