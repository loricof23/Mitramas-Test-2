import axios from 'axios';

export default axios.create({
  baseURL: 'https://mitramas-test.herokuapp.com/',
  headers: {
    authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9taXRyYW1hcy10ZXN0Lmhlcm9rdWFwcC5jb21cL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjQwMjc2NjQ3LCJleHAiOjE2NDAyODAyNDcsIm5iZiI6MTY0MDI3NjY0NywianRpIjoieEhiUE9hTDM3NUR3VWVLaiIsInN1YiI6NTUsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.5GrqNPYNhLHNTitROf4X0UoVGbF4gZ0JDVQASZ3KDkg",
  }
});