import { signUpAction } from "@/app/actions";
import Link from "next/link";

export default async function RegisterPage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-8 flex items-center justify-between"><Link href="/" className="font-black text-blue-600">← CodeCraze 2026</Link><Link href="/login" className="btn-secondary">Already registered?</Link></nav>
        <section className="glass-card rounded-[2rem] p-6 md:p-10">
          <p className="font-black uppercase tracking-[.2em] text-amber-500">Student Registration</p>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">Create your symposium pass.</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Complete your profile once, verify email, then register for multiple events from the dashboard.</p>
          {params?.error ? <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-200">{params.error}</div> : null}
          <form action={signUpAction} className="mt-8 grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">Full Name<input className="input" name="fullName" required /></label>
            <label className="grid gap-2 text-sm font-bold">Register Number<input className="input" name="registerNumber" required /></label>
            <label className="grid gap-2 text-sm font-bold">College Name<input className="input" name="collegeName" required /></label>
            <label className="grid gap-2 text-sm font-bold">Department<input className="input" name="department" required placeholder="CSE / IT / ECE" /></label>
            <label className="grid gap-2 text-sm font-bold">Year of Study<select className="input" name="yearOfStudy" required><option value="1">I Year</option><option value="2">II Year</option><option value="3">III Year</option><option value="4">IV Year</option></select></label>
            <label className="grid gap-2 text-sm font-bold">Email Address<input className="input" name="email" type="email" required /></label>
            <label className="grid gap-2 text-sm font-bold">Mobile Number<input className="input" name="mobileNumber" required /></label>
            <label className="grid gap-2 text-sm font-bold">Gender<select className="input" name="gender" required><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select></label>
            <label className="grid gap-2 text-sm font-bold">City<input className="input" name="city" required /></label>
            <label className="grid gap-2 text-sm font-bold">Profile Photo URL (Optional)<input className="input" name="profilePhoto" placeholder="https://..." /></label>
            <label className="grid gap-2 text-sm font-bold">Emergency Contact<input className="input" name="emergencyContact" required /></label>
            <label className="grid gap-2 text-sm font-bold">Food Preference<select className="input" name="foodPreference" required><option>Veg</option><option>Non-Veg</option></select></label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 text-sm font-bold dark:border-slate-800"><input type="checkbox" name="accommodationRequired" /> Accommodation Required</label>
            <div />
            <label className="grid gap-2 text-sm font-bold">Password<input className="input" name="password" type="password" required minLength={8} /></label>
            <label className="grid gap-2 text-sm font-bold">Confirm Password<input className="input" name="confirmPassword" type="password" required minLength={8} /></label>
            <label className="md:col-span-2 flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-sm font-semibold text-blue-900 dark:bg-blue-500/10 dark:text-blue-100"><input className="mt-1" type="checkbox" name="terms" required /> I accept the CodeCraze 2026 terms, event rules, attendance verification, and communication policy.</label>
            <button className="btn-primary md:col-span-2" type="submit">Create account & verify email</button>
          </form>
        </section>
      </div>
    </main>
  );
}
