"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PH = "https://www.producthunt.com/posts/cal-com";
const COLUMNS = [
  [
    {
      name: "Mickey",
      source: "on Trustpilot",
      href: "https://www.trustpilot.com/reviews/65b1014c89c01f5de174f12b",
      avatar:
        "https://cal.com/landing/testimonials/854ab96c-3d72-4427-a21d-423b1332b590.svg?dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Thrilled with this scheduling app—it's a game-changer. The intuitive interface and advanced features streamline my time management. The standout, however, is the incredible support team—swift, expert responses to every query. A perfect combo for seamless scheduling and top-notch customer service. P.s. Way better than Calendly",
    },
    {
      name: "davidvkimball",
      source: "on Trustpilot",
      href: "https://www.trustpilot.com/reviews/65a6f085d749fb09a556c835",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Ff092230d-08b0-4d0d-aa58-ae2cfd37e43e.png&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Without a doubt the best calendar/scheduling application I have ever used. It has all of the advanced features I need while also being insanely intuitive and straightforward for both end-users and booking recipients. Love it!!",
    },
    {
      name: "flo merian",
      source: "on Product Hunt",
      href: "https://www.producthunt.com/posts/cal-com",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F10fa236a-bf8f-4461-8f3c-7de538396d59.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "more elegant than Calendly, more open than Savvycal, cal.com works and it feels just right.",
    },
    {
      name: "Ben",
      source: "on Product Hunt",
      href: "https://www.producthunt.com/posts/cal-com",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F05fc58ea-9fd1-45fd-81b6-f67da057b195.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Amazing. I've been sharing it with everyone I know. It's helped me create more events spontaneously, because of how smooth it is compared to Calendly and Harmonizely.",
    },
    {
      name: "Berkant Seyhan",
      source: "on Trustpilot",
      href: "https://www.trustpilot.com/reviews/65096c6046df24ddbae210f2",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Ffda4d48c-d275-44aa-9d66-5f1e4f00e0ca.png&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "One of the best organizing apps I've used lately. At the same time, I cannot help but mention that they are actively responsive and open to development.",
    },
    {
      name: "David Asabina",
      source: "on Trustpilot",
      href: "https://www.trustpilot.com/reviews/647cd0a7a3a4f9893a3f9de4",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F99a6ef47-997b-48ed-ba90-861e14dacbe9.png&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Was logged out of my account and Peer (CEO, co-founder) tended to the matter within an hour. It doesn't get much better than this. For a OSS product to be this focus on customer service is next level.",
    },
    {
      name: "Errol M.",
      source: "on G2",
      href: "https://g2.com/survey_responses/cal-com-review-7950793",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fcd165d07-0614-4f77-823b-378c5d0b730c.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "It's so well thought out. A lot of care has gone into most situations you will come across when trying to herd cats for meetings. Cal.com is solving the problem of getting appointments organised but it goes beyond that with thoughtful and easy to use features. Workflows for pre and post meetings using email and SMS are brilliant.",
    },
    {
      name: "Regina Gerbeaux",
      source: "on Trustpilot",
      href: "https://www.trustpilot.com/reviews/642ee1afd5338ffea87187eb",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fd4e755b7-accf-4ade-aedf-0bb1df0c3ab6.png&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "I have used all the calendar scheduling apps and cal.com is the easiest, most intuitive, and best out of all of them. They actually listen to user concerns and address them, and their speed of shipping new versions and features is second to none. The integrations they have are also massively powerful. Would highly recommend!",
    },
    {
      name: "Mrugesh Mohapatra",
      source: "@raisedadead on X",
      href: "https://x.com/raisedadead/status/1639221456520495104",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fd40752f9-6875-41d9-ac8e-a2f329625b65.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Ya'all, I just moved my calendar booking page from Calendly to – Use this to book some face time with me.",
    },
    {
      name: "Aarón García",
      source: "@aarongarciah on X",
      href: "https://x.com/aarongarciah/status/1623956094979563521",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fceeb02ce-666c-4510-b300-25eb5c4e2bbf.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Such an amazing product @calcom is. And such a vibe. Great alternative to Calendly.",
    },
    {
      name: "Regina Gerbeaux.",
      source: "on Product Hunt",
      href: "https://www.producthunt.com/posts/cal-com",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fc57b831b-1ea5-4ce6-b74c-a3ab7aa19aa0.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Second to none on all calendar scheduling apps - team ships fast and new features / versions are constantly being released.",
    },
    {
      name: "Jessie Zwaan✨",
      source: "@jessicamayzwaan on X",
      href: "https://x.com/jessicamayzwaan/status/1554487466501046272",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Ff65f154c-b370-44df-8c2c-148a7a3143e0.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Consider me a convert! @calcom has shared an easy how-to guide on integrating @whereby rooms into your scheduling. ⚡️⚡️⚡️ cal.com",
    },
  ],
  [
    {
      name: "Kent C. Dodds 🌌",
      source: "@kentcdodds on X",
      href: "https://x.com/kentcdodds/status/1749916873201008863",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fe1631b19-fec8-4792-8f27-cf846ac6f9fb.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "I just migrated from calendly to cal.com I'm liking it so far. I wasn't particularly displeased with calendly. It's fine. But I like that cal is OSS and my sub to calendly was coming up for renewal so I thought I'd check it out. Looks good.",
    },
    {
      name: "Ant Wilson",
      source: "@AntWilson on X",
      href: "https://x.com/AntWilson/status/1742562512103506350",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F677a8e3d-efc9-4f85-a046-dddfea63dccd.png&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "(finally) made the move to @calcom after I couldn't find how to edit events in the calendly dashboard and I must say - dash is 10/10 Bravo @peer_rich and team (I should have moved over years ago!) OSS fam",
    },
    {
      name: "Ahmed Elnaggar",
      source: "on Product Hunt",
      href: "https://www.producthunt.com/posts/cal-com",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fc35ae6eb-18e0-423a-acfd-bbbd34b82fd7.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "This platform's open-source nature and flexible licensing are a developer's dream. Self-hosting and white-labeling empower personalization and seamless integration.",
    },
    {
      name: "Pankaj Dixit",
      source: "on Product Hunt",
      href: "https://www.producthunt.com/posts/cal-com",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F5009cbd6-b417-429e-b619-880125269b5b.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Very easy to set up and start. Connected with my Google calendar without any problem. Connecting with Microsoft gives me an error. But other than that the user interface is very good.",
    },
    {
      name: "daniel roe 🇺🇦",
      source: "@danielcroe on X",
      href: "https://x.com/danielcroe/status/1667993397435457537",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fe2db31eb-f5e6-4462-ac3f-c22461f0eb83.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "... and a shout-out to @calcom who made it incredibly easy (and beautiful) to set things up. I'm so impressed that I'm migrating to from calendly + google calendar scheduling.",
    },
    {
      name: "Aashish Upadhyay",
      source: "on Trustpilot",
      href: "https://www.trustpilot.com/reviews/646c843c3d8ff42b87b62cae",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F932c5db5-1cb9-4ea5-a724-2fd8a5b7e06d.png&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "There are so many app integrations available, offering a wide range of choices for video conferencing. Additionally, the built-in Cal Video feature is excellent as it allows you to seamlessly conduct video conferences directly in your browser, without the need to download and install any additional applications in your computer.",
    },
    {
      name: "Jeroen C.",
      source: "on G2",
      href: "https://g2.com/survey_responses/cal-com-review-7947886",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fa00d6065-2b9e-4a14-a1f1-09099b62c76d.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "I came from calendly, where I had a lot of features I didn't need in a paid account. Cal.com's free account for a freelancer like me is great. It packs quite some features, including Google Analytics and workflows. Support has been very responsive in fixing things, big plus!",
    },
    {
      name: "Zach Waterfield",
      source: "on Trustpilot",
      href: "https://www.trustpilot.com/reviews/642ee849f7606955d88a3677",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F0fd2b212-e122-4276-b663-dbc6b26c78fd.png&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "I use cal to manage all my external meetings and it's the perfect solution. Has all the features I need and couldn't live without it.",
    },
    {
      name: "Jean-Philippe Allard",
      source: "on Trustpilot",
      href: "https://www.trustpilot.com/reviews/641b13b695c1d919b521e0c7",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fbd06ab69-4867-4bee-8eb6-e26a73389b50.png&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "What an amazing support experience! Identified a small bug and sent them an e-mail. The bug was fixed (Github pull request as a proof!) in under 24 hours. I've never seen such a fast and efficient support before, call me impressed!",
    },
    {
      name: "Shivansh",
      source: "@Shivansh_C on X",
      href: "https://x.com/Shivansh_C/status/1623772561766244352",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fd9f70843-e6a4-48c2-bae7-3c1b91caaa81.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "I've officially transitioned out of Calendly to for personal calendar needs. Simple onboarding, automated workflows and comprehensive documentation- that's the reason why. The fact that it's open source is a cherry on cake.",
    },
    {
      name: "Ry Walker — oss/acc",
      source: "@rywalker on X",
      href: "https://x.com/rywalker/status/1582125220604743680",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F814d7cfe-0309-44df-a89f-74675b49e29b.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "@peer_rich @JosephJacks_ Unrelated, just switched from calendly to today, straight to paid plan because I wanted a nicer URL :) love the UI and features",
    },
    {
      name: "Farhaj Mayan 🧞‍♂️",
      source: "@farhajmayan on X",
      href: "https://x.com/farhajmayan/status/1494243196506804225",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F93b45b34-fc97-42ff-aa53-97a40184d14c.png&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "As of today I'm officially a @calcom maxi. The product is epic. @peer_rich where can I buy merch??",
    },
  ],
  [
    {
      name: "Anuvesh Singh",
      source: "@singh_anuvesh on X",
      href: "https://x.com/singh_anuvesh/status/1747985983742922834",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fd66db8ba-919d-4b07-a71f-20cb4b0d0839.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "2 days of using @calcom is enough to never look back at calendly",
    },
    {
      name: "Denis",
      source: "on Product Hunt",
      href: "https://www.producthunt.com/posts/cal-com",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F4ee028df-ab06-44cf-a812-658f80734ab6.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "One of the best tools for scheduling and my favorite after so many other options tried.",
    },
    {
      name: "Rotimi Best",
      source: "@rotimi_best on X",
      href: "https://x.com/rotimi_best/status/1719443453665280325",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Faf88a803-f363-44bd-b771-31ffe5c4b495.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "for the love of me, why do people still use Calendly? Just today I have seen products reference Calendly while they know of @calcom It's a no brainer for me to use , their brand is amazing, cool team + they even have more compelling features 🤷",
    },
    {
      name: "Aria Minaei",
      source: "on Product Hunt",
      href: "https://www.producthunt.com/posts/cal-com",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F0d4630d5-d78d-42dc-98dc-a20632255fb7.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Just gave it a go and it's definitely the easiest meeting I've ever scheduled! No context switching, no distractions, and works even better on mobile too.",
    },
    {
      name: "David Asabina",
      source: "on Product Hunt",
      href: "https://www.producthunt.com/posts/cal-com",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F266907aa-1418-4006-9e10-e03654fa2138.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Had an issue logging in and Peer (CEO) tended to the matter within the hour. I haven't had such responsive customer service so this was quite the experience. It's refreshing to find a customer-centric open source project do so well.",
    },
    {
      name: "David Guyon",
      source: "@DavidGuyon on X",
      href: "https://x.com/DavidGuyon/status/1649823260001935360",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F3727e0b4-9a8a-49c4-8591-71459d8a0e06.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Testing out as an alternative to Calendly and loving it so far. Configurable, good onboarding, simple to use 👍🏼.",
    },
    {
      name: "Andrew S. Rosen",
      source: "@Andrew_S_Rosen on X",
      href: "https://x.com/Andrew_S_Rosen/status/1644056226005946368",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fe329fe49-925d-4c2d-9b50-f804d69e914f.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Regarding productivity software that I've been binging lately, I just tried out (@calcom), and it is an amazing (better) alternative to Calendly in my opinion. This is particularly true for the free tier. I think I'll add this one to my email signature.",
    },
    {
      name: "Serg Lotz",
      source: "on Product Hunt",
      href: "https://www.producthunt.com/posts/cal-com",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2F032083bd-ef54-4388-9c98-9f35c5aa3a0d.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Easy to modify; just open a PR on Github, ping Peer, and voilà.",
    },
    {
      name: "Anurag Banerjee",
      source: "on Product Hunt",
      href: "https://www.producthunt.com/posts/cal-com",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Ff25832a4-7c72-4300-a650-360da264066b.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Switched from Calendly in an instance. Love their open source model. And of course, beautiful design!",
    },
    {
      name: "Wilson Wilson",
      source: "",
      href: "",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fe65341d0-d8d4-40d7-9fb0-11a3b9173654.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "I just learned about cal.com this morning and now they have a new customer. I'm head over heels about Peer's project. It just works! Well done!",
    },
    {
      name: "Nickolas Tazes",
      source: "@nickolas_tazes on X",
      href: "https://x.com/nickolas_tazes/status/1580090873676591104",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fff26fdc3-b3e1-495a-a7c7-d8d26a607684.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "I had a Calendly and a cal.com account. Now I only have @calcom. It’s a no-brainer!",
    },
    {
      name: "Guillermo Rauch",
      source: "@rauchg on X",
      href: "https://x.com/rauchg/status/1438243466463498242",
      avatar:
        "https://cal.com/_site/_next/image?url=%2Flanding%2Ftestimonials%2Fc4ee8e3f-e666-4cb6-824b-d92e3ecd84d6.jpg&w=128&q=75&dpl=dpl_42eyJvvnumjem6mqB656YQGoMeQs",
      text: "Coolest domain. Check Coolest mission. Check Coolest product. Check cal.com",
    },
  ],
];

