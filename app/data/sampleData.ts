export const artists = [
  {
    id: 1,
    name: "Taylor Swift",
    image: "https://placehold.co/400x400",
    albums: [
      {
        id: 1,
        title: "Midnights",
        year: 2022,
        songs: [
          { id: 1, title: "Anti-Hero" },
          { id: 2, title: "Lavender Haze" },
        ]
      },
      {
        id: 2,
        title: "Lover",
        year: 2019,
        songs: [
          { id: 3, title: "Cruel Summer" },
          { id: 4, title: "Lover" },
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Ed Sheeran",
    image: "https://placehold.co/400x400",
    albums: [
      {
        id: 3,
        title: "÷ (Divide)",
        year: 2017,
        songs: [
          { id: 5, title: "Shape of You" },
          { id: 6, title: "Perfect" },
        ]
      },
      {
        id: 4,
        title: "x (Multiply)",
        year: 2014,
        songs: [
          { id: 7, title: "Thinking Out Loud" },
          { id: 8, title: "Photograph" },
        ]
      }
    ]
  }
];

export const stories = [
  {
    id: 1,
    songId: 1,
    songTitle: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    userStory: "This song helped me embrace my imperfections. Every time I listen to it, I remember that everyone has their insecurities.",
    userName: "Sarah J.",
    userImage: "https://placehold.co/50x50",
    date: "2024-01-15",
    likes: 42,
    comments: 8
  },
  {
    id: 2,
    songId: 6,
    songTitle: "Perfect",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    userStory: "This was our first dance at our wedding. Every time it plays, we're transported back to that magical moment.",
    userName: "Michael R.",
    userImage: "https://placehold.co/50x50",
    date: "2024-01-10",
    likes: 35,
    comments: 5
  },
  {
    id: 3,
    songId: 3,
    songTitle: "Cruel Summer",
    artist: "Taylor Swift",
    album: "Lover",
    userStory: "The perfect summer anthem! This song got me through some tough times and now it's my go-to feel-good track.",
    userName: "Emma L.",
    userImage: "https://placehold.co/50x50",
    date: "2024-01-05",
    likes: 28,
    comments: 3
  },
];
