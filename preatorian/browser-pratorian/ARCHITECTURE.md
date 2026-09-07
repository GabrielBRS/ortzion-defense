# PRAETORIAN frontend architecture

## Product surfaces

- `app/(public)`: server-rendered corporate and product experience with route-level metadata.
- `app/auth`: provider-neutral authentication presentation. Credentials are never persisted by the frontend; the current Sites adapter starts a server-owned sign-in flow.
- `app/portal`: sign-in-gated operations experience. Its layout performs the server-side session check before rendering the client navigation shell.
- `components/ui`: domain-free interface primitives supplied by the project scaffold.
- `components/brand`, `components/marketing`, `components/diagrams`, and `components/portal`: reusable product-specific presentation.
- `types` and `services`: serializable domain contracts plus interchangeable mock and HTTP API adapters.

## Data boundary

Portal pages depend only on `PraetorianApi`. The development factory returns deterministic, clearly labelled fixture data; the HTTP adapter targets `/api/v1/*` and can replace it without changes to page components. Production services remain external and authoritative.

## Identity and authorization

`AuthProvider` is the route-facing contract. The current implementation wraps the platform's trusted server headers and secure sign-in dispatcher. A future OIDC adapter can use Authorization Code + PKCE and Secure, HttpOnly, SameSite cookies. Browser storage is never used for credentials.

The portal layout verifies authentication. Effective permissions and organization scope belong to the backend; frontend permission-aware components are presentation conveniences, never enforcement. Every future mutation must include origin/CSRF controls and be re-authorized server-side.

## Rendering and security

Server Components own page orchestration and mock reads. Client Components are limited to browser-dependent navigation, filters, disclosure, and form feedback. Portal content is non-indexable and treated as private/no-store. Public pages are crawlable and listed in the sitemap. No frontend code communicates with databases or contains secrets.
