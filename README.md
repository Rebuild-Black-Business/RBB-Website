# RebuildBlackBusiness.com

## Local Development

### 1. Clone the repository

First, fork this repository by clicking the “fork” button at the top right. This creates your own copy of the repository where you’re able to make changes.

Second, clone your copy of the repo to your local machine:

```bash
# clone the repo
git clone git@github.com:YOUR_USERNAME_HERE/RBB-Website.git

# move into the new folder
cd RBB-Website/

# install dependencies
npm install
```

### 2. Add environment variables

This site uses Airtable to keep track of business data. You’ll need an Airtable API key get access to the base we’re using here. To get access, click this invite link:

#### [Get read-only access to the RBB Airtable](https://bit.ly/3gSMniS)

Next, go to the API docs and grab your API key:
https://airtable.com/appFoFzjMcciPUgoK/api/docs#javascript/authentication

Check the “show API key” box at the top-right, then look for yours in the code sample displayed next to the “Authentication” docs.

![Airtable API key in the docs](docs/images/airtable-api-key.png)

Once you have your API key, create a file called `.env` and add your API key:

```bash
AIRTABLE_API_KEY=YOUR_API_KEY
```

> **NOTE:** See `.env.EXAMPLE` for a copy-pasteable template to get set up!

### 3. Start the dev server

Now that you’ve got the files and an API key, you can start the site on your machine!

```bash
npm run develop
```

This will start Gatsby and show you a local development URL. Whenever you make code changes, Gatsby will automatically reload the browser to show you your changes.

To stop the development server, press `control + C` in your terminal.

## How to submit your changes to the site

To send your changes for review, open a pull request. If you’ve never opened a pull request before, [read Thanoshan’s article on creating a pull request](https://www.freecodecamp.org/news/how-to-make-your-first-pull-request-on-github-3/) for more information!
