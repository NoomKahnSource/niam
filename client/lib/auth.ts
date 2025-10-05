export type User = { email: string; name?: string; passwordHash: string; verified: boolean; createdAt: number };
export type Session = { email: string; token: string; createdAt: number };

const USERS_KEY = "auth-users";
const SESSION_KEY = "auth-session";
const RESET_KEY = "auth-reset"; // map token -> email

function safeLS() {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

function readUsers(): Record<string, User> {
  const ls = safeLS();
  if (!ls) return {};
  try {
    return JSON.parse(ls.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeUsers(users: Record<string, User>) {
  const ls = safeLS();
  if (!ls) return;
  ls.setItem(USERS_KEY, JSON.stringify(users));
}

export function currentSession(): Session | null {
  const ls = safeLS();
  if (!ls) return null;
  try {
    const raw = ls.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}
function writeSession(s: Session | null) {
  const ls = safeLS();
  if (!ls) return;
  if (s) ls.setItem(SESSION_KEY, JSON.stringify(s));
  else ls.removeItem(SESSION_KEY);
}

function b64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str);
}

async function sha256(input: string) {
  const enc = new TextEncoder();
  const data = enc.encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return b64(hash);
}

export async function hashPassword(email: string, password: string) {
  return sha256(`${email}|${password}`);
}

export async function signUp(email: string, password: string, name?: string) {
  const users = readUsers();
  const key = email.toLowerCase();
  if (users[key]) throw new Error("Email already registered");
  const passwordHash = await hashPassword(key, password);
  const user: User = { email: key, name, passwordHash, verified: true, createdAt: Date.now() };
  users[key] = user;
  writeUsers(users);
}

export async function signIn(email: string, password: string) {
  const users = readUsers();
  const key = email.toLowerCase();
  const user = users[key];
  if (!user) throw new Error("Invalid credentials");
  const hp = await hashPassword(key, password);
  if (hp !== user.passwordHash) throw new Error("Invalid credentials");
  const token = Math.random().toString(36).slice(2);
  const session: Session = { email: key, token, createdAt: Date.now() };
  writeSession(session);
  return session;
}

export function signOut() {
  writeSession(null);
}

export async function requestPasswordReset(email: string) {
  const users = readUsers();
  const key = email.toLowerCase();
  if (!users[key]) throw new Error("Email not found");
  const token = Math.random().toString(36).slice(2);
  const ls = safeLS();
  const map = JSON.parse(ls?.getItem(RESET_KEY) || "{}");
  map[token] = key;
  ls?.setItem(RESET_KEY, JSON.stringify(map));
  return { resetToken: token };
}

export async function resetPassword(token: string, newPassword: string) {
  const ls = safeLS();
  if (!ls) throw new Error("Unavailable");
  const map = JSON.parse(ls.getItem(RESET_KEY) || "{}");
  const email = map[token];
  if (!email) throw new Error("Invalid token");
  const users = readUsers();
  if (!users[email]) throw new Error("User not found");
  users[email].passwordHash = await hashPassword(email, newPassword);
  writeUsers(users);
  delete map[token];
  ls.setItem(RESET_KEY, JSON.stringify(map));
  return true;
}

export function isAdmin(email?: string) {
  if (!email) return false;
  return email.toLowerCase() === "kaufmanniam@gmail.com";
}
