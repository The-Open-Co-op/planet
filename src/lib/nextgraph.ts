import { nextGraphConnectedPlugin } from "@ldo/connected-nextgraph";
import { createLdoReactMethods } from "@ldo/react";
import { createBrowserNGReactMethods } from "nextgraph-react";
import {NextGraphAuth} from "@/types/nextgraph";

export const {
  dataset,
  useLdo,
  useMatchObject,
  useMatchSubject,
  useResource,
  useSubject,
  useSubscribeToResource,
} = createLdoReactMethods([nextGraphConnectedPlugin]);

const methods = createBrowserNGReactMethods(dataset);

export const { BrowserNGLdoProvider, useNextGraphAuth } = methods;

declare module "nextgraph-react" {
  export function createBrowserNGReactMethods(
      dataset: unknown,
  ): {BrowserNGLdoProvider: React.FunctionComponent<{children?: React.ReactNode | undefined}>, useNextGraphAuth: typeof useNextGraphAuth}

  export function useNextGraphAuth(): NextGraphAuth | undefined;
}