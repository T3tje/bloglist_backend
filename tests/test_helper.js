const Blog = require ('../models/blog')

const initialBlogList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type war",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

initialUserList = [
    {
      username: "mrm1ster",
      name: "T3tje",
      blogs: [ ],
      _id: "61fbd50a38a41c1ff331bb37",
      __v: 0,
      passwordHash: "$2b$10$TivwNb0m5BXytudyJMDXe.WA4xx7qbuW763vIHHKfzrcl9oaPB1WO"
    },
    {
      username: "misTa",
      name: "T1ilman",
      blogs: [ ],
      _id: "61fbd53f38a41c1ff331bb3b",
      __v: 0,
      passwordHash: "$2b$10$TivwNb0m5BXytudyJMDXe.WA4xx7qbuW763vIHHKfzrcl9oaPB1W4"
    },
    {
      username: "misTa2",
      name: "T1ilman",
      blogs: [ ],
      _id: "61fbdb124087229f28ffea08",
      __v: 0,
      passwordHash: "$2b$10$TivwNb0m5BXytudyJMDXe.WA4xx7qbuW763vIHHKfzrcl9oaPB1W3"
    },
    {
      username: "misTa3",
      name: "T1ilman",
      blogs: [ ],
      _id: "61fbdbb639f223a456c94ecf",
      __v: 0,
      passwordHash: "$2b$10$TivwNb0m5BXytudyJMDXe.WA4xx7qbuW763vIHHKfzrcl9oaPB1W2"
    }
  ]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogList,
    initialUserList,
    blogsInDb
}