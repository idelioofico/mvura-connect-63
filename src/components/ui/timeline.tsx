
import React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-6", className)} {...props} />
  )
);
Timeline.displayName = "Timeline";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative pl-8 pb-1", className)}
      {...props}
    />
  )
);
TimelineItem.displayName = "TimelineItem";

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-3.5 top-7 bottom-0 w-px bg-border", className)}
    {...props}
  />
));
TimelineConnector.displayName = "TimelineConnector";

interface TimelineHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2.5 -ml-12", className)}
      {...props}
    />
  )
);
TimelineHeader.displayName = "TimelineHeader";

interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center h-7 w-7 rounded-full border",
        className
      )}
      {...props}
    />
  )
);
TimelineIcon.displayName = "TimelineIcon";

interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
);
TimelineTitle.displayName = "TimelineTitle";

interface TimelineBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineBody = React.forwardRef<HTMLDivElement, TimelineBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-2 ml-9.5", className)}
      {...props}
    />
  )
);
TimelineBody.displayName = "TimelineBody";

interface TimelineDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  TimelineDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
TimelineDescription.displayName = "TimelineDescription";

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineTitle,
  TimelineBody,
  TimelineDescription,
};