const REVEAL =
  "translate-y-6 opacity-0 transition-[opacity,transform] duration-600 ease-hp [transition-delay:calc(var(--i,0)*60ms)] group-data-in/section:translate-y-0 group-data-in/section:opacity-100 data-in:translate-y-0 data-in:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

function TestimonialCard({ item, expanded, order }) {
  const hiddenOnMobile = item.mobileHidden && !expanded;
  const justRevealed = item.mobileHidden && expanded;

  return (
    <li
      style={justRevealed ? { animationDelay: `${order * 70}ms` } : undefined}
      className={cn(
        hiddenOnMobile && "max-tablet:hidden",
        justRevealed && "hp-rise",
      )}
    >
      <figure className="m-0 rounded-[20px] bg-card p-6 shadow-[inset_0_0_0_1px_var(--color-hp-hairline)]">
        <blockquote className="m-0 text-[17px] leading-[1.45] text-pretty text-foreground">
          {item.text}
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          <img
            alt=""
            src={item.avatar}
            width={36}
            height={36}
            loading="lazy"
            decoding="async"
            className="size-9 shrink-0 rounded-full bg-muted object-cover"
          />
          <span className="grid min-w-0 gap-0.5 text-[14px] leading-[1.3]">
            <span className="truncate font-medium text-foreground">
              {item.name}
            </span>
            <a
              href={item.href}
              target="_blank"
              rel="noopener nofollow"
              className="truncate text-[13px] text-muted-foreground no-underline transition-colors duration-100 ease-out hover:text-foreground"
            >
              {item.source}
            </a>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

export default function TestimonialSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      ref={ref}
      aria-label="Wall of love"
      data-in={inView ? "true" : undefined}
      className="mx-auto w-[calc(100%-2*var(--page-margin))] max-w-[1152px] py-28 group/section"
    >
      <style>{`
        @keyframes hp-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        .hp-rise { animation: hp-rise 480ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) { .hp-rise { animation: none; } }
      `}</style>

      <header className="grid max-w-[760px] justify-items-start gap-6">
        <h2 className="m-0 font-display text-[56px] leading-[1.05] text-balance text-hp-ink max-desktop:text-[44px] max-tablet:text-[34px] max-tablet:hyphens-auto max-tablet:[overflow-wrap:anywhere]">
          <span className="block">See why our users</span>{" "}
          <span className="block">love Cal.com.</span>
        </h2>
        <p
          style={{ "--i": 1 }}
          className={cn(
            "font-hp-display m-0 max-w-[640px] text-2xl leading-[1.35] font-medium text-pretty text-hp-quiet max-tablet:text-[19px] max-tablet:text-hp-muted",
            REVEAL,
          )}
        >
          Read the impact we&apos;ve had from those who matter most: our
          customers.
        </p>
      </header>

      <div
        style={{ "--i": 2 }}
        className={cn("mt-14 max-tablet:mt-10", REVEAL)}
      >
        <div className="grid grid-cols-3 items-start gap-4 text-left max-desktop:grid-cols-2 max-tablet:grid-cols-1">
          {COLUMNS.map((column, c) => (
            <ul key={c} className="m-0 grid list-none gap-4 p-0">
              {column.slice(0, expanded ? column.length : 3).map((item, i) => (
                <TestimonialCard
                  key={`${item.name}-${i}`}
                  item={item}
                  expanded={expanded}
                  order={c + i}
                />
              ))}
            </ul>
          ))}
        </div>

        {!expanded && (
          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setExpanded(true)}
              className="h-9 gap-1.5 rounded-[12px] px-3.5 pt-px text-sm leading-[21px] font-medium"
            >
              Show more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
