// NVIDIA NIM Provider for OpenClaw
// NVIDIA NIM APIs provide OpenAI-compatible endpoints for various models

import type { ModelDefinitionConfig, ModelProviderConfig } from "../config/types.models.js";

export const NVIDIA_NIM_BASE_URL = "https://integrate.api.nvidia.com/v1";
export const NVIDIA_NIM_DEFAULT_MODEL_ID = "nvidia/llama-3.1-nemotron-70b-instruct";
export const NVIDIA_NIM_DEFAULT_MODEL_REF = `nvidia-nim/${NVIDIA_NIM_DEFAULT_MODEL_ID}`;
const NVIDIA_NIM_DEFAULT_CONTEXT_WINDOW = 131072;
const NVIDIA_NIM_DEFAULT_MAX_TOKENS = 4096;

// Common NVIDIA NIM models
export const NVIDIA_NIM_MODELS: Array<ModelDefinitionConfig> = [
  {
    id: "nvidia/llama-3.1-nemotron-70b-instruct",
    name: "NVIDIA Llama 3.1 Nemotron 70B Instruct",
    reasoning: false,
    input: ["text"],
    cost: {
      input: 0.3, // $0.30 per 1M tokens (estimated)
      output: 1.2, // $1.20 per 1M tokens (estimated)
      cacheRead: 0,
      cacheWrite: 0,
    },
    contextWindow: NVIDIA_NIM_DEFAULT_CONTEXT_WINDOW,
    maxTokens: NVIDIA_NIM_DEFAULT_MAX_TOKENS,
  },
  {
    id: "nvidia/llama-3.3-nemotron-70b-instruct",
    name: "NVIDIA Llama 3.3 Nemotron 70B Instruct",
    reasoning: false,
    input: ["text"],
    cost: {
      input: 0.35,
      output: 1.5,
      cacheRead: 0,
      cacheWrite: 0,
    },
    contextWindow: NVIDIA_NIM_DEFAULT_CONTEXT_WINDOW,
    maxTokens: NVIDIA_NIM_DEFAULT_MAX_TOKENS,
  },
  {
    id: "meta/llama-3.1-405b-instruct",
    name: "Meta Llama 3.1 405B Instruct",
    reasoning: false,
    input: ["text"],
    cost: {
      input: 0.8,
      output: 2.4,
      cacheRead: 0,
      cacheWrite: 0,
    },
    contextWindow: NVIDIA_NIM_DEFAULT_CONTEXT_WINDOW,
    maxTokens: NVIDIA_NIM_DEFAULT_MAX_TOKENS,
  },
  {
    id: "meta/llama-3.1-70b-instruct",
    name: "Meta Llama 3.1 70B Instruct",
    reasoning: false,
    input: ["text"],
    cost: {
      input: 0.25,
      output: 0.9,
      cacheRead: 0,
      cacheWrite: 0,
    },
    contextWindow: NVIDIA_NIM_DEFAULT_CONTEXT_WINDOW,
    maxTokens: NVIDIA_NIM_DEFAULT_MAX_TOKENS,
  },
  {
    id: "meta/llama-3.3-70b-instruct",
    name: "Meta Llama 3.3 70B Instruct",
    reasoning: false,
    input: ["text"],
    cost: {
      input: 0.25,
      output: 0.9,
      cacheRead: 0,
      cacheWrite: 0,
    },
    contextWindow: NVIDIA_NIM_DEFAULT_CONTEXT_WINDOW,
    maxTokens: NVIDIA_NIM_DEFAULT_MAX_TOKENS,
  },
  {
    id: "mistralai/mistral-large",
    name: "Mistral Large",
    reasoning: false,
    input: ["text"],
    cost: {
      input: 0.4,
      output: 1.6,
      cacheRead: 0,
      cacheWrite: 0,
    },
    contextWindow: 128000,
    maxTokens: NVIDIA_NIM_DEFAULT_MAX_TOKENS,
  },
  {
    id: "mistralai/mixtral-8x7b-instruct-v0.1",
    name: "Mixtral 8x7B Instruct",
    reasoning: false,
    input: ["text"],
    cost: {
      input: 0.1,
      output: 0.3,
      cacheRead: 0,
      cacheWrite: 0,
    },
    contextWindow: 32768,
    maxTokens: NVIDIA_NIM_DEFAULT_MAX_TOKENS,
  },
  {
    id: "deepseek-ai/deepseek-r1",
    name: "DeepSeek R1",
    reasoning: true,
    input: ["text"],
    cost: {
      input: 0.14,
      output: 2.8,
      cacheRead: 0,
      cacheWrite: 0,
    },
    contextWindow: 64000,
    maxTokens: NVIDIA_NIM_DEFAULT_MAX_TOKENS,
  },
];

export function buildNvidiaNimProvider(): ModelProviderConfig {
  return {
    baseUrl: NVIDIA_NIM_BASE_URL,
    api: "openai-completions",
    models: NVIDIA_NIM_MODELS,
  };
}
