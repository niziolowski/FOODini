# FOODini

My first real-life project. App for reducing food waste by tracking product expire date, planning meals and automating shopping list.

## DEMO (work in progress): https://foodini-dev.netlify.app/


No frameworks, only one library (for icons) Everything is in vanilla JS, CSS and HTML.

## Things i plan to learn and practice

- Project planning
- Creating Flowcharts
- API calls
- Error handling
- MVC architecture
- Working with codebase

## Things i learned but didn't plan to

- CSS: BEM naming system (should probably use seperate js-class though)
- CSS: styling complex things is more difficult than i thought
- JS: To remove eventListener with .bind() method on it, the listener has to be assigned to a variable (EXAMPLE: handleClick = this.handleClick.bind(this) )
- API: Limit of requests per minute makes life harder. Initially i had a seperate request for updating every change like adding an ingredient. Then i simplified it by updating whole storage every time (more data is sent every time, also database is less readable). It still isn't enough to make the app usable so i plan to make a sync function that uploads the whole user data as one request every couple of seconds, to keep things syncronized.
