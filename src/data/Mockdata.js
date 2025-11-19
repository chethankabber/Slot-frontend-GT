export const mockAdmin = {
  name: 'Admin User',
  email: 'admin@gmail.com',
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
                date: "2025-01-12",
                returnDate: "2025-01-18",
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
                date: "2025-01-15",
                returnDate: "2025-01-20",
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
                date: "2025-01-12",
                returnDate: "2025-01-18",
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
                date: "2025-01-14",
                returnDate: "2025-01-19",
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
                date: "2025-01-14",
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
              { user: "Mike Johnson", qty: 1, date: "2025-01-12", returnDate: "2025-01-18" }
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
              { user: "Sarah Williams", qty: 1, date: "2025-01-14", returnDate: "2025-01-19" }
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
              { user: "Sarah Williams", qty: 1, date: "2025-01-14", returnDate: "2025-01-19" }
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
    itemType: "Non-returnable",
    returnDate: null,
    message: "Need permanent access to the equipment.",

    dateRequested: "2025-01-11",
    status: "Pending",
  },
];

