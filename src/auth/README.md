# Auth

Login, signup, and account pages live here — built in the next pass.

Planned shape:

```
auth/
  pages/
    Login.tsx
    Signup.tsx
  components/
    AuthLayout.tsx
    AuthInput.tsx
  context/
    AuthContext.tsx
```

Once these exist, wire them into `src/App.tsx`:

```tsx
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
```
