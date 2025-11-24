export const mockAdmin = {
  name: 'Admin User',
  email: 'admin@gmail.com',
};

export const mockManager = {
  name: "Manoj",
  email: "manager@gmail.com",
};

// data/Mockdata.js
export const mockContainers = [
  {
    id: "1",
    name: "Rack C1",
    slots: [
      {
        slotNumber: 1,
        items: [
          {
            id: "1",
            name: "MacBook Air",
            quantity: 10,
            isReturnable: true,
            taken: [
              {
                user: "Mike Johnson",
                qty: 1,
                date: "2025-07-12",
                returnDate: "2025-10-29",
              }
            ]
          }
        ]
      },
      { slotNumber: 2, items: [] },

      {
        slotNumber: 3,
        items: [
          {
            id: "2",
            name: "Laptop Dell XP5",
            quantity: 5,
            isReturnable: true,
            taken: [
              {
                user: "John Doe",
                qty: 1,
                date: "2025-06-15",
                returnDate: "2025-011-09",
              }
            ]
          }
        ]
      },

      { slotNumber: 4, items: [] },
      { slotNumber: 5, items: [] },

      {
        slotNumber: 6,
        items: [
          {
            id: "3",
            name: "iPad Pro",
            quantity: 4,
            isReturnable: false,
            taken: [
              {
                user: "Jane Smith",
                qty: 1,
                date: "2025-01-10",
                returnDate: null,
              }
            ]
          }
        ]
      },

      { slotNumber: 7, items: [] },
      { slotNumber: 8, items: [] },
      { slotNumber: 9, items: [] },
      { slotNumber: 10, items: [] },
      { slotNumber: 11, items: [] },
      { slotNumber: 12, items: [] },
    ]
  },

  {
    id: "2",
    name: "Rack C2",
    slots: [
      {
        slotNumber: 1,
        items: [
          {
            id: "1",
            name: "MacBook Air",
            quantity: 8,
            isReturnable: true,
            taken: [
              {
                user: "Mike Johnson",
                qty: 1,
                date: "2025-04-12",
                returnDate: "2025-10-10",
              }
            ]
          }
        ]
      },
      { slotNumber: 2, items: [] },
      { slotNumber: 3, items: [] },
      { slotNumber: 4, items: [] },
      { slotNumber: 5, items: [] },

      {
        slotNumber: 6,
        items: [
          {
            id: "4",
            name: "Surface Pro",
            quantity: 6,
            isReturnable: true,
            taken: [
              {
                user: "Sarah Williams",
                qty: 1,
                date: "2025-02-14",
                returnDate: "2025-03-09",
              }
            ]
          }
        ]
      },

      { slotNumber: 7, items: [] },
      { slotNumber: 8, items: [] },
      { slotNumber: 9, items: [] },
      { slotNumber: 10, items: [] },
      { slotNumber: 11, items: [] },

      {
        slotNumber: 12,
        items: [
          {
            id: "5",
            name: "Surface Pro",
            quantity: 3,
            isReturnable: true,
            taken: [
              {
                user: "Sarah Williams",
                qty: 1,
                date: "2024-12-14",
                returnDate: "2025-01-19",
              }
            ]
          }
        ]
      },
    ]
  },

  {
    id: "3",
    name: "Rack C3",
    slots: [
      {
        slotNumber: 1,
        items: [
          {
            id: "1",
            name: "MacBook Air",
            quantity: 10,
            isReturnable: true,
            taken: [
              { user: "Mike Johnson", qty: 1, date: "2025-04-12", returnDate: "2025-07-08" }
            ]
          }
        ]
      },

      { slotNumber: 2, items: [] },
      { slotNumber: 3, items: [] },
      { slotNumber: 4, items: [] },
      { slotNumber: 5, items: [] },

      {
        slotNumber: 6,
        items: [
          {
            id: "4",
            name: "Surface Pro",
            quantity: 4,
            isReturnable: true,
            taken: [
              { user: "Sarah Williams", qty: 1, date: "2025-01-14", returnDate: "2025-02-11" }
            ]
          }
        ]
      },

      { slotNumber: 7, items: [] },
      { slotNumber: 8, items: [] },

      {
        slotNumber: 9,
        items: [
          {
            id: "5",
            name: "Surface Pro",
            quantity: 2,
            isReturnable: true,
            taken: [
              { user: "Sarah Williams", qty: 1, date: "2025-01-14", returnDate: "2025-02-19" }
            ]
          }
        ]
      },

      {
        slotNumber: 10,
        items: [
          {
            id: "6",
            name: "Surface Pro",
            quantity: 3,
            isReturnable: true,
            taken: [
              { user: "Sarah Williams", qty: 1, date: "2025-01-14", returnDate: "2025-01-19" }
            ]
          }
        ]
      },

      { slotNumber: 11, items: [] },
      { slotNumber: 12, items: [] },
    ]
  }
];


