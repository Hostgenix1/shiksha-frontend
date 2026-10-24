-- ============================================================================
-- Shiksha Admin ERP & CRM - demo seed data
-- Generated from the browser demo workspace. Idempotent: safe to re-run.
-- Order: run 0001_init.sql first, then this file, then create the auth user.
-- ============================================================================

-- Staff directory
insert into public.profiles (id, name, email, role, status, last_active, phone) values
  ('USR-1', 'Aarav Mehta', 'admin@shiksha.com', 'Super Admin', 'Active', 'Just now', '+91 98100 11001'),
  ('USR-2', 'Neha Kapoor', 'neha.kapoor@shiksha.com', 'Senior Counsellor', 'Active', '12 min ago', '+91 98100 11002'),
  ('USR-3', 'Rohan Verma', 'rohan.verma@shiksha.com', 'Counsellor', 'Active', '38 min ago', '+91 98100 11003'),
  ('USR-4', 'Priya Iyer', 'priya.iyer@shiksha.com', 'Admissions Officer', 'Active', '1 hour ago', '+91 98100 11004'),
  ('USR-5', 'Vikram Sethi', 'vikram.sethi@shiksha.com', 'Finance Officer', 'Active', 'Yesterday', '+91 98100 11005'),
  ('USR-6', 'Sneha Rao', 'sneha.rao@shiksha.com', 'Content Editor', 'Inactive', '5 days ago', '+91 98100 11006')
on conflict (email) do nothing;

