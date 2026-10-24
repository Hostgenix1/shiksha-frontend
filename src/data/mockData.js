export const categories = [
  { id: "1", name: "Engineering", icon: "engineering", courseCount: 1240 },
  { id: "2", name: "Medical", icon: "medical", courseCount: 890 },
  { id: "3", name: "Management", icon: "management", courseCount: 1560 },
  { id: "4", name: "Law", icon: "law", courseCount: 430 },
  { id: "5", name: "Arts & Humanities", icon: "arts", courseCount: 720 },
  { id: "6", name: "Science", icon: "science", courseCount: 980 },
  { id: "7", name: "Commerce", icon: "commerce", courseCount: 650 },
  { id: "8", name: "Education", icon: "education", courseCount: 540 },
];

export const courses = [
  {
    id: "c1",
    title: "Bachelor of Technology (B.Tech)",
    category: "Engineering",
    level: "Undergraduate",
    duration: "4 years",
    fee: "₹1,50,000 / year",
    rating: 4.5,
    students: "12k+",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=70",
    description:
      "A four-year undergraduate programme covering computer science, mechanical, civil, electrical and electronics engineering with strong placement support.",
    eligibility: "10+2 with Physics, Chemistry and Mathematics + valid JEE Main score",
  },
  {
    id: "c2",
    title: "Bachelor of Medicine & Bachelor of Surgery (MBBS)",
    category: "Medical",
    level: "Undergraduate",
    duration: "5.5 years",
    fee: "₹60,000 / year",
    rating: 4.8,
    students: "8k+",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=70",
    description:
      "India's flagship medical degree combining classroom learning, clinical rotations and a compulsory one-year internship.",
    eligibility: "10+2 with Biology + valid NEET UG score",
  },
  {
    id: "c3",
    title: "Master of Business Administration (MBA)",
    category: "Management",
    level: "Postgraduate",
    duration: "2 years",
    fee: "₹2,00,000 / year",
    rating: 4.6,
    students: "15k+",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=70",
    description:
      "A career-defining postgraduate programme with specialisations in finance, marketing, human resources and operations management.",
    eligibility: "Bachelor's degree with 50% marks + valid CAT / XAT / GMAT score",
  },
  {
    id: "c4",
    title: "Bachelor of Arts (B.A.)",
    category: "Arts & Humanities",
    level: "Undergraduate",
    duration: "3 years",
    fee: "₹15,000 / year",
    rating: 4.2,
    students: "25k+",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=70",
    description:
      "A flexible humanities degree with majors in history, political science, English, psychology and sociology.",
    eligibility: "10+2 in any stream from a recognised board",
  },
  {
    id: "c5",
    title: "Bachelor of Commerce (B.Com)",
    category: "Commerce",
    level: "Undergraduate",
    duration: "3 years",
    fee: "₹20,000 / year",
    rating: 4.1,
    students: "20k+",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=70",
    description:
      "A commerce degree focused on accountancy, business studies, economics and taxation with pathways into finance and CA.",
    eligibility: "10+2 with Commerce or Mathematics preferred",
  },
  {
    id: "c6",
    title: "Bachelor of Science (B.Sc.)",
    category: "Science",
    level: "Undergraduate",
    duration: "3 years",
    fee: "₹25,000 / year",
    rating: 4.3,
    students: "18k+",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=70",
    description:
      "A research-oriented science programme with physics, chemistry, mathematics, biology and computer science combinations.",
    eligibility: "10+2 with Science stream",
  },
  {
    id: "c7",
    title: "Bachelor of Laws (LL.B.)",
    category: "Law",
    level: "Undergraduate",
    duration: "3 years",
    fee: "₹40,000 / year",
    rating: 4.4,
    students: "5k+",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=70",
    description:
      "A rigorous law degree covering constitutional, criminal, corporate and international law with moot court practice.",
    eligibility: "Bachelor's degree in any discipline + valid CLAT / LSAT score",
  },
  {
    id: "c8",
    title: "Bachelor of Education (B.Ed.)",
    category: "Education",
    level: "Postgraduate",
    duration: "2 years",
    fee: "₹50,000 / year",
    rating: 4.0,
    students: "10k+",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=70",
    description:
      "A teacher-training programme that blends pedagogy, child psychology and supervised classroom practice.",
    eligibility: "Bachelor's degree with 50% marks",
  },
];

