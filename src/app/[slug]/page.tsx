import Link from "next/link";

const pages: Record<string, { title: string; eyebrow: string; body: string; bullets: string[] }> = {
  about: {
    title: "About CodeCraze 2026",
    eyebrow: "Purpose",
    body: "CodeCraze 2026 is a modern college technical symposium focused on practical engineering, collaborative problem solving, and inclusive innovation. The platform connects students, faculty coordinators, and event organizers through one persistent full-stack portal.",
    bullets: ["National-level technical contests", "Secure registration and role-based dashboards", "Faculty-led judging and transparent approvals", "Digital certificates and analytics"],
  },
  schedule: {
    title: "Event Schedule",
    eyebrow: "Three-day flow",
    body: "The symposium is planned across inauguration, flagship competitions, workshops, product demos, final reviews, and awards. Students can track event timing from their dashboard after registration.",
    bullets: ["Day 1: Keynotes, coding, quizzes", "Day 2: Hackathon, workshops, robotics", "Day 3: Finals, expo, certificates", "Live announcements for changes"],
  },
  speakers: {
    title: "Speakers & Chief Guests",
    eyebrow: "Experts",
    body: "Industry mentors, research leaders, alumni founders, and faculty experts guide the event with talks, judging panels, mentorship, and career-focused sessions.",
    bullets: ["AI and cloud keynote", "Startup founder fireside chat", "Research review panel", "Women in Tech forum"],
  },
  gallery: {
    title: "Gallery",
    eyebrow: "Moments",
    body: "A visual archive of hackathon builds, robotics arenas, workshop labs, paper presentations, networking corners, and award ceremonies from the CodeCraze community.",
    bullets: ["Live photo wall during the event", "Poster gallery", "Winner showcase", "Behind-the-scenes coordinator moments"],
  },
  faq: {
    title: "Frequently Asked Questions",
    eyebrow: "Support",
    body: "Find answers about eligibility, registration, accommodation, payment-free demo workflows, certificate downloads, and event-specific guidelines.",
    bullets: ["Use one student account for all events", "College ID is mandatory", "Accommodation requests are reviewed", "Certificates appear after approval"],
  },
  contact: {
    title: "Contact Us",
    eyebrow: "Reach the team",
    body: "The CodeCraze help desk and organizing committee are available for participant questions, faculty coordination, sponsorship conversations, and emergency support.",
    bullets: ["hello@codecraze.edu", "+91 90000 26026", "Computer Science Block, Innovation Campus", "Instagram, LinkedIn, X, YouTube"],
  },
};

export default async function PublicInfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug] ?? pages.about;
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <section className="mx-auto max-w-5xl rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl md:p-14">
        <Link href="/" className="font-bold text-blue-200">← Back to home</Link>
        <p className="mt-10 font-black uppercase tracking-[.2em] text-amber-300">{page.eyebrow}</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight md:text-7xl">{page.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{page.body}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {page.bullets.map((item) => <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-6 font-semibold">{item}</div>)}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Link className="btn-primary" href="/register">Register now</Link><Link className="btn-secondary" href="/events">Browse events</Link></div>
      </section>
    </main>
  );
}
