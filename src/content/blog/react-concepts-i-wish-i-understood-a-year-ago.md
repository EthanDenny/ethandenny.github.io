---
title: "React Concepts I Wish I Understood A Year Ago"
date: "July 31, 2024"
slug: react-concepts-i-wish-i-understood-a-year-ago
---

You might have noticed that many, many people use React. If you haven't noticed, you might not be interested in web dev, and that's okay! For a long time, I wasn't interested either. A big part of that was how intimidating it felt. If you inspect the source of most modern websites, it's an incomprehensible mass of `<div>`'s, which can feel intimidating to beginners - how do you get from `<p>Hello World</p>` to something like [The New York Times](https://www.nytimes.com/)?

It's easy to put together a stylish site using basic HTML elements and a layer of CSS (maybe you even add a dash of JavaScript to keep things fun). But that won't get you a web app, will it? Something is missing. Before my web dev journey began, I heard people talk about React, but I didn't get it. I originally interpreted React as something similar to JQuery, where you write HTML, and then write JavaScript that can change it. It wasn't an attractive option - working in two different "domains" felt wrong. But I was wrong, I was glad I was wrong, and I'll tell you how I was wrong. Obviously, this post is meant for people who feel / felt similarly to me, and will focus more on ideas than code. There are better React tutorials out there than what I could write, so I'll leave the teaching to them.

### Okay, but what is React though?

Depending on who you ask, React is a "library", a "framework", or "the best / worst thing to happen to the web". But if you're just getting into web dev (either as someone new to programming, or a more experienced developer), you don't care about any of this. React's value is that it provides a way to combine JavaScript (or more typically for modern React, [TypeScript](https://www.typescriptlang.org/)), and HTML using some important concepts:

- JSX
- Components
- Rendering and state

I'll assume you know nothing about React, but know the basics of HTML, JS, and CSS. The only thing you need to know right now is that React will have an `App` function that works a bit like `main` in other programming languages:

### JSX

Let's take a look at a code snippet:

```tsx
const App = () => {
  return "Hello";
};
```

If I told you that React would treat the return value of this function as HTML, you might assume you could use something like this to get bold text:

```tsx
const App = () => {
  return "<strong>Hello</strong>";
};
```

And while that might seem convenient, what happens if we'd like to say "hello" in several different languages? We might try an approach like the one below:

```tsx
import { getLocalizedGreeting } from "fake-library";

const App = () => {
  const greeting = getLocalizedGreeting();

  return "<strong>" + greeting + "</strong>";
};
```

This isn't ideal, since we need to build up our page as a massive string, which will get messy fast. Thankfully, the folks working on React invented **JSX** to help make things easier:

```tsx
import { getLocalizedGreeting } from "fake-library";

const App = () => {
  const greeting = getLocalizedGreeting();

  return <strong>{greeting}</strong>;
};
```

How does this work? React uses `.jsx` / `.tsx` files, which are regular JavaScript / TypeScript files that have a syntax extension for handling markup elements (which end up acting almost exactly like HTML). There are a couple of key features:

- Multiple elements need to be wrapped in an empty tag: `<></>`
- Use curly braces `{}` to escape back into JS / TS land
- Any expression can be used
- The `Condition && Element` patterns will only show `Element` if `Condition` is "truthy"
- Additionally, we can go back and forth between JavaScript and markup without restriction
- But be careful: Sometimes attributes have different names, like `onclick` versus `onClick`. Not everything is the same as HTML!

```tsx
import { getLocalizedGreeting, isLoggedIn, askForPassword } from "fake-library";

const App = () => {
  const greeting = getLocalizedGreeting();
  const loggedIn = isLoggedIn();

  return (
    <>
      <strong>{greeting}! Welcome to the login page.</strong>

      <p>{loggedIn ? "You are already logged in." : "Please login:"}</p>

      {!loggedIn && <button onClick={askForPassword}>Log In</button>}
    </>
  );
};
```

So, it's easy to construct HTML elements using JSX. Great! But React has more delightful surprises waiting for us, starting with **components**.

### Components

