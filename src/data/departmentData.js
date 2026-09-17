export const departmentData = {
  name: "Division of Information Technology",
  institution: "School of Engineering, CUSAT",
  established: 1995,
  tagline: "Pioneering Computing, Software Engineering & Applied Artificial Intelligence",
  vision: "To be a centre of excellence in the field of Information Technology, producing industry-ready professionals, visionary innovators, and ethical leaders capable of addressing global technological challenges.",
  mission: [
    "Provide cutting-edge academic curriculum coupled with hands-on laboratory experience and real-world project engineering.",
    "Foster a vibrant culture of research, hackathons, open-source innovation, and interdisciplinary collaboration.",
    "Cultivate strong industry-academia linkages to accelerate career placements, mentorship, and high-impact internships.",
    "Instill professional ethics, leadership qualities, and lifelong learning attitudes in engineering graduates."
  ],
  whyChoose: [
    {
      id: "pioneers",
      title: "Pioneers in IT Education",
      desc: "Established in 1995, we were the first in the country to offer Information Technology as a B.Tech degree, setting the national benchmark."
    },
    {
      id: "nba-tier1",
      title: "NBA Tier-1 Accreditation",
      desc: "Highest level accreditation ensuring global mobility and international equivalence for higher studies and careers worldwide."
    },
    {
      id: "ioa-uk",
      title: "Institute of Analytics (UK)",
      desc: "Earned prestigious global accreditation from the Institute of Analytics U.K., validating our data intelligence and analytics standards."
    },
    {
      id: "curriculum",
      title: "2023 Scheme Industry Curriculum",
      desc: "Designed in collaboration with premier tech firms to meet modern industry demands with Outcome-Based Education (OBE)."
    },
    {
      id: "faculty",
      title: "PhD & Industry Expert Faculty",
      desc: "Learn from doctorate faculty with extensive technical research, global publications, and active industry advisory experience."
    },
    {
      id: "industry5",
      title: "Industry 5.0 Ready",
      desc: "Cutting-edge specialization courses preparing graduates for AI-first engineering, autonomous robotics, and smart manufacturing."
    },
    {
      id: "global-diversity",
      title: "Global Student Diversity",
      desc: "Vibrant pan-Indian and international campus community with 25%+ representation from outside the state, cultivating cross-cultural excellence."
    },
    {
      id: "placements",
      title: "90%+ Placement Record",
      desc: "Consistent 90%+ placement track record with Fortune 500 tech leaders, dedicated placement liaison, and high-value dream packages."
    },
    {
      id: "innovation-research",
      title: "State-of-the-Art Research",
      desc: "Advanced research labs backed by ₹50L+ grants, faculty patents, and institutional funding for student-led innovation."
    },
    {
      id: "entrepreneurship",
      title: "Incubation & Startups",
      desc: "In-house incubation center and dedicated alumni mentorship network nurturing student-led tech ventures and commercial ideas."
    }
  ],
  history: [
    {
      year: "1995",
      title: "First IT B.Tech in India",
      description: "Established under SOE CUSAT as the first institution in the country to launch an official Bachelor of Technology in Information Technology."
    },
    {
      year: "2003",
      title: "SAIT Inauguration",
      description: "Founded the Students Association of Information Technology to unify student hackathons, peer workshops, and technical events."
    },
    {
      year: "2018",
      title: "NBA Tier-1 & Global Recognition",
      description: "Earned Tier-1 accreditation from NBA and accreditation from the Institute of Analytics (IoA) U.K., unlocking global mobility."
    },
    {
      year: "2023",
      title: "IBM WatsonX AI Grant & Global Ties",
      description: "Selected as 1 of only 25 institutions globally for ₹50,00,000 IBM WatsonX GenAI grant, with University of West London & Japan partnerships."
    },
    {
      year: "2026",
      title: "SAIT 2.0 Digital Ecosystem",
      description: "Next-gen tech platform integrating automated mentorship workflows, student achievement logging, and smart career intelligence."
    }
  ],
  faculty: [
    {
      id: "fac-1",
      name: "Prof. Dr. Santhosh Kumar",
      role: "Head of the Department & Professor",
      qualifications: "Ph.D., M.Tech, Postdoc (Singapore)",
      domain: "Artificial Intelligence, Deep Learning, Computer Vision",
      email: "santoshk@cusat.ac.in",
      office: "IT Block Room 201 / AI Lab 102",
      avatar: "/img/people/hod.jpg",
      featured: true,
      publications: 48
    },
    {
      id: "fac-2",
      name: "Prof. Dr. Shelbi Joseph",
      role: "Professor & SAIT Staff Coordinator",
      qualifications: "Ph.D., M.Tech (Computer Science), B.Tech",
      domain: "Cyber Security, Cryptography, Machine Learning, Data Analytics",
      email: "shelbij@cusat.ac.in",
      office: "IT Block Room 203",
      avatar: "/img/people/shelbi.jpg",
      featured: true,
      publications: 28
    },
    {
      id: "fac-3",
      name: "Dr. Daleesha M. Viswanathan",
      role: "Professor & SAIT Staff Co-coordinator",
      qualifications: "Ph.D., M.Tech (Computer Science), B.Tech",
      domain: "Distributed Systems, High Performance Computing, Data Mining",
      email: "daleesha@cusat.ac.in",
      office: "IT Block Room 205",
      avatar: "/img/people/daleesha.jpg",
      featured: true,
      publications: 34
    },
    {
      id: "fac-4",
      name: "Dr. Rajesh V.",
      role: "Associate Professor & Placement Liaison",
      qualifications: "Ph.D. (Cloud Computing), M.Tech",
      domain: "Cloud Architecture, DevOps, Microservices, Kubernetes",
      email: "rajeshv@cusat.ac.in",
      office: "Cloud Computing Lab 305",
      avatar: "/img/avatars/avatar_rajesh_m.svg",
      featured: false,
      publications: 19
    },
    {
      id: "fac-5",
      name: "Prof. Meera Nambiar",
      role: "Assistant Professor & Technical Mentor",
      qualifications: "M.Tech (Data Science), B.Tech",
      domain: "Natural Language Processing, Full Stack Systems, UX Research",
      email: "meeran@cusat.ac.in",
      office: "IT Block Room 206",
      avatar: "/img/avatars/avatar_meera_f.svg",
      featured: false,
      publications: 15
    },
    {
      id: "fac-6",
      name: "Prof. Arun Krishnan",
      role: "Assistant Professor & Lab In-Charge",
      qualifications: "M.Tech (Network Security), B.Tech",
      domain: "Embedded Systems, Edge Computing, Linux Kernel Architecture",
      email: "arunk@cusat.ac.in",
      office: "Networks Lab 104",
      avatar: "/img/avatars/avatar_arun_m.svg",
      featured: false,
      publications: 11
    }
  ],
  academicLinks: [
    { title: "CUSAT B.Tech IT Syllabus 2024-2028 (Outcome Based)", category: "Curriculum", link: "#resources", type: "PDF" },
    { title: "Division Lab Manuals & Code Templates", category: "Lab Repository", link: "#resources", type: "Repo" },
    { title: "SOE Academic Calendar & Exam Schedules", category: "Academics", link: "#announcements", type: "Calendar" },
    { title: "CUSAT Student Portal (Admissions & Results)", category: "Portal", link: "https://cusat.ac.in", type: "External" }
  ]
};
