# FOODini

My first project. App for planning meals, preventing food waste and shopping list automation.

DEMO: a link will be here later

## Things i plan to learn

- Project planning
- Creating Flowcharts
- API Uploads
- Error handling
- MVC architecture

## Things i learned but didn't plan to

- CSS: BEM naming system (css gets messy very quickly)
- CSS: styling complex things is more difficult than i thought
- JS: To remove eventListener with .bind() method on it, the listener has to be assigned to a variable (EXAMPLE: handleClick = this.handleClick.bind(this) )
- API: Limit of requests per minute makes life harder. Initially i had a seperate request for updating every change like adding an ingredient. Then i simplified it by updating whole storage every time (more data is sent every time, also database is less readable). It still isn't enough to make the app usable so i plan to make a sync function that uploads the whole user data as one request every couple of seconds, to keep things syncronized.
