const images = {
  campus1:
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=70",
  campus2:
    "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=70",
  campus3:
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=70",
  campus4:
    "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=800&q=70",
  campus5:
    "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=70",
  campus6:
    "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=800&q=70",
  campus7:
    "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=70",
  library:
    "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=70",
  auditorium:
    "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=70",
  event:
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=70",
};

const sharedFacilities = [
  { name: "Central library", icon: "library" },
  { name: "Hostels", icon: "hostel" },
  { name: "Sports complex", icon: "sports" },
  { name: "Modern laboratories", icon: "lab" },
  { name: "Cafeteria", icon: "cafeteria" },
  { name: "Medical centre", icon: "medical" },
  { name: "Wi-Fi campus", icon: "wifi" },
  { name: "Auditorium", icon: "auditorium" },
];

const sharedScholarships = [
  {
    name: "Merit-cum-Means Scholarship",
    amount: "Tuition waiver + monthly stipend",
    eligibility:
      "Economically weaker students in the top 25% of their batch, with family income below the prescribed limit.",
  },
  {
    name: "SC/ST Post-Matric Scholarship",
    amount: "Government-funded tuition support",
    eligibility:
      "Students belonging to SC/ST categories as per Government of India norms.",
  },
  {
    name: "Institute Merit Scholarship",
    amount: "Up to 50% tuition waiver",
    eligibility:
      "Awarded to the top-ranked students in each semester based on academic performance.",
  },
];

const sharedOtherCourses = [
  "B.E. / B.Tech",
  "M.E. / M.Tech",
  "B.Sc.",
  "BBA",
  "M.Sc.",
  "Certificate",
  "DMLT",
  "Executive MBA/PGDM",
  "PG Diploma",
  "Ph.D.",
];

const sharedOnlineCourses = [
  {
    id: "online1",
    title: "eMasters in Quantitative Markets and Risk Management",
    provider: "IIT Kanpur",
    degree: "Degree",
    fees: "₹8 L",
    duration: "2 years",
  },
  {
    id: "online2",
    title: "eMasters in Financial Technology and Management",
    provider: "IIT Kanpur",
    degree: "Degree",
    fees: "₹8 L",
    duration: "2 years",
  },
];

const recommendedColleges = [
  {
    id: "r1",
    name: "The ICFAI University, Jharkhand",
    location: "Ranchi",
    ranking: "",
    courses: "2 courses",
    rating: 4.1,
    fees: "₹2.00 L",
    image: images.campus1,
  },
  {
    id: "r2",
    name: "Amity University, Ranchi",
    location: "Ranchi",
    ranking: "#129 Business Today",
    courses: "8 courses",
    rating: 3.9,
    fees: "₹2.64 L",
    image: images.campus2,
  },
  {
    id: "r3",
    name: "Nalanda University",
    location: "Nalanda",
    ranking: "",
    courses: "1 course",
    rating: null,
    fees: "₹2.00 L",
    image: images.campus3,
  },
  {
    id: "r4",
    name: "Indian Institute of Tourism and Travel Management",
    location: "Gwalior",
    ranking: "",
    courses: "1 course",
    rating: 4.3,
    fees: "₹3.72 L",
    image: images.campus4,
  },
  {
    id: "r5",
    name: "Chitkara University Institute of Engineering and Technology",
    location: "Chandigarh",
    ranking: "",
    courses: "12 courses",
    rating: 4.4,
    fees: "₹4.80 L",
    image: images.campus5,
  },
  {
    id: "r6",
    name: "University of Jammu",
    location: "Jammu",
    ranking: "",
    courses: "8 courses",
    rating: 4.1,
    fees: "₹78.07 K",
    image: images.campus6,
  },
  {
    id: "r7",
    name: "Jawaharlal Nehru University",
    location: "Delhi",
    ranking: "",
    courses: "1 course",
    rating: null,
    fees: "₹12.00 L",
    image: images.campus7,
  },
  {
    id: "r8",
    name: "IIIT Allahabad - Indian Institute of Information Technology",
    location: "Allahabad",
    ranking: "",
    courses: "2 courses",
    rating: 4.3,
    fees: "₹3.68 L",
    image: images.library,
  },
  {
    id: "r9",
    name: "NIT Agartala - National Institute of Technology",
    location: "Agartala",
    ranking: "",
    courses: "1 course",
    rating: 4.4,
    fees: "₹100.00 K",
    image: images.auditorium,
  },
  {
    id: "r10",
    name: "North Eastern Regional Institute of Science and Technology",
    location: "Itanagar",
    ranking: "",
    courses: "1 course",
    rating: null,
    fees: "₹85.84 K",
    image: images.event,
  },
];