-- Leads
insert into public.leads (id, name, email, phone, city, source, interest, college, stage, temperature, owner, score, value, created_at, next_follow_up, last_contact, notes) values
  ('LD-1042', 'Ananya Sharma', 'ananya.sharma@gmail.com', '+91 98765 43210', 'Lucknow', 'Instagram', 'B.Tech CSE', 'IIT Patna', 'New', 'Hot', 'Aarav Mehta', 92, 1000000, '2026-10-25T09:20:00', '2026-10-25', 'Enquiry received from college page', '[{"id":"n-1","author":"Aarav Mehta","time":"25 Oct 2026, 09:20","text":"Student wants details about CSE fees, hostel and JEE Advanced cut-off. Parents are involved in the decision."}]'::jsonb),
  ('LD-1041', 'Rohan Gupta', 'rohan.gupta97@gmail.com', '+91 98111 22334', 'Gurugram', 'Google Ads', 'MBA', 'IIM Ahmedabad', 'Qualified', 'Hot', 'Neha Kapoor', 88, 2400000, '2026-10-24T15:10:00', '2026-10-26', 'Counselling call completed', '[{"id":"n-2","author":"Neha Kapoor","time":"24 Oct 2026, 17:40","text":"CAT 92 percentile expected. Discussed IIM call predictors and interview preparation. Wants a scholarship comparison."}]'::jsonb),
  ('LD-1040', 'Fatima Khan', 'fatima.khan@gmail.com', '+91 98990 11223', 'Hyderabad', 'Exam page', 'MBBS', 'AIIMS Delhi', 'Counselling', 'Hot', 'Priya Iyer', 95, 600000, '2026-10-24T11:05:00', '2026-10-25', 'NEET score shared on WhatsApp', '[{"id":"n-3","author":"Priya Iyer","time":"24 Oct 2026, 16:15","text":"NEET score 682. Looking at AIIMS Delhi, MAMC and JIPMER. Counselling guidance call scheduled with parents."}]'::jsonb),
  ('LD-1039', 'Arjun Nair', 'arjun.nair@gmail.com', '+91 90786 45678', 'Kochi', 'College page', 'B.Tech ECE', 'IIT Delhi', 'Contacted', 'Warm', 'Rohan Verma', 76, 800000, '2026-10-23T14:30:00', '2026-10-26', 'First call attempted', '[{"id":"n-4","author":"Rohan Verma","time":"24 Oct 2026, 10:20","text":"Call not answered. Sent a WhatsApp message with the IIT Delhi brochure and JEE Advanced dates."}]'::jsonb),
  ('LD-1038', 'Meera Joshi', 'meera.joshi@gmail.com', '+91 99887 66554', 'Pune', 'Referral', 'BA LLB', 'NLSIU Bangalore', 'Application', 'Hot', 'Neha Kapoor', 90, 1500000, '2026-10-22T09:45:00', '2026-10-27', 'Application form submitted', '[{"id":"n-5","author":"Neha Kapoor","time":"23 Oct 2026, 12:30","text":"CLAT application submitted. Documents pending: Class 12 marksheet and category certificate."}]'::jsonb),
  ('LD-1037', 'Kabir Singh', 'kabir.singh@gmail.com', '+91 88221 33445', 'Jaipur', 'Walk-in', 'BBA', 'Delhi University', 'New', 'Cold', 'Aarav Mehta', 55, 300000, '2026-10-25T11:10:00', '2026-10-26', 'Walk-in enquiry at Delhi office', '[]'::jsonb),
  ('LD-1036', 'Sanya Verma', 'sanya.verma@gmail.com', '+91 97654 32109', 'Noida', 'Course page', 'B.Sc Data Science', 'IIT Patna', 'Qualified', 'Warm', 'Rohan Verma', 81, 450000, '2026-10-21T13:25:00', '2026-10-25', 'Eligibility confirmed', '[{"id":"n-6","author":"Rohan Verma","time":"22 Oct 2026, 15:10","text":"Eligibility confirmed for the online B.Sc programme. Shared fee structure and asked to review with parents."}]'::jsonb),
  ('LD-1035', 'Dev Patel', 'dev.patel@gmail.com', '+91 99001 55667', 'Ahmedabad', 'Google Ads', 'B.Tech ECE', 'IIT Delhi', 'Lost', 'Warm', 'Rohan Verma', 62, 800000, '2026-10-18T10:00:00', null, 'Student joined another college', '[{"id":"n-7","author":"Rohan Verma","time":"21 Oct 2026, 18:20","text":"Student confirmed admission at a local engineering college. Marked as lost after final follow-up."}]'::jsonb),
  ('LD-1034', 'Ishita Roy', 'ishita.roy@gmail.com', '+91 98300 44556', 'Kolkata', 'Referral', 'MBBS', 'AIIMS Delhi', 'Admitted', 'Hot', 'Priya Iyer', 97, 600000, '2026-10-10T09:30:00', null, 'Admission confirmed', '[{"id":"n-8","author":"Priya Iyer","time":"23 Oct 2026, 11:00","text":"Admission confirmed at AIIMS Delhi. First-semester fee paid. Handed over to the student success team."}]'::jsonb),
  ('LD-1033', 'Aditya Rao', 'aditya.rao@gmail.com', '+91 96860 77889', 'Bengaluru', 'Article', 'MBA', 'IIM Ahmedabad', 'Contacted', 'Warm', 'Neha Kapoor', 74, 2400000, '2026-10-23T17:20:00', '2026-10-27', 'WhatsApp message sent', '[]'::jsonb),
  ('LD-1032', 'Nandini Menon', 'nandini.menon@gmail.com', '+91 99470 12345', 'Chennai', 'Exam page', 'BA LLB', 'NLSIU Bangalore', 'Qualified', 'Hot', 'Neha Kapoor', 86, 1500000, '2026-10-22T16:45:00', '2026-10-25', 'CLAT score discussed', '[{"id":"n-9","author":"Neha Kapoor","time":"23 Oct 2026, 10:05","text":"CLAT mock score is in the top 5%. Interested in NLSIU and NALSAR. Needs scholarship information."}]'::jsonb),
  ('LD-1031', 'Vivaan Shah', 'vivaan.shah@gmail.com', '+91 98700 66554', 'Surat', 'Instagram', 'B.Com (Hons)', 'Delhi University', 'Contacted', 'Cold', 'Aarav Mehta', 48, 150000, '2026-10-24T12:15:00', '2026-10-28', 'Details shared on WhatsApp', '[]'::jsonb),
  ('LD-1030', 'Zara Sheikh', 'zara.sheikh@gmail.com', '+91 98220 33445', 'Mumbai', 'College page', 'B.Tech AI & DS', 'IIT Patna', 'Counselling', 'Hot', 'Rohan Verma', 89, 1000000, '2026-10-20T11:50:00', '2026-10-26', 'Parent counselling scheduled', '[{"id":"n-10","author":"Rohan Verma","time":"24 Oct 2026, 14:00","text":"Parent counselling call scheduled for 26 Oct. Shared placement report and integrated programme details."}]'::jsonb),
  ('LD-1029', 'Reyansh Jain', 'reyansh.jain@gmail.com', '+91 90909 88776', 'Indore', 'Google Ads', 'B.Tech CSE', 'IIT Delhi', 'New', 'Warm', 'Aarav Mehta', 68, 800000, '2026-10-25T08:05:00', '2026-10-25', 'Form submitted', '[]'::jsonb),
  ('LD-1028', 'Aisha Khan', 'aisha.khan@gmail.com', '+91 98101 22334', 'Bhopal', 'Exam page', 'B.Sc Nursing', 'AIIMS Delhi', 'New', 'Warm', 'Priya Iyer', 64, 250000, '2026-10-25T10:40:00', '2026-10-26', 'NEET query submitted', '[]'::jsonb),
  ('LD-1027', 'Karan Malhotra', 'karan.malhotra@gmail.com', '+91 98980 77665', 'Chandigarh', 'Referral', 'MBA', 'IIM Ahmedabad', 'Application', 'Warm', 'Neha Kapoor', 83, 2400000, '2026-10-15T10:25:00', '2026-10-28', 'Interview prep call done', '[{"id":"n-11","author":"Neha Kapoor","time":"24 Oct 2026, 13:10","text":"Application submitted. Preparing for the personal interview. Sent a mock interview slot for next week."}]'::jsonb),
  ('LD-1026', 'Tanvi Desai', 'tanvi.desai@gmail.com', '+91 99250 11223', 'Vadodara', 'Instagram', 'BBA LLB', 'NLSIU Bangalore', 'Lost', 'Cold', 'Aarav Mehta', 42, 1200000, '2026-10-12T12:40:00', null, 'Not reachable after 3 attempts', '[]'::jsonb),
  ('LD-1025', 'Omkar Patil', 'omkar.patil@gmail.com', '+91 98600 44556', 'Nagpur', 'College page', 'B.Tech CSE', 'IIT Patna', 'Admitted', 'Hot', 'Rohan Verma', 94, 1000000, '2026-10-08T09:15:00', null, 'Fee plan activated', '[{"id":"n-12","author":"Rohan Verma","time":"22 Oct 2026, 12:00","text":"Admission confirmed. Fee plan shared with the finance team and first installment recorded."}]'::jsonb)
