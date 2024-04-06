export const sampleChat = [
  {
    avatar: [
      "https://imgs.search.brave.com/m5Kot1-gQPR8gwyj1uAFF-PnCTpEL5azvNHDRbO8Mr0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpHVTNNV1Zt/TUdNdFkyWXlOQzAw/Tm1WaExUaGtZak10/WldKaE1qRXpOR0k0/WXpnMlhrRXlYa0Zx/Y0dkZVFYVnlOakl6/TWpneE1EWUAuanBn",
    ],
    name: "Saran",
    _id: "1",
  },
  {
    avatar: [
      "https://imgs.search.brave.com/m5Kot1-gQPR8gwyj1uAFF-PnCTpEL5azvNHDRbO8Mr0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpHVTNNV1Zt/TUdNdFkyWXlOQzAw/Tm1WaExUaGtZak10/WldKaE1qRXpOR0k0/WXpnMlhrRXlYa0Zx/Y0dkZVFYVnlOakl6/TWpneE1EWUAuanBn",
    ],
    name: "Bonkaa",
    _id: "2",
  },
];
export const sampleNotification = [
  {
    sender: {
      avatar: [
        "https://imgs.search.brave.com/m5Kot1-gQPR8gwyj1uAFF-PnCTpEL5azvNHDRbO8Mr0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpHVTNNV1Zt/TUdNdFkyWXlOQzAw/Tm1WaExUaGtZak10/WldKaE1qRXpOR0k0/WXpnMlhrRXlYa0Zx/Y0dkZVFYVnlOakl6/TWpneE1EWUAuanBn",
      ],
      name: "Saran",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: [
        "https://imgs.search.brave.com/m5Kot1-gQPR8gwyj1uAFF-PnCTpEL5azvNHDRbO8Mr0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpHVTNNV1Zt/TUdNdFkyWXlOQzAw/Tm1WaExUaGtZak10/WldKaE1qRXpOR0k0/WXpnMlhrRXlYa0Zx/Y0dkZVFYVnlOakl6/TWpneE1EWUAuanBn",
      ],
      name: "Bonkaa",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "Public ID 1",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "Content message.....",
    _id: "random-id-hai",
    sender: {
      _id: "user._id",
      name: "Bonka",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },

  {
    attachments: [
      {
        public_id: "Public ID 2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "Content message 2.....",
    _id: "random-id-hai2",
    sender: {
      _id: "rdksfkds",
      name: "Bonka",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
];

export const dashboardData = {
  users: [
    {
      name: "Brunieee",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "Brunie_22",
      friends: 20,
      group: 5,
    },
    {
      name: "Mithuuuu",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "Mithuuu_22",
      friends: 20,
      group: 8,
    },
  ],
  chats: [
    {
      name: "Kutto ka GC",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,

      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Doraemon",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "Billio ka GC",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: true,

      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Nobita",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],

  messages: [
    {
      attachments: [],
      content: "Apun ka message hai",
      _id: "randomId",
      sender: {
       avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Dappi singh",
      },
      chat: "chatId", 
      groupChat: false,

      createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
      attachments: [
        {
          public_id: "asuoi2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        }
      ],
      content: "Apun ka message hai firse",
      _id: "randomIdAgain",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",

        name: "Pappi singh",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ],
};