export const colleges = [
  {
    id: "col1",
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    location: "New Delhi, Delhi",
    type: "Government",
    rating: 4.9,
    reviews: 1250,
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    nirfRank: 2,
    fees: "₹2,20,000 / year",
    established: 1961,
    examsAccepted: ["JEE Advanced", "GATE", "CAT"],
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=70",
    description:
      "A premier engineering institute known for world-class research, an exceptional peer group and outstanding placement records across India and abroad.",
  },
  {
    id: "col2",
    name: "All India Institute of Medical Sciences",
    shortName: "AIIMS Delhi",
    location: "New Delhi, Delhi",
    type: "Government",
    rating: 4.9,
    reviews: 980,
    courses: ["MBBS", "MD", "MS", "B.Sc Nursing"],
    nirfRank: 1,
    fees: "₹6,000 / year",
    established: 1956,
    examsAccepted: ["NEET UG", "NEET PG", "INI-CET"],
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=70",
    description:
      "India's top-ranked medical institute offering world-class medical education, clinical exposure and research opportunities at an affordable cost.",
  },
  {
    id: "col3",
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM Ahmedabad",
    location: "Ahmedabad, Gujarat",
    type: "Autonomous",
    rating: 4.8,
    reviews: 640,
    courses: ["MBA", "Ph.D", "Executive MBA"],
    nirfRank: 1,
    fees: "₹13,00,000 / programme",
    established: 1961,
    examsAccepted: ["CAT", "GMAT", "GRE"],
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=70",
    description:
      "India's leading business school, famous for its case-based pedagogy, distinguished faculty and consistently strong placement outcomes.",
  },
  {
    id: "col4",
    name: "University of Delhi",
    shortName: "DU",
    location: "New Delhi, Delhi",
    type: "Government",
    rating: 4.5,
    reviews: 2100,
    courses: ["B.A", "B.Com", "B.Sc", "M.A", "M.Com"],
    nirfRank: 11,
    fees: "₹30,000 / year",
    established: 1922,
    examsAccepted: ["CUET UG", "CUET PG"],
    image:
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=70",
    description:
      "A historic central university with dozens of colleges offering diverse undergraduate and postgraduate programmes across every discipline.",
  },
  {
    id: "col5",
    name: "National Law School of India University",
    shortName: "NLSIU Bangalore",
    location: "Bengaluru, Karnataka",
    type: "Government",
    rating: 4.7,
    reviews: 420,
    courses: ["B.A. LL.B", "LL.M", "Ph.D"],
    nirfRank: 1,
    fees: "₹3,50,000 / year",
    established: 1987,
    examsAccepted: ["CLAT", "AILET"],
    image:
      "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=800&q=70",
    description:
      "India's most prestigious law school, producing judges, policy makers and top corporate lawyers through a rigorous five-year programme.",
  },
  {
    id: "col7",
    name: "Indian Institute of Technology Patna",
    shortName: "IIT Patna",
    location: "Patna, Bihar",
    type: "Government",
    rating: 4.6,
    reviews: 312,
    courses: ["B.Tech", "M.Tech", "MBA/PGDM", "Ph.D"],
    nirfRank: 41,
    fees: "₹10,00,000 / programme",
    established: 2008,
    examsAccepted: ["JEE Advanced", "JEE Main", "CAT"],
    image:
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=70",
    description:
      "IIT Patna is an institute of national importance known for its engineering, science and management programmes. The institute offers an executive MBA as well as five-year integrated B.Tech + MBA programmes in partnership with leading IIMs, with strong research and placement outcomes.",
  },
];

export const exams = [
  {
    id: "e1",
    slug: "jee-main",
    name: "JEE Main",
    fullName: "Joint Entrance Examination (Main)",
    conductingBody: "National Testing Agency",
    category: "Engineering",
    examDate: "21 Jan 2027",
    applyStart: "01 Nov 2026",
    applyEnd: "30 Nov 2026",
    level: "Undergraduate",
    applicationFee: "₹1,000",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "e2",
    slug: "neet-ug",
    name: "NEET UG",
    fullName: "National Eligibility cum Entrance Test (UG)",
    conductingBody: "National Testing Agency",
    category: "Medical",
    examDate: "03 May 2027",
    applyStart: "10 Feb 2027",
    applyEnd: "10 Mar 2027",
    level: "Undergraduate",
    applicationFee: "₹1,700",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "e3",
    slug: "cat",
    name: "CAT",
    fullName: "Common Admission Test",
    conductingBody: "Indian Institutes of Management",
    category: "Management",
    examDate: "28 Nov 2027",
    applyStart: "01 Aug 2027",
    applyEnd: "20 Sep 2027",
    level: "Postgraduate",
    applicationFee: "₹2,400",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "e4",
    slug: "clat",
    name: "CLAT",
    fullName: "Common Law Admission Test",
    conductingBody: "Consortium of NLUs",
    category: "Law",
    examDate: "06 Dec 2026",
    applyStart: "15 Jul 2026",
    applyEnd: "10 Oct 2026",
    level: "Undergraduate",
    applicationFee: "₹4,000",
    image:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "e5",
    slug: "jee-advanced",
    name: "JEE Advanced",
    fullName: "Joint Entrance Examination (Advanced)",
    conductingBody: "Indian Institutes of Technology",
    category: "Engineering",
    examDate: "18 May 2027",
    applyStart: "30 Apr 2027",
    applyEnd: "08 May 2027",
    level: "Undergraduate",
    applicationFee: "₹3,200",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=70",
  },
];

export const articles = [
  {
    id: "a1",
    title: "Top Engineering Colleges in India 2026",
    excerpt:
      "A data-backed look at the country's best engineering institutes, their placement records and admission cut-offs.",
    category: "Rankings",
    readTime: "6 min read",
    date: "18 Oct 2026",
    author: "Ananya Rao",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "a2",
    title: "How to Crack NEET UG: A 6-Month Study Plan",
    excerpt:
      "Subject-wise strategy, high-yield chapters and a realistic weekly schedule built by medical educators.",
    category: "Preparation",
    readTime: "9 min read",
    date: "12 Oct 2026",
    author: "Dr. Vivek Menon",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "a3",
    title: "MBA Specialisations: Which One Fits You?",
    excerpt:
      "Finance, marketing, HR or operations? Compare career paths, salaries and what top B-schools look for.",
    category: "Career",
    readTime: "7 min read",
    date: "05 Oct 2026",
    author: "Rahul Sharma",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "a4",
    title: "Scholarships Every Indian Student Should Know",
    excerpt:
      "Government and private scholarships for meritorious students, with eligibility and application deadlines.",
    category: "Scholarships",
    readTime: "5 min read",
    date: "28 Sep 2026",
    author: "Neha Kulkarni",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=70",
  },
];

export const featuredCourses = courses.slice(0, 4);
export const featuredColleges = colleges.slice(0, 3);
