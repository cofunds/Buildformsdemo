import {
  PostHogErrorBoundary as PostHogErrorBoundaryInner,
  type PostHogErrorBoundaryProps,
} from "@posthog/react";
import type { ComponentType } from "react";

/**
 * `@posthog/react` declares a single-arg `constructor(props)` on the class; React 18
 * `JSX.ElementConstructor` expects compatibility with `Component`'s overloads, so TS
 * can report TS2786. Runtime behavior is unchanged.
 */
export const PostHogErrorBoundary: ComponentType<PostHogErrorBoundaryProps> =
  PostHogErrorBoundaryInner as unknown as ComponentType<PostHogErrorBoundaryProps>;
