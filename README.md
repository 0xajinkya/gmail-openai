
# Gmail - OpenAI

Super charge you gmails, with OpenAI


## Installation

Clone the repository:
```bash
git clone https://github.com/0xajinkya/gmail-openai.git
```

Create a .env file in the root directory and add the following credentials:
```bash
NEXT_PUBLIC_OAUTH_CLIENT_ID="589627228112-p1801rrqugakec80mkhntoj0af6m1r7n.apps.googleusercontent.com"
NEXT_PUBLIC_OAUTH_CLIENT_SECRET="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"
NEXT_PUBLIC_OAUTH_REDIRECT_URL="http://localhost:3000/login"
NEXT_PUBLIC_OAUTH_TOKEN_URL="https://oauth2.googleapis.com/token"
NEXT_PUBLIC_OAUTH_USERINFO_URL="https://www.googleapis.com/oauth2/v1/userinfo"
NEXT_PUBLIC_OPENAI_ORG_ID="org-FMK7ofG5e1diOp9LGTkZR3LO"
NEXT_PUBLIC_OPENAI_API_KEY="sk-proj-fk5k9qpLyP31jjwOAgxQT3BlbkFJdXkZlrlFkR4D5bTAxH0E"
```

Install dependencies:
```bash
npm i
```

## Usage
To start the development server, run:

```bash
npm run dev
```
To create a production build, run:

```bash
    npm run build
```

To start the production server, run:

```bash
npm run start
```

Once the server is running, navigate to **localhost:3000**. If you're not logged in, click on **Login Here** to begin the authentication process with Google. After successful authentication, you'll be redirected to the /login/add-api page where you can paste your **OpenAI API key**. If you proceed to the home page without adding the API key, you'll see an **Add OpenAI API Key** button on homepage.

## Email Classification

Once logged in and authenticated, you'll see a "Classify" button. Clicking this button will categorize your emails into the following categories:

* General
* Important
* Spam
* Promotions
* Marketing
* Social

If your OpenAI API key is **valid** and **not expired**, the emails will be classified accordingly. Otherwise, for demonstration purposes, **mock classification** will be applied to all emails.

## Email Retrieval

You can **adjust the number of emails to fetch using the dropdown menu** below the avatar section. Selecting a number will fetch that many emails. Use the paging options at the bottom of the page to navigate through the fetched emails. **Clicking the forward arrow** will increment the page number, **fetching the next set of emails**, while **clicking the backward arrow** will decrement the page number.

### Enjoy exploring your classified emails!





