## Setup & Run Instructions

1. **Install dependencies:**
   ```sh
   npm install

2. **Start development server:**
   ```sh
   npm run dev

3. **Build for production:**
   ```sh
   npm run build
   npm start



  **Folder & Component Structure** 
app – Next.js app routes, global providers, layout.
components – UI components, grouped by feature (auth, chat, dashboard, layout, ui).
hooks – Custom React hooks (e.g., useAuth, useChat).
lib – Utility functions and constants (utils.ts, constants.ts, validations.ts).
store – Redux store and slices (index.ts, authSlice.ts, chatSlice.ts, uiSlice.ts).
types – TypeScript interfaces (index.ts).
public – Static assets (SVGs, icons).
Implementation Details
Throttling
Debounce/throttle for search and input is handled via useDebounce.
Pagination & Infinite Scroll
Chat messages are paginated using Redux state (messagePage, MESSAGE_PAGE_SIZE in constants.ts).
Infinite scroll is managed by disabling/enabling hasMoreMessages in chatSlice.ts.
Form Validation
Forms use Zod schemas (validations.ts) and react-hook-form for validation.
Example: Phone and OTP validation in LoginForm and OTPForm.


   **For more details, see the src folder and referenced files above.**

**Referenced symbols:**
- [`useAuth`](src/hooks/useAuth.ts)
- [`useChat`](src/hooks/useChat.ts)
- [`utils.ts`](src/lib/utils.ts)
- [`constants.ts`](src/lib/constants.ts)
- [`validations.ts`](src/lib/validations.ts)
- [`index.ts`](src/store/index.ts)
- [`authSlice.ts`](src/store/slices/authSlice.ts)
- [`chatSlice.ts`](src/store/slices/chatSlice.ts)
- [`uiSlice.ts`](src/store/slices/uiSlice.ts)
- [`index.ts`](src/types/index.ts)
- [`useDebounce`](src/hooks/useDebounce.ts)
- [`LoginForm`](src/components/auth/LoginForm.tsx)
- [`OTPForm`](src/components/auth/OTPForm.tsx)

**Referenced folders:**
- [src/hooks](src/hooks)
- [src/lib](src/lib)
- [src/store](src/store)
- [src/types](src/types)
- [src/components](src/components)
- [public](public)**Referenced symbols:**
- [`useAuth`](src/hooks/useAuth.ts)
- [`useChat`](src/hooks/useChat.ts)
- [`utils.ts`](src/lib/utils.ts)
- [`constants.ts`](src/lib/constants.ts)
- [`validations.ts`](src/lib/validations.ts)
- [`index.ts`](src/store/index.ts)
- [`authSlice.ts`](src/store/slices/authSlice.ts)
- [`chatSlice.ts`](src/store/slices/chatSlice.ts)
- [`uiSlice.ts`](src/store/slices/uiSlice.ts)
- [`index.ts`](src/types/index.ts)
- [`useDebounce`](src/hooks/useDebounce.ts)
- [`LoginForm`](src/components/auth/LoginForm.tsx)
- [`OTPForm`](src/components/auth/OTPForm.tsx)

**Referenced folders:**
- [src/hooks](src/hooks)
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
