
```
 pnpx prisma db push
 ``` 

while created a new Models on Prisma

this keeps the db in sync with the data

``` 
pnpx prisma studio 
```

locally opens a modal to check everything in the modals stuff

#
 writeen a new src/playground.ts writing the postgres querioes to add a dummy user in the database

to implement is use command -->

``` pnpx tsx src/playground.ts ```

before that --> ```pnpm add -D tsx```

#

creating a webhook for to give to clerk

to send the user to our database once created

creating a proxy tunnel to expose the web hook for now

``` pnpx untun@latest tunnel http://localhost:300  ```

#

after creating a new account you get redirected to 
the mail box , while getting redirected we want to 
run the email sync , how do you do this ??

using a new package for this ``` @vercel/functons  ```
```
there is a function called 'waitUntil' 
in this package with this we extend the life time of that 
particuklar asynchronus code
```



