https://www.youtube.com/watch?v=I6ypD7qv3Z8&t=0s

0:00:00 Intro  
0:02:02 Node/TypeScript Setup  
    tsconfig.json
    constants.ts 
0:11:29 MikroORM Setup
    mikro-orm.config.ts  
0:39:50 Apollo Server Express Setup  
0:47:32 MikroORM TypeGraphQL Crud  
1:09:23 Register Resolver  
1:23:27 Login Resolver  
1:41:11 Session Authentication  
2:03:06 Sessions Explained  
    `req.session.userId = user.id`

        { userId: 1 } → send to redis

    2. redis maps a key to { userId: 1, …}

    3. express-session sets cookie on browser, cookie val is signed key from above

    4. user request → cookie sent to server where its decrypted using `secret` and

    5. sent to redis 
2:08:24 Next.js + Chakra // init frontend 
2:32:36 URQL Basics  
2:46:07 GraphQL Code Generator  
2:53:16 Register Error Handling  
3:10:57 NavBar  
3:26:21 URQL Cache Updates  
3:39:33 Logout  
3:50:11 Next.js URQL SSR  
4:12:34 Forgot Password  
4:35:31 Change Password  
5:22:14 Why Switching to TypeORM  
5:25:27 Switching to TypeORM  
5:50:44 Many to One  
6:02:26 Global Error Handling  
6:24:15 Next.js Query Params  
6:31:26 URQL Pagination Start  
6:50:02 Adding Mock Data  
7:01:19 Chakra Styling  
7:12:37 More URQL Pagination  
7:32:07 Fix Mock Data  
7:40:41 URQL Pagination Has More  
8:00:53 GraphQL Fetching Relationships  
8:18:43 GraphQL Field Permissions  
8:23:16 Many to Many  
8:46:46 Invalidate Queries  
9:00:49 Upvote UI  
9:23:11 Change Vote  
9:31:57 Write Fragments  
9:39:00 Vote Status  
9:51:57 SSR Cookie Forwarding  
10:04:08 Single Post  
10:21:55 Delete Post  
10:38:19 Edit Post  
11:09:23 DataLoader  
11:40:06 Cache Reset  
11:43:55 Deploy Backend 
11:52:56 Docker 
12:03:29 Environment Variables 
12:14:55 DB Migrations 
12:21:40 Docker Hub 
12:28:23 DNS 
12:36:39 Deploy Frontend 
12:57:28 Fix Cookie 
13:03:07 Switch to Apollo