import { MotionSection } from "@/components/motion-section";
import { getPublicPageData } from "@/lib/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

const navItems = ["About", "Events", "Schedule", "Speakers", "Gallery", "FAQ", "Contact"];
const timeline = [
  ["08:30 AM", "Registration desk opens", "Main Lobby"],
  ["09:30 AM", "Inauguration & keynote", "Main Auditorium"],
  ["11:00 AM", "Flagship events begin", "Labs & Halls"],
  ["02:00 PM", "Workshops and design rounds", "Innovation Block"],
  ["05:00 PM", "Final demos and jury review", "Expo Arena"],
  ["06:30 PM", "Awards, certificates, and valedictory", "Main Auditorium"],
];
const faqs = [
  ["Who can participate?", "Students from engineering, arts, and science colleges can register with a valid college ID."],
  ["Can I register for multiple events?", "Yes. The dashboard lets you register, cancel, and track status for multiple events."],
  ["Are certificates available?", "Digital certificates are generated after attendance and event completion are verified."],
  ["Is accommodation available?", "Limited accommodation is available on request and will be coordinated by the hospitality team."],
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
}

export default async function HomePage() {
  const { stats, events, announcements, coordinators } = await getPublicPageData();

  return (
    <main className="overflow-hidden">
      <section className="hero-grid relative min-h-screen bg-[#F8FAFC] dark:bg-slate-950">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-[-8%] h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">CC</span>
            <span className="text-xl">CodeCraze 2026</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300 lg:flex">
            {navItems.map((item) => <Link key={item} href={`/${item.toLowerCase()}`}>{item}</Link>)}
          </nav>
          <div className="flex items-center gap-3">
            <Link className="hidden rounded-full px-4 py-2 font-semibold text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-900 sm:inline-flex" href="/login">Login</Link>
            <Link className="btn-primary" href="/register">Register</Link>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pt-20">
          <MotionSection className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm dark:border-blue-500/20 dark:bg-slate-900/70 dark:text-blue-200">
              March 12–14, 2026 • National-level technical symposium
            </p>
            <h1 className="text-5xl font-black leading-[.95] tracking-tight text-slate-950 dark:text-white sm:text-7xl lg:text-8xl">
              Build. Break. Innovate at <span className="text-blue-600">CodeCraze</span>.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              A premium full-stack symposium portal for students to discover events, register online, manage confirmations, receive announcements, and download certificates—while organizers control everything from a secure admin panel.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="btn-primary">Start student registration</Link>
              <Link href="/events" className="btn-secondary">Explore events</Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {[
                [stats.students, "Students"],
                [stats.events, "Events"],
                [stats.registrations, "Registrations"],
              ].map(([value, label]) => (
                <div key={label} className="glass-card rounded-3xl p-4 text-center">
                  <div className="text-3xl font-black text-blue-600">{value}+</div>
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </MotionSection>

          <MotionSection delay={0.15} className="relative">
            <div className="float-slow glass-card rounded-[2rem] p-4">
              <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-200">Live dashboard preview</p>
                    <h2 className="text-2xl font-black">Event Command Center</h2>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">ONLINE</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {events.slice(0, 4).map((event) => (
                    <div key={event.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-bold uppercase text-amber-300">{event.category}</p>
                      <h3 className="mt-2 font-bold">{event.name}</h3>
                      <p className="mt-3 text-sm text-slate-300">{formatDate(event.eventDate)} • {event.startTime}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      <MotionSection className="mx-auto max-w-7xl px-6 py-20" delay={0.05}>
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div id="about">
            <p className="font-black uppercase tracking-[.2em] text-amber-500">About CodeCraze 2026</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">A campus tech festival engineered like a product.</h2>
          </div>
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
            CodeCraze 2026 brings coding, research, robotics, AI, design, entrepreneurship, and hands-on workshops into one connected experience. Students get a modern portal; coordinators get real-time approvals, analytics, CSV exports, and certificate workflows.
          </p>
        </div>
      </MotionSection>

      <section id="events" className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-black uppercase tracking-[.2em] text-amber-400">Flagship Events</p>
              <h2 className="mt-3 text-4xl font-black sm:text-5xl">Choose your challenge.</h2>
            </div>
            <Link href="/events" className="btn-primary">View all events</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => (
              <article key={event.id} className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[.04] shadow-2xl transition hover:-translate-y-1 hover:bg-white/[.08]">
                <img src={event.posterUrl} alt={`${event.name} poster`} className="h-40 w-full object-cover opacity-85 transition group-hover:scale-105" />
                <div className="p-5">
                  <p className="text-xs font-black uppercase tracking-wide text-amber-300">{event.category}</p>
                  <h3 className="mt-2 text-xl font-black">{event.name}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{event.description}</p>
                  <div className="mt-5 rounded-2xl bg-white/10 p-3 text-sm text-slate-200">
                    {formatDate(event.eventDate)} • {event.venue}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MotionSection className="mx-auto max-w-7xl px-6 py-20" id="schedule">
        <div className="mb-10">
          <p className="font-black uppercase tracking-[.2em] text-blue-600">Schedule</p>
          <h2 className="mt-3 text-4xl font-black sm:text-5xl">Designed for momentum.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {timeline.map(([time, title, venue]) => (
            <div key={time} className="glass-card rounded-3xl p-6">
              <p className="text-2xl font-black text-blue-600">{time}</p>
              <h3 className="mt-3 text-xl font-black">{title}</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">{venue}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <section id="speakers" className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-black uppercase tracking-[.2em] text-amber-500">Speakers & Coordinators</p>
          <h2 className="mt-3 text-4xl font-black sm:text-5xl">Guided by faculty and builders.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coordinators.slice(0, 8).map((person) => (
              <div key={person.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-xl font-black text-white">{person.name.slice(0, 2).toUpperCase()}</div>
                <h3 className="font-black">{person.name}</h3>
                <p className="text-sm font-semibold text-blue-600">{person.role}</p>
                <p className="mt-2 text-sm text-slate-500">{person.department}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MotionSection className="mx-auto max-w-7xl px-6 py-20" id="gallery">
        <div className="grid gap-4 md:grid-cols-4">
          {events.slice(0, 8).map((event, index) => (
            <div key={event.id} className={`overflow-hidden rounded-[2rem] ${index % 3 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <img src={event.posterUrl} alt={`${event.name} gallery`} className="h-full min-h-56 w-full object-cover" />
            </div>
          ))}
        </div>
      </MotionSection>

      <section id="faq" className="bg-blue-600 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="font-black uppercase tracking-[.2em] text-blue-100">FAQ & Updates</p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">Everything participants need to know.</h2>
          </div>
          <div className="grid gap-4">
            {faqs.map(([question, answer]) => (
              <div key={question} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15">
                <h3 className="font-black">{question}</h3>
                <p className="mt-2 text-blue-50">{answer}</p>
              </div>
            ))}
            {announcements.map((announcement) => (
              <div key={announcement.id} className="rounded-3xl bg-amber-400 p-6 text-slate-950">
                <p className="text-xs font-black uppercase">Announcement</p>
                <h3 className="mt-1 font-black">{announcement.title}</h3>
                <p className="mt-2 text-sm">{announcement.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-black">CodeCraze 2026</h2>
            <p className="mt-3 max-w-xl text-slate-300">Department of Computer Science, Innovation Campus. Email: hello@codecraze.edu • Phone: +91 90000 26026</p>
          </div>
          <div>
            <h3 className="font-black">Portals</h3>
            <div className="mt-3 grid gap-2 text-slate-300"><Link href="/login">Student Login</Link><Link href="/login?portal=admin">Admin Login</Link><Link href="/register">Student Registration</Link></div>
          </div>
          <div>
            <h3 className="font-black">Social</h3>
            <p className="mt-3 text-slate-300">Instagram • LinkedIn • X • YouTube</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
