export const categories = [
  { id: "1", name: "Engineering", icon: "⚙️", courseCount: 1240 },
  { id: "2", name: "Medical", icon: "🩺", courseCount: 890 },
  { id: "3", name: "Management", icon: "📊", courseCount: 1560 },
  { id: "4", name: "Law", icon: "⚖️", courseCount: 430 },
  { id: "5", name: "Arts & Humanities", icon: "🎭", courseCount: 720 },
  { id: "6", name: "Science", icon: "🔬", courseCount: 980 },
  { id: "7", name: "Commerce", icon: "💰", courseCount: 650 },
  { id: "8", name: "Education", icon: "🎓", courseCount: 540 },
];

export const courses = [
  {
    id: "c1",
    title: "Bachelor of Technology (B.Tech)",
    category: "Engineering",
    duration: "4 years",
    fee: "₹1,50,000/year",
    rating: 4.5,
    students: "12k+",
    image: "https://images.unsplash.com/photo-1541339907198-e08854caf763?w=500&q=60",
    description:
      "Undergraduate engineering program with specializations in CSE, Mechanical, Civil, Electrical and more.",
  },
  {
    id: "c2",
    title: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
    category: "Medical",
    duration: "5.5 years",
    fee: "₹60,000/year",
    rating: 4.8,
    students: "8k+",
    image: "https://images.unsplash.com/photo-1551089785-391627b58615?w=500&q=60",
    description:
      "Professional medical degree to become a doctor. Includes internship and practical training.",
  },
  {
    id: "c3",
    title: "Master of Business Administration (MBA)",
    category: "Management",
    duration: "2 years",
    fee: "₹2,00,000/year",
    rating: 4.6,
    students: "15k+",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=60",
    description:
      "Postgraduate management program with specializations in Marketing, Finance, HR, Operations.",
  },
  {
    id: "c4",
    title: "Bachelor of Arts (B.A.)",
    category: "Arts & Humanities",
    duration: "3 years",
    fee: "₹15,000/year",
    rating: 4.2,
    students: "25k+",
    image: "https://images.unsplash.com/photo-1456513380379-f650999c355c?w=500&q=60",
    description:
      "Undergraduate arts program with subjects like History, Political Science, English, Psychology.",
  },
  {
    id: "c5",
    title: "Bachelor of Commerce (B.Com)",
    category: "Commerce",
    duration: "3 years",
    fee: "₹20,000/year",
    rating: 4.1,
    students: "20k+",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=60",
    description:
      "Commerce undergraduate program focusing on Accountancy, Business Studies, Economics.",
  },
  {
    id: "c6",
    title: "Bachelor of Science (B.Sc.)",
    category: "Science",
    duration: "3 years",
    fee: "₹25,000/year",
    rating: 4.3,
    students: "18k+",
    image: "https://images.unsplash.com/photo-1530986633863-7363197621b0?w=500&q=60",
    description:
      "Science undergraduate program with Physics, Chemistry, Mathematics, Biology specializations.",
  },
  {
    id: "c7",
    title: "Bachelor of Laws (LL.B.)",
    category: "Law",
    duration: "3 years",
    fee: "₹40,000/year",
    rating: 4.4,
    students: "5k+",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c83?w=500&q=60",
    description:
      "Law degree for aspiring lawyers and legal professionals. Covers Constitutional, Criminal, Corporate law.",
  },
  {
    id: "c8",
    title: "Bachelor of Education (B.Ed.)",
    category: "Education",
    duration: "2 years",
    fee: "₹50,000/year",
    rating: 4.0,
    students: "10k+",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=60",
    description:
      "Teacher training program for those who want to become school teachers and educators.",
  },
];