The astute programmer might have figured this out already - if we can have functions return JSX, then we can probably use this to abstract part of our UI.

```tsx
const App = () => {
  return (
    <>
      <h1>
        Welcome to Bar, the trendy new restaurant managed by yours truly, Foo!
      </h1>

      <ul>
        {Contact("Email", "mailto:foo@bar.biz")}
        {Contact("Phone", "1-555-867-540<9")}
      </ul>
    </>
  );
};

const Contact = (name: string, details: string) => {
  return (
    <li>
      <a href={details}>{name}</a>
    <li>
  );
};
```

But doing things loses the nice syntax that JSX provides. Thankfully, there's a better way! Components let us define custom elements and then pass arguments (commonly known as properties or "props") to them as attributes. Let's see how that cleans up our syntax:

```tsx
const App = () => {
  return (
    <>
      <h1>
        Welcome to Bar, the trendy new restaurant managed by yours truly, Foo!
      </h1>

      <ul>
        <Contact name="Email" details="mailto:foo@bar.biz" />
        <Contact name="Phone" details="1-555-867-5409" />
      </ul>
    </>
  );
};

// We have to pass in arguments as an object, so using an interface makes
// defining the types a little bit cleaner

interface ContactProps {
  name: string,
  details: string
}

const Contact = ({name, details}: ContactProps) => {
  return (
    <li>
      <a href={details}>{name}</a>
    <li>
  );
};
```

Beautiful! That's all you have to know to use components in React. Components are useful anytime you need to duplicate behaviour (like here, where all of our `<a>` tags needed to be wrapped in `<li>` tags, and where we might want to apply some shared styles later). They're also valuable for keeping code seperate - a header is unlikely to appear in multiple places on a single-page application, but it's behaviour can be abstracted away and managed, which is still useful.

### Rendering and State

Now, for the most useful part of React - giving you, the developer, easy tools to manage changes to your application. Let's look at an example:

```tsx
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Click Me!</button>

      <p>You've clicked the button {count} times!</p>

      {count > 100 && <p>Your finger must really hurt...</p>}
    </>
  );
};
```

Whenever React calls `App`, we call that a "render". React is a "reactive" library, so it only updates when it gets a user input, or an event isterner fires, etc. These events can then trigger a "re-render", which update the affected component and their children by calling them again.

Unfortunately, that means an approach relying on regular JavaScript variables (like `let count = 0;`) won't work, because the variables will have their value reset every time we re-render. That also means we'd constantly have to tell React to re-render. Not ideal!

But React has tools that can help. `useState` is a "hook" that gives you two things:

1. A constant (in this case, `count`) that represents the _current_ "state" of the variable.
2. A function (in this case, `setCount`) that we can pass a new value. Whenever we do this, it will trigger a re-render, and the next time the component renders / the function is called, `count` will have the new value we passed.

So, in this case `setCount(count + 1)` is like `count++` in the world of regular JavaScript. The rest of the code then becomes simple: we can read `count` knowing it will reflect the most current state value. However, it doesn't always do that. State has one tiny kink - since `count` is constant and updating it requires a re-render, the state won't change until the next render. Consider this example:

```tsx
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);

    // This won't work as expected!
    console.log(`New count value: {count}`);
  };

  return (
    <>
      <button onClick={updateCount}>Click Me!</button>

      <p>You've clicked the button {count} times!</p>

      {count > 100 && <p>Your finger must really hurt...</p>}
    </>
  );
};
```

The first time you click the button, you'll see this: "New count value: 0". But that's not right, that's the old value. Instead, we should have defined `updateCount` like this:

```tsx
const updateCount = () => {
  const newCount = count + 1;
  setCount(newCount);
  console.log(`New count value: {newCount}`);
};
```

And that's it! Now you can store values that don't change for each re-render.

### Conclusion

React isn't hard! It can be weird, but give it a try. Once you understand the basics, it's easy to start building a more complete knowledge by learning piece-by-piece. The [React Docs](https://react.dev/reference/react) are a stellar source of knowledge, and reading them should be one of the first steps for anyone trying to learn modern React.
