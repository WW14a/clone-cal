function CalAiSection() {
  return (
    <section className="w-full bg-neutral-950 text-white">
      <div className="mx-auto grid min-h-80 max-w-7xl grid-cols-2 items-center gap-20 px-8 py-16 max-md:grid-cols-1 max-md:gap-10">
        <div className="flex flex-col items-start">
          <span className="mb-7 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm font-medium text-neutral-200">
            Cal.ai
          </span>

          <h2 className="text-6xl font-semibold leading-none tracking-tight text-neutral-100 max-lg:text-5xl max-sm:text-4xl">
            One assistant,
            <br />
            wherever you ask.
          </h2>
        </div>

        <div className="flex max-w-xl flex-col items-start">
          <p className="mb-6 text-2xl font-medium leading-snug tracking-tight text-neutral-400 max-lg:text-xl">
            Ask Cal.ai about your bookings in Slack, in the web app or by text.
            It sees the page you have open and answers with your own numbers. In
            the web app, those numbers come back as a chart.
          </p>

          <a
            href="https://cal.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-xl bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-white"
          >
            Try Cal.ai
            <span>›</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CalAiSection;