export const colleges = [
  {
    id: "col1",
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    type: "Government",
    rating: 4.9,
    reviews: 1250,
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    nirfRank: 2,
    image: "https://images.unsplash.com/photo-1541339907198-e08854caf763?w=500&q=60",
    description:
      "Premier engineering institute in India known for academic excellence and placements.",
  },
  {
    id: "col2",
    name: "All India Institute of Medical Sciences (AIIMS)",
    location: "New Delhi",
    type: "Government",
    rating: 4.9,
    reviews: 980,
    courses: ["MBBS", "MD", "MS", "B.Sc Nursing"],
    nirfRank: 1,
    image: "https://images.unsplash.com/photo-1551089785-391627b58615?w=500&q=60",
    description:
      "India's top medical college offering world-class medical education and research.",
  },
  {
    id: "col3",
    name: "Indian Institute of Management Ahmedabad",
    location: "Ahmedabad, Gujarat",
    type: "Autonomous",
    rating: 4.8,
    reviews: 640,
    courses: ["MBA", "Ph.D", "Executive MBA"],
    nirfRank: 1,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=60",
    description:
      "Top business school in India known for case-based teaching and excellent placements.",
  },
  {
    id: "col4",
    name: "University of Delhi",
    location: "New Delhi",
    type: "Government",
    rating: 4.5,
    reviews: 2100,
    courses: ["B.A", "B.Com", "B.Sc", "M.A", "M.Com"],
    nirfRank: 11,
    image: "https://images.unsplash.com/photo-1456513380379-f650999c355c?w=500&q=60",
    description:
      "Central university offering diverse undergraduate and postgraduate programs.",
  },
  {
    id: "col5",
    name: "National Law School of India University",
    location: "Bangalore, Karnataka",
    type: "Government",
    rating: 4.7,
    reviews: 420,
    courses: ["B.A. LL.B", "LL.M", "Ph.D"],
    nirfRank: 1,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c83?w=500&q=60",
    description:
      "Premier law university producing top legal professionals and judges.",
  },
  {
    id: "col6",
    name: "Birla Institute of Technology and Science (BITS Pilani)",
    location: "Pilani, Rajasthan",
    type: "Private",
    rating: 4.6,
    reviews: 890,
    courses: ["B.Tech", "M.Tech", "MBA", "Ph.D"],
    nirfRank: 28,
    image: "https://images.unsplash.com/photo-1530986633863-7363197621b0?w=500&q=60",
    description:
      "Leading private institute of technology with strong industry connections.",
  },
];

export const exams = [
  {
    id: "e1",
    name: "JEE Main",
    fullName: "Joint Entrance Examination Main",
    conductingBody: "NTA",
    examDate: "Jan 2026",
    applyStart: "Nov 2025",
    applyEnd: "Dec 2025",
    level: "Undergraduate",
    image: "https://images.unsplash.com/photo-1541339907198-e08854caf763?w=500&q=60",
  },
  {
    id: "e2",
    name: "NEET UG",
    fullName: "National Eligibility cum Entrance Test",
    conductingBody: "NTA",
    examDate: "May 2026",
    applyStart: "Mar 2026",
    applyEnd: "Apr 2026",
    level: "Undergraduate",
    image: "https://images.unsplash.com/photo-1551089785-391627b58615?w=500&q=60",
  },
  {
    id: "e3",
    name: "CAT",
    fullName: "Common Admission Test",
    conductingBody: "IIM",
    examDate: "Nov 2026",
    applyStart: "Aug 2026",
    applyEnd: "Sep 2026",
    level: "Postgraduate",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=60",
  },
  {
    id: "e4",
    name: "CLAT",
    fullName: "Common Law Admission Test",
    conductingBody: "NLU Consortium",
    examDate: "Dec 2025",
    applyStart: "Jul 2025",
    applyEnd: "Oct 2025",
    level: "Undergraduate",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c83?w=500&q=60",
  },
];

export const articles = [
  {
    id: "a1",
    title: "Top 10 Engineering Colleges in India 2026",
    excerpt:
      "Discover the best engineering colleges based on NIRF rankings, placements, and infrastructure.",
    category: "Rankings",
    readTime: "5 min read",
    date: "15 Oct 2026",
    image: "https://images.unsplash.com/photo-1541339907198-e08854caf763?w=500&q=60",
  },
  {
    id: "a2",
    title: "How to Crack NEET 2026: Complete Study Plan",
    excerpt:
      "Subject-wise preparation strategy, best books, and time management tips for NEET aspirants.",
    category: "Preparation",
    readTime: "8 min read",
    date: "10 Oct 2026",
    image: "https://images.unsplash.com/photo-1551089785-391627b58615?w=500&q=60",
  },
  {
    id: "a3",
    title: "MBA Specializations: Which One to Choose?",
    excerpt:
      "Compare Finance, Marketing, HR, Operations and other MBA specializations with career scope.",
    category: "Career",
    readTime: "6 min read",
    date: "05 Oct 2026",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=60",
  },
  {
    id: "a4",
    title: "Scholarships for Indian Students 2026",
    excerpt:
      "List of government and private scholarships available for meritorious and needy students.",
    category: "Scholarship",
    readTime: "4 min read",
    date: "28 Sep 2026",
    image: "https://images.unsplash.com/photo-1541339907198-e08854caf763?w=500&q=60",
  },
];

export const featuredCourses = courses.slice(0, 4);
export const featuredColleges = colleges.slice(0, 3);
