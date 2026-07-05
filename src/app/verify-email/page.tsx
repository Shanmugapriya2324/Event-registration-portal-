import { verifyEmailAction } from "@/app/actions";
import Link from "next/link";

export default async function VerifyEmailPage({ searchParams }: { searchParams?: Promise<{ token?: string; email?: string; error?: string }> }) {
  const params = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6 dark:bg-slate-950">
      <section className="glass-card w-full max-w-xl rounded-[2rem] p-8 text-center md:p-12">
        <p className="font-black uppercase tracking-[.2em] text-amber-500">Email Verification</p>
        <h1 className="mt-3 text-4xl font-black">Verify your student email.</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">In production this link would be emailed. For this demo, use the generated token below.</p>
        {params?.error ? <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-200">{params.error}</div> : null}
        <form action={verifyEmailAction} className="mt-8 grid gap-4 text-left">
          <label className="grid gap-2 text-sm font-bold">Verification token<input className="input" name="token" defaultValue={params?.token ?? ""} required /></label>
          <button className="btn-primary" type="submit">Verify email</button>
        </form>
        <Link href="/login" className="mt-6 inline-flex text-sm font-bold text-blue-600">Back to login</Link>
      </section>
    </main>
  );
}
