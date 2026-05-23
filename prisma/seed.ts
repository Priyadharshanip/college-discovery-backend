import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const collegesData = [
  {
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai",
    fees: 250000,
    rating: 4.8,
    overview: "IIT Bombay is a public technical and research university located in Powai, Mumbai. It is globally renowned for its engineering programs and research facilities.",
    courses: [
      { name: "B.Tech in Computer Science", duration: "4 Years", fees: 250000 },
      { name: "B.Tech in Electrical Engineering", duration: "4 Years", fees: 250000 }
    ],
    placements: [
      { avgPackage: "22 LPA", topRecruiters: ["Google", "Microsoft", "Amazon", "Optiver"].join(', ') }
    ],
    reviews: [
      { rating: 5, comment: "Excellent campus life and top-notch faculty.", authorName: "Rahul Sharma" },
      { rating: 4.5, comment: "Highly competitive environment but totally worth it.", authorName: "Aditi Rao" }
    ]
  },
  {
    name: "Indian Institute of Technology Delhi",
    location: "Delhi",
    fees: 235000,
    rating: 4.7,
    overview: "IIT Delhi is located in Hauz Khas, New Delhi. It offers prestigious engineering, science, and management programs with strong industry connections.",
    courses: [
      { name: "B.Tech in Computer Science", duration: "4 Years", fees: 235000 },
      { name: "B.Tech in Mechanical Engineering", duration: "4 Years", fees: 235000 }
    ],
    placements: [
      { avgPackage: "20 LPA", topRecruiters: ["Tower Research", "Jane Street", "Microsoft"].join(', ') }
    ],
    reviews: [
      { rating: 4.8, comment: "Brilliant peers and startup culture.", authorName: "Karan Singh" }
    ]
  },
  {
    name: "Indian Institute of Science",
    location: "Bangalore",
    fees: 150000,
    rating: 4.9,
    overview: "IISc Bangalore is India's premier institute for advanced scientific and technological research and education.",
    courses: [
      { name: "B.Sc (Research)", duration: "4 Years", fees: 150000 }
    ],
    placements: [
      { avgPackage: "28 LPA", topRecruiters: ["Google", "DeepMind", "Intel"].join(', ') }
    ],
    reviews: [
      { rating: 5, comment: "Best place for research in India.", authorName: "Neha Gupta" }
    ]
  },
  {
    name: "Indian Institute of Technology Madras",
    location: "Chennai",
    fees: 210000,
    rating: 4.8,
    overview: "Consistently ranked #1 in NIRF, IIT Madras is known for its lush green campus and rigorous academic curriculum.",
    courses: [
      { name: "B.Tech in Aerospace Engineering", duration: "4 Years", fees: 210000 },
      { name: "B.Tech in Computer Science", duration: "4 Years", fees: 210000 }
    ],
    placements: [
      { avgPackage: "21 LPA", topRecruiters: ["Apple", "Texas Instruments", "Qualcomm"].join(', ') }
    ],
    reviews: [
      { rating: 4.7, comment: "Great focus on core engineering subjects.", authorName: "Vikram R" }
    ]
  },
  {
    name: "International Institute of Information Technology",
    location: "Hyderabad",
    fees: 320000,
    rating: 4.6,
    overview: "IIIT Hyderabad is an autonomous university known for its strong focus on computer science and research-driven curriculum.",
    courses: [
      { name: "B.Tech in Computer Science", duration: "4 Years", fees: 320000 },
      { name: "B.Tech in ECE", duration: "4 Years", fees: 320000 }
    ],
    placements: [
      { avgPackage: "30 LPA", topRecruiters: ["Apple", "Google", "Facebook", "Amazon"].join(', ') }
    ],
    reviews: [
      { rating: 4.8, comment: "Unbeatable coding culture.", authorName: "Siddharth Verma" }
    ]
  },
  {
    name: "College of Engineering Pune",
    location: "Pune",
    fees: 95000,
    rating: 4.3,
    overview: "COEP is one of the oldest engineering colleges in Asia, located in Pune. It is highly respected for its legacy and alumni network.",
    courses: [
      { name: "B.Tech in Mechanical Engineering", duration: "4 Years", fees: 95000 },
      { name: "B.Tech in Computer Engineering", duration: "4 Years", fees: 95000 }
    ],
    placements: [
      { avgPackage: "12 LPA", topRecruiters: ["Tata Motors", "Bajaj Auto", "L&T", "TCS"].join(', ') }
    ],
    reviews: [
      { rating: 4.4, comment: "Historic campus with strong core placements.", authorName: "Pooja Patil" }
    ]
  },
  {
    name: "Veermata Jijabai Technological Institute",
    location: "Mumbai",
    fees: 85000,
    rating: 4.2,
    overview: "VJTI is a prestigious engineering college in Mumbai known for excellent placements and practical learning.",
    courses: [
      { name: "B.Tech in IT", duration: "4 Years", fees: 85000 },
      { name: "B.Tech in Computer Engineering", duration: "4 Years", fees: 85000 }
    ],
    placements: [
      { avgPackage: "14 LPA", topRecruiters: ["Morgan Stanley", "Samsung", "JPMC"].join(', ') }
    ],
    reviews: [
      { rating: 4.1, comment: "Great ROI and prime location.", authorName: "Rohan Deshmukh" }
    ]
  },
  {
    name: "Netaji Subhas University of Technology",
    location: "Delhi",
    fees: 180000,
    rating: 4.4,
    overview: "Formerly NSIT, NSUT is a state university located in Dwarka, New Delhi. It boasts a very strong placement record in software engineering.",
    courses: [
      { name: "B.Tech in Computer Engineering", duration: "4 Years", fees: 180000 }
    ],
    placements: [
      { avgPackage: "16 LPA", topRecruiters: ["Microsoft", "Google", "Atlassian"].join(', ') }
    ],
    reviews: [
      { rating: 4.5, comment: "Amazing placement cell and seniors.", authorName: "Aman Gupta" }
    ]
  },
  {
    name: "R.V. College of Engineering",
    location: "Bangalore",
    fees: 300000,
    rating: 4.3,
    overview: "RVCE is a private technical co-educational college located in Bangalore. It is one of the top engineering colleges in Karnataka.",
    courses: [
      { name: "B.E. in Computer Science", duration: "4 Years", fees: 300000 },
      { name: "B.E. in Information Science", duration: "4 Years", fees: 300000 }
    ],
    placements: [
      { avgPackage: "11 LPA", topRecruiters: ["Cisco", "Amazon", "Wipro"].join(', ') }
    ],
    reviews: [
      { rating: 4.2, comment: "Very strict academics but good placements.", authorName: "Priyanka Reddy" }
    ]
  },
  {
    name: "Madras Institute of Technology",
    location: "Chennai",
    fees: 60000,
    rating: 4.2,
    overview: "MIT Chennai is a constituent college of Anna University. It is famous as the alma mater of Dr. A.P.J. Abdul Kalam.",
    courses: [
      { name: "B.Tech in Aeronautical Engineering", duration: "4 Years", fees: 60000 },
      { name: "B.Tech in Automobile Engineering", duration: "4 Years", fees: 60000 }
    ],
    placements: [
      { avgPackage: "8 LPA", topRecruiters: ["TVS", "Hyundai", "Cognizant"].join(', ') }
    ],
    reviews: [
      { rating: 4.5, comment: "Excellent faculty for aeronautics.", authorName: "Karthik N" }
    ]
  },
  {
    name: "BITS Pilani, Hyderabad Campus",
    location: "Hyderabad",
    fees: 550000,
    rating: 4.7,
    overview: "A premier private technical university campus in Hyderabad offering world-class infrastructure and 0% attendance policy.",
    courses: [
      { name: "B.E. in Computer Science", duration: "4 Years", fees: 550000 },
      { name: "B.E. in EEE", duration: "4 Years", fees: 550000 }
    ],
    placements: [
      { avgPackage: "24 LPA", topRecruiters: ["Uber", "Nvidia", "Oracle"].join(', ') }
    ],
    reviews: [
      { rating: 4.8, comment: "Fantastic campus life and freedom.", authorName: "Ravi Teja" }
    ]
  },
  {
    name: "Symbiosis Institute of Technology",
    location: "Pune",
    fees: 280000,
    rating: 4.0,
    overview: "SIT Pune is a part of Symbiosis International University, known for its diverse campus and holistic education.",
    courses: [
      { name: "B.Tech in AI & Machine Learning", duration: "4 Years", fees: 280000 }
    ],
    placements: [
      { avgPackage: "9 LPA", topRecruiters: ["IBM", "Tech Mahindra", "Infosys"].join(', ') }
    ],
    reviews: [
      { rating: 4.0, comment: "Good infrastructure and international exposure.", authorName: "Shruti Joshi" }
    ]
  },
  {
    name: "Sardar Patel Institute of Technology",
    location: "Mumbai",
    fees: 170000,
    rating: 4.3,
    overview: "SPIT is an autonomous engineering college located in Andheri, Mumbai, sharing its campus with SPJIMR.",
    courses: [
      { name: "B.Tech in Computer Engineering", duration: "4 Years", fees: 170000 },
      { name: "B.Tech in MCA", duration: "3 Years", fees: 150000 }
    ],
    placements: [
      { avgPackage: "13 LPA", topRecruiters: ["Barclays", "JPMC", "L&T Infotech"].join(', ') }
    ],
    reviews: [
      { rating: 4.2, comment: "Solid placements, very small campus though.", authorName: "Arjun Nair" }
    ]
  },
  {
    name: "Delhi Technological University",
    location: "Delhi",
    fees: 190000,
    rating: 4.6,
    overview: "DTU is a premier state university in Delhi offering top-tier engineering programs and boasting a massive alumni base.",
    courses: [
      { name: "B.Tech in Computer Engineering", duration: "4 Years", fees: 190000 },
      { name: "B.Tech in Software Engineering", duration: "4 Years", fees: 190000 }
    ],
    placements: [
      { avgPackage: "18 LPA", topRecruiters: ["Amazon", "Flipkart", "Sprinklr"].join(', ') }
    ],
    reviews: [
      { rating: 4.6, comment: "Awesome tech societies and coding culture.", authorName: "Deepak Choudhary" }
    ]
  },
  {
    name: "PES University",
    location: "Bangalore",
    fees: 350000,
    rating: 4.1,
    overview: "PES University is one of the country's leading teaching and research universities, situated in Bangalore.",
    courses: [
      { name: "B.Tech in Computer Science", duration: "4 Years", fees: 350000 }
    ],
    placements: [
      { avgPackage: "12 LPA", topRecruiters: ["Akamai", "Cisco", "Deloitte"].join(', ') }
    ],
    reviews: [
      { rating: 4.0, comment: "Academically rigorous, but placements are good.", authorName: "Ananya S" }
    ]
  },
  {
    name: "SSN College of Engineering",
    location: "Chennai",
    fees: 150000,
    rating: 4.4,
    overview: "SSN is an autonomous engineering college in Chennai founded by Shiv Nadar. It has a beautiful campus and strong sports culture.",
    courses: [
      { name: "B.E. in Computer Science", duration: "4 Years", fees: 150000 },
      { name: "B.E. in Biomedical Engineering", duration: "4 Years", fees: 150000 }
    ],
    placements: [
      { avgPackage: "9 LPA", topRecruiters: ["HCL", "TCS", "Zoho", "Dow Chemicals"].join(', ') }
    ],
    reviews: [
      { rating: 4.5, comment: "Great balance of academics and extracurriculars.", authorName: "Lakshmi Iyer" }
    ]
  },
  {
    name: "Jawaharlal Nehru Technological University",
    location: "Hyderabad",
    fees: 35000,
    rating: 4.0,
    overview: "JNTUH is a public university located in Hyderabad, known for its massive scale and legacy in technical education.",
    courses: [
      { name: "B.Tech in ECE", duration: "4 Years", fees: 35000 }
    ],
    placements: [
      { avgPackage: "6 LPA", topRecruiters: ["TCS", "Wipro", "Cognizant"].join(', ') }
    ],
    reviews: [
      { rating: 3.9, comment: "Affordable and highly recognized degree.", authorName: "Prashant K" }
    ]
  },
  {
    name: "Maharashtra Institute of Technology",
    location: "Pune",
    fees: 310000,
    rating: 4.1,
    overview: "MIT Pune (MIT-WPU) is a private university offering engineering, management, and design programs.",
    courses: [
      { name: "B.Tech in Petroleum Engineering", duration: "4 Years", fees: 310000 },
      { name: "B.Tech in Civil Engineering", duration: "4 Years", fees: 310000 }
    ],
    placements: [
      { avgPackage: "7 LPA", topRecruiters: ["Reliance", "Shell", "L&T"].join(', ') }
    ],
    reviews: [
      { rating: 4.1, comment: "Beautiful campus in Kothrud, great events.", authorName: "Amit Jadhav" }
    ]
  },
  {
    name: "K. J. Somaiya College of Engineering",
    location: "Mumbai",
    fees: 300000,
    rating: 4.2,
    overview: "KJSCE is an autonomous engineering college located in Vidyavihar, Mumbai, on a massive, lush 50-acre campus.",
    courses: [
      { name: "B.Tech in IT", duration: "4 Years", fees: 300000 }
    ],
    placements: [
      { avgPackage: "10 LPA", topRecruiters: ["Accenture", "Capgemini", "IBM"].join(', ') }
    ],
    reviews: [
      { rating: 4.4, comment: "Amazing campus life, easily the best in Mumbai.", authorName: "Meghna Shah" }
    ]
  },
  {
    name: "Indraprastha Institute of Information Technology",
    location: "Delhi",
    fees: 400000,
    rating: 4.7,
    overview: "IIIT-D is a state university located in Okhla, New Delhi, focusing entirely on CS and allied fields.",
    courses: [
      { name: "B.Tech in CS & Design", duration: "4 Years", fees: 400000 },
      { name: "B.Tech in CS & AI", duration: "4 Years", fees: 400000 }
    ],
    placements: [
      { avgPackage: "21 LPA", topRecruiters: ["Google", "Microsoft", "Goldman Sachs"].join(', ') }
    ],
    reviews: [
      { rating: 4.6, comment: "Extremely heavy workload but incredible outcomes.", authorName: "Rishabh Jain" }
    ]
  }
];

async function main() {
  console.log('Start seeding...');
  
  for (const c of collegesData) {
    const college = await prisma.college.create({
      data: {
        name: c.name,
        location: c.location,
        fees: c.fees,
        rating: c.rating,
        overview: c.overview,
        courses: {
          create: c.courses
        },
        placements: {
          create: c.placements
        },
        reviews: {
          create: c.reviews
        }
      }
    });
    console.log(`Created college with id: ${college.id} and name: ${college.name}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