on conflict (id) do nothing;

-- Tasks
insert into public.tasks (id, title, lead_id, lead_name, due, priority, type, owner, done) values
  ('TSK-501', 'Call Ananya Sharma with the CSE fee structure', 'LD-1042', 'Ananya Sharma', '2026-10-25', 'High', 'Call', 'Aarav Mehta', false),
  ('TSK-502', 'Send IIM Ahmedabad brochure to Rohan', 'LD-1041', 'Rohan Gupta', '2026-10-25', 'Medium', 'Email', 'Neha Kapoor', false),
  ('TSK-503', 'Verify Meera Joshi''s application documents', 'LD-1038', 'Meera Joshi', '2026-10-23', 'High', 'Document', 'Neha Kapoor', false),
  ('TSK-504', 'Follow up with Arjun Nair after WhatsApp message', 'LD-1039', 'Arjun Nair', '2026-10-26', 'Medium', 'WhatsApp', 'Rohan Verma', false),
  ('TSK-505', 'Collect pending fee from Omkar Patil', 'LD-1025', 'Omkar Patil', '2026-10-20', 'High', 'Payment', 'Aarav Mehta', false),
  ('TSK-506', 'Counselling call with Fatima Khan and parents', 'LD-1040', 'Fatima Khan', '2026-10-25', 'High', 'Meeting', 'Priya Iyer', false),
  ('TSK-507', 'Share NEET cut-off sheet with Aisha Khan', 'LD-1028', 'Aisha Khan', '2026-10-24', 'Low', 'Email', 'Priya Iyer', true),
  ('TSK-508', 'Review Zara Sheikh''s application before submission', 'LD-1030', 'Zara Sheikh', '2026-10-26', 'Medium', 'Application', 'Rohan Verma', false),
  ('TSK-509', 'Welcome call to Ishita Roy', 'LD-1034', 'Ishita Roy', '2026-10-22', 'Low', 'Call', 'Priya Iyer', true)
on conflict (id) do nothing;

