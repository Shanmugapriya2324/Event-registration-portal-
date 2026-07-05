import { getPublicEvents } from "@/lib/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));
}

export default async function EventsPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string }> }) {
  const params = await searchParams;
  const q = params?.q ?? "";
  const category = params?.category ?? "All";
  const events = await getPublicEvents(q, category);
  const categories = ["All", ...Array.from(new Set(events.map((event) => event.category))).sort()];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-black text-blue-600">← CodeCraze 2026</Link>
          <div className="flex gap-3"><Link className="btn-secondary" href="/login">Login</Link><Link className="btn-primary" href="/register">Register</Link></div>
        </nav>
        <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl md:p-12">
          <p className="font-black uppercase tracking-[.2em] text-amber-300">Events</p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">Browse 20 technical experiences.</h1>
          <p className="mt-4 max-w-3xl text-slate-300">Search and filter CodeCraze contests, workshops, research presentations, robotics, design competitions, and innovation tracks.</p>
          <form className="mt-8 grid gap-3 md:grid-cols-[1fr_220px_auto]">
            <input className="input" name="q" placeholder="Search coding, AI, robotics..." defaultValue={q} />
            <select className="input" name="category" defaultValue={category}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
            <button className="btn-primary" type="submit">Apply filters</button>
          </form>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <article key={event.id} className="glass-card overflow-hidden rounded-[2rem]">
              <img src={event.posterUrl} alt={`${event.name} poster`} className="h-52 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black uppercase text-blue-700 dark:bg-blue-500/15 dark:text-blue-200">{event.category}</span>
                  <span className="text-sm font-bold text-emerald-600">{event.availableSeats} seats</span>
                </div>
                <h2 className="mt-4 text-2xl font-black">{event.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{event.description}</p>
                <dl className="mt-5 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between gap-4"><dt className="font-bold">Date</dt><dd>{formatDate(event.eventDate)} • {event.startTime}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="font-bold">Venue</dt><dd>{event.venue}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="font-bold">Deadline</dt><dd>{formatDate(event.registrationDeadline)}</dd></div>
                </dl>
                <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-100"><strong>Prize:</strong> {event.prizeDetails}</div>
                <p className="mt-4 text-sm text-slate-500"><strong>Rules:</strong> {event.rules}</p>
                <Link href="/student/dashboard" className="btn-primary mt-6 w-full">Register from dashboard</Link>
              </div>
            </article>
          ))}
        </section>
        {events.length === 0 ? <div className="mt-10 rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-500">No events match your filters. Try another search.</div> : null}
      </div>
    </main>
  );
}
