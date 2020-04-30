# Video Journal For Teams Backend

## Code Climate

[![Maintainability](https://api.codeclimate.com/v1/badges/d1601cb84ad12ad579f2/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/video-journal-for-teams-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d1601cb84ad12ad579f2/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/video-journal-for-teams-be/test_coverage)

# API Documentation

#### Backend production deployment at heroku: https://video-journal.herokuapp.com/ <br>

#### Backend staging deployment at heroku: https://video-journal-staging.herokuapp.com/ <br>

## Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment
- **yarn coverage** to generate test coverage report



---

# Data Model

#### ROLES

---

```
{
  id: AUTO INCREMENT ID
  name: STRING, NOT NULLABLE
}
```

#### USERS

---

```
{
  id: AUTO INCREMENT ID
  email: STRING, UNIQUE, NOT NULLABLE
  username: STRING, UNIQUE, NOT NULLABLE
  password: STRING, NOT NULLABLE
  first_name: STRING, NOT NULLABLE
  last_name: STRING, NOT NULLABLE
}
```


#### ORGANIZATIONS

---

```
{
  id: AUTO INCREMENT ID
  name: STRING, NOT NULLABLE

}
```

#### ORGANIZATIONS_USERS

---

```
{
  user_id: FOREIGN KEY
  organization_id: FOREIGN KEY
  role_id: FOREIGN KEY
}
```


#### TEAMS

---

```
{
  id: AUTO INCREMENT ID
  name: STRING, NOT NULLABLE
  description: STRING, NOT NULLABLE
  created_at: TIME_STAMP, DEFAULTS_TO(knex.fn.now()), NOT NULLABLE
  updated_at: TIME_STAMP, DEFAULTS_TO(knex.fn.now()), NOT NULLABLE
  organization_id:FOREIGN KEY
}
```

#### TEAM_MEMBERS

---

```
{
  user_id: FOREIGN KEY
  team_id: FOREIGN KEY
  role_id: FOREIGN KEY
}
```

#### PROMPTS

---

```
{
  id: AUTO INCREMENT ID
  question: STRING, NOT NULLABLE
  description: STRING
  team_id: FOREIGN KEY
  created_at: TIME_STAMP, DEFAULTS_TO(knex.fn.now()), NOT NULLABLE
  updated_at: TIME_STAMP, DEFAULTS_TO(knex.fn.now()), NOT NULLABLE
}
```

#### VIDEOS

---

```
{
  id: AUTO INCREMENT ID
  owner_id: FOREIGN KEY
  title: STRING, NOT NULLABLE
  description: STRING
  created_at: TIME_STAMP, DEFAULTS_TO(knex.fn.now()), NOT NULLABLE
  updated_at: TIME_STAMP, DEFAULTS_TO(knex.fn.now()), NOT NULLABLE
  video_url: STRING, NOT NULLABLE
  prompt_id: FOREIGN KEY
}
```

#### FEEDBACK

---

```
{
  id: AUTO INCREMENT ID
  post: STRING
  video_id: FOREIGN KEY
  owner_id: FOREIGN KEY
  created_at: TIME_STAMP, DEFAULTS_TO(knex.fn.now()), NOT NULLABLE
  updated_at: TIME_STAMP, DEFAULTS_TO(knex.fn.now()), NOT NULLABLE
  viewed: BOOLEAN
}
```

#### TEAM_INVITATION_LINK

---

```
{
	id: AUTO INCREMENT ID
	team_id: FOREIGN KEY
	link: STRING
	isValid: BOOL
	created_at: TIMESTAMP
	expires_at: TIMESTAMP
  organization_id: FOREIGN KEY
}
```

#### AVATARS

---

```
{
	id: AUTO INCREMENT ID
	src: STRING
}
```

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- JWT_SECRET = *secure passphrase*
- DB_ENV = *depends on situation* - "development" / "testing" / "production"

- DATABASE_URL= *This is provided by heroku*
- DATABASE_URL_DEV="postgres://username:password@localhost:5432/db_name"
- DATABASE_URL_TEST = "postgres://username:password@localhost:5432/db_name_test"

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_S3_BUCKET
- SENDGRID_API_KEY = *secure passphrase*

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/video-journal-for-teams-fe) for details on the fronend of our project.
