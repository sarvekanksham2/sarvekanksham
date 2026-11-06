(() => {
  "use strict";

  const siteOrigin = "https://sarvekanksham.com";
  const practiceTopics = {
    insolvency: {
      title: "Restructuring and Insolvency",
      subtitle: "Tailoring legal strategies to meet your specific financial needs while adhering to the highest ethical standards of transparency and integrity.",
      description: "Specialized legal advisory in insolvency, debt restructuring, NCLT proceedings, and commercial workouts in Patna, Bihar.",
      paragraphs: [
        "Our insolvency practice advises on the Insolvency and Bankruptcy Code, 2016 (IBC), its regulations, and related company and debt-recovery laws. We help clients understand available procedures, statutory responsibilities, timelines, and the practical implications of each course of action.",
        "Our work includes formal insolvency and resolution processes, bilateral restructuring negotiations, creditor-led workouts, cross-border considerations, and representation in related proceedings before the National Company Law Tribunal and other appropriate forums.",
        "Advocates work alongside financial analysts and corporate advisers to assess restructuring plans, evaluate recovery options, and compare a viable business turnaround with formal resolution or liquidation, based on the circumstances and applicable law.",
        "We advise lenders, corporate debtors, promoters, members of Creditors’ Committees (CoC), resolution professionals, and other stakeholders. The scope and approach are tailored to each engagement and do not guarantee any particular outcome."
      ]
    },
    banking: {
      title: "Banking & Finance",
      subtitle: "Legal guidance for lending, financial transactions, regulatory obligations, and the resolution of banking disputes.",
      description: "Legal guidance on banking, lending, finance transactions, regulatory issues, and recovery proceedings in Patna, Bihar.",
      paragraphs: [
        "Our banking and finance practice assists clients in understanding the legal and regulatory frameworks that apply to lending, credit facilities, security creation, and financial transactions in India.",
        "We advise on loan documentation, guarantees, security interests, covenant review, restructuring, enforcement options, and negotiations between lenders and borrowers, subject to the facts and governing agreements.",
        "Our advocates support clients in disputes and proceedings relating to debt recovery, secured assets, non-performing exposures, and applicable recovery and insolvency laws before appropriate forums.",
        "We work with banks, non-banking financial companies, institutional lenders, borrowers, and business stakeholders to clarify risks, evaluate available remedies, and plan compliant next steps."
      ]
    },
    "real-estate": {
      title: "Real Estate & Construction Law",
      subtitle: "Practical legal support for property transactions, development projects, construction arrangements, and land-related disputes.",
      description: "Legal support for real estate transactions, construction projects, land matters, and property disputes in Patna, Bihar.",
      paragraphs: [
        "Our real estate practice covers property ownership, transfers, development, leasing, land use, and the statutory requirements that affect real estate and construction projects.",
        "We assist with title and document review, sale and lease arrangements, development and construction contracts, due diligence, regulatory permissions, and risk allocation across project stakeholders.",
        "Where disagreements arise, we advise on negotiation, dispute prevention, and appropriate proceedings concerning possession, title, boundaries, contractual performance, and land or construction obligations.",
        "Our clients include property owners, purchasers, developers, contractors, investors, housing entities, and businesses. Advice depends on the records, applicable local laws, and project-specific circumstances."
      ]
    },
    "corporate-ma": {
      title: "Corporate/Commercial Advisory and M&A",
      subtitle: "Clear legal advice for business operations, commercial relationships, strategic transactions, and corporate change.",
      description: "Corporate and commercial legal advisory for contracts, business transactions, compliance, and mergers and acquisitions in Bihar.",
      paragraphs: [
        "We advise businesses on corporate and commercial matters throughout their lifecycle, including governance, contractual relationships, operational decisions, and legal risk management.",
        "Our work includes drafting and review of commercial agreements, transaction structuring, due diligence, negotiations, and legal support for mergers, acquisitions, investments, and reorganizations where appropriate.",
        "We help clients identify regulatory, employment, contractual, and governance considerations and coordinate legal work across the stages of a transaction or business initiative.",
        "We work with companies, founders, investors, promoters, and counterparties. The scope of each engagement is defined with the client and is subject to applicable law and transaction-specific review."
      ]
    },
    "capital-markets": {
      title: "Capital Markets",
      subtitle: "Legal assistance for capital-raising activity, securities-related obligations, disclosures, and market-facing transactions.",
      description: "Legal assistance with capital raising, securities regulation, disclosures, and capital markets matters for businesses in India.",
      paragraphs: [
        "Our capital markets practice helps clients understand the legal and regulatory requirements relevant to securities offerings, investments, and other capital-raising activity in India.",
        "We advise on transaction planning, documentation, disclosure obligations, governance considerations, and coordination with financial and regulatory advisers, as applicable to the proposed offering.",
        "Our team can assist with reviewing compliance questions, transaction terms, investor arrangements, and potential disputes connected with securities and capital markets activity.",
        "We support issuers, promoters, investors, and businesses seeking to evaluate financing options. Advice is tailored to the instrument, transaction structure, applicable regulations, and client objectives."
      ]
    },
    "dispute-resolution": {
      title: "Dispute Resolution, Litigation & Arbitration",
      subtitle: "Focused representation and dispute strategy across negotiation, court proceedings, arbitration, and other resolution processes.",
      description: "Representation and legal strategy for litigation, arbitration, commercial disputes, and alternative dispute resolution in Patna, Bihar.",
      paragraphs: [
        "Our dispute resolution practice assists clients in assessing legal claims, procedural options, evidence, potential exposure, and practical objectives before choosing a course of action.",
        "We represent clients in civil, commercial, and other proceedings before appropriate courts, tribunals, and adjudicatory forums, and advise on interim relief, pleadings, evidence, and enforcement.",
        "Where suitable, we support negotiation, mediation, conciliation, and domestic or international arbitration, including assistance with arbitration agreements, procedure, hearings, and awards.",
        "We advise individuals, businesses, institutions, and other stakeholders. Dispute strategy is developed for each matter and no particular result or timeline can be assured."
      ]
    },
    tmt: {
      title: "Technology, Media & Telecommunications (TMT)",
      subtitle: "Legal guidance on technology operations, digital content, communications, data obligations, and evolving regulatory issues.",
      description: "Legal advice on technology, media, telecommunications, digital business, data, and related regulatory matters in India.",
      paragraphs: [
        "Our TMT practice helps organizations navigate legal issues arising from technology products and services, digital platforms, media activity, and telecommunications.",
        "We advise on technology and service agreements, licensing, intellectual property considerations, online content, privacy and data obligations, and regulatory requirements relevant to a client’s operations.",
        "Our team supports contract negotiations, compliance assessments, incident response planning, and disputes involving digital services, communications, or technology-enabled business relationships.",
        "We work with technology companies, media organizations, service providers, founders, and users of digital platforms. Advice takes account of the product, data, jurisdiction, and current regulatory framework."
      ]
    },
    esg: {
      title: "Environmental, Social and Governance (ESG)",
      subtitle: "Legal support to understand environmental, social, and governance duties and integrate them into responsible business decisions.",
      description: "Legal support for environmental compliance, social responsibility, governance, and ESG-related risk management in India.",
      paragraphs: [
        "Our ESG practice helps businesses understand the legal obligations and governance expectations that may arise from environmental, social, and sustainability-related activities.",
        "We assist with environmental and regulatory compliance reviews, internal policies, governance frameworks, reporting considerations, and assessment of contractual or operational ESG commitments.",
        "Where issues arise, we advise on regulatory engagement, remediation planning, investigations, and disputes relating to environmental requirements, workplace responsibilities, and corporate governance.",
        "Our clients include companies, investors, project operators, and organizations building or reviewing ESG programs. Advice is scoped to the applicable requirements and the client’s actual operations."
      ]
    },
    infrastructure: {
      title: "Infrastructure & Energy",
      subtitle: "Legal advice for infrastructure and energy projects, from planning and contracting through operation and dispute resolution.",
      description: "Legal advice for infrastructure and energy projects, contracts, regulatory obligations, and project disputes in Bihar and India.",
      paragraphs: [
        "Our infrastructure and energy practice advises on legal issues that arise in the planning, development, financing, construction, and operation of infrastructure and energy projects.",
        "We assist with project and construction contracts, concessions, procurement, land and regulatory matters, energy supply arrangements, and allocation of responsibilities among project participants.",
        "Our team supports clients with compliance planning, contract administration, negotiation, and resolution of project delays, payment issues, performance disagreements, and other disputes.",
        "We work with developers, contractors, investors, operators, suppliers, and public or private stakeholders, tailoring advice to the project structure, sector regulations, and stage of development."
      ]
    }
  };

  const params = new URLSearchParams(window.location.search);
  const requestedTopic = params.get("topic");
  const topicKey = requestedTopic && Object.hasOwn(practiceTopics, requestedTopic)
    ? requestedTopic
    : "insolvency";
  const topic = practiceTopics[topicKey];
  const canonicalUrl = `${siteOrigin}/practice-detail.html?topic=${encodeURIComponent(topicKey)}`;

  function setMeta(selector, value) {
    const element = document.querySelector(selector);
    if (!(element instanceof HTMLMetaElement)) {
      throw new Error(`Missing metadata element: ${selector}`);
    }
    element.content = value;
  }

  function setLink(selector, value) {
    const element = document.querySelector(selector);
    if (!(element instanceof HTMLLinkElement)) {
      throw new Error(`Missing link element: ${selector}`);
    }
    element.href = value;
  }

  const title = `${topic.title} Legal Advisory | SARVEKANKSHAM Law Associates Patna`;
  document.title = title;
  setMeta('meta[name="description"]', topic.description);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', topic.description);
  setMeta('meta[property="og:url"]', canonicalUrl);
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', topic.description);
  setLink('link[rel="canonical"]', canonicalUrl);

  const heading = document.querySelector("#topic-title");
  const subtitle = document.querySelector("#topic-subtitle");
  const breadcrumb = document.querySelector("#breadcrumb-current-topic");
  const content = document.querySelector("#topic-content");
  const schema = document.querySelector("#practice-schema");
  if (
    !(heading instanceof HTMLHeadingElement)
    || !(subtitle instanceof HTMLParagraphElement)
    || !(breadcrumb instanceof HTMLElement)
    || !(content instanceof HTMLElement)
    || !(schema instanceof HTMLScriptElement)
  ) {
    throw new Error("The practice detail template is missing a required content element.");
  }

  heading.textContent = topic.title;
  subtitle.textContent = topic.subtitle;
  breadcrumb.textContent = topic.title;
  content.replaceChildren(...topic.paragraphs.map((paragraph) => {
    const element = document.createElement("p");
    element.textContent = paragraph;
    return element;
  }));
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    url: canonicalUrl,
    serviceType: `${topic.title} Legal Counsel`,
    provider: {
      "@type": "LegalService",
      name: "SARVEKANKSHAM Law Associates",
      telephone: "+91-9934021776",
      address: {
        "@type": "PostalAddress",
        streetAddress: "House No. B/22, Road No. 18, Rajeev Nagar",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        postalCode: "800024",
        addressCountry: "IN"
      }
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Bihar and Pan-India"
    }
  });

  const backButton = document.querySelector("#back-button");
  if (!(backButton instanceof HTMLAnchorElement)) {
    throw new Error("The practice detail back link is missing.");
  }
  try {
    const previousPage = new URL(document.referrer);
    if (previousPage.origin === window.location.origin) {
      backButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.history.back();
      });
    }
  } catch (error) {
    if (document.referrer) console.error("Unable to determine the previous page for the back link.", error);
  }
})();
