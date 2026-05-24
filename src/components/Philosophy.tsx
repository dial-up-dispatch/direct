

export default function Philosophy() {
  return (
    <section className="w-full flex flex-col gap-6 md:gap-8 py-8 md:py-12 border-b border-[#1f1b2e]">
      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
        // core promise & philosophy:
      </div>

      <div className="border-4 border-double border-[#1f1b2e] hover:border-[var(--color-accent)] p-6 md:p-8 bg-[rgba(14,11,22,0.15)] transition-all box-glow">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {/* Manifesto title */}
          <h2 className="text-sm md:text-base font-bold uppercase tracking-widest text-[var(--color-accent)] phosphor-glow text-center border-b border-[#1f1b2e] pb-4">
            the dispatch direct local vow
          </h2>

          <p className="text-xs md:text-sm text-[var(--color-text-primary)] leading-relaxed tracking-wide text-center uppercase font-bold">
            "your data is always yours, always local, and always retrievable—even if this project disappeared tomorrow."
          </p>

          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed tracking-wide text-center">
            indie software should not depend on cloud server leases, venture capital funding, or invasive data logging metrics. all dispatch direct sidebar companion tools operate on three absolute baseline requirements:
          </p>

          {/* Three pillars grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="flex flex-col gap-2 p-4 border border-[rgba(31,27,46,0.8)] bg-[rgba(14,11,22,0.2)]">
              <h4 className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider">
                01 // zero transit
              </h4>
              <p className="text-[10px] text-[var(--color-text-secondary)] leading-relaxed lowercase font-mono">
                no analytics, no accounts, and absolutely no database sync channels. what happens inside your sidebar is restricted entirely to your CPU and browser sandbox.
              </p>
            </div>

            <div className="flex flex-col gap-2 p-4 border border-[rgba(31,27,46,0.8)] bg-[rgba(14,11,22,0.2)]">
              <h4 className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider">
                02 // plain portability
              </h4>
              <p className="text-[10px] text-[var(--color-text-secondary)] leading-relaxed lowercase font-mono">
                your thoughts, ideas, and links are formatted in standard, readable markdown. download your entire pile in one click at any moment. zero lock-in pipelines.
              </p>
            </div>

            <div className="flex flex-col gap-2 p-4 border border-[rgba(31,27,46,0.8)] bg-[rgba(14,11,22,0.2)]">
              <h4 className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider">
                03 // total offline
              </h4>
              <p className="text-[10px] text-[var(--color-text-secondary)] leading-relaxed lowercase font-mono">
                built entirely on standard web components, localstorage, and indexeddb. all tools remain fully operational even if you lose network signals completely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
