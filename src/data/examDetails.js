const preparationTips = [
  {
    title: "Build a realistic study plan",
    text: "Split the syllabus into weekly targets, keep one day for revision and track your progress with mock tests.",
  },
  {
    title: "Practise with previous papers",
    text: "Solve at least five years of previous question papers to understand the difficulty level and recurring topics.",
  },
  {
    title: "Take timed mock tests",
    text: "Simulate exam-day conditions, analyse every mistake and revise weak chapters before the next mock.",
  },
  {
    title: "Revise with short notes",
    text: "Keep formula sheets and one-page summaries for each subject so the final week is focused and calm.",
  },
];

const details = {
  "jee-main": {
    description: [
      "JEE Main is the national-level undergraduate entrance examination for admission to B.Tech, B.E. and B.Arch programmes at NITs, IIITs and other centrally funded technical institutions. It is conducted by the National Testing Agency (NTA) twice a year.",
      "A valid JEE Main score is also the qualifying requirement for JEE Advanced, the gateway to the Indian Institutes of Technology. Candidates can appear in both sessions and the better of the two scores is considered for the final rank.",
    ],
    mode: "Computer-based test",
    duration: "3 hours",
    frequency: "Twice a year (January and April)",
    eligibility:
      "Class 12 (or equivalent) with Physics, Chemistry and Mathematics. Candidates appearing in Class 12 can also apply provisionally.",
    ageLimit: "No upper age limit.",
    attempts: "Three consecutive years from the year of passing Class 12.",
    totalQuestions: "75",
    totalMarks: "300",
    markingScheme:
      "+4 marks for a correct answer and -1 mark for an incorrect answer. Numerical questions do not carry negative marking in some years; check the official information bulletin.",
    officialWebsite: "https://jeemain.nta.nic.in",
    counselling: "JoSAA and CSAB",
    importantDates: [
      { event: "Application starts", date: "01 Nov 2026" },
      { event: "Last date to apply", date: "30 Nov 2026" },
      { event: "Correction window", date: "04 – 10 Dec 2026" },
      { event: "Admit card release", date: "15 Jan 2027" },
      { event: "Session 1 exam", date: "21 Jan 2027" },
      { event: "Session 1 result", date: "12 Feb 2027" },
    ],
    patternSections: [
      { section: "Physics", questions: "25", marks: "100" },
      { section: "Chemistry", questions: "25", marks: "100" },
      { section: "Mathematics", questions: "25", marks: "100" },
    ],
    syllabus: [
      {
        subject: "Physics",
        topics: ["Mechanics", "Electrodynamics", "Optics", "Thermodynamics", "Modern Physics"],
      },
      {
        subject: "Chemistry",
        topics: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry", "Chemical Bonding"],
      },
      {
        subject: "Mathematics",
        topics: ["Algebra", "Calculus", "Coordinate Geometry", "Trigonometry", "Probability"],
      },
    ],
    preparation: preparationTips,
    faqs: [
      {
        q: "Can I appear for JEE Main in both sessions?",
        a: "Yes. JEE Main is conducted twice a year and candidates can appear in both sessions. The better score is used to prepare the merit list.",
      },
      {
        q: "Is JEE Main required for JEE Advanced?",
        a: "Yes. Only candidates who qualify JEE Main and fall within the top 2.5 lakh ranks (across categories) are eligible to appear for JEE Advanced.",
      },
      {
        q: "What is the marking scheme for JEE Main?",
        a: "Each correct answer awards 4 marks and each incorrect answer deducts 1 mark. The paper has 75 questions worth 300 marks in total.",
      },
      {
        q: "How many attempts are allowed?",
        a: "Candidates can appear for JEE Main in three consecutive years from the year in which they pass Class 12.",
      },
    ],
  },
  "jee-advanced": {
    description: [
      "JEE Advanced is the gateway to undergraduate programmes at the Indian Institutes of Technology (IITs). It is conducted once a year by one of the IITs on a rotational basis, and only candidates who qualify JEE Main can appear for it.",
      "The exam tests candidates at an advanced level in Physics, Chemistry and Mathematics. Admission to IITs is offered through JoSAA counselling based on the All India Rank in JEE Advanced.",
    ],
    mode: "Computer-based test",
    duration: "3 hours per paper (two papers)",
    frequency: "Once a year",
    eligibility:
      "Candidates must be in the top 2.5 lakh ranks in JEE Main and secure at least 75% aggregate in Class 12 (65% for SC/ST).",
    ageLimit: "Candidates should have been born on or after 01 October 2002 (relaxation for reserved categories).",
    attempts: "A maximum of two attempts in consecutive years.",
    totalQuestions: "54 per paper",
    totalMarks: "360 (both papers)",
    markingScheme:
      "Marking varies by section. Multiple-choice questions usually award +3 or +4 for a correct answer with partial or full negative marking for incorrect answers. Check the official paper instructions.",
    officialWebsite: "https://jeeadv.ac.in",
    counselling: "JoSAA",
    importantDates: [
      { event: "Application starts", date: "30 Apr 2027" },
      { event: "Last date to apply", date: "08 May 2027" },
      { event: "Admit card release", date: "12 May 2027" },
      { event: "Exam date", date: "18 May 2027" },
      { event: "Provisional answer key", date: "22 May 2027" },
      { event: "Result declaration", date: "10 Jun 2027" },
    ],
    patternSections: [
      { section: "Physics", questions: "18 per paper", marks: "60 per paper" },
      { section: "Chemistry", questions: "18 per paper", marks: "60 per paper" },
      { section: "Mathematics", questions: "18 per paper", marks: "60 per paper" },
    ],
    syllabus: [
      {
        subject: "Physics",
        topics: [
          "General Physics",
          "Mechanics",
          "Waves & Oscillations",
          "Thermodynamics",
          "Electrostatics",
          "Modern Physics",
        ],
      },
      {
        subject: "Chemistry",
        topics: [
          "Atomic Structure",
          "Chemical Bonding",
          "Organic Reactions",
          "Coordination Compounds",
          "Thermochemistry",
        ],
      },
      {
        subject: "Mathematics",
        topics: [
          "Algebra",
          "Matrices & Determinants",
          "Calculus",
          "Vectors & 3D Geometry",
          "Probability",
        ],
      },
    ],
    preparation: preparationTips,
    faqs: [
      {
        q: "Who is eligible for JEE Advanced?",
        a: "Candidates must qualify JEE Main and be within the top 2.5 lakh ranks. They also need at least 75% aggregate in Class 12 (65% for SC/ST).",
      },
      {
        q: "How many papers are there in JEE Advanced?",
        a: "There are two papers, Paper 1 and Paper 2, both conducted on the same day. Each paper is three hours long and covers Physics, Chemistry and Mathematics.",
      },
      {
        q: "Is JEE Advanced conducted online?",
        a: "Yes. JEE Advanced is a computer-based test conducted at designated centres across the country.",
      },
      {
        q: "What is the admission process after JEE Advanced?",
        a: "Qualified candidates participate in JoSAA counselling, fill their college and branch choices, and accept seats based on their All India Rank.",
      },
    ],
  },
  "neet-ug": {
    description: [
      "NEET UG is the single national-level entrance examination for admission to MBBS, BDS, BAMS, BHMS, BSMS and other undergraduate medical and allied health programmes in India.",
      "The exam is conducted by the National Testing Agency (NTA) in pen-and-paper mode. A valid NEET UG score is accepted by government and private medical colleges, deemed universities and AIIMS institutions.",
    ],
    mode: "Pen-and-paper test",
    duration: "3 hours 20 minutes",
    frequency: "Once a year",
    eligibility:
      "Class 12 with Physics, Chemistry, Biology/Biotechnology and English. General category candidates need at least 50% aggregate.",
    ageLimit: "Candidates must be at least 17 years old as on 31 December of the admission year.",
    attempts: "No limit on the number of attempts.",
    totalQuestions: "180",
    totalMarks: "720",
    markingScheme:
      "+4 marks for each correct answer and -1 mark for each incorrect answer. Unattempted questions receive zero marks.",
    officialWebsite: "https://neet.nta.nic.in",
    counselling: "MCC and state counselling authorities",
    importantDates: [
      { event: "Application starts", date: "10 Feb 2027" },
      { event: "Last date to apply", date: "10 Mar 2027" },
      { event: "Correction window", date: "15 – 20 Mar 2027" },
      { event: "Admit card release", date: "25 Apr 2027" },
      { event: "Exam date", date: "03 May 2027" },
      { event: "Result declaration", date: "14 Jun 2027" },
    ],
    patternSections: [
      { section: "Physics", questions: "45", marks: "180" },
      { section: "Chemistry", questions: "45", marks: "180" },
      { section: "Botany", questions: "45", marks: "180" },
      { section: "Zoology", questions: "45", marks: "180" },
    ],
    syllabus: [
      {
        subject: "Physics",
        topics: ["Mechanics", "Electrodynamics", "Optics", "Thermodynamics", "Modern Physics"],
      },
      {
        subject: "Chemistry",
        topics: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry", "Biomolecules"],
      },
      {
        subject: "Botany",
        topics: ["Plant Physiology", "Genetics", "Ecology", "Cell Biology", "Reproduction"],
      },
      {
        subject: "Zoology",
        topics: ["Human Physiology", "Animal Kingdom", "Evolution", "Biotechnology", "Health & Disease"],
      },
    ],
    preparation: preparationTips,
    faqs: [
      {
        q: "Is NEET UG enough for AIIMS and JIPMER admissions?",
        a: "Yes. AIIMS and JIPMER have merged their entrance tests with NEET UG, and admission is based on the NEET UG rank.",
      },
      {
        q: "What is the minimum percentage required in Class 12?",
        a: "General category candidates need 50% aggregate in Physics, Chemistry, Biology/Biotechnology and English. Reserved category candidates need 40%.",
      },
      {
        q: "Is there negative marking in NEET UG?",
        a: "Yes. Each incorrect answer deducts 1 mark, while a correct answer awards 4 marks.",
      },
      {
        q: "How many questions are asked in NEET UG?",
        a: "The paper has 180 questions across Physics, Chemistry, Botany and Zoology, carrying 720 marks in total.",
      },
    ],
  },
  cat: {
    description: [
      "The Common Admission Test (CAT) is the national-level entrance examination for admission to MBA and other postgraduate management programmes at the Indian Institutes of Management (IIMs) and a large number of other business schools.",
      "CAT is conducted once a year by the IIMs on a rotational basis. The exam assesses quantitative ability, data interpretation, logical reasoning, verbal ability and reading comprehension.",
    ],
    mode: "Computer-based test",
    duration: "2 hours",
    frequency: "Once a year",
    eligibility:
      "A bachelor's degree with at least 50% aggregate (45% for SC/ST/PwD). Candidates in their final year of graduation can also apply.",
    ageLimit: "No upper age limit.",
    attempts: "No limit on the number of attempts.",
    totalQuestions: "68",
    totalMarks: "204",
    markingScheme:
      "+3 marks for each correct answer and -1 mark for each incorrect answer. Type-in-the-answer (TITA) questions do not carry negative marking.",
    officialWebsite: "https://iimcat.ac.in",
    counselling: "Individual IIMs and participating B-schools",
    importantDates: [
      { event: "Application starts", date: "01 Aug 2027" },
      { event: "Last date to apply", date: "20 Sep 2027" },
      { event: "Admit card release", date: "05 Nov 2027" },
      { event: "Exam date", date: "28 Nov 2027" },
      { event: "Answer key release", date: "05 Dec 2027" },
      { event: "Result declaration", date: "Jan 2028" },
    ],
    patternSections: [
      { section: "Verbal Ability & Reading Comprehension", questions: "24", marks: "72" },
      { section: "Data Interpretation & Logical Reasoning", questions: "22", marks: "66" },
      { section: "Quantitative Ability", questions: "22", marks: "66" },
    ],
    syllabus: [
      {
        subject: "Verbal Ability & Reading Comprehension",
        topics: ["Reading Comprehension", "Para Summary", "Para Jumbles", "Odd Sentence Out"],
      },
      {
        subject: "Data Interpretation & Logical Reasoning",
        topics: ["Tables & Charts", "Puzzles", "Seating Arrangement", "Blood Relations", "Series"],
      },
      {
        subject: "Quantitative Ability",
        topics: ["Arithmetic", "Algebra", "Geometry", "Number System", "Mensuration"],
      },
    ],
    preparation: preparationTips,
    faqs: [
      {
        q: "Is work experience required for CAT?",
        a: "No. Work experience is not mandatory to appear for CAT, though some B-schools give weightage to relevant experience during the selection process.",
      },
      {
        q: "Can final-year students appear for CAT?",
        a: "Yes. Candidates in their final year of a bachelor's degree can apply, provided they complete the degree before the admission deadline.",
      },
      {
        q: "What is a good CAT percentile?",
        a: "A percentile above 90 is considered competitive for many top B-schools, while the older IIMs typically require a percentile above 98.",
      },
      {
        q: "Does CAT have sectional time limits?",
        a: "Yes. CAT has sectional time limits, and candidates must manage the two-hour duration across the three sections.",
      },
    ],
  },
  clat: {
    description: [
      "The Common Law Admission Test (CLAT) is the national-level entrance examination for admission to undergraduate and postgraduate law programmes at the National Law Universities (NLUs) and other participating institutions.",
      "CLAT is conducted by the Consortium of NLUs. The undergraduate paper tests aptitude for legal studies through comprehension-based questions on English, current affairs, legal reasoning, logical reasoning and quantitative techniques.",
    ],
    mode: "Pen-and-paper test",
    duration: "2 hours",
    frequency: "Once a year",
    eligibility:
      "Class 12 with at least 45% aggregate (40% for SC/ST). Candidates appearing in Class 12 can apply provisionally.",
    ageLimit: "No upper age limit.",
    attempts: "No limit on the number of attempts.",
    totalQuestions: "120",
    totalMarks: "120",
    markingScheme:
      "+1 mark for each correct answer and -0.25 marks for each incorrect answer. Unattempted questions receive zero marks.",
    officialWebsite: "https://consortiumofnlus.ac.in",
    counselling: "Consortium of NLUs centralised counselling",
    importantDates: [
      { event: "Application starts", date: "15 Jul 2026" },
      { event: "Last date to apply", date: "10 Oct 2026" },
      { event: "Admit card release", date: "20 Nov 2026" },
      { event: "Exam date", date: "06 Dec 2026" },
      { event: "Provisional answer key", date: "09 Dec 2026" },
      { event: "Result declaration", date: "20 Dec 2026" },
    ],
    patternSections: [
      { section: "English Language", questions: "24", marks: "24" },
      { section: "Current Affairs & General Knowledge", questions: "28", marks: "28" },
      { section: "Legal Reasoning", questions: "28", marks: "28" },
      { section: "Logical Reasoning", questions: "24", marks: "24" },
      { section: "Quantitative Techniques", questions: "16", marks: "16" },
    ],
    syllabus: [
      {
        subject: "English Language",
        topics: ["Reading Comprehension", "Vocabulary", "Grammar", "Inference"],
      },
      {
        subject: "Current Affairs & GK",
        topics: ["National Affairs", "International Affairs", "Legal News", "Awards & Sports"],
      },
      {
        subject: "Legal Reasoning",
        topics: ["Legal Principles", "Torts", "Contracts", "Criminal Law", "Constitutional Law"],
      },
      {
        subject: "Logical Reasoning",
        topics: ["Analogies", "Syllogisms", "Series", "Blood Relations", "Statements & Conclusions"],
      },
      {
        subject: "Quantitative Techniques",
        topics: ["Arithmetic", "Ratios", "Percentages", "Data Interpretation"],
      },
    ],
    preparation: preparationTips,
    faqs: [
      {
        q: "Which law programmes can I apply to through CLAT?",
        a: "CLAT UG is used for admission to integrated five-year LLB programmes such as BA LLB, BBA LLB and B.Com LLB at participating NLUs.",
      },
      {
        q: "What is the minimum percentage required in Class 12?",
        a: "General category candidates need 45% aggregate, while SC/ST candidates need 40%. Candidates appearing in Class 12 can apply provisionally.",
      },
      {
        q: "Is CLAT conducted online?",
        a: "No. CLAT is conducted in pen-and-paper mode at designated test centres across the country.",
      },
      {
        q: "How many NLUs accept CLAT scores?",
        a: "Around 20 National Law Universities participate in CLAT counselling each year, along with a number of other private law schools.",
      },
    ],
  },
};

