const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = configuredCodespaceName
  ? `https://${configuredCodespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getApiUrl(path) {
  return `${apiBaseUrl}${path}`
}

export function getCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

export async function fetchCollection(url, signal) {
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return getCollection(await response.json())
}