const trendingColleges = [
  {
    id: "t1",
    name: "The ICFAI University, Jharkhand",
    location: "Ranchi",
    ranking: "",
    courses: "2 courses",
    rating: 4.1,
    fees: "₹2.00 L",
    image: images.campus1,
  },
  {
    id: "t2",
    name: "Amity University, Ranchi",
    location: "Ranchi",
    ranking: "#129 Business Today",
    courses: "8 courses",
    rating: 3.9,
    fees: "₹2.64 L",
    image: images.campus2,
  },
  {
    id: "t3",
    name: "Sri Sri University",
    location: "Bhubaneswar",
    ranking: "#92 Times",
    courses: "5 courses",
    rating: 4.1,
    fees: "₹6.60 L",
    image: images.campus3,
  },
  {
    id: "t4",
    name: "UEM Kolkata - University of Engineering and Management",
    location: "Kolkata",
    ranking: "#131 Business Today",
    courses: "4 courses",
    rating: 4.8,
    fees: "₹2.40 L",
    image: images.campus4,
  },
  {
    id: "t5",
    name: "Adamas University",
    location: "Kolkata",
    ranking: "",
    courses: "3 courses",
    rating: 4.9,
    fees: "₹8.12 L",
    image: images.campus5,
  },
  {
    id: "t6",
    name: "Birla Global University",
    location: "Bhubaneswar",
    ranking: "",
    courses: "4 courses",
    rating: 4.2,
    fees: "₹8.00 L",
    image: images.campus6,
  },
  {
    id: "t7",
    name: "Chandigarh University (CU)",
    location: "Chandigarh",
    ranking: "#32 NIRF",
    courses: "25 courses",
    rating: 4.3,
    fees: "₹5.12 L",
    image: images.campus7,
  },
  {
    id: "t8",
    name: "LPU - Lovely Professional University",
    location: "Jalandhar",
    ranking: "#44 NIRF",
    courses: "18 courses",
    rating: 4.4,
    fees: "₹5.60 L",
    image: images.library,
  },
  {
    id: "t9",
    name: "Amity University, Noida",
    location: "Noida",
    ranking: "#49 NIRF",
    courses: "42 courses",
    rating: 4.0,
    fees: "₹6.40 L",
    image: images.auditorium,
  },
  {
    id: "t10",
    name: "Jain Deemed-to-be University, Bangalore",
    location: "Bangalore",
    ranking: "#73 NIRF",
    courses: "91 courses",
    rating: 4.2,
    fees: "₹12.05 L",
    image: images.event,
  },
];

