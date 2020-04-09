# <img src='readme/Journo.svg' width='400'>

<h1>General Assembly Project Four: Journo</h1>

<h2>Goal: Build a full-stack RESTful app using Python Django REST Framework to serve your data from a PostgreSQL database to a React front-end.</h2>

| Contents                      |                |
| ------------------------------|----------------|
|1. [Overview](#overview)       |6. [Future content](#future)
|2. [Brief](#brief)             |7. [Wins](#wins)
|3. [Technologies used](#tech)  |8. [Blockers](#blockers)
|4. [App](#app)                 |9. [Bugs](#bugs)
|5. [Approach](#approach)       |10. [Future learnings](#learn)

<h2 name='overview'>Overview</h2>

<h3>Introduction</h3>

Journo is a travel diary app that allows you to search via a map of the world yours and other users trips and adventures. The app uses secure routes meaning users must be logged in to view trips and users in detail, and create, edit, and delete their own trips. The app has 2 models and includes React Hooks. Although I saw the huge benefits of working within a team, I decided to work solo on this project because I wanted to learn about the parts I didn't build on the previous project such as security, forms, Cloudinary, logining in, registering and editing profiles.

<h3>Deployment</h3>

The app is deployed on Heroku and can be found here: https://journo-ga.herokuapp.com <br>
The login details are  email: james@email password: Project-4-GA <br>

<h3>Timeframe</h3>

7 days

<h2 name='brief'>Brief</h2>

* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **You May** use the React Hooks syntax on your front end, but the resposiblity of this will be largely on yourself.
* **Have a visually impressive design** 
* **Be deployed online**


<h2 name='tech'>Technologies used</h2>
<p>1. HTML5 <br>
2. SCSS & Bulma <br>
3. JavaScript (ES6) <br>
4. JSON <br>
5. Python <br>
6. SQL <br>
7. PostgreSQL <br>
8. Django <br>
9. React.js <br>
10. React Hooks <br>
11. Node.js <br>
12. Axios <br>
13. Jest <br>
14. Insomnia <br>
15. Dotenv <br>
16. Cloudinary <br>
17. Mapbox <br>
18. Z shell <br>
19. JWT <br>
20. Yarn <br>
21. Heroku <br>
22. GitHub <br></p>

<h2 name='app'>App</h2>

The user can begin by taking a look around the app when not logged in. They can view the map and a few small details about the trip. As soon as they try to view a trip or profile in more detail they a redirected to log in. The user can register and upload a profile image via Cloudinary or log in with their existing information.<br>
<br>
<br>
<img src='readme/Reg.png' width='600'>
<br>
<br>
<br>
They are able to search for any area using the Mapbox built with Hooks and Mapbox Geocoder the interactive map then displays the area and trips within it. The markers display the trips image and then once clicked a pop-up showing some basic info about the trip. This is a link to the trips page where you can see more information and the user that created it.<br>
<br>
<br>
<img src='readme/Map.gif' width='600'>
<br>
<br>
<br>
The user can also see the five most recent trips that have been posted, these also work as links.<br>
<br>
<br>
<img src='readme/Others.gif' width='600'>
<br>
<br>
<br>
Finally the user can create a trip at anytime from the navbar or go to his profile and edit his information or that of his trips.<br>
<br>
<br>
<img src='readme/ProfileTrips.gif' width='600'>
<br>
<br>
<br>
<h2 name='approach'>Approach</h2>
Being a solo project I listed out a few ideas that interested me. I then mapped out potential features and the technologies behind them. I decided to go with Journo because it was similar to my last project meaning I wouldn't struggle to build it and so could focus on learning new techniques and technologies which I could use to build its features. I used the MoSCoW method to outline my timeline and produced wireframes for each page.
<br>
<br>
<h2 name='future'>Future content</h2>
<h3>Favourites</h3>
I would have liked for it to be possible for users to have favourite trips so they can quickly find them again. <br>
<br>
<br>
<h3>Categories model</h3>
If I had more time I would have built another model called categories. This would have a many-to-many relationship with trips. This would allow trips to be searched under categories of trip, such as sunny, hot, beach, cold, skiing, activity, luxury, backpackers, ect<br>
<br>
<br>
<h2 name='wins'>Wins</h2>
<h3>Python</h3>
This was my first project using Python, I found transition over from JavaScript to be quite easy at this level. The serializers where a specific win as I picked them up straight away and was able to edit their output fields easily.
<br>
<br>
<h3>Hooks</h3>
Hooks were new for me too, I built the map with them as I understood mapbox fairly well. Understanding that useState contains a variable that is whats being stored and it contains a method for updating whats being stored was key to making the map interactive. As we can see below in order for the user to move the map with the click and drag method, whenever the viewport changed I had to take the current viewport and update it with itself, which I still don't understand fully but I do see the basic mechanism.

```javascript
      onViewportChange={viewport => {
        setViewport(viewport)
      }}
```

The rest of the Hooks I found challenging but understood it and definately see the benefits as the code for this mapbox compared to my last one was shorter and in my view simpler and more readable, whilst producing similar effects.

```javascript
  const [viewport, setViewport] = useState({ 
      longitude: 0,
      latitude: 0,
      zoom: 2
  });
  const [trips, setTrips] = useState({})

  const getData = async () => {
        try {
          const token = process.env.REACT_APP_MAPBOX_KEY
          const search = window.location.pathname.split('/').slice(2).join('/')
          const mapStartFocus = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${token}`)
          if (mapStartFocus.data.features.length === 0) {
            this.props.history.push('/map/sudan')
            alert('Sorry we couldn\'t find that address')
          }
          const firstLatLng = mapStartFocus.data.features[0].center
          const viewport = {longitude: firstLatLng[0], latitude: firstLatLng[1], zoom: 5}
          setViewport(viewport)
          const { data } = await axios.get('/api/trips')
          const arrOfLocalAreas = data.map(i => i.local_area)
          Promise.all(arrOfLocalAreas.map(area => {
            return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${area}.json?access_token=${token}`)
          }))
            .then(res => {
              const latlngs = res.map(r => r.data.features[0].center)
              setTrips(data.map((trip, index) => {
                return {
                  ...trip,
                  latlng: latlngs[index]
                }
              }))
            })
    } catch (err) {
      console.log(err)
    }
  }
```

<h3>Password security</h3>
Last project our password security was poor and so I placed it on my future learnings list. This project I'm happy to say I implemented a system for ensuring strong passwords. Importing django.contrib.auth.password_validation as validations mean't I can use the password validations that come along with django, I then placed the validators I wanted to use in my settings.py file.

```python
import django.contrib.auth.password_validation as validations
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):

  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)

  def validate(self, data):
    password = data.pop('password')
    password_confirmation = data.pop('password_confirmation')
    if password != password_confirmation:
      raise serializers.ValidationError({'password_confirmation': 'Does Not Match'})
    try:
      validations.validate_password(password=password)
    except ValidationError as Err:
      raise serializers.ValidationError({'password': 'Password must be 8 characters long and contain a letter'}) // this line sends the feedback to the user

    data['password'] = make_password(password)

    return data
```


<h2 name='blockers'>Blockers</h2>
<h3>Form feedback</h3>
I did this project on my own because I wanted to go over the parts of building a web app I had missed while in my group project. I was happy to discover that I needed to do this as I really struggled with the form feedback errors. I learned that you can add the property 'name' to the input and then use this in state to update the errors section just the same as anything else. I had forgotton that errors were sent back and could be used.

```javascript
  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }
```
<br>
<br>
<br>
<img src='readme/Formfeedback.png' width='600'>
<br>
<br>
<br>
<h2 name='bugs'>Bugs</h2>
<h3>Reload page</h3>
Unfortunately a major bug of the app seems to be it is unable to refresh or reload the page you are on. If you do it seems to try and look in the back-end for the address. If this happens you must start from the home address.<br>
<br>
<br>
<img src='readme/Reload.png' width='600'>
<br>
<br>
<br>
<h3>SCSS</h3>
The create trip and edit trip pages have a small issue of the form taking up too much space to fit on the page nicely.<br>
<br>
<br>
<img src='readme/SCSSBug.png' width='600'>
<br>
<br>
<br>
<h2 name='learn'>Future learnings</h2>
• Look into the reload bug and how this works<br>