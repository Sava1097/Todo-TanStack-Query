import { Loader2 } from "lucide-react"

export const TodosLoading = () => {
  return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-green-600 w-12 h-12" />
      </div>
    )
}
