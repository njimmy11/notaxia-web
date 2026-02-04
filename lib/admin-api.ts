const ADMIN_TOKEN_KEY = "notaxia_admin_token";

const DEFAULT_API_URL = "https://api.notaxia.com";

export function getApiUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
  }
  return process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export async function adminFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ data?: T; ok: boolean; status: number; error?: string }> {
  const base = getApiUrl().replace(/\/$/, "");
  const url = path.startsWith("http") ? path : `${base}/api${path.startsWith("/") ? path : `/${path}`}`;
  const token = getAdminToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401 && typeof window !== "undefined") {
    clearAdminToken();
    window.location.href = "/admin/login";
    return { data: undefined, ok: false, status: 401, error: "Session expired" };
  }
  let data: T | undefined;
  let errorMessage: string | undefined;
  try {
    const json = await res.json();
    data = json?.data ?? json;
    errorMessage = json?.message;
  } catch {
    // ignore
  }
  return {
    data,
    ok: res.ok,
    status: res.status,
    error: errorMessage,
  };
}
