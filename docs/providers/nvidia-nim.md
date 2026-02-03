---
summary: "Configure NVIDIA NIM (NVIDIA Inference Microservice) provider"
read_when:
  - You want to use NVIDIA NIM-hosted models
  - You need an NVIDIA API key for NIM endpoints
  - You want copy/paste config with common NIM models
title: "NVIDIA NIM"
---

# NVIDIA NIM (NVIDIA Inference Microservice)

NVIDIA NIM provides OpenAI-compatible endpoints for various AI models including Llama, DeepSeek, Mistral, and others. Configure the provider and set your preferred model.

Common NVIDIA NIM model IDs:

- `nvidia/llama-3.1-nemotron-70b-instruct` - NVIDIA's fine-tuned Llama 3.1 70B
- `nvidia/llama-3.3-nemotron-70b-instruct` - NVIDIA's fine-tuned Llama 3.3 70B
- `meta/llama-3.1-405b-instruct` - Meta Llama 3.1 405B
- `meta/llama-3.1-70b-instruct` - Meta Llama 3.1 70B
- `meta/llama-3.3-70b-instruct` - Meta Llama 3.3 70B
- `mistralai/mistral-large` - Mistral Large
- `mistralai/mixtral-8x7b-instruct-v0.1` - Mixtral 8x7B
- `deepseek-ai/deepseek-r1` - DeepSeek R1 (reasoning)

## Get an API Key

1. Create an account at [build.nvidia.com](https://build.nvidia.com)
2. Navigate to the NIM catalog
3. Generate an API key

## Quick Setup

```bash
export NVIDIA_API_KEY="nvapi-..."
openclaw models list --provider nvidia-nim
```

## Config snippet

```json5
{
  env: { NVIDIA_API_KEY: "nvapi-..." },
  agents: {
    defaults: {
      model: { primary: "nvidia-nim/nvidia/llama-3.1-nemotron-70b-instruct" },
      models: {
        "nvidia-nim/nvidia/llama-3.1-nemotron-70b-instruct": { alias: "Nemotron 70B" },
        "nvidia-nim/meta/llama-3.1-70b-instruct": { alias: "Llama 3.1 70B" },
        "nvidia-nim/deepseek-ai/deepseek-r1": { alias: "DeepSeek R1" },
      },
    },
  },
  models: {
    mode: "merge",
    providers: {
      "nvidia-nim": {
        baseUrl: "https://integrate.api.nvidia.com/v1",
        apiKey: "${NVIDIA_API_KEY}",
        api: "openai-completions",
        models: [
          {
            id: "nvidia/llama-3.1-nemotron-70b-instruct",
            name: "NVIDIA Llama 3.1 Nemotron 70B Instruct",
            reasoning: false,
            input: ["text"],
            cost: { input: 0.3, output: 1.2, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 131072,
            maxTokens: 4096,
          },
          {
            id: "nvidia/llama-3.3-nemotron-70b-instruct",
            name: "NVIDIA Llama 3.3 Nemotron 70B Instruct",
            reasoning: false,
            input: ["text"],
            cost: { input: 0.35, output: 1.5, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 131072,
            maxTokens: 4096,
          },
          {
            id: "meta/llama-3.1-405b-instruct",
            name: "Meta Llama 3.1 405B Instruct",
            reasoning: false,
            input: ["text"],
            cost: { input: 0.8, output: 2.4, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 131072,
            maxTokens: 4096,
          },
          {
            id: "meta/llama-3.1-70b-instruct",
            name: "Meta Llama 3.1 70B Instruct",
            reasoning: false,
            input: ["text"],
            cost: { input: 0.25, output: 0.9, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 131072,
            maxTokens: 4096,
          },
          {
            id: "meta/llama-3.3-70b-instruct",
            name: "Meta Llama 3.3 70B Instruct",
            reasoning: false,
            input: ["text"],
            cost: { input: 0.25, output: 0.9, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 131072,
            maxTokens: 4096,
          },
          {
            id: "mistralai/mistral-large",
            name: "Mistral Large",
            reasoning: false,
            input: ["text"],
            cost: { input: 0.4, output: 1.6, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 128000,
            maxTokens: 4096,
          },
          {
            id: "mistralai/mixtral-8x7b-instruct-v0.1",
            name: "Mixtral 8x7B Instruct",
            reasoning: false,
            input: ["text"],
            cost: { input: 0.1, output: 0.3, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 32768,
            maxTokens: 4096,
          },
          {
            id: "deepseek-ai/deepseek-r1",
            name: "DeepSeek R1",
            reasoning: true,
            input: ["text"],
            cost: { input: 0.14, output: 2.8, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 64000,
            maxTokens: 4096,
          },
        ],
      },
    },
  },
}
```

## Notes

- NVIDIA NIM endpoints are OpenAI-compatible
- Model refs use format `nvidia-nim/<modelId>`
- The provider auto-discovers when `NVIDIA_API_KEY` is set
- Pricing estimates are in USD per 1M tokens
- DeepSeek R1 is flagged as a reasoning model
- Override `contextWindow` and `maxTokens` in `models.providers` if needed
