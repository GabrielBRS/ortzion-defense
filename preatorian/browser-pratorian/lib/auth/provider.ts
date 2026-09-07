import {
  chatGPTSignInPath,
  chatGPTSignOutPath,
  getChatGPTUser,
  requireChatGPTUser,
} from '@/app/chatgpt-auth';

export interface AuthSession {
  readonly subject: string;
  readonly email: string;
  readonly displayName: string;
}

export interface AuthProvider {
  getSession(): Promise<AuthSession | null>;
  requireSession(returnTo: string): Promise<AuthSession>;
  getSignInUrl(returnTo: string): string;
  getSignOutUrl(returnTo?: string): string;
}

function toSession(user: {
  readonly userId: string;
  readonly email: string;
  readonly displayName: string;
}): AuthSession {
  return {
    subject: user.userId,
    email: user.email,
    displayName: user.displayName,
  };
}

class SitesAuthProvider implements AuthProvider {
  async getSession(): Promise<AuthSession | null> {
    const user = await getChatGPTUser();
    return user ? toSession(user) : null;
  }

  async requireSession(returnTo: string): Promise<AuthSession> {
    return toSession(await requireChatGPTUser(returnTo));
  }

  getSignInUrl(returnTo: string): string {
    return chatGPTSignInPath(returnTo);
  }

  getSignOutUrl(returnTo = '/'): string {
    return chatGPTSignOutPath(returnTo);
  }
}

export function getAuthProvider(): AuthProvider {
  return new SitesAuthProvider();
}
