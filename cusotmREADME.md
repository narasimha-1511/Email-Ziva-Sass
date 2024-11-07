
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


#

Reacts useState is temporary gets removed when you reload the page ,
so instead of this use package ```usehooks-ts```
this stores the data in the local storage and very handy to get the data
from here use get a replace ment of use State with -> useLocalStorage

```
ex: const [accoutnID , setAccountId] = useLocalStorage('accountId', '')
```

this stays persistent in the database


#

using a new library --- > 

```
react-letter
```

```
pnpm install react-letter
```


#

one more crazy library ''k-bar''

```
pnpm install kbar
```


#

using another crazy library for the reply box

known as tiptap https://tiptap.dev/

very easy to use and thsi is crazy

```
pnpm install @tiptap/react @tiptap/starter-kit @tiptap/extenstion-text
```

read the docs this is a crazy library


#

new library for the AI composer

```
pnpm install @ai-sdk/openai
pnpm install ai
```


#

new library for converting the body html of email to text

```
pnpm install turndown @types/turndown
``` 

we send the email in html format so we need to convert it to text
like it will convert to the markdown format

