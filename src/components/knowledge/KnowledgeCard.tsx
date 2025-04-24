
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface KnowledgeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  footerContent?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  variant?: "default" | "highlight";
}

export function KnowledgeCard({
  title,
  description,
  icon,
  children,
  footerContent,
  action,
  variant = "default",
  className,
  ...props
}: KnowledgeCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-200", 
        variant === "highlight" && "border-taskmate-purple/20",
        className
      )}
      {...props}
    >
      <CardHeader className={cn(
        variant === "highlight" && "bg-taskmate-purple/5"
      )}>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
      {(footerContent || action) && (
        <CardFooter className={cn(
          "flex justify-between items-center",
          footerContent ? "border-t pt-4" : ""
        )}>
          {footerContent}
          {action && (
            <Button variant="ghost" size="sm" onClick={action.onClick}>
              {action.label}
              {action.icon && <span className="ml-2">{action.icon}</span>}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