const iitPatnaProgrammes = [
  {
    id: "ip1",
    title: "B.Tech. in Mechanical Engineering + MBA (IIM Mumbai)",
    duration: "5 years",
    seats: 15,
    exams: ["JEE Main", "JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: null,
    specialization: "Mechanical Engineering",
    stream: "Engineering",
  },
  {
    id: "ip2",
    title: "B.S. in Economics + MBA (IIM Bodh Gaya)",
    duration: "5 years",
    seats: 6,
    exams: ["JEE Main", "JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: null,
    rating: null,
    specialization: "Economics",
    stream: "Management",
  },
  {
    id: "ip3",
    title:
      "B.Tech. in Computer Science and Engineering + MBA in Digital Business Management (IIM Bodh Gaya)",
    duration: "5 years",
    seats: 5,
    exams: ["JEE Main", "JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: null,
    specialization: "Computer Science",
    stream: "Engineering",
  },
  {
    id: "ip4",
    title:
      "B.Tech. in Artificial Intelligence and Data Science + MBA in Digital Business Management (IIM Bodh Gaya)",
    duration: "5 years",
    seats: 5,
    exams: ["JEE Main", "JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: null,
    specialization: "Artificial Intelligence",
    stream: "Engineering",
  },
  {
    id: "ip5",
    title:
      "B.Tech. in Electrical and Electronics Engineering + MBA (IIM Bodh Gaya)",
    duration: "5 years",
    seats: 6,
    exams: ["JEE Main", "JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: null,
    specialization: "Electrical Engineering",
    stream: "Engineering",
  },
  {
    id: "ip6",
    title:
      "B.Tech. in Mathematics and Computing + MBA in Digital Business Management (IIM Bodh Gaya)",
    duration: "5 years",
    seats: 5,
    exams: ["JEE Main", "JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: null,
    specialization: "Mathematics & Computing",
    stream: "Engineering",
  },
  {
    id: "ip7",
    title: "Integrated B.Tech. in ME + MBA (NITIE)",
    duration: "5 years",
    seats: 15,
    exams: ["JEE Advanced", "JEE Main"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: null,
    specialization: "Mechanical Engineering",
    stream: "Engineering",
  },
  {
    id: "ip8",
    title:
      "B.Tech. in Electronics and Communication Engineering + MBA in Hospital and Healthcare Management (IIM Bodh Gaya)",
    duration: "5 years",
    seats: 5,
    exams: ["JEE Main", "JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: null,
    specialization: "Electronics & Communication",
    stream: "Engineering",
  },
  {
    id: "ip9",
    title: "B.Tech. in Engineering Physics + MBA (IIM Bodh Gaya)",
    duration: "5 years",
    seats: 6,
    exams: ["JEE Main", "JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: null,
    specialization: "Engineering Physics",
    stream: "Engineering",
  },
  {
    id: "ip10",
    title: "B.Tech. in Civil Engineering + MBA (IIM Bodh Gaya)",
    duration: "5 years",
    seats: 6,
    exams: ["JEE Main", "JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: null,
    specialization: "Civil Engineering",
    stream: "Engineering",
  },
  {
    id: "ip11",
    title:
      "B.Tech. in Chemical Engineering + MBA in Hospital and Health Care Management (IIM Bodh Gaya)",
    duration: "5 years",
    seats: 5,
    exams: ["JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: null,
    specialization: "Chemical Engineering",
    stream: "Engineering",
  },
  {
    id: "ip12",
    title:
      "B.Tech. in Chemical Science and Technology + MBA in Hospital and Health Care Management (IIM Bodh Gaya)",
    duration: "5 years",
    seats: 5,
    exams: ["JEE Main", "JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: 5,
    specialization: "Chemical Science",
    stream: "Engineering",
  },
  {
    id: "ip13",
    title:
      "B.Tech. in Metallurgical and Materials Engineering + MBA (IIM Bodh Gaya)",
    duration: "5 years",
    seats: 6,
    exams: ["JEE Main", "JEE Advanced"],
    medianSalary: "– / –",
    totalFees: "₹10 L",
    feeInLakh: 10,
    nirfRank: 19,
    rating: null,
    specialization: "Metallurgical Engineering",
    stream: "Engineering",
  },
];

const iitPatnaDetail = {
  pageTitle: "IIT Patna MBA/PGDM Courses & Fees",
  courseGroup: "MBA/PGDM",
  year: "2026",
  primaryExam: "JEE Advanced",
  description: [
    "IIT Patna - Indian Institute of Technology offers an executive MBA programme. Candidates must have a valid score from any aptitude test (CAT / MAT / CMAT / XAT / GMAT) for admission to the Executive MBA programme. Candidates are also required to fulfil the eligibility criteria. Candidates without an aptitude test score need to appear for and clear the Executive Aptitude Test conducted by Manipal University Jaipur as per the admission norms of the MBA programme.",
    "The institute also offers five-year integrated B.Tech + MBA programmes in partnership with IIM Bodh Gaya, IIM Mumbai and NITIE. These programmes combine a strong engineering foundation with management education and are open to candidates with a valid JEE Main or JEE Advanced score.",
  ],
  eligibility:
    "Bachelor's degree with 50% aggregate (45% for reserved category).",
  totalTuition: "₹10 L",
  acceptedExams: ["JEE Advanced", "JEE Main", "CAT"],
  scoreRequirement: "10+2 score: 75%",
  highlightFaqs: [
    {
      q: "What is the average package offered during IIT Patna placements?",
      a: "The average package for the B.Tech class of 2026 was ₹23.20 LPA, while the M.Tech average package stood at ₹14.54 LPA. The highest package recorded in 2025 was ₹1.50 crore per annum.",
    },
    {
      q: "What is the fee for various courses offered at IIT Patna?",
      a: "The total tuition fee for the integrated MBA/PGDM programmes is ₹10 lakh. Hostel and mess charges are additional and are payable every semester. Fee waivers are available for eligible categories.",
    },
    {
      q: "What courses are available to IIT Patna students?",
      a: "IIT Patna offers B.Tech, M.Tech, integrated B.Tech + MBA, M.Sc., and Ph.D. programmes across engineering, sciences, humanities and management.",
    },
    {
      q: "How can I get admission in IIT Patna?",
      a: "Admission to the integrated programmes is through JEE Main and JEE Advanced, followed by JoSAA counselling. The Executive MBA accepts CAT / MAT / CMAT / XAT / GMAT scores, or the institute's own aptitude test.",
    },
  ],
  programmes: iitPatnaProgrammes,
  seatsTotal: 90,
  fees: [
    { label: "Total tuition fee (MBA/PGDM)", value: "₹10,00,000" },
    { label: "Hostel & mess (per year, indicative)", value: "₹1,20,000" },
    { label: "One-time admission fee", value: "₹10,000" },
    { label: "Refundable caution deposit", value: "₹15,000" },
  ],
  admissionSteps: [
    {
      title: "Check eligibility",
      text: "Confirm the minimum marks, subject requirements and age criteria for your chosen programme.",
    },
    {
      title: "Appear for the entrance exam",
      text: "Register for JEE Main or JEE Advanced and secure a valid rank. Executive MBA applicants can use CAT / MAT / CMAT / XAT / GMAT scores.",
    },
    {
      title: "Attend counselling",
      text: "Participate in JoSAA counselling, fill your choices and accept the seat allotted to you.",
    },
    {
      title: "Verify documents & pay fees",
      text: "Complete document verification at the institute and pay the admission fee to confirm your seat.",
    },
  ],
  examInfo: {
    name: "JEE Advanced",
    date: "18 May 2027",
    applicationWindow: "30 Apr – 08 May 2027",
    mode: "Computer-based test",
    description:
      "JEE Advanced is the gateway to the IITs. It is conducted once a year for candidates who qualify JEE Main and are in the top percentile of their category.",
  },
  placements: {
    stats: [
      { label: "BTech placement rate (2026)", value: "95.54%" },
      { label: "BTech average package (2026)", value: "₹23.20 LPA" },
      { label: "MTech average package (2026)", value: "₹14.54 LPA" },
      { label: "Highest package (2025)", value: "₹1.50 Cr" },
    ],
    recruiters: [
      "Google",
      "Microsoft",
      "Samsung",
      "L&T",
      "Goldman Sachs",
      "Amazon",
      "Deloitte",
      "Tata Motors",
    ],
  },
  cutoffs: {
    title: "JEE Advanced closing ranks — All India",
    columns: ["Category", "2025", "2024", "2023"],
    rows: [
      ["OPEN", "2,500", "2,750", "2,900"],
      ["EWS", "3,000", "3,200", "3,350"],
      ["OBC-NCL", "3,500", "3,700", "3,900"],
      ["SC", "6,000", "6,300", "6,600"],
      ["ST", "8,000", "8,400", "8,700"],
    ],
  },
  rankings: [
    { agency: "NIRF", category: "Engineering", rank: "#41", year: "2025" },
    { agency: "NIRF", category: "Overall", rank: "#57", year: "2025" },
    { agency: "NIRF", category: "Management", rank: "#19", year: "2025" },
    { agency: "QS Asia", category: "University rankings", rank: "#301-350", year: "2026" },
  ],
  reviews: [
    {
      name: "Aditya Verma",
      rating: 5,
      title: "Strong academics and placements",
      text: "The integrated programme gives a solid engineering base along with management exposure. Faculty are approachable and the placement cell is very active.",
      date: "12 Oct 2026",
    },
    {
      name: "Sneha Raj",
      rating: 4,
      title: "Great campus, improving infrastructure",
      text: "The new academic building and library are excellent. Hostel facilities are good, though the campus is still expanding. Overall a very positive experience.",
      date: "28 Sep 2026",
    },
    {
      name: "Karan Singh",
      rating: 4,
      title: "Good research opportunities",
      text: "There are plenty of research projects and industry collaborations if you seek them out. The curriculum is rigorous, so time management is essential.",
      date: "05 Sep 2026",
    },
  ],
  gallery: [images.campus7, images.library, images.auditorium, images.event],
  facilities: sharedFacilities,
  faculty: [
    {
      name: "Prof. Jimson Mathew",
      designation: "Professor",
      department: "Computer Science & Engineering",
    },
    {
      name: "Prof. Somanath Tripathy",
      designation: "Professor",
      department: "Computer Science & Engineering",
    },
    {
      name: "Prof. Rajiv Misra",
      designation: "Professor",
      department: "Computer Science & Engineering",
    },
    {
      name: "Ms. Sheetal Maheshwari",
      designation: "Industry Faculty",
      department: "KPMG Global Services",
    },
  ],
  scholarships: sharedScholarships,
  recommended: recommendedColleges,
  trending: trendingColleges,
  onlineCourses: sharedOnlineCourses,
  comparison: [
    {
      name: "IIT Patna",
      medianSalary: "– / –",
      fees: "₹10 L",
      ranking: "– / –",
    },
    {
      name: "Nalanda University",
      medianSalary: "– / –",
      fees: "₹2 L",
      ranking: "– / –",
    },
    {
      name: "Indian Institute of Tourism and Travel Management",
      medianSalary: "– / –",
      fees: "₹3.72 L",
      ranking: "– / –",
    },
    {
      name: "University of Jammu",
      medianSalary: "₹7 LPA",
      fees: "– / –",
      ranking: "– / –",
    },
    {
      name: "JNU Delhi",
      medianSalary: "₹9.5 LPA",
      fees: "₹12 L",
      ranking: "– / –",
    },
  ],
  otherCourses: sharedOtherCourses,
  forum: [
    {
      id: "f1",
      question: "What is the placement rate at IIT Patna?",
      author: "Yash Mittal",
      level: "Contributor-Level 10",
      time: "Answered 5 days ago",
      answer:
        "The placement percentage for the IIT Patna B.Tech batch stood at 95.54% in 2026, while the M.Tech placement percentage during the 2026 season was 80.35%.",
    },
    {
      id: "f2",
      question: "How are the overall placements at IIT Patna?",
      author: "Yash Mittal",
      level: "Contributor-Level 10",
      time: "Answered 5 days ago",
      answer:
        "IIT Patna placements 2026 have concluded. The B.Tech average package was ₹23.20 LPA and the M.Tech average package was ₹14.54 LPA. Google, Samsung, L&T, Microsoft and Goldman Sachs participated in the drive.",
    },
    {
      id: "f3",
      question: "What is the salary trend witnessed during IIT Patna placements?",
      author: "Yash Mittal",
      level: "Contributor-Level 10",
      time: "Answered 5 days ago",
      answer:
        "The average package for the B.Tech class of 2026 stood at ₹23.20 LPA. The institute recorded a highest salary of ₹150 LPA in 2025.",
    },
    {
      id: "f4",
      question: "How is the IIT Patna faculty?",
      author: "Yash Mittal",
      level: "Contributor-Level 10",
      time: "Answered 5 days ago",
      answer:
        "IIT Patna has faculty who are master's degree and PhD holders, with 101 teaching faculty across departments. Industry experts also teach select courses.",
    },
    {
      id: "f5",
      question: "What are the facilities offered by IIT Patna?",
      author: "Yash Mittal",
      level: "Contributor-Level 10",
      time: "Answered 2 weeks ago",
      answer:
        "IIT Patna is spread across 501 acres and features modern, sustainable infrastructure, including advanced laboratories, a central library, residential spaces, a medical centre and student activity centres.",
    },
  ],
  author: "Yash Mittal",
  updated: "21 Dec 2026",
};

const durationFor = (course) => {
  if (course.includes("MBBS")) return "5.5 years";
  if (course.includes("LL.B")) return "5 years";
  if (course.includes("B.Tech")) return "4 years";
  if (course.includes("MBA") || course.includes("M.Tech")) return "2 years";
  if (course.includes("B.Ed")) return "2 years";
  return "3 years";
};

const feeInLakh = (fee) => {
  const digits = Number(String(fee).replace(/[^\d]/g, ""));
  return digits / 100000;
};

const buildFallbackDetail = (college) => {
  const programmes = college.courses.map((course, index) => ({
    id: `${college.id}-p${index + 1}`,
    title: course,
    duration: durationFor(course),
    seats: [60, 40, 30, 20, 15][index % 5],
    exams: college.examsAccepted,
    medianSalary: "– / –",
    totalFees: college.fees,
    feeInLakh: feeInLakh(college.fees),
    nirfRank: college.nirfRank,
    rating: null,
    specialization: course,
    stream: "Engineering",
  }));

  const seatsTotal = programmes.reduce((sum, item) => sum + item.seats, 0);
  const primaryExam = college.examsAccepted[0] || "Entrance exam";

  return {
    pageTitle: `${college.shortName} Courses & Fees`,
    courseGroup: "Courses",
    year: "2026",
    primaryExam,
    description: [
      college.description,
      `${college.shortName} offers a range of undergraduate and postgraduate programmes with a focus on academic rigour, research and industry exposure. Students have access to modern laboratories, a central library, hostels and an active placement cell.`,
    ],
    eligibility:
      "10+2 with relevant subjects for undergraduate courses; a bachelor's degree for postgraduate programmes. A valid entrance exam score is required where applicable.",
    totalTuition: college.fees,
    acceptedExams: college.examsAccepted,
    scoreRequirement: "Check the official institute website for the latest eligibility.",
    highlightFaqs: [
      {
        q: `What is the average package offered during ${college.shortName} placements?`,
        a: "Placement outcomes vary by programme and year. The institute's placement cell publishes the latest average and highest package data on its official website.",
      },
      {
        q: `What is the fee for various courses offered at ${college.shortName}?`,
        a: `The indicative fee for the listed programmes starts at ${college.fees}. Hostel and other charges may be additional.`,
      },
      {
        q: `How can I get admission in ${college.shortName}?`,
        a: `Admission is based on the accepted entrance exams (${college.examsAccepted.join(
          ", "
        )}) followed by the institute's counselling and document verification process.`,
      },
    ],
    programmes,
    seatsTotal,
    fees: [
      { label: "Total tuition fee (indicative)", value: college.fees },
      { label: "Hostel & mess (per year, indicative)", value: "₹1,20,000" },
      { label: "One-time admission fee", value: "₹10,000" },
      { label: "Refundable caution deposit", value: "₹15,000" },
    ],
    admissionSteps: [
      {
        title: "Check eligibility",
        text: "Review the minimum marks, subject requirements and age criteria for your chosen programme.",
      },
      {
        title: "Appear for the entrance exam",
        text: `Register for ${primaryExam} and secure a valid score or rank.`,
      },
      {
        title: "Attend counselling",
        text: "Participate in the counselling round, fill your choices and accept the seat allotted to you.",
      },
      {
        title: "Verify documents & pay fees",
        text: "Complete document verification at the institute and pay the admission fee to confirm your seat.",
      },
    ],
    examInfo: {
      name: primaryExam,
      date: "Check official website",
      applicationWindow: "Check official website",
      mode: "As notified by the conducting body",
      description: `${primaryExam} is required for admission to the relevant programmes at ${college.shortName}. Verify the latest dates and eligibility on the official exam website.`,
    },
    placements: {
      stats: [
        { label: "Placement rate", value: "92%" },
        { label: "Average package", value: "₹8.50 LPA" },
        { label: "Highest package", value: "₹45 LPA" },
        { label: "Recruiters on campus", value: "120+" },
      ],
      recruiters: [
        "Infosys",
        "TCS",
        "Wipro",
        "Deloitte",
        "Amazon",
        "Accenture",
        "HDFC Bank",
        "Reliance",
      ],
    },
    cutoffs: {
      title: `${primaryExam} closing ranks (indicative)`,
      columns: ["Category", "2025", "2024", "2023"],
      rows: [
        ["OPEN", "1,500", "1,650", "1,800"],
        ["EWS", "2,000", "2,200", "2,400"],
        ["OBC-NCL", "2,500", "2,700", "2,900"],
        ["SC", "4,500", "4,800", "5,100"],
        ["ST", "6,000", "6,400", "6,800"],
      ],
    },
    rankings: [
      {
        agency: "NIRF",
        category: "Overall",
        rank: `#${college.nirfRank}`,
        year: "2025",
      },
      {
        agency: "NIRF",
        category: "Engineering",
        rank: `#${college.nirfRank}`,
        year: "2025",
      },
      {
        agency: "Outlook",
        category: "Top institutes",
        rank: "Top 50",
        year: "2025",
      },
    ],
    reviews: [
      {
        name: "Ananya Sharma",
        rating: 5,
        title: "Excellent faculty and campus life",
        text: `The teaching quality at ${college.shortName} is excellent and the campus has a vibrant student community. Placements are well organised.`,
        date: "10 Oct 2026",
      },
      {
        name: "Rohit Kumar",
        rating: 4,
        title: "Good infrastructure and opportunities",
        text: "The library, laboratories and sports facilities are well maintained. There is scope to improve hostel amenities, but overall it is a good experience.",
        date: "24 Sep 2026",
      },
      {
        name: "Meera Iyer",
        rating: 4,
        title: "Supportive placement cell",
        text: "The placement cell keeps students informed and prepares them well for interviews. Several reputed companies visit the campus each year.",
        date: "02 Sep 2026",
      },
    ],
    gallery: [college.image, images.library, images.auditorium, images.event],
    facilities: sharedFacilities,
    faculty: [
      {
        name: "Prof. A. K. Sharma",
        designation: "Professor",
        department: "Engineering",
      },
      {
        name: "Dr. Meera Iyer",
        designation: "Associate Professor",
        department: "Sciences & Humanities",
      },
      {
        name: "Dr. R. N. Singh",
        designation: "Professor",
        department: "Management Studies",
      },
    ],
    scholarships: sharedScholarships,
    recommended: recommendedColleges,
    trending: trendingColleges,
    onlineCourses: [],
    comparison: [
      {
        name: college.shortName,
        medianSalary: "– / –",
        fees: college.fees,
        ranking: `#${college.nirfRank}`,
      },
      ...recommendedColleges.slice(0, 4).map((item) => ({
        name: item.name,
        medianSalary: "– / –",
        fees: item.fees,
        ranking: item.ranking || "– / –",
      })),
    ],
    otherCourses: sharedOtherCourses,
    forum: [
      {
        id: "gf1",
        question: `What is the placement rate at ${college.shortName}?`,
        author: "Yash Mittal",
        level: "Contributor-Level 10",
        time: "Answered 5 days ago",
        answer:
          "The placement rate varies by programme. Most students from eligible programmes receive offers through the campus placement cell each year.",
      },
      {
        id: "gf2",
        question: `What are the facilities offered by ${college.shortName}?`,
        author: "Nishtha Shukla",
        level: "Guide-Level 15",
        time: "Answered 2 weeks ago",
        answer:
          "The campus includes a central library, laboratories, hostels, sports facilities, a cafeteria and a medical centre. Facilities may vary by department.",
      },
      {
        id: "gf3",
        question: `What documents are required for admission at ${college.shortName}?`,
        author: "Nishtha Shukla",
        level: "Guide-Level 15",
        time: "Answered 2 months ago",
        answer:
          "Common documents include Class 10 and Class 12 mark sheets, entrance exam scorecard, category certificate (if applicable), ID proof, photographs and migration certificate.",
      },
    ],
    author: "Shiksha Editorial Team",
    updated: "20 Oct 2026",
  };
};

export const getCollegeDetail = (college) =>
  college.id === "col7" ? iitPatnaDetail : buildFallbackDetail(college);
