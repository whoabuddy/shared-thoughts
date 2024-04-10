// KV binding
import { KVNamespace } from "@cloudflare/workers-types";

export interface Env {
  SHARED_THOUGHTS_V1: KVNamespace;
}

export type Thought = {
  id: string;
  content: string;
  context: string;
};