-- Students
insert into public.students (id, name, email, phone, course, college, year, status, fee_status, admission_date) values
  ('STU-301', 'Ishita Roy', 'ishita.roy@gmail.com', '+91 98300 44556', 'MBBS', 'AIIMS Delhi', '2026', 'Active', 'Paid', '2026-10-23'),
  ('STU-302', 'Omkar Patil', 'omkar.patil@gmail.com', '+91 98600 44556', 'B.Tech CSE', 'IIT Patna', '2026', 'Active', 'Partial', '2026-10-22'),
  ('STU-303', 'Karan Malhotra', 'karan.malhotra@gmail.com', '+91 98980 77665', 'MBA', 'IIM Ahmedabad', '2026', 'Active', 'Pending', '2026-10-20'),
  ('STU-304', 'Meera Joshi', 'meera.joshi@gmail.com', '+91 99887 66554', 'BA LLB', 'NLSIU Bangalore', '2026', 'Onboarding', 'Partial', '2026-10-20'),
  ('STU-305', 'Fatima Khan', 'fatima.khan@gmail.com', '+91 98990 11223', 'MBBS', 'AIIMS Delhi', '2026', 'Active', 'Paid', '2026-10-18'),
  ('STU-306', 'Zara Sheikh', 'zara.sheikh@gmail.com', '+91 98220 33445', 'B.Tech AI & DS', 'IIT Patna', '2026', 'Onboarding', 'Pending', '2026-10-24'),
  ('STU-307', 'Arjun Nair', 'arjun.nair@gmail.com', '+91 90786 45678', 'B.Tech ECE', 'IIT Delhi', '2025', 'Active', 'Paid', '2025-08-12'),
  ('STU-308', 'Sanya Verma', 'sanya.verma@gmail.com', '+91 97654 32109', 'B.Sc Data Science', 'IIT Patna', '2026', 'Onboarding', 'Partial', '2026-10-21'),
  ('STU-309', 'Dev Patel', 'dev.patel@gmail.com', '+91 99001 55667', 'B.Tech ECE', 'IIT Delhi', '2024', 'Graduated', 'Paid', '2024-08-05'),
  ('STU-310', 'Nandini Menon', 'nandini.menon@gmail.com', '+91 99470 12345', 'BA LLB', 'NLSIU Bangalore', '2026', 'Onboarding', 'Pending', '2026-10-23')
on conflict (id) do nothing;

-- Applications
insert into public.applications (id, lead_id, student_name, course, college, stage, submitted, counsellor, docs_verified, amount) values
  ('APP-2051', 'LD-1038', 'Meera Joshi', 'BA LLB', 'NLSIU Bangalore', 'Documents verification', '2026-10-20', 'Neha Kapoor', false, 1500000),
  ('APP-2052', 'LD-1034', 'Ishita Roy', 'MBBS', 'AIIMS Delhi', 'Enrolled', '2026-10-12', 'Priya Iyer', true, 600000),
  ('APP-2053', 'LD-1027', 'Karan Malhotra', 'MBA', 'IIM Ahmedabad', 'Offer issued', '2026-10-18', 'Neha Kapoor', true, 2400000),
  ('APP-2054', 'LD-1025', 'Omkar Patil', 'B.Tech CSE', 'IIT Patna', 'Enrolled', '2026-10-10', 'Rohan Verma', true, 1000000),
  ('APP-2055', 'LD-1041', 'Rohan Gupta', 'MBA', 'IIM Ahmedabad', 'Submitted', '2026-10-24', 'Neha Kapoor', false, 2400000),
  ('APP-2056', 'LD-1040', 'Fatima Khan', 'MBBS', 'AIIMS Delhi', 'Offer accepted', '2026-10-22', 'Priya Iyer', true, 600000),
  ('APP-2057', 'LD-1030', 'Zara Sheikh', 'B.Tech AI & DS', 'IIT Patna', 'Submitted', '2026-10-24', 'Rohan Verma', false, 1000000),
  ('APP-2058', 'LD-1042', 'Ananya Sharma', 'B.Tech CSE', 'IIT Patna', 'Draft', null, 'Aarav Mehta', false, 1000000),
  ('APP-2059', 'LD-1032', 'Nandini Menon', 'BA LLB', 'NLSIU Bangalore', 'Under review', '2026-10-23', 'Neha Kapoor', false, 1500000)
on conflict (id) do nothing;

