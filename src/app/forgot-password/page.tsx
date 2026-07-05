import { forgotPasswordAction, resetPasswordAction } from "@/app/actions";
import Link from "next/link";

export default async function ForgotPasswordPage({ searchParams }: { searchParams?: Promise<{ token?: string; error?: string; success?: string }> }) {
  const params = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6 dark:bg-slate-950">
      <section className="glass-card w-full max-w-2xl rounded-[2rem] p-8 md:p-12">
        <Link href="/login" className="font-bold text-blue-600">← Back to login</Link>
        <h1 className="mt-8 text-4xl font-black">Forgot password</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Generate a reset token and set a new password. In production the reset token would be emailed securely.</p>
        {params?.error ? <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-200">{params.error}</div> : null}
        {params?.success ? <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">{params.success}</div> : null}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <form action={forgotPasswordAction} className="grid gap-4">
            <h2 className="font-black">1. Request reset</h2>
            <input className="input" type="email" name="email" placeholder="student001@demo.edu" required />
            <button className="btn-primary" type="submit">Generate reset link</button>
          </form>
          <form action={resetPasswordAction} className="grid gap-4">
            <h2 className="font-black">2. Set new password</h2>
            <input className="input" name="token" placeholder="Reset token" defaultValue={params?.token ?? ""} required />
            <input className="input" type="password" name="password" placeholder="New password" required minLength={8} />
            <input className="input" type="password" name="confirmPassword" placeholder="Confirm password" required minLength={8} />
            <button className="btn-primary" type="submit">Update password</button>
          </form>
        </div>
      </section>
    </main>
  );
}
