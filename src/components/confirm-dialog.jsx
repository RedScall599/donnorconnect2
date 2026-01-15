/**
 * Confirm Dialog Component - Reusable confirmation dialog
 * TODO: Implement confirmation dialog for destructive actions
 */

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

export function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  variant = "destructive" 
}) {
  // ...existing code...
  // Dialog state management (loading)
  const [loading, setLoading] = useState(false)

  // Confirm action handler
  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
      onClose()
    } catch (err) {
      // Optionally handle error
    } finally {
      setLoading(false)
    }
  }

  // Handle dialog close (escape, backdrop)
  const handleClose = () => {
    if (!loading) onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent onEscapeKeyDown={handleClose} onPointerDownOutside={handleClose}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button type="button" variant={variant} onClick={handleConfirm} disabled={loading}>
            {loading ? 'Please wait...' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// TODO: Example usage:
// <ConfirmDialog
//   isOpen={showDeleteDialog}
//   onClose={() => setShowDeleteDialog(false)}
//   onConfirm={handleDeleteDonor}
//   title="Delete Donor"
//   description="Are you sure you want to delete this donor? This action cannot be undone."
//   confirmText="Delete"
//   variant="destructive"
// />