-- Invoices
insert into public.invoices (id, student_id, student_name, course, amount, paid, due_date, status) values
  ('INV-4001', 'STU-301', 'Ishita Roy', 'MBBS', 600000, 600000, '2026-09-15', 'Paid'),
  ('INV-4002', 'STU-302', 'Omkar Patil', 'B.Tech CSE', 400000, 150000, '2026-11-10', 'Partial'),
  ('INV-4003', 'STU-303', 'Karan Malhotra', 'MBA', 800000, 0, '2026-10-20', 'Overdue'),
  ('INV-4004', 'STU-304', 'Meera Joshi', 'BA LLB', 500000, 200000, '2026-11-15', 'Partial'),
  ('INV-4005', 'STU-305', 'Fatima Khan', 'MBBS', 600000, 600000, '2026-10-18', 'Paid'),
  ('INV-4006', 'STU-306', 'Zara Sheikh', 'B.Tech AI & DS', 350000, 0, '2026-11-25', 'Pending'),
  ('INV-4007', 'STU-307', 'Arjun Nair', 'B.Tech ECE', 275000, 275000, '2026-08-15', 'Paid'),
  ('INV-4008', 'STU-308', 'Sanya Verma', 'B.Sc Data Science', 225000, 75000, '2026-11-05', 'Partial'),
  ('INV-4009', 'STU-310', 'Nandini Menon', 'BA LLB', 500000, 0, '2026-10-30', 'Pending'),
  ('INV-4010', 'STU-309', 'Dev Patel', 'B.Tech ECE', 275000, 275000, '2026-07-01', 'Paid')
on conflict (id) do nothing;

-- Payments (ledger rows extracted from invoice history)
insert into public.payments (id, invoice_id, student_name, course, amount, method, reference, date) values
  ('PAY-9001', 'INV-4001', 'Ishita Roy', 'MBBS', 600000, 'UPI', 'UPI-883421', '2026-09-10'),
  ('PAY-9002', 'INV-4002', 'Omkar Patil', 'B.Tech CSE', 150000, 'Bank transfer', 'NEFT-771209', '2026-10-22'),
  ('PAY-9003', 'INV-4004', 'Meera Joshi', 'BA LLB', 200000, 'UPI', 'UPI-119034', '2026-10-20'),
  ('PAY-9004', 'INV-4005', 'Fatima Khan', 'MBBS', 600000, 'Card', 'CARD-55231', '2026-10-18'),
  ('PAY-9005', 'INV-4007', 'Arjun Nair', 'B.Tech ECE', 275000, 'Bank transfer', 'NEFT-330118', '2026-08-12'),
  ('PAY-9006', 'INV-4008', 'Sanya Verma', 'B.Sc Data Science', 75000, 'UPI', 'UPI-664122', '2026-10-21'),
  ('PAY-9007', 'INV-4010', 'Dev Patel', 'B.Tech ECE', 275000, 'Bank transfer', 'NEFT-220431', '2026-06-28')
on conflict (id) do nothing;

-- Content
insert into public.content (id, title, type, category, author, status, updated_at) values
  ('a1', 'Top Engineering Colleges in India 2026', 'Article', 'Rankings', 'Ananya Rao', 'Published', '2026-10-18'),
  ('a2', 'How to Crack NEET UG: A 6-Month Study Plan', 'Article', 'Preparation', 'Dr. Vivek Menon', 'Published', '2026-10-12'),
  ('a3', 'MBA Specialisations: Which One Fits You?', 'Article', 'Career', 'Rahul Sharma', 'Published', '2026-10-05'),
  ('a4', 'Scholarships Every Indian Student Should Know', 'Article', 'Scholarships', 'Neha Kulkarni', 'Published', '2026-09-28'),
  ('CNT-101', 'IIT Patna MBA review: placements, faculty and campus life', 'Review', 'Student review', 'Ritika Sen', 'Pending', '2026-10-25'),
  ('CNT-102', 'Is JEE Advanced 2027 tougher than last year?', 'Forum', 'Exam discussion', 'Community user', 'Pending', '2026-10-24'),
  ('CNT-103', 'NEET UG 2027: new exam centres announced', 'Article', 'Exam news', 'Shiksha Editorial', 'Draft', '2026-10-23'),
  ('CNT-104', 'Scholarship alert: ₹50,000 merit grant for UG students', 'Banner', 'Homepage banner', 'Marketing team', 'Published', '2026-10-20')
on conflict (id) do nothing;

