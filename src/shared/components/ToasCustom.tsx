
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function AlertCustomNavigate() {
  const handleToast = () => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }
  
  return (
    <Button
      variant="outline"
      onClick={handleToast}
    >
      Show Toast
    </Button>
  )
}