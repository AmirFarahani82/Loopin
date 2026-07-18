import * as React from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipConfig,
} from "./TooltipConfig";

interface CustomTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
  side?: "top" | "right" | "bottom" | "left";
}

export function CustomTooltip({
  children,
  content,
  delayDuration = 100,
  side = "top",
}: CustomTooltipProps) {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipConfig side={side}>{content}</TooltipConfig>
    </Tooltip>
  );
}
