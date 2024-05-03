# Next.js 14 Notes

## Structure

- `src/app`: Entry point and responsible for routing.
- `layout`: Root layout for all pages.
- `page.tsx`: The home page that replaces the children in the root layout.

## Components

### Server Component

- React Server Component: Available in React 18 (default in Next.js 14), can't use hooks or handle user interaction.
- Renders only on the server.
- Cannot use hooks.
- `server-only` is a package that helps separate and protect server-only code.
- At the top, include `"import 'server-only'"`.

### Client Component

- To use it, include `"use client"` on top of the component function.
- It's executed once on the server and then on the client.
- `client-only` is a package that forces the code to be executed on the client only.
- Client Component: Traditional React components that can use hooks and side effects. Use "use client" to activate them.
- Note: When using "use client", all imported components will also be client components.
- You cannot import a server component into a client component. As a workaround, you can pass it as a children component.

## Routing

- Basic routing: `src/app/{pathSegment}/page.tsx`.
- Nested routing: `src/app/{pathSegment}/{pathSegment}/page.tsx`.
- Dynamic routing: `src/app/[var]`. Accessible via `params.var`.
- Nested dynamic routing: Can be in dynamic folders or with catching all segment `[...var]`.
- Handling all nested routes: `[...var]` allows one `page.tsx` to handle all nested routes.
- Handling root path: `/root/[...var]`. If there's no `root/page.tsx`, it will return 404. Fix this with `/root/[[...var]]` and `/root/[[...var]]/page.tsx` will handle the root path.
- Handling 404 requests: Use `not-found.tsx`. Can be scoped in the nested folders level. Also, use `notFound` function from "next/navigation" to redirect to not found page from any page.
- Private folders: Should start with underscore, e.g., `/src/app/_lib`. If you need `_` in the root path, replace it with `%5F` (URL encoded for underscore), e.g., "/src/app/%5Flib".
- Route groups: Wrap a folder with `()` like `app/(auth)/login`. To visit this route, go to `/login` and Next.js will ignore `auth` folder from the nested routing structure.

## Layout

- `layout.tsx`: Accepts a `children` prop.
- Root layout: Located in `/src/app/layout.tsx`.
- Nested layout: Does not override the root layout but extends it.
- Works with grouped routes.

## Metadata

- For each page/layout, you can export a static metadata object, or a dynamic `generateMetadata` function.
- Metadata is read in order from layouts down to page level.

## Navigation

- `Link` component from "next/link".
- `href` attribute for the route.
- `replace` attribute to clear history.
- `usePathname` from "next/navigation": A hook to get the current path name. Works only on client components, so use "use client". Useful for adding style for the active link.
- `useRouter` from "next/navigation": A hook to automatically push to a route. Works only in client components.
- `router.push('/')`: Pushes a route to stack.
- `router.replace("/")`: Clears history.
- `router.back()`: Navigates back to history.
- `router.forward()`: Navigates to next page.
- `router.redirect("/path")`: For 307 status.

## Templates

- Shared and wrap components like Layout files.
- Rerender with each children mount, unlike layout that renders only once.

## Special Next Files

- Order: `layout` -> `template` -> `error` -> `loading` -> `not-found` -> `page`.

## Parallel Routes

- Allow different pages to render in the same layout.
- Defined with slot which is a folders `[@foldername]` in the same layout scope.
- These pages can be destructured from layout props along with `children` prop as an extra slot.
- Handling sub-navigation `[@page]/sub-route/page.tsx` within slots should have a `default.tsx` from each slot in order to handle rerender route in sub-navigation.

## Intercepting Routes

- Use "(.)foldername" to match segment on same level.
- Use "(..)foldername" match one level above.
- Use "(...)foldername" match root directory.
- Useful when you want to display content from the route without leaving the current context.

## Route Handlers

- `route.ts` file inside the target folder.
- Export HTTP verbs, e.g., GET, POST which are functions to make API calls.
- Can accept `NextRequest`, `NextResponse` from "next/server" and `headers`, `cookies` from "next/headers".
- By default, `Response` object is caching response in the routes. To opt out from this behaviour, export `const dynamic = "force-dynamic"` which has a default value of "auto". This will not cache response.

## Middleware for Routing

- Add `middleware.ts` in the `src/` folder.
- It will be active on specific paths.
- From `NextRequest` as a param from the exported middleware function.
- Export a config object that has a `matcher` attribute that matches the selected path this middleware is active on.
- Alternatively, check the `request.nextUrl.pathname` if it matches the desired path.

## Rendering Strategies

1. **Static Render**: Generates HTML at build time (default, disabled in dev mode). Shown in the build output with a hollow circle. Prefetching preloads a route in the background before the user navigates to it. Routes are automatically prefetched as they become visible on the user's screen. For static routes, the entire route is prefetched and cached.
2. **Dynamic Render**: Server renders routes at request time. Shown as a lambda in the build output. This is used if a dynamic function is discovered (like cookies, headers, search params).
3. **Streaming Render**: Allows progressive UI rendering. This can be achieved by wrapping async components with suspense boundaries.
