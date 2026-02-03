import type { OpenClawConfig } from "../config/config.js";
import {
  NVIDIA_NIM_DEFAULT_MODEL_ID,
  NVIDIA_NIM_DEFAULT_MODEL_REF,
} from "../providers/nvidia-nim.js";

export {
  NVIDIA_NIM_DEFAULT_MODEL_REF,
  NVIDIA_NIM_DEFAULT_MODEL_ID,
} from "../providers/nvidia-nim.js";

export function applyNvidiaNimProviderConfig(cfg: OpenClawConfig): OpenClawConfig {
  // Use the built-in nvidia-nim provider; only seed the allowlist alias.
  const models = { ...cfg.agents?.defaults?.models };
  models[NVIDIA_NIM_DEFAULT_MODEL_REF] = {
    ...models[NVIDIA_NIM_DEFAULT_MODEL_REF],
    alias: models[NVIDIA_NIM_DEFAULT_MODEL_REF]?.alias ?? "Nemotron 70B",
  };

  return {
    ...cfg,
    agents: {
      ...cfg.agents,
      defaults: {
        ...cfg.agents?.defaults,
        models,
      },
    },
  };
}

export function applyNvidiaNimConfig(cfg: OpenClawConfig): OpenClawConfig {
  const next = applyNvidiaNimProviderConfig(cfg);
  return {
    ...next,
    agents: {
      ...next.agents,
      defaults: {
        ...next.agents?.defaults,
        model: {
          ...(next.agents?.defaults?.model &&
          "fallbacks" in (next.agents.defaults.model as Record<string, unknown>)
            ? {
                fallbacks: (next.agents.defaults.model as { fallbacks?: string[] }).fallbacks,
              }
            : undefined),
          primary: NVIDIA_NIM_DEFAULT_MODEL_REF,
        },
      },
    },
  };
}
