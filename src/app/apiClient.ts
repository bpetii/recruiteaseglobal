export const apiClient = async (
  endpoint: string,
  {
    method = "GET",
    headers: overrideHeaders = {},
    body,
    isRawRequest = false,
  }: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    isRawRequest?: boolean;
  } = {}
) => {
  // Resolve endpoint to absolute URL when running server-side
  const resolveUrl = (path: string) => {
    if (/^https?:\/\//i.test(path)) return path; // already absolute
    if (typeof window !== "undefined") return path; // browser can use relative paths
    const base = process.env.BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    return `${base}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const url = resolveUrl(endpoint);

  // Default headers
  const headers: Record<string, string> = {};
  if (!isRawRequest && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Merge default headers with overridden headers
  const combinedHeaders = { ...headers, ...overrideHeaders };

  const options: RequestInit = {
    method,
    headers: combinedHeaders,
    body: body instanceof FormData || isRawRequest ? body : JSON.stringify(body),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const errorMessage = errorBody.error || `API call failed with status: ${response.status}`;
      throw new Error(errorMessage);
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return null;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  } catch (error: any) {
    console.error("API Error:", error.message || error);
    throw error;
  }
};
