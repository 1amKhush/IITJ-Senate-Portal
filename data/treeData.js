export const treeData = {
  // First layer - Main bodies (widely spaced)
  mainBodies: [
        {
      id: 'sac',
      name: 'SAC',
      fullName: 'Student Activity Council',
      holder: 'Manas Chechani',
      type: 'main',
      position: { x: -1750, y: 0 }
    },
    {
      id: 'ss',
      name: 'SS',
      fullName: 'Student Senate',
      holder: 'Tharakdatta Hegde',
      type: 'main',
      position: { x: 800, y: 0 }
    },
    {
      id: 'acac',
      name: 'ACAC',
      fullName: 'Academic Co-Curricular and Activity Council',
      holder: 'Yash Golani',
      type: 'main',
      position: { x: 2200, y: 0 }
    },
  ],

  // Second layer - Boards (widely spaced with proper grouping)
  boards: [
    // ACAC Boards (left section: x from -1000 to -200)
    {
      id: 'cccd',
      name: 'CCCD',
      fullName: 'CCCD Student Team',
      holder: '',
      parent: 'sac',
      type: 'board',
      position: { x: -3000, y: 200 }
    },
    {
      id: 'bac',
      name: 'BAC',
      fullName: 'Board of Art & Culture',
      holder: 'Vaibhav Singh',
      parent: 'sac',
      type: 'board',
      position: { x: -2500, y: 200 }
    },
    {
      id: 'bss',
      name: 'BSS',
      fullName: 'Board of Student Sports',
      holder: 'Sudhanshu Tamhankar',
      parent: 'sac',
      type: 'board',
      position: { x: -2000, y: 200 }
    },
    {
      id: 'bsw',
      name: 'BSW',
      fullName: 'Board of Student Welfare',
      holder: '',
      parent: 'sac',
      type: 'board',
      position: { x: -1500, y: 200 }
    },
    {
      id: 'bla',
      name: 'BLA',
      fullName: 'Board of Literary Affairs',
      holder: 'Anshit Agarwal',
      parent: 'sac',
      type: 'board',
      position: { x: -1000, y: 200 }
    },
    {
      id: 'bha',
      name: 'BHA',
      fullName: 'Board of Hostel Affairs',
      holder: 'Harsh Kumar',
      parent: 'sac',
      type: 'board',
      position: { x: -500, y: 200 }
    },

    // SAC Boards (right section: x from 1800 to 2600)
    {
      id: 'bai',
      name: 'BAI',
      fullName: 'Board of Academic Interaction',
      holder: 'Krish Teckchandani',
      parent: 'acac',
      type: 'board',
      position: { x: 1500, y: 200 }
    },
    {
      id: 'bds',
      name: 'BDS',
      fullName: 'Board of Departmental Societies',
      holder: 'Sourav Chahar',
      parent: 'acac',
      type: 'board',
      position: { x: 2000, y: 200 }
    },
    {
      id: 'bcd',
      name: 'BCD',
      fullName: 'Board of Career Development',
      holder: 'Anchitya Kumar',
      parent: 'acac',
      type: 'board',
      position: { x: 2500, y: 200 }
    },
    {
      id: 'saa',
      name: 'SAA',
      fullName: 'Society for Alumni Affairs',
      holder: 'Raghuveer Kulkarni',
      parent: 'acac',
      type: 'board',
      position: { x: 3000, y: 200 }
    },
    {
      id: 'bie',
      name: 'BIE',
      fullName: 'Board of Innovation and Entrepreneurship',
      holder: 'Vyom Shah',
      parent: 'acac',
      type: 'board',
      position: { x: 3500, y: 200 }
    },
    {
      id: 'bcca',
      name: 'BCCA',
      fullName: 'Board of Co-Curricular Affairs',
      holder: 'Sambhav Jha',
      parent: 'acac',
      type: 'board',
      position: { x: 4000, y: 200 }
    }
  ],

  // Third layer - Clubs and Committees (organized in proper grid format)
  clubs: [
    // CCCD Clubs (x: -3000 area) - No specific clubs yet
    
    // BAC Clubs (x: -2500 area) - 3x3 grid
    {
      id: 'atliers',
      name: 'Atliers',
      fullName: 'Atliers',
      holder: '',
      parent: 'bac',
      type: 'club',
      position: { x: -2800, y: 400 }
    },
    {
      id: 'framex',
      name: 'FrameX',
      fullName: 'FrameX',
      holder: '',
      parent: 'bac',
      type: 'club',
      position: { x: -2600, y: 400 }
    },
    {
      id: 'raw',
      name: 'Raw',
      fullName: 'Raw',
      holder: '',
      parent: 'bac',
      type: 'club',
      position: { x: -2400, y: 400 }
    },
    {
      id: 'designerds',
      name: 'Designerds',
      fullName: 'Designerds',
      holder: '',
      parent: 'bac',
      type: 'club',
      position: { x: -2800, y: 500 }
    },
    {
      id: 'shutterbugs',
      name: 'ShutterBugs',
      fullName: 'ShutterBugs',
      holder: '',
      parent: 'bac',
      type: 'club',
      position: { x: -2600, y: 500 }
    },
    {
      id: 'tgt',
      name: 'TGT',
      fullName: 'The Groove Theory',
      holder: '',
      parent: 'bac',
      type: 'club',
      position: { x: -2400, y: 500 }
    },
    {
      id: 'dramebaaz',
      name: 'Dramebaaz',
      fullName: 'Dramebaaz',
      holder: '',
      parent: 'bac',
      type: 'club',
      position: { x: -2800, y: 600 }
    },
    {
      id: 'sangam',
      name: 'Sangam',
      fullName: 'Sangam',
      holder: '',
      parent: 'bac',
      type: 'club',
      position: { x: -2600, y: 600 }
    },

    // BSS Clubs (x: -2000 area) - 3 columns, 5 rows grid for sports societies
    {
      id: 'weightlifting',
      name: 'Weightlifting Society',
      fullName: 'Weightlifting Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -2200, y: 400 }
    },
    {
      id: 'esports',
      name: 'E-Sports',
      fullName: 'E-Sports Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -2000, y: 400 }
    },
    {
      id: 'cricket',
      name: 'Cricket Soc',
      fullName: 'Cricket Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -1800, y: 400 }
    },
    {
      id: 'squash',
      name: 'Squash Soc',
      fullName: 'Squash Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -2200, y: 500 }
    },
    {
      id: 'basketball',
      name: 'Basketball Soc',
      fullName: 'Basketball Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -2000, y: 500 }
    },
    {
      id: 'badminton',
      name: 'Badminton Soc',
      fullName: 'Badminton Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -1800, y: 500 }
    },
    {
      id: 'athletics',
      name: 'Athletics Soc',
      fullName: 'Athletics Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -2200, y: 600 }
    },
    {
      id: 'selfdefence',
      name: 'Self Defence Club',
      fullName: 'Self Defence Club',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -2000, y: 600 }
    },
    {
      id: 'kabaddi',
      name: 'Kabaddi Soc',
      fullName: 'Kabaddi Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -1800, y: 600 }
    },
    {
      id: 'lawntennis',
      name: 'Lawn Tennis Soc',
      fullName: 'Lawn Tennis Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -2200, y: 700 }
    },
    {
      id: 'cycling',
      name: 'Cycling Soc',
      fullName: 'Cycling Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -2000, y: 700 }
    },
    {
      id: 'volleyball',
      name: 'VolleyBall Soc',
      fullName: 'Volleyball Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -1800, y: 700 }
    },
    {
      id: 'hockey',
      name: 'Hockey Soc',
      fullName: 'Hockey Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -2200, y: 800 }
    },
    {
      id: 'chess',
      name: 'Chess Soc',
      fullName: 'Chess Society',
      holder: '',
      parent: 'bss',
      type: 'club',
      position: { x: -2000, y: 800 }
    },
    // BSW Clubs (x: -1500 area) - 2x1 grid
    {
      id: 'swc',
      name: 'SWC',
      fullName: 'Student Welfare Committee',
      holder: '',
      parent: 'bsw',
      type: 'club',
      position: { x: -1550, y: 400 }
    },
    {
      id: 'festival-committee',
      name: 'Festival Committee',
      fullName: 'Festival Committee',
      holder: '',
      parent: 'bsw',
      type: 'club',
      position: { x: -1350, y: 400 }
    },

    // BLA Clubs (x: -1000 area) - 3x1 grid
    {
      id: 'quizsoc',
      name: 'QuizSoc',
      fullName: 'Quiz Society',
      holder: '',
      parent: 'bla',
      type: 'club',
      position: { x: -1150, y: 400 }
    },
    {
      id: 'litsoc',
      name: 'LitSoc',
      fullName: 'Literature Society',
      holder: '',
      parent: 'bla',
      type: 'club',
      position: { x: -950, y: 400 }
    },
    {
      id: 'pheme',
      name: 'Pheme',
      fullName: 'Pheme',
      holder: '',
      parent: 'bla',
      type: 'club',
      position: { x: -750, y: 400 }
    },

    // BHA Clubs (x: -500 area) - 2x1 grid
    {
      id: 'dining-mess',
      name: 'Dining and Mess Committee',
      fullName: 'Dining and Mess Committee',
      holder: '',
      parent: 'bha',
      type: 'club',
      position: { x: -550, y: 400 }
    },
    {
      id: 'hostel-secretaries',
      name: 'Hostel General Secretaries',
      fullName: 'Hostel General Secretaries',
      holder: '',
      parent: 'bha',
      type: 'club',
      position: { x: -350, y: 400 }
    },

    // SS Committees (center area: x: 800) - 3x3 grid
    {
      id: 'special-invitee',
      name: 'Special Invitee, Senate',
      fullName: 'Special Invitee, Senate',
      holder: '',
      parent: 'ss',
      type: 'committee',
      position: { x: 500, y: 400 }
    },
    {
      id: 'cccd-committee',
      name: 'Member, CCCD',
      fullName: 'Member, Committee for Celebration of Commencement Days (CCCD)',
      holder: '',
      parent: 'ss',
      type: 'committee',
      position: { x: 700, y: 400 }
    },
    {
      id: 'vehicle-committee',
      name: 'Member, Vehicle Committee',
      fullName: 'Member, Committee to Prepare the Guidelines for Campus Vehicle Possession and Driving Policy',
      holder: '',
      parent: 'ss',
      type: 'committee',
      position: { x: 900, y: 400 }
    },
    {
      id: 'dining-hall-committee',
      name: 'Member, User Committee',
      fullName: 'Member, User Committee Meeting for Construction of Dining Hall',
      holder: '',
      parent: 'ss',
      type: 'committee',
      position: { x: 500, y: 600 }
    },
    {
      id: 'medical-committee',
      name: 'Member, Medical Committee',
      fullName: 'Member, Medical Services Users committee',
      holder: '',
      parent: 'ss',
      type: 'committee',
      position: { x: 700, y: 600 }
    },
    {
      id: 'disciplinary-committee',
      name: 'Member, Disciplinary Committee',
      fullName: 'Member, Disciplinary Committee',
      holder: '',
      parent: 'ss',
      type: 'committee',
      position: { x: 1000, y: 600 }
    },
    {
      id: 'security-committee',
      name: 'Member, Security Committee',
      fullName: 'Member, Security and transport Advisory Committee',
      holder: '',
      parent: 'ss',
      type: 'committee',
      position: { x: 400, y: 800 }
    },
    {
      id: 'scholarships-committee',
      name: 'Member, Student Scholarships',
      fullName: 'Member, Student Scholarships and Prizes Committee',
      holder: '',
      parent: 'ss',
      type: 'committee',
      position: { x: 700, y: 800 }
    },
    {
      id: 'consultative-committee',
      name: 'Member, Joint Consultative Committee',
      fullName: 'Member, Joint Consultative Committee',
      holder: '',
      parent: 'ss',
      type: 'committee',
      position: { x: 1000, y: 800 }
    },

    // BAI Clubs (x: 1800 area) - 1x1 grid
    {
      id: 'sr-cr',
      name: 'SR and CR',
      fullName: 'Student Representatives and Class Representatives',
      holder: '',
      parent: 'bai',
      type: 'club',
      position: { x: 1500, y: 400 }
    },

    // BDS Clubs (x: 2300 area) - 1x1 grid
    {
      id: 'dept-representatives',
      name: 'Departmental Representatives',
      fullName: 'Departmental Representatives',
      holder: '',
      parent: 'bds',
      type: 'club',
      position: { x: 2000, y: 400 }
    },

    // BCD Clubs (x: 2800 area) - 2x1 grid
    {
      id: 'cdc',
      name: 'CDC',
      fullName: 'Career Development Cell',
      holder: '',
      parent: 'bcd',
      type: 'club',
      position: { x: 2400, y: 400 }
    },
    {
      id: 'cgc',
      name: 'CGC',
      fullName: 'Career Guidance Cell',
      holder: '',
      parent: 'bcd',
      type: 'club',
      position: { x: 2600, y: 400 }
    },

    // SAA Clubs (x: 3300 area) - No specific clubs yet

    // BIE Clubs (x: 3800 area) - 2x1 grid
    {
      id: 'ecell',
      name: 'E-Cell',
      fullName: 'Entrepreneurship Cell',
      holder: '',
      parent: 'bie',
      type: 'club',
      position: { x: 3400, y: 400 }
    },
    {
      id: 'iic',
      name: 'IIC',
      fullName: 'Institution Innovation Council',
      holder: '',
      parent: 'bie',
      type: 'club',
      position: { x: 3600, y: 400 }
    },

    // BCCA Clubs (x: 4300 area) - 3x3 grid
    {
      id: 'raid',
      name: 'RAID',
      fullName: 'RAID',
      holder: '',
      parent: 'bcca',
      type: 'club',
      position: { x: 3800, y: 400 }
    },
    {
      id: 'devlup',
      name: 'Devlup Labs',
      fullName: 'Devlup Labs',
      holder: '',
      parent: 'bcca',
      type: 'club',
      position: { x: 4000, y: 400 }
    },
    {
      id: 'robotics',
      name: 'Robotics Soc',
      fullName: 'Robotics Society',
      holder: '',
      parent: 'bcca',
      type: 'club',
      position: { x: 4200, y: 400 }
    },
    {
      id: 'inside',
      name: 'INSIDE',
      fullName: 'INSIDE',
      holder: '',
      parent: 'bcca',
      type: 'club',
      position: { x: 3800, y: 600 }
    },
    {
      id: 'nexus',
      name: 'Nexus',
      fullName: 'Nexus',
      holder: '',
      parent: 'bcca',
      type: 'club',
      position: { x: 4000, y: 600 }
    },
    {
      id: 'programming-club',
      name: 'Programming Club',
      fullName: 'Programming Club',
      holder: '',
      parent: 'bcca',
      type: 'club',
      position: { x: 4200, y: 600 }
    },
    {
      id: 'automobile',
      name: 'Automobile Soc',
      fullName: 'Automobile Society',
      holder: '',
      parent: 'bcca',
      type: 'club',
      position: { x: 3600, y: 800 }
    },

    // ACAC committees
    {
      id: 'international-relations',
      name: 'International Relations Student Team',
      fullName: 'International Relations Student Team',
      holder: '',
      parent: 'acac',
      type: 'committee',
      position: { x: 2200, y: 800 }
    }
  ]
};

// Helper function to get all nodes
export const getAllNodes = () => {
  const { mainBodies, boards, clubs } = treeData;
  return [...mainBodies, ...boards, ...clubs];
};

// Helper function to get edges (connections)
export const getEdges = () => {
  const edges = [];
  const { boards, clubs } = treeData;
  
  // Connect boards to main bodies
  boards.forEach(board => {
    edges.push({
      id: `${board.parent}-${board.id}`,
      source: board.parent,
      target: board.id,
      type: 'smoothstep',
      style: { 
        stroke: '#6B7280', 
        strokeWidth: 2,
      },
      markerEnd: {
        type: 'arrowclosed',
        color: '#6B7280',
      },
    });
  });
  
  // Connect clubs to boards
  clubs.forEach(club => {
    edges.push({
      id: `${club.parent}-${club.id}`,
      source: club.parent,
      target: club.id,
      type: 'smoothstep',
      style: { 
        stroke: '#9CA3AF', 
        strokeWidth: 1.5,
      },
      markerEnd: {
        type: 'arrowclosed',
        color: '#9CA3AF',
      },
    });
  });
  
  return edges;
};
