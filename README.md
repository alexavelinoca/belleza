## Instructions for running the application locally

First, run the development server:

1. `npm install`  
2. `npm run dev`  
3. Open [http://localhost:3000](http://localhost:3000)

That's it.

---

## Link to the deployed application (if applicable)

Deployed with Vercel:  
[https://belleza-zeta.vercel.app/]

---

## Total time invested

I guess a total of 30 hours, I'm exhausted but happy.

---

## Details on any AI tools used (if applicable), pros and cons and your findings

Well I was basically using Chat GPT as a consultor for code optimization and Cursor to develop with its AI autocomplete.

It's important to mention that images are free of copyright because I'm using them from another app I've developed months ago with NextJS:  
[https://unplash-clone-nine.vercel.app/](https://unplash-clone-nine.vercel.app/)  
This app uses the Pexels API.

---

## Features you would implement with more time

If I had more time, I’d focus on making the app feel more real and scalable:

- Hook it up to a real backend or at least a proper mock with persistence, so bookings aren’t just stored locally.  
- Validate availability again before confirming to avoid race conditions or double bookings in edge cases.  
- Move availability logic to a shared layer or backend function to make it scalable (for things like recurring bookings or multi-service sessions).  
- Add Luxon or date-fns-tz to handle time zones properly in case the app grows across regions.  
- Add authentication with NextAuth, so users can log in and manage their own bookings.  
- Show a personal appointment history once the user is logged in.  
- Replace static image previews with a real image carousel for a smoother UI.  
- Manage user roles and add a service provider role to track how the business is performing, see their bookings, and manage availability.

Eventually I'll be finishing them.
