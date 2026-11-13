const companies = [
  {
    name: "Deel",
    logo: "https://cal.com/media/logo-deel.svg",
  },
  {
    name: "Vercel",
    logo: "https://cal.com/media/logo-vercel.svg",
  },
  {
    name: "Retell",
    logo: "https://cal.com/media/logo-retell.svg",
  },
  {
    name: "PlanetScale",
    logo: "https://cal.com/media/logo-planetscale.svg",
  },
  {
    name: "Framer",
    logo: "https://cal.com/media/logo-framer.svg",
  },
  {
    name: "Raycast",
    logo: "https://cal.com/media/logo-raycast.svg",
  },
  {
    name: "Ramp",
    logo: "https://cal.com/media/logo-ramp.svg",
  },
  {
    name: "Rho",
    logo: "https://cal.com/media/logo-rho.svg",
  },
  {
    name: "Storyblok",
    logo: "https://cal.com/media/logo-storyblok.svg",
  },
  {
    name: "AngelList",
    logo: "https://cal.com/media/logo-angellist.svg",
  },
  {
    name: "Udemy",
    logo: "https://cal.com/media/logo-udemy.svg",
  },
  {
    name: "Collective",
    logo: "https://cal.com/media/logo-collective.svg",
  },
];

export default function CompanyLogos() {
  return (
    <section className="w-full min-h-[233px] bg-[#0d0d0d] px-5 pt-20 pb-12">
      <div className="mx-auto max-w-[1040px]">
        <p className="mb-6 text-center text-[13px] font-normal leading-[18px] tracking-[-0.2px] text-[#929292]">
          The fastest-growing companies use Cal.com for scheduling
        </p>

        <div className="grid grid-cols-6 items-center justify-items-center mt-2 gap-x-5 gap-y-[22px] max-md:grid-cols-3 max-sm:grid-cols-2">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex h-[28px] w-full items-center justify-center"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="max-h-[25px] max-w-[125px] w-auto object-contain brightness-0 invert opacity-65"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
