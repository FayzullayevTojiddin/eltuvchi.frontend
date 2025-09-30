import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <div className={cn("animate-spin rounded-full border-2 border-current border-t-transparent", sizeClasses[size], className)} />
  )
}

interface LoadingButtonProps {
  isLoading: boolean
  children: React.ReactNode
  loadingText?: string
  className?: string
  [key: string]: any
}

export function LoadingButton({ isLoading, children, loadingText, className, ...props }: LoadingButtonProps) {
  return (
    <button 
      {...props}
      disabled={isLoading || props.disabled}
      className={cn("relative", className)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" className="text-current" />
        </div>
      )}
      <span className={isLoading ? "opacity-0" : ""}>
        {isLoading && loadingText ? loadingText : children}
      </span>
    </button>
  )
}