const fallbackDetail = (exam) => ({
  description: [
    `${exam.fullName} is conducted by ${exam.conductingBody} for admission to ${exam.level.toLowerCase()} programmes in the ${exam.category.toLowerCase()} stream.`,
    "Candidates should check the official information bulletin for the latest eligibility, exam pattern and important dates before applying.",
  ],
  mode: "As notified by the conducting body",
  duration: "Check official website",
  frequency: "Once a year",
  eligibility: "Check the official information bulletin for the latest eligibility criteria.",
  ageLimit: "As notified by the conducting body.",
  attempts: "As notified by the conducting body.",
  totalQuestions: "—",
  totalMarks: "—",
  markingScheme: "Refer to the official information bulletin for the marking scheme.",
  officialWebsite: "",
  counselling: "As notified by the conducting body",
  importantDates: [
    { event: "Application starts", date: exam.applyStart },
    { event: "Last date to apply", date: exam.applyEnd },
    { event: "Exam date", date: exam.examDate },
  ],
  patternSections: [],
  syllabus: [],
  preparation: preparationTips,
  faqs: [
    {
      q: `Who conducts ${exam.name}?`,
      a: `${exam.name} is conducted by ${exam.conductingBody}.`,
    },
    {
      q: `What is the application fee for ${exam.name}?`,
      a: `The application fee is ${exam.applicationFee}. Check the official website for category-wise and late-fee details.`,
    },
  ],
});

export const getExamDetail = (exam) => ({
  ...fallbackDetail(exam),
  ...(details[exam.slug] || {}),
});