-- Catalog: colleges
insert into public.colleges (id, name, short_name, location, type, rating, reviews, courses, nirf_rank, fees, established, exams_accepted, image, description, status, updated_at) values
  ('col1', 'Indian Institute of Technology Delhi', 'IIT Delhi', 'New Delhi, Delhi', 'Government', 4.9, 1250, '["B.Tech","M.Tech","MBA","Ph.D"]'::jsonb, 2, '₹2,20,000 / year', 1961, '["JEE Advanced","GATE","CAT"]'::jsonb, 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=70', 'A premier engineering institute known for world-class research, an exceptional peer group and outstanding placement records across India and abroad.', 'Published', '2026-10-24'),
  ('col2', 'All India Institute of Medical Sciences', 'AIIMS Delhi', 'New Delhi, Delhi', 'Government', 4.9, 980, '["MBBS","MD","MS","B.Sc Nursing"]'::jsonb, 1, '₹6,000 / year', 1956, '["NEET UG","NEET PG","INI-CET"]'::jsonb, 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=70', 'India''s top-ranked medical institute offering world-class medical education, clinical exposure and research opportunities at an affordable cost.', 'Published', '2026-10-24'),
  ('col3', 'Indian Institute of Management Ahmedabad', 'IIM Ahmedabad', 'Ahmedabad, Gujarat', 'Autonomous', 4.8, 640, '["MBA","Ph.D","Executive MBA"]'::jsonb, 1, '₹13,00,000 / programme', 1961, '["CAT","GMAT","GRE"]'::jsonb, 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=70', 'India''s leading business school, famous for its case-based pedagogy, distinguished faculty and consistently strong placement outcomes.', 'Published', '2026-10-24'),
  ('col4', 'University of Delhi', 'DU', 'New Delhi, Delhi', 'Government', 4.5, 2100, '["B.A","B.Com","B.Sc","M.A","M.Com"]'::jsonb, 11, '₹30,000 / year', 1922, '["CUET UG","CUET PG"]'::jsonb, 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=70', 'A historic central university with dozens of colleges offering diverse undergraduate and postgraduate programmes across every discipline.', 'Published', '2026-10-24'),
  ('col5', 'National Law School of India University', 'NLSIU Bangalore', 'Bengaluru, Karnataka', 'Government', 4.7, 420, '["B.A. LL.B","LL.M","Ph.D"]'::jsonb, 1, '₹3,50,000 / year', 1987, '["CLAT","AILET"]'::jsonb, 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=800&q=70', 'India''s most prestigious law school, producing judges, policy makers and top corporate lawyers through a rigorous five-year programme.', 'Draft', '2026-10-22'),
  ('col7', 'Indian Institute of Technology Patna', 'IIT Patna', 'Patna, Bihar', 'Government', 4.6, 312, '["B.Tech","M.Tech","MBA/PGDM","Ph.D"]'::jsonb, 41, '₹10,00,000 / programme', 2008, '["JEE Advanced","JEE Main","CAT"]'::jsonb, 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=70', 'IIT Patna is an institute of national importance known for its engineering, science and management programmes. The institute offers an executive MBA as well as five-year integrated B.Tech + MBA programmes in partnership with leading IIMs, with strong research and placement outcomes.', 'Published', '2026-10-24')
on conflict (id) do nothing;

-- Catalog: courses
insert into public.courses (id, title, category, level, duration, fee, rating, students, image, description, eligibility, status, updated_at) values
  ('c1', 'Bachelor of Technology (B.Tech)', 'Engineering', 'Undergraduate', '4 years', '₹1,50,000 / year', 4.5, '12k+', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=70', 'A four-year undergraduate programme covering computer science, mechanical, civil, electrical and electronics engineering with strong placement support.', '10+2 with Physics, Chemistry and Mathematics + valid JEE Main score', 'Published', '2026-10-24'),
  ('c2', 'Bachelor of Medicine & Bachelor of Surgery (MBBS)', 'Medical', 'Undergraduate', '5.5 years', '₹60,000 / year', 4.8, '8k+', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=70', 'India''s flagship medical degree combining classroom learning, clinical rotations and a compulsory one-year internship.', '10+2 with Biology + valid NEET UG score', 'Published', '2026-10-24'),
  ('c3', 'Master of Business Administration (MBA)', 'Management', 'Postgraduate', '2 years', '₹2,00,000 / year', 4.6, '15k+', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=70', 'A career-defining postgraduate programme with specialisations in finance, marketing, human resources and operations management.', 'Bachelor''s degree with 50% marks + valid CAT / XAT / GMAT score', 'Published', '2026-10-24'),
  ('c4', 'Bachelor of Arts (B.A.)', 'Arts & Humanities', 'Undergraduate', '3 years', '₹15,000 / year', 4.2, '25k+', 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=70', 'A flexible humanities degree with majors in history, political science, English, psychology and sociology.', '10+2 in any stream from a recognised board', 'Published', '2026-10-24'),
  ('c5', 'Bachelor of Commerce (B.Com)', 'Commerce', 'Undergraduate', '3 years', '₹20,000 / year', 4.1, '20k+', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=70', 'A commerce degree focused on accountancy, business studies, economics and taxation with pathways into finance and CA.', '10+2 with Commerce or Mathematics preferred', 'Published', '2026-10-24'),
  ('c6', 'Bachelor of Science (B.Sc.)', 'Science', 'Undergraduate', '3 years', '₹25,000 / year', 4.3, '18k+', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=70', 'A research-oriented science programme with physics, chemistry, mathematics, biology and computer science combinations.', '10+2 with Science stream', 'Published', '2026-10-24'),
  ('c7', 'Bachelor of Laws (LL.B.)', 'Law', 'Undergraduate', '3 years', '₹40,000 / year', 4.4, '5k+', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=70', 'A rigorous law degree covering constitutional, criminal, corporate and international law with moot court practice.', 'Bachelor''s degree in any discipline + valid CLAT / LSAT score', 'Draft', '2026-10-21'),
  ('c8', 'Bachelor of Education (B.Ed.)', 'Education', 'Postgraduate', '2 years', '₹50,000 / year', 4, '10k+', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=70', 'A teacher-training programme that blends pedagogy, child psychology and supervised classroom practice.', 'Bachelor''s degree with 50% marks', 'Published', '2026-10-24')
on conflict (id) do nothing;

-- Catalog: exams
insert into public.exams (id, slug, name, full_name, conducting_body, category, exam_date, apply_start, apply_end, level, application_fee, image, status, updated_at) values
  ('e1', 'jee-main', 'JEE Main', 'Joint Entrance Examination (Main)', 'National Testing Agency', 'Engineering', '21 Jan 2027', '01 Nov 2026', '30 Nov 2026', 'Undergraduate', '₹1,000', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=70', 'Published', '2026-10-24'),
  ('e2', 'neet-ug', 'NEET UG', 'National Eligibility cum Entrance Test (UG)', 'National Testing Agency', 'Medical', '03 May 2027', '10 Feb 2027', '10 Mar 2027', 'Undergraduate', '₹1,700', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=70', 'Published', '2026-10-24'),
  ('e3', 'cat', 'CAT', 'Common Admission Test', 'Indian Institutes of Management', 'Management', '28 Nov 2027', '01 Aug 2027', '20 Sep 2027', 'Postgraduate', '₹2,400', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=70', 'Published', '2026-10-24'),
  ('e4', 'clat', 'CLAT', 'Common Law Admission Test', 'Consortium of NLUs', 'Law', '06 Dec 2026', '15 Jul 2026', '10 Oct 2026', 'Undergraduate', '₹4,000', 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=70', 'Draft', '2026-10-19'),
  ('e5', 'jee-advanced', 'JEE Advanced', 'Joint Entrance Examination (Advanced)', 'Indian Institutes of Technology', 'Engineering', '18 May 2027', '30 Apr 2027', '08 May 2027', 'Undergraduate', '₹3,200', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=70', 'Published', '2026-10-24')
on conflict (id) do nothing;

-- Workspace settings
insert into public.org_settings (id, organisation, support_email, support_phone, academic_session, lead_sla_hours, auto_assign_leads, duplicate_check, email_alerts, daily_digest) values
  (1, 'Shiksha.com', 'support@shiksha.com', '1800 123 4567', '2026–27', '4', true, true, true, true)
on conflict (id) do update set
  organisation = excluded.organisation,
  support_email = excluded.support_email,
  support_phone = excluded.support_phone,
  academic_session = excluded.academic_session,
  lead_sla_hours = excluded.lead_sla_hours,
  auto_assign_leads = excluded.auto_assign_leads,
  duplicate_check = excluded.duplicate_check,
  email_alerts = excluded.email_alerts,
  daily_digest = excluded.daily_digest;