export const mockPendingUsers = [
  {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    registeredDate: '2025-01-10',
  },
  {
    id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    registeredDate: '2025-01-11',
  },
  {
    id: '3',
    name: 'Charlie',
    email: 'charlie@example.com',
    registeredDate: '2025-01-12',
  },

];


export const mockPermissionRequests = [
  {
    id: "101",
    userName: "Ramesh Kumar",
    userEmail: "alice@example.com",

    
    itemName: "A12 Tools",
    quantity: 3,
    itemType: "Returnable", // Returnable / Non-returnable
    returnDate: "2025-01-20", // only if returnable
    whichProject: "Slot Management",
    message: "Need tools for maintenance work.",

    dateRequested: "2025-01-10",
    status: "Pending",
  },
  {
    id: "102",
    userName: "Arjun J",
    userEmail: "bob@example.com",

    itemName: "Motherboard",
    quantity: 2,
    whichProject: "Slot Management",
    itemType: "Non-returnable",
    returnDate: null,
    message: "Need permanent access to the equipment.",

    dateRequested: "2025-01-11",
    status: "Pending",
  },
  {
    id: "103",
    userName: "Raju JK",
    userEmail: "rajus@example.com",

    itemName: "Register",
    quantity: 2,
    whichProject: "Slot Management",
    itemType: "Returnable",
    returnDate: "2025-03-11",
    message: "Need permanent access to the equipment.",

    dateRequested: "2025-02-21",
    status: "Pending",
  },
    {
    id: "104",
    userName: "Kumar",
    userEmail: "emp@example.com",
    itemName: "A12 Tools",
    quantity: 6,
    itemType: "Returnable",
    returnDate: "2025-04-20",
    whichProject: "Slot Management",
    message: "Need tools for work.",
    dateRequested: "2025-03-11",
    status: "Approved"   // 👈 FORCE APPROVED
  },
  {
    id: "105",
    userName: "Abhi",
    userEmail: "abhhui@example.com",
    itemName: "A12 Tools",
    quantity: 12,
    itemType: "Returnable",
    returnDate: "2025-07-09",
    whichProject: "Management",
    message: "Need tools for maintenance work.",
    dateRequested: "2025-05-21",
    status: "Approved"   // 👈 FORCE APPROVED
  },
  
];

export const mockUsers = [
  {
    id: "u1",
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    phone: "9876543210",
    role: "User",
  },
  {
    id: "u2",
    name: "Sharma",
    email: "sharama@example.com",
    phone: "9123456780",
    role: "User",
  },
  {
    id: "u3",
    name: "chethan",
    email: "cheth@example.com",
    phone: "9988776655",
    role: "User",
  },
  {
    id: "u4",
    name: "Darshan",
    email: "user@gmail.com",
    phone: "9876543210",
    role: "user",
  },
];


// ----- Dummy Borrowed Items (TEMPORARY) -----
export const dummyBorrowedItems = [
  {
    itemName: "MacBook Air",
    returnDate: "2025-03-18",
    daysLeft: 4,
  },
  {
    itemName: "Surface Pro",
    returnDate: "2025-02-10",
    daysLeft: -2,
  },